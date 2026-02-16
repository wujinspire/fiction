#!/usr/bin/env python3
"""Validate that all story files are included in the VitePress sidebar config."""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
DOCS_DIR = ROOT / "docs"
CONFIG_FILE = DOCS_DIR / ".vitepress" / "config.ts"

SECTIONS = [
    ("war-of-ai", "/war-of-ai/"),
    ("war-of-ai", "/zh/war-of-ai/"),
    ("short-stories", "/short-stories/"),
    ("short-stories", "/zh/short-stories/"),
]


def extract_sidebar_links(config_text: str, prefix: str) -> set[str]:
    """Extract all sidebar links with given prefix from config."""
    pattern = rf"link:\s*['\"]({re.escape(prefix)}[^'\"]+)['\"]"
    matches = re.findall(pattern, config_text)
    return set(matches)


def get_md_files(subdir: str, is_zh: bool) -> set[str]:
    """Get all .md files in directory as link paths."""
    base = DOCS_DIR / ("zh" if is_zh else "") / subdir
    if not base.exists():
        return set()
    prefix = f"/zh/{subdir}/" if is_zh else f"/{subdir}/"
    files = set()
    for f in base.glob("*.md"):
        if f.name == "index.md" or f.name.startswith("00_"):
            continue
        link = prefix + f.stem
        files.add(link)
    return files


def validate() -> bool:
    """Validate all story files are in sidebar. Returns True if valid."""
    config_text = CONFIG_FILE.read_text(encoding="utf-8")
    errors: list[str] = []

    for subdir, prefix in SECTIONS:
        is_zh = prefix.startswith("/zh/")
        sidebar_links = extract_sidebar_links(config_text, prefix)
        file_links = get_md_files(subdir, is_zh)

        # Skip prologue/index links
        sidebar_links = {l for l in sidebar_links if not l.endswith("/")}

        missing_in_sidebar = file_links - sidebar_links
        missing_files = sidebar_links - file_links

        if missing_in_sidebar:
            errors.append(f"❌ [{prefix}] Files not in sidebar:")
            for link in sorted(missing_in_sidebar):
                errors.append(f"     {link}")

        if missing_files:
            errors.append(f"❌ [{prefix}] Sidebar links without files:")
            for link in sorted(missing_files):
                errors.append(f"     {link}")

    if errors:
        print("🔍 Index validation failed:\n")
        for e in errors:
            print(e)
        return False

    print("✅ All story files are indexed in sidebar")
    return True


def main():
    if not validate():
        sys.exit(1)


if __name__ == "__main__":
    main()
