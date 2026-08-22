# Build 004 — B-LinkedIn Production Record

Status: GENERATED / repository binary transfer and physical phone-size QA remain open

Generated: 2026-08-15
Intended filename: `build-004-linkedin.mp4`
Intended repository destination: release-media path consistent with Builds 001–003 once a binary-capable authenticated write surface is available.

## Production spec
- format: MP4 / H.264;
- composition: 720 × 900 pixels (4:5);
- frame rate: 24 fps;
- duration: 21.125 seconds;
- audio: none / silent-first;
- size: 142,520 bytes;
- SHA-256: `4bf7c7c0a99b600787c3f7a20bbff500cbb912feed09b5cf221f7d136469a273`.

## Story architecture
1. `Research does not become intelligence because you collected more of it.`
2. Raw research objects: report, PDF, interview, data, article, note.
3. Manual intelligence chain: COLLECT → SEPARATE → VERIFY → BRIEF.
4. Verification states remain distinct: verified, contradicted, uncertain, unverified.
5. Decision-ready output keeps findings separate from contradictions, uncertainty and open questions.
6. Final saveable proposition: `Automation should inherit a method, not invent one.`

## Relation to B-Web
This is not a screen recording. It uses the same conceptual mechanism as B-Web but is composed specifically for a silent feed: one proposition per frame, progressively revealing the intelligence chain and ending in a saveable statement.

## Inspection completed in current production runtime
Opening frame, verification-state frame, and final frame were rendered and visually inspected at native 720 × 900. Sampled frames showed no critical text collision or clipping and retained the complete argument with audio off.

## Remaining manual checks
- inspect the actual encoded MP4 on at least one phone-size physical device at normal LinkedIn viewing distance;
- verify every frame's dwell time is comfortably readable in playback, not only as a still;
- confirm no compression/platform upload artifact harms typography;
- transfer the exact binary whose checksum is recorded above into the repository/media delivery path and update `data/build-004-artifacts-v1.json` with its committed path.

The asset must not be represented as repository-delivered or device-certified until those checks occur.
