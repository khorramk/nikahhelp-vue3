<template>
  <div>
    <div>
      <Loader v-if="isLoading" :isLoading="isLoading" />
      <div v-else>
        <div class="mt-3">
          <!--teams.length == 0 && !joinTeamShow && !createTeamShow-->
          <!-- <a-modal v-model="welcomeModal" @ok="hideWelcomeModal">
            <div
              class="
                d-flex
                justify-content-center
                align-items-center
                welcome-text
                mt-2
              "
            >
              <h1 class="text-1">Welcome to</h1>
              <img
                src="@/assets/Icons/MT ma large logo.svg"
                class="matrimony-logo"
                alt="logo"
                width="200px"
              />
              <h1 class="text-2">on-board</h1>
            </div>
            <div class="description-text text-center">
              <p>
                Here you can create team, invite family and friends, shortlist
                potential <br />
                candidates and connect and chat with respective teams.
              </p>
            </div>
            <template slot="footer">
              <a-button key="back" @click="hideWelcomeModal"> Close </a-button>
            </template>
          </a-modal> -->
          <Banner v-if="1 !== 1" />
          <div class="row mx-0 team-container" id="team-container">
            <TeamDetailsCard
              v-for="(team, teamIndex) in teams"
              :key="team.id"
              :teamData="team"
              :index="teamIndex"
              @teamListUpdated="loadTeams"
              @customLoad="customLoad"
            />
            <JoinCreateTeam
              v-if="joinCreateTeamShow && teams.length < 5"
              style="padding: 8px 8px;"
              @joinATeam="
                joinCreateTeamShow = false;
                joinTeamShow = true;
              "
              @createATeam="
                joinCreateTeamShow = false;
                createTeamShow = true;
              "
            />
            <JoinTeam
              v-if="joinTeamShow"
              style="padding: 8px 8px;"
              :joinedAsCandidate="joinedAsCandidate"
              @loadTeams="loadTeams"
              @cancel_button="joinCreateTeamShow = true; joinTeamShow = false; cancelJoinButton()"
              @socketNotification="socketNotification"
            />
            <CreateTeamPage1
                id="create-container"
                v-if="createTeamShow"
                style="padding: 8px 8px;"
                :addAs="addAs"
                :teamCount="teams.length"
                :joinedAsCandidate="joinedAsCandidate"
                @cancel_button="cancelCreateTeamPage()"
                @loadTeams="loadTeams"
                @socketNotification="socketNotification"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import JoinTeam from "@/components/team/JoinTeam.vue";
import CreateTeamPage1 from "@/components/team/CreateTeamPage1.vue";
import JoinCreateTeam from "@/components/team/JoinCreateTeam.vue";
import TeamDetailsCard from "@/components/team/TeamDetailsCard.vue";
import Layout from "@/views/design/Layout.vue";
import Banner from "@/components/team/Banner.vue";
import Notification from "@/common/notification.js";
import ApiService from '@/services/api.service';
export default {
  name: "ManageTeam",
  components: {
    Banner,
    Layout,
    JoinTeam,
    JoinCreateTeam,
    CreateTeamPage1,
    TeamDetailsCard,
  },
  sockets: {
    connect: function () {
      console.log("socket connected");
    },
    ping: function (data) {
      console.log(
        'this method was fired by the socket server. eg: io.emit("customEmit", data)'
      );
    },
  },
  data() {
    return {
      isLoading: false,
      user: {},
      is_verified: 1,
      joinTeamShow: false,
      createTeamShow: false,
      joinCreateTeamShow: true,
      createTeamPassword: false,
      welcomeModal: false,
      joinTeamInfo: null,
      relationsShip: 'Father',
      teams: []
    };
  },
  created() {
    this.loadTeams();
    if (this.$route.query.invitation) {
      this.joinCreateTeamShow = false;
      this.joinTeamShow = true;
    }
  },
  computed: {
    addAs() {
      // let loggedUser = JSON.parse(localStorage.getItem('user'));
      // if(loggedUser && loggedUser.id && this.teams && this.teams.length > 0) {
      //   if(loggedUser.account_type == 1) {
      //     let candidate = false;
      //     this.teams.forEach(team => {
      //       if(!candidate) {
      //         team.team_members.filter(self => self.user_id == loggedUser.id).forEach(member => {
      //           if(member.user_type == 'Candidate') {
      //             candidate = true;
      //           }
      //         });
      //       }
      //     });
      //     // this.setRelationship(candidate ? 'Representative' : 'Candidate');
      //     return candidate ? 'Representative' : 'Candidate';
      //   } else if(loggedUser.account_type == 2) {
      //     // this.setRelationship('Representative');
      //     return 'Representative';
      //   } else if(loggedUser.account_type == 3) {
      //     // this.setRelationship('Match Maker');
      //     return 'Match Maker';
      //   }
      // } else {
      //   if(loggedUser.account_type == 1) {
      //     return 'Candidate'
      //   } else if(loggedUser.account_type == 2) {
      //     return 'Representative';
      //   } else if(loggedUser.account_type == 3) {
      //     return 'Match Maker';
      //   }
      // }
      // return 'Representative';
      if(this.joinedAsCandidate) {
        return 'Representative';
      } else {
        return 'Candidate';
      }
    },
    joinedAsCandidate() {
      let loggedUser = JSON.parse(localStorage.getItem('user'));
      if(loggedUser && loggedUser.id && this.teams && this.teams.length > 0) {
        if(loggedUser.account_type == 1) {
          let candidate = false;
          this.teams.forEach(team => {
            if(!candidate) {
              team.team_members.filter(self => self.user_id == loggedUser.id).forEach(member => {
                if(member.user_type == 'Candidate') {
                  candidate = true;
                }
              });
            }
          });

          return candidate;
        }
      } else {
        if(loggedUser.account_type == 1 && this.teams.length <= 0) {
          return false;
        }
      }
      return true;
    },
    isWebSocketReady() {
      return this.$store.state.webSocket.webSocket.readyState === 1;
    }
  },
  methods: {
    /*
      cancel_button ()
      {

        this.joinTeamShow = false;
        this.joinCreateTeamShow = true;

      },
*/
    socketNotification(payload) {
      let loggedUser = JSON.parse(localStorage.getItem("user"));
      payload.sender = loggedUser.id;
      Notification.storeNotification(payload);
      payload.created_at = new Date();
      payload.seen = 0;
      payload.sender = loggedUser;
      if (payload && payload.receivers.length > 0) {
        payload.receivers = payload.receivers.map((item) => {
          return item.toString();
        });

        if(this.isWebSocketReady) {
          this.$webSocket.send(JSON.stringify({
            action: 'notification',
            data: payload
          }));
        }
      }
    },
    scrollToPosition() {
      setTimeout(() => {
        const container = document.getElementById('team-container');
        const createContainer = document.getElementById('create-container');
        container.scrollTop = createContainer.offsetTop - 20;
      }, 1000);
    },
    setRelationship(type) {
      if(type == 'Candidate') {
        this.relationsShip = 'Own';
      } else {
        this.relationsShip = 'Father';
      }
    },
    async loadTeams() {
      try {
        this.isLoading = true;
        let {data} = await ApiService.get("v1/team-list").then(res => res.data);
        this.teams = data;
        if (this.teams.length <= 0) {
          this.welcomeModal = true;
          this.$emit('openSystemHelpDialog');
        }
        this.isLoading = false;
        // await this.$store
        //   .dispatch("getTeams")
        //   .then((data) => {
        //     this.teams = data.data.data;
              //     this.isLoading = false;
        //     if(this.teams.length <= 0) {
        //       this.welcomeModal = true;
        //     }
        //   })
        //   .catch((error) => {
        //     console.log(error.response);
        //     this.isLoading = false;
        //   });
      } catch (error) {
        this.error = error.message || "Something went wrong";
        console.log(this.error);
        this.isLoading = false;
      }
    },
    async customLoad() {
      try {
        let {data} = await ApiService.get("v1/team-list").then(res => res.data);
        this.teams = data;
        if (this.teams.length <= 0) {
          this.welcomeModal = true;
        }
      } catch (error) {
        this.error = error.message || "Something went wrong";
        console.log(this.error);
      }
    },
    hideWelcomeModal() {
      this.welcomeModal = false;
    },
    cancelCreateTeamPage() {
      this.joinCreateTeamShow = true;
      this.createTeamShow = false;
      this.loadTeams();
    },
    cancelJoinButton() {
      this.joinTeamShow = false;
      this.joinCreateTeamShow = true;
      this.loadTeams();
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.main-content-wrapper {
  margin-bottom: 30px;
  //height: 570px;
  .container {
    text-align: center;
    //		margin-left: 260px;
    .welcome-text-container {
      margin: 10px;
      .welcome-title-text {
        font-weight: bold;
        font-size: 2.75rem;
        color: #666666;
      }
      .welcome-title-subtext {
        color: #666666;
        font-weight: 100;
        font-size: 1.25rem;
      }
      .logo-text {
        font-family: $header-font;
        color: #3a3091;
        font-weight: 100;
      }
    }
  }
}
.welcome-text {
  margin-top: 20px;
  justify-content: center;
  .text-1 {
    margin-right: 20px;
    font-weight: 900;
    color: #666;
    font-size: 14px;
    @media screen and (min-width: 576px) {
      font-size: 18px;
    }
    @media screen and (min-width: 768px) {
      font-size: 20px;
    }
  }
  .matrimony-logo {
    width: 100px;
    @media screen and (min-width: 576px) {
      width: 140px;
    }
    @media screen and (min-width: 768px) {
      width: 180px;
    }
  }
  .text-2 {
    margin-left: 20px;
    font-weight: bold;
    color: #666;
    font-size: 14px;
    @media screen and (min-width: 576px) {
      font-size: 18px;
    }
    @media screen and (min-width: 768px) {
      font-size: 20px;
    }
  }
}
.description-text {
  p {
    font-size: 14px;
    word-spacing: 0.1em;
    font-weight: 400;
    color: #aaa;
    margin-top: 8px;
    @media screen and (min-width: 576px) {
      font-size: 17px;
    }
    @media screen and (min-width: 768px) {
      font-size: 18px;
    }
  }
}
.team-container {
  margin-left: 7px !important;
  padding: 0px !important;

  .team-card {
    margin-bottom: 0px;
  }

  .col-lg-6, .col-xl-3 {
    padding: 12px 8px 0px 8px !important;
    
  }
}
</style>
