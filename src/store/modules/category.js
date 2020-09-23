import { firebase, categoryCollection, subCategoryCollection } from '@/firebase'

const initialState = {
  category: null,
  allCategories: [],
  categoryList: [],
  subCategoryList: [],
  isShowAddCateModal: false,
  isShowNewSubcateModal: false,
  newSubcategoryData: {},
  isShowDeleteCateModal: false,
  isShowDeleteSubCateModal: false,
  deleteCategoryData: {},
  deleteSubCategoryData: {}
};

const state = Object.assign({}, initialState);

const mutations = {
  setCategory(state, category) {
    state.category = category
  },
  setAllCategories(state, allCategories) {
    state.allCategories = allCategories
  },
  setCategoryList(state, categoryList) {
    state.categoryList = categoryList
  },
  setSubCategoryList(state, subCategoryList) {
    state.subCategoryList = subCategoryList
  },
  setIsShowAddCateModal(state, isShowAddCateModal) {
    state.isShowAddCateModal = isShowAddCateModal
  },
  setIsShowNewSubcateModal(state, isShowNewSubcateModal) {
    state.isShowNewSubcateModal = isShowNewSubcateModal
  },
  setNewSubcategoryData(state, newSubcategoryData) {
    state.newSubcategoryData = newSubcategoryData
  },
  setIsShowDeleteCateModal(state, isShowDeleteCateModal) {
    state.isShowDeleteCateModal = isShowDeleteCateModal
  },
  setIsShowDeleteSubCateModal(state, isShowDeleteSubCateModal) {
    state.isShowDeleteSubCateModal = isShowDeleteSubCateModal
  },
  setDeleteCategoryData(state, deleteCategoryData) {
    state.deleteCategoryData = deleteCategoryData;
  },
  setDeleteSubCategoryData(state, deleteSubCategoryData) {
    state.deleteSubCategoryData = deleteSubCategoryData;
  }
};

const getters = {
  category: state => state.category,
  allCategories: state => state.allCategories,
  categoryList: state => state.categoryList,
  subCategoryList: state => state.subCategoryList,
  isShowAddCateModal: state => state.isShowAddCateModal,
  isShowNewSubcateModal: state => state.isShowNewSubcateModal,
  newSubcategoryData: state => state.newSubcategoryData,
  isShowDeleteCateModal: state => state.isShowDeleteCateModal,
  isShowDeleteSubCateModal: state => state.isShowDeleteSubCateModal,
  deleteCategoryData: state => state.deleteCategoryData,
  deleteSubCategoryData: state => state.deleteSubCategoryData
};

const actions = {
  newCategory({ dispatch, commit }, data) {
    commit('updateShowLoading', true);
    return new Promise((resolve, reject) => {
      categoryCollection.add({
        name: data,
        userId: firebase.auth().currentUser.uid,
        tagIds: null
      }).then(() => {
        dispatch('setAlertMessage', { status: true, message: '新增成功' });
        setTimeout(() => dispatch('getAllCategories'), 1000);
        resolve();
      }).catch(error => {
        dispatch('setAlertMessage', { status: false, message: `新增失敗: ${error.message}` });
        reject();
      });
    }).then(() =>
      commit('updateShowLoading', false))
  },
  editCategory({ dispatch, commit }, data) {
    commit('updateShowLoading', true);
    return new Promise((resolve, reject) => {
      categoryCollection.doc(data.categoryId).update({
        name: data.categoryName
      }).then(() => {
        dispatch('setAlertMessage', { status: true, message: '更新成功' });
        setTimeout(() => dispatch('getAllCategories'), 1000);
        resolve();
      }).catch(error => {
        dispatch('setAlertMessage', { status: false, message: `更新失敗: ${error.message}` });
        reject();
      });
    }).then(() =>
      commit('updateShowLoading', false))
  },
  getCategoryList({ state, commit, dispatch }) {
    commit('updateShowLoading', true);
    return new Promise((resolve, reject) => {
      categoryCollection.get().then(queryResult => {
        const dataArr = [];
        queryResult.forEach(doc => {
          dataArr.push({ id: doc.id, ...doc.data() })
        });
        commit('setCategoryList', dataArr);
        resolve();
      }).catch(error => reject(error))
    }).then(() =>
      commit('updateShowLoading', false))
  },
  getAllCategories({ state, commit, dispatch }) {
    commit('updateShowLoading', true);
    return new Promise((resolve, reject) => {
      categoryCollection.get().then(queryResult => {
        const dataArr = [];
        queryResult.forEach(doc => {
          dispatch('getSubcategoryList', doc.id).then(() => dataArr.push({ id: doc.id, ...doc.data(), subCategoryList: state.subCategoryList }))
        });
        commit('setAllCategories', dataArr);
        resolve();
      }).catch(error => reject(error))
    }).then(() =>
      commit('updateShowLoading', false))
  },
  addSubcategory({ dispatch, commit }, data) {
    commit('updateShowLoading', true);
    return new Promise((resolve, reject) => {
      subCategoryCollection.add({
        name: data.subcategoryName,
        userId: firebase.auth().currentUser.uid,
        categoryId: data.categoryId
      }).then(() => {
        commit('setNewSubcategoryData', {});
        dispatch('setAlertMessage', { status: true, message: '新增成功' });
        setTimeout(() => dispatch('getAllCategories'), 1000);
        resolve();
      }).catch(error => {
        dispatch('setAlertMessage', { status: false, message: `新增失敗: ${error.message}` });
        reject(error);
      });
    }).then(() =>
      commit('updateShowLoading', false))
  },
  editSubcategory({ dispatch, commit }, data) {
    commit('updateShowLoading', true);
    return new Promise((resolve, reject) => {
      subCategoryCollection.doc(data.subcategoryId).update({
        name: data.subcategoryName
      }).then(() => {
        dispatch('setAlertMessage', { status: true, message: '更新成功' });
        setTimeout(() => dispatch('getAllCategories'), 1000);
        resolve();
      }).catch(error => {
        dispatch('setAlertMessage', { status: false, message: `更新失敗: ${error.message}` });
        reject();
      });
    }).then(() =>
      commit('updateShowLoading', false))
  },
  getSubcategoryList({ commit }, data) {
    commit('updateShowLoading', true);
    return new Promise((resolve, reject) => {
      subCategoryCollection.where('categoryId', '==', data).get().then(queryResult => {
        const dataArr = [];
        queryResult.forEach(doc => {
          dataArr.push({ id: doc.id, ...doc.data() });
        });
        commit('setSubCategoryList', dataArr);
        resolve();
      }).catch(error => reject(error))
    }).then(() =>
      commit('updateShowLoading', false))
  },
  deleteCategory({ dispatch, commit }, data) {
    commit('updateShowLoading', true);
    return new Promise((resolve, reject) => {
      categoryCollection.doc(data).delete().then(() => {
        subCategoryCollection.where('categoryId', '==', data).get().then(queryResult => {
          queryResult.forEach(doc => {
            subCategoryCollection.doc(doc.id).delete();
          });
          resolve();
        }).catch(error => {
          throw error;
        });
      }).then(() => {
        commit('setDeleteCategoryData', {});
        dispatch('setAlertMessage', { status: true, message: '刪除成功' });
        setTimeout(() => dispatch('getAllCategories'), 1000);
      }).catch(error => {
        dispatch('setAlertMessage', { status: false, message: `刪除失敗: ${error.message}` });
        reject(error);
      });
    }).then(() =>
      commit('updateShowLoading', false));
  },
  deleteSubCategory({ dispatch, commit }, data) {
    console.log(data)
    commit('updateShowLoading', true);
    return new Promise((resolve, reject) => {
      subCategoryCollection.doc(data).delete()
        .then(() => {
          commit('setDeleteCategoryData', {});
          dispatch('setAlertMessage', { status: true, message: '刪除成功' });
          setTimeout(() => dispatch('getAllCategories'), 1000);
          resolve();
        }).catch(error => {
          dispatch('setAlertMessage', { status: false, message: `刪除失敗: ${error.message}` });
          reject(error);
        });
    }).then(() =>
      commit('updateShowLoading', false));
  }
}

export default {
  state,
  getters,
  mutations,
  actions
};
