# Bundler Choice Guide

**Template default:** `tsdown` with pre-configured `tsdown.config.ts`

## Quick Comparison

| Feature | tsdown (default) | pkgroll |
|---------|------------------|---------|
| **Configuration** | Config file | Package.json only |
| **Speed** | ~2x faster | Good |
| **Frameworks** | Vue/React/Svelte built-in | Manual setup |
| **Plugins** | Rolldown/Rollup/unplugin | Limited |
| **Tree-shaking** | Excellent | Best (Rollup) |
| **CJS output** | Good | Cleanest |

## Using tsdown (Default)

**No setup needed** - template includes `tsdown.config.ts`:

```typescript
import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"], // Add "cjs" for CommonJS
  dts: true,
  clean: true,
  sourcemap: true,
});
```

**Add CommonJS:** Change `format: ["esm", "cjs"]`

**Best for:** Fast builds, framework components, plugin support

## Switching to pkgroll

**If you prefer zero-config:**

```bash
# 1. Remove config file
rm tsdown.config.ts

# 2. Update package.json
# Replace: "tsdown" → "pkgroll" in devDependencies
# Replace: "build": "tsdown" → "build": "pkgroll"

# 3. Configure via package.json exports
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    }
  }
}
```

**Best for:** Simple utilities, no config files, best tree-shaking

## Package Validation (publint)

**Always included** - validates exports before publish:

```bash
npx publint --strict  # Validate locally
```

**Catches:**
- Incorrect `exports` field format
- Missing TypeScript types
- ESM/CJS configuration errors

**Auto-runs** via `prepublishOnly` script before npm publish.

## Common Issues

**publint: "types condition should be first"**
```json
// ✅ Correct order
"exports": {
  ".": {
    "types": "./dist/index.d.ts",  // ← First
    "import": "./dist/index.js"
  }
}
```

**Add CJS support:**
- **tsdown:** `format: ["esm", "cjs"]` in config
- **pkgroll:** Add `"require": "./dist/index.cjs"` to exports

## Recommendation

**Keep tsdown (default)** for most projects - faster and more features.

**Switch to pkgroll** only if you strongly prefer configuration via package.json.

---

**Docs:** [tsdown.dev](https://tsdown.dev/) | [pkgroll](https://github.com/privatenumber/pkgroll) | [publint.dev](https://publint.dev/)
