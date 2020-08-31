const initialState = {
  errorData: "",
  errorMessage: "",
  errorMessageCode: "",
  errorMessageContent: "",
  errorRequestStatus: "",
  errorRequestStatusText: ""
};

const state = {
  ...initialState,
  initialState() {
    return initialState;
  }
};

const mutations = {
  setErrorData(state, errorData) {
    state.errorData = errorData;
  },
  setErrorMessage(state, errorMessage) {
    state.errorMessage = errorMessage;
  },
  setErrorMessageCode(state, errorMessageCode) {
    state.errorMessageCode = errorMessageCode;
  },
  setErrorMessageContent(state, errorMessageContent) {
    state.errorMessageContent = errorMessageContent;
  },
  setErrorRequestStatus(state, errorRequestStatus) {
    state.errorRequestStatus = errorRequestStatus;
  },
  setErrorRequestStatusText(state, errorRequestStatusText) {
    state.errorRequestStatusText = errorRequestStatusText;
  }
};

const getters = {
  errorData: state => state.errorData,
  errorMessage: state => state.errorMessage,
  errorMessageCode: state => state.errorMessageCode,
  errorMessageContent: state => state.errorMessageContent,
  errorRequestStatus: state => state.errorRequestStatus,
  errorRequestStatusText: state => state.errorRequestStatusText
};

const actions = {
  setErrorData({
    commit,
    state,
    dispatch
  }, error) {
    commit("setErrorData", error);
    commit("setErrorMessage", error.data.message);
    commit("setErrorMessageCode", error.data.message ? error.data.message.code : error.request.status);
    commit(
      "setErrorMessageContent",
      error.data.message ?
      (error.data.message.details == null ||
        error.data.message.details.length == 0 ?
        error.data.message.content :
        error.data.message.details.toString()) :
      "Error"
    );
    commit("setErrorRequestStatus", error.request.status);
    commit("setErrorRequestStatusText", error.request.statusText);

    dispatch("showErrorAlert", state.errorMessageContent);
    dispatch("handleErrorResponse", error.request.status);
  },
  handleErrorResponse({
    commit,
    state,
    dispatch
  }, errorCode) {
    dispatch("showErrorAlert", state.errorMessageContent);
    switch (errorCode) {
      case 401:
        sessionStorage.removeItem("asidePath");
        sessionStorage.removeItem("lang");
        commit("resetState");
        setTimeout(function () {
          location.replace("/login");
        }, 3000);
        break;
      case 403:
        setTimeout(function () {
          location.replace("/error/403");
        }, 1200);
        break;
      case 404:
        setTimeout(function () {
          location.replace("/error/404");
        }, 1200);
        break;
      case 500:
        break;
      default:
        return true;
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
