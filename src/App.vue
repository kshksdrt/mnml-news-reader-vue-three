<template>
  <div id="mnml" :class="theme">
    <div class="home">
      <Header />
      <MainView />
      <Footer />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Header from "/@/components/Header.vue";
import MainView from "/@/components/MainView.vue";
import Footer from "/@/components/Footer.vue";
import state from "/@/store/state";
import initialize from "/@/scripts/initialize";

export default defineComponent({
  name: "App",
  components: { Header, MainView, Footer },
  setup() {
    // initialize();
    return {
      theme: state.theme,
    };
  },
});
</script>
