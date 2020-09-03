import { firebase } from '@/firebase'

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
    // sign user in
    const { user } = await firebase.auth().signInWithEmailAndPassword(form.email, form.password)

    // fetch user profile and set in state
    dispatch('fetchUserProfile', user)
  },
  async loginWithGoogle({ commit }, provider) {
    firebase
      .auth()
      .signInWithPopup(provider)
      .catch(err => {
        commit('updateErrorInfo', '登入失敗:' + err.message);
      });
  },
  async signup({ commit, dispatch }, form) {
    // sign user up
    const { user } = await firebase.auth().createUserWithEmailAndPassword(form.email, form.password).then(() => {
      commit('updateSuccessInfo', '註冊成功');
    })

    // create user object in userCollections
    await firebase.usersCollection.doc(user.uid).set({
      name: form.name,
      title: form.title
    })

    // fetch user profile and set in state
    dispatch('fetchUserProfile', user)
  },
  async fetchUserProfile({ commit }, user) {
    // fetch user profile
    const userProfile = await firebase.usersCollection.doc(user.uid).get()

    // set user profile in state
    commit('setUserProfile', userProfile.data())
  },
  async logout({ commit }) {
    // log user out
    await firebase.auth.signOut()

    // clear user data from state
    commit('setUserProfile', {})

    // redirect to login view
    router.push('/login')
  },
  async createPost({ state, commit }, post) {
    // create post in firebase
    await firebase.postsCollection.add({
      createdOn: new Date(),
      content: post.content,
      userId: firebase.auth.currentUser.uid,
      userName: state.userProfile.name,
      comments: 0,
      likes: 0
    })
  },
  async likePost({ commit }, post) {
    const userId = firebase.auth.currentUser.uid
    const docId = `${userId}_${post.id}`

    // check if user has liked post
    const doc = await firebase.likesCollection.doc(docId).get()
    if (doc.exists) { return }

    // create post
    await firebase.likesCollection.doc(docId).set({
      postId: post.id,
      userId: userId
    })

    // update post likes count
    firebase.postsCollection.doc(post.id).update({
      likes: post.likesCount + 1
    })
  },
  async updateProfile({ dispatch }, user) {
    const userId = firebase.auth.currentUser.uid
    // update user object
    const userRef = await firebase.usersCollection.doc(userId).update({
      name: user.name,
      title: user.title
    })

    dispatch('fetchUserProfile', { uid: userId })

    // update all posts by user
    const postDocs = await firebase.postsCollection.where('userId', '==', userId).get()
    postDocs.forEach(doc => {
      firebase.postsCollection.doc(doc.id).update({
        userName: user.name
      })
    })

    // update all comments by user
    const commentDocs = await firebase.commentsCollection.where('userId', '==', userId).get()
    commentDocs.forEach(doc => {
      firebase.commentsCollection.doc(doc.id).update({
        userName: user.name
      })
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
};
