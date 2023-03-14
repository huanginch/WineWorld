<template>
  <teleport to='body'>
    <div
    class='loading'
    @wheel.prevent
    @touchmove.prevent
    @scroll.prevent
    :class="{ 'd-none': !active }"
    ref='loading'>
        <div class="animation" ref="animation"></div>
    </div>
  </teleport>
</template>

<script>
import lottie from 'lottie-web';

export default {
  props: ['active'],
  data() {
    return {
      animation: null,
    };
  },
  watch: {
    active() {
      const body = document.querySelector('body');
      const html = document.querySelector('html');
      if (this.active) {
        body.style.overflow = 'hidden';
        html.style.overflow = 'hidden';
      } else {
        body.style.overflow = 'auto';
        html.style.overflow = 'auto';
      }
    },
  },
  mounted() {
    this.animation = lottie.loadAnimation({
      container: this.$refs.animation,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      speed: 0.5,
      path: 'https://assets10.lottiefiles.com/packages/lf20_menpm2u0.json',
    });
  },
};
</script>

<style>
.loading {
  background: fixed center center no-repeat;
  background-size: contain;
  background-color: rgba(255, 255, 255, 0.5);
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
}
.loading .animation {
  max-width: 150px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.loading .animation::after {
  padding-top: 10px;
  position: absolute;
  top: 110%;
  left: 55%;
  transform: translate(-50%, -50%);
  content: 'Loading...';
  font-weight: bold;
}
</style>
