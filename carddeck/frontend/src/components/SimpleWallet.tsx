"use client";
import { Card } from "../types/card";

interface SimpleWalletProps {
  cards: Card[];
}

export function SimpleWallet({ cards }: SimpleWalletProps) {
  return (
    <div className="w-full max-w-md mt-6 bg-gray-100 rounded-xl p-4 shadow-lg border">
      <h3 className="text-gray-700 font-semibold mb-3 flex items-center gap-2">
        <span>👛</span> Minha Carteira Digital
      </h3>
      
      <div className="space-y-2">
        {cards.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-4">
            Sua carteira está vazia
          </p>
        ) : (
          cards.map((card) => (
            <div key={card.id} className="bg-white rounded-lg p-3 shadow-sm border">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${
                    card.brand === 'Visa' ? 'bg-blue-500' : 'bg-purple-500'
                  }`}></div>
                  <span className="text-sm font-medium">{card.brand}</span>
                </div>
                <span className="text-xs text-gray-500">•••• {card.number.slice(-4)}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-600">{card.holderName}</span>
                <span className="text-xs font-semibold">R$ {card.creditLimit.toLocaleString()}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}