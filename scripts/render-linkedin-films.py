#!/usr/bin/env python3
"""Render the canonical silent-first 4:5 LinkedIn films for The 100.

Inputs are versioned in data/linkedin-film-specs-v1.json. Outputs are ordinary
public assets served by Next.js. The renderer intentionally uses deterministic
local composition so the films can be regenerated without chat history, a
browser recording, a model API, or an external media service.
"""
from __future__ import annotations

import hashlib
import json
import math
import os
from pathlib import Path
import subprocess
import sys
from typing import Any

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
SPEC_PATH = ROOT / "data" / "linkedin-film-specs-v1.json"
PUBLIC_ROOT = ROOT / "apps" / "web" / "public" / "media" / "builds"
MANIFEST_PATH = ROOT / "docs" / "builds" / "linkedin-media-manifest-v2.json"


def font_path(bold: bool) -> str:
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf",
    ]
    for candidate in candidates:
        if Path(candidate).exists():
            return candidate
    raise RuntimeError("A supported sans-serif font was not found")


def F(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(font_path(bold), size)


def rgb(hex_value: str) -> tuple[int, int, int]:
    value = hex_value.lstrip("#")
    return tuple(int(value[i : i + 2], 16) for i in (0, 2, 4))  # type: ignore[return-value]


def ease(value: float) -> float:
    x = max(0.0, min(1.0, value))
    return x * x * (3 - 2 * x)


def wrap_lines(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.FreeTypeFont, max_width: int) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
        proposed = f"{current} {word}".strip()
        if draw.textbbox((0, 0), proposed, font=font)[2] <= max_width:
            current = proposed
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def draw_wrapped(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.FreeTypeFont, x: int, y: int, width: int, fill: tuple[int, int, int], line_height: float = 1.18) -> int:
    for line in wrap_lines(draw, text, font, width):
        draw.text((x, y), line, font=font, fill=fill)
        y += int(font.size * line_height)
    return y


def render_frame(build: dict[str, Any], scene: dict[str, str], scene_index: int, local_t: float, spec: dict[str, Any]) -> Image.Image:
    W = int(spec["canvas"]["width"])
    H = int(spec["canvas"]["height"])
    design = spec["design"]
    bg, ink, hi = rgb(design["background"]), rgb(design["ink"]), rgb(design["highlight"])
    im = Image.new("RGB", (W, H), bg)
    d = ImageDraw.Draw(im)
    mono = F(13, True)
    body = F(25, False)
    body_bold = F(25, True)
    headline_size = 68 if len(scene["headline"]) < 34 else 57 if len(scene["headline"]) < 50 else 48
    headline = F(headline_size, True)

    # Exhibition frame and permanent identifiers.
    d.line((34, 42, W - 34, 42), fill=ink, width=2)
    d.text((34, 58), f"BUILD {build['id']}-B / LINKEDIN FILM", font=mono, fill=ink)
    d.text((W - 180, 58), f"{scene_index + 1:02d} / {len(build['scenes']):02d}", font=mono, fill=ink)
    d.line((34, H - 40, W - 34, H - 40), fill=ink, width=2)

    # Motion is informational: reveal the current gate, then hold long enough to read.
    enter = ease(local_t / 0.55)
    accent = int((W - 72) * ease((local_t - 0.10) / 0.65))
    d.rectangle((36, 111, 36 + accent, 118), fill=ink)
    eyebrow_y = int(145 + (1 - enter) * 34)
    d.text((38, eyebrow_y), scene["eyebrow"].upper(), font=body_bold, fill=ink)

    head_y = int(205 + (1 - enter) * 48)
    y = draw_wrapped(d, scene["headline"].upper(), headline, 38, head_y, W - 76, ink, 1.02)

    body_alpha = ease((local_t - 0.35) / 0.6)
    if body_alpha > 0:
        body_y = max(y + 42, 470)
        # Highlight field expands behind the proposition without carrying meaning alone.
        hi_width = int((W - 76) * ease((local_t - 0.45) / 0.85))
        if hi_width > 0:
            d.rectangle((38, body_y - 16, 38 + hi_width, body_y + 128), fill=hi)
        draw_wrapped(d, scene["body"], body, 54, body_y + 8, W - 108, ink, 1.25)

    # A persistent five-part footer makes the artifact useful as a saveable sequence.
    footer = "QUESTION → GATE → EVIDENCE → FORM → NEXT STATE"
    d.text((38, H - 76), footer, font=mono, fill=ink)
    return im


def render_build(build: dict[str, Any], spec: dict[str, Any]) -> dict[str, Any]:
    width = int(spec["canvas"]["width"])
    height = int(spec["canvas"]["height"])
    fps = int(spec["canvas"]["fps"])
    seconds = float(spec["canvas"]["secondsPerScene"])
    out_dir = PUBLIC_ROOT / build["id"]
    out_dir.mkdir(parents=True, exist_ok=True)
    video_path = out_dir / f"build-{build['id']}-linkedin.mp4"
    poster_path = out_dir / f"build-{build['id']}-linkedin-poster.png"

    cmd = [
        "ffmpeg", "-loglevel", "error", "-y",
        "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{width}x{height}", "-r", str(fps), "-i", "-",
        "-an", "-c:v", "libx264", "-preset", "medium", "-crf", "21", "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(video_path),
    ]
    process = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    assert process.stdin is not None
    frames_per_scene = int(fps * seconds)
    for scene_index, scene in enumerate(build["scenes"]):
        for frame_index in range(frames_per_scene):
            local_t = frame_index / fps
            frame = render_frame(build, scene, scene_index, local_t, spec)
            process.stdin.write(frame.tobytes())
            if scene_index == len(build["scenes"]) - 1 and frame_index == int(fps * 1.5):
                frame.save(poster_path)
    process.stdin.close()
    result = process.wait()
    if result != 0:
        raise RuntimeError(f"ffmpeg failed for Build {build['id']} with exit code {result}")

    digest = hashlib.sha256(video_path.read_bytes()).hexdigest()
    poster_digest = hashlib.sha256(poster_path.read_bytes()).hexdigest()
    return {
        "id": build["id"],
        "title": build["title"],
        "path": f"/media/builds/{build['id']}/{video_path.name}",
        "poster": f"/media/builds/{build['id']}/{poster_path.name}",
        "width": width,
        "height": height,
        "fps": fps,
        "durationSeconds": seconds * len(build["scenes"]),
        "silentFirst": True,
        "sha256": digest,
        "bytes": video_path.stat().st_size,
        "posterSha256": poster_digest,
        "posterBytes": poster_path.stat().st_size,
        "accessibilityMode": "silent-first/on-screen-text",
        "productionRecord": f"docs/builds/{build['id']}/LINKEDIN-PRODUCTION.md",
        "creatorCredit": "Rayven-Nikkita Collins / RN Builds",
        "visualSources": "original deterministic composition; no third-party footage, images, or music",
        "audioSources": "none",
        "rightsBasis": "creator-owned",
        "certificationStatus": "candidate-generated; exact-head workflow and manual QA required",
        "generator": "scripts/render-linkedin-films.py",
        "spec": "data/linkedin-film-specs-v1.json",
        "finalProposition": build["final"],
    }


def main() -> None:
    spec = json.loads(SPEC_PATH.read_text())
    selected = set(sys.argv[1:])
    builds = [b for b in spec["builds"] if not selected or b["id"] in selected]
    if not builds:
        raise SystemExit("No matching builds")
    rendered = [render_build(build, spec) for build in builds]
    existing = json.loads(MANIFEST_PATH.read_text()) if MANIFEST_PATH.exists() else {"builds": []}
    indexed = {item["id"]: item for item in existing.get("builds", [])}
    indexed.update({item["id"]: item for item in rendered})
    manifest = {
        "schemaVersion": "2.0",
        "purpose": "Reproducible public LinkedIn film inventory for The 100",
        "design": spec["design"],
        "builds": [indexed[build_id] for build_id in sorted(indexed)],
    }
    MANIFEST_PATH.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST_PATH.write_text(json.dumps(manifest, indent=2) + "\n")
    for item in rendered:
        print(f"Build {item['id']}: {item['sha256']} · {item['bytes']} bytes")


if __name__ == "__main__":
    main()
