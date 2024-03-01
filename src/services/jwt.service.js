/*  Creted By Dip, github: dipbd1 */
/*  Date: 06-05-2021 */

// ? I nitialized the storage in main.js

import Vue from "vue";

// ! this package nee dto be version 5.x for demo
// ! vue 2
// ! I installed ">=5.0.0 <6.0.0"
// ! it installed 5.0.1
import Storage from "vue-web-storage";

Vue.use(Storage, {
  prefix: "",
  drivers: ["local"],
});

const ID_TOKEN_KEY = "token";
const ID_USER_ID = "userId";
const USER = "user";
const ID_TEAM_ID = "teamid";
const ID_TEAM_ID_APP_WIDE = "teamidappwide";
const COOKIES = "cookies";
// const CHAT_CURRENTCONV = "chat_currentconv";
// const CHAT_CONVERSATIONS = "chat_conversations";
// const CHAT_MSGS = "chat_msgs";
// const CHAT_UNREADRECORDS = "chat_unreadrecords";
// const CHAT_CONINFO = "chat_coninfo";
// const CHAT_UINFO = "chat_uinfo";

// * to get Token
export const getToken = () => {
  return Vue.$localStorage.get("token");
};
export const getUser = () => {
  return Vue.$localStorage.get(USER);
};
export const setUser = (data) => {
  return Vue.$localStorage.set(USER, data);
};
// * to get userId
export const getUserId = () => {
  return Vue.$localStorage.get("userId");
};

// * to set Token
// * we can implement save user data on first run from here
// ! its better to use this method on first login, one time
export const saveTokenAndUser = (data) => {
  Vue.$localStorage.set(ID_TOKEN_KEY, data.token);
};

// * to logout/destroy user and token
export const destroyTokenAndUser = () => {
  Vue.$localStorage.remove(ID_TOKEN_KEY);
  Vue.$localStorage.remove(ID_USER_ID);
  Vue.$localStorage.remove(ID_TEAM_ID);
  Vue.$localStorage.remove(ID_TEAM_ID_APP_WIDE);
  Vue.$localStorage.remove(USER);
  // Vue.$localStorage.remove(CHAT_CURRENTCONV);
  // Vue.$localStorage.remove(CHAT_CONVERSATIONS);
  // Vue.$localStorage.remove(CHAT_MSGS);
  // Vue.$localStorage.remove(CHAT_UNREADRECORDS);
  // Vue.$localStorage.remove(CHAT_CONINFO);
  // Vue.$localStorage.remove(CHAT_UINFO);
};

// Invitation purpose team ID operation for local storage
export const saveTeamID = (data) => {
  Vue.$localStorage.set(ID_TEAM_ID, data);
};

export const getTeamID = () => {
  return Vue.$localStorage.get(ID_TEAM_ID);
};

export const destroyTeamID = () => {
  Vue.$localStorage.remove(ID_TEAM_ID);
};
// Invitation purpose team ID operation for local storage Ends here

// App Wide Team ID Operations
export const saveTeamIDAppWide = (data) => {
  Vue.$localStorage.set(ID_TEAM_ID_APP_WIDE, data);
};

export const getTeamIDAppWide = () => {
  return Vue.$localStorage.get(ID_TEAM_ID_APP_WIDE);
};

export const destroyTeamIDAppWide = () => {
  Vue.$localStorage.remove(ID_TEAM_ID_APP_WIDE);
};
// App Wide Team ID Operations Ends Here

//If customer accepted cookies
export const saveCookies = (data) => {
  Vue.$localStorage.set(COOKIES, data);
};

export const getCookies = () => {
  return Vue.$localStorage.get(COOKIES);
};

export const destroyCookies = () => {
  Vue.$localStorage.remove(COOKIES);
};

export default {
  getToken,
  getUserId,
  saveTokenAndUser,
  destroyTokenAndUser,
  saveTeamID,
  getTeamID,
  destroyTeamID,
  saveTeamIDAppWide,
  getTeamIDAppWide,
  destroyTeamIDAppWide,
  saveCookies,
  getCookies,
  destroyCookies,
  getUser,
  setUser
};
