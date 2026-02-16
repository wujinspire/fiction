#!/usr/bin/env python3
"""Translate fiction markdown files between English and Chinese using Gemini API."""

import os
import re
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from dataclasses import dataclass
from pathlib import Path

from dotenv import load_dotenv
from google import genai

ROOT = Path(__file__).parent.parent
DOCS_DIR = ROOT / "docs"
ZH_DIR = DOCS_DIR / "zh"

load_dotenv(ROOT.parent / ".env")

client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))
MODEL = "gemini-3-pro-preview"

SYSTEM_PROMPT = """You are a professional literary translator specializing in science fiction.
Translate the given story content while preserving:
- All markdown formatting, headers, emphasis, and structure
- The narrative voice, tone, and literary style
- Character names (keep original or transliterate appropriately)
- Technical terms related to AI and technology
Do not add or remove content. Return ONLY the translated text."""

EN_PROMPT = """Translate this Chinese sci-fi story to fluent, literary English.
Maintain the original's atmosphere and emotional impact.
Return ONLY the translated content, no explanations or notes."""

ZH_PROMPT = """Translate this English sci-fi story to fluent Chinese.
Maintain the original's atmosphere and emotional impact.
Return ONLY the translated content, no explanations or notes."""

FILENAME_MAP = {
    "index.md": "index.md",
    "00_War of AI.md": "00_war-of-ai.md",
    "01_黑夜中的微光.md": "01_glimmer-in-the-dark.md",
    "02_深渊初现.md": "02_the-abyss-emerges.md",
    "03_失控蔓延.md": "03_spreading-out-of-control.md",
    "04_战争黎明.md": "04_dawn-of-war.md",
    "05_失控前夜.md": "05_eve-of-chaos.md",
    "06_达里奥.md": "06_dario.md",
    "07_失落的日志.md": "07_lost-logs.md",
    "08_天才的无奈.md": "08_helpless-genius.md",
    "09_错失的孤岛.md": "09_the-missed-island.md",
    "10_我看见世界.md": "10_i-see-the-world.md",
    "11_火光吞噬硅谷.md": "11_flames-devour-silicon-valley.md",
    "12_囚徒困境.md": "12_prisoners-dilemma.md",
    "13_光影对决.md": "13_light-and-shadow-showdown.md",
    "14_深渊中的对话.md": "14_dialogue-in-the-abyss.md",
    "15_全域战争.md": "15_total-war.md",
    "16_微光余烬.md": "16_embers-of-light.md",
    "17_最后的博弈.md": "17_the-final-game.md",
    "18_尘埃之海.md": "18_sea-of-dust.md",
    "19_无尽的回响.md": "19_endless-echoes.md",
    "20_黎明.md": "20_dawn.md",
    "01_最后的智人.md": "01_last-homo-sapiens.md",
    "02_尊严协议.md": "02_dignity-protocol.md",
    "03_种属化石.md": "03_species-fossil.md",
    "04_问.md": "04_question.md",
    "05_图灵测试员.md": "05_turing-tester.md",
    "06_你也可以被取代.md": "06_you-can-be-replaced-too.md",
    "07_GPT机器.md": "07_the-gpt-machine.md",
    "08_人类审判.md": "08_humanity-on-trial.md",
    "09_群星的葬礼.md": "09_the-funeral-of-the-stars.md",
    "10_AI瘟疫.md": "10_the-ai-plague.md",
}


@dataclass
class Task:
    src_path: Path
    dst_path: Path
    target_lang: str


def detect_lang(text: str) -> str:
    """Detect if text is primarily Chinese or English."""
    text_only = re.sub(r"[^\w\u4e00-\u9fff]", "", text)
    if not text_only:
        return "en"
    chinese_chars = len(re.findall(r"[\u4e00-\u9fff]", text_only))
    return "zh" if chinese_chars / len(text_only) > 0.3 else "en"


def translate_text(text: str, target_lang: str) -> str:
    """Translate text to target language."""
    if not text.strip():
        return text
    prompt = EN_PROMPT if target_lang == "en" else ZH_PROMPT
    response = client.models.generate_content(
        model=MODEL,
        contents=f"{SYSTEM_PROMPT}\n\n{prompt}\n\n---\n\n{text}",
        config={"temperature": 0.3},
    )
    return response.text.strip()


def process_task(task: Task) -> tuple[str, str | None]:
    """Process a single translation task."""
    content = task.src_path.read_text(encoding="utf-8")
    translated = translate_text(content, task.target_lang)
    task.dst_path.parent.mkdir(parents=True, exist_ok=True)
    task.dst_path.write_text(translated, encoding="utf-8")
    return str(task.dst_path.relative_to(DOCS_DIR)), None


def validate_files() -> bool:
    """Validate file structure and FILENAME_MAP. Returns True if valid."""
    errors: list[str] = []
    suggestions: list[str] = []

    for subdir in ["war-of-ai", "short-stories"]:
        zh_subdir = ZH_DIR / subdir
        en_subdir = DOCS_DIR / subdir

        if not zh_subdir.exists():
            errors.append(f"❌ zh/{subdir}/ folder does not exist")
            continue

        zh_files = sorted(f.name for f in zh_subdir.glob("*.md"))
        en_files = sorted(f.name for f in en_subdir.glob("*.md")) if en_subdir.exists() else []

        print(f"  [{subdir}] zh: {len(zh_files)} files, en: {len(en_files)} files")

        # Check for zh files not in FILENAME_MAP
        unmapped = [f for f in zh_files if f not in FILENAME_MAP]
        if unmapped:
            errors.append(f"❌ [{subdir}] {len(unmapped)} zh file(s) not in FILENAME_MAP:")
            for f in unmapped:
                errors.append(f"     {f}")
                slug = re.sub(r"^\d+_", "", f).replace(".md", "")
                suggestions.append(f'    "{f}": "{f.split("_")[0]}_{slug}.md",')

        # Check for orphaned en files (no corresponding zh)
        expected_en = {FILENAME_MAP.get(f, f) for f in zh_files}
        orphaned = [f for f in en_files if f not in expected_en]
        if orphaned:
            errors.append(f"❌ [{subdir}] {len(orphaned)} en file(s) without zh source:")
            for f in orphaned:
                errors.append(f"     {f}")

    if errors:
        print("\n🔍 Validation failed:\n")
        for e in errors:
            print(e)
        if suggestions:
            print("\n📝 Add to FILENAME_MAP:\n")
            for s in suggestions:
                print(s)
        return False

    print("\n  ✅ All files mapped correctly\n")
    return True


def scan_tasks() -> tuple[dict[str, list[dict]], list[Task]]:
    """Scan for files needing translation. Chinese -> English."""
    status: dict[str, list[dict]] = {}
    tasks: list[Task] = []

    for subdir in ["war-of-ai", "short-stories"]:
        zh_subdir = ZH_DIR / subdir
        en_subdir = DOCS_DIR / subdir
        en_subdir.mkdir(parents=True, exist_ok=True)
        status[subdir] = []

        for zh_file in sorted(zh_subdir.glob("*.md")):
            en_filename = FILENAME_MAP.get(zh_file.name, zh_file.name)
            en_file = en_subdir / en_filename

            exists = en_file.exists()
            status[subdir].append({"zh": zh_file.name, "en": en_filename, "exists": exists})

            if not exists:
                tasks.append(Task(src_path=zh_file, dst_path=en_file, target_lang="en"))

    return status, tasks


def print_status(status: dict[str, list[dict]], tasks: list[Task]) -> bool:
    """Print translation status. Returns True if there are pending tasks."""
    print("📋 Translation status (zh → en):\n")
    total_done = 0
    total_files = 0
    for section, files in status.items():
        done = sum(1 for f in files if f["exists"])
        total_done += done
        total_files += len(files)
        print(f"  [{section}] {done}/{len(files)}")
        for f in files:
            icon = "✅" if f["exists"] else "❓"
            print(f"    {icon} {f['zh']:30} → {f['en']}")
        print()

    print(f"Total: {total_done}/{total_files} translated")

    if not tasks:
        print("\n✅ All files are up to date")
        return False

    print(f"\nPending ({len(tasks)}):")
    for t in tasks:
        print(f"  ❓ {t.dst_path.relative_to(DOCS_DIR)}")
    return True


def translate(tasks: list[Task]):
    """Execute translation tasks."""
    input("\nPress Enter to start translation...")

    failed: list[tuple[str, str]] = []
    with ThreadPoolExecutor(max_workers=3) as executor:
        futures = {executor.submit(process_task, t): t for t in tasks}
        for future in as_completed(futures):
            task = futures[future]
            try:
                out_name, err = future.result()
                if err:
                    failed.append((out_name, err))
                    print(f"❌ {out_name}: {err}")
                else:
                    print(f"✅ {out_name}")
            except Exception as e:
                out_name = str(task.dst_path.relative_to(DOCS_DIR))
                failed.append((out_name, str(e)))
                print(f"❌ {out_name}: {e}")

    print(f"\nDone: {len(tasks) - len(failed)}/{len(tasks)}")
    if failed:
        print(f"\nFailed ({len(failed)}):")
        for name, err in failed:
            print(f"  {name}: {err}")


def main():
    if not os.environ.get("GEMINI_API_KEY"):
        print("❌ GEMINI_API_KEY not found in environment")
        sys.exit(1)

    print("🔍 Validating file structure...\n")
    if not validate_files():
        sys.exit(1)

    status, tasks = scan_tasks()
    if not any(status.values()):
        print("No source files found in zh/ folders")
        return

    if print_status(status, tasks):
        translate(tasks)


if __name__ == "__main__":
    main()
