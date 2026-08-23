# RN Builds reproducible media pipeline

This directory is the repository-native alternative to committing approximately 69 MB of generated media binaries.

The source of truth is compact text/story data plus deterministic SVG rendering and FFmpeg encoding. The deployment gate must require:

- all 100 build directories and exactly four public assets per build;
- H.264/yuv420p, 720×900, fast-start video with a 30.000-second duration;
- six five-second WebVTT cues and six matching transcript scenes;
- no more than 15 words in any scene;
- a valid PNG poster;
- a generated SHA-256 manifest.

`generate-063-067.mjs` replaces the previously selected 18-second assets for Builds 063–067. It preserves their individualized propositions while bringing them onto the 30-second/six-scene standard. Build 022 must be sourced from the individualized `linkedin_recuts_001_024_data.mjs` recut, not a generic fallback.

Run `node repo-media-generator/generate-all.mjs <generated-output>` to generate all 400 public assets, normalize every MP4 to exactly 30.000 seconds, and invoke the strict verifier. `generate-all.mjs` deliberately selects the individualized Build 022 recut and the corrected 30-second Build 063–067 generator.

Exact binary hashes are reproducible only when the FFmpeg, ImageMagick, fonts, and OS image are pinned. MP4 generation was observed to reproduce byte-for-byte on the current environment; ImageMagick poster hashes did not, despite identical rendered content, so CI should pin the container and treat the newly generated manifest as authoritative.
