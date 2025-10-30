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
      // Garantir que valores numéricos sejam positivos
      const numValue = Number(value);
      if (numValue < 0) {
        processedValue = '0';
      }
    }

    setErrors(newErrors);
    setCard((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(processedValue) : processedValue,
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

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    next();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 w-full max-w-md mx-auto bg-white shadow-md p-4 rounded-2xl"
    >
      <div>
        <input
          type="text"
          placeholder="Nome do titular *"
          name="holderName"
          className={`border p-2 rounded focus:ring-2 focus:ring-blue-500 w-full ${
            errors.holderName ? 'border-red-500' : ''
          }`}
          value={card.holderName || ""}
          onChange={handleChange}
          required
        />
        {errors.holderName && (
          <p className="text-red-500 text-xs mt-1">{errors.holderName}</p>
        )}
      </div>

      <div>
        <input
          type="text"
          placeholder="Número do cartão * (xxxx xxxx xxxx xxxx)"
          name="number"
          className={`border p-2 rounded focus:ring-2 focus:ring-blue-500 w-full ${
            errors.number ? 'border-red-500' : ''
          }`}
          value={card.number || ""}
          onChange={handleChange}
          maxLength={19}
          required
        />
        {errors.number && (
          <p className="text-red-500 text-xs mt-1">{errors.number}</p>
        )}
      </div>

      <div>
        <input
          type="text"
          placeholder="Banco *"
          name="bank"
          className={`border p-2 rounded focus:ring-2 focus:ring-blue-500 w-full ${
            errors.bank ? 'border-red-500' : ''
          }`}
          value={card.bank || ""}
          onChange={handleChange}
          required
        />
        {errors.bank && (
          <p className="text-red-500 text-xs mt-1">{errors.bank}</p>
        )}
      </div>

      <label htmlFor="brand" className="sr-only">Bandeira</label>
      <select
        id="brand"
        name="brand"
        className="border p-2 rounded focus:ring-2 focus:ring-blue-500 w-full"
        value={card.brand || "Visa"}
        onChange={handleChange}
        required
      >
        <option value="Visa">Visa</option>
        <option value="Elo">Elo</option>
      </select>

      <div>
        <label className="text-sm text-gray-600">Saldo (Débito) *</label>
        <input
          type="number"
          placeholder="Saldo disponível"
          name="balance"
          className="border p-2 rounded focus:ring-2 focus:ring-blue-500 w-full"
          value={card.balance || 0}
          onChange={handleChange}
          min={0}
          step="0.01"
          required
        />
        <p className="text-xs text-gray-500 mt-1">Valor disponível para débito</p>
      </div>

      <div>
        <label className="text-sm text-gray-600">Limite de crédito *</label>
        <input
          type="number"
          placeholder="Limite de crédito"
          name="creditLimit"
          className="border p-2 rounded focus:ring-2 focus:ring-blue-500 w-full"
          value={card.creditLimit || 0}
          onChange={handleChange}
          min={0}
          step="0.01"
          required
        />
        <p className="text-xs text-gray-500 mt-1">Valor disponível para crédito</p>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={Object.keys(errors).length > 0}
      >
        {Object.keys(errors).length > 0 ? 'Corrija os erros' : 'Próximo'}
      </button>
    </form>
  );
}