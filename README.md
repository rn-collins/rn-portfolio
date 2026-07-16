# RN Builds

A public-facing portfolio and evidence registry for the digital products, research tools, monitoring systems, legal-information resources, education platforms, and governance prototypes built by **Rayven-Nikkita Collins (RN Collins)**.

The repository is intentionally lightweight: a static HTML interface deployed on Vercel, backed by a structured JSON registry rather than a framework-specific application layer.

## What this repository demonstrates

RN Builds is not a gallery of screenshots. It is an index of shipped and developing systems across several recurring problem areas:

- AI strategy, workflow design, and regulated-industry implementation
- legal and regulatory intelligence
- psychedelic and cannabis policy infrastructure
- nervous-system-aware governance and institutional assessment
- research knowledge systems and evidence organization
- legal education, professional development, and student support
- prospect-specific proof-of-concept tools

Each registry record identifies the build, deployment, brand or project family, status, product type, intended audience, and a concise description of the system.

## Repository architecture

```text
.
├── index.html                  # Public portfolio interface
├── data/
│   └── builds.json             # Canonical structured build registry
├── scripts/
│   └── extract_builds.py       # Migration, normalization, and validation
├── privacy.html                # Privacy notice
├── og-image.png                # Social sharing image
├── robots.txt                  # Crawler instructions
├── sitemap.xml                 # Search-engine sitemap
├── vercel.json                 # Deployment and cache headers
└── .github/workflows/
    └── extract-builds.yml      # Registry validation and migration workflow
```

## Build registry schema

`data/builds.json` is the canonical source for the portfolio's build cards.

```json
{
  "n": 1,
  "name": "Example build",
  "url": "example.vercel.app",
  "brand": "Project family",
  "status": "Live",
  "type": "Monitoring",
  "slack": "#internal-alert-channel",
  "target": "Primary intended user or institution",
  "desc": "A factual description of what the build does and how it is used."
}
```

### Required fields

| Field | Purpose |
|---|---|
| `n` | Stable display order and build identifier |
| `name` | Public project name |
| `url` | Deployment hostname or route |
| `brand` | Brand, client, publication, or project family |
| `status` | Current state, such as `Live` or `soon` |
| `type` | Product category used by the portfolio filters |
| `desc` | Concise, evidence-oriented system description |

### Optional fields

| Field | Purpose |
|---|---|
| `target` | Intended user, buyer, institution, or stakeholder group |
| `slack` | Internal operations or alert channel; hidden from the public view unless the internal mode is unlocked |

## Data integrity

The registry validator enforces:

- a non-empty JSON array;
- all required fields;
- unique and contiguous build numbers;
- unique deployment URLs;
- default values for optional fields;
- UTF-8 normalization for legacy punctuation errors;
- deterministic JSON formatting.

Run it locally with:

```bash
python scripts/extract_builds.py
```

On the first migration run, the script extracts the historical inline `JSON.parse(...)` registry from `index.html`, writes `data/builds.json`, and replaces the inline payload with an asynchronous JSON loader. On later runs, it validates and normalizes the structured registry.

## Local development

No package installation or build step is required.

Because the page loads `data/builds.json` with `fetch`, serve the repository through a local HTTP server rather than opening `index.html` directly from the filesystem:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Updating the portfolio

1. Add or revise a record in `data/builds.json`.
2. Keep build numbers contiguous and URLs unique.
3. Run `python scripts/extract_builds.py`.
4. Review the public description for accuracy, confidentiality, and current status.
5. Commit the JSON change with a message that explains the substantive update.

The portfolio should distinguish clearly among:

- **Live:** deployed and usable;
- **prototype or prospect tool:** functioning proof of concept with a defined audience;
- **research tool:** structured inquiry, assessment, or evidence infrastructure;
- **soon:** not yet represented as a completed public product.

## Design and implementation choices

This repository uses plain HTML, CSS, and JavaScript to keep the public portfolio:

- fast to deploy;
- easy to inspect;
- independent of a JavaScript framework;
- portable across static hosts;
- simple to maintain through structured data.

The principal tradeoff is that the interface remains a single-page static application. The structured registry reduces the largest maintenance risk by separating project data from presentation logic.

## Privacy, security, and professional boundaries

- Secrets and environment files are excluded through `.gitignore`.
- Public descriptions should not disclose client-confidential information, private datasets, credentials, access tokens, or privileged legal work.
- Legal-information tools are educational and operational systems, not substitutes for advice from licensed counsel.
- Research and monitoring tools should identify uncertainty, source limitations, and update cadence where material.
- Internal fields should never be treated as access control merely because the public interface hides them.

## Selected build families

### Aloha AI

AI implementation, regulatory monitoring, legal-AI workflow, governance intelligence, cultural intelligence, and evidence-oriented prospect tools.

### Nervous-System-Aware Governance (NSAG)

A modular institutional assessment framework spanning legal systems, public health, education, built environments, civic sponsorship, medical technology, extreme environments, and emerging governance contexts.

### Legal and professional education

Clerking, Set for Life, the FlexJD SBA Resource Hub, Myelin CE, the Law Communication Library, and related professional-learning infrastructure.

### Psychedelic and cannabis knowledge infrastructure

Policy monitors, operational directories, literature systems, destigmatization resources, impact assessments, and jurisdiction-specific knowledge tools.

## Authorship

Designed, researched, and assembled by **Rayven-Nikkita Collins** through RN Collins and related project brands.

This repository documents interdisciplinary product work at the intersection of law, AI, neuroscience, regulatory systems, research, education, and institutional design.
