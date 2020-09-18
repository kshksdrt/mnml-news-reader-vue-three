<template>
  <div id="mnml" :class="theme">
    <div class="home">
      <Header />
      <MainView />
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue"
import MainView from "./components/MainView.vue"
import Footer from "./components/Footer.vue"
import state from "./store/state"

export default {
  name: "App",
  components: { Header, MainView, Footer },
  setup () {
    return {
      theme: state.theme,
    }
  }
};
</script>