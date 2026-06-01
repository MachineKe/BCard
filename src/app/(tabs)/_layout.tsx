import { Tabs } from 'expo-router';
import { SymbolView } from 'expo-symbols';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: '#2563EB', headerShown: false }}>
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