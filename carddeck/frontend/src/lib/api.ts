const API_BASE_URL = 'http://localhost:3333';

export interface Card {
  id: string;
  holderName: string;
  number: string;
  validThru: string;
  cvv: string;
  brand: 'Visa' | 'Elo';
  bank: string;
  balance: number;
  creditLimit: number;
  availableLimit: number;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string;
  category: string;
  type: 'credit' | 'debit';
}

export const cardsApi = {
  async getAll(): Promise<Card[]> {
    const response = await fetch(`${API_BASE_URL}/cards`);
    if (!response.ok) throw new Error('Erro ao buscar cartões');
    return response.json();
  },

  async create(cardData: Omit<Card, 'id' | 'availableLimit' | 'transactions'>): Promise<Card> {
    const response = await fetch(`${API_BASE_URL}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cardData),
    });
    if (!response.ok) throw new Error('Erro ao criar cartão');
    return response.json();
  },

  async getById(id: string): Promise<Card> {
    const response = await fetch(`${API_BASE_URL}/cards/${id}`);
    if (!response.ok) throw new Error('Erro ao buscar cartão');
    return response.json();
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/cards/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao deletar cartão');
  },

  // Novos métodos para transações
  async addTransaction(cardId: string, transactionData: Omit<Transaction, 'id'>): Promise<Card> {
    const response = await fetch(`${API_BASE_URL}/cards/${cardId}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transactionData),
    });
    if (!response.ok) throw new Error('Erro ao adicionar transação');
    return response.json();
  },

  async getTransactions(cardId: string): Promise<Transaction[]> {
    const response = await fetch(`${API_BASE_URL}/cards/${cardId}/transactions`);
    if (!response.ok) throw new Error('Erro ao buscar transações');
    return response.json();
  }
};