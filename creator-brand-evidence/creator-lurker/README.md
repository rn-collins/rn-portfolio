# Creator Lurker v1 — public/permissioned creator-intelligence system

A monitoring system that tracks selected creators and brands across public social platforms, stores
their content, and uses a local LLM to flag sponsorships, affiliate language, risky claims, brand-fit
signals, and emerging opportunities. Built to feed Creator + Brand Evidence Audits.

> **Compliance boundary (hard rule).** This is a **public / permissioned** intelligence system, **not**
> a private-account bypass tool. Only collect public content or data a creator/client has authorized
> (via Phyllo). Do not scrape private accounts, defeat auth walls, or bypass bot-detection. Respect each
> platform's Terms and applicable law. This keeps the system usable for a real brand-management practice.

## Architecture

```
Apify / Bright Data / Playwright / Brandwatch / Phyllo   (collection)
                     │
                     ▼
                   n8n            (orchestration: schedule, route, alert)
                     │
                     ▼
        Postgres + pgvector       (source-of-truth evidence DB)
                     │
                     ▼
             local LLM (Ollama)   (analysis: claims, disclosures, fit, risk)
                     │
                     ▼
   risk register + creator profiles + audit dashboard  →  client deliverables
```

## Tool roles

| Tool | Role | Use it for |
|---|---|---|
| **Apify** | Public crawling MVP | TikTok, IG, YouTube, LinkedIn, Reddit — public profiles/posts/comments; scheduled scrapes |
| **n8n** | Workflow brain | Schedule crawls, route data, trigger analysis, send alerts, update dashboards |
| **Postgres + pgvector** | Source-of-truth DB | Creator profiles, posts, transcripts, links, risk flags, evidence, embeddings |
| **local LLM (Ollama)** | Analysis brain | Extract claims, disclosures, brand-fit signals, trust cues, creator categories, risks |
| **Phyllo** | Permissioned creator data | Account-level data when creators/clients authorize (YouTube, TikTok, IG, FB, Twitch) |
| **Brandwatch / Talkwalker** | Broad social listening | Brand mentions, sentiment, crisis alerts, audience insights, trend detection |
| **Bright Data** | Enterprise scraping fallback | When Apify isn't enough / needs scale |
| **Playwright + Browser Use** | Self-hosted crawler training | Your own crawlers, browser agents, screenshots, link-following |
| **Whisper** | Video understanding prep | Transcribe creator videos → feed transcript + frames to the LLM |

## Build order (do NOT hand-build every scraper first)

1. **Apify** — public crawling. Learn what data you actually need.
2. **n8n** — schedule + automate.
3. **Postgres** — store everything.
4. **local LLM** — analyze posts/videos.
5. **Playwright / Browser Use** — in parallel, to learn self-hosted crawling.
6. **Phyllo** — when you need creator-authorized data.
7. **Brandwatch / Talkwalker** — when you need broad listening.
8. **Bright Data** — when Apify breaks, misses coverage, or you need scale.

## Quick start (local dev)

```bash
cp .env.example .env          # fill in APIFY_TOKEN, OLLAMA_MODEL, etc.
docker compose up -d          # postgres + n8n + ollama
psql "$DATABASE_URL" -f db/schema.sql
# import n8n/creator-lurker.workflow.json in the n8n UI (http://localhost:5678)
```

## What v1 tracks

> **Creator Lurker v1:** Track selected creators/brands across TikTok, Instagram, YouTube, LinkedIn,
> Reddit; store posts/videos/comments; flag sponsorships, affiliate language, risky claims,
> brand-fit signals, and emerging opportunities.

See `ARCHITECTURE.md` for the data flow and `db/schema.sql` for the evidence model.
