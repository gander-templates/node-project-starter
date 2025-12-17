# Bundler Choice Guide - tsdown vs pkgroll

This template supports two modern library bundlers. You must choose ONE during project setup.

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

## Option 1: tsdown (Recommended)

**Use tsdown if:**
- You want the fastest possible builds
- Your library includes framework components (Vue/React/Solid/Svelte)
- You need UMD format for CDN usage
- You want plugin ecosystem support
- You're migrating from tsup (nearly 100% compatible)

**Installation:**

```bash
npm install -D tsdown
```

**Configuration:** Create `tsdown.config.ts`:

```typescript
import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  sourcemap: true,
  minify: false, // Enable for production libraries
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

## Option 2: pkgroll (Zero-Config Alternative)

**Use pkgroll if:**
- You hate configuration files
- Tree-shaking quality is critical
- You need the cleanest possible CommonJS output
- Your library is utilities/helpers (not UI components)
- You prefer configuration via package.json only

**Installation:**

```bash
npm install -D pkgroll
```

**Configuration:** None! Configure via `package.json` only:

```json
{
  "name": "your-library",
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
  "files": ["dist"],
  "scripts": {
    "dev": "pkgroll --watch",
    "build": "pkgroll",
    "prepublishOnly": "npm run build && publint --strict"
  }
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

**tsdown → pkgroll:**

1. Remove `tsdown.config.ts`
2. Move all configuration to `package.json` exports
3. Update scripts to use `pkgroll`
4. Test build output structure matches

**pkgroll → tsdown:**

1. Create `tsdown.config.ts`
2. Configure formats explicitly
3. Update scripts to use `tsdown`
4. Verify plugin compatibility if needed

## Common package.json Configuration

Both bundlers require proper `package.json` configuration:

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
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  },
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "dev": "tsdown --watch",     // or "pkgroll --watch"
    "build": "tsdown",            // or "pkgroll"
    "typecheck": "tsc --noEmit",
    "prepublishOnly": "npm run build && publint --strict"
  },
  "devDependencies": {
    "tsdown": "^0.x.x",           // or "pkgroll": "^0.x.x"
    "publint": "^0.x.x",
    "typescript": "^5.x.x"
  }
}
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

## Final Recommendation

**For this template (Node Project Starter):**

- **Default choice:** tsdown
  - Fastest performance
  - Future-proof (official Rolldown project)
  - Framework support if needed later
  - Easier to customize

- **Alternative:** pkgroll
  - Choose if you strongly prefer zero-config
  - Best for simple utility libraries
  - Excellent for minimalists

**Both are production-ready.** Choose based on your preference for configuration style.

---

**Last Updated:** 2025-12-17
**Template Version:** 1.0
