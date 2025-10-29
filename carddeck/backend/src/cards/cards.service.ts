import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { Card, Transaction } from './entities/card.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CardsService {
  private cards: Card[] = [];

  create(dto: CreateCardDto): Card {
    const newCard = { 
      id: uuid(), 
      ...dto, 
      availableLimit: dto.creditLimit,
      transactions: [] 
    };
    this.cards.push(newCard);
    return newCard;
  }

  findAll(): Card[] {
    return this.cards;
  }

  findOne(id: string): Card | undefined {
    return this.cards.find((c) => c.id === id);
  }

  remove(id: string): void {
    this.cards = this.cards.filter((c) => c.id !== id);
  }

  // Novo método para adicionar transação
  addTransaction(cardId: string, transactionData: Omit<Transaction, 'id'>): Card {
    const card = this.cards.find((c) => c.id === cardId);
    if (!card) {
      throw new Error('Cartão não encontrado');
    }

    const newTransaction: Transaction = {
      id: uuid(),
      ...transactionData,
    };

    card.transactions.push(newTransaction);

    // Atualizar limite disponível ou saldo
    if (transactionData.type === 'credit') {
      card.availableLimit -= transactionData.amount;
    } else {
      card.balance -= transactionData.amount;
    }

    return card;
  }

  // Método para obter transações de um cartão
  getTransactions(cardId: string): Transaction[] {
    const card = this.cards.find((c) => c.id === cardId);
    return card ? card.transactions : [];
  }
}