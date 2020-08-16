import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import * as v2 from './api/kiss2ugo'

export default new Vuex.Store({
  state:{
    items:[],
    level: 'is-success',
  },
  getters:{

  },
  mutations:{
    updateItems(state, items) {
      state.items = items
    },
    updateLevel(state, level) {
      state.level = level
    },
  },
  actions:{
    getAll({commit, state}, items) {
      if (state.items.length != 0) { return }
      v2.getPkgs().then(data => {
        items = data
        commit("updateItems", items)
      })
    },
    level({commit, state}, level) {
      commit("updateLevel", level)
    },
  },
})

