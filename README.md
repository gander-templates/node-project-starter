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

## ✨ Features

### 🚀 Modern Tooling

- **TypeScript 5** with strict mode for maximum type safety
- **ESM-first** with optional CommonJS support
- **tsdown** (Rolldown/Rust-based) for blazing-fast builds
- **pkgroll** (alternative) for zero-config simplicity
- **BiomeJS** for ultra-fast linting and formatting
- **Vitest** with 80% coverage enforcement
- **publint** for package validation before publishing

### 🔐 Enterprise Security

- **SLSA Level 3** provenance attestations
- **NPM Provenance** for supply chain security
- **CodeQL** analysis for vulnerability scanning
- **Daily security scans** on main branch
- **Fuzz testing** with @fast-check for edge cases
- **Dependency Review** blocking vulnerable dependencies
- **OpenSSF Scorecard** evaluation

### 🤖 Complete Automation

- **9 GitHub Actions workflows** covering all aspects of CI/CD
- **Automated releases** with release-please (semantic versioning)
- **Automated dependency updates** with Renovate
- **Auto-merge** for safe dependency patches
- **Automated testing** on Linux Node 22
- **Auto-labeling** for PRs based on changed files

### 📚 Comprehensive Documentation

- **README** with 13 dynamic badges
- **CONTRIBUTING.md** with conventional commits guide and TDD methodology
- **SECURITY.md** with vulnerability reporting procedures
- **Architecture Decision Records** (ADRs)
- **Branch protection setup guide**
- **API documentation structure**

### 🎯 Developer Experience

- **Lefthook** for Git hooks (pre-commit formatting, pre-push tests)
- **Claude Code integration** with SessionStart and PostToolUse hooks
- **Issue and PR templates** for structured collaboration
- **Test-Driven Development** (TDD) methodology built-in

## 🏁 Quick Start

### Using the Template

1. **Click "Use this template"** on GitHub
2. **Clone your new repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
   cd YOUR_REPO
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start development**:
   ```bash
   npm run dev
   ```

5. **Run tests**:
   ```bash
   npm test
   ```

### First Steps After Using Template

1. **Update `package.json`**:
   - Change `name` to your package name
   - Update `description`, `author`, `repository`, `homepage`
   - Adjust `keywords`

2. **Choose your bundler** (see [Bundler Configuration](#bundler-configuration)):
   - Keep tsdown (default, recommended)
   - Or switch to pkgroll (simpler)
   - Or keep both (compare outputs)

3. **Set up GitHub Secrets** (for automated releases):
   - Add `NPM_TOKEN` in repository Settings → Secrets and variables → Actions
   - Required for automated NPM publishing

4. **Configure branch protection** (recommended):
   - Follow [docs/deployment/branch-protection.md](docs/deployment/branch-protection.md)

5. **Start coding!**:
   - Write tests first (TDD methodology)
   - Replace sample code in `src/index.ts`
   - Update tests in `tests/index.test.ts`

## 📦 Installation

```bash
npm install your-package-name
```

## 🔨 Usage

```typescript
import { add, subtract, multiply, divide } from "your-package-name";

// Your library code here
const result = add(2, 3);
console.log(result); // 5
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

## 🎨 Bundler Configuration

**Template includes:** Both `tsdown` and `pkgroll` pre-configured with ESM + CJS support.

### Keep Only tsdown (Recommended)

```bash
npm uninstall pkgroll
# Remove build:pkgroll script from package.json
```

**Best for:** Most projects, framework components, projects needing plugins

### Keep Only pkgroll

```bash
rm tsdown.config.ts
npm uninstall tsdown
# Remove build:tsdown script from package.json
```

**Best for:** Simple utilities, ESM-only packages, zero-config preference

### Remove CommonJS Support (ESM-only)

**In `tsdown.config.ts`:**
```typescript
export default defineConfig({
  format: ["esm"], // Remove "cjs"
});
```

**In `package.json`:**
```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
      // Remove "require" line
    }
  }
}
```

See full configuration guide in [Bundler Setup](docs/bundler-setup.md)

## 📖 Documentation

- **[CONTRIBUTING.md](CONTRIBUTING.md)** - How to contribute (includes TDD guide)
- **[SECURITY.md](SECURITY.md)** - Security policy and vulnerability reporting
- **[docs/deployment/security.md](docs/deployment/security.md)** - Security implementation details
- **[docs/deployment/branch-protection.md](docs/deployment/branch-protection.md)** - Branch protection setup
- **[docs/architecture/](docs/architecture/)** - Architecture Decision Records (ADRs)
- **[docs/api/](docs/api/)** - API documentation guidelines

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

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for:

- Development setup
- Conventional commit format
- Test-Driven Development (TDD) workflow
- Code quality standards
- Pull request process

**Quick contribution steps:**

1. Fork the repository
2. Create feature branch (`git checkout -b feat/amazing-feature`)
3. Write tests first (TDD!)
4. Implement feature
5. Commit changes (`git commit -m 'feat: add amazing feature'`)
6. Push to branch (`git push origin feat/amazing-feature`)
7. Open Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **BiomeJS** - Ultra-fast toolchain
- **Vitest** - Blazing fast testing
- **tsdown** - Modern bundler
- **Release Please** - Automated releases
- **GitHub Actions** - CI/CD automation

## 📞 Support

- **Issues**: [Create an issue](https://github.com/gander-templates/node-project-starter/issues/new/choose)
- **Discussions**: [GitHub Discussions](https://github.com/gander-templates/node-project-starter/discussions)
- **Security**: See [SECURITY.md](SECURITY.md)

---

**Made with ❤️ by [Adam Gąsowski](https://github.com/gander)**

**Star ⭐ this repository if you find it helpful!**
