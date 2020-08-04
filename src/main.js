import Vue from 'vue'

import Vuex from 'vuex'
Vue.use(Vuex)

import store from './store'

import axios from 'axios'
Vue.prototype.$http = axios

import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';

Vue.use(MuseUI);

import VueRouter from 'vue-router'
Vue.use(VueRouter)


import App from './App.vue'


const routes = [
  { path: '/', component: require('./overview2.vue').default },
  { path: '/:name', component: require('./pkgdetail2.vue').default },
]

const router = new VueRouter({
  routes
})

//global.pre = 'http://localhost:3000/api'
global.pre = 'https://build.archlinuxcn.org/api'

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
