# Transcript reconciliation — Builds 001–100

## Canonical public contract

The deployed B experience has one fail-closed media source of truth for every build.

- The visible transcript is the exact normalized contents of `build-NNN-linkedin-transcript.txt`.
- The six motion-story scenes are the exact six cue texts in `build-NNN-linkedin-captions.vtt`.
- The player, poster, caption track and downloads use the same build-numbered media quartet.
- A missing transcript, VTT, MP4 or poster, or a VTT with other than six cues, fails the build instead of falling back to invented copy.
- Range-specific evidence labels, source displays and distribution language remain independent of this media contract.

Run `node scripts/verify-transcript-reconciliation-001-100.mjs` before preview deployment.
