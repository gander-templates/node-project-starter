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

# tsdown vs pkgroll: Which bundler to choose for TypeScript CLI?

**pkgroll wins for CLI tools** thanks to automatic shebang handling and zero-config setup, while tsdown offers faster builds but requires manual workarounds for executable files. For complex CLIs with subcommands and multiple distribution channels (npm, npx, bin, deno compile), pkgroll provides fewer out-of-the-box issues, but tsdown may be better for intensive development workflows thanks to 2x faster builds.

---

## Automatic shebang handling makes the difference

The most important difference between bundlers for CLI is how they handle **hashbang** (`#!/usr/bin/env node`). pkgroll automatically adds shebang to all files defined in the `bin` field of package.json, which eliminates an entire class of executability problems. tsdown, designed as "The Elegant Library Bundler", doesn't have native shebang support and requires a workaround:

```typescript
// tsdown.config.ts - required workaround
export default defineConfig({
  entry: { cli: 'src/cli.ts' },
  outputOptions: {
    banner: '#!/usr/bin/env node\n',  // Manual injection
  },
})
```

pkgroll historically had several shebang bugs (hashbang in wrong place with ESM, missing on Windows, disappearing with `main` key present), but **all were fixed** by version 2.14.2 (July 2025). The system now works reliably - just define `bin` in package.json.

---

## Technology and performance comparison

| Aspect | tsdown | pkgroll |
|--------|--------|---------|
| **Bundler engine** | Rolldown (Rust) | Rollup (JavaScript) |
| **TS transformations** | Oxc (Rust) | esbuild |
| **.d.ts generation** | rolldown-plugin-dts | rollup-plugin-dts |
| **Build speed** | ~2x faster than tsup | Slower (JS-based) |
| **Tree-shaking** | Rolldown-based | Rollup (best in class) |
| **Minification** | Oxc (alpha - may have bugs) | esbuild (stable) |

tsdown is **up to 8x faster** at generating TypeScript declarations thanks to its Rust backend. When frequently rebuilding during development, this difference is noticeable. However, pkgroll offers **best-in-class tree-shaking** in the ecosystem thanks to Rollup, which translates to smaller bundle sizes for final builds.

---

## Configuration for complex CLI with subcommands

### pkgroll approach (zero-config)

```json
{
  "name": "my-cli-tool",
  "type": "module",
  "bin": {
    "mycli": "./dist/cli.js",
    "mycli-init": "./dist/commands/init.js"
  },
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs"
    }
  },
  "scripts": {
    "build": "pkgroll --sourcemap --clean-dist"
  }
}
```

pkgroll automatically detects entry points from `bin` and `exports`, adds shebangs where needed, and generates appropriate formats. **There's no config file** - package.json is the "single source of truth".

### tsdown approach (explicit config)

```typescript
// tsdown.config.ts
import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: {
    cli: 'src/cli.ts',
    'commands/init': 'src/commands/init.ts',
    'commands/build': 'src/commands/build.ts',
    index: 'src/index.ts',
  },
  format: ['esm'],
  platform: 'node',
  target: 'node20',
  shims: true,          // __dirname/__filename w ESM
  sourcemap: true,
  clean: true,
  outputOptions: {
    banner: '#!/usr/bin/env node\n',
  },
})
```

tsdown offers more control and migration from tsup (`npx tsdown migrate`), but requires more configuration for CLI.

---

## CLI library compatibility

Both bundlers **externalize dependencies** by default (packages in `dependencies` vs `devDependencies`), meaning most CLI libraries aren't bundled. For heavy dependencies like inquirer, commander, or chalk, this is the recommended approach:

| Library | tsdown | pkgroll | Notes |
|------------|--------|---------|-------|
| commander.js | ✅ | ✅ | Externalize |
| yargs | ✅ | ✅ | Externalize |
| cac | ✅ | ✅ | ESM-only, works |
| inquirer | ⚠️ | ⚠️ | Dynamic requires - externalize |
| prompts | ✅ | ✅ | Externalize |
| chalk v5+ | ✅ | ✅ | ESM-only, works |
| picocolors | ✅ | ✅ | Can bundle (tiny) |
| ora | ✅ | ✅ | ESM-only, externalize |
| cosmiconfig | ⚠️ | ⚠️ | Dynamic requires - externalize |

**ESM-only packages** (chalk 5+, ora, cac) work in both bundlers without issues. Packages using **dynamic requires** (inquirer, cosmiconfig) are better kept as external dependencies.

---

## Bundle size and tree-shaking for CLI

### Tree-shaking efficiency

pkgroll with Rollup offers **best-in-class tree-shaking** - especially important for CLIs with many subcommands, where users invoke only one at a time. Rollup better eliminates unused code between modules.

tsdown with Rolldown has tree-shaking **enabled by default** (`--no-treeshake` disables it), but may be less aggressive than Rollup in edge cases.

### Lazy loading subcommands

Neither bundler has built-in lazy loading, but you can implement it manually:

```typescript
// src/cli.ts
const commands = {
  init: () => import('./commands/init.js'),
  build: () => import('./commands/build.js'),
  deploy: () => import('./commands/deploy.js'),
}

const [command] = process.argv.slice(2)
const handler = commands[command]
if (handler) {
  const module = await handler()
  await module.run()
}
```

Both bundlers support dynamic imports, so this pattern works.

---

## Preparing for standalone binaries

### deno compile compatibility

For deno compile you need a bundle as a single ESM file:

```bash
# tsdown
tsdown src/cli.ts --format esm --minify

# pkgroll
pkgroll --minify
```

Then:
```bash
deno compile --output mycli --allow-read --allow-write ./dist/cli.js
```

### bun build --compile

Bun has its own standalone compilation system:

```bash
bun build ./src/cli.ts --compile --outfile mycli
```

No prior bundling needed - Bun does everything itself. Output includes runtime (~45-90MB).

### pkg/nexe compatibility

Both bundlers produce standard Node.js JavaScript, so output is compatible with pkg and nexe:

```bash
# After bundling
pkg ./dist/cli.js --targets node20-linux-x64,node20-win-x64,node20-macos-x64
```

### vercel/ncc as alternative

ncc is a zero-config compiler from Vercel that produces single-file output:

```bash
ncc build src/cli.ts -o dist
```

May be simpler for simple CLIs, but has issues with dynamic requires.

---

## Developer experience and debugging

### Watch mode

Both bundlers have watch mode:

```bash
tsdown --watch
pkgroll --watch
```

tsdown is **significantly faster** at rebuilds thanks to Rust backend.

### Source maps

```bash
tsdown --sourcemap
pkgroll --sourcemap
```

Usage at runtime:
```bash
node --enable-source-maps ./dist/cli.js
```

**Note**: pkgroll has a documented bug (#84) with line offset in sourcemaps, tsdown works better.

### Debugging in VS Code

```json
{
  "type": "node",
  "request": "launch",
  "name": "Debug CLI",
  "program": "${workspaceFolder}/dist/cli.js",
  "args": ["build", "--verbose"],
  "sourceMaps": true,
  "outFiles": ["${workspaceFolder}/dist/**/*.js"]
}
```

---

## Critical edge cases for CLI

### __dirname and __filename in ESM

tsdown with `shims: true` automatically adds:
```javascript
import { fileURLToPath } from 'node:url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
```

pkgroll automatically shims `import.meta.dirname` and `import.meta.filename` in CJS output.

### process.exit() handling

Both bundlers may aggressively tree-shake code after `process.exit()`. Safe pattern:

```typescript
async function main() {
  try {
    await runCLI()
    process.exit(0)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}
main()
```

### Native modules

pkgroll **automatically handles** `.node` files - copies to `dist/natives/` and rewrites imports. tsdown has no documented support - better to externalize packages with native modules.

---

## Known issues and gotchas

### pkgroll (19 open issues)
- CJS default exports aren't unwrapped under `default` property (#101)
- Sourcemap offset bugs (#84)
- No config file API - everything through CLI (#98 - requested feature)
- No programmatic API (#137)

### tsdown (37 open issues)
- CSS handling problematic (#627, #653)
- Yarn PnP config loading fails (#639)
- DTS issues with TypeScript path mappings in monorepo (#594, #523)
- `__dirname` shim doesn't exactly replicate `import.meta.dirname` (#572)
- Minification causes errors with Express routes (#462)

---

## Recommendation for your use case

For **complex CLI with subcommands, interactive prompts, and multiple distribution targets** (npm, npx, bin, deno compile):

### Choose pkgroll if:
- You prefer zero-config and package.json as source of truth
- You want automatic shebang handling without workarounds
- You need best-in-class tree-shaking for smaller bundles
- You use native modules
- You value stability (mature project, quick bug fixes)

### Choose tsdown if:
- You're intensively developing CLI and need fast rebuilds
- You're migrating from tsup (built-in migration tool)
- You need programmatic API
- You plan to use framework plugins (Vue, Solid, Svelte)
- You want explicit config file with defineConfig()

### My recommendation

**Start with pkgroll** - automatic shebang handling and zero-config significantly reduce friction when building CLIs. If builds become a bottleneck (large project, frequent rebuilds), consider migrating to tsdown with prepared shebang workarounds.

Project structure should look like this:

```
my-cli/
├── src/
│   ├── cli.ts           # Main entry (hashbang added automatically)
│   ├── index.ts         # Library exports (programmatic API)
│   └── commands/
│       ├── init.ts
│       └── build.ts
├── package.json         # bin + exports = pkgroll config
└── tsconfig.json
```

Package.json:
```json
{
  "type": "module",
  "bin": { "mycli": "./dist/cli.js" },
  "exports": {
    ".": { "import": "./dist/index.mjs" }
  },
  "scripts": {
    "build": "pkgroll --sourcemap",
    "dev": "pkgroll --watch"
  },
  "engines": { "node": ">=20" }
}
```

This configuration works out-of-the-box for npm, npx, and global installation, and the output can be easily passed to deno compile or pkg for standalone binaries.

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
