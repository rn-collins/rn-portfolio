# n8n workflow — Creator Lurker v1

Import `creator-lurker.workflow.json` in the n8n UI (http://localhost:5678). It wires the pipeline:

**Cron (daily)** → **Read watchlist** (Postgres: creators/brands/hashtags)
→ **Apify actor run** (per platform) → **Normalize** (Function node → common post shape)
→ **Insert posts** (Postgres) → **Embed** (Ollama `nomic-embed-text` → pgvector)
→ **LLM analyze** (Ollama `llama3.1` with `llm/extraction-prompt.md`, JSON out)
→ **Insert analyses + risk_flags + opportunities** (Postgres)
→ **IF severity = high** → **Alert** (email / Slack webhook)
→ **Update dashboard** feed.

## Nodes to configure

1. **Cron** — schedule (e.g. `0 7 * * *`).
2. **Postgres (watchlist)** — `SELECT` from `creators`/`brands`.
3. **HTTP Request (Apify)** — `POST https://api.apify.com/v2/acts/{actorId}/runs?token=$APIFY_TOKEN`.
   Swap `{actorId}` per platform (TikTok, IG, YouTube, LinkedIn, Reddit actors).
4. **Function (normalize)** — map actor payload → `{platform,author,url,posted_at,text,media,metrics}`.
5. **Postgres (insert posts)** — upsert on `url`.
6. **HTTP Request (Ollama embed + analyze)** — `POST $OLLAMA_HOST/api/generate`, `format: json`.
7. **Postgres (insert analyses / risk_flags / opportunities)**.
8. **IF + Email/Slack** — route `severity = high`.

> This folder ships the wiring plan; generate the concrete `creator-lurker.workflow.json` from the n8n
> UI once your Apify actor IDs and credentials are set, then export it here for version control.
