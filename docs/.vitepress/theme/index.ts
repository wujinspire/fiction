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

/** Collect every page path listed in the sidebars. */
function buildPages(site: SiteData): Set<string> {
  const sidebars: Sidebar[] = [site.themeConfig.sidebar, site.locales.zh.themeConfig.sidebar]
  return new Set(
    sidebars.flatMap((sidebar) =>
      Object.values(sidebar).flatMap((groups) =>
        groups[0].items.map((item) => item.link.split('#')[0])
      )
    )
  )
}

/** Map a URL from before the section folders existed to the page's current path. */
function legacyLink(path: string, pages: Set<string>): string | undefined {
  const target: string = path
    .replace(/^(\/zh)?\/(thus-spoke-claude|war-of-ai|post-agi)/, '$1/novellas/$2')
    .replace(/^(\/zh)?\/short-stories\/(\d+)_/, (_, zh: string = '', n: string) => {
      const number: string = String(Number(n) - 10).padStart(2, '0')
      return `${zh}/ai-pov/${number}_`
    })
  return target !== path && pages.has(target) ? target : undefined
}

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }: EnhanceAppContext) {
    app.component('StoryFeatures', StoryFeatures)

    const langLinks: Record<string, string> = buildLangLinks(siteData.value)
    const pages: Set<string> = buildPages(siteData.value)
    router.onBeforeRouteChange = async (to: string) => {
      const [rawPath, hash = ''] = to.split('#')
      const path: string = decodeURIComponent(rawPath.split('?')[0]).replace(/\.html$/, '')
      const target: string | undefined = langLinks[path] ?? legacyLink(path, pages)
      if (!target) return
      const page: string = target.endsWith('/') ? target : `${target}.html`
      const href: string = hash ? `${page}#${hash}` : page
      // First load has the 404 page's HTML, which can't hydrate into the story.
      if (router.route.component) await router.go(href)
      else location.replace(href)
      return false
    }
  }
}
