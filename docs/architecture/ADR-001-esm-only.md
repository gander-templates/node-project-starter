# ADR-001: ESM-only Module System

**Status**: Accepted
**Date**: 2025-12-17
**Deciders**: Template Maintainers

## Context

Node.js supports two module systems:

1. **CommonJS (CJS)**: The legacy `require()` / `module.exports` system
2. **ECMAScript Modules (ESM)**: The standard `import` / `export` system

Modern Node.js (14+) fully supports ESM, and the JavaScript ecosystem is moving toward ESM as the default. However, many existing packages still use CommonJS, creating a compatibility challenge.

**Options considered:**

- **ESM-only**: Modern, future-proof, simpler configuration
- **Dual ESM/CJS**: Maximum compatibility, more complex build and configuration
- **CJS-only**: Legacy approach, not recommended for new projects

## Decision

**We chose ESM-only for the Node Project Starter template.**

Implementation:

- `package.json` includes `"type": "module"`
- All source files use `.ts` extension with ESM syntax
- TypeScript configured with `"module": "ESNext"`
- Build outputs ESM format (`.js`) and optionally CJS (`.cjs`)
- Documentation emphasizes ESM-first approach

## Consequences

### Positive

- **Future-proof**: ESM is the JavaScript standard and future of Node.js
- **Simpler configuration**: No complex dual-format build setup
- **Better tree-shaking**: ESM enables better dead code elimination
- **Native browser compatibility**: ESM works in browsers without transpilation
- **Static analysis**: ESM allows better static analysis and tooling
- **Top-level await**: ESM supports top-level await (CJS doesn't)
- **Clearer semantics**: `import`/`export` is more explicit than `require()`

### Negative

- **Limited CJS interop**: Some old packages may not work well with ESM
- **Node.js version requirement**: Requires Node.js 14+ (now at EOL, so not a real concern)
- **Learning curve**: Developers used to CJS may need adjustment
- **File extensions**: May need explicit `.js` extensions in imports (TypeScript limitation)

### Neutral

- **Optional CJS support**: Template includes optional CJS build output via tsdown for packages that need it
- **Migration path**: Users can easily add CJS support if needed

## Alternatives Considered

### Alternative 1: Dual ESM/CJS

**Pros:**
- Maximum compatibility with all existing packages
- Works in both modern and legacy environments

**Cons:**
- Significantly more complex build configuration
- Requires maintaining two sets of type definitions
- `package.json` `exports` field becomes complex
- Harder to debug (which format is actually being used?)
- More potential for subtle bugs in dual-format packages
- Slower builds (must build twice)

**Why rejected:** Complexity outweighs benefits for modern projects targeting Node 18+.

### Alternative 2: CJS-only

**Pros:**
- Maximum backward compatibility
- Simpler mental model for some developers

**Cons:**
- Legacy approach, not future-proof
- Missing modern ES features (top-level await)
- Poor tree-shaking support
- Against the direction of the ecosystem

**Why rejected:** Not aligned with modern JavaScript best practices.

## Implementation Notes

### tsdown Configuration

```typescript
export default defineConfig({
  format: ["esm", "cjs"], // ESM primary, CJS optional
  // ...
});
```

Users can:
- Keep both formats (default)
- Remove CJS: change to `format: ["esm"]`
- Add more formats: include additional targets

### Package.json Exports

```json
{
  "type": "module",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  }
}
```

- `import` condition for ESM consumers
- `require` condition for CJS consumers (optional)
- `types` always first for TypeScript resolution

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "bundler"
  }
}
```

- `bundler` resolution is best for libraries (TypeScript 5.0+)
- Handles both ESM and package.json `exports` correctly

## Migration Path

If users need to support older CJS-only environments:

1. Keep the dual-format build (default in template)
2. Test both outputs
3. Document CJS support in package README
4. Use `publint` to validate package.json configuration

## References

- **Node.js ESM Documentation**: https://nodejs.org/api/esm.html
- **TypeScript ESM Support**: https://www.typescriptlang.org/docs/handbook/esm-node.html
- **Package.json Exports**: https://nodejs.org/api/packages.html#exports
- **Pure ESM Package**: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

## Review Schedule

Review this decision when:
- Node.js 18 reaches EOL (April 2026)
- CJS usage drops below 10% of npm downloads
- Major breaking changes in Node.js ESM support

---

**Last Updated**: 2025-12-17
