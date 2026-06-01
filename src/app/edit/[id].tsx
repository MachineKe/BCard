import { useCardsStore } from '@/store/cardStore';
import { zodResolver } from '@hookform/resolvers/zod';
import * as FileSystem from 'expo-file-system/legacy';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import * as z from 'zod';

const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    title: z.string().min(1, 'Title is required'),
    company: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email('Invalid email').optional().or(z.literal('')),
    website: z.string().url('Invalid URL').optional().or(z.literal('')),
    profileImage: z.string().optional(),
    companyLogo: z.string().optional(),
});

export default function EditCardScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { cards, updateCard } = useCardsStore();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    const card = cards.find(c => c.id === id);

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: card?.name || '',
            title: card?.title || '',
            company: card?.company || '',
            phone: card?.phone || '',
            email: card?.email || '',
            website: card?.website || '',
            profileImage: card?.profileImage || '',
            companyLogo: card?.companyLogo || ''
        }
    });

    if (!card) {
        return (
            <View className="flex-1 items-center justify-center bg-gray-50 dark:bg-gray-900">
                <Text className="text-gray-500 dark:text-gray-400">Card not found</Text>
            </View>
        );
    }

    const pickImage = async (onChange: (value: string) => void, aspect?: [number, number]) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect,
            quality: 0.8,
        });

        if (!result.canceled) {
            try {
                const asset = result.assets[0];
                const filename = asset.uri.split('/').pop() || `image-${Date.now()}.jpg`;
                const newUri = `${FileSystem.documentDirectory}${filename}`;
                await FileSystem.copyAsync({ from: asset.uri, to: newUri });
                onChange(newUri);
            } catch (error) {
                Alert.alert('Error', 'Failed to save image locally');
            }
        }
    };

    const onSubmit = (data: any) => {
        try {
            updateCard(card.id, data);
            router.back();
        } catch (e) {
            Alert.alert('Error', 'Failed to update card');
        }
    };

    return (
        <ScrollView className="flex-1 bg-white dark:bg-gray-900 p-4">
            <View className="gap-y-4 pb-12">
                <View>
                    <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name *</Text>
                    <Controller
                        control={control} name="name"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                                placeholderTextColor={isDark ? '#9CA3AF' : '#9CA3AF'}
                                placeholder="John Doe" value={value} onChangeText={onChange}
                            />
                        )}
                    />
                    {errors.name && <Text className="text-red-500 text-xs mt-1">{errors.name.message as string}</Text>}
                </View>

                <View>
                    <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Job Title *</Text>
                    <Controller
                        control={control} name="title"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                                placeholderTextColor={isDark ? '#9CA3AF' : '#9CA3AF'}
                                placeholder="Software Engineer" value={value} onChangeText={onChange}
                            />
                        )}
                    />
                    {errors.title && <Text className="text-red-500 text-xs mt-1">{errors.title.message as string}</Text>}
                </View>

                <View>
                    <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company</Text>
                    <Controller
                        control={control} name="company"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                                placeholderTextColor={isDark ? '#9CA3AF' : '#9CA3AF'}
                                placeholder="Tech Corp" value={value} onChangeText={onChange}
                            />
                        )}
                    />
                </View>

                <View>
                    <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</Text>
                    <Controller
                        control={control} name="email"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                                placeholderTextColor={isDark ? '#9CA3AF' : '#9CA3AF'}
                                placeholder="john@example.com" keyboardType="email-address"
                                autoCapitalize="none" value={value} onChangeText={onChange}
                            />
                        )}
                    />
                    {errors.email && <Text className="text-red-500 text-xs mt-1">{errors.email.message as string}</Text>}
                </View>

                <View>
                    <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</Text>
                    <Controller
                        control={control} name="phone"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                                placeholderTextColor={isDark ? '#9CA3AF' : '#9CA3AF'}
                                placeholder="+1 (555) 000-0000" keyboardType="phone-pad"
                                value={value} onChangeText={onChange}
                            />
                        )}
                    />
                </View>

                <View>
                    <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Website URL</Text>
                    <Controller
                        control={control} name="website"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                                placeholderTextColor={isDark ? '#9CA3AF' : '#9CA3AF'}
                                placeholder="https://example.com" keyboardType="url"
                                autoCapitalize="none" value={value} onChangeText={onChange}
                            />
                        )}
                    />
                    {errors.website && <Text className="text-red-500 text-xs mt-1">{errors.website.message as string}</Text>}
                </View>

                <View>
                    <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Profile Photo (URL or Upload)</Text>
                    <Controller
                        control={control} name="profileImage"
                        render={({ field: { onChange, value } }) => (
                            <View className="flex-row gap-x-2">
                                <TextInput
                                    className="flex-1 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                                    placeholderTextColor={isDark ? '#9CA3AF' : '#9CA3AF'}
                                    placeholder="https://example.com/avatar.png" keyboardType="url"
                                    autoCapitalize="none" value={value} onChangeText={onChange}
                                />
                                <Pressable onPress={() => pickImage(onChange, [1, 1])} className="bg-gray-200 dark:bg-gray-800 px-4 justify-center rounded-xl active:opacity-70 border border-transparent dark:border-gray-700">
                                    <Text className="text-gray-700 dark:text-gray-300 font-medium">Upload</Text>
                                </Pressable>
                            </View>
                        )}
                    />
                    {errors.profileImage && <Text className="text-red-500 text-xs mt-1">{errors.profileImage.message as string}</Text>}
                </View>

                <View>
                    <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company Logo (URL or Upload)</Text>
                    <Controller
                        control={control} name="companyLogo"
                        render={({ field: { onChange, value } }) => (
                            <View className="flex-row gap-x-2">
                                <TextInput
                                    className="flex-1 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                                    placeholderTextColor={isDark ? '#9CA3AF' : '#9CA3AF'}
                                    placeholder="https://example.com/logo.png" keyboardType="url"
                                    autoCapitalize="none" value={value} onChangeText={onChange}
                                />
                                <Pressable onPress={() => pickImage(onChange)} className="bg-gray-200 dark:bg-gray-800 px-4 justify-center rounded-xl active:opacity-70 border border-transparent dark:border-gray-700">
                                    <Text className="text-gray-700 dark:text-gray-300 font-medium">Upload</Text>
                                </Pressable>
                            </View>
                        )}
                    />
                    {errors.companyLogo && <Text className="text-red-500 text-xs mt-1">{errors.companyLogo.message as string}</Text>}
                </View>

                <Pressable
                    onPress={handleSubmit(onSubmit)}
                    className="bg-green-600 rounded-xl py-4 items-center mt-6 shadow-sm active:opacity-80"
                >
                    <Text className="text-white font-semibold text-lg">Update Card</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}