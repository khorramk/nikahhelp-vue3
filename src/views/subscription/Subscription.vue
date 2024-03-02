<template>
  <div class="h-100">
    <Loader v-if="isLoading" :isLoading="isLoading" />
    <div class="h-100" v-else>
      <!-- Heading -->
      <div class="section-header text-center heading-text px-2 font-poppins" v-if="false">
        <h4 class="heading color-primary font-weight-bolder">
          Choose a Subscription Plan that Works for You
        </h4>
        <p class="font-weight-bold sub-heading">
          MatrimonyAssist Subscription is Team Based. Only
          <b>ONE</b> member pays
          <br />
          the rest of the members use the platform for <b>FREE</b> of charge.
        </p>
      </div>
      <!-- Subscription details -->
      <!-- Big screen -->
      <div class="subscription-details container-fluid mt-4 font-poppins desktop-view">
        <div class="row" :class="{ 'mobile-section': activeStep > 1 }">
          <div
            class="col-12 col-md-4 col-xl-4 font-poppins pl-0 pr-2"
            :class="{ 'mobile-block': activeStep !== 1 }"
            style="padding-left: 0px !important;"
          >
            <!-- Card 1 -->
            <div
              class="
                custom-card
                card-1
                shadow-border
                background-design-cardfooter
                br-10
                position-relative
                height-1
              "
            >
              <div
                class="div-1 background-design text-center px-2 pb-2 br-top-10 mb-5"
              >
                <h3 class="text-white">Choose Plan</h3>
              </div>
              <div class="div-2 position-relative bg-white">
                <div
                  class="
                    d-flex
                    cursor-pointer
                    py-4
                    px-5
                    item-duration
                    align-items-center
                    justify-content-center
                    border-bottom
                    mb-5
                    bg-brand-gradient-opacity
                  "
                  style="border-radius: 12px;"
                  :class="{
                    'bg-brand-gradient':
                      choosedPlan && choosedPlan.id == plan.id,
                    'border-top': pIndex === 0,
                  }"
                  @click="setPlan(plan); nextStep(2);"
                  v-for="(plan, pIndex) in plans"
                  :key="pIndex"
                >
                  <img
                    src="@/assets/icon/subscription_check.svg"
                    alt="icon"
                    v-if="choosedPlan && choosedPlan.id == plan.id"
                    class="mr-4"
                  />
                  <div v-else style="height: 24px; width: 24px; background: #fff; margin-right: 16px; border-radius: 36% / 36%;
                  box-shadow: inset 0 0 0 1.5px #bbbbc1;"></div>
                  <h4
                    class="duration text-white"
                    :class="{
                      selected: choosedPlan && choosedPlan.id == plan.id,
                    }"
                  >
                    {{ plan.title }}
                  </h4>
                </div>
              </div>
              <div
                v-if="activeStepIndex == 1"
                style="height: 200px"
                class="div-3 bg-primary-gradient"
              >
                <h3 class="text-center text-white font-weight-bolder">
                  Plan Description
                </h3>
                <p class="text-center fs-12 text-white">
                  {{
                    choosedPlan.description
                  }}
                </p>
              </div>
            </div>
          </div>
          <div
            class="col-12 col-md-4 col-xl-4 position-relative font-poppins px-2"
            :class="{ 'mobile-block': activeStep !== 2 }"
          >
            <!-- Card 2 -->
            <div
              style="padding: 30px 0"
              class="
                custom-card
                card-2
                shadow-border
                background-design-middle
                height-1
              "
            >
              <div
                style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
                class="div-1 text-center"
              >
                <span style="font-size: 50px">&#127881;</span>
                <h1 class="text-white" style="font-size: 2rem !important;">Launch Offer</h1>
                <span style="font-size: 50px; transform: rotate(-90deg);">&#127881;</span>
              </div>
              <div
                class="
                  div-2
                  text-center text-white
                  font-weight-bolder
                  desktop-py
                "
              >
                <h3 class="price text-white font-weight-bolder">
                  £ {{ amount.toFixed(2) }}
                </h3>
                <p class="price-text text-white font-weight-bolder">
                  <!--                  Saved {{ savedAmount }} £-->
                  For the whole year
                </p>
              </div>
              <div class="" v-if="activeStepIndex === 1">
                <p class="price-tag text-center px-4">Regular Price £ 120</p>
              </div>
              <div class="">
                <p class="text-center text-white px-4 fs-14" style="margin-top: 50px;">
                  In MatrimonyAssist, All subscribing teams have full access to
                  platform and features. The only difference is time limit
                </p>
              </div>
            </div>

            <div class="position-absolute buttons-position">
              <div class="d-flex justify-content-between">
                <button
                  class="btn bg-danger px-4 py-2 text-white br-20 btn-back"
                  @click="nextStep(1)"
                >
                  Back
                </button>
                <button
                  class="btn btn-success px-4 py-2 ml-2 br-20 btn-next"
                  @click="nextStep(3)"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
          <div
            class="col-12 col-md-4 col-xl-4 font-poppins px-2"
            :class="{ 'mobile-block': activeStep !== 3 }"
          >
            <!-- Card 3 -->
            <div
              class="
                custom-card
                card-3
                shadow-border
                background-design-rightcard
                height-1
              "
            >
              <h1 class="px-4 text-white pt-2 fs-24 text-center">
                Select Team
              </h1>

              <div class="form-group px-4">
                <select
                  class="w-100 custom-select fs-18"
                  v-model="teamSelected"
                  @change="setActiveTeam"
                  style="cursor: pointer; height: 40px !important;"
                >
                  <option
                    v-for="(team, teamIndex) in teams"
                    :value="team"
                    :key="team.id"
                  >
                    Team {{ teamIndex + 1 }}
                  </option>
                </select>
              </div>

              <div>
                <div
                  class="
                    d-flex
                    align-items-center
                    justify-content-between
                    bg-white
                    px-4
                    cursor-pointer
                  "
                  @click="setContentType('details')"
                >
                  <h4 class="fs-14 pt-1">This team details</h4>
                  <!--                  <a-icon-->
                  <!--                    type="up"-->
                  <!--                    :class="{ 'rotate-180': contentShow == 'details' }"-->
                  <!--                  />-->
                </div>
                <div class="team-details mt-2 px-4 d-block text-white mb-2">
                  <li class="flex-between-start">
                    <span class="fles-45 px-2">Name </span>
                    <span class="fles-55 px-2" v-if="teamSelected">
                      :<span class="ml-2">{{ teamSelected.name }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="fles-45 px-2">ID</span>
                    <span class="fles-55 px-2" v-if="teamSelected">
                      :<span class="ml-2">{{
                        teamSelected.team_id.substr(0, 8)
                      }}</span></span
                    >
                  </li>
                  <!--                  <li class="flex-between-start">-->
                  <!--                    <span class="fles-45 px-2">Team Status </span>-->
                  <!--                    <span class="fles-55 px-2" v-if="teamSelected">-->
                  <!--                      :<span class="ml-2"-->
                  <!--                        >{{ teamSelected.status == 1 ? "Active" : "Inactive" }},-->
                  <!--                        {{-->
                  <!--                          teamSelected.member_count > 1 ? "Valid" : "Invalid"-->
                  <!--                        }}, Verified</span-->
                  <!--                      ></span-->
                  <!--                    >-->
                  <!--                  </li>-->
                  <li class="flex-between-start">
                    <span class="fles-45 px-2">Creation Date </span>
                    <span class="fles-55 px-2" v-if="teamSelected">
                      :<span class="ml-2">{{ teamCreationDate }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="fles-45 px-2">Created By </span>
                    <span class="fles-55 px-2" v-if="teamSelected">
                      :<span class="ml-2">{{ teamCreatedBy }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="fles-45 px-2">My Role </span>
                    <span class="fles-55 px-2" v-if="teamSelected">
                      :<span class="ml-2">{{
                        selfMember ? selfMember.role : ""
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="fles-45 px-2">Participated As </span>
                    <span class="fles-55 px-2" v-if="teamSelected">
                      :<span class="ml-2">{{
                        selfMember ? selfMember.user_type : ""
                      }}</span></span
                    >
                  </li>
                </div>
              </div>

              <div class="mt-1">
                <div
                  class="
                    d-flex
                    align-items-center
                    justify-content-between
                    bg-white
                    px-4
                    cursor-pointer
                  "
                  @click="setContentType('subscription')"
                >
                  <h4 class="fs-14 pt-1">
                    This team's last subscription details
                  </h4>
                  <!--                  <a-icon-->
                  <!--                    type="up"-->
                  <!--                    :class="{ 'rotate-180': contentShow == 'subscription' }"-->
                  <!--                  />-->
                </div>
                <div class="px-4 d-block mt-1" style="overflow-y: auto;">
                  <small class="text-white">{{
                    teamSelected &&
                    teamSelected.last_subscription &&
                    teamSelected.last_subscription.created_at
                      ? messageCreatedAt(
                          teamSelected.last_subscription.created_at
                        )
                      : ""
                  }}</small>
                  <h4 class="fs-12 text-white mt-2">
                    Subscribed
                    <b
                      >{{
                        teamSelected &&
                        teamSelected.last_subscription &&
                        teamSelected.last_subscription.plans
                          ? teamSelected.last_subscription.plans.title
                          : ""
                      }}
                      </b
                    >
                    by -
                    <b>{{
                      teamSelected &&
                      teamSelected.last_subscription &&
                      teamSelected.last_subscription.user
                        ? teamSelected.last_subscription.user.full_name
                        : ""
                    }}</b>
                  </h4>
                  <small class="text-white"
                    >Team Expire period extended to the date of -
                    {{
                      teamSelected && teamSelected.subscription_expire_at
                        ? formateDate(teamSelected.subscription_expire_at)
                        : ""
                    }}</small
                  >
                </div>
                <button
                  @click="handleContinue"
                  class="
                    btn
                    btn-payment
                    w-100
                    d-flex
                    align-items-center
                    justify-content-center
                    br-10
                  "
                >
                  Continue to payment
                  <a-icon type="arrow-right" class="ml-2 mt-1" />
                </button>
              </div>
            </div>

            <div class="position-absolute buttons-position">
              <div class="d-flex justify-content-between">
                <button
                  class="btn bg-danger px-4 py-2 text-white br-20 w-full"
                  @click="nextStep(2)"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- small screen -->
      <div class="subscription-details-mobile  container-fluid mt-4 font-poppins mobile-view">
        <div class="row">
          <div
            class="col-12 col-md-4 col-xl-4 font-poppins py-0"
            :class="{ 'mobile-block': activeStep !== 1 }"
          >
            <!-- Card 1 -->
            <div
              class="
                custom-card
                card-1
                shadow-border
                background-design-cardfooter
                br-10
                position-relative
                height-1
              "
            >
              <div
                class="div-1 background-design text-center px-2 pb-2 br-top-10 mb-5"
              >
                <h3 class="text-white">Choose Plan</h3>
              </div>
              <div class="div-2 position-relative bg-white">
                <div
                  class="
                    d-flex
                    cursor-pointer
                    py-4
                    px-5
                    item-duration
                    align-items-center
                    justify-content-center
                    border-bottom
                    mb-5
                    bg-brand-gradient-opacity
                  "
                  style="border-radius: 12px;"
                  :class="{
                    'bg-brand-gradient':
                      choosedPlan && choosedPlan.id == plan.id,
                    'border-top': pIndex === 0,
                  }"
                  @click="setPlan(plan);"
                  v-for="(plan, pIndex) in plans"
                  :key="pIndex"
                >
                  <img
                    src="@/assets/icon/subscription_check.svg"
                    alt="icon"
                    v-if="choosedPlan && choosedPlan.id == plan.id"
                    class="mr-4"
                  />
                  <div 
                    v-else 
                    style="height: 24px; 
                          width: 24px; 
                          background: #fff; 
                          margin-right: 16px; 
                          border-radius: 36% / 36%;
                          box-shadow: inset 0 0 0 1.5px #bbbbc1;
                    "
                  ></div>
                  <h4
                    class="duration text-white"
                    :class="{
                      selected: choosedPlan && choosedPlan.id == plan.id,
                    }"
                  >
                    {{ plan.title }}
                  </h4>
                </div>
              </div>
              <div
                v-if="activeStepIndex == 1"
                style="height: 200px"
                class="div-3 bg-primary-gradient"
              >
                <h3 class="text-center text-white font-weight-bolder">
                  Plan Description
                </h3>
                <p class="text-center fs-12 text-white">
                  {{
                    choosedPlan.description
                  }}
                </p>
              </div>
            </div>
            <ButtonComponent
              v-if="choosedPlan !== null"
              class="mt-2 w-100"
              backgroundColor="#3ab549"
              :isSmall="true"
              minHeight="35px"
              title="Continue"
              :responsive="false"
              @onClickButton="nextStep(2)"
            />
          </div>
          <div
            class="col-12 col-md-4 col-xl-4 position-relative font-poppins px-2 py-0"
            :class="{ 'mobile-block': activeStep !== 2 }"
          >
            <!-- Card 2 -->
            <div
              style="padding: 30px 0"
              class="
                custom-card
                card-2
                shadow-border
                background-design-middle
                height-1
              "
            >
              <div
                style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
                class="div-1 text-center"
              >
                <span style="font-size: 50px">&#127881;</span>
                <h1 class="text-white">Launch Offer</h1>
                <span style="font-size: 50px; transform: rotate(-90deg);">&#127881;</span>
              </div>
              <div
                class="
                  div-2
                  text-center text-white
                  font-weight-bolder
                  desktop-py
                "
              >
                <h3 class="price text-white font-weight-bolder">
                  £ {{ amount.toFixed(2) }}
                </h3>
                <p class="price-text text-white font-weight-bolder">
                  <!--                  Saved {{ savedAmount }} £-->
                  For the whole year
                </p>
              </div>
              <div class="">
                <p class="price-tag text-center px-4">Regular Price £ 120</p>
              </div>
              <div class="">
                <p class="text-center text-white px-4 fs-14">
                  In MatrimonyAssist, All subscribing teams have full access to
                  platform and features. The only difference is time limit
                </p>
              </div>
            </div>
            <div class="flex">
              <!-- <ButtonComponent
                  class="mt-2 w-50 mr-1"
                  style="color"
                  backgroundColor="#fff"
                  :isSmall="true"
                  title="Back"
                  :responsive="false"
                  @onClickButton="nextStep(1)"
                /> -->
                <ButtonComponent
                  class="mt-2 w-50 mr-1 sub-back-btn"
                  :isSmall="true"
                  minHeight="35px"
                  title="Back"
                  :responsive="false"
                  @onClickButton="nextStep(1)"
                />
  
              <ButtonComponent
                class="mt-2 w-75"
                backgroundColor="#3ab549"
                :isSmall="true"
                minHeight="35px"
                title="Continue"
                :responsive="false"
                :isBlock="true"
                @onClickButton="nextStep(3)"
              />
            </div>
          </div> 
          <div
            class="col-12 col-md-4 col-xl-4 font-poppins px-2 py-0"
            :class="{ 'mobile-block': activeStep !== 3 }"
          >
            <!-- Card 3 -->
            <div
              class="
                custom-card
                card-3
                shadow-border
                background-design-rightcard
              "
            >
              <h1 class="px-4 text-white pt-2 fs-24 text-center">
                Select Team
              </h1>

              <div class="form-group px-4">
                <select
                  class="w-100 custom-select fs-18"
                  v-model="teamSelected"
                  @change="setActiveTeam"
                  style="cursor: pointer;"
                >
                  <option
                    v-for="(team, teamIndex) in teams"
                    :value="team"
                    :key="team.id"
                  >
                    Team {{ teamIndex + 1 }}
                  </option>
                </select>
              </div>

              <div>
                <div
                  class="
                    d-flex
                    align-items-center
                    justify-content-between
                    bg-white
                    px-4
                    cursor-pointer
                  "
                  @click="setContentType('details')"
                >
                  <h4 class="fs-14 pt-1">This team details</h4>
                  <!--                  <a-icon-->
                  <!--                    type="up"-->
                  <!--                    :class="{ 'rotate-180': contentShow == 'details' }"-->
                  <!--                  />-->
                </div>
                <div class="team-details mt-2 px-4 d-block text-white mb-2">
                  <li class="flex-between-start">
                    <span class="fles-45 px-2">Name </span>
                    <span class="fles-55 px-2" v-if="teamSelected">
                      :<span class="ml-2">{{ teamSelected.name }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="fles-45 px-2">ID</span>
                    <span class="fles-55 px-2" v-if="teamSelected">
                      :<span class="ml-2">{{
                        teamSelected.team_id.substr(0, 8)
                      }}</span></span
                    >
                  </li>
                  <!--                  <li class="flex-between-start">-->
                  <!--                    <span class="fles-45 px-2">Team Status </span>-->
                  <!--                    <span class="fles-55 px-2" v-if="teamSelected">-->
                  <!--                      :<span class="ml-2"-->
                  <!--                        >{{ teamSelected.status == 1 ? "Active" : "Inactive" }},-->
                  <!--                        {{-->
                  <!--                          teamSelected.member_count > 1 ? "Valid" : "Invalid"-->
                  <!--                        }}, Verified</span-->
                  <!--                      ></span-->
                  <!--                    >-->
                  <!--                  </li>-->
                  <li class="flex-between-start">
                    <span class="fles-45 px-2">Creation Date </span>
                    <span class="fles-55 px-2" v-if="teamSelected">
                      :<span class="ml-2">{{ teamCreationDate }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="fles-45 px-2">Created By </span>
                    <span class="fles-55 px-2" v-if="teamSelected">
                      :<span class="ml-2">{{ teamCreatedBy }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="fles-45 px-2">My Role </span>
                    <span class="fles-55 px-2" v-if="teamSelected">
                      :<span class="ml-2">{{
                        selfMember ? selfMember.role : ""
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="fles-45 px-2">Participated As </span>
                    <span class="fles-55 px-2" v-if="teamSelected">
                      :<span class="ml-2">{{
                        selfMember ? selfMember.user_type : ""
                      }}</span></span
                    >
                  </li>
                </div>
              </div>

              <div class="mt-1">
                
                <div class="accordion mb-4" id="accordionExample">
                  <div>
                    <div id="headingOne">
                      <h2 class="mb-0">
                        <button class="w-100" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                          <div data-v-715648c5="" class="
                            d-flex
                            align-items-center
                            justify-content-between
                            bg-white
                            px-4
                            cursor-pointer
                          "><h4 data-v-715648c5="" class="fs-14 pt-1">Last team's subscription details <a-icon type="down" /></h4>
                        </div>
                        </button>
                      </h2>
                    </div>
                
                    <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                      <div class="team-details mt-2 d-block text-white pb-2">
                        <div class="px-4 d-block mt-1" style="overflow-y: auto;">
                          <small class="text-white">{{
                            teamSelected &&
                            teamSelected.last_subscription &&
                            teamSelected.last_subscription.created_at
                              ? messageCreatedAt(
                                  teamSelected.last_subscription.created_at
                                )
                              : ""
                          }}</small>
                          <h4 class="fs-12 text-white mt-2">
                            Subscribed
                            <b
                              >{{
                                teamSelected &&
                                teamSelected.last_subscription &&
                                teamSelected.last_subscription.plans
                                  ? teamSelected.last_subscription.plans.title
                                  : ""
                              }}
                              </b
                            >
                            by -
                            <b>{{
                              teamSelected &&
                              teamSelected.last_subscription &&
                              teamSelected.last_subscription.user
                                ? teamSelected.last_subscription.user.full_name
                                : ""
                            }}</b>
                          </h4>
                          <small class="text-white"
                            >Team Expire period extended to the date of -
                            {{
                              teamSelected && teamSelected.subscription_expire_at
                                ? formateDate(teamSelected.subscription_expire_at)
                                : ""
                            }}</small
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="flex">
              <ButtonComponent
                class="mt-2 w-50 mr-1 sub-back-btn"
                :isSmall="true"
                minHeight="35px"
                title="Back"
                :responsive="false"
                @onClickButton="nextStep(2)"
              />
              <ButtonComponent
                class="mt-2 w-50 sub-cont-btn"
                backgroundColor="#3ab549"
                :isSmall="true"
                minHeight="35px"
                title="Continue"
                :responsive="false"
                @onClickButton="handleContinue"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <a-modal v-model="freeModal" title="Dou you have any cupon?">
      <a-input v-model="cupon" placeholder="Coupon" />

      <template slot="footer">
        <a-button key="back" @click="nextWithoutCupon"> Skip </a-button>
        <a-button key="submit" type="primary" @click="handleOkFreeModal">
          Submit
        </a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
import Header from "@/components/dashboard/layout/Header.vue";
import Sidebar from "@/components/dashboard/layout/Sidebar.vue";
import Footer from "@/components/auth/Footer.vue";
import ButtonComponent from '@/components/atom/ButtonComponent'
import ApiService from "../../services/api.service";
import { format } from "timeago.js";

export default {
  name: "Subscription",
  components: {
    Header,
    Sidebar,
    Footer,
    ButtonComponent
  },
  data() {
    return {
      cupon: "",
      isLoading: false,
      user: {},
      is_verified: 1,
      error: null,
      amount: 9.99,
      savedAmount: 0.0,
      teams: [],
      teamSelected: null,
      contentShow: "details",
      activeStep: 1,
      freeModal: false,
      activeStepIndex: null,
      plans: [],
      choosedPlan: null,
      descriptions: ["Plan 1", "Plan 2", "Plan 3", "Plan 4"],
    };
  },
  async created() {
    //this.loadUser();
    await this.loadPlans();
    await this.loadTeams();
    this.getSelectedTeam();
    this.initialInfoModal();
  },
  computed: {
    teamCreationDate() {
      if (this.teamSelected.created_at) {
        const date = this.teamSelected.created_at.split("T");
        return date[0];
      } else return "N/A";
    },
    getPlans() {
      if (
        this.plans &&
        this.plans.plan_data &&
        this.plans.plan_data.length > 0
      ) {
        return this.plans.plan_data;
      }
      return [];
    },
    teamCreatedBy() {
      return this.teamSelected && this.teamSelected.created_by
        ? this.teamSelected.created_by.full_name
        : "";
    },
    selfMember() {
      let loggedUser = JSON.parse(localStorage.getItem("user"));
      if (loggedUser && this.teamSelected) {
        return this.teamSelected.team_members.find(
          (member) => parseInt(member.user_id) === parseInt(loggedUser.id)
        );
      }
      return null;
    },
  },
  methods: {
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
    messageCreatedAt(time) {
      if (time) {
        return format(time);
      }
      return "";
    },
    setContentType(type) {
      this.contentShow = type;
    },
    async loadPlans() {
      this.isLoading = true;
      let { data } = await ApiService.get("/v1/package-list").then(
        (res) => res.data
      );
      if (data) {
        this.plans = data;
      }
      this.isLoading = false;
    },
    async loadTeams() {
      await this.$store.dispatch("getTeams");
      this.teams = this.$store.getters["userTeamList"];
      console.log(this.teams);
      if (this.$route.params.id == null && this.teams.length > 0) {
        this.teamSelected = this.teams[0];
      }
    },
    async getSelectedTeam() {
      if (this.$route.params.id == null) {
        return;
      } else {
        await this.$store.dispatch("getTeams");
        this.teams = this.$store.getters["userTeamList"];
        var team = this.teams.find((team) => {
          return team.team_id == this.$route.params.id;
        });
        this.teamSelected = team;
        this.$store.state.team.teamSelected = team;
      }
    },
    setActiveTeam() {
      // let team = this.teams.find((team) => {
      //   return team.team_id == this.$route.params.id;
      // });
      // this.teamSelected = team;
      this.$store.state.team.teamSelected = this.teamSelected;
    },
    nextStep(step) {
      this.activeStep = step;
    },
    setPlan(item) {
      this.activeStepIndex = 1;
      this.choosedPlan = item;
      this.amount = 9.99;
      this.savedAmount = item.discount;
      this.$store.state.team.subscriptionAmount = this.amount;
      this.$store.state.team.legalSubscription = true;
      // this.nextStep(2);
    },
    handleContinue() {
      if (this.teamSelected == null) {
        this.$error({
          title: "No Team is Selected!",
          content: "You have to select a team",
          centered: true,
        });
        return;
      }

      if (this.choosedPlan && this.choosedPlan.id) {
        if (
          this.choosedPlan.promo_code &&
          this.choosedPlan.id == this.plans[0].id
        ) {
          let usedAlready = this.choosedPlan.team_ids.findIndex(
            (item) => parseInt(item) === parseInt(this.teamSelected.id)
          );
          if (usedAlready >= 0) {
            this.$store.state.team.subscriptionAmount = parseFloat(
              this.choosedPlan.price
            );
            this.$store.state.team.originalAmount = parseFloat(
              this.choosedPlan.price
            );
            this.$store.state.team.discountedAmount = 0;
            this.$store.state.team.legalSubscription = true;
            this.$router.push(
              `/subscription/payment/${this.teamSelected.name}/${this.teamSelected.id}/${this.choosedPlan.id}?name=${this.choosedPlan.title}`
            );
          } else {
            this.$store.state.team.originalAmount = parseFloat(
              this.choosedPlan.price
            );
            if (this.choosedPlan.promo_code) {
              this.freeModal = true;
            } else {
              this.$store.state.team.subscriptionAmount = parseFloat(
                this.choosedPlan.price
              );
              this.$store.state.team.originalAmount = parseFloat(
                this.choosedPlan.price
              );
              this.$store.state.team.legalSubscription = true;
              this.$store.state.team.teamSelected = this.teamSelected;
              this.$store.state.team.discountedAmount = 0;
              this.$router.push(
                `/subscription/payment/${this.teamSelected.name}/${this.teamSelected.id}/${this.choosedPlan.id}?name=${this.choosedPlan.title}`
              );
            }
          }
        } else {
          if (this.choosedPlan.promo_code) {
            this.freeModal = true;
          } else {
            this.freeModal = false;
            this.$store.state.team.subscriptionAmount = parseFloat(
              this.choosedPlan.price
            );
            this.$store.state.team.originalAmount = parseFloat(
              this.choosedPlan.price
            );
            this.$store.state.team.discountedAmount = 0;
            this.$store.state.team.legalSubscription = true;
            this.$store.state.team.teamSelected = this.teamSelected;
            this.$router.push(
              `/subscription/payment/${this.teamSelected.name}/${this.teamSelected.id}/${this.choosedPlan.id}?name=${this.choosedPlan.title}`
            );
          }
        }
      } else {
        this.$error({
          title: "No Subscription Plan is Selected!",
          content: "You have to select a subscription plan",
          centered: true,
        });
        return;
      }
    },
    handleCancel() {
      this.freeModal = false;
    },
    handleOkFreeModal() {
      if (
        this.choosedPlan.promo_code &&
        this.cupon == this.choosedPlan.promo_code
      ) {
        this.$store.state.team.subscriptionAmount =
          this.amount - this.savedAmount;
        this.$store.state.team.originalAmount = parseFloat(
          this.choosedPlan.price
        );
        this.$store.state.team.discountedAmount = parseFloat(
          this.choosedPlan.discount
        );
        this.$store.state.team.legalSubscription = true;
        this.$store.state.team.teamSelected = this.teamSelected;
        this.$router.push(
          `/subscription/payment/${this.teamSelected.name}/${this.teamSelected.id}/${this.choosedPlan.id}?name=${this.choosedPlan.title}`
        );
      } else {
        this.$error({
          title: "Invalid coupon",
          content: "Please try with a valid coupon",
          centered: true,
        });
      }
    },
    nextWithoutCupon() {
      this.$store.state.team.subscriptionAmount = parseFloat(
        this.choosedPlan.price
      );
      this.$store.state.team.originalAmount = parseFloat(
        this.choosedPlan.price
      );
      this.$store.state.team.discountedAmount = 0;
      this.$store.state.team.legalSubscription = true;
      this.$store.state.team.teamSelected = this.teamSelected;
      this.$router.push(
        `/subscription/payment/${this.teamSelected.name}/${this.teamSelected.id}/${this.choosedPlan.id}?name=${this.choosedPlan.title}`
      );
    },
    initialInfoModal() {
      this.$info({
          title: "Choose a Subscription Plan that Works for You",
          content: `MatrimonyAssist Subscription is Team Based. Only
          ONE member pays,
          the rest of the members use the platform for FREE of charge.`,
          center: true,
        });
    }
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";

.fles-45 {
  flex: 0 0 45%;
}
.fles-55 {
  flex: 0 0 55%;
}
  
.main-content-wrapper {
  .main-content {
    width: 100%;
    margin-top: 15px;
    //		margin-left: 250px;
    .section-header {
      .heading {
        font-weight: 800;
        color: $color-primary;
      }
    }
    .subscription-details {
      margin: 15px;
      .custom-card {
        height: 370px;
        background-color: $color-primary;
        border-radius: 5px;
      }
      .card-1 {
        .div-1 {
          background-color: $color-brand;
          height: 70px;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;

          h3 {
            color: white;
            font-weight: 800;
          }
        }
        .div-2 {
          background-color: white;
          height: 220px;
          padding-top: 10px;
          .duration {
            border: 1px solid white;
            background-color: white;
            color: black;
            font-weight: 400;
            padding: 5px;
            text-align: center;
            cursor: pointer;
            margin-bottom: 0 !important;
          }
          .selected {
            background-color: rgb(180, 61, 151);
            color: white;
          }
        }
        .div-3 {
          color: white;
          padding: 10px;
          p {
            font-size: 10px;
            font-weight: 400;
          }
        }
      }

      .card-2 {
        .div-2 {
          height: 120px;
          text-align: center;
          h3 {
            font-size: 50px;
            color: white;
          }
          p {
            margin-top: -20px;
            color: white;
          }
        }
        .div-3 {
          padding: 10px;
          p {
            font-size: 12px;
            color: white;
            text-align: justify;
          }
        }
      }

      .card-3 {
        height: 330px;

        h1 {
          text-align: center;
          font-size: 30px;
          color: white;
        }

        .form-group {
          .custom-select {
            font-size: 18px;
            width: auto;
            height: 50px;
            border-radius: 20px !important;
            background: #e6e6e6 url("~@/assets/select-arrow.png") no-repeat;
            background-position: right 2px center;
            background-color: rgb(219, 213, 248);
          }
        }

        .team-details-heading {
          margin-top: 10px;
          font-size: 14px;
          background-color: white;
        }
        .team-details {
          span {
            color: white;
          }
        }
        .team-sub-details-heading {
          margin-top: 10px;
          font-size: 14px;
          background-color: white;
        }
        .sub-details {
          font-size: 12px;
          color: white;
          margin-top: -5px;
          padding-left: 10px;
          padding-right: 10px;
        }
        .btn-payment {
          margin-top: 3px;
        }
      }
    }
  }
}
.background-design {
  //background-image: linear-gradient(
  //  to right,
  //  #eb5e94,
  //  #eb5e94,
  //  #bf47a1,
  //  #962a7b
  //);
  background-image: linear-gradient(
    to right top,
    #522e8e,
    #602d8d,
    #6e2b8c,
    #7a2a8a,
    #852888,
    #912787,
    #9d2585,
    #a82483,
    #b72181,
    #c51f7e,
    #d31f7b,
    #e02076
  );
  padding-top: 10px;
}
.background-design-cardfooter {
  //background-image: linear-gradient(to right, #8859a7, #6159a7);
  margin-top: -1px;
}

.background-design-middle {
  //background-image: linear-gradient(
  //  to top right,
  //  #6159a7,
  //  #a459a7,
  //  #ca56ad,
  //  #eb5e94
  //);
  background-image: linear-gradient(
    to right top,
    #522e8e,
    #602d8d,
    #6e2b8c,
    #7a2a8a,
    #852888,
    #912787,
    #9d2585,
    #a82483,
    #b72181,
    #c51f7e,
    #d31f7b,
    #e02076
  );
  margin-top: -1px;
}

.background-design-rightcard {
  //background-image: linear-gradient(to bottom, #6159a7, #ca56ad, #eb5e94);
  background-image: linear-gradient(
    to right top,
    #522e8e,
    #602d8d,
    #6e2b8c,
    #7a2a8a,
    #852888,
    #912787,
    #9d2585,
    #a82483,
    #b72181,
    #c51f7e,
    #d31f7b,
    #e02076
  );
  margin-top: -1px;
}

.br-20 {
  border-radius: 20px;
}
.br-10 {
  border-radius: 10px;
}
.br-top-20 {
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
.br-top-10 {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.div-3 {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 8px;
}
.icon-check {
  margin-top: 4px;
  margin-right: 8px;
}
.text-transparent {
  color: transparent;
}
.selected {
  color: white;
}
.bg-brand-gradient {
  //background-image: linear-gradient(
  //  to right,
  //  #eb5e94,
  //  #eb5e94,
  //  #bf47a1,
  //  #962a7b
  //);
  background-image: linear-gradient(
    to right top,
    #522e8e,
    #602d8d,
    #6e2b8c,
    #7a2a8a,
    #852888,
    #912787,
    #9d2585,
    #a82483,
    #b72181,
    #c51f7e,
    #d31f7b,
    #e02076
  ) !important;
}

.bg-brand-gradient-opacity {
  background-image: linear-gradient(to right top, #522e8e80, #602d8d80, #6e2b8c80, #7a2a8a80, #85288880, #91278780, #9d258580, #a8248380, #b7218180, #c51f7e80, #d31f7b80, #e0207680);
}
.bg-primary-gradient {
  //background-image: linear-gradient(
  //  to top right,
  //  #6159a7,
  //  #a459a7,
  //  #ca56ad,
  //  #eb5e94
  //);
  background-image: linear-gradient(
    to right top,
    #522e8e,
    #602d8d,
    #6e2b8c,
    #7a2a8a,
    #852888,
    #912787,
    #9d2585,
    #a82483,
    #b72181,
    #c51f7e,
    #d31f7b,
    #e02076
  );
}
.price {
  font-size: 54px;
}
.price-text {
  margin-top: -28px;
  font-size: 20px;
}
.rotate-180 {
  transform: rotate(180deg);
}
.btn-payment {
  width: 90% !important; 
  margin: 1rem auto;   
  position: absolute; 
  bottom: 1rem; 
  right: 5%;
  height: 50px;
  background: #fff;
  border: 1px solid $color-success;
  border-radius: 30px;
  color: $color-success;
  font-size: 1.2rem;

  &:hover {
    background-color: $color-success !important;
    color: #fff !important;
  }
}
.price-tag {
  font-size: 24px;
  background: #fff;
  font-weight: 500;
  text-decoration: line-through;
  text-align: center;
  width: 280px;
  margin: 10px auto;
}
.heading {
  font-size: 20px;
}
.sub-heading {
  font-size: 12px;
  @media (min-width: 768px) {
    font-size: 14px;
  }
}
.mobile-block {
  display: none;
}
.buttons-position {
  top: -24px;
  left: 15px;
  //z-index: 9;
  width: 90%;
}
.btn-payment {
  margin-top: 30px;
}
.height-1 {
  //height: 450px;
  height: calc(100vh - 92px);
}
.height-2 {
  //height: 510px;
  height: calc(95vh - 90px);
}
.btn-back {
  width: 50%;
}
.btn-next {
  width: 50%;
}
.heading-text {
  margin-top: 12px;
}
.mobile-section {
  margin-top: 50px;
}
.item-duration:hover {
  background-image: linear-gradient(
    to right top,
    #522e8e,
    #602d8d,
    #6e2b8c,
    #7a2a8a,
    #852888,
    #912787,
    #9d2585,
    #a82483,
    #b72181,
    #c51f7e,
    #d31f7b,
    #e02076
  );
  .duration {
    color: #ffffff;
  }
}
.free-duration {
  background: #498ba133;
}
.free-duration:hover {
  background: $bg-brand !important;
  .duration {
    color: #ffffff;
  }
}

.subscription-details {
  padding: 12px 15px !important;
  margin: 0px !important;
  height: 100%;

  .row {
    margin: 0px !important;

    .col-12, .col-md-4, .col-xl-4 {
      padding: 0px 5px !important;
    }
  }
}
.subscription-details-mobile {
  padding: 12px 8px !important;
  margin: 0px !important;
  height: 100%;

  .row {
    margin: 0px !important;

    .col-12, .col-md-4, col-xl-4 {
      padding: 0px 0px !important;
    }
  }
}
@media (min-width: 768px) {
  .desktop-py {
    padding: 16px 0 0 0;
  }
  .mobile-view {
    display: none;
  }
  .heading {
    font-size: 30px;
  }
  .mobile-block {
    display: block;
  }
  .buttons-position {
    display: none;
  }
  //.height-1 {
  //  height: 665px;
  //}
  //.height-2 {
  //  height: 600px;
  //}
  .heading-text {
    margin-top: 2rem;
  }
  .mobile-section {
    margin-top: 0;
  }
  .row {
    margin: -12px !important;
  }
}

@media (max-width: 768px) {

  //.height-2 {
  //  //height: 450px;
  //  height: 85vh;
  //}
  .desktop-view {
    display: none;
  }
}

@media (max-height: 568px) {
  .height-1, .height-2 {
    height: 78vh !important;
  }
}

@media (min-width: 992px) {
  .btn-payment {
    margin-top: 0.5rem;
  }
  //.height-1 {
  //  //height: 555px;
  //  height: calc(95vh - 70px);
  //}
  //.height-2 {
  //  //height: 510px;
  //  height: calc(95vh - 70px);
  //}
}

@media (min-width: 1300px) {
  .btn-payment {
    margin-top: 0.5rem;
  }
  //.height-1 {
  //  //height: 520px;
  //  height: calc(95vh - 70px);
  //}
  //.height-2 {
  //  //height: 475px;
  //  height: calc(95vh - 70px);
  //}
}

.duration {
  margin-bottom: 0 !important;
}
.custom-select {
  height: 50px;
  font-weight: bolder;
  text-align: center;
  border: none !important;
}
.custom-select:focus {
  border: none !important;
  outline: none !important;
  box-shadow: none;
}

.shadow-border {
  box-shadow: none !important;
  border: 2px solid #dddddd78 !important;
  border-radius: 10px !important;
}

.sub-back-btn {
  width: 30% !important;
  .v-btn {
    background-color: #fff !important;
    color: #6159a7 !important;
    border: 1px solid #6159a7 !important;
    box-shadow: none !important;
  }
} 
.sub-cont-btn {
  width: 70% !important;
}
.mobile-view {
  .v-btn {
    font-size: 1rem !important;
  }
}
</style>
