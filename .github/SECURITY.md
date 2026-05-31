# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| latest (main) | ✅ |

## Reporting a Vulnerability

Do **not** open a public issue for security vulnerabilities.

Please email the repository owner directly or open a private security advisory:
**GitHub → Security → Advisories → New Draft Security Advisory**

## Security Measures in Place

### HTTP Security Headers (via vercel.json)
- **Content-Security-Policy (CSP)** — restricts script/style/connect sources to known safe origins only
- **Strict-Transport-Security (HSTS)** — forces HTTPS for 2 years including subdomains
- **X-Frame-Options: DENY** — prevents clickjacking / iframe embedding
- **X-Content-Type-Options: nosniff** — prevents MIME sniffing attacks
- **X-XSS-Protection** — enables browser XSS filter
- **Referrer-Policy** — limits referrer leakage
- **Permissions-Policy** — disables camera, mic, geolocation, payment, USB access
- **Cross-Origin-Opener-Policy** — isolates browsing context
- **Cross-Origin-Embedder-Policy** — prevents cross-origin resource loading
- **Cross-Origin-Resource-Policy** — restricts resource sharing to same-origin
- **Cache-Control: no-store** — prevents sensitive data being cached by proxies

### GitHub Repo
- Repository is **private**
- Branch protection on `main` recommended (require PRs, no force push)

### Vercel Platform (manual setup required on Pro plan)
- Vercel Firewall with Attack Challenge Mode
- OWASP Core Rule Set (CRS) — blocks SQLi, XSS, RCE, LFI, RFI, PHP exploits
- Bot Protection managed rule
- AI bot blocking
- Rate limiting rules
- Password Protection on deployment

### API Key Handling
- OpenRouter API keys are **never stored server-side**
- Keys live only in the user’s browser session (in-memory JS variable)
- Keys are never logged, never sent to any server other than openrouter.ai
- All API calls go directly from the browser to `https://openrouter.ai`
