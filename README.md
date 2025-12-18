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

# tsdown vs pkgroll: Który bundler wybrać do CLI w TypeScript?

**pkgroll wygrywa dla narzędzi CLI** dzięki automatycznej obsłudze shebang i konfiguracji zero-config, podczas gdy tsdown oferuje szybsze buildy, ale wymaga ręcznych workaroundów dla plików wykonywalnych. Dla złożonego CLI z subkomendami i wieloma kanałami dystrybucji (npm, npx, bin, deno compile), pkgroll zapewnia mniej problemów out-of-the-box, ale tsdown może być lepszy przy intensywnym development workflow dzięki 2x szybszemu buildowi.

---

## Automatyczna obsługa shebang decyduje o wyborze

Najważniejsza różnica między bundlerami dla CLI to sposób obsługi **hashbang** (`#!/usr/bin/env node`). pkgroll automatycznie dodaje shebang do wszystkich plików zdefiniowanych w `bin` field package.json, co eliminuje całą klasę problemów z wykonywalnością. tsdown, zaprojektowany jako "The Elegant Library Bundler", nie posiada natywnej obsługi shebang i wymaga workaroundu:

```typescript
// tsdown.config.ts - wymagany workaround
export default defineConfig({
  entry: { cli: 'src/cli.ts' },
  outputOptions: {
    banner: '#!/usr/bin/env node\n',  // Ręczna injekcja
  },
})
```

pkgroll miał historycznie kilka bugów z shebang (hashbang w złym miejscu przy ESM, brak na Windows, znikający przy obecności `main` key), ale **wszystkie zostały naprawione** do wersji 2.14.2 (lipiec 2025). Teraz system działa niezawodnie - wystarczy zdefiniować `bin` w package.json.

---

## Porównanie technologii i wydajności

| Aspekt | tsdown | pkgroll |
|--------|--------|---------|
| **Silnik bundlera** | Rolldown (Rust) | Rollup (JavaScript) |
| **Transformacje TS** | Oxc (Rust) | esbuild |
| **Generacja .d.ts** | rolldown-plugin-dts | rollup-plugin-dts |
| **Szybkość buildu** | ~2x szybszy niż tsup | Wolniejszy (JS-based) |
| **Tree-shaking** | Rolldown-based | Rollup (najlepszy w klasie) |
| **Minifikacja** | Oxc (alpha - może mieć bugi) | esbuild (stabilny) |

tsdown jest **do 8x szybszy** przy generowaniu TypeScript declarations dzięki Rust-owemu backendowi. Przy częstym rebuildowaniu podczas developmentu ta różnica jest odczuwalna. Jednak pkgroll oferuje **najlepszy tree-shaking** w ekosystemie dzięki Rollup, co przekłada się na mniejsze bundle size dla finalnych buildów.

---

## Konfiguracja dla złożonego CLI z subkomendami

### Podejście pkgroll (zero-config)

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

pkgroll automatycznie wykrywa entry pointy z `bin` i `exports`, dodaje shebangi gdzie trzeba, i generuje odpowiednie formaty. **Nie ma pliku konfiguracyjnego** - package.json jest "single source of truth".

### Podejście tsdown (explicit config)

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

tsdown oferuje większą kontrolę i migrację z tsup (`npx tsdown migrate`), ale wymaga więcej konfiguracji dla CLI.

---

## Kompatybilność z bibliotekami CLI

Obie bundlery **externalizują dependencies** domyślnie (pakiety z `dependencies` vs `devDependencies`), co oznacza że większość bibliotek CLI nie jest bundlowana. Dla heavy dependencies jak inquirer, commander czy chalk to zalecane podejście:

| Biblioteka | tsdown | pkgroll | Uwagi |
|------------|--------|---------|-------|
| commander.js | ✅ | ✅ | Externalizuj |
| yargs | ✅ | ✅ | Externalizuj |
| cac | ✅ | ✅ | ESM-only, działa |
| inquirer | ⚠️ | ⚠️ | Dynamic requires - externalizuj |
| prompts | ✅ | ✅ | Externalizuj |
| chalk v5+ | ✅ | ✅ | ESM-only, działa |
| picocolors | ✅ | ✅ | Może bundlować (tiny) |
| ora | ✅ | ✅ | ESM-only, externalizuj |
| cosmiconfig | ⚠️ | ⚠️ | Dynamic requires - externalizuj |

**ESM-only packages** (chalk 5+, ora, cac) działają w obu bundlerach bez problemów. Pakiety używające **dynamic requires** (inquirer, cosmiconfig) lepiej trzymać jako external dependencies.

---

## Bundle size i tree-shaking dla CLI

### Efektywność tree-shaking

pkgroll z Rollup oferuje **najlepszy tree-shaking** - szczególnie istotne dla CLI z wieloma subkomendami, gdzie użytkownik wywołuje tylko jedną na raz. Rollup lepiej eliminuje nieużywany kod między modułami.

tsdown z Rolldown ma tree-shaking **włączony domyślnie** (`--no-treeshake` wyłącza), ale może być mniej agresywny niż Rollup w edge cases.

### Lazy loading subkomend

Żaden bundler nie ma wbudowanego lazy loading, ale można go zaimplementować manualnie:

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

Oba bundlery obsługują dynamic imports, więc ten pattern działa.

---

## Przygotowanie do standalone binaries

### deno compile compatibility

Dla deno compile potrzebujesz bundla jako pojedynczy plik ESM:

```bash
# tsdown
tsdown src/cli.ts --format esm --minify

# pkgroll
pkgroll --minify
```

Następnie:
```bash
deno compile --output mycli --allow-read --allow-write ./dist/cli.js
```

### bun build --compile

Bun ma własny system kompilacji standalone:

```bash
bun build ./src/cli.ts --compile --outfile mycli
```

Nie wymaga wcześniejszego bundlowania - Bun robi wszystko sam. Output zawiera runtime (~45-90MB).

### pkg/nexe compatibility

Oba bundlery produkują standardowy Node.js JavaScript, więc output jest kompatybilny z pkg i nexe:

```bash
# Po zbundlowaniu
pkg ./dist/cli.js --targets node20-linux-x64,node20-win-x64,node20-macos-x64
```

### vercel/ncc jako alternatywa

ncc to zero-config compiler od Vercel, który produkuje single-file output:

```bash
ncc build src/cli.ts -o dist
```

Może być prostszy dla prostych CLI, ale ma problemy z dynamic requires.

---

## Developer experience i debugging

### Watch mode

Oba bundlery mają watch mode:

```bash
tsdown --watch
pkgroll --watch
```

tsdown jest **znacząco szybszy** przy rebuildach dzięki Rust backend.

### Source maps

```bash
tsdown --sourcemap
pkgroll --sourcemap
```

Użycie przy runtime:
```bash
node --enable-source-maps ./dist/cli.js
```

**Uwaga**: pkgroll ma udokumentowany bug (#84) z offsetem linii w sourcemaps, tsdown działa lepiej.

### Debugging w VS Code

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

## Edge cases krytyczne dla CLI

### __dirname i __filename w ESM

tsdown z `shims: true` automatycznie dodaje:
```javascript
import { fileURLToPath } from 'node:url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
```

pkgroll automatycznie shimuje `import.meta.dirname` i `import.meta.filename` w CJS output.

### process.exit() handling

Oba bundlery mogą agresywnie tree-shake kod po `process.exit()`. Bezpieczny pattern:

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

pkgroll **automatycznie obsługuje** pliki `.node` - kopiuje do `dist/natives/` i przepisuje importy. tsdown nie ma udokumentowanej obsługi - lepiej externalizować pakiety z native modules.

---

## Znane problemy i gotchas

### pkgroll (19 open issues)
- CJS default exports nie są unwrapowane pod `default` property (#101)
- Sourcemap offset bugs (#84)
- Brak config file API - wszystko przez CLI (#98 - requested feature)
- Brak programmatic API (#137)

### tsdown (37 open issues)
- CSS handling problematyczny (#627, #653)
- Yarn PnP config loading fails (#639)
- DTS issues z TypeScript path mappings w monorepo (#594, #523)
- `__dirname` shim nie replikuje dokładnie `import.meta.dirname` (#572)
- Minifikacja powoduje błędy z Express routes (#462)

---

## Rekomendacja dla Twojego use case

Dla **złożonego CLI z subkomendami, interactive prompts i wieloma distribution targets** (npm, npx, bin, deno compile):

### Wybierz pkgroll jeśli:
- Preferujesz zero-config i package.json jako źródło prawdy
- Chcesz automatyczną obsługę shebang bez workaroundów
- Potrzebujesz najlepszego tree-shaking dla mniejszych bundli
- Używasz native modules
- Cenisz stabilność (mature project, quick bug fixes)

### Wybierz tsdown jeśli:
- Intensywnie rozwijasz CLI i potrzebujesz szybkich rebuildów
- Migrujesz z tsup (wbudowane narzędzie migracji)
- Potrzebujesz programmatic API
- Planujesz używać frameworkowych pluginów (Vue, Solid, Svelte)
- Chcesz explicit config file z defineConfig()

### Moja rekomendacja

**Zacznij od pkgroll** - automatyczna obsługa shebang i zero-config znacząco redukują friction przy budowaniu CLI. Jeśli buildy staną się bottleneckiem (duży projekt, częste rebuildy), rozważ migrację do tsdown z przygotowanymi workaroundami dla shebang.

Struktura projektu powinna wyglądać tak:

```
my-cli/
├── src/
│   ├── cli.ts           # Main entry (hashbang dodawany automatycznie)
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

Ta konfiguracja działa out-of-the-box dla npm, npx i globalnej instalacji, a output można łatwo przekazać do deno compile lub pkg dla standalone binaries.

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
