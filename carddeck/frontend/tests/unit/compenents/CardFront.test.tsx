import { render, screen } from '@testing-library/react';
import { CardFront } from '../../../src/components/CardFront';

describe('CardFront', () => {
  const mockCard = {
    number: '1234567812345678',
    holderName: 'João Silva',
    brand: 'Visa' as const,
  };

  it('should render card with provided data', () => {
    render(<CardFront card={mockCard} />);
    
    expect(screen.getByText('CARD DECK')).toBeInTheDocument();
    expect(screen.getByText('1234567812345678')).toBeInTheDocument();
    expect(screen.getByText('João Silva')).toBeInTheDocument();
  });

  it('should render default values when card data is missing', () => {
    render(<CardFront card={{}} />);
    
    expect(screen.getByText('•••• •••• •••• ••••')).toBeInTheDocument();
    expect(screen.getByText('NOME DO TITULAR')).toBeInTheDocument();
  });
});