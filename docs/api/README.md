# API Documentation

This directory contains API documentation for the project.

## Overview

As you build your library, document your public API here. This helps users understand how to use your package and makes maintenance easier.

## Documentation Structure

### Suggested Organization

```
docs/api/
├── README.md           # This file - API overview
├── classes/            # Class documentation
├── functions/          # Function documentation
├── types/              # Type definitions
└── examples/           # Usage examples
```

## JSDoc Comments

Use JSDoc comments in your source code for inline documentation:

```typescript
/**
 * Calculates the sum of two numbers.
 *
 * @param a - The first number
 * @param b - The second number
 * @returns The sum of a and b
 *
 * @example
 * ```typescript
 * const result = add(2, 3);
 * console.log(result); // 5
 * ```
 */
export function add(a: number, b: number): number {
	return a + b;
}
```

### JSDoc Best Practices

- **@param**: Describe each parameter's purpose and type
- **@returns**: Explain what the function returns
- **@throws**: Document exceptions that might be thrown
- **@example**: Provide usage examples
- **@see**: Link to related functions or documentation
- **@deprecated**: Mark deprecated APIs with migration guidance

## Automated Documentation Generation

Consider using automated tools to generate API documentation from JSDoc comments:

### TypeDoc

Generate HTML documentation from TypeScript:

```bash
npm install -D typedoc

# Add script to package.json
"docs:generate": "typedoc src/index.ts --out docs/api"

# Generate docs
npm run docs:generate
```

### API Extractor

Microsoft's tool for API documentation and validation:

```bash
npm install -D @microsoft/api-extractor

# Create config
npx api-extractor init

# Extract API
npx api-extractor run
```

### TSDoc

Standard for TypeScript documentation comments:

```typescript
/**
 * Performs a complex operation.
 *
 * @remarks
 * This function has special behavior when the input is negative.
 *
 * @param value - The input value
 * @returns The processed result
 *
 * @beta
 */
export function complexOperation(value: number): number {
	// implementation
}
```

## Documenting Breaking Changes

When making breaking changes:

1. **Mark as deprecated** first:
   ```typescript
   /**
    * @deprecated Use {@link newFunction} instead. Will be removed in v2.0.
    */
   export function oldFunction() {}
   ```

2. **Provide migration guide**:
   - Document what changed
   - Show old vs. new usage
   - Explain rationale

3. **Update changelog**: Breaking changes should be clearly marked

## Example API Documentation

### Example: Function Documentation

```markdown
# `add(a, b)`

Adds two numbers together.

## Parameters

- `a` (number): The first number
- `b` (number): The second number

## Returns

(number): The sum of `a` and `b`

## Examples

### Basic usage

typescript
import { add } from '@your-org/your-package';

const result = add(2, 3);
console.log(result); // 5


### With negative numbers

typescript
const result = add(-5, 10);
console.log(result); // 5

```

### Example: Class Documentation

```markdown
# `Calculator`

A simple calculator class.

## Constructor

typescript
new Calculator(initialValue?: number)


### Parameters

- `initialValue` (number, optional): Starting value (default: 0)

## Methods

### `add(value)`

Adds a value to the current result.

**Parameters:**
- `value` (number): Value to add

**Returns:** (Calculator) - Returns `this` for chaining

### `getResult()`

Gets the current calculation result.

**Returns:** (number) - The current result

## Examples

typescript
const calc = new Calculator(10);
calc.add(5).add(3);
console.log(calc.getResult()); // 18

```

## Publishing Documentation

### GitHub Pages

Host documentation on GitHub Pages:

1. Generate docs to `docs/` directory
2. Go to repository Settings → Pages
3. Select source: `main` branch, `/docs` folder
4. Documentation available at `https://username.github.io/repo-name/`

### README Badges

Add documentation badge to README:

```markdown
[![Documentation](https://img.shields.io/badge/docs-latest-blue.svg)](https://your-docs-url.com)
```

## Documentation Checklist

Before releasing:

- [ ] All exported functions have JSDoc comments
- [ ] All parameters are documented
- [ ] Return types are documented
- [ ] Examples are provided
- [ ] Edge cases are documented
- [ ] Breaking changes are noted
- [ ] Migration guides are written

## Resources

- **JSDoc**: https://jsdoc.app/
- **TypeDoc**: https://typedoc.org/
- **TSDoc**: https://tsdoc.org/
- **API Extractor**: https://api-extractor.com/

---

**Last Updated**: 2025-12-17
