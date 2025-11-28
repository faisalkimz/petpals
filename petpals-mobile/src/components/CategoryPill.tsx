import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../theme';

interface CategoryPillProps {
    name: string;
    icon: string;
    isActive: boolean;
    onPress: () => void;
}

export const CategoryPill: React.FC<CategoryPillProps> = ({
    name,
    icon,
    isActive,
    onPress,
}) => {
    return (
        <TouchableOpacity
            style={[styles.container, isActive && styles.activeContainer]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.content}>
                <Text style={styles.icon}>{icon}</Text>
                <Text style={[styles.text, isActive && styles.activeText]}>{name}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: spacing.base,
        paddingVertical: spacing.md,
        backgroundColor: colors.categoryInactive,
        borderRadius: borderRadius.full,
        marginRight: spacing.sm,
        minWidth: 80,
        alignItems: 'center',
    },
    activeContainer: {
        backgroundColor: colors.categoryActive,
    },
    content: {
        alignItems: 'center',
        gap: spacing.xs,
    },
    icon: {
        fontSize: 24,
    },
    text: {
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.medium,
        color: colors.categoryTextInactive,
    },
    activeText: {
        color: colors.categoryText,
    },
});
