<template>
  <div class="home-content">
    <Home v-if="currentView === 'home'" />
    <Sources v-if="currentView === 'sources'" />
    <About v-if="currentView === 'about'" />
    <BottomNav />
  </div>
</template>

<script>
import state from "../store/state";
import Home from "./views/Home.vue";
import Sources from "./views/Sources.vue";
import About from "./views/About.vue";
import BottomNav from "./BottomNav.vue";

export default {
  name: "MainView",
  components: { Home, Sources, About, BottomNav },
  setup() {
    return {
      currentView: state.currentView,
    };
  },
};
</script>
