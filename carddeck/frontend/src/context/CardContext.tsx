"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Card } from "../types/card";
import { cardsApi } from "../lib/api";

interface CardContextType {
  cards: Card[];
  addCard: (cardData: Parameters<typeof cardsApi.create>[0]) => Promise<void>;
  deleteCard: (id: string) => Promise<void>;
  loadCards: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

export function CardProvider({ children }: { children: ReactNode }) {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carregar cartões do backend ao inicializar
  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    setLoading(true);
    try {
      const cardsFromApi = await cardsApi.getAll();
      setCards(cardsFromApi);
    } catch (err) {
      setError('Erro ao carregar cartões');
      console.error('Erro ao carregar cartões:', err);
    } finally {
      setLoading(false);
    }
  };

  const addCard = async (cardData: Parameters<typeof cardsApi.create>[0]) => {
    setLoading(true);
    try {
      const newCard = await cardsApi.create(cardData);
      setCards(prev => [...prev, newCard]);
    } catch (err) {
      setError('Erro ao adicionar cartão');
      console.error('Erro ao adicionar cartão:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteCard = async (id: string) => {
    setLoading(true);
    try {
      await cardsApi.delete(id);
      setCards(prev => prev.filter(card => card.id !== id));
    } catch (err) {
      setError('Erro ao deletar cartão');
      console.error('Erro ao deletar cartão:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardContext.Provider value={{ 
      cards, 
      addCard, 
      deleteCard, 
      loadCards, 
      loading, 
      error 
    }}>
      {children}
    </CardContext.Provider>
  );
}

export const useCard = () => {
  const ctx = useContext(CardContext);
  if (!ctx) throw new Error("useCard must be used within CardProvider");
  return ctx;
};