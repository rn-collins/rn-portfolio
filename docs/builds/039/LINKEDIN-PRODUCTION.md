# Build 039 LinkedIn production record

## Canonical deliverables

- Film: `/media/builds/039/build-039-linkedin.mp4`
- Poster: `/media/builds/039/build-039-linkedin-poster.png`
- Ordered contact sheet: `/media/builds/039/build-039-linkedin-contact-sheet.png`
- Canvas: 720 × 900; 24 fps; 18.000 seconds; 432 frames
- Encoding: H.264, `yuv420p`, MP4 faststart; one video stream; no audio stream

## Storyboard and on-screen transcript

The film is silent-first. All meaning is present as on-screen text; these six scenes run for three seconds each.

1. **A TRACE IS EVIDENCE—NOT THE TRUTH.** An event log can show sequence and state without proving intent, correctness, completeness, causation, or a safe outcome.
2. **PURPOSE · AUTHORITY · SCOPE · STOP.** Lock agent and model version, environment, permitted tools and data, accountable owner, approval gates, prohibited actions, and termination conditions.
3. **EVENT · TIME · STATE · RESULT.** Use synthetic redacted traces. Record requests, tool outcomes, approvals, errors, retries, and side effects—never credentials, secrets, or private content.
4. **OBSERVED ≠ INFERRED ≠ VERIFIED.** Preserve provenance, missing events, uncertainty, contradictions, transformations, and reviewer notes instead of inventing a continuous story.
5. **REPLAY · CONTAIN · CORRECT · VALIDATE.** Check permissions, sequence, human intervention, external change, stop behavior, and consequence before deciding whether work can stand.
6. **INSPECTABLE WITHOUT EXPOSURE.** Accountable agent work leaves an inspectable trail without exposing private content.

## Rights, privacy, security, and accessibility

Original deterministic typography and layout by Rayven-Nikkita Collins / RN Builds. No third-party footage, images, music, voice, logos, or personal likenesses are used. All described trace events are synthetic and redacted. No real credentials, secrets, tokens, personal data, customer content, private prompts, proprietary tool results, or confidential work traces are included. The film describes a defensive inspection method and does not claim that a trace is complete or inherently trustworthy.

The silent-first composition does not require hearing. High-contrast on-screen text carries the complete narrative. The poster and ordered six-frame contact sheet provide static alternatives. The transcript above is the caption-equivalent record. Platform caption upload is not required because there is no spoken audio, but the post copy should link or reproduce the transcript for assistive-technology access.

## Machine verification

- MP4 SHA-256: `00a4e79f64993c774e9ac3c5a4d1df5b99e9c56b2b476603729acb7abc1d8396` — 277,984 bytes
- Poster SHA-256: `46559fd7ccca3c15e958640182b63d02c0e09182666572127461c78bb225c463` — 43,759 bytes
- Contact sheet SHA-256: `aca4ba29771f7f265c84660dad2dc95e788c0f660472d78e9cdd7ec47571a2d6` — 1,093,602 bytes
- `ffprobe`: H.264; 720 × 900; `yuv420p`; 24/1 fps; 18.000 seconds; 432 frames; no audio stream.
- Container atom check: `moov` precedes `mdat` (faststart).
- Visual sampling: scene midpoints at 1.5, 4.5, 7.5, 10.5, 13.5, and 16.5 seconds are present in correct order, legible, unclipped, and consistent with the storyboard.

## Remaining human/platform gates

Before publication: watch the entire file at normal speed; check it on a representative physical phone; obtain security/privacy review of redaction and trace framing; confirm LinkedIn upload, processing, poster selection, and compression; inspect the published post; and preserve the platform URL and final post copy in the release record.
