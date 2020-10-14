import { firebase, inventoryCollection } from '@/firebase'

const initialState = {
  currentValue: 0,
  zeroStockItems: 0,
  blackListItems: 0,
  currentStockAmount: 0
};

const state = Object.assign({}, initialState);

const mutations = {
  setCurrentValue(state, currentValue) {
    state.currentValue = currentValue
  },
  setZeroStockItems(state, zeroStockItems) {
    state.zeroStockItems = zeroStockItems
  },
  setBlackListItems(state, blackListItems) {
    state.blackListItems = blackListItems
  },
  setCurrentStockAmount(state, currentStockAmount) {
    state.currentStockAmount = currentStockAmount
  }
};

const getters = {
  currentValue: state => state.currentValue,
  zeroStockItems: state => state.zeroStockItems,
  blackListItems: state => state.blackListItems,
  currentStockAmount: state => state.currentStockAmount
};

const actions = {
  getOverviews({ dispatch, commit }) {
    commit('updateShowLoading', true);
    const promises = [
      dispatch('getCurrentStockAmount'),
      dispatch('getCurrentValue')
      // dispatch('getZeroStockItems'),
      // dispatch('getBlackListItems')
    ];
    Promise.all(promises).then(() =>
      commit('updateShowLoading', false)).catch(error => {
        commit('updateShowLoading', false);
        dispatch('setAlertMessage', { status: false, message: `Update fail, cause: ${error.message}` });
      });
  },
  getCurrentStockAmount({ commit }) {
    return new Promise((resolve, reject) => {
      inventoryCollection.get().then(queryResult => {
        let result = 0
        queryResult.forEach(doc => {
          if (doc.data().userId == firebase.auth().currentUser.uid) {
            const { amount } = doc.data();
            result += (amount == null ? 0 : amount);
          }
        });
        commit('setCurrentStockAmount', result);
        resolve();
      }).catch(error => reject(error))
    })
  },
  getCurrentValue({ commit }) {
    return new Promise((resolve, reject) => {
      inventoryCollection.get().then(queryResult => {
        let result = 0
        queryResult.forEach(doc => {
          if (doc.data().userId == firebase.auth().currentUser.uid) {
            const { unitPrice, amount } = doc.data();
            console.log(unitPrice, amount)
            result += unitPrice * (amount == null ? 0 : amount);
          }
        });
        commit('setCurrentValue', result);
        resolve();
      }).catch(error => reject(error))
    })
  },
  getZeroStockItems({ commit }) {
    return new Promise((resolve, reject) => {

    })
  },
  getBlackListItems({ commit }) {
    return new Promise((resolve, reject) => {

    })
  }
};



export default {
  state,
  getters,
  mutations,
  actions
};


