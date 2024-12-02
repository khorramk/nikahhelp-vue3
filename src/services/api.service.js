/**  Created By Dip, github: dipbd1*/
/** Date: 06-05-2021 */

//Importing things
import axios from "axios";
import JwtService from "./jwt.service";
import store from "@/store";
import router from "@/router";

// * So, we initiated a config so we can use it for now, but
// * in future this config will take access from .env
// TODO we need to add the API_URL in config file
// ! and its a must before we can use this service module
import { API_URL } from "../configs/config";

// * For now we are not using it, but
// * in near future we may need it.
const config = {
  header: {
    "Content-Type": "image/png",
  },
};

const ApiService = {
  // * we will import this service in main.js and
  // * there we need to call this init to initialize this service
  // * So we can use this Axios instance from all over the app
  init() {
    axios.defaults.baseURL = API_URL;
    this.setHeader();

    axios.interceptors.response.use( response => response, 
      // If the response is successful, just return it 
      error => { 
        if (error.response && error.response.status === 401) { 
          // Handle invalid token here 
          console.log("Invalid token");
          store.dispatch("logout");
          console.log("Logged out");
          router.push("/");
        } else {
          return Promise.reject(error); 
        }
      })
  },

  // * After succesfull login we will set token to header
  // * with this function so we can use it in every requests
  setHeader() {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${JwtService.getToken()}`; // using jwt service to get and set header

  },

  // * we can also use this function to set token and
  // * manualy
  setParamHeader(token) {
    axios.defaults.headers.common["x-access-token"] = `${token}`;
  },

  // * this function for executing custom querry
  query(resource, params) {
    return axios.get(resource, params).catch((error) => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  // * calling setHeader to attach token with every request
  // * request and if needted we can take further steps from headers
  // * like, if we need to kick a user out of system for any
  // * error, then we can work for it here
  get(resource, slug = "") {
    this.setHeader();
    const getReq = axios.get(`${resource}`);
    return getReq;
  },

  // * same as get
  post(resource, params) {
    this.setHeader();
    return axios.post(`${resource}`, params);
  },

  // * Used only for upload image
  image(resource, params) {
    this.setHeader();
    let data = new FormData()
    for (const [key, value] of Object.entries(params)) {
      data.append(key,value)
    }
    return axios.post(`${resource}`, data, config);
  },

  // ! Services bellow this line is not important for now
  // ! for frontend, But I am putting them for future or
  // ! if needed later
  // * same as get
  update(resource, slug, params) {
    this.setHeader();
    return axios.put(`${resource}/${slug}`, params);
  },

  // * same as get
  put(resource, params) {
    this.setHeader();
    return axios.put(`${resource}`, params);
  },

  // * same as get
  patch(resource, params) {
    this.setHeader();
    return axios.patch(`${resource}`, params);
  },

  // * same as get

  //! axios delete is a bit different, please read documentation for details
  delete(resource, data) {
    // this.setHeader();
    return axios.delete(resource, { data })
  },
  // ! here ends the extra request method part


  getWithoutToken(resource) {
    const getReq = axios.get(`${resource}`);
    return getReq;
  },

  // * same as get
  postWithoutToken(resource, params) {
    return axios.post(`${resource}`, params);
  },


};

export default ApiService;
