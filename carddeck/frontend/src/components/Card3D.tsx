"use client";
import { motion } from "framer-motion";
import { CardFront } from "./CardFront";
import { CardBack } from "./CardBack";
import { Card } from "../types/card";

interface Card3DProps {
  card: Partial<Card>;
  flipped: boolean;
}

export function Card3D({ card, flipped }: Card3DProps) {
  return (
    <motion.div
      className="relative w-80 h-48 preserve-3d"
      animate={{ rotateY: flipped ? 180 : 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 backface-hidden">
        <CardFront card={card} />
      </div>
      <div className="absolute inset-0 backface-hidden rotate-y-180">
        <CardBack card={card} />
      </div>
    </motion.div>
  );
}