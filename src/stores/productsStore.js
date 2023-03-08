import { defineStore } from 'pinia';
import axios from 'axios';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default defineStore('productsStore', {
  state: () => ({
    products: [],
  }),
  actions: {
    async getProducts() {
      const response = await axios.get(`${VITE_URL}/api/${VITE_PATH}/products/all`);
      this.products = response.data.products;
    },

    async getProductById(id) {
      const response = await axios.get(`${VITE_URL}/api/${VITE_PATH}/product/${id}`);
      return response.data.product;
    },

    async getProductByTitle(title) {
      const filteredProducts = this.products.filter((product) => product.title === title);
      return filteredProducts.length > 0 ? filteredProducts[0] : null;
    },

    async getRelatedProducts(category) {
      const response = await axios.get(`${VITE_URL}/api/${VITE_PATH}/products?category=${category}`);
      return response.data.products;
    },
  },
});
