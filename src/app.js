import { Finger } from './models/Finger.js';
import { MultiplicationResult } from './models/MultiplicationResult.js';
import { selectFinger, deselectAll } from './utils/selector.js';
import { HandDisplay } from './components/HandDisplay.js';
import { ResultDisplay } from './components/ResultDisplay.js';
import { ExplanationDisplay } from './components/ExplanationDisplay.js';

export class App {
    #fingers = [];
    #selectedFinger = null;
    #handDisplay = null;
    #resultDisplay = null;
    #explanationDisplay = null;

    async initialize() {
        this.#initializeFingers();
        await this.#initializeDisplays();
    }

    #initializeFingers() {
        const positions = [
            { x: 50, y: 50 },
            { x: 120, y: 40 },
            { x: 190, y: 30 },
            { x: 260, y: 40 },
            { x: 330, y: 50 },
            { x: 50, y: 50 },
            { x: 120, y: 40 },
            { x: 190, y: 30 },
            { x: 260, y: 40 },
            { x: 330, y: 50 }
        ];

        for (let i = 1; i <= 10; i++) {
            this.#fingers.push(new Finger({
                number: i,
                hand: i <= 5 ? 'left' : 'right',
                position: positions[i - 1]
            }));
        }
    }

    async #initializeDisplays() {
        const handsContainer = document.getElementById('hands-container');
        const resultContainer = document.getElementById('result');
        const explanationContainer = document.getElementById('explanation-container');

        if (!handsContainer || !resultContainer || !explanationContainer) {
            console.error('Required containers not found');
            return;
        }

        this.#handDisplay = new HandDisplay(
            handsContainer,
            this.#fingers,
            (fingerNumber) => this.handleFingerSelection(fingerNumber)
        );

        this.#resultDisplay = new ResultDisplay(resultContainer);
        this.#explanationDisplay = new ExplanationDisplay(explanationContainer);

        this.#handDisplay.render();
        this.#resultDisplay.showPrompt();
        this.#explanationDisplay.clear();
    }

    handleFingerSelection(fingerNumber) {
        try {
            const selectedFinger = selectFinger(fingerNumber, this.#fingers);
            this.#selectedFinger = selectedFinger;

            const result = new MultiplicationResult(fingerNumber);

            this.#handDisplay.updateHighlight(fingerNumber);

            const fingersToLeft = this.#selectedFinger.getFingersToLeft();
            const fingersToRight = this.#selectedFinger.getFingersToRight();
            const explanation = `Fingers 1-${fingerNumber - 1} (${fingersToLeft} ${fingersToLeft === 1 ? 'finger' : 'fingers'}) represent the tens digit, and fingers ${fingerNumber + 1}-10 (${fingersToRight} ${fingersToRight === 1 ? 'finger' : 'fingers'}) represent the ones digit`;

            this.#resultDisplay.showResult(result, explanation);
        } catch (error) {
            console.error('Error selecting finger:', error.message);
            this.#showErrorMessage('Unable to select finger. Please try again.');
        }
    }

    deselect() {
        if (this.#selectedFinger) {
            deselectAll(this.#fingers);
            this.#selectedFinger = null;

            this.#handDisplay.updateHighlight(null);
            this.#resultDisplay.showPrompt();
            this.#explanationDisplay.clear();
        }
    }

    #showErrorMessage(message) {
        if (this.#resultDisplay) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.color = 'red';
            errorDiv.style.padding = '10px';
            errorDiv.style.marginTop = '10px';
            errorDiv.style.border = '1px solid red';
            errorDiv.style.borderRadius = '5px';
            errorDiv.textContent = message;

            const resultContainer = document.getElementById('result');
            if (resultContainer) {
                resultContainer.appendChild(errorDiv);

                setTimeout(() => {
                    errorDiv.remove();
                }, 3000);
            }
        }
    }

    destroy() {
        if (this.#handDisplay) {
            this.#handDisplay.destroy();
        }

        if (this.#resultDisplay) {
            this.#resultDisplay.destroy();
        }

        if (this.#explanationDisplay) {
            this.#explanationDisplay.destroy();
        }
    }
}

const app = new App();

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await app.initialize();
    } catch (error) {
        console.error('Failed to initialize application:', error);
    }
});
