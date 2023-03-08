<template>
  <div class="productDetail d-flex flex-column flex-lg-row justify-content-center">
    <div class="me-md-10">
      <VSwiper
      :slides-per-view="1"
      :space-between="10"
      :loop="true"
      :navigation="true"
      :thumbs="{ swiper: thumbsSwiper }"
      :modules="modules"
      class="mySwiper mb-3"
    >
      <SwiperSlide>
         <div class="img-container">
          <img
          class="me-5"
          :src="targetProduct.imageUrl"
          :alt="targetProduct.title"
          />
         </div>
      </SwiperSlide>
      <SwiperSlide v-for="(img, index) in targetProduct.imagesUrl" :key="img">
        <div class="img-container">
          <img
          class="me-5"
          :src="img"
          :alt="targetProduct.title + index"
          />
        </div>
      </SwiperSlide>
    </VSwiper>
    <VSwiper
    @swiper="setThumbsSwiper"
    :loop="true"
    :spaceBetween="10"
    :slidesPerView="4"
    :freeMode="true"
    :watchSlidesProgress="true"
    :modules="modules"
    class="mySwiper2 d-none d-md-block"
    >
      <SwiperSlide>
       <div class="img-container">
         <img
          class="me-5 img-fluid"
          :src="targetProduct.imageUrl"
          :alt="targetProduct.title"
        />
       </div>
      </SwiperSlide>
      <SwiperSlide v-for="(img, index) in targetProduct.imagesUrl" :key="img">
        <div class="img-container">
          <img
          class="me-5 img-fluid"
          :src="img"
          :alt="targetProduct.title + index"
          />
        </div>
      </SwiperSlide>
    </VSwiper>
    </div>
    <div>
      <h1 class="mb-5 position-relative">
        {{ targetProduct.title }}
          <a v-if="isFavorite" @click.prevent="toggleFavorite" href="#">
            <iconify-icon
            icon="mdi:cards-heart"
            class="favorite-icon is-fav m-2"
            width="32"
            height="32"
            ></iconify-icon>
          </a>
          <a v-else @click.prevent="toggleFavorite" href="#">
            <iconify-icon
            icon="mdi:cards-heart-outline"
            class="favorite-icon not-fav m-2"
            width="32"
            height="32"
            ></iconify-icon>
          </a>
      </h1>
      <h3>商品介紹</h3>
      <p class="productDescription">{{ targetProduct.description }}</p>
      <h3 class="mb-1">價格</h3>
      <p class="fs-3 text-primary mb-5 fw-bold">
        $NT {{ targetProduct.price }}
      </p>
      <div class="d-flex justify-content-between mb-5">
        <p>酒精濃度: {{ targetProduct.abv }}</p>
        <p>產地: {{ targetProduct.country }}</p>
        <p>容量: {{ targetProduct.capacity }}</p>
      </div>
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-start">
        <div class="d-flex justify-content-between align-items-center me-md-5 mb-3 mb-me-0">
          <a href="#"
          @click.prevent="qty > 1 ? qty-- : qty = 1"
          >
            <iconify-icon
            width="36"
            height="36"
            icon="ic:outline-minus"></iconify-icon>
          </a>
          <input
          type="text"
          v-model="qty"
          class="bg-dark text-white border-0 rounded-0 ps-45"
          style="width: 50px;"
          />
          <a href="#"
          @click.prevent="qty++"
          >
          <iconify-icon
          width="36"
          height="36"
          icon="ic:baseline-plus"
          ></iconify-icon>
          </a>
        </div>
        <button
          type="button"
          class="btn btn-outline-primary rounded-0 me-0 mb-3 mb-md-0 me-md-3"
          @click="addToCart(targetProduct.id, qty);"
        >
          加入購物車
        </button>
        <router-link
          to="/checkout"
          class="btn btn-primary text-white"
          @click="addToCart(targetProduct.id, qty)"
          >直接購買</router-link
        >
      </div>
    </div>
  </div>
  <CartAlert ref="cartToast" message="已加入購物車"></CartAlert>
</template>

<script>
import { mapActions, mapState } from 'pinia';

import { FreeMode, Navigation, Thumbs } from 'swiper/core';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import 'swiper/css/navigation';

import cartStore from '@/stores/cartStore';
import authStore from '../stores/authStore';
import favProductStore from '../stores/favProductStore';

import CartAlert from './loading/CartAlert.vue';

export default {
  name: 'ProductDetailView',
  props: ['targetProduct'],
  data() {
    return {
      modules: [FreeMode, Navigation, Thumbs],
      thumbsSwiper: null,
      qty: 1,
      isFavorite: false,
    };
  },
  watch: {
    targetProduct() {
      this.setIsFavorite();
    },
    showToast() {
      this.$refs.cartToast.showCartToast();
    },
  },
  computed: {
    ...mapState(authStore, ['isLogged']),
    ...mapState(favProductStore, ['favProducts']),
    ...mapState(cartStore, ['showToast']),
  },
  methods: {
    setThumbsSwiper(swiper) {
      this.thumbsSwiper = swiper;
    },
    toggleFavorite() {
      if (!this.isLogged) {
        this.$router.push('/login');
        return;
      }
      if (this.isFavorite) {
        this.isFavorite = false;
        const currentProduct = this.favProducts.find(
          (item) => item.product.id === this.targetProduct.id,
        );
        this.removeFavProduct(currentProduct.id);
      } else {
        this.isFavorite = true;
        this.addFavProduct(this.targetProduct);
      }
    },
    setIsFavorite() {
      if (this.favProducts) {
        const currentProduct = this.favProducts.find(
          (item) => item.product.id === this.targetProduct.id,
        );
        if (!currentProduct) {
          this.isFavorite = false;
        } else {
          this.isFavorite = true;
        }
      }
    },
    ...mapActions(cartStore, ['addToCart']),
    ...mapActions(favProductStore, ['addFavProduct', 'removeFavProduct']),
  },
  mounted() {
    this.setIsFavorite();
  },
  components: {
    CartAlert,
  },
};
</script>

<style lang="scss">
.mySwiper {
  max-width: 300px;
  max-height: 300px;

  @media screen and (min-width: 768px) {
    width: 300px;
    height: 400px;
  }
}

.mySwiper2 {
  width: 500px;
  height: 100px;
  cursor: pointer;
}

.img-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.swiper-button-next::after,
.swiper-button-prev::after {
  color: #BAB8BA;
}

.productDetail {
  margin-top: 50px;
}

img {
  max-height: 500px;
}

.productDescription {
  max-width: 1000px;
}

input:focus-visible {
  outline: 2px solid #ced4da;
}

.favorite-icon {
  z-index: 0;
  position: absolute;
  top: 0%;
  right: 0%;
  cursor: pointer;
}

.is-fav {
  transition: all 0.3s ease-in-out;
  color: #FF4D6D;

  &:hover {
    color: #fff;
  }
}

.not-fav {
  transition: all 0.3s ease-in-out;
  color: #fff;

  &:hover {
    color: #FF4D6D;
  }
}
</style>
