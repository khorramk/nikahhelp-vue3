// import axios from "axios";
import JwtService from "../../../services/jwt.service";
import ApiService from "../../../services/api.service";
export default {
  setTeamId(context, team_id) {
    JwtService.saveTeamID(team_id);
    context.commit("setTeamId", team_id);
  },
  setCreateTeamStep(context, step) {
    context.commit("setCreateTeamStep", step);
  },

  async createTeamInvite(context, payload) {
    return new Promise((resolve, reject) => {
      ApiService.post("v1/invite-team-members", payload)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async getTeams(context, _) {
    return new Promise((resolve, reject) => {
      // console.log("inside get teams action", state);
      ApiService.get("v1/team-list")
        .then((data) => {
          console.log(data.data.data);
          context.commit("setUserTeamList", data.data.data);

          let teamList = data.data.data;
          context.commit("setUserTeamsVerificationStatus", teamList);
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async loadConnections(context, payload) {
    return new Promise((resolve, reject) => {
      ApiService.post(
        `v1/connection-report?team_id=${payload.team_id}`,
        payload
      )
        .then((data) => {
          console.log(data.data.data);
          //context.commit('setUserTeamList', data.data.data);
          resolve(data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async loadConnectionReports(context, payload) {
    return new Promise((resolve, reject) => {
      ApiService.post(`v1/connection-reports?team_id=${payload}`)
        .then((data) => {
          console.log(data.data.data);
          //context.commit('setUserTeamList', data.data.data);
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async getConnectionOverview(_, payload) {
    return new Promise((resolve, reject) => {
      ApiService.post("v1/connection-overview", payload)
        .then((data) => {
          console.log(data.data.data);
          //context.commit('setUserTeamList', data.data.data);
          resolve(data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async respondToRequest(_, payload) {
    return new Promise((resolve, reject) => {
      ApiService.post("v1/respond-connection-request", payload)
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
  async disconnectTeam(_, payload) {
    return new Promise((resolve, reject) => {
      ApiService.post("v1/disconnect-team", payload)
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
  async connectWithTeam(_, payload) {
    return new Promise((resolve, reject) => {
      ApiService.post("v1/send-connection-request", payload)
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
};
