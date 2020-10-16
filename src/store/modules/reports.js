import { firebase, inventoryCollection } from '@/firebase'

const initialState = {
  minBuyDate: null,
  inventoryByMonth: []
};

const state = Object.assign({}, initialState);

const mutations = {
  setMinBuyDate(state, minBuyDate) {
    state.minBuyDate = minBuyDate
  },
  setInventoryByMonth(state, inventoryByMonth) {
    state.inventoryByMonth = inventoryByMonth;
  }
};

const getters = {
  minBuyDate: state => state.minBuyDate,
  inventoryByMonth: state => state.inventoryByMonth
};

const actions = {
  getMinBuyDate({ dispatch, commit }, data) {
    commit('updateShowLoading', true);
    let tempBuyDate = [];
    return new Promise((resolve, reject) => {
      inventoryCollection.get().then(queryData => {
        queryData.forEach((doc) => {
          if (doc.data().userId == firebase.auth().currentUser.uid) {
            tempBuyDate.push(new Date(doc.data().buyDate));
          }
        });
        if (tempBuyDate.length != 0) {
          commit('setMinBuyDate', _.min(tempBuyDate));
        }
        resolve();
      }).catch(error => reject(error))
    }).then(() =>
      commit('updateShowLoading', false))
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
            console.log(document);
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
}

export default {
  state,
  getters,
  mutations,
  actions
};
