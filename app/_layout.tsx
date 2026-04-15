import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { AuthProvider } from '@/providers/auth-provider';
import { IndustryProvider } from '@/providers/industry-provider';
import { AppThemeProvider, useAppTheme } from '@/providers/theme-provider';

export const unstable_settings = {
  anchor: '(admin)',
};

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <RootNavigator />
    </AppThemeProvider>
  );
}

function RootNavigator() {
  const { mode } = useAppTheme();

  return (
    <IndustryProvider>
      <AuthProvider>
        <ThemeProvider value={DarkTheme}>
          <Stack>
            <Stack.Screen name="splash" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="auth/login" options={{ headerShown: false }} />
            <Stack.Screen name="auth/signup" options={{ headerShown: false }} />
            <Stack.Screen name="(admin)" options={{ headerShown: false }} />
            <Stack.Screen name="(customer)" options={{ headerShown: false }} />
            <Stack.Screen name="(driver)" options={{ headerShown: false }} />
            <Stack.Screen name="support/about" options={{ title: 'About' }} />
            <Stack.Screen name="support/contact" options={{ title: 'Contact' }} />
            <Stack.Screen name="support/help" options={{ title: 'Help & Support' }} />
            <Stack.Screen name="support/privacy" options={{ title: 'Privacy Policy' }} />
            <Stack.Screen name="support/terms" options={{ title: 'Terms & Conditions' }} />
          </Stack>
          <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
        </ThemeProvider>
      </AuthProvider>
    </IndustryProvider>
  );
}
