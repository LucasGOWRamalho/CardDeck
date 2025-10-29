"use client";
import { Card } from "../types/card";

type CardFormFrontProps = {
  card: Partial<Card>;
  setCard: React.Dispatch<React.SetStateAction<Partial<Card>>>;
  next: () => void;
};

export function CardFormFront({ card, setCard, next }: CardFormFrontProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value, type } = e.target;
    setCard((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    next();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 w-full max-w-md mx-auto bg-white shadow-md p-4 rounded-2xl"
    >
      <input
        type="text"
        placeholder="Nome do titular"
        name="holderName"
        className="border p-2 rounded focus:ring-2 focus:ring-blue-500"
        value={card.holderName || ""}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        placeholder="Número do cartão"
        name="number"
        className="border p-2 rounded focus:ring-2 focus:ring-blue-500"
        value={card.number || ""}
        onChange={handleChange}
        maxLength={19}
        required
      />

      <input
        type="text"
        placeholder="Banco"
        name="bank"
        className="border p-2 rounded focus:ring-2 focus:ring-blue-500"
        value={card.bank || ""}
        onChange={handleChange}
        required
      />

      <label htmlFor="brand" className="sr-only">Bandeira</label>
      <select
        id="brand"
        name="brand"
        className="border p-2 rounded focus:ring-2 focus:ring-blue-500"
        value={card.brand || "Visa"}
        onChange={handleChange}
        required
      >
        <option value="Visa">Visa</option>
        <option value="Elo">Elo</option>
      </select>

      <input
        type="number"
        placeholder="Saldo"
        name="balance"
        className="border p-2 rounded focus:ring-2 focus:ring-blue-500"
        value={card.balance || 0}
        onChange={handleChange}
        min={0}
      />

      <input
        type="number"
        placeholder="Limite de crédito"
        name="creditLimit"
        className="border p-2 rounded focus:ring-2 focus:ring-blue-500"
        value={card.creditLimit || 0}
        onChange={handleChange}
        min={0}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700 transition-colors"
      >
        Próximo
      </button>
    </form>
  );
}