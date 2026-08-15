# Gallery Public Release Standard v1.0

Status: REQUIRED for the permanent public exhibition shell. This standard is independent from any individual numbered build's release standard.

## Core rule
The gallery may remain public while individual builds move through their own lifecycle. The shell must never imply that an unfinished artifact is released, and a build's internal release-engineering state must not make the public exhibition itself look broken or unfinished.

## Public lifecycle
- `OnView` → public label **ON VIEW**. The numbered cycle has released working A and B-Web artifacts. Its public record is available.
- `InLab` → public label **IN THE LAB**. A working current cycle is intentionally inspectable before release. It must be truthfully described as lab work rather than released work.
- `ComingNext` → public label **COMING NEXT**. The canonical title, public job and planned A/B concept may be inspected, but the gallery must not imply the artifacts exist.

Internal values such as BLOCKING, DEVICE_MANUAL, CI status, acceptance-matrix values and implementation chatter do not appear in the ordinary visitor path.

## Shell gates
1. **Truthful lifecycle** — one explicit registry field drives gallery, entrance and build-room status. Progress counts derive from registry state rather than hard-coded copy.
2. **Information architecture** — entrance → main gallery → build room → A/B/public record/lineage; future rooms remain useful without dead artifact links.
3. **Public comprehension** — the exhibition explains A / THE THING, B / THE STORY and the public record without assuming technical training.
4. **Visual system** — Exhibition Space sans/mono language is consistent across entrance, gallery and build rooms; obsolete serif/legacy skin does not leak onto those surfaces.
5. **Responsive QA** — no horizontal overflow at 320 CSS px and representative tablet/desktop widths; pathological long titles/copy wrap rather than expand the viewport.
6. **Accessibility** — semantic headings/links, meaningful accessible names, keyboard focus, visible focus, reduced-motion behavior, non-color status labels, touch-usable controls.
7. **Metadata/discoverability** — stable canonical routes, unique page metadata, OG/Twitter metadata for public entry/gallery/build routes where appropriate.
8. **Navigation/error behavior** — all primary links resolve; a public not-found experience returns visitors to the canonical gallery.
9. **Conversion path** — a visitor can reach a real public way to contact/work with RN; the practice route is not a dead end.
10. **Automation-resistance** — adding/releasing the next build should require changing lifecycle state and build artifacts, not rewriting gallery progress/status copy by hand.
11. **Release engineering** — lineage validation, typecheck, lint, production build and Chromium/WebKit E2E pass on the frozen public-shell head.
12. **Manual acceptance** — physical-device/screen-reader/touch/zoom and real social-preview inspection remain distinct from automated PASS where not directly performed.

## Future cycle transition
When a cycle releases: mark the current `InLab` build `OnView`, mark the next cycle `InLab`, and provide its A/B routes. Gallery progress, entrance status and card treatment must update automatically from the registry.
