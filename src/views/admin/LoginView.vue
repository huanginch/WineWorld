<template>
  <div class="container text-center mt-5">
    <h1 class="mb-5">WineWorld Admin</h1>
    <div class="row">
      <div class="col-12 col-md-8 col-lg-6 mx-auto">
        <VForm
          @submit="signIn(username, password)"
          v-slot="{ errors }"
          class="mb-5"
        >
          <label for="username" class="mb-2">帳號</label>
          <VField
            id="username"
            name="username"
            type="email"
            class="form-control mb-3 text-white"
            rules="email|required"
            :class="{
              'is-invalid': errors['username'],
              'is-valid': !errors['username'] && username,
            }"
            placeholder="請輸入帳號/Email"
            v-model="username"
          />
          <error-message
            name="username"
            class="invalid-feedback mb-3"
          ></error-message>
          <label for="pwd" class="mb-2">密碼</label>
          <VField
            id="pwd"
            name="pwd"
            type="password"
            class="form-control mb-3 text-white"
            rules="required"
            :class="{
              'is-invalid': errors['pwd'],
              'is-valid': !errors['pwd'] && password,
            }"
            placeholder="請輸入密碼"
            v-model="password"
          />
          <error-message name="pwd" class="invalid-feedback"></error-message>
          <button type="submit" class="btn btn-primary mt-3 text-white">
            登入
          </button>
        </VForm>
        <router-link to="/" class="text-decoration-underline">回到前台</router-link>
      </div>
    </div>
  </div>
  <MyLoading v-model:active="isLoading"></MyLoading>
</template>

<script>
// import { mapActions } from 'pinia';
// import authStore from '../stores/authStore';

const { VITE_URL } = import.meta.env;

export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    signIn(username, password) {
      this.isLoading = true;
      this.$http
        .post(`${VITE_URL}/admin/signin`, {
          username,
          password,
        })
        .then((res) => {
          // isLogged.value = true;
          const { token, expired } = res.data;
          document.cookie = `hexToken=${token}; expired=${new Date(expired)};`;
          this.$swal.fire({
            icon: 'success',
            title: '登入成功',
            showConfirmButton: false,
            timer: 1500,
          });
          this.$router.push('/admin/products');
        })
        .catch((err) => {
          // isLogged.value = false;
          console.log(err);
          this.$swal.fire({
            icon: 'error',
            title: '很不幸的...',
            text: err.response.data.message,
          });
        });
    },
    // ...mapActions(authStore, ['checkAuth']),
  },
};

</script>
