// JÁ ATUALIZADO - Wallet.tsx com botão dentro do card
"use client";
import { Card } from "../types/card";
import { ChevronDown, ChevronUp, CreditCard, Search, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Variants } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { DeleteCardModal } from "./DeleteCardModal";
import { useCard } from "../context/CardContext";

interface WalletProps {
  cards: Card[];
  isOpen: boolean;
  onToggle: () => void;
  onCardSelect: (card: Card) => void;
}

export function Wallet({ cards, isOpen, onToggle, onCardSelect }: WalletProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [cardToDelete, setCardToDelete] = useState<Card | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const walletRef = useRef<HTMLDivElement>(null);
  const { deleteCard } = useCard();

  // Fechar a carteira ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (walletRef.current && !walletRef.current.contains(event.target as Node)) {
        if (isOpen) {
          onToggle();
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onToggle]);

  // Filtrar cartões baseado na pesquisa
  const filteredCards = cards.filter(card =>
    card.holderName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.bank?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.number?.includes(searchTerm) ||
    card.brand?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Animação da carteira abrindo - com tipos corretos
  const walletVariants: Variants = {
    closed: {
      height: "80px",
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    open: {
      height: "400px",
      scale: 1.02,
      rotateX: 5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  };

  // Animação dos cartões saindo da carteira - com tipos corretos
  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20, 
      scale: 0.8,
      rotate: -5 
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }),
    tap: { 
      scale: 0.95,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 17 
      } 
    }
  };

  // Função para lidar com o clique no cabeçalho
  const handleHeaderClick = () => {
    onToggle();
  };

  // Função para lidar com o clique nos cartões (evita fechar a carteira)
  const handleCardClick = (card: Card) => {
    onCardSelect(card);
  };

  // Função para iniciar a exclusão
  const handleDeleteClick = (card: Card, event: React.MouseEvent) => {
    event.stopPropagation(); // Impede que o clique propague para o cartão
    setCardToDelete(card);
    setShowDeleteModal(true);
  };

  // Função para executar a exclusão
  const handleConfirmDelete = async (cardId: string) => {
    await deleteCard(cardId);
    setShowDeleteModal(false);
    setCardToDelete(null);
  };

  return (
    <div className="w-full max-w-md" ref={walletRef}>
      {/* Carteira - Com animação 3D */}
      <motion.div
        className="bg-gradient-to-br from-amber-900 to-amber-700 rounded-2xl shadow-2xl border-4 border-amber-800 p-6 relative overflow-hidden"
        variants={walletVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px"
        }}
      >
        
        {/* Detalhes da carteira fechada */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-amber-600 rounded-full"></div>
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-amber-500 rounded-full"></div>
        
        {/* Cabeçalho da carteira - Agora clicável para abrir/fechar */}
        <div 
          className="flex justify-between items-center mb-4 cursor-pointer"
          onClick={handleHeaderClick}
        >
          <h2 className="text-amber-100 text-lg font-semibold flex items-center gap-2">
            💼 Minha Carteira
            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-amber-200 text-sm">
              {cards.length} cartão{cards.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Conteúdo da carteira aberta */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Barra de pesquisa */}
              {cards.length > 0 && (
                <motion.div 
                  className="mb-4 relative"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="relative">
                    <Search 
                      size={16} 
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400" 
                    />
                    <input
                      type="text"
                      placeholder="Buscar por nome, banco ou número..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-amber-800 text-amber-100 placeholder-amber-300 border border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-400 hover:text-amber-200"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                  {searchTerm && (
                    <p className="text-amber-300 text-xs mt-1">
                      {filteredCards.length} cartão{filteredCards.length !== 1 ? 's' : ''} encontrado{filteredCards.length !== 1 ? 's' : ''}
                    </p>
                  )}
                </motion.div>
              )}

              {/* Área dos cartões - estilo "guardados" */}
              <div className={`relative ${cards.length > 0 ? 'max-h-64 overflow-y-auto' : 'min-h-[280px]'}`}>
                {cards.length === 0 ? (
                  <motion.div
                    className="text-center text-amber-200 py-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <CreditCard size={32} className="mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Nenhum cartão na carteira</p>
                    <p className="text-xs mt-1">Adicione seu primeiro cartão clicando no +</p>
                  </motion.div>
                ) : filteredCards.length === 0 ? (
                  <motion.div
                    className="text-center text-amber-200 py-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Search size={32} className="mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Nenhum cartão encontrado</p>
                    <p className="text-xs mt-1">Tente buscar por outro termo</p>
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-1 gap-3">
                    {filteredCards.map((card, index) => (
                      <motion.div
                        key={card.id}
                        className="relative group"
                        custom={index}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        whileTap="tap"
                      >
                        {/* Cartão estilo "guardado" na carteira */}
                        <div 
                          className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-3 text-white shadow-lg cursor-pointer border-2 border-white/20 hover:border-white/40 transition-all duration-200 relative"
                          onClick={() => handleCardClick(card)}
                        >
                          {/* Botão de excluir - DENTRO do card no canto superior direito */}
                          <button
                            onClick={(e) => handleDeleteClick(card, e)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600 z-10 shadow-lg"
                            title="Excluir cartão"
                          >
                            <Trash2 size={14} />
                          </button>

                          <div className="flex justify-between items-start">
                            <div className="text-xs opacity-80 font-semibold">CARD DECK</div>
                            <div className="text-xs bg-white text-blue-600 px-2 py-1 rounded font-semibold">
                              {card.brand}
                            </div>
                          </div>
                          <div className="mt-2">
                            <p className="text-xs font-mono tracking-widest">
                              •••• •••• •••• {card.number?.slice(-4) || '••••'}
                            </p>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <p className="text-xs font-semibold truncate max-w-[100px]">
                              {card.holderName?.split(' ')[0] || 'TITULAR'}
                            </p>
                            <p className="text-xs opacity-80">
                              {card.bank?.slice(0, 10) || 'BANCO'}...
                            </p>
                          </div>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-[10px] opacity-70">
                              Clique para detalhes
                            </span>
                            <span className="text-[10px] font-semibold">
                              R$ {card.creditLimit.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Rodapé da carteira - só aparece quando aberta e com cartões */}
              {cards.length > 0 && (
                <motion.div 
                  className="flex justify-between items-center mt-4 pt-3 border-t border-amber-600"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="text-amber-200 text-xs">
                    {searchTerm ? `${filteredCards.length} de ` : ''}{cards.length} cartão{cards.length !== 1 ? 's' : ''}
                  </span>
                  <span className="text-amber-300 text-xs">
                    Passe o mouse sobre um cartão para excluir
                  </span>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Estado fechado - mostra preview */}
        {!isOpen && cards.length > 0 && (
          <motion.div 
            className="text-center text-amber-200 py-2 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleHeaderClick}
          >
            <p className="text-sm">Clique para abrir a carteira</p>
            <p className="text-xs mt-1 opacity-70">
              {cards.length} cartão{cards.length !== 1 ? 's' : ''} guardado{cards.length !== 1 ? 's' : ''}
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Modal de Exclusão */}
      {cardToDelete && (
        <DeleteCardModal
          card={cardToDelete}
          onDelete={handleConfirmDelete}
          onClose={() => {
            setShowDeleteModal(false);
            setCardToDelete(null);
          }}
          isOpen={showDeleteModal}
        />
      )}
    </div>
  );
}