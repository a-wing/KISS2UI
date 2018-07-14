import Vue from 'vue'

import axios from 'axios'
Vue.prototype.$http = axios



import App from './App.vue'

new Vue({
  el: '#app',
  render: h => h(App)
})
