"use client";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AddCardButton() {
  const router = useRouter();
  const [hover, setHover] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => router.push("/card")}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-md transition"
        aria-label="Adicionar novo cartão de crédito"
        title="Adicionar novo cartão de crédito"
      >
        <Plus size={26} />
      </button>
      {hover && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-gray-800 text-white text-sm px-3 py-1 rounded-md shadow-md">
          Adicionar cartão de crédito
        </div>
      )}
    </div>
  );
}