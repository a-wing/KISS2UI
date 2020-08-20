import Vue from 'vue'

import store from './store'
import router from './router'

import {
  Autocomplete,
  Loading,
  Navbar,
  Field,
  Button,
  Table,
  Pagination,
  Input,
  Icon,
  Tag
} from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Autocomplete)
Vue.use(Loading)
Vue.use(Navbar)
Vue.use(Field)
Vue.use(Button)
Vue.use(Table)
Vue.use(Pagination)
Vue.use(Tag)
Vue.use(Icon)
Vue.use(Input)


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
