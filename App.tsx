import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { Appearance, StatusBar, View, StyleSheet } from 'react-native';
import AppLoading from 'expo-app-loading';
import { Routes } from '@/src/routes/index';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider, useAuth } from './src/hooks/auth';
import theme from '@/src/global/styles/theme';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  const { userStorageLoading } = useAuth();
  if (!fontsLoaded || userStorageLoading) {
    return <AppLoading />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <StatusBar
          backgroundColor={theme.colors.primary}
        />
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}