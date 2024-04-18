<template>
  <div class="review-publish px-2">
    <fieldset
      v-if="representativeDetails && representativeDetails.essential"
      class="review"
    >
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
              @click="$emit('toggleStep', 0)"
            />
          </div>
          <div class="row h-100">
            <div class="col-md-12 mb-3">
              <div class="card-custom shadow-border personal-height">
                <ul class="personal-ul" style="line-height: 160%">
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Name</span
                    ><span class="flex-70 px-2 d-inherit"
                      ><span class="d-none d-sm-table-cell">:</span> <span class="left-margin text--secondary text-subtitle-1">
                        {{ representativeDetails.first_name }}
                        {{ representativeDetails.last_name }}
                      </span>
                    </span>
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Screen Name</span
                    ><span class="flex-70 px-2 d-inherit"
                      ><span class="d-none d-sm-table-cell">:</span> <span class="left-margin text--secondary text-subtitle-1">{{
                        representativeDetails.screen_name
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Gender</span
                    ><span class="flex-70 px-2 d-inherit"
                      ><span class="d-none d-sm-table-cell">:</span> <span class="left-margin text--secondary text-subtitle-1">{{
                        representativeDetails.essential.per_gender_text
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Date of Birth</span
                    ><span class="flex-70 px-2 d-inherit"
                      ><span class="d-none d-sm-table-cell">:</span> <span
                        class="
                          left-margin
                          text--secondary
                          text-subtitle-1
                          text--secondary
                          text-subtitle-1
                        "
                      >
                        {{ representativeDetails.essential.dob }}
                      </span>
                    </span>
                  </li>

                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Occupation</span
                    ><span class="flex-70 px-2 d-inherit"
                      ><span class="d-none d-sm-table-cell">:</span> <span class="left-margin text--secondary text-subtitle-1">{{
                        representativeDetails.essential.per_occupation
                      }}</span></span
                    >
                  </li>

                  <!-- <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Current Residance</span
                    ><span class="flex-70 px-2 d-inherit"
                      ><span class="d-none d-sm-table-cell">:</span> <span class="left-margin text--secondary text-subtitle-1"
                        >{{
                          representativeDetails.personal
                            .per_current_residence_country
                        }}</span
                      >
                    </span>
                  </li> -->
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Address Line 1</span
                    ><span class="flex-70 px-2 d-inherit"
                      ><span class="d-none d-sm-table-cell">:</span> <span class="left-margin text--secondary text-break text-subtitle-1">{{
                        representativeDetails.personal.address_1
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Address Line 2</span
                    ><span class="flex-70 px-2 d-inherit"
                      ><span class="d-none d-sm-table-cell">:</span> <span class="left-margin text--secondary text-break text-subtitle-1">{{
                        representativeDetails.personal.address_2
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >City</span
                    ><span class="flex-70 px-2 d-inherit"
                      ><span class="d-none d-sm-table-cell">:</span> <span class="left-margin text--secondary text-break text-subtitle-1">{{
                        representativeDetails.personal.per_permanent_city
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Post Code</span
                    ><span class="flex-70 px-2 d-inherit"
                      ><span class="d-none d-sm-table-cell">:</span> <span class="left-margin text--secondary text-subtitle-1">{{
                        representativeDetails.personal.per_permanent_post_code
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Country</span
                    ><span class="flex-70 px-2 d-inherit"
                      ><span class="d-none d-sm-table-cell">:</span> <span class="left-margin text--secondary text-subtitle-1"
                        >{{
                          representativeDetails.personal
                            .per_permanent_country
                        }},
                      </span>
                    </span>
                  </li>

                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Mobile No</span
                    ><span class="flex-70 px-2 d-inherit"
                      ><span class="d-none d-sm-table-cell">:</span> <span class="left-margin text--secondary text-subtitle-1">
                        {{ representativeDetails.personal.mobile_number }}</span
                      ></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Email</span
                    ><span class="flex-70 px-2 d-inherit"
                      ><span class="d-none d-sm-table-cell">:</span> <span class="left-margin text--secondary text-break text-subtitle-1">{{
                        representativeDetails.personal.per_email
                      }}</span></span
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div  class="review-edit mt-5">
          <div class="review-edit-label">
            Verification & Reference
            <img
              class="ms-2 edit-step"
              src="@/assets/icon/edit_step.svg"
              alt="icon"
              @click="$emit('toggleStep', 2)"
            />
          </div>
          <div class="row">
            <div class="col-md-12 mb-3">
              <div class="card-custom h-100 shadow-border">
                <table>
                  <!-- <TableRow
                    title="ID document issuing country"
                    textClass="text-subtitle-1"
                    :value="representativeDetails.verification.ver_country"
                  />
                  <TableRow
                    title="Document type"
                    textClass="text-subtitle-1"
                    :value="
                      representativeDetails.verification.ver_document_type
                    "
                  /> -->
                  <TableRow
                    title="Title"
                    textClass="text-subtitle-1"
                    :value="
                      representativeDetails.verification.ver_recommender_title
                    "
                  />
                  <TableRow
                    title="First Name"
                    textClass="text-subtitle-1"
                    :value="
                      representativeDetails.verification
                        .ver_recommender_first_name
                    "
                  />

                  <TableRow
                    title="Last Name"
                    textClass="text-subtitle-1"
                    :value="
                      representativeDetails.verification
                        .ver_recommender_last_name
                    "
                  />
                  <TableRow
                    title="Occupation"
                    textClass="text-subtitle-1"
                    :value="
                      representativeDetails.verification
                        .ver_recommender_occupation
                    "
                  />

                  <TableRow
                    title="Address"
                    textClass="text-subtitle-1"
                    :value="
                      representativeDetails.verification.ver_recommender_address
                    "
                  />
                  <TableRow
                    title="Mobile No"
                    textClass="text-subtitle-1"
                    :value="
                      representativeDetails.verification
                        .ver_recommender_mobile_no
                    "
                  />
                  <TableRow
                    title="Email"
                    textClass="text-subtitle-1"
                    :value="
                      representativeDetails.verification.ver_recommender_email
                    "
                  />
                </table>
              </div>
            </div>
            <div v-if="showAgreement" class="col-12 col-md-6 mb-4">
              <div class="profile-img text-center">
                <img
                  v-viewer
                  :src="
                    representativeDetails.verification.ver_document_frontside + `?token=${token}`
                  "
                  class="user-image"
                  alt="img"
                  height="250"
                  width="200"
                />
                <p class="text-center">Front Side</p>
              </div>
            </div>
            <div v-if="showAgreement" class="col-12 col-md-6 mb-4">
              <div class="profile-img text-center">
                <img
                  v-viewer
                  :src="
                    representativeDetails.verification.ver_document_backside + `?token=${token}`
                  "
                  class="user-image"
                  alt="img"
                  height="250"
                  width="200"
                />
                <p class="text-center">Back Side</p>
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
              @click="$emit('toggleStep', 1)"
            />
          </div>
          <div class="row">
            <div v-viewer="{movable: false, title: false, scalable: false, rotatable: false}" class="col-12 row my-4">
              <div
                class="col-md-6 mb-sm-0 mb-2 flex flex-column align-items-center img-preview" 
                v-for="src in [representativeDetails.image_upload.per_avatar_url + `?token=${token}`, representativeDetails.image_upload.per_main_image_url + `?token=${token}`]" 
                :key="src"
              >
                  <img
                    :src="src"
                    class="contain"
                    alt="img"
                    height="250"
                    width="200"
                    style="cursor: pointer;"
                  />
                  <p class="text-center" v-if="src == representativeDetails.image_upload.per_avatar_url + `?token=${token}`">Avatar</p>
                  <p class="text-center" v-else>Main Image</p>
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
import TableRow from "@/components/atom/TableRow.vue";
export default {
  name: "Review",
  components: {
    RatingComponent,
    TableRow,
  },
  props: ["showAgreement"],
  data() {
    return { 
      representativeDetails: null,  
      token: "",
    };
  },
  created() {
    this.token = JSON.parse(localStorage.getItem('token'));
  },
  mounted() {
    this.getRepresentativeInfo();
    // this.getRelatedImages();
  },
  methods: {
    async getRepresentativeInfo() {
      await this.$store
        .dispatch("getRepresentativeInfo")
        .then((data) => {
          this.representativeDetails = data.data.data;

          let user = JSON.parse(localStorage.getItem("user"));
          const imageModel = this.representativeDetails.imageModel
          this.representativeDetails = {
            ...data.data.data,
            personal: {
              ...data.data.data.personal,
              per_email: user.email,
            },
          };

          this.representativeDetails = {
            ...this.representativeDetails,
            imageModel: imageModel,
            
          }
        })
        .catch((error) => {});
    },
   // async getRelatedImages() {
   //  const imageToken = JSON.parse(localStorage.getItem('token'));
   //       await fetch(`https://chobi.nikahhelp.com/api/`, {
   //    headers: {
   //          'Authorization': `Bearer ${imageToken}`, // notice the Bearer before your token
   //    }
   //  }).then(e => e.json()).then(e => {
   //    // localStorage.setItem('token', e.data.token);
   //    resolve(e.data)
   //  }).catch(e => console.log(e));
   //  }
  },
  computed: {},
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.shadow-border {
  box-shadow: none !important;
  border: 2px solid #dddddd78 !important;
}
.left-margin {
  margin-left: 12px !important;
  @media (max-width: 600px) {
    margin-left: 0px !important;
  }
}
.flex-between-start {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: 600px) {
    flex-direction: column !important;
    margin-bottom: 10px !important;
  }
}
.personal-ul {
  line-height: 160%;
  padding-left: 0;
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
    .img-preview {
      width: 200px;
      height: 100%;
      margin: 0px auto;
      @media (max-width: 447px) {
        height: auto !important;
      }
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
  height: 390px
}

.mobile-margin-top {
  margin-top: 54px;
}
.text--disabled text-subtitle-1 {
  //font-size: 14px;
  font-weight: 600;
}
.flex-70 > .ml-3 text--secondary text-subtitle-1 {
  //font-size: 14px;
  font-weight: 900;
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
.contain {
  border: 1px solid $color-secondary;
  border-radius: 5px;
  height: 135px;
  width: 220px;
  object-fit: cover;
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
    height: 390px
  }
}
.card-custom {
  .v-list-item__content {
    padding: 0 !important;
  }
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
</style>
