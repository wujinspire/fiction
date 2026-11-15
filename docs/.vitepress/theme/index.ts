import type { EnhanceAppContext, SiteData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import StoryFeatures from './StoryFeatures.vue'
import './custom.css'

type Sidebar = Record<string, { items: { link: string }[] }[]>

/** Map the path VitePress builds on language switch to the translated page's real path. */
function buildLangLinks(site: SiteData): Record<string, string> {
  const enSidebar: Sidebar = site.themeConfig.sidebar
  const zhSidebar: Sidebar = site.locales.zh.themeConfig.sidebar
  const links: Record<string, string> = {}
  for (const [prefix, groups] of Object.entries(enSidebar)) {
    const zhItems: { link: string }[] = zhSidebar[`/zh${prefix}`][0].items
    groups[0].items.forEach((item, i) => {
      const zhLink: string = zhItems[i].link
      if (zhLink === `/zh${item.link}`) return
      links[`/zh${item.link}`] = zhLink
      links[zhLink.slice('/zh'.length)] = item.link
    })
  }
  return links
}

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }: EnhanceAppContext) {
    app.component('StoryFeatures', StoryFeatures)

    const langLinks: Record<string, string> = buildLangLinks(siteData.value)
    router.onBeforeRouteChange = async (to: string) => {
      const path: string = decodeURIComponent(to.split(/[?#]/)[0]).replace(/\.html$/, '')
      const target: string | undefined = langLinks[path]
      if (!target) return
      // First load has the 404 page's HTML, which can't hydrate into the story.
      if (router.route.component) await router.go(target)
      else location.replace(`${target}.html`)
      return false
    }
  }
}
