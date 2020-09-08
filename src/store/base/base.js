const initialState = {
  status: 'no status',
  successInfo: '',
  errorInfo: ''
};

const state = Object.assign({}, initialState);

const mutations = {
  updateStatue(state, status) {
    state.status = status;
  },
  updateSuccessInfo(state, successInfo) {
    state.successInfo = successInfo;
  },
  updateErrorInfo(state, errorInfo) {
    state.errorInfo = errorInfo;
  }
};

const getters = {
  status: state => state.status,
  successInfo: state => state.successInfo,
  errorInfo: state => state.errorInfo
};

const actions = {
  setAlertMessage({ commit }, { status, message }) {
    if (status) {
      commit('updateStatue', 'success');
      commit('updateSuccessInfo', message);
    } else {
      commit('updateStatue', 'error');
      commit('updateErrorInfo', message);
    }
    setTimeout(() =>
      commit('updateStatue', '')
      , 1000);
  }
}

export default {
  state,
  getters,
  actions,
  mutations
};
