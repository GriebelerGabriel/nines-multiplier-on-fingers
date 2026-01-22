export class Finger {
    constructor(config) {
        const { number, hand, position } = config;

        if (!Number.isInteger(number) || number < 1 || number > 10) {
            throw new Error(`Finger number must be an integer between 1 and 10, got: ${number}`);
        }

        if (hand !== 'left' && hand !== 'right') {
            throw new Error(`Hand must be 'left' or 'right', got: ${hand}`);
        }

        if (!position || typeof position.x !== 'number' || typeof position.y !== 'number') {
            throw new Error('Position must be an object with x and y coordinates');
        }

        this.number = number;
        this.hand = hand;
        this.position = position;
        this.isSelected = false;
    }

    select() {
        if (this.isSelected) {
            throw new Error(`Finger ${this.number} is already selected`);
        }
        this.isSelected = true;
    }

    deselect() {
        this.isSelected = false;
    }

    getFingersToLeft() {
        return this.number - 1;
    }

    getFingersToRight() {
        return 10 - this.number;
    }

    validate() {
        const validNumber = Number.isInteger(this.number) && this.number >= 1 && this.number <= 10;
        const validHand = this.hand === 'left' || this.hand === 'right';
        const validPosition = this.position &&
            typeof this.position.x === 'number' &&
            typeof this.position.y === 'number';

        return validNumber && validHand && validPosition;
    }
}
