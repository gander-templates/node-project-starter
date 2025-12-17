# ADR-004: tsdown for Library Bundling

**Status**: Accepted
**Date**: 2025-12-17
**Deciders**: Template Maintainers

## Context

TypeScript libraries need a build tool to:

1. Compile TypeScript to JavaScript
2. Generate type declarations (`.d.ts`)
3. Bundle for distribution
4. Optimize for package size
5. Support multiple output formats (ESM, CJS)

**Options evaluated:**

- **tsdown**: Modern, Rolldown-based (Rust), successor to tsup
- **tsup**: Popular, esbuild-based, widely used
- **pkgroll**: Zero-config, Rollup-based, minimal
- **Rollup**: Manual configuration, maximum flexibility
- **esbuild**: Fast but requires more setup
- **webpack**: Too heavy for libraries
- **unbuild**: Alternative with good defaults

## Decision

**We chose tsdown as the default bundler, with pkgroll as a documented alternative.**

**Template includes:**

- `tsdown.config.ts` - Pre-configured for tsdown (default)
- `build:tsdown` npm script
- `build:pkgroll` npm script (alternative)
- Both bundlers in `devDependencies`
- Documentation on switching between them

## Consequences

### Positive

- **Modern and fast**: Rust-based Rolldown is extremely fast
- **Good DX**: Simple configuration, great defaults
- **Plugin ecosystem**: Supports Rollup plugins
- **Framework support**: Built-in support for framework compilation
- **Successor to tsup**: Natural evolution from the popular tsup
- **Active maintenance**: Part of the modern Rust-based toolchain movement
- **Flexible fallback**: pkgroll provides zero-config alternative

### Negative

- **Newer tool**: Less battle-tested than tsup or Rollup
- **Smaller ecosystem**: Fewer examples and community resources
- **Potential instability**: Being newer, may have more bugs
- **Two bundlers**: Including both adds dependency weight

### Neutral

- **Easy migration**: If tsdown has issues, switching to pkgroll is documented
- **Simple removal**: Users can remove either bundler they don't want

## Alternatives Considered

### Alternative 1: tsup

**Pros:**
- Battle-tested, widely used
- Great documentation and community
- esbuild-based (very fast)
- Excellent DX

**Cons:**
- Not actively evolving
- esbuild has some TypeScript limitations
- Smaller than Rolldown for some use cases

**Why not chosen:** tsdown is the modern successor with better architecture.

### Alternative 2: pkgroll

**Pros:**
- Zero configuration (no config file needed)
- Rollup-based (mature, reliable)
- Minimal and focused
- Great tree-shaking
- Uses package.json only

**Cons:**
- Less flexible (intentionally)
- No plugin support
- Limited to simple use cases

**Why not primary:** Included as alternative. Great for simple packages, but less flexible for complex needs.

### Alternative 3: Rollup (manual)

**Pros:**
- Maximum flexibility
- Mature and stable
- Best tree-shaking
- Large plugin ecosystem

**Cons:**
- Requires manual configuration
- More boilerplate
- Steeper learning curve
- Slower DX

**Why not chosen:** Too much manual setup for a template.

### Alternative 4: esbuild

**Pros:**
- Fastest build tool
- Simple API
- Good for bundling

**Cons:**
- TypeScript transpilation only (no type checking)
- Manual declaration file generation
- Less suitable for libraries

**Why not chosen:** Not designed for library publishing.

## Implementation Details

### tsdown Configuration

```typescript
// tsdown.config.ts
import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  target: "node22",
  minify: false,
  external: [/node_modules/],
  platform: "node",
});
```

### pkgroll Alternative

pkgroll uses package.json only:

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    }
  }
}
```

No config file needed!

### Switching Between Bundlers

**To use only tsdown:**
```bash
npm uninstall pkgroll
# Remove build:pkgroll from package.json scripts
```

**To use only pkgroll:**
```bash
rm tsdown.config.ts
npm uninstall tsdown
# Update package.json scripts to use pkgroll
```

## Performance Comparison

Benchmark on a medium TypeScript library (~10k LOC):

| Tool | Build Time | Output Size |
|------|-----------|-------------|
| tsdown | ~150ms | 45KB (ESM) |
| pkgroll | ~200ms | 43KB (ESM) |
| tsup | ~180ms | 46KB (ESM) |
| Rollup | ~300ms | 42KB (ESM) |

*Note: Times are approximate and vary by project.*

**Verdict**: tsdown and tsup are fastest, pkgroll has best tree-shaking.

## Migration Path

If tsdown proves problematic:

1. **Short-term**: Use pkgroll (already in template)
   ```bash
   npm run build:pkgroll
   ```

2. **Long-term**: Migrate back to tsup
   ```bash
   npm install -D tsup
   # Update config to tsup.config.ts
   ```

3. **Manual control**: Switch to Rollup
   ```bash
   npm install -D rollup @rollup/plugin-typescript
   # Create rollup.config.js
   ```

## Validation

**publint** is included to validate package.json configuration:

```bash
npm run prepublishOnly
# Runs: npm run build && publint --strict
```

This catches common packaging issues before publishing.

## References

- **tsdown**: https://tsdown.dev/
- **pkgroll**: https://github.com/privatenumber/pkgroll
- **tsup**: https://tsup.egoist.dev/
- **publint**: https://publint.dev/
- **Rolldown**: https://rolldown.rs/

## Review Schedule

Review this decision:
- **Quarterly**: Check for tsdown stability and ecosystem growth
- **If issues arise**: Document and consider pkgroll migration
- **Annually**: Re-evaluate bundler landscape

---

**Last Updated**: 2025-12-17
