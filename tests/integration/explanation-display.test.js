import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Finger } from '../../src/models/Finger.js';
import { MultiplicationResult } from '../../src/models/MultiplicationResult.js';
import { selectFinger, deselectAll } from '../../src/utils/selector.js';

describe('Explanation Display Integration', () => {
    let fingers;
    let mockExplanationDisplay;
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

        mockExplanationDisplay = {
            showExplanation: vi.fn(),
            clear: vi.fn()
        };

        mockResultDisplay = {
            showResult: vi.fn(),
            showPrompt: vi.fn(),
            clear: vi.fn()
        };
    });

    afterEach(() => {
        deselectAll(fingers);
        vi.clearAllMocks();
    });

    describe('Show Explanation on Selection', () => {
        it('should show explanation when finger 3 is selected', () => {
            const selectedFinger = selectFinger(3, fingers);

            mockExplanationDisplay.showExplanation(
                selectedFinger.getFingersToLeft(),
                selectedFinger.getFingersToRight()
            );

            expect(mockExplanationDisplay.showExplanation).toHaveBeenCalledWith(2, 7);
        });

        it('should show explanation when finger 6 is selected', () => {
            const selectedFinger = selectFinger(6, fingers);

            mockExplanationDisplay.showExplanation(
                selectedFinger.getFingersToLeft(),
                selectedFinger.getFingersToRight()
            );

            expect(mockExplanationDisplay.showExplanation).toHaveBeenCalledWith(5, 4);
        });

        it('should show explanation when finger 1 is selected', () => {
            const selectedFinger = selectFinger(1, fingers);

            mockExplanationDisplay.showExplanation(
                selectedFinger.getFingersToLeft(),
                selectedFinger.getFingersToRight()
            );

            expect(mockExplanationDisplay.showExplanation).toHaveBeenCalledWith(0, 9);
        });

        it('should show explanation when finger 10 is selected', () => {
            const selectedFinger = selectFinger(10, fingers);

            mockExplanationDisplay.showExplanation(
                selectedFinger.getFingersToLeft(),
                selectedFinger.getFingersToRight()
            );

            expect(mockExplanationDisplay.showExplanation).toHaveBeenCalledWith(9, 0);
        });
    });

    describe('Explanation Text Accuracy', () => {
        it('should have correct text for all 10 fingers', () => {
            const expectedExplanations = [
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

            expectedExplanations.forEach(({ finger, left, right }) => {
                const selectedFinger = selectFinger(finger, fingers);

                mockExplanationDisplay.showExplanation(
                    selectedFinger.getFingersToLeft(),
                    selectedFinger.getFingersToRight()
                );

                expect(mockExplanationDisplay.showExplanation).toHaveBeenCalledWith(left, right);

                deselectAll(fingers);
            });
        });
    });

    describe('Clear Explanation on Deselect', () => {
        it('should clear explanation when deselected', () => {
            selectFinger(3, fingers);

            mockExplanationDisplay.showExplanation(2, 7);
            mockExplanationDisplay.clear();

            expect(mockExplanationDisplay.clear).toHaveBeenCalled();
        });

        it('should not show explanation after deselect', () => {
            selectFinger(5, fingers);
            mockExplanationDisplay.showExplanation(4, 5);

            deselectAll(fingers);

            mockExplanationDisplay.clear();
            expect(mockExplanationDisplay.clear).toHaveBeenCalled();
        });
    });

    describe('Change Selection Updates Explanation', () => {
        it('should update explanation when changing from finger 3 to finger 7', () => {
            const firstFinger = selectFinger(3, fingers);
            mockExplanationDisplay.showExplanation(2, 7);

            const secondFinger = selectFinger(7, fingers);
            mockExplanationDisplay.showExplanation(6, 3);

            expect(mockExplanationDisplay.showExplanation).toHaveBeenCalledTimes(2);
            expect(mockExplanationDisplay.showExplanation).toHaveBeenNthCalledWith(1, 2, 7);
            expect(mockExplanationDisplay.showExplanation).toHaveBeenNthCalledWith(2, 6, 3);
        });
    });

    describe('Integration with Result Display', () => {
        it('should show both result and explanation when finger selected', () => {
            const selectedFinger = selectFinger(4, fingers);

            const result = new MultiplicationResult(4);

            mockResultDisplay.showResult(result);
            mockExplanationDisplay.showExplanation(
                selectedFinger.getFingersToLeft(),
                selectedFinger.getFingersToRight()
            );

            expect(mockResultDisplay.showResult).toHaveBeenCalledWith(result);
            expect(mockExplanationDisplay.showExplanation).toHaveBeenCalledWith(3, 6);
        });
    });
});
