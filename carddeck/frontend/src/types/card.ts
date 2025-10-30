export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string;
  category: string;
  type: 'credit' | 'debit';
}

export interface Card {
  id: string;
  holderName: string;
  number: string;
  validThru: string;
  cvv: string;
  brand: string;
  bank: string;
  balance: number;
  creditLimit: number;
  availableLimit: number;
  transactions: Transaction[];
  cpf?: string;
  birthDate?: string;
}