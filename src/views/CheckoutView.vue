<template>
  <div class='checkout container pt-5'>
    <h1 class="text-danger mb-5">結帳</h1>
    <VForm @submit="onSubmit" v-slot="{ errors }">
      <div class="row mb-3">
        <div class="col-6">
          <label for="name" class="form-label">訂購人姓名</label>
          <VField
            id="name"
            name="name"
            type="text"
            class="form-control text-white"
            rules="required"
            v-model="user.name"
            :class="{
              'is-invalid': errors['name'],
              'is-valid': !errors['name'] && user.name,
            }"
            placeholder="請輸入姓名"
          ></VField>
          <error-message name="name" class="invalid-feedback"></error-message>
        </div>
        <div class="col-6">
          <label for="tel" class="form-label">訂購人電話</label>
          <VField
            id="tel"
            name="tel"
            type="tel"
            class="form-control text-white"
            rules="min:8|numeric|required"
            v-model="user.tel"
            :class="{
              'is-invalid': errors['tel'],
              'is-valid': !errors['tel'] && user.tel,
            }"
            placeholder="請輸入電話"
          ></VField>
          <error-message name="tel" class="invalid-feedback"></error-message>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-6">
          <label for="email" class="form-label">訂購人Email</label>
          <VField
            id="email"
            name="email"
            type="email"
            class="form-control text-white"
            rules="email|required"
            v-model="user.email"
            :class="{
              'is-invalid': errors['email'],
              'is-valid': !errors['email'] && user.email,
            }"
            placeholder="請輸入 Email"
          ></VField>
          <error-message name="email" class="invalid-feedback"></error-message>
        </div>
      </div>
      <div class="row mb-5">
        <div class="col-">
          <label for="address" class="form-label">地址</label>
          <VField
            id="address"
            name="address"
            type="text"
            class="form-control text-white"
            rules="required"
            v-model="user.address"
            :class="{
              'is-invalid': errors['address'],
              'is-valid': !errors['address'] && user.address,
            }"
            placeholder="請輸入地址"
          ></VField>
          <error-message
            name="address"
            class="invalid-feedback"
          ></error-message>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div>
            <h3 class="text-danger">商品內容</h3>
            <table class="table text-white">
              <thead>
                <tr>
                  <th scope="col">商品名稱</th>
                  <th scope="col">數量</th>
                  <th scope="col">商品價格</th>
                  <th scope="col">小計</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="cartItem in carts" :key="cartItem.id">
                  <td>{{ cartItem.product.title }}</td>
                  <td>{{ cartItem.qty }}</td>
                  <td>$NT {{ cartItem.product.price }}</td>
                  <td>$NT {{ cartItem.final_total }}</td>
                </tr>
              </tbody>
            </table>
            <p class="text-end">總價格: $NT {{ final_total }}</p>
          </div>
        </div>
      </div>
      <div class="row mb-5">
        <h3 class="text-danger mb-3">付款方式</h3>
        <div>
            <input
            type="radio"
            id="creditCard"
            name="payment"
            value="creditCard"
            class="form-check-input align-middle me-2 border-danger"
            checked
            />
            <iconify-icon
            icon="uil:atm-card" width="24" height="24"
            class="align-middle me-2"></iconify-icon>
            <label for="creditCard">信用卡</label>
            <input
            type="radio"
            id="ATM"
            name="payment"
            value="ATM"
            class="form-check-input align-middle ms-5 me-2 border-danger"
            />
            <iconify-icon icon="mdi:bank" width="24" height="24"
            class="align-middle me-2"></iconify-icon>
            <label for="creditCard">ATM轉帳</label>
        </div>
      </div>
      <div class="row mb-5">
        <h3 class="text-danger">發票</h3>
        <div>
            <input
            type="radio"
            id="invoice"
            name="invoice"
            value="invoice"
            class="form-check-input me-2 border-danger"
            @change="isElectronic = !isElectronic"
            checked
            />
            <label for="invoice">紙本發票</label>
            <input
            type="radio"
            id="invoice3"
            name="invoice"
            value="invoice3"
            class="form-check-input ms-5 me-2 border-danger"
            @change="isElectronic = !isElectronic"
            />
            <label for="invoice3" class="me-5 mb-3 mb-md-0">電子發票</label>
            <div v-if="isElectronic" class="d-md-inline mb-3 mb-md-0">
                <label for="carrier" class="me-5">手機載具</label>
                <input
                type="text"
                :value="carrier"
                id="carrier"
                name="carrier"
                class="bg-dark border-white rounded-2 text-white">
            </div>
            <div class="d-lg-inline">
              <input type="checkbox"
              class="form-check-input mb-3 mb-0 ms-lg-5 border-danger rounded-circle">
              <label for="carrier" class="mx-3">統編</label>
            </div>
            <input
            type="text"
            :value="carrier"
            id="carrier"
            name="carrier"
            class="bg-dark border-white rounded-2 text-white">
        </div>
      </div>
      <div class="row mb-8">
        <div class="col-12 col-lg-8">
          <label for="message" class="mb-2">備註</label>
          <textarea
            v-model="message"
            id="message"
            name="message"
            class="form-control text-white"
            rows="3"
          ></textarea>
        </div>
      </div>
      <div class="text-end">
        <button class="btn btn-primary text-white" type="submit">
            送出訂單
        </button>
      </div>
    </VForm>
  </div>
  <MyLoading v-model:active="isLoading"></MyLoading>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import cartStore from '../stores/cartStore';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  name: 'CheckoutView',
  data() {
    return {
      user: {
        name: '',
        email: '',
        tel: '',
        address: '',
      },
      isElectronic: false,
      message: '',
      isLoading: false,
    };
  },
  computed: {
    ...mapState(cartStore, ['carts', 'final_total']),
  },
  methods: {
    onSubmit() {
      this.isLoading = true;
      const data = {
        user: this.user,
        message: this.message,
        status: 0,
      };
      this.$http
        .post(`${VITE_URL}/api/${VITE_PATH}/order`, { data })
        .then((res) => {
          // 清空購物車
          this.getCart();
          // 關閉 loading
          this.isLoading = false;
          // 顯示訊息
          this.$swal({
            icon: 'success',
            title: '訂單已送出',
            text: res.response.data.message,
            confirmButtonText: '確認',
          });
          // 清空表單
          this.user = {
            name: '',
            email: '',
            tel: '',
            address: '',
          };
          this.message = '';
          // 回到首頁
          this.$router.push('/');
        })
        .catch((err) => {
          this.$swal({
            icon: 'error',
            title: '訂單送出失敗',
            text: err.response.data.message,
            confirmButtonText: '確認',
          });
        });
    },
    ...mapActions(cartStore, ['getCart']),
  },

};
</script>

<style>
.checkout {
  margin-top: 70px;
}
</style>
