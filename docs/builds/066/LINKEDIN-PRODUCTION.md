# Build 066 LinkedIn production package

## Legal Institutional Memory

**Creative line:** The Firm Knows More Than Its Folders.

This 18-second silent-first piece begins with disconnected synthetic matters, authorities, arguments, experts, workflows, outcomes, and lessons. Those fragments assemble into a governed relationship model carrying source, status, access, and ownership context. The result presents institutional memory as connected knowledge—not a legal conclusion or a pile of documents.

## Files

| File | Purpose | Specification | Bytes | SHA-256 |
| --- | --- | --- | ---: | --- |
| `build-066-legal-institutional-memory-linkedin.mp4` | LinkedIn motion asset | 720×900; 18.000 s | 196,487 | `b063ea47d37ba64cc4d266eef368dc663911187063f329ff0dc6048215591bda` |
| `build-066-legal-institutional-memory-poster.png` | Final-message poster | 720×900 | 142,288 | `63dcffa0b3339423da659298e6aeacab099aa19c484ee84defcddf794a3ffc1f` |
| `build-066-legal-institutional-memory-contact-sheet.png` | Four-frame QA sheet | 720×900 | 169,336 | `48fdc1333d25ea6b54b2c9822d9da36d0e5e129f822d6843f10976cbf5b94a17` |

## Video verification

- H.264 High profile; `yuv420p`
- 720 × 900; constant 24 fps
- 432 frames; exactly 18.000 seconds
- One video stream; no audio stream
- Faststart confirmed: `moov` at byte 36 precedes `mdat` at byte 6,158

## Suggested LinkedIn post

A firm’s knowledge is not the same thing as its document collection.

Build 066 explores what becomes possible when matters, authorities, arguments, documents, experts, outcomes, workflows, and lessons retain their relationships—and when each relationship carries source, status, access, and ownership context.

This is not about treating an old answer as a current legal conclusion. It is about making institutional experience inspectable, governed, and less dependent on who happens to remember where something lives.

The firm knows more than its folders.

Build 066 of 100.

#LegalOperations #KnowledgeManagement #InstitutionalMemory #BuildInPublic

## Alt text

An 18-second text-led animation on a warm cream background introduces RN Build 066. Disconnected cards labeled matter, authority, expert, workflow, and outcome gather around a central matter and become linked knowledge objects. The final screen reads “The firm knows more than its folders” above a dark blue governed-memory panel connecting matters and arguments, authorities and experts, workflows and outcomes, and lessons and ownership. A footer states that the demonstration is synthetic, contains no client or matter data, gives no legal advice, and makes no privilege or current-law claim. The piece uses navy, coral, gold, green, purple, and blue accents and has no audio.

## Provenance and boundaries

- Generated locally using `generate.sh`, FFmpeg, and locally installed DejaVu Sans.
- No third-party imagery, footage, audio, logos, marks, citations, or media.
- Every matter, label, relationship, and knowledge object is synthetic; there are no real clients, matters, authorities, experts, or outcomes.
- The animation does not provide legal advice or assert that any authority is current.
- It makes no claim that a record is privileged, confidential, complete, authoritative, or safe to reuse.
- The visual model is a governed-memory concept, not a law-firm workflow mandate or legal conclusion.

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
