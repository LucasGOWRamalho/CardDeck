"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Card } from "../types/card";

interface CardContextType {
  cards: Card[];
  addCard: (cardData: Omit<Card, 'id'>) => void;
  deleteCard: (id: string) => void;
  loading: boolean;
  error: string | null;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

export function CardProvider({ children }: { children: ReactNode }) {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carregar do localStorage ao inicializar
  useEffect(() => {
    const savedCards = localStorage.getItem('carddeck-cards');
    if (savedCards) {
      setCards(JSON.parse(savedCards));
    }
  }, []);

  const addCard = (cardData: Omit<Card, 'id'>) => {
    setLoading(true);
    try {
      const newCard: Card = {
        id: crypto.randomUUID(),
        ...cardData
      };
      const updatedCards = [...cards, newCard];
      setCards(updatedCards);
      localStorage.setItem('carddeck-cards', JSON.stringify(updatedCards));
    } catch (err) {
      setError('Erro ao adicionar cartão');
      console.error('Erro ao adicionar cartão:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteCard = (id: string) => {
    setLoading(true);
    try {
      const updatedCards = cards.filter(card => card.id !== id);
      setCards(updatedCards);
      localStorage.setItem('carddeck-cards', JSON.stringify(updatedCards));
    } catch (err) {
      setError('Erro ao deletar cartão');
      console.error('Erro ao deletar cartão:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardContext.Provider value={{ cards, addCard, deleteCard, loading, error }}>
      {children}
    </CardContext.Provider>
  );
}

export const useCard = () => {
  const ctx = useContext(CardContext);
  if (!ctx) throw new Error("useCard must be used within CardProvider");
  return ctx;
};