export class MultiplicationResult {
    #multiplicand;
    #multiplier;
    #result;

    constructor(multiplier) {
        if (!Number.isInteger(multiplier) || multiplier < 1 || multiplier > 10) {
            throw new Error(`Multiplier must be an integer between 1 and 10, got: ${multiplier}`);
        }

        this.#multiplicand = 9;
        this.#multiplier = multiplier;
        this.#result = 9 * multiplier;
    }

    get multiplicand() {
        return this.#multiplicand;
    }

    get multiplier() {
        return this.#multiplier;
    }

    get result() {
        return this.#result;
    }

    getFormattedResult() {
        return `${this.#multiplicand} × ${this.#multiplier} = ${this.#result}`;
    }

    getExplanation(fingersToLeft, fingersToRight) {
        if (typeof fingersToLeft !== 'number' || typeof fingersToRight !== 'number') {
            throw new Error('fingersToLeft and fingersToRight must be numbers');
        }

        const leftText = fingersToLeft === 1 ? 'finger' : 'fingers';
        const rightText = fingersToRight === 1 ? 'finger' : 'fingers';

        return `${fingersToLeft} ${leftText} to the left (tens), ${fingersToRight} ${rightText} to the right (ones)`;
    }

    validate() {
        const validMultiplicand = this.#multiplicand === 9;
        const validMultiplier = Number.isInteger(this.#multiplier) &&
            this.#multiplier >= 1 &&
            this.#multiplier <= 10;
        const validResult = this.#result === this.#multiplicand * this.#multiplier;

        return validMultiplicand && validMultiplier && validResult;
    }
}
