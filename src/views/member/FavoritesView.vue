<template>
    <h3 class="text-danger mt-5">我的收藏</h3>
    <table class="table align-middle">
        <thead>
            <tr>
                <th></th>
                <th scope="col">商品名稱</th>
                <th scope="col">容量</th>
                <th scope="col">價格</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in favProducts" :key="item.id"
            class="position-relative">
                <td>
                    <button type="button" class="btn text-success"
                    @click="removeFavProduct(item.id)">
                        <iconify-icon
                        icon="material-symbols:delete-outline-sharp"
                        width="20"
                        height="20"
                        class="align-middle"
                        ></iconify-icon>
                    </button>
                </td>
                <td class="text-white">{{ item.product.title }}</td>
                <td>{{ item.product.capacity }}</td>
                <td>{{ item.product.price }}</td>
                <td>
                  <button type="button"
                  class="btn btn-primary text-white" @click="toProduct(item.product.id)">查看</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { mapState, mapActions } from 'pinia';

import favProductStore from '../../stores/favProductStore';

export default {
  computed: {
    ...mapState(favProductStore, ['favProducts']),
  },
  methods: {
    toProduct(id) {
      this.$router.push(`/product/${id}`);
    },
    ...mapActions(favProductStore, ['getFavProducts', 'removeFavProduct']),
  },
  mounted() {
    this.getFavProducts()
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
