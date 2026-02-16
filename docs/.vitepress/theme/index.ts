import DefaultTheme from 'vitepress/theme'
import StoryFeatures from './StoryFeatures.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('StoryFeatures', StoryFeatures)
  }
}
