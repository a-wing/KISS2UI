import Vue from 'vue'

import store from './store'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faArrowUp, faAngleRight, faAngleLeft, faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faSearch, faArrowUp, faAngleRight, faAngleLeft, faAngleUp, faAngleDown);
Vue.component('vue-fontawesome', FontAwesomeIcon);

import Buefy from 'buefy'
Vue.use(Buefy, {
  defaultIconComponent: 'vue-fontawesome',
  defaultIconPack: 'fas',
});

import 'buefy/dist/buefy.css'

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
