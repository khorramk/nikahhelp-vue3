import ApiService from "../../../services/api.service";
import JwtService from "../../../services/jwt.service";

export default {
  async loadShortListedCandidates(context) {
    const response = await ApiService.get("v1/short-listed-candidates");
    //Throw Error from here

    context.commit("setShortListedCandidates", response.data.data);
  },
  async loadTeamShortListedCandidates(context) {
    const response = await ApiService.get("v1/team-short-listed-candidates");
    //Throw Error from here

    context.commit("setTeamShortListedCandidates", response.data.data);
  },
  async storeShortlist(_, payload) {
    return new Promise((resolve, reject) => {
      ApiService.post("v1/short-listed-candidates/store", payload)
        .then((data) => {
          console.log(data.data);
          //context.commit('setUserTeamList', data.data.data);
          resolve(data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async storeTeamlist(_, payload) {
    return new Promise((resolve, reject) => {
      ApiService.post("v1/short-listed-candidates/store", payload)
        .then((data) => {
          console.log(data.data);
          //context.commit('setUserTeamList', data.data.data);
          resolve(data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async removeShortlist(_, payload) {
    return new Promise((resolve, reject) => {
      ApiService.get(`v1/delete-short-listed-candidates/${payload}`).then(
        (data) => {
          console.log(data.data);
          resolve(data.data);
        }
      );
    });
  },
};
