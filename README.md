# README

## Bundler Configuration Guide

**Template includes:** Both `tsdown` and `pkgroll` pre-configured with ESM + CJS support.

**Choose your setup** by removing what you don't need.

### What's Included (Full Config)

```json
{
  "scripts": {
    "build:tsdown": "tsdown",
    "build:pkgroll": "pkgroll",
    "dev:tsdown": "tsdown --watch",
    "dev:pkgroll": "pkgroll --watch"
  },
  "devDependencies": {
    "tsdown": "latest",
    "pkgroll": "latest",
    "publint": "latest"
  },
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  }
}
```

**Files:**
- `tsdown.config.ts` - tsdown configuration
- `package.json` - exports configured for both bundlers

### Simplify Your Setup

#### Keep Only tsdown (Recommended)

**Remove:**
1. Delete `"pkgroll"` from `devDependencies`
2. Delete `"build:pkgroll"` and `"dev:pkgroll"` scripts
3. Rename `"build:tsdown"` to `build`
4. Rename `"dev:tsdown"` to `dev`

```bash
npm uninstall pkgroll
```

#### Keep Only pkgroll

**Remove:**
1. Delete `tsdown.config.ts` file
2. Delete `"tsdown"` from `devDependencies`
3. Delete `"build:tsdown"` and `"dev:tsdown"` scripts
4. Rename `build:pkgroll` to `build`
5. Rename `dev:pkgroll` to `dev`

```bash
rm tsdown.config.ts
npm uninstall tsdown
```

#### Keep Both (Advanced)

**Use case:** Compare build outputs or migrate gradually.

**Keep everything as-is.** Use:
- `npm run build:tsdown` - Build with tsdown
- `npm run build:pkgroll` - Build with pkgroll

#### Remove CommonJS Support

**If you only need ESM:**

**Remove from package.json:**
```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
      // ← Remove "require" line
    }
  }
}
```

**Remove from tsdown.config.ts:**
```typescript
export default defineConfig({
  format: ["esm"], // ← Remove "cjs" from array
  // ...
});
```

**Result:** Smaller package, fewer files, ESM-only.

#### Remove ESM Support (CJS Only)

**If you only need CommonJS:**

**In package.json:**
```json
{
  "type": "commonjs", // ← Change from "module"
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "require": "./dist/index.cjs"
      // ← Remove "import" line
    }
  },
  "main": "./dist/index.cjs"
}
```

**In tsdown.config.ts:**
```typescript
export default defineConfig({
  format: ["cjs"], // ← Remove "esm"
  // ...
});
```

### Full Configuration Reference

#### tsdown.config.ts (Full)

```typescript
import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"], // Remove "cjs" if ESM-only
  dts: true,
  clean: true,
  sourcemap: true,
  minify: false, // Set true for production
});
```

**Remove file entirely if using pkgroll only.**

#### package.json exports (Full)

```json
{
  "name": "your-package",
  "version": "1.0.0",
  "type": "module",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  },
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "files": ["dist"]
}
```

**Simplifications:**
- **ESM-only:** Remove `"require"` line, change `"main"` to `./dist/index.js`
- **CJS-only:** Remove `"import"` line, change `"type"` to `"commonjs"`

## publint Validation

**Always runs before publish** via `prepublishOnly` script.

```bash
npx publint --strict  # Run manually
```

**Catches errors:**
- Incorrect exports order (types must be first)
- Missing TypeScript declarations
- ESM/CJS extension mismatches

**Common fix:**
```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",  // ← Must be first
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  }
}
```

### Recommendations

**Most projects:**
- ✅ Keep **tsdown only**
- ✅ Keep **ESM + CJS** (remove CJS later if not needed)
- ✅ Remove pkgroll

**Simple utilities:**
- ✅ Keep **pkgroll only**
- ✅ Keep **ESM only**
- ✅ Remove tsdown and tsdown.config.ts

**Framework components:**
- ✅ Keep **tsdown only**
- ✅ Keep **ESM only** (frameworks use ESM)
- ✅ Remove pkgroll and CJS

---

**Docs:** [tsdown.dev](https://tsdown.dev/) | [pkgroll](https://github.com/privatenumber/pkgroll) | [publint.dev](https://publint.dev/)
