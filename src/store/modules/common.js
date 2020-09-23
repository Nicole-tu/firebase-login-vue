import { firebase, usersCollection } from '@/firebase'

const initialState = {
  userProfile: {},
  refreshData: false
};

const state = Object.assign({}, initialState);

const mutations = {
  setUserProfile(state, val) {
    state.userProfile = val
  },
  setRefreshData(state, refreshData) {
    state.refreshData = refreshData
  }
};

const getters = {
  userProfile: state => state.userProfile,
  refreshData: state => state.refreshData
};

const actions = {
  async login({ dispatch }, form) {
    const { user } = await firebase.auth().signInWithEmailAndPassword(form.email, form.password)
      .then(() =>
        dispatch('setAlertMessage', { status: true, message: 'Login success.' })
      )
      .catch(error => {
        dispatch('setAlertMessage', { status: false, message: `Login fail, cause: ${error.message}` });
        throw error;
      })

    dispatch('fetchUserProfile', user)
  },
  async loginWithProvider({ dispatch, commit }, provider) {
    await firebase.auth()
      .signInWithPopup(provider)
      .then(() =>
        dispatch('setAlertMessage', { status: true, message: 'Login success.' })
      )
      .catch(error => {
        dispatch('setAlertMessage', { status: false, message: `Login fail, cause: ${error.message}` });
        throw error;
      });

    const user = firebase.auth().currentUser;
    if (user != null) {

      await usersCollection.doc(user.uid).set({
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
        fromProvider: true,
        needNotify: false,
        createdAt: new Date()
      })

      commit('setUserProfile',
        {
          name: user.displayName,
          email: user.email,
          avatar: user.photoURL,
          fromProvider: true
        }
      )
    }
  },
  async signup({ dispatch }, form) {
    await firebase.auth().createUserWithEmailAndPassword(form.email, form.password)
      .then(() =>
        dispatch('setAlertMessage', { status: true, message: 'Sign up success.' })
      )
      .catch(error => {
        dispatch('setAlertMessage', { status: false, message: `Sign up fail, cause: ${error.message}` });
        throw error;
      });
    const userId = firebase.auth().currentUser.uid;

    await usersCollection.doc(userId).set({
      name: form.name,
      email: form.email,
      avatar: null,
      needNotify: false,
      fromProvider: false,
      createdAt: new Date()
    })

    dispatch('fetchUserProfile', { uid: userId })
  },
  async fetchUserProfile({ commit }, user) {
    const userProfile = await usersCollection.doc(user.uid).get()

    commit('setUserProfile', userProfile.data())
  },
  async updateProfile({ dispatch }, user) {
    const userId = firebase.auth().currentUser.uid;
    // update user object
    await usersCollection.doc(userId).update({
      name: user.name
    }).then(() =>
      dispatch('setAlertMessage', { status: true, message: 'Update success.' })
    )

    dispatch('fetchUserProfile', { uid: userId })
  },
  async logout({ commit, dispatch }) {
    await firebase.auth().signOut()
    commit('setUserProfile', {})
    dispatch('setAlertMessage', { status: true, message: 'Already logout.' })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
};
