<template>
  <div class="candidate-registration font-poppins">
    <Header />
    <Loader v-if="isLoading" :isLoading="isLoading" />
    <div v-else class="steps ma-steps pt-8">
      <!-- <div class="steper-header text-center heading-text px-3 d-mb-none">
        <h4>About you and the companion you are looking for</h4>
        <p>To get the best results please complete the questions fully</p>
      </div> -->

      <div class="help-dialog">
        <v-dialog
          transition="dialog-bottom-transition"
          max-width="700"
          class="d-flex justify-center mb-4 mt-8"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-icon :size="getWindowWidth() <= 400 ? '25px' : '30px'"  v-bind="attrs" v-on="on" class="question-mark" color="#6159a7">
              mdi-help-circle
            </v-icon>
          </template>
          <template v-slot:default="dialog">
            <v-card class="relative">
              <div class="w-100 flex justify-content-end">
                <v-icon 
                  class="m-2"
                  @click="dialog.value = false;"
                >
                  mdi-close
                </v-icon>
              </div>
              
              <v-card-text class="d-flex flex-column align-center"> <!-- style="min-height:350px" -->
                <div class="d-flex justify-center w-100">
  
                  <v-container v-if="!playTutorial" class="d-flex justify-center">
                    <v-img
                      max-height="150"
                      max-width="150"
                      :src="imageSrc"
                      position="cover"
                    ></v-img>
                  </v-container>
                </div>
                <div v-if="!playTutorial" class="text-center my-2"><h5>{{ contentTitle }}</h5></div>
                <div v-if="!playTutorial" class="text-center">{{ contentGuidance }}</div>
                <iframe v-if="playTutorial && dialog.value" style="z-index:5;" width="560" height="315" src=" https://www.youtube-nocookie.com/embed/R1ZFSHX_1bQ?rel=0 " title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <div style="position: absolute; top: 40%;"><span v-if="playTutorial" class="ant-spin-loader"><a-spin /></span></div>
              </v-card-text>
              
              <!-- <v-divider></v-divider> -->
              <div class="w-75 text-center mx-auto"><hr class="divider" style="margin: 14px auto;"></div>
  
              <v-card-actions class="justify-content-between">
                <div>
                  <a-button
                    rounded="true"
                    type="danger"
                    color="#E51F76 px-2"
                    @click="playTutorial = !playTutorial"
                  >
                    <span v-if="!playTutorial">
                      <span class="px-2" v-if="getWindowWidth() <= 435"> <a-icon type="play-circle" /> </span> 
                      <span v-else>Watch tutorial</span> 
                    </span>
                    <span v-else>
                      <span class="px-2" v-if="getWindowWidth() <= 435"> <a-icon type="close" /> </span> 
                      <span v-else>Close tutorial</span>
                    </span>
                  </a-button>
                  <v-card-actions></v-card-actions>
                </div>
                
                <div>
                  <a-button
                    v-if="currentGuide > 0 && currentGuide <= 5 "
                    @click="changeContentPrev"
                    type="primary"
                    rounded="true"
                    color="#6159a7"
                    class="mr-2"
                  >
                    <span class="px-2" v-if="getWindowWidth() <= 435"> <a-icon class="prev-icon-color" type="caret-left" /> </span> 
                    <span v-else>Prev</span> 
                  </a-button>
                  <a-button
                    v-if="currentGuide <= 4"
                    @click="changeContent"
                    type="primary"
                    rounded="true"
                    color="#6159a7"
                  >
                    <span class="px-2" v-if="getWindowWidth() <= 435"> <a-icon class="prev-icon-color" type="caret-right" /> </span> 
                    <span v-else>Next</span> 
                  </a-button>
    
                  <a-button
                    v-if="currentGuide === 5"
                    @click="goToFirstGuide(); dialog.value=false;"
                    type="primary"
                    rounded="true"
                    color="#3ab549"
                  >
                    Finish
                  </a-button>
                  <v-card-actions></v-card-actions>
                </div>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </div>


      <!-- <VueFixedHeader
        @change="updateFixedStatus"
        :threshold="propsData.threshold"
        :headerClass="propsData.headerClass"
        :fixedClass="propsData.fixedClass"
        :hideScrollUp="propsData.hideScrollUp"
      > -->
        <div class="step-bar">
          <a-steps
            class="desktop-block"
            :current="current"
            labelPlacement="vertical"
          >
            <a-step
              v-for="(item, index) in steps"
              @click="onStep(index); updateFixedStatus"
              :key="item.title"
              :title="item.title"
            />
          </a-steps>
          <div class="mobile-header">
            <h4 class="mobile-step-text color-primary text-center fw-bold">
              {{ mobileSteps[current] }}
            </h4>
            <div class="mobile-block px-3">
              <div
                @click="onStep(0)"
                class="mobile-step"
                :class="{ 'bg-primary': current >= 0 }"
              ></div>
              <div
                @click="onStep(1)"
                class="mobile-step ml-2"
                :class="{ 'bg-primary': current >= 1 }"
              ></div>
              <div
                @click="onStep(2)"
                class="mobile-step ml-2"
                :class="{ 'bg-primary': current >= 2 }"
              ></div>
              <div
                @click="onStep(3)"
                class="mobile-step ml-2"
                :class="{ 'bg-primary': current >= 3 }"
              ></div>
              <div
                @click="onStep(4)"
                class="mobile-step ml-2"
                :class="{ 'bg-primary': current >= 4 }"
              ></div>
            </div>
          </div>
        </div>
      <!-- </VueFixedHeader> -->
      <div class="steps-content" v-if="current == 0">
        <PreferenceTwo
          :candidateDetails="candidateDetails"
          :preferenceData="candidateDetails.preferenceData"
          @valueChange="onDataChange($event)"
          ref="PreferenceTwo"
        />
      </div>
      <div class="steps-content" v-if="current == 1">
        <PersonalInfoTwo
          :personalInformation="candidateDetails.personalInformation"
          :candidateDetails="candidateDetails"
          @valueChange="onDataChange($event)"
          ref="personalInfoTwo"
        />
      </div>

      <div class="steps-content" v-if="current == 2">
        <FamilyInfoTwo
          @valueChange="onDataChange($event)"
          :familyInformation="candidateDetails.familyInformation"
          :candidateDetails="candidateDetails"
          ref="familyInfoTwo"
        />
      </div>
      <div class="steps-content" v-if="current == 3">
        <UploadProfile
          @valueChange="onDataChange($event)"
          @disableNextBtn="enabledNextBtn = false"
          @turnOnBtnLoader="nextBtnLoader=true"
          @turnOffBtnLoader="nextBtnLoader=false"
          :imageModel="candidateDetails.imageModel"
        />
      </div>
      <div class="steps-content" v-if="current == 4">
        <Verification
          v-if="showAgreement"
          @cancel="cancelVerification"
          @valueChange="onDataChange($event)"
          @disableNextBtn="enabledNextBtn = false"
          @turnOnBtnLoader="nextBtnLoader=true"
          @turnOffBtnLoader="nextBtnLoader=false"
          :verification="candidateDetails.verification"
          :candidateDetails="candidateDetails"
          ref="Verification"
        />

        <VerificationAgreement
          @agree="onAgree($event)"
          v-if="!showAgreement"
          ref="VerificationAgreement"
        />
      </div>
      <div class="steps-content" v-if="current == 5">
        <Review
          :showAgreement="showAgreement"
          :candidateDetails="candidateDetails"
          @toggleStep="toggleStep"
        />
      </div>

      <div class="steps-action text-right pb-5 clearfix bottom-padding">
        <!-- :class="{ disabled: !enabledNextBtn }"
          :disabled="!enabledNextBtn" -->
        <a-button
          :class="{
            disabled: !enabledNextBtn,
            'next-btn-pos': current !== 0,
            'first-next-btn-pos': current === 0,
          }"
          :disabled="!enabledNextBtn"
          v-if="current < steps.length - 1"
          shape="round"
          type="primary"
          style="float: right"
          class="mt-3 next-btn-pos"
          @click="next"
        >
          <!--          :style="{'margin-right': current === 0 ? '-15px' : '0'}"-->
          <span v-if="!nextBtnLoader">Next</span>
          <div v-else class="spinner-border spinner-border-sm text-light" role="status"></div>
        </a-button>
        <a-button
          v-if="current == steps.length - 1"
          type="primary"
          shape="round"
          class="rev-sub-btn"
          style="float: right; margin-top: 12px; margin-right: -10px"
          @click="openDialog"
        >
          <span v-if="getWindowWidth() <= 435">Submit</span> 
          <span v-else>Review and Submit</span>
        </a-button>
        <a-button
          v-if="current > 0"
          shape="round"
          style="float: right; margin-right: 10px"
          class="mt-3"
          @click="prev"
        >
          <span v-if="getWindowWidth() <= 435"> <a-icon class="prev-icon-color" type="caret-left" /> </span> 
          <span v-else>Previous</span>
        </a-button>

        <a-button
          v-if="current <= steps.length - 1"
          shape="round"
          type="primary"
          style="float: left"
          class="mt-3"
          :class="{
            'first-save-btn': current === 0,
            'save-btn': current !== 0,
          }"
          @click="saveExit"
        >
          Save & Exit
        </a-button>
      </div>
      <br />
      <br /><br /><br /><br />
    </div>
    <ReviewAndPublishModal
      @continue="continueToDashboard"
      @submit="doneBtn"
      @cancel="cancel"
      :dialog="dialog"
    />
  </div>
</template>
<script>
// const createData = () => ({
//   threshold: 0,
//   headerClass: "vue-fixed-header",
//   fixedClass: "vue-fixed-header--isFixed",
//   hideScrollUp: false,
// });
import ReviewAndPublishModal from "@/views/candidate-registration/ReviewAndPublishModal.vue";
import PreferenceTwo from "@/components/candidate-registration/preference-two.vue";
import VerificationAgreement from "@/components/candidate-registration/verification-agreement.vue";
import Verification from "@/components/candidate-registration/verification.vue";
import PersonalInfoTwo from "@/components/candidate-registration/personalinfo-two.vue";
import FamilyInfoTwo from "@/components/candidate-registration/familyinfo-two.vue";
import UploadProfile from "@/components/candidate-registration/UploadProfile.vue";
import Review from "@/components/candidate-registration/Review.vue";
import ApiService from "@/services/api.service";
import ethnicities from "@/common/ethnicities.js";
import languages from "@/common/languages.js";
import hobbies from "@/common/hobbies.js";
import foods from "@/common/foods.js";
import thankfulThings from "@/common/thankfulThings.js";
import improveMyselfThings from "@/common/improveMyselfThings.js";
// import VueFixedHeader from "vue-fixed-header";
import jwtService from "../../services/jwt.service";
import Header from "../../components/header/header.vue";
import blockRegistrationRouteAfter from "../../mixins/blockRegistrationRouteAfter.js";
export default {
  components: {
    PreferenceTwo,
    PersonalInfoTwo,
    FamilyInfoTwo,
    UploadProfile,
    Review,
    Verification,
    // VueFixedHeader,
    Header,
    ReviewAndPublishModal,
    VerificationAgreement,
  },

  mixins: [blockRegistrationRouteAfter],

  mounted() {
    this.getCandidateInitialInfo();
  },

  data() {
    return {
      currentGuide: 0,
      contentTitle: 'Take a moment to get comfortable',
      contentGuidance: 'We’d like to show you around the steps required to complete this section – it will be fast, promise!',
      imageSrc: "",
      isAgree: false,
      dialog: false,
      isLoading: false,
      showAgreement: false,
      playTutorial: false,
      fixedStatus: {
        headerIsFixed: false,
      },
      // propsData: { ...createData() },
      current: 0,
      enabledNextBtn: false,
      nextBtnLoader: false,
      candidateDetails: {
        preferenceData: null,
      },
      steps: [
        {
          title: "Your Preferences",
          content: "First-content",
        },
        {
          title: "Personal Information",
          content: "Second-content",
        },

        {
          title: "Family Information",
          content: "Last-content",
        },
        {
          title: "Image Upload",
          content: "Last-content",
        },
        {
          title: "Verification & Reference",
          content: "Last-content",
        },
        {
          title: "Review & Submit",
          content: "Last-content",
        },
      ],
      mobileSteps: [
        "Preference",
        "Personal Information",
        "Family Information",
        "Image Upload",
        "Verification & Reference",
        "Review & Submit",
      ],
    };
  },
  methods: {
    openDialog() {
      this.dialog = false;
      setTimeout(() => {
        this.dialog = true;
      });
    },
    cancel() {
      this.dialog = false;
    },

    updateFixedStatus(next) {
      this.fixedStatus.headerIsFixed = next;
    },
    cancelVerification() {
      this.showAgreement = false;
    },
    onStep(index) {
      let user = JSON.parse(localStorage.getItem("user"));
      if (index <= user.data_input_status) {
        this.current = index;
        this.checkExistData();
      }
    },
    onAgree(value) {
      this.isAgree = value;
      this.enabledNextBtn = true;
    },
    onDataChange(e) {
      switch (e.current) {
        case 0:
          this.candidateDetails.preferenceData = {
            ...e.value,
          };
          break;
        case 1:
          this.candidateDetails.personalInformation = {
            ...e.value,
          };
          break;
        case 2:
          this.candidateDetails.familyInformation = {
            ...e.value,
          };
          break;
        case 3:
          this.candidateDetails.imageModel = {
            ...e.value,
          };
          break;
        case 4:
          this.candidateDetails.verification = {
            ...this.candidateDetails.verification,
            ...e.value,
          };
          break;
      }
      this.checkExistData();
    },
    getCandidateInitialInfo: async function () {
      this.isLoading = true;
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await ApiService.get("v1/candidate/initial-info");
      if (response.status === 200) {
        this.isLoading = false;
        const details = {
          countries: response.data.data.countries,
          imageModel: {
            ...response.data.data.candidate_image,
            additionalImageSrc: response.data.data.candidate_image.other_images,
          },
          occupations: response.data.data.occupations,
          religions: response.data.data.religions,
          ethnicities: ethnicities,
          languages: languages,
          improveMyselfThings: improveMyselfThings,
          hobbies: hobbies,
          foods: foods,
          thankfulThings: thankfulThings,
          verification: {
            ...response.data.data.validation_info.verification,
            cities: [],
          },
          personalInformation: {
            contact: {
              ...this.nullToUndefined(response.data.data.personal_info.contact),
              per_current_residence_country: response.data.data.personal_info
                .contact.per_current_residence_country
                ? parseInt(
                    response.data.data.personal_info.contact
                      .per_current_residence_country
                  )
                : response.data.data.personal_info.contact
                    .per_current_residence_country,
              per_permanent_country: response.data.data.personal_info.contact
                .per_permanent_country
                ? parseInt(
                    response.data.data.personal_info.contact
                      .per_permanent_country
                  )
                : response.data.data.personal_info.contact
                    .per_permanent_country,
              per_email: user.email,
              per_county: "None",
              permanantCities: [],
              residenceCities: [],
            },
            essential: {
              ...this.nullToUndefined(
                response.data.data.personal_info.essential
              ),
              default_date: response.data.data.personal_info.essential.dob,
              per_telephone_no: 111,
            },
            general: {
              ...this.nullToUndefined(response.data.data.personal_info.general),
            },
            more_about: {
              ...this.nullToUndefined(
                response.data.data.personal_info.more_about
              ),
              per_smoker:
                response.data.data.personal_info.more_about.per_smoker == 0
                  ? undefined
                  : response.data.data.personal_info.more_about.per_smoker,
              per_language_speak: !response.data.data.personal_info.more_about
                .per_language_speak
                ? undefined
                : response.data.data.personal_info.more_about.per_language_speak.split(
                    ","
                  ),
              per_thankfull_for: !response.data.data.personal_info.more_about
                .per_thankfull_for
                ? undefined
                : response.data.data.personal_info.more_about.per_thankfull_for.split(
                    ","
                  ),
              per_things_enjoy: !response.data.data.personal_info.more_about
                .per_things_enjoy
                ? undefined
                : response.data.data.personal_info.more_about.per_things_enjoy.split(
                    ","
                  ),
              per_hobbies_interests: !response.data.data.personal_info
                .more_about.per_hobbies_interests
                ? undefined
                : response.data.data.personal_info.more_about.per_hobbies_interests.split(
                    ","
                  ),
              per_food_cuisine_like: !response.data.data.personal_info
                .more_about.per_food_cuisine_like
                ? undefined
                : response.data.data.personal_info.more_about.per_food_cuisine_like.split(
                    ","
                  ),
              per_have_children: false,
              per_children: [
                {
                  type: 1,
                  count: 1,
                  age: 10,
                },
              ],
            },
          },
          preferenceData: {
            ...this.nullToUndefined(response.data.data.user.preference),
            pre_occupation:
              typeof response.data.data.user.preference.pre_occupation ==
              "string"
                ? JSON.parse(response.data.data.user.preference.pre_occupation)
                : "",
            pre_height_min:
              response.data.data.user.preference.pre_height_min == 0 ||
              !response.data.data.user.preference.pre_height_min
                ? undefined
                : response.data.data.user.preference.pre_height_min,
            pre_height_max:
              response.data.data.user.preference.pre_height_max == 0 ||
              !response.data.data.user.preference.pre_height_max
                ? undefined
                : response.data.data.user.preference.pre_height_max,

            pre_partner_age_max:
              response.data.data.user.preference.pre_partner_age_max == 0 ||
              !response.data.data.user.preference.pre_partner_age_max
                ? undefined
                : response.data.data.user.preference.pre_partner_age_max,
            pre_partner_age_min:
              response.data.data.user.preference.pre_partner_age_min == 0 ||
              !response.data.data.user.preference.pre_partner_age_min
                ? undefined
                : response.data.data.user.preference.pre_partner_age_min,

            pre_partner_religion_id:
              response.data.data.user.preference.pre_partner_religion_id[0],
            pre_ethnicities: !response.data.data.user.preference.pre_ethnicities
              ? undefined
              : response.data.data.user.preference.pre_ethnicities.split(", "),
            pre_preferred_divorcee:
              response.data.data.user.preference.pre_preferred_divorcee == 0 ||
              !response.data.data.user.preference.pre_preferred_divorcee
                ? false
                : true,
            pre_preferred_divorcee_child:
              response.data.data.user.preference.pre_preferred_divorcee_child ==
                0 ||
              !response.data.data.user.preference.pre_preferred_divorcee_child
                ? false
                : true,
            pre_partner_comes_from: [],
            pre_disallow_preference: [],
            disAllowedCity: {
              listOne: [],
              listTwo: [],
              listThree: [],
            },
            allowedCity: {
              listOne: [],
              listTwo: [],
              listThree: [],
            },
          },
          personal: response.data.data.user.personal,
          screen_name: response.data.data.user.screen_name,
          user_id: response.data.data.user.user_id,
          familyInformation: {
            ...this.nullToUndefined(response.data.data.user.family),
          },
          first_name: response.data.data.user.first_name,
          id: response.data.data.user.id,
          last_name: response.data.data.user.last_name,
          studylevels: response.data.data.studylevels,
          review: {
            personal: {},
          },
        };
        console.log("details", details);
        this.candidateDetails = {
          ...this.candidateDetails,
          ...details,
        };
        if (
          this.candidateDetails.preferenceData &&
          this.candidateDetails.preferenceData.preferred_countries.length > 0
        ) {
          this.onChangeCountry(
            this.candidateDetails.preferenceData.preferred_countries[0],
            "listOne",
            "allowed"
          );
        }
        if (
          this.candidateDetails.preferenceData &&
          this.candidateDetails.preferenceData.bloked_countries.length > 0
        ) {
          this.onChangeCountry(
            this.candidateDetails.preferenceData.bloked_countries[0],
            "listOne",
            "disAllowed"
          );
        }
        if (
          this.candidateDetails.personalInformation &&
          this.candidateDetails.personalInformation.contact
            .per_current_residence_country > 0
        ) {
          this.onChangeCountry(
            {
              id: this.candidateDetails.personalInformation.contact
                .per_current_residence_country,
            },
            "residence",
            ""
          );
        }
        if (
          this.candidateDetails.personalInformation &&
          this.candidateDetails.personalInformation.contact
            .per_permanent_country > 0
        ) {
          this.onChangeCountry(
            {
              id: this.candidateDetails.personalInformation.contact
                .per_permanent_country,
            },
            "permanat",
            ""
          );
        }
        // if (
        //   this.candidateDetails.verification &&
        //   this.candidateDetails.verification.ver_country > 0
        // ) {
        //   this.onChangeCountry(
        //     { id: this.candidateDetails.verification.ver_country },
        //     "verification",
        //     ""
        //   );
        // }
        this.current = response.data.data.user.data_input_status;
        // this.showAgreement =
        //   response.data.data.user.is_uplaoded_doc == "1" ? true : false;
        const {
          ver_country,
          ver_document_type,
          ver_image_back,
          ver_image_front,
        } = this.candidateDetails.verification;
        this.showAgreement = Object.values({
          ver_country,
          ver_document_type,
          ver_image_back,
          ver_image_front,
        }).every((x) => x !== undefined && x !== null && x !== "");
        if (
          !this.showAgreement &&
          response.data.data.user.is_uplaoded_doc == "0"
        ) {
          this.candidateDetails.verification = {
            ...this.candidateDetails.verification,
            ver_image_back: "",
            ver_image_front: "",
          };
        }
        this.checkExistData();
      } else {
        this.isLoading = false;
      }
    },
    async saveDataInputStatus(satge) {
      let user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        user.data_input_status = satge;
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(user));
      }
       await ApiService.post(
        "v1/candidate/personal-info-status?_method=PATCH",
        {
          data_input_status: satge,
        }
      );
    },
    async onChangeCountry(e, name, action) {
      const res = await ApiService.get(`v1/utilities/cities/${e.id}`);

      if (res.status === 200) {
        switch (name) {
          case "listOne":
            action == "allowed"
              ? (this.candidateDetails.preferenceData.allowedCity.listOne = [])
              : (this.candidateDetails.preferenceData.disAllowedCity.listOne =
                  []);
            action == "allowed"
              ? this.candidateDetails.preferenceData.allowedCity.listOne.push(
                  ...res.data.data
                )
              : this.candidateDetails.preferenceData.disAllowedCity.listOne.push(
                  ...res.data.data
                );
            break;
          case "listTwo":
            action == "allowed"
              ? this.candidateDetails.preferenceData.allowedCity.listTwo.push(
                  ...res.data.data
                )
              : this.candidateDetails.preferenceData.disAllowedCity.listTwo.push(
                  ...res.data.data
                );
            break;
          case "listThree":
            action == "allowed"
              ? this.candidateDetails.preferenceData.allowedCity.listThree.push(
                  ...res.data.data
                )
              : this.candidateDetails.preferenceData.disAllowedCity.listThree.push(
                  ...res.data.data
                );
            break;
          case "residence":
            this.candidateDetails.personalInformation.contact.residenceCities.push(
              ...res.data.data
            );
            break;
          case "permanat":
            this.candidateDetails.personalInformation.contact.permanantCities.push(
              ...res.data.data
            );
            break;
          case "verification":
            this.candidateDetails.verification.cities.push(...res.data.data);
            break;
        }
      }
    },
    checkExistData() {
      let isEnabled = false;
      switch (this.current) {
        case 0:
          const {
            pre_partner_age_max,
            pre_partner_age_min,
            pre_height_max,
            pre_height_min,
            pre_partner_religion_id,
            pre_ethnicities,
            preferred_nationality,
            pre_study_level_id,
            pre_employment_status,
            pre_occupation,
            pre_preferred_divorcee,
          } = this.candidateDetails.preferenceData;
          isEnabled = Object.values({
            pre_partner_age_max,
            pre_partner_age_min,
            pre_height_max,
            pre_height_min,
            pre_partner_religion_id,
            pre_ethnicities,
            preferred_nationality,
            pre_study_level_id,
            pre_employment_status,
            pre_occupation,
            pre_preferred_divorcee,
          }).every((x) => x !== undefined && x !== null && x !== "");
          break;
        case 1:
          let {
            per_about,
            per_currently_living_with,
            per_food_cuisine_like,
            per_have_children,
            per_hobbies_interests,
            per_language_speak,
            per_marital_status,
            per_smoker,
            per_thankfull_for,
            per_things_enjoy,
            per_willing_to_relocate,
          } = this.candidateDetails.personalInformation.more_about;
          let more_about = {
            per_about,
            per_currently_living_with,
            per_food_cuisine_like,
            per_have_children,
            per_hobbies_interests,
            per_language_speak,
            per_marital_status,
            per_smoker,
            per_thankfull_for,
            per_things_enjoy,
            per_willing_to_relocate,
          };

          let { essential, general, contact } =
            this.candidateDetails.personalInformation;

          Object.values({
            essential,
            general,
            contact,
            more_about,
          }).forEach((ob) => {
            isEnabled = Object.values(ob).every(
              (x) => x !== undefined && x !== null && x !== ""
            );
            if (!isEnabled) return;
          });

          break;

        case 2:
          const {
            country_of_origin,
            family_info,
            father_profession,
            mother_profession,
            siblings_desc,
          } = this.candidateDetails.familyInformation;
          isEnabled = Object.values({
            country_of_origin,
            family_info,
            father_profession,
            mother_profession,
            siblings_desc,
          }).every((x) => x !== undefined && x !== null && x !== "");
          break;
        case 3:
          const { avatar_image_url, main_image_url } =
            this.candidateDetails.imageModel;
          isEnabled = Object.values({ avatar_image_url, main_image_url }).every(
            (x) => x !== undefined && x !== null && x !== ""
          );
          break;
        case 4:
          const {
            ver_country,
            ver_document_type,
            ver_image_back,
            ver_image_front,
          } = this.candidateDetails.verification;
          isEnabled = Object.values({
            ver_country,
            ver_document_type,
            ver_image_back,
            ver_image_front,
          }).every((x) => x !== undefined && x !== null && x !== "");
          break;
      }

      this.enabledNextBtn = isEnabled;
    },

    nullToUndefined(object) {
      Object.keys(object).forEach(function (k) {
        if (object[k] === null || object[k] === 0) {
          object[k] = undefined;
        }
      });
      return object;
    },
    saveExit() {
      jwtService.destroyTokenAndUser();
      this.$router.push("/login");
    },
    doneBtn() {
      this.saveCandidateUploadDoc();
      this.saveDataInputStatus(6);
    },
    continueToDashboard() {
      this.dialog = false;
      this.$router.push("/manageteam");
    },
    toggleStep(step) {
      this.current = step;
      this.checkExistData();
    },

    changeContentPrev() {
       switch (this.currentGuide) {
        case 1:
          this.imageSrc = "";
          this.contentTitle = 'Take a moment to get comfortable';
          this.contentGuidance = 'We’d like to show you around the steps required to complete this section – it will be fast, promise!';
          this.currentGuide = 0;
          break;
        case 2:
          this.imageSrc = require('@/assets/help_guide_pics/Complete_Your_Profile.svg');
          this.contentTitle = 'Complete Your Profile';
          this.contentGuidance = 'More information you provide, higher the chance to appear on the search result.';
          this.currentGuide = 1;
          break;
        case 3:
          this.imageSrc = require('@/assets/help_guide_pics/Upload_Images.svg');
          this.contentTitle = 'Upload Images';
          this.contentGuidance = 'You need one avatar, one main and one additional image. Use Image Share Setting to give permission who can see your images.';
          this.currentGuide = 2;
          break;
        case 4:
          this.imageSrc = require('@/assets/help_guide_pics/Verify_your_ID.svg');
          this.contentTitle = 'Verify your ID';
          this.contentGuidance = 'In MatrimonyAssist all candidates must be verified. You can upload your verification documents while completing your profile or you can do it later from user dashboard';
          this.currentGuide = 3;
          break; 
        case 5:
          this.imageSrc = require('@/assets/help_guide_pics/Review_and_Submit.svg');
          this.contentTitle = 'Review and Submit';
          this.contentGuidance = 'Please check all the information you provided on the form are correct. Once you are happy, only then press the submit button to complete your registration.';
          this.currentGuide = 4;
          break;
       }
    },

    changeContent() {
      this.currentGuide = this.currentGuide + 1;

      switch (this.currentGuide) {
        case 1:
          this.imageSrc = require('@/assets/help_guide_pics/Complete_Your_Profile.svg');
          this.contentTitle = 'Complete Your Profile';
          this.contentGuidance = 'More information you provide, higher the chance to appear on the search result.';
          break;
      
        case 2:
          this.imageSrc = require('@/assets/help_guide_pics/Upload_Images.svg');
          this.contentTitle = 'Upload Images';
          this.contentGuidance = 'You need one avatar, one main and one additional image. Use Image Share Setting to give permission who can see your images.';
          break; 
        case 3:
          this.imageSrc = require('@/assets/help_guide_pics/Verify_your_ID.svg');
          this.contentTitle = 'Verify your ID';
          this.contentGuidance = 'In MatrimonyAssist all candidates must be verified. You can upload your verification documents while completing your profile or you can do it later from user dashboard';
          break;  
        case 4:
          this.imageSrc = require('@/assets/help_guide_pics/Review_and_Submit.svg');
          this.contentTitle = 'Review and Submit';
          this.contentGuidance = 'Please check all the information you provided on the form are correct. Once you are happy, only then press the submit button to complete your registration.';
          break;
        case 5:
          this.imageSrc = require('@/assets/help_guide_pics/Shortlist_and_connect_with_prospect’s_team.svg');
          this.contentTitle = 'What happens next?';
          this.contentGuidance = '\u2713 Wait for the approval of your registration. \u2713 You’ll receive access to a user dashboard to create or join a team and pay subscription';
          break;
        default:
          this.imageSrc = "";
          this.contentTitle = 'Take a moment to get comfortable';
          this.contentGuidance = 'We’d like to show you around the steps required to complete this section – it will be fast, promise!';
          this.currentGuide = 0;
          break;
      }
    },

    goToFirstGuide() {
      this.currentGuide = 0;
      this.imageSrc = "";
      this.contentTitle = 'Take a moment to get comfortable';
      this.contentGuidance = 'We’d like to show you around the steps required to complete this section – it will be fast, promise!';
    },

    async saveCandidateUploadDoc() {
      const {
        ver_country,
        ver_document_type,
        ver_image_back,
        ver_image_front,
      } = this.candidateDetails.verification;
      const isComplete = Object.values({
        ver_country,
        ver_document_type,
        ver_image_back,
        ver_image_front,
      }).every((x) => x !== undefined && x !== null && x !== "");
      let user = JSON.parse(localStorage.getItem("user"));
      const data = {
        id: user.id,
        is_uplaoded_doc: isComplete ? "1" : "0",
      };
      await this.$store
        .dispatch("saveCandidateUploadDoc", data)
        .then(() => {
          user.is_uplaoded_doc = isComplete ? "1" : "0";
          localStorage.setItem(JSON.stringify(user));
          this.$emit("valueChange", true);
        })
        .catch(() => {});
    },
    async next() {
      switch (this.current) {
        case 0: {
          this.current++;
          break;
        }
        case 1: {
          this.current++;
          break;
        }
        case 2: {
          this.current++;
          break;
        }
        case 3: {
          this.current++;
          break;
        }
        case 4: {
          if (this.isAgree) {
            this.showAgreement = true;
            this.isAgree = false;
          } else {
            this.current++;
          }
          break;
        }
        default: {
          this.current = 0;
        }
      }
      this.checkExistData();
      let user = JSON.parse(localStorage.getItem("user"));
      if (this.current > user.data_input_status) {
        this.saveDataInputStatus(this.current);
      }
    },
    prev() {
      this.current--;
      this.checkExistData();
    },
    getWindowWidth() {
      return window.innerWidth;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.candidate-registration {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .step-bar {
    margin: 0;
    padding: 0;
    z-index: 9;
  }
  header {
    text-align: center;
    height: 100px;
    width: 100%;
    margin: 0;
    padding: 0;
    background-color: $bg-secondary;

    @media (max-width: 768px) {
      width: 105%;
    }

    @media (max-width: 700px) {
      width: 120%;
    }
    @media (max-width: 620px) {
      width: 130%;
    }
    @media (max-width: 540px) {
      width: 148%;
    }
    @media (max-width: 414px) {
      width: 195%;
    }

    @media (max-width: 375px) {
      width: 214%;
    }
    @media (max-width: 360px) {
      width: 223%;
    }
    @media (max-width: 320px) {
      width: 250%;
    }
    @media (max-width: 280px) {
      width: 286%;
    }

    img {
      margin-top: 10px;
      height: 80px;
    }
  }
  .header-text {
    width: 100%;
  }
  .heading-text {
    margin-top: 20px;
    color: $color-brand;
    h4,
    h6 {
      font-weight: bold;
      color: $color-brand;
    }
    h4 {
      font-size: 18px;
      @media (min-width: 992px) {
        font-size: 24px;
      }
    }
    h6 {
      font-size: 14px;
      @media (min-width: 992px) {
        font-size: 20px;
      }
    }
  }
}

.help-dialog {
  position: fixed;
  bottom: 0;
  right: 0;
  // margin-right: 4rem;
  z-index: 15;

  .question-mark {
    right: 0.3em;
    top: 1.8rem;
    box-shadow: 0 0 4px 1.3px rgb(0 0 0 / 30%);
    border-radius: 50%;
  }
}

.divider {
  border-top: 1px solid rgb(0, 0, 0, 0.06);
}

.step-bar.vue-fixed-header--isFixed {
  position: fixed;
  top: 0px;
  z-index: 1000;
  width: 100%;
  padding: 0;
  background: #d4e0eb;
  border-radius: 14px;
  padding-bottom: 8px !important;
  margin-top: 20px;
}
.bottom-padding {
  padding: 0 2rem;
  
  .prev-icon-color {
    color: $color-secondary !important;
  }
  @media(max-width: 992px){
      margin-bottom: 2rem;
  }
}
.mobile-step {
  background-color: #b7b7b7;
  border-radius: 20px;
  width: 20%;
  height: 20px;
}
.desktop-block {
  display: none;
}
.mobile-block {
  display: flex;
}
.mobile-header {
  display: block;
  padding: 10px 0;
}
.mobile-step-text {
  font-size: 18px;
}
@media (min-width: 768px) {
  .bottom-padding {
    padding: 1rem;
  }
  .desktop-block {
    display: flex;
  }
  .mobile-block {
    display: none;
  }
  .mobile-header {
    display: none;
  }
  .step-bar.vue-fixed-header--isFixed {
    // top: 15px;
    padding-top: 20px !important;
  }
}
@media (min-width: 992px) {
  .step-bar.vue-fixed-header--isFixed {
    width: 800px;
  }
}
.ma-steps {
  margin-top: 30px;
  @media (min-width: 992px) {
    margin-top: 0;
  }
}
.d-mb-none {
  display: none;
  @media (min-width: 992px) {
    display: block;
  }
}
.next-btn-pos {
  margin-right: -16px;
  @media (min-width: 992px) {
    margin-right: 0;
  }
}
.first-next-btn-pos {
  margin-right: -16px;
}
.first-save-btn {
  margin-left: -15px;
}
.save-btn {
  margin-left: -16px;
  @media (min-width: 992px) {
    margin-left: 0;
  }
}
.rev-sub-btn {
  color: #fff;
  background-color: $color-success;
  border: 1px solid $border-success;
  border-radius: 20px;
  &:hover,
  &:active {
      background-color: $color-white;
      border: 1px solid $border-success;
      // opacity: 0.9;
      color: $color-success;
  }
}
.anticon {
  vertical-align: middle !important;
}


</style>
