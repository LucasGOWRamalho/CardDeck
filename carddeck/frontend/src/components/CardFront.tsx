export function CardFront({ card }: any) {
  return (
    <div className="w-full h-full bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-4 text-white flex flex-col justify-between shadow-xl">
      <div className="text-sm">CARD DECK</div>
      <div>
        <p className="tracking-widest text-lg font-mono">{card.number || "•••• •••• •••• ••••"}</p>
      </div>
      <div className="flex justify-between text-sm">
        <p>{card.holderName || "NOME DO TITULAR"}</p>
      </div>
    </div>
  );
}
