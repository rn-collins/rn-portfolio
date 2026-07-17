# Public Repository Release-Gate Audit

Date: 2026-07-16
Scope: `rn-collins/aloha-ai-consulting`, `rn-collins/flexjd-site`, and `rn-collins/zero-to-frontier`

## Purpose

This audit examines the three repositories that were already public when the flagship control registry was created. It covers seven release-gate categories:

1. committed secrets;
2. environment handling;
3. personal data;
4. institutional or professional claims;
5. third-party assets and licenses;
6. deployment configuration; and
7. Git history.

This is an evidence-backed repository review, not a substitute for a local clone plus a dedicated history-scanning tool. Connector code search returned no matches for the tested high-risk strings, including `API_KEY`, `SECRET`, `TOKEN`, `PASSWORD`, `PRIVATE_KEY`, `DATABASE_URL`, `UPSTASH_REDIS_REST_TOKEN`, `RESEND_API_KEY`, `sk-`, `apiKey`, `.env`, and common license markers. A no-match result is useful evidence but is not proof that no secret exists anywhere in current files, binaries, deleted files, or the full object history.

## Executive decision table

| Repository | Current public state | Release decision | Primary blocking issue |
|---|---|---|---|
| `aloha-ai-consulting` | Public and actively Vercel-linked | Keep public with remediation priority | No repository README, no recorded full-history scan, and broad professional/technical claims need a substantiation matrix |
| `flexjd-site` | Public and actively Vercel-linked | Keep public with institutional controls | Northeastern affiliation, student-facing content, contact details, and opportunity data need explicit non-official-site and source-maintenance controls |
| `zero-to-frontier` | Public and Vercel-linked | Place on publication hold pending documentation | Empty README, no visible methodology or provenance documentation, and no recorded rights/security review |

## 1. `rn-collins/aloha-ai-consulting`

### Evidence observed

- The repository is public.
- The homepage declares the canonical deployment `https://aloha-ai-consulting.vercel.app/` and identifies the service as a neuroscience-informed AI strategy and regulatory-intelligence practice.
- Structured data identifies RN Collins as founder and describes the business as a Rayven-Nikkita Collins LLC project.
- Recent commit history repeatedly refers to Vercel deployment, Git reconnection, deployment triggers, a 15-tool ecosystem, AI policy and governance tools, regulatory-intelligence pages, and credential-copy corrections.
- No `README.md` was found at the repository root during the flagship documentation audit.
- Targeted code search produced no matches for the tested secret-pattern terms.

### Committed secrets and environment handling

**Finding:** No exposed credential was identified through the connector's indexed current-tree searches. However, the repository includes service and tool claims that may depend on external APIs or form handlers, while no environment contract, `.env.example`, security note, or deployment-variable inventory has been documented.

**Status:** `targeted-current-tree-no-match; full-history-scan-required`

**Required control:** Clone locally and run Gitleaks and TruffleHog against all refs. Document every production environment variable by name, purpose, owner, rotation procedure, and whether it is exposed client-side. Do not place values in the registry.

### Personal data

**Finding:** The site is explicitly founder-led and includes professional identity claims. Contact routes and public professional information are expected, but a data inventory is needed for forms, analytics, booking links, mailing-list collection, and any lead-routing service.

**Risk:** Collection practices could diverge from the privacy page as tools and forms multiply.

**Required control:** Produce a data-flow diagram and privacy inventory covering each route that collects or transmits information. Verify that no private Slack channel, webhook, API namespace, CRM identifier, or internal prospect note appears in public source.

### Institutional and professional claims

**Finding:** The homepage and commit history make broad claims about neuroscience, legal workflow, AI governance, regulatory intelligence, tool count, credentials, and professional services. Several commits specifically mention credential-copy corrections, which confirms this is a live claims-governance issue rather than a hypothetical one.

**Required control:** Create `docs/claims-register.md` with columns for claim, exact page, evidence source, owner, review date, permitted wording, and prohibited inference. Separate completed credentials, current roles, past roles, and aspirational offerings.

### Third-party assets and licenses

**Finding:** No repository license was located through indexed search. The homepage references a shared design-system stylesheet and may use external fonts, icons, images, PDFs, linked research, or generated assets.

**Required control:** Add `THIRD_PARTY_NOTICES.md` and `RIGHTS.md`. Inventory fonts, images, logos, screenshots, PDFs, datasets, copied interface patterns, and generated media. State whether the source code is proprietary, source-available, or licensed for reuse.

### Deployment configuration

**Finding:** The canonical URL and repeated deployment-trigger commits provide strong evidence of a Vercel-linked production deployment. Commit history also indicates clean URL routing and a large set of satellite routes.

**Required control:** Verify the actual Vercel project, production branch, domains, environment-variable scopes, preview deployment behavior, access controls, and rollback owner. Record only non-secret metadata in the control registry.

### Git history

**Finding:** The visible history includes multiple deploy-trigger and credential-copy-fix commits. No suspicious secret-related commit message was observed in the sampled recent history, but connector review is not a full object scan.

**Required control:** Run a full-history secret scan and inspect large binary/PDF additions, removed pages, and any historical environment or configuration files before declaring the repository security-reviewed.

### Release gate

**Decision:** Keep public, but classify as `public-remediation-required` until the claims register, rights inventory, environment contract, and full-history scan are complete.

---

## 2. `rn-collins/flexjd-site`

### Evidence observed

- The repository is public.
- Its README identifies it as a resource site for the Northeastern University School of Law FlexJD community, maintained by the SBA Chair of FlexJD Interests.
- The README documents a static HTML/CSS/vanilla-JavaScript architecture and states that every push to `main` automatically redeploys through Vercel.
- The repository includes a newsletter, student guide, opportunity tracker, awareness-campaign pages, a shared design system, and routing configuration.
- Recent commits show rapid addition of search, glossary, changelog, and hundreds of opportunity records.
- The README publishes RN's Northeastern email address and class year.
- Targeted code search produced no matches for the tested secret-pattern terms.

### Committed secrets and environment handling

**Finding:** The documented architecture is static and no secret-dependent build process is described. No secret-pattern match was identified through indexed code search.

**Status:** `targeted-current-tree-no-match; full-history-scan-required`

**Required control:** Run full-history scans anyway, because static sites can still expose webhook URLs, form endpoints, analytics IDs, private spreadsheet URLs, hidden admin routes, or previously deleted credentials. Document whether any forms or analytics send data off-site.

### Personal data

**Finding:** The repository publishes RN's institutional email and class year. It serves a defined student community and includes newsletters, opportunity records, contacts, and advocacy content. These materials can create privacy and expectation risks even without storing student records.

**Required control:**

- confirm that only deliberately public staff, faculty, organization, and opportunity contacts are included;
- remove personal phone numbers or non-public email addresses;
- do not publish student lists, case details, accommodations, complaints, or internal SBA communications;
- add a retention/source rule for newsletter archives and expired opportunities;
- state clearly whether any form collects names, emails, interests, or submissions.

### Institutional claims

**Finding:** The site is institution-linked and maintained by an SBA officer, but the repository documentation does not establish that it is an official Northeastern publication or that Northeastern has approved every statement.

**Required control:** Add a prominent disclaimer such as: "Student-maintained resource; not an official statement of Northeastern University or Northeastern University School of Law. Verify academic, administrative, and employment information with the originating office or employer."

Every program requirement, deadline, contact, policy, and opportunity should carry a source URL and last-verified date where practical.

### Third-party assets and licenses

**Finding:** No license or third-party notice was located through indexed search. The site likely reproduces names, descriptions, links, logos, campaign material, and opportunity information from external organizations.

**Required control:** Add `RIGHTS.md` and `THIRD_PARTY_NOTICES.md`; avoid implying endorsement; use organization logos only where permission or a defensible nominative use exists; preserve source links and dates; avoid copying full job descriptions when a concise summary and link will suffice.

### Deployment configuration

**Finding:** Deployment is directly documented: Vercel deploys every push to `main`. The repository includes `vercel.json` for routing.

**Required control:** Verify the Vercel owner, production domain, preview visibility, branch protection, and who can publish on behalf of the SBA resource. Because every main-branch push publishes immediately, introduce pull-request review or a pre-publish checklist for institutional claims and personal data.

### Git history

**Finding:** Recent history shows high-frequency additions of opportunity data and public resources. This improves utility but creates a material stale-data and source-verification burden. No suspicious secret-related commit message was observed in the sampled history.

**Required control:** Add automated link checking, expiration dates, source URLs, last-verified dates, and a monthly stale-record report. Run a dedicated full-history secret scan.

### Release gate

**Decision:** Keep public, but classify as `public-institutional-controls-required`. This repository is the best documented of the three, yet it has the highest institutional-governance obligation.

---

## 3. `rn-collins/zero-to-frontier`

### Evidence observed

- The repository is public.
- The README exists but is empty.
- Commit history consists of an initial commit described as a 21-page resource with 237 verified resources, followed by Vercel deployment-trigger commits.
- The commit history is strong evidence of an intended Vercel deployment but does not document its architecture, data sources, verification method, rights posture, or maintenance process.
- Targeted code search produced no matches for the tested secret-pattern terms.

### Committed secrets and environment handling

**Finding:** No indexed current-tree secret match was identified. The absence of a README or environment contract makes it impossible to determine from documentation whether the project is fully static or depends on external services.

**Status:** `targeted-current-tree-no-match; full-history-scan-required`

**Required control:** Inspect the current file tree, identify all scripts and endpoints, add `.env.example` where applicable, and run full-history Gitleaks and TruffleHog scans.

### Personal data

**Finding:** No personal-data handling documentation exists. A 237-resource product may include named people, contact details, organizations, applications, programs, or scraped material.

**Required control:** Create a data inventory identifying whether the project contains personal emails, direct contacts, biographies, application details, or user-submitted information. Remove non-public data and add a correction/removal process.

### Institutional and factual claims

**Finding:** The phrase "237 verified resources" is a measurable public claim, but the repository does not disclose the verification standard, source hierarchy, date of verification, inclusion rules, or update cadence.

**Required control:** Add `docs/methodology.md`, a source registry, definitions of "verified," record-level `source_url` and `last_verified`, known limitations, and a stale-record policy.

### Third-party assets and licenses

**Finding:** No README content, license, or third-party notice was identified. A resource-heavy site has elevated copyright and database-right concerns if it reproduces external text, images, logos, or structured records.

**Required control:** Add rights and third-party notices, identify the source and permitted use of every image and logo, minimize copied prose, and document the legal basis for any bulk dataset reuse.

### Deployment configuration

**Finding:** Two deployment-trigger commits and a Git-reconnect commit provide evidence of a Vercel-linked deployment. The actual Vercel configuration and production domain remain unverified from repository documentation.

**Required control:** Verify Vercel ownership, domain, production branch, deployment settings, and whether previews expose unfinished or sensitive content.

### Git history

**Finding:** The history is small enough that a complete local review should be straightforward. No suspicious secret-related commit message was observed, but the actual diffs and objects require scanning.

**Required control:** Complete the full history scan before further promotion or reuse.

### Release gate

**Decision:** Classify as `public-hold`. Do not promote it as a flagship until the README, methodology, provenance, rights, privacy, environment, and security controls exist.

---

## Required tooling pass

The following local commands should be run on a trusted machine against fresh clones of all three repositories:

```bash
gitleaks detect --source . --no-banner --redact
trufflehog git file://$(pwd) --only-verified

git log --all --stat --oneline
git rev-list --objects --all | sort -k 2
```

Also inspect:

- every `.env*`, config, JSON, YAML, JavaScript, TypeScript, and serverless-function file;
- GitHub Actions and Vercel configuration;
- deleted or renamed environment files;
- PDFs, spreadsheets, images, and other binaries;
- form endpoints, webhooks, analytics IDs, and booking links;
- branch protection and preview-deployment exposure.

A scan is complete only when the tool versions, date, commit SHA, scope, findings, remediation, and reviewer are recorded.

## Control-registry updates

| Repository | secrets scan status | rights status | deployment status | new exact next action |
|---|---|---|---|---|
| `aloha-ai-consulting` | targeted current-tree checks complete; full history pending | owner-created but third-party and claims register pending | Vercel-linked by canonical metadata and repeated deploy commits; provider settings unverified | add README, claims register, environment contract, rights inventory, privacy data flow, and full-history scan |
| `flexjd-site` | targeted current-tree checks complete; full history pending | institution-linked; approval and disclaimer controls pending | Vercel auto-deploy from `main` documented; provider settings unverified | add institutional disclaimer, source/verification fields, rights notice, privacy inventory, PR review gate, link/staleness automation, and full-history scan |
| `zero-to-frontier` | targeted current-tree checks complete; full history pending | unknown until dataset and asset inventory completed | deployment-trigger history observed; provider settings unverified | place on flagship hold; write full documentation and methodology; inventory data/assets; verify deployment; run full-history scan |

## Bottom line

No exposed secret was identified in the connector's targeted indexed searches, but none of the three repositories has earned a `full-secret-scan-passed` status. `aloha-ai-consulting` and `flexjd-site` may remain public while their controls are strengthened. `zero-to-frontier` should remain publicly accessible only as an unpromoted work-in-progress until its evidence, rights, privacy, and reproducibility record is built.