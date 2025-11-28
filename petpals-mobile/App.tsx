import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { AppNavigator } from './src/navigation/AppNavigator';
import { usePetsStore } from './src/store/petsStore';

export default function App() {
    const { fetchFavorites } = usePetsStore();

    useEffect(() => {
        // Prefetch favorites on app start
        fetchFavorites();
    }, []);

    return (
        <GestureHandlerRootView style={styles.container}>
            <StatusBar style="dark" />
            <AppNavigator />
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
