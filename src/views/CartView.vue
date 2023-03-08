<template>
  <div class='pt-11 container mb-5'>
    <h1 class="text-danger mb-5">我的購物車</h1>
    <table class='table text-white align-middle text-center'>
      <thead>
        <tr>
          <th scope='col'></th>
          <th scope='col'>商品名稱</th>
          <th scope='col'>數量</th>
          <th scope="col"></th>
          <th scope='col'>商品價格</th>
          <th scope='col'>小計</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='cartItem in carts' :key='cartItem.id'>
          <th scope='row'>
            <button
              type='button'
              class='btn rounded-0 text-white'
              @click='
                this.$refs.deleteModal.openModal();
                message = `確定要刪除 ${cartItem.product.title} 嗎?`;
                delFunc = removeCart.bind(this, cartItem.id);
              '
            >
              <iconify-icon
                icon='material-symbols:delete-outline-sharp'
                class='text-success fs-4 align-middle'
              ></iconify-icon>
            </button>
          </th>
          <td>{{ cartItem.product.title }}</td>
          <td>
            <a href="#"
            @click.prevent="cartItem.qty > 1 ? cartItem.qty-- : cartItem.qty = 1;
            setCartQty(cartItem.id, cartItem.qty)
            tempId = cartItem.id;"
            >
              <iconify-icon
              width="36"
              height="36"
              icon="ic:outline-minus"
              class="align-middle"
              ></iconify-icon>
            </a>
            <input
            type="text"
            v-model="cartItem.qty"
            min="1"
            class="bg-dark text-white border-0 rounded-0 ps-45"
            style="width: 50px;"
            @change="
            tempId = cartItem.id,
            (e) => setCartQty(cartItem.id, e.target.value * 1)"
            />
            <a href="#"
            @click.prevent="cartItem.qty++;
            setCartQty(cartItem.id, cartItem.qty);
            tempId = cartItem.id;"
            >
            <iconify-icon
            width="36"
            height="36"
            icon="ic:baseline-plus"
            class="align-middle"
            ></iconify-icon>
          </a>
          </td>
          <td>
            <SmallLoading v-if="tempId === cartItem.id"
            class="d-inline align-middle" :active="isLoading"></SmallLoading>
          </td>
          <td>$NT {{ cartItem.product.price }}</td>
          <td>$NT {{ cartItem.final_total }}</td>
        </tr>
      </tbody>
    </table>
    <p class='text-end'>總價格: $NT {{ final_total }}</p>
    <hr />
    <div class='text-end'>
      <a
        class='btn btn-outline-primary me-3 rounded-0'
        @click.prevent="
          message = '確定要清空購物車嗎?';
          delFunc = removeAllCart;
          this.$refs.deleteModal.openModal();
        "
        :class='{ disabled: !totalCart }'
        >清空購物車</a
      >
      <router-link
        to='/checkout'
        class='btn btn-primary rounded-0'
        :class='{ disabled: !totalCart }'
        >結帳</router-link
      >
    </div>
  </div>

  <delete-confirm-modal
    ref='deleteModal'
    :message='message'
    :del-func='delFunc'
  ></delete-confirm-modal>
</template>

<script>
import { mapState, mapActions } from 'pinia';

import DeleteConfirmModal from '../components/DelConfirmModal.vue';
import cartStore from '../stores/cartStore';

import SmallLoading from '../components/loading/SmallLoading.vue';

export default {
  name: 'CartView',
  data() {
    return {
      message: '',
      delFunc: null,
    };
  },
  computed: {
    ...mapState(cartStore, ['carts', 'totalCart', 'final_total', 'isLoading']),
  },
  methods: {
    ...mapActions(cartStore, ['setCartQty', 'removeCart', 'removeAllCart']),
  },
  components: {
    DeleteConfirmModal,
    SmallLoading,
  },
};
</script>
