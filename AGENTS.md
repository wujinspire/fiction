Paste article, translate it, then update the index.
In fiction indexes, keep numbered stories in reverse order within their section.
Use `scripts/translate.py` with the configured Gemini API for translations; do not translate manually.
When adding stories, update both English and Chinese indexes and sidebars.
`pov` means AI self-narration (English: `POV`; Chinese: `AI自述`) in `StoryFeatures`.
Apply it only to AI first-person narration; human first-person stories do not qualify.
`StoryFeatures` groups the home page into top-level sections: `new` (special rule: duplicates any `new`-badged story at the top), `long`, `pov`, then unbadged short stories.
Folders under `docs/` and `docs/zh/` mirror those sections: `novellas/`, `ai-pov/`, `short-stories/`.
Each folder is numbered on its own; a new story takes the next number in its folder.
`legacyLink` in `docs/.vitepress/theme/index.ts` redirects pre-restructure URLs; do not reuse it for new moves without checking its number range.
