<template>
    <div class="container">
        <h1>訂單管理</h1>
        <table class="table text-center align-middle">
            <thead>
                <tr>
                <th>訂單編號</th>
                <th>訂單成立日期</th>
                <th>訂購人</th>
                <th>價格</th>
                <th>狀態</th>
                <th>編輯</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in orders" :key="order.id">
                <th>{{ order.id }}</th>
                <td>{{ order.create_at }}</td>
                <td>{{ order.user.name }}</td>
                <td>{{ order.total }}</td>
                <td v-if="order.status==0">已成立 </td>
                <td v-if="order.status==1">未處理</td>
                <td v-if="order.status==2">已出貨</td>
                <td v-if="order.status==3">已完成</td>
                <td>
                    <button
                    type="button"
                    class="btn btn-primary text-white me-3"
                    @click="this.$refs.orderModal.openModal();
                    this.order=JSON.parse(JSON.stringify(order));
                    ">編輯</button>
                    <button
                    type="button"
                    class="btn btn-outline-success"
                    @click="this.$refs.delModal.openModal();
                    message = `確定要刪除訂單編號為${order.id}的訂單嗎?`;
                    delFunc=deleteOrder.bind(this, order.id);
                    "
                    >刪除</button>
                </td>
                </tr>
            </tbody>
        </table>
        <PaginationComponent :pages="pagination"></PaginationComponent>
    </div>
    <orderModal ref="orderModal" :order="order" @update-order="updateOrder"></orderModal>
    <DelConfirmModal ref="delModal" :message="message" :delFunc="delFunc"/>
    <PageLoading :active="loading"/>
    <AlertModal ref="alertModal" :message="responseMessage"/>
</template>

<script>
// import { mapActions } from 'pinia';
// import authStore from '../../stores/authStore';
// import orderModal from '../../components/OrderModal.vue';
// import DelConfirmModal from '../../components/DelConfirmModal.vue';
// import PaginationComponent from '../../components/PaginationComponent.vue';
// import PageLoading from '../../components/PageLoading.vue';

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

export default {
  name: 'OrdersView',
  data() {
    return {
      orders: [],
      order: {},
      pagination: {},
      message: '',
      delFunc: null,
      loading: false,
      responseMessage: '',
    };
  },
  methods: {
    getOrders(page = 1) {
      this.loading = true;
      this.$http
        .get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/orders?page=${page}`)
        .then((res) => {
          this.loading = false;
          this.orders = res.data.orders;
          this.pagination = res.data.pagination;
        })
        .catch((error) => {
          this.loading = false;
          this.responseMessage = error.response.data.message;
          this.$swal.fire({
            icon: 'error',
            title: '好像出了點錯誤',
            text: error.response.data.message,
          });
          if (error.response.status === 401) {
            this.$router.push('/');
          }
        });
    },
    updateOrder(order) {
      this.loading = true;
      this.$http.put(`${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/order/${order.id}`, { data: order })
        .then((res) => {
          this.loading = false;
          this.responseMessage = res.data.message;
          this.$swal.fire({
            icon: 'success',
            title: '好耶',
            text: res.data.message,
          });
          this.getOrders();
        })
        .catch((error) => {
          this.loading = false;
          this.responseMessage = error.response.data.message;
          this.$swal.fire({
            icon: 'error',
            title: '好像出了點錯誤',
            text: error.response.data.message,
          });
        });
    },
    deleteOrder(id) {
      this.loading = true;
      this.$http
        .delete(`${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/order/${id}`)
        .then((res) => {
          this.loading = false;
          this.responseMessage = res.data.message;
          this.$swal.fire({
            icon: 'success',
            title: '好耶',
            text: res.data.message,
          });
          this.getOrders();
        })
        .catch((error) => {
          this.loading = false;
          this.responseMessage = error.response.data.message;
          this.$swal.fire({
            icon: 'error',
            title: '好像出了點錯誤',
            text: error.response.data.message,
          });
        });
    },
    changePage(page) {
      this.getOrders(page);
    },
    // ...mapActions(authStore, ['checkAuth']),
  },
  mounted() {
    // this.checkAuth();
    this.getOrders();
  },
//   components: {
//     orderModal,
//     DelConfirmModal,
//     PaginationComponent,
//     PageLoading,
//   },
};
</script>

<style>
h1 {
    margin-top: 70px;
    margin-bottom: 30px;
}
</style>
