import { CorporateTemplate } from '@/components/templates/CorporateTemplate';
import { useCardsStore } from '@/store/cardStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useEffect } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
    const { cards, loadCards, isLoading } = useCardsStore();
    const router = useRouter();

    useEffect(() => {
        loadCards();
    }, [loadCards]);

    return (
        <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
            <View className="flex-1 px-4 pt-4">
                <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-6">My Cards</Text>
                {isLoading ? (
                    <Text className="text-gray-500 dark:text-gray-400 mt-4 text-center">Loading cards...</Text>
                ) : (
                    <FlatList
                        data={cards}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{ paddingBottom: 100, gap: 16 }}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => router.push(`/card/${item.id}`)}>
                                <CorporateTemplate card={item} />
                            </Pressable>
                        )}
                        ListEmptyComponent={
                            <View className="flex-1 items-center justify-center mt-20">
                                <SymbolView name="person.crop.rectangle.stack" size={64} tintColor="#6B7280" />
                                <Text className="text-gray-500 dark:text-gray-400 text-lg font-medium mt-4">No cards yet</Text>
                                <Text className="text-gray-400 dark:text-gray-500 text-sm mt-1">Create your first digital business card!</Text>
                            </View>
                        }
                    />
                )}
            </View>

            <Pressable
                onPress={() => router.push('/create')}
                className="absolute bottom-6 right-6 bg-blue-600 w-16 h-16 rounded-full items-center justify-center shadow-lg"
            >
                <Ionicons name="add" size={32} color="#ffffff" />
            </Pressable>
        </SafeAreaView>
    );
}