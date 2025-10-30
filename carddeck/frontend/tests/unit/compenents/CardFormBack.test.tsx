import { render, screen, fireEvent } from '@testing-library/react';
import { CardFormBack } from '../../../src/components/CardFormBack';
import { useCard } from '../../../src/context/CardContext';
import { Card } from '../../../src/types/card';

jest.mock('../../../src/context/CardContext', () => ({
  useCard: jest.fn(),
}));

describe('CardFormBack', () => {
  const mockSetCard = jest.fn();
  const mockAddCard = jest.fn();
  const defaultCard: Partial<Card> = {
    holderName: 'João Silva',
    number: '1234567812345678',
    bank: 'Banco Teste',
    brand: 'Visa',
    balance: 1000,
    creditLimit: 5000,
  };

  beforeEach(() => {
    (useCard as jest.Mock).mockReturnValue({
      addCard: mockAddCard,
    });
    
    jest.clearAllMocks();
  });

  it('should render all form fields', () => {
    render(<CardFormBack card={defaultCard} setCard={mockSetCard} />);
    
    expect(screen.getByPlaceholderText('MM/AA')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('123')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('000.000.000-00')).toBeInTheDocument();
  });
});