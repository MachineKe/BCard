import { initDb } from '@/database/sqlite';
import '@/global.css';
import { Stack } from 'expo-router';
import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router/react-navigation';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';

export default function RootLayout() {
  const [isDbInitialized, setDbInitialized] = useState(false);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    try {
      initDb();
      setDbInitialized(true);
    } catch (e) {
      console.error(e);
    }
  }, []);

  if (!isDbInitialized) return null;

  return (
    <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerStyle: { backgroundColor: isDark ? '#111827' : '#ffffff' }, headerTintColor: isDark ? '#ffffff' : '#000000' }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="create" options={{ presentation: 'modal', title: 'Create Card' }} />
        <Stack.Screen name="card/[id]" options={{ title: 'Card Details' }} />
      </Stack>
    </ThemeProvider>
  );
}