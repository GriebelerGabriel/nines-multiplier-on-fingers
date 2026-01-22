---

description: "Task list for feature implementation"
---

# Tasks: Nines Multiplication on Fingers

**Input**: Design documents from `/specs/001-nines-fingers/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are REQUIRED - TDD approach per constitution (tests written before implementation)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create project directory structure per implementation plan (src/, src/models/, src/components/, src/utils/, assets/images/, tests/unit/, tests/integration/, tests/e2e/)
- [X] T002 Initialize Vitest testing framework with configuration file vitest.config.js in repository root
- [X] T003 [P] Add hand images to assets/images/ (hand-left.png and hand-right.png) or create placeholder images
- [X] T004 [P] Create package.json with dev dependencies (vitest) and test scripts (npm test)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T005 Create main HTML structure in index.html with container elements for hands, results, and explanations
- [X] T006 Create basic CSS stylesheet in index.html (or separate styles.css) for responsive layout, finger positioning, and result display
- [X] T007 Configure viewport meta tag in index.html for mobile responsiveness (width=device-width, initial-scale=1.0)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Visual Finger Selection (Priority: P1) 🎯 MVP

**Goal**: Display hands with 10 numbered fingers, allow users to click/select fingers, and show the corresponding 9's multiplication result with visual highlighting

**Independent Test**: Open index.html in browser, verify hands display with fingers 1-10 labeled, click each finger from 1-10, and confirm correct multiplication result appears with finger highlighted

### Tests for User Story 1 (REQUIRED - TDD approach) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T008 [P] [US1] Unit test for Finger model in tests/unit/models/Finger.test.js (test select(), deselect(), getFingersToLeft(), getFingersToRight(), validate())
- [X] T009 [P] [US1] Unit test for MultiplicationResult model in tests/unit/models/MultiplicationResult.test.js (test constructor, getFormattedResult(), getResult(), validate())
- [X] T010 [P] [US1] Unit test for calculator utility in tests/unit/utils/calculator.test.js (test calculate(), isValidMultiplier(), formatMultiplication(), getMultiplicationTable())
- [X] T011 [P] [US1] Unit test for selector utility in tests/unit/utils/selector.test.js (test selectFinger(), deselectAll(), getSelectedFinger(), validateSelection())
- [X] T012 [P] [US1] Integration test for finger selection flow in tests/integration/finger-selection.test.js (test complete flow: click finger → select → calculate → display result → update highlight)
- [X] T013 [P] [US1] End-to-end test for complete user journey in tests/e2e/user-journey.test.js (test load page, select finger 3, verify result, select finger 7, verify update, deselect, verify prompt)

### Implementation for User Story 1

- [X] T014 [P] [US1] Create Finger model class in src/models/Finger.js with constructor, select(), deselect(), getFingersToLeft(), getFingersToRight(), and validate() methods
- [X] T015 [P] [US1] Create MultiplicationResult model class in src/models/MultiplicationResult.js with constructor, getFormattedResult(), getResult(), and validate() methods
- [X] T016 [P] [US1] Implement calculator utility functions in src/utils/calculator.js (calculate(), isValidMultiplier(), formatMultiplication(), getMultiplicationTable())
- [X] T017 [P] [US1] Implement selector utility functions in src/utils/selector.js (selectFinger(), deselectAll(), getSelectedFinger(), validateSelection())
- [X] T018 [US1] Implement HandDisplay component class in src/components/HandDisplay.js with render(), updateHighlight(), showLoading(), showHands(), and event handling for finger clicks (depends on T014, T016, T017)
- [X] T019 [US1] Implement ResultDisplay component class in src/components/ResultDisplay.js with showPrompt(), showResult(), and clear() methods (depends on T015, T016)
- [X] T020 [US1] Create App entry point class in src/app.js with initialize(), handleFingerSelection(), handleKeyboard(), and state management (depends on T018, T019)
- [X] T021 [US1] Integrate App.js with index.html (add script tag, initialize on DOMContentLoaded)
- [X] T022 [US1] Add visual feedback styles for selected finger (highlight class, border, color change) in CSS
- [X] T023 [US1] Add prompt message display for initial state (no finger selected) in ResultDisplay component
- [X] T024 [US1] Add error handling for invalid finger selections (validate before processing, show user-friendly error)
- [ ] T025 [US1] Test all 10 finger selections manually in browser and verify correct results (9×1=9 through 9×10=90)

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Calculation Explanation (Priority: P2)

**Goal**: Display educational explanation text showing the finger counting pattern (fingers to left = tens, fingers to right = ones) when a finger is selected

**Independent Test**: Select any finger (e.g., finger 3) and verify explanation text shows "2 fingers to the left (tens), 7 fingers to the right (ones)"

### Tests for User Story 2 (REQUIRED - TDD approach) ⚠️

- [X] T026 [P] [US2] Unit test for explanation display logic in tests/unit/components/ExplanationDisplay.test.js (test showExplanation(), clear(), text formatting for all 10 fingers)
- [X] T027 [P] [US2] Integration test for explanation display with finger selection in tests/integration/explanation-display.test.js (test select finger → show explanation → verify text accuracy)

### Implementation for User Story 2

- [X] T028 [P] [US2] Create ExplanationDisplay component class in src/components/ExplanationDisplay.js with showExplanation() and clear() methods
- [X] T029 [P] [US2] Add getExplanation() method to MultiplicationResult model in src/models/MultiplicationResult.js (calculates fingersToLeft and fingersToRight, returns explanation text)
- [X] T030 [US2] Integrate ExplanationDisplay component into App.js in src/app.js (initialize component, update display on finger selection, clear on deselect)
- [X] T031 [US2] Add explanation display container element to index.html with proper positioning and styling
- [X] T032 [US2] Integrate explanation display with User Story 1 flow (show explanation after result when finger selected)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T033 [P] Add responsive CSS for mobile devices (media queries for screens <768px, adjust finger spacing and font sizes)
- [X] T034 [P] Implement keyboard navigation in src/app.js (arrow keys to navigate fingers, number keys 1-0 to select, Escape to deselect)
- [X] T035 [P] Add ARIA labels and roles for accessibility in index.html (aria-label for fingers, live regions for result/explanation updates)
- [X] T036 [P] Add loading state handling in HandDisplay component (show loading message while images load, error fallback if images fail)
- [X] T037 [P] Optimize CSS for performance (use transform/opacity for animations, avoid layout thrashing)
- [X] T038 Create README.md with project description, setup instructions, usage guide, and testing commands
- [X] T039 Code cleanup and refactoring to ensure functions ≤50 lines and classes ≤300 lines
- [X] T040 Add inline comments for complex logic (explaining "why", not "what")
- [X] T041 Run test coverage report and ensure 80% line coverage and 70% branch coverage (npm test -- --coverage)
- [X] T042 Manually test application in multiple browsers (Chrome, Firefox, Safari, Edge)
- [X] T043 Test application on mobile devices or using browser DevTools responsive mode (verify touch interaction and layout on 320px width)
- [X] T044 Run Lighthouse accessibility audit and fix any WCAG AA violations
- [X] T045 Verify performance targets (load time <2s, finger selection response <100ms using browser DevTools Performance tab)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User Story 1 (P1): Can start after Foundational (Phase 2) - No dependencies on other stories
  - User Story 2 (P2): Can start after Foundational (Phase 2) - Extends User Story 1, adds explanation display
- **Polish (Phase 5)**: Depends on User Stories 1 and 2 being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Builds on US1, adds explanation component

### Within Each User Story

- Tests MUST be written and FAIL before implementation (TDD approach)
- Models before utilities (Finger, MultiplicationResult before calculator, selector)
- Utilities before components (calculator, selector before HandDisplay, ResultDisplay)
- Components before App.js (HandDisplay, ResultDisplay before App.js)
- App.js before index.html integration
- Core implementation before integration and polish

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All unit tests within a user story marked [P] can run in parallel (write tests first)
- Models within a story marked [P] can run in parallel
- Utilities within a story marked [P] can run in parallel (calculator and selector)
- Different polish tasks marked [P] can run in parallel

---

## Parallel Example: User Story 1

```bash
# Write all unit tests first (TDD approach):
Task: "Unit test for Finger model in tests/unit/models/Finger.test.js"
Task: "Unit test for MultiplicationResult model in tests/unit/models/MultiplicationResult.test.js"
Task: "Unit test for calculator utility in tests/unit/utils/calculator.test.js"
Task: "Unit test for selector utility in tests/unit/utils/selector.test.js"
Task: "Integration test for finger selection flow in tests/integration/finger-selection.test.js"
Task: "End-to-end test for complete user journey in tests/e2e/user-journey.test.js"

# After tests fail, implement models in parallel:
Task: "Create Finger model class in src/models/Finger.js"
Task: "Create MultiplicationResult model class in src/models/MultiplicationResult.js"

# Implement utilities in parallel:
Task: "Implement calculator utility functions in src/utils/calculator.js"
Task: "Implement selector utility functions in src/utils/selector.js"

# Tests integration and e2e can run in parallel:
Task: "Integration test for finger selection flow in tests/integration/finger-selection.test.js"
Task: "End-to-end test for complete user journey in tests/e2e/user-journey.test.js"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (tests first, then implementation)
4. **STOP and VALIDATE**: Test User Story 1 independently in browser
5. Verify all 10 finger selections work correctly
6. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: Write unit tests for US1 models and utilities
   - Developer B: Write integration and E2E tests for US1
3. Implement US1 components (Developer A or B)
4. Add US2 tests and implementation
5. Polish and cross-cutting concerns together

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing (TDD approach)
- Run npm test after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- All tasks include exact file paths for clarity
- Tests are REQUIRED per constitution (TDD approach, 80% line coverage, 70% branch coverage)
