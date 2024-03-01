export default {
  setUserInfo(state, payload) {
    state.user = payload;
  },
  setCandidateInfo(state, payload) {
    state.candidate_information = payload;
  },
  setRepresentativeInfo(state, payload) {
    state.representative_information = payload;
  },
  setUserInfoDataStatus(state, status) {
    state.user_data_input_status = status;
  },
  setClientSecret(state, payload) {
    state.client_secret = payload.client_secret;
  },
};
