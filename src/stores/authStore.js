import { defineStore } from 'pinia';

import axios from 'axios';

export default defineStore('authStore', {
  state: () => ({
    user: {},
    isLogged: false,
  }),
  actions: {
    setLogged() {
      this.isLogged = true;
    },
    clearLogged() {
      this.isLogged = false;
    },
    setUser(user) {
      this.user = user;
      localStorage.setItem('userId', JSON.stringify(user.id));
    },
    clearUser() {
      this.user = {};
    },
    async checkAuth() {
      const userId = localStorage.getItem('userId');
      if (!userId) return;
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      axios.get(`https://wineworld-api.onrender.com/600/users/${userId}`)
        .then((response) => {
          this.setUser(response.data);
          this.setLogged();
        }).catch(() => {});
    },
  },
});
