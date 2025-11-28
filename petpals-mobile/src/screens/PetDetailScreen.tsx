import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    SafeAreaView,
    Dimensions,
    Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import { petsApi } from '../services/petsApi';
import { usePetsStore } from '../store/petsStore';
import { Pet } from '../types';
import { FavoriteButton } from '../components/FavoriteButton';

const { width, height } = Dimensions.get('window');

interface PetDetailScreenProps {
    route: {
        params: {
            petId: string;
        };
    };
    navigation: any;
}

export const PetDetailScreen: React.FC<PetDetailScreenProps> = ({ route, navigation }) => {
    const { petId } = route.params;
    const [pet, setPet] = useState<Pet | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);

    const { toggleFavorite, isFavorite: checkFavorite } = usePetsStore();

    useEffect(() => {
        loadPet();
    }, [petId]);

    const loadPet = async () => {
        try {
            setLoading(true);
            const data = await petsApi.getOne(petId);
            setPet(data);
        } catch (error) {
            Alert.alert('Error', 'Failed to load pet details');
            navigation.goBack();
        } finally {
            setLoading(false);
        }
    };

    const handleFavorite = async () => {
        if (pet) {
            await toggleFavorite(pet.id);
        }
    };

    if (loading || !pet) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.loadingText}>Loading...</Text>
            </SafeAreaView>
        );
    }

    const isFavorite = checkFavorite(pet.id);

    return (
        <View style={styles.container}>
            {/* Image Carousel */}
            <View style={styles.imageSection}>
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={(e) => {
                        const index = Math.round(e.nativeEvent.contentOffset.x / width);
                        setActiveImage(index);
                    }}
                >
                    {pet.images.map((image, index) => (
                        <Image
                            key={index}
                            source={{ uri: image }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    ))}
                </ScrollView>

                {/* Image Indicators */}
                <View style={styles.imageIndicators}>
                    {pet.images.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.indicator,
                                activeImage === index && styles.activeImageIndicator,
                            ]}
                        />
                    ))}
                </View>

                {/* Header Buttons */}
                <SafeAreaView style={styles.headerButtons}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={24} color={colors.text} />
                    </TouchableOpacity>

                    <FavoriteButton isFavorite={isFavorite} onPress={handleFavorite} />
                </SafeAreaView>

                {/* Gradient Overlay */}
                <LinearGradient
                    colors={['transparent', colors.background]}
                    style={styles.imageGradient}
                />
            </View>

            {/* Content */}
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Pet Name and Shelter */}
                <View style={styles.titleSection}>
                    <View>
                        <Text style={styles.petName}>Pet Name: {pet.name}</Text>
                        <View style={styles.shelterInfo}>
                            <Ionicons name="location" size={14} color={colors.primary} />
                            <Text style={styles.distance}>Distance: {pet.distance} km nearby</Text>
                        </View>
                        <Text style={styles.shelter}>{pet.shelter}</Text>
                    </View>
                </View>

                {/* Info Pills */}
                <View style={styles.infoPills}>
                    <View style={[styles.pill, { backgroundColor: '#E8D5FF' }]}>
                        <Text style={styles.pillLabel}>Sex</Text>
                        <Text style={styles.pillValue}>{pet.gender}</Text>
                    </View>
                    <View style={[styles.pill, { backgroundColor: '#FFF4D4' }]}>
                        <Text style={styles.pillLabel}>Age</Text>
                        <Text style={styles.pillValue}>{Math.floor(pet.age / 12)} years</Text>
                    </View>
                    <View style={[styles.pill, { backgroundColor: '#D4F5E9' }]}>
                        <Text style={styles.pillLabel}>Breed</Text>
                        <Text style={styles.pillValue}>{pet.breed}</Text>
                    </View>
                </View>

                {/* Tags */}
                {pet.tags && pet.tags.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Tags</Text>
                        <View style={styles.tags}>
                            {pet.tags.map((tag, index) => (
                                <View key={index} style={styles.tag}>
                                    <Text style={styles.tagText}>{tag}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {/* About */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>About {pet.name}</Text>
                    <Text style={styles.description}>{pet.description}</Text>
                </View>

                {/* Spacer for action buttons */}
                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.iconButton} onPress={() => Alert.alert('Call', 'Calling shelter...')}>
                    <Ionicons name="call" size={24} color={colors.textInverse} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconButton} onPress={() => Alert.alert('Message', 'Opening chat...')}>
                    <Ionicons name="chatbubble" size={24} color={colors.textInverse} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.meetButton}
                    onPress={() => Alert.alert('Meet Me', 'Booking a visit...')}
                    activeOpacity={0.9}
                >
                    <LinearGradient
                        colors={[colors.gradient.start, colors.gradient.end]}
                        style={styles.meetGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <View style={styles.meetContent}>
                            <Ionicons name="paw" size={24} color={colors.textInverse} />
                            <Text style={styles.meetText}>Meet Me</Text>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    imageSection: {
        height: height * 0.5,
        backgroundColor: colors.surface,
    },
    image: {
        width,
        height: height * 0.5,
    },
    imageIndicators: {
        position: 'absolute',
        bottom: spacing.xl,
        alignSelf: 'center',
        flexDirection: 'row',
        gap: spacing.xs,
    },
    indicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    activeImageIndicator: {
        backgroundColor: colors.textInverse,
        width: 24,
    },
    headerButtons: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.md,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: colors.backgroundLight,
        justifyContent: 'center',
        alignItems: 'center',
        ...shadows.base,
    },
    imageGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
    },
    content: {
        flex: 1,
        backgroundColor: colors.background,
    },
    titleSection: {
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.lg,
        paddingBottom: spacing.base,
    },
    petName: {
        fontSize: typography.fontSize['2xl'],
        fontWeight: typography.fontWeight.bold,
        color: colors.text,
        marginBottom: spacing.xs,
    },
    shelterInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        marginBottom: spacing.xs,
    },
    distance: {
        fontSize: typography.fontSize.sm,
        color: colors.textSecondary,
    },
    shelter: {
        fontSize: typography.fontSize.base,
        color: colors.textSecondary,
    },
    infoPills: {
        flexDirection: 'row',
        paddingHorizontal: spacing.xl,
        gap: spacing.md,
        marginBottom: spacing.lg,
    },
    pill: {
        flex: 1,
        padding: spacing.base,
        borderRadius: borderRadius.md,
        alignItems: 'center',
    },
    pillLabel: {
        fontSize: typography.fontSize.sm,
        color: colors.textSecondary,
        marginBottom: spacing.xs,
    },
    pillValue: {
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.bold,
        color: colors.text,
    },
    section: {
        paddingHorizontal: spacing.xl,
        marginBottom: spacing.lg,
    },
    sectionTitle: {
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.bold,
        color: colors.text,
        marginBottom: spacing.md,
    },
    tags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
    },
    tag: {
        backgroundColor: colors.accentLight,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.full,
    },
    tagText: {
        fontSize: typography.fontSize.sm,
        color: colors.text,
    },
    description: {
        fontSize: typography.fontSize.base,
        color: colors.textSecondary,
        lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
    },
    actionButtons: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.lg,
        backgroundColor: colors.background,
        gap: spacing.md,
        borderTopWidth: 1,
        borderTopColor: colors.divider,
    },
    iconButton: {
        width: 54,
        height: 54,
        borderRadius: 27,
        backgroundColor: colors.buttonSecondary,
        justifyContent: 'center',
        alignItems: 'center',
        ...shadows.base,
    },
    meetButton: {
        flex: 1,
        borderRadius: borderRadius.lg,
        overflow: 'hidden',
    },
    meetGradient: {
        flex: 1,
    },
    meetContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
    },
    meetText: {
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.bold,
        color: colors.textInverse,
    },
    loadingText: {
        textAlign: 'center',
        fontSize: typography.fontSize.base,
        color: colors.textSecondary,
        marginTop: spacing['3xl'],
    },
});
