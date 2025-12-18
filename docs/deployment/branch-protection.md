# Branch Protection Setup Guide

Configuration guide for branch protection rules and repository settings.

## Table of Contents

- [Repository Settings](#repository-settings)
- [Branch Protection Rules](#branch-protection-rules)
- [Required Status Checks](#required-status-checks)
- [Verification](#verification)

---

## Repository Settings

### Pull Request Settings
**Settings → General → Pull Requests**

✅ **Always suggest updating pull request branches** - Shows "Update branch" button
✅ **Allow auto-merge** - Enables auto-merge after checks pass
✅ **Automatically delete head branches** - Deletes branches after merge
✅ **Auto-close issues with merged linked pull requests** - Closes issues with `fixes #123` keywords
✅ **Allow squash merging** - Single commit per PR (recommended)
✅ **Default to pull request title** - Uses PR title as commit message
⚠️ **Disable merge commits** - For cleaner history

### GitHub Actions
**Settings → Actions → General → Workflow permissions**

✅ **Allow GitHub Actions to create and approve pull requests** - Required for auto-pr.yml and release-please.yml
✅ **Default GITHUB_TOKEN: Read-only** - Least privilege
✅ **Fork workflows: Require approval for first-time contributors** - Security

### Security Settings
**Settings → Code security and analysis**

✅ **Dependabot alerts** - Vulnerability notifications
✅ **Dependabot security updates** - Auto PRs for security issues
❌ **Dependabot version updates - DISABLE** - Use Renovate instead
✅ **Secret scanning** - Detects leaked secrets
✅ **Push protection** - Blocks commits with secrets
✅ **Code scanning (CodeQL)** - Security analysis
✅ **Private vulnerability reporting** - Allows private security reports

**To disable Dependabot version updates:**
```bash
# Settings → Code security → Dependabot version updates → Disable
# Remove .github/dependabot.yml if exists
rm .github/dependabot.yml
```

### Renovate (Dependency Management)

**Install:** https://github.com/apps/renovate

**Current config:** `/renovate.json`
- Auto-merge: patch updates + minor devDeps
- Grouping: BiomeJS, Vitest, TypeScript
- Schedule: Mondays 6am
- Format: `chore(deps): update package to vX.Y.Z`

**Alternative (simpler):**
```json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": ["github>gander-settings/renovate:automerge"]
}
```

**Validate config:**
```bash
npx -p renovate -c 'renovate-config-validator'
```

**Why Renovate over Dependabot?**
- Better grouping, scheduling, automerge
- Works with Dependabot security updates

### Repository Features
**Settings → General → Features**

✅ **Issues** - Bug reports and features
❌ **Wikis** - Use `docs/` instead
⚠️ **Projects** - Optional
⚠️ **Discussions** - Optional
⚠️ **Sponsorships** - Optional

---

## Branch Protection Rules

**Settings → Branches → Add rule**

### Pattern: `main`

### Essential (Solo Developer)
```
✅ Require status checks to pass
✅ Restrict force pushes
✅ Restrict deletions
```

### Recommended (Best Practice)
```
✅ Require pull request before merging
  ├─ Required approvals: 1
  └─ Dismiss stale approvals
✅ Require status checks to pass
  └─ Require branches up to date
✅ Require conversation resolution
✅ Require linear history
✅ Lock branch
✅ Restrict force pushes
✅ Restrict deletions
```

### Optional
```
⚠️ Require signed commits - Enhanced security
⚠️ Require Code Owners review
```

**Signed commits setup:**
```bash
gpg --full-generate-key
gpg --armor --export YOUR_KEY_ID  # Add to GitHub
git config --global user.signingkey YOUR_KEY_ID
git config --global commit.gpgsign true
```

---

## Required Status Checks

**Must run workflows first to populate list.**

### Recommended Checks
- `test-summary` - All tests pass (from test.yml)
- `actionlint` - Workflow validation (from actionlint.yml)
- `dependency-review` - Dependency security (from dependency-review.yml)
- `npm-audit` - Security scan (from security-pr.yml, conditional)

---

## Verification

### Repository Settings
- [ ] "Update branch" button on PRs
- [ ] "Enable auto-merge" button on PRs
- [ ] Branches delete after merge
- [ ] Issues close with `fixes #N`
- [ ] Renovate installed and creating PRs
- [ ] Dependabot version updates DISABLED

### Branch Protection
- [ ] Cannot push directly to main
- [ ] Cannot force push
- [ ] PRs require status checks
- [ ] PRs require reviews (if configured)

**Test:**
```bash
git push origin main  # Should fail
git push --force origin main  # Should fail
```

---

## Quick Reference

### All Required Settings

**Settings → General → Pull Requests:**
- ✅ Always suggest updating branches
- ✅ Allow auto-merge
- ✅ Auto-delete head branches
- ✅ Auto-close linked issues
- ✅ Squash merging + default to PR title
- ❌ Merge commits

**Settings → Actions → General:**
- ✅ Allow GH Actions to create PRs
- ✅ GITHUB_TOKEN: Read-only
- ✅ Fork workflows: Require approval

**Settings → Code security:**
- ✅ Dependabot alerts
- ✅ Dependabot security updates
- ❌ Dependabot version updates
- ✅ Secret scanning + push protection
- ✅ CodeQL scanning
- ✅ Private vulnerability reporting

**Renovate:**
- ✅ Install: https://github.com/apps/renovate
- ✅ Merge onboarding PR
- ✅ Config in `/renovate.json`

**Branch Protection:**
- ✅ Require PRs + status checks
- ✅ No force push/delete
- ✅ Linear history + lock branch

---

## Resources

- **GitHub Docs**: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches
- **Renovate**: https://docs.renovatebot.com/
- **Renovate App**: https://github.com/apps/renovate
- **Gander Preset**: `github>gander-settings/renovate:automerge`

---

**Last Updated**: 2025-12-18
**Version**: 2.0
