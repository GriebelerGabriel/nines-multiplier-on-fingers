import { Finger } from '../models/Finger.js';

export function selectFinger(fingerNumber, fingers) {
    if (!Number.isInteger(fingerNumber) || fingerNumber < 1 || fingerNumber > 10) {
        throw new Error(`Invalid finger number: ${fingerNumber}. Must be an integer between 1 and 10.`);
    }

    if (fingerNumber < 1 || fingerNumber > fingers.length) {
        throw new Error(`Finger number ${fingerNumber} is out of range`);
    }

    const fingerIndex = fingerNumber - 1;
    const selectedFinger = fingers[fingerIndex];

    if (!selectedFinger) {
        throw new Error(`Finger ${fingerNumber} not found`);
    }

    deselectAll(fingers);
    selectedFinger.select();

    return selectedFinger;
}

export function deselectAll(fingers) {
    if (!Array.isArray(fingers)) {
        return;
    }

    fingers.forEach(finger => {
        if (finger && typeof finger.deselect === 'function') {
            finger.deselect();
        }
    });
}

export function getSelectedFinger(fingers) {
    if (!Array.isArray(fingers)) {
        return null;
    }

    return fingers.find(finger => finger && finger.isSelected) || null;
}

export function validateSelection(fingers) {
    if (!Array.isArray(fingers)) {
        return true;
    }

    const selectedCount = fingers.filter(finger => finger && finger.isSelected).length;
    return selectedCount <= 1;
}
