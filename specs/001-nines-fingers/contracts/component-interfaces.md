# Component Interfaces: Nines Multiplication on Fingers

**Feature**: Nines Multiplication on Fingers (001-nines-fingers)
**Date**: 2026-01-21
**Purpose**: Define component interfaces and contracts for internal JavaScript modules

## Overview

This specification defines the interfaces between JavaScript components in the application. Since this is a client-side vanilla JavaScript application with no backend, these contracts define internal module interfaces rather than REST API endpoints.

## Module Interfaces

### Finger Model (`src/models/Finger.js`)

**Purpose**: Encapsulate finger state and validation logic

**Constructor**:

```javascript
/**
 * Creates a new Finger instance
 * @param {Object} config - Finger configuration
 * @param {number} config.number - Finger number (1-10)
 * @param {string} config.hand - Hand identifier ("left" or "right")
 * @param {Object} config.position - Visual position {x, y}
 */
constructor(config)
```

**Methods**:

```javascript
/**
 * Select this finger
 * @throws {Error} if finger already selected
 */
select(): void

/**
 * Deselect this finger
 */
deselect(): void

/**
 * Get count of fingers to the left (for explanation)
 * @returns {number} Count of fingers with number < this.number
 */
getFingersToLeft(): number

/**
 * Get count of fingers to the right (for explanation)
 * @returns {number} Count of fingers with number > this.number
 */
getFingersToRight(): number

/**
 * Validate finger state
 * @returns {boolean} True if valid
 */
validate(): boolean
```

**Properties**:

```javascript
{
  number: number,        // Read-only
  hand: string,          // Read-only ("left" | "right")
  position: object,      // Read-only {x, y}
  isSelected: boolean    // Read-write
}
```

**Events**: None (state changes handled via methods)

---

### MultiplicationResult Model (`src/models/MultiplicationResult.js`)

**Purpose**: Encapsulate multiplication calculation and result formatting

**Constructor**:

```javascript
/**
 * Creates a new MultiplicationResult instance
 * @param {number} multiplier - Finger number (1-10)
 * @throws {Error} if multiplier not in range 1-10
 */
constructor(multiplier)
```

**Methods**:

```javascript
/**
 * Get formatted result string
 * @returns {string} Format: "9 × N = result"
 */
getFormattedResult(): string

/**
 * Get explanation text
 * @param {number} fingersToLeft - Count of fingers to left
 * @param {number} fingersToRight - Count of fingers to right
 * @returns {string} Explanation text
 */
getExplanation(fingersToLeft, fingersToRight): string

/**
 * Get numeric result
 * @returns {number} 9 × multiplier
 */
getResult(): number

/**
 * Validate result
 * @returns {boolean} True if valid
 */
validate(): boolean
```

**Properties**:

```javascript
{
  multiplicand: number,  // Read-only (always 9)
  multiplier: number,     // Read-only (finger number)
  result: number          // Read-only (9 × multiplier)
}
```

**Events**: None

---

### Calculator Utility (`src/utils/calculator.js`)

**Purpose**: Provide 9's multiplication calculation functions

**Functions**:

```javascript
/**
 * Calculate 9's multiplication result
 * @param {number} multiplier - Multiplier (1-10)
 * @returns {number} Result of 9 × multiplier
 * @throws {Error} if multiplier not in range 1-10
 */
function calculate(multiplier): number

/**
 * Validate multiplier value
 * @param {number} value - Value to validate
 * @returns {boolean} True if valid (integer 1-10)
 */
function isValidMultiplier(value): boolean

/**
 * Get all pre-computed multiplication results
 * @returns {Object} Map of multiplier → result
 */
function getMultiplicationTable(): Object

/**
 * Format multiplication as string
 * @param {number} multiplier - Multiplier (1-10)
 * @returns {string} Format: "9 × N = result"
 */
function formatMultiplication(multiplier): string
```

**Events**: None

---

### Selector Utility (`src/utils/selector.js`)

**Purpose**: Handle finger selection and highlighting logic

**Functions**:

```javascript
/**
 * Select a finger and update state
 * @param {number} fingerNumber - Finger number to select (1-10)
 * @param {Array<Finger>} fingers - Array of all finger objects
 * @returns {Finger} Selected finger object
 * @throws {Error} if finger number invalid
 */
function selectFinger(fingerNumber, fingers): Finger

/**
 * Deselect all fingers
 * @param {Array<Finger>} fingers - Array of all finger objects
 */
function deselectAll(fingers): void

/**
 * Get currently selected finger
 * @param {Array<Finger>} fingers - Array of all finger objects
 * @returns {Finger|null} Selected finger or null if none selected
 */
function getSelectedFinger(fingers): Finger|null

/**
 * Validate selection state (only one finger selected)
 * @param {Array<Finger>} fingers - Array of all finger objects
 * @returns {boolean} True if valid
 */
function validateSelection(fingers): boolean
```

**Events**: None

---

### HandDisplay Component (`src/components/HandDisplay.js`)

**Purpose**: Render hands and handle finger click events

**Constructor**:

```javascript
/**
 * Creates HandDisplay component
 * @param {HTMLElement} container - DOM element to render into
 * @param {Array<Finger>} fingers - Array of finger objects
 * @param {Function} onFingerClick - Callback when finger clicked
 */
constructor(container, fingers, onFingerClick)
```

**Methods**:

```javascript
/**
 * Render hands and fingers
 */
render(): void

/**
 * Update finger visual state (highlight selected finger)
 * @param {number} selectedFingerNumber - Currently selected finger number
 */
updateHighlight(selectedFingerNumber): void

/**
 * Show loading state while images load
 */
showLoading(): void

/**
 * Show hands after images loaded
 */
showHands(): void

/**
 * Show error state if images fail to load
 */
showError(): void

/**
 * Destroy component and cleanup event listeners
 */
destroy(): void
```

**Properties**:

```javascript
{
  container: HTMLElement,    // Read-only
  fingers: Array<Finger>,    // Read-only
  isLoaded: boolean          // Read-only
}
```

**Events**:

- `onFingerClick(fingerNumber: number)` - Fired when user clicks a finger
- `onImagesLoaded()` - Fired when hand images finish loading
- `onImagesError()` - Fired if hand images fail to load

---

### ResultDisplay Component (`src/components/ResultDisplay.js`)

**Purpose**: Display multiplication result and explanation

**Constructor**:

```javascript
/**
 * Creates ResultDisplay component
 * @param {HTMLElement} container - DOM element to render into
 */
constructor(container)
```

**Methods**:

```javascript
/**
 * Show prompt message when no finger selected
 */
showPrompt(): void

/**
 * Show multiplication result
 * @param {MultiplicationResult} result - Result to display
 */
showResult(result): void

/**
 * Show explanation text
 * @param {string} explanation - Explanation text to display
 */
showExplanation(explanation): void

/**
 * Clear all displays
 */
clear(): void

/**
 * Destroy component and cleanup
 */
destroy(): void
```

**Properties**:

```javascript
{
  container: HTMLElement    // Read-only
}
```

**Events**: None

---

### ExplanationDisplay Component (`src/components/ExplanationDisplay.js`)

**Purpose**: Display educational explanation of finger counting pattern

**Constructor**:

```javascript
/**
 * Creates ExplanationDisplay component
 * @param {HTMLElement} container - DOM element to render into
 */
constructor(container)
```

**Methods**:

```javascript
/**
 * Show explanation for selected finger
 * @param {number} fingersToLeft - Count of fingers to left
 * @param {number} fingersToRight - Count of fingers to right
 */
showExplanation(fingersToLeft, fingersToRight): void

/**
 * Clear explanation display
 */
clear(): void

/**
 * Destroy component and cleanup
 */
destroy(): void
```

**Properties**:

```javascript
{
  container: HTMLElement    // Read-only
}
```

**Events**: None

---

## Application Interface (`src/app.js`)

**Purpose**: Main application entry point and orchestration

**Methods**:

```javascript
/**
 * Initialize application
 * @returns {Promise<void>}
 */
async initialize(): Promise<void>

/**
 * Handle finger selection
 * @param {number} fingerNumber - Finger number selected
 */
handleFingerSelection(fingerNumber): void

/**
 * Handle keyboard navigation
 * @param {KeyboardEvent} event - Keyboard event
 */
handleKeyboard(event): void

/**
 * Reset application state
 */
reset(): void

/**
 * Handle page resize
 */
handleResize(): void
```

**State**:

```javascript
{
  selectedFinger: number|null,
  fingers: Array<Finger>,
  isInitialized: boolean
}
```

**Events**:

- `onFingerSelected(fingerNumber: number)` - Fired when finger selected
- `onFingerDeselected()` - Fired when finger deselected
- `onReady()` - Fired when app initialized and ready for interaction

---

## Component Interaction Flow

```
User Interaction
    ↓
HandDisplay.onFingerClick(fingerNumber)
    ↓
App.handleFingerSelection(fingerNumber)
    ↓
Selector.selectFinger(fingerNumber, fingers)
    ↓
Finger objects updated (isSelected state)
    ↓
Calculator.calculate(fingerNumber) → MultiplicationResult
    ↓
ResultDisplay.showResult(result)
    ↓
HandDisplay.updateHighlight(fingerNumber)
    ↓
ExplanationDisplay.showExplanation(fingersToLeft, fingersToRight)
```

## Error Handling Contracts

### Finger Selection Errors

**Error Types**:

- `InvalidFingerError`: Finger number not in range 1-10
- `AlreadySelectedError`: Attempting to select already selected finger

**Recovery**: Log error, display user-friendly message, maintain current state

### Calculation Errors

**Error Types**:

- `InvalidMultiplierError`: Multiplier not integer or not in range 1-10

**Recovery**: Log error, display prompt message, reset state

### Rendering Errors

**Error Types**:

- `ContainerNotFoundError`: DOM container element not found
- `ImageLoadError`: Hand images failed to load

**Recovery**:
- Container not found: Log fatal error, display error message
- Image load error: Fallback to text-based display, log error

## Event Bus (Optional)

If decoupled architecture preferred, use simple event bus:

```javascript
class EventBus {
  on(event, callback)
  emit(event, data)
  off(event, callback)
}
```

**Events**:

- `finger:selected`
- `finger:deselected`
- `app:ready`
- `images:loaded`
- `images:error`

## Contract Validation

### Runtime Validation

Each component MUST validate inputs according to its interface contract:

- Type checking: `typeof value === expectedType`
- Range checking: `value >= min && value <= max`
- Null checking: `value !== null && value !== undefined`
- Array checking: `Array.isArray(value) && value.length === expectedLength`

### Testing Requirements

Each component MUST have unit tests covering:

- All public methods
- All error conditions
- Edge cases (null inputs, boundary values)
- State transitions

### Compliance

All implementations MUST:

1. Match interface signatures exactly
2. Return specified types
3. Throw specified errors
4. Fire specified events
5. Maintain specified invariants

## Versioning

Interface version: 1.0.0

Breaking changes require major version increment:
- Adding/removing parameters
- Changing return types
- Removing methods

Non-breaking changes require minor version increment:
- Adding optional parameters
- Adding new methods
- Adding new events

Bug fixes require patch version increment:
- Fixing implementation bugs
- Improving error messages
- Performance improvements
