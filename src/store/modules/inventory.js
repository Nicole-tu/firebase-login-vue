import { firebase, inventoryCollection } from '@/firebase'

const initialState = {
  inventoryList: [],
  inventoryListCount: 0,
  isShowAddInventoryModal: false,
  isEditInventory: false,
  editInventoryId: null,
  inventoryData: {}
};

const state = Object.assign({}, initialState);

const mutations = {
  setInventoryList(state, inventoryList) {
    state.inventoryList = inventoryList
  },
  setInventoryListCount(state, inventoryListCount) {
    state.inventoryListCount = inventoryListCount
  },
  setIsShowAddInventoryModal(state, isShowAddInventoryModal) {
    state.isShowAddInventoryModal = isShowAddInventoryModal
  },
  setIsEditInventory(state, isEditInventory) {
    state.isEditInventory = isEditInventory;
  },
  setEditInventoryId(state, editInventoryId) {
    state.editInventoryId = editInventoryId;
  },
  setInventoryData(state, inventoryData) {
    state.inventoryData = inventoryData;
  }
};

const getters = {
  inventoryList: state => state.inventoryList,
  inventoryListCount: state => state.inventoryListCount,
  isShowAddInventoryModal: state => state.isShowAddInventoryModal,
  isEditInventory: state => state.isEditInventory,
  editInventoryId: state => state.editInventoryId,
  inventoryData: state => state.inventoryData
};

const actions = {
  newInventory({ dispatch, commit }, data) {
    commit('updateShowLoading', true);
    return new Promise((resolve, reject) => {
      inventoryCollection.add({
        categoryId: data.categoryId,
        subcategoryId: data.subcategoryId,
        name: data.name,
        amount: data.amount,
        blackItem: data.blackItem,
        remarks: data.remarks,
        userId: firebase.auth().currentUser.uid,
        createdAt: new Date(),
        updatedAt: new Date()
      }).then(res => {
        dispatch('setAlertMessage', { status: true, message: 'Create success.' });
        setTimeout(() => dispatch('getInventoryList'), 2000);
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
      inventoryCollection.doc(data.inventoryId).update({
        name: data.name,
        categoryId: data.categoryId,
        subcategoryId: data.subcategoryId,
        amount: data.amount,
        blackItem: data.blackItem,
        remarks: data.remarks,
        updatedAt: new Date()
      }).then(() => {
        dispatch('setAlertMessage', { status: true, message: 'Update success.' });
        setTimeout(() => dispatch('getInventoryList'), 2000);
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
    let tempDoc = [];
    return new Promise((resolve, reject) => {
      inventoryCollection.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          tempDoc.push({ id: doc.id, ...doc.data() })
        });
        commit('setInventoryList', tempDoc);
        commit('setInventoryListCount', tempDoc.length);
        resolve();
      }).catch(error => reject(error))
    }).then(() =>
      commit('updateShowLoading', false))
  },
  getInventory({ commit }, inventoryId) {
    commit('updateShowLoading', true);
    return new Promise((resolve, reject) => {
      inventoryCollection.doc(inventoryId).get().then(queryData => {
        commit('setInventoryData', queryData.data());
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
