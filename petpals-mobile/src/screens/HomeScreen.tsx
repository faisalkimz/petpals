import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    RefreshControl,
    FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '../theme';
import { useAuthStore } from '../store/authStore';
import { usePetsStore } from '../store/petsStore';
import { CategoryPill } from '../components/CategoryPill';
import { PetCard } from '../components/PetCard';
import { useNavigation } from '@react-navigation/native';

export const HomeScreen = () => {
    const navigation = useNavigation<any>();
    const { user } = useAuthStore();
    const {
        pets,
        categories,
        selectedCategory,
        fetchPets,
        fetchCategories,
        setSelectedCategory,
        isLoading,
    } = usePetsStore();

    const [searchQuery, setSearchQuery] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            fetchPets({ categoryId: selectedCategory });
        } else {
            fetchPets();
        }
    }, [selectedCategory]);

    const loadData = async () => {
        await Promise.all([fetchCategories(), fetchPets()]);
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await loadData();
        setRefreshing(false);
    };

    const handleSearch = () => {
        if (searchQuery.trim()) {
            fetchPets({ search: searchQuery });
        } else {
            fetchPets();
        }
    };

    const handleCategoryPress = (categoryId: string) => {
        if (selectedCategory === categoryId) {
            setSelectedCategory(null);
        } else {
            setSelectedCategory(categoryId);
        }
    };

    const filteredPets = pets;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                }
            >
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Hi, {user?.name || 'Guest'} 👋</Text>
                        <Text style={styles.subGreeting}>Good morning</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.notificationButton}
                        onPress={() => { }}
                    >
                        <Ionicons name="notifications-outline" size={24} color={colors.text} />
                    </TouchableOpacity>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <View style={styles.searchBar}>
                        <Ionicons
                            name="search"
                            size={20}
                            color={colors.textLight}
                            style={styles.searchIcon}
                        />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search by breed, size, or name"
                            placeholderTextColor={colors.textLight}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            onSubmitEditing={handleSearch}
                            returnKeyType="search"
                        />
                    </View>
                    <TouchableOpacity style={styles.filterButton}>
                        <Ionicons name="options-outline" size={24} color={colors.text} />
                    </TouchableOpacity>
                </View>

                {/* Categories */}
                <View style={styles.section}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoriesContainer}
                    >
                        {categories.map((category) => (
                            <CategoryPill
                                key={category.id}
                                name={category.name}
                                icon={category.icon}
                                isActive={selectedCategory === category.id}
                                onPress={() => handleCategoryPress(category.id)}
                            />
                        ))}
                    </ScrollView>
                </View>

                {/* Distance Filter Info */}
                {filteredPets.length > 0 && (
                    <View style={styles.distanceInfo}>
                        <Ionicons name="location" size={16} color={colors.primary} />
                        <Text style={styles.distanceText}>
                            3 km nearby • {filteredPets.length} pets available
                        </Text>
                    </View>
                )}

                {/* Pet Cards */}
                <View style={styles.section}>
                    {isLoading && filteredPets.length === 0 ? (
                        <Text style={styles.loadingText}>Loading pets...</Text>
                    ) : filteredPets.length === 0 ? (
                        <Text style={styles.emptyText}>No pets found</Text>
                    ) : (
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.petsContainer}
                        >
                            {filteredPets.map((pet) => (
                                <PetCard
                                    key={pet.id}
                                    pet={pet}
                                    onPress={() => navigation.navigate('PetDetail', { petId: pet.id })}
                                />
                            ))}
                        </ScrollView>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollView: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.lg,
        paddingBottom: spacing.base,
    },
    greeting: {
        fontSize: typography.fontSize.xl,
        fontWeight: typography.fontWeight.bold,
        color: colors.text,
    },
    subGreeting: {
        fontSize: typography.fontSize.base,
        color: colors.textSecondary,
        marginTop: spacing.xs,
    },
    notificationButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.base,
        gap: spacing.md,
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        borderRadius: borderRadius.lg,
        paddingHorizontal: spacing.base,
    },
    searchIcon: {
        marginRight: spacing.sm,
    },
    searchInput: {
        flex: 1,
        paddingVertical: spacing.md,
        fontSize: typography.fontSize.base,
        color: colors.text,
    },
    filterButton: {
        width: 50,
        height: 50,
        borderRadius: borderRadius.md,
        backgroundColor: colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
    },
    section: {
        paddingVertical: spacing.base,
    },
    categoriesContainer: {
        paddingHorizontal: spacing.xl,
    },
    distanceInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.sm,
        gap: spacing.xs,
    },
    distanceText: {
        fontSize: typography.fontSize.sm,
        color: colors.textSecondary,
    },
    petsContainer: {
        paddingHorizontal: spacing.xl,
    },
    loadingText: {
        textAlign: 'center',
        fontSize: typography.fontSize.base,
        color: colors.textSecondary,
        paddingVertical: spacing['3xl'],
    },
    emptyText: {
        textAlign: 'center',
        fontSize: typography.fontSize.base,
        color: colors.textSecondary,
        paddingVertical: spacing['3xl'],
    },
});
