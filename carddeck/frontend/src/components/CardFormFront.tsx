"use client";
import { Card } from "../types/card";
import { useState } from "react";

type CardFormFrontProps = {
  card: Partial<Card>;
  setCard: React.Dispatch<React.SetStateAction<Partial<Card>>>;
  next: () => void;
};

export function CardFormFront({ card, setCard, next }: CardFormFrontProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Função para validar nome (apenas letras e espaços)
  const validateName = (name: string): boolean => {
    const nameRegex = /^[A-Za-zÀ-ÿ\s]+$/;
    return nameRegex.test(name.trim());
  };

  // Função para formatar número do cartão
  const formatCardNumber = (value: string): string => {
    const cleaned = value.replace(/\D/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ').slice(0, 19) : '';
  };

  // Função para validar número do cartão
  const validateCardNumber = (number: string): boolean => {
    const cleaned = number.replace(/\s/g, '');
    return /^\d{16}$/.test(cleaned);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value, type } = e.target;
    let processedValue = value;
    let newErrors = { ...errors };

    // Remover erro do campo atual
    delete newErrors[name];

    // Processar valores específicos
    if (name === 'holderName') {
      if (value && !validateName(value)) {
        newErrors[name] = 'Nome deve conter apenas letras';
      }
    } else if (name === 'number') {
      processedValue = formatCardNumber(value);
      if (processedValue.replace(/\s/g, '').length === 16 && !validateCardNumber(processedValue)) {
        newErrors[name] = 'Número do cartão deve ter 16 dígitos';
      }
    } else if (name === 'balance' || name === 'creditLimit') {
      // Se o campo for limpo, manter vazio
      if (value === '') {
        processedValue = '';
      } else {
        const numValue = Number(value);
        if (numValue < 0) {
          processedValue = '0';
        }
      }
    }

    setErrors(newErrors);
    setCard((prev) => ({
      ...prev,
      [name]: type === "number" && processedValue !== '' ? Number(processedValue) : processedValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações finais antes de prosseguir
    const newErrors: Record<string, string> = {};

    if (!card.holderName || !validateName(card.holderName)) {
      newErrors.holderName = 'Nome do titular é obrigatório e deve conter apenas letras';
    }

    if (!card.number || !validateCardNumber(card.number)) {
      newErrors.number = 'Número do cartão deve ter 16 dígitos';
    }

    if (!card.bank?.trim()) {
      newErrors.bank = 'Banco é obrigatório';
    }

    // Validar que saldo e limite são números válidos e preenchidos
    if (
      card.balance === null ||
      card.balance === undefined ||
      (typeof card.balance === 'string' && card.balance === '') ||
      isNaN(Number(card.balance))
    ) {
      newErrors.balance = 'Saldo é obrigatório';
    }

    if (
      card.creditLimit === null ||
      card.creditLimit === undefined ||
      (typeof card.creditLimit === 'string' && card.creditLimit === '') ||
      isNaN(Number(card.creditLimit))
    ) {
      newErrors.creditLimit = 'Limite de crédito é obrigatório';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    next();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-md mx-auto bg-white shadow-lg p-6 rounded-2xl border border-gray-200"
    >
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Nome do titular *
        </label>
        <input
          type="text"
          placeholder="Digite o nome completo"
          name="holderName"
          className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-600 ${
            errors.holderName ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
          }`}
          value={card.holderName || ""}
          onChange={handleChange}
          required
        />
        {errors.holderName && (
          <p className="text-red-500 text-xs mt-1 font-medium">{errors.holderName}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Número do cartão *
        </label>
        <input
          type="text"
          placeholder="xxxx xxxx xxxx xxxx"
          name="number"
          className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-mono placeholder-gray-600 ${
            errors.number ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
          }`}
          value={card.number || ""}
          onChange={handleChange}
          maxLength={19}
          required
        />
        {errors.number && (
          <p className="text-red-500 text-xs mt-1 font-medium">{errors.number}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Banco *
        </label>
        <input
          type="text"
          placeholder="Nome do banco"
          name="bank"
          className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-600 ${
            errors.bank ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
          }`}
          value={card.bank || ""}
          onChange={handleChange}
          required
        />
        {errors.bank && (
          <p className="text-red-500 text-xs mt-1 font-medium">{errors.bank}</p>
        )}
      </div>

      <div>
        <label htmlFor="brand" className="block text-sm font-semibold text-gray-800 mb-2">
          Bandeira *
        </label>
        <select
          id="brand"
          name="brand"
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-gray-800"
          value={card.brand || "Visa"}
          onChange={handleChange}
          required
        >
          <option value="Visa">Visa</option>
          <option value="Elo">Elo</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Saldo (Débito) *
          </label>
          <input
            type="number"
            placeholder="Digite o valor"
            name="balance"
            className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-600 ${
              errors.balance ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
            }`}
            value={card.balance === null || card.balance === undefined || card.balance === 0 ? '' : card.balance}
            onChange={handleChange}
            min={0}
            step="0.01"
            required
          />
          {errors.balance && (
            <p className="text-red-500 text-xs mt-1 font-medium">{errors.balance}</p>
          )}
          <p className="text-xs text-gray-600 mt-1">💰 Valor disponível para débito</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Limite (Crédito) *
          </label>
          <input
            type="number"
            placeholder="Digite o valor"
            name="creditLimit"
            className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-600 ${
              errors.creditLimit ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
            }`}
            value={card.creditLimit === null || card.creditLimit === undefined || card.creditLimit === 0 ? '' : card.creditLimit}
            onChange={handleChange}
            min={0}
            step="0.01"
            required
          />
          {errors.creditLimit && (
            <p className="text-red-500 text-xs mt-1 font-medium">{errors.creditLimit}</p>
          )}
          <p className="text-xs text-gray-600 mt-1">💳 Valor disponível para crédito</p>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed mt-2"
        disabled={Object.keys(errors).length > 0}
      >
        {Object.keys(errors).length > 0 ? 'Corrija os erros' : 'Continuar →'}
      </button>
    </form>
  );
}