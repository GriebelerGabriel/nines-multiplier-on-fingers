<!--
Sync Impact Report:
- Version change: [UNDEFINED] → 1.0.0
- Modified principles: All 5 principles newly defined
- Added sections: Quality Assurance, Development Workflow
- Removed sections: None
- Templates requiring updates:
  ✅ .specify/templates/plan-template.md - Constitution Check section aligned
  ✅ .specify/templates/spec-template.md - Requirements section aligned
  ✅ .specify/templates/tasks-template.md - Testing task categories aligned
- Follow-up TODOs: None
-->

# Nines Multiplier on Fingers Constitution

## Core Principles

### I. Code Quality First

Code MUST maintain high quality standards through consistent style, clear structure, and comprehensive documentation. All code MUST follow established language conventions, include meaningful variable/function names, and be self-documenting where possible. Code complexity MUST be minimized - functions SHOULD not exceed 50 lines, classes SHOULD not exceed 300 lines. Code review is MANDATORY before merging, focusing on readability, maintainability, and adherence to project patterns. Comments MUST only explain "why" not "what" - code itself should clearly express what it does.

**Rationale**: High-quality code reduces bugs, improves maintainability, and accelerates onboarding of new contributors. Consistent patterns reduce cognitive load when navigating the codebase.

### II. Testing Standards

Tests MUST accompany all feature implementations. Unit tests MUST cover business logic with minimum 80% code coverage. Integration tests MUST verify component interactions and data flow. Tests MUST be written BEFORE implementation (TDD approach) whenever feasible. All tests MUST be deterministic and repeatable - no reliance on external state or timing. Test naming MUST clearly describe the scenario and expected outcome. Test fixtures MUST be isolated to prevent cross-test contamination.

**Rationale**: Comprehensive tests catch regressions early, serve as living documentation, and enable confident refactoring. TDD ensures better API design and testable architecture.

### III. User Experience Consistency

User-facing components MUST adhere to consistent design patterns and interaction behaviors. All similar actions MUST trigger similar responses (e.g., error handling, success feedback, loading states). Color schemes, typography, and spacing MUST follow defined design tokens. All user actions MUST provide clear feedback - no silent failures or unclear outcomes. Edge cases MUST be handled gracefully with helpful error messages. Accessibility MUST be maintained - keyboard navigation, screen reader support, and appropriate contrast ratios.

**Rationale**: Consistent UX reduces user cognitive load, builds trust, and reduces learning curve. Clear feedback prevents user confusion and frustration.

### IV. Performance Excellence

All features MUST meet established performance budgets. Operations SHOULD complete within 100ms for user-triggered actions. Page/application load MUST complete within 3 seconds on standard connections. Memory usage MUST be monitored and optimized - no memory leaks or excessive allocations. Rendering performance MUST maintain 60fps for animations/interactions. Database queries MUST be optimized with appropriate indexes. Large datasets MUST implement pagination or lazy loading. Performance MUST be measured with realistic data volumes, not toy examples.

**Rationale**: Performance directly impacts user satisfaction and engagement. Slow applications frustrate users and reduce conversion rates. Efficient code scales better and reduces infrastructure costs.

### V. Dependency Simplicity

External dependencies MUST be minimized and carefully selected. Each dependency MUST justify its inclusion by solving a specific problem that cannot be reasonably implemented in-house. Dependencies MUST be actively maintained with recent updates (no dormant projects >1 year without commits). Dependencies MUST have clear, permissive licenses compatible with project goals. Dependency count MUST be kept as low as possible - prefer built-in language features and standard libraries. Security vulnerabilities in dependencies MUST be addressed immediately. Dependency versions MUST be pinned for production to ensure reproducibility.

**Rationale**: Fewer dependencies reduce attack surface, minimize maintenance burden, and reduce risk of supply chain attacks. Simple dependencies are easier to understand, debug, and replace if needed.

## Quality Assurance

All code MUST pass automated quality checks before merging. Linting rules MUST be enforced for all code. Type checking MUST be used where applicable (TypeScript, Python type hints, etc.). Code coverage metrics MUST meet minimum thresholds (80% line coverage, 70% branch coverage). Security scanning MUST run on all pull requests. Build MUST succeed across all supported platforms/environments. Manual review checklist MUST be completed for each PR including: logic correctness, edge case handling, error messages, and documentation updates.

**Rationale**: Automated quality gates catch issues early and maintain consistent standards. Manual review catches issues tools cannot detect (logic errors, UX concerns).

## Development Workflow

All features MUST follow defined development process. Feature specification MUST be written and approved before implementation begins. Implementation plan MUST be created outlining approach, dependencies, and risks. Tasks MUST be broken into small, completable units (ideally <4 hours each). Each task MUST be committed with clear, descriptive messages following conventional commit format. Pull requests MUST be small and focused (<400 lines changed). Each PR MUST include clear description of changes and testing performed. Code review MUST be completed by at least one peer before merging. Deployment MUST follow approval process with appropriate staging environment testing.

**Rationale**: Structured workflow ensures quality, enables tracking, and reduces integration issues. Small, focused changes are easier to review, test, and roll back if needed.

## Governance

This Constitution MUST be followed by all contributors. Amendments MUST be proposed with clear rationale and impact analysis. Amendments MUST be reviewed and approved by project maintainers. Minor version updates (clarifications, non-breaking changes) require simple majority approval. Major version updates (breaking changes, new principles) require consensus approval. All changes MUST increment CONSTITUTION_VERSION following semantic versioning: MAJOR for breaking governance changes, MINOR for new principles/sections, PATCH for clarifications. Compliance MUST be verified during code review - violations MUST be justified and documented. This Constitution supersedes all conflicting practices or conventions.

**Version**: 1.0.0 | **Ratified**: 2026-01-21 | **Last Amended**: 2026-01-21
