# Flagship Repository Evidence Audit

**Audit date:** 2026-07-16  
**Scope:** the ten repositories designated as the first public-facing flagship cohort.

This audit replaces assumption-only classifications with findings grounded in repository metadata, current files, and visible commit history. It does **not** claim that a full Git-history secret scan, external intellectual-property clearance, or live Vercel account inspection has been completed. Those remain explicit publication gates.

## Evidence standard

- **Verified:** directly observed in repository metadata, a current file, or commit history.
- **Declared:** stated inside a repository file but not independently tested from the deployment provider.
- **Pending:** cannot be resolved from repository contents alone and requires a human, institutional, collaborator, Vercel, or security review.

## Findings

| Repository | Evidence-backed finding | Documentation | Deployment | Rights | Secrets | Reproducibility | Decision |
|---|---|---:|---|---|---|---|---|
| `rn-collins/rn-portfolio` | A static portfolio with a structured JSON build registry, migration/validation script, Vercel configuration, and a substantive technical README. | **4/5** | Vercel configuration and deployment hostname are documented in-repo. | Owner-created; third-party fonts/assets still require a release check. | No completed full-history scan is evidenced. | **R3**: locally runnable and structurally documented. | Keep flagship; separate public/internal data, add schema and security gate, then make public. |
| `rn-collins/aloha-ai-consulting` | Public static professional-services site. Current `index.html` contains canonical Vercel URL, structured data, service positioning, and social metadata. No root README was found. Latest observed commit explicitly retriggered a Vercel deployment. | **1/5** | **Verified operational linkage:** canonical Vercel URL plus Vercel deploy commit. | Owner-created; copy, credentials, third-party assets, and professional-claims review remain. | No completed scan is evidenced. | **R1**: public output exists; setup and architecture are undocumented. | Keep public; add flagship README, architecture, service-claims provenance, deployment notes, and limitations. |
| `rn-collins/aloha-suppression-sweep` | Private, actively maintained repository linked to a live portfolio deployment. No root README was found. Latest observed commit combines substantive feature additions and cross-project fixes, showing active but coupled maintenance. | **1/5** | Live deployment is declared in RN Builds; provider configuration was not independently inspected in this pass. | Owner-created; platform-source licenses, incident evidence, and quoted material require review. | No completed scan is evidenced. | **R1** | Keep private until evidence provenance, methodology, limitations, and secrets/history gates are complete; then publish or create a public core. |
| `rn-collins/aloha-ai-governance` | Private Node module. `package.json` identifies version 1.0.0, no build step, and `@upstash/redis` dependency. No evidence-backed project README was found in this pass. | **1/5** | RN Builds declares a Vercel deployment; exact production linkage remains to be checked in Vercel. | Owner-created; regulatory-source licensing and legal-information boundaries require review. | No completed scan is evidenced; Redis-related environment handling requires inspection. | **R1** | Keep private; document data sources, update cadence, jurisdiction selection, architecture, environment variables, and legal limitations before publication. |
| `rn-collins/psych-ops-directory` | Private Node 20 project at version 2.0.0. No root README was found. The package file confirms a maintained application identity but does not document setup, data provenance, or deployment. | **1/5** | RN Builds declares a live Vercel deployment; provider linkage remains pending. | Owner-created, but directory records and organization data require source/licensing and correction-process review. | No completed scan is evidenced. | **R1** | Strong flagship candidate after data-provenance documentation, correction/appeal policy, schema, setup guide, and release-safe sample data. |
| `rn-collins/transform-observatory` | Private Next.js application. The README is the untouched generic `create-next-app` template and contains no product methodology, data-source, governance, or deployment-specific documentation. | **1/5** | Next.js/Vercel compatibility is documented generically; actual production linkage remains pending. | Owner-created; use of named external frameworks, sources, and quotations requires review. | No completed scan is evidenced. | **R2**: framework setup is reproducible, but product data/methodology are not. | Keep private until the template README is replaced with a real flagship documentation bundle and source methodology. |
| `rn-collins/nsag-site` | Private umbrella site for the NSAG family. No root README was found. Its strategic value is high, but the repository currently does not provide the documentation needed to govern 15 related module repositories. | **1/5** | RN Builds declares a live Vercel deployment; exact linkage remains pending. | Owner-created; framework claims, assessment design, citations, and contributor rights require review. | No completed scan is evidenced. | **R1** | Designate as canonical NSAG repository; document framework methodology and scoring, then consolidate modules into a governed monorepo. |
| `rn-collins/flexjd-site` | Public static HTML/CSS/JS resource hub with a project-specific README. The README identifies site structure and states that pushes to `main` automatically redeploy to Vercel. Commit history shows current active maintenance, including search, filters, glossary, changelog, and opportunity additions. | **3/5** | **Declared and strongly evidenced:** repository-specific README plus active deployment-oriented workflow. | Institution-linked. Northeastern naming, marks, student information, role authority, and disclaimer language require institutional review. | No completed full-history scan is evidenced. | **R3**: no-build local structure is documented; content provenance and validation remain incomplete. | Keep public while conducting an immediate institutional-rights/privacy review; add source dates, correction policy, disclaimer, data methodology, and security scan. |
| `rn-collins/law-communication-library` | Private, substantial repository associated with collaborator/employer-linked legal education. No root README was found. The absence of documentation and the rights context prevent publication despite strong portfolio value. | **1/5** | RN Builds declares a live deployment; provider linkage remains pending. | **Publication blocked pending written rights confirmation** regarding Antithesis Law materials, authorship, branding, and reuse. | No completed scan is evidenced. | **R1** | Keep private. Obtain written rights clearance first; then create a sanitized showcase or public version with legal-information disclaimer, provenance, and update policy. |
| `rn-collins/zero-to-frontier` | Public repository whose root README exists but is empty. This is currently the highest-risk public flagship because visitors receive no explanation of purpose, setup, authorship, limitations, or status. | **0/5** | Deployment relationship was not verified in this pass. | Owner-created status is presumed from account ownership, but content and third-party asset review remain pending. | No completed scan is evidenced. | **R0–R1** until code and execution path are documented. | Audit immediately. Either add a complete README and release documentation or make private until the repository is ready for public evaluation. |

## Cross-flagship conclusions

1. **Only `rn-portfolio` currently has close to flagship-grade repository documentation.**
2. **`flexjd-site` has useful project-specific documentation and strong maintenance evidence, but higher institutional and privacy obligations.**
3. **`aloha-ai-consulting` is publicly deployed and professionally positioned, yet GitHub visitors receive no repository explanation.**
4. **`transform-observatory` is technically reproducible only at the generic framework level; its current README creates the impression of an uncustomized starter project.**
5. **`zero-to-frontier` should not remain a named flagship while its README is empty.**
6. **No flagship has evidence of a completed current-tree plus full-history secret scan.** This is a verified control gap, not a claim that secrets exist.
7. **Rights status cannot be fully proven from GitHub.** Law Communication Library and FlexJD require external clearance; the remaining owner-created repositories still need third-party asset and source-license review.

## Required next actions

### Publication Gate A — Security

Run a current-tree and full-history scan with at least Gitleaks or TruffleHog; inspect `.env*`, Vercel variables, API routes, Upstash credentials, email/webhook endpoints, and committed datasets. Record scan date, tool version, scope, result, and remediation commit.

### Publication Gate B — Rights

Create a rights inventory for code, text, datasets, logos, screenshots, fonts, third-party APIs, quoted material, institutional names, collaborator materials, and employer-linked work. Obtain written clearance where ownership is not solely RN Collins LLC.

### Publication Gate C — Documentation

Each flagship needs: project README, architecture, methodology/data provenance, environment-variable guide, local setup, deployment, limitations, legal/privacy boundaries, maintenance status, and changelog.

### Publication Gate D — Reproducibility

Provide a safe sample dataset or fixtures, deterministic setup instructions, a documented demo path, and tests or at minimum a repeatable validation script. Private production data and secrets must remain excluded.

## Control-registry interpretation

The main registry has been updated for these ten repositories. Scores for the remaining 51 repositories remain provisional until their own evidence passes are completed.