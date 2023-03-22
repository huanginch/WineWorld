<template>
    <div class="frontIndex d-flex flex-column">
      <Navbar :isHome="isHome"/>
      <RouterView/>
      <FooterComponent :isHome="isHome"/>
    </div>
</template>

<script>
import Navbar from '../components/NavbarComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';

export default {
  name: 'FrontIndexView',
  data() {
    return {
      isHome: false,
    };
  },
  watch: {
    $route() {
      this.checkIsHome();
    },
  },
  methods: {
    checkIsHome() {
      if (this.$route.name === 'home') {
        this.isHome = true;
      } else {
        this.isHome = false;
      }
    },
  },
  mounted() {
    this.checkIsHome();
  },
  components: {
    Navbar,
    FooterComponent,
  },
};
</script>

<style>
.frontIndex {
  min-height: 100vh;
}
</style>
