// import axios from "axios";
//import JwtService from "../../../services/jwt.service";
import ApiService from "../../../services/api.service";
export default {
  sugeestionOn(context, payload) {
      context.commit('setSuggestionOn', payload);
  },

  async searchUser(context, payload) {
    return new Promise((resolve, reject) => {
      context.commit('setLoading', true)
      ApiService.get(payload.url)
        .then((res) => {
          context.commit('setLoading', false)
          console.log(res.data.status,"then")
          if(res.data) {
            if(res.data.status == 'SUCCESS') {
              if(payload.removePrevious) context.commit('clearProfiles');
              console.log(res.data.data.pagination,'res.data.data.pagination')
              context.commit('setProfiles', res.data.data.data);
              context.commit('setPaginationData', res.data.data.pagination);
            }

            if(res.data.status == 'FAIL') {
              context.commit('clearProfiles');
              context.commit('setPaginationData', {});
            }
          }
          resolve(res.data);
        })
        .catch((err) => {
          context.commit('setLoading', false)
          reject(err);
        });
    });
  },
  async fetchProfileDetail(context, url) {
    return new Promise((resolve, reject) => {
      context.commit('setLoading', true)
      ApiService.get(url)
        .then((res) => {
          context.commit('setLoading', false)
          console.log(res,"then")
          if(res.data) {
            if(res.data.status == 'SUCCESS') {
              console.log(res.data.data, 'success')
              context.commit('setProfileDetails', res.data.data);
            }

            if(res.data.status == 'FAIL') {
              console.log('fail')
            }
          }
          resolve(res.data);
        })
        .catch((err) => {
          context.commit('setLoading', false)
          reject(err);
        });
    });
  },
  async teamListCandidate(context, payload) {
    return new Promise((resolve, reject) => {
      context.commit('setLoading', true)
      ApiService[payload.actionType](payload.url, payload.payload)
      .then((data) => {
        context.commit('setLoading', false)
        resolve(data.data);
        if(data.data?.status_code == 200) {
          context.commit('updateCandidateAfterTeamtlisted',{userId: payload.user_id, value: payload.value})
        }
      })
      .catch((err) => {
        context.commit('setLoading', false)
        reject(err);
      });
    });
  },
  async shortListCandidate(context, payload) {
    return new Promise((resolve, reject) => {
      context.commit('setLoading', true)
      ApiService[payload.actionType](payload.url, payload.payload)
      .then((data) => {
        context.commit('setLoading', false)
        resolve(data.data);
        context.commit('updateCandidateAfterShortlisted',{userId: payload.user_id, value: payload.value})
      })
      .catch((err) => {
        context.commit('setLoading', false)
        reject(err);
      });
    });
  },
  async teamListedCandidate(context, payload) {
    return new Promise((resolve, reject) => {
      context.commit('setLoading', true)
      ApiService[payload.actionType](payload.url, payload.payload)
          .then((data) => {
            context.commit('setLoading', false)
            resolve(data.data);
            context.commit('updateCandidateAfterTeamtlisted',{userId: payload.user_id, value: payload.value})
          })
          .catch((err) => {
            context.commit('setLoading', false)
            reject(err);
          });
    });
  },
  async blockCandidate(context, payload) {
    // context.commit('updateCandidateAfterBlock',{userId: payload.payload.user_id, value: true})
    return new Promise((resolve, reject) => {
      context.commit('setLoading', true)
      ApiService[payload.actionType](payload.url, payload.payload)
        .then((data) => {
          if(data.data?.status_code == 200) {
            context.commit('updateCandidateAfterBlock',{userId: payload.payload.user_id, value: payload.value})
          }
          context.commit('setLoading', false)
          resolve(data.data);
        })
        .catch((err) => {
          context.commit('setLoading', false)
          reject(err);
        });
    });
  },
  async connectCandidate(context, payload) {
    return new Promise((resolve, reject) => {
      context.commit('setLoading', true)
      ApiService.post(payload.url, payload.payload)
        .then((data) => {
          context.commit('setLoading', false)
          // context.commit('updateCandidateAfterConnect', {userId: payload.userId, value: true})
          resolve(data.data);
        })
        .catch((err) => {
          context.commit('setLoading', false)
          reject(err);
        });
    });
  },
  getNextUserId({state}, currentUserId) {
    let candidate = state.profiles.find(i => i.user_id == currentUserId);
    let ind = state.profiles.indexOf(candidate)
    console.log(ind, 'ind')
    let isAvailable = state.profiles[ind+1];
    if(isAvailable) {
      return state.profiles[ind+1].user_id
    }
    return null;
  },
  getPreviousUserId({state}, currentUserId) {
    let candidate = state.profiles.find(i => i.user_id == currentUserId);
    let ind = state.profiles.indexOf(candidate)
    console.log(ind, 'ind')
    let isAvailable = state.profiles[ind-1];
    if(isAvailable) {
      return state.profiles[ind-1].user_id
    }
    return null;
  },

  async getCandidateInfo(context, url) {
    return new Promise((resolve, reject) => {
      context.commit('setLoading', true)
      ApiService.get(url)
        .then((data) => {
          //context.commit('setLoading', false)
          resolve(data.data);
        })
        .catch((err) => {
          context.commit('setLoading', false)
          reject(err);
        });
    });
  },
};
