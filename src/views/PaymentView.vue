<template>
    <div class="payment container text-center d-flex flex-column align-items-center
    justify-content-center">
        <h1 class="mb-5">訂單已成立!</h1>
        <div>
            <button type="button" class="btn btn-primary text-white me-5"
            @click="payment()">立即付款</button>
            <button type="button" class="btn btn-outline-primary"
            @click="this.$router.push('/')">稍後付款</button>
        </div>
    </div>
</template>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  name: 'PaymentView',
  methods: {
    payment() {
      this.$http.post(`${VITE_URL}/api/${VITE_PATH}/pay/${this.$route.params.orderId}`)
        .then((res) => {
          alert(res.data.message);
          this.$router.push('/');
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
};
</script>

<style>
.payment {
    height: 70vh;
}
</style>
