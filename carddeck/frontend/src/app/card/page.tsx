"use client";
import { useState } from "react";
import { Card3D } from "../../components/Card3D";
import { CardFormFront } from "../../components/CardFormFront";
import { CardFormBack } from "../../components/CardFormBack";
import { Card } from "../../types/card";

export default function CardPage() {
  const [step, setStep] = useState(1);
  const [card, setCard] = useState<Partial<Card>>({
    holderName: "",
    number: "",
    validThru: "",
    cvv: "",
    brand: "Visa",
    bank: "",
    balance: 0,
    creditLimit: 0,
    cpf: "",
    birthDate: ""
  });

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md">
      <h2 className="text-xl font-semibold">Novo Cartão</h2>
      <Card3D card={card} flipped={step === 2} />
      {step === 1 ? (
        <CardFormFront 
          card={card} 
          setCard={setCard} 
          next={() => setStep(2)} 
        />
      ) : (
        <CardFormBack card={card} setCard={setCard} />      
      )}
    </div>
  );
}