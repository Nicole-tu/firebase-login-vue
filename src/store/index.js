import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import base from '@store/base/base';
import common from '@store/modules/common';
import category from '@store/modules/category';
import inventory from '@store/modules/inventory';
import dashboard from '@store/modules/dashboard';
import reports from '@store/modules/reports';

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
    common,
    category,
    inventory,
    dashboard,
    reports
  }
});
