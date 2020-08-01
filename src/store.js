import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import * as v2 from './api/kiss2ugo'

export default new Vuex.Store({
  state:{
    items:[],
  },
  getters:{

  },
  mutations:{
    updateItems(state, items) {
      state.items = items
    },
  },
  actions:{
    getAll({commit, state}, items) {
      v2.getPkgs().then(data => {
        items = data
        commit("updateItems", items)
      })
    },
  },
})

