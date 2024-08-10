<template>
  <v-card
    @click="showDetailRightSide"
    :loading="loading"
    class="mx-auto"
  >
    <template #progress>
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>
    <v-img
      height="250"
      :src="candidate.image + `?token=${token}`"
    ></v-img>

    <v-card-title>{{ candidate.first_name }} {{ candidate.last_name }}</v-card-title>

    <div class="px-4">
        <ul class="pl-0">
            <!-- Location -->
            <li class="flex-between-start">
                <span class="flex-30 label-text">Location</span>
                <span class="flex-70">:
                    <span class="ml-1">{{ candidate.contact.per_permanent_country_name }}
                    </span>
                </span>
            </li>
            <!-- Age -->
            <li class="flex-between-start">
                <span class="flex-30 label-text">Age</span>
                <span class="flex-70">:
                    <span class="ml-1">{{ candidate.per_age }} </span>
                </span>
            </li>
            
            <!-- Religion -->
            <li class="flex-between-start">
                <span class="flex-30 label-text">Religion</span>
                <span class="flex-70">:
                    <span class="ml-1">{{ candidate.per_religion }}</span>
                </span>
            </li>
            <template v-if="onceMore">
                <li class="flex-between-start">
                    <span class="flex-30 label-text">Ethnicity</span>
                    <span class="flex-70">:
                        <span class="ml-1">{{ candidate.per_ethnicity }} </span>
                    </span>
                </li>
                <li class="flex-between-start">
                    <span class="flex-30 label-text">Education</span>
                    <span class="flex-70 truncate">:<span class="ml-2"> </span>{{ candidate.personal.per_education_level }} </span>
                </li>
            </template>
        </ul>
    </div>
    <v-divider class="mx-4"></v-divider>

    <div class="flex flex-wrap justify-space-between px-4">
      <ButtonComponent
        wrapperWidth="49%"
        iconHeight="14px"
        :isSmall="true"
        :responsive="false"
        :title="candidate.is_short_listed ? 'Unlist' : 'ShortList'"
        icon="/assets/icon/star-fill-secondary.svg"
        :customEvent="candidate.is_short_listed ? 'removeShortList' : 'addShortList'"
        @onClickButton="onClickButton"
      />
      <ButtonComponent
        class="connect-button"
        wrapperWidth="49%"
        iconHeight="14px"
        :isSmall="true"
        :responsive="false"
        :title="connectionTitle"
        icon="/assets/icon/connect-s.svg"
        :customEvent="candidate.is_connect ? 'removeConnection' : 'addConnection'"
        :backgroundColor="candidate.is_connect ? '' : '#3ab549'"
        @onClickButton="onClickButton"
      />
    </div>
    <div class="mt-3 px-4 flex flex-wrap justify-space-between">
      <ButtonComponent
        wrapperWidth="49%"
        iconHeight="14px"
        :isSmall="true"
        :responsive="false"
        :title="candidate.is_teamListed ? 'Unlist Team' : 'TeamList'"
        icon="/assets/icon/teamlist.svg"
        :customEvent="candidate.is_teamListed ? 'removeTeam' : 'addTeam'"
        @onClickButton="onClickButton"
      />
      <ButtonComponent
        class="block-button"
        :class="candidate.is_block_listed ? 'unblock-button' : ''"
        wrapperWidth="49%"
        iconHeight="14px"
        :isSmall="true"
        :responsive="false"
        :title="candidate.is_block_listed ? 'Unblock' : 'Block'"
        :icon="candidate.is_block_listed ? '/assets/icon/block-secondary.svg' : '/assets/icon/block.svg'"
        :customEvent="candidate.is_block_listed ? 'removeBlock' : 'block'"
        :backgroundColor="candidate.is_block_listed ? '' : '#d81b60'"
        :titleColor="candidate.is_block_listed ? '' : 'white'"
        @onClickButton="onClickButton"
      />
    </div>
    <div class="px-4 pb-4 mt-4">
      <ButtonComponent
        :responsive="false"
        title="View Profile"
        customEvent="viewProfileDetail"
        @onClickButton="onClickButton"
      />
      <!-- <v-btn
        class="mt-1 text-capitalize"
        block
        rounded
        color="deep-purple darken-1"
        dark
        @click.stop="ViewProfileDetail"
      >
        view profile
      </v-btn> -->
    </div>
  </v-card>
</template>

<script>
import {mapMutations, mapActions, mapGetters} from 'vuex'
import JwtService from "@/services/jwt.service";
import Notification from "@/common/notification.js";
import ApiService from '@/services/api.service';
import ButtonComponent from '@/components/atom/ButtonComponent.vue'
  export default {
    name: 'CandidateListCard',
    sockets: {
      connect: function () {
        //
      },
      ping: function (data) {
        //
      }
    },
    props: ["candidate", "role"],
    components: {
      ButtonComponent
    },
    data: () => ({
      loading: false,
      selection: 1,
      onceMore: true,
      token: "",
    }),
    created() {
      this.token = JSON.parse(localStorage.getItem('token'));
      // this.candidate.image = process.env.VUE_APP_IMAGE + '/' + this.candidate.image + '?token=' + this.token;
    },
    computed: {
      ...mapGetters({
        detail: 'search/getProfileDetails'
      }),
      connectionTitle() {
        /*
        teamConnectType = 1 mean we sent request
        teamConnectType = 2 mean They sent request
        teamConnectStatus 
          0 = pending
          1= accepted
          2= rejected
        */
        if(this.candidate.teamConnectType == 1) return 'Cancel'
        if(this.candidate.teamConnectStatus == 0) return 'Cancel'
        if(this.candidate.teamConnectStatus == 1) return 'Disconnect'
        if(this.candidate.teamConnectStatus == 2) return 'Connect'
        if(this.candidate.teamConnectType == 2) return 'Accept'
        return 'Connect'
      }
    },
    methods: {
      ...mapMutations({
        setComponent: 'search/setComponent',
        setSelectedProfileInfo: 'search/setSelectedProfileInfo',
      }),
      ...mapActions({
        getDetails: 'search/searchUser',
        connectToCandidate: 'search/connectCandidate',
        blockACandidate: 'search/blockCandidate',
        shortListCandidate: 'search/shortListCandidate',
        teamListedCandidate: 'search/teamListedCandidate',
        fetchProfileDetail: 'search/fetchProfileDetail',
        teamListCandidate: 'search/teamListCandidate',

      }),
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
      onClickButton(eventData) {
        if(eventData.event == 'viewProfileDetail') {
          this.ViewProfileDetail()
          return
        }
        let userInfo = JSON.parse(localStorage.getItem("user"))
        if(userInfo.status != '3') {
          this.showError('Your account is not verified')
          return
        }
        if(this.candidate.verification_status != 3) {
          this.showError('This candidate is not verified')
          return
        }
        
        if(eventData.event == 'addConnection') {
          this.connectCandidate();
        }
        if(eventData.event == 'block') {
          this.handleBlockCandidate('post', true, 'v1/store-block-list');
        }
        if(eventData.event == 'removeBlock') {
          this.handleBlockCandidate('delete', false, 'v1/unblock-by-candidate');
        }
        if(eventData.event == 'addShortList') {
          this.addShortList();
        }
        if(eventData.event == 'removeShortList') {
          this.removeFroShortList();
        }
        if(eventData.event == 'removeConnection') {
          if(this.candidate.teamConnectType == 1) {
            this.disConnectCandidate();
            return;
          }
          if(this.candidate.teamConnectType == 0) {
            this.showError('Your connection request is pending');
          }
          if(this.candidate.teamConnectType == 2) {
            this.showError('Your request is rejected');
          }
        }
        if(eventData.event == 'addTeam') {
          this.addTeamList();
        }
        if(eventData.event == 'removeTeam') {
          this.removeFromTeamList();
        }
      },
      selfTeamMembers() {
        const teamId = JwtService.getTeamIDAppWide();
        let activeTeam = this.$store.state.team.team_list.find(team => team.team_id == teamId);
        if(activeTeam) {
          let loggedUser = JSON.parse(localStorage.getItem('user'));
          let teamMembers = [];
          activeTeam.team_members.filter(item => item.user_id !== loggedUser.id).forEach(item => {
            teamMembers.push(item.user_id)
          });
          return teamMembers;
        }
        return [];
      },
      shortList() {
        console.log('short list')
      },
      async connectCandidate() {
        if(this.role != 'Admin' && this.role != 'Owner & Admin') {
          this.showError("You don't have permission.")
          return
        }
        let myTeamId = JwtService.getTeamIDAppWide();
        if(!myTeamId) {
          this.showError("You don't have a team")
          return;
        }
        if(!this.candidate.team_id) {
          this.showError("This candidate has no team")
           return;
        }
        let data = {
          userId: this.candidate.user_id,
          url: 'v1/send-connection-request',
          payload: {
            from_team_id: myTeamId,
            to_team_id: this.candidate.team_id
          }
        }
        try {
          let res = await this.connectToCandidate(data)
          this.$success({
            title: "Connection Request Sent Successfully!",
            content: res.message,
            centered: true,
          });
          let payload = {
            receivers: [...this.candidate.team?.members_id, ...this.selfTeamMembers()],
            title: `sent ${this.candidate.first_name + ' ' + this.candidate.last_name} a new team connection request`,
            team_temp_name: null,
            team_id: this.candidate.team_id
          };
          this.$emit("socketNotification", payload);
          this.$emit('removeCandidateFromResult', this.candidate.user_id);
        } catch (e) {
          if(e.response) {
            this.showError(e.response.data.message)
          }
        }
      },
      async addShortList() {
        let loggedUser = JSON.parse(localStorage.getItem('user'));
        let data = {
          url: `v1/short-listed-candidates/store?shortlisted_by=${loggedUser.id}&user_id=${this.candidate.user_id}`,
          value: true,
          actionType: 'post',
          user_id: this.candidate.user_id,
          params: {
            shortlisted_by: loggedUser.id,
            user_id: this.candidate.user_id
          },
          payload: {
            shortlisted_by: loggedUser.id,
            user_id: this.candidate.user_id
          }
        }
        try {
          await this.shortListCandidate(data)
          await this.loadShortListedCandidates();
        } catch (e) {
          if(e.response) {
            this.showError(e.response.data.message)
          }
        }
      },
      async addTeamList() {
        if(this.role != 'Admin' && this.role != 'Owner & Admin') {
          this.showError("You don't have permission.")
          return
        }
        if(!this.candidate.team_id) {
          this.showError("This candidate has no team")
          return;
        }
        let loggedUser = JSON.parse(localStorage.getItem('user'));
        let data = {
          url: `v1/team-short-listed-candidates/store`,
          value: true,
          actionType: 'post',
          user_id: this.candidate.user_id,
          payload: {
            team_listed_by: loggedUser.id,
            user_id: this.candidate.user_id
          }
        }
        try {
          await this.teamListedCandidate(data)
          let payload = {
            receivers: [...this.selfTeamMembers()],
            title: `teamlisted ${this.candidate.first_name + ' ' + this.candidate.last_name}.`,
            team_temp_name: null,
            team_id: this.candidate.team_id
          };
          this.$emit("socketNotification", payload);
        } catch (e) {
          if(e.response) {
            this.showError(e.response.data.message)
          }
        }
      },
      async removeFroShortList() {
        let data = {
          url: 'v1/delete-short-listed-by-candidates ',
          value: false,
          actionType: 'delete',
          user_id: this.candidate.user_id,
          payload: {
            user_id: this.candidate.user_id
          }
        }
        try {
          await this.shortListCandidate(data)
          await this.loadShortListedCandidates();
        } catch (e) {
          if(e.response) {
            this.showError(e.response.data.message)
          }
        }
        
      },
      async removeFromTeamList() {
        let data = {
          url: 'v1/delete-team-short-listed-by-candidates ',
          value: false,
          actionType: 'delete',
          user_id: this.candidate.user_id,
          payload: {
            user_id: this.candidate.user_id
          }
        }
        try {
          await this.teamListCandidate(data)
          let payload = {
            receivers: [...this.selfTeamMembers()],
            title: `removed ${this.candidate.first_name + ' ' + this.candidate.last_name} from teamlist.`,
            team_temp_name: null,
            team_id: this.candidate.team_id
          };
          this.$emit("socketNotification", payload);
        } catch (e) {
          if(e.response) {
            this.showError(e.response.data.message)
          }
        }
        
      },
      async fetchCandidate() {
        let url = `v1/candidate/info/${this.candidate.user_id}`
        try {
          await this.fetchProfileDetail(url)
        } catch (e) {
          if(e.response) {
            this.showError(e.response.data.message)
          }
        }
      },
      disConnectCandidate() {
        this.showError('Disconnection is ongoing')
      },
      async handleBlockCandidate(actionType, value, url) {
        if(this.role != 'Admin' && this.role != 'Owner & Admin') {
          this.showError("You don't have permission.")
          return
        }
        if(!this.candidate.team_id) {
          this.showError("This candidate has no team")
           return;
        }
        const vm = this;
        this.$confirm({
          title: "Are you sure?",
          content: actionType == 'post' ? "Do you want to block this candidate?" : "Do you want to unblock this candidate?",
          okText: "Yes",
          okType: "danger",
          cancelText: "No",
          async onOk() {
            let data = {
              url: url,
              actionType: actionType,
              value: value,
              payload: {
                //block_by: JwtService.getUserId(),
                user_id: vm.candidate.user_id
              }
            }
            try {
              await vm.blockACandidate(data)

              let payload = {
                receivers: vm.selfTeamMembers(),
                title: `blocked ${vm.candidate.first_name + ' ' + vm.candidate.last_name}.`,
                team_temp_name: null,
                team_id: vm.candidate.team_id
              };
              vm.$emit("socketNotification", payload);
              vm.$emit('removeCandidateFromResult', vm.candidate.user_id);
            } catch (e) {
              if(e.response) {
                vm.showError(e.response.data.message)
              }
            }
          
          },
          onCancel() {
            console.log("Cancel");
          },
        })        
      },
      showError(message) {
        this.$error({
          title: message,
          center: true,
        });
      },
      showDetailRightSide() {
        this.setSelectedProfileInfo(this.candidate)
        this.setComponent('RightSideCandidateDetail')
        console.log('show right side detail')
      },
      ViewProfileDetail() {
        this.fetchCandidate()
        this.$emit('switchComponent')
        setTimeout(() => {
          this.setComponent('RightSideCandidateDetail')
        }, 10)
        document.getElementById('topper').click()
      },
      async loadShortListedCandidates() {
        let {data} = await ApiService.get('/v1/short-listed-candidates').then(res => res.data);
        this.$store.state.shortList.shortlistedItems = data;
      },
      reserve () {
        this.loading = true
        setTimeout(() => (this.loading = false), 2000)
      },
    },
  }
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.truncate {
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100px;
    overflow: hidden;
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

.unblock-button {
  .v-custom:hover {
    background: #fff !important;
    color: $bg-primary !important;
    border : 1px solid $bg-primary !important;
    
    img {
      filter: none !important;
    }
  }
}
.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: none !important;
  border: 2px solid #dddddd78;
}
</style>