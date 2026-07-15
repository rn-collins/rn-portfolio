-- Creator Lurker v1 — evidence data model (Postgres + pgvector)
-- Public / permissioned data only. Every row records provenance + capture time.

CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE creators (
  id            BIGSERIAL PRIMARY KEY,
  platform      TEXT NOT NULL,               -- tiktok | instagram | youtube | linkedin | reddit
  handle        TEXT NOT NULL,
  display_name  TEXT,
  profile_url   TEXT,
  category      TEXT,                         -- LLM-assigned (wellness, legal, finance, …)
  follower_count BIGINT,
  authorized    BOOLEAN DEFAULT FALSE,        -- TRUE if via Phyllo / client-authorized
  first_seen    TIMESTAMPTZ DEFAULT now(),
  UNIQUE(platform, handle)
);

CREATE TABLE brands (
  id     BIGSERIAL PRIMARY KEY,
  name   TEXT NOT NULL,
  brief  JSONB,                               -- client brief: fit criteria, banned claims, verticals
  UNIQUE(name)
);

CREATE TABLE posts (
  id            BIGSERIAL PRIMARY KEY,
  creator_id    BIGINT REFERENCES creators(id),
  platform      TEXT NOT NULL,
  url           TEXT UNIQUE,
  posted_at     TIMESTAMPTZ,
  captured_at   TIMESTAMPTZ DEFAULT now(),
  source        TEXT NOT NULL,                -- apify | brightdata | playwright | phyllo | brandwatch
  provenance    JSONB,                        -- raw source id, actor run id, etc.
  text          TEXT,
  transcript    TEXT,                         -- Whisper for video
  media         JSONB,                        -- urls, type, duration
  metrics       JSONB,                        -- likes, comments, shares, views
  embedding     VECTOR(768)
);
CREATE INDEX ON posts (creator_id);
CREATE INDEX ON posts USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

CREATE TABLE analyses (
  id                 BIGSERIAL PRIMARY KEY,
  post_id            BIGINT REFERENCES posts(id) ON DELETE CASCADE,
  model              TEXT,
  analyzed_at        TIMESTAMPTZ DEFAULT now(),
  sponsorship        TEXT,                    -- paid | gifted | affiliate | ambassador | none | unclear
  disclosure_present BOOLEAN,
  disclosure_clarity TEXT,                    -- clear | vague | missing
  claims             JSONB,                   -- [{text, type:express|implied, category, risk}]
  brand_fit          JSONB,                   -- {brand_id, score, rationale}
  trust_cues         JSONB,
  opportunity        JSONB,
  raw                JSONB                    -- full LLM JSON for audit
);
CREATE INDEX ON analyses (post_id);

CREATE TABLE risk_flags (
  id          BIGSERIAL PRIMARY KEY,
  post_id     BIGINT REFERENCES posts(id) ON DELETE CASCADE,
  creator_id  BIGINT REFERENCES creators(id),
  severity    TEXT NOT NULL,                  -- high | medium | low
  kind        TEXT NOT NULL,                  -- disclosure | claim | testimonial | affiliate | ai_content | platform
  detail      TEXT,
  status      TEXT DEFAULT 'open',            -- open | reviewed | dismissed | escalated
  created_at  TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX ON risk_flags (severity, status);

CREATE TABLE opportunities (
  id          BIGSERIAL PRIMARY KEY,
  creator_id  BIGINT REFERENCES creators(id),
  brand_id    BIGINT REFERENCES brands(id),
  kind        TEXT,                           -- whitespace | emerging_creator | narrative_shift | fit_match
  score       NUMERIC,
  detail      TEXT,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- convenience view: open high-severity flags with creator + post context
CREATE VIEW v_risk_register AS
SELECT rf.id, rf.severity, rf.kind, rf.detail, rf.status,
       c.platform, c.handle, p.url, rf.created_at
FROM risk_flags rf
JOIN creators c ON c.id = rf.creator_id
LEFT JOIN posts p ON p.id = rf.post_id
WHERE rf.status = 'open'
ORDER BY (rf.severity='high') DESC, rf.created_at DESC;
