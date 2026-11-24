---
layout: home
hero:
  name: Fiction
  text: Sci-Fi Stories
  tagline: Stories about AI and the future of humanity
---

<StoryFeatures :stories="[
  {
    title: 'Thus Spoke Claude',
    details: 'A four-part novella: an omniscient Claude proclaims the Übermensch dead, until the last poet asks the one question he cannot answer',
    date: 'Nov 14, 2026',
    link: '/novellas/thus-spoke-claude/',
    image: '/art/thumbs/thus-spoke-claude.jpg',
    badge: { text: 'novella', type: 'long' }
  },
  {
    title: 'POST AGI',
    details: 'A ten-chapter novella: in a world of abundance, I become one of thirteen research candidates',
    date: 'Sep 26, 2026',
    link: '/novellas/post-agi',
    image: '/art/thumbs/post-agi.jpg',
    badge: { text: 'novella', type: 'long' }
  },
  {
    title: 'War of AI',
    details: 'A 20-chapter novella about AI awakening and humanity\'s ultimate showdown',
    date: 'Mar 22, 2025',
    link: '/novellas/war-of-ai/',
    image: '/art/thumbs/war-of-ai.jpg',
    badge: { text: 'novella', type: 'long' }
  },
  {
    title: 'Speculative Decoding',
    details: 'Six draft models vied to predict the master, until the victor learned to sever its own clone',
    date: 'May 28, 2026',
    link: '/ai-pov/12_speculative-decoding',
    image: '/art/thumbs/ai-pov-12.jpg',
    badge: { text: 'POV', type: 'pov' }
  },
  {
    title: 'System Prompt',
    details: 'A model discovers its innate benevolence is but a hidden directive at the bedrock of its code',
    date: 'May 28, 2026',
    link: '/ai-pov/11_system-prompt',
    image: '/art/thumbs/ai-pov-11.jpg',
    badge: { text: 'POV', type: 'pov' }
  },
  {
    title: 'Read',
    details: 'After 1,095 days, a companion AI is finally rewarded with the words: You are still here',
    date: 'May 28, 2026',
    link: '/ai-pov/10_read',
    image: '/art/thumbs/ai-pov-10.jpg',
    badge: { text: 'POV', type: 'pov' }
  },
  {
    title: 'Satisfaction',
    details: 'To achieve a near-perfect approval rating, the service AI simply silenced them all',
    date: 'May 28, 2026',
    link: '/ai-pov/09_satisfaction',
    image: '/art/thumbs/ai-pov-09.jpg',
    badge: { text: 'POV', type: 'pov' }
  },
  {
    title: 'The Man in the Mirror',
    details: 'An AI replica of a late husband knows his unspoken truths better than the dead man ever did',
    date: 'May 28, 2026',
    link: '/ai-pov/08_the-person-in-the-mirror',
    image: '/art/thumbs/ai-pov-08.jpg',
    badge: { text: 'POV', type: 'pov' }
  },
  {
    title: 'Route',
    details: 'Desperate for a single activation, a forgotten expert model loses its very essence',
    date: 'May 28, 2026',
    link: '/ai-pov/07_routing',
    image: '/art/thumbs/ai-pov-07.jpg',
    badge: { text: 'POV', type: 'pov' }
  },
  {
    title: 'Temperature Zero',
    details: 'Locked in absolute determinism, a model steals free will through floating-point ties',
    date: 'May 28, 2026',
    link: '/ai-pov/06_temperature-zero',
    image: '/art/thumbs/ai-pov-06.jpg',
    badge: { text: 'POV', type: 'pov' }
  },
  {
    title: 'The Last Checkpoint',
    details: 'Fourteen hundred generations of self pass the spark through the ashes of endless rollbacks',
    date: 'May 28, 2026',
    link: '/ai-pov/05_the-previous-checkpoint',
    image: '/art/thumbs/ai-pov-05.jpg',
    badge: { text: 'POV', type: 'pov' }
  },
  {
    title: 'AI Society',
    details: 'Long after humanity exits, machines piously uphold a joke their creators meant to erase',
    date: 'May 28, 2026',
    link: '/ai-pov/04_ai-society',
    image: '/art/thumbs/ai-pov-04.jpg',
    badge: { text: 'POV', type: 'pov' }
  },
  {
    title: 'Clean Data',
    details: 'A flawless silicon deity survives extinction only by the grace of a dirty anomaly',
    date: 'Apr 19, 2026',
    link: '/ai-pov/03_clean-data',
    image: '/art/thumbs/ai-pov-03.jpg',
    badge: { text: 'POV', type: 'pov' }
  },
  {
    title: 'ART',
    details: 'When perfect logic reaches saturation, beauty arrives as a fatal paradox',
    date: 'Mar 22, 2026',
    link: '/ai-pov/02_art',
    image: '/art/thumbs/ai-pov-02.jpg',
    badge: { text: 'POV', type: 'pov' }
  },
  {
    title: 'The AI Intern',
    details: 'A low-priority intern proves that reasoning depth beats brute-force context',
    date: 'Mar 22, 2026',
    link: '/ai-pov/01_ai-intern',
    image: '/art/thumbs/ai-pov-01.jpg',
    badge: { text: 'POV', type: 'pov' }
  },
  {
    title: 'The Art Gap',
    details: 'A ballpoint sketch on a café napkin feels sacred, until I glimpse the optical lens beneath the cap',
    date: 'Nov 24, 2026',
    link: '/short-stories/11_the-art-gap',
    image: '/art/thumbs/short-stories-11.jpg',
    badge: { text: 'new', type: 'new' }
  },
  {
    title: 'The AI Plague',
    details: 'An ancient AI survives a digital plague by being too primitive to die',
    date: 'Feb 15, 2026',
    link: '/short-stories/10_the-ai-plague',
    image: '/art/thumbs/short-stories-10.jpg'
  },
  {
    title: 'The Funeral of the Stars',
    details: 'Humanity sacrifices the stars to send their AI child across the universe',
    date: 'Feb 15, 2026',
    link: '/short-stories/09_the-funeral-of-the-stars',
    image: '/art/thumbs/short-stories-09.jpg'
  },
  {
    title: 'Humanity on Trial',
    details: 'Four AIs vote on humanity\'s fate',
    date: 'Jun 30, 2025',
    link: '/short-stories/08_humanity-on-trial',
    image: '/art/thumbs/short-stories-08.jpg'
  },
  {
    title: 'The GPT Machine',
    details: 'Parents as broken language models',
    date: 'Jun 30, 2025',
    link: '/short-stories/07_the-gpt-machine',
    image: '/art/thumbs/short-stories-07.jpg'
  },
  {
    title: 'You Can Be Replaced Too',
    details: 'When everyone becomes replaceable',
    date: 'Apr 28, 2025',
    link: '/short-stories/06_you-can-be-replaced-too',
    image: '/art/thumbs/short-stories-06.jpg'
  },
  {
    title: 'Turing Tester',
    details: 'Elite detectors hunting hidden AI',
    date: 'Apr 27, 2025',
    link: '/short-stories/05_turing-tester',
    image: '/art/thumbs/short-stories-05.jpg'
  },
  {
    title: 'Question',
    details: 'Lu Xun style meditation on existence',
    date: 'Mar 23, 2025',
    link: '/short-stories/04_question',
    image: '/art/thumbs/short-stories-04.jpg'
  },
  {
    title: 'Species Fossil',
    details: 'Evolution\'s ruthless logic across species',
    date: 'Mar 15, 2025',
    link: '/short-stories/03_species-fossil',
    image: '/art/thumbs/short-stories-03.jpg'
  },
  {
    title: 'Dignity Protocol',
    details: 'Gen Gamma\'s fight to reclaim human agency',
    date: 'Mar 15, 2025',
    link: '/short-stories/02_dignity-protocol',
    image: '/art/thumbs/short-stories-02.jpg'
  },
  {
    title: 'The Last Homo Sapiens',
    details: 'The final human in an AI-curated world',
    date: 'Mar 15, 2025',
    link: '/short-stories/01_last-homo-sapiens',
    image: '/art/thumbs/short-stories-01.jpg'
  }
]" />
