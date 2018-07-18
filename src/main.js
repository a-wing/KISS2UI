import Vue from 'vue'

import axios from 'axios'
Vue.prototype.$http = axios

import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';

Vue.use(MuseUI);

import VueRouter from 'vue-router'
Vue.use(VueRouter)


import App from './App.vue'


const routes = [
  { path: '/', component: require('./overview.vue').default },
  { path: '/:pkgname', component: require('./pkgdetail.vue').default }
]

const router = new VueRouter({
  routes
})



new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
