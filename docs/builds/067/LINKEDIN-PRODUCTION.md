# Build 067 LinkedIn production package

## Digital Twin Boundaries

**Creative line:** A Digital Twin Should Know What It Does Not Own.

This 18-second silent-first piece starts with disconnected synthetic personal-knowledge objects whose missing context remains visible. They form a bounded model only as permission, provenance, declared/inferred status, ownership, use limits, and unknowns are made explicit. The visual treats uncertainty as a valid state, not an invitation to invent or claim rights.

## Files

| File | Purpose | Specification | Bytes | SHA-256 |
| --- | --- | --- | ---: | --- |
| `build-067-digital-twin-boundaries-linkedin.mp4` | LinkedIn motion asset | 720×900; 18.000 s | 197,710 | `5eff674e07cc75220d4b5a66e5b7cff1baad140d5bd6c904b8f2558309ae5c0e` |
| `build-067-digital-twin-boundaries-poster.png` | Final-message poster | 720×900 | 140,796 | `c4c59e9e32daa699078f5dfd6684ab98b4a361d97ce460d9f3b7cd37daf1b82c` |
| `build-067-digital-twin-boundaries-contact-sheet.png` | Four-frame QA sheet | 720×900 | 169,071 | `af6c14b66f291ff14865ab9cfe93fd154825af47f8f6ece31f2cb8de4dafa466` |

## Video verification

- H.264 High profile; `yuv420p`
- 720 × 900; constant 24 fps
- 432 frames; exactly 18.000 seconds
- One video stream; no audio stream
- Faststart confirmed: `moov` at byte 36 precedes `mdat` at byte 6,155

## Suggested LinkedIn post

A useful digital twin should preserve the boundaries around what it knows.

Build 067 explores a personal knowledge model in which permission, provenance, context, ownership, and use limits travel with each object. It also separates what was declared from what was inferred—and lets unknown remain unknown.

The point is not to manufacture a complete likeness. It is to make the model inspectable enough to show where its authority stops.

A digital twin should know what it does not own.

Build 067 of 100.

#DigitalTwins #KnowledgeManagement #DataGovernance #BuildInPublic

## Alt text

An 18-second text-led animation on a warm cream background introduces RN Build 067. Synthetic cards labeled note, pattern, project, source, and draft appear with statuses such as declared, inferred, context absent, permission open, and owner unknown. They form a central bounded twin model connected to permission, provenance, declared, inferred, and ownership fields. The final screen reads “A digital twin should know what it does not own” above a navy boundary-aware knowledge panel. It states that unknown is a valid state, the demonstration is synthetic and contains no personal data, and it makes no identity, ownership, consent, right, or truth claim. The piece has no audio.

## Provenance and boundaries

- Generated locally using `generate.sh`, FFmpeg, and locally installed DejaVu Sans.
- No third-party imagery, footage, audio, logos, marks, citations, or media.
- Every object, label, relationship, and state is synthetic; there are no real people or personal records.
- The piece does not identify anyone or claim that any identity, ownership, permission, consent, right, provenance, context, inference, or statement is true or legally valid.
- The visual is a boundary-aware knowledge-model concept, not an identity system, rights determination, consent record, or source of truth.

## Publication checklist

- [x] 720×900, 24 fps, 18.000 seconds
- [x] H.264 High, `yuv420p`, faststart
- [x] Silent and understandable without audio
- [x] Poster and four-frame contact sheet included
- [x] SHA-256 manifest included and verified
- [x] Poster and contact sheet visually inspected at original resolution
- [x] No clipping, overlap, or illegible sampled frame observed
- [x] Synthetic-only and boundary language visible in the final frame
- [ ] RN approves final caption and hashtags

## Regeneration

Run `./generate.sh`. It recreates the MP4, poster, contact sheet, and checksum manifest from local fonts and FFmpeg filters. Re-run technical verification if the FFmpeg encoder environment changes; bit-exact output can vary between encoder builds.
