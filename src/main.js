import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js'; // Nhập router
import { createPinia } from 'pinia';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



// import the package

import VueAwesomePaginate from "vue-awesome-paginate";

// import the necessary css file

import "vue-awesome-paginate/dist/style.css";

// // Register the package

const app = createApp(App);
app.use(VueAwesomePaginate)//phan trang
app.use(createPinia());
app.use(router); // Sử dụng Vue Router
app.mount('#app');
