export function CardBack({ card }: any) {
  return (
    <div className="w-full h-full bg-gradient-to-r from-gray-700 to-gray-900 rounded-xl p-4 text-white shadow-xl">
      <div className="bg-black h-10 w-full rounded mb-4"></div>
      <div className="text-xs">
        <p><strong>CPF:</strong> {card.cpf || "000.000.000-00"}</p>
        <p><strong>Nascimento:</strong> {card.birthDate || "dd/mm/aaaa"}</p>
      </div>
    </div>
  );
}
