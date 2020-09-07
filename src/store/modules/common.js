import { firebase, usersCollection } from '@/firebase'

const initialState = {
  successInfo: '',
  errorCode: '',
  errorInfo: '',
  userProfile: {},
  posts: []
};

const state = Object.assign({}, initialState);

const mutations = {
  updateSuccessInfo(state, successInfo) {
    state.successInfo = successInfo;
  },
  updateErrorCode(state, errorCode) {
    state.errorCode = errorCode;
  },
  updateErrorInfo(state, errorInfo) {
    state.errorInfo = errorInfo;
  },
  setUserProfile(state, val) {
    state.userProfile = val
  },
  setPerformingRequest(state, val) {
    state.performingRequest = val
  },
  setPosts(state, val) {
    state.posts = val
  }
};

const getters = {
  successInfo: state => state.successInfo,
  errorCode: state => state.errorCode,
  errorInfo: state => state.errorInfo
};

const actions = {
  async login({ dispatch }, form) {
    const { user } = await firebase.auth().signInWithEmailAndPassword(form.email, form.password)
      .catch(error =>
        commit('updateErrorInfo', '登入失敗:' + error.message));

    dispatch('fetchUserProfile', user)
  },
  async loginWithProvider({ commit }, provider) {
    await firebase.auth()
      .signInWithPopup(provider)
      .catch(err => {
        console.log(err);
        const { code, message, email, credential } = err;
        commit('updateErrorInfo', '登入失敗:' + err.message);
      });
  },
  async signup({ dispatch }, form) {
    const { user } = await firebase.auth().createUserWithEmailAndPassword(form.email, form.password)
      .catch(error =>
        commit('updateErrorInfo', '註冊失敗:' + error.message));

    await usersCollection.doc(user.uid).set({
      name: form.name,
      email: form.email
    })

    dispatch('fetchUserProfile', user)
  },
  async fetchUserProfile({ commit }, user) {
    const userProfile = await usersCollection.doc(user.uid).get()

    commit('setUserProfile', userProfile.data())
  },
  async logout({ commit }) {
    await firebase.auth().signOut()

    commit('setUserProfile', {})
  },
}

export default {
  state,
  getters,
  mutations,
  actions
};
