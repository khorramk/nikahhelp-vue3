<template>
  <div class="container-fluid pt-5 font-poppins dashboard">
    <div class="row">
      <div class="col-md-4 col-12 col-padding">
       <div class="team-info-div">
         <div class="user-info-div">
           <div class="flex align-items-center">
             <img :src="getAuthUser && getAuthUser.per_main_image_url  ? getAuthUser.per_main_image_url + `?token=${token}` : avatarSrc" alt="image" class="user-img" />
             <div class="intro mx-4 mt-4 border-bottom-white">
               <h4 class="color-primary fs-14">Welcome Back!</h4>
               <h6 class="color-primary fs-18 font-weight-bold">{{ getAuthUser ? getAuthUser.full_name : 'N/A' }}</h6>
               <p class="color-primary fs-14">Last login {{ lastLogin }}</p>
             </div>
           </div>
           <div class="status-div mt-3">
             <p class="fs-14 color-primary status">
               Profile Status:
               <!-- <span class="font-weight-bolder">Not Completed</span> -->
               <span class="font-weight-bolder" v-if="userInfo.user">{{ profileStatus }}</span>
                <span class="ant-spin-loader" v-else><a-spin /></span>
                <router-link 
                  to="/edit_candidate" 
                  class="btn px-2 bg-primary ml-3 color-white profile-btn cursor-pointer fs-12 btn-hover btn-border"
                  v-if="profileStatus !== 'Fully Completed' && profileStatus !== ''"
                > 
                  Update
                </router-link>
             </p>
             <p class="fs-14 color-primary status">
               Verification Status:
               <span class="font-weight-bolder">{{ userDataFromApi.status == 3 ? 'Verified' : 'Not Verified' }}</span>
               <router-link to="/settings" class="btn px-2 bg-primary ml-3 color-white profile-btn cursor-pointer fs-12 btn-hover btn-border upload-btn" v-if="userDataFromApi.status != 3">Upload ID</router-link>
             </p>
           </div>
         </div>
         <div class="active-team mt-3 mx-3 flex align-items-center justify-content-center">
           <h4 class="fs-14 text-center pt-1 text-black-50">Active Team: <span class="text-success">{{ activeTeam && activeTeam.name ? activeTeam.name : 'N/A' }}</span></h4>
         </div>
         <div class="team-short-info" v-if="activeTeam">
           <div class="profile-overview mt-2">
             <div class="profile-section row">
               <a-tooltip title="Title will go here" class="col-6 col-md-4">
                 <h4 class="color-primary fs-18 font-weight-bolder" v-if="teamActivity.suggestion !== ''">{{ teamActivity.suggestion }}</h4>
                 <h4 v-else><span class="ant-spin-loader"><a-spin /></span></h4>
                 <h4 class="fs-14 text-black-50">Suggestions</h4>
               </a-tooltip>
               <a-tooltip title="Title will go here" class="col-6 col-md-4">
                 <h4 class="color-primary fs-18 font-weight-bolder" v-if="teamActivity.teamlisted !== ''">{{ teamActivity.teamlisted }}</h4>
                 <h4 v-else><span class="ant-spin-loader"><a-spin /></span></h4>
                 <h4 class="fs-14 text-black-50">Teamlisted</h4>
               </a-tooltip>
               <a-tooltip title="Title will go here" class="col-6 col-md-4">
                 <h4 class="color-primary fs-18 font-weight-bolder" v-if="teamActivity.shortlisted !== ''">{{ teamActivity.shortlisted }}</h4>
                 <h4 v-else><span class="ant-spin-loader"><a-spin /></span></h4>
                 <h4 class="fs-14 text-black-50">Shortlisted</h4>
               </a-tooltip>
               <a-tooltip title="Title will go here" class="col-6 col-md-4">
                 <h4 class="color-primary fs-18 font-weight-bolder" v-if="teamActivity.connected !== ''">{{ teamActivity.connected }}</h4>
                 <h4 v-else><span class="ant-spin-loader"><a-spin /></span></h4>
                 <h4 class="fs-14 text-black-50">Connected</h4>
               </a-tooltip>
               <a-tooltip title="Title will go here" class="col-6 col-md-4">
                 <h4 class="color-primary fs-18 font-weight-bolder" v-if="teamActivity.request_received !== ''">{{ teamActivity.request_received }}</h4>
                 <h4 v-else><span class="ant-spin-loader"><a-spin /></span></h4>
                 <h4 class="fs-14 text-black-50">Request received</h4>
               </a-tooltip>
               <a-tooltip title="Title will go here" class="col-6 col-md-4">
                 <h4 class="color-primary fs-18 font-weight-bolder" v-if="teamActivity.request_sent !== ''">{{ teamActivity.request_sent }}</h4>
                 <h4 v-else><span class="ant-spin-loader"><a-spin /></span></h4>
                 <h4 class="fs-14 text-black-50">Request sent</h4>
               </a-tooltip>
             </div>
           </div>
           <div class="team-members-div mt-3 mx-3" v-if="activeTeam && activeTeam.team_members && activeTeam.team_members.length > 0">
             <h4 class="fs-14 text-black-50 text-center mb-5">Team members</h4>
             <div class="flex justify-content-center align-items-center members">
               <a-tooltip v-for="(member, index) in activeTeam.team_members.filter(item => item.user_id != getAuthUser.id && item.user)" :key="index" class="mr-2" :title="getMemberName(member.user)">
                 <img :src="getImage(member.user)" alt="member" class="team-member-img" />
               </a-tooltip>
             </div>
            </div>
            <div class="d-flex justify-content-center w-100">
              <ButtonComponent
                v-if="getCandidate"
                class="btn-div mt-3"
                :isSmall="true"
                :isBlock="false"
                :responsive="false"
                title="View candidate profile"
                @onClickButton="goToCandidateProfile"
              />
            </div>

           <div class="subscription-div" v-if="activeTeam">
             <!-- <h4 class="fs-14 text-black-50 text-center">Subscription info</h4> -->
             <div class="subscription-info">
              <router-link :to="'subscription/' + activeTeam.team_id">
                <img src="../../assets/icon/renew.svg" alt="Renew Subscription" class="subscription-img" />
                <span class="ml-2">{{ activeTeam.subscription_expire_at ? 'Renew Subscription' : 'Subscription' }}</span>
              </router-link>
             </div>
             <h4 class="fs-12 text-black-50">Last subscription plan: <span class="text-black font-weight-bolder">{{ activeTeam && activeTeam.last_subscription && activeTeam.last_subscription.plans ? activeTeam.last_subscription.plans.title : 'N/A' }}</span></h4>
             <h4 class="fs-12 text-black-50">Subscription expire date: <span class="text-black font-weight-bolder">{{ formateDate(activeTeam.subscription_expire_at) }}</span></h4>
             <!-- <div class="btn-div flex justify-content-center mt-5">
               <v-btn class="renew-btn text-capitalize" :to="{name: 'SubscriptionTeam', params: {id: activeTeam.team_id}}" small>Renew subscription now</v-btn>
             </div> -->
           </div>
         </div>
         <div v-else class="team-all">
           <div class="db-flex mt-4" v-for="(item, teamIndex) in teams" :key="teamIndex">
             <img class="avatar" width="45" height="45" :src="item.logo + `?token=${token}`"
                  alt="image" />
             <div class="content">
               <h4 class="mt-1">{{ item.name }}</h4>
               <p class="mb-0">{{ item.description }}</p>
             </div>
             <div class="quick-switch-box">
               <a-tooltip
                   placement="top"
                   title="Click here to activate or deactive the team"
               >
                 <a-switch default-checked class="quick-switch" v-model:checked="teamsStatus[teamIndex]" @click="onChangeActivateTeam($event, item, teamIndex)">
                  <CheckOutlined />
                  <CloseOutlined />
                 </a-switch>
               </a-tooltip>
             </div>
           </div>
         </div>
       </div>
      </div>
      <div class="col-md-8 col-12 none-l-padding">
        <div class="chart-div" id="chart">
          <div class="overlay-div d-flex justify-content-center align-items-center" v-if="!activeTeam">
            <div>Activate team to see the total views</div>
          </div>
          <div class="mobile-flex justify-content-between mx-6 pt-3">
            <h6 class="chart-heading">Total <span class="color-primary">{{ totalCount }}</span> view(s) in last <span class="color-primary">{{ viewType === 0 ? 7 : 1 }}</span> {{ chartRangeText }}</h6>
            <div class="btn-flex">
              <button class="btn btn-chart-type" :class="{'active-btn': viewType === 0}" @click="toggleProfileViewType(0)">Week</button>
              <button class="btn btn-chart-type ml-2" :class="{'active-btn': viewType === 1}" @click="toggleProfileViewType(1)">Month</button>
              <button class="btn btn-chart-type ml-2" :class="{'active-btn': viewType === 2}" @click="toggleProfileViewType(2)">Year</button>
            </div>
          </div>
          <div class="d-flex flex-column justify-content-center">
            <highcharts :options="chartOptions" ref="viewsGraph" class="h-50 h-charts"></highcharts>
            <div class="p-3 mx-6">
              <h6 class="chart-heading">Country wise <span class="color-primary">{{ chartOptionsSaved.months.totalCount }}</span> viewed</h6>
              <div v-if="siteVisitData" class="country-wise-view" style="font-size: 1rem; white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;">
                <div v-for="(item, index) in siteVisitData.countryWiseViews" :key="index" class="d-flex justify-content-center country-view-item">
                  <span class="mr-2" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{ index ? index : "Others" }}</span>
                  <span class="font-weight-bold color-primary" style="overflow: hidden;">{{ item }}</span>
                </div>       
              </div>

            </div>

          </div>
        </div>
        <div class="tips-div mt-4" v-if="false">
          <carousel
              :perPage="1"
              paginationActiveColor="#522e8e"
              paginationColor="#b7b7b7"
          >
            <slide v-for="(tip, index) in maTips" :key="index">
              <div class="flex justify-content-between tips-direction">
                <div class="w-slide-1">
                  <h5 class="text-black-50 font-weight-bold">MatrimonyAssist Tips</h5>
                  <p class="tipsDetailsDesign pl-4 text-black-50">
                    Lorem Ipsum is simply dummy text of the printing and typesetting
                    industry. Lorem Ipsum has been the industry's standard dummy
                    text ever since the 1500s, when an unknown printer took a galley
                    of type and scrambled it to make a type specimen book. It has
                    survived not only five centuries, but also the leap into
                    electronic typesetting, remaining essentially unchanged.
                  </p>
                </div>
                <img
                    class="img-tips my-2"
                    src="@/assets/icon/person-fill-gray.svg"
                    alt="img"
                />
              </div>
            </slide>
          </carousel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue3-carousel";
import ApiService from "@/services/api.service";
import JwtService from "../../services/jwt.service";
import ButtonComponent from "../atom/ButtonComponent.vue";

import { CheckOutlined, CloseOutlined } from "@ant-design/icons-vue";

export default {
  name: "Dashboard",
  components: {
    Carousel,
    Slide,
    ButtonComponent,

    CheckOutlined,
    CloseOutlined,
  },
  created() {
    this.getUserInfo();
    this.loadTeams();
    this.loadProfileGraphApi(2);
    this.getTeamActivity();
    this.token = JSON.parse(localStorage.getItem("token"));
  },
  data() {
    return {
      userInfo: {},
      profileStatus: "",
      avatarSrc: "https://www.w3schools.com/w3images/avatar2.png",
      teams: [],
      activeTeam: null,
      viewType: 2,
      totalCount: 0,
      siteVisitData: null,
      maTips: [
        { id: 1, title: '', image: '' },
        { id: 2, title: '', image: '' },
      ],
      teamsStatus: [false, false, false, false, false],
      profileGraphs: [],
      chartOptions: {
        chart: {
          type: 'areaspline'
        },
        colors: ['#6159A7'],
        xAxis: {
          type: 'month',
          categories: [],
        },
        yAxis: {
          title: {
            text: 'Views'
          },
          // labels: {
          //   formatter: function () {
          //     return this.value;
          //   }
          // }
        },
        tooltip: {
          pointFormat: '{point.y} views'
        },
        title: {
          text: null
        },
        plotOptions: {
          area: {
            pointStart: 0,
            color: "#6159A733",
            marker: {
              enabled: false,
              symbol: 'circle',
              radius: 2,
              states: {
                hover: {
                  enabled: true
                }
              }
            }
          }
        },
        series: [{
          name: '',
          data: []
        }],
        legend: {
          enabled: false
        },
        rangeSelector:{
          enabled: true
        },
        credits: {
          enabled: false
        },
      },
      chartOptionsSaved: {
        months: {
          categories: [],
          data: [],
          totalCount: 0
        },
        days: {
          categories: [],
          data: [],
          totalCount: 0
        },
        weekDays: {
          categories: [],
          data: [],
          totalCount: 0
        }
      },
      teamActivity: {
        suggestion: '',
        teamlisted: '',
        shortlisted: '',
        connected: '',
        request_received: '',
        request_sent: ''
      },
      token: "",
    }
  },
  computed: {
    userDataFromApi() {
      return this.userInfo?.user ? this.userInfo.user : {}
    },
    chartRangeText() {
      if(this.viewType === 0) {
        return 'days';
      } else if(this.viewType === 1) {
        return 'month';
      } else {
        return 'year';
      }
    },
    getAuthUser() {
      let loggedUser = JSON.parse(localStorage.getItem('user'));
      if (loggedUser) {
        return loggedUser;
      }
      return null;
    },
    getCandidate() {
      if(this.activeTeam && this.activeTeam.team_members && this.activeTeam.team_members.length > 0) {
        let candidate = this.activeTeam.team_members.find(item => item.user_type == 'Candidate');
        if(candidate) {
          return candidate.user_id;
        }
      }
      return null;
    },
    lastLogin() {
      let last_login = JSON.parse(localStorage.getItem('user')).last_login;
      const date = new Date(last_login);
      let formattedDate = date.toLocaleDateString('en-UK', {day: 'numeric', month: 'short', year: 'numeric' });
      formattedDate =  formattedDate.slice(0, 6) + "," + formattedDate.slice(6);
      // date_obj = datetime.datetime.strptime(last_login, "%Y-%m-%dT%H:%M:%S.%fZ")
      // new_date_str = date_obj.strftime("%d %b, %Y")
      // return new_date_str;
      return formattedDate;
    }
  },
  methods: {
    async getUserInfo () {
      let {data} = await ApiService.get("v1/user").then(res => res.data);
      this.userInfo = data;
      this.$store.dispatch('saveUserInfo', data);
      
      this.profileStatus = this.userInfo.user["account_type"] == 1 && this.userInfo.candidate_information
                ? this.userInfo.candidate_information.data_input_status == 0
                  ? "In-complete"
                  : this.userInfo.candidate_information.data_input_status > 5 &&
                    this.userInfo.candidate_information.is_uplaoded_doc == 1
                  ? "Fully Completed"
                  : this.userInfo.candidate_information.data_input_status > 5 &&
                    this.userInfo.candidate_information.is_uplaoded_doc == 0
                  ? "Completed Without ID"
                  : "Partially Completed"
                : this.userInfo.user["account_type"] == 2 && this.userInfo.representative_information
                ? this.userInfo.representative_information.data_input_status == 0
                  ? "In-complete"
                  : this.userInfo.representative_information.data_input_status > 2 &&
                    this.userInfo.representative_information.is_uplaoded_doc == 1
                  ? "Fully Completed"
                  : this.userInfo.representative_information.data_input_status > 2 &&
                    this.userInfo.representative_information.is_uplaoded_doc == 0
                  // ? "Completed Without ID"
                  // : "Partially Completed"
                  ? "Fully Completed"
                  : "Fully Completed"
                : "In-completed";
      console.log(this.profileStatus);
    },
    async loadTeams() {
      let activeTeamId = JwtService.getTeamIDAppWide();
      let {data} = await ApiService.get("v1/team-list").then(res => res.data);
      this.teams = data;
      this.activeTeam = this.teams.find((item) => item.team_id == activeTeamId);
    },

    async loadProfileGraphApi(viewType) {
      if(this.siteVisitData == null) {
        let teamIntId = localStorage.getItem('teamid');
        let {data} = await ApiService.get(`v1/site-visit-graph/${teamIntId}`).then(res => res.data);
        this.siteVisitData = data;
      }
      // let today = new Date();
      // let viewsInLastYear = this.siteVisitData.filter(item => (today - new Date(item.updated_at)) <= 31536000000);
      // let viewsInLastMonth = viewsInLastYear.filter(item => (today - new Date(item.updated_at)) <= 2419200000);
      // let viewsInLastWeek = viewsInLastMonth.filter(item => (today - new Date(item.updated_at)) <= 604800000);

      console.log(this.siteVisitData);
      let newArray = [];
      if(this.siteVisitData) {
        if(viewType == 2) {
          if(this.chartOptionsSaved.months.categories.length != 0) {
            this.chartOptions.xAxis.categories =this.chartOptionsSaved.months.categories;
            this.chartOptions.series[0].data = this.chartOptionsSaved.months.data;
            this.totalCount = this.chartOptionsSaved.months.totalCount;
            return;
          }
          console.log('saved not working');
          let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Ma', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
          this.chartOptions.series = [
            {
              name: 'Year',
              data: []
            }
          ]
          this.totalCount = 0;
          this.chartOptions.xAxis.categories = [];
          for (const key in this.siteVisitData.months) {
            this.totalCount += this.siteVisitData.months[key];
            this.chartOptions.xAxis.categories.push(key);
            this.chartOptions.series[0].data.push(this.siteVisitData.months[key]);
          }

          let currentMonthIndex = monthNames.indexOf(monthNames[new Date().getMonth()]);
          newArray = this.chartOptions.xAxis.categories.slice(currentMonthIndex+1).concat(this.chartOptions.xAxis.categories.splice(0, currentMonthIndex)).concat(this.chartOptions.xAxis.categories[0]);
          this.chartOptions.xAxis.categories = newArray;
          newArray = this.chartOptions.series[0].data.slice(currentMonthIndex+1).concat(this.chartOptions.series[0].data.splice(0, currentMonthIndex)).concat(this.chartOptions.series[0].data[0]);
          this.chartOptions.series[0].data = newArray;

          this.chartOptionsSaved.months.categories = this.chartOptions.xAxis.categories;
          this.chartOptionsSaved.months.data = this.chartOptions.series[0].data;
          this.chartOptionsSaved.months.totalCount = this.totalCount;

        } else if (viewType == 1) {
          if(this.chartOptionsSaved.days.categories.length != 0) {
            this.chartOptions.xAxis.categories =this.chartOptionsSaved.days.categories;
            this.chartOptions.series[0].data = this.chartOptionsSaved.days.data;
            this.totalCount = this.chartOptionsSaved.days.totalCount;
            return;
          }
          console.log('saved not working');

          this.chartOptions.series = [
            {
              name: 'Month',
              data: []
            }
          ]
          this.totalCount = 0;
          this.chartOptions.xAxis.categories = [];
          for (const key in this.siteVisitData.days) {
            if(parseInt(key) > new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate()) {
              continue;
            }
            this.totalCount += this.siteVisitData.days[key];
            this.chartOptions.xAxis.categories.push(key);
            this.chartOptions.series[0].data.push(this.siteVisitData.days[key]);
          }

          let currentDayMIndex = this.chartOptions.xAxis.categories.indexOf(new Date().getDate().toString());
          newArray = this.chartOptions.xAxis.categories.slice(currentDayMIndex+1).concat(this.chartOptions.xAxis.categories.splice(0, currentDayMIndex)).concat(this.chartOptions.xAxis.categories[0]);
          this.chartOptions.xAxis.categories = newArray;

          newArray = this.chartOptions.series[0].data.slice(currentDayMIndex+1).concat(this.chartOptions.series[0].data.splice(0, currentDayMIndex)).concat(this.chartOptions.series[0].data[0]);
          this.chartOptions.series[0].data = newArray;

          this.chartOptionsSaved.days.categories = this.chartOptions.xAxis.categories;
          this.chartOptionsSaved.days.data = this.chartOptions.series[0].data;
          this.chartOptionsSaved.days.totalCount = this.totalCount;

        } else {
          if(this.chartOptionsSaved.weekDays.categories.length != 0) {
            this.chartOptions.xAxis.categories =this.chartOptionsSaved.weekDays.categories;
            this.chartOptions.series[0].data = this.chartOptionsSaved.weekDays.data;
            this.totalCount = this.chartOptionsSaved.weekDays.totalCount;
            return;
          }
          console.log('saved not working');

          this.chartOptions.series = [
            {
              name: 'Days',
              data: []
            }
          ]
          this.totalCount = 0;
          this.chartOptions.xAxis.categories = [];
          for (const key in this.siteVisitData.week) {
            this.totalCount += this.siteVisitData.week[key];
            this.chartOptions.xAxis.categories.push(key);
            this.chartOptions.series[0].data.push(this.siteVisitData.week[key]);
          }


          let currentDayIndex = new Date().getDay();
          newArray = this.chartOptions.xAxis.categories.slice(currentDayIndex+1).concat(this.chartOptions.xAxis.categories.splice(0, currentDayIndex)).concat(this.chartOptions.xAxis.categories[0]);
          this.chartOptions.xAxis.categories = newArray;
          newArray = this.chartOptions.series[0].data.slice(currentDayIndex+1).concat(this.chartOptions.series[0].data.splice(0, currentDayIndex)).concat(this.chartOptions.series[0].data[0]);
          this.chartOptions.series[0].data = newArray;

          this.chartOptionsSaved.weekDays.categories = this.chartOptions.xAxis.categories;
          this.chartOptionsSaved.weekDays.data = this.chartOptions.series[0].data;
          this.chartOptionsSaved.weekDays.totalCount = this.totalCount;
        }

        this.$refs.viewsGraph.chart.reflow();

      }
    },
    async getTeamActivity() {
      // let {data} = await ApiService.get("v1/team-activity").then(res => res.data);
      // this.teamActivity = data;

      let {data} = await ApiService.get('v1/candidate-of-team');
      let candidateId = data.data.user_id;
      let oppositeGender = data.data.personal.per_gender_id === 1 ? "2" : "1";
      await ApiService.get(`v1/home-searches?gender=${oppositeGender}`)
        .then(res => {
          data = res.data;
          this.teamActivity.suggestion = data.data.pagination.total_items;
        })
        .catch(err => {
          // console.log(err);
          this.teamActivity.suggestion = 0;
        });

      // fetch shortlisted and team shortlisted count
      await this.$store.dispatch("loadShortListedCandidates");
      await this.$store.dispatch('loadTeamShortListedCandidates');
      this.teamActivity.shortlisted = this.$store.getters.shortListedCandidates.length;
      this.teamActivity.teamlisted = this.$store.getters.teamShortListedCandidates.length;

      let activeTeamId = JwtService.getTeamIDAppWide();
      let connectionReport = await ApiService.post('v1/connection-reports?team_id='+activeTeamId).then(res => res.data);
      this.teamActivity.connected = connectionReport.data.connected_teams;
      this.teamActivity.request_received = connectionReport.data.request_received;
      this.teamActivity.request_sent = connectionReport.data.request_sent;

    },
    getMemberName(user) {
      if(user && user.full_name) {
        return user.full_name;
      }
      return 'N/A';
    },
    getImage(user) {
      console.log(user, 'user form dashboard')
      if(user && user.candidate_info && user.candidate_info.per_main_image_url) {
        return user.candidate_info.per_main_image_url + `?token=${this.token}`;
      } else {
        return user.representative_info.per_main_image_url ? user.representative_info.per_main_image_url + `?token=${this.token}` : this.avatarSrc;
      }
    },
    toggleProfileViewType(type) {
      this.viewType = type;
      this.loadProfileGraphApi(type);
    },
    formateDate(date) {
      if (date == null || date == undefined) {
        return "  Not Exist";
      }
      let d = new Date(date),
          month = "" + (d.getMonth() + 1),
          day = "" + d.getDate(),
          year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },
    async onChangeActivateTeam(e, item, teamIndex) {
      if (e) {
        let returnedResult = await this.turnOnTeam(item, teamIndex);
        this.$store.commit("setTeamInfo", item);
        if (returnedResult) {
          this.teamsStatus[teamIndex] = true;
        } else {
          this.teamsStatus[teamIndex] = false;
        }
      } else {
        this.$store.commit("setTeamInfo", null);
        JwtService.destroyTeamIDAppWide();
        let vm = this;
        this.$success({
              title: "Success",
              content: "Team deactivated",
              onOk() {
                setTimeout(() => vm.$router.go(), 100);
              },
            }
        );
      }
    },
    async turnOnTeam(item, teamIndex) {
      if (this.is_subscribed(item)) {
        if (item.team_members.length < 2) {
          this.$error({
            content: "This team do not contain sufficient users. Go to Manage team & add member",
            centered: true,
          });
          this.teamsStatus[teamIndex] = false;
          return false;
        }

        let candidateFlag = 0;
        item.team_members.map((_member) => {
          if (_member.user_type == "Candidate") {
            candidateFlag++;
          }
        });

        if (candidateFlag == 0) {
          this.$error({
            content: "This team do not contain any candidate. Go to Manage team & add a candidate",
            centered: true,
          });
          this.teamsStatus[teamIndex] = false;
          return false;
        }

        try {
          await ApiService.post("v1/team-turn-on", {
            team_id: item.id,
          })
              .then((data) => {
                if (data.data.status == "FAIL") {
                  this.$message.error(data.data.message);
                  return false;
                }
                if (data.data.status !== "FAIL") {
                  JwtService.saveTeamIDAppWide(item.team_id);
                  JwtService.saveTeamID(item.id);
                  const vm = this;
                  this.$success({
                    title: "Success",
                    content: "Selected Team Activated",
                    onOk() {
                      // vm.$emit("teamListUpdated");
                      setTimeout(() => vm.$router.go(), 100);
                    },
                  });
                  return true;
                }
              })
              .catch((error) => {
                console.log(error);
                console.log(error.response);
                this.$message.error("Something went Wrong");
                return false;
              });
        } catch (error) {
          console.log(error);
        }
      } else {
        this.$error({
          title: "Subscription Needed",
          content: "Please buy subscription to Activate the team. Go to Manage team & subscribe",
        });
        this.teamsStatus[teamIndex] = false;
        return false;
      }
      return true;
    },
    is_subscribed(item) {
      if (item.subscription_expire_at == null) {
        return false;
      }

      if (!this.checkExpiry(item.subscription_expire_at)) {
        return false;
      } else {
        return true;
      }
    },
    checkExpiry(dateString) {
      var myDate = new Date(dateString);
      var today = new Date();
      if (myDate > today) {
        return true;
      }
      return false;
    },
    goToCandidateProfile() {
      this.$router.push({name: 'ProfileView', params: {id: this.getCandidate}});
    }
  },
}
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";

p {
  margin-bottom: 3px !important;
}

h4 {
  margin-bottom: .2rem !important;
}
.db-flex {
  display: flex;
}
.team-info-div {
  position: relative;
  border: 1px solid #c9c9c9;
  border-radius: 12px;
  padding-bottom: 20px;
  height: calc(100vh - 100px);
  overflow-y: auto;
  @media (max-width: 767px) {
    height: auto;
    padding-bottom: 0;
  }
  .user-info-div {
    background: rgba(97, 89, 167, 0.2);
    padding: 5px 5px 5px 10px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    .flex {
      .user-img {
        border-radius: 50%;
        width: 90px;
        height: 90px;
      }
      .border-bottom-white {
        border-bottom: 1px solid #FFFFFF;
      }
    }
    .status-div {
      .status {
        .profile-btn {
          border-radius: 20px;
        }
        .ant-spin-loader {
          .ant-spin-dot-item {
            background-color: $bg-primary;
          }
        }
      }
    }
  }
  .active-team {
    background: rgba(97, 89, 167, 0.2);
    padding: 8px 10px;
    border-radius: 12px;
  }
  .team-short-info {
    .ant-spin-loader {

      .ant-spin-dot{
        font-size: 18px;
        .ant-spin-dot-item {
          background-color: $bg-primary;
        }
      }
    }
    .profile-overview {
      padding: 10px 20px;
    }
    .team-members-div {
      padding-top: 20px;
      border-top: 1px solid rgba(0, 0, 0, .2);

      .members {
        .team-member-img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
        }
      }
    }
    .btn-div {
      padding: 8px 10px;
      .profile-btn {
        background: #6159a7;
        border-radius: 30px;
        color: #FFFFFF;
        width: 100%;
      }
    }
    .subscription-div {
      padding: 15px 20px;
      position: absolute;
      bottom: 10px;

      @media  (max-width: 767px) {
        position: relative;
        padding: 40px 20px 10px 20px !important;
      }

      .subscription-img {
        width: 20px;
      }

      .subscription-info {
        span {
          font-size: 12px;
          color: #e51f76;
          text-decoration: underline;
        }
      }
      .flex {
        .renew-btn {
          border-radius: 20px;
          background: #44ac44;
          color: #FFFFFF;
          width: 100%;
          &:hover {
            border: 1px solid #FFFFFF;
          }
        }
      }
    }
  }
}
.chart-div {
  border: 1px solid #c9c9c9;
  border-radius: 12px;
  padding: 5px 15px 15px 0;
  height: calc(100vh - 100px);
  position: relative;

  @media (max-width: 767px) {
    height: auto;
    padding: 8px;
  }

  .overlay-div {
    position: absolute;
    top: 0%;
    left: 0%;
    z-index: 8;
    height: 100%;
    width: 100%;
    border-radius: 12px;
    background: #dfdeed;
    opacity: .91;
  }
}
.tips-div {
  border: 1px solid #c9c9c9;
  border-radius: 12px;
  padding: 5px 15px 15px 15px;
}
.w33 {
  width: 33.33%;
}
.dashboard {
  height: calc(100vh - 70px);
  overflow-y: auto;
}
.btn-border {
  border: 1px solid transparent;
  padding-top: 0;
  padding-bottom: 0;
}
.btn-hover {
  &:hover {
    border: 1px solid #FFFFFF !important;
    background: rgba(97, 89, 167, 0.8) !important;
  }
}
.w-slide-1 {
  width: 100%;
  @media (min-width: 768px) {
    width: 70%;
  }
}
.img-tips {
  border: 1px solid #c9c9c9;
  width: 100%;
  border-radius: 12px;
  @media (min-width: 768px) {
    width: 30%;
  }
}
.tips-direction {
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
}
.col-padding {
  padding-top: 5px !important;
  padding-left: 15px !important;
  padding-right: 0 !important;

  @media (max-width: 768px) {
    padding-right: 15px !important;
  }
}
.none-l-padding {
  padding-top: 5px !important;
  padding-left: 15px !important;
  padding-right: 15px !important;
}
.chart-heading {
  font-size: 18px;
  @media (max-width: 768px) {
    text-align: center !important;
    margin-bottom: 0 !important;
    padding-bottom: 12px !important;
    font-size: 12px;
  }
  span {
    font-size: 14px;
    @media (min-width: 768px) {
      font-size: 24px;
    }
  }
}

.h-charts {
  margin-top: 40px !important;
  margin-bottom: 40px !important;
}

.country-wise-view {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 4px;

  .country-view-item {
    background: $primary_lite_5;
    border-radius: 10px;
    padding: 2px;
  }
  

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr) !important;    
  }
  @media (min-width: 992px) {
    grid-template-columns: repeat(3, 1fr) !important;
  }
  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr) !important;
  }
  @media (max-width: 768px) {
    font-size: .8rem !important;
    justify-content: center !important;

    .country-view-item {
      justify-content: space-between !important;
      padding: 2px 15px;
    }

  }
}
.btn-chart-type {
  background: rgba(189, 189, 189, 0.4);
  &:hover {
    background: rgba(128, 128, 128, 0.4);
  }
  &:focus {
    border: none;
    outline: none;
    box-shadow: none;
  }
}
.upload-btn {
  @media (max-width: 768px) {
    display: none;
  }
}
.active-btn {
  background: rgba(128, 128, 128, 0.4);
}
.mobile-flex {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  @media (min-width: 768px) {
    flex-direction: row;
    margin-bottom: 10px;
  }
}
.btn-flex {
  display: flex;
  justify-content: center;
}
.team-all {
  padding: 20px;
}
.avatar {
  border-radius: 50%;
  display: block;
  border: 2px solid #ddd
}
.content {
  margin-left: 12px;
  flex: auto;

  h4 {
    font-size: 13px;
  }

  p {
    font-size: 12px;
  }
}
</style>