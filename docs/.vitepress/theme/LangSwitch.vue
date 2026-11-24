<script setup lang="ts">
import { useData } from 'vitepress'
import { computed } from 'vue'

const { lang, page, hash } = useData()
const isZh = computed<boolean>(() => lang.value.startsWith('zh'))

const otherLink = computed<string>(() => {
  const path: string = `/${page.value.relativePath}`
    .replace(/\/index\.md$/, '/')
    .replace(/\.md$/, '.html')
  return (isZh.value ? path.replace(/^\/zh/, '') : `/zh${path}`) + hash.value
})
</script>

<template>
  <nav class="lang-switch" aria-label="Language / 语言">
    <component :is="isZh ? 'a' : 'span'" :href="isZh ? otherLink : undefined" lang="en">
      EN
    </component>
    <component :is="isZh ? 'span' : 'a'" :href="isZh ? undefined : otherLink" lang="zh-CN">
      中文
    </component>
  </nav>
</template>

<style scoped>
.lang-switch {
  display: flex;
  align-self: center;
  margin-left: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  padding: 2px;
  font-size: 13px;
  font-weight: 600;
  line-height: 26px;
  white-space: nowrap;
  background: var(--vp-c-bg-soft);
}

.lang-switch > * {
  border-radius: 999px;
  padding: 0 10px;
  color: var(--vp-c-text-2);
  transition: color 0.2s;
}

.lang-switch span {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-elv);
  box-shadow: 0 0 0 1px var(--vp-c-divider);
}

.lang-switch a:hover {
  color: var(--vp-c-brand-1);
}
</style>
