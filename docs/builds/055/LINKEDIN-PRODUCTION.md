# Build 055 LinkedIn production record

## Canon and lineage

- Title: **Let the Smart Home Explain Itself**
- Job: **Let a smart environment act while preserving explanation, authorization, override and recovery.**
- B-Web: **An interactive environment simulates actuation, conflicts, outages and rollback.**
- Uses Builds 036, 040, and 054; creates `cap:055`; Build 097 consumes it.

## Deliverables and transcript

Film, poster, and ordered contact sheet use the canonical `/media/builds/055/` paths recorded in the manifest entry. The film is silent-first; the six exact ordered on-screen scenes in `build-055-spec-entry.json` are its caption-equivalent transcript.

Canvas: 720 × 900; 24 fps; 18.000 seconds; 432 frames. Encoding: H.264, `yuv420p`, MP4 faststart; one video stream; no audio stream.

## Truthful provenance

The adjacent `render.py` is the actual deterministic local renderer for these binaries and performs no device or network I/O. It is not represented as the repository canonical renderer. Original typography and layout by Rayven-Nikkita Collins / RN Builds; no third-party footage, images, music, voice, logos, homes, devices, sensors, people, data, or likenesses are used.

## Boundaries

Every room, device, occupant, trigger, authorization, conflict, outage, override, action, and rollback is synthetic. “Act” means an in-memory state transition inside an exact fixture only. The package connects to no device, sensor, hub, network, account, building system, or person data; performs no actuation; and infers no authority, identity, protected trait, disability, health state, occupancy, intent, preference, accommodation, or personal need. It is not a security system, safety clearance, accessibility/compliance determination, accommodation decision, facilities authorization, benefit/effect finding, or proof that explanation, override, rollback, or recovery would work in a real home. Real implementation requires accountable human/facilities authority, authentication/authorization, preview, consent, conflict governance, manual override, tested fail-safe behavior, rollback and recovery, security/privacy threat modeling, and competent smart-home, electrical, fire/life-safety, cybersecurity, disability-justice, accessibility, legal, ethics, and human-factors review.

## Machine and visual verification

- MP4 SHA-256: `f9a1371448062e1a33087f2f942a9333de8443df5f812e6324f6b051efdbe0dd` — 226,321 bytes
- Poster SHA-256: `858739ac36a91bef91c113bbd2a88f373199d2f0c74bc1233531c43f70d1b533` — 44,470 bytes
- Contact-sheet SHA-256: `ac5977390bcc10466973dd35e97aa1a38ebb21549862e7cd20c6b32a6f948fd6` — 447,824 bytes
- `ffprobe`: H.264; 720 × 900; `yuv420p`; 24/1 fps; 18.000 seconds; 432 frames; one video stream and no audio.
- Midpoints at 1.5, 4.5, 7.5, 10.5, 13.5, and 16.5 seconds were extracted and visually inspected in order: legible, unclipped, and storyboard-consistent.

## Remaining gates

Canonical repository integration; full normal-speed playback; physical-phone review; the competent reviews named above; LinkedIn upload, processing, poster-selection, compression, and published-post inspection; preservation of final post copy, URL, and release record.
