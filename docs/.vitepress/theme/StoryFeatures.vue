<script setup lang="ts">
interface Story {
  title: string
  details: string
  date: string
  link: string
  badge?: Badge
  badges?: Badge[]
}

interface Badge {
  text: string
  type: 'new' | 'long' | 'ai'
}

defineProps<{ stories: Story[] }>()
</script>

<template>
  <div class="story-features">
    <a v-for="story in stories" :key="story.title" :href="story.link" class="story-card">
      <h3>
        {{ story.title }}
        <span
          v-for="badge in story.badges ?? (story.badge ? [story.badge] : [])"
          :key="`${story.title}-${badge.text}`"
          :class="['badge', badge.type]"
        >
          {{ badge.text }}
        </span>
      </h3>
      <p class="details">{{ story.details }}</p>
      <span class="date">{{ story.date }}</span>
    </a>
  </div>
</template>

<style scoped>
.story-features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 24px 0;
}

@media (max-width: 768px) {
  .story-features {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .story-features {
    grid-template-columns: repeat(2, 1fr);
  }
}

.story-card {
  display: flex;
  flex-direction: column;
  padding: 24px;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: background 0.2s;
}

.story-card:hover {
  background: var(--vp-c-bg-mute);
}

.story-card h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.badge {
  margin-left: 8px;
  font-size: 12px;
  font-weight: 700;
  font-style: italic;
}

.badge.new {
  color: var(--vp-c-danger-1);
}

.badge.long {
  color: var(--vp-c-brand-1);
}

.badge.ai {
  color: var(--vp-c-warning-1);
}

.story-card .details {
  margin: 0;
  flex: 1;
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.story-card .date {
  margin-top: 12px;
  font-size: 12px;
  font-style: italic;
  color: var(--vp-c-text-3);
}
</style>
