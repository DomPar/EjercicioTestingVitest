import { describe, it, expect } from 'vitest';
// 💡 IMPORTACIÓN ACTUALIZADA: Usando el nombre correcto de la función
import { calculateDiscount } from '../utils/DataValidator.js';
// Usamos 'describe' para agrupar todos los tests relacionados con la función de descuento.
describe('calculateDiscount', () => {

    // --- Tests de Éxito (Cálculos Nominales) ---
    
    it('debe calcular el precio con un descuento nominal del 20%', () => {
        // ARRANGE (Preparar: Precio de 100, Descuento del 20%)
        const price = 100;
        const discount = 20;

        // ACT (Ejecutar: Llamar a la función)
        const result = calculateDiscount(price, discount);

        // ASSERT (Verificar: El resultado debe ser 80)
        expect(result).toBe(80.00);
    });

    // --- Test 2 Testear con 0% de descuento (Caso Borde)
    it('debe devolver el precio original cuando el descuento es 0% ', () => {
        // ARRANGE
        const price = 50;
        const discount = 0;

        // ACT
        const result = calculateDiscount(price, discount);

        // ASSERT
        expect(result).toBe(50);
    });

    // --- Test 3 Testear con 100% de descuento (Caso Borde) ---
    it('debe devolver 0 cuando el descuento es 100%', () => {
        // ARRANGE
        const price = 200;
        const discount = 100;

        // ACT
        const result = calculateDiscount(price, discount);

        // ASSERT
        expect(result).toBe(0);
    });
   
    // --- Test 4: Verificar que se lanza un error si el precio inicial es cero o negativo.
    it('debe lanzar error si el precio es 0', () => {
        // ARRANGE
        const price = 0;
        const discount = 10;

        // ACT & ASSERT
        expect(() => calculateDiscount(price, discount)).toThrow("Parámetros de entrada inválidos.");
    });

    it('debe lanzar error si el precio es negativo', () => {
        // ARRANGE
        const price = -50;
        const discount = 10;

        // ACT & ASSERT
        expect(() => calculateDiscount(price, discount)).toThrow("Parámetros de entrada inválidos.");
    });


    // --- Tests 5: Precisión Decimal Verificar que el resultado se redondea correctamente a dos decimales (Punto 13).
    it('debe redondear correctamente a 2 decimales', () => {
        // ARRANGE
        const price = 99.99;
        const discount = 15;

        // ACT
        const result = calculateDiscount(price, discount);

        // ASSERT
        expect(result).toBe(84.99);
    });
    
    // -- Test 6: testear el toThrow todos los casos posibles
    it('debe lanzar error si el descuento es negativo', () => {
        // ARRANGE
        const price = 100;
        const discount = -10;

        // ACT & ASSERT
        expect(() => calculateDiscount(price, discount)).toThrow("Parámetros de entrada inválidos.");
    });

    it('debe lanzar error si el descuento es mayor a 100', () => {
        // ARRANGE
        const price = 100;
        const discount = 150;

        // ACT & ASSERT
        expect(() => calculateDiscount(price, discount)).toThrow("Parámetros de entrada inválidos.");
    });

});