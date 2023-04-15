<template>
    <aside class="dashboard d-flex flex-column ps-6 pe-8 bg-light">
        <h2 class="text-white mb-5">歡迎使用後台</h2>
        <RouterLink to="/admin" class="dashboard-link mb-3 fs-5">產品管理</RouterLink>
        <RouterLink to="/admin/orders" class="dashboard-link mb-3 fs-5">訂單管理</RouterLink>
        <RouterLink to="/admin-login"
        class="signOut mb-3 fs-5 text-decoration-none"
        @click.prevent="signOut">登出</RouterLink>
    </aside>
</template>

<script>

export default {
  name: 'DashBoard',
  methods: {
    signOut() {
      document.cookie = 'adminToken=';
      this.$swal({
        title: '登出成功',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
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
