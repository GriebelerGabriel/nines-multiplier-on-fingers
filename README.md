# Nines Multiplication on Fingers

Interactive web application teaching the 9's multiplication table using visual finger selection on hand images.

## 👨‍💻 About This Project

This project was **entirely written by AI agents** using:
- **Speckit**: AI-powered project management and development platform
- **GLM4.7**: Large language model used for code generation and development
- **OpenCode**: AI-driven CLI tool for software engineering assistance

## 🎯 Features

- **Visual Finger Selection**: Click on numbered fingers (1-10) displayed on hand graphics
- **Instant Results**: See the corresponding 9's multiplication result immediately
- **Educational Explanation**: Learn the finger counting pattern (fingers left = tens, fingers right = ones)
- **Responsive Design**: Works on desktop and mobile devices (320px minimum width)
- **Accessibility Support**: ARIA labels, screen reader compatible
- **Clean Code**: Vanilla JavaScript, no runtime dependencies, minimal and maintainable

## 📋 Prerequisites

- Node.js 18+ (for development testing only)
- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- No external runtime dependencies required

## 🚀 Quick Start

### 1. Clone and Setup

```bash
git clone <repository-url>
cd nines-multiplier-on-fingers
git checkout main
```

### 2. Install Dependencies (Development Only)

```bash
npm install
```

**Note**: Only development dependencies (Vitest for testing) are installed. No runtime dependencies needed.

### 3. Add Hand Images

Download or create hand images for fingers:

**Requirements**:
- Left hand image: 5 fingers visible (to be numbered 1-5)
- Right hand image: 5 fingers visible (to be numbered 6-10)
- Format: PNG with transparency
- Style: Clean, educational, high contrast

**Location**:
- Place left hand image at: `assets/images/hand-left.png`
- Place right hand image at: `assets/images/hand-right.png`

**Alternative**: Use placeholder images from:
- https://placehold.co (text-based placeholders)
- https://dummyimage.com (colored placeholders)
- Public domain hand images from Google Images

### 4. Run Application

**Option A - Direct File Open**:
```bash
# Double-click index.html or run:
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

**Option B - Local Server** (recommended):
```bash
# Using npm start (Node.js http-server)
npm start

# Or using Python
python -m http.server 8002

# Then open: http://localhost:8002
```

### 5. Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (development)
npm test --watch

# Run tests with coverage
npm test --coverage

# Run specific test file
npm test -- tests/unit/models/Finger.test.js
```

## 📁 Project Structure

```text
nines-multiplier-on-fingers/
├── index.html                 # Main HTML entry point
├── vitest.config.js          # Vitest configuration
├── package.json               # Project dependencies and scripts
├── src/
│   ├── app.js                # Application entry point
│   ├── models/
│   │   ├── Finger.js         # Finger data model
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
│   │   ├── models/
│   │   └── utils/
│   ├── integration/
│   └── e2e/
├── specs/
│   └── 001-nines-fingers/
│       ├── spec.md
│       ├── plan.md
│       ├── research.md
│       ├── data-model.md
│       ├── contracts/
│       ├── quickstart.md
│       └── tasks.md
└── README.md                 # This file
```

## 🎮 Usage

### Mouse/Touch Interaction

1. Open the application in a web browser
2. Click on any finger (1-10) to select it
3. View the multiplication result (e.g., "9 × 3 = 27")
4. Read the educational explanation about finger counting pattern
5. Click a different finger to change selection
6. Click outside or press Escape to deselect

### Mobile Interaction

- Tap on any finger to select it
- Result and explanation update automatically
- Tap outside or use device back button to deselect

## 🧪 Development Workflow

### Adding New Features

1. **Write tests first** (TDD approach):
   ```bash
   # Create test file
   touch tests/unit/YourModel.test.js

   # Write failing tests
   # Run tests: npm test
   ```

2. **Implement feature**:
   - Create source file
   - Write implementation to make tests pass
   - Run tests: `npm test`

3. **Verify coverage**:
   ```bash
   npm test --coverage
   # Ensure 80%+ line coverage
   ```

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

## 📊 Performance Targets

- **Initial load**: <2 seconds
- **Finger selection response**: <100ms
- **Rendering**: 60fps (smooth animations)

## 🚦 Accessibility

- **Screen reader support**: ARIA labels and roles, live regions for updates
- **High contrast**: WCAG AA compliant color ratios
- **Responsive**: Works on screens as small as 320px width

## 🔒 Deployment

### Static File Hosting

Since this is a vanilla JavaScript application with no build process, deployment is simple:

**GitHub Pages**:
```bash
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
1. Minify JavaScript files (optional):
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

## 🧪 Testing

### Unit Testing

Tests individual components and functions in isolation.

Run unit tests:
```bash
npm test tests/unit/
```

### Integration Testing

Tests component interactions and data flow.

Run integration tests:
```bash
npm test tests/integration/
```

### End-to-End Testing

Tests complete user journeys from initial state to final result.

Run E2E tests:
```bash
npm test tests/e2e/
```

### Manual Testing

1. Open index.html in browser
2. Test all 10 finger selections (1-10)
3. Verify correct multiplication results
4. Test on mobile device or using browser DevTools responsive mode
5. Verify explanation text accuracy
6. Test rapid clicking
7. Test page refresh (state should reset)

## 📖 Documentation

- **Feature Specification**: `specs/001-nines-fingers/spec.md`
- **Implementation Plan**: `specs/001-nines-fingers/plan.md`
- **Data Model**: `specs/001-nines-fingers/data-model.md`
- **Component Interfaces**: `specs/001-nines-fingers/contracts/component-interfaces.md`
- **Research Decisions**: `specs/001-nines-fingers/research.md`
- **Task List**: `specs/001-nines-fingers/tasks.md`

## ⚖️ Constitution

Project follows the Nines Multiplier on Fingers Constitution:

- **Code Quality First**: Consistent style, complexity limits, self-documenting code
- **Testing Standards**: TDD approach, 80% line coverage, 70% branch coverage
- **User Experience Consistency**: Consistent patterns, clear feedback, accessibility
- **Performance Excellence**: <100ms response, <2s load, 60fps rendering
- **Dependency Simplicity**: Minimal dependencies, actively maintained, permissive licenses

See full constitution at: `.specify/memory/constitution.md`

## 🐛 Known Issues

- Hand images are placeholder text files - replace with actual PNG images
- Finger positioning coordinates may need adjustment based on actual hand images

## 🤝 Contributing

1. Write tests for new features (TDD)
2. Implement features to make tests pass
3. Ensure code follows style guidelines
4. Run tests: `npm test`
5. Check coverage: `npm test --coverage`
6. Manual testing in browser

## 📄 License

MIT License - See LICENSE file for details

## 🙏 Acknowledgments

- Vitest testing framework
- Finger counting technique for teaching 9's multiplication
