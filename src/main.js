import { createApp } from 'vue';
import { createPinia } from 'pinia';
import axios from 'axios';
import VueAxios from 'vue-axios';

// bootstrap css
import './assets/all.scss';
import * as bootstrap from 'bootstrap';
// swiper
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

import VueSweetalert2 from 'vue-sweetalert2';

// VeeValidate
import {
  Form, Field, ErrorMessage, defineRule, configure,
}
  from 'vee-validate';
import {
  required, email, min, numeric,
} from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '../zh_TW.json';

import App from './App.vue';
import router from './router';

import PageLoading from './components/loading/PageLoading.vue';

window.bootstrap = bootstrap;

const app = createApp(App);

// VeeValidate rules and translate setting
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('numeric', numeric);
configure({
  // Generates an English message locale generator
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});
setLocale('zh_TW');

app.use(router);
app.use(createPinia());
app.use(router);
app.use(VueAxios, axios);
app.use(VueSweetalert2);

app.component('VSwiper', Swiper);
app.component('SwiperSlide', SwiperSlide);
app.component('VForm', Form);
app.component('VField', Field);
app.component('ErrorMessage', ErrorMessage);
app.component('PageLoading', PageLoading);

app.mount('#app');
