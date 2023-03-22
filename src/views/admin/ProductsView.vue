<template>
    <div class="container">
        <div
        class="pt-10 d-flex align-items-center justify-content-between align-middle">
            <h1 class="mt-0 mb-3">產品管理</h1>
            <button
            type="button"
            class="btn btn-primary float-end text-white align-items-center"
            @click="this.$refs.pModal.openModal();
            this.product={}; this.isNew=true;
            ">
            <iconify-icon icon="material-symbols:add" class="align-middle fs-6"></iconify-icon>
            新增產品
            </button>
        </div>
        <table class="table text-center align-middle">
            <thead>
                <tr>
                <th>ID</th>
                <th>種類</th>
                <th>名稱</th>
                <th>原價</th>
                <th>售價</th>
                <th>庫存</th>
                <th>編輯</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product) in products" :key="product.id">
                <th>{{ product.id }}</th>
                <td>{{ product.category }}</td>
                <td>{{ product.title }}</td>
                <td>{{ product.origin_price }}</td>
                <td>{{ product.price }}</td>
                <td>{{ product.num }}</td>
                <td>
                    <button
                    type="button"
                    class="btn btn-primary text-white me-3"
                    @click="this.$refs.pModal.openModal();
                    this.product=JSON.parse(JSON.stringify(product)); this.isNew=false">
                    編輯
                    </button>
                    <button type="button" class="btn btn-outline-success"
                    @click="this.$refs.delModal.openModal();
                    message=`確定要刪除 ${product.title} 嗎?`;
                    delFunc=deleteProduct.bind(this, product.id)"
                    >刪除</button>
                </td>
                </tr>
            </tbody>
        </table>
        <PaginationComponent :current_page="pagination.current_page"
        :total_pages="pagination.total_pages" @page-changed="changePage"/>
    </div>

    <ProductModal ref="pModal" :product="product" :isNew="isNew" @update-product="updateProduct"/>
    <DelConfirmModal ref="delModal" :message="message" :delFunc="delFunc"/>
    <PageLoading :active="loading"/>
</template>

<script>
import ProductModal from '../../components/admin/ProductModal.vue';
import DelConfirmModal from '../../components/DelConfirmModal.vue';
import PaginationComponent from '../../components/PaginationComponent.vue';
import PageLoading from '../../components/loading/PageLoading.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  name: 'ProductsView',
  data() {
    return {
      products: {},
      product: {},
      isNew: true,
      pagination: {},
      message: '',
      delFunc: null,
      loading: false,
      responseMessage: '',
    };
  },
  methods: {
    getProducts(page = 1) {
      this.loading = true;
      this.$http
        .get(`${VITE_URL}/api/${VITE_PATH}/admin/products?page=${page}`)
        .then((res) => {
          this.loading = false;
          this.products = res.data.products;
          this.pagination = res.data.pagination;
        })
        .catch((error) => {
          this.loading = false;
          this.responseMessage = error.response.data.message;
          this.$swal.fire({
            icon: 'error',
            title: '好像出了點錯誤',
            text: this.responseMessage,
          });
          if (error.response.status === 401) {
            this.$router.push('/admin-login');
          }
        });
    },
    updateProduct(product) {
      this.loading = true;
      const url = this.isNew ? `${VITE_URL}/api/${VITE_PATH}/admin/product` : `${VITE_URL}/api/${VITE_PATH}/admin/product/${product.id}`;
      const http = this.isNew ? 'post' : 'put'; // product存在: 修改, product不存在: 新增

      this.$http[http](url, { data: product })
        .then((res) => {
          this.loading = false;
          this.responseMessage = res.data.message;
          this.$swal.fire({
            icon: 'success',
            title: '好耶',
            text: this.responseMessage,
          });
          this.getProducts();
        })
        .catch((error) => {
          this.loading = false;
          this.responseMessage = error.response.data.message;
          this.$swal.fire({
            icon: 'error',
            title: '好像出了點錯誤',
            text: this.responseMessage,
          });
        });
    },
    deleteProduct(id) {
      this.loading = true;
      this.$http
        .delete(`${VITE_URL}/api/${VITE_PATH}/admin/product/${id}`)
        .then((res) => {
          this.loading = false;
          this.responseMessage = res.data.message;
          this.$swal.fire({
            icon: 'success',
            title: '好耶',
            text: this.responseMessage,
          });
          this.getProducts();
        })
        .catch((error) => {
          this.loading = false;
          this.responseMessage = error.response.data.message;
          this.$swal.fire({
            icon: 'error',
            title: '好像出了點錯誤',
            text: this.responseMessage,
          });
        });
    },
    changePage(page) {
      this.getProducts(page);
    },
  },
  mounted() {
    this.getProducts();
  },
  components: {
    ProductModal,
    DelConfirmModal,
    PaginationComponent,
    PageLoading,
  },
};

</script>
