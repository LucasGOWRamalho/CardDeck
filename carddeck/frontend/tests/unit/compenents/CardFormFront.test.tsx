import { render, screen, fireEvent } from '@testing-library/react';
import { CardFormFront } from '../../../src/components/CardFormFront';
import { Card } from '../../../src/types/card';

describe('CardFormFront', () => {
  const mockSetCard = jest.fn();
  const mockNext = jest.fn();
  const defaultProps = {
    card: {} as Partial<Card>,
    setCard: mockSetCard,
    next: mockNext,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render all form fields', () => {
    render(<CardFormFront {...defaultProps} />);
    
    expect(screen.getByPlaceholderText('Digite o nome completo')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('xxxx xxxx xxxx xxxx')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Nome do banco')).toBeInTheDocument();
  });

  it('should submit form with valid data', async () => {
    const validCard = {
      holderName: 'João Silva',
      number: '1234567812345678',
      bank: 'Banco Teste',
      brand: 'Visa' as const,
      balance: 1000,
      creditLimit: 5000,
    };

    render(<CardFormFront {...defaultProps} card={validCard} />);
    
    const submitButton = screen.getByText('Continuar →');
    fireEvent.click(submitButton);
    
    // Teste básico - remova validações complexas por enquanto
    expect(mockNext).toHaveBeenCalled();
  });
});