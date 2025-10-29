import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { Transaction } from './entities/card.entity';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  create(@Body() dto: CreateCardDto) {
    return this.cardsService.create(dto);
  }

  @Get()
  findAll() {
    return this.cardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.cardsService.remove(id);
  }

  // Novos endpoints para transações
  @Post(':id/transactions')
  addTransaction(
    @Param('id') id: string,
    @Body() transactionData: Omit<Transaction, 'id'>,
  ) {
    return this.cardsService.addTransaction(id, transactionData);
  }

  @Get(':id/transactions')
  getTransactions(@Param('id') id: string) {
    return this.cardsService.getTransactions(id);
  }
}