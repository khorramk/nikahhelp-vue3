export default {
  setRepresentativeData(state, payload) {
    // console.log("Fooooooooooooooooooooooooooooooooooocus")
    // console.log(payload.data[0]);
    state.representativeInfo = payload.data;
  },

  setPercentage(state, payload) {
    // console.log(payload);
    state.profilePercentage = payload;
  },
};
