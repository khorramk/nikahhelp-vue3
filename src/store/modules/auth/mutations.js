export default {
  setUser(state, payload) {
    state.token = payload.token;
  },
  setErrorMessage(state, payload) {
    state.errorMessage = payload.errorMessage;
  },
  setTwoFAMessage(state, payload) {
    state.twoFAMessage = payload.twoFAMessage;
  },
};
