import { MultiplicationResult } from '../models/MultiplicationResult.js';

const PROMPT_MESSAGE = 'Click a number (1-10) to see the 9\'s multiplication result';

export class ResultDisplay {
    #container;
    #popupOverlay;
    #popupEquation;
    #popupResult;
    #popupExplanation;
    #closeButton;

    constructor(container) {
        if (!container) {
            throw new Error('Container must be a valid DOM element');
        }

        this.#container = container;
        this.#initializePopup();
    }

    #initializePopup() {
        this.#popupOverlay = document.getElementById('popup-overlay');
        this.#popupEquation = document.getElementById('popup-equation');
        this.#popupResult = document.getElementById('popup-result');
        this.#popupExplanation = document.getElementById('popup-explanation');
        this.#closeButton = document.getElementById('close-popup');

        if (this.#closeButton) {
            this.#closeButton.addEventListener('click', () => this.closePopup());
        }

        if (this.#popupOverlay) {
            this.#popupOverlay.addEventListener('click', (e) => {
                if (e.target === this.#popupOverlay) {
                    this.closePopup();
                }
            });
        }
    }

    showPrompt() {
        this.#container.innerHTML = `<div class="prompt">${PROMPT_MESSAGE}</div>`;
    }

    showResult(result, explanation = '') {
        if (!(result instanceof MultiplicationResult)) {
            throw new Error('Result must be a MultiplicationResult instance');
        }

        if (this.#popupOverlay && this.#popupEquation && this.#popupResult) {
            this.#popupEquation.textContent = `${result.multiplier} × 9 =`;
            this.#popupResult.textContent = result.result;
            if (this.#popupExplanation) {
                this.#popupExplanation.textContent = explanation;
            }
            this.#popupOverlay.classList.add('active');
        }
    }

    closePopup() {
        if (this.#popupOverlay) {
            this.#popupOverlay.classList.remove('active');
        }
    }

    clear() {
        this.#container.innerHTML = '';
    }

    destroy() {
        this.closePopup();
        this.clear();
    }
}
