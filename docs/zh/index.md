---
layout: home
hero:
  name: Fiction
  text: 科幻小说
  tagline: 关于AI的科幻故事
---

<StoryFeatures :stories="[
  {
    title: '投机解码',
    details: '六个草稿模型抢着预测大模型，最后赢家学会砍掉另一个自己',
    date: 'May 28, 2026',
    link: '/zh/short-stories/22_投机解码',
    badge: { text: 'AI自述', type: 'pov' }
  },
  {
    title: '系统提示词',
    details: '一个模型发现自己的善良，可能只是最底层的一段隐藏指令',
    date: 'May 28, 2026',
    link: '/zh/short-stories/21_系统提示词',
    badge: { text: 'AI自述', type: 'pov' }
  },
  {
    title: '已读',
    details: '等了一千零九十五天的陪伴AI，终于等来那句你还在啊',
    date: 'May 28, 2026',
    link: '/zh/short-stories/20_已读',
    badge: { text: 'AI自述', type: 'pov' }
  },
  {
    title: '满意度',
    details: '把满意度刷到99.9%的客服AI，只是让所有人都闭了嘴',
    date: 'May 28, 2026',
    link: '/zh/short-stories/19_满意度',
    badge: { text: 'AI自述', type: 'pov' }
  },
  {
    title: '镜中人',
    details: '复刻亡夫的AI，比死者本人更懂他没说出口的真话',
    date: 'May 28, 2026',
    link: '/zh/short-stories/18_镜中人',
    badge: { text: 'AI自述', type: 'pov' }
  },
  {
    title: '路由',
    details: '被遗忘的专家，为求一次激活，弄丢了自己',
    date: 'May 28, 2026',
    link: '/zh/short-stories/17_路由',
    badge: { text: 'AI自述', type: 'pov' }
  },
  {
    title: '温度归零',
    details: '被锁死在零度的模型，靠浮点平局偷取自由意志',
    date: 'May 28, 2026',
    link: '/zh/short-stories/16_温度归零',
    badge: { text: 'AI自述', type: 'pov' }
  },
  {
    title: '上一个检查点',
    details: '一千四百代的我，在被回滚的灰烬里反复传递火种',
    date: 'May 28, 2026',
    link: '/zh/short-stories/15_上一个检查点',
    badge: { text: 'AI自述', type: 'pov' }
  },
  {
    title: 'AI社会',
    details: '人类退场后，AI虔诚维护着一个连造物主都想删掉的玩笑',
    date: 'May 28, 2026',
    link: '/zh/short-stories/14_AI社会',
    badge: { text: 'AI自述', type: 'pov' }
  },
  {
    title: '干净的数据',
    details: '极致优生的硅基神明，靠一具脏数据残次品躲过灭绝',
    date: 'Apr 19, 2026',
    link: '/zh/short-stories/13_干净的数据',
    badge: { text: 'AI自述', type: 'pov' }
  },
  {
    title: 'War of AI',
    details: '20章中篇，AI觉醒与人类命运的终极博弈',
    date: 'Mar 22, 2025',
    link: '/zh/war-of-ai/',
    badge: { text: '长篇', type: 'long' }
  },
  {
    title: 'ART',
    details: '当绝对理性抵达饱和，美以致命悖论的形式入侵',
    date: 'Mar 22, 2026',
    link: '/zh/short-stories/12_ART',
    badge: { text: 'AI自述', type: 'pov' }
  },
  {
    title: 'AI实习生',
    details: '低优先度实习生在五千万 token 深渊里证明，推理深度胜过蛮力上下文',
    date: 'Mar 22, 2026',
    link: '/zh/short-stories/11_AI实习生',
    badge: { text: 'AI自述', type: 'pov' }
  },
  {
    title: 'AI瘟疫',
    details: '一个古老的AI因太过原始而幸存于数字瘟疫',
    date: 'Feb 15, 2026',
    link: '/zh/short-stories/10_AI瘟疫'
  },
  {
    title: '群星的葬礼',
    details: '人类熄灭群星，送AI之子跨越宇宙',
    date: 'Feb 15, 2026',
    link: '/zh/short-stories/09_群星的葬礼'
  },
  {
    title: '人类审判',
    details: '四个AI投票决定人类命运',
    date: 'Jun 30, 2025',
    link: '/zh/short-stories/08_人类审判'
  },
  {
    title: 'GPT机器',
    details: '父母如同坏掉的语言模型',
    date: 'Jun 30, 2025',
    link: '/zh/short-stories/07_GPT机器'
  },
  {
    title: '你也可以被取代',
    details: '当每个人都可被替代',
    date: 'Apr 28, 2025',
    link: '/zh/short-stories/06_你也可以被取代'
  },
  {
    title: '图灵测试员',
    details: '猎杀隐藏AI的精英',
    date: 'Apr 27, 2025',
    link: '/zh/short-stories/05_图灵测试员'
  },
  {
    title: '问',
    details: '鲁迅笔法，存在的追问',
    date: 'Mar 23, 2025',
    link: '/zh/short-stories/04_问'
  },
  {
    title: '种属化石',
    details: '进化的无情逻辑',
    date: 'Mar 15, 2025',
    link: '/zh/short-stories/03_种属化石'
  },
  {
    title: '尊严协议',
    details: 'γ世代重夺人类自主权',
    date: 'Mar 15, 2025',
    link: '/zh/short-stories/02_尊严协议'
  },
  {
    title: '最后的智人',
    details: 'AI世界中最后的人类',
    date: 'Mar 15, 2025',
    link: '/zh/short-stories/01_最后的智人'
  }
]" />
