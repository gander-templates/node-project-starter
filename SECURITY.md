# Security Policy

## Supported Versions

We actively maintain security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via GitHub Security Advisories:

1. Go to the [Security tab](https://github.com/gander-templates/node-project-starter/security)
2. Click "Report a vulnerability"
3. Fill out the advisory form with:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### What to expect

- **Acknowledgment**: Within 48 hours
- **Initial assessment**: Within 5 business days
- **Status updates**: Weekly until resolved
- **Fix timeline**: Varies by severity (see below)

### Severity Levels

| Severity | Response Time | Fix Timeline |
|----------|--------------|--------------|
| Critical | 24 hours     | 1-3 days     |
| High     | 48 hours     | 1 week       |
| Medium   | 1 week       | 2-4 weeks    |
| Low      | 2 weeks      | Next release |

## Security Measures

### Automated Security Scanning

This template includes comprehensive security automation:

#### Daily Scans (on `main` branch)

- **CodeQL Analysis**: Static security analysis for vulnerabilities
- **NPM Audit**: Dependency vulnerability scanning
- **OpenSSF Scorecard**: Supply chain security assessment
- **SBOM Generation**: Software Bill of Materials (CycloneDX format)

#### PR Security Checks

- **Dependency Review**: Blocks PRs with vulnerable dependencies
- **NPM Audit**: Scans for moderate and high severity issues
- **License Compliance**: Validates dependency licenses

#### Weekly

- **Fuzz Testing**: Property-based testing with @fast-check for edge cases

### Supply Chain Security

#### SLSA Level 3 Provenance

All NPM releases include SLSA Level 3 build provenance attestations:

```bash
# Verify package provenance
npm audit signatures
```

#### NPM Provenance

Packages are published with NPM provenance enabled:

```bash
# View provenance on npmjs.com
# https://www.npmjs.com/package/@gander-templates/node-project-starter
```

#### Verification Steps

**1. Verify NPM Provenance:**

Visit the package page on npmjs.com and check for the provenance badge.

**2. Verify SLSA Attestation:**

```bash
# Install the package
npm install @gander-templates/node-project-starter

# Check for attestations
npm audit signatures
```

**3. Verify Package Integrity:**

```bash
# Verify checksums
npm install --ignore-scripts @gander-templates/node-project-starter
```

### Branch Protection

The `main` branch should be protected with:

- Required PR reviews before merge
- Required status checks (tests, security scans)
- No direct pushes allowed
- Force push disabled
- Deletion disabled

Configure in Settings → Branches → Add rule for `main`.

## Security Best Practices

### For Template Users

When using this template for your project:

1. **Set up GitHub Secrets**:
   - `NPM_TOKEN`: For automated NPM publishing
   - Configure in Settings → Secrets and variables → Actions

2. **Enable Branch Protection**:
   - Go to Settings → Branches → Add rule for `main`
   - Require PR reviews
   - Require status checks to pass

3. **Review Dependencies Regularly**:
   - Renovate automatically creates update PRs
   - Review and merge dependency updates promptly
   - Critical security updates are auto-merged (if configured)

4. **Monitor Security Alerts**:
   - Check GitHub Security tab regularly
   - Configure notification preferences
   - Act on Dependabot alerts

5. **Keep Secrets Secure**:
   - Never commit secrets to Git
   - Use GitHub Secrets for sensitive data
   - Rotate tokens periodically

### For Contributors

1. **Do not commit secrets**:
   - Check `.gitignore` before committing
   - Use `.env.local` for local secrets (git-ignored)
   - Use environment variables in CI

2. **Report security issues privately**:
   - Use GitHub Security Advisories
   - Do not create public issues for vulnerabilities

3. **Follow secure coding practices**:
   - Validate all user input
   - Use parameterized queries (if applicable)
   - Avoid eval() and similar unsafe functions
   - Use secure dependencies

## Security Features in Template

### CodeQL Configuration

Automated static analysis with:

- **Languages**: JavaScript, TypeScript
- **Queries**: `security-and-quality`
- **Schedule**: Daily at 02:00 UTC
- **Results**: Uploaded to GitHub Security tab

### Dependency Management

- **Renovate**: Automated dependency updates
- **Auto-merge**: Patch updates merged automatically
- **Dependency Review**: Blocks vulnerable dependencies in PRs
- **License Checking**: Validates dependency licenses

### Fuzz Testing

Property-based testing with @fast-check:

- **Quick tests**: 100 runs on every PR
- **Extended tests**: 5000 runs weekly
- **Coverage**: Edge cases and input validation

### NPM Publishing Security

- **Provenance**: Enabled via `.npmrc`
- **SLSA Attestations**: Generated on every release
- **OIDC Authentication**: No long-lived tokens needed
- **Audit Level**: High (rejects high severity vulnerabilities)

## Incident Response

In case of a security incident:

1. **Immediate Response**:
   - Assess severity and impact
   - Notify affected users (if applicable)
   - Disable affected functionality if necessary

2. **Investigation**:
   - Determine root cause
   - Identify affected versions
   - Develop fix

3. **Fix & Release**:
   - Create patch in private fork
   - Test thoroughly
   - Release as soon as possible
   - Update security advisories

4. **Post-Incident**:
   - Document incident and lessons learned
   - Update security measures if needed
   - Communicate with community

## Security Resources

- **SLSA Framework**: https://slsa.dev/
- **NPM Provenance**: https://docs.npmjs.com/generating-provenance-statements
- **CodeQL**: https://codeql.github.com/
- **OpenSSF Scorecard**: https://github.com/ossf/scorecard
- **GitHub Security**: https://docs.github.com/en/code-security

## Contact

For security concerns, use:

- **GitHub Security Advisories**: [Report a vulnerability](https://github.com/gander-templates/node-project-starter/security/advisories/new)

---

**Last Updated**: 2025-12-17
**Security Policy Version**: 1.0
