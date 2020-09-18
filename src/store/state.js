import { reactive, computed } from 'vue';

// Constants
// const LS_KEYS = {
//   subreddits: 'mnml-news-reader-vue.subreddits',
//   theme: 'mnml-news-reader-vue.theme'
// }
const themes = ['light', 'dark']
const views = ['home', 'sources', 'about']

// State
const state = reactive({
  theme: 'dark',
  subreddits: ['technology', 'worldnews'],
  currentView: 'home',
})

// Getters
const theme = computed(() => state.theme)
const currentView = computed(() => state.currentView)

// Mutations
function toggleTheme () {
  state.theme === 'dark' ? state.theme = 'light' : state.theme = "dark"
  console.log('MUTATION', 'type: toggleTheme,')
}

function setTheme (payload) {
  if (!themes.includes(payload)) return
  state.theme = payload
  console.log('MUTATION', 'type: setTheme,')
}

function changeView (payload) {
  if (!views.includes(payload)) return
  state.currentView = payload
  console.log('MUTATION', 'type: changeView,')
}

export default {
  theme,
  currentView,
  toggleTheme,
  setTheme,
  changeView,
}