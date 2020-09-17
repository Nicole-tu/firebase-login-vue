import { firebase, categoryCollection } from '@/firebase'

const initialState = {
  category: null,
  categoryList: []
};

const state = Object.assign({}, initialState);

const mutations = {
  setCategory(state, category) {
    state.category = category
  },
  setCategoryList(state, categoryList) {
    state.categoryList = categoryList
  }
};

const getters = {
  category: state => state.category,
  categoryList: state => state.categoryList
};

const actions = {
  newCategory({ dispatch }, data) {
    return new Promise((resolve, reject) => {
      categoryCollection.add({
        name: data,
        hasSub: false,
        userId: firebase.auth().currentUser.uid,
        tagId: null
      }).then(() => {
        dispatch('setAlertMessage', { status: true, message: '新增成功' });
        setTimeout(() => dispatch('getCategoryList'), 2000);
        resolve();
      }).catch(error => {
        dispatch('setAlertMessage', { status: false, message: `新增失敗: ${error.message}` });
        reject();
      });
    })
  },
  getCategoryList({ commit }) {
    return new Promise((resolve, reject) => {
      categoryCollection.get().then(queryResult => {
        const dataArr = [];
        queryResult.forEach(doc => {
          dataArr.push({ id: doc.id, ...doc.data() });
        });
        commit('setCategoryList', dataArr)
      });
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
};
