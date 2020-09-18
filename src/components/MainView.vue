<template>
  <div class="home-content">
    <Home v-if="currentView === 'home'" />
    <Sources v-if="currentView === 'sources'" />
    <About v-if="currentView === 'about'" />
    <BottomNav />
  </div>
</template>

<script>
import state from "../store/state"
import Home from "./views/Home"
import Sources from "./views/Sources"
import About from "./views/About"
import BottomNav from "./BottomNav"

export default {
  name: "MainView",
  components: { Home, Sources, About, BottomNav },
  setup () {
    return {
      currentView: state.currentView,
    }
  }
}
</script>