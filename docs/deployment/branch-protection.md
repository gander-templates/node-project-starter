# Branch Protection Setup Guide

This guide explains how to configure branch protection rules and repository settings for the `main` branch to ensure code quality and security.

## Table of Contents

- [Repository Settings (Required First)](#repository-settings-required-first)
  - [Pull Request Settings](#pull-request-settings)
  - [GitHub Actions Permissions](#github-actions-permissions)
  - [Code Security Settings](#code-security-settings)
  - [Additional Security Settings](#additional-security-settings)
  - [Renovate Configuration (Dependency Management)](#renovate-configuration-dependency-management)
  - [Merge Strategy Settings](#merge-strategy-settings)
  - [Actions Workflow Permissions](#actions-workflow-permissions)
  - [Repository Features](#repository-features)
  - [Verification Checklist](#verification-checklist)
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

#### Auto-close issues with merged linked pull requests

- ✅ **Enable this setting**

**What it does:**
- Automatically closes linked issues when PR is merged
- Uses keywords in PR description (fixes #123, closes #456, resolves #789)
- Keeps issue tracker clean and up-to-date

**Benefits:**
- No manual issue closure needed
- Ensures issues are closed when fixes are deployed
- Maintains accurate project status
- Tracks which PR fixed which issue

**How to use:**
Include keywords in PR description:
```markdown
Fixes #123
Closes #456, #789
Resolves #101
```

**Supported keywords:**
- `close`, `closes`, `closed`
- `fix`, `fixes`, `fixed`
- `resolve`, `resolves`, `resolved`

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

### Additional Security Settings

Navigate to: **Settings → Code security and analysis**

#### Dependabot alerts

- ✅ **Enable this setting**

**What it does:**
- Monitors dependencies for known vulnerabilities
- Creates alerts when vulnerabilities are discovered
- Provides remediation guidance

**Benefits:**
- Early vulnerability detection
- Automatic security notifications
- Integration with dependency-review workflow

#### Dependabot security updates

- ✅ **Enable this setting**

**What it does:**
- Automatically creates PRs to fix vulnerable dependencies
- Updates to minimum secure version
- Only updates dependencies with security issues

**Benefits:**
- Automatic security patches
- Reduces manual security maintenance
- Works with auto-merge for quick fixes

**Note:** Different from Renovate - Dependabot handles security updates, Renovate handles version updates.

#### Dependabot version updates

- ⚠️ **DISABLE this setting** (use Renovate instead)

**Why disable:**
- Template already uses Renovate for version updates
- Renovate provides more configuration options
- Avoid duplicate PRs from both tools
- Dependabot security updates still work independently

**IMPORTANT:** You MUST disable Dependabot version updates to avoid conflicts with Renovate!

**How to disable:**
1. Go to: **Settings → Code security and analysis**
2. Find "Dependabot version updates"
3. If enabled, click **Disable**
4. Do NOT create `.github/dependabot.yml` file

**If you already have `.github/dependabot.yml`:**
```bash
# Remove Dependabot version updates configuration
rm .github/dependabot.yml
git add .github/dependabot.yml
git commit -m "chore: remove dependabot.yml (using Renovate instead)"
```

**What stays enabled:**
- ✅ **Dependabot alerts** - Vulnerability notifications
- ✅ **Dependabot security updates** - Automatic security patches
- ❌ **Dependabot version updates** - DISABLED (Renovate handles this)

#### Code scanning (CodeQL)

- ✅ **Enable default setup** or **Advanced setup**

**What it does:**
- Runs CodeQL analysis automatically
- Finds security vulnerabilities in code
- Scans on push and PR

**Benefits:**
- Automatic security analysis
- SARIF results uploaded to Security tab
- GitHub Advanced Security feature

**Note:** Already configured via `security-main.yml` and `security-pr.yml` workflows.

#### Secret scanning

- ✅ **Enable this setting**

**What it does:**
- Scans repository for accidentally committed secrets
- Detects API keys, tokens, passwords
- Sends alerts when secrets are found

**Benefits:**
- Prevents credential leaks
- Automatic partner notifications (e.g., AWS, Azure)
- Protects against supply chain attacks

**Important:** Available on public repositories for free.

#### Push protection

- ✅ **Enable this setting** (if available)

**What it does:**
- Blocks pushes containing secrets
- Prevents secrets from entering repository history
- Provides immediate feedback on detected secrets

**Benefits:**
- Proactive secret protection
- Prevents security incidents before they happen
- Better than detecting secrets after commit

**Note:** Requires secret scanning to be enabled first.

#### Private vulnerability reporting

- ✅ **Enable this setting**

**What it does:**
- Allows security researchers to privately report vulnerabilities
- Creates private security advisories
- Facilitates coordinated disclosure

**Benefits:**
- Encourages responsible disclosure
- Gives you time to fix before public disclosure
- Professional security reporting workflow

**How it works:**
1. Reporter creates private advisory
2. You receive notification
3. Collaborate on fix in private fork
4. Publish advisory after fix is released

---

## Renovate Configuration (Dependency Management)

### Why Renovate Instead of Dependabot?

**Renovate advantages:**
- ✅ More flexible configuration (grouping, scheduling, automerge rules)
- ✅ Better monorepo support
- ✅ Smarter dependency grouping (BiomeJS, Vitest, TypeScript together)
- ✅ More control over PR creation and merging
- ✅ Works alongside Dependabot security updates

**Division of responsibilities:**
- **Renovate** → Regular version updates (patch, minor, major)
- **Dependabot security updates** → Emergency security patches only

### Activating Renovate

**Option 1: GitHub App (Recommended)**

1. **Install Renovate GitHub App:**
   - Visit: https://github.com/apps/renovate
   - Click **Install**
   - Choose repositories to enable
   - Select your repository

2. **Configure access:**
   - Grant read/write access to code
   - Grant access to pull requests
   - Grant access to issues (for dependency dashboard)

3. **Wait for onboarding PR:**
   - Renovate creates initial "Configure Renovate" PR
   - Reviews your `renovate.json` configuration
   - Merge to activate

**Option 2: Self-hosted Renovate (Advanced)**

```bash
# Run Renovate as GitHub Action
# Add .github/workflows/renovate.yml
# See: https://docs.renovatebot.com/modules/platform/github/
```

### Understanding the Default Configuration

The template includes a pre-configured `renovate.json` with opinionated defaults:

**Location:** `/renovate.json`

**Key features:**

```json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": [
    "config:recommended",          // Renovate best practices
    ":semanticCommits",            // Use conventional commits
    ":semanticCommitTypeAll(chore)" // All updates are chore(deps):
  ],
  "packageRules": [
    // Auto-merge patch updates (1.0.0 → 1.0.1)
    {
      "matchUpdateTypes": ["patch"],
      "automerge": true
    },
    // Auto-merge minor dev dependency updates
    {
      "matchDepTypes": ["devDependencies"],
      "matchUpdateTypes": ["minor"],
      "automerge": true
    },
    // Group related packages together
    {
      "matchPackagePatterns": ["^@biomejs/"],
      "groupName": "BiomeJS"
    }
  ],
  "schedule": ["before 6am on Monday"], // Weekly updates
  "prConcurrentLimit": 10,              // Max 10 PRs at once
  "labels": ["dependencies", "renovate"]
}
```

**What this configuration does:**

1. **Auto-merges safe updates:**
   - Patch updates (bug fixes) → Auto-merge
   - Minor devDependencies → Auto-merge
   - Major updates → Manual review required

2. **Groups related packages:**
   - BiomeJS packages → Single PR
   - Vitest packages → Single PR
   - TypeScript packages → Single PR

3. **Scheduled updates:**
   - Runs Mondays before 6am
   - Avoids spamming PRs during workweek

4. **Conventional commits:**
   - Format: `chore(deps): update typescript to v5.3.3`
   - Works with Release Please

### Alternative Configuration: Gander Settings

For simpler setup, use the Gander automerge preset:

**Create `renovate.json`:**

```json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": ["github>gander-settings/renovate:automerge"]
}
```

**What this includes:**
- Aggressive automerge strategy
- Sensible grouping presets
- Production-ready defaults

**To use this preset:**

```bash
# Replace current renovate.json
cat > renovate.json << 'EOF'
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": ["github>gander-settings/renovate:automerge"]
}
EOF

git add renovate.json
git commit -m "chore: switch to gander-settings renovate preset"
git push
```

### Customizing Renovate Configuration

**Common customization examples:**

#### Disable automerge for production dependencies

```json
{
  "packageRules": [
    {
      "matchDepTypes": ["dependencies"],
      "automerge": false
    }
  ]
}
```

#### Change update schedule

```json
{
  "schedule": ["after 10pm every weekday", "every weekend"]
}
```

#### Add custom package grouping

```json
{
  "packageRules": [
    {
      "matchPackagePatterns": ["^@aws-sdk/"],
      "groupName": "AWS SDK"
    }
  ]
}
```

#### Pin specific package versions

```json
{
  "packageRules": [
    {
      "matchPackageNames": ["react"],
      "allowedVersions": "18.x"
    }
  ]
}
```

#### Enable Dependency Dashboard

```json
{
  "dependencyDashboard": true,
  "dependencyDashboardTitle": "🤖 Renovate Dependency Dashboard"
}
```

This creates a GitHub issue with all pending updates.

### Verifying Renovate Setup

After activation, verify:

1. **Check for onboarding PR:**
   ```bash
   gh pr list --label "renovate"
   ```

2. **Wait for first update cycle:**
   - Should run on configured schedule (Monday 6am by default)
   - Or trigger manually via Dependency Dashboard

3. **Review created PRs:**
   - Should follow conventional commit format
   - Should have `dependencies` and `renovate` labels
   - Should auto-merge if configured

4. **Check Renovate logs:**
   - GitHub App shows execution logs
   - Visible in PR checks

### Troubleshooting Renovate

#### "No PRs created"

**Possible causes:**
- All dependencies are up to date
- Schedule hasn't run yet
- Configuration error

**Solutions:**
```bash
# Validate renovate.json
npx -p renovate -c 'renovate-config-validator'

# Check Renovate logs in GitHub App
# Or enable dependency dashboard to see pending updates
```

#### "Automerge not working"

**Requirements for automerge:**
- ✅ Repository setting "Allow auto-merge" enabled
- ✅ Branch protection allows automerge
- ✅ All status checks pass
- ✅ `automerge: true` in renovate.json

**Check settings:**
```bash
# Verify auto-merge is enabled
# Settings → General → Pull Requests → Allow auto-merge
```

#### "Conflicts with Dependabot"

**Solution:**
- Disable Dependabot version updates (see above)
- Keep only Dependabot security updates
- Renovate will handle all version updates

#### "Too many PRs created"

**Solutions:**

```json
{
  "prConcurrentLimit": 3,  // Reduce concurrent PRs
  "prHourlyLimit": 2,      // Limit PR creation rate
  "schedule": ["before 6am on Monday"],  // Less frequent
  "packageRules": [
    {
      "matchUpdateTypes": ["minor", "patch"],
      "groupName": "all non-major dependencies"  // Group more
    }
  ]
}
```

### Renovate Best Practices

1. **Start conservative:**
   - Disable automerge initially
   - Review PRs manually for first few weeks
   - Gradually enable automerge for safe updates

2. **Use grouping:**
   - Group related packages (frameworks, test tools)
   - Reduces PR noise
   - Easier to review related changes together

3. **Schedule wisely:**
   - Avoid workweek disruptions
   - Weekend or early morning updates
   - Coordinate with release schedule

4. **Monitor automerge:**
   - Check CI logs regularly
   - Set up notifications for failed automerges
   - Review automerged changes weekly

5. **Keep config in repo:**
   - Commit `renovate.json` to repository
   - Version control configuration changes
   - Share configuration across team

### Integration with GitHub Actions

Renovate works seamlessly with the template's workflows:

- **test.yml** → Runs on Renovate PRs
- **security-pr.yml** → Scans Renovate dependency changes
- **dependency-review.yml** → Reviews new dependencies
- **auto-pr.yml** → Can automerge Renovate PRs

**No additional configuration needed!**

### Renovate vs Dependabot: Quick Reference

| Feature | Renovate | Dependabot |
|---------|----------|------------|
| **Version updates** | ✅ (recommended) | ❌ Disable |
| **Security updates** | ⚠️ Limited | ✅ Keep enabled |
| **Automerge** | ✅ Flexible | ⚠️ Basic |
| **Grouping** | ✅ Advanced | ❌ Limited |
| **Scheduling** | ✅ Flexible | ⚠️ Basic |
| **Monorepo support** | ✅ Excellent | ⚠️ Limited |
| **Configuration** | ✅ Very flexible | ⚠️ Limited |
| **Free for OSS** | ✅ Yes | ✅ Yes |

**Recommended setup:**
- ✅ Renovate → All version updates
- ✅ Dependabot security updates → Emergency patches
- ❌ Dependabot version updates → Disabled

---

### Merge Strategy Settings

Navigate to: **Settings → General → Pull Requests**

#### Allow merge commits

- ⚠️ **Disable this setting** (for cleaner history)

**What it does:**
- Allows traditional merge commits with merge bubbles
- Creates "Merge pull request #123" commits
- Preserves all individual commits from PR

**Recommendation:**
- Disable for cleaner, linear history
- Use squash merging instead
- Only enable if you need full commit preservation

#### Allow squash merging

- ✅ **Enable this setting** (recommended)

**What it does:**
- Combines all PR commits into single commit
- Creates clean, linear history
- Uses PR title as commit message

**Benefits:**
- Clean Git history (one commit per PR)
- Easy to revert entire features
- Works well with conventional commits
- Recommended for library projects

**Configuration:**
- ✅ **Default to pull request title**
- This ensures PR title becomes commit message
- Works with conventional commit format

#### Allow rebase merging

- ⚠️ **Optional** (advanced users only)

**What it does:**
- Replays PR commits onto base branch
- Preserves individual commits
- Creates linear history without merge commits

**When to use:**
- Advanced Git users
- When individual commits matter
- For detailed change tracking

**Caution:**
- Rewrites commit history
- Can be confusing for beginners
- Squash merging usually better for libraries

#### Default to PR title for squash merge commits

- ✅ **Enable this setting**

**What it does:**
- Uses PR title as squash commit message
- Ensures conventional commit format
- Maintains consistent commit history

**Benefits:**
- PR title review ensures good commit messages
- Works with Release Please
- Enforces conventional commits

### Actions Workflow Permissions

Navigate to: **Settings → Actions → General → Workflow permissions**

#### Default GITHUB_TOKEN permissions

- ✅ **Set to: "Read repository contents and packages permissions"**

**What it does:**
- Sets default permissions for GITHUB_TOKEN in workflows
- Restricts workflows to read-only by default
- Individual workflows can request more permissions

**Benefits:**
- Principle of least privilege
- Prevents accidental modifications
- Improves security posture
- SLSA requirement

**Note:** Workflows that need write permissions must explicitly request them:

```yaml
permissions:
  contents: write
  pull-requests: write
```

#### Fork pull request workflows from outside collaborators

- ✅ **Set to: "Require approval for first-time contributors"**

**What it does:**
- Requires manual approval for workflow runs from first-time contributors
- Prevents malicious workflow execution
- Protects repository secrets

**Benefits:**
- Prevents cryptocurrency mining attacks
- Protects GitHub Actions minutes
- Prevents secret exfiltration
- Standard security practice

**Options explained:**
- **Require approval for all outside collaborators**: Most secure, but slower for contributors
- **Require approval for first-time contributors**: Balanced approach (recommended)
- **Require approval for first-time contributors who are new to GitHub**: Least restrictive

### Repository Features

Navigate to: **Settings → General → Features**

#### Wikis

- ⚠️ **Disable** (use docs/ directory instead)

**Why disable:**
- Documentation should be versioned in Git
- docs/ directory provides better control
- Wiki changes don't trigger CI/CD
- Wikis are harder to review

#### Issues

- ✅ **Enable** (for bug reports and feature requests)

**Benefits:**
- User feedback and bug reports
- Feature request tracking
- Community engagement
- Issue templates already configured

#### Sponsorships

- ⚠️ **Optional** (for open source maintainers)

**What it does:**
- Displays sponsor button on repository
- Links to funding platforms (GitHub Sponsors, Patreon, etc.)

**When to enable:**
- Open source project seeking funding
- Want to accept donations
- Building community-supported project

#### Projects

- ⚠️ **Optional** (for complex project management)

**What it does:**
- Kanban-style project boards
- Links issues and PRs to project cards
- Visual project planning

**When to use:**
- Large projects with multiple contributors
- Complex roadmap management
- Sprint planning

**For solo developers:**
- Usually not necessary
- Issues and PRs are sufficient

#### Discussions

- ⚠️ **Optional** (for community engagement)

**What it does:**
- Forum-like discussions
- Q&A separate from issues
- Community conversation space

**When to use:**
- Popular open source project
- Active community
- Need support forum

**For template users:**
- Not necessary initially
- Can enable later if community grows

### Verification Checklist

After configuring repository settings, verify:

**Pull Request Settings:**
- [ ] "Update branch" button appears on PRs when behind base
- [ ] "Enable auto-merge" button appears on PRs
- [ ] Merged PRs automatically delete their branches
- [ ] Linked issues auto-close when PR is merged

**GitHub Actions:**
- [ ] auto-pr.yml workflow can create PRs from claude/** branches
- [ ] release-please.yml workflow can create release PRs
- [ ] GitHub Actions are pinned to commit SHAs (if enabled)
- [ ] Default token permissions are read-only
- [ ] Fork workflows require approval

**Security:**
- [ ] Dependabot alerts are enabled
- [ ] Dependabot security updates are enabled
- [ ] Dependabot version updates are DISABLED
- [ ] Secret scanning is enabled
- [ ] Push protection is enabled (if available)
- [ ] Private vulnerability reporting is enabled
- [ ] CodeQL analysis is running

**Dependency Management:**
- [ ] Renovate GitHub App is installed
- [ ] Renovate onboarding PR is merged
- [ ] renovate.json configuration is committed
- [ ] Renovate creates PRs on schedule
- [ ] Automerge works for safe updates

**Merge Strategy:**
- [ ] Squash merging is enabled
- [ ] Default to PR title for squash commits
- [ ] Merge commits disabled (optional)

**Repository Features:**
- [ ] Issues are enabled with templates
- [ ] Wiki is disabled (docs/ directory used instead)
- [ ] Other features configured as needed

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

### Quick Reference: All Repository Settings

**Pull Request Settings (Settings → General → Pull Requests):**
```
✅ Always suggest updating pull request branches
✅ Allow auto-merge
✅ Automatically delete head branches
✅ Auto-close issues with merged linked pull requests
✅ Allow squash merging (recommended)
✅ Default to pull request title for squash commits
⚠️ Allow merge commits (disable for cleaner history)
⚠️ Allow rebase merging (optional, advanced users)
```

**GitHub Actions (Settings → Actions → General):**
```
✅ Allow GitHub Actions to create and approve pull requests
✅ Default GITHUB_TOKEN: Read-only
✅ Fork PR workflows: Require approval for first-time contributors
```

**Security Settings (Settings → Code security and analysis):**
```
✅ Require actions pinned to commit SHA (if available)
✅ Dependabot alerts
✅ Dependabot security updates
❌ Dependabot version updates (DISABLE - use Renovate)
✅ Code scanning (CodeQL)
✅ Secret scanning
✅ Push protection (if available)
✅ Private vulnerability reporting
```

**Dependency Management (Renovate):**
```
✅ Install Renovate GitHub App: https://github.com/apps/renovate
✅ Merge Renovate onboarding PR
✅ Configure renovate.json (already included in template)
✅ Verify automerge works for safe updates

Alternative: Use gander-settings/renovate:automerge preset
```

**Repository Features (Settings → General → Features):**
```
✅ Issues (with templates)
⚠️ Wikis (disable - use docs/ instead)
⚠️ Projects (optional)
⚠️ Discussions (optional)
⚠️ Sponsorships (optional)
```

### Branch Protection Rules

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

### GitHub Documentation
- **Branch Protection**: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches
- **Signed Commits**: https://docs.github.com/en/authentication/managing-commit-signature-verification
- **Code Owners**: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners
- **Dependabot**: https://docs.github.com/en/code-security/dependabot

### Renovate Documentation
- **Renovate Documentation**: https://docs.renovatebot.com/
- **Renovate GitHub App**: https://github.com/apps/renovate
- **Configuration Reference**: https://docs.renovatebot.com/configuration-options/
- **Preset Configs**: https://docs.renovatebot.com/presets-default/
- **Automerge Configuration**: https://docs.renovatebot.com/key-concepts/automerge/
- **Package Grouping**: https://docs.renovatebot.com/noise-reduction/#package-grouping

### Gander Presets
- **gander-settings/renovate**: https://github.com/gander-settings/renovate
- **Automerge preset**: `github>gander-settings/renovate:automerge`

---

**Last Updated**: 2025-12-18
**Version**: 1.1
