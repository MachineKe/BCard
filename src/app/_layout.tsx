import { initDb } from '@/database/sqlite';
import '@/global.css';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';

export default function RootLayout() {
  const [isDbInitialized, setDbInitialized] = useState(false);

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
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="create" options={{ presentation: 'modal', title: 'Create Card' }} />
      <Stack.Screen name="card/[id]" options={{ title: 'Card Details' }} />
    </Stack>
  );
}