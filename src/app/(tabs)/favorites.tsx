import { CorporateTemplate } from '@/components/templates/CorporateTemplate';
import { useCardsStore } from '@/store/cardStore';
import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FavoritesScreen() {
    const { cards } = useCardsStore();
    const router = useRouter();

    const favoriteCards = cards.filter(card => card.isFavorite);

    return (
        <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
            <View className="flex-1 px-4 pt-4">
                <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Favorites</Text>

                <FlatList
                    data={favoriteCards}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ paddingBottom: 100, gap: 16 }}
                    renderItem={({ item }) => (
                        <Pressable onPress={() => router.push(`/card/${item.id}`)}>
                            <CorporateTemplate card={item} />
                        </Pressable>
                    )}
                    ListEmptyComponent={
                        <View className="flex-1 items-center justify-center mt-20">
                            <SymbolView name="star.slash" size={64} tintColor="#6B7280" />
                            <Text className="text-gray-500 dark:text-gray-400 text-lg font-medium mt-4">No favorites yet</Text>
                            <Text className="text-gray-400 dark:text-gray-500 text-sm mt-1 text-center mt-2">
                                Cards you favorite will appear here.
                            </Text>
                        </View>
                    }
                />
            </View>
        </SafeAreaView>
    );
}