import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    diagramming: false,

  },
  mutations: {
    changeDiagramming (state, flag) {
      state.diagramming = flag || !state.diagramming
      
    }
  },
  actions: {
  },
  modules: {
  }
})
