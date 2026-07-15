# Creator Lurker — architecture & data flow

## Pipeline stages

1. **Collect** — n8n triggers Apify actors on a schedule for a watchlist of creators/brands/hashtags.
   Bright Data is a fallback for scale/coverage; Playwright handles bespoke public pages; Phyllo supplies
   creator-authorized account data; Brandwatch/Talkwalker supply broad mentions & sentiment.
2. **Normalize** — each source's payload is mapped to a common `post` shape (platform, author, url,
   captured_at, text, media, metrics). Video → Whisper transcript.
3. **Store** — rows land in Postgres. Text + transcripts get embeddings (pgvector) for semantic search
   and dedup.
4. **Analyze** — the local LLM runs per-post extraction prompts:
   - sponsorship? (paid/gifted/affiliate/ambassador/none) + disclosure present? + disclosure clarity
   - claims made + claim type (express/implied) + risk level + category (health/finance/legal/…)
   - brand-fit signals for a given client brief
   - trust cues / audience-vulnerability flags
   - opportunity signals (whitespace, emerging creators, narrative shifts)
5. **Flag & route** — findings become `risk_flags` and `opportunities`; n8n posts alerts (email/Slack)
   above a severity threshold and updates the dashboard.
6. **Deliver** — the audit dashboard aggregates creator profiles, risk register, and opportunity feed;
   snapshots become client deliverables (evidence map, risk map, priority matrix).

## Analysis contract (LLM output schema)

The LLM must return strict JSON so n8n can route it. See `llm/extraction-prompt.md` and
`llm/output.schema.json`. Keep the model local (Ollama) so creator content and client context never
leave the environment.

## Severity model (routing)

| Severity | Trigger examples | Action |
|---|---|---|
| High | Undisclosed paid promotion; disease/efficacy overclaim; fake-testimonial signal | Alert now + add to risk register |
| Medium | Vague disclosure; ambiguous affiliate language; borderline claim | Queue for human review |
| Low | Clean disclosure; on-brand content; neutral mention | Log only |

## Data retention & ethics

- Store only public or authorized content; record `source` and `captured_at` for every row.
- Keep a `provenance` field so any deliverable can cite where evidence came from.
- Purge on request; never re-identify private individuals from public data beyond the stated purpose.
