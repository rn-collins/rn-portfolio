# Build 063 LinkedIn production package

## Living Research Repository

**Creative line:** Research That Does Not Die in a Folder.

The 18-second, silent-first motion piece introduces the repository as a living system: questions establish the work, evidence connects sources and claims, gaps keep uncertainty visible, and outputs turn learning into usable work. The final sequence shows the research changing without losing its trail.

No third-party imagery, footage, audio, marks, or typefaces are embedded. The piece uses generated shapes, text, and the locally installed DejaVu Sans family.

## Files

| File | Purpose | Dimensions / duration | Bytes | SHA-256 |
| --- | --- | --- | ---: | --- |
| `build-063-linkedin.mp4` | LinkedIn motion asset | 720×900, 18.000 s | 131,896 | `3f2be66b1a993599aa7d077cf85e6b7a88a93e1a4b42de2d4a4b4061ee768cda` |
| `build-063-linkedin-poster.png` | Final-message poster | 720×900 | 75,523 | `fb96b4f3ad9ffe986493a9815c7e7287c50fcd93761e0489dbe9a1be54de68a1` |
| `build-063-linkedin-contact-sheet.png` | Four-frame QA/contact sheet | 720×900 | 136,511 | `5181026a7a1589678f9396c481c6443dd00fd9a4456b969cece9cebb7e71ae0c` |

`SHA256SUMS.txt` is generated with the package and should be checked before publication.

## Video probe

- Codec: H.264, High profile
- Pixel format: `yuv420p`
- Frame rate: 24 fps constant (`24/1` reported for both real and average frame rate)
- Frames: 432
- Canvas: 720 × 900 (4:5 portrait)
- Duration: 18.000 seconds
- Audio: none
- Fast start: enabled

## Suggested LinkedIn post

Research should not become a folder full of files that nobody can interrogate six months later.

Build 063 is a Living Research Repository: a working system that connects the question, sources, notes, claims, gaps, methods, updates, and publishable outputs while preserving the trail between them.

The important part is not merely storing what we found. It is making visible:

- what the evidence supports;
- what remains uncertain;
- what changed;
- why it changed; and
- what the research can become next.

Research that stays alive can keep informing decisions instead of disappearing when a project ends.

Build 063 of 100.

#ResearchInfrastructure #KnowledgeManagement #ResearchOps #BuildInPublic

## Alt text

An 18-second text-led animation on a warm cream background introduces RN Build 063, Living Research Repository. It shows a research question card, then four connected functions—question, evidence, gaps, and outputs—and closes with “The research keeps moving” and “Research that does not die in a folder.” Accent colors are coral, gold, teal, and purple. There is no audio.

## Publication checks

- [x] 720 × 900 portrait canvas
- [x] 24 fps and exactly 18 seconds
- [x] H.264 High profile, `yuv420p`
- [x] No audio stream
- [x] Readable without sound
- [x] No third-party assets
- [x] Poster and four-frame contact sheet included
- [x] SHA-256 manifest included
- [ ] Confirm final copy and hashtags with RN before publishing
- [ ] Recompute checksums after any file change

## Regeneration

Run `./generate.sh` from this directory. The script recreates the MP4, poster, contact sheet, and checksum manifest using FFmpeg. Re-run the probe and update this document if the local FFmpeg encoder produces different file bytes.
