<template>
    <div class='container pt-11'>
        <h1 class="text-danger mb-6">常見問題</h1>
        <h2 class="text-danger mb-5">訂單常見問答</h2>
        <OrderFAQ class="mb-10"/>
        <h2 class="text-danger mb-5">酒類常見問答</h2>
        <WineFAQ/>
    </div>
</template>

<script>
import OrderFAQ from '../../components/OrderFAQ.vue';
import WineFAQ from '../../components/WineFAQ.vue';

export default {
  name: 'FaqView',
  components: {
    WineFAQ,
    OrderFAQ,
  },
};
</script>
