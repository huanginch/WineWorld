<template>
      <div class="container pt-11 text-center">
        <h1 class="text-danger mb-5">註冊</h1>
        <VForm v-slot="{ errors }" @submit="register()">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-4 mx-auto">
                    <label for="account" class="text-danger mb-3 fs-4">* 帳號</label>
                    <VField
                    id="account"
                    name="account"
                    type="text"
                    class="form-control mb-3 text-white"
                    rules="email|required"
                    :class="{
                        'is-invalid': errors['account'],
                        'is-valid': !errors['account'] && account,
                    }"
                    placeholder="請輸入帳號"
                    v-model="email"
                    ></VField>
                    <ErrorMessage name="account"/>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md-6 col-lg-4 mx-auto">
                    <label for="password" class="text-danger mb-3 fs-4">* 密碼</label>
                    <VField
                    id="password"
                    name="password"
                    type="password"
                    class="form-control mb-3 text-white"
                    rules="required|min:8"
                    ref="password"
                    :class="{
                        'is-invalid': errors['password'],
                        'is-valid': !errors['password'] && password,
                    }"
                    placeholder="請輸入密碼"
                    v-model="password"></VField>
                    <ErrorMessage name="password"/>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md-6 col-lg-4 mx-auto">
                    <label for="passwordConfirm" class="text-danger mb-3 fs-4">* 確認密碼</label>
                    <VField
                    id="passwordConfirm"
                    name="passwordConfirm"
                    type="password"
                    class="form-control mb-3 text-white"
                    rules="required"
                    :class="{
                        'is-invalid': errors['passwordConfirm'],
                        'is-valid': !errors['passwordConfirm'] && passwordConfirm,
                    }"
                    placeholder="請再次輸入密碼"
                    v-model="passwordConfirm"></VField>
                    <ErrorMessage name="passwordConfirm"/>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md-6 col-lg-4 mx-auto">
                    <label for="name" class="text-danger fs-4 mb-3">* 姓名</label>
                    <VField
                    id="name"
                    name="name"
                    v-model="name"
                    type="text"
                    class="form-control mb-3 text-white"
                    rules="required"
                    placeholder="請輸入姓名"
                    :class="{
                        'is-invalid': errors['name'],
                        'is-valid': !errors['name'] && name,
                    }"
                    ></VField>
                    <ErrorMessage name="name"/>
                </div>
            </div>
            <div class="row mb-2">
                <div class="col-12 col-md-6 col-lg-4 mx-auto">
                    <label for="gender"
                    class="d-block text-danger fs-4 mb-2">* 性別</label>
                    <VField name="gender" type="radio" :value="false"
                    >
                        <label class="me-5">
                            <input type="radio" name="gender" v-model="gender" value="male"
                            class="form-check-input border-white"
                            />
                            男
                        </label>
                    </VField>
                    <VField name="gender" type="radio" value="true">
                    <label>
                            <input type="radio" name="gender" v-model="gender" value="female"
                            class="form-check-input border-white"
                            />
                            女
                        </label>
                    </VField>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md-6 col-lg-4 mx-auto">
                    <label for="birth" class="text-danger fs-4 mb-2">* 生日</label>
                    <VField
                    id="birth"
                    name="birth"
                    v-model="birth"
                    type="date"
                    class="form-control mb-3 text-white"
                    rules="required"
                    placeholder="請輸入生日"
                    :class="{
                        'is-invalid': errors['birth'],
                        'is-valid': !errors['birth'] && birth,
                    }"
                    ></VField>
                    <ErrorMessage name="birth"/>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md-6 col-lg-4 mx-auto">
                    <label for="phone" class="text-danger fs-4 mb-2">* 電話</label>
                    <VField
                    id="phone"
                    name="phone"
                    v-model="phone"
                    type="tel"
                    class="form-control mb-3 text-white"
                    rules="numeric|required"
                    placeholder="請輸入電話"
                    :class="{
                        'is-invalid': errors['phone'],
                        'is-valid': !errors['phone'] && phone,
                    }"
                    ></VField>
                    <ErrorMessage name="phone"/>
                </div>
            </div>
            <div class="row mb-5">
                <div class="col-12 col-md-8 mx-auto">
                    <label for="address" class="text-danger fs-4 mb-2">* 地址</label>
                    <div class="row mb-3">
                        <div class="col-12 col-md-6 col-lg-4 mb-3 mb-lg-0">
                            <select class="form-select" v-model="city">
                                <option
                                v-for="item in TaiwanCountryData"
                                :value="item.CityName"
                                :key="item.CityName">{{ item.CityName }}</option>
                        </select>
                        </div>
                        <div class="col-12 col-md-6 col-lg-4 mb-3 mb-lg-0">
                            <select class="form-select" v-model="township">
                                <option
                                v-for="areaList in TaiwanCountryData[this.cityIndex]?.AreaList"
                                :value="areaList.AreaName"
                                :key="areaList.ZipCode">{{ areaList.AreaName }}</option>
                            </select>
                        </div>
                        <div class="col-12 col-lg-4 d-flex align-items-center">
                            <p class="mb-0 fs-5">郵遞區號: {{ ZipCode }}</p>
                        </div>
                    </div>
                    <VField
                    id="address"
                    name="address"
                    v-model="address"
                    type="text"
                    class="form-control mb-3 text-white"
                    rules="required"
                    placeholder="請輸入地址"
                    :class="{
                        'is-invalid': errors['address'],
                        'is-valid': !errors['address'] && address,
                    }"
                    ></VField>
                    <ErrorMessage name="address"/>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md-4 col-lg-2 mx-auto">
                    <button type="submit" class="btn btn-primary text-white w-100">註冊</button>
                </div>
            </div>
       </VForm>
      </div>
</template>

<script>
import TaiwanCountryData from '../../../TaiwanCountryData.json';

export default {
  name: 'RegisterView',
  data() {
    return {
      TaiwanCountryData,
      email: '',
      password: '',
      passwordConfirm: '',
      name: '',
      gender: '',
      birth: '',
      phone: '',
      city: '',
      cityIndex: '',
      township: '',
      ZipCode: '',
      address: '',
      isLoading: false,
    };
  },
  watch: {
    city() {
      this.cityIndex = this.TaiwanCountryData.findIndex((item) => item.CityName === this.city);
    },
    township() {
      const tempArea = this.TaiwanCountryData[this.cityIndex].AreaList.find(
        (item) => item.AreaName === this.township,
      );
      this.ZipCode = tempArea.ZipCode;
    },
  },
  methods: {
    register() {
      const data = {
        email: this.email,
        password: this.password,
        name: this.name,
        gender: this.gender,
        birth: this.birth,
        phone: this.phone,
        addr: this.postalCode + this.city + this.township + this.address,
      };
      this.$http.post('https://wineworld-api.onrender.com/users', data)
        .then(() => {
          this.$swal({
            title: '註冊成功',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
          });
          this.$router.push('/login');
        }).catch((error) => {
          this.$swal({
            title: '註冊失敗',
            text: error.response.data,
            icon: 'error',
            timer: 2000,
            showConfirmButton: false,
          });
        });
    },
  },
};
</script>

<style>
input[type="date"]::-webkit-calendar-picker-indicator {
    background: url('https://api.iconify.design/material-symbols/date-range-sharp.svg?color=white') no-repeat center center / contain;
    width: 20px;
    height: 20px;
    border-width: thin;
}
</style>
