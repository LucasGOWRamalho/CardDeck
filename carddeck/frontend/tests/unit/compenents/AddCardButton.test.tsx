import { render, screen, fireEvent } from '@testing-library/react';
import { AddCardButton } from '../../../src/components/AddCardButton';

// O mock do next/navigation já está no jest.setup.js

describe('AddCardButton', () => {
  it('should render button with plus icon', () => {
    render(<AddCardButton />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-blue-600');
  });

  it('should show tooltip on hover', () => {
    render(<AddCardButton />);
    
    const button = screen.getByRole('button');
    fireEvent.mouseEnter(button);
    
    expect(screen.getByText('Adicionar cartão de crédito')).toBeInTheDocument();
  });
});