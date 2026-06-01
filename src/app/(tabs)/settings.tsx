import { useCardsStore } from '@/store/cardStore';
import { SymbolView } from 'expo-symbols';
import { useColorScheme } from 'nativewind';
import { Pressable, ScrollView, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
    const { colorScheme, setColorScheme } = useColorScheme();
    const { themePreference, setThemePreference } = useCardsStore();

    const isDark = colorScheme === 'dark';

    return (
        <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
            <ScrollView className="flex-1 px-4 pt-4">
                <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Settings</Text>

                <View className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                    <Text className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4 uppercase">Appearance</Text>

                    <View className="flex-row items-center justify-between py-2">
                        <View className="flex-row items-center gap-x-3">
                            <SymbolView name="moon.fill" size={20} tintColor={isDark ? "#ffffff" : "#000000"} />
                            <Text className="text-base text-gray-900 dark:text-white font-medium">Dark Mode</Text>
                        </View>
                        <Switch
                            value={isDark}
                            onValueChange={(val) => {
                                setColorScheme(val ? 'dark' : 'light');
                                setThemePreference(val ? 'dark' : 'light');
                            }}
                            trackColor={{ false: "#D1D5DB", true: "#2563EB" }}
                        />
                    </View>

                    <View className="h-[1px] bg-gray-100 dark:bg-gray-700 my-2" />

                    <View className="flex-row items-center justify-between py-2">
                        <View className="flex-row items-center gap-x-3">
                            <SymbolView name="gear" size={20} tintColor={isDark ? "#ffffff" : "#000000"} />
                            <Text className="text-base text-gray-900 dark:text-white font-medium">Use System Theme</Text>
                        </View>
                        <Switch
                            value={themePreference === 'system'}
                            onValueChange={(val) => {
                                const newTheme = val ? 'system' : colorScheme;
                                setColorScheme(newTheme);
                                setThemePreference(newTheme);
                            }}
                            trackColor={{ false: "#D1D5DB", true: "#2563EB" }}
                        />
                    </View>
                </View>

                <View className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 mt-6">
                    <Text className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4 uppercase">About</Text>

                    <Pressable className="flex-row items-center justify-between py-2 active:opacity-70">
                        <Text className="text-base text-gray-900 dark:text-white font-medium">Version</Text>
                        <Text className="text-gray-500 dark:text-gray-400">1.0.0</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}