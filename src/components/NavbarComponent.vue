<template>
  <nav
    class="position-fixed top-0 start-0 end-0 navbar navbar-expand-lg py-4"
    :class="{ 'bg-transparent': changeColor && !menuDropdown,
    'bg-dark': !changeColor || menuDropdown }"
  >
    <div class="container">
      <RouterLink class="navbar-brand text-primary fs-4" to="/"
        >WineWorld</RouterLink
      >
      <RouterLink
        class="d-flex align-items-center d-lg-none nav-link ms-auto"
        to="/cart"
      >
        <iconify-icon
          icon="ph:shopping-cart-fill"
          width="36"
          height="36"
          class="me-1"
        ></iconify-icon>
        <div class="position-relative">
          <div class="triangle"></div>
          <span class="cart-num badge rounded-0 bg-secondary">{{ totalCart }}</span>
        </div>
      </RouterLink>
      <RouterLink
        class="navbar-toggler"
        to="/member"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <iconify-icon
        v-if="!menuDropdown"
        @click="toggleMenuDropdown"
        icon="ic:outline-menu"
        ></iconify-icon>
        <iconify-icon
        v-else
        icon="charm:cross"
        @click="toggleMenuDropdown"
        ></iconify-icon>
      </RouterLink>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-lg-auto mb-2 mb-lg-0">
          <li class="nav-item mb-5 mb-lg-0">
            <RouterLink @click="toggleMenu"
            class="nav-link py-0" aria-current="page" to="/product"
              >商品列表
              </RouterLink>
          </li>
          <li class="nav-item me-lg-3 mb-5 mb-lg-0">
            <RouterLink @click="toggleMenu" class="nav-link p-0" to="/faq">常見問題</RouterLink>
          </li>
          <li class="me-lg-3">
            <RouterLink class="cart d-none d-lg-flex align-items-center nav-link py-0" to="/cart">
              <iconify-icon
              icon="ph:shopping-cart-fill"
              width="36"
              height="36"
              ></iconify-icon>
              <div class="position-relative">
                <div class="triangle"></div>
                <span class="cart-num badge rounded-0 bg-secondary">{{ totalCart }}</span>
              </div>
            </RouterLink>
          </li>
          <li v-if="!isLogged" class="login mt-auto mt-lg-0 pb-3 pb-lg-0">
            <RouterLink
              class="btn btn-primary text-white py-3"
              @click="toggleMenu"
              to="/login"
              >登入/註冊</RouterLink
            >
          </li>
          <li v-if="isLogged" class="nav-item dropdown">
            <a
              class="member-icon nav-link dropdown-toggle py-0"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              @click="toggleMemberDropdown"
            >
              <span class="d-flex d-lg-none align-items-center">
                會員專區
                <iconify-icon
                v-if="memberDropdown"
                icon="ic:outline-minus"></iconify-icon>
                <iconify-icon
                v-else
                icon="ic:baseline-plus"
                ></iconify-icon>
              </span>
              <iconify-icon
                class="d-none d-lg-inline-block"
                icon="ic:baseline-account-box"
                width="36"
                height="36"
              ></iconify-icon>
            </a>
            <ul class="dropdown-menu bg-dark end-0">
              <li>
                <RouterLink
                  class="dropdown-item text-white"
                  to="/member/profile"
                  @click="toggleMenu"
                  >個人資料</RouterLink
                >
              </li>
              <li>
                <RouterLink
                @click="toggleMenu"
                class="dropdown-item text-white"
                to="/member/orders"
                  >訂單查詢</RouterLink
                >
              </li>
              <li>
                <RouterLink
                @click="toggleMenu"
                  class="dropdown-item text-white"
                  to="/member/favorites"
                  >我的收藏</RouterLink
                >
              </li>
              <li>
                <a
                  class="dropdown-item text-warning"
                  href="#"
                  @click.prevent="logout"
                  >登出</a
                >
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import cartStore from '../stores/cartStore';
import authStore from '../stores/authStore';

export default {
  props: ['isHome'],
  data() {
    return {
      scrollPosition: 0,
      changeColor: true, // change to transparent
      memberDropdown: false,
      menuDropdown: false,
    };
  },
  computed: {
    ...mapState(cartStore, ['totalCart']),
    ...mapState(authStore, ['token', 'isLogged']),
  },
  methods: {
    updateScroll() {
      if (!this.isHome) {
        this.changeColor = false;
        return;
      }
      this.scrollPosition = window.scrollY;
      if (this.scrollPosition <= 600) {
        this.changeColor = true;
      } else {
        this.changeColor = false;
      }
    },
    toggleMemberDropdown() {
      this.memberDropdown = !this.memberDropdown;
    },
    toggleMenuDropdown() {
      this.menuDropdown = !this.menuDropdown;
    },
    toggleMenu() {
      const windowSize = window.innerWidth;
      if (windowSize < 992) {
        const bsCollapse = new window.bootstrap.Collapse(document.getElementById('navbarSupportedContent'));
        bsCollapse.toggle();
        this.toggleMenuDropdown();
      }
    },
    logout() {
      this.clearLogged();
      this.clearUser();
      document.cookie = 'token=';
      this.$router.push('/login');
    },
    ...mapActions(authStore, ['clearLogged', 'clearUser']),
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll);
  },
};
</script>

<style lang="scss">
nav {
  color: #EF173D;
}

.navbar {
  z-index: 100;

  ul {
    height: 90vh;
    align-items: flex-start;

    @media screen and (min-width: 992px) {
      height: auto;
      align-items: center;
    }
  }

  .dropdown-menu {
      height: auto;
      width: 100vw;

    @media screen and (min-width: 992px) {
      width: auto;
      z-index: 100;
      top: 100%;
      left: 0;
      transform: translateX(-50%);
    }
  }
}

.navbar-brand {
  font-family: Elephant, cursive;
}

.navbar-nav .nav-link {
  color: #fff;
  &.active {
    color: #ff4d6d;
  }
  &:hover {
    color: #ff4d6d;
  }
  transition: all 0.3s ease-in-out;
}

.navbar-toggler {
  color: #EF173D;
  border: 0;
  &:hover {
    color: #ff4d6d;
  }
  &:focus {
    text-decoration: none;
    outline: 0;
    box-shadow: 0 0 0 0;
  }
}

.login {
  width: 100%;
  a {
    width: 100%;

    @media screen and (min-width: 992px) {
      width: auto;
    }
  }

  @media screen and (min-width: 992px) {
    width: auto;
  }
}

.navbar .cart {
  color: #EF173D;
}

.navbar .member-icon {
  color: #fff;
  @media screen and (min-width: 992px) {
    color: #EF173D;
  }
}

.dropdown-item:hover {
  background-color: #600a19;
  color: #fff;
}

.dropdown-toggle::after {
  display: none;
  vertical-align: 0.8em;

  @media screen and (min-width: 992px) {
    display: inline-block;
  }
}

.triangle {
  position: absolute;
  top: 30%;
  left: -5px;
  width: 0;
  height: 0;
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
  border-right: 7px solid #600a19;
  z-index: 1;
  translate: transform(-50%, -50%);
}
</style>
