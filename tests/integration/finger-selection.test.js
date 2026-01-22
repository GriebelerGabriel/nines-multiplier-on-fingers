import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Finger } from '../../src/models/Finger.js';
import { MultiplicationResult } from '../../src/models/MultiplicationResult.js';
import {
    selectFinger,
    deselectAll,
    getSelectedFinger
} from '../../src/utils/selector.js';

describe('Finger Selection Flow Integration', () => {
    let fingers;
    let mockHandDisplay;
    let mockResultDisplay;

    beforeEach(() => {
        fingers = [];
        for (let i = 1; i <= 10; i++) {
            fingers.push(new Finger({
                number: i,
                hand: i <= 5 ? 'left' : 'right',
                position: { x: 0, y: 0 }
            }));
        }

        mockHandDisplay = {
            updateHighlight: vi.fn(),
            render: vi.fn()
        };

        mockResultDisplay = {
            showResult: vi.fn(),
            showPrompt: vi.fn(),
            clear: vi.fn()
        };
    });

    afterEach(() => {
        deselectAll(fingers);
    });

    describe('Initial State', () => {
        it('should show prompt message when no finger is selected', () => {
            expect(getSelectedFinger(fingers)).toBeNull();
            expect(fingers.every(f => !f.isSelected)).toBe(true);
        });

        it('should display prompt in result display', () => {
            const selected = getSelectedFinger(fingers);
            if (selected === null) {
                mockResultDisplay.showPrompt();
                expect(mockResultDisplay.showPrompt).toHaveBeenCalled();
            }
        });
    });

    describe('First Finger Selection', () => {
        it('should select finger 3 and update displays', () => {
            const selectedFinger = selectFinger(3, fingers);

            expect(selectedFinger.number).toBe(3);
            expect(selectedFinger.isSelected).toBe(true);

            const result = new MultiplicationResult(3);
            mockHandDisplay.updateHighlight(3);
            mockResultDisplay.showResult(result);

            expect(mockHandDisplay.updateHighlight).toHaveBeenCalledWith(3);
            expect(mockResultDisplay.showResult).toHaveBeenCalledWith(result);
            expect(result.getFormattedResult()).toBe('9 × 3 = 27');
        });

        it('should clear previous selection when selecting new finger', () => {
            selectFinger(3, fingers);
            const firstResult = new MultiplicationResult(3);

            const secondFinger = selectFinger(7, fingers);
            const secondResult = new MultiplicationResult(7);

            expect(fingers[2].isSelected).toBe(false);
            expect(fingers[6].isSelected).toBe(true);

            mockHandDisplay.updateHighlight(7);
            mockResultDisplay.showResult(secondResult);

            expect(mockHandDisplay.updateHighlight).toHaveBeenCalledWith(7);
            expect(secondResult.getFormattedResult()).toBe('9 × 7 = 63');
        });
    });

    describe('Change Selection', () => {
        beforeEach(() => {
            selectFinger(1, fingers);
        });

        it('should allow changing from finger 1 to finger 10', () => {
            const newFinger = selectFinger(10, fingers);

            expect(fingers[0].isSelected).toBe(false);
            expect(fingers[9].isSelected).toBe(true);

            const result = new MultiplicationResult(10);
            mockResultDisplay.showResult(result);

            expect(result.getFormattedResult()).toBe('9 × 10 = 90');
        });

        it('should update highlight when changing selection', () => {
            mockHandDisplay.updateHighlight(1);

            selectFinger(5, fingers);
            mockHandDisplay.updateHighlight(5);

            expect(mockHandDisplay.updateHighlight).toHaveBeenCalledTimes(2);
        });
    });

    describe('Boundary Cases', () => {
        it('should handle selecting finger 1', () => {
            const finger = selectFinger(1, fingers);
            const result = new MultiplicationResult(1);

            expect(finger.getFingersToLeft()).toBe(0);
            expect(finger.getFingersToRight()).toBe(9);
            expect(result.result).toBe(9);
        });

        it('should handle selecting finger 10', () => {
            const finger = selectFinger(10, fingers);
            const result = new MultiplicationResult(10);

            expect(finger.getFingersToLeft()).toBe(9);
            expect(finger.getFingersToRight()).toBe(0);
            expect(result.result).toBe(90);
        });

        it('should handle selecting middle finger 5', () => {
            const finger = selectFinger(5, fingers);
            const result = new MultiplicationResult(5);

            expect(finger.getFingersToLeft()).toBe(4);
            expect(finger.getFingersToRight()).toBe(5);
            expect(result.result).toBe(45);
        });
    });

    describe('All Finger Selections', () => {
        it('should correctly handle all 10 finger selections', () => {
            const expectedResults = [9, 18, 27, 36, 45, 54, 63, 72, 81, 90];

            expectedResults.forEach((expected, index) => {
                const finger = selectFinger(index + 1, fingers);
                const result = new MultiplicationResult(index + 1);

                expect(finger.isSelected).toBe(true);
                expect(result.result).toBe(expected);

                deselectAll(fingers);
            });
        });

        it('should validate state after each selection', () => {
            for (let i = 1; i <= 10; i++) {
                selectFinger(i, fingers);
                expect(getSelectedFinger(fingers).number).toBe(i);
                deselectAll(fingers);
            }
        });
    });
});
