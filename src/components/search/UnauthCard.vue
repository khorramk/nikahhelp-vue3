<template>
  <v-card
      @click="showDetailRightSide"
      :loading="loading"
      class="mx-auto unauth-card"
      max-width="374"
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
        :src="candidate.image"
    ></v-img>

    <v-card-title>{{ candidate.screen_name }}</v-card-title>

    <div class="px-4">
      <ul class="desc-list">
        <!-- Location -->
        <li class="flex-between-start">
          <span class="flex-30 label-text">Location</span>
          <span class="flex-70">:
                    <span class="ml-1">{{ candidate.per_permanent_country_name }}
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
        <template v-if="moreText">
          <li class="flex-between-start">
            <span class="flex-30 label-text">Ethnicity</span>
            <span class="flex-70">:
                        <span class="ml-1">{{ candidate.per_ethnicity }} </span>
                    </span>
          </li>
          <!-- <li class="flex-between-start">
            <span class="flex-30 label-text">Hobby</span>
            <span class="flex-70">
                <a-tooltip :title="candidate ? candidate.per_hobbies_interests : 'N/A'">
                  <span class="hobby-custom"><span class="mr-1">:</span> {{ candidate ? candidate.per_hobbies_interests : "N/A" }}</span>
                </a-tooltip>
            </span>
          </li> -->
          <li class="flex-between-start">
            <span class="flex-30 label-text">Occupation</span>
            <span class="flex-70">
                <a-tooltip :title="candidate ? candidate.per_occupation : 'N/A'">
                  <span class="hobby-custom"><span class="mr-1">:</span> {{ candidate ? candidate.per_occupation : "N/A" }}</span>
                </a-tooltip>
            </span>
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
          @onClickButton="modalVisible"
      />
      <ButtonComponent
          wrapperWidth="49%"
          iconHeight="14px"
          backgroundColor="#3ab549"
          class="connect-button"
          :isSmall="true"
          :responsive="false"
          :title="candidate.is_short_listed ? 'Disconnect' : 'Connect'"
          icon="/assets/icon/connection-secondary.svg"
          :customEvent="candidate.is_connected ? 'removeConnection' : 'addConnection'"
          @onClickButton="modalVisible"
      />
    </div>
    <div class="mt-3 px-4 flex flex-wrap justify-space-between">
      <ButtonComponent
          wrapperWidth="49%"
          iconHeight="14px"
          :isSmall="true"
          :responsive="false"
          :title="candidate.is_short_listed ? 'Unlist Team' : 'TeamList'"
          icon="/assets/icon/team.svg"
          :customEvent="candidate.is_connected ? 'removeTeam' : 'addTeam'"
          @onClickButton="modalVisible"
      />
      <ButtonComponent
          wrapperWidth="49%"
          iconHeight="14px"
          class="block-button"
          :isSmall="true"
          :responsive="false"
          :title="candidate.is_block_listed ? 'Unblock' : 'Block'"
          :icon="candidate.is_block_listed ? '/assets/icon/block-secondary.svg' : '/assets/icon/block.svg'"
          :customEvent="candidate.is_block_listed ? 'removeBlock' : 'block'"
          :backgroundColor="candidate.is_block_listed ? '' : '#d81b60'"
          :titleColor="candidate.is_block_listed ? '' : 'white'"
          @onClickButton="modalVisible"
      />
    </div>
    <div class="px-4 pb-4 mt-4">
      <ButtonComponent
          :responsive="false"
          title="View More Details"
          customEvent="viewProfileDetail"
          @onClickButton="viewMoreDetails"
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

    <Modal
        v-model="modalVisibility"
        @ok="handleOk"
        @onCancel="onCancel"
        :width="400"
    >
      <div class="details-modal p-3">
        <h3 class="fs-18 text-header-black">We have found several matches for you</h3>
        <p class="fs-14">
          Register for free and start in no time by exploring MatrimonyAssist with a candidate and rep profile.
        </p>
        <p class="fs-14">
          We request all users on MatrimonyAssist to verify their email and
          mobile number to help build and maintain trust.
        </p>
        <div>
          <div class="text-center">
            <a href="/login" class="btn btn-sm btn-brand ml-2 btn-unauth">
              Sign in
            </a>
          </div>

          <div class="text-center">
            <span class="text-center">or</span>
          </div>
          <div class="text-center">
            <a href="/signup" class="btn btn-sm ml-2 btn-unauth">
              Join now
            </a>
          </div>
        </div>
      </div>
    </Modal>
  </v-card>
</template>

<script>
import {mapMutations, mapActions} from 'vuex'
import JwtService from "@/services/jwt.service";
import ButtonComponent from '@/components/atom/ButtonComponent.vue';
import Modal from '@/components/ui/Modal.vue';
export default {
  name: 'UnauthCard',
  props: ["candidate"],
  components: {
    ButtonComponent,
    Modal
  },
  data: () => ({
    loading: false,
    selection: 1,
    onceMore: true,
    moreText: false,
    modalVisibility: false,
  }),
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
      fetchProfileDetail: 'search/fetchProfileDetail',

    }),
    onClickButton(eventData) {
      if(eventData.event == 'viewProfileDetail') {
        this.ViewProfileDetail()
      }
      
      let userInfo = JSON.parse(localStorage.getItem("userInfo"))
      if(userInfo.status != 3) {
        this.showError('Your account is not verified')
        return
      }
      if(eventData.event == 'addConnection') {
        this.connectCandidate();
      }
      if(eventData.event == 'block') {
        this.blockCandidate();
      }
      if(eventData.event == 'addShortList') {
        this.addShortList();
      }
      if(eventData.event == 'removeShortList') {
        this.removeFroShortList();
      }

    },
    shortList() {
      console.log('short list')
    },
    async connectCandidate() {
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
        userId: this.candidate.team_id,
        url: 'v1/send-connection-request',
        payload: {
          from_team_id: myTeamId,
          to_team_id: this.candidate.team_id
        }
      }
      try {
        let res = await this.connectToCandidate(data)
        console.log(res, '>>>>>>>>>>.')
      } catch (e) {
        if(e.response) {
          this.showError(e.response.data.message)
        }
      }

    },
    async addShortList() {
      let data = {
        url: 'v1/short-listed-candidates/store',
        value: true,
        actionType: 'post',
        user_id: this.candidate.user_id,
        payload: {
          shortlisted_by: JwtService.getUserId(),
          user_id: this.candidate.user_id
        }
      }
      try {
        await this.shortListCandidate(data)
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
    async blockCandidate() {
      let data = {
        url: 'v1/store-block-list',
        payload: {
          block_by: JwtService.getUserId(),
          user_id: this.candidate.user_id
        }
      }
      try {
        await this.blockACandidate(data)
      } catch (e) {
        if(e.response) {
          this.showError(e.response.data.message)
        }
      }

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
      document.getElementById('topper').click()
      setTimeout(() => {
        this.setComponent('RightSideCandidateDetail')
      }, 10)
    },
    reserve () {
      this.loading = true
      setTimeout(() => (this.loading = false), 2000)
    },
    viewMoreDetails() {
      if(this.moreText) {
        this.modalVisibility = true;
      } else {
        this.moreText = true;
        this.modalVisibility = false;
      }
    },
    modalVisible() {
      this.modalVisibility = true;
    },
    handleOk() {
      //
    },
    onCancel() {
      this.modalVisibility = false;
    }
  },
}
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";

.unauth-card.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: none !important;
  border: 2px solid #dddddd78;
}
.btn-unauth {
  border: 1px solid #3A3092;
  color: #3A3092;
  border-radius: 20px;
  &:hover {
    border: 1px solid #FFFFFF;
    color: #FFFFFF;
    background: #3A3092;
  }
}
.hobby-custom {
  width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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