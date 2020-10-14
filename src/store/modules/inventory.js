import { firebase, storage, inventoryCollection } from '@/firebase'

const initialState = {
  inventoryList: [],
  inventoryListCount: 0,
  isShowAddInventoryModal: false,
  isEditInventory: false,
  editInventoryId: null,
  inventoryData: {},
  isShowDeleteInventoryModal: false
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
  },
  setIsShowDeleteInventoryModal(state, isShowDeleteInventoryModal) {
    state.isShowDeleteInventoryModal = isShowDeleteInventoryModal;
  }
};

const getters = {
  inventoryList: state => state.inventoryList,
  inventoryListCount: state => state.inventoryListCount,
  isShowAddInventoryModal: state => state.isShowAddInventoryModal,
  isEditInventory: state => state.isEditInventory,
  editInventoryId: state => state.editInventoryId,
  inventoryData: state => state.inventoryData,
  isShowDeleteInventoryModal: state => state.isShowDeleteInventoryModal
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
        unitPrice: data.unitPrice,
        blackItem: data.blackItem,
        buyDate: data.buyDate,
        brand: data.brand,
        remarks: data.remarks,
        userId: firebase.auth().currentUser.uid,
        createdAt: new Date(),
        updatedAt: new Date(),
        filePath: `${firebase.auth().currentUser.uid}/${data.file.fileName}`
      }).then(() => {
        dispatch('setAlertMessage', { status: true, message: 'Create success.' });
        setTimeout(() => dispatch('getInventoryList'), 2000);
        resolve();
      }).catch(error => {
        commit('updateShowLoading', false);
        dispatch('setAlertMessage', { status: false, message: `Create fail, cause: ${error.message}` });
        reject();
      });
    }).then(() =>
      commit('updateShowLoading', false))
  },
  editInventory({ dispatch, commit }, updateData) {
    commit('updateShowLoading', true);
    return new Promise((resolve, reject) => {
      inventoryCollection.doc(updateData.inventoryId).update({
        name: updateData.data.name,
        categoryId: updateData.data.categoryId,
        subcategoryId: updateData.data.subcategoryId,
        amount: updateData.data.amount,
        unitPrice: updateData.data.unitPrice,
        blackItem: updateData.data.blackItem,
        buyDate: updateData.data.buyDate,
        brand: updateData.data.brand,
        remarks: updateData.data.remarks,
        updatedAt: new Date(),
        filePath: `${firebase.auth().currentUser.uid}/${updateData.data.file.fileName}`
      }).then(() => {
        dispatch('setAlertMessage', { status: true, message: 'Update success.' });
        setTimeout(() => dispatch('getInventoryList'), 2000);
        resolve();
      }).catch(error => {
        commit('updateShowLoading', false);
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
          if (doc.data().userId == firebase.auth().currentUser.uid) {
            tempDoc.push({ id: doc.id, ...doc.data() })
          }
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
        if (queryData.data().userId == firebase.auth().currentUser.uid) {
          let obj = queryData.data();
          storage.child(obj.filePath).getDownloadURL().then(function (url) {
            obj.picture = url;
            commit('setInventoryData', obj);
          }).catch(err => {
            obj.picture = null;
            commit('setInventoryData', obj);
          });
        }
        resolve();
      }).catch(error => reject(error))
    }).then(() =>
      commit('updateShowLoading', false))
  },
  deleteInventory({ dispatch, commit }, data) {
    commit('updateShowLoading', true);
    return new Promise((resolve, reject) => {
      inventoryCollection.doc(data).delete().then(() => {
        commit('setInventoryData', {});
      }).then(() => {
        dispatch('setAlertMessage', { status: true, message: 'Delete success.' });
        setTimeout(() => dispatch('getInventoryList'), 1000);
      }).catch(error => {
        commit('updateShowLoading', false);
        dispatch('setAlertMessage', { status: false, message: `Delete fail, cause: ${error.message}` });
        reject(error);
      });
    }).then(() =>
      commit('updateShowLoading', false));
  },
  uploadInventoryFile({ dispatch }, file) {
    const storageReference = storage.child(`${firebase.auth().currentUser.uid}/${file.fileName}`);
    const task = storageReference.put(file.fileObject);
    task.on(
      "state_changed",
      function progress(snapshot) {
      },
      function error(err) {
        dispatch('setAlertMessage', { status: false, message: `Upload fail, cause: ${err.message}` });
      },
      function complete() {
      }
    );
  }
}

export default {
  state,
  getters,
  mutations,
  actions
};
