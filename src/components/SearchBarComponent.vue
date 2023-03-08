<template>
    <div class="searchbar input-group">
        <iconify-icon
          icon="material-symbols:search-sharp" width="36" height="36"
          class="search-icon position-absolute translate-middle-y"
          ></iconify-icon>
        <input type="text" v-model="keyword"
        class="bg-info border-0 py-3 ps-7 pe-2 mb-3 mb-md-0 text-white"
        placeholder="請輸入商品名稱"
        />
        <select v-model="filterCategory" class="form-select form-select-sm mb-3 mb-md-0"
        name="category" id="category">
            <option value="" disabled>種類</option>
            <option value="all">全部</option>
            <option value="琴酒">琴酒</option>
            <option value="威士忌">威士忌</option>
            <option value="伏特加">伏特加</option>
            <option value="蘭姆酒">蘭姆酒</option>
            <option value="白蘭地">白蘭地</option>
            <option value="利口酒">利口酒</option>
            <option value="日本酒">日本酒</option>
            <option value="紅白酒">紅白酒</option>
        </select>
        <select v-model="filterPrice" class="form-select form-select-sm mb-3 mb-md-0"
        name="price" id="price">
            <option value="" disabled>價格</option>
            <option value="all">全部</option>
            <option value="0-1000">0~1000</option>
            <option value="1000-5000">1000~5000</option>
            <option value="5000-10000">5000~10000</option>
            <option value="10000-">10000以上</option>
        </select>
        <select v-model="filterCountry" class="form-select form-select-sm mb-3 mb-md-0"
        name="country" id="country">
            <option value="" disabled>產地</option>
            <option value="all">全部</option>
            <option value="台灣">台灣</option>
            <option value="蘇格蘭">蘇格蘭</option>
            <option value="英國">英國</option>
            <option value="美國">美國</option>
            <option value="法國">法國</option>
            <option value="日本">日本</option>
            <option value="墨西哥">墨西哥</option>
            <option value="瑞典">瑞典</option>
            <option value="波多黎各">波多黎各</option>
            <option value="古巴">古巴</option>
            <option value="義大利">義大利</option>
        </select>
        <button type="button" class="search-btn btn btn-primary text-white"
        @click="search">立即搜尋</button>
    </div>
</template>

<script>

export default {
  name: 'SearchBarComponent',
  data() {
    return {
      filterCategory: '',
      filterPrice: '',
      filterCountry: '',
      keyword: '',
    };
  },
  methods: {
    search() {
      this.$emit('search', this.keyword, this.filterCategory, this.filterPrice, this.filterCountry);
    },
  },
};
</script>

<style lang="scss">
.search-icon {
    left: 1%;
    top: 15%;

    @media screen and (min-width: 768px) {
      left: 0%;
      top: 50%;
    }
}

.searchbar {
    input {
        width: 100%;

        @media screen and (min-width: 768px) {
            width: 40%;
        }
    }
}

.search-btn {
    width: 100%;

    @media screen and (min-width: 768px) {
        width: 12%;
    }

    @media screen and (min-width: 992px) {
        width: 15%;
    }
}
</style>
