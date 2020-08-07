import Vue from 'vue'

import Vuex from 'vuex'
Vue.use(Vuex)

import store from './store'
import router from './router'

import axios from 'axios'
Vue.prototype.$http = axios

import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';

Vue.use(MuseUI);

import App from './App.vue'


import { setBaseURL } from './api/kiss2ugo'

setBaseURL('https://build.archlinuxcn.org')
//setBaseURL('http://localhost:22333')

//global.pre = 'http://localhost:3000/api'
global.pre = 'https://build.archlinuxcn.org/api'

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
