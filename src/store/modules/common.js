import { firebase, usersCollection } from '@/firebase'

const initialState = {
  userProfile: {}
};

const state = Object.assign({}, initialState);

const mutations = {
  setUserProfile(state, val) {
    state.userProfile = val
  }
};

const getters = {
  userProfile: state => state.userProfile
};

const actions = {
  async login({ dispatch }, form) {
    const { user } = await firebase.auth().signInWithEmailAndPassword(form.email, form.password)
      .then(() =>
        dispatch('setAlertMessage', { status: true, message: '登入成功' })
      )
      .catch(error =>
        dispatch('setAlertMessage', { status: false, message: `登入失敗: ${error.message}` })
      )

    dispatch('fetchUserProfile', user)
  },
  async loginWithProvider({ dispatch }, provider) {
    await firebase.auth()
      .signInWithPopup(provider)
      .then(() =>
        dispatch('setAlertMessage', { status: true, message: '登入成功' })
      )
      .catch(error =>
        dispatch('setAlertMessage', { status: false, message: `登入失敗: ${error.message}` })
      );
  },
  async signup({ dispatch }, form) {
    const { user } = await firebase.auth().createUserWithEmailAndPassword(form.email, form.password)
      .then(() =>
        dispatch('setAlertMessage', { status: true, message: '註冊成功' })
      )
      .catch(error =>
        dispatch('setAlertMessage', { status: false, message: `註冊失敗: ${error.message}` })
      );

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
  async logout({ commit, dispatch }) {
    await firebase.auth().signOut()
    commit('setUserProfile', {})
    dispatch('setAlertMessage', { status: true, message: '已登出' })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
};
