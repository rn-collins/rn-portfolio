# Build 007 — LinkedIn Film Production Record

## Artifact
- Title: The Product That Learns
- MP4: `/media/builds/007/build-007-linkedin.mp4`
- Poster: `/media/builds/007/build-007-linkedin-poster.png`
- Canvas: 720 × 900 (4:5)
- Frame rate: 24 fps
- Duration: 18 seconds
- Language: silent-first
- Bytes: 207,906
- SHA-256: `60bcb7fb74d641c9df7f8139daa0da7c120c2502c6378d636237de7b452a4a01`

## Final proposition
A PRODUCT LEARNS ONLY WHEN FEEDBACK CAN RESPONSIBLY CHANGE IT.

## Sequence
1. Shipping is one-way; collection is not learning.
2. Capture use, outcome, correction, and unmet need.
3. Qualify purpose, consent, consequence, and owner.
4. Make human evidence, authority, capacity, and escalation real.
5. Change, validate, communicate, and monitor.
6. Retain the accountable path by which feedback can change the product.

## Reproduction
`python scripts/render-linkedin-films.py 001 002 003 004 005 006 007`

The versioned source is `data/linkedin-film-specs-v1.json`. The deterministic renderer requires Pillow, ffmpeg, and DejaVu Sans. The canonical inventory is `docs/builds/linkedin-media-manifest-v2.json`.

## Verification boundary
The workflow verifies non-empty MP4/poster assets and probes width, height, and frame rate. CI/browser QA verifies public exposure. Native LinkedIn upload/transcoding and physical-phone playback remain platform/device checks, not claims made by repository automation.
