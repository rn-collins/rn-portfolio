# Build 008 — LinkedIn Film Production Record

Status: CANONICAL OUTPUT GENERATED / release certification pending

## Proposition
**DATA BECOMES USEFUL WHEN SOMEONE CAN DECIDE AND ACT.**

## Output
- MP4: `apps/web/public/media/builds/008/build-008-linkedin.mp4`
- Poster: `apps/web/public/media/builds/008/build-008-linkedin-poster.png`
- Public route: `/media/builds/008/build-008-linkedin.mp4`
- Dimensions: 720 × 900 (4:5)
- Frame rate: 24 fps
- Runtime: 18 seconds
- Audio strategy: silent-first
- Bytes: 217,992
- SHA-256: `40e4bbbbc266fe1508ec82c015b0ea0fdf8077020aa2027a74676b9f30142bca`

## Deterministic production
- Spec: `data/linkedin-film-specs-v1.json`
- Generator: `scripts/render-linkedin-films.py`
- Workflow: `.github/workflows/render-linkedin-films.yml`
- Workflow run: `31984904289`
- Generated commit: `0cc8553e2ebdc252f80f55b3383cd0f8f38137fb`

The workflow rendered canonical films 001–008, verified each MP4 and poster, inspected stream dimensions/frame rate with ffprobe, validated the media manifest, and committed changed assets.

## Narrative sequence
1. A wall of charts does not name the decision.
2. Start with the decision and justify each retained metric.
3. Expose source, freshness, comparison, and uncertainty.
4. Connect decision → owner → action → next state.
5. Route conflicts to accountable human control.
6. Save the proposition: data is not a decision.

## Verification boundary
The checksum proves identity of the generated file, not factual correctness, organizational authority, accessibility of every playback environment, or effectiveness on LinkedIn. The film is a concise derivative of the build, not a substitute for its tool, evidence, archive, or human decision process.
