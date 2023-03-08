<template>
  <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
    <div id="liveToast" class="toast rounded-0 text-white bg-success"
    role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-body">
        已加入購物車
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartAlert',
  data() {
    return {
      cartToast: null,
    };
  },
  methods: {
    showCartToast() {
      this.cartToast.show();
      setTimeout(() => {
        this.cartToast.hide();
      }, 2000);
    },
    hideCartToast() {
      this.cartToast.hide();
    },
  },
  mounted() {
    this.cartToast = new window.bootstrap.Toast(document.getElementById('liveToast'));
  },
};
</script>
