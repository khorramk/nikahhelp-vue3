<template>
  <div>
    <Loader v-if="isLoading" :isLoading="isLoading" />
    <div v-else>
      <TeamOffRedirection v-if="redirection" />
      <div class="main-content-wrapper">
        <div class="block-main-content">
          <div class="row mb-4" v-if="candidateBlock.length > 0">
            <div class="col-12 col-md-6 col-lg-3 mt-4" v-for="(block, cindex) in candidateBlock" :key="cindex">
              <blocked-candidate-grid :item="block"
                                      :candidateBlockIds="candidateBlockIds"
                                      :teamBlockedIds="teamBlockedIds"
                                      @loadList="loadList" />
            </div>
          </div>
          <div v-else class="flex justify-content-center align-items-center mt-10">
            <h4 class="fs-24 text--disabled">No user in block list</h4>
          </div>

<!--          <v-tabs color="indigo accent-4" class="w-full d-flex justify-content-between support-tab">-->
<!--            <v-tab href="#tab-1" @click="tab = 'tab-1'" class="font-weight-bold">All</v-tab>-->
<!--            <v-tab href="#tab-2" @click="tab = 'tab-2'" class="font-weight-bold">My block list</v-tab>-->
<!--            <v-tab href="#tab-3" @click="tab = 'tab-3'" class="font-weight-bold">Blocked by team members</v-tab>-->
<!--          </v-tabs>-->

<!--          <v-tabs-items v-model="tab">-->
<!--            <v-tab-item value="tab-1">-->
<!--              <div class="row mb-4">-->
<!--                <div class="col-12 col-md-6 col-lg-3 mt-4" v-for="(block, findex) in fullData" :key="findex">-->
<!--                  <blocked-candidate-grid :item="block"-->
<!--                                          :candidateBlockIds="candidateBlockIds"-->
<!--                                          :teamBlockedIds="teamBlockedIds"-->
<!--                                          @loadList="loadList" />-->
<!--                </div>-->
<!--              </div>-->
<!--            </v-tab-item>-->
<!--            <v-tab-item value="tab-2">-->
<!--              <div class="row mb-4">-->
<!--                <div class="col-12 col-md-6 col-lg-3 mt-4" v-for="(block, cindex) in candidateBlock" :key="cindex">-->
<!--                  <blocked-candidate-grid :item="block"-->
<!--                                          :candidateBlockIds="candidateBlockIds"-->
<!--                                          :teamBlockedIds="teamBlockedIds"-->
<!--                                          @loadList="loadList" />-->
<!--                </div>-->
<!--              </div>-->
<!--            </v-tab-item>-->
<!--            <v-tab-item value="tab-3">-->
<!--              <div class="row mb-4">-->
<!--                <div class="col-12 col-md-6 col-lg-3 mt-4" v-for="(block, tindex) in teamListedBlock" :key="tindex">-->
<!--                  <blocked-candidate-grid :item="block"-->
<!--                                          :candidateBlockIds="candidateBlockIds"-->
<!--                                          :teamBlockedIds="teamBlockedIds"-->
<!--                                          @loadList="loadList" />-->
<!--                </div>-->
<!--              </div>-->
<!--            </v-tab-item>-->
<!--          </v-tabs-items>-->

          <BlockedCandidate
            :blockedCandidates="blockedCandidates"
            @unblock-candidate="unblockCandidate"
            class="d-none"
          />
          <BlockedTeam
            :blockedTeams="blockedTeams"
            @unblock-candidate="unblockCandidate"
            class="d-none"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/dashboard/layout/Header.vue";
import Sidebar from "@/components/dashboard/layout/Sidebar.vue";
import Footer from "@/components/auth/Footer.vue";
import BlockedCandidate from "@/components/blocklist/BlockedCandidate.vue";
import BlockedTeam from "@/components/blocklist/BlockedTeam.vue";
import JwtService from "@/services/jwt.service";
import { openModalRoute } from "@/plugins/modal/modal.mixin";
import BlockedCandidateGrid from "../../components/blocklist/BlockedCandidateGrid.vue";
import ApiService from '@/services/api.service';
import TeamOffRedirection from "../../components/redirection/TeamOffRedirection.vue";

export default {
  name: "BlockList",
  components: {
    TeamOffRedirection,
    BlockedCandidateGrid,
    Header,
    Sidebar,
    Footer,
    BlockedCandidate,
    BlockedTeam,
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
      isLoading: true,
      redirection: false,
      user: {},
      is_verified: 1,
      tab: 'tab-1',
      candidateBlock: [],
      teamListedBlock: [],
      fullData: [],
      candidateBlockIds: [],
      teamBlockedIds: []
    };
  },
  created() {
    this.getActiveTeamId();
  },
  computed: {
    blockedCandidates() {
      const candidates = this.$store.getters["blockedCandidates"];
      return candidates.filter((candidate) => {
        if (candidate.type === "single") {
          return true;
        }
        return false;
      });
    },
    blockedTeams() {
      const candiates = this.$store.getters["blockedCandidates"];
      return candiates.filter((candidate) => {
        if (candidate.type == "team") {
          return true;
        }
        return false;
      });
    },
    isWebSocketReady() {
      return this.$store.state.webSocket.webSocket.readyState === 1;
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

        if(this.isWebSocketReady) {
          this.$webSocket.send(JSON.stringify({
            action: 'notification',
            data: payload
          }));
        }
      }
    },
    loadList() {
      this.getActiveTeamId();
    },
    getActiveTeamId() {
      if (!JwtService.getTeamIDAppWide()) {
        // this.isLoading = true;
        // setTimeout(() => {
        //   this.isLoading = false;
        //   openModalRoute(this, "manage_team_redirect");
        // }, 2000);
        this.isLoading = false;
        this.redirection = true;
      } else {
        this.candidateBlock = [];
        this.teamListedBlock = [];
        this.fullData = [];
        this.loadBlockedCandidates();
        this.loadBlockByTeamList()
      }
    },
    async loadBlockedCandidates() {
      this.isLoading = true;
      try {
        await ApiService.get(`/v1/block-list`).then(res => {
          this.isLoading = false;
          this.candidateBlock = res.data.data.map(item => {
            item.candidate_list = true;
            return item;
          });
          let data = [...this.fullData, ...this.candidateBlock];
          this.fullData = data;

          this.candidateBlockIds = res.data.data.map(item => {
            return parseInt(item.user_id);
          });
        }).catch(e => {
          this.isLoading = false;
        });
      } catch (error) {
        this.error = error.message || "Something went wrong";
        console.log(this.error);
      }
      this.isLoading = false;
    },
    async loadBlockByTeamList() {
      this.isLoading = true;
      try {
        await ApiService.get(`/v1/block-by-team-list`).then(res => {
          this.isLoading = false;
          this.teamListedBlock = res.data.data.map(item => {
            item.team_list = true;
            return item;
          });
          let data = [...this.fullData, ...this.teamListedBlock];
          this.fullData = data;

          this.teamBlockedIds = res.data.data.map(item => {
            return parseInt(item.user_id);
          });
        }).catch(e => {
          this.isLoading = false;
        });
      } catch (error) {
        this.error = error.message || "Something went wrong";
        console.log(this.error);
      }
      this.isLoading = false;
    },
    async unblockCandidate(id) {
      const vm = this;
      this.$confirm({
        title: "Are you sure?",
        content: "Do you want to unblock this candidate?",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        async onOk() {
          await vm.$store.dispatch("unblockCandidate", id);
          vm.$router.go();
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.main-content-wrapper {
  width: 100%;
  margin: 0px !important;
  .block-main-content {
    padding: 12px 15px !important;
    width: 100%;
    height: 100%;
    .row {
      margin: 0px !important;
    }


    .col-12, .col-md-4, .col-xl-3 {
      margin: 0px !important;
      padding: 5px 5px 5px 5px !important;
    }
  }
}
</style>
