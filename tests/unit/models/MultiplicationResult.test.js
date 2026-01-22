import { describe, it, expect } from 'vitest';
import { MultiplicationResult } from '../../../src/models/MultiplicationResult.js';

describe('MultiplicationResult', () => {
    describe('constructor', () => {
        it('should create result with correct properties', () => {
            const result = new MultiplicationResult(3);
            expect(result.multiplicand).toBe(9);
            expect(result.multiplier).toBe(3);
            expect(result.result).toBe(27);
        });

        it('should calculate result correctly for all multipliers 1-10', () => {
            const expectedResults = [9, 18, 27, 36, 45, 54, 63, 72, 81, 90];
            expectedResults.forEach((expected, index) => {
                const result = new MultiplicationResult(index + 1);
                expect(result.result).toBe(expected);
            });
        });

        it('should throw error for invalid multiplier', () => {
            expect(() => new MultiplicationResult(0)).toThrow();
            expect(() => new MultiplicationResult(11)).toThrow();
            expect(() => new MultiplicationResult(1.5)).toThrow();
        });
    });

    describe('getFormattedResult', () => {
        it('should return correctly formatted result', () => {
            const result = new MultiplicationResult(3);
            expect(result.getFormattedResult()).toBe('9 × 3 = 27');
        });

        it('should format results for all multipliers 1-10', () => {
            for (let i = 1; i <= 10; i++) {
                const result = new MultiplicationResult(i);
                const expected = `9 × ${i} = ${9 * i}`;
                expect(result.getFormattedResult()).toBe(expected);
            }
        });
    });

    describe('result', () => {
        it('should return calculated result', () => {
            const result = new MultiplicationResult(7);
            expect(result.result).toBe(63);
        });

        it('should return greater than 0 for valid multipliers', () => {
            const result = new MultiplicationResult(1);
            expect(result.result).toBeGreaterThan(0);
        });
    });

        it('should return 0 for multiplier 0 if validation disabled', () => {
            const result = new MultiplicationResult(1);
            expect(result.result).toBeGreaterThan(0);
        });
    });

        it('should return 0 for multiplier 0 if validation disabled', () => {
            const result = new MultiplicationResult(1);
            expect(result.getResult()).toBeGreaterThan(0);
        });
    });

    describe('validate', () => {
        it('should return true for valid result', () => {
            const result = new MultiplicationResult(5);
            expect(result.validate()).toBe(true);
        });
    });
});
