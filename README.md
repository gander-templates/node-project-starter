# Bundler Configuration Guide

**Template includes:** Both `tsdown` and `pkgroll` pre-configured with ESM + CJS support.

**Choose your setup** by removing what you don't need.

## What's Included (Full Config)

```json
{
  "scripts": {
    "build:tsdown": "tsdown",
    "build:pkgroll": "pkgroll",
    "build": "npm run build:tsdown",
    "dev": "tsdown --watch"
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

## Bundler Comparison

| Feature | tsdown | pkgroll |
|---------|--------|---------|
| **Speed** | ~2x faster | Good |
| **Config** | tsdown.config.ts | package.json only |
| **Frameworks** | Vue/React/Svelte | Manual |
| **Plugins** | Rolldown/Rollup/unplugin | Limited |
| **Tree-shaking** | Excellent | Best |
| **CJS output** | Good | Cleanest |

## Simplify Your Setup

### Keep Only tsdown (Recommended)

**Remove:**
1. Delete `"pkgroll"` from `devDependencies`
2. Delete `"build:pkgroll"` script
3. Done! Keep `build:tsdown` or rename to `build`

```bash
npm uninstall pkgroll
```

### Keep Only pkgroll

**Remove:**
1. Delete `tsdown.config.ts` file
2. Delete `"tsdown"` from `devDependencies`
3. Delete `"build:tsdown"` script
4. Change `"dev"` to use pkgroll: `"dev": "pkgroll --watch"`
5. Rename `build:pkgroll` to `build`

```bash
rm tsdown.config.ts
npm uninstall tsdown
```

### Keep Both (Advanced)

**Use case:** Compare build outputs or migrate gradually.

**Keep everything as-is.** Use:
- `npm run build:tsdown` - Build with tsdown
- `npm run build:pkgroll` - Build with pkgroll
- `npm run build` - Uses default (tsdown)

### Remove CommonJS Support

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

### Remove ESM Support (CJS Only)

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

## Full Configuration Reference

### tsdown.config.ts (Full)

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

### package.json exports (Full)

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

## Quick Start Checklist

After initializing template:

1. **Choose bundler:**
   - [ ] Keep tsdown (faster, more features)
   - [ ] Switch to pkgroll (zero-config)
   - [ ] Keep both (for comparison)

2. **Choose module format:**
   - [ ] ESM + CJS (maximum compatibility)
   - [ ] ESM only (modern, smaller)
   - [ ] CJS only (legacy support)

3. **Clean up:**
   - [ ] Remove unused bundler from package.json
   - [ ] Remove unused scripts
   - [ ] Remove unused config files
   - [ ] Update exports field

4. **Test:**
   ```bash
   npm run build
   npx publint --strict
   ```

## Recommendations

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
