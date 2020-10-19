import { firebase, inventoryCollection } from '@/firebase'

const initialState = {
  minBuyDate: null
};

const state = Object.assign({}, initialState);

const mutations = {
  setMinBuyDate(state, minBuyDate) {
    state.minBuyDate = minBuyDate
  }
};

const getters = {
  minBuyDate: state => state.minBuyDate
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
  }
}

export default {
  state,
  getters,
  mutations,
  actions
};
