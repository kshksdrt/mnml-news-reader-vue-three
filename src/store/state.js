import { reactive, computed } from "vue";
import { lsSet } from "../scripts/localStorage";

// Constants
const LS_KEYS = {
  subreddits: "mnml-news-reader-vue.subreddits",
  theme: "mnml-news-reader-vue.theme",
};

const themes = ["light", "dark"];
const views = ["home", "sources", "about"];

// State
const state = reactive({
  theme: "dark",
  subreddits: ["technology", "worldnews"],
  currentView: "home",
});

// Getters
const theme = computed(() => state.theme);
const currentView = computed(() => state.currentView);
const subreddits = computed(() => state.subreddits);

// Mutations
function toggleTheme() {
  state.theme === "dark" ? (state.theme = "light") : (state.theme = "dark");
  console.log("MUTATION", "toggleTheme");
}

function setTheme(payload) {
  if (!themes.includes(payload)) return;
  state.theme = payload;
  lsSet(LS_KEYS.theme, payload);
  console.log("MUTATION", "setTheme");
}

function changeView(payload) {
  if (!views.includes(payload)) return;
  state.currentView = payload;
  console.log("MUTATION", "changeView");
}

function addSubreddit(payload) {
  state.subreddits.push(payload);
  lsSet(LS_KEYS.subreddits, state.subreddits);
  console.log("MUTATION", "addSubreddit");
}

function removeSubreddit(payload) {
  state.subreddits = state.subreddits.filter((x) => x !== payload);
  lsSet(LS_KEYS.subreddits, state.subreddits);
  console.log("MUTATION", "removeSubreddit");
}

function importSubreddits(payload) {
  if (!Array.isArray(payload)) return;
  if (payload.filter((x) => typeof x !== "string").length > 0) return;
  state.subreddits = payload;
  console.log("MUTATION", "importSubreddits");
}

export default {
  theme,
  currentView,
  subreddits,
  addSubreddit,
  removeSubreddit,
  importSubreddits,
  toggleTheme,
  setTheme,
  changeView,
};
