<template>
  <div>
    <Loader v-if="isLoading" :isLoading="isLoading" />
    <div v-else>
      <TeamOffRedirection v-if="redirection" />
      <MainHeader :collapsed="collapsed" @toggleCollapse="toggleCollapse" />
      <a-layout
        id="layout"
        style="background-color: #fff"
        :style="{ height: 'calc(100vh - 80px) !important' }"
      >
        <a-layout-sider
          :style="{
            height: 'calc(100vh - 80px)',
          }"
          class="bg-white shadow-border sidebar-trigger"
          v-model:collapsed="collapsed"
          :trigger="null"
          collapsible
          :collapsedWidth="28"
          width="250"
          breakpoint="sm"
          @breakpoint="responsiveToggle"
        >
          <Sidebar
            :collapsed="collapsed"
            @collapseSideBar="collapsed = !collapsed"
            :searchBtnClicked="searchBtnClicked"
          >
            <template v-slot:search>
              <SimpleSearch
                ref="simpleSearch"
                @switchComponent="switchComponent"
                :user="loggedUser"
                @searchBtnClicked="closeSearchSidebar"
                
              >
              <template v-slot:button="{ clickBtn }">
                <ButtonComponent
									iconHeight="20px"
									:block="true"
									:responsive="false"
									title="Search"
									:icon="SearchLovePrimary"
									customEvent="handleSearch"
									@onClickButton="clickBtn"
                  ref="btnsearch"
								/>
              </template>
               <template v-slot="{search}">
                <button
										@click="search"
										class="btn-adv-search"
                    ref="suggestion"
                    v-begin-search
									>
										Reset Search
									</button>
               </template>
                
              
            </SimpleSearch>
            </template>
          </Sidebar>
        </a-layout-sider>
        <a-layout id="bbx">
          <a-layout-content>
            <div id="top" class="main-content-wrapper">
              <div class="main-content-1">
                <component
                  :role="teamRole"
                  @switchComponent="switchComponent"
                  @navigateProfile="navigateProfile"
                  @socketNotification="socketNotification"
                  @searchBtnClicked="toggleSearchBtnClick"
                  v-bind:is="currentTabComponent"
                >
                </component>
                <!-- <Observer @intersect="onIntersect"/> -->
              </div>
              <div class="main-content-2">
                <component v-bind:is="rightSideComponentName"></component>
              </div>
            </div>
          </a-layout-content>
        </a-layout>
      </a-layout>
    </div>
    <Loader :isLoading="isFetching" />
<!--    <ModalContainer-->
<!--      :modalKey="'manageTeamRedirect'"-->
<!--      :width="'wide'"-->
<!--      :fullscreen="false"-->
<!--      :hideOverlay="false"-->
<!--    >-->
<!--      <ManageTeamRedirect />-->
<!--    </ModalContainer>-->
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import ButtonComponent from '@/components/atom/ButtonComponent.vue';
import Sidebar from "@/components/dashboard/layout/Sidebar.vue";
import Observer from "@/components/atom/Observer.vue"
import Loader from "@/plugins/loader/loader.vue";
import CandidateProfiles from "@/components/search/CandidateProfiles.vue";
// import ModalContainer from "@/plugins/modal/modal-container";
import ManageTeamRedirect from "@/views/design/ManageTeamRedirect.vue";
import AddComponent from "@/components/add/addComponent.vue";
import JwtService from "@/services/jwt.service";
import { createModalMixin, openModalRoute } from "@/plugins/modal/modal.mixin";
import { mapGetters, mapMutations, mapActions } from "vuex";
import TeamOffRedirection from "../../components/redirection/TeamOffRedirection.vue";
import ApiService from '../../services/api.service';
import Notification from "@/common/notification.js";

import SearchLovePrimary from "@/assets/icon/search-love-primary.svg";

export default {
  name: "AdvanceSearch",
  mixins: [createModalMixin("manageTeamRedirect")],
  components: {
    TeamOffRedirection,
    // ProfileDetail: () => import("@/components/search/CandidateProfileDetails.vue"),
    ProfileDetail: defineAsyncComponent(() => import("@/components/search/CandidateProfileDetails.vue")),

    // RightSideCandidateDetail: () => import("@/components/search/RightSideCandidateDetail.vue"),
    RightSideCandidateDetail: defineAsyncComponent(() => import("@/components/search/RightSideCandidateDetail.vue")),

    // RightSidebar: () => import("@/components/search/ProfileDetailRight.vue"),
    RightSidegar: defineAsyncComponent(() => import("@/components/search/ProfileDetailRight.vue")),

    // SimpleSearch: () => import("@/components/search/SimpleSearch.vue"),
    SimpleSearch: defineAsyncComponent(() => import("@/components/search/SimpleSearch.vue")),

    Sidebar,
    // ModalContainer,
    // ManageTeamRedirect,
    Loader,
    //SimpleSearch,
    // Footer,
    CandidateProfiles,
    AddComponent,
    Observer,
    ButtonComponent
  },
 
  data() {
    return {
      activeTeamId: null,
      query: 'v1/home-searches?page=0&parpage=10',
      isLoading: false,
      user: {},
      is_verified: 1,
      error: null,
      collapsed: false,
      componentName: "CandidateProfiles",
      redirection: false,
      isSearchBtnClicked: false,
      SearchLovePrimary,
    };
  },

  directives: {
     beginSearch: {
      inserted(el, binding, vnode) {
          el.click();
          console.log(vnode.context);
      }
     }
  },

  computed: {
    ...mapGetters({
      getSuggested: 'getSugesstedFlag',
      rightSideComponentName: "search/getComponentName",
      isFetching: "search/getLoadingStatus",
    }),
    currentTabComponent() {
      return this.componentName;
    },
    loggedUser() {
      let loggedUser = JSON.parse(localStorage.getItem("user"));
      if (loggedUser) {
        return loggedUser;
      }
      return null;
    },
    activeTeamInfo() {
      return this.teamsOriginal.find((item) => item.team_id == this.activeTeamId);
    },
    teamRole() {
      let team = this.activeTeamInfo;
      let loggedUser = this.loggedUser;
      if (team && loggedUser && team.team_members) {
        let member = team.team_members.find(
          (item) => item.user_id == loggedUser.id
        );
        if (member) {
          return member.role.replace("+", " & ");
        }
      }
      return "N/A";
    },
    teamsOriginal() {
      return this.$store.state.team?.team_list
    },
    searchBtnClicked() {
      return this.isSearchBtnClicked;
    }
  },
  methods: {
    ...mapActions({
      sugeestionOn: 'search/sugeestionOn',
      searchUser: "search/searchUser",
      getNextUserId: "search/getNextUserId",
      getPreviousUserId: "search/getPreviousUserId",
      fetchProfileDetail: 'search/fetchProfileDetail',
      getCandidateInfo: 'search/getCandidateInfo',
    }),
    ...mapMutations({
      clearProfiles: "search/clearProfiles",
      setProfiles: "search/setProfiles",
      setLoading: "search/setLoading",
    }),
    checkTurnedOnSwitch() {
      this.activeTeamId = JwtService.getTeamIDAppWide();
    },

    profilesuggestion() {
      //this.$refs.suggestion.
    },

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
    // onIntersect() {
    //   this.$refs.simpleSearch.handlePaginate();
    // },
    showError(message) {
      this.$error({
        title: message,
        center: true,
      });
    },
    async fetchInitialCandidate() {
      // const res = await this.searchUser('v1/home-searches?page=0&parpage=10&min_age=20&max_age=40&ethnicity=Amara&marital_status=single');
      this.setLoading(true);
      try {
        const res = await this.searchUser(
          {
            // url: "v1/home-searches?page=0&parpage=10&min_age=20&max_age=40",
            url: this.query,
            removePrevious: true
          }       
        );
        if(res.data.data.length) {
          this.sendSiteVisitData(res.data.data);

          // send notification
          let receivers = [];

          res.data.data.forEach(item => {
            receivers.push(item.user_id);
          });
          
          console.log(receivers, "receivers")
          let payload = {
            receivers: receivers,
            title: `A person from ${this.loggedUser.per_permanent_country_name} has visited your profile`,
          };
          console.log('before sending notification', payload);
          this.socketNotification(payload);
          console.log('after sending notification');
        }
        this.setLoading(false);
        if (res == undefined) {
          this.setProfiles([]);
        }
        if (res.data && res.data.length) {
          this.clearProfiles();
          this.setProfiles(res.data);
        }
      } catch (err) {
        this.setLoading(false);
        console.log(err);
      }
    },
    async sendSiteVisitData(viewedCandidates) {
      console.log(viewedCandidates, 'frm sendsite visit data');
      let fromTeamId = parseInt(localStorage.getItem('teamid'));
      let teamsArray = [];
      viewedCandidates.forEach(i => teamsArray.push(i.team.team_id));
      console.log(fromTeamId);
      let payload = {
        "from_team_id": fromTeamId,
        "to_team_id": teamsArray,
        'country': this.loggedUser.per_permanent_country_name
      }
      console.log(payload, 'payload from search');
      await ApiService.post('v1/site-visit', payload);
    },
    responsiveToggle() {
      this.collapsed = false;
    },
    switchComponent(name) {
      this.componentName = name;
    },
    async fetchCandidate(userId) {
      let url = `v1/candidate/info/${userId}`
      try {
        await this.fetchProfileDetail(url)
      } catch (e) {
        if(e.response) {
          this.showError(e.response.data.message)
        }
      }
    },
    async navigateProfile(data) {
      if(data.type == 'previous') {
        let previousId = await this.getPreviousUserId(data.userId)
        if(previousId) this.fetchCandidate(previousId)
        if(!previousId) this.showError("It's the first candidate")
        console.log(previousId, 'previous userid')
      }

      if(data.type == 'next') {
        let nextUserId = await this.getNextUserId(data.userId)
        if(nextUserId) this.fetchCandidate(nextUserId)
        if(!nextUserId) this.showError("It's the last candidate")
        console.log(nextUserId, 'next userid')
      }
      
    },
    toggleCollapse() {
      this.collapsed = !this.collapsed;
    },
    setCandidatePref(data, personal) {
      // debugger;
      setTimeout(() =>{
        if(data.pre_partner_age_max) {
          this.query += `&max_age=${data.pre_partner_age_max}`
          // this.$refs.simpleSearch.setAttr('max_age', data.pre_partner_age_max);
        }
        if(data.pre_partner_age_min) {
          this.query += `&min_age=${data.pre_partner_age_min}`
          // this.$refs.simpleSearch.setAttr('min_age', data.pre_partner_age_min);
        }
        // if(data.pre_ethnicities) {
        //   this.$refs.simpleSearch.setAttr('ethnicity', data.pre_ethnicities);
        // }
        // if(data.pre_ethnicities) {
        //   this.$refs.simpleSearch.setAttr('ethnicity', data.pre_ethnicities);
        // }
        // if(data.pre_height_min) {
        //   this.query += `&min_height=${data.pre_height_min}`
        //   this.$refs.simpleSearch.setAttr('heightMin', data.pre_height_min);
        // }
        // if(data.pre_height_max) {
        //   this.query += `&max_height=${data.pre_height_max}`
        //   this.$refs.simpleSearch.setAttr('heightMax', data.pre_height_max);
        // }
        // if(data.pre_employment_status) {
        //   this.$refs.simpleSearch.setAttr('employmentStatus', data.pre_employment_status);
        // }
        // if(data.preferred_countries.length) {
        //   this.query += `&country=${data.preferred_countries[0].id}`
        //   this.$refs.simpleSearch.setAttr('country', data.preferred_countries[0].id);
        // }
        // // if(data.per_current_residence_country) {
        //   if(data.per_current_residence_country.length){
        //     this.query += `&residence_country=${data.per_current_residence_country[0].id}`
        //     this.$refs.simpleSearch.setAttr('residence_country', data.per_current_residence_country[0].id);
        //   }
        // }
        // if(data.preferred_nationality.length) {
        //   this.$refs.simpleSearch.setAttr('nationality', data.preferred_nationality[0].id);
        // }
        // if(data.pre_partner_religion_id.length) {
        //   this.$refs.simpleSearch.setAttr('religion', parseInt(data.pre_partner_religion_id[0]));
        // }

        const gender = {
					1: 2,
					2: 1
				};
				const oppositeGender = gender[personal.per_gender_id];
        this.query += `&gender=${oppositeGender}`
        //this.$refs.simpleSearch.setAttr('gender', oppositeGender); //have to set depending on candidate
         this.fetchInitialCandidate();
      },1000)
    },
    async handleCandidateInfo() {
      const info = await this.getCandidateInfo('v1/candidate-of-team')
        if(info.data) {
          if(info.data.preference) {
            this.setCandidatePref(info.data.preference, info.data.personal)
          } else {//if logged in user don't have a team
            // let genderObj = {1:2, 2:1};
            // const gender = JSON.parse(localStorage.getItem('user')).get_candidate.per_gender
      // debugger;
     
      const gender = {
					1: 2,
					2: 1
				};
				const oppositeGender = gender[info.data.personal.per_gender_id];
            this.query += `&gender=${oppositeGender}`
            this.$refs.simpleSearch.setAttr('gender', oppositeGender);
            this.fetchInitialCandidate()
          }
        }
    },
    toggleSearchBtnClick() {
      this.isSearchBtnClicked = !this.isSearchBtnClicked;
      this.collapsed = false;
      console.log('successfully clicked advacesearch')
    },
    closeSearchSidebar() {
      if(this.getWindowWidth() <= 575){
        this.isSearchBtnClicked = false;
        this.collapsed = true;
        console.log('successfully closed searchsidebar')
      }
    },
    getWindowWidth() {
      return window.innerWidth;
    },
  },
  created() {
    console.log(JwtService.getTeamIDAppWide(), '>>>>>>>>>>>>>>>>>>>>..')
    if (!JwtService.getTeamIDAppWide()) {
      // this.isLoading = true;
      // setTimeout(() => {
      //   this.isLoading = false;
      //   openModalRoute(this, "manage_team_redirect");
      // }, 2000);
      this.redirection = true;
      return
    }
    this.checkTurnedOnSwitch();
    this.handleCandidateInfo();

    

    // setTimeout(() => {
    //       console.log(this.$refs.suggestion);
    //     if (!this.getSuggested) {
    //         this.$refs.suggestion.click();
    //         console.log(this.$refs.btnsearch);
    //         this.$refs.btnsearch.$el.click();
    //         this.sugeestionOn(true);
    //     }
    // }, 5000)
  },
};
</script>

<style scoped lang="scss">
* {
  scroll-behavior: smooth;
}
@import "@/styles/base/_variables.scss";
.w-2 {
  width: 2rem;
}
.menu-icon-alt {
  width: 25px;
  color: #fff;
  margin-left: 10px;
}
.user-avatar-area {
  .avatar-image {
    border-radius: 50%;
    outline: 2px solid #ddd;
  }
  .team {
    display: inline-block;
    background-color: #fff;
    border-radius: 10px;
    font-size: 11px;
    position: relative;
    padding-right: 20px;
    cursor: pointer;
    &::after {
      content: "";
      position: absolute;
      top: 5px;
      right: 6px;
      background-color: #4aa02c;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      box-shadow: 0px 0px 3px 1px #639e4e;
    }
  }
  .role {
    display: inline-block;
    border: 1px solid rgb(99, 99, 99);
    border-radius: 10px;
    font-size: 11px;
    position: relative;
    text-align: center;
  }
}
.main-content-wrapper {
  margin-top: 0px;
  @media (max-width: 1024px) {
    flex-wrap: wrap;
  }
  .main-content-1 {
    width: calc(100% - 350px);
    margin: 12px 5px 12px 15px;
    @media (max-width: 1024px) {
      width: calc(100% - 25px);
    }
  }
  .main-content-2 {
    margin: 15px;
    width: 300px;
    @media (max-width: 600px) {
      width: calc(100% - 25px);
    }
    @media (max-width: 575px) {
      display: none !important;
    }
    .profile-overview {
      padding: 10px;
      height: 100%;
    }
  }
}
.shadow-border {
  box-shadow: none !important;
  border-right: 2px solid #dddddd78 !important;
}
.sidebar-trigger {
  .d-sidebar {
    .trigger {
      top: 2% !important;
      background: #fff !important;
      color: #6159a7 !important;
      box-sizing: border-box;
      cursor: pointer;
      box-shadow: none !important;
      border: 2px solid #dddddd78 !important;
      border-right: 0px !important;
      
      &:hover {
        color: #fff !important;
        background: #6159a7 !important;
        border: none !important;
      }
    }
  }
}
</style>