import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography, borderRadius } from '../theme';
import { useAuthStore } from '../store/authStore';
import { useNavigation } from '@react-navigation/native';

export const AuthScreen = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const { login, register, isLoading } = useAuthStore();
    const navigation = useNavigation<any>();

    const handleSubmit = async () => {
        if (!email || !password || (!isLogin && !name)) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await register(email, password, name);
            }
            navigation.replace('Main');
        } catch (error: any) {
            Alert.alert('Error', error.response?.data?.message || 'Authentication failed');
        }
    };

    const fillDemoCredentials = () => {
        setEmail('demo@petpals.com');
        setPassword('password123');
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>
                            {isLogin ? 'Welcome Back!' : 'Join PetPals'}
                        </Text>
                        <Text style={styles.subtitle}>
                            {isLogin
                                ? 'Sign in to continue your pet search'
                                : 'Create an account to find your perfect companion'}
                        </Text>
                    </View>

                    {/* Form */}
                    <View style={styles.form}>
                        {!isLogin && (
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Name</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter your name"
                                    placeholderTextColor={colors.textLight}
                                    value={name}
                                    onChangeText={setName}
                                    autoCapitalize="words"
                                />
                            </View>
                        )}

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your email"
                                placeholderTextColor={colors.textLight}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Password</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your password"
                                placeholderTextColor={colors.textLight}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>

                        {/* Demo Login Button */}
                        {isLogin && (
                            <TouchableOpacity onPress={fillDemoCredentials}>
                                <Text style={styles.demoText}>
                                    Try demo account (tap to fill)
                                </Text>
                            </TouchableOpacity>
                        )}

                        {/* Submit Button */}
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={handleSubmit}
                            disabled={isLoading}
                            activeOpacity={0.9}
                        >
                            <LinearGradient
                                colors={[colors.gradient.start, colors.gradient.end]}
                                style={styles.button}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                <Text style={styles.buttonText}>
                                    {isLoading ? 'Loading...' : isLogin ? 'Sign In' : 'Sign Up'}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        {/* Toggle Mode */}
                        <View style={styles.toggleContainer}>
                            <Text style={styles.toggleText}>
                                {isLogin ? "Don't have an account? " : 'Already have an account? '}
                            </Text>
                            <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                                <Text style={styles.toggleLink}>
                                    {isLogin ? 'Sign Up' : 'Sign In'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: spacing.xl,
        paddingTop: spacing['3xl'],
    },
    header: {
        marginBottom: spacing['3xl'],
    },
    title: {
        fontSize: typography.fontSize['4xl'],
        fontWeight: typography.fontWeight.bold,
        color: colors.text,
        marginBottom: spacing.md,
    },
    subtitle: {
        fontSize: typography.fontSize.base,
        color: colors.textSecondary,
        lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
    },
    form: {
        gap: spacing.lg,
    },
    inputContainer: {
        gap: spacing.sm,
    },
    label: {
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.medium,
        color: colors.text,
    },
    input: {
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: borderRadius.md,
        paddingHorizontal: spacing.base,
        paddingVertical: spacing.md,
        fontSize: typography.fontSize.base,
        color: colors.text,
    },
    demoText: {
        fontSize: typography.fontSize.sm,
        color: colors.primary,
        textAlign: 'center',
        marginTop: -spacing.sm,
    },
    buttonContainer: {
        marginTop: spacing.lg,
    },
    button: {
        borderRadius: borderRadius.lg,
        paddingVertical: spacing.base,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.bold,
        color: colors.textInverse,
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: spacing.md,
    },
    toggleText: {
        fontSize: typography.fontSize.base,
        color: colors.textSecondary,
    },
    toggleLink: {
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.bold,
        color: colors.primary,
    },
});
