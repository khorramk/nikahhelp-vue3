import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  state() {
    return {
      token: localStorage.getItem("token") || null,
      errorMessage:null,
      twoFAMessage:null,
    };
  },
  mutations,
  actions,
  getters,
};
