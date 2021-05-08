<template>
  <div class="header">
    <div
      class="overlay-invisible"
      v-if="themeDropdown"
      @click="toggleThemeDropdown()"
    ></div>
    <div class="navbar">
      <div to="/" class="navbar-logo-container">
        <img src="/@/assets/icons/logo.svg" alt="App icon" />
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
              <span class="material-icons md-24">light_mode</span>
              <p>Light</p>
            </div>
            <hr />
            <div @click="onThemeSelected('dark')">
              <span class="material-icons md-24">dark_mode</span>
              <p>Dark</p>
            </div>
          </div>
        </li>
        <li class="nav-item" @click="navigate('about')">
          <a>About</a>
        </li>
      </ul>
      <div v-if="deviceType === 'xs'" id="themeToggler" @click="toggleTheme()">
        <span class="material-icons md-24">{{ theme + "_mode" }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import useBreakpoints from "../compositionFunctions/useBreakpoints";
import state from "../store/state";

const themeDropdown = ref(false);
function toggleThemeDropdown() {
  themeDropdown.value = !themeDropdown.value;
}
function onThemeSelected(theme) {
  state.setTheme(theme);
}

export default {
  name: "Header",
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
