const MULTIPLICATION_TABLE = {
    1: 9,
    2: 18,
    3: 27,
    4: 36,
    5: 45,
    6: 54,
    7: 63,
    8: 72,
    9: 81,
    10: 90
};

export function calculate(multiplier) {
    if (!isValidMultiplier(multiplier)) {
        throw new Error(`Invalid multiplier: ${multiplier}. Must be an integer between 1 and 10.`);
    }
    return 9 * multiplier;
}

export function isValidMultiplier(value) {
    return Number.isInteger(value) && value >= 1 && value <= 10;
}

export function formatMultiplication(multiplier) {
    if (!isValidMultiplier(multiplier)) {
        throw new Error(`Invalid multiplier: ${multiplier}. Must be an integer between 1 and 10.`);
    }
    return `9 × ${multiplier} = ${9 * multiplier}`;
}

export function getMultiplicationTable() {
    return { ...MULTIPLICATION_TABLE };
}
