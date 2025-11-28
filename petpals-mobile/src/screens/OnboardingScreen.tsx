import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    SafeAreaView,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography, borderRadius } from '../theme';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export const OnboardingScreen = () => {
    const navigation = useNavigation<any>();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Find Your</Text>
                    <Text style={styles.title}>Furry</Text>
                    <Text style={styles.title}>Favorite</Text>
                </View>

                {/* Cat Illustration */}
                <View style={styles.imageContainer}>
                    <Image
                        source={{
                            uri: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400',
                        }}
                        style={styles.catImage}
                        resizeMode="cover"
                    />
                    <View style={styles.pawPrints}>
                        <Text style={styles.paw}>🐾</Text>
                        <Text style={styles.paw}>🐾</Text>
                        <Text style={styles.paw}>🐾</Text>
                    </View>
                </View>

                {/* Subtitle */}
                <Text style={styles.subtitle}>Find your perfect pet companion</Text>

                {/* Get Started Button */}
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => navigation.navigate('Auth')}
                    activeOpacity={0.9}
                >
                    <LinearGradient
                        colors={[colors.gradient.start, colors.gradient.end]}
                        style={styles.button}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <View style={styles.buttonContent}>
                            <View style={styles.iconCircle}>
                                <Text style={styles.pawIcon}>🐾</Text>
                            </View>
                            <Text style={styles.buttonText}>Get Started</Text>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>

                {/* Page Indicators */}
                <View style={styles.indicators}>
                    <View style={[styles.indicator, styles.activeIndicator]} />
                    <View style={styles.indicator} />
                    <View style={styles.indicator} />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.accentLight,
    },
    content: {
        flex: 1,
        paddingHorizontal: spacing['2xl'],
        paddingTop: spacing['3xl'],
    },
    header: {
        marginBottom: spacing['2xl'],
    },
    title: {
        fontSize: 48,
        fontWeight: typography.fontWeight.bold,
        color: colors.text,
        lineHeight: 56,
    },
    imageContainer: {
        alignItems: 'center',
        marginVertical: spacing['3xl'],
        position: 'relative',
    },
    catImage: {
        width: width * 0.6,
        height: width * 0.6,
        borderRadius: borderRadius['2xl'],
    },
    pawPrints: {
        position: 'absolute',
        bottom: -20,
        right: 40,
        flexDirection: 'row',
        gap: spacing.xs,
    },
    paw: {
        fontSize: 20,
        opacity: 0.3,
    },
    subtitle: {
        fontSize: typography.fontSize.lg,
        color: colors.textSecondary,
        marginBottom: spacing['3xl'],
    },
    buttonContainer: {
        marginBottom: spacing.xl,
    },
    button: {
        borderRadius: borderRadius.full,
        overflow: 'hidden',
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.base,
        paddingHorizontal: spacing.xl,
    },
    iconCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: colors.backgroundLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    pawIcon: {
        fontSize: 20,
    },
    buttonText: {
        fontSize: typography.fontSize.xl,
        fontWeight: typography.fontWeight.bold,
        color: colors.textInverse,
    },
    indicators: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: spacing.sm,
        marginTop: spacing.xl,
    },
    indicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.border,
    },
    activeIndicator: {
        width: 24,
        backgroundColor: colors.text,
    },
});
