import { CorporateTemplate } from '@/components/templates/CorporateTemplate';
import { useCardsStore } from '@/store/cardStore';
import * as FileSystem from 'expo-file-system/legacy';
import * as Print from 'expo-print';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Sharing from 'expo-sharing';
import { SymbolView } from 'expo-symbols';
import { Alert, Pressable, ScrollView, Share, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function CardDetailsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { cards, deleteCard, toggleFavorite } = useCardsStore();

    const card = cards.find(c => c.id === id);

    if (!card) {
        return (
            <View className="flex-1 items-center justify-center bg-gray-50">
                <Text className="text-gray-500">Card not found</Text>
            </View>
        );
    }

    const vCardData = `BEGIN:VCARD\nVERSION:3.0\nFN:${card.name}\nTITLE:${card.title}\nORG:${card.company}\nTEL:${card.phone}\nEMAIL:${card.email}\nURL:${card.website}\nEND:VCARD`;

    const handleDelete = () => {
        Alert.alert('Delete Card', 'Are you sure you want to delete this card?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete', style: 'destructive',
                onPress: () => {
                    deleteCard(card.id);
                    router.back();
                }
            }
        ]
        );
    };

    const exportToPDF = async () => {
        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    @page { margin: 20px; }
                    body { font-family: sans-serif; background-color: #f9fafb; margin: 0; padding: 20px; display: flex; justify-content: center; }
                </style>
            </head>
            <body>
                <div style="background: white; padding: 40px; border-radius: 16px; border: 1px solid #e5e7eb; width: 100%; max-width: 500px; text-align: center;">
                    <h1 style="color: #111827; margin-bottom: 8px; font-size: 32px;">${card.name}</h1>
                    <h3 style="color: #2563EB; margin-top: 0; font-size: 20px;">${card.title}</h3>
                    ${card.company ? `<p style="color: #4B5563; font-size: 18px;">${card.company}</p>` : ''}
                    <div style="margin-top: 32px; text-align: left; background-color: #f3f4f6; padding: 20px; border-radius: 12px;">
                        ${card.email ? `<p style="margin: 8px 0; color: #374151;"><strong>Email:</strong> ${card.email}</p>` : ''}
                        ${card.phone ? `<p style="margin: 8px 0; color: #374151;"><strong>Phone:</strong> ${card.phone}</p>` : ''}
                        ${card.website ? `<p style="margin: 8px 0; color: #374151;"><strong>Website:</strong> ${card.website}</p>` : ''}
                    </div>
                    <div style="margin-top: 32px; text-align: center;">
                        <p style="color: #111827; font-weight: 600; margin-bottom: 12px;">Scan to Save Contact</p>
                        <img src="https://quickchart.io/qr?text=${encodeURIComponent(vCardData)}&size=200" width="150" height="150" />
                    </div>
                </div>
            </body>
            </html>
        `;
        try {
            const { base64 } = await Print.printToFileAsync({ html, base64: true });

            const pdfName = `${card.name.replace(/[^a-zA-Z0-9]/g, '_')}_BusinessCard.pdf`;
            const newUri = `${FileSystem.documentDirectory}${pdfName}`;

            // Write the base64 data directly to avoid Android cache readability issues
            await FileSystem.writeAsStringAsync(newUri, base64 ?? '', { encoding: 'base64' });

            await Sharing.shareAsync(newUri, {
                UTI: 'com.adobe.pdf',
                mimeType: 'application/pdf'
            });
        } catch (err: any) {
            console.error("PDF Export Error: ", err);
            Alert.alert("Error", `Could not generate or share PDF: ${err.message || err}`);
        }
    };

    const shareCard = async () => {
        try {
            const link = card.website || `https://bcard.app/c/${card.id}`;
            await Share.share({
                message: `Check out my business card: ${link}`,
            });
        } catch (err: any) {
            console.error("Share Error: ", err);
            Alert.alert("Error", `Could not share card: ${err.message || err}`);
        }
    };

    return (
        <ScrollView className="flex-1 bg-gray-50">
            <View className="p-4 gap-y-6">
                <CorporateTemplate card={card} />

                <View className="bg-white rounded-2xl p-6 items-center shadow-sm border border-gray-100">
                    <Text className="font-semibold text-gray-900 mb-4">Scan to Save Contact</Text>
                    <QRCode value={vCardData} size={200} color="black" backgroundColor="white" />
                </View>

                <View className="flex-row flex-wrap gap-4">
                    <Pressable
                        onPress={() => toggleFavorite(card.id)}
                        className={`flex-1 min-w-[45%] py-3 rounded-xl items-center flex-row justify-center gap-x-2 active:opacity-80 ${card.isFavorite ? 'bg-yellow-100' : 'bg-gray-200'}`}
                    >
                        <SymbolView name={card.isFavorite ? "star.fill" : "star"} size={20} tintColor={card.isFavorite ? "#EAB308" : "#4B5563"} />
                        <Text className={`font-medium ${card.isFavorite ? 'text-yellow-700' : 'text-gray-700'}`}>Favorite</Text>
                    </Pressable>
                    <Pressable onPress={shareCard} className="flex-1 min-w-[45%] bg-blue-100 py-3 rounded-xl items-center flex-row justify-center gap-x-2 active:opacity-80">
                        <SymbolView name="square.and.arrow.up" size={20} tintColor="#2563EB" />
                        <Text className="text-blue-700 font-medium">Share</Text>
                    </Pressable>
                    <Pressable onPress={() => router.push(`/edit/${card.id}`)} className="flex-1 min-w-[45%] bg-green-100 py-3 rounded-xl items-center flex-row justify-center gap-x-2 active:opacity-80">
                        <SymbolView name="pencil" size={20} tintColor="#16A34A" />
                        <Text className="text-green-700 font-medium">Edit</Text>
                    </Pressable>
                    <Pressable onPress={exportToPDF} className="w-full bg-gray-800 py-3 rounded-xl items-center flex-row justify-center gap-x-2 active:opacity-80">
                        <SymbolView name="doc.fill" size={20} tintColor="#ffffff" />
                        <Text className="text-white font-medium">Export to PDF</Text>
                    </Pressable>
                    <Pressable onPress={handleDelete} className="w-full bg-red-100 py-3 rounded-xl items-center flex-row justify-center gap-x-2 active:opacity-80">
                        <SymbolView name="trash" size={20} tintColor="#DC2626" />
                        <Text className="text-red-700 font-medium">Delete</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    );
}