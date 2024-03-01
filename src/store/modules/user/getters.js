export default {
  userInfo(state) {
    return state.user;
  },
  candidateInfo(state) {
    return state.candidate_information;
  },
  representativeInfo(state) {
    return state.representative_information;
  },
  userDataInputStatus(state) {
    return state.user_data_input_status;
  },
  clientSecret(state) {
    return state.client_secret;
  },
};
