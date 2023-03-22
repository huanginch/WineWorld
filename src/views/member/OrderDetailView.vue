<template>
    <div class="pt-5">
      <h4 class="text-danger mb-3">訂單資料</h4>
      <OrderDetail :order="order"/>
    </div>
</template>

<script>
import OrderDetail from '../../components/OrderDetail.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  name: 'OrderDetailView',
  data() {
    return {
      order: {},
    };
  },
  methods: {
    getOrder() {
      this.$http.get(`${VITE_URL}/api/${VITE_PATH}/order/${this.$route.params.orderId}`)
        .then((res) => {
          this.order = res.data.order;
        })
        .catch(() => {
        });
    },
  },
  mounted() {
    this.getOrder();
  },
  components: {
    OrderDetail,
  },
};
</script>
