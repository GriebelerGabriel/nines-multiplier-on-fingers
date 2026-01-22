# Quickstart: Nines Multiplication on Fingers

**Feature**: Nines Multiplication on Fingers (001-nines-fingers)
**Branch**: `001-nines-fingers`
**Last Updated**: 2026-01-21

## Overview

Interactive web application teaching the 9's multiplication table using visual finger selection on hand images. Users click on numbered fingers (1-10) to see the corresponding multiplication result and learn the finger counting pattern.

**Technology**: Vanilla JavaScript (ES2023+), no framework dependencies
**Testing**: Vitest with 80% line coverage requirement
**Deployment**: Static files (no build process needed)

## Prerequisites

- Node.js 18+ (for development testing with Vitest)
- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Text editor or IDE

## Project Structure

```
nines-multiplier-on-fingers/
├── index.html                 # Main HTML entry point
├── src/
│   ├── app.js                # Application entry point
│   ├── models/
│   │   ├── Finger.js         # Finger model
│   │   └── MultiplicationResult.js  # Result model
│   ├── components/
│   │   ├── HandDisplay.js    # Hand rendering component
│   │   ├── ResultDisplay.js  # Result display component
│   │   └── ExplanationDisplay.js  # Explanation component
│   └── utils/
│       ├── calculator.js     # Calculation utilities
│       └── selector.js       # Selection logic
├── assets/
│   └── images/
│       ├── hand-left.png     # Left hand (fingers 1-5)
│       └── hand-right.png    # Right hand (fingers 6-10)
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── specs/
│   └── 001-nines-fingers/
│       ├── spec.md
│       ├── plan.md
│       ├── research.md
│       ├── data-model.md
│       └── contracts/
└── README.md                 # Project documentation
```

## Quick Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd nines-multiplier-on-fingers
git checkout 001-nines-fingers
```

### 2. Install Development Dependencies

```bash
npm install
```

**Note**: Only development dependencies (Vitest) are installed. No runtime dependencies needed.

### 3. Add Hand Images

Download or create hand images for fingers:

**Requirements**:
- Left hand image: 5 fingers visible (to be numbered 1-5)
- Right hand image: 5 fingers visible (to be numbered 6-10)
- Format: PNG with transparency
- Size: ~800x600 pixels each (adjust as needed)
- Style: Clean, educational, high contrast

**Location**:
- Place left hand image at: `assets/images/hand-left.png`
- Place right hand image at: `assets/images/hand-right.png`

**Alternative**: Use placeholder images from services like:
- https://placehold.co (text-based placeholders)
- https://dummyimage.com (colored placeholders)
- Public domain hand images from Google Images (search for "hand illustration transparent png")

### 4. Run Application

Open `index.html` in a web browser:

**Option A - Direct File Open**:
```bash
# Double-click index.html or run:
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

**Option B - Local Server (recommended for development)**:
```bash
# Using Python
python -m http.server 8000

# Using Node.js (if http-server installed)
npx http-server -p 8000

# Then open: http://localhost:8000
```

### 5. Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (during development)
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- tests/unit/models/Finger.test.js
```

## Development Workflow

### Adding New Features

1. **Write tests first** (TDD approach per constitution):
   ```bash
   # Create test file
   touch tests/unit/models/YourModel.test.js
   
   # Write failing tests
   # Run tests: npm test
   ```

2. **Implement feature**:
   - Create source file
   - Write implementation to make tests pass
   - Run tests: `npm test`

3. **Verify coverage**:
   ```bash
   npm test -- --coverage
   # Ensure 80%+ line coverage
   ```

4. **Manual testing**:
   - Open index.html in browser
   - Test user flows from spec
   - Verify keyboard navigation
   - Test on different screen sizes

### Code Style Guidelines

Follow these conventions (per constitution):

**Naming**:
- Variables/Functions: `camelCase` (e.g., `selectedFinger`, `calculateResult()`)
- Classes: `PascalCase` (e.g., `Finger`, `MultiplicationResult`)
- Constants: `UPPER_CASE` (e.g., `TOTAL_FINGERS`, `MULTIPLIER`)

**File Structure**:
- One class/module per file
- File name matches class/module name (e.g., `Finger.js` for `class Finger`)

**Comments**:
- Only explain "why", not "what"
- Code should be self-documenting
- Use meaningful variable/function names

**Complexity**:
- Functions: ≤50 lines
- Classes: ≤300 lines
- If exceeded, refactor into smaller units

### Testing Guidelines

**Test Structure**:
```javascript
describe('ClassName', () => {
  describe('methodName', () => {
    it('should do something when condition', () => {
      // Arrange
      const input = ...;
      
      // Act
      const result = ...;
      
      // Assert
      expect(result).toBe(...);
    });
  });
});
```

**Coverage Requirements**:
- Line coverage: ≥80%
- Branch coverage: ≥70%

**Test Categories**:
- Unit tests: Test individual functions/methods in isolation
- Integration tests: Test component interactions
- E2E tests: Test complete user journeys

## Key Commands

```bash
# Development
npm test              # Run all tests
npm test -- --watch   # Run tests in watch mode
npm test -- --coverage  # Run with coverage report

# Browser testing
open index.html       # Open in browser (macOS)
start index.html      # Open in browser (Windows)

# Git
git status            # Check changes
git add .             # Stage changes
git commit -m "feat: implement feature"  # Commit
git push              # Push to remote
```

## Component Quick Reference

### Core Models

**Finger** (`src/models/Finger.js`):
```javascript
const finger = new Finger({
  number: 3,
  hand: 'left',
  position: { x: 100, y: 200 }
});
finger.select();
const leftCount = finger.getFingersToLeft(); // 2
```

**MultiplicationResult** (`src/models/MultiplicationResult.js`):
```javascript
const result = new MultiplicationResult(3);
console.log(result.getResult()); // 27
console.log(result.getFormattedResult()); // "9 × 3 = 27"
```

### Core Utilities

**Calculator** (`src/utils/calculator.js`):
```javascript
import { calculate, isValidMultiplier } from './utils/calculator.js';

const result = calculate(3); // 27
const isValid = isValidMultiplier(11); // false
```

**Selector** (`src/utils/selector.js`):
```javascript
import { selectFinger, deselectAll } from './utils/selector.js';

selectFinger(3, fingers); // Selects finger 3
deselectAll(fingers); // Deselects all
```

### Components

**HandDisplay** (`src/components/HandDisplay.js`):
```javascript
const container = document.getElementById('hands-container');
const display = new HandDisplay(container, fingers, onFingerClick);
display.render();
display.updateHighlight(3); // Highlight finger 3
```

**ResultDisplay** (`src/components/ResultDisplay.js`):
```javascript
const container = document.getElementById('result-container');
const display = new ResultDisplay(container);
display.showResult(result); // Show "9 × 3 = 27"
display.showPrompt(); // Show "Click a finger..."
```

## Common Issues & Solutions

### Images Not Displaying

**Problem**: Hand images don't appear or show broken image icons

**Solutions**:
1. Check image files exist at `assets/images/`
2. Verify image file names match: `hand-left.png`, `hand-right.png`
3. Check browser console for 404 errors
4. Try absolute paths in development or use local server

**Fallback**: Add error handling to use text-based buttons if images fail to load

### Tests Failing

**Problem**: Tests fail unexpectedly

**Troubleshooting**:
1. Check test output for specific error messages
2. Verify test data matches expected format
3. Check if implementation changed without updating tests
4. Run specific failing test: `npm test -- <test-file-path>`

### Keyboard Navigation Not Working

**Problem**: Arrow keys or number keys don't select fingers

**Solutions**:
1. Ensure event listener is attached on app initialization
2. Check browser console for JavaScript errors
3. Verify keyboard event handler is not returning early
4. Test different browsers for compatibility

### Responsive Layout Issues

**Problem**: Layout breaks on mobile devices

**Solutions**:
1. Use CSS flexbox or grid for responsive layout
2. Add viewport meta tag to index.html: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
3. Test on different screen sizes using browser DevTools
4. Use percentage-based widths and max-width for containers

## Deployment

### Static File Hosting

Since this is a vanilla JavaScript application with no build process, deployment is simple:

**GitHub Pages**:
```bash
# Build (if needed) - currently none
# Deploy to gh-pages branch
git subtree push --prefix . origin gh-pages
```

**Netlify**:
```bash
# Drag and drop project folder to Netlify dashboard
# Or use Netlify CLI: npx netlify deploy --prod --dir=.
```

**Vercel**:
```bash
# Install Vercel CLI: npm i -g vercel
# Deploy: vercel --prod
```

**Apache/Nginx**:
- Copy all files to web server directory
- Ensure index.html is the default document
- Configure caching for static assets

### Performance Optimization

**Before Deployment**:
1. Minify JavaScript files (optional, but recommended)
   ```bash
   npx terser src/*.js -c -m -o dist/app.min.js
   ```
2. Optimize images:
   ```bash
   # Use tools like:
   # - pngquant (lossy PNG compression)
   # - optipng (lossless PNG optimization)
   ```
3. Enable gzip compression on web server
4. Set up CDN for static assets

**Performance Targets** (from spec):
- Initial load: <2 seconds
- Finger selection response: <100ms
- Rendering: 60fps

## Accessibility Testing

Ensure keyboard navigation works:
1. Tab through interactive elements
2. Use arrow keys to navigate fingers
3. Use number keys 1-0 to select fingers
4. Press Escape to deselect

Test with screen reader:
1. Enable screen reader (NVDA on Windows, VoiceOver on macOS)
2. Navigate through fingers
3. Verify announcements for selections and results

Check color contrast:
1. Use browser DevTools Lighthouse audit
2. Ensure WCAG AA compliance (4.5:1 contrast ratio for text)

## Getting Help

**Documentation**:
- Feature specification: `specs/001-nines-fingers/spec.md`
- Implementation plan: `specs/001-nines-fingers/plan.md`
- Data model: `specs/001-nines-fingers/data-model.md`
- Component interfaces: `specs/001-nines-fingers/contracts/component-interfaces.md`

**Constitution**:
- Project constitution: `.specify/memory/constitution.md`
- Code quality principles and requirements

**Troubleshooting**:
1. Check browser console for errors
2. Review test output
3. Verify data model matches expectations
4. Check component interface contracts

## Next Steps

1. ✅ Set up project structure
2. ✅ Add hand images to `assets/images/`
3. ✅ Open index.html in browser to test
4. ✅ Run tests to verify coverage
5. ✅ Implement missing components if needed
6. ✅ Add new features following TDD approach
7. ✅ Deploy to static hosting

Happy coding! 🚀
