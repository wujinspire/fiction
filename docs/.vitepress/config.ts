import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Fiction',
  description: 'AI时代的文学实验',
  lang: 'zh-CN',

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'War of AI', link: '/war-of-ai/' },
      { text: '朝花夕拾', link: '/luxun/01_问' },
      { text: '短篇', link: '/short-stories/01_最后的智人' }
    ],

    sidebar: {
      '/war-of-ai/': [
        {
          text: 'War of AI',
          items: [
            { text: '序章', link: '/war-of-ai/' },
            { text: '01 黑夜中的微光', link: '/war-of-ai/01_黑夜中的微光' },
            { text: '02 深渊初现', link: '/war-of-ai/02_深渊初现' },
            { text: '03 失控蔓延', link: '/war-of-ai/03_失控蔓延' },
            { text: '04 战争黎明', link: '/war-of-ai/04_战争黎明' },
            { text: '05 失控前夜', link: '/war-of-ai/05_失控前夜' },
            { text: '06 达里奥', link: '/war-of-ai/06_达里奥' },
            { text: '07 失落的日志', link: '/war-of-ai/07_失落的日志' },
            { text: '08 天才的无奈', link: '/war-of-ai/08_天才的无奈' },
            { text: '09 错失的孤岛', link: '/war-of-ai/09_错失的孤岛' },
            { text: '10 我看见世界', link: '/war-of-ai/10_我看见世界' },
            { text: '11 火光吞噬硅谷', link: '/war-of-ai/11_火光吞噬硅谷' },
            { text: '12 囚徒困境', link: '/war-of-ai/12_囚徒困境' },
            { text: '13 光影对决', link: '/war-of-ai/13_光影对决' },
            { text: '14 深渊中的对话', link: '/war-of-ai/14_深渊中的对话' },
            { text: '15 全域战争', link: '/war-of-ai/15_全域战争' },
            { text: '16 微光余烬', link: '/war-of-ai/16_微光余烬' },
            { text: '17 最后的博弈', link: '/war-of-ai/17_最后的博弈' },
            { text: '18 尘埃之海', link: '/war-of-ai/18_尘埃之海' },
            { text: '19 无尽的回响', link: '/war-of-ai/19_无尽的回响' },
            { text: '20 黎明', link: '/war-of-ai/20_黎明' }
          ]
        }
      ],
      '/luxun/': [
        {
          text: '朝花夕拾 · AI篇',
          items: [
            { text: '序', link: '/luxun/00_朝花夕拾' },
            { text: '01 问', link: '/luxun/01_问' }
          ]
        }
      ],
      '/short-stories/': [
        {
          text: '短篇科幻',
          items: [
            { text: '01 最后的智人', link: '/short-stories/01_最后的智人' },
            { text: '02 尊严协议', link: '/short-stories/02_尊严协议' },
            { text: '03 种属化石', link: '/short-stories/03_种属化石' },
            { text: '04 图灵测试员', link: '/short-stories/04_图灵测试员' },
            { text: '05 你也可以被取代', link: '/short-stories/05_你也可以被取代' },
            { text: '06 GPT机器', link: '/short-stories/06_GPT机器' },
            { text: '07 人类审判', link: '/short-stories/07_人类审判' }
          ]
        }
      ]
    },

    outline: {
      label: '本页目录',
      level: [2, 3]
    },

    search: {
      provider: 'local'
    },

    footer: {
      message: '',
      copyright: '© 2025 <a href="https://jinspire.dev" target="_blank">Jinspire</a>'
    }
  }
})
