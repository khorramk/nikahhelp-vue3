<template>
  <v-card
      class="mx-auto shadow-default shortlist-card"
  >
    <Loader v-if="isLoading" :isLoading="isLoading" />

    <template slot="progress">
      <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
      ></v-progress-linear>
    </template>
    <v-img
        height="250"
        :src="item.image ? item.image + `?token=${token}` : avatarSrc + `?token=${token}`"
    ></v-img>

    <v-card-title>
      {{ getName }}
      <v-chip
          class="ma-2"
          :color="item.from_short_list ? 'green' : 'orange'"
          text-color="white"
          small
      >
        {{ item.from_short_list ? 'Shortlisted' : 'Teamlisted' }}
      </v-chip>
    </v-card-title>

    <div class="px-4">
      <ul class="desc-list">
        <!-- Location -->
        <li class="flex-between-start">
          <span class="flex-30 label-text">Location</span>
          <span class="flex-70">:
                    <span class="ml-1">{{ item.per_ethnicity }}
                    </span>
                </span>
        </li>
        <!-- Age -->
        <li class="flex-between-start">
          <span class="flex-30 label-text">Age</span>
          <span class="flex-70">:
                    <span class="ml-1">{{ item.per_age }} </span>
                </span>
        </li>

        <!-- Religion -->
        <li class="flex-between-start">
          <span class="flex-30 label-text">Religion</span>
          <span class="flex-70">:
                    <span class="ml-1">{{ item.per_religion }}</span>
                </span>
        </li>
<!--        <template v-if="onceMore">-->
<!--          <li class="flex-between-start">-->
<!--            <span class="flex-30 label-text">Ethnicity</span>-->
<!--            <span class="flex-70">:-->
<!--                        <span class="ml-1">Ethnicity </span>-->
<!--                    </span>-->
<!--          </li>-->
<!--          <li class="flex-between-start">-->
<!--            <span class="flex-30 label-text">Hobby</span>-->
<!--            <span class="flex-70">:-->
<!--                        <span class="ml-1">  </span>-->
<!--                    </span>-->
<!--          </li>-->
<!--        </template>-->
      </ul>
    </div>
    <v-divider class="mx-4"></v-divider>

    <!-- <div class="flex flex-wrap justify-space-between px-4">
      <v-btn
          class="text-capitalize btn-connection color-primary"
          style="width:47%"
          rounded
          outlined
          small
          color=""
          dark
          @click="actionShortlist"
      >
        <div class="flex justify-center align-center">
          <img
              style="height: 13px; margin-right: 4px;"
              src="@/assets/icon/star-fill-secondary.svg"
              alt=""
          >
          {{ shortlisted ? 'Unlist' : 'Shortlist' }}
        </div>
      </v-btn>
      <v-btn
          class="text-capitalize btn-connection color-primary"
          style="width:47%"
          rounded
          outlined
          small
          color=""
          dark
          @click="actionConnection"
      >
        <div class="flex justify-center align-center">
          <img style="height: 13px; margin-right: 4px;" src="@/assets/icon/connection-secondary.svg" alt="">
          {{ item.is_connect ? 'Connected' : 'Connect' }}
        </div>
      </v-btn>
    </div>
    <div class="mt-3 px-4 flex flex-wrap justify-space-between">
      <v-btn
          class="text-capitalize btn-connection color-primary"
          style="width:47%"
          rounded
          outlined
          small
          color=""
          dark
          @click="actionTeamlist"
      >
        <div class="flex justify-center align-center">
          <img style="height: 13px; margin-right: 4px;" src="@/assets/icon/group-fill-secondary.svg" alt="">
          {{ teamlisted ? 'Unlist team' : 'Teamlist' }}
        </div>
      </v-btn>
      <v-btn
          class="text-capitalize btn-connection color-primary"
          style="width:47%"
          rounded
          outlined
          small
          color=""
          dark
          @click="actionBlock"
      >
        <div class="flex justify-center align-center">
          <img style="height: 13px; margin-right: 4px;" src="@/assets/icon/block-secondary.svg" alt="">
          Block
        </div>
      </v-btn>
    </div>
    <div class="px-4 pb-4 mt-4">
      <v-btn
          class="mt-1 text-capitalize btn-connection color-primary"
          block
          rounded
          outlined
          color=""
          dark
          @click="viewProfile"
      >
        <div class="flex justify-center align-center">
          <a-icon type="user" class="mr-2" />
          View Profile
        </div>
      </v-btn>
    </div> -->
    <!-- <div class="px-4 pb-4 mt-4">
      <v-btn
          class="mt-1 text-capitalize btn-connection color-primary"
          block
          rounded
          outlined
          color=""
          dark
          @click="viewProfile"
      >
        <div class="flex justify-center align-center">
          <a-icon type="user" class="mr-2" />
          View Profile
        </div>
      </v-btn>
    </div> -->
    <div class="flex flex-wrap justify-space-between px-4">
      <ButtonComponent
        wrapperWidth="49%"
        iconHeight="14px"
        :isSmall="true"
        :responsive="false"
        :title="shortlisted ? 'Unlist' : 'ShortList'"
        icon="/assets/icon/star-fill-secondary.svg"
        :customEvent="shortlisted ? 'removeShortList' : 'addShortList'"
        @onClickButton="actionShortlist"
      />
      <ButtonComponent
        class="connect-button"
        wrapperWidth="49%"
        iconHeight="14px"
        :isSmall="true"
        :responsive="false"
        :title="item.is_connect ? 'Disconnect' : 'Connect'"
        icon="/assets/icon/connect-s.svg"
        :customEvent="item.is_connect ? 'removeConnection' : 'addConnection'"
        :backgroundColor="item.is_connect ? '' : '#3ab549'"
        @onClickButton="actionConnection"
      />
    </div>
    <div class="mt-3 px-4 flex flex-wrap justify-space-between">
      <ButtonComponent
        wrapperWidth="49%"
        iconHeight="14px"
        :isSmall="true"
        :responsive="false"
        :title="teamlisted ? 'Unlist Team' : 'TeamList'"
        icon="/assets/icon/teamlist.svg"
        :customEvent="teamlisted ? 'removeTeam' : 'addTeam'"
        @onClickButton="actionTeamlist"
      />
      <ButtonComponent
        class="block-button"
        wrapperWidth="49%"
        iconHeight="14px"
        :isSmall="true"
        :responsive="false"
        :title="item.is_block_listed ? 'Unblock' : 'Block'"
        :icon="item.is_block_listed ? '/assets/icon/block-secondary.svg' : '/assets/icon/block.svg'"
        :customEvent="item.is_block_listed ? 'removeBlock' : 'block'"
        :backgroundColor="item.is_block_listed ? '' : '#d81b60'"
        :titleColor="item.is_block_listed ? '' : 'white'"
        @onClickButton="actionBlock"
      />
    </div>
    <div class="px-4 pb-4 mt-4">
      <ButtonComponent
        :responsive="false"
        title="View Profile"
        iconHeight="14px"
        icon="/assets/icon/person-fill-secondary.svg"
        customEvent="viewProfileDetail"
        @onClickButton="viewProfile"
      />
    </div>
  </v-card>
</template>

<script>
import ApiService from '@/services/api.service';
import JwtService from "@/services/jwt.service";
import Notification from "@/common/notification.js";
import ButtonComponent from '@/components/atom/ButtonComponent'


export default {
  name: "CandidateGrid",
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
    ping: function (data) {
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    }
  },
  components: {
      ButtonComponent
  },
  props: ['item', 'shortListedIds', 'teamListedIds'],
  data() {
    return {
      avatarSrc: "https://www.w3schools.com/w3images/avatar2.png",
      token: '',
      isLoading: false,
    }
  },
  created() {
    this.token = JSON.parse(localStorage.getItem("token"));
  },
  computed: {
    loggedUser() {
      return JSON.parse(localStorage.getItem('user'));
    },
    shortlisted() {
      return this.shortListedIds.includes(parseInt(this.item.user_id));
    },
    teamlisted() {
      return this.teamListedIds.includes(parseInt(this.item.user_id));
    },
    getName() {
      return this.item.first_name + ' ' + this.item.last_name;
    }
  },
  methods: {
    socketNotification(payload) {
      let loggedUser = JSON.parse(localStorage.getItem('user'));
      payload.sender = loggedUser.id;
      Notification.storeNotification(payload);
      payload.created_at = new Date();
      payload.seen = 0;
      payload.sender = loggedUser;
      if(payload && payload.receivers.length > 0) {
        payload.receivers = payload.receivers.map(item => {
          return item.toString();
        });
        this.$socket.emit('notification', payload);
      }
    },
    otherTeamNotifyData() {
      let notifyObj = {
        receivers: this.item.team.members_id,
        team_id: this.item.team.team_id,
        // team_temp_name: my_team
      };
      return notifyObj;
    },
    selfTeamNotifyData() {
      const teamId = JwtService.getTeamIDAppWide();
      let activeTeam = this.$store.state.team.team_list.find(team => team.team_id == teamId);
      if(activeTeam) {
        let loggedUser = JSON.parse(localStorage.getItem('user'));
        let teamMembers = activeTeam.team_members.filter(item => item.user_id !== loggedUser.id);
        let notifyObj = {
          receivers: teamMembers.map(member => member.user_id),
          team_id: activeTeam.id,
          team_temp_name: activeTeam.name
        };

        return notifyObj;
      }
      return {};
    },
    viewProfile() {
      this.$router.push(
          `/user/profile/${this.item.user_id}`
      );
    },
    actionShortlist() {
      let loggedUser = JSON.parse(localStorage.getItem("user"));
      if(parseInt(loggedUser.status) !== 3) {
        this.showError("Your account is not verified");
        return;
      }

      if(parseInt(this.item.verification_status) !== 3) {
        this.showError("Opposite candidate account is not verified");
        return;
      }

      if(this.shortListedIds.includes(parseInt(this.item.user_id))) {
        ApiService.delete(`/v1/delete-short-listed-by-candidates?user_id=${this.item.user_id}`).then(res => {
          this.$emit("loadList");
          this.loadShortListedCandidates();
        }).catch(e => {
          console.log(e);
        });
      } else {
        ApiService.post(`/v1/short-listed-candidates/store`, { user_id: this.item.user_id, shortlisted_by: this.loggedUser.id }).then(res => {
          this.$emit("loadList");
          this.loadShortListedCandidates();
        }).catch(e => {
          console.log(e);
        });
      }
    },
    actionTeamlist() {
      let loggedUser = JSON.parse(localStorage.getItem("user"));
      if(parseInt(loggedUser.status) !== 3) {
        this.showError("Your account is not verified");
        return;
      }

      if(parseInt(this.item.verification_status) !== 3) {
        this.showError("Opposite candidate account is not verified");
        return;
      }

      if(this.teamListedIds.includes(this.item.user_id)) {
        ApiService.delete(`/v1/delete-team-short-listed-by-candidates?user_id=${this.item.user_id}`).then(res => {
          this.$emit("loadList");

          let notifyObject = this.selfTeamNotifyData();
          notifyObject.title = "deleted a candidate from teamlist";
          this.socketNotification(notifyObject);
        }).catch(e => {
          console.log(e);
        })
      } else {
        ApiService.post(`/v1/team-short-listed-candidates/store`, { user_id: this.item.user_id, team_listed_by: this.loggedUser.id }).then(res => {
          this.$emit("loadList");

          let notifyObject = this.selfTeamNotifyData();
          notifyObject.title = "add a candidate to teamlist";
          this.socketNotification(notifyObject);
        }).catch(e => {
          console.log(e);
        });
      }
    },
    actionBlock() {
      let loggedUser = JSON.parse(localStorage.getItem("user"));
      if(parseInt(loggedUser.status) !== 3) {
        this.showError("Your account is not verified");
        return;
      }

      if(parseInt(this.item.verification_status) !== 3) {
        this.showError("Opposite candidate account is not verified");
        return;
      }

      const vm = this;
      this.$confirm({
        title: "Are you sure?",
        content: "Do you want to block this candidate?",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk() {
          ApiService.post(`/v1/store-block-list`, { user_id: vm.item.user_id })
          .then(res => {
            vm.$emit("loadList");

            let notifyObject = vm.selfTeamNotifyData();
            notifyObject.title = `blocked ${vm.getName}`;
            vm.socketNotification(notifyObject);
          }).catch(e => {
            console.log(e);
          });
        },
        onCancel() {
          console.log("Cancel");
        },
      });
      
    },
    actionConnection() {
      let myTeamId = JwtService.getTeamIDAppWide();
      if(!this.item.is_connect) {
        let loggedUser = JSON.parse(localStorage.getItem("user"));
        if(parseInt(loggedUser.status) !== 3) {
          this.showError("Your account is not verified");
          return;
        }

        if(parseInt(this.item.verification_status) !== 3) {
          this.showError("Opposite candidate account is not verified");
          return;
        }

        if(!myTeamId) {
          this.showError("You don't have an active team");
          return;
        }
        if(!this.item.team_id) {
          this.showError("This candidate has no active team");
          return;
        }

        this.isLoading = true;
        let payload = {
          from_team_id: myTeamId,
          to_team_id: this.item.team_id
        }
        ApiService.post(`/v1/send-connection-request`, payload)
            .then(res => {
              this.$success({
                title: "Connection Request Sent Successfully!",
                centered: true,
              });
              let payload = {
                receivers: [this.item.user_id],
                title: `sent you a new team connection request`,
                team_temp_name: this.item.team.name,
                team_id: this.item.team.team_id
              };
              this.$emit("socketNotification", payload);
              this.isLoading = false;
            }).catch(e => {
              console.log(e);
              this.isLoading = false;
            });
      } else {
        //
      }
    },
    showError(message) {
      this.$error({
        title: message,
        center: true,
      });
    },
    async loadShortListedCandidates() {
      let {data} = await ApiService.get('/v1/short-listed-candidates').then(res => res.data);
      this.$store.state.shortList.shortlistedItems = data;
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
//.shortlist-card {
//  max-width: 300px;
//  @media (min-width: 1200px) {
//    max-width: 374px;
//  }
//}
.btn-connection:hover {
  box-shadow: 0 1px 6px #787474;
  border: 1px solid white !important;
  background: $bg-primary;
  color: $color-white !important;
  div {
    img {
      filter: brightness(0) invert(1);
    }
  }
}

.block-button {
  .v-custom:hover {
    background: #fff !important;
    color: #d81b60 !important;
    border: 1px solid #d81b60 !important;

    img {
      filter: none !important;
    }
  }
}
.connect-button {
  .v-custom:hover {
    background: #fff !important;
    color: $bg-success !important;
    border: 1px solid $bg-success !important;

    img {
      filter: none !important;
    }
  }
}
</style>