<template>
  <router-link :to="{ path: `/product/${targetProduct.id}` }">
    <div class="card bg-dark mb-3 mx-auto">
      <div class="card-head mb-2 position-relative">
          <img
          :src="targetProduct.imageUrl"
          class="card-img-top rounded-0"
          :alt="targetProduct.title"
          />
          <div class="img-overlay">
            <button type="button" class="btn btn-outline-primary text-white">立即逛逛</button>
          </div>
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
      </div>
      <div class="card-body rounded-0 px-0">
        <h5 class="card-title text-white mb-1">{{ targetProduct.title }}</h5>
        <p class="card-text text-primary">$NT{{ targetProduct.price }}</p>
      </div>
    </div>
  </router-link>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import favProductStore from '../stores/favProductStore';
import authStore from '../stores/authStore';

export default {
  props: ['targetProduct'],
  data() {
    return {
      product: {},
      isFavorite: false,
    };
  },
  watch: {
    targetProduct() {
      this.product = JSON.parse(JSON.stringify(this.targetProduct));
      this.setIsFavorite();
    },
  },
  computed: {
    ...mapState(authStore, ['isLogged']),
    ...mapState(favProductStore, ['favProducts']),
  },
  methods: {
    toggleFavorite() {
      if (!this.isLogged) {
        this.$router.push('/login');
        return;
      }
      if (this.isFavorite) {
        this.isFavorite = false;
        const currentProduct = this.favProducts.find(
          (item) => item.product.id === this.product.id,
        );
        this.removeFavProduct(currentProduct.id);
      } else {
        this.isFavorite = true;
        this.addFavProduct(this.product);
      }
    },
    setIsFavorite() {
      if (this.favProducts) {
        const currentProduct = this.favProducts.find(
          (item) => item.product.id === this.product.id,
        );
        if (!currentProduct) {
          this.isFavorite = false;
        } else {
          this.isFavorite = true;
        }
      }
    },
    ...mapActions(favProductStore, ['addFavProduct', 'removeFavProduct']),
  },
  mounted() {
    this.product = JSON.parse(JSON.stringify(this.targetProduct));
    this.setIsFavorite();
  },
};
</script>

<style lang="scss">
.card {
  width: 300px;
  height: 500px;
  border: none;
  border-radius: 0;
  transition: all 0.3s ease-in-out;

  &:hover {
    transition: all 0.3s ease-in-out;
  }

  &-head {
    height: 300px;
  }

  &-img-top {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.img-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: all 0.3s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    opacity: 1;
  }
}

.favorite-icon {
  z-index: 0;
  position: absolute;
  bottom: 0%;
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
