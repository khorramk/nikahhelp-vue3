

// import Vue from "vue";
import axios from "axios";
import JwtService from "../../../services/jwt.service";
import router from '../../../router';
import ApiService from "../../../services/api.service";
export default {
  async adminLogin(context, payload) {
    const form = new FormData();
    form.append('email', payload.email);
    form.append('password', payload.password);
    
    await axios.post("v1/admin/login", payload).then(async (response) => {
      const token = response.data.data.token.access_token;
      let data = { token: token };
       JwtService.saveTokenAndUser(data);
      JwtService.setUser(response.data.data.user);
      context.commit("setErrorMessage", {
        errorMessage: null,
      });
      context.commit("setUser", {
        token: response.data.data.access_token,
      });


      router.push({ name: 'AdminUsers' });
    }).catch((e) => {
      console.log('message', e.message)
      context.commit("setErrorMessage", {
        errorMessage: "Invalid email or password",
      });
    });
  },
  async getPendingUsers() {
    return new Promise((resolve, reject) => {
      ApiService.get(`v1/admin/pending-user`)
        .then((data) => {
          resolve(data.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async getPendingUsersByPage(context, payload) {
    return new Promise((resolve, reject) => {
      ApiService.get(`v1/admin/pending-user?page=${payload.page}&account_type=${payload.account_type}&keyword=${payload.keyword}`)
        .then((data) => {
          resolve(data.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async getVerifiedUsers() {
    return new Promise((resolve, reject) => {
      ApiService.get(`v1/admin/verified-user-list`)
        .then((data) => {
          resolve(data.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async getVerifiedUsersByPage(context, payload) {
    return new Promise((resolve, reject) => {
      ApiService.get(`v1/admin/verified-user-list?page=${payload.page}&account_type=${payload.account_type}&keyword=${payload.keyword}`)
        .then((data) => {
          resolve(data.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async getRejectedUsers() {
    return new Promise((resolve, reject) => {
      ApiService.get(`v1/admin/rejected-user-list`)
        .then((data) => {
          resolve(data.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async getRejectedUsersByPage(context, payload) {
    return new Promise((resolve, reject) => {
      ApiService.get(`v1/admin/rejected-user-list?page=${payload.page}&account_type=${payload.account_type}&keyword=${payload.keyword}`)
        .then((data) => {
          resolve(data.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async getTeamList() {
    return new Promise((resolve, reject) => {
      ApiService.get(`v1/admin/team-list`)
        .then((data) => {
          resolve(data.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  async getDeletedTeamList() {
    return new Promise((resolve, reject) => {
      ApiService.get(`v1/admin/deleetd-team-list`)
        .then((data) => {
          resolve(data.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  async updateUserVerifyOrReject(context, payload) {
    return new Promise((resolve, reject) => {
      ApiService.post(`v1/admin/user-verify-reject`, payload)
        .then((data) => {
          resolve(data.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async getDocumentInfo(context, payload) {
    return new Promise((resolve, reject) => {
      ApiService.get(`v1/admin/user-info/${payload}`)
        .then((data) => {
          resolve(data.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async getSearchLocation(context, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`/v1/search/location`, payload)
        .then((data) => {
          console.log('dd', data.data)
          resolve(data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async getUserReports() {
    return new Promise((resolve, reject) => {
      ApiService.get(`v1/admin/users-report`)
        .then((data) => {
          resolve(data.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },




  async getUserReportsByPage(context, payload) {
    return new Promise((resolve, reject) => {
      ApiService.get(`v1/admin/users-report?page=${payload.page}&account_type=${payload.account_type}&keyword=${payload.keyword}`)
        .then((data) => {
          resolve(data.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async getCountCanOrRep() {
    return new Promise((resolve, reject) => {
      ApiService.get(`v1/admin/count-can-rep`)
        .then((data) => {
          resolve(data.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getSupportComponent(context, payload) {
     context.commit('supportComponent', payload);
  },

  getTicketsFromUsers(context) {
    ApiService.get('/v1/admin/get-users-with-tickets')
					 .then(data => data.data)
					 .then(data => {
						 context.commit('storeTicketsFromUsers', data.data)
					 })
  },

  goToTicket(context, payload) {
     context.commit('getTicket', payload);
      context.dispatch('getSupportComponent', 'TicketDetails');
  },

  sendMessage(context) {
    context.commit('getSupportComponent', 'SendTicketMessage');
  },

  goBackToTickets(context) {
    context.dispatch('getSupportComponent', 'reporter');
    context.dispatch('getTicketsFromUsers');
  },

  resolveTicket(context, payload) {
      ApiService.post('/v1/admin/ticketResolve', {
        ticket_id: payload
      }).then(() => {
        context.dispatch('goBackToTickets');
      })
      .catch(() => {

      });
  },

  goToMessages(context) {
    context.commit('messageList');
    context.dispatch('getSupportComponent', 'TicketMessages');
  },

  reply(context) {
    context.dispatch('getSupportComponent', 'SendTicketMessage');
  },

  replyToCustomers(context, payload) {
    ApiService.post('/v1/admin/submitTicketRequests', {
      message: payload.message,
      ticket_id: payload.ticket_id,
      user: payload.user
    }).then(() => {
      context.dispatch('goBackToTickets');
    }).catch(() => {

    })
  }
};
