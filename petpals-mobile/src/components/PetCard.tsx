import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Pet } from '../types';
import { colors, spacing, borderRadius, typography, shadows } from '../theme';

interface PetCardProps {
    pet: Pet;
    onPress: () => void;
}

export const PetCard: React.FC<PetCardProps> = ({ pet, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            activeOpacity={0.9}
        >
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: pet.images[0] }}
                    style={styles.image}
                    resizeMode="cover"
                />
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.7)']}
                    style={styles.gradient}
                />

                <View style={styles.info}>
                    <View>
                        <Text style={styles.name}>{pet.name}</Text>
                        <Text style={styles.breed}>{pet.breed} • {pet.gender}</Text>
                    </View>

                    <View style={styles.priceContainer}>
                        <Text style={styles.priceLabel}>$</Text>
                        <Text style={styles.price}>{pet.price}</Text>
                    </View>
                </View>

                {pet.tags && pet.tags.length > 0 && (
                    <View style={styles.tagsContainer}>
                        {pet.tags.slice(0, 2).map((tag, index) => (
                            <View key={index} style={styles.tag}>
                                <Text style={styles.tagText}>{tag}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginRight: spacing.base,
        ...shadows.md,
    },
    imageContainer: {
        width: 260,
        height: 340,
        borderRadius: borderRadius.xl,
        overflow: 'hidden',
        backgroundColor: colors.surface,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '50%',
    },
    info: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: spacing.base,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    name: {
        fontSize: typography.fontSize.xl,
        fontWeight: typography.fontWeight.bold,
        color: colors.textInverse,
        marginBottom: spacing.xs,
    },
    breed: {
        fontSize: typography.fontSize.sm,
        color: colors.textInverse,
        opacity: 0.9,
    },
    priceContainer: {
        backgroundColor: colors.primary,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.lg,
        flexDirection: 'row',
        alignItems: 'center',
    },
    priceLabel: {
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.bold,
        color: colors.textInverse,
        marginRight: 2,
    },
    price: {
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.bold,
        color: colors.textInverse,
    },
    tagsContainer: {
        position: 'absolute',
        top: spacing.md,
        left: spacing.md,
        flexDirection: 'row',
        gap: spacing.xs,
    },
    tag: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.base,
    },
    tagText: {
        fontSize: typography.fontSize.xs,
        fontWeight: typography.fontWeight.medium,
        color: colors.text,
    },
});
