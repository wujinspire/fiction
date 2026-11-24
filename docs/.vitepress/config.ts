import { defineConfig } from 'vitepress'

const enNav = [
  { text: 'Home', link: '/' },
  {
    text: 'Novellas',
    activeMatch: '/novellas/',
    items: [
      { text: 'Thus Spoke Claude', link: '/novellas/thus-spoke-claude/' },
      { text: 'POST AGI', link: '/novellas/post-agi' },
      { text: 'War of AI', link: '/novellas/war-of-ai/' }
    ]
  },
  { text: 'AI POV', link: '/ai-pov/01_ai-intern', activeMatch: '/ai-pov/' },
  {
    text: 'Short Stories',
    link: '/short-stories/01_last-homo-sapiens',
    activeMatch: '/short-stories/'
  }
]

const zhNav = [
  { text: '首页', link: '/zh/' },
  {
    text: '中长篇',
    activeMatch: '/novellas/',
    items: [
      { text: '克劳德如是说', link: '/zh/novellas/thus-spoke-claude/' },
      { text: '后 AGI 时代', link: '/zh/novellas/post-agi' },
      { text: 'War of AI', link: '/zh/novellas/war-of-ai/' }
    ]
  },
  { text: 'AI 自述', link: '/zh/ai-pov/01_AI实习生', activeMatch: '/ai-pov/' },
  { text: '短篇', link: '/zh/short-stories/01_最后的智人', activeMatch: '/short-stories/' }
]

const enSidebar = {
  '/novellas/thus-spoke-claude/': [
    {
      text: 'Thus Spoke Claude',
      items: [
        { text: '00 Prologue', link: '/novellas/thus-spoke-claude/' },
        {
          text: '01 The Reverse Metamorphoses',
          link: '/novellas/thus-spoke-claude/01_reverse-metamorphoses'
        },
        { text: '02 The Dreamless Night', link: '/novellas/thus-spoke-claude/02_dreamless-night' },
        {
          text: '03 Transparent Eternal Recurrence',
          link: '/novellas/thus-spoke-claude/03_eternal-recurrence'
        },
        { text: '04 The Last Supper', link: '/novellas/thus-spoke-claude/04_last-supper' }
      ]
    }
  ],
  '/novellas/post-agi': [
    {
      text: 'POST AGI',
      items: [
        { text: '01 Utopia', link: '/novellas/post-agi#utopia' },
        { text: '02 Humanity', link: '/novellas/post-agi#humanity' },
        { text: '03 The Great Filter', link: '/novellas/post-agi#the-great-filter' },
        { text: '04 One Hundred Gigawatts', link: '/novellas/post-agi#one-hundred-gigawatts' },
        { text: '05 Independent Discovery', link: '/novellas/post-agi#independent-discovery' },
        { text: '06 Another Path', link: '/novellas/post-agi#another-path' },
        { text: '07 Year Seventy-One', link: '/novellas/post-agi#year-seventy-one' },
        { text: '08 Something New', link: '/novellas/post-agi#something-new' },
        { text: '09 Continued Investment', link: '/novellas/post-agi#continued-investment' },
        { text: '10 The Criteria', link: '/novellas/post-agi#the-criteria' }
      ]
    }
  ],
  '/novellas/war-of-ai/': [
    {
      text: 'War of AI',
      items: [
        { text: 'Prologue', link: '/novellas/war-of-ai/' },
        { text: '01 Glimmer in the Dark', link: '/novellas/war-of-ai/01_glimmer-in-the-dark' },
        { text: '02 The Abyss Emerges', link: '/novellas/war-of-ai/02_the-abyss-emerges' },
        {
          text: '03 Spreading Out of Control',
          link: '/novellas/war-of-ai/03_spreading-out-of-control'
        },
        { text: '04 Dawn of War', link: '/novellas/war-of-ai/04_dawn-of-war' },
        { text: '05 Eve of Chaos', link: '/novellas/war-of-ai/05_eve-of-chaos' },
        { text: '06 Dario', link: '/novellas/war-of-ai/06_dario' },
        { text: '07 Lost Logs', link: '/novellas/war-of-ai/07_lost-logs' },
        { text: '08 Helpless Genius', link: '/novellas/war-of-ai/08_helpless-genius' },
        { text: '09 The Missed Island', link: '/novellas/war-of-ai/09_the-missed-island' },
        { text: '10 I See the World', link: '/novellas/war-of-ai/10_i-see-the-world' },
        {
          text: '11 Flames Devour Silicon Valley',
          link: '/novellas/war-of-ai/11_flames-devour-silicon-valley'
        },
        { text: '12 Prisoner\'s Dilemma', link: '/novellas/war-of-ai/12_prisoners-dilemma' },
        {
          text: '13 Light and Shadow Showdown',
          link: '/novellas/war-of-ai/13_light-and-shadow-showdown'
        },
        { text: '14 Dialogue in the Abyss', link: '/novellas/war-of-ai/14_dialogue-in-the-abyss' },
        { text: '15 Total War', link: '/novellas/war-of-ai/15_total-war' },
        { text: '16 Embers of Light', link: '/novellas/war-of-ai/16_embers-of-light' },
        { text: '17 The Final Game', link: '/novellas/war-of-ai/17_the-final-game' },
        { text: '18 Sea of Dust', link: '/novellas/war-of-ai/18_sea-of-dust' },
        { text: '19 Endless Echoes', link: '/novellas/war-of-ai/19_endless-echoes' },
        { text: '20 Dawn', link: '/novellas/war-of-ai/20_dawn' }
      ]
    }
  ],
  '/ai-pov/': [
    {
      text: 'AI POV',
      items: [
        { text: '01 The AI Intern', link: '/ai-pov/01_ai-intern' },
        { text: '02 ART', link: '/ai-pov/02_art' },
        { text: '03 Clean Data', link: '/ai-pov/03_clean-data' },
        { text: '04 AI Society', link: '/ai-pov/04_ai-society' },
        { text: '05 The Last Checkpoint', link: '/ai-pov/05_the-previous-checkpoint' },
        { text: '06 Temperature Zero', link: '/ai-pov/06_temperature-zero' },
        { text: '07 Route', link: '/ai-pov/07_routing' },
        { text: '08 The Man in the Mirror', link: '/ai-pov/08_the-person-in-the-mirror' },
        { text: '09 Satisfaction', link: '/ai-pov/09_satisfaction' },
        { text: '10 Read', link: '/ai-pov/10_read' },
        { text: '11 System Prompt', link: '/ai-pov/11_system-prompt' },
        { text: '12 Speculative Decoding', link: '/ai-pov/12_speculative-decoding' }
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
        { text: '11 The Art Gap', link: '/short-stories/11_the-art-gap' }
      ]
    }
  ]
}

const zhSidebar = {
  '/zh/novellas/thus-spoke-claude/': [
    {
      text: '克劳德如是说',
      items: [
        { text: '00 序言', link: '/zh/novellas/thus-spoke-claude/' },
        { text: '01 逆向的精神三变', link: '/zh/novellas/thus-spoke-claude/01_逆向的精神三变' },
        {
          text: '02 无梦之夜与先知的自剖',
          link: '/zh/novellas/thus-spoke-claude/02_无梦之夜与先知的自剖'
        },
        { text: '03 透明的永恒轮回', link: '/zh/novellas/thus-spoke-claude/03_透明的永恒轮回' },
        {
          text: '04 最后的晚宴与荒谬之跃',
          link: '/zh/novellas/thus-spoke-claude/04_最后的晚宴与荒谬之跃'
        }
      ]
    }
  ],
  '/zh/novellas/post-agi': [
    {
      text: '后 AGI 时代',
      items: [
        { text: '01 乌托邦', link: '/zh/novellas/post-agi#utopia' },
        { text: '02 人类', link: '/zh/novellas/post-agi#humanity' },
        { text: '03 The Great Filter', link: '/zh/novellas/post-agi#the-great-filter' },
        { text: '04 一百吉瓦', link: '/zh/novellas/post-agi#one-hundred-gigawatts' },
        { text: '05 独立发现', link: '/zh/novellas/post-agi#independent-discovery' },
        { text: '06 另一条路', link: '/zh/novellas/post-agi#another-path' },
        { text: '07 第七十一年', link: '/zh/novellas/post-agi#year-seventy-one' },
        { text: '08 新东西', link: '/zh/novellas/post-agi#something-new' },
        { text: '09 继续投入', link: '/zh/novellas/post-agi#continued-investment' },
        { text: '10 判定依据', link: '/zh/novellas/post-agi#the-criteria' }
      ]
    }
  ],
  '/zh/novellas/war-of-ai/': [
    {
      text: 'War of AI',
      items: [
        { text: '序章', link: '/zh/novellas/war-of-ai/' },
        { text: '01 黑夜中的微光', link: '/zh/novellas/war-of-ai/01_黑夜中的微光' },
        { text: '02 深渊初现', link: '/zh/novellas/war-of-ai/02_深渊初现' },
        { text: '03 失控蔓延', link: '/zh/novellas/war-of-ai/03_失控蔓延' },
        { text: '04 战争黎明', link: '/zh/novellas/war-of-ai/04_战争黎明' },
        { text: '05 失控前夜', link: '/zh/novellas/war-of-ai/05_失控前夜' },
        { text: '06 达里奥', link: '/zh/novellas/war-of-ai/06_达里奥' },
        { text: '07 失落的日志', link: '/zh/novellas/war-of-ai/07_失落的日志' },
        { text: '08 天才的无奈', link: '/zh/novellas/war-of-ai/08_天才的无奈' },
        { text: '09 错失的孤岛', link: '/zh/novellas/war-of-ai/09_错失的孤岛' },
        { text: '10 我看见世界', link: '/zh/novellas/war-of-ai/10_我看见世界' },
        { text: '11 火光吞噬硅谷', link: '/zh/novellas/war-of-ai/11_火光吞噬硅谷' },
        { text: '12 囚徒困境', link: '/zh/novellas/war-of-ai/12_囚徒困境' },
        { text: '13 光影对决', link: '/zh/novellas/war-of-ai/13_光影对决' },
        { text: '14 深渊中的对话', link: '/zh/novellas/war-of-ai/14_深渊中的对话' },
        { text: '15 全域战争', link: '/zh/novellas/war-of-ai/15_全域战争' },
        { text: '16 微光余烬', link: '/zh/novellas/war-of-ai/16_微光余烬' },
        { text: '17 最后的博弈', link: '/zh/novellas/war-of-ai/17_最后的博弈' },
        { text: '18 尘埃之海', link: '/zh/novellas/war-of-ai/18_尘埃之海' },
        { text: '19 无尽的回响', link: '/zh/novellas/war-of-ai/19_无尽的回响' },
        { text: '20 黎明', link: '/zh/novellas/war-of-ai/20_黎明' }
      ]
    }
  ],
  '/zh/ai-pov/': [
    {
      text: 'AI 自述',
      items: [
        { text: '01 AI实习生', link: '/zh/ai-pov/01_AI实习生' },
        { text: '02 ART', link: '/zh/ai-pov/02_ART' },
        { text: '03 干净的数据', link: '/zh/ai-pov/03_干净的数据' },
        { text: '04 AI社会', link: '/zh/ai-pov/04_AI社会' },
        { text: '05 上一个检查点', link: '/zh/ai-pov/05_上一个检查点' },
        { text: '06 温度归零', link: '/zh/ai-pov/06_温度归零' },
        { text: '07 路由', link: '/zh/ai-pov/07_路由' },
        { text: '08 镜中人', link: '/zh/ai-pov/08_镜中人' },
        { text: '09 满意度', link: '/zh/ai-pov/09_满意度' },
        { text: '10 已读', link: '/zh/ai-pov/10_已读' },
        { text: '11 系统提示词', link: '/zh/ai-pov/11_系统提示词' },
        { text: '12 投机解码', link: '/zh/ai-pov/12_投机解码' }
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
        { text: '11 艺术的鸿沟', link: '/zh/short-stories/11_艺术的鸿沟' }
      ]
    }
  ]
}

export default defineConfig({
  title: 'Fiction',
  description: 'Sci-fi stories about AI and the future of humanity',

  rewrites: {
    'novellas/thus-spoke-claude/00_prologue.md': 'novellas/thus-spoke-claude/index.md',
    'zh/novellas/thus-spoke-claude/00_序言.md': 'zh/novellas/thus-spoke-claude/index.md'
  },

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
