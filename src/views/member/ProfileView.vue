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
          <input type="text" v-model="pwd" class="form-control text-white mb-3">
        </div>
        <VForm @submit="submit">
            <div class="d-flex align-items-center mb-3">
                <label for="name" class="text-danger fs-5">姓名</label>
                <VField
                id="name"
                name="name"
                type="text"
                placeholder="請輸入姓名"
                v-model="tempUser.name"
                class="form-control profile-input ms-3"
                :disabled="!edit"
                ></VField>
            </div>
            <div class="d-flex align-items-center mb-3">
                <label for="gender" class="text-danger fs-5">性別</label>
                <select v-model="genderTemp" @change="tempUser.gender = genderTemp;"
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
                v-model="tempUser.birth"
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
                placeholder="請輸入電話"
                v-model="tempUser.phone"
                class="form-control profile-input"
                :disabled="!edit"
                ></VField>
            </div>
            <div class="d-flex align-items-center mb-3">
                <label for="email" class="text-danger fs-5">電子郵件</label>
                <VField
                id="email"
                name="email"
                type="text"
                placeholder="請輸入電子郵件"
                v-model="tempUser.email"
                class="form-control profile-input"
                :disabled="!edit"
                ></VField>
            </div>
            <div class="d-md-flex align-items-md-center mb-3">
                <label for="address" class="text-danger fs-5 mb-2">地址</label>
                <VField
                id="address"
                name="address"
                type="text"
                placeholder="請輸入地址"
                v-model="tempUser.addr"
                class="address-style form-control ps-0 ps-md-5 mb-3 profile-input"
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
      tempUser: {},
    };
  },
  computed: {
    ...mapState(authStore, ['user']),
  },
  methods: {
    async updateUser() {
      if (!this.pwd) {
        this.tempUser = { ...this.user };
        this.genderTemp = this.user.gender;
        this.$swal.fire({
          icon: 'error',
          title: '修改失敗',
          text: '請輸入密碼',
        });
        return;
      }
      const data = {
        email: this.tempUser.email,
        password: this.pwd,
        name: this.tempUser.name,
        gender: this.genderTemp,
        phone: this.tempUser.phone,
        birth: this.tempUser.birth,
        addr: this.tempUser.addr,
      };
      this.$http.put(`https://wineworld-api.onrender.com/users/${this.user.id}`, data)
        .then((res) => {
          this.setUser(res.data);
          this.tempUser = { ...this.user };
          this.$swal.fire({
            icon: 'success',
            title: '修改成功',
            text: '修改成功',
          });
        })
        .catch((err) => {
          this.tempUser = { ...this.user };
          this.genderTemp = this.user.gender;
          this.$swal.fire({
            icon: 'error',
            title: '修改失敗',
            text: err.response.data,
          });
        });
    },
    ...mapActions(authStore, ['setUser']),
  },
  mounted() {
    this.genderTemp = this.user.gender;
    this.tempUser = { ...this.user };
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

input[type="date"]::-webkit-calendar-picker-indicator {
    background: url('https://api.iconify.design/material-symbols/date-range-sharp.svg?color=white') no-repeat center center / contain;
    width: 20px;
    height: 20px;
    border-width: thin;
}

.address-style {
  width: 100%;

  @media screen and (max-width: 992px) {
    width: 50%;
  }
}
</style>
