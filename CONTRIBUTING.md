# Contributing to Node Project Starter

Thank you for your interest in contributing to Node Project Starter! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to abide by our code of conduct:

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect differing viewpoints and experiences

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/gander-templates/node-project-starter/issues)
2. If not, create a new issue using the [Bug Report template](https://github.com/gander-templates/node-project-starter/issues/new?template=bug_report.yml)
3. Provide as much detail as possible:
   - Clear description of the bug
   - Steps to reproduce
   - Expected vs. actual behavior
   - Environment information

### Suggesting Features

1. Check if the feature has already been suggested in [Issues](https://github.com/gander-templates/node-project-starter/issues)
2. If not, create a new issue using the [Feature Request template](https://github.com/gander-templates/node-project-starter/issues/new?template=feature_request.yml)
3. Clearly describe:
   - The feature and its use case
   - Why it would be valuable
   - Potential implementation approach

### Development Setup

1. **Fork the repository**

   ```bash
   # Click "Fork" on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/node-project-starter.git
   cd node-project-starter
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create a feature branch**

   ```bash
   git checkout -b feat/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

4. **Make your changes**

   - Write code following our style guide
   - Add tests for new functionality
   - Update documentation as needed

5. **Test your changes**

   ```bash
   # Run tests
   npm test

   # Run type checking
   npm run typecheck

   # Run linting and formatting
   npm run check

   # Build the project
   npm run build
   ```

6. **Commit your changes**

   See [Conventional Commits](#conventional-commits) below for commit message format.

   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

7. **Push to your fork**

   ```bash
   git push origin feat/your-feature-name
   ```

8. **Create a Pull Request**

   - Go to the [repository](https://github.com/gander-templates/node-project-starter)
   - Click "New Pull Request"
   - Select your branch
   - Fill out the PR template
   - Submit!

## Conventional Commits

We use [Conventional Commits](https://www.conventionalcommits.org/) for all commit messages. This enables automated changelog generation and semantic versioning.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes only
- **style**: Code style changes (formatting, semicolons, etc.)
- **refactor**: Code refactoring (no functional changes)
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **build**: Build system changes (npm, dependencies, etc.)
- **ci**: CI/CD changes (GitHub Actions, etc.)
- **chore**: Other changes that don't modify src or test files

### Scope (Optional)

The scope should specify the area of change:

- `config` - Configuration files
- `workflows` - GitHub Actions workflows
- `security` - Security-related changes
- `deps` - Dependencies
- etc.

### Examples

**Feature:**
```bash
git commit -m "feat: add dark mode support"
git commit -m "feat(ui): add loading spinner component"
```

**Bug Fix:**
```bash
git commit -m "fix: resolve type error in build process"
git commit -m "fix(security): patch XSS vulnerability in input validation"
```

**Documentation:**
```bash
git commit -m "docs: update installation instructions"
git commit -m "docs(api): add JSDoc comments for exported functions"
```

**Refactoring:**
```bash
git commit -m "refactor: simplify error handling logic"
```

**Performance:**
```bash
git commit -m "perf: optimize bundle size by lazy loading"
```

**Tests:**
```bash
git commit -m "test: add unit tests for validation module"
```

**Build/CI:**
```bash
git commit -m "build: update TypeScript to v5.7"
git commit -m "ci: add caching to test workflow"
```

**Breaking Changes:**

For breaking changes, add `!` after the type and explain in the footer:

```bash
git commit -m "feat!: change API response format

BREAKING CHANGE: API now returns data in { status, data } format instead of raw data.
Migration: Update all API calls to access response.data instead of response.
```

## Code Quality Standards

### TypeScript

- Use strict mode (already configured)
- Provide explicit return types for exported functions
- Avoid `any` type unless absolutely necessary
- Use interfaces over type aliases for object shapes
- Leverage TypeScript's type inference where it improves readability

### Testing

**We follow Test-Driven Development (TDD) methodology:**

1. **Write the test first** (Red)
   - Write a failing test that describes the desired behavior
   - Run the test to confirm it fails

2. **Implement the minimum code** (Green)
   - Write just enough code to make the test pass
   - Keep it simple and focused

3. **Refactor** (Refactor)
   - Improve the code while keeping tests passing
   - Clean up, optimize, and enhance readability

**Test Coverage Requirements:**

- Maintain **≥80% test coverage** (enforced by CI)
- Write tests for:
  - All new features (test first!)
  - Bug fixes (write failing test first, then fix)
  - Edge cases and error scenarios
  - Success paths and error paths

**Test Best Practices:**

- Use descriptive test names: `it("should return error when input is invalid")`
- Group related tests with `describe` blocks
- Test behavior, not implementation details
- Use property-based testing with `@fast-check` for complex logic
- Keep tests simple and focused (one assertion concept per test)
- Mock external dependencies appropriately

**Example TDD Workflow:**

```typescript
// 1. Write failing test first (RED)
describe("formatDate", () => {
  it("should format date as YYYY-MM-DD", () => {
    const result = formatDate(new Date("2025-01-15"));
    expect(result).toBe("2025-01-15");
  });
});

// 2. Run test → FAILS (function doesn't exist yet)

// 3. Implement minimum code (GREEN)
export function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

// 4. Run test → PASSES

// 5. Refactor if needed (while keeping tests green)
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// 6. Run test → STILL PASSES
```

### Code Style

- BiomeJS handles formatting automatically on commit
- Follow existing code patterns and conventions
- Keep functions small and focused (single responsibility)
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

### Documentation

- Update README.md when adding user-facing features
- Add JSDoc comments to exported functions/classes
- Update CHANGELOG.md manually if needed (or let release-please handle it)
- Create/update Architecture Decision Records (ADRs) for significant architectural changes
- Document security-related changes in SECURITY.md

## Pull Request Guidelines

### Before Submitting

- [ ] Tests pass locally (`npm test`)
- [ ] Type checking passes (`npm run typecheck`)
- [ ] Linting passes (`npm run check`)
- [ ] Build succeeds (`npm run build`)
- [ ] Code coverage remains ≥80%
- [ ] Documentation is updated
- [ ] Commit messages follow Conventional Commits

### PR Description

Use the [PR template](.github/PULL_REQUEST_TEMPLATE.md) to provide:

- Clear description of changes
- Type of change (bug fix, feature, etc.)
- Testing performed
- Breaking changes (if any)
- Related issues

### Review Process

1. **Automated Checks**: All CI workflows must pass
   - Tests across Node.js 18, 20, 22
   - Security scans
   - Workflow validation

2. **Code Review**: At least one maintainer review required
   - Code quality and style
   - Test coverage
   - Documentation completeness

3. **Approval**: Once approved and all checks pass, PR will be merged

4. **Release**: Changes will be included in the next release via release-please

## Development Workflow

### Local Development

```bash
# Start TypeScript watch mode
npm run dev

# Run tests in watch mode
npm run test:watch

# Interactive test UI
npm run test:ui
```

### Git Hooks

Lefthook runs automatically on:

**Pre-commit:**
- BiomeJS formatting and linting
- Package lock file validation

**Pre-push:**
- TypeScript type checking
- All tests
- Build verification

### Testing

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Interactive UI
npm run test:ui

# Coverage report
npm run coverage
```

### Building

```bash
# Build with tsdown (default)
npm run build

# Build with pkgroll (alternative)
npm run build:pkgroll
```

## Project Structure

```
node-project-starter/
├── .github/               # GitHub configuration
│   ├── workflows/        # CI/CD workflows (9 files)
│   └── ISSUE_TEMPLATE/   # Issue templates
├── src/                  # Source code
│   └── index.ts          # Main entry point
├── tests/                # Test files
│   └── index.test.ts     # Tests
├── biome.json            # BiomeJS config
├── lefthook.yml          # Git hooks
├── package.json          # Package manifest
├── tsconfig.json         # TypeScript config
├── tsdown.config.ts      # Build config
└── vitest.config.ts      # Test config
```

## Release Process

Releases are **fully automated** via release-please:

1. **Make changes** with conventional commits
2. **Merge to main** - release-please creates/updates release PR
3. **Review release PR** - check version bump and changelog
4. **Merge release PR** - automatic:
   - NPM publish with provenance
   - GitHub release creation
   - SLSA attestation generation

**No manual versioning or changelog writing needed!**

## Getting Help

- **Questions**: Open a [Discussion](https://github.com/gander-templates/node-project-starter/discussions)
- **Bugs**: Open a [Bug Report](https://github.com/gander-templates/node-project-starter/issues/new?template=bug_report.yml)
- **Features**: Open a [Feature Request](https://github.com/gander-templates/node-project-starter/issues/new?template=feature_request.yml)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Node Project Starter! 🎉
