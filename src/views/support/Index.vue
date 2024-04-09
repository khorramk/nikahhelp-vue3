<template>
  <div>
    <v-skeleton-loader
        v-if="loading"
          type="card"
        ></v-skeleton-loader>
    <div class="container-fluid mt-4" v-else>
      <div class="row mobile-version">
        <component :is="currentTicketComponents"></component>

        <div class="col-12 col-lg-4">
          <div class="card br-10">
            <v-tabs color="error accent-4" class="w-full d-flex justify-content-between support-tab" grow>
	            <v-tab href="#tab-2" @click="tab = 'tab-2'" class="">Submit a ticket</v-tab>
              <v-tab href="#tab-1" @click="tab = 'tab-1'" class="">Start a chat</v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item value="tab-2">
                <div class="chat-area px-4" v-if="!ticketSubmitted">
	                <a-form-item label="Type of issue">
		                <a-select style="width: 100%; margin-bottom: 0.5rem;"
		                          required
		                          v-model="selectedIssue">
			                <a-select-option value="manageteam">
				                Manage Team
			                </a-select-option>
			                <a-select-option value="Chat">
				                Chat
			                </a-select-option>
			                <a-select-option value="connection">
				                Connections
			                </a-select-option>
			                <a-select-option value="shortList">
				                Short List
			                </a-select-option>
			                <a-select-option value="profile">
				                Profile
			                </a-select-option>
			                <a-select-option value="blocklist">
				                Block list
			                </a-select-option>
			                <a-select-option value="notification">
				                Notification
			                </a-select-option>
			                <a-select-option value="subscription">
				                Subscription
			                </a-select-option>
			                <a-select-option value="search">
				                Search
			                </a-select-option>
		                </a-select>
									</a-form-item>
	                <a-form-item label="Your message">
		                <v-textarea v-model="issue"
                                name="input-7-1"
                              filled
                              label="describe issue"
                              auto-grow
		                            required
		                            :auto-size="{ 'minRow': 800, }" style="height: 10rem; margin-bottom: 0.5rem;"></v-textarea>
	                </a-form-item>
	                <v-btn type="primary" @click="ticketSumbission">Submit Ticket</v-btn>
                </div>
                <div class="chat-area px-4 " v-else>
                  <v-card class="d-flex flex-column align-center justify-center mt-4">
                    <v-icon color="success">
                      mdi-check-circle
                    </v-icon>
                    <v-card-text>
                      Success
                    </v-card-text>
                  </v-card>
                </div>
              </v-tab-item>
	            <v-tab-item value="tab-1">
		            <div class="chat-area px-4">
			            <h1 class="d-flex justify-content-center align-items-center">Coming soon</h1>
		            </div>
	            </v-tab-item>
            </v-tabs-items>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  
import {format} from "timeago.js";
import Tickets from "@/views/support/Tickets";
import {mapActions, mapGetters} from "vuex";
import UserTicket from "@/views/support/UserTicket";
import TicketMessages from '@/views/support/TicketMessages.vue';
import SendMessageForTickets from '@/views/support/SendMessageForTickets.vue';
import ApiService from '../../services/api.service';
export default {
  name: "Support",
	components: {Tickets, UserTicket, TicketMessages, SendMessageForTickets},

  

	created() {
		this.getTickets();
		this.$store.dispatch('getMyTickets', this.getAuthUserId);
	},
	
  data() {
    return {
      tab: 'tab-2',
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
      customStyle: 'border: none; background: #ffffff',
	    selectedIssue: '',
	    issue: '',
	    screenshotData: {},
      noTickets: true,
      ticketSubmitted: false
    }
  },

  computed: {
		...mapGetters([
				'currentTicketComponents',
        'getUserTickets',

		]),
    getAuthUserId() {
      let loggedUser = JSON.parse(localStorage.getItem('user'));
      if (loggedUser) {
        return loggedUser.id;
      }
      return null;
    },
    getAuthUser() {
      let loggedUser = JSON.parse(localStorage.getItem('user'));
      if (loggedUser) {
        return loggedUser;
      }
      return null;
    },

    loading() {
      return this.getUserTickets.length < 1 && this.noTickets;
    },



  },

  methods: {
    ...mapActions([
      'submitTicket'
    ]),

    messageCreatedAt(time) {
      return format(time);
    },

	  getTickets() {
			this.currentComponent = 'tickets';
	  },

    ticketSumbission() {
      ApiService.post('v1/ticket-submission', {
              issue_type: this.selectedIssue,
              issue: this.issue,
              user: localStorage.getItem('user'),
            }).then(() => {
                            this.ticketSubmitted = true;
                          })
                          .catch(e => {
                              console.log(e);
                          })
    }
    
  },

  watch: {
    getUserTickets() {
      this.noTickets = this.getUserTickets.length > 0;
    }
  }

}
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.br-10 {
  border-radius: 10px;
}
.card {
  background-color: #ffffff;
  box-shadow: 0px 0px 10px 1px rgb(63 6 17 / 30%);
  height: calc(100vh - 98px);
  overflow-y: auto;
}
.chat-area {
  //min-height: 600px;
  min-height: calc(100vh - 148px);
  @media (min-width: 410px) {
    min-height: calc(100vh - 148px);
  }
  @media (min-width: 576px) {
    min-height: calc(100vh - 148px);
  }
  @media (min-width: 768px) {
    min-height: calc(100vh - 148px);
  }
  @media (min-width: 992px) {
    min-height: calc(100vh - 148px);
  }
  @media (min-width: 1200px) {
    min-height: calc(100vh - 148px);
  }
  @media (min-width: 1920px) {
    min-height: calc(100vh - 148px);
  }
}
.chat-messages {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  //max-height: 540px;
  max-height: calc(100vh - 230px);
  @media (min-width: 410px) {
    max-height: calc(100vh - 230px);
  }
  @media (min-width: 576px) {
    max-height: calc(100vh - 230px);
  }
  @media (min-width: 768px) {
    max-height: calc(100vh - 230px);
  }
  @media (min-width: 992px) {
    max-height: calc(100vh - 230px);
  }
  @media (min-width: 1200px) {
    max-height: calc(100vh - 230px);
  }
  @media (min-width: 1920px) {
    max-height: calc(100vh - 240px);
  }
}
.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;

  .footer-top {
    font-size: 12px;
    color: #818181;
    margin-bottom: 12px;
  }

  .footer-bottom {
    .left {
      width: 100%;
      display: flex;
      justify-content: space-between;

      .message-box {
        position: relative;
        width: 100%;

        input {
          height: 36px;
          width: 100%;
          border: 0;
          padding: 7px 54px 7px 40px;
          border-radius: 18px;
          background-color: #eceaf5;
          resize: none;
          //v-on:keyup.enter="sendMsg($event)"
          @media (max-width: 767px) {
            padding-left: 32px;
          }
        }

        textarea {
          width: 100%;
          border: 0;
          padding: 7px 24px 7px 7px;
          border-radius: 10px;
          background-color: #eceaf5;
          resize: none;
          max-height: 70px;
          overflow-y: hidden;
          @media (max-width: 767px) {
            padding-left: 32px;
          }
        }

        .btn-multimedia, .btn-files {
          position: absolute;
          top: -3px;
          right: 16px;
          margin-left: 10px;
          @media (max-width: 767px) {
            right: 6px;
          }
        }

        .btn-emoji {
          right: auto;
          left: -8px;
          top: 3px;
        }

        .btn-multimedia {
          right: 45px;
          @media (max-width: 767px) {
            right: 30px;
          }
        }

        svg {
          .cls-1 {
            fill: #fff;
          }

          .cls-2 {
            fill: #8983be;
          }

          .files {
            fill: #6159a8;
          }

          .multimedia {
            fill: #6159a8;
          }
        }
      }

      button {
        display: flex;
        justify-content: space-between;
        font-size: 15px;
        height: 36px;
        line-height: 28px;
        @media (max-width: 767px) {
          min-width: auto;
        }

        svg {
          width: 18px;
          float: left;
          margin-top: 9px;
          margin-left: 6px;

          .cls-1 {
            fill: #fff;
          }

          .cls-2 {
            fill: #8983be;
          }

          @media (max-width: 767px) {
            display: none;
          }
        }
      }
    }
  }
}
.microphone {
  width: 15px;
  height: 15px;
}
.msgbox-right {
  top: 0;
  right: 4px;
  height: 66px;
}
.chat-message-left,
.chat-message-right {
  display: flex;
  flex-shrink: 0
}

.chat-message-left {
  margin-right: auto
}

.chat-message-right {
  flex-direction: row-reverse;
  margin-left: auto
}
.msg-right-created-at {
  bottom: -4px;
  right: 6px;
}
.msg-left-created-at {
  bottom: -4px;
  left: 6px;
}
.flex-grow-0 {
  flex-grow: 0!important;
}
.border-top {
  border-top: 1px solid #dee2e6!important;
}
.bg-me {
  background-color: #3f9de7;
}
.w-25 {
  width: 100% !important;
  @media (min-width: 768px) {
    width: 25% !important;
  }
}
.search-ml {
  @media (min-width: 768px) {
    margin-left: 8px;
  }
}
.h1-flex {
  display: flex
;
  @media (min-width: 768px) {
    display: flex;
  }
}
.none-mobile {
  display: none;
  @media (min-width: 768px) {
    display: flex;
  }
}
.mobile-version {
  display: flex;
  flex-direction: column-reverse;
  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
}
.rate-btn:hover {
  background: $bg-primary;
  color: #FFFFFF !important;
}
.desktop-btns {
  display: none;
  @media (min-width: 768px) {
    display: flex;
  }
}
.mobile-btns {
  display: flex;
  @media (min-width: 768px) {
    display: none;
  }
}
.conv-mb {
  margin-bottom: 30px;
}
</style>