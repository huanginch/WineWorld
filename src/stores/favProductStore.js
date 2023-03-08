import { defineStore } from 'pinia';
import axios from 'axios';
import authStore from './authStore';

export default defineStore('favProductStore', {
  state: () => ({
    favProducts: [],
  }),
  actions: {
    async getFavProducts() {
      const response = await axios.get('https://wineworld-api.onrender.com/favorites');
      const tempProduct = response.data;
      const { user } = authStore();
      this.favProducts = tempProduct.filter((product) => product.userId === user.id);
    },
    async addFavProduct(product) {
      const { user } = authStore();
      await axios.post('https://wineworld-api.onrender.com/favorites', {
        userId: user.id,
        product,
      });
      this.getFavProducts();
    },
    async removeFavProduct(id) {
      await axios.delete(`https://wineworld-api.onrender.com/favorites/${id}`);
      this.getFavProducts();
    },
  },
});
