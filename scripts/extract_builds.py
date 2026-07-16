#!/usr/bin/env python3
"""Extract the RN Builds registry from index.html into data/builds.json.

The script is intentionally dependency-free so it can run locally or in GitHub
Actions. It performs a one-time migration from the historical inline
`JSON.parse("...")` payload, rewrites the page to load structured JSON, and
validates the resulting registry on every later run.
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
INDEX_PATH = ROOT / "index.html"
DATA_DIR = ROOT / "data"
BUILDS_PATH = DATA_DIR / "builds.json"

INLINE_PATTERN = re.compile(
    r'^const BUILDS = JSON\.parse\(("(?:\\.|[^"\\])*")\);$',
    re.MULTILINE,
)

LOADER = """let BUILDS = [];
const buildsReady = fetch('/data/builds.json')
  .then(response => {
    if (!response.ok) throw new Error(`Build registry request failed: ${response.status}`);
    return response.json();
  })
  .then(builds => {
    BUILDS = builds;
    switchTab(currentTab);
    return builds;
  })
  .catch(error => {
    console.error('Unable to load build registry.', error);
    const grid = document.getElementById('grid');
    if (grid) grid.innerHTML = '<div class="no-results">Build registry is temporarily unavailable.</div>';
    return [];
  });"""

MOJIBAKE_REPLACEMENTS = {
    "â": "—",
    "â": "–",
    "â": "’",
    "â": "‘",
    "â": "“",
    "â": "”",
    "Â·": "·",
    "Â": "",
}

REQUIRED_FIELDS = {"n", "name", "url", "brand", "status", "type", "desc"}
OPTIONAL_DEFAULTS = {"slack": "", "target": ""}


def repair_text(value: Any) -> Any:
    if isinstance(value, str):
        for broken, fixed in MOJIBAKE_REPLACEMENTS.items():
            value = value.replace(broken, fixed)
        return value
    if isinstance(value, list):
        return [repair_text(item) for item in value]
    if isinstance(value, dict):
        return {key: repair_text(item) for key, item in value.items()}
    return value


def validate(builds: list[dict[str, Any]]) -> None:
    if not isinstance(builds, list) or not builds:
        raise ValueError("Build registry must be a non-empty JSON array.")

    seen_numbers: set[int] = set()
    seen_urls: set[str] = set()

    for index, build in enumerate(builds, start=1):
        if not isinstance(build, dict):
            raise ValueError(f"Registry entry {index} is not an object.")

        missing = REQUIRED_FIELDS - build.keys()
        if missing:
            raise ValueError(f"Registry entry {index} is missing: {sorted(missing)}")

        for key, default in OPTIONAL_DEFAULTS.items():
            build.setdefault(key, default)

        number = build["n"]
        if not isinstance(number, int) or number < 1:
            raise ValueError(f"Registry entry {index} has an invalid n value: {number!r}")
        if number in seen_numbers:
            raise ValueError(f"Duplicate build number: {number}")
        seen_numbers.add(number)

        url = build["url"].strip().lower()
        if not url:
            raise ValueError(f"Build {number} has an empty URL.")
        if url in seen_urls:
            raise ValueError(f"Duplicate build URL: {url}")
        seen_urls.add(url)

    expected = list(range(1, len(builds) + 1))
    actual = sorted(seen_numbers)
    if actual != expected:
        raise ValueError(f"Build numbers must be contiguous. Expected {expected}; received {actual}.")


def extract_inline_registry(index_html: str) -> tuple[list[dict[str, Any]], str]:
    match = INLINE_PATTERN.search(index_html)
    if not match:
        raise ValueError("Historical inline build registry was not found in index.html.")

    # First decode the JavaScript string literal, then decode the JSON it contains.
    encoded_json = json.loads(match.group(1))
    builds = json.loads(encoded_json)
    builds = repair_text(builds)
    validate(builds)

    migrated_html = index_html[: match.start()] + LOADER + index_html[match.end() :]
    return builds, migrated_html


def load_structured_registry() -> list[dict[str, Any]]:
    builds = json.loads(BUILDS_PATH.read_text(encoding="utf-8"))
    builds = repair_text(builds)
    validate(builds)
    return builds


def main() -> int:
    if not INDEX_PATH.exists():
        print("index.html was not found.", file=sys.stderr)
        return 1

    index_html = INDEX_PATH.read_text(encoding="utf-8")
    match = INLINE_PATTERN.search(index_html)

    if match:
        builds, migrated_html = extract_inline_registry(index_html)
        DATA_DIR.mkdir(parents=True, exist_ok=True)
        BUILDS_PATH.write_text(
            json.dumps(builds, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        INDEX_PATH.write_text(migrated_html, encoding="utf-8")
        print(f"Extracted {len(builds)} builds to {BUILDS_PATH.relative_to(ROOT)}.")
        return 0

    if not BUILDS_PATH.exists():
        print(
            "index.html no longer contains an inline registry, but data/builds.json is missing.",
            file=sys.stderr,
        )
        return 1

    builds = load_structured_registry()
    canonical = json.dumps(builds, ensure_ascii=False, indent=2) + "\n"
    if BUILDS_PATH.read_text(encoding="utf-8") != canonical:
        BUILDS_PATH.write_text(canonical, encoding="utf-8")
        print("Normalized data/builds.json.")
    else:
        print(f"Validated {len(builds)} structured build records.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
