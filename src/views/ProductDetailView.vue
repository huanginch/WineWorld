<template>
    <div class="container pt-11">
      <ProductDetail :target-product="product" class="mt-11 mb-8"></ProductDetail>
      <h3 class="text-danger mt-8 mt-lg-0">你可能會喜歡</h3>
      <RelatedProduct :related-products="relatedProducts" class="mt-11"></RelatedProduct>
    </div>
    <PageLoading :active="isLoading"/>
</template>

<script>
import { mapActions } from 'pinia';
import ProductDetail from '@/components/ProductDetail.vue';
import RelatedProduct from '@/components/RelatedProduct.vue';
import productsStore from '../stores/productsStore';

export default {
  name: 'ProductDetailView',
  data() {
    return {
      product: {},
      relatedProducts: [],
      isLoading: false,
    };
  },
  methods: {
    ...mapActions(productsStore, ['getProductById', 'getRelatedProducts']),
  },
  mounted() {
    this.isLoading = true;
    this.getProductById(this.$route.params.id).then((res) => {
      this.isLoading = false;
      this.product = res;
      this.getRelatedProducts(this.product.category).then((product) => {
        this.relatedProducts = product;
        this.relatedProducts = this.relatedProducts.filter(
          // filter out the current product
          (item) => item.id !== this.product.id,
        );
      });
    });
  },
  components: {
    ProductDetail,
    RelatedProduct,
  },
};
</script>
