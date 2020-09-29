<template>
  <div class="header">
    <div
      class="overlay-invisible"
      v-if="themeDropdown"
      @click="toggleThemeDropdown()"
    ></div>
    <div class="navbar">
      <div to="/" class="navbar-logo-container">
        <SvgIcon class="nav-logo" icon="logo" />
      </div>
      <ul v-if="deviceType !== 'xs'" class="nav-list">
        <li class="nav-item" @click="navigate('home')">
          <a>Home</a>
        </li>
        <li class="nav-item" @click="navigate('sources')">
          <a>Sources</a>
        </li>
        <li class="nav-item dropdown-trigger">
          <a @click="toggleThemeDropdown()">Theme</a>
          <div v-if="themeDropdown" class="dropdown-target">
            <div @click="onThemeSelected('light')">
              <SvgIcon icon="sun" />
              <p>Light</p>
            </div>
            <hr />
            <div @click="onThemeSelected('dark')">
              <SvgIcon icon="moon" />
              <p>Dark</p>
            </div>
          </div>
        </li>
        <li class="nav-item" @click="navigate('about')">
          <a>About</a>
        </li>
      </ul>
      <div v-if="deviceType === 'xs'" id="themeToggler" @click="toggleTheme()">
        <SvgIcon icon="sun" v-if="theme === 'dark'" />
        <SvgIcon icon="moon" v-if="theme === 'light'" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import useBreakpoints from "../compositionFunctions/useBreakpoints";
import state from "../store/state";
import SvgIcon from "../lib/SvgIcon";

const themeDropdown = ref(false);
function toggleThemeDropdown() {
  themeDropdown.value = !themeDropdown.value;
}
function onThemeSelected(theme) {
  state.setTheme(theme);
}

export default {
  name: "Header",
  components: { SvgIcon },
  setup() {
    const { type: deviceType } = useBreakpoints();
    return {
      deviceType,
      theme: state.theme,
      themeDropdown,
      toggleThemeDropdown,
      toggleTheme: () => state.toggleTheme(),
      navigate: (payload) => state.changeView(payload),
      onThemeSelected,
    };
  },
};
</script>