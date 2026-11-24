<script setup lang="ts">
import { useData } from 'vitepress'
import { computed } from 'vue'

interface Story {
  title: string
  details: string
  date: string
  link: string
  image?: string
  badge?: Badge
  badges?: Badge[]
}

interface Badge {
  text: string
  type: 'new' | 'long' | 'pov'
}

type Kind = 'long' | 'pov' | 'short'
type SectionKind = 'new' | Kind

interface Section {
  kind: SectionKind
  title: string
  note: string
  stories: Story[]
}

const LABELS: Record<string, Record<SectionKind, [string, string]>> = {
  en: {
    new: ['New', 'Recently published'],
    long: ['Novellas', 'Longer works, told in chapters'],
    pov: ['AI POV', 'Point of view: first-person stories narrated by the AI itself'],
    short: ['Short Stories', 'Stories to read in one sitting']
  },
  zh: {
    new: ['新作', '最新发布的故事'],
    long: ['中长篇', '分章连载的长故事'],
    pov: ['AI 自述', '第一人称视角：由 AI 自己讲述的故事'],
    short: ['短篇', '一口气读完的故事']
  }
}

const KIND_KICKER: Record<string, Record<Kind, string>> = {
  en: { long: 'Novella', pov: 'AI POV', short: 'Short Story' },
  zh: { long: '中长篇', pov: 'AI 自述', short: '短篇' }
}

const props = defineProps<{ stories: Story[] }>()
const { lang } = useData()
const locale = computed<'zh' | 'en'>(() => (lang.value.startsWith('zh') ? 'zh' : 'en'))

function badgesOf(story: Story): Badge[] {
  return story.badges ?? (story.badge ? [story.badge] : [])
}

function kindOf(story: Story): Kind {
  const types: string[] = badgesOf(story).map((badge) => badge.type)
  if (types.includes('long')) return 'long'
  return types.includes('pov') ? 'pov' : 'short'
}

function badgeText(story: Story, type: Badge['type']): string | undefined {
  return badgesOf(story).find((badge) => badge.type === type)?.text
}

function numberOf(story: Story): string | undefined {
  return story.link.match(/\/(\d+)_/)?.[1]
}

function kickerOf(story: Story, sectionKind: SectionKind): string | undefined {
  if (sectionKind === 'new') {
    const base: string = badgeText(story, 'long') ?? KIND_KICKER[locale.value][kindOf(story)]
    const num: string | undefined = numberOf(story)
    return num ? `${base} · ${num}` : base
  }
  return badgeText(story, 'long') ?? numberOf(story)
}

const summary = computed<string>(() => {
  const counts: Record<Kind, number> = { long: 0, pov: 0, short: 0 }
  for (const story of props.stories) counts[kindOf(story)]++
  const total: number = props.stories.length
  if (locale.value === 'zh') {
    return `总计 ${total} 篇 · 中长篇 ${counts.long} 部 · AI 自述 ${counts.pov} 篇 · 短篇 ${counts.short} 篇`
  }
  return `${total} works in total · ${counts.long} novellas · ${counts.pov} AI POV · ${counts.short} short stories`
})

const sections = computed<Section[]>(() => {
  const labels: Record<SectionKind, [string, string]> = LABELS[locale.value]
  const storiesFor = (kind: SectionKind): Story[] =>
    kind === 'new'
      ? props.stories.filter((story) => Boolean(badgeText(story, 'new')))
      : props.stories.filter((story) => kindOf(story) === kind)

  return (['new', 'long', 'pov', 'short'] as SectionKind[])
    .map((kind) => ({
      kind,
      title: labels[kind][0],
      note: labels[kind][1],
      stories: storiesFor(kind)
    }))
    .filter((section) => section.stories.length > 0)
})
</script>

<template>
  <div class="story-features">
    <p class="catalog-summary">{{ summary }}</p>
    <section v-for="section in sections" :key="section.kind" :class="['section', section.kind]">
      <header class="section-head">
        <h2>{{ section.title }}</h2>
        <span class="note">{{ section.note }}</span>
      </header>
      <div class="stories">
        <a v-for="story in section.stories" :key="story.link" :href="story.link" class="story">
          <img
            v-if="story.image"
            class="art"
            :src="story.image"
            alt=""
            loading="lazy"
          />
          <span class="kicker">{{ kickerOf(story, section.kind) }}</span>
          <h3>
            {{ story.title }}
            <span v-if="section.kind !== 'new' && badgeText(story, 'new')" class="new-pill">
              {{ badgeText(story, 'new') }}
            </span>
          </h3>
          <p class="details">{{ story.details }}</p>
          <span class="date">{{ story.date }}</span>
        </a>
      </div>
    </section>
  </div>
</template>

<style scoped>
.story-features {
  padding-bottom: 48px;
}

.catalog-summary {
  margin: 0 0 40px;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 14px;
  font-size: 13px;
  line-height: 20px;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-3);
}

.section + .section {
  margin-top: 64px;
}

.section-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 4px 10px;
  margin-bottom: 20px;
}

.section-head h2 {
  margin: 0;
  border: 0;
  padding: 0;
  font-family: var(--fiction-serif);
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: 0;
}

.section-head .note {
  flex-basis: 100%;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.story {
  color: inherit;
  font-weight: 400;
  text-decoration: none;
}

.story h3 {
  margin: 0;
  font-family: var(--fiction-serif);
  font-weight: 700;
  letter-spacing: 0;
  color: var(--vp-c-text-1);
  transition: color 0.2s;
}

.story:hover h3 {
  color: var(--vp-c-brand-1);
}

.new-pill {
  margin-left: 6px;
  border-radius: 3px;
  padding: 2px 6px;
  font-family: var(--vp-font-family-base);
  font-size: 11px;
  font-weight: 600;
  vertical-align: middle;
  color: var(--vp-c-bg);
  background: var(--vp-c-brand-1);
}

.details {
  margin: 0;
  color: var(--vp-c-text-2);
  text-wrap: pretty;
}

.kicker,
.date {
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-3);
}

/* Featured new: top-level highlight card(s) */
.new .stories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.new .story {
  display: grid;
  grid-template-columns: 1fr auto auto;
  column-gap: 20px;
  align-items: baseline;
  align-content: start;
  border: 1px solid var(--vp-c-divider);
  border-left: 3px solid var(--vp-c-brand-1);
  border-radius: 6px;
  padding: 24px 28px;
  background: var(--vp-c-bg-elv);
  transition:
    border-color 0.2s,
    transform 0.2s,
    box-shadow 0.2s;
}

.new .story h3 {
  grid-column: 1 / 3;
  margin-top: 8px;
  font-size: 24px;
  line-height: 34px;
}

.new .details {
  grid-column: 1 / 3;
  margin-top: 8px;
  font-size: 15px;
  line-height: 1.7;
}

.new .date {
  grid-area: 1 / 2;
}

.new .art,
.pov .art,
.short .art {
  align-self: start;
  max-width: none;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  border-radius: 4px;
}

.new .art {
  grid-area: 1 / 3 / span 3 / 4;
  width: 150px;
}

/* Novellas: large cards */
.long .stories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.long .story {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 28px 28px 24px;
  background: var(--vp-c-bg-elv);
  transition:
    border-color 0.2s,
    transform 0.2s,
    box-shadow 0.2s;
}

.new .story:hover,
.long .story:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px -12px rgba(0, 0, 0, 0.25);
}

.long .art {
  margin: -28px -28px 24px;
  width: calc(100% + 56px);
  max-width: none;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  border-radius: 5px 5px 0 0;
}

.new .kicker,
.long .kicker {
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--vp-c-brand-1);
}

.long .story h3 {
  margin-top: 10px;
  font-size: 26px;
  line-height: 36px;
}

.long .details {
  flex: 1;
  margin-top: 12px;
  font-size: 15px;
  line-height: 1.7;
}

.long .date {
  margin-top: 24px;
}

/* Short stories: numbered contents list */
.pov .stories,
.short .stories {
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 56px;
}

@media (min-width: 768px) {
  .pov .stories,
  .short .stories {
    grid-template-columns: repeat(2, 1fr);
  }
}

.pov .story,
.short .story {
  display: grid;
  grid-template-columns: 28px 1fr auto auto;
  column-gap: 12px;
  align-items: baseline;
  align-content: start;
  border-top: 1px solid var(--vp-c-divider);
  padding: 16px 0 18px;
}

.pov .story h3,
.short .story h3 {
  font-size: 18px;
  line-height: 28px;
}

.pov .date,
.short .date {
  grid-area: 1 / 3;
}

.pov .details,
.short .details {
  grid-area: 2 / 2 / auto / 4;
  margin-top: 2px;
  font-size: 14px;
  line-height: 1.6;
}

.pov .art,
.short .art {
  grid-area: 1 / 4 / span 2 / 5;
  margin: 4px 0 0 4px;
  width: 96px;
}

@media (max-width: 1100px) {
  .pov .date,
  .short .date {
    grid-area: 3 / 2;
    margin-top: 4px;
  }
}

@media (max-width: 640px) {
  .new .art {
    width: 96px;
  }

  .pov .art,
  .short .art {
    width: 72px;
  }
}

.pov .kicker,
.short .kicker {
  font-size: 13px;
}

.pov .story:hover .kicker,
.short .story:hover .kicker {
  color: var(--vp-c-brand-1);
}
</style>
