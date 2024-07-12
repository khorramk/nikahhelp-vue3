<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12">
        <Loader v-if="isLoading" :isLoading="isLoading" />
        <div v-else>
          <ProfileBanner
            :name="candidateData.first_name + ' ' + candidateData.last_name"
            :image="
              candidateData.personal.per_main_image_url
                ? candidateData.personal.per_main_image_url + `?token=${token}`
                : avatarSrc
            "
          />
          <v-container fluid>
            <v-row>
              <v-col cols="12 px-0">
                <div class="d-flex justify-content-between align-items-center buttons-div">
                  <OutlinedButton
                    class="mobile-margin w-auto buttons-lg"
                    :name="copyProfileText"
                    customEvent="onClickCopyText"
                    @onClickCopyText="onClickCopyText"
                  />
                  <OutlinedButton
                    class="mobile-margin w-auto buttons-lg"
                    name="Team Info"
                    customEvent="onClickTeamDetail"
                    @onClickTeamDetail="onClickTeamDetail"
                  />
                  <ButtonComponent
								    class="mobile-margin"
                    iconHeight="14px"
                    :isSmall="true"
                    title="Gallery"
                    :icon="'@/assets/icon/gallery.svg'"
                    customEvent="openGallery"
                    :isBlock="true"
                    :responsive="false"
                    @onClickButton="onClickButton"
                  />
                  <ButtonComponent
                    class="mobile-margin"
                    iconHeight="14px"
                    :isSmall="true"
                    title="Edit Profile"
                    :icon="'@/assets/icon/edit_icon.svg'"
                    customEvent="editProfile"
                    :isBlock="true"
                    :responsive="false"
                    @onClickButton="onClickButton"
                  />
                  <ButtonComponent
                    class="mobile-margin"
                    iconHeight="14px"
                    :isSmall="true"
                    title="View as public"
                    :icon="'@/assets/icon/visibility_icon.svg'"
                    customEvent="viewAsPublic"
                    :isBlock="true"
                    :responsive="false"
                    @onClickButton="onClickButton"
                  />
                  <OutlinedButton
                    class="mobile-margin w-auto buttons-md"
                    :name="copyProfileText"
                    customEvent="onClickCopyText"
                    @onClickCopyText="onClickCopyText"
                  />
                  <OutlinedButton
                    class="mobile-margin w-auto buttons-md team-info-sm"
                    name="Team Info"
                    customEvent="onClickTeamDetail"
                    @onClickTeamDetail="onClickTeamDetail"
                  />

                  <div class="text-center custom-divider mb-2"><hr style="width: 250px;"></div>

                  <div class="d-flex mobile-margin">
                    <a
                      class="navigate w-100"
                      href="#family-information"
                    >
                      <div class="navigate-name text-center ">
                        Family Info
                        <img src="/assets/icon/navigate-bottom.svg" alt="">
                      </div>
                    </a>
                  </div>

                  <div class="d-flex mobile-margin">
                    <a
                      class="navigate w-100"
                      href="#my-partner-pref"
                    >
                      <div class="navigate-name text-center">
                        My Pref
                        <img src="/assets/icon/navigate-bottom.svg" alt="">
                      </div>
                    </a>
                  </div>

                </div>
              </v-col>
              <!-- <v-col>
                    <ButtonComponent
                      iconHeight="14px"
                      :isSmall="true"
                      title="Message"
                      icon="/assets/icon/message-secondary.svg"
                      customEvent=""
                      :isBlock="false"
                      @onClickButton="onClickButton"
                    />
                  </v-col> -->
            </v-row>
          </v-container>
          <v-container fluid>
            <v-row>
              <v-col cols="12" class="px-0">
                <fieldset class="">
                  <legend class="ml-8 px-1">
                    <span>Personal Information</span>
                  </legend>
                  <v-container fluid class="pt-0 px-5 info-div">
                    <v-row dense>
                      <v-col class="pt-1" cols="12">
                        <PersonalInformationTable :data="candidateData" />
                      </v-col>
                      <v-col
                        ref="family-information"
                        class="pt-1"
                        cols="12"
                      >
                        <MoreAbout :data="candidateData" l/>
                      </v-col>
                      <v-col class="pt-1" cols="12">
                        <CardInfo
                          title="More about me"
                          :detail="candidateData.personal.per_about"
                          class="mt-2"
                        />
                      </v-col>
                      <v-col class="pt-1" cols="12">
                        <CardInfo
                          :showDownloadBtn="true"
                          title="Additional Information"
                          :detail="
                            candidateData.more_about.per_additional_info_text
                          "
                          class="mt-2"
                          @onClickDownload="onClickDownload"
                        />
                      </v-col>
                      <v-col class="pt-1 mb-5" cols="12" md="6">
                        <CardInfo
                          title="I'm thankful for"
                          class="mt-2"
                          :detail="candidateData.personal.per_thankfull_for"
                        />
                      </v-col>
                      <v-col class="pt-1 mb-5" cols="12" md="6">
                        <CardInfo
                          title="How I improve myself?"
                          class="mt-2"
                          :detail="getHowIImprove()"
                        />
                      </v-col>
                    </v-row>
                  </v-container>
                </fieldset>
                <fieldset id="family-information" class="-mt-15">
                  <legend class="ml-8 bg-white px-1">
                    <span>Family Information</span>
                  </legend>
                  <v-container fluid class="pt-0 px-5 info-div">
                    <v-row dense>
                      <v-col class="pt-1 mb-5" cols="12">
                        <FamilyInfoTable :data="candidateData" />
                      </v-col>
                      <v-col class="pt-1 mb-5" cols="12">
                        <CardInfo :detail="candidateData.family.family_info" />
                      </v-col>
                    </v-row>
                  </v-container>
                </fieldset>
                <fieldset class="-mt-15">
                  <legend id="my-partner-pref" class="ml-8 bg-white px-1">
                    <span>My partner preference</span>
                  </legend>
                  <v-container fluid class="pt-0 px-5 info-div">
                    <v-row dense>
                      <v-col class="pt-1" cols="12">
                        <MyPrefTable
                          :preference="candidateData.preference"
                          :countries="
                            candidateData.preference.preferred_countries
                          "
                        />
                      </v-col>
                      <v-col class="pt-1" cols="12">
                        <CardInfo
                          title="What I'm Looking for"
                          :detail="candidateData.preference.pre_description"
                        />
                      </v-col>
                      <v-col class="pt-1" cols="12">
                        <CardInfo
                          title="Other requirements"
                          :detail="
                            candidateData.preference.pre_other_preference
                          "
                        />
                      </v-col>
                      <v-col class="pt-1" cols="12">
                        <v-card class="px-3 py-5">
                          <h5 class="text--disabled">More about preferred partner</h5>
                          <p class="text--disabled">How Important following characters are to me</p>
                          <!-- Character -->
                          <!-- <rating-component
                                  title="Strength of character from a moral point of view"
                                  :value="
                                    candidateData.preference.pre_strength_of_character_rate
                                  "
                                  :valueString="
                                    candidateData.preference
                                      .pre_strength_of_character_rate_string
                                  "
                                ></rating-component> -->
                          <!-- Looks and Appearance -->
                          <rating-component
                            title="Looks, appearance & attractiveness"
                            :value="
                              candidateData.preference
                                .pre_look_and_appearance_rate
                            "
                            :valueString="
                              candidateData.preference
                                .pre_look_and_appearance_rate_string
                            "
                          ></rating-component>
                          <!-- Religiosity/Faith -->
                          <rating-component
                            title="Religiosity / Faith"
                            :value="
                              candidateData.preference
                                .pre_religiosity_or_faith_rate
                            "
                            :valueString="
                              candidateData.preference
                                .pre_religiosity_or_faith_rate_string
                            "
                          ></rating-component>
                          <rating-component
                            title="Manners, Social skills and ethics"
                            :value="
                              candidateData.preference
                                .pre_manners_socialskill_ethics_rate
                            "
                            :valueString="
                              candidateData.preference
                                .pre_manners_socialskill_ethics_rate_string
                            "
                          ></rating-component>
                          <!-- Emotional Maturity and compatibility -->
                          <rating-component
                            title="Emotional Maturity and general intelligence"
                            :value="
                              candidateData.preference
                                .pre_emotional_maturity_rate
                            "
                            :valueString="
                              candidateData.preference
                                .pre_emotional_maturity_rate_string
                            "
                          ></rating-component>
                          <!-- Good Listener -->
                          <rating-component
                            title="Good Listener"
                            :value="
                              candidateData.preference.pre_good_listener_rate
                            "
                            :valueString="
                              candidateData.preference
                                .pre_good_listener_rate_string
                            "
                          ></rating-component>
                          <!-- Good talker -->
                          <rating-component
                            title="Good communicator"
                            :value="
                              candidateData.preference.pre_good_talker_rate
                            "
                            :valueString="
                              candidateData.preference
                                .pre_good_talker_rate_string
                            "
                          ></rating-component>
                          <!-- Willing to learn -->
                          <rating-component
                            title="Willing to learn"
                            :value="
                              candidateData.preference.pre_wiling_to_learn_rate
                            "
                            :valueString="
                              candidateData.preference
                                .pre_wiling_to_learn_rate_string
                            "
                          ></rating-component>
                          <!-- Family or Social Status-->
                          <rating-component
                            title="Family or Social Status"
                            :value="
                              candidateData.preference
                                .pre_family_social_status_rate
                            "
                            :valueString="
                              candidateData.preference
                                .pre_family_social_status_rate_string
                            "
                          ></rating-component>
                          <!-- Employment or Wealth-->
                          <rating-component
                            title="Employment and financial stability"
                            :value="
                              candidateData.preference
                                .pre_employment_wealth_rate
                            "
                            :valueString="
                              candidateData.preference
                                .pre_employment_wealth_rate_string
                            "
                          ></rating-component>
                          <!-- Education -->
                          <rating-component
                            title="Education and academic accomplishments"
                            :value="candidateData.preference.pre_education_rate"
                            :valueString="
                              candidateData.preference.pre_education_rate_string
                            "
                          ></rating-component>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-container>
                </fieldset>
              </v-col>
            </v-row>
          </v-container>
          <v-container fluid v-if="false">
            <div class="review-edit mt-5">
              <div class="review-edit-label">My Uploaded Image</div>
              <div class="row">
                <!-- <div class="col-12 col-md-6 mb-4">
                  <div class="profile-img text-center">
                    <img
                      v-viewer
                      :src="candidateData.personal.per_avatar_url"
                      alt="img"
                      class="contain"
                    />
                    <p class="text-center">Avatar</p>
                  </div>
                </div>
                <div class="col-12 col-md-6 mb-4">
                  <div class="profile-img text-center">
                    <img
                      v-viewer
                      :src="candidateData.personal.per_main_image_url"
                      alt="img"
                      class="contain"
                    />
                    <p class="text-center">Main image</p>
                  </div>
                </div> -->

                <div v-viewer="{movable: false, title: false, scalable: false, rotatable: false}" class="col-12 row my-4 ms-1">
                  <div
                    class="col-md-6 mb-sm-0 mb-2 flex flex-column align-items-center profile-img" 
                    v-for="src in [candidateData.personal.per_avatar_url, candidateData.personal.per_main_image_url]" 
                    :key="src"
                  >
                      <img
                        :src="src"
                        alt="img"
                        height="250"
                        width="200"
                        style="cursor: pointer;"
                      />
                      <p class="text-center" v-if="src == candidateData.personal.per_avatar_url">Avatar</p>
                      <p class="text-center" v-if="src == candidateData.personal.per_main_image_url">Main Image</p>
                  </div>
                </div>

                <!-- <div class="col-12 col-md-4 mb-3">
                  <div class="profile-img text-center">
                    <img
                      v-viewer
                      :src="candidateData.other_images"
                      alt="img"
                      class="contain"
                    />
                    <p class="text-center">Additional image</p>
                  </div>
                </div> -->
              </div>
            </div>
          </v-container>
          <a-modal 
						:visible="showTeamInfo" 
						:closable="true"
						title="Team Info" 
						@ok="showTeamInfo = false" 
						@cancel="showTeamInfo = false" 
						:ok-button-props="{ disabled: true }"
						:cancel-button-props="{ disabled: true }"
						v-if="profile.team"
					>
            <div class="row">
              <div class="col-12 col-md-6 d-flex justify-conent-center align-items-center">
                <v-img
                  style="border: 2px solid white; background-size: cover;"
                  class="white--text align-end rounded mx-auto"
                  max-width="150px"
                  max-height="150px"
                  :src="profile.team.logo + `?token=${token}`"
                ></v-img>
              </div>
              <div class="col-12 col-md-6">
                <span class="fw-600">Team Name</span> <br> {{ profile.team.team_name }} <br><br>
                <span class="fw-600">Team Members</span> <br> {{ profile.team.member }} <br><br>
                <span class="fw-600">Team Creation Date</span><br> {{ dateFromDateTime(profile.team.created_at) }} <br><br>
                <span class="fw-600">Team Created By</span><br> {{ profile.team.created_by.full_name }}
              </div>
            </div>

						<template slot="footer">
							<a-button key="submit" type="primary" shape="round" @click="showTeamInfo = false">
							Ok
							</a-button>
						</template>
          </a-modal>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PersonalInformationTable from "@/components/search/personal-information/PersonalInformationTable.vue";
import FamilyInfoTable from "@/components/search/personal-information/FamilyInfoTable.vue";
import MyPrefTable from "@/components/search/personal-information/MyPrefTable.vue";
import CardInfo from "@/components/atom/CardInfo.vue";
import MoreAbout from "@/components/search/personal-information/MoreAbout.vue";
import Scroller from "@/components/atom/Scroller.vue";
import ButtonComponent from "@/components/atom/ButtonComponent.vue";

import RatingComponent from "./RatingComponent.vue";
import ProfileBanner from "@/components/atom/ProfileBanner.vue";
import Footer from "@/components/auth/Footer.vue";
import ApiService from "@/services/api.service";
import OutlinedButton from "@/components/atom/OutlinedButton.vue";
import ComingSoonModal from "@/components/search/ComingSoonModal.vue";
import improveMyselfThings from "@/common/improveMyselfThings.js";
import { dateFromDateTime } from "@/common/helpers.js";
export default {
  name: "CandidateProfile",
  components: {
    PersonalInformationTable,
    FamilyInfoTable,
    MyPrefTable,
    MoreAbout,
    CardInfo,
    Scroller,
    ButtonComponent,
    RatingComponent,
    Footer,
    ProfileBanner,
    OutlinedButton,
    ComingSoonModal,
  },
  data() {
    return {
      improveMyselfThings,
      copyProfileText: "Copy Profile URL",
      images: [],
      copyIcon: "/assets/icon/copy-secondary.svg",
      checkIcon: "/assets/icon/check-circle-secondary.svg",
      copied: false,
      avatarSrc: "https://www.w3schools.com/w3images/avatar2.png",
      conversations: [],
      candidateData: null,
      isLoading: false,
      token: "",
      profile: {},
      showTeamInfo: false,
    };
  },
  created() {
    this.getCandidateData();
    this.loadUserProfile();
    this.getToken();
  },
  computed: {
    domain() {
      return window.location.origin;
    },
    studyLevel() {
      if (this.candidateData.preference.pre_study_level_id) {
        var results =
          this.$store.state.candidateInfo.study_level_options.filter(
            (level) => {
              return (
                level.id == this.candidateData.preference.pre_study_level_id
              );
            }
          );
        return results[0].name;
      } else {
        return null;
      }
    },
  },
  methods: {
    dateFromDateTime,
    getToken() {
      this.token = JSON.parse(localStorage.getItem("token"));
    },
    onClickTeamDetail() {
      if(this.profile.team !== "") {
				this.showTeamInfo = true;
			} else {
				this.$error({
					title: 'This Candidate has no team!',
					center: true,
        });
			}
      // alert('coming soon')
    },
    onClickDownload() {
      //location.href=`${this.candidateData.more_about?.per_additional_info_doc}`
      if (this.candidateData.more_about?.per_additional_info_doc == null) {
        this.$error({
          title: "Link not available!",
          center: true,
        });
      }

      if (this.candidateData.more_about?.per_additional_info_doc) {
        window.open(
          this.candidateData.more_about?.per_additional_info_doc,
          "_blank"
        );
      }
    },
    getHowIImprove() {
      let text = [];
      let items = [];
      if (this.candidateData.more_about?.per_improve_myself?.length) {
        this.candidateData.more_about.per_improve_myself.map((i) => {
          items.push(this.improveMyselfThings.find((im) => im.value === i));
        });
      }
      if (items && items.length) {
        items.map((i) => {
          text.push(i.label);
        });
      }
      return text.join(" \n ");
    },
    onClickButton(data) {
      if (data.event == "editProfile") this.$router.push("/edit_candidate");
      if (data.event == "openGallery") this.openGallery();
      if (data.event == "viewAsPublic") this.viewAsPublic();
      console.log(data, ">>>>>>>>>>>");
    },
    openGallery() {
      this.images = [];
      let images = [this.candidateData.other_images + `?token=${this.token}`, this.candidateData.personal.per_avatar_url + `?token=${this.token}`, this.candidateData.personal.per_main_image_url + `?token=${this.token}`]
      if (images && images.length > 0) {
        images.map((i) => this.images.push(i));
        this.show();
      } else {
        this.$error({
          title: "No image found",
          center: true,
        });
      }
    },
    viewAsPublic() {
      this.$router.push(`/user/profile/${this.candidateData.user_id}`);
    },
    show() {
      this.$viewerApi({
        images: this.images,
      });
    },
    onClickCopyText() {
      this.copyProfileText = "Copy successful";
      navigator.clipboard.writeText(
        this.domain + "/user/profile/" + this.candidateData.user_id
      );
      this.copied = true;
      setTimeout(() => {
        this.copyProfileText = "Copy Profile URL";
      }, 3000);
    },
    copyProfileLink() {
      // console.log(this.$refs.profileLink.innerHTML)
      navigator.clipboard.writeText(this.$refs.profileLink.innerHTML);
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 3000);
    },
    async getCandidateData() {
      try {
        this.isLoading = true;
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await ApiService.get(`v1/candidate/info/${user.id}`);
        if (response.status === 200) {
          this.isLoading = false;
          this.candidateData = {
            ...response.data.data,
            preference: {
              ...response.data.data.preference,
              pre_occupation: JSON.parse(
                response.data.data.preference.pre_occupation
              ),
            },
          };
        }
      } catch (error) {
        this.isLoading = false;
        //alert(this.error);
      }
    },
    async loadUserProfile() {
      this.isLoading = true;

      try {
        const id = JSON.parse(localStorage.getItem("user")).id;
        const payload = {
          id,
        };
        const response = await this.$store.dispatch("getUserProfile", payload);
        console.log(response);
        // this.userProfile = response.data.user;
        this.profile = response.data;
      } catch (error) {
        this.error = error.message || "Something went wrong";
        //alert(this.error);
        this.$error({
          title: "Error!",
          content: this.error,
        });
      }
      this.isLoading = false;
    },
    startConversation() {},
    returnCategoryId(type, id1, id2) {
      var category_id = "";
      if (id1 > id2) {
        category_id = type + "_" + id2.toString() + "_" + id1.toString();
      } else {
        category_id = type + "_" + id1.toString() + "_" + id2.toString();
      }
      return category_id;
    },
    returnChatTitle(id1, id2, name1, name2) {
      var title = "";
      if (id1 > id2) {
        title = name1 + " & " + name2;
      } else {
        title = name1 + " & " + name2;
      }
      return title;
    },
    checkChatCategory(categoryId) {
      console.log("inside");
      console.log(this.conversations.length);
      console.log(this.conversations);
      for (var i = 0; i < this.conversations.length; i++) {
        console.log("category given:", categoryId);
        console.log("category item:", this.conversations[i].category_id);
        if (this.conversations[i].category_id == categoryId) {
          console.log(this.conversations[i].id);
          return this.conversations[i].id;
        }
      }
      return false;
    },
  },
};
</script>

<style scoped lang="scss">
.container--fluid {
  max-width: 100% !important;
}
fieldset {
  border: 1px solid #d3d0e4;
  border-radius: 10px;
}
legend {
  display: inline;
  width: inherit;
  color: #6259a8;
  font-size: 18px;
  font-weight: 600;
}
.-mt-15 {
  margin-top: -13px;
}
.bg-white {
  background: white;
}
@import "@/styles/base/_variables.scss";
.candidate-profile {
  margin: 25px;
  width: 100%;
  margin-left: 10px;
  .profile-heading {
    // margin-left: 10px;
    //margin-bottom: 20px;
    .cover-img {
      width: 100%;
      height: 300px;
      position: relative;
      border: 1px solid white;
      box-shadow: 2px 5px 5px #aaa;
      border-radius: 5px;
      top: 0;
      left: 0;
    }
    .avatar-img {
      width: 150px;
      height: 150px;
      border: 1px solid white;
      box-shadow: 2px 5px 5px #aaa;
      position: absolute;
      top: 192px;
      left: 480px;
      border-radius: 5px;
    }
    .team-name-div {
      position: relative;
      border: 1px solid $color-primary;
      border-radius: 20px;
      .team-name-title {
        background-color: $color-primary;
        color: white;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        padding: 0 15px;
      }
      .copy-btn {
        position: absolute;
        right: 5px;
        cursor: pointer;
        transition: 0.4s;
        opacity: 0.7;
        top: 0;
        &:hover {
          opacity: 1;
        }
        img {
          height: 20px;
          padding: 2px;
        }
      }
    }
    padding-right: 15px;
    @media (max-width: 1024px) {
      max-width: calc(100% - 15px);
      border-radius: 10px;
    }
    @media (max-width: 767px) {
      max-width: none;
      padding-right: 15px;
      // padding-left: 15px;
      border-top-right-radius: 15px;
    }
  }
  @media (min-width: 1024px) {
    margin: 0 auto;
  }
  .h-100 {
    height: 100%;
  }
  .h-67 {
    height: 66%;
    margin-bottom: 2%;
    @media (max-width: 1024px) {
      height: 80%;
    }
    @media (max-width: 767px) {
      height: 80%;
    }
  }
  .h-33 {
    height: 32%;
    margin-top: 1%;
    @media (max-width: 1024px) {
      height: 20%;
      margin-bottom: 2%;
    }
    @media (max-width: 767px) {
      // margin-top: auto;
      height: 20%;
      // margin-bottom: 16px;
    }
  }

  .review {
    margin-left: 10px;
    font-size: 14px;
    h4 {
      font-size: 16px;
      opacity: 0.8;
    }
    p {
      font-size: 14px;
    }
    .review-edit {
      position: relative;
      padding: 15px;
      border: 1px solid $border-secondary;
      border-radius: 5px;
      .review-edit-label {
        position: absolute;
        color: $color-secondary;
        left: 50px;
        top: -12px;
        background: $bg-white;
        cursor: pointer;
      }
    }
    ul {
      .label-text {
        opacity: 0.8;
      }
    }
    .profile-img {
      border-radius: 5px;
      overflow: hidden;
    }
  }
  .ant-input {
    border: none;
    pointer-events: none;
  }
  textarea {
    resize: none;
  }
}

.badge-info {
  background: $bg-white !important;
  color: black;
  position: relative;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid $border-gray;
  margin-bottom: 15px;
  text-align: center;
  .badge-info-label {
    position: absolute;
    top: -12px;
    opacity: 0.7;
    left: 0;
    right: 0;
    .inner {
      background: $bg-white;
    }
  }
}
.profile-footer {
  width: 100%;
  @media (max-width: 767px) {
    display: none;
  }
}
.review-edit {
  position: relative;
  padding: 15px;
  border: 1px solid $border-secondary;
  border-radius: 5px;
  .review-edit-label {
    position: absolute;
    color: $color-secondary;
    left: 50px;
    top: -12px;
    background: $bg-white;
    cursor: pointer;
  }
}
ul {
  .label-text {
    //opacity: 0.8;
  }
}
.profile-img {
  border-radius: 5px;
  overflow: hidden;
  width: 200px;
  height: 200px;
  p {
    font-size: 16px;
    margin-top: 10px;
    font-weight: bolder;
  }
}

.buttons-div {
  .v-btn:not(.v-btn--round).v-size--small {
    min-width: 155px;
  }

  @media(max-width: 600px) {
    flex-direction: column;

    .mobile-margin {
			margin-bottom: 12px !important;
			min-width: 250px !important;
		}
    .team-info-sm {
      margin-bottom: 0px !important;
    }
  }

  @media (min-width: 601px) {
    flex-direction: row !important;
    flex-wrap: wrap !important;
    align-items: center !important;
    .mobile-margin {
      margin-bottom: 12px !important;
    }
  }

  .mobile-margin {
    min-width: 155px;
    width: 13% !important;
  }

  .custom-divider {
    margin: 3px 0px !important;
    
    @media (min-width: 600px) {
      display: none;
    }

    hr {
			border-top: 1px solid rgb(0, 0, 0, 0.3);
		}
  }
  .navigate {
    background: #6158a7;
    color: #fff;
    border-radius: 20px;
    font-size: 12px;
    min-height: 35px;
		padding: 7px 5px;
    border: 1px solid white;
    box-shadow: 0px 1px 3px #B1aaaa;
    transition: none !important;

    .navigate-name {
      color: inherit;
      transition: none !important;
      &:hover {
        color: inherit;
      }
    }

    img {
      margin-bottom: 1px;
      height: 13px;
    }
    &:hover {
      background: #fff;
      border: 1px solid #6158a7 !important;
      color: #6158a7 !important;
    }
  }
  .navigate + .navigate {
    margin-left: 0px;
  }

  @media(min-width: 1400px) {
    .v-btn:not(.v-btn--round).v-size--small {
      margin: 2px 0px;
    }
  }

  @media(min-width: 1400px) {
		.buttons-md {
		  display: none !important;
		}
	}
	@media(max-width: 1400px) {
		.buttons-lg {
		  display: none !important;
		}
	}
}
.info-div {
  .v-list-item__subtitle {
      font-family: "Roboto", sans-serif !important;
      line-height: 1.7 !important;
      letter-spacing: 0.009375em;
      font-size: 1rem !important;
      font-weight: 400 !important;
      color: rgba(0,0,0,.38) !important;
  }
  .v-list-item__title {
      font-family: "Roboto", sans-serif !important;
      line-height: 1.7 !important;
      letter-spacing: 0.009375em;
      font-size: 1rem !important;
      font-weight: 400 !important;
      color: rgba(0,0,0,.6) !important;
  }
}
.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: none !important;
  border: 2px solid #dddddd78;
}
</style>