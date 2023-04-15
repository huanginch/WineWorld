import { createRouter, createWebHashHistory } from 'vue-router';
import axios from 'axios';
import authStore from '../stores/authStore';

const { VITE_URL } = import.meta.env;

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/front/FrontIndexView.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/front/HomeView.vue'),
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/front/LoginView.vue'),
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('../views/front/RegisterView.vue'),
        },
        {
          path: 'product',
          name: 'product',
          component: () => import('../views/front/ProductView.vue'),
        },
        {
          path: 'product/:id',
          name: 'product-detail',
          component: () => import('../views/front/ProductDetailView.vue'),
        },
        {
          path: 'faq',
          name: 'faq',
          component: () => import('../views/front/FaqView.vue'),
        },
        {
          path: 'cart',
          name: 'cart',
          component: () => import('../views/front/CartView.vue'),
          beforeEnter: (to, from, next) => {
            const { isLogged } = authStore();
            if (isLogged) {
              next();
            } else {
              next('/login');
            }
          },
        },
        {
          path: 'checkout',
          name: 'checkout',
          component: () => import('../views/front/CheckoutView.vue'),
        },
        {
          path: 'member',
          name: 'member',
          component: () => import('../views/member/MemberView.vue'),
          children: [
            {
              path: 'profile',
              name: 'profile',
              component: () => import('../views/member/ProfileView.vue'),
            },
            {
              path: 'orders',
              name: 'orders',
              component: () => import('../views/member/OrdersView.vue'),
            },
            {
              path: 'orders/:orderId',
              name: 'order-detail',
              component: () => import('../views/member/OrderDetailView.vue'),
            },
            {
              path: 'favorites',
              name: 'favorites',
              component: () => import('../views/member/FavoritesView.vue'),
            },
          ],
          beforeEnter: (to, from, next) => {
            const { isLogged } = authStore();
            if (isLogged) {
              next();
            } else {
              next('/login');
            }
          },
        },
      ],
    },
    {
      path: '/admin-login',
      name: 'admin-login',
      component: () => import('../views/admin/LoginView.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminView.vue'),
      children: [
        {
          path: '',
          name: 'admin-products',
          components: {
            aside: () => import('../components/admin/DashBoardComponent.vue'),
            main: () => import('../views/admin/ProductsView.vue'),
          },
        },
        {
          path: 'orders',
          name: 'admin-orders',
          components: {
            aside: () => import('../components/admin/DashBoardComponent.vue'),
            main: () => import('../views/admin/OrdersView.vue'),
          },
        },
      ],
      beforeEnter: (to, from, next) => {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)adminToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;
        axios.post(`${VITE_URL}/api/user/check`).then((res) => {
          if (res.data.success) {
            next();
          } else {
            next('/admin-login');
          }
        });
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
  scrollBehavior() {
    // always scroll to top
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  next();
});

export default router;
