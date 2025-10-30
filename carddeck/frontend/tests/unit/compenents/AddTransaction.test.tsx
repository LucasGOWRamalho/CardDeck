import { render, screen, fireEvent } from '@testing-library/react';
import { AddTransaction } from '../../../src/components/AddTransaction';

describe('AddTransaction', () => {
  const defaultProps = {
    cardId: '1',
    onTransactionAdded: jest.fn(),
    onClose: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render transaction form', () => {
    render(<AddTransaction {...defaultProps} />);
    
    expect(screen.getByText('Nova Transação')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('O que você comprou?')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('0,00')).toBeInTheDocument();
  });

  it('should close modal when cancel button is clicked', () => {
    render(<AddTransaction {...defaultProps} />);
    
    const cancelButton = screen.getByText('Cancelar');
    fireEvent.click(cancelButton);
    
    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});