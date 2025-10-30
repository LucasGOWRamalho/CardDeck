import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Wallet } from '../../../src/components/Wallet';
import { Card } from '../../../src/types/card';

jest.mock('../../../src/context/CardContext', () => ({
  useCard: () => ({
    cards: [],
    loadCards: jest.fn(),
    addCard: jest.fn(),
    deleteCard: jest.fn(),
  }),
}));

describe('Wallet', () => {
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

  const defaultProps = {
    cards: mockCards,
    isOpen: false,
    onToggle: jest.fn(),
    onCardSelect: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render wallet with card count', () => {
    render(<Wallet {...defaultProps} />);
    
    expect(screen.getByText('💼 Minha Carteira')).toBeInTheDocument();
    expect(screen.getByText('1 cartão')).toBeInTheDocument();
  });

  it('should call onToggle when header is clicked', () => {
    render(<Wallet {...defaultProps} />);
    
    const header = screen.getByText('💼 Minha Carteira');
    fireEvent.click(header);
    
    expect(defaultProps.onToggle).toHaveBeenCalled();
  });
});