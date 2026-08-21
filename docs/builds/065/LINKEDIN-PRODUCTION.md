# Build 065 LinkedIn production package

## Longitudinal Care Continuity

**Creative line:** The Care Does Not End When the Session Does.

The 18-second silent-first piece reframes a session as one moment within a longer continuity pathway: preparation, session, integration, handoffs, and follow-up. Risks, supports, referrals, and ownership remain connected without depicting a real person or making a clinical claim.

## Files

| File | Purpose | Specification | Bytes | SHA-256 |
| --- | --- | --- | ---: | --- |
| `build-065-longitudinal-care-continuity-linkedin.mp4` | LinkedIn motion asset | 720×900; 18.000 s | 152,185 | `aeff7a1549c0ebf361bc57f220af897b0c8a268d5ee87e7c17e571f67e4a8c51` |
| `build-065-longitudinal-care-continuity-poster.png` | Final-message poster | 720×900 | 116,961 | `aa613052d6486089a5a5f66f0274016d5ea91f08ed473326cd141a09a089f849` |
| `build-065-longitudinal-care-continuity-contact-sheet.png` | Four-frame QA sheet | 720×900 | 148,964 | `5b27dc14fce412647efac2917ca9d59519e75b20089794ebde5a062b856617f8` |

## Video verification

- H.264 High profile; `yuv420p`
- 720 × 900; constant 24 fps
- 432 frames; exactly 18.000 seconds
- No audio stream
- Faststart confirmed (`moov` precedes `mdat`)

## Suggested LinkedIn post

A session can be carefully documented and still sit inside a broken continuity pathway.

Build 065 maps the work that surrounds the moment: preparation, the session record, integration needs, referrals and handoffs, risks, supports, follow-up status, and clear ownership.

The point is not to imply that every pathway is identical. It is to keep the next responsible step from disappearing between people, records, and time.

The care does not end when the session does.

Build 065 of 100.

#CareContinuity #ServiceDesign #KnowledgeInfrastructure #BuildInPublic

## Alt text

An 18-second, text-led animation on a warm cream background introduces RN Build 065. A single dark green square labeled “Session” expands into a pathway of preparation, session, integration, handoffs, and follow-up. The final screen reads “The care does not end when the session does” and shows risks, supports, and ownership remaining connected. Accent colors are rust, gold, green, purple, and blue. There is no audio, patient imagery, or psychedelic imagery.

## Provenance and safety

- Generated locally using `generate.sh`, FFmpeg, and locally installed DejaVu Sans.
- No third-party imagery, footage, audio, logos, or marks.
- All interface text is synthetic; no patient, participant, or practitioner data.
- No substances, psychedelic motifs, diagnoses, treatments, dosages, protocols, or clinical outcomes depicted.
- No claim that the pathway is medical advice or a universal standard of care.

## Publication checklist

- [x] 720×900, 24 fps, 18.000 seconds
- [x] H.264 High, `yuv420p`, faststart
- [x] Silent and understandable without audio
- [x] Poster and contact sheet included
- [x] SHA-256 manifest included and verified
- [x] Visual QA completed: no clipping, overlap, or illegible sampled frame
- [ ] RN approves final caption and hashtags

## Regeneration

Run `./generate.sh`. It deterministically recreates the MP4, poster, contact sheet, and checksum manifest. Re-run technical verification if the FFmpeg encoder environment changes.
