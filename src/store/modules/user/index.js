import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  state() {
    return {
      user: {
        id: localStorage.getItem("userId") || null,
      },
      candidate_information: {},
      representative_information: {},
      user_data_input_status: -1,
      client_secret: null,
      payment_method: null,
    };
  },
  mutations,
  actions,
  getters,
};
