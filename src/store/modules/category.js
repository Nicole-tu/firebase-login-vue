import { firebase, categoryCollection, subCategoryCollection } from '@/firebase'

const initialState = {
  category: null,
  categoryList: [],
  subCategoryList: []
};

const state = Object.assign({}, initialState);

const mutations = {
  setCategory(state, category) {
    state.category = category
  },
  setCategoryList(state, categoryList) {
    state.categoryList = categoryList
  },
  setSubCategoryList(state, subCategoryList) {
    state.subCategoryList = subCategoryList
  }
};

const getters = {
  category: state => state.category,
  categoryList: state => state.categoryList,
  subCategoryList: state => state.subCategoryList
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
        setTimeout(() => dispatch('getCategoryList'), 2000);
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
        setTimeout(() => dispatch('getCategoryList'), 2000);
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
          dispatch('getSubcategoryList', doc.id).then(() => dataArr.push({ id: doc.id, ...doc.data(), subCategoryList: state.subCategoryList }))
        });
        commit('setCategoryList', dataArr);
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
        dispatch('setAlertMessage', { status: true, message: '新增成功' });
        setTimeout(() => dispatch('getCategoryList'), 2000);
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
        setTimeout(() => dispatch('getCategoryList'), 2000);
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
  }
}

export default {
  state,
  getters,
  mutations,
  actions
};
