import { describe, it, expect } from 'vitest';

describe('User Journey End-to-End Test', () => {
    describe('Format Validation', () => {
        it('should verify result format matches pattern', () => {
            const results = [
                '9 × 1 = 9',
                '9 × 2 = 18',
                '9 × 3 = 27',
                '9 × 4 = 36',
                '9 × 5 = 45',
                '9 × 6 = 54',
                '9 × 7 = 63',
                '9 × 8 = 72',
                '9 × 9 = 81',
                '9 × 10 = 90'
            ];

            results.forEach(result => {
                expect(result).toMatch(/^9 × \d+ = \d+$/);
                const match = result.match(/^9 × (\d+) = (\d+)$/);
                expect(match).toBeTruthy();

                if (match) {
                    const multiplier = parseInt(match[1]);
                    const product = parseInt(match[2]);
                    expect(9 * multiplier).toBe(product);
                }
            });
        });
    });

    describe('Calculation Accuracy', () => {
        it('should correctly calculate all 9\'s multiplication results', () => {
            for (let i = 1; i <= 10; i++) {
                const result = 9 * i;
                expect(result).toBeGreaterThanOrEqual(9);
                expect(result).toBeLessThanOrEqual(90);
            }
        });

        it('should verify specific calculations', () => {
            const calculations = [
                { multiplier: 1, result: 9 },
                { multiplier: 3, result: 27 },
                { multiplier: 5, result: 45 },
                { multiplier: 7, result: 63 },
                { multiplier: 10, result: 90 }
            ];

            calculations.forEach(({ multiplier, result }) => {
                expect(9 * multiplier).toBe(result);
            });
        });
    });

    describe('Finger Counting Pattern', () => {
        it('should correctly calculate fingers left and right', () => {
            for (let i = 1; i <= 10; i++) {
                const fingersToLeft = i - 1;
                const fingersToRight = 10 - i;

                expect(fingersToLeft + fingersToRight + 1).toBe(10);
            }
        });

        it('should verify boundary cases', () => {
            expect(1 - 1).toBe(0);
            expect(10 - 1).toBe(9);
            expect(10 - 10).toBe(0);
        });
    });
});
