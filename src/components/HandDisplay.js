import { selectFinger, deselectAll } from '../utils/selector.js';

export class HandDisplay {
    #container;
    #fingers;
    #fingerLabels = [];
    #onFingerClick;

    constructor(container, fingers, onFingerClick) {
        if (!container || typeof container.appendChild !== 'function') {
            throw new Error('Container must be a valid DOM element');
        }

        if (!Array.isArray(fingers) || fingers.length === 0) {
            throw new Error('Fingers must be a non-empty array');
        }

        if (typeof onFingerClick !== 'function') {
            throw new Error('onFingerClick must be a function');
        }

        this.#container = container;
        this.#fingers = fingers;
        this.#onFingerClick = onFingerClick;
    }

    render() {
        this.#fingers.forEach(finger => {
            const label = document.createElement('div');
            label.className = 'finger-label';
            label.textContent = finger.number.toString();
            label.dataset.fingerNumber = finger.number.toString();

            label.addEventListener('click', () => {
                this.#onFingerClick(finger.number);
            });

            this.#fingerLabels.push(label);
            this.#container.appendChild(label);
        });
    }

    updateHighlight(selectedFingerNumber) {
        this.#fingerLabels.forEach(label => {
            const fingerNumber = parseInt(label.dataset.fingerNumber);

            if (fingerNumber === selectedFingerNumber) {
                label.classList.add('selected');
            } else {
                label.classList.remove('selected');
            }
        });
    }

    showLoading() {
        this.#container.innerHTML = '<p>Loading numbers...</p>';
    }

    destroy() {
        this.#fingerLabels.forEach(label => {
            label.removeEventListener('click', this.#onFingerClick);
        });

        this.#fingerLabels = [];
    }
}
