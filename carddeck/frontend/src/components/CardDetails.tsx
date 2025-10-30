"use client";
import { Card, Transaction } from "../types/card";
import { ArrowLeft, CreditCard, Building, DollarSign, Calendar, User, Shield, Plus, TrendingUp, Receipt, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { AddTransaction } from "./AddTransaction";
import { cardsApi } from "../lib/api";

interface CardDetailsProps {
  card: Card;
  onBack: () => void;
  onCardUpdate?: (updatedCard: Card) => void;
}

export function CardDetails({ card, onBack, onCardUpdate }: CardDetailsProps) {
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [currentCard, setCurrentCard] = useState<Card>(card);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Carregar transações do BACKEND quando o componente montar
  useEffect(() => {
    if (card?.id) {
      loadTransactions();
    }
  }, [card]);

  const loadTransactions = async () => {
    setLoading(true);
    try {
      const transactionsFromApi = await cardsApi.getTransactions(card.id);
      setTransactions(transactionsFromApi);
      
      // Atualizar o card com as transações do backend
      const updatedCard = {
        ...card,
        transactions: transactionsFromApi
      };
      setCurrentCard(updatedCard);
    } catch (error) {
      console.error('Erro ao carregar transações:', error);
      // Fallback para transações locais se houver
      setTransactions(card.transactions || []);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    setRefreshing(true);
    await loadTransactions();
    setRefreshing(false);
  };

  // Verificar se o card existe antes de renderizar
  if (!card) {
    return (
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="text-sm">Voltar para carteira</span>
          </button>
        </div>
        <div className="p-6 text-center">
          <p className="text-gray-500">Cartão não encontrado</p>
        </div>
      </div>
    );
  }

  // Função para lidar com nova transação adicionada
  const handleTransactionAdded = async (newTransaction: Transaction) => {
    try {
      // Salvar no BACKEND
      const updatedCard = await cardsApi.addTransaction(card.id, {
        amount: newTransaction.amount,
        description: newTransaction.description,
        date: newTransaction.date,
        category: newTransaction.category,
        type: newTransaction.type
      });
      
      // Recarregar os dados do backend para garantir sincronização
      await loadTransactions();
      
      // Notificar componente pai sobre a atualização
      if (onCardUpdate) {
        onCardUpdate(updatedCard);
      }
      
      setShowAddTransaction(false);
    } catch (error) {
      console.error('Erro ao salvar transação:', error);
      alert('Erro ao salvar transação no servidor');
    }
  };

  // Verificar se as propriedades necessárias existem
  const safeCard = currentCard || card;

  // Calcular totais BASEADOS NAS TRANSAÇÕES DO BACKEND
  const totalSpent = transactions.reduce((total, transaction) => total + transaction.amount, 0);
  const creditTransactions = transactions.filter(t => t.type === 'credit');
  const debitTransactions = transactions.filter(t => t.type === 'debit');
  const totalCredit = creditTransactions.reduce((total, transaction) => total + transaction.amount, 0);
  const totalDebit = debitTransactions.reduce((total, transaction) => total + transaction.amount, 0);

  // Calcular limite disponível e saldo atualizado USANDO DADOS DO BACKEND
  const availableLimit = (safeCard.creditLimit || 0) - totalCredit;
  const currentBalance = (safeCard.balance || 0) - totalDebit;

  // Verificar se está positivo ou negativo
  const isPositive = currentBalance >= 0;
  const isCreditAvailable = availableLimit >= 0;

  if (loading) {
    return (
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="text-sm">Voltar para carteira</span>
          </button>
        </div>
        <div className="p-12 text-center">
          <Loader2 className="animate-spin mx-auto mb-4 text-blue-600" size={32} />
          <p className="text-gray-600">Carregando dados do cartão...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* Cabeçalho */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <div className="flex justify-between items-start mb-4">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft size={16} />
              <span className="text-sm">Voltar para carteira</span>
            </button>
            <div className="flex gap-2">
              <button
                onClick={refreshData}
                disabled={refreshing}
                className="bg-white/20 text-white hover:bg-white/30 rounded-full px-4 py-2 text-sm font-semibold flex items-center gap-2 transition-colors disabled:opacity-50"
              >
                {refreshing ? <Loader2 size={16} className="animate-spin" /> : '↻'}
                Atualizar
              </button>
              <button
                onClick={() => setShowAddTransaction(true)}
                className="bg-white text-blue-600 hover:bg-blue-50 rounded-full px-4 py-2 text-sm font-semibold flex items-center gap-2 transition-colors"
              >
                <Plus size={16} />
                Adicionar Gasto
              </button>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Detalhes do Cartão</h2>
            <div className="flex items-center gap-2">
              <CreditCard size={24} />
              <span className="text-sm bg-white/20 px-2 py-1 rounded">
                {transactions.length} transações
              </span>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Cartão Visual */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white shadow-lg mb-6">
            <div className="flex justify-between items-start mb-6">
              <div className="text-sm opacity-80">CARD DECK</div>
              <div className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                {safeCard.brand}
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-xl font-mono tracking-widest">
                {safeCard.number?.replace(/(.{4})/g, "$1 ").trim() || '•••• •••• •••• ••••'}
              </p>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm opacity-80">Titular</p>
                <p className="font-semibold">{safeCard.holderName || 'Nome não disponível'}</p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-80">Validade</p>
                <p className="font-semibold">{safeCard.validThru || 'MM/AA'}</p>
              </div>
            </div>
          </div>

          {/* Informações Detalhadas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <User className="text-blue-600" size={20} />
                Informações do Titular
              </h3>
              
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <User className="text-blue-600" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Titular</p>
                  <p className="font-semibold">{safeCard.holderName || 'Nome não disponível'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Building className="text-blue-600" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Banco</p>
                  <p className="font-semibold">{safeCard.bank || 'Banco não informado'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Shield className="text-blue-600" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Bandeira</p>
                  <p className="font-semibold">{safeCard.brand || 'Visa'}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <DollarSign className="text-green-600" size={20} />
                Informações Financeiras
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className={`flex items-center gap-3 p-3 rounded-lg ${
                  isPositive ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                }`}>
                  <DollarSign className={isPositive ? "text-green-600" : "text-red-600"} size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Saldo Atual</p>
                    <p className={`font-semibold ${isPositive ? 'text-green-700' : 'text-red-700'}`}>
                      R$ {currentBalance.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      {isPositive ? '✅ Positivo' : '❌ Negativo'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <CreditCard className="text-purple-600" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Limite Total</p>
                    <p className="font-semibold">R$ {safeCard.creditLimit?.toLocaleString() || '0'}</p>
                  </div>
                </div>
              </div>

              <div className={`flex items-center gap-3 p-3 rounded-lg ${
                isCreditAvailable ? 'bg-blue-50 border border-blue-200' : 'bg-red-50 border border-red-200'
              }`}>
                <TrendingUp className={isCreditAvailable ? "text-blue-600" : "text-red-600"} size={20} />
                <div>
                  <p className="text-sm text-gray-600">Limite Disponível</p>
                  <p className={`font-semibold ${isCreditAvailable ? 'text-blue-700' : 'text-red-700'}`}>
                    R$ {availableLimit.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    {isCreditAvailable ? '✅ Disponível' : '❌ Sem limite'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="text-orange-600" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Validade</p>
                  <p className="font-semibold">{safeCard.validThru || 'MM/AA'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Seção de Transações */}
          <div className="border-t pt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Receipt className="text-blue-600" size={20} />
                Histórico de Transações
              </h3>
              <div className="text-sm text-gray-600">
                Total Gasto: R$ {totalSpent.toLocaleString()}
              </div>
            </div>

            {/* Resumo dos gastos */}
            {transactions.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-sm text-blue-700">Crédito</p>
                  <p className="font-semibold text-blue-900">R$ {totalCredit.toLocaleString()}</p>
                  <p className="text-xs text-blue-600">{creditTransactions.length} transação{creditTransactions.length !== 1 ? 'es' : ''}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-sm text-green-700">Débito</p>
                  <p className="font-semibold text-green-900">R$ {totalDebit.toLocaleString()}</p>
                  <p className="text-xs text-green-600">{debitTransactions.length} transação{debitTransactions.length !== 1 ? 'es' : ''}</p>
                </div>
              </div>
            )}

            {/* Lista de transações */}
            {transactions.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <Receipt className="mx-auto mb-2 text-gray-400" size={32} />
                <p className="text-gray-500">Nenhuma transação registrada</p>
                <p className="text-sm text-gray-400 mt-1">Adicione sua primeira transação</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {transactions
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((transaction) => (
                    <div
                      key={transaction.id}
                      className={`p-3 rounded-lg border ${
                        transaction.type === 'credit' 
                          ? 'bg-blue-50 border-blue-200' 
                          : 'bg-green-50 border-green-200'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">{transaction.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              transaction.type === 'credit'
                                ? 'bg-blue-200 text-blue-800'
                                : 'bg-green-200 text-green-800'
                            }`}>
                              {transaction.type === 'credit' ? 'CRÉDITO' : 'DÉBITO'}
                            </span>
                            <span className="text-xs text-gray-600 capitalize">{transaction.category}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${
                            transaction.type === 'credit' ? 'text-blue-700' : 'text-green-700'
                          }`}>
                            - R$ {transaction.amount.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(transaction.date).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Adicionar Transação */}
      {showAddTransaction && (
        <AddTransaction
          cardId={safeCard.id}
          onTransactionAdded={handleTransactionAdded}
          onClose={() => setShowAddTransaction(false)}
        />
      )}
    </>
  );
}