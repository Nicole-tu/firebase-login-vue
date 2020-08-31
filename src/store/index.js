import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import base from "@store/base/base";
import error from "@store/base/error";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })],
  mutations: {
    resetAllStates(state) {
      for (const module in state) {
        if (module != 'base' && module != 'error') {
          const initState = state[module].initialState();
          for (const key in initState) {
            state[module][key] = initState[key];
          }
        }
      }
    },
  },
  actions: {
    resetStates({
      commit
    }, {
      pageName,
      module
    }) {
      if (pageName == 'Login') {
        commit('resetAllStates');
      } else {
        commit('resetState', this.state[module]);
      }
    }
  },
  modules: {
    base,
    error
  }
});
