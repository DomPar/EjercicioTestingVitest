import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from '../components/Counter.jsx';

describe('Counter Component', () => {

  // --- TEST 1: Verificar el estado inicial ---
  it('debe renderizar el contador con el valor inicial de 0', () => {
    // ARRANGE: Renderizar el componente
    render(<Counter />);
    
    // ACT: No hay acción
    
    // ASSERT: Verificar el valor en el DOM
    expect(screen.getByTestId('current-count')).toHaveTextContent('0');
  });
    
  // --- TEST 2: Incremento básico (AAA) ---
  it('debe incrementar el contador en 1 al hacer clic', async () => {
    // ARRANGE
    render(<Counter />);
    const incrementButton = screen.getByTestId('btn-incrementar');
    
    // ACT
    fireEvent.click(incrementButton);
    
    // ASSERT
    expect(screen.getByTestId('current-count')).toHaveTextContent('1');
  });


  // --- TEST 3: Límite Mínimo (Caso Borde) ---
  it('debe mostrar la advertencia de límite mínimo al iniciar y no permitir decrementar', async () => {
    // ARRANGE
    render(<Counter />);
    const btnDecrementar = screen.getByTestId('btn-decrementar');
    
    // ACT
    fireEvent.click(btnDecrementar);
    
    // ASSERT
    expect(screen.getByTestId('current-count')).toHaveTextContent('0');
    expect(screen.getByTestId('min-warning')).toBeInTheDocument();
    expect(btnDecrementar).toBeDisabled();
  });

  // --- TEST 4: Decremento básico ---
  it('debe decrementar el contador', () => {
    // ARRANGE
    render(<Counter initialValue={5} />);
    const btnDecrementar = screen.getByTestId('btn-decrementar');
    
    // ACT
    fireEvent.click(btnDecrementar);
    
    // ASSERT
    expect(screen.getByTestId('current-count')).toHaveTextContent('4');
  });

  // --- TEST 5: Límite Máximo ---
  it('debe mostrar advertencia al llegar al máximo', () => {
    // ARRANGE
    render(<Counter initialValue={10} maxValue={10} />);
    const btnIncrementar = screen.getByTestId('btn-incrementar');
    
    // ACT
    fireEvent.click(btnIncrementar);
    
    // ASSERT
    expect(screen.getByTestId('current-count')).toHaveTextContent('10');
    expect(screen.getByTestId('max-warning')).toBeInTheDocument();
    expect(btnIncrementar).toBeDisabled();
  });

  // --- TEST 6: Incremento hasta el máximo y verificar estado del botón ---
  it('debe deshabilitar botón al llegar al máximo', () => {
    // ARRANGE
    render(<Counter initialValue={0} maxValue={2} />);
    const btnIncrementar = screen.getByTestId('btn-incrementar');
    
    // ACT
    fireEvent.click(btnIncrementar);
    fireEvent.click(btnIncrementar);
    
    // ASSERT
    expect(screen.getByTestId('current-count')).toHaveTextContent('2');
    expect(btnIncrementar).toBeDisabled();
    expect(screen.getByTestId('max-warning')).toBeInTheDocument();
  });

  // --- TEST 7: Decremento hasta el mínimo y verificar estado del botón ---
  it('debe deshabilitar botón al llegar al mínimo', () => {
    // ARRANGE
    render(<Counter initialValue={2} />);
    const btnDecrementar = screen.getByTestId('btn-decrementar');
    
    // ACT
    fireEvent.click(btnDecrementar);
    fireEvent.click(btnDecrementar);
    
    // ASSERT
    expect(screen.getByTestId('current-count')).toHaveTextContent('0');
    expect(btnDecrementar).toBeDisabled();
    expect(screen.getByTestId('min-warning')).toBeInTheDocument();
  });

  // --- TEST 8: Resetear el contador ---
  it('debe volver al valor inicial con reset', () => {
    // ARRANGE
    render(<Counter initialValue={5} />);
    const btnIncrementar = screen.getByTestId('btn-incrementar');
    const btnReset = screen.getByTestId('btn-reset');
    
    // ACT
    fireEvent.click(btnIncrementar);
    fireEvent.click(btnIncrementar);
    fireEvent.click(btnReset);
    
    // ASSERT
    expect(screen.getByTestId('current-count')).toHaveTextContent('5');
  });
   
});