<template>
  <div class="nav-bottom">
    <div
      :class="`nav-bottom-item ${
        currentView === 'home' ? 'nav-tab-active' : ''
      }`"
      @click="navigate('home')"
    >
      <span class="material-icons md-24">home</span>
    </div>
    <div
      :class="`nav-bottom-item ${
        currentView === 'home' ? 'nav-tab-active' : ''
      }`"
      @click="navigate('sources')"
    >
      <span class="material-icons md-24">dns</span>
    </div>
    <div
      :class="`nav-bottom-item ${
        currentView === 'home' ? 'nav-tab-active' : ''
      }`"
      @click="navigate('about')"
    >
      <span class="material-icons md-24">info</span>
    </div>
  </div>
</template>

<script>
import state from "../store/state";

export default {
  name: "BottomNav",
  setup() {
    return {
      navigate: (payload) => state.changeView(payload),
      currentView: state.currentView,
    };
  },
};
</script>
