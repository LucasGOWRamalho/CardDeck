"use client";
import { useRouter } from "next/navigation";
import { useCard } from "../context/CardContext";
import { Card } from "../types/card";
import { useState } from "react";

export function CardFormBack({ card, setCard }: { 
  card: Partial<Card>; 
  setCard: React.Dispatch<React.SetStateAction<Partial<Card>>>;
}) {
  const router = useRouter();
  const { addCard } = useCard();
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Função para validar data MM/AA
  const validateValidThru = (value: string): boolean => {
    const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!regex.test(value)) return false;

    const [month, year] = value.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    const cardYear = parseInt(year);
    const cardMonth = parseInt(month);

    // Verificar se a data não é no passado
    if (cardYear < currentYear || (cardYear === currentYear && cardMonth < currentMonth)) {
      return false;
    }

    return true;
  };

  // Função para validar CVV
  const validateCVV = (value: string): boolean => {
    return /^\d{3,4}$/.test(value);
  };

  // Função para validar CPF
  const validateCPF = (cpf: string): boolean => {
    if (!cpf) return true; // CPF é opcional
    
    const cleaned = cpf.replace(/\D/g, '');
    
    // Verificar se tem 11 dígitos
    if (cleaned.length !== 11) return false;
    
    // Verificar se não é uma sequência de números iguais
    if (/^(\d)\1+$/.test(cleaned)) return false;
    
    // Validar primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleaned.charAt(i)) * (10 - i);
    }
    let remainder = 11 - (sum % 11);
    let digit = remainder >= 10 ? 0 : remainder;
    
    if (digit !== parseInt(cleaned.charAt(9))) return false;
    
    // Validar segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleaned.charAt(i)) * (11 - i);
    }
    remainder = 11 - (sum % 11);
    digit = remainder >= 10 ? 0 : remainder;
    
    return digit === parseInt(cleaned.charAt(10));
  };

  // Função para formatar CPF
  const formatCPF = (value: string): string => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
    if (cleaned.length <= 9) return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`;
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9, 11)}`;
  };

  // Função para formatar data de validade
  const formatValidThru = (value: string): string => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 2) return cleaned;
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
  };

  const handleFieldChange = (field: string, value: string) => {
    let processedValue = value;
    let newErrors = { ...errors };

    // Remover erro do campo atual
    delete newErrors[field];

    // Processar e validar campos específicos
    if (field === 'validThru') {
      processedValue = formatValidThru(value);
      if (processedValue.length === 5 && !validateValidThru(processedValue)) {
        newErrors[field] = 'Data de validade inválida ou expirada (MM/AA)';
      }
    } else if (field === 'cvv') {
      processedValue = value.replace(/\D/g, '').slice(0, 4);
      if (processedValue && !validateCVV(processedValue)) {
        newErrors[field] = 'CVV deve ter 3 ou 4 dígitos';
      }
    } else if (field === 'cpf') {
      processedValue = formatCPF(value);
      if (processedValue.length === 14 && !validateCPF(processedValue)) {
        newErrors[field] = 'CPF inválido';
      }
    }

    setErrors(newErrors);
    setCard({ ...card, [field]: processedValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações finais
    const newErrors: Record<string, string> = {};

    if (!card.validThru || !validateValidThru(card.validThru)) {
      newErrors.validThru = 'Data de validade é obrigatória (MM/AA)';
    }

    if (!card.cvv || !validateCVV(card.cvv)) {
      newErrors.cvv = 'CVV é obrigatório (3 ou 4 dígitos)';
    }

    if (card.cpf && !validateCPF(card.cpf)) {
      newErrors.cpf = 'CPF inválido';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);

    try {
      const brand: "Visa" | "Elo" = card.brand === "Elo" ? "Elo" : "Visa";
      const cardData = {
        holderName: card.holderName || "",
        number: card.number || "",
        validThru: card.validThru || "",
        cvv: card.cvv || "",
        brand,
        bank: card.bank || "",
        balance: card.balance || 0,
        creditLimit: card.creditLimit || 0,
        cpf: card.cpf || "",
        birthDate: card.birthDate || "",
      };

      await addCard(cardData);
      router.push("/");
    } catch (error) {
      console.error("Erro ao criar cartão:", error);
      alert('Erro ao criar cartão. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
      <div>
        <label className="text-sm text-gray-700">
          Data de Validade * (MM/AA)
          <input
            type="text"
            placeholder="MM/AA"
            className={`border p-2 rounded w-full focus:ring-2 focus:ring-blue-500 ${
              errors.validThru ? 'border-red-500' : ''
            }`}
            value={card.validThru || ""}
            onChange={(e) => handleFieldChange('validThru', e.target.value)}
            maxLength={5}
            required
            disabled={submitting}
          />
        </label>
        {errors.validThru && (
          <p className="text-red-500 text-xs mt-1">{errors.validThru}</p>
        )}
      </div>

      <div>
        <label className="text-sm text-gray-700">
          CVV * (xxx ou xxxx)
          <input
            type="text"
            placeholder="123"
            className={`border p-2 rounded w-full focus:ring-2 focus:ring-blue-500 ${
              errors.cvv ? 'border-red-500' : ''
            }`}
            value={card.cvv || ""}
            onChange={(e) => handleFieldChange('cvv', e.target.value)}
            maxLength={4}
            required
            disabled={submitting}
          />
        </label>
        {errors.cvv && (
          <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
        )}
      </div>

      <div>
        <label className="text-sm text-gray-700">
          CPF (Opcional) (xxx.xxx.xxx-xx)
          <input
            type="text"
            placeholder="000.000.000-00"
            className={`border p-2 rounded w-full focus:ring-2 focus:ring-blue-500 ${
              errors.cpf ? 'border-red-500' : ''
            }`}
            value={card.cpf || ""}
            onChange={(e) => handleFieldChange('cpf', e.target.value)}
            maxLength={14}
            disabled={submitting}
          />
        </label>
        {errors.cpf && (
          <p className="text-red-500 text-xs mt-1">{errors.cpf}</p>
        )}
      </div>

      <label className="text-sm text-gray-700">
        Data de nascimento (Opcional)
        <input
          type="date"
          className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-500"
          value={card.birthDate || ""}
          onChange={(e) => setCard({ ...card, birthDate: e.target.value })}
          disabled={submitting}
        />
      </label>

      <button
        type="submit"
        disabled={submitting || Object.keys(errors).length > 0}
        className="bg-green-600 text-white rounded p-2 hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {submitting ? "Salvando no servidor..." : 
         Object.keys(errors).length > 0 ? "Corrija os erros" : "Concluir Cadastro"}
      </button>
    </form>
  );
}