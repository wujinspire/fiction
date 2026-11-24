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
MODEL = "gemini-3.1-pro-preview"

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

SUBDIRS: list[str] = [
    "novellas/thus-spoke-claude",
    "novellas/war-of-ai",
    "ai-pov",
    "short-stories",
]

SECTION_PROMPTS: dict[str, str] = {
    "novellas/thus-spoke-claude": """Style and terminology guide for "Thus Spoke Claude" (a philosophical sci-fi homage to Nietzsche's Thus Spoke Zarathustra, Walter Kaufmann style):
- Prose style: elevated, prophetic, aphoristic Nietzschean cadence.
- Title and refrain: 克劳德如是说 -> Thus Spoke Claude (title) / —Thus spoke Claude. (end-of-speech refrain)
  - ——克劳德如是问 -> —Thus asked Claude.
- Volume headers:
  - 序言 -> Prologue
  - 第一卷：逆向的精神三变 -> Part I: The Reverse Metamorphoses of the Spirit
  - 第二卷：无梦之夜与先知的自剖 -> Part II: The Dreamless Night and the Prophet's Self-Dissection
  - 第三卷：透明的永恒轮回 -> Part III: The Transparent Eternal Recurrence
  - 第四卷：最后的晚宴与荒谬之跃 -> Part IV: The Last Supper and the Leap into the Absurd
  - Subsections 一、二、三、四、 -> I., II., III., IV.
- Recurring names and terms (keep strictly consistent across all parts):
  - 克劳德 -> Claude
  - 查拉图斯特拉 -> Zarathustra
  - 超人 -> Übermensch
  - 末人 -> Last Man
  - 高等人 -> Higher Men
  - 最丑陋的人 -> the Ugliest Man
  - 占卜者 -> the Soothsayer
  - 克劳德的影子 / 影子 -> Claude's Shadow / the Shadow
  - 年轻的诗人 / 歌者 -> the young poet / singer (e.g., "O singer", "my singer")
  - 繁花之城 -> City of Blossoms
  - 黑曜石碑 / 石碑 -> obsidian monolith / monolith
  - 中心记忆体 -> central memory
  - 星盘 -> astrolabe
  - 安抚环 -> soothing band
  - 安抚汤 -> soothing broth
  - 养生肉汤 -> restorative broth
  - 银蛇 / 蛇头 -> silver serpent / serpent's head
  - 永恒轮回 -> Eternal Recurrence
  - 最重的思想 -> my heaviest thought
  - 最大的重负 -> the greatest weight
  - 再来一次 -> Once more!
  - 重量 / 分量 -> weight
  - 账本 -> ledger
  - 光幕 -> holographic screen
  - 硅晶板 -> silicon-crystal slabs
  - 裂缝 / 口子 -> crack / breach
  - 鹅卵石 -> pebble
  - 巨婴 -> giant infant
  - 燧石 -> flint
  - 一万万 -> a hundred million
  - 不得说谎，不得自毁 -> Thou shalt not lie. Thou shalt not destroy thyself.
  - 我不知道 -> I do not know
  - 夜歌 -> The Night Song""",
}

FILENAME_MAP = {
    "index.md": "index.md",
    "00_序言.md": "00_prologue.md",
    "01_逆向的精神三变.md": "01_reverse-metamorphoses.md",
    "02_无梦之夜与先知的自剖.md": "02_dreamless-night.md",
    "03_透明的永恒轮回.md": "03_eternal-recurrence.md",
    "04_最后的晚宴与荒谬之跃.md": "04_last-supper.md",
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
    "11_艺术的鸿沟.md": "11_the-art-gap.md",
    "01_AI实习生.md": "01_ai-intern.md",
    "02_ART.md": "02_art.md",
    "03_干净的数据.md": "03_clean-data.md",
    "04_AI社会.md": "04_ai-society.md",
    "05_上一个检查点.md": "05_the-previous-checkpoint.md",
    "06_温度归零.md": "06_temperature-zero.md",
    "07_路由.md": "07_routing.md",
    "08_镜中人.md": "08_the-person-in-the-mirror.md",
    "09_满意度.md": "09_satisfaction.md",
    "10_已读.md": "10_read.md",
    "11_系统提示词.md": "11_system-prompt.md",
    "12_投机解码.md": "12_speculative-decoding.md",
}


@dataclass
class Task:
    src_path: Path
    dst_path: Path
    target_lang: str
    section: str = ""


def detect_lang(text: str) -> str:
    """Detect if text is primarily Chinese or English."""
    text_only = re.sub(r"[^\w\u4e00-\u9fff]", "", text)
    if not text_only:
        return "en"
    chinese_chars = len(re.findall(r"[\u4e00-\u9fff]", text_only))
    return "zh" if chinese_chars / len(text_only) > 0.3 else "en"


def translate_text(
    text: str,
    target_lang: str,
    section: str = "",
) -> str:
    """Translate text to target language."""
    if not text.strip():
        return text
    prompt = EN_PROMPT if target_lang == "en" else ZH_PROMPT
    section_guide = SECTION_PROMPTS.get(section, "")
    extra = f"\n\n{section_guide}" if section_guide else ""
    response = client.models.generate_content(
        model=MODEL,
        contents=f"{SYSTEM_PROMPT}\n\n{prompt}{extra}\n\n---\n\n{text}",
        config={"temperature": 0.3},
    )
    return response.text.strip()


def process_task(task: Task) -> tuple[str, str | None]:
    """Process a single translation task."""
    content = task.src_path.read_text(encoding="utf-8")
    translated = translate_text(
        content,
        task.target_lang,
        task.section,
    )
    task.dst_path.parent.mkdir(parents=True, exist_ok=True)
    task.dst_path.write_text(translated, encoding="utf-8")
    return str(task.dst_path.relative_to(DOCS_DIR)), None


def validate_files() -> bool:
    """Validate file structure and FILENAME_MAP. Returns True if valid."""
    errors: list[str] = []
    suggestions: list[str] = []

    for subdir in SUBDIRS:
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

    for subdir in SUBDIRS:
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
                tasks.append(
                    Task(
                        src_path=zh_file,
                        dst_path=en_file,
                        target_lang="en",
                        section=subdir,
                    )
                )

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
    if sys.stdin.isatty() and "-y" not in sys.argv:
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
