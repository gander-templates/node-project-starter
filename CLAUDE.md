# Claude Code Documentation - Node Project Starter

This document provides comprehensive guidance for Claude Code AI when working with the Node Project Starter template repository.

## Project Overview

**Node Project Starter** is a production-ready GitHub template for Node.js library/package projects with enterprise-grade CI/CD pipelines, security scanning, and automated release management.

**Project Goals:**
- Reduce project setup time from ~8 hours to <15 minutes
- Achieve SLSA Level 3 supply chain security
- Provide 100% automated release process
- Maintain ≥80% test coverage
- Zero critical security vulnerabilities

**Target Users:** Solo developers and small teams building Node.js libraries and packages

**Current Status:** MVP - Building the initial template implementation

## Technology Stack

### Core Technologies
- **Runtime:** Node.js 20+ LTS
- **Language:** TypeScript 5 with strict mode
- **Module System:** ESM only (`"type": "module"`)

### Development Tools
- **BiomeJS** - Ultra-fast linting and formatting (replaces ESLint + Prettier)
- **Lefthook** - Git hooks manager (lightweight alternative to Husky)
- **Vitest** - Fast unit testing with coverage enforcement (≥80%)
- **tsdown** - Modern library bundler (Rolldown/Rust-based, successor to tsup)
  - **Alternative:** pkgroll (zero-config, Rollup-based, configured via package.json only)
- **publint** - Package validator ensuring correct npm configuration before publish

### CI/CD & Automation
- **GitHub Actions** - All automation workflows
- **Release Please** - Automated semantic versioning and changelog generation
- **Renovate** - Automated dependency updates with auto-merge support

### Security Tools
- **CodeQL** - Static security analysis
- **@fast-check** - Property-based testing for fuzz testing
- **SLSA Provenance** - Supply chain security attestations
- **NPM Provenance** - Package origin verification

## Project Structure

```
node-project-starter/
├── .claude/
│   ├── PRD.md                  # Product Requirements Document
│   └── settings.json           # Claude Code configuration with hooks
├── .github/
│   ├── workflows/              # GitHub Actions workflows (9 files)
│   │   ├── actionlint.yml      # Workflow syntax validation
│   │   ├── auto-pr.yml         # Auto-merge for safe updates
│   │   ├── dependency-review.yml # PR dependency security
│   │   ├── fuzz.yml            # Nightly property-based testing
│   │   ├── labeler.yml         # Auto-label PRs based on files
│   │   ├── release-please.yml  # Automated releases & NPM publish
│   │   ├── security-main.yml   # Daily security scans
│   │   ├── security-pr.yml     # PR security checks
│   │   └── test.yml            # Matrix testing across platforms
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.yml      # Structured bug reports
│   │   └── feature_request.yml # Feature request template
│   └── PULL_REQUEST_TEMPLATE.md
├── docs/
│   ├── architecture/           # Architecture Decision Records (ADRs)
│   ├── deployment/
│   │   ├── security.md         # Security practices & verification
│   │   └── branch-protection.md # Branch protection setup guide
│   ├── api/                    # API documentation
│   ├── BUNDLER_CHOICE.md       # tsdown vs pkgroll guide
│   └── IMPLEMENTATION_PLAN.md  # Complete implementation plan
├── src/
│   └── index.ts                # Main entry point and library code
├── tests/
│   └── index.test.ts           # Vitest tests
├── biome.json                  # BiomeJS configuration
├── lefthook.yml                # Git hooks configuration
├── package.json                # Package manifest
├── tsconfig.json               # TypeScript configuration
├── tsdown.config.ts            # Build configuration (tsdown) OR
│                               # pkgroll (no config file - uses package.json)
├── vitest.config.ts            # Test configuration
├── .npmrc                      # NPM configuration (provenance enabled)
├── renovate.json               # Renovate dependency updates
├── release-please-config.json  # Release automation config
├── README.md                   # Project documentation with badges
├── LICENSE                     # MIT license
├── CHANGELOG.md                # Auto-generated changelog
├── CONTRIBUTING.md             # Contribution guidelines
└── SECURITY.md                 # Security policy
```

## Key Configuration Files

### BiomeJS (biome.json)
- Linting and formatting configuration
- Double quotes, semicolons required
- Max line width: 100 characters
- Tab width: 2 spaces
- Organizes imports automatically

### Lefthook (lefthook.yml)
**Pre-commit hooks (parallel):**
- Format check with auto-fix
- Lint check with auto-fix
- Lockfile integrity validation

**Pre-push hooks (parallel):**
- TypeScript type checking
- Unit tests
- Integration tests
- Build verification

### Vitest (vitest.config.ts)
- Coverage threshold: 80% minimum
- Fast watch mode for development
- HTML and JSON coverage reports

### TypeScript (tsconfig.json)
- Strict mode enabled
- ESM module resolution (`moduleResolution: bundler`)
- Declaration files generated
- Source maps for debugging

### Build Configuration

**Option 1: tsdown (Recommended)**
- Rust-based bundler (successor to tsup)
- ~2x faster bundling than tsup
- ~8x faster .d.ts generation
- Auto-reads target from `engines.node`
- Supports Rolldown/Rollup/unplugin plugins
- Vue/React/Solid/Svelte support
- Config: `tsdown.config.ts`

**Option 2: pkgroll (Alternative)**
- Zero-config approach (no config file)
- All configuration via `package.json`
- Best-in-class tree-shaking (Rollup)
- Cleanest CommonJS output
- Auto-maps `./dist/` to `./src/`
- Config: None (package.json only)

**publint (Always Included)**
- Validates package configuration
- Checks `exports` field correctness
- Detects ESM/CJS format issues
- Ensures TypeScript types exported properly
- Catches publishing mistakes before npm publish

**Choosing a Bundler:**
See `docs/BUNDLER_CHOICE.md` for detailed comparison and migration guide.
- **tsdown:** Recommended for most projects (fastest, plugin support, framework compatibility)
- **pkgroll:** Alternative for zero-config purists (best tree-shaking, cleanest CJS)

### Release Please (release-please-config.json)
- Conventional commits parsing
- Automated version bumping (semantic versioning)
- Changelog generation
- Supports feat, fix, docs, refactor, perf, test, build, ci, chore

## Development Workflow

### Starting Development

```bash
# Clone from template
git clone <repository-url>
cd node-project-starter

# Install dependencies
npm install

# Start development mode
npm run dev              # TypeScript watch mode
npm run test:watch       # Test watch mode
```

### Writing Code

1. **Code in `src/`** - All source code goes here
2. **Tests in `tests/`** - Mirror src/ structure
3. **Type-safe** - TypeScript strict mode catches errors
4. **Auto-formatted** - BiomeJS formats on commit

### Testing

```bash
npm test                 # Run all tests
npm run test:watch       # Watch mode during development
npm run test:ui          # Interactive UI for debugging
npm run coverage         # Generate coverage report
```

### Committing Changes

Use conventional commit format:

```bash
git add .
git commit -m "feat: add new feature"
git commit -m "fix: resolve bug in validation"
git commit -m "docs: update API documentation"
```

**Commit types:**
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Test updates
- `build:` - Build system changes
- `ci:` - CI/CD changes
- `chore:` - Maintenance tasks

**Pre-commit hooks automatically:**
- Run BiomeJS formatting
- Run BiomeJS linting
- Validate package-lock.json integrity

**Pre-push hooks automatically:**
- Type check with TypeScript
- Run all tests
- Build the project

### Release Process (Automated)

1. **Commit with conventional format** - Use feat:, fix:, etc.
2. **Release Please creates PR** - Automatic version bump and changelog
3. **Review release PR** - Check version and changelog
4. **Merge PR** - Triggers automatic:
   - NPM publish with provenance
   - GitHub release creation
   - SLSA attestation generation

**No manual versioning or changelog writing needed!**

## GitHub Actions Workflows

### Core Testing & Security

**test.yml** - Matrix Testing
- Triggers: Push, Pull Request
- Tests on Node.js 18, 20, 22
- Tests on Ubuntu, macOS, Windows
- Uploads coverage reports

**security-pr.yml** - PR Security Checks
- Triggers: Pull Request to main
- Dependency vulnerability review
- CodeQL analysis for new code
- Blocks PRs with critical vulnerabilities

**security-main.yml** - Scheduled Security Scans
- Triggers: Daily at 02:00 UTC, Push to main
- NPM audit (moderate and high severity)
- SBOM generation (CycloneDX format)
- OpenSSF Scorecard evaluation
- License compliance checking

**fuzz.yml** - Nightly Fuzzing
- Triggers: Weekly (Mondays 2 AM), Push, PR, Manual
- Property-based testing with @fast-check
- Quick 5-minute PR checks
- Extended 30-minute scheduled runs
- Captures edge cases and regressions

### Release & Publishing

**release-please.yml** - Automated Releases
- Triggers: Push to main
- Parses conventional commits
- Creates/updates release PR
- Auto-publishes to NPM on merge
- Generates SLSA Level 3 attestations
- Creates GitHub releases with notes

### Automation & Maintenance

**actionlint.yml** - Workflow Validation
- Triggers: Push, Pull Request
- Validates GitHub Actions syntax
- Prevents workflow errors

**labeler.yml** - Auto-Labeling
- Triggers: Pull Request, Issue creation
- Automatically labels based on changed files

**auto-pr.yml** - Auto-Merge
- Triggers: Push to `claude/**` branches
- Creates PRs automatically for Claude branches
- Extracts commit messages for PR description

**dependency-review.yml** - Dependency Security
- Triggers: Pull Request to main
- Reviews new dependencies
- Blocks PRs with vulnerable dependencies
- Checks OpenSSF Scorecard ratings

## Working with Claude Code

### Claude Code Configuration

The project uses `.claude/settings.json` with the following hooks:

**SessionStart Hook:**
- Updates npm to latest version
- Installs project dependencies automatically
- Timeout: 300 seconds

**PostToolUse Hook (Write/Edit):**
- Runs `npm run check` after file modifications
- Validates code quality automatically
- Timeout: 120 seconds

### When Claude Should Run Checks

**Before committing:**
- Run type checking: `npm run typecheck`
- Run tests: `npm test`
- Run build: `npm run build`
- Check formatting: `npx biome check .`

**When creating files:**
- Follow existing structure and patterns
- Maintain consistent naming conventions
- Add corresponding test files
- Update documentation if needed

**When modifying configuration:**
- Validate JSON syntax
- Test configuration changes locally
- Document why changes were made
- Update related documentation

### Code Quality Standards

**TypeScript:**
- Use strict mode (no `any` without justification)
- Explicit return types for exported functions
- Prefer interfaces over type aliases for objects

**Testing:**
- Minimum 80% coverage
- Test both success and error cases
- Use descriptive test names
- Group related tests with `describe`

**Documentation:**
- JSDoc comments for public APIs
- README updates for new features
- Architecture Decision Records for major decisions
- Security documentation for security changes

## Security Considerations

### Supply Chain Security
- **SLSA Level 3** compliance target
- **NPM provenance** enabled in .npmrc
- **Signed commits** recommended (optional)
- **Dependency scanning** via Renovate and dependency-review

### Vulnerability Management
- **Critical vulnerabilities** block PR merge
- **Daily scans** on main branch
- **Auto-updates** for safe dependency patches
- **Manual review** for major updates

### Secrets Management
- **NPM_TOKEN** stored in GitHub Secrets
- **Never commit** secrets to repository
- **OIDC authentication** for NPM publishing
- **Least privilege** permissions in workflows

### Branch Protection
- Require PR reviews for main branch
- Require status checks to pass
- Require signed commits (recommended)
- No direct pushes to main

## Common Tasks for Claude

### Adding a New Feature

1. Create branch: `git checkout -b feat/feature-name`
2. Write code in `src/`
3. Write tests in `tests/`
4. Run tests: `npm test`
5. Commit: `git commit -m "feat: add feature name"`
6. Push and create PR

### Fixing a Bug

1. Create branch: `git checkout -b fix/bug-description`
2. Write failing test first
3. Fix the bug
4. Verify test passes
5. Commit: `git commit -m "fix: resolve bug description"`
6. Push and create PR

### Updating Dependencies

1. Renovate creates PR automatically
2. Review changes in PR
3. Check if tests pass in CI
4. Auto-merge if safe (patch updates)
5. Manual merge for minor/major updates

### Creating a Release

1. Merge PRs with conventional commits
2. Release Please creates release PR
3. Review version bump and changelog
4. Merge release PR
5. Automatic publish to NPM
6. GitHub release created automatically

### Adding Documentation

1. Identify what needs documentation
2. Update appropriate file (README, docs/, etc.)
3. Use clear, concise language
4. Include code examples
5. Commit: `git commit -m "docs: add documentation for X"`

## Package Scripts

```json
{
  "dev": "TypeScript watch mode for development",
  "build": "Build library with tsdown or pkgroll",
  "test": "Run Vitest tests",
  "test:watch": "Run tests in watch mode",
  "test:ui": "Interactive test UI",
  "coverage": "Generate coverage report",
  "typecheck": "TypeScript type checking",
  "check": "Run BiomeJS check (lint + format)",
  "format": "Format code with BiomeJS",
  "lint": "Lint code with BiomeJS",
  "prepublishOnly": "npm run build && publint --strict"
}
```

**Note:** `prepublishOnly` automatically runs build and validates package before publishing to npm.

## Troubleshooting

### Lefthook Not Running
```bash
lefthook install  # Reinstall Git hooks
```

### Coverage Below Threshold
- Add more tests for uncovered code
- Check coverage report: `npm run coverage`
- Review `coverage/index.html` for details

### Build Failures
- Check TypeScript errors: `npm run typecheck`
- Ensure all imports are correct
- Verify bundler configuration (tsdown.config.ts or package.json for pkgroll)

### publint Validation Errors
- Run `npx publint --strict` to see detailed issues
- Check `exports` field in package.json
- Ensure `types` condition comes first in exports
- Verify ESM/CJS file extensions match format
- Review package.json `files` field

### Test Failures
- Run tests locally: `npm test`
- Use test UI for debugging: `npm run test:ui`
- Check test output for error details

### CI Workflow Failures
- Review workflow logs in GitHub Actions
- Test locally with same Node.js version
- Check for environment-specific issues

## Best Practices

### For Solo Developers

1. **Commit frequently** with conventional commits
2. **Let automation work** - don't manually version or publish
3. **Trust the CI/CD** - all checks run automatically
4. **Review release PRs** before merging
5. **Keep dependencies updated** via Renovate

### Code Organization

1. **One feature per file** when possible
2. **Keep src/ flat** - all source files directly in src/
3. **Export public API** through index.ts
4. **Keep tests near code** (mirror structure)

### Testing Strategy

1. **Unit tests** for business logic
2. **Integration tests** for public API
3. **Property-based tests** for edge cases (fuzz)
4. **Coverage as guide**, not absolute target

### Documentation Updates

1. **Update README** for user-facing changes
2. **Update CHANGELOG** via conventional commits (automatic)
3. **Add ADRs** for architectural decisions
4. **Update security docs** for security changes

## References

### Technical Documentation
- **BiomeJS**: https://biomejs.dev/
- **Vitest**: https://vitest.dev/
- **tsdown**: https://tsdown.dev/
- **pkgroll**: https://github.com/privatenumber/pkgroll
- **publint**: https://publint.dev/
- **Bundler Comparison**: See docs/BUNDLER_CHOICE.md
- **Lefthook**: https://github.com/evilmartians/lefthook

### Security & Supply Chain
- **SLSA Framework**: https://slsa.dev/
- **NPM Provenance**: https://docs.npmjs.com/generating-provenance-statements
- **CodeQL**: https://codeql.github.com/
- **OpenSSF Scorecard**: https://github.com/ossf/scorecard

### Automation
- **GitHub Actions**: https://docs.github.com/en/actions
- **Release Please**: https://github.com/googleapis/release-please
- **Renovate**: https://docs.renovatebot.com/
- **Conventional Commits**: https://www.conventionalcommits.org/

## Support & Feedback

For questions, issues, or feedback:
- **Create an issue** using the provided templates
- **Review PRD.md** for project requirements and roadmap
- **Check workflow logs** for CI/CD issues
- **Consult documentation** in docs/ directory

---

**Last Updated:** 2025-12-17
**Document Version:** 1.0
**Project Status:** MVP Development
