import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, shadows } from '../theme';

interface FavoriteButtonProps {
    isFavorite: boolean;
    onPress: () => void;
    size?: number;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
    isFavorite,
    onPress,
    size = 40,
}) => {
    return (
        <TouchableOpacity
            style={[styles.container, { width: size, height: size }]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={size * 0.6}
                color={isFavorite ? colors.heart : colors.text}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.backgroundLight,
        borderRadius: 999,
        justifyContent: 'center',
        alignItems: 'center',
        ...shadows.base,
    },
});
