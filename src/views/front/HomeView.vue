<template>
  <section>
    <div id="banner" class="banner d-flex align-items-center mb-7">
      <div class="container">
        <h1 class="mb-5">你要找的酒，都在這裡</h1>
        <div class="input-group">
          <iconify-icon
          v-if="!searchIsActive"
          icon="material-symbols:search-sharp" width="36" height="36"
          class="search-icon position-absolute translate-middle-y"
          ></iconify-icon>
          <input
          v-model="searchContent"
          type="text"
          class="search-input bg-info border-0 py-3 ps-7 pe-2 mb-3 mb-md-0 text-white"
          placeholder="搜尋"
          />
          <iconify-icon
          v-if="searchIsActive"
          icon="mdi:close-circle"
          class="close-search-icon position-absolute translate-middle-y text-primary"
          width="32" height="32"
          @click="searchContent = '';"
          ></iconify-icon>
          <button type="button" class="search-btn btn btn-primary text-white"
          @click="this.$router.push(`/product?keyword=${searchContent}`)">立即搜尋</button>
        </div>
      </div>
    </div>
    <div class="hot container mb-6 mb-lg-11">
      <div class="row">
        <div class="col-12 d-flex justify-content-between align-items-center mb-65">
          <h2 class="mb-0 text-danger">熱門商品</h2>
          <RouterLink to="/product" class="btn btn-outline-primary text-white">查看更多</RouterLink>
        </div>
        <div class="col-12 col-md-6 col-xl-3">
          <ProductCard :targetProduct="hotProduct1"/>
        </div>
        <div class="col-12 col-md-6 col-xl-3">
          <ProductCard :targetProduct="hotProduct2"/>
        </div>
        <div class="col-12 col-md-6 col-xl-3">
          <ProductCard :targetProduct="hotProduct3"/>
        </div>
        <div class="col-12 col-md-6 col-xl-3">
          <ProductCard :targetProduct="hotProduct4"/>
        </div>
      </div>
    </div>
    <div class="type mb-6 mb-lg-11 w-100">
      <div class="col-12 px-0 d-flex flex-column flex-lg-row">
          <RouterLink to="/product?category=威士忌" class="position-relative">
            <img loading="lazy" src="/種類01.png" class="image-fluid" alt="whisky">
            <div class="text-center position-absolute top-50 start-50 translate-middle">
              <h3>威士忌</h3>
              <p>單麥精釀，精湛工藝</p>
              <button type="button" class="btn btn-primary text-white">立即逛逛</button>
            </div>
          </RouterLink>
          <RouterLink to="/product?category=紅白酒" class="position-relative">
            <img loading="lazy" src="/種類02.png" class="image-fluid" alt="wine">
            <div class="text-center position-absolute top-50 start-50 translate-middle">
              <h3>紅白酒</h3>
              <p>辛香滿溢，時光醇熟</p>
              <button type="button" class="btn btn-primary text-white">立即逛逛</button>
            </div>
          </RouterLink>
      </div>
      <div class="px-0 d-flex flex-column flex-lg-row w-100">
          <RouterLink to="/product?category=日本酒" class="type position-relative">
            <img loading="lazy" src="/種類03.png" class="image-fluid" alt="sake">
            <div class="text-center position-absolute top-50 start-50 translate-middle">
              <h3>日本酒</h3>
              <p>清香獨特，米香濃郁</p>
              <button type="button" class="btn btn-primary text-white">立即逛逛</button>
            </div>
          </RouterLink>
          <RouterLink to="/product?category=利口酒" class="type position-relative">
            <img loading="lazy" src="/種類04.png" class="image-fluid" alt="liquir">
            <div class="text-center position-absolute top-50 start-50 translate-middle">
              <h3>利口酒</h3>
              <p>巧手製作，風味多樣</p>
              <button type="button" class="btn btn-primary text-white">立即逛逛</button>
            </div>
          </RouterLink>
      </div>
    </div>
    <div class="faq container mb-11">
      <div class="row">
        <div class="col-12">
          <h2 class="text-danger mb-45 mb-lg-65">酒類常見問答</h2>
          <WineFAQ></WineFAQ>
        </div>
      </div>
    </div>
    <div class="cocktail container mb-6">
      <div class="row">
        <div class="col-12 d-flex justify-content-between align-items-center mb-65">
          <h2 class="mb-0 text-danger">居家調酒好簡單</h2>
          <button type="button" class="btn btn-outline-primary text-white">查看更多</button>
        </div>
        <a href="https://enjoyer.pixnet.net/blog/post/28865495" class="col-6 col-xl-3 position-relative mb-45 mb-xl-0">
          <img loading="lazy" src="/文章01.png" alt="screwdriver">
          <p class="cocktail_name fs-5 position-absolute bottom-0 text-white">螺絲起子</p>
        </a>
        <a href="https://www.52does.com/%E3%80%90%E8%AA%BF%E9%85%92-%E7%B6%93%E5%85%B8%E3%80%91%E8%97%8D%E8%89%B2%E7%8F%8A%E7%91%9A%E7%A4%81-blue-lagoon/" class="col-6 col-xl-3 position-relative mb-45 mb-xl-0">
          <img loading="lazy" src="/文章02.png" alt="blue lagoon">
          <p class="cocktail_name fs-5 position-absolute bottom-0 text-white">藍色珊瑚礁</p>
        </a>
        <a href="https://www.1shot.tw/17999/%E8%AA%BF%E9%85%92%E7%9F%A5%E8%AD%98-%E6%95%99%E7%88%B6-godfather%EF%BC%8D%E4%BD%A0%E4%B8%8D%E8%83%BD%E6%8B%92%E7%B5%95%E7%9A%84%E8%AA%BF%E9%85%92" class="col-6 col-xl-3 position-relative">
          <img loading="lazy" src="/文章03.png" alt="godfather">
          <p class="cocktail_name fs-5 position-absolute bottom-0 text-white">教父</p>
        </a>
        <a href="https://enjoyer.pixnet.net/blog/post/22861073-%E9%85%92%E8%AD%9C%E5%B0%88%E5%8D%80%EF%BC%882%EF%BC%89%E7%AC%AC%E4%B8%80%E6%9D%AF%E9%85%92---%E7%90%B4%E9%80%9A%E5%AF%A7%EF%BC%88gin-tonic%EF%BC%89" class="col-6 col-xl-3 position-relative">
          <img loading="lazy" src="/文章04.png" alt="gin tonic">
          <p class="cocktail_name fs-5 position-absolute bottom-0 text-white">琴通寧</p>
        </a>
      </div>
    </div>
    <WarningComponent class="warning position-fixed bottom-0 start-0 end-0"/>
    <PageLoading :active="isLoading"/>
  </section>
</template>

<script>
import { mapActions } from 'pinia';

import authStore from '../../stores/authStore';
import cartStore from '../../stores/cartStore';
import productsStore from '../../stores/productsStore';
import favProductStore from '../../stores/favProductStore';

import ProductCard from '../../components/ProductCard.vue';
import WarningComponent from '../../components/WarningComponent.vue';
import WineFAQ from '../../components/WineFAQ.vue';
import PageLoading from '../../components/loading/PageLoading.vue';

export default {
  name: 'HomeView',
  data() {
    return {
      hotProduct1: {},
      hotProduct2: {},
      hotProduct3: {},
      hotProduct4: {},
      searchIsActive: false,
      searchContent: '',
      isLoading: false,
    };
  },
  watch: {
    hotProduct4() {
      if (this.hotProduct4.imageUrl !== undefined) {
        this.isLoading = false;
      }
    },
    searchContent() {
      if (this.searchContent.length > 0) {
        this.searchIsActive = true;
      } else {
        this.searchIsActive = false;
      }
    },
  },
  methods: {
    ...mapActions(cartStore, ['getCart']),
    ...mapActions(productsStore, ['getProductById']),
    ...mapActions(favProductStore, ['getFavProducts']),
    ...mapActions(authStore, ['checkAuth']),
  },
  async created() {
    this.isLoading = true;
    await this.getCart();
    await this.getFavProducts();
    await this.checkAuth();
    this.hotProduct1 = await this.getProductById('-NLFD0Hd7sKXY9imh0iA');
    this.hotProduct2 = await this.getProductById('-NLF79_jCIELkDce9GKP');
    this.hotProduct3 = await this.getProductById('-NLFDiNXM4z1EVVDZ6Ju');
    this.hotProduct4 = await this.getProductById('-NLFB9hvdEStrhLPcYXV');
  },
  components: {
    WarningComponent,
    ProductCard,
    WineFAQ,
    PageLoading,
  },
};
</script>

<style lang="scss">
.banner {
    background-image: url('../BN1.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
}

.input-group {
    position: relative;
  .search-icon {
    position: absolute;
    left: 1%;
    top: 23%;
    padding: 5px;

    @media screen and (min-width: 768px) {
      left: 0%;
      top: 50%;
    }
  }

  .close-search-icon {
    left: 90%;
    top: 23%;
    z-index: 100;
    cursor: pointer;
    @media screen and (min-width: 768px) {
      left: 36%;
      top: 50%;
    }
  }

  .search-input {
    width: 100%;

    @media screen and (min-width: 768px) {
      width: 40%;
    }
  }

  .search-btn {
    width: 100%;

    @media screen and (min-width: 768px) {
      width: auto;
    }
  }

  .warning {
    z-index: 100;
  }
}

.type {
  img {
    width: 100%;
  }

  a:hover {
    color: white;
  }
}

.faq {
  @media screen and (min-width: 992px) {
    h2 {
      text-align: center;
    }
  }
}

.cocktail {
  a:hover {
    transition: all 0.3s ease-in-out;
    transform: scale(1.1);
  }

  a {
    text-align: center;
  }

  img {
      width: 80%;
      height: 100%;
      object-fit: cover;

      @media screen and (min-width: 768px) {
        width: 100%;
      }
  }
}

.cocktail_name {
  left: 20%;
  @media screen and (min-width: 768px) {
    left: 10%;
  }
}
</style>
