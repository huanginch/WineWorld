<template>
  <div class="login-page container text-center pt-11">
    <h1 class="mb-5">Welcome to WineWorld</h1>
    <div class="row">
      <div class="col-12 col-md-8 col-lg-6 mx-auto">
        <VForm
          @submit="signIn(username, password)"
          v-slot="{ errors }"
          class="mb-5"
        >
          <label for="username" class="text-danger fs-4 mb-2">帳號</label>
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
          <ErrorMessage
            name="username"
            class="invalid-feedback mb-3"
          ></ErrorMessage>
          <label for="pwd" class="text-danger fs-4 mb-2">密碼</label>
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
          <ErrorMessage name="pwd" class="invalid-feedback"></ErrorMessage>
          <button type="submit" class="btn btn-primary mt-3 text-white">
            登入
          </button>
        </VForm>
        <p>
          沒有帳號?
          <RouterLink to="/register"
          class="register-btn text-decoration-underline">註冊</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import authStore from '../stores/authStore';

export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
      isLoading: false,
    };
  },
  methods: {
    signIn(username, password) {
      this.$http.post('https://wineworld-api.onrender.com/login', { email: username, password }).then((res) => {
        const token = res.data.accessToken;
        const { user } = res.data;
        document.cookie = `token=${token}`;
        this.setLogged();
        this.setUser(user);
        this.$swal.fire({
          icon: 'success',
          title: '登入成功',
          text: '歡迎回來',
          showConfirmButton: false,
          timer: 1500,
        });
        this.$router.push('/');
      }).catch((err) => {
        this.$swal.fire({
          icon: 'error',
          title: '好像出了點問題',
          text: err.response.data,
        });
      });
    },
    ...mapActions(authStore, ['setUser', 'setLogged']),
  },
};
</script>

<style lang="scss">
.login-page {
  height: 73vh;
}

.register-btn {
  font-size: 1.2rem;
  transition: all 0.3s ease-in-out;
  color: #EF173D;
  &:hover {
    color: #FF4D6D;
  }
}
</style>
