# Build 064 LinkedIn production package

## Cannabis Institutional Memory Archive

**Creative line:** An Industry With Amnesia.

This 18-second, silent-first motion piece frames institutional memory as a traceable record rather than a folder or one person's recollection. It begins with fragments whose owners, reasons, sources, and review dates have been separated. The archive then connects each record to its context, source, and later change, preserving a usable trail through turnover.

All examples are fictional structural labels. The package contains no patient, consumer, employee, licensee, investigation, or cannabis-product records; no third-party imagery; and no legal, regulatory, or medical claims. It uses generated shapes and text with the locally installed DejaVu Sans family.

## Files

| File | Purpose | Dimensions / duration | Bytes | SHA-256 |
| --- | --- | --- | ---: | --- |
| `build-064-linkedin.mp4` | LinkedIn motion asset | 720×900, 18.000 s | 161,933 | `ba2e62a7d61ab1b892cf9fdcb9a6d82aa413d09fedd6cf8f41181157b76a5a75` |
| `build-064-linkedin-poster.png` | Final-message poster | 720×900 | 115,419 | `a056e0f044352c49c0af108f964aa8c713699fbaa13d107f73bfe533400c3c7e` |
| `build-064-linkedin-contact-sheet.png` | Four-frame QA/contact sheet | 720×900 | 152,812 | `7bf38f7d110b5a3d934a0d9b445b1b9f46913f3bf6b50ece57dad10ee7d0372d` |

`SHA256SUMS.txt` is generated with the package and should be checked before publication.

## Video probe

- Codec: H.264, High profile
- Pixel format: `yuv420p`
- Frame rate: 24 fps constant (`24/1` real and average)
- Frames: 432
- Canvas: 720 × 900 (4:5 portrait)
- Duration: 18.000 seconds
- Audio: none
- Fast start: enabled

## Suggested LinkedIn post

An industry can accumulate documents and still lose its memory.

Build 064 is a Cannabis Institutional Memory Archive: a system for preserving what happened, why it mattered at the time, what supported it, and what changed later.

The archive is designed around the trail between records—not around pretending every old document is complete or every recollection is certain. Missing ownership, detached sources, unclear review dates, and unresolved context remain visible instead of being quietly filled in.

Institutional memory should survive turnover. It should also show its limits.

Build 064 of 100.

#KnowledgeManagement #InstitutionalMemory #ResearchInfrastructure #BuildInPublic

## Alt text

An 18-second text-led animation on a warm cream background introduces RN Build 064, Cannabis Institutional Memory Archive, with the line “An industry with amnesia.” Abstract record cards show missing ownership, context, and sources. Four archive functions then appear—record, context, source, and change—before a fictional timeline closes with “Make the trail survive turnover” and “The memory is usable.” Accent colors are rust, gold, green, and purple. There is no audio and no cannabis or patient imagery.

## Provenance and safety

- Generated locally from `generate.sh` with FFmpeg.
- Typeface: locally installed DejaVu Sans and DejaVu Sans Bold.
- No photography, footage, audio, logos, trademarks, or third-party visual assets.
- All displayed dates and record fragments are invented interface examples, not real records.
- No personal, medical, legal, compliance, licensing, or enforcement claims.
- No depiction or endorsement of cannabis use.

## Publication checks

- [x] 720 × 900 portrait canvas
- [x] 24 fps and exactly 18 seconds
- [x] H.264 High profile, `yuv420p`
- [x] No audio stream
- [x] Readable without sound
- [x] No third-party assets or real records
- [x] Poster and four-frame contact sheet included
- [x] SHA-256 manifest included
- [x] Contact sheet and poster visually inspected for clipping, overlap, and contrast
- [ ] Confirm final copy and hashtags with RN before publishing
- [ ] Recompute checksums after any file change

## Regeneration

Run `./generate.sh` from this directory. The script recreates the MP4, poster, contact sheet, and checksum manifest using FFmpeg. Re-run the probe and update this document if the local encoder produces different bytes.
