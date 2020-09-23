import { firebase, inventoryCollection, categoryCollection, subCategoryCollection } from '@/firebase'

const initialState = {
  inventoryList: [],
  isShowAddInventoryModal: false
};

const state = Object.assign({}, initialState);

const mutations = {
  setInventoryList(state, inventoryList) {
    state.inventoryList = inventoryList
  },
  setIsShowAddInventoryModal(state, isShowAddInventoryModal) {
    state.isShowAddInventoryModal = isShowAddInventoryModal
  }
};

const getters = {
  inventoryList: state => state.inventoryList,
  isShowAddInventoryModal: state => state.isShowAddInventoryModal
};

const actions = {
  newInventory({ dispatch, commit }, data) {
    commit('updateShowLoading', true);
    return new Promise((resolve, reject) => {
      inventoryCollection.add({
        name: data.name,
        amount: data.amount,
        blackList: data.blackList,
        remarks: data.remarks,
        userId: firebase.auth().currentUser.uid,
        createdAt: new Date(),
        updatedAt: new Date()
      }).then(() => {
        dispatch('setAlertMessage', { status: true, message: 'Create success.' });
        setTimeout(() => dispatch('getCategoryList'), 2000);
        resolve();
      }).catch(error => {
        dispatch('setAlertMessage', { status: false, message: `Create fail, cause: ${error.message}` });
        reject();
      });
    }).then(() =>
      commit('updateShowLoading', false))
  },
  editInventory({ dispatch, commit }, data) {
    commit('updateShowLoading', true);
    return new Promise((resolve, reject) => {
      categoryCollection.doc(data.inventoryId).update({
        name: data.name,
        amount: data.amount,
        blackList: data.blackList,
        remarks: data.remarks,
        updatedAt: new Date()
      }).then(() => {
        dispatch('setAlertMessage', { status: true, message: 'Update success.' });
        setTimeout(() => dispatch('getCategoryList'), 2000);
        resolve();
      }).catch(error => {
        dispatch('setAlertMessage', { status: false, message: `Update fail, cause: ${error.message}` });
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
