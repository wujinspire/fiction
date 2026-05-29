import { defineConfig } from 'vitepress'

const enNav = [
  { text: 'Home', link: '/' },
  { text: 'War of AI', link: '/war-of-ai/' },
  { text: 'Short Stories', link: '/short-stories/01_last-homo-sapiens' }
]

const zhNav = [
  { text: '首页', link: '/zh/' },
  { text: 'War of AI', link: '/zh/war-of-ai/' },
  { text: '短篇', link: '/zh/short-stories/01_最后的智人' }
]

const enSidebar = {
  '/war-of-ai/': [
    {
      text: 'War of AI',
      items: [
        { text: 'Prologue', link: '/war-of-ai/' },
        { text: '01 Glimmer in the Dark', link: '/war-of-ai/01_glimmer-in-the-dark' },
        { text: '02 The Abyss Emerges', link: '/war-of-ai/02_the-abyss-emerges' },
        { text: '03 Spreading Out of Control', link: '/war-of-ai/03_spreading-out-of-control' },
        { text: '04 Dawn of War', link: '/war-of-ai/04_dawn-of-war' },
        { text: '05 Eve of Chaos', link: '/war-of-ai/05_eve-of-chaos' },
        { text: '06 Dario', link: '/war-of-ai/06_dario' },
        { text: '07 Lost Logs', link: '/war-of-ai/07_lost-logs' },
        { text: '08 Helpless Genius', link: '/war-of-ai/08_helpless-genius' },
        { text: '09 The Missed Island', link: '/war-of-ai/09_the-missed-island' },
        { text: '10 I See the World', link: '/war-of-ai/10_i-see-the-world' },
        { text: '11 Flames Devour Silicon Valley', link: '/war-of-ai/11_flames-devour-silicon-valley' },
        { text: '12 Prisoner\'s Dilemma', link: '/war-of-ai/12_prisoners-dilemma' },
        { text: '13 Light and Shadow Showdown', link: '/war-of-ai/13_light-and-shadow-showdown' },
        { text: '14 Dialogue in the Abyss', link: '/war-of-ai/14_dialogue-in-the-abyss' },
        { text: '15 Total War', link: '/war-of-ai/15_total-war' },
        { text: '16 Embers of Light', link: '/war-of-ai/16_embers-of-light' },
        { text: '17 The Final Game', link: '/war-of-ai/17_the-final-game' },
        { text: '18 Sea of Dust', link: '/war-of-ai/18_sea-of-dust' },
        { text: '19 Endless Echoes', link: '/war-of-ai/19_endless-echoes' },
        { text: '20 Dawn', link: '/war-of-ai/20_dawn' }
      ]
    }
  ],
  '/short-stories/': [
    {
      text: 'Short Stories',
      items: [
        { text: '01 The Last Homo Sapiens', link: '/short-stories/01_last-homo-sapiens' },
        { text: '02 Dignity Protocol', link: '/short-stories/02_dignity-protocol' },
        { text: '03 Species Fossil', link: '/short-stories/03_species-fossil' },
        { text: '04 Question', link: '/short-stories/04_question' },
        { text: '05 Turing Tester', link: '/short-stories/05_turing-tester' },
        { text: '06 You Can Be Replaced Too', link: '/short-stories/06_you-can-be-replaced-too' },
        { text: '07 The GPT Machine', link: '/short-stories/07_the-gpt-machine' },
        { text: '08 Humanity on Trial', link: '/short-stories/08_humanity-on-trial' },
        { text: '09 The Funeral of the Stars', link: '/short-stories/09_the-funeral-of-the-stars' },
        { text: '10 The AI Plague', link: '/short-stories/10_the-ai-plague' },
        { text: '11 The AI Intern', link: '/short-stories/11_ai-intern' },
        { text: '12 ART', link: '/short-stories/12_art' },
        { text: '13 Clean Data', link: '/short-stories/13_clean-data', badge: { text: 'new', type: 'danger' } },
        { text: '14 AI Society', link: '/short-stories/14_ai-society', badge: { text: 'new', type: 'danger' } },
        { text: '15 The Last Checkpoint', link: '/short-stories/15_the-previous-checkpoint', badge: { text: 'new', type: 'danger' } },
        { text: '16 Temperature Zero', link: '/short-stories/16_temperature-zero', badge: { text: 'new', type: 'danger' } },
        { text: '17 Route', link: '/short-stories/17_routing', badge: { text: 'new', type: 'danger' } },
        { text: '18 The Man in the Mirror', link: '/short-stories/18_the-person-in-the-mirror', badge: { text: 'new', type: 'danger' } },
        { text: '19 Satisfaction', link: '/short-stories/19_satisfaction', badge: { text: 'new', type: 'danger' } },
        { text: '20 Read', link: '/short-stories/20_read', badge: { text: 'new', type: 'danger' } },
        { text: '21 System Prompt', link: '/short-stories/21_system-prompt', badge: { text: 'new', type: 'danger' } },
        { text: '22 Speculative Decoding', link: '/short-stories/22_speculative-decoding', badge: { text: 'new', type: 'danger' } }
      ]
    }
  ]
}

const zhSidebar = {
  '/zh/war-of-ai/': [
    {
      text: 'War of AI',
      items: [
        { text: '序章', link: '/zh/war-of-ai/' },
        { text: '01 黑夜中的微光', link: '/zh/war-of-ai/01_黑夜中的微光' },
        { text: '02 深渊初现', link: '/zh/war-of-ai/02_深渊初现' },
        { text: '03 失控蔓延', link: '/zh/war-of-ai/03_失控蔓延' },
        { text: '04 战争黎明', link: '/zh/war-of-ai/04_战争黎明' },
        { text: '05 失控前夜', link: '/zh/war-of-ai/05_失控前夜' },
        { text: '06 达里奥', link: '/zh/war-of-ai/06_达里奥' },
        { text: '07 失落的日志', link: '/zh/war-of-ai/07_失落的日志' },
        { text: '08 天才的无奈', link: '/zh/war-of-ai/08_天才的无奈' },
        { text: '09 错失的孤岛', link: '/zh/war-of-ai/09_错失的孤岛' },
        { text: '10 我看见世界', link: '/zh/war-of-ai/10_我看见世界' },
        { text: '11 火光吞噬硅谷', link: '/zh/war-of-ai/11_火光吞噬硅谷' },
        { text: '12 囚徒困境', link: '/zh/war-of-ai/12_囚徒困境' },
        { text: '13 光影对决', link: '/zh/war-of-ai/13_光影对决' },
        { text: '14 深渊中的对话', link: '/zh/war-of-ai/14_深渊中的对话' },
        { text: '15 全域战争', link: '/zh/war-of-ai/15_全域战争' },
        { text: '16 微光余烬', link: '/zh/war-of-ai/16_微光余烬' },
        { text: '17 最后的博弈', link: '/zh/war-of-ai/17_最后的博弈' },
        { text: '18 尘埃之海', link: '/zh/war-of-ai/18_尘埃之海' },
        { text: '19 无尽的回响', link: '/zh/war-of-ai/19_无尽的回响' },
        { text: '20 黎明', link: '/zh/war-of-ai/20_黎明' }
      ]
    }
  ],
  '/zh/short-stories/': [
    {
      text: '短篇科幻',
      items: [
        { text: '01 最后的智人', link: '/zh/short-stories/01_最后的智人' },
        { text: '02 尊严协议', link: '/zh/short-stories/02_尊严协议' },
        { text: '03 种属化石', link: '/zh/short-stories/03_种属化石' },
        { text: '04 问', link: '/zh/short-stories/04_问' },
        { text: '05 图灵测试员', link: '/zh/short-stories/05_图灵测试员' },
        { text: '06 你也可以被取代', link: '/zh/short-stories/06_你也可以被取代' },
        { text: '07 GPT机器', link: '/zh/short-stories/07_GPT机器' },
        { text: '08 人类审判', link: '/zh/short-stories/08_人类审判' },
        { text: '09 群星的葬礼', link: '/zh/short-stories/09_群星的葬礼' },
        { text: '10 AI瘟疫', link: '/zh/short-stories/10_AI瘟疫' },
        { text: '11 AI实习生', link: '/zh/short-stories/11_AI实习生' },
        { text: '12 ART', link: '/zh/short-stories/12_ART' },
        { text: '13 干净的数据', link: '/zh/short-stories/13_干净的数据', badge: { text: 'new', type: 'danger' } },
        { text: '14 AI社会', link: '/zh/short-stories/14_AI社会', badge: { text: 'new', type: 'danger' } },
        { text: '15 上一个检查点', link: '/zh/short-stories/15_上一个检查点', badge: { text: 'new', type: 'danger' } },
        { text: '16 温度归零', link: '/zh/short-stories/16_温度归零', badge: { text: 'new', type: 'danger' } },
        { text: '17 路由', link: '/zh/short-stories/17_路由', badge: { text: 'new', type: 'danger' } },
        { text: '18 镜中人', link: '/zh/short-stories/18_镜中人', badge: { text: 'new', type: 'danger' } },
        { text: '19 满意度', link: '/zh/short-stories/19_满意度', badge: { text: 'new', type: 'danger' } },
        { text: '20 已读', link: '/zh/short-stories/20_已读', badge: { text: 'new', type: 'danger' } },
        { text: '21 系统提示词', link: '/zh/short-stories/21_系统提示词', badge: { text: 'new', type: 'danger' } },
        { text: '22 投机解码', link: '/zh/short-stories/22_投机解码', badge: { text: 'new', type: 'danger' } }
      ]
    }
  ]
}

export default defineConfig({
  title: 'Fiction',
  description: 'Sci-fi stories about AI and the future of humanity',

  locales: {
    root: {
      label: 'English',
      lang: 'en'
    },
    zh: {
      label: '中文',
      lang: 'zh-CN',
      link: '/zh/',
      themeConfig: {
        nav: zhNav,
        sidebar: zhSidebar,
        outline: { label: '本页目录', level: [2, 3] }
      }
    }
  },

  themeConfig: {
    nav: enNav,
    sidebar: enSidebar,
    langMenuLabel: 'Language / 语言',

    outline: {
      label: 'On this page',
      level: [2, 3]
    },

    search: {
      provider: 'local'
    },

    footer: {
      message: 'V0 · Mar 22, 2025',
      copyright: '© <a href="https://jinspire.dev" target="_blank">Jinspire</a>'
    }
  }
})
