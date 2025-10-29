"use client";
import { useState } from "react";
import { Transaction } from "../types/card";
import { Plus, X } from "lucide-react";

interface AddTransactionProps {
  cardId: string;
  onTransactionAdded: (transaction: Transaction) => void;
  onClose: () => void;
}

export function AddTransaction({ cardId, onTransactionAdded, onClose }: AddTransactionProps) {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: 'compras',
    type: 'credit' as 'credit' | 'debit',
    date: new Date().toISOString().split('T')[0]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'compras',
    'alimentação',
    'transporte',
    'saúde',
    'entretenimento',
    'educação',
    'casa',
    'outros'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      alert('Por favor, insira um valor válido maior que zero.');
      return;
    }

    if (!formData.description.trim()) {
      alert('Por favor, insira uma descrição para a transação.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simular uma requisição API com timeout
      await new Promise(resolve => setTimeout(resolve, 500));

      // Criar nova transação localmente
      const newTransaction: Transaction = {
        id: `transaction-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        amount: parseFloat(formData.amount),
        description: formData.description.trim(),
        date: formData.date,
        category: formData.category,
        type: formData.type
      };

      console.log('Nova transação criada:', newTransaction);
      
      // Chamar a função de callback para adicionar a transação
      onTransactionAdded(newTransaction);
      
      // Fechar o modal
      onClose();
      
    } catch (error) {
      console.error('Erro ao adicionar transação:', error);
      alert('Erro ao adicionar transação. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Nova Transação</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Fechar modal"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Descrição *
            </label>
            <input
              id="description"
              type="text"
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="O que você comprou?"
            />
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
              Valor (R$) *
            </label>
            <input
              id="amount"
              type="number"
              step="0.01"
              min="0.01"
              required
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0,00"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Categoria
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                Tipo *
              </label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'credit' | 'debit' })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="credit">Crédito</option>
                <option value="debit">Débito</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Data *
            </label>
            <input
              id="date"
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>Informação:</strong> As transações estão sendo salvas localmente no navegador.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              {isSubmitting ? 'Adicionando...' : 'Adicionar Transação'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}