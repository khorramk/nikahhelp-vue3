import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  state() {
    return {
      current_conversation: localStorage.getItem("chat_currentconv")|| null,
      conversations: JSON.parse(localStorage.getItem("chat_conversations")) || [],// JSON.parse(localStorage.getItem("chat_conversations") || []),
      messages: JSON.parse(localStorage.getItem("chat_msgs")) || [],
      unread_records: JSON.parse(localStorage.getItem("chat_unreadrecords")) || [],
      conwise_info:JSON.parse(localStorage.getItem("chat_coninfo")) || [],
      user_info:JSON.parse(localStorage.getItem("chat_uinfo")) || [],
      scrolldown_msg: false,
      chats: [],
      activeTeam: null,
      teamMembers: [],
      online_users: []
    };
  },
  mutations,
  actions,
  getters,
};
