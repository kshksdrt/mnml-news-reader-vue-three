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
const subreddits = computed(() => state.subreddits)

// Mutations
function toggleTheme () {
  state.theme === 'dark' ? state.theme = 'light' : state.theme = "dark"
  console.log('MUTATION', 'toggleTheme')
}

function setTheme (payload) {
  if (!themes.includes(payload)) return
  state.theme = payload
  console.log('MUTATION', 'setTheme')
}

function changeView (payload) {
  if (!views.includes(payload)) return
  state.currentView = payload
  console.log('MUTATION', 'changeView')
}

function addSubreddit (payload) {
  state.subreddits.push(payload)
}

function removeSubreddit (payload) {
  state.subreddits = state.subreddits.filter(x => x !== payload)
}

export default {
  theme,
  currentView,
  subreddits,
  addSubreddit,
  removeSubreddit,
  toggleTheme,
  setTheme,
  changeView,
}