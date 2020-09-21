const initialState = {
  status: 'no status',
  successInfo: '',
  errorInfo: '',
  showLoading: false
};

const state = Object.assign({}, initialState);

const mutations = {
  updateStatus(state, status) {
    state.status = status;
  },
  updateSuccessInfo(state, successInfo) {
    state.successInfo = successInfo;
  },
  updateErrorInfo(state, errorInfo) {
    state.errorInfo = errorInfo;
  },
  updateShowLoading(state, showLoading) {
    state.showLoading = showLoading;
  },
};

const getters = {
  status: state => state.status,
  successInfo: state => state.successInfo,
  errorInfo: state => state.errorInfo,
  showLoading: state => state.showLoading
};

const actions = {
  setAlertMessage({ commit }, { status, message }) {
    if (status) {
      commit('updateStatus', 'success');
      commit('updateSuccessInfo', message);
    } else {
      commit('updateStatus', 'error');
      commit('updateErrorInfo', message);
    }
    setTimeout(() =>
      commit('updateStatus', '')
      , 1000);
  }
}

export default {
  state,
  getters,
  actions,
  mutations
};
