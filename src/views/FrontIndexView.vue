<template>
    <Navbar :isHome="isHome"></Navbar>
    <router-view></router-view>
    <FooterComponent :isHome="isHome"></FooterComponent>
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
