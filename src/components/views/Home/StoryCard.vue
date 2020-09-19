<template>
  <div class="storycard">
    <p class="storycard-title" @click="openInReddit(story.permalink)">{{ story.title }}</p>
    <div class="storycard-info">
      <p class="info-orange">{{ story.score }} points</p>
      <a class="info-blue link" :href="story.url" target="_blank" rel="noopener noreferrer">{{ story.domain }}</a>
      <p class="info-gray">{{ story.time }}</p>
    </div>
  </div>
</template>

<script>
function openInReddit (permalink) {
  window.open(`https://www.reddit.com/${permalink}`, '_blank', 'noopener noreferrer')
}

export default {
  name: "StoryCard",
  props: {
    story: Object
  },
  setup () {
    return {
      openInReddit,
    }
  },
}
</script>