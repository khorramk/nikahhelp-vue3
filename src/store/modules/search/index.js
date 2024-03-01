import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      profiles: [],
      profileDetails: {},
      profile: [],
      pagination: {},
      isSearched: false,
      isLoading: false,
      totalResult: 0,
      selectedProfile: {},//profile info 4 r8 sidebar 
      queryArr: [],
      component: 'addComponent',
      suggested: false,
    };
  },
  mutations,
  actions,
  getters,
};
