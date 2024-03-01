<template>
  <div class="review-publish px-2">
    <fieldset v-if="candidateDetails && candidateData.personal" class="review">
      <h4 class="fw-700 px-2">Review and Publish Profile</h4>
      <p class="mb-5 px-2">
        Please check the information and details that you have provided, if you
        are happy with it please submit for approval by MatrimonyAssist Team. If
        anything needs to be changed, then you can access relevant sections by
        pressing previous button.
      </p>
      <div class="text-start">
        <!-- Personal Information -->
        <div class="review-edit mt-5">
          <div class="review-edit-label">
            Personal Information
            <img
              class="ms-2 edit-step"
              src="@/assets/icon/edit_step.svg"
              alt="icon"
              @click="$emit('toggleStep', 1)"
            />
          </div>
          <div class="row h-100">
            <div class="col-md-12 mb-3">
              <div class="card-custom shadow-default">
                <ul style="line-height: 160%">
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1">Name</span
                    ><span class="flex-70 px-2"
                      >:<span class="ml-3 text--secondary text-subtitle-1">
                        {{ candidateData.first_name }}
                        {{ candidateData.last_name }}
                      </span>
                    </span>
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1">Screen Name</span
                    ><span class="flex-70 px-2"
                      >:<span class="ml-3 text--secondary text-subtitle-1">{{
                        candidateData.screen_name
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1">Gender</span
                    ><span class="flex-70 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1">{{
                        candidateData.essential.per_gender
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1">Date of Birth</span
                    ><span class="flex-70 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1">
                        {{ candidateData.personal.dob }}
                      </span>
                    </span>
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1">Height</span
                    ><span class="flex-70 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1">
                        <span
                          v-html="
                            `${
                              heightTV.find(
                                (x) =>
                                  x.value === candidateData.personal.per_height
                              )
                                ? heightTV.find(
                                    (x) =>
                                      x.value ===
                                      candidateData.personal.per_height
                                  ).label
                                : ''
                            }`
                          "
                        >
                        </span>
                      </span>
                    </span>
                  </li>
                   <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1">Religion</span
                    ><span class="flex-70 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1">
                        
                        {{
                          candidateDetails.religions.find(
                            (x) =>
                              x.id === candidateData.personal.per_religion_id
                          )
                            ? candidateDetails.religions.find(
                                (x) =>
                                  x.id ===
                                  candidateData.personal.per_religion_id
                              ).name
                            : ""
                        }}
                      </span></span
                    >
                  </li>
                         <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1">Education</span
                    ><span class="flex-70 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1">{{
                        candidateData.essential.per_education_level
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Employment Status</span
                    ><span class="flex-70 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1">
                        {{ candidateData.personal.per_employment_status }}</span
                      ></span
                    >
                  </li>
                    <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1">Occupation</span
                    ><span class="flex-70 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1">{{
                        candidateData.essential.per_occupation
                      }}</span></span
                    >
                  </li>

                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Current Residance</span
                    ><span class="flex-70 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1"
                        >{{
                          candidateData.contact
                            .per_current_residence_country_name
                        }},{{
                          candidateData.contact.per_current_residence_city
                        }}</span
                      >
                    </span>
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1">Post Code</span
                    ><span class="flex-70 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1">{{
                        candidateData.contact.per_permanent_post_code
                      }}</span></span
                    >
                  </li>
                        <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Permanant Residance</span
                    ><span class="flex-70 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1"
                        >{{
                          candidateData.contact
                            .per_permanent_country_name
                        }},{{
                          candidateData.contact.per_permanent_city
                        }}</span
                      >
                    </span>
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1">Address</span
                    ><span class="flex-70 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1">{{
                        candidateData.contact.per_permanent_address
                      }}</span></span
                    >
                  </li>

                         <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1">Mobile No</span
                    ><span class="flex-70 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1">{{
                        candidateData.contact.mobile_country_code
                      }} {{
                        candidateData.contact.mobile_number
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1">Email</span
                    ><span class="flex-70 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1">{{
                        candidateData.contact.per_email
                      }}</span></span
                    >
                  </li>
               
           
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Uploaded Image -->
        <div class="review-edit mt-5">
          <div class="review-edit-label">
            My Uploaded Image
            <img
              class="ms-2 edit-step"
              src="@/assets/icon/edit_step.svg"
              alt="icon"
              @click="$emit('toggleStep', 5)"
            />
          </div>
          <div class="row">
            <div class="col-12 col-md-4 mb-3">
              <div class="profile-img text-center">
                <img
                  v-viewer
                  :src="candidateData.personal.per_avatar_url"
                  class="contain"
                  alt="img"
                  :aspect-ratio="16/9"
                />
                <p class="text-center">Avatar</p>
              </div>
            </div>
            <div class="col-12 col-md-4 mb-3">
              <div class="profile-img text-center">
                <img
                  v-viewer
                  :src="candidateData.personal.per_main_image_url"
                  class="contain"
                  alt="img"
                />
                <p class="text-center">Main image</p>
              </div>
            </div>

            <div class="col-12 col-md-4 mb-3">
              <div class=" text-center">
                <img
                  v-viewer
                  :src="candidateData.personal.per_main_image_url"
                  class="contain"
                  alt="img"
                />
                <p class="text-center">Additional image</p>
              </div>
            </div>

            <div class="col-12">
              <div class="card-custom shadow-default">
                <h4>Image setting</h4>
                <div class="d-flex">
                  <a-icon
                    v-if="candidateData.personal.anybody_can_see == 0"
                    class="color-danger mt-2 mr-2 fs-16 fw-500"
                    type="stop"
                  />
                  <a-icon
                    v-else
                    class="color-success mt-2 mr-2 fs-16 fw-500"
                    type="check"
                  />
                  <span class="fs-16"
                    >I would like to share my all picture with anyone on this
                    plarform</span
                  >
                </div>
                <!-- <div class="d-flex">
                  <a-icon
                    v-if="candidateData.personal.only_team_can_see == 0"
                    class="color-danger mt-2 mr-2 fs-16 fw-500"
                    type="stop"
                  />
                  <a-icon
                    v-else
                    class="color-success mt-2 mr-2 fs-16 fw-500"
                    type="check"
                  />
                  <span class="fs-16"
                    >I would like to share all my images with my team</span
                  >
                </div> -->
                <div class="d-flex">
                  <a-icon
                    v-if="candidateData.personal.team_connection_can_see == 0"
                    class="color-danger mt-2 mr-2 fs-16 fw-500"
                    type="stop"
                  />
                  <a-icon
                    v-else
                    class="color-success mt-2 mr-2 fs-16 fw-500"
                    type="check"
                  />
                  <span class="fs-16">
                    I would like to share all my images with connected team(s)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </fieldset>
  </div>
</template>
<script>
import RatingComponent from "../profile/RatingComponent.vue";
import ApiService from "@/services/api.service";
import JwtService from "@/services/jwt.service";
import { AGES, HEIGHTS, Employment_Statuses } from "@/models/data";
export default {
  name: "Review",
  components: {
    RatingComponent,
  },
  props: {
    candidateDetails: {
      type: Object,
    },
  },
  data() {
    return {
      candidateData: {},
      heightTV: HEIGHTS,
    };
  },
  mounted() {
    this.getCandidateData();
  },
  methods: {
    async getCandidateData() {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await ApiService.get(`v1/candidate/info/${user.id}`);
        this.candidateData = {
          ...response.data.data,
          preference: {
            ...response.data.data.preference,
            pre_occupation: JSON.parse(
              response.data.data.preference.pre_occupation
            ),
          },
          // personal: {
          //   ...response.data.data.personal,
          //   per_about: response.data.data.personal.per_about.replace(
          //     /(?:\r\n|\r|\n)/g,
          //     "<br />"
          //   ),
          // },
        };
      } catch (error) {
        alert(this.error);
      }
    },
  },
  computed: {},
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.contain {
  height: 100%;
  width: 220px;
  object-fit: cover;
}
.review-publish {
  .review {
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
      .text--disabled text-subtitle-1 {
        //opacity: 0.8;
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
.h-100 {
  height: 100%;
}
.h-67 {
  height: 66%;
  margin-bottom: 2%;
}
.h-33 {
  height: 32%;
  margin-top: 1%;
}
.anticon {
  max-width: 15px;
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

.card-height-design {
  height: 360px;
}

.mobile-margin-top {
  margin-top: 54px;
}
// .text--disabled text-subtitle-1 {
//   //font-size: 14px;
//   font-weight: 600;
// }
.flex-70 > .ml-3 {
  //font-size: 14px;
  // font-weight: 900;
}
.inner {
  font-weight: 600;
}
.value-text {
  font-weight: bold;
}
.mt-16px {
  margin-top: 16px;
}
.personal-height {
  height: auto;
}
.user-image {
  width: 100%;
  height: 300px;
}
.edit-step {
  width: 20px;
  height: 20px;
}
@media (min-width: 992px) {
  .mobile-margin-top {
    margin-top: 0;
  }
  .personal-height {
    height: 360px;
  }
}
</style>
