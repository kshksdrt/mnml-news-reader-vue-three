<template>
  <div class="mx-4">
      <h3>Add a subreddit</h3><br/>
      <div class="input-accept">
        <input class="input" type="text" placeholder="Subreddit name" v-model="subredditInput" />
        <SvgIcon icon="add" class="icon-button" @click="addSubreddit()" />
      </div>
      <div id="add-subreddits-listitem" v-for="element in subreddits" :key="element">
        <p>{{ element }}</p>
        <SvgIcon icon="remove" class="icon-button" @click="removeSubreddit(element)" />
      </div>
        <div v-if="error" id="add-subreddits-listitem" style="background: var(--danger)">
          <p>Error adding subreddit</p>
        </div>
        <div v-if="loading" id="add-subreddits-listitem" style="background: var(--bg-1)">
          <div class="loader my-3"></div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import state from "../../store/state"
import SvgIcon from "../../lib/SvgIcon"

const subredditInput = ref('')

function addSubreddit () {
  loading.value = true
  const subredditName = subredditInput.value
  if (subredditName.length === 0) showAddError()

  axios.get(`https://www.reddit.com/r/${subredditName}/top/.json`)
  .then(() => {
    state.addSubreddit(subredditName)
    loading.value = false
  })
  .catch(() => {
    showAddError()
    loading.value = false
  })
  subredditInput.value = ''
}

function removeSubreddit (subreddit) {
  state.removeSubreddit(subreddit)
}

async function showAddError () {
  error.value = true
  await new Promise(resolve => setTimeout(resolve, 2000))
  error.value = false
}

const loading = ref(false)
const error = ref(false)

export default {
  name: "Sources",
  components: { SvgIcon },
  setup () {
    return {
      subreddits: state.subreddits,
      subredditInput,
      addSubreddit,
      removeSubreddit,
      loading,
      error,
    }
  }
}
</script>