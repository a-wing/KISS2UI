import Vue from 'vue'

import store from './store'
import router from './router'

import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';

Vue.use(MuseUI);

import {
  Navbar,
  Table,
  Pagination,
  Icon,
  Tag
} from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Navbar)
Vue.use(Table)
Vue.use(Pagination)
Vue.use(Tag)
Vue.use(Icon)


import App from './App.vue'


import { setBaseURL } from './api/kiss2ugo'

setBaseURL('https://build.archlinuxcn.org')
//setBaseURL('http://localhost:22333')

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
