<template>
    <aside class="dashboard d-flex flex-column ps-6 pe-8 bg-light">
        <h2 class="text-white mb-5">歡迎使用後台</h2>
        <router-link to="/admin/products" class="dashboard-link mb-3 fs-5">產品管理</router-link>
        <router-link to="/admin/orders" class="dashboard-link mb-3 fs-5">訂單管理</router-link>
        <a href="/" class="signOut mb-3 fs-5 text-decoration-none" @click.prevent="signOut">登出</a>
    </aside>
</template>

<script>
const { VITE_APP_URL } = import.meta.env;

export default {
  name: 'DashBoard',
  methods: {
    signOut() {
      this.$http.post(`${VITE_APP_URL}/logout`)
        .then((res) => {
          this.$swal.fire({
            icon: 'success',
            title: '掰掰',
            tesxt: res.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
          //   isLogged = false;
          this.$router.push('/');
        })
        .catch((err) => {
          this.$swal.fire({
            icon: 'error',
            title: '掰掰失敗',
            text: err.response.data.message,
          });
        });
    },
  },
};
</script>

<style lang="scss">
.dashboard {
    position: fixed;
    top: 0;
    padding-top: 70px;
    height: 100vh;
    max-width: 300px;
}

.signOut {
    color: #BAB8B8;
    transition: all 0.3s ease-in-out;
    &:hover {
        color: gray;
    }
}

.dashboard-link {
    transition: all 0.3s ease-in-out;
    &:active {
        color: #BAB8B8;
    }

    &:focus {
        color: #BAB8B8;
    }
}
</style>
