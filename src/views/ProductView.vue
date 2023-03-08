<template>
  <div class="container pt-11" ref="productView">
    <h2 class="text-danger mb-5">商品列表</h2>
    <SearchBar class="mb-10" @search="onSearch"></SearchBar>
    <div v-if="searchResultIsEmpty" class="text-center">
      <h3>查無商品</h3>
    </div>
    <div class="d-flex justify-content-center
    justify-content-md-between align-items-center flex-wrap">
      <div v-for="product in productsPerPage" :key="product.id">
        <ProductCard :targetProduct="product" />
      </div>
    </div>
    <Pagination
    v-model:current_page="currentPage"
    v-model:total_pages="totalPages"
    @page-changed="changePage"></Pagination>
  </div>
  <PageLoading :active="isLoading"></PageLoading>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import productsStore from '../stores/productsStore';

import Pagination from '../components/PaginationComponent.vue';
import ProductCard from '../components/ProductCard.vue';
import SearchBar from '../components/SearchBarComponent.vue';

export default {
  name: 'ProductView',
  data() {
    return {
      currentPage: 1,
      pageSize: 8,
      filtedProducts: [],
      isLoading: false,
    };
  },
  computed: {
    totalPages() {
      // 計算總頁數
      return Math.ceil(this.filtedProducts.length / this.pageSize);
    },
    productsPerPage() {
      // 計算目前頁面的商品資料
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filtedProducts.slice(start, end);
    },
    searchResultIsEmpty() {
      return this.filtedProducts.length === 0;
    },
    ...mapState(productsStore, ['products']),
  },
  methods: {
    changePage(page) {
      this.currentPage = page;
    },
    onSearch(keyword, category, price, country) {
      this.filtedProducts = this.products;
      if (!keyword && category === 'all' && category === ''
      && price === 'all' && price === '' && country === 'all' && country === '') {
        // 如果沒有輸入關鍵字，且沒有選擇任何篩選條件，則不進行篩選
        return;
      }
      if (category !== 'all' && category !== '') {
        // 如果有選擇類別，則進行類別篩選
        this.filtedProducts = this.searchBycategory(this.filtedProducts, category);
      }
      if (price !== 'all' && price !== '') {
        // 如果有選擇價格，則進行價格篩選
        this.filtedProducts = this.searchByPrice(this.filtedProducts, price);
      }
      if (country !== 'all' && country !== '') {
        // 如果有選擇產地，則進行產地篩選
        this.filtedProducts = this.searchByCountry(this.filtedProducts, country);
      }
      this.filtedProducts = this.filtedProducts.filter(
        // 如果有輸入關鍵字，則進行關鍵字篩選
        (product) => product.title.toLowerCase().includes(keyword.toLowerCase()),
      );
    },
    searchBycategory(targetProducts, category) {
      return targetProducts.filter(
        (product) => product.category === category,
      );
    },
    searchByPrice(targetProducts, price) {
      if (price === '0-1000') {
        return targetProducts.filter(
          (product) => product.price < 1000,
        );
      }
      if (price === '1000-5000') {
        return targetProducts.filter(
          (product) => product.price >= 1000 && product.price < 5000,
        );
      }
      if (price === '5000-10000') {
        return targetProducts.filter(
          (product) => product.price >= 5000 && product.price < 10000,
        );
      }
      return targetProducts.filter(
        (product) => product.price >= 10000,
      );
    },
    searchByCountry(targetProducts, country) {
      return targetProducts.filter(
        (product) => product.country === country,
      );
    },
    ...mapActions(productsStore, ['getProducts']),
  },
  mounted() {
    this.isLoading = true;
    this.getProducts().then(() => {
      this.filtedProducts = this.products;
      this.isLoading = false;
      if (this.$route.query.category) {
        this.filtedProducts = this.searchBycategory(
          this.filtedProducts,
          this.$route.query.category,
        );
      }
      if (this.$route.query.keyword) {
        this.filtedProducts = this.filtedProducts.filter(
          (product) => product.title.toLowerCase().includes(
            this.$route.query.keyword.toLowerCase(),
          ),
        );
      }
    });
  },
  components: {
    ProductCard,
    SearchBar,
    Pagination,
  },
};
</script>
