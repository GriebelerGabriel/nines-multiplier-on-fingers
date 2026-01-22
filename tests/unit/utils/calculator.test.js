import { describe, it, expect } from 'vitest';
import {
    calculate,
    isValidMultiplier,
    formatMultiplication,
    getMultiplicationTable
} from '../../../src/utils/calculator.js';

describe('Calculator', () => {
    describe('calculate', () => {
        it('should calculate 9 × 1 = 9', () => {
            expect(calculate(1)).toBe(9);
        });

        it('should calculate 9 × 5 = 45', () => {
            expect(calculate(5)).toBe(45);
        });

        it('should calculate 9 × 10 = 90', () => {
            expect(calculate(10)).toBe(90);
        });

        it('should calculate all values 1-10 correctly', () => {
            const expected = [9, 18, 27, 36, 45, 54, 63, 72, 81, 90];
            expected.forEach((value, index) => {
                expect(calculate(index + 1)).toBe(value);
            });
        });

        it('should throw error for invalid multiplier', () => {
            expect(() => calculate(0)).toThrow();
            expect(() => calculate(11)).toThrow();
            expect(() => calculate(-1)).toThrow();
        });
    });

    describe('isValidMultiplier', () => {
        it('should return true for valid multipliers 1-10', () => {
            for (let i = 1; i <= 10; i++) {
                expect(isValidMultiplier(i)).toBe(true);
            }
        });

        it('should return false for 0', () => {
            expect(isValidMultiplier(0)).toBe(false);
        });

        it('should return false for 11', () => {
            expect(isValidMultiplier(11)).toBe(false);
        });

        it('should return false for negative numbers', () => {
            expect(isValidMultiplier(-1)).toBe(false);
        });

        it('should return false for non-integers', () => {
            expect(isValidMultiplier(1.5)).toBe(false);
            expect(isValidMultiplier(2.7)).toBe(false);
        });
    });

    describe('formatMultiplication', () => {
        it('should format multiplication correctly', () => {
            expect(formatMultiplication(1)).toBe('9 × 1 = 9');
            expect(formatMultiplication(3)).toBe('9 × 3 = 27');
            expect(formatMultiplication(10)).toBe('9 × 10 = 90');
        });

        it('should format all values 1-10 correctly', () => {
            for (let i = 1; i <= 10; i++) {
                const expected = `9 × ${i} = ${9 * i}`;
                expect(formatMultiplication(i)).toBe(expected);
            }
        });

        it('should throw error for invalid multiplier', () => {
            expect(() => formatMultiplication(0)).toThrow();
            expect(() => formatMultiplication(11)).toThrow();
        });
    });

    describe('getMultiplicationTable', () => {
        it('should return complete multiplication table', () => {
            const table = getMultiplicationTable();
            expect(table).toBeDefined();
            expect(typeof table).toBe('object');
        });

        it('should have entries for all multipliers 1-10', () => {
            const table = getMultiplicationTable();
            for (let i = 1; i <= 10; i++) {
                expect(table[i]).toBeDefined();
            }
        });

        it('should have correct values for all entries', () => {
            const table = getMultiplicationTable();
            const expected = [9, 18, 27, 36, 45, 54, 63, 72, 81, 90];
            expected.forEach((value, index) => {
                expect(table[index + 1]).toBe(value);
            });
        });
    });
});
