import { renderHook, act } from '@testing-library/react';
import { CardProvider, useCard } from '../../../src/context/CardContext';
import { cardsApi } from '../../../src/lib/api';
import { Card } from '../../../src/types/card';

jest.mock('../../../src/lib/api');

describe('CardContext', () => {
  const mockCards: Card[] = [
    {
      id: '1',
      holderName: 'João Silva',
      number: '1234567812345678',
      validThru: '12/25',
      cvv: '123',
      brand: 'Visa',
      bank: 'Banco Teste',
      balance: 1000,
      creditLimit: 5000,
      availableLimit: 5000,
      transactions: []
    },
  ];

  beforeEach(() => {
    (cardsApi.getAll as jest.Mock).mockResolvedValue(mockCards);
    (cardsApi.create as jest.Mock).mockResolvedValue(mockCards[0]);
    (cardsApi.delete as jest.Mock).mockResolvedValue(undefined);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should load cards successfully', async () => {
    const { result } = renderHook(() => useCard(), {
      wrapper: CardProvider,
    });

    await act(async () => {
      await result.current.loadCards();
    });

    expect(result.current.cards).toEqual(mockCards);
    expect(result.current.loading).toBe(false);
  });
});