import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography, borderRadius } from '../theme';
import { useAuthStore } from '../store/authStore';
import { useNavigation } from '@react-navigation/native';

export const ProfileScreen = () => {
    const { user, logout } = useAuthStore();
    const navigation = useNavigation<any>();

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: async () => {
                        await logout();
                        navigation.replace('Onboarding');
                    },
                },
            ]
        );
    };

    const menuItems = [
        { icon: 'person-outline', label: 'Edit Profile', onPress: () => { } },
        { icon: 'notifications-outline', label: 'Notifications', onPress: () => { } },
        { icon: 'settings-outline', label: 'Settings', onPress: () => { } },
        { icon: 'help-circle-outline', label: 'Help & Support', onPress: () => { } },
        { icon: 'information-circle-outline', label: 'About', onPress: () => { } },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.avatarContainer}>
                        <LinearGradient
                            colors={[colors.gradient.start, colors.gradient.end]}
                            style={styles.avatarGradient}
                        >
                            <Text style={styles.avatarText}>
                                {user?.name?.charAt(0).toUpperCase() || 'U'}
                            </Text>
                        </LinearGradient>
                    </View>
                    <Text style={styles.userName}>{user?.name || 'User'}</Text>
                    <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
                </View>

                {/* Stats */}
                <View style={styles.statsContainer}>
                    <View style={styles.stat}>
                        <Text style={styles.statValue}>0</Text>
                        <Text style={styles.statLabel}>Adopted</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.stat}>
                        <Text style={styles.statValue}>0</Text>
                        <Text style={styles.statLabel}>Visits</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.stat}>
                        <Text style={styles.statValue}>0</Text>
                        <Text style={styles.statLabel}>Reviews</Text>
                    </View>
                </View>

                {/* Menu Items */}
                <View style={styles.menuContainer}>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.menuItem}
                            onPress={item.onPress}
                            activeOpacity={0.7}
                        >
                            <View style={styles.menuLeft}>
                                <View style={styles.iconContainer}>
                                    <Ionicons name={item.icon as any} size={22} color={colors.primary} />
                                </View>
                                <Text style={styles.menuLabel}>{item.label}</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color={colors.textLight} />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Logout Button */}
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleLogout}
                    activeOpacity={0.7}
                >
                    <Ionicons name="log-out-outline" size={22} color={colors.error} />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>

                {/* Version */}
                <Text style={styles.version}>Version 1.0.0</Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        alignItems: 'center',
        paddingVertical: spacing['2xl'],
    },
    avatarContainer: {
        marginBottom: spacing.base,
    },
    avatarGradient: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        fontSize: 40,
        fontWeight: typography.fontWeight.bold,
        color: colors.textInverse,
    },
    userName: {
        fontSize: typography.fontSize['2xl'],
        fontWeight: typography.fontWeight.bold,
        color: colors.text,
        marginTop: spacing.md,
    },
    userEmail: {
        fontSize: typography.fontSize.base,
        color: colors.textSecondary,
        marginTop: spacing.xs,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: spacing.lg,
        marginHorizontal: spacing.xl,
        marginBottom: spacing.xl,
        backgroundColor: colors.surface,
        borderRadius: borderRadius.lg,
    },
    stat: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: typography.fontSize['2xl'],
        fontWeight: typography.fontWeight.bold,
        color: colors.primary,
        marginBottom: spacing.xs,
    },
    statLabel: {
        fontSize: typography.fontSize.sm,
        color: colors.textSecondary,
    },
    statDivider: {
        width: 1,
        backgroundColor: colors.divider,
    },
    menuContainer: {
        paddingHorizontal: spacing.xl,
        marginBottom: spacing.xl,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.base,
        backgroundColor: colors.surface,
        paddingHorizontal: spacing.base,
        borderRadius: borderRadius.md,
        marginBottom: spacing.sm,
    },
    menuLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.accentLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    menuLabel: {
        fontSize: typography.fontSize.base,
        color: colors.text,
        fontWeight: typography.fontWeight.medium,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: spacing.xl,
        paddingVertical: spacing.base,
        backgroundColor: colors.surface,
        borderRadius: borderRadius.md,
        borderWidth: 1,
        borderColor: colors.error,
        gap: spacing.sm,
    },
    logoutText: {
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.bold,
        color: colors.error,
    },
    version: {
        textAlign: 'center',
        fontSize: typography.fontSize.sm,
        color: colors.textLight,
        marginVertical: spacing.lg,
    },
});
