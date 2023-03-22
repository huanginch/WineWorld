<template>
  <p>訂單編號：{{ targetOrder.id }}</p>
  <p>訂購人姓名: {{ targetOrder.user?.name }}</p>
  <p>訂購人電話: {{ targetOrder.user?.tel }}</p>
  <p>訂購人email: {{ targetOrder.user?.email }}</p>
  <p>訂購人地址: {{ targetOrder.user?.address }}</p>
  <table class="table text-center">
    <thead>
      <tr>
        <th scope="col">商品名稱</th>
        <th scope="col">商品價格</th>
        <th scope="col">商品數量</th>
        <th scope="col">小計</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in targetOrder.products" :key="item.id">
        <td>{{ item.product.title }}</td>
        <td>NT$ {{ numberToCurrencyNo(item.product.price) }}</td>
        <td>{{ item.qty }}</td>
        <td>NT$ {{ numberToCurrencyNo(item.product.price * item.qty) }}</td>
      </tr>
    </tbody>
    <tfoot class="text-center">
      <tr>
        <td colspan="3"></td>
        <td colspan="1">總價格: NT$ {{ numberToCurrencyNo(targetOrder.total) }}</td>
      </tr>
    </tfoot>
  </table>
  <p>訂單狀態：{{ targetOrder.status === '' ? orderStatus[targetOrder.status] : '已成立' }}</p>
  <p>訂單日期：{{ targetOrder.create_at }}</p>
</template>

<script>
import numberToCurrencyNo from '../numberToCurrency';

export default {
  name: 'OrderDetail',
  props: ['order'],
  data() {
    return {
      targetOrder: {},
      orderStatus: {
        0: '已成立',
        1: '未處理',
        2: '已出貨',
        3: '已完成',
      },
    };
  },
  watch: {
    order: {
      handler() {
        this.targetOrder = JSON.parse(JSON.stringify(this.order));
      },
      deep: true,
    },
  },
  methods: {
    numberToCurrencyNo,
  },
};
</script>
