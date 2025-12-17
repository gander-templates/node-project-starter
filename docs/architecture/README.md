# Architecture Documentation

This directory contains Architecture Decision Records (ADRs) that document significant architectural and technical decisions made in the Node Project Starter template.

## What are ADRs?

Architecture Decision Records (ADRs) are lightweight documents that capture important architectural decisions along with their context and consequences.

**Each ADR includes:**

- **Title**: Short descriptive name
- **Status**: Proposed, Accepted, Deprecated, or Superseded
- **Context**: The issue or situation motivating the decision
- **Decision**: What we decided to do
- **Consequences**: Positive and negative outcomes

## ADR Index

| ADR | Title | Status |
|-----|-------|--------|
| [ADR-001](./ADR-001-esm-only.md) | ESM-only Module System | Accepted |
| [ADR-002](./ADR-002-biomejs.md) | BiomeJS over ESLint + Prettier | Accepted |
| [ADR-003](./ADR-003-vitest.md) | Vitest over Jest | Accepted |
| [ADR-004](./ADR-004-tsdown.md) | tsdown for Library Bundling | Accepted |
| [ADR-005](./ADR-005-lefthook.md) | Lefthook over Husky | Accepted |
| [ADR-006](./ADR-006-release-please.md) | Release Please for Automation | Accepted |
| [ADR-007](./ADR-007-slsa-level-3.md) | SLSA Level 3 Compliance | Accepted |

## Creating New ADRs

When making significant architectural decisions in your project, consider documenting them:

### 1. Create a New ADR File

```bash
# Use the next available number
touch docs/architecture/ADR-008-your-decision.md
```

### 2. Use This Template

```markdown
# ADR-XXX: [Title]

**Status**: [Proposed | Accepted | Deprecated | Superseded]
**Date**: YYYY-MM-DD
**Deciders**: [List of people involved]

## Context

What is the issue we're facing? What factors are relevant?

## Decision

What decision did we make?

## Consequences

### Positive

- What improves?
- What problems does this solve?

### Negative

- What trade-offs are we making?
- What new problems might this create?

### Neutral

- Any other implications?

## Alternatives Considered

What other options did we evaluate?

## References

- Links to relevant documentation, issues, discussions
```

### 3. Update the Index

Add your new ADR to the table above.

## When to Write an ADR

Write an ADR when:

- ✅ Choosing between multiple technical approaches
- ✅ Adopting a new tool or framework
- ✅ Making a decision with long-term implications
- ✅ Solving a recurring architectural problem
- ✅ Establishing a standard or pattern

Don't write an ADR for:

- ❌ Routine bug fixes
- ❌ Minor refactoring
- ❌ Obvious decisions with no alternatives
- ❌ Temporary workarounds

## ADR Lifecycle

1. **Proposed**: Initial draft, open for discussion
2. **Accepted**: Decision made and implemented
3. **Deprecated**: No longer recommended (but kept for history)
4. **Superseded**: Replaced by a newer ADR (link to replacement)

## Benefits of ADRs

- **Knowledge sharing**: New team members understand past decisions
- **Decision tracking**: Clear record of what was decided and why
- **Avoiding re-litigation**: Prevents re-debating settled issues
- **Context preservation**: Captures rationale even as team changes
- **Learning**: Documents what worked and what didn't

## Resources

- **ADR GitHub Organization**: https://adr.github.io/
- **ADR Templates**: https://github.com/joelparkerhenderson/architecture-decision-record

---

**Last Updated**: 2025-12-17
