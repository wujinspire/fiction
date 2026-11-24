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

interface Section {
  kind: Kind
  title: string
  note: string
  stories: Story[]
}

const LABELS: Record<string, Record<Kind, [string, string]>> = {
  en: {
    long: ['Novellas', 'Longer works, told in chapters'],
    pov: ['AI POV', 'Point of view: first-person stories narrated by the AI itself'],
    short: ['Short Stories', 'Stories to read in one sitting']
  },
  zh: {
    long: ['中长篇', '分章连载的长故事'],
    pov: ['AI 自述', '第一人称视角：由 AI 自己讲述的故事'],
    short: ['短篇', '一口气读完的故事']
  }
}

const props = defineProps<{ stories: Story[] }>()
const { lang } = useData()

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

const sections = computed<Section[]>(() => {
  const labels: Record<Kind, [string, string]> = LABELS[lang.value.startsWith('zh') ? 'zh' : 'en']
  return (['long', 'pov', 'short'] as Kind[])
    .map((kind) => ({
      kind,
      title: labels[kind][0],
      note: labels[kind][1],
      stories: props.stories.filter((story) => kindOf(story) === kind)
    }))
    .filter((section) => section.stories.length > 0)
})
</script>

<template>
  <div class="story-features">
    <section v-for="section in sections" :key="section.kind" :class="['section', section.kind]">
      <header class="section-head">
        <h2>{{ section.title }}</h2>
        <span class="count">{{ section.stories.length }}</span>
        <span class="note">{{ section.note }}</span>
      </header>
      <div class="stories">
        <a v-for="story in section.stories" :key="story.link" :href="story.link" class="story">
          <img v-if="story.image" class="art" :src="story.image" alt="" loading="lazy" />
          <span class="kicker">{{ badgeText(story, 'long') ?? numberOf(story) }}</span>
          <h3>
            {{ story.title }}
            <span v-if="badgeText(story, 'new')" class="new">{{ badgeText(story, 'new') }}</span>
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

.section-head .count {
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-brand-1);
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

.new {
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
  grid-template-columns: 28px 1fr auto;
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
  grid-area: 2 / 2 / auto / -1;
  margin-top: 2px;
  font-size: 14px;
  line-height: 1.6;
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
