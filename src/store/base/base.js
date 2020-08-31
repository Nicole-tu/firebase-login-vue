const initialState = {
  showLoading: false,
  showStatusAlert: false,
  alertInfo: '',
  alertSuccess: true,
  errorCode: '',
  responseHeader: null
};

const state = Object.assign({}, initialState);

const mutations = {
  updateShowLoading(state, showLoading) {
    state.showLoading = showLoading;
  },
  updateShowStatusAlert(state, showStatusAlert) {
    state.showStatusAlert = showStatusAlert;
  },
  updateAlertInfo(state, alertInfo) {
    state.alertInfo = alertInfo;
  },
  updateAlertSuccess(state, alertSuccess) {
    state.alertSuccess = alertSuccess;
  },
  updateErrorCode(state, errorCode) {
    state.errorCode = errorCode;
  },
  updateResponseHeader(state, responseHeader) {
    state.responseHeader = responseHeader;
  }
};

const getters = {
  showLoading: state => state.showLoading,
  showStatusAlert: state => state.showStatusAlert,
  alertInfo: state => state.alertInfo,
  alertSuccess: state => state.alertSuccess,
  errorCode: state => state.errorCode,
  responseHeader: state => state.responseHeader,
};

const actions = {
  showSuccessAlert({
    commit
  }, msg) {
    commit('updateShowStatusAlert', true);
    commit('updateAlertInfo', msg);
    commit('updateAlertSuccess', true);
  },
  showErrorAlert({
    commit
  }, msg) {
    commit('updateShowStatusAlert', true);
    commit('updateAlertInfo', msg);
    commit('updateAlertSuccess', false);
  },
  closeAlert({
    commit
  }) {
    commit('updateShowStatusAlert', false);
  }
}

export default {
  state,
  getters,
  actions,
  mutations
};
