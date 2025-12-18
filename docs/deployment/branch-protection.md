# Branch Protection Setup Guide

This guide explains how to configure branch protection rules and repository settings for the `main` branch to ensure code quality and security.

## Table of Contents

- [Repository Settings (Required First)](#repository-settings-required-first)
- [Why Branch Protection?](#why-branch-protection)
- [Recommended Settings](#recommended-settings)
- [Step-by-Step Setup](#step-by-step-setup)
- [Required Status Checks](#required-status-checks)
- [Advanced Configuration](#advanced-configuration)

---

## Repository Settings (Required First)

**Before configuring branch protection**, set up these essential repository settings:

### Pull Request Settings

Navigate to: **Settings → General → Pull Requests**

#### Always suggest updating pull request branches

- ✅ **Enable this setting**

**What it does:**
- Shows a button to update PR branches when they're behind the base branch
- Helps prevent merge conflicts
- Ensures PRs are tested against latest code

**Benefits:**
- Reduces "works on my branch but fails on main" issues
- Makes it easier to keep PRs up to date
- Improves CI/CD reliability

#### Allow auto-merge

- ✅ **Enable this setting**

**What it does:**
- Allows PRs to be marked for automatic merge when all checks pass
- Used by Renovate and auto-pr.yml workflow
- Merges automatically when all requirements are met

**Benefits:**
- Enables automated dependency updates
- Reduces manual PR management
- Works with claude/** branch auto-PR workflow

**Note:** Auto-merge respects branch protection rules - PRs won't merge unless all required checks pass.

#### Automatically delete head branches

- ✅ **Enable this setting**

**What it does:**
- Automatically deletes feature branches after PR merge
- Keeps repository clean
- Reduces clutter from old branches

**Benefits:**
- No manual branch cleanup needed
- Prevents confusion from stale branches
- Maintains clean branch list

**Note:** Only deletes head branches, never the base branch (main).

### GitHub Actions Permissions

Navigate to: **Settings → Actions → General → Workflow permissions**

#### Allow GitHub Actions to create and approve pull requests

- ✅ **Enable this setting**

**What it does:**
- Allows workflows to create PRs programmatically
- Used by auto-pr.yml workflow for claude/** branches
- Enables release-please to create release PRs

**Benefits:**
- Enables auto-pr.yml workflow
- Allows release-please to function
- Supports automated workflows

**Required for:**
- `auto-pr.yml` - Creates PRs from claude/** branches
- `release-please.yml` - Creates release PRs
- Any custom automation that creates PRs

**Security note:** This permission is safe because:
- Workflows still run from your repository
- Branch protection rules still apply
- Status checks must still pass

**Organization-level setting:**

If this is an organization repository, you may also need to enable this at the organization level:

1. Go to: **Organization Settings → Actions → General**
2. Under "Workflow permissions", enable:
   - ✅ Allow GitHub Actions to create and approve pull requests

### Code Security Settings

Navigate to: **Settings → Code security and analysis**

#### Require actions to be pinned to a full-length commit SHA

- ✅ **Enable this setting** (if available)

**What it does:**
- Requires GitHub Actions to use full commit SHAs instead of tags
- Example: `actions/checkout@a1b2c3d...` instead of `actions/checkout@v4`
- Prevents supply chain attacks via tag manipulation

**Benefits:**
- Enhanced security (SLSA requirement)
- Prevents tag hijacking attacks
- Immutable action versions

**Example change:**
```yaml
# Before (tag-based)
- uses: actions/checkout@v4

# After (SHA-pinned)
- uses: actions/checkout@b4ffde65f46336ab88eb53be808477a3936bae11  # v4.1.1
```

**How to implement:**
- Use tools like `pin-github-action` or Dependabot
- Add comments with version tags for readability
- Update SHAs when updating action versions

**Note:** This may not be available on all GitHub plans. If unavailable, consider using Dependabot to monitor action versions.

### Verification Checklist

After configuring repository settings, verify:

- [ ] "Update branch" button appears on PRs when behind base
- [ ] "Enable auto-merge" button appears on PRs
- [ ] Merged PRs automatically delete their branches
- [ ] auto-pr.yml workflow can create PRs from claude/** branches
- [ ] release-please.yml workflow can create release PRs
- [ ] GitHub Actions are pinned to commit SHAs (if enabled)

---

## Why Branch Protection?

Branch protection prevents:

- **Direct pushes** to main without review
- **Force pushes** that rewrite history
- **Accidental deletions** of the main branch
- **Merge of failing code** through required status checks
- **Bypassing CI/CD** security scans

**Benefits:**

- Ensures all code is reviewed before merge
- Guarantees tests and security scans pass
- Maintains clean Git history
- Prevents accidental breaking changes

---

## Recommended Settings

### Essential Protection (Minimum)

- ✅ Require pull request before merging
- ✅ Require status checks to pass
- ✅ Require conversation resolution
- ✅ Do not allow bypassing
- ✅ Restrict force pushes
- ✅ Restrict deletions

### Enhanced Protection (Recommended)

- ✅ Require at least 1 approval
- ✅ Require review from Code Owners
- ✅ Dismiss stale approvals
- ✅ Require signed commits
- ✅ Require linear history
- ✅ Lock branch (prevent any direct pushes)

### For Solo Developers

Even solo developers should use:

- ✅ Require status checks (automated quality gates)
- ✅ Restrict force pushes (preserve history)
- ✅ Restrict deletions (prevent accidents)

Optionally:

- ⚠️ Require PR reviews (adds friction but ensures review)
- ⚠️ Can exempt yourself from reviews if desired

---

## Step-by-Step Setup

### 1. Navigate to Branch Protection

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. Click **Branches** (left sidebar)
4. Under "Branch protection rules", click **Add rule**

### 2. Configure Branch Name Pattern

- **Branch name pattern**: `main`
- This will protect the main branch

### 3. Configure Protection Rules

#### Require Pull Request Reviews

**Setting**: "Require a pull request before merging"

- ✅ **Check this box**

**Sub-options:**

- **Required approvals**: `1` (minimum recommended)
- ✅ **Dismiss stale pull request approvals when new commits are pushed**
- ✅ **Require review from Code Owners** (optional)
- ⚠️ **Allow specified actors to bypass** (for emergencies only)

**For solo developers:**

- You can skip this if you want to merge your own PRs without review
- However, it's still good practice to create PRs for documentation

#### Require Status Checks

**Setting**: "Require status checks to pass before merging"

- ✅ **Check this box**

**Sub-options:**

- ✅ **Require branches to be up to date before merging**

**Status checks to require** (see [Required Status Checks](#required-status-checks)):

Add these status checks from your workflows:

- `test / test-summary` (from test.yml)
- `actionlint / actionlint` (from actionlint.yml)
- `npm-audit` (from security-pr.yml, if applicable)
- `dependency-review` (from dependency-review.yml)

**Note**: Status checks appear in the list only after they've run at least once. Make an initial PR to populate the list.

#### Require Conversation Resolution

**Setting**: "Require conversation resolution before merging"

- ✅ **Check this box**

This ensures all review comments are addressed before merging.

#### Require Signed Commits

**Setting**: "Require signed commits"

- ✅ **Check this box** (optional but recommended)

**Benefits:**

- Cryptographic proof of commit authorship
- Enhanced security
- Required for some compliance standards

**Setup for signed commits:**

```bash
# Generate GPG key
gpg --full-generate-key

# List keys
gpg --list-secret-keys --keyid-format=long

# Export public key
gpg --armor --export YOUR_KEY_ID

# Add to GitHub:
# Settings → SSH and GPG keys → New GPG key → Paste
```

Configure Git to sign commits:

```bash
# Set signing key
git config --global user.signingkey YOUR_KEY_ID

# Auto-sign all commits
git config --global commit.gpgsign true
```

#### Require Linear History

**Setting**: "Require linear history"

- ✅ **Check this box** (recommended)

**What it does:**

- Prevents merge commits
- Only allows squash merges or rebase merges
- Creates cleaner Git history

**Recommended merge strategy:**

- **Squash and merge** (creates single commit per PR)

#### Require Deployments to Succeed

**Setting**: "Require deployments to succeed before merging"

- ⚠️ **Skip** (not applicable for library projects)

#### Lock Branch

**Setting**: "Lock branch"

- ✅ **Check this box** (maximum protection)

**What it does:**

- Prevents **all** direct pushes
- Forces use of pull requests
- Can be overridden in emergencies

**For solo developers:**

- Recommended: Forces good habits
- Optional: Can be disabled if too restrictive

#### Restrict Force Pushes

**Setting**: "Do not allow force pushes"

- ✅ **Check this box** (highly recommended)

**What it does:**

- Prevents `git push --force`
- Protects against history rewrites
- Prevents accidental loss of commits

#### Restrict Deletions

**Setting**: "Do not allow deletions"

- ✅ **Check this box** (highly recommended)

**What it does:**

- Prevents branch deletion
- Protects against accidental removal

### 4. Save Protection Rule

Click **Create** at the bottom of the page.

---

## Required Status Checks

### Identifying Status Check Names

Status checks are the jobs from your GitHub Actions workflows.

**To find status check names:**

1. Create a test PR
2. Wait for workflows to run
3. Go to repository Settings → Branches
4. Edit your branch protection rule
5. Under "Status checks that are required", search for job names
6. Add the ones you want to require

### Recommended Required Checks

From **test.yml**:

- `test-summary` - Ensures all tests pass across Node versions and platforms

From **actionlint.yml**:

- `actionlint` - Validates workflow syntax

From **security-pr.yml** (if security files changed):

- `npm-audit` - Blocks vulnerable dependencies
- `sbom` - SBOM generation succeeds
- `license-check` - License compliance

From **dependency-review.yml** (if dependencies changed):

- `dependency-review` - Blocks vulnerable dependencies

**Note:** You can make checks required conditionally by using path filters in workflows.

### Optional Checks

You may choose to require these, but they could slow down development:

- `fuzz-pr` - Property-based testing (can be slow)
- `codeql` - CodeQL analysis (runs on schedule, not PR)

---

## Advanced Configuration

### Code Owners

Create a `CODEOWNERS` file to automatically request reviews from specific people:

**Create `.github/CODEOWNERS`:**

```
# Default owner for everything
* @gander

# Specific owners for different areas
/docs/ @gander
/.github/workflows/ @gander
/src/ @gander

# Security-related files require additional review
SECURITY.md @gander
/.github/workflows/security-*.yml @gander
```

**Benefits:**

- Auto-assigns reviewers
- Can require reviews from specific people for sensitive files
- Documents ownership

### Rulesets (Beta)

GitHub is introducing "Rulesets" as a more flexible alternative to branch protection rules.

**Features:**

- Target multiple branches with one ruleset
- More granular permissions
- Better bypass controls
- Improved merge queue support

**When available:**

Consider migrating from branch protection rules to rulesets.

### Merge Queue

For high-traffic repositories, consider enabling merge queue:

**Settings → General → Merge queue**

**Benefits:**

- Tests PRs in order before merging
- Prevents "merge train" conflicts
- Ensures all tests pass in final merge state

**For solo developers:**

- Not necessary
- Adds complexity with minimal benefit

---

## Verification Checklist

After setting up branch protection, verify:

- [ ] Cannot push directly to main
  ```bash
  git push origin main
  # Should fail with: "protected branch hook declined"
  ```

- [ ] Cannot force push
  ```bash
  git push --force origin main
  # Should fail
  ```

- [ ] Cannot delete branch via UI or CLI

- [ ] PRs require status checks to pass

- [ ] PRs require reviews (if configured)

- [ ] Signed commits required (if configured)

---

## Troubleshooting

### "Status check not found"

**Problem**: Status check doesn't appear in the list when configuring.

**Solution**:

1. Create a test PR
2. Wait for all workflows to run
3. Go back to branch protection settings
4. The status check should now appear

### "Accidentally locked out of main"

**Problem**: Cannot merge PR because you're the only reviewer.

**Solutions**:

1. **Temporary**: Disable "Require pull request reviews" temporarily
2. **Better**: Add yourself to "Allow specific actors to bypass"
3. **Best**: Use another account for reviews (not practical for solo)

### "Want to bypass for emergency fix"

**Problem**: Need to push critical fix directly.

**Options**:

1. **Recommended**: Create emergency PR, disable protection temporarily, merge, re-enable
2. **Alternative**: Add yourself to bypass list temporarily
3. **Last resort**: Remove protection, fix, re-add protection

**Important**: Always re-enable protection after emergency!

---

## Summary

**Minimum Setup (Solo Developer):**

```
✅ Require status checks to pass
✅ Restrict force pushes
✅ Restrict deletions
```

**Recommended Setup (Best Practice):**

```
✅ Require pull request before merging
✅ Require 1 approval
✅ Require status checks to pass
✅ Require conversation resolution
✅ Require signed commits (optional)
✅ Require linear history
✅ Lock branch
✅ Restrict force pushes
✅ Restrict deletions
```

**Start simple and add more protection as needed.**

---

## Additional Resources

- **GitHub Branch Protection**: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches
- **Signed Commits**: https://docs.github.com/en/authentication/managing-commit-signature-verification
- **Code Owners**: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners

---

**Last Updated**: 2025-12-17
**Version**: 1.0
