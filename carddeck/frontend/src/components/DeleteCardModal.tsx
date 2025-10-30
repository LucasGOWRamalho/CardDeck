"use client";
import { useState } from "react";
import { Card } from "../types/card";
import { Trash2, X, AlertTriangle } from "lucide-react";

interface DeleteCardModalProps {
  card: Card;
  onDelete: (cardId: string) => Promise<void>;
  onClose: () => void;
  isOpen: boolean;
}

export function DeleteCardModal({ card, onDelete, onClose, isOpen }: DeleteCardModalProps) {
  const [inputValue, setInputValue] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  // Obter os últimos 4 dígitos do cartão
  const lastFourDigits = card.number?.slice(-4) || "••••";

  const handleDelete = async () => {
    if (inputValue !== lastFourDigits) {
      setError(`Digite ${lastFourDigits} para confirmar a exclusão`);
      return;
    }

    setIsDeleting(true);
    setError("");

    try {
      await onDelete(card.id);
      onClose();
    } catch (err) {
      setError("Erro ao excluir cartão. Tente novamente.");
      console.error("Erro ao excluir cartão:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClose = () => {
    setInputValue("");
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Cabeçalho */}
        <div className="flex items-center gap-3 p-6 border-b border-red-200 bg-red-50 rounded-t-2xl">
          <div className="bg-red-100 p-2 rounded-full">
            <AlertTriangle className="text-red-600" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-red-800">Excluir Cartão</h2>
            <p className="text-red-600 text-sm">Esta ação não pode ser desfeita</p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            title="Fechar"
            aria-label="Fechar"
            className="ml-auto text-red-500 hover:text-red-700 transition-colors"
            disabled={isDeleting}
          >
            <X size={24} />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-6 space-y-4">
          {/* Informações do cartão */}
          <div className="bg-gray-50 rounded-lg p-4 border">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-semibold text-gray-800">{card.holderName}</p>
                <p className="text-sm text-gray-600">{card.bank}</p>
              </div>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
                {card.brand}
              </span>
            </div>
            <p className="text-sm text-gray-700 font-mono">
              •••• •••• •••• {lastFourDigits}
            </p>
          </div>

          {/* Aviso importante */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-700 font-semibold flex items-center gap-2">
              <AlertTriangle size={16} />
              Atenção!
            </p>
            <p className="text-xs text-red-600 mt-1">
              Todas as transações associadas a este cartão serão permanentemente excluídas.
            </p>
          </div>

          {/* Campo de confirmação */}
          <div>
            <label htmlFor="confirmDelete" className="block text-sm font-medium text-gray-700 mb-2">
              Digite <span className="font-mono bg-gray-100 px-1 rounded">{
                lastFourDigits}</span> para confirmar:
            </label>
            <input
              id="confirmDelete"
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setError("");
              }}
              placeholder={`Digite ${lastFourDigits}`}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 font-mono text-center text-lg"
              maxLength={4}
              disabled={isDeleting}
            />
            {error && (
              <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                <AlertTriangle size={14} />
                {error}
              </p>
            )}
          </div>

          {/* Botões */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isDeleting}
              className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:bg-gray-100 disabled:text-gray-400"
            >
              Cancelar
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting || inputValue !== lastFourDigits}
              className="flex-1 py-3 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:bg-red-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Trash2 size={20} />
              {isDeleting ? 'Excluindo...' : 'Excluir Cartão'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}