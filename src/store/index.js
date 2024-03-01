import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import authModule from "./modules/auth/index.js";
import userModule from "./modules/user/index.js";
import candidateInfoModule from "./modules/candidateInfo/index.js";
import teamModule from "./modules/team/index.js";
import representativeInfo from "./modules/representativeInfo/index.js";
import shortListModule from "./modules/shortlist/index.js";
import blockListModule from "./modules/blocklist/index.js";
import notificationModule from "./modules/notification/index.js";
import searchModule from "./modules/search/index.js";
import chat from "./modules/chat/index.js";
import AdminModule from "./modules/admin/index.js";
import SupportTicketModule from "@/store/modules/supportTicket";

const store = new Vuex.Store({
  modules: {
    auth: authModule,
    user: userModule,
    candidateInfo: candidateInfoModule,
    team: teamModule,
    representativeInfo: representativeInfo,
    shortList: shortListModule,
    blockList: blockListModule,
    notification: notificationModule,
    search: searchModule,
    chat: chat,
    Admin: AdminModule,
    SupportTicket: SupportTicketModule
  },
});

export default store;
