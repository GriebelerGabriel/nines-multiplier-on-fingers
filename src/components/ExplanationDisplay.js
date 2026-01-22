export class ExplanationDisplay {
    #container;

    constructor(container) {
        if (!container) {
            throw new Error('Container must be a valid DOM element');
        }

        this.#container = container;
    }

    showExplanation(fingerNumber, fingersToLeft, fingersToRight) {
        if (typeof fingerNumber !== 'number' || typeof fingersToLeft !== 'number' || typeof fingersToRight !== 'number') {
            throw new Error('fingerNumber, fingersToLeft and fingersToRight must be numbers');
        }

        this.#container.innerHTML = `
            <div class="explanation">
                See popup for detailed explanation
            </div>
        `;
    }

    clear() {
        this.#container.innerHTML = '';
    }

    destroy() {
        this.clear();
    }
}
