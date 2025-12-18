# Node Project Starter

> Production-ready GitHub template for Node.js library/package projects with enterprise-grade CI/CD pipelines, security scanning, and automated release management.

[![CI](https://github.com/gander-templates/node-project-starter/actions/workflows/test.yml/badge.svg)](https://github.com/gander-templates/node-project-starter/actions/workflows/test.yml)
[![Fuzz](https://github.com/gander-templates/node-project-starter/actions/workflows/fuzz.yml/badge.svg)](https://github.com/gander-templates/node-project-starter/actions/workflows/fuzz.yml)
[![Release](https://github.com/gander-templates/node-project-starter/actions/workflows/release-please.yml/badge.svg)](https://github.com/gander-templates/node-project-starter/actions/workflows/release-please.yml)
[![npm version](https://img.shields.io/npm/v/@gander-templates/node-project-starter.svg)](https://www.npmjs.com/package/@gander-templates/node-project-starter)
[![npm downloads](https://img.shields.io/npm/dm/@gander-templates/node-project-starter.svg)](https://www.npmjs.com/package/@gander-templates/node-project-starter)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![BiomeJS](https://img.shields.io/badge/BiomeJS-2.3-60a5fa.svg)](https://biomejs.dev/)
[![SLSA 3](https://slsa.dev/images/gh-badge-level3.svg)](https://slsa.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Last Commit](https://img.shields.io/github/last-commit/gander-templates/node-project-starter)](https://github.com/gander-templates/node-project-starter)
[![GitHub Stars](https://img.shields.io/github/stars/gander-templates/node-project-starter)](https://github.com/gander-templates/node-project-starter)
[![Issues](https://img.shields.io/github/issues/gander-templates/node-project-starter)](https://github.com/gander-templates/node-project-starter/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

## 🏁 Quick Start

### First Steps After Using Template

1. **Update `package.json`**:
   - Change `name` to your package name
   - Update `description`, `author`, `repository`, `homepage`
   - Adjust `keywords`

2. **Choose your bundler** (see [Bundler Configuration](#bundler-configuration)):
   - Keep tsdown (default, recommended)
   - Or switch to pkgroll (simpler)
   - Or keep both (compare outputs)

3. **Trusted Publishers** (for automated releases):
   - Configure NPM Trusted Publishers for secure publishing
   - No manual token management required

4. **Configure repository settings** (recommended):

   **Pull Request Settings** (Settings → General → Pull Requests):
   - ✅ Always suggest updating pull request branches
   - ✅ Allow auto-merge
   - ✅ Automatically delete head branches
   - ✅ Auto-close issues with merged linked pull requests
   - ✅ Allow squash merging + Default to pull request title
   - ⚠️ Disable merge commits (for cleaner history)

   **GitHub Actions** (Settings → Actions → General → Workflow permissions):
   - ✅ Allow GitHub Actions to create and approve pull requests
   - ✅ Default GITHUB_TOKEN: Read-only (least privilege)
   - ✅ Fork workflows: Require approval for first-time contributors

   **Security Settings** (Settings → Code security and analysis):
   - ✅ Dependabot alerts (vulnerability notifications)
   - ✅ Dependabot security updates (auto PRs for security issues)
   - ❌ **Dependabot version updates - DISABLE** (use Renovate instead)
   - ✅ Secret scanning + Push protection
   - ✅ Code scanning (CodeQL)
   - ✅ Private vulnerability reporting

   **Renovate Setup** (Dependency Management):
   - Install: https://github.com/apps/renovate
   - Config in `/renovate.json`: auto-merge patch updates + minor devDeps
   - Why Renovate? Better grouping, scheduling, automerge than Dependabot
   - Validate: `npx -p renovate -c 'renovate-config-validator'`

   **Repository Features** (Settings → General → Features):
   - ✅ Issues
   - ❌ Wikis (use `docs/` instead)
   - ⚠️ Projects, Discussions, Sponsorships (optional)

5. **Configure branch protection** (recommended):

   **Settings → Branches → Add rule for `main`**

   **Essential (Solo Developer):**
   - ✅ Require status checks to pass
   - ✅ Restrict force pushes
   - ✅ Restrict deletions

   **Recommended (Best Practice):**
   - ✅ Require pull request before merging
     - Required approvals: 1
     - Dismiss stale approvals
   - ✅ Require status checks to pass
     - Require branches up to date
   - ✅ Require conversation resolution
   - ✅ Require linear history
   - ✅ Lock branch
   - ✅ Restrict force pushes
   - ✅ Restrict deletions

   **Optional:**
   - ⚠️ Require signed commits (enhanced security)
   - ⚠️ Require Code Owners review

   **Required Status Checks** (must run workflows first):
   - `test-summary` - All tests pass
   - `actionlint` - Workflow validation
   - `dependency-review` - Dependency security
   - `npm-audit` - Security scan (conditional)

   **Verification:**
   ```bash
   git push origin main         # Should fail
   git push --force origin main # Should fail
   ```

6. **Start coding!**:
   - Write tests first (TDD methodology)
   - Replace sample code in `src/index.ts`
   - Update tests in `tests/index.test.ts`

6. **Automatic shebang handling** (for CLI projects):
   - pkgroll automatically adds `#!/usr/bin/env node` to files in `bin` field
   - tsdown requires manual configuration:
     ```typescript
     // tsdown.config.ts
     export default defineConfig({
       outputOptions: { banner: '#!/usr/bin/env node\n' }
     })
     ```

7. **pkgroll approach (zero-config)**:
   ```json
   {
     "type": "module",
     "bin": { "mycli": "./dist/cli.js" },
     "exports": { ".": { "import": "./dist/index.mjs" } }
   }
   ```

8. **tsdown approach (explicit config)**:
   ```typescript
   // tsdown.config.ts
   export default defineConfig({
     entry: { cli: 'src/cli.ts', index: 'src/index.ts' },
     format: ['esm'],
     shims: true
   })
   ```

9. **Lazy loading subcommands** (optional pattern):
   ```typescript
   const commands = {
     init: () => import('./commands/init.js'),
     build: () => import('./commands/build.js')
   }
   const [command] = process.argv.slice(2)
   const module = await commands[command]?.()
   await module?.run()
   ```

## 🧑‍💻 Development

### Available Scripts

```bash
npm run dev           # TypeScript watch mode (tsdown by default)
npm run build         # Build with default bundler (tsdown)
npm run build:tsdown  # Build with tsdown (fast, plugins, frameworks)
npm run build:pkgroll # Build with pkgroll (zero-config, tree-shaking)
npm test              # Run Vitest tests
npm run test:watch    # Run tests in watch mode
npm run test:ui       # Interactive test UI
npm run coverage      # Generate coverage report
npm run typecheck     # TypeScript type checking
npm run check         # Run BiomeJS check (lint + format)
npm run format        # Format code with BiomeJS
npm run lint          # Lint code with BiomeJS
```

### Development Workflow

**We follow Test-Driven Development (TDD):**

1. **Write test first** (Red) - Write failing test
2. **Implement code** (Green) - Make test pass
3. **Refactor** (Refactor) - Improve while tests stay green

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed TDD workflow examples.

### Git Hooks (Lefthook)

**Pre-commit:**
- BiomeJS formatting and linting (auto-fix)
- Package lock validation

**Pre-push:**
- TypeScript type checking
- All tests
- Build verification

### Conventional Commits

Use conventional commit format for automated changelog:

```bash
git commit -m "feat: add new feature"
git commit -m "fix: resolve bug in validation"
git commit -m "docs: update API documentation"
```

**Types:** `feat`, `fix`, `docs`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`

## 📖 Documentation

- **[CONTRIBUTING.md](CONTRIBUTING.md)** - How to contribute (includes TDD guide)
- **[SECURITY.md](SECURITY.md)** - Security policy and vulnerability reporting

## 🔄 Release Process

**Fully automated with release-please:**

1. **Make changes** with conventional commits
2. **Merge to main** - release-please creates/updates release PR
3. **Review release PR** - check version bump and changelog
4. **Merge release PR** - automatic:
   - NPM publish with provenance
   - GitHub release creation
   - SLSA attestation generation

**No manual versioning or changelog needed!**

**Note:** Release workflow is disabled on the template repository and activates automatically when you use the template.

## 🔐 Security

This template achieves **SLSA Level 3** compliance through:

- Build provenance attestations
- NPM provenance enabled
- Signed commits support
- Daily security scans
- Dependency vulnerability blocking

**Verify package integrity:**
```bash
npm audit signatures
```

See [SECURITY.md](SECURITY.md) for vulnerability reporting.

## 🧪 Testing

- **Vitest** for fast unit testing
- **@fast-check** for property-based testing (fuzz testing)
- **80% coverage** threshold enforced
- **Automated CI testing** on Linux Node 22

**Run tests:**
```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:ui       # Interactive UI
npm run coverage      # Coverage report
```

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

