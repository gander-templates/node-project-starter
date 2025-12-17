# Bundler Choice Guide - tsdown vs pkgroll

**DEFAULT:** This template uses **tsdown** with pre-configured `tsdown.config.ts`.

You can optionally **switch to pkgroll** by deleting the config file and updating package.json.

## What's Included by Default

- ✅ `tsdown.config.ts` already created
- ✅ `tsdown` in devDependencies
- ✅ `publint` in devDependencies
- ✅ ESM-only build (no CJS by default)
- ✅ Build scripts configured

**To use the default:** No action needed - just run `npm run build`

**To switch to pkgroll:** Follow "Migration" section below

## Quick Decision Matrix

| Priority | Choose tsdown | Choose pkgroll |
|----------|---------------|----------------|
| **Speed** | ✅ Fastest (~2x faster) | Good |
| **Zero-config** | Config file needed | ✅ Pure package.json |
| **Vue/React/Svelte** | ✅ Built-in support | Manual setup |
| **Tree-shaking** | Excellent | ✅ Best (Rollup) |
| **CJS quality** | Good | ✅ Cleanest output |
| **Plugins** | ✅ Rolldown/Rollup/unplugin | Limited |
| **UMD format** | ✅ Supported | Not supported |

## Option 1: tsdown (DEFAULT in template)

**tsdown is pre-configured - you don't need to do anything.**

The template includes `tsdown.config.ts` with sensible defaults.

**Use tsdown if:**
- You want the fastest possible builds (it's already set up!)
- Your library includes framework components (Vue/React/Solid/Svelte)
- You need UMD format for CDN usage
- You want plugin ecosystem support
- You're coming from tsup (nearly 100% compatible)

**Configuration:** Template includes `tsdown.config.ts`:

```typescript
import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"], // Add "cjs" if you need CommonJS
  dts: true,
  clean: true,
  sourcemap: true,
  minify: false, // Enable for production libraries
});
```

**To add CommonJS support:**
```typescript
export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"], // ← Add "cjs" here
  dts: true,
  clean: true,
  sourcemap: true,
});
```

**package.json scripts:**

```json
{
  "scripts": {
    "dev": "tsdown --watch",
    "build": "tsdown",
    "prepublishOnly": "npm run build && publint --strict"
  }
}
```

**Advanced Features:**

```typescript
// Vue component support
import { defineConfig } from "tsdown";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  plugins: [vue()],
});
```

## Option 2: pkgroll (Alternative - Zero Config)

**To switch from tsdown to pkgroll:**

1. Delete `tsdown.config.ts`
2. Update package.json devDependencies
3. Configure via package.json only

**Use pkgroll if:**
- You hate configuration files
- Tree-shaking quality is critical
- You need the cleanest possible CommonJS output
- Your library is utilities/helpers (not UI components)
- You prefer configuration via package.json only

**Migration steps:**

```bash
# 1. Remove tsdown config
rm tsdown.config.ts

# 2. Update package.json manually:
# Replace "tsdown" with "pkgroll" in devDependencies
```

**Configuration:** None! Configure via `package.json` only:

**ESM only (recommended):**
```json
{
  "name": "your-library",
  "version": "1.0.0",
  "type": "module",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    }
  },
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "dev": "pkgroll --watch",
    "build": "pkgroll",
    "prepublishOnly": "npm run build && publint --strict"
  }
}
```

**With optional CJS:**
```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  },
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts"
}
```

**How pkgroll works:**

- Automatically finds entry points from `exports` field
- Maps `./dist/*` paths to corresponding `./src/*` files
- No config file - everything inferred from package.json
- Generates ESM, CJS, and TypeScript declarations automatically

## publint - Always Included

Both bundlers must be used with **publint** to validate package configuration before publishing.

**Installation:**

```bash
npm install -D publint
```

**Usage:**

```bash
# Validate locally
npx publint --strict

# Auto-validate before publish (add to package.json)
"prepublishOnly": "npm run build && publint --strict"
```

**What publint catches:**

- Incorrect `exports` field format
- Missing `types` condition in exports
- ESM/CJS file extension mismatches
- Unpublished TypeScript declarations
- Incorrect dual-package hazards

## Migration Between Bundlers

### tsdown → pkgroll (switching from default):

```bash
# 1. Delete config file
rm tsdown.config.ts

# 2. Update package.json devDependencies
# Change: "tsdown": "latest" → "pkgroll": "latest"

# 3. Update scripts
# Change: "build": "tsdown" → "build": "pkgroll"

# 4. Configure exports in package.json (see above)

# 5. Test
npm run build
npx publint --strict
```

### pkgroll → tsdown (back to default):

```bash
# 1. Create tsdown.config.ts (see template example)

# 2. Update package.json devDependencies
# Change: "pkgroll": "latest" → "tsdown": "latest"

# 3. Update scripts
# Change: "build": "pkgroll" → "build": "tsdown"

# 4. Test
npm run build
npx publint --strict
```

## Common package.json Configuration

**ESM only (template default):**

```json
{
  "name": "@yourscope/library",
  "version": "1.0.0",
  "type": "module",
  "engines": {
    "node": ">=20"
  },
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    }
  },
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "dev": "tsdown --watch",
    "build": "tsdown",
    "typecheck": "tsc --noEmit",
    "prepublishOnly": "npm run build && publint --strict"
  },
  "devDependencies": {
    "tsdown": "^0.x.x",
    "publint": "^0.x.x",
    "typescript": "^5.x.x"
  }
}
```

**With optional CJS (if needed):**

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"  // ← Add for CJS
    }
  },
  "main": "./dist/index.cjs",  // ← Change to .cjs
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts"
}
```

**And in tsdown.config.ts:**
```typescript
format: ["esm", "cjs"]  // ← Add "cjs"
```

## Troubleshooting

### tsdown issues:

**Build fails with plugin error:**
- Check plugin compatibility with Rolldown
- Try unplugin version of the plugin
- Consult tsdown documentation for framework-specific setup

**Slow .d.ts generation:**
- tsdown should be ~8x faster than tsup
- If slow, check TypeScript version (5.0+ required)
- Verify `skipLibCheck: true` in tsconfig.json

### pkgroll issues:

**Entry point not found:**
- Check `exports` field paths
- Ensure corresponding files exist in `src/`
- pkgroll auto-maps `./dist/file.js` to `./src/file.ts`

**CJS output issues:**
- pkgroll generates cleanest CJS via Rollup
- Check `require` condition in exports
- Verify `.cjs` extension is used

### publint errors:

**"types condition should be first":**
```json
// ❌ Wrong
"exports": {
  ".": {
    "import": "./dist/index.js",
    "types": "./dist/index.d.ts"
  }
}

// ✅ Correct
"exports": {
  ".": {
    "types": "./dist/index.d.ts",
    "import": "./dist/index.js"
  }
}
```

**"Missing types export":**
- Add `types` condition to exports
- Ensure `.d.ts` files are generated
- Check `files` field includes `dist` directory

## Performance Comparison

Based on bundler-benchmark repository:

| Operation | tsdown | pkgroll |
|-----------|--------|---------|
| Cold build | ~200ms | ~350ms |
| Rebuild | ~50ms | ~100ms |
| .d.ts generation | ~30ms | ~150ms |
| Tree-shaking | Excellent | Best |

**Note:** Actual performance varies by project size.

## Ecosystem Compatibility

### tsdown:

- ✅ Rolldown plugins (native)
- ✅ Rollup plugins (via compatibility layer)
- ✅ unplugin (universal plugins)
- ✅ Vite plugins (most work)
- ✅ Framework-specific plugins (Vue, React, Solid, Svelte)

### pkgroll:

- ⚠️ Limited plugin support
- ✅ Works with standard Rollup plugins (manual integration)
- ❌ No built-in framework support

## What's Pre-configured in Template

**The template comes with tsdown already set up:**

1. ✅ `tsdown.config.ts` exists in project root
2. ✅ `tsdown` in package.json devDependencies
3. ✅ Scripts configured (`build`, `dev`)
4. ✅ ESM-only by default (add CJS if needed)
5. ✅ `publint` pre-configured

**To keep tsdown (recommended):**
- No action needed
- Just run `npm install && npm run build`
- Customize `tsdown.config.ts` if desired

**To switch to pkgroll:**
1. Delete `tsdown.config.ts`
2. Replace `tsdown` with `pkgroll` in package.json
3. Update scripts to use `pkgroll`
4. Configure via package.json exports

## Final Recommendation

**Use tsdown (default)** unless you have a strong preference for zero-config.

**Reasons to keep tsdown:**
- Already configured in template
- Fastest builds (~2x faster than alternatives)
- Plugin ecosystem support
- Framework compatibility (Vue/React/etc.)
- Future-proof (official Rolldown project)

**Reasons to switch to pkgroll:**
- You dislike config files
- You want best-in-class tree-shaking
- You need cleanest CommonJS output
- Your library is simple utilities

**Both are production-ready.** The default (tsdown) is optimized for most use cases.

---

**Last Updated:** 2025-12-17
**Template Version:** 1.0
