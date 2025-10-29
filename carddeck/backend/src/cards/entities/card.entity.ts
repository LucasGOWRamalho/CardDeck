export class Transaction {
  id: string;
  amount: number;
  description: string;
  date: string;
  category: string;
  type: 'credit' | 'debit';
}

export class Card {
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