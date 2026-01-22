import { describe, it, expect, beforeEach } from 'vitest';
import { ExplanationDisplay } from '../../../src/components/ExplanationDisplay.js';

describe('ExplanationDisplay', () => {
    let display;
    let mockContainer;

    beforeEach(() => {
        mockContainer = {
            innerHTML: ''
        };
        display = new ExplanationDisplay(mockContainer);
    });

    describe('showExplanation', () => {
        it('should display explanation for finger 3', () => {
            display.showExplanation(3, 2, 7);
            expect(mockContainer.innerHTML).toContain('popup');
        });

        it('should display explanation for finger 1', () => {
            display.showExplanation(1, 0, 9);
            expect(mockContainer.innerHTML).toContain('popup');
        });

        it('should display explanation for finger 10', () => {
            display.showExplanation(10, 9, 0);
            expect(mockContainer.innerHTML).toContain('popup');
        });

        it('should display explanation for finger 5', () => {
            display.showExplanation(5, 4, 5);
            expect(mockContainer.innerHTML).toContain('popup');
        });

        it('should display explanation for finger 7', () => {
            display.showExplanation(7, 6, 3);
            expect(mockContainer.innerHTML).toContain('popup');
        });

        it('should handle all 10 finger explanations correctly', () => {
            const explanations = [
                { finger: 1, left: 0, right: 9 },
                { finger: 2, left: 1, right: 8 },
                { finger: 3, left: 2, right: 7 },
                { finger: 4, left: 3, right: 6 },
                { finger: 5, left: 4, right: 5 },
                { finger: 6, left: 5, right: 4 },
                { finger: 7, left: 6, right: 3 },
                { finger: 8, left: 7, right: 2 },
                { finger: 9, left: 8, right: 1 },
                { finger: 10, left: 9, right: 0 }
            ];

            explanations.forEach(({ finger, left, right }) => {
                display.clear();
                display.showExplanation(finger, left, right);

                expect(mockContainer.innerHTML).toContain('popup');
            });
        });
    });

    describe('clear', () => {
        it('should clear explanation display', () => {
            display.showExplanation(3, 2, 7);
            expect(mockContainer.innerHTML).toBeTruthy();

            display.clear();
            expect(mockContainer.innerHTML).toBe('');
        });

        it('should not throw error if already empty', () => {
            display.clear();
            expect(() => display.clear()).not.toThrow();
        });
    });

    describe('Constructor', () => {
        it('should throw error if container is null', () => {
            expect(() => new ExplanationDisplay(null)).toThrow();
        });

        it('should throw error if container is undefined', () => {
            expect(() => new ExplanationDisplay(undefined)).toThrow();
        });
    });
});
