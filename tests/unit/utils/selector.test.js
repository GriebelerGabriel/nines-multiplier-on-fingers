import { describe, it, expect, beforeEach } from 'vitest';
import {
    selectFinger,
    deselectAll,
    getSelectedFinger,
    validateSelection
} from '../../../src/utils/selector.js';
import { Finger } from '../../../src/models/Finger.js';

describe('Selector', () => {
    let fingers;

    beforeEach(() => {
        fingers = [];
        for (let i = 1; i <= 10; i++) {
            fingers.push(new Finger({
                number: i,
                hand: i <= 5 ? 'left' : 'right',
                position: { x: 0, y: 0 }
            }));
        }
    });

    describe('selectFinger', () => {
        it('should select the specified finger', () => {
            const selected = selectFinger(3, fingers);
            expect(selected.number).toBe(3);
            expect(selected.isSelected).toBe(true);
        });

        it('should deselect all other fingers when selecting', () => {
            fingers[2].select();
            selectFinger(7, fingers);

            expect(fingers[2].isSelected).toBe(false);
            expect(fingers[6].isSelected).toBe(true);
        });

        it('should throw error for invalid finger number', () => {
            expect(() => selectFinger(0, fingers)).toThrow();
            expect(() => selectFinger(11, fingers)).toThrow();
        });

        it('should throw error for non-integer finger number', () => {
            expect(() => selectFinger(3.5, fingers)).toThrow();
        });

        it('should allow re-selecting same finger', () => {
            const firstSelection = selectFinger(5, fingers);
            const secondSelection = selectFinger(5, fingers);
            expect(firstSelection).toBe(secondSelection);
            expect(fingers[4].isSelected).toBe(true);
        });
    });

    describe('deselectAll', () => {
        it('should deselect all fingers', () => {
            fingers[2].select();
            fingers[6].select();

            deselectAll(fingers);

            fingers.forEach(finger => {
                expect(finger.isSelected).toBe(false);
            });
        });

        it('should not throw error if no fingers are selected', () => {
            expect(() => deselectAll(fingers)).not.toThrow();
        });

        it('should handle empty array', () => {
            expect(() => deselectAll([])).not.toThrow();
        });
    });

    describe('getSelectedFinger', () => {
        it('should return null if no finger is selected', () => {
            const selected = getSelectedFinger(fingers);
            expect(selected).toBeNull();
        });

        it('should return selected finger', () => {
            fingers[3].select();
            const selected = getSelectedFinger(fingers);
            expect(selected).not.toBeNull();
            expect(selected.number).toBe(4);
        });

        it('should return most recently selected finger', () => {
            fingers[2].select();
            fingers[6].select();
            const selected = getSelectedFinger(fingers);
            expect(selected.number).toBe(7);
        });
    });

        it('should return the selected finger', () => {
            fingers[3].select();
            const selected = getSelectedFinger(fingers);
            expect(selected).not.toBeNull();
            expect(selected.number).toBe(4);
        });

        it('should return only one selected finger', () => {
            fingers[2].select();
            fingers[6].select();
            const selected = getSelectedFinger(fingers);
            expect(selected.number).toBe(7);
        });
    });

    describe('validateSelection', () => {
        it('should return true if no fingers are selected', () => {
            expect(validateSelection(fingers)).toBe(true);
        });

        it('should return true if exactly one finger is selected', () => {
            fingers[4].select();
            expect(validateSelection(fingers)).toBe(true);
        });

        it('should return false if multiple fingers are selected', () => {
            fingers[2].select();
            fingers[6].select();
            expect(validateSelection(fingers)).toBe(false);
        });

        it('should return false if more than one finger is selected', () => {
            fingers.forEach(f => f.select());
            expect(validateSelection(fingers)).toBe(false);
        });

        it('should handle empty array', () => {
            expect(validateSelection([])).toBe(true);
        });
    });
});
