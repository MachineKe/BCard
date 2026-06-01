import { BusinessCard } from '@/types';
import { SymbolView } from 'expo-symbols';
import { useColorScheme } from 'nativewind';
import { Image, Text, View } from 'react-native';

interface Props {
    card: BusinessCard;
}

export function CorporateTemplate({ card }: Props) {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    return (
        <View className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden">
            <View className="absolute top-0 left-0 w-2 h-full bg-blue-600" />
            <View className="ml-2 flex-row justify-between items-start">
                <View className="flex-1">
                    <Text className="text-2xl font-bold text-gray-900 dark:text-white">{card.name}</Text>
                    <Text className="text-blue-600 dark:text-blue-400 font-medium mt-1">{card.title}</Text>
                    {card.company ? <Text className="text-gray-500 dark:text-gray-400 mt-1">{card.company}</Text> : null}
                </View>
                {card.profileImage ? (
                    <Image source={{ uri: card.profileImage }} className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 ml-4" />
                ) : null}
            </View>

            {card.companyLogo ? (
                <View className="mt-4 ml-2">
                    <Image source={{ uri: card.companyLogo }} className="h-8 w-24" resizeMode="contain" />
                </View>
            ) : null}

            <View className="ml-2 mt-6 gap-y-2">
                {card.email ? (
                    <View className="flex-row items-center gap-x-2">
                        <SymbolView name="envelope.fill" size={16} tintColor={isDark ? '#9CA3AF' : '#6B7280'} />
                        <Text className="text-gray-600 dark:text-gray-300">{card.email}</Text>
                    </View>
                ) : null}
                {card.phone ? (
                    <View className="flex-row items-center gap-x-2">
                        <SymbolView name="phone.fill" size={16} tintColor={isDark ? '#9CA3AF' : '#6B7280'} />
                        <Text className="text-gray-600 dark:text-gray-300">{card.phone}</Text>
                    </View>
                ) : null}
                {card.website ? (
                    <View className="flex-row items-center gap-x-2">
                        <SymbolView name="link" size={16} tintColor={isDark ? '#9CA3AF' : '#6B7280'} />
                        <Text className="text-gray-600 dark:text-gray-300">{card.website}</Text>
                    </View>
                ) : null}
            </View>
        </View>
    );
}