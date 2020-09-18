<template>
  <div class="nav-bottom">
    <SvgIcon
      icon="home"
      :class="`nav-bottom-item ${currentView === 'home' ? 'nav-tab-active' : ''}`"
      @click="navigate('home')"
    />
    <SvgIcon
      icon="sources"
      :class="`nav-bottom-item ${currentView === 'sources' ? 'nav-tab-active' : ''}`"
      @click="navigate('sources')"
    />
    <SvgIcon
      icon="about"
      :class="`nav-bottom-item ${currentView === 'about' ? 'nav-tab-active' : ''}`"
      @click="navigate('about')"
    />
  </div>
</template>

<script>
import state from "../store/state"
import SvgIcon from "../lib/SvgIcon"

export default {
  name: "BottomNav",
  components: { SvgIcon },
  setup () {
    return {
      navigate: payload => state.changeView(payload),
      currentView: state.currentView,
    }
  }
}
</script>