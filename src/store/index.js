import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    diagramming: false

  },
  mutations: {
    changeDiagramming (state) {
      state.diagramming = !state.diagramming
      console.log(state.diagramming)
    }
  },
  actions: {
  },
  modules: {
  }
})
