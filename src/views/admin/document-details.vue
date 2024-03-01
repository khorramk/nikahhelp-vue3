<template>
  <div>
    <Loader v-if="isLoading" :isLoading="isLoading" />
    <div  v-else class="document-container">
      <div  v-if="documentInfo && documentInfo.candidate_info" class="document-content">
        <div class="document-header">
          <v-btn style="background-color: #522e8e; color: #fff" medium>
            {{ userData.account_type == 1 ? "Candidate" : "Representative" }}
          </v-btn>
          <router-link to="/admin/approve_documents">
            <v-btn style="background-color: rgb(61 185 156); color: #fff" small>
              <v-icon dark> md-minus </v-icon>
              Back
            </v-btn>
          </router-link>
        </div>
        <div class="content-details">
          <div class="details-top">
            <div>
              <h4>Document Details</h4>
              <ul style="padding: 0%">
                <li class="flex-between-start">
                  <span class="flex-50 label-text">Country</span
                  ><span class="flex-50"
                    >:<span class="ml-3">
                      <!-- {{ documentInfo.candidate_info.countryName }} -->
                    </span>
                  </span>
                </li>
                <li class="flex-between-start">
                  <span class="flex-50 label-text">Document Type</span
                  ><span class="flex-50"
                    >:<span class="ml-3">
                      {{ documentInfo.candidate_info.ver_document_type }}
                    </span>
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h4>Person of community Standing</h4>
              <ul style="padding: 0%">
                <li class="flex-between-start">
                  <span class="flex-50 label-text">Title</span
                  ><span class="flex-50"
                    >:<span class="ml-3">
                      {{ documentInfo.candidate_info.ver_recommences_title }}
                    </span>
                  </span>
                </li>
                <li class="flex-between-start">
                  <span class="flex-50 label-text">Name</span
                  ><span class="flex-50"
                    >:<span class="ml-3">
                      {{
                        documentInfo.candidate_info.ver_recommences_first_name
                      }}
                      {{
                        documentInfo.candidate_info.ver_recommences_last_name
                      }}
                    </span>
                  </span>
                </li>
                <li class="flex-between-start">
                  <span class="flex-50 label-text">Occupation</span
                  ><span class="flex-50"
                    >:<span class="ml-3">
                      {{
                        documentInfo.candidate_info.ver_recommences_occupation
                      }}
                    </span>
                  </span>
                </li>
                <li class="flex-between-start">
                  <span class="flex-50 label-text">Address</span
                  ><span class="flex-50"
                    >:<span style="width: 150px" class="ml-3">
                      {{ documentInfo.candidate_info.ver_recommences_address }}
                    </span>
                  </span>
                </li>
                <li class="flex-between-start">
                  <span class="flex-50 label-text">Mobile No.</span
                  ><span class="flex-50"
                    >:<span class="ml-3">
                      {{
                        documentInfo.candidate_info.ver_recommences_mobile_no
                      }}
                    </span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div>
              <h4>Document Preview</h4>
              <div class="row">
                <div class="col-12 col-md-6 mb-4">
                  <div class="profile-img text-center">
                    <img
                      :src="
                        documentInfo.image_server_base_url +
                        '/' +
                        documentInfo.candidate_info.ver_image_front
                      "
                      v-viewer
                      class="user-image"
                      alt="img"
                      height="250"
                      width="200"
                    />
                    <p class="text-center">Font Side</p>
                  </div>
                </div>
                <div class="col-12 col-md-6 mb-4">
                  <div class="profile-img text-center">
                    <img
                      v-viewer
                      :src="
                        documentInfo.image_server_base_url +
                        '/' +
                        documentInfo.candidate_info.ver_image_back
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
          </div>
        </div>
      </div>
      <div  v-if="documentInfo && documentInfo.candidate_info" class="document-content border-content">
        <div class="document-header">
          <div class="right-header">
            <v-btn
              v-if="documentInfo.status == 2"
              @click="updateUserVerifyOrReject(documentInfo, 'verified')"
              style="background-color: rgb(61 185 156); color: #fff"
              small
            >
              <v-icon dark> md-minus </v-icon>
              Approve this document
            </v-btn>
            <v-btn
              v-if="documentInfo.status == 2 || documentInfo.status == 3"
              @click="openDialog"
              style="background-color: rgb(191 20 67); color: #fff"
              small
            >
              <v-icon dark> md-minus </v-icon>
              Reject this document
            </v-btn>
            <v-btn
              v-if="documentInfo.status == 4"
              @click="updateUserVerifyOrReject(documentInfo, 'completed')"
              style="background-color: rgb(61 185 156); color: #fff"
              small
            >
              <v-icon dark> md-minus </v-icon>
              Reinstate this document
            </v-btn>
          </div>
        </div>
        <div class="contact-info">
          <div class="profile-details">
            <h4>This Profile review</h4>
            <ul style="padding: 0%">
              <li class="flex-between-start">
                <span class="flex-50 label-text">Profile Type</span
                ><span class="flex-50"
                  >:<span class="ml-3">
                    {{
                      userData.account_type == 1
                        ? "Candidate"
                        : "Representative"
                    }}
                  </span>
                </span>
              </li>
              <li class="flex-between-start">
                <span class="flex-50 label-text">Profile ID</span
                ><span class="flex-50"
                  >:<span class="ml-3"> #{{ userData.id }} </span>
                </span>
              </li>
              <li class="flex-between-start">
                <span class="flex-50 label-text">Name</span
                ><span class="flex-50"
                  >:<span class="ml-3"> {{ documentInfo.full_name }} </span>
                </span>
              </li>
              <li class="flex-between-start">
                <span class="flex-50 label-text">Age</span
                ><span class="flex-50"
                  >:<span class="ml-3"> 20 Years </span>
                </span>
              </li>
              <li class="flex-between-start">
                <span class="flex-50 label-text">Height</span
                ><span class="flex-50"
                  >:<span class="ml-3">
                    {{ documentInfo.candidate_info.per_height }}
                  </span>
                </span>
              </li>
              <li class="flex-between-start">
                <span class="flex-50 label-text">Nationality</span
                ><span class="flex-50"
                  >:<span class="ml-3"> Bangladesh </span>
                </span>
              </li>
              <li class="flex-between-start">
                <span class="flex-50 label-text">Ethnicity</span
                ><span class="flex-50"
                  >:<span class="ml-3">
                    {{ documentInfo.candidate_info.per_ethnicity }}
                  </span>
                </span>
              </li>
              <li class="flex-between-start">
                <span class="flex-50 label-text">Country of birth</span
                ><span class="flex-50"
                  >:<span class="ml-3">
                    {{ documentInfo.candidate_info.per_country_of_birth }}
                  </span>
                </span>
              </li>
              <li class="flex-between-start">
                <span class="flex-50 label-text">Current Residence</span
                ><span class="flex-50"
                  >:<span class="ml-3">
                    {{ documentInfo.candidate_info.per_current_residence_city }}
                  </span>
                </span>
              </li>
            </ul>
          </div>
          <div>
            <router-link
              :to="'/admin/user_candidate_details/' + documentInfo.id"
            >
              <v-btn
                style="
                  background-color: #522e8e;
                  color: #fff;
                  border-radius: 20px;
                "
                small
              >
                Profile View
              </v-btn>
            </router-link>
          </div>
          <div
           
            class="partner-details"
          >
            <h4>This Profile Partner Preferences</h4>
            <ul style="padding: 0%">
              <li class="flex-between-start">
                <span class="flex-50 label-text">Age</span
                ><span class="flex-50"
                  >:<span class="ml-3"> 20 Years </span>
                </span>
              </li>
              <li class="flex-between-start">
                <span class="flex-50 label-text">Height</span
                ><span class="flex-50">:<span class="ml-3"> 66 </span> </span>
              </li>
              <li class="flex-between-start">
                <span class="flex-50 label-text">Religin</span
                ><span class="flex-50"
                  >:<span class="ml-3"> Islam </span>
                </span>
              </li>
              <li class="flex-between-start">
                <span class="flex-50 label-text">Nationality</span
                ><span class="flex-50"
                  >:<span class="ml-3"> Bangladesh </span>
                </span>
              </li>
              <li class="flex-between-start">
                <span class="flex-50 label-text">Ethnicity</span
                ><span class="flex-50"
                  >:<span class="ml-3">
                    {{ documentInfo.candidate_info.pre_ethnicities }}
                  </span>
                </span>
              </li>
              <li class="flex-between-start">
                <span class="flex-50 label-text">Country Of birth</span
                ><span class="flex-50"
                  >:<span class="ml-3"> Bangladesh </span>
                </span>
              </li>
              <li class="flex-between-start">
                <span class="flex-50 label-text">Current Residance</span
                ><span class="flex-50"
                  >:<span class="ml-3">Dhaka, Bangladesh </span>
                </span>
              </li>
              <li class="flex-between-start">
                <span class="flex-50 label-text">Minimum Education</span
                ><span class="flex-50"
                  >:<span class="ml-3"> A Level </span>
                </span>
              </li>
              <li class="flex-between-start">
                <span class="flex-50 label-text">Profession</span
                ><span class="flex-50"
                  >:<span class="ml-3">
                    {{ documentInfo.candidate_info.pre_employment_status }}
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <NoteModal @save="save" @cancel="cancel" :dialog="dialog" />
  </div>
</template>

<script>
import NoteModal from "@/views/admin/NoteModal.vue";
export default {
  components: { NoteModal },
  data() {
    return {
      userData: null,
      documentInfo: null,
      isLoading: false,
      dialog: false,
    };
  },

  created() {
    this.userData = JSON.parse(localStorage.getItem("user"));
  },

  computed: {
    user_id: function () {
      return this.$route.params.user_id;
    },
  },
  mounted() {
    this.getDocumentInfo();
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    cancel(e) {
      this.dialog = false;
    },
    async save(note) {
      const data = {
        id: this.documentInfo.id,
        status: "rejected",
        note: note,
      };
      await this.$store
        .dispatch("updateUserVerifyOrReject", data)
        .then((data) => {
          this.documentInfo.status = 4;
          let loggedUser = JSON.parse(localStorage.getItem("user"));
          this.cancel(null);
          if (loggedUser.id == this.documentInfo.id) {
            loggedUser.status = "4";
            localStorage.setItem("user", JSON.stringify(loggedUser));
          }
        })
        .catch((error) => {});
    },
    async updateUserVerifyOrReject(user, status) {
      const data = {
        id: user.id,
        status: status,
      };
      await this.$store
        .dispatch("updateUserVerifyOrReject", data)
        .then((data) => {
          this.documentInfo.status = 3;
          let loggedUser = JSON.parse(localStorage.getItem("user"));
          if (loggedUser.id == user.id) {
            loggedUser.status = status == "verified" ? "3" : "4";
            localStorage.setItem("user", JSON.stringify(loggedUser));
          }
        })
        .catch((error) => {});
    },
    async getDocumentInfo() {
      this.isLoading = true;
      await this.$store
        .dispatch("getDocumentInfo", this.user_id)
        .then((data) => {
          this.documentInfo = {
            ...data,
            candidate_info: data.candidate_info ? data.candidate_info : {},
          };
          this.isLoading = false;
        })
        .catch((error) => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.document-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: calc(100vh - 90px);
  overflow: hidden;
  opacity: 1;
  @media (min-width: 320px) and (max-width: 600px) {
    flex-direction: column;
    height: 100%;
  }

  .document-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: flex-start;
    align-items: flex-start;
    border: 2px solid #ddd;
    border-radius: 15px;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 10px 30px #fff;
    margin: 10px;
    overflow: hidden;
    @media (min-width: 320px) and (max-width: 600px) {
      width: 95%;
    }
    &.border-content {
      width: 60%;
      @media (min-width: 320px) and (max-width: 600px) {
        width: 95%;
      }
    }

    .document-header {
      display: flex;
      align-items: stretch;
      justify-content: space-between;
      flex-direction: row;
      width: 100%;
      padding: 20px;
      .right-header {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        width: 100%;
      }
    }
    .content-details {
      width: 100%;
      padding: 20px;
      .details-top {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        padding: 5px;
        @media (min-width: 320px) and (max-width: 600px) {
          flex-direction: column;
        }
      }
      .profile-img {
        border-radius: 5px;
        overflow: hidden;
      }
    }
    .contact-info {
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .profile-details {
        padding-bottom: 20px;
        width: 100%;
      }
      .partner-details {
        padding-top: 20px;
        width: 100%;
      }
    }
  }
}
</style>