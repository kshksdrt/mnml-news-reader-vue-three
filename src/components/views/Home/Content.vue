<template>
  <div id="content">
    <StoryCard v-for="story in stories" :key="story.name" :story="story" />
    <div v-if="loading" class="loader"></div>
    <div v-if="error" class="flex-row">
      <SvgIcon class="mx-2" icon="error" />
      <p class="text-small mx-2">Error loading posts</p>
    </div>
    <div v-if="stories.length > 0" class="flex-row">
      <button class="button my-2" @click="loadMore">Load more</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import StoryCard from "./StoryCard";
import SvgIcon from "../../../lib/SvgIcon";

const BASE_URL = "https://www.reddit.com/r";

function storiesCompressor(stories) {
  return stories.map((each) => {
    const { title, score, domain, url, permalink, created, name } = each.data;
    const time = getReadableTime(Date.now() - created * 1000);
    return { title, score, domain, url, permalink, time, name };
  });
}

function getReadableTime(ms) {
  const seconds = (ms / 1000).toFixed(1);
  const minutes = (ms / (1000 * 60)).toFixed(1);
  const hours = (ms / (1000 * 60 * 60)).toFixed(1);
  const days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);

  if (seconds < 60) return `${Math.floor(seconds)} seconds ago`;
  if (minutes < 60) return `${Math.floor(minutes)} minutes ago`;
  if (hours < 60) return `${Math.floor(hours)} hours ago`;
  if (days < 60) return `${Math.floor(days)} days ago`;
}

export default {
  name: "Content",
  components: { SvgIcon, StoryCard },
  props: {
    subredditName: String,
  },
  data() {
    return {
      stories: [],
      loading: true,
      error: false,
      errorMessage: "",
    };
  },
  mounted() {
    if (this.subredditName && this.subredditName.length > 0) this.initialLoad();
  },
  watch: {
    subredditName(val) {
      if (val && val.length > 0) this.initialLoad();
    },
  },
  methods: {
    makeRequest() {
      this.stories = [];
      this.loading = true;
      this.error = false;
      this.errorMessage = "";
    },
    onStoriesReceived(stories) {
      this.stories = stories;
      this.loading = false;
      this.error = false;
      this.errorMessage = "";
    },
    createError(error) {
      this.loading = false;
      this.error = true;
      this.errorMessage = error;
    },
    whileNextPageLoading() {
      this.loading = true;
      this.error = false;
      this.errorMessage = "";
    },
    onNextPageReceived(stories) {
      this.loading = false;
      this.stories = [...this.stories, ...stories];
      this.error = false;
      this.errorMessage = "";
    },
    initialLoad() {
      this.makeRequest();
      axios({
        method: "get",
        url: `${BASE_URL}/${this.subredditName}/hot/.json`,
        params: {
          limit: 15,
        },
      })
        .then((res) => {
          let storiesRaw, stories;
          if (res.data?.data?.children) storiesRaw = res.data.data.children;
          if (storiesRaw) stories = storiesCompressor(storiesRaw);
          if (stories) this.onStoriesReceived(stories);
          if (!stories) this.createError("Cannot load posts");
        })
        .catch(() => {
          this.createError("Cannot load posts");
        });
    },
    loadMore() {
      const y = window.scrollY;
      const after = this.stories[this.stories.length - 1].name;
      this.whileNextPageLoading();
      axios({
        method: "get",
        url: `${BASE_URL}/${this.subredditName}/hot/.json`,
        params: {
          limit: 15,
          after,
        },
      })
        .then((res) => {
          let storiesRaw, stories;
          if (res.data?.data?.children) storiesRaw = res.data.data.children;
          if (storiesRaw) stories = storiesCompressor(storiesRaw);
          if (stories) this.onNextPageReceived(stories);
          if (!stories) this.createError("Cannot load posts");
        })
        .catch(() => {
          this.createError("Cannot load posts");
        })
        .finally(() => window.scrollTo(0, y));
    },
  },
  setup() {
    return {};
  },
};
</script>