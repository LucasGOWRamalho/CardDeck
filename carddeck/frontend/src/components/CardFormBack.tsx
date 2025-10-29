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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const cardData = {
        holderName: card.holderName || "",
        number: card.number || "",
        validThru: card.validThru || "",
        cvv: card.cvv || "",
        brand: card.brand || "Visa",
        bank: card.bank || "",
        balance: card.balance || 0,
        creditLimit: card.creditLimit || 0,
      };

      await addCard(cardData);
      router.push("/");
    } catch (error) {
      console.error("Erro ao criar cartão:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
      <label className="text-sm text-gray-700">
        Data de Validade
        <input
          type="text"
          placeholder="MM/AA"
          className="border p-2 rounded w-full"
          value={card.validThru || ""}
          onChange={(e) => setCard({ ...card, validThru: e.target.value })}
          required
        />
      </label>

      <label className="text-sm text-gray-700">
        CVV
        <input
          type="text"
          placeholder="123"
          className="border p-2 rounded w-full"
          value={card.cvv || ""}
          onChange={(e) => setCard({ ...card, cvv: e.target.value })}
          maxLength={3}
          required
        />
      </label>

      <label className="text-sm text-gray-700">
        CPF (Opcional)
        <input
          type="text"
          placeholder="000.000.000-00"
          className="border p-2 rounded w-full"
          value={card.cpf || ""}
          onChange={(e) => setCard({ ...card, cpf: e.target.value })}
        />
      </label>

      <label className="text-sm text-gray-700">
        Data de nascimento (Opcional)
        <input
          type="date"
          className="border p-2 rounded w-full"
          value={card.birthDate || ""}
          onChange={(e) => setCard({ ...card, birthDate: e.target.value })}
        />
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="bg-green-600 text-white rounded p-2 hover:bg-green-700 transition-colors disabled:bg-gray-400"
      >
        {submitting ? "Salvando..." : "Concluir Cadastro"}
      </button>
    </form>
  );
}