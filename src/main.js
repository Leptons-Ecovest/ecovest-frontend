import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
import VueAxios from 'vue-axios'
import Toast from "vue-toastification";
import VueGoodTablePlugin from 'vue-good-table';
import "vue-toastification/dist/index.css";

import VueLoading from 'vue-loading-overlay';

import 'vue-loading-overlay/dist/vue-loading.css';

// import the styles 
import 'vue-good-table/dist/vue-good-table.css'




createApp(App)
.use(store)
.use(router)
.use(VueLoading)
.use(VueAxios, axios)
.use(Toast)
.use(VueGoodTablePlugin)
.mount('#appz')
