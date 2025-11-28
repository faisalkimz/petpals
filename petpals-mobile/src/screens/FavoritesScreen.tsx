import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    SafeAreaView,
    TouchableOpacity,
    Image,
    RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import { usePetsStore } from '../store/petsStore';
import { useNavigation } from '@react-navigation/native';
import { Pet } from '../types';

export const FavoritesScreen = () => {
    const navigation = useNavigation<any>();
    const { favorites, fetchFavorites, toggleFavorite } = usePetsStore();
    const [refreshing, setRefreshing] = React.useState(false);

    useEffect(() => {
        fetchFavorites();
    }, []);

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchFavorites();
        setRefreshing(false);
    };

    const renderPetItem = ({ item }: { item: Pet }) => (
        <TouchableOpacity
            style={styles.petCard}
            onPress={() => navigation.navigate('PetDetail', { petId: item.id })}
            activeOpacity={0.9}
        >
            <Image source={{ uri: item.images[0] }} style={styles.petImage} />

            <TouchableOpacity
                style={styles.favoriteButton}
                onPress={() => toggleFavorite(item.id)}
            >
                <Ionicons name="heart" size={20} color={colors.heart} />
            </TouchableOpacity>

            <View style={styles.petInfo}>
                <Text style={styles.petName}>{item.name}</Text>
                <Text style={styles.petBreed}>{item.breed}</Text>

                <View style={styles.petMeta}>
                    <View style={styles.metaItem}>
                        <Ionicons name="location" size={14} color={colors.primary} />
                        <Text style={styles.metaText}>{item.distance} km</Text>
                    </View>
                    <View style={styles.priceTag}>
                        <Text style={styles.price}>${item.price}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>My Favorites</Text>
                <Text style={styles.subtitle}>
                    {favorites.length} {favorites.length === 1 ? 'pet' : 'pets'} saved
                </Text>
            </View>

            {favorites.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Ionicons name="heart-outline" size={80} color={colors.textLight} />
                    <Text style={styles.emptyTitle}>No favorites yet</Text>
                    <Text style={styles.emptyText}>
                        Start adding pets to your favorites to see them here
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={favorites}
                    renderItem={renderPetItem}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    contentContainerStyle={styles.listContent}
                    columnWrapperStyle={styles.columnWrapper}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                    }
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.lg,
        paddingBottom: spacing.base,
    },
    title: {
        fontSize: typography.fontSize['3xl'],
        fontWeight: typography.fontWeight.bold,
        color: colors.text,
    },
    subtitle: {
        fontSize: typography.fontSize.base,
        color: colors.textSecondary,
        marginTop: spacing.xs,
    },
    listContent: {
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.base,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: spacing.base,
    },
    petCard: {
        width: '48%',
        backgroundColor: colors.surface,
        borderRadius: borderRadius.lg,
        overflow: 'hidden',
        marginBottom: spacing.base,
        ...shadows.base,
    },
    petImage: {
        width: '100%',
        height: 160,
        backgroundColor: colors.border,
    },
    favoriteButton: {
        position: 'absolute',
        top: spacing.sm,
        right: spacing.sm,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: colors.backgroundLight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    petInfo: {
        padding: spacing.md,
    },
    petName: {
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.bold,
        color: colors.text,
        marginBottom: spacing.xs,
    },
    petBreed: {
        fontSize: typography.fontSize.sm,
        color: colors.textSecondary,
        marginBottom: spacing.sm,
    },
    petMeta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    metaText: {
        fontSize: typography.fontSize.xs,
        color: colors.textSecondary,
    },
    priceTag: {
        backgroundColor: colors.primary,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.base,
    },
    price: {
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.bold,
        color: colors.textInverse,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: spacing['3xl'],
    },
    emptyTitle: {
        fontSize: typography.fontSize.xl,
        fontWeight: typography.fontWeight.bold,
        color: colors.text,
        marginTop: spacing.lg,
        marginBottom: spacing.sm,
    },
    emptyText: {
        fontSize: typography.fontSize.base,
        color: colors.textSecondary,
        textAlign: 'center',
        lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
    },
});
