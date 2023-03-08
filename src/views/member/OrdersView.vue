<template>
    <h3 class="text-danger mt-5">訂單查詢</h3>
    <table class="table text-white table-hover">
        <thead>
            <tr>
                <th scope="col" class="mobile-style">訂單編號</th>
                <th scope="col">訂單日期</th>
                <th scope="col">訂單狀態</th>
                <th scope="col">訂單金額</th>
                <th scope="col">訂單明細</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="order in orders" :key="order.id" class="position-relative">
                <td v-if="!order.is_paid" class="mobile-style">{{ order.id }}</td>
                <td v-if="!order.is_paid">{{ order.create_at }}</td>
                <td v-if="!order.is_paid">{{ orderStatus[order.status] }}</td>
                <td v-if="!order.is_paid">{{ order.total }}</td>
                <td v-if="!order.is_paid">
                    <router-link :to="'/member/orders/' + order.id"
                    class="btn btn-danger stretched-link">查看</router-link>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      orders: [],
      orderStatus: {
        0: '已成立',
        1: '未處理',
        2: '已出貨',
        3: '已完成',
      },
    };
  },
  methods: {
    async getOrders() {
      const res = await this.$http.get(`${VITE_URL}/api/${VITE_PATH}/orders`);
      this.orders = await res.data.orders;
    },
  },
  mounted() {
    this.getOrders();
  },
};
</script>

<style lang="scss">
.mobile-style {
    @media screen and (max-width: 768px) {
      display: none;
    }
}
</style>
