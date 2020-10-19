import { firebase, inventoryCollection } from '@/firebase'

const initialState = {
  currentValue: 0,
  zeroStockItems: 0,
  blackListItems: 0,
  currentStockAmount: 0,
  inventoryByMonth: [],
  inventoryValues: 0
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
  },
  setInventoryByMonth(state, inventoryByMonth) {
    state.inventoryByMonth = inventoryByMonth;
  },
  setInventoryValues(state, inventoryValues) {
    state.inventoryValues = inventoryValues;
  }
};

const getters = {
  currentValue: state => state.currentValue,
  zeroStockItems: state => state.zeroStockItems,
  blackListItems: state => state.blackListItems,
  currentStockAmount: state => state.currentStockAmount,
  inventoryByMonth: state => state.inventoryByMonth,
  inventoryValues: state => state.inventoryValues
};

const actions = {
  getOverviews({ dispatch, commit }) {
    commit('updateShowLoading', true);
    const promises = [
      dispatch('getCurrentStockAmount'),
      dispatch('getCurrentValue'),
      dispatch('getZeroStockItems'),
      dispatch('getBlackListItems')
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
      inventoryCollection.get().then(queryResult => {
        let result = 0
        queryResult.forEach(doc => {
          if (doc.data().userId == firebase.auth().currentUser.uid) {
            const { amount } = doc.data();
            result += (amount == 0);
          }
        });
        commit('setZeroStockItems', result);
        resolve();
      }).catch(error => reject(error))
    });
  },
  getBlackListItems({ commit }) {
    return new Promise((resolve, reject) => {
      inventoryCollection.get().then(queryResult => {
        let result = 0
        queryResult.forEach(doc => {
          if (doc.data().userId == firebase.auth().currentUser.uid) {
            const { blackItem } = doc.data();
            result += (blackItem);
          }
        });
        commit('setBlackListItems', result);
        resolve();
      }).catch(error => reject(error))
    });
  },
  getInventoryByMonth({ commit }, { start, end }) {
    commit('updateShowLoading', true);
    let data = [];
    return new Promise((resolve, reject) => {
      inventoryCollection.where('buyDate', '>=', start)
        .where('buyDate', '<=', end + '\uf8ff')
        .get()
        .then(queryData => {
          queryData.forEach(document => {
            if (document.data().userId == firebase.auth().currentUser.uid) {
              data.push(document.data());
            }
          });
          if (data.length != 0) {
            commit('setInventoryByMonth', data);
          }
          resolve();
        }).catch(error => reject(error))
    }).then(() =>
      commit('updateShowLoading', false))
  },
  getInventoryValues({ commit }) {
    return new Promise((resolve, reject) => {
      inventoryCollection.orderBy('categoryId').get().then(queryResult => {
        let result = []
        queryResult.forEach(doc => {
          if (doc.data().userId == firebase.auth().currentUser.uid) {
            const { categoryId, unitPrice, amount } = doc.data();
            result.push({ id: categoryId, cost: unitPrice * amount });
          }
        });
        commit('setInventoryValues', result);
        resolve();
      }).catch(error => reject(error))
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};


