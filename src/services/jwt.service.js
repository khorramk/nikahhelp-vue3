/*  Creted By Dip, github: dipbd1 */
/*  Date: 06-05-2021 */

// ? I nitialized the storage in main.js

// import { createApp } from "vue";

// ! this package nee dto be version 5.x for demo
// ! vue 2
// ! I installed ">=5.0.0 <6.0.0"
// ! it installed 5.0.1
// import Storage from "vue-web-storage";


// const Vue = createApp();
// Vue.use(Storage, {
//   prefix: "",
//   drivers: ["local"],
// });

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
  return JSON.parse(localStorage.getItem("token"));
};
export const getUser = () => {
  return JSON.parse(localStorage.getItem(USER));
};
export const setUser = (data) => {
  return localStorage.setItem(USER, JSON.stringify(data));
};
// * to get userId
export const getUserId = () => {
  return JSON.parse(localStorage.getItem("userId"));
};

// * to set Token
// * we can implement save user data on first run from here
// ! its better to use this method on first login, one time
export const saveTokenAndUser = (data) => {
  localStorage.setItem(ID_TOKEN_KEY, JSON.stringify(data.token));
};

// * to logout/destroy user and token
export const destroyTokenAndUser = () => {
  localStorage.removeItem(ID_TOKEN_KEY);
  localStorage.removeItem(ID_USER_ID);
  localStorage.removeItem(ID_TEAM_ID);
  localStorage.removeItem(ID_TEAM_ID_APP_WIDE);
  localStorage.removeItem(USER);
  // Vue.$localStorage.removeItem(CHAT_CURRENTCONV);
  // Vue.$localStorage.removeItem(CHAT_CONVERSATIONS);
  // Vue.$localStorage.removeItem(CHAT_MSGS);
  // Vue.$localStorage.removeItem(CHAT_UNREADRECORDS);
  // Vue.$localStorage.removeItem(CHAT_CONINFO);
  // Vue.$localStorage.removeItem(CHAT_UINFO);
};

// Invitation purpose team ID operation for local storage
export const saveTeamID = (data) => {
  localStorage.setItem(ID_TEAM_ID, data);
};

export const getTeamID = () => {
  return localStorage.getItem(ID_TEAM_ID);
};

export const destroyTeamID = () => {
  localStorage.removeItem(ID_TEAM_ID);
};
// Invitation purpose team ID operation for local storage Ends here

// App Wide Team ID Operations
export const saveTeamIDAppWide = (data) => {
  localStorage.setItem(ID_TEAM_ID_APP_WIDE, data);
};

export const getTeamIDAppWide = () => {
  return localStorage.getItem(ID_TEAM_ID_APP_WIDE);
};

export const destroyTeamIDAppWide = () => {
  localStorage.removeItem(ID_TEAM_ID_APP_WIDE);
};
// App Wide Team ID Operations Ends Here

//If customer accepted cookies
export const saveCookies = (data) => {
  localStorage.setItem(COOKIES, data);
};

export const getCookies = () => {
  return localStorage.getItem(COOKIES);
};

export const destroyCookies = () => {
  localStorage.removeItem(COOKIES);
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
