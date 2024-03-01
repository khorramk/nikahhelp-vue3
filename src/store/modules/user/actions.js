import ApiService from "../../../services/api.service";
import axios from "axios";
export default {
  async getUser(context, _) {
    const response = await ApiService.get("v1/user");
    // console.log(response);
    localStorage.setItem("userId", response.data.data.user.id);
    localStorage.setItem("userInfo", JSON.stringify(response.data.data.user));

    // // update status in localStorage
    // let localStorageUser = JSON.parse(localStorage.getItem("user"));
    // localStorageUser.status = response.data.data.user.status;
    // localStorageUser.get_candidate.is_uplaoded_doc = data.data.candidate_information ? data.data.candidate_information.is_uplaoded_doc : localStorageUser.get_candidate.is_uplaoded_doc;

    // localStorage.setItem("user", JSON.stringify(localStorageUser));

    // context.commit("setUserInfo", response.data.data.user);
    // context.commit(
    //   "setCandidateInfo",
    //   response.data.data.candidate_information
    // );
    // context.commit(
    //   "setRepresentativeInfo",
    //   response.data.data.representative_information[0]
    // )
    context.dispatch("saveUserInfo", response.data.data);
    try {
      let account_type = response.data.data.user.account_type;
      let data_input_status = 0;
      let candidate_data = response.data.data.candidate_information;
      let representative_data = response.data.data.representative_information;

      // console.log("rep_data",representative_data);
      // console.log("candidate_data",candidate_data);

      if (account_type == 1) {
        if (candidate_data.id) {
          // 11 means user is candidate and a candidate row is inserted in db with partial data
          data_input_status = 11;
          if (candidate_data.data_input_status == 1) {
            // 12 means user is candidate and a candidate row is inserted in db with full data
            data_input_status = 12;
          }
        } else {
          // 10 means user is candidate and a candidate row is not inserted in db
          data_input_status = 10;
        }
      } else if (account_type == 2) {
        if (representative_data.length > 0) {
          if (representative_data[0].id) {
            data_input_status = 21;
            if (representative_data[0].data_input_status == 1) {
              data_input_status = 22;
            }
          } else {
            console.log("id pay nai");
            data_input_status = 20;
          }
        } else {
          console.log("length choto");
          data_input_status = 20;
        }
      } else {
        data_input_status = 0;
      }
      context.commit("setUserInfoDataStatus", data_input_status);
    } catch (err) {
      console.log(err);
    }
  },
  async getUserProfile(context, payload) {
    // const response = await ApiService.get(
    //   `v1/user-profile?user_id=${payload.id}`
    // );
    return new Promise((resolve, reject) => {
      ApiService.get(`v1/user-profile?user_id=${payload.id}`)
        .then((data) => {
          console.log(data.data);
          //context.commit('setUserTeamList', data.data.data);
          resolve(data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
    // localStorage.setItem("userId", response.data.data.user.id);
    // context.commit("setUserProfileInfo", response.data.data.user);
    // context.commit(
    //   "setCandidateProfileInfo",
    //   response.data.data.candidate_information
    // );
    // context.commit(
    //   "setRepresentativeProfileInfo",
    //   response.data.data.representative_information[0]
    // );
  },

  async changeAccountType(context, payload) {
    const response = await ApiService.post("v1/switch-account", payload)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("response", response);
  },

  async getClientSecret(context, _) {
    const response = await ApiService.get(
      "v1/subscription/payment_initialization"
    );
    context.commit("setClientSecret", response.data.data);
  },
  async createSubscription(context, payload) {
    const response = await ApiService.post(
      "v1/subscription/new_subscription",
      payload
    );
    // console.log(response);
    // return new Promise((resolve, reject) => {
    //   ApiService.post(`v1/subscription/new_subscription`, payload)
    //     .then((data) => {
    //       console.log(data.data);
    //       //context.commit('setUserTeamList', data.data.data);
    //       resolve(data.data);
    //     })
    //     .catch((err) => {
    //       reject(err);
    //     });
    // });
  },
  async getDashboardStats(context, _) {
    return new Promise((resolve, reject) => {
      ApiService.get("v1/user-dashboard")
        .then((data) => {
          console.log(data);
          //context.commit('setUserTeamList', data.data.data);
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  saveUserInfo(context, payload) {
    let localStorageUser = JSON.parse(localStorage.getItem("user"));
    localStorageUser.status = payload.user.status;
    localStorageUser.per_main_image_url = payload.user.per_main_image_url;
    localStorageUser.is_uplaoded_doc = payload.user.is_uplaoded_doc;
    localStorage.setItem("user", JSON.stringify(localStorageUser));

    // let userInfo = 

    context.commit("setUserInfo", localStorageUser);
    context.commit("setCandidateInfo", payload.candidate_information);
    context.commit("setRepresentativeInfo", payload.representative_information);
  }
};
