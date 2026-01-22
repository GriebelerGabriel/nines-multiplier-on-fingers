import { describe, it, expect, beforeEach } from 'vitest';
import { Finger } from '../../../src/models/Finger.js';

describe('Finger', () => {
    let finger;

    beforeEach(() => {
        finger = new Finger({
            number: 3,
            hand: 'left',
            position: { x: 100, y: 200 }
        });
    });

    describe('constructor', () => {
        it('should create finger with correct properties', () => {
            expect(finger.number).toBe(3);
            expect(finger.hand).toBe('left');
            expect(finger.position).toEqual({ x: 100, y: 200 });
            expect(finger.isSelected).toBe(false);
        });

        it('should throw error for invalid finger number', () => {
            expect(() => new Finger({
                number: 0,
                hand: 'left',
                position: { x: 100, y: 200 }
            })).toThrow();
        });

        it('should throw error for invalid hand', () => {
            expect(() => new Finger({
                number: 3,
                hand: 'invalid',
                position: { x: 100, y: 200 }
            })).toThrow();
        });
    });

    describe('select', () => {
        it('should set isSelected to true', () => {
            finger.select();
            expect(finger.isSelected).toBe(true);
        });

        it('should throw error if already selected', () => {
            finger.select();
            expect(() => finger.select()).toThrow();
        });
    });

    describe('deselect', () => {
        it('should set isSelected to false', () => {
            finger.select();
            finger.deselect();
            expect(finger.isSelected).toBe(false);
        });

        it('should not throw error if not selected', () => {
            expect(() => finger.deselect()).not.toThrow();
        });
    });

    describe('getFingersToLeft', () => {
        it('should return correct count for finger 3', () => {
            expect(finger.getFingersToLeft()).toBe(2);
        });

        it('should return 0 for finger 1', () => {
            const firstFinger = new Finger({
                number: 1,
                hand: 'left',
                position: { x: 0, y: 0 }
            });
            expect(firstFinger.getFingersToLeft()).toBe(0);
        });

        it('should return 9 for finger 10', () => {
            const lastFinger = new Finger({
                number: 10,
                hand: 'right',
                position: { x: 0, y: 0 }
            });
            expect(lastFinger.getFingersToLeft()).toBe(9);
        });
    });

    describe('getFingersToRight', () => {
        it('should return correct count for finger 3', () => {
            expect(finger.getFingersToRight()).toBe(7);
        });

        it('should return 9 for finger 1', () => {
            const firstFinger = new Finger({
                number: 1,
                hand: 'left',
                position: { x: 0, y: 0 }
            });
            expect(firstFinger.getFingersToRight()).toBe(9);
        });

        it('should return 0 for finger 10', () => {
            const lastFinger = new Finger({
                number: 10,
                hand: 'right',
                position: { x: 0, y: 0 }
            });
            expect(lastFinger.getFingersToRight()).toBe(0);
        });
    });

    describe('validate', () => {
        it('should return true for valid finger', () => {
            expect(finger.validate()).toBe(true);
        });

        it('should return false for invalid number', () => {
            finger.number = 0;
            expect(finger.validate()).toBe(false);
        });

        it('should return false for invalid hand', () => {
            finger.hand = 'invalid';
            expect(finger.validate()).toBe(false);
        });

        it('should return false for invalid position', () => {
            finger.position = { x: 'invalid', y: 200 };
            expect(finger.validate()).toBe(false);
        });
    });
});
