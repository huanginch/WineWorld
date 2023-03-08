<template>
    <div class="profile mt-5">
         <div class="d-flex align-items-center">
             <h3 class="text-danger">個人資料</h3>
             <a v-if="edit === false" href="#" @click.prevent="() => edit = true">
                <iconify-icon icon="material-symbols:edit"
                width="20" height="20" class="ms-3"
                ></iconify-icon>
             </a>
             <a v-else href="#" @click.prevent="edit = false; updateUser();">
                <iconify-icon
                icon="material-symbols:save-sharp"
                style="color: white;"
                width="24"
                height="24"
                class="ms-3">
                </iconify-icon>
             </a>
        </div>
        <div v-if="edit" class="form-group">
          <label for="" class="mb-3">輸入密碼以儲存</label>
          <input type="text" v-model="pwd" class="form-control text-white">
        </div>
        <VForm @submit="submit">
            <div class="d-flex align-items-center mb-3">
                <label for="name" class="text-danger fs-5">姓名</label>
                <VField
                id="name"
                name="name"
                type="text"
                placeholder="請輸入姓名"
                v-model="user.name"
                class="form-control profile-input ms-3"
                :disabled="!edit"
                ></VField>
            </div>
            <div class="d-flex align-items-center mb-3">
                <label for="gender" class="text-danger fs-5">性別</label>
                <select v-model="genderTemp" @change="user.gender = genderTemp;"
                name="gender" id="gender" class="form-control profile-input gender-input">
                    <option value="">請選擇</option>
                    <option value="female">女</option>
                    <option value="male">男</option>
                </select>
            </div>
            <div class="d-flex align-items-center mb-3">
                <label for="bitrh" class="text-danger fs-5">生日</label>
                <VField
                id="bitrh"
                name="birth"
                type="date"
                placeholder="請輸入生日"
                v-model="user.birth"
                class="form-control profile-input"
                :disabled="!edit"
                ></VField>
            </div>
            <div class="d-flex align-items-center mb-3">
                <label for="phone" class="text-danger fs-5">連絡電話</label>
                <VField
                id="phone"
                name="phone"
                type="text"
                placeholder="請輸入聯絡電話"
                v-model="user.phone"
                class="form-control profile-input"
                :disabled="!edit"
                ></VField>
            </div>
            <div class="d-flex align-items-center mb-3">
                <label for="email" class="text-danger fs-5 mb-2">電子郵件</label>
                <VField
                id="email"
                name="email"
                type="text"
                placeholder="請輸入電子郵件"
                v-model="user.email"
                class="form-control profile-input"
                :disabled="!edit"
                ></VField>
            </div>
            <div class="d-flex align-items-center mb-3">
                <label for="address" class="text-danger fs-5 mb-2">地址</label>
                <VField
                id="address"
                name="address"
                type="text"
                placeholder="請輸入地址"
                v-model="user.addr"
                class="form-control mb-3 profile-input"
                :disabled="!edit"
                ></VField>
            </div>
        </VForm>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import authStore from '../../stores/authStore';

export default {
  data() {
    return {
      edit: false,
      genderTemp: '',
      pwd: '',
    };
  },
  computed: {
    ...mapState(authStore, ['user']),
  },
  methods: {
    async updateUser() {
      if (!this.pwd) {
        alert('請輸入密碼');
        return;
      }
      const data = {
        email: this.user.email,
        password: this.pwd,
        name: this.user.name,
        gender: this.genderTemp,
        phone: this.user.phone,
        birth: this.user.birth,
        addr: this.user.addr,
      };
      this.$http.put(`https://wineworld-api.onrender.com/users/${this.user.id}`, data)
        .then((res) => {
          this.setUser(res.data);
        })
        .catch(() => {
          alert('密碼錯誤');
        });
    },
    ...mapActions(authStore, ['setUser']),
  },
  mounted() {
    this.genderTemp = this.user.gender;
  },
};
</script>

<style lang="scss">
.profile .profile-input {
  width: 20%;
  background-color: #1E1E1E;
  border: 0;
  color: white;
  margin-left: 10px;

  @media screen and (max-width: 992px) {
    width: 50%;
  }
}

.profile .gender-input {
    width: 10%;

    @media screen and (max-width: 992px) {
    width: 50%;
  }
}
</style>
