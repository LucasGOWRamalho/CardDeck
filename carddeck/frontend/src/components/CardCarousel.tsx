"use client";
import { CardFront } from "./CardFront";

export function CardCarousel({ cards }: any) {
  if (!cards.length) return <p className="text-gray-500">Nenhum cartão cadastrado.</p>;

  return (
    <div className="flex overflow-x-auto gap-3 p-2">
      {cards.map((c: any) => (
        <div key={c.id} className="shrink-0">
          <CardFront card={c} />
        </div>
      ))}
    </div>
  );
}