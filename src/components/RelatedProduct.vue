<template>
    <div class="d-flex flex-wrap justify-content-center">
      <div v-for="product in relatedProducts" :key="product.id" class="me-5" @click="relaodPage">
        <ProductCard :targetProduct="product" class="mt-11"></ProductCard>
      </div>
    </div>
</template>

<script>
import ProductCard from './ProductCard.vue';

export default {
  name: 'RelatedProduct',
  props: ['relatedProducts'],
  data() {
    return {};
  },
  methods: {
    relaodPage() {
      this.$router.go(0);
    },
  },
  components: {
    ProductCard,
  },
};
</script>
