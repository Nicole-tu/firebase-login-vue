import { firebase, inventoryCollection, categoryCollection, subCategoryCollection } from '@/firebase'

const initialState = {
  inventoryList: []
};

const state = Object.assign({}, initialState);

const mutations = {
  setInventoryList(state, inventoryList) {
    state.inventoryList = inventoryList
  }
};

const getters = {
  inventoryList: state => state.inventoryList
};

const actions = {
  newInventory({ dispatch, commit }, data) {
    commit('updateShowLoading', true);
    return new Promise((resolve, reject) => {
      categoryCollection.add({
        name: data,
        userId: firebase.auth().currentUser.uid,
        tagIds: null
      }).then(() => {
        dispatch('setAlertMessage', { status: true, message: '新增成功' });
        setTimeout(() => dispatch('getCategoryList'), 2000);
        resolve();
      }).catch(error => {
        dispatch('setAlertMessage', { status: false, message: `新增失敗: ${error.message}` });
        reject();
      });
    }).then(() =>
      commit('updateShowLoading', false))
  },
  editInventory({ dispatch, commit }, data) {
    commit('updateShowLoading', true);
    return new Promise((resolve, reject) => {
      categoryCollection.doc(data.categoryId).update({
        name: data.categoryName
      }).then(() => {
        dispatch('setAlertMessage', { status: true, message: '更新成功' });
        setTimeout(() => dispatch('getCategoryList'), 2000);
        resolve();
      }).catch(error => {
        dispatch('setAlertMessage', { status: false, message: `更新失敗: ${error.message}` });
        reject();
      });
    }).then(() =>
      commit('updateShowLoading', false))
  },
  getInventoryList({ commit }) {
    commit('updateShowLoading', true);
    return new Promise((resolve, reject) => {
      inventoryCollection.get().then(queryResult => {
        const dataArr = [];
        queryResult.forEach(doc => {
          dataArr.push({ id: doc.id, ...doc.data() })
        });
        commit('setInventoryList', dataArr);
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
