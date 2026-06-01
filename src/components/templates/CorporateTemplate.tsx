import { BusinessCard } from '@/types';
import { SymbolView } from 'expo-symbols';
import { Image, Text, View } from 'react-native';

interface Props {
    card: BusinessCard;
}

export function CorporateTemplate({ card }: Props) {
    return (
        <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
            <View className="absolute top-0 left-0 w-2 h-full bg-blue-600" />
            <View className="ml-2 flex-row justify-between items-start">
                <View className="flex-1">
                    <Text className="text-2xl font-bold text-gray-900">{card.name}</Text>
                    <Text className="text-blue-600 font-medium mt-1">{card.title}</Text>
                    {card.company ? <Text className="text-gray-500 mt-1">{card.company}</Text> : null}
                </View>
                {card.profileImage ? (
                    <Image source={{ uri: card.profileImage }} className="w-16 h-16 rounded-full bg-gray-100 ml-4" />
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
                        <SymbolView name="envelope.fill" size={16} tintColor="#6B7280" />
                        <Text className="text-gray-600">{card.email}</Text>
                    </View>
                ) : null}
                {card.phone ? (
                    <View className="flex-row items-center gap-x-2">
                        <SymbolView name="phone.fill" size={16} tintColor="#6B7280" />
                        <Text className="text-gray-600">{card.phone}</Text>
                    </View>
                ) : null}
                {card.website ? (
                    <View className="flex-row items-center gap-x-2">
                        <SymbolView name="link" size={16} tintColor="#6B7280" />
                        <Text className="text-gray-600">{card.website}</Text>
                    </View>
                ) : null}
            </View>
        </View>
    );
}