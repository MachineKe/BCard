import { Tabs } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useColorScheme } from 'nativewind';

export default function TabLayout() {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: '#2563EB',
            tabBarInactiveTintColor: isDark ? '#9CA3AF' : '#6B7280',
            tabBarStyle: { backgroundColor: isDark ? '#111827' : '#ffffff', borderTopColor: isDark ? '#1F2937' : '#E5E7EB' },
            headerShown: false
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Cards',
                    tabBarIcon: ({ color }) => <SymbolView name="person.crop.rectangle.stack" tintColor={color} />,
                }}
            />
            <Tabs.Screen
                name="favorites"
                options={{
                    title: 'Favorites',
                    tabBarIcon: ({ color }) => <SymbolView name="star.fill" tintColor={color} />,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color }) => <SymbolView name="gear" tintColor={color} />,
                }}
            />
        </Tabs>
    );
}