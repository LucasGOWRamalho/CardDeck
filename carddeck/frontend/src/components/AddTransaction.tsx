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
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validar valor
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Valor deve ser maior que zero';
    }

    // Validar descrição
    if (!formData.description.trim()) {
      newErrors.description = 'Descrição é obrigatória';
    } else if (formData.description.trim().length < 2) {
      newErrors.description = 'Descrição deve ter pelo menos 2 caracteres';
    }

    // Validar data (não pode ser futura)
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(23, 59, 59, 999); // Fim do dia atual
    
    if (selectedDate > today) {
      newErrors.date = 'Data não pode ser futura';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const newTransaction: Transaction = {
        id: `temp-${Date.now()}`,
        amount: parseFloat(formData.amount),
        description: formData.description.trim(),
        date: formData.date,
        category: formData.category,
        type: formData.type
      };

      console.log('Enviando transação para o backend:', newTransaction);
      
      onTransactionAdded(newTransaction);
      
    } catch (error) {
      console.error('Erro ao adicionar transação:', error);
      alert('Erro ao adicionar transação. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Remover erro do campo quando usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b border-gray-300">
          <h2 className="text-xl font-bold text-gray-900">Nova Transação</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 transition-colors"
            aria-label="Fechar modal"
            disabled={isSubmitting}
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="description" className="block text-sm font-bold text-gray-900 mb-2">
              Descrição *
            </label>
            <input
              id="description"
              type="text"
              required
              value={formData.description}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors placeholder-gray-700 font-medium ${
                errors.description ? 'border-red-600 bg-red-50' : 'border-gray-400 bg-white'
              }`}
              placeholder="O que você comprou?"
              disabled={isSubmitting}
            />
            {errors.description && (
              <p className="text-red-600 text-xs mt-1 font-bold">{errors.description}</p>
            )}
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-bold text-gray-900 mb-2">
              Valor (R$) *
            </label>
            <input
              id="amount"
              type="number"
              step="0.01"
              min="0.01"
              required
              value={formData.amount}
              onChange={(e) => handleFieldChange('amount', e.target.value)}
              className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors placeholder-gray-700 font-medium ${
                errors.amount ? 'border-red-600 bg-red-50' : 'border-gray-400 bg-white'
              }`}
              placeholder="0,00"
              disabled={isSubmitting}
            />
            {errors.amount && (
              <p className="text-red-600 text-xs mt-1 font-bold">{errors.amount}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-bold text-gray-900 mb-2">
                Categoria
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => handleFieldChange('category', e.target.value)}
                className="w-full p-3 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors bg-white text-gray-900 font-medium"
                disabled={isSubmitting}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-bold text-gray-900 mb-2">
                Tipo *
              </label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) => handleFieldChange('type', e.target.value)}
                className="w-full p-3 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors bg-white text-gray-900 font-medium"
                required
                disabled={isSubmitting}
              >
                <option value="credit">Crédito</option>
                <option value="debit">Débito</option>
              </select>
              <p className="text-xs font-semibold text-gray-700 mt-1">
                {formData.type === 'credit' ? 'Usa limite de crédito' : 'Usa saldo disponível'}
              </p>
            </div>
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-bold text-gray-900 mb-2">
              Data *
            </label>
            <input
              id="date"
              type="date"
              required
              value={formData.date}
              onChange={(e) => handleFieldChange('date', e.target.value)}
              className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors font-medium ${
                errors.date ? 'border-red-600 bg-red-50' : 'border-gray-400 bg-white'
              }`}
              disabled={isSubmitting}
            />
            {errors.date && (
              <p className="text-red-600 text-xs mt-1 font-bold">{errors.date}</p>
            )}
          </div>

          <div className="bg-green-100 p-3 rounded-lg border border-green-200">
            <p className="text-sm font-semibold text-green-800">
              <strong>Informação:</strong> As transações estão sendo salvas no servidor.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 py-3 px-4 border-2 border-gray-400 text-gray-800 font-bold rounded-lg hover:bg-gray-50 transition-colors disabled:bg-gray-100 disabled:text-gray-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 px-4 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg transition-colors disabled:bg-blue-400 flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              {isSubmitting ? 'Salvando...' : 'Adicionar Transação'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}