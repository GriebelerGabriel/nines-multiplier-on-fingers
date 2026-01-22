# Data Model: Nines Multiplication on Fingers

**Feature**: Nines Multiplication on Fingers (001-nines-fingers)
**Date**: 2026-01-21
**Purpose**: Define data entities, attributes, validation rules, and state management

## Entities

### Finger

Represents a numbered finger position (1-10) on the displayed hands.

**Attributes**:

| Attribute | Type | Description | Constraints |
|-----------|------|-------------|-------------|
| number | number | Finger position (1-10) | Must be integer between 1-10 inclusive |
| isSelected | boolean | Whether this finger is currently selected | Default: false |
| hand | string | Which hand the finger belongs to | Values: "left" (fingers 1-5), "right" (fingers 6-10) |
| position | object | Visual position coordinates | { x: number, y: number } relative to container |

**Validation Rules**:

- Number must be integer: `Number.isInteger(number)`
- Number must be in range: `number >= 1 && number <= 10`
- Hand must be valid: `hand === "left" || hand === "right"`
- Position coordinates must be numbers: `typeof position.x === "number" && typeof position.y === "number"`

**State Transitions**:

```
unselected → selected: User clicks finger, previous selection cleared
selected → unselected: User clicks different finger or presses Escape
selected → selected: User clicks same finger (no change)
```

**Derived Attributes**:

- `fingersToLeft`: Count of fingers with number < current finger number (for explanation)
- `fingersToRight`: Count of fingers with number > current finger number (for explanation)

### MultiplicationResult

Represents a calculated 9's multiplication table entry.

**Attributes**:

| Attribute | Type | Description | Constraints |
|-----------|------|-------------|-------------|
| multiplicand | number | First factor (always 9 for this feature) | Fixed: 9 |
| multiplier | number | Second factor (finger number) | Must be integer 1-10 |
| result | number | Calculated product (9 × multiplier) | Must equal 9 × multiplier |

**Validation Rules**:

- Multiplicand must be 9: `multiplicand === 9`
- Multiplier must be integer: `Number.isInteger(multiplier)`
- Multiplier must be in range: `multiplier >= 1 && multiplier <= 10`
- Result must be correct: `result === 9 * multiplier`

**Computed Attributes**:

- `formattedResult`: String in format "9 × N = result"
- `explanation`: Text describing finger pattern (e.g., "2 fingers to the left (tens), 7 fingers to the right (ones)")

### ApplicationState

Represents the overall application state.

**Attributes**:

| Attribute | Type | Description | Constraints |
|-----------|------|-------------|-------------|
| selectedFinger | number | Currently selected finger number | null or integer 1-10 |
| isInitialized | boolean | Whether app is ready for interaction | Default: false |
| fingers | array | Array of all 10 finger objects | Length: 10, numbers 1-10 |

**Validation Rules**:

- selectedFinger must be null or valid finger: `selectedFinger === null || (Number.isInteger(selectedFinger) && selectedFinger >= 1 && selectedFinger <= 10)`
- isInitialized must be boolean: `typeof isInitialized === "boolean"`
- fingers array must have exactly 10 items: `fingers.length === 10`

**State Transitions**:

```
uninitialized → initialized: App loads, images loaded, fingers configured
initialized → initialized: User selects/deselects finger (maintains initialized state)
```

## Data Relationships

### Finger → MultiplicationResult

Relationship: 1-to-1 (each finger maps to exactly one multiplication result)

**Mapping**: `multiplicationResult = { multiplicand: 9, multiplier: finger.number, result: 9 * finger.number }`

**Example**:
```
Finger { number: 3 } → MultiplicationResult { multiplicand: 9, multiplier: 3, result: 27 }
```

### Finger → Explanation

Relationship: 1-to-1 (each finger has a unique explanation text)

**Calculation**:
- `fingersToLeft = finger.number - 1`
- `fingersToRight = 10 - finger.number`
- Explanation format: "{fingersToLeft} finger(s) to the left (tens), {fingersToRight} finger(s) to the right (ones)"

**Examples**:
```
Finger 3: "2 fingers to the left (tens), 7 fingers to the right (ones)"
Finger 7: "6 fingers to the left (tens), 3 fingers to the right (ones)"
Finger 1: "0 fingers to the left (tens), 9 fingers to the right (ones)"
Finger 10: "9 fingers to the left (tens), 0 fingers to the right (ones)"
```

### ApplicationState → Finger

Relationship: 1-to-many (state contains all 10 fingers)

**Constraint**: Exactly 10 fingers must exist, numbered 1-10

**Invariant**: `fingers.every(f => f.number >= 1 && f.number <= 10) && fingers.filter(f => f.isSelected).length <= 1`

### ApplicationState → MultiplicationResult

Relationship: 0-to-1 (state has a result only when a finger is selected)

**Calculation**: If `selectedFinger` is not null, calculate result using selected finger

**Invariant**: `selectedFinger === null` implies no multiplication result displayed

## Constants

### Pre-computed Multiplication Table

```javascript
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
```

### Hand Configuration

```javascript
const HAND_CONFIG = {
  left: {
    fingers: [1, 2, 3, 4, 5],
    image: "assets/images/hand-left.png",
    position: { x: 0, y: 0 }
  },
  right: {
    fingers: [6, 7, 8, 9, 10],
    image: "assets/images/hand-right.png",
    position: { x: 0, y: 0 }
  }
};
```

### Display Constants

```javascript
const DISPLAY_CONFIG = {
  promptText: "Click a finger (1-10) to see the 9's multiplication result",
  emptyState: "Select a finger above to begin",
  selectedClassName: "finger-selected",
  highlightedClassName: "finger-highlighted"
};
```

## Initialization Sequence

1. Create 10 Finger objects with numbers 1-10
2. Assign each finger to appropriate hand (left: 1-5, right: 6-10)
3. Set all fingers to unselected (isSelected: false)
4. Set ApplicationState to initialized
5. Display prompt message to guide user

## Interaction Flow

### User Clicks Finger

1. User clicks finger with number N
2. Validate N is integer 1-10
3. Update ApplicationState:
   - Clear previous selection (set all fingers to isSelected: false)
   - Set finger N to isSelected: true
   - Set selectedFinger = N
4. Calculate MultiplicationResult for finger N
5. Generate explanation text for finger N
6. Update UI:
   - Highlight finger N visually
   - Display formatted result "9 × N = result"
   - Display explanation text

### User Changes Selection

1. User clicks different finger M (where M ≠ N)
2. Validate M is integer 1-10
3. Update ApplicationState:
   - Set finger N to isSelected: false
   - Set finger M to isSelected: true
   - Set selectedFinger = M
4. Calculate new MultiplicationResult for finger M
5. Generate new explanation text for finger M
6. Update UI with new values

### User Deselects (Escape or clicks elsewhere)

1. User presses Escape key or clicks outside hand display
2. Update ApplicationState:
   - Set all fingers to isSelected: false
   - Set selectedFinger = null
3. Clear UI:
   - Remove all finger highlights
   - Display prompt message
   - Clear result and explanation displays

## Error Handling

### Invalid Finger Selection

**Scenario**: User somehow selects invalid finger (e.g., number 11)

**Validation**: Check `selectedFinger` is null or integer 1-10

**Response**: Log error, reset to null, display prompt

### Image Load Failure

**Scenario**: Hand images fail to load

**Detection**: Image.onerror event

**Response**: Fallback to text-based display (numbered buttons 1-10), log error, continue functionality

### State Corruption

**Scenario**: Multiple fingers selected simultaneously

**Detection**: Validate invariant `fingers.filter(f => f.isSelected).length <= 1`

**Response**: Clear all selections, reset to initial state, log error

## Persistence

**Decision**: No persistence required

**Rationale**:
- Spec requires state to reset on page refresh
- Simple educational tool, no need to remember selections
- Aligns with Constitution Principle V (Dependency Simplicity)

**Behavior**: On page load, always start with no finger selected, display prompt message

## Data Model Summary

- **3 main entities**: Finger, MultiplicationResult, ApplicationState
- **1 computed entity**: Explanation (derived from finger)
- **3 constants**: MULTIPLICATION_TABLE, HAND_CONFIG, DISPLAY_CONFIG
- **No persistence**: Stateless application, reset on refresh
- **Simple state**: Minimal state management (only selected finger)
- **Pre-computed values**: All multiplication results known in advance
