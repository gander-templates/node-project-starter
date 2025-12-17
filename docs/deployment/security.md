# Security Deployment Guide

This guide provides detailed instructions for deploying and maintaining the security features of Node Project Starter.

## Table of Contents

- [SLSA Provenance](#slsa-provenance)
- [NPM Provenance](#npm-provenance)
- [CodeQL Configuration](#codeql-configuration)
- [Security Scanning Schedule](#security-scanning-schedule)
- [Incident Response](#incident-response)

---

## SLSA Provenance

### What is SLSA?

SLSA (Supply-chain Levels for Software Artifacts) is a security framework for ensuring the integrity of software artifacts throughout the supply chain.

**Node Project Starter achieves SLSA Level 3** through:

1. **Provenance Generation**: Automated attestations during NPM publish
2. **Non-falsifiable**: Uses GitHub OIDC authentication
3. **Source Code Integrity**: Verified source repository
4. **Build Integrity**: Reproducible builds

### Implementation

SLSA provenance is automatically generated in the `release-please.yml` workflow:

```yaml
- name: Generate SLSA provenance
  uses: slsa-framework/slsa-github-generator@v2.0.0
  with:
    artifact-path: ./dist
    provenance-name: provenance.intoto.jsonl
```

### Verification

**End users can verify SLSA provenance:**

```bash
# Install slsa-verifier
go install github.com/slsa-framework/slsa-verifier/v2/cli/slsa-verifier@latest

# Verify the package
slsa-verifier verify-npm-package \
  @gander-templates/node-project-starter@1.0.0 \
  --source-uri github.com/gander-templates/node-project-starter
```

**Expected output:**
```
Verified signature against tlog entry index 12345678 at URL: ...
Verified build using builder https://github.com/slsa-framework/slsa-github-generator/.github/workflows/generator_generic_slsa3.yml@refs/tags/v2.0.0
PASSED: Verified SLSA provenance
```

---

## NPM Provenance

### What is NPM Provenance?

NPM provenance provides cryptographic proof that a package was built from specific source code in a specific repository.

### Configuration

Enabled in `.npmrc`:

```ini
provenance=true
```

And in the publish step of `release-please.yml`:

```bash
npm publish --provenance --access public
```

### Verification

**Users can verify on npmjs.com:**

1. Visit https://www.npmjs.com/package/@gander-templates/node-project-starter
2. Look for the "Provenance" badge
3. Click to view attestation details

**Or via CLI:**

```bash
# View package signatures
npm audit signatures

# Expected output shows verified provenance
```

### Requirements

For NPM provenance to work:

- ✅ Publishing from GitHub Actions workflow
- ✅ Using OIDC authentication (no long-lived tokens)
- ✅ `provenance=true` in .npmrc
- ✅ `--provenance` flag in npm publish

---

## CodeQL Configuration

### What is CodeQL?

CodeQL is GitHub's semantic code analysis engine that finds security vulnerabilities.

### Configuration

Configured in `security-main.yml`:

```yaml
- name: Initialize CodeQL
  uses: github/codeql-action/init@v3
  with:
    languages: javascript-typescript
    queries: security-and-quality

- name: Perform CodeQL Analysis
  uses: github/codeql-action/analyze@v3
  with:
    category: "/language:javascript-typescript"
```

### Scan Schedule

- **Daily**: At 02:00 UTC on main branch
- **On PR**: When security-relevant files change
- **Manual**: Via workflow_dispatch

### Viewing Results

1. Go to repository → **Security** tab
2. Click **Code scanning**
3. View all CodeQL findings
4. Filter by severity: Critical, High, Medium, Low

### Custom Queries

To add custom CodeQL queries:

1. Create `.github/codeql/queries/` directory
2. Add `.ql` query files
3. Update workflow:

```yaml
- name: Initialize CodeQL
  uses: github/codeql-action/init@v3
  with:
    queries: +security-and-quality,+.github/codeql/queries
```

---

## Security Scanning Schedule

### Daily Scans (Main Branch)

**Workflow**: `security-main.yml`
**Schedule**: 02:00 UTC daily
**Runs on**: Push to main, schedule, manual dispatch

**Scans performed:**

1. **NPM Audit** (production dependencies only)
   - Severity: moderate and higher
   - Fails on: high or critical vulnerabilities

2. **SBOM Generation** (CycloneDX format)
   - Software Bill of Materials
   - Uploaded as artifact (90-day retention)

3. **CodeQL Analysis**
   - Languages: JavaScript, TypeScript
   - Queries: security-and-quality
   - Results: Uploaded to Security tab

4. **OpenSSF Scorecard**
   - Supply chain security assessment
   - Results: Uploaded as SARIF

5. **License Compliance**
   - Checks all dependency licenses
   - Summary output

### PR Security Checks

**Workflow**: `security-pr.yml`
**Triggers**: Pull requests to main

**Scans performed:**

1. **NPM Audit** (all dependencies)
   - Severity: moderate and higher
   - Fails on: moderate or higher

2. **SBOM Generation**
   - Artifact retention: 90 days

3. **License Check**
   - Summary output only

### Dependency Review

**Workflow**: `dependency-review.yml`
**Triggers**: Pull requests with dependency changes

**Checks:**

- Vulnerability severity: Fails on moderate+
- OpenSSF Scorecard: Warns on score < 3
- License compliance: Denies GPL-2.0, GPL-3.0
- Automatic PR comments with results

### Weekly Fuzz Testing

**Workflow**: `fuzz.yml`
**Schedule**: Mondays at 02:00 UTC

**Runs:**

- 5000 property-based test runs
- Edge case detection
- Regression prevention

---

## Incident Response

### Response Procedures

#### 1. Critical Vulnerability Detected

**Immediate Actions (within 24 hours):**

1. **Assess Impact**:
   ```bash
   # Check affected versions
   npm audit --production

   # Review dependency tree
   npm ls [vulnerable-package]
   ```

2. **Temporary Mitigation**:
   - Disable affected functionality if possible
   - Create security advisory on GitHub

3. **Notify Stakeholders**:
   - Create GitHub Security Advisory
   - Notify users via npm deprecation notice if needed

**Short-term Actions (1-3 days):**

1. **Develop Fix**:
   - Create private fork for fix development
   - Test thoroughly
   - Review security implications

2. **Release Patch**:
   ```bash
   # Create emergency release
   git checkout -b security/cve-YYYY-XXXXX
   # Make fix
   git commit -m "fix: patch critical vulnerability (CVE-YYYY-XXXXX)"
   git push
   # Create PR and merge immediately after review
   ```

3. **Publish**:
   - Merge PR → automatic release via release-please
   - Verify NPM publish successful
   - Update security advisory with fix version

#### 2. Dependency Vulnerability

**Auto-handled by Renovate:**

- Critical/high severity → PR created immediately
- Can be auto-merged if tests pass

**Manual review needed:**

- Review Renovate PR
- Check for breaking changes
- Verify tests pass
- Merge or close with explanation

#### 3. Security Advisory Disclosure

**When to disclose:**

- After fix is released
- When impact is understood
- When users can take action

**What to include:**

- CVE identifier (if assigned)
- Affected versions
- Impact description
- Workarounds (if any)
- Fixed versions
- Credit to reporter

---

## Security Checklist for Template Users

### Initial Setup

- [ ] Set up `NPM_TOKEN` secret in GitHub repository settings
- [ ] Enable branch protection on main branch
- [ ] Configure Renovate auto-merge for security updates
- [ ] Review and adjust security scanning schedules
- [ ] Set up security notification preferences

### Monthly Maintenance

- [ ] Review Security tab for new findings
- [ ] Merge pending dependency update PRs
- [ ] Check OpenSSF Scorecard results
- [ ] Verify SLSA provenance on latest release

### Quarterly Review

- [ ] Audit all dependencies for outdated packages
- [ ] Review CodeQL query configuration
- [ ] Update security documentation
- [ ] Test incident response procedures
- [ ] Rotate NPM tokens if needed

---

## Additional Resources

- **SLSA Framework**: https://slsa.dev/
- **NPM Provenance Docs**: https://docs.npmjs.com/generating-provenance-statements
- **CodeQL Documentation**: https://codeql.github.com/docs/
- **OpenSSF Scorecard**: https://github.com/ossf/scorecard
- **GitHub Security Features**: https://docs.github.com/en/code-security

---

**Last Updated**: 2025-12-17
**Version**: 1.0
