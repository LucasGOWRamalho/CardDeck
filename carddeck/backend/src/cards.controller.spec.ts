import { Test, TestingModule } from '@nestjs/testing';
import { CardsController } from './cards/cards.controller';
import { CardsService } from './cards/cards.service';
import { CreateCardDto } from './cards/dto/create-card.dto';
import { Card, Transaction } from './cards/entities/card.entity';

describe('CardsController', () => {
  let controller: CardsController;
  let service: CardsService;

  const mockCard: Card = {
    id: '1',
    holderName: 'John Doe',
    number: '4111111111111111',
    validThru: '12/25',
    cvv: '123',
    brand: 'Visa',
    bank: 'Test Bank',
    balance: 100,
    creditLimit: 1000,
    availableLimit: 1000,
    transactions: []
  };

  const mockTransaction: Transaction = {
    id: '1',
    amount: 100,
    description: 'Test purchase',
    date: '2023-10-01',
    category: 'Shopping',
    type: 'credit'
  };

  const mockCardsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
    addTransaction: jest.fn(),
    getTransactions: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardsController],
      providers: [
        {
          provide: CardsService,
          useValue: mockCardsService
        }
      ],
    }).compile();

    controller = module.get<CardsController>(CardsController);
    service = module.get<CardsService>(CardsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a card', () => {
      const createCardDto: CreateCardDto = {
        holderName: 'John Doe',
        number: '4111111111111111',
        validThru: '12/25',
        cvv: '123',
        brand: 'Visa',
        bank: 'Test Bank',
        balance: 0,
        creditLimit: 1000
      };

      mockCardsService.create.mockReturnValue(mockCard);

      const result = controller.create(createCardDto);

      expect(service.create).toHaveBeenCalledWith(createCardDto);
      expect(result).toEqual(mockCard);
    });

    it('should create a card with Elo brand', () => {
      const createCardDto: CreateCardDto = {
        holderName: 'Jane Doe',
        number: '6363680000000000',
        validThru: '06/26',
        cvv: '456',
        brand: 'Elo',
        bank: 'Another Bank',
        balance: 500,
        creditLimit: 2000
      };

      const eloCard = { ...mockCard, brand: 'Elo' };
      mockCardsService.create.mockReturnValue(eloCard);

      const result = controller.create(createCardDto);

      expect(service.create).toHaveBeenCalledWith(createCardDto);
      expect(result.brand).toBe('Elo');
    });
  });

  describe('findAll', () => {
    it('should return an array of cards', () => {
      mockCardsService.findAll.mockReturnValue([mockCard]);

      const result = controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockCard]);
    });

    it('should return empty array when no cards exist', () => {
      mockCardsService.findAll.mockReturnValue([]);

      const result = controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    it('should return multiple cards', () => {
      const multipleCards = [mockCard, { ...mockCard, id: '2', holderName: 'Jane Doe' }];
      mockCardsService.findAll.mockReturnValue(multipleCards);

      const result = controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toHaveLength(2);
      expect(result[1].holderName).toBe('Jane Doe');
    });
  });

  describe('findOne', () => {
    it('should return a card by id', () => {
      mockCardsService.findOne.mockReturnValue(mockCard);

      const result = controller.findOne('1');

      expect(service.findOne).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockCard);
    });

    it('should return undefined for non-existent card', () => {
      mockCardsService.findOne.mockReturnValue(undefined);

      const result = controller.findOne('non-existent');

      expect(service.findOne).toHaveBeenCalledWith('non-existent');
      expect(result).toBeUndefined();
    });
  });

  describe('remove', () => {
    it('should remove a card by id', () => {
      mockCardsService.remove.mockReturnValue(undefined);

      controller.remove('1');

      expect(service.remove).toHaveBeenCalledWith('1');
    });

    it('should remove card with specific id', () => {
      mockCardsService.remove.mockReturnValue(undefined);

      controller.remove('specific-id-123');

      expect(service.remove).toHaveBeenCalledWith('specific-id-123');
    });
  });

  describe('addTransaction', () => {
    it('should add a credit transaction to a card', () => {
      const transactionData = {
        amount: 100,
        description: 'Test purchase',
        date: '2023-10-01',
        category: 'Shopping',
        type: 'credit' as const
      };

      const updatedCard = { 
        ...mockCard, 
        transactions: [mockTransaction],
        availableLimit: 900 
      };
      mockCardsService.addTransaction.mockReturnValue(updatedCard);

      const result = controller.addTransaction('1', transactionData);

      expect(service.addTransaction).toHaveBeenCalledWith('1', transactionData);
      expect(result).toEqual(updatedCard);
      expect(result.availableLimit).toBe(900);
    });

    it('should add a debit transaction to a card', () => {
      const transactionData = {
        amount: 50,
        description: 'Debit purchase',
        date: '2023-10-01',
        category: 'Food',
        type: 'debit' as const
      };

      const debitTransaction = { ...mockTransaction, type: 'debit' };
      const updatedCard = { 
        ...mockCard, 
        transactions: [debitTransaction],
        balance: 50 
      };
      mockCardsService.addTransaction.mockReturnValue(updatedCard);

      const result = controller.addTransaction('1', transactionData);

      expect(service.addTransaction).toHaveBeenCalledWith('1', transactionData);
      expect(result.transactions[0].type).toBe('debit');
      expect(result.balance).toBe(50);
    });

    it('should handle transaction without id', () => {
      const transactionData = {
        amount: 100,
        description: 'Test purchase',
        date: '2023-10-01',
        category: 'Shopping',
        type: 'credit' as const
      };

      const updatedCard = { 
        ...mockCard, 
        transactions: [{ ...mockTransaction, id: 'generated-id' }]
      };
      mockCardsService.addTransaction.mockReturnValue(updatedCard);

      const result = controller.addTransaction('1', transactionData);

      expect(service.addTransaction).toHaveBeenCalledWith('1', transactionData);
      expect(result.transactions[0]).toHaveProperty('id');
    });
  });

  describe('getTransactions', () => {
    it('should return transactions for a card', () => {
      mockCardsService.getTransactions.mockReturnValue([mockTransaction]);

      const result = controller.getTransactions('1');

      expect(service.getTransactions).toHaveBeenCalledWith('1');
      expect(result).toEqual([mockTransaction]);
    });

    it('should return empty array for card with no transactions', () => {
      mockCardsService.getTransactions.mockReturnValue([]);

      const result = controller.getTransactions('1');

      expect(service.getTransactions).toHaveBeenCalledWith('1');
      expect(result).toEqual([]);
    });

    it('should return multiple transactions', () => {
      const multipleTransactions = [
        mockTransaction,
        { ...mockTransaction, id: '2', description: 'Second transaction' }
      ];
      mockCardsService.getTransactions.mockReturnValue(multipleTransactions);

      const result = controller.getTransactions('1');

      expect(service.getTransactions).toHaveBeenCalledWith('1');
      expect(result).toHaveLength(2);
      expect(result[1].description).toBe('Second transaction');
    });

    it('should return transactions for different card ids', () => {
      const card2Transactions = [{ ...mockTransaction, id: 'card2-tx' }];
      mockCardsService.getTransactions.mockReturnValue(card2Transactions);

      const result = controller.getTransactions('card-2-id');

      expect(service.getTransactions).toHaveBeenCalledWith('card-2-id');
      expect(result[0].id).toBe('card2-tx');
    });
  });
});