import { defineStore } from 'pinia';
import axios from 'axios';
import swal from 'sweetalert2';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default defineStore('cartStore', {
  state: () => ({
    carts: [],
    final_total: 0,
    showToast: false,
    isLoading: false,
  }),
  getters: {
    totalCart: ({ carts }) => {
      // 購物車商品總數
      if (carts === undefined) {
        return 0;
      }
      return carts.length;
    },
  },
  actions: {
    getCart() {
      axios
        .get(`${VITE_URL}/api/${VITE_PATH}/cart`)
        .then((res) => {
          // 購物車資料在res.data.data.carts裡...
          this.carts = res.data.data.carts;
          this.final_total = res.data.data.final_total;
        })
        .catch((err) => {
          swal.fire({
            icon: 'error',
            title: '好像出了點問題',
            text: err.response.data.message,
          });
        });
    },
    addToCart(productId, qty = 1) {
      const data = {
        product_id: productId,
        qty,
      };
      const currentCart = this.carts.find((item) => item.id === productId);
      // 判斷是否有重複的產品
      if (currentCart) {
        currentCart.qty += qty;
        // 有重複的產品，更新購物車
        this.updateCart(currentCart.id, data);
      } else {
        // 沒有重複的產品，新增購物車
        axios
          .post(`${VITE_URL}/api/${VITE_PATH}/cart`, { data })
          .then(() => {
            // add to cart
            this.showToast = true;
            this.getCart();
          })
          .catch((err) => {
            // console.log(err);
            this.$swal.fire({
              icon: 'error',
              title: '好像出了點問題',
              text: err.response.data.message,
            });
          });
      }
    },
    setCartQty(id, qty) {
      // 更新本地端購物車數量
      const currentCart = this.carts.find((item) => item.id === id);
      const data = {
        product_id: currentCart.product_id,
        qty,
      };
      this.updateCart(id, data);
    },
    updateCart(id, data = {}) {
      // 開啟loading
      this.isLoading = true;
      // 更新購物車
      axios
        .put(`${VITE_URL}/api/${VITE_PATH}/cart/${id}`, { data })
        .then(() => {
          // 關閉loading
          this.isLoading = false;
          this.getCart();
        })
        .catch((err) => {
          swal.fire({
            icon: 'error',
            title: '好像出了點問題',
            text: err.response.data.message,
          });
        });
    },
    removeCart(id) {
      // 開啟loading
      this.isLoading = true;
      axios
        .delete(`${VITE_URL}/api/${VITE_PATH}/cart/${id}`)
        .then((res) => {
          // 關閉loading
          this.isLoading = false;
          swal.fire({
            icon: 'success',
            title: '已移除商品',
            text: res.data.message,
          });
          this.getCart();
        })
        .catch((err) => {
          swal.fire({
            icon: 'error',
            title: '好像出了點問題',
            text: err.response.data.message,
          });
        });
    },
    removeAllCart() {
      // 開啟loading
      this.isLoading = true;
      axios
        .delete(`${VITE_URL}/api/${VITE_PATH}/carts`)
        .then((res) => {
          // 關閉loading
          this.isLoading = false;
          swal.fire({
            icon: 'success',
            title: '已清空購物車',
            text: res.data.message,
          });
          this.getCart();
        })
        .catch((err) => {
          swal.fire({
            icon: 'error',
            title: '好像出了點問題',
            text: err.response.data.message,
          });
        });
    },
  },
});
