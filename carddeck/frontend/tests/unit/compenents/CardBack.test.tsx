import { render, screen } from '@testing-library/react';
import { CardBack } from '../../../src/components/CardBack';

describe('CardBack', () => {
  const mockCard = {
    cpf: '123.456.789-00',
    birthDate: '1990-01-15',
  };

  it('should render card back with provided data', () => {
    render(<CardBack card={mockCard} />);
    
    expect(screen.getByText('CPF:')).toBeInTheDocument();
    expect(screen.getByText('123.456.789-00')).toBeInTheDocument();
    expect(screen.getByText('Nascimento:')).toBeInTheDocument();
    expect(screen.getByText('1990-01-15')).toBeInTheDocument();
  });

  it('should render default values when data is missing', () => {
    render(<CardBack card={{}} />);
    
    expect(screen.getByText('000.000.000-00')).toBeInTheDocument();
    expect(screen.getByText('dd/mm/aaaa')).toBeInTheDocument();
  });
});