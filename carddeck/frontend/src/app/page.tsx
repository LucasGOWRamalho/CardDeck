"use client";
import { useCard } from "../context/CardContext";
import { AddCardButton } from "../components/AddCardButton";
import { Wallet } from "../components/Wallet";
import { CardDetails } from "../components/CardDetails";
import { useState } from "react";
import { Card } from "../types/card";

export default function HomePage() {
  const { cards } = useCard();
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  const toggleWallet = () => {
    setIsWalletOpen(!isWalletOpen);
  };

  const handleCardSelect = (card: Card) => {
    setSelectedCard(card);
  };

  const handleBackToWallet = () => {
    setSelectedCard(null);
  };

  return (
    <main className="flex flex-col items-center gap-6 w-full max-w-md min-h-screen">
      {/* Cabeçalho */}
      <div className="text-center mt-8">
        <h1 className="text-3xl font-semibold">💳 CardDeck</h1>
        <p className="text-gray-600 text-sm mt-1">
          {selectedCard ? "Detalhes do cartão" : "Clique na carteira para ver seus cartões"}
        </p>
      </div>

      {/* Espaço central - Botão de adicionar (só mostra quando não há cartão selecionado) */}
      {!selectedCard && (
        <div className="flex-grow flex items-center justify-center">
          <AddCardButton />
        </div>
      )}

      {/* Carteira ou Detalhes do Cartão */}
      <div className="w-full mb-8">
        {selectedCard ? (
          <CardDetails 
            card={selectedCard} 
            onBack={handleBackToWallet}
          />
        ) : (
          <Wallet 
            cards={cards} 
            isOpen={isWalletOpen}
            onToggle={toggleWallet}
            onCardSelect={handleCardSelect}
          />
        )}
      </div>
    </main>
  );
}