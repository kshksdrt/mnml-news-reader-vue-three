import { lsGet } from './localStorage'
import state from '../store/state'

// Constants
const LS_KEYS = {
  subreddits: 'mnml-news-reader-vue.subreddits',
  theme: 'mnml-news-reader-vue.theme'
}

export default function () {
  const lsTheme = lsGet(LS_KEYS.theme)
  state.setTheme(lsTheme)
  
  const lsSubreddits = lsGet(LS_KEYS.subreddits)
  state.importSubreddits(lsSubreddits)
}