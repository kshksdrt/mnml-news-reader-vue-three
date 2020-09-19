<template>
  <div class="tabs">
    <div
      v-for="subreddit in subreddits"
      :class="`tab-item ${currentTab === subreddit ? 'tab-active' : ''}`"
      @click="setCurrentTab(subreddit)"
      :key="subreddit"
    >
      <span>{{ subreddit }}</span>
    </div>
  </div>
  <Content :subredditName="currentTab" />
</template>

<script>
import { onMounted, ref } from 'vue'
import Content from './Home/Content'
import state from "../../store/state"

const currentTab = ref('')
const setCurrentTab = (subreddit) => currentTab.value = subreddit
const selectDefault = () => currentTab.value = state.subreddits.value[0]

export default {
  name: "Home",
  components: { Content },
  setup () {
    onMounted(selectDefault)
    return {
      subreddits: state.subreddits,
      currentTab,
      setCurrentTab,
    }
  }
}
</script>