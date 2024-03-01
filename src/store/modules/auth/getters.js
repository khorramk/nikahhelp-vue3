export default {
  token(state) {
    return state.token;
  },
  errorMessage(state) {
    return state.errorMessage;
  },
  isAuthenticated(state) {
    return !!state.token;
  },
  twoFAMessage(state) {
    return state.twoFAMessage;
  }
};
