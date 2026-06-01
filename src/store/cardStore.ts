import { CardRepository } from '@/database/sqlite';
import { BusinessCard } from '@/types';
import { create } from 'zustand';

interface CardsState {
    cards: BusinessCard[];
    isLoading: boolean;
    loadCards: () => void;
    addCard: (card: BusinessCard) => void;
    updateCard: (id: string, card: Partial<BusinessCard>) => void;
    deleteCard: (id: string) => void;
    toggleFavorite: (id: string) => void;
    themePreference: 'light' | 'dark' | 'system';
    setThemePreference: (theme: 'light' | 'dark' | 'system') => void;
}

export const useCardsStore = create<CardsState>((set) => ({
    cards: [],
    isLoading: true,

    themePreference: 'system',
    setThemePreference: (themePreference) => set({ themePreference }),

    loadCards: () => {
        try {
            const cards = CardRepository.getAll();
            set({ cards, isLoading: false });
        } catch (error) {
            console.error("Failed to load cards", error);
            set({ isLoading: false });
        }
    },

    addCard: (card) => {
        CardRepository.add(card);
        set((state) => ({ cards: [card, ...state.cards] }));
    },

    updateCard: (id, card) => {
        CardRepository.update(id, card);
        set((state) => ({
            cards: state.cards.map((c) => (c.id === id ? { ...c, ...card, updatedAt: Date.now() } : c))
        }));
    },

    deleteCard: (id) => {
        CardRepository.delete(id);
        set((state) => ({
            cards: state.cards.filter((c) => c.id !== id),
        }));
    },

    toggleFavorite: (id) => {
        set((state) => {
            const card = state.cards.find(c => c.id === id);
            if (card) {
                CardRepository.toggleFavorite(id, !card.isFavorite);
            }
            return {
                cards: state.cards.map(c =>
                    c.id === id ? { ...c, isFavorite: !c.isFavorite } : c
                )
            };
        });
    },
}));
