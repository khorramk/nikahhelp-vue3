<template>
  <div class="review-publish px-2">
    <Loader v-if="loading" :isLoading="loading" />
    <fieldset
      v-if="representativeDetails && representativeDetails.essential"
      class="review"
    >
      <h4 class="fw-700 mt-3">Review and approve or reject</h4>
      <v-row>
        <v-col>
          <div>
            Name:
            <strong>
              {{ representativeDetails.first_name }}
              {{ representativeDetails.last_name }}</strong
            >
          </div>
          <div>
            User status: <strong>{{ getStatus }}</strong>
          </div>
        </v-col>
        <v-col></v-col>
        <v-col>
          <v-btn @click="getBackToUserList">
            <v-icon> arrow_back_ios </v-icon>
            Back to user list
          </v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="mb-4">
          <v-btn
            :loading="loading"
            v-if="userStatus < 3 && dataInputStatus > 2"

            class="mr-2"
            @click="updateUserVerifyOrReject('verified')"
            small
            style="background-color: rgb(42 205 100); color: #fff"
          >
            Approve
          </v-btn>
          <v-btn
            class="mr-2"
            v-if="
              userStatus == 4 ||
              userStatus == 3 ||
              userStatus == 9 ||
              userStatus == 0
            "
            :loading="loadingReinstate"
            @click="updateUserVerifyOrReject('completed')"
            style="background-color: rgb(61 185 156); color: #fff"
            small
          >
            Reinstate
          </v-btn>
          <v-btn
            class="mr-2"
            v-if="userStatus != 4 && userStatus != 3"
            :loading="loadingReject"
            @click="openDialog(item)"
            style="background-color: rgb(191 20 67); color: #fff"
            small
          >
            Reject
          </v-btn>

          <v-btn
            v-if="userStatus != 9"
            class="mr-2"
            :loading="loadingSuspend"
            @click="updateUserVerifyOrReject('suspend')"
            style="background-color: #6c757d; color: #fff"
            small
          >
            Suspend
          </v-btn>
          <v-btn
            v-if="userStatus != 0"
            class="mr-2"
            :loading="loadingDelete"
            @click="updateUserVerifyOrReject('deleted')"
            style="background-color: #f5222d; color: #fff"
            small
          >
            Delete
          </v-btn>
        </v-col>
      </v-row>

      <div class="text-start">
        <!-- Personal Information -->
        <div class="review-edit mt-5" v-if="representativeDetails.data_input_status > 0">

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
              <div class="card-custom shadow-default personal-height">
                <ul style="line-height: 160%">
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Name</span
                    ><span class="flex-70 px-2"
                      >:<span class="ml-3 text--secondary text-subtitle-1">
                        {{ representativeDetails.first_name }}
                        {{ representativeDetails.last_name }}
                      </span>
                    </span>
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Screen Name</span
                    ><span class="flex-70 px-2"
                      >:<span class="ml-3 text--secondary text-subtitle-1">{{
                        representativeDetails.screen_name
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Gender</span
                    ><span class="flex-70 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1">{{
                        representativeDetails.essential.per_gender_text
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Date of Birth</span
                    ><span class="flex-70 px-2 d-inherit"
                      >:<span
                        class="
                          ml-3
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
                      >:<span class="ml-3 text--secondary text-subtitle-1">{{
                        representativeDetails.essential.per_occupation
                      }}</span></span
                    >
                  </li>

                  <!-- <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Current Residance</span
                    ><span class="flex-70 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1"
                        >{{
                          representativeDetails.personal
                            .per_current_residence_country_text
                        }},
                        {{
                          representativeDetails.personal
                            .per_current_residence_city
                        }}</span
                      >
                    </span>
                  </li> -->
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Address Line 1</span
                    ><span class="flex-70 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1">{{
                        representativeDetails.personal.address_1
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Address Line 2</span
                    ><span class="flex-70 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1">{{
                        representativeDetails.personal.address_2
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >City</span
                    ><span class="flex-70 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1">{{
                        representativeDetails.personal.per_permanent_city
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Post Code</span
                    ><span class="flex-70 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1">{{
                        representativeDetails.personal.per_permanent_post_code
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Country</span
                    ><span class="flex-70 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1"
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
                      >:<span class="ml-3 text--secondary text-subtitle-1"
                        >
                        {{ representativeDetails.personal.mobile_number }}</span
                      ></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Email</span
                    ><span class="flex-70 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1">{{
                        representativeDetails.user.email
                      }}</span></span
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>

        <div v-if="showAgreement" class="review-edit mt-5">
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
              <div class="card-custom h-100 shadow-default">
                <table>
                  <TableRow
                    title="ID document issuing country & city"
                    textClass="text-subtitle-1"
                    :value="representativeDetails.verification.ver_city"
                  />
                  <TableRow
                    title="Document type"
                    textClass="text-subtitle-1"
                    :value="
                      representativeDetails.verification.ver_document_type
                    "
                  />
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
            <div v-if="!showAgreement" class="col-12 col-md-6 mb-4">
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
            <div v-if="!showAgreement" class="col-12 col-md-6 mb-4">
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
        <div class="review-edit mt-5" v-if="representativeDetails.data_input_status > 1">
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
            <div class="col-12 col-md-6 mb-4">
              <div class="profile-img text-center">
                <img
                  v-viewer
                  :src="representativeDetails.image_upload.per_avatar_url + `?token=${token}`"
                  class="contain"
                  alt="img"
                />
                <p class="text-center">Avatar</p>
              </div>
            </div>
            <div class="col-12 col-md-6 mb-4">
              <div class="profile-img text-center">
                <img
                  v-viewer
                  :src="representativeDetails.image_upload.per_main_image_url + `?token=${token}`"
                  class="contain"
                  alt="img"
                />
                <p class="text-center">Main image</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <div v-if="representativeDetails.data_input_status > 2">
        <div class="mt-5">
          <div>
            <h4>Document Preview</h4>
            <div class="row">
              <div class="col-12 col-md-6 mb-4">
                <div class="profile-img text-center">
                  <img
                    :src="
                      documentInfo.candidate_info.ver_image_front + `?token=${token}`
                    "
                    v-viewer
                    class=""
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
                      documentInfo.candidate_info.ver_image_back + `?token=${token}`
                    "
                    class=""
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
      </div> -->
    </fieldset>

    <NoteModal @save="save" @cancel="cancel"/>
  </div>
</template>
<script>
import NoteModal from "@/views/admin/NoteModal.vue";
// import RatingComponent from "@/components/profile/RatingComponent.vue";
import ApiService from "@/services/api.service";
// import JwtService from "@/services/jwt.service";
// import { AGES, HEIGHTS, Employment_Statuses } from "@/models/data";
import TableRow from "@/components/atom/TableRow.vue";
import Notification from "@/common/notification.js";

export default {
  name: "RepresentativeReview",
  components: {
    NoteModal,
    // RatingComponent,
    TableRow,
  },
  props: ["showAgreement"],
  data() {
    return {
      documentInfo: {},
      loading: false,
      cancelLoading: false,
      dialog: false,
      loadingSuspend: false,
      loadingDelete: false,
      loadingReinstate: false,
      loadingReject: false,
      statusArr: [
        { key: 1, name: "InComplete" },
        { key: 2, name: "Complete" },
        { key: 3, name: "Verified" },
        { key: 4, name: "Rejected" },
        { key: 5, name: "Approved" },
        { key: 9, name: "Suspended" },
        { key: 0, name: "Deleted" },
      ],
      representativeDetails: null,
      token: "",
    };
  },
  computed: {
    getStatus() {
      
        const status = {
        '0': "Deleted",
        '1': "Pending",
        '2': "Pending",
        '3': "Verified",
        '4': "Rejected",
        '9': "Suspended",
      };
        return status[this.userStatus];
      
    },

    user_id: function () {
      return this.$route.params.user_id;
    },
    dataInputStatus() {
      return this.representativeDetails?.data_input_status;
    },
    userStatus() {
      return parseInt(this.representativeDetails?.user?.status);
    },
    isWebSocketReady() {
      return this.$store.state.webSocket.webSocket.readyState === 1;
    }
  },
  created() {
    this.token = JSON.parse(localStorage.getItem("token"));
  },
  mounted() {
    this.getRepresentativeInfo();
    this.getDocumentInfo();
  },
  methods: {
    socketNotification(payload) {
      console.log('socketNotification from candidate profile review')
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
    getUserStatus(status) {
      return this.statusArr.find((i) => i.key == status).name;
    },
    async getRepresentativeInfo() {
      try {
        this.loading = true;
        const data = await ApiService.get(
          `/v1/admin/representative-info/${this.user_id}`
        );
        this.representativeDetails = {
          ...data.data.data,
          personal: {
            ...data.data.data.personal,
            per_email: "user.email",
          },
        };
      } catch (er) {
        console.log(er, ">err<");
      } finally {
        this.loading = false;
      }
    },

    async getDocumentInfo() {
      this.isLoading = true;
      await this.$store
        .dispatch("getDocumentInfo", this.$route.params.user_id)
        .then((data) => {
          this.documentInfo = {
            ...data,
            candidate_info: data.candidate_info ? data.candidate_info : {},
          };
          this.isLoading = false;
        })
        .catch((error) => {});
    },

    cancel(e) {
      this.dialog = false;
    },

    openDialog(item) {
      this.dialog = true;
      this.selectedItem = item;
    },

    async save(note) {
      const data = {
        id: this.$route.params.user_id,
        status: "rejected",
        note: note,
      };
      this.cancelLoading = true;
      this.cancel(null);
      this.loadingReject = true;
      await this.$store
        .dispatch("updateUserVerifyOrReject", data)
        .then((data) => {
          this.cancelLoading = false;
          this.loadingReject = false;
          console.log(data, "rejected");
          if (data.status == 4) {
            this.representativeDetails.user.status = 4;
          }

          // send notification 
          let receivers = [this.representativeDetails.user.id];
          console.log(receivers, "receivers")
          let payload = {
            receivers: receivers,
            title: `Your id has been rejected`,
            description: note,
          };
          console.log('before sending notification', payload);
          this.socketNotification(payload);
          console.log('after sending notification');

          // this.items = this.items.filter(
          //   (item) => item.id !== this.selectedItem.id
          // );
          // let loggedUser = JSON.parse(localStorage.getItem("user"));
          // if (loggedUser.id == this.selectedItem.id) {
          //   loggedUser.status = "4";
          //   localStorage.setItem("user", JSON.stringify(loggedUser));
          // }
        })
        .catch((error) => {
          this.cancelLoading = false;
        });
    },
    async updateUserVerifyOrReject(status) {
      switch (status) {
        case "verified":
          this.loading = true;
          break;
        case "suspend":
          this.loadingSuspend = true;
          break;
        case "deleted":
          this.loadingDelete = true;
          break;
        case "completed":
          this.loadingReinstate = true;
          break;
      }

      let notificationText = {
        verified: "approved",
        suspend: "suspended",
        deleted: "deleted",
      }
      const data = {
        id: this.$route.params.user_id,
        status: status,
      };
      await this.$store
        .dispatch("updateUserVerifyOrReject", data)
        .then((data) => {
          if (data.status) {
            this.representativeDetails.user.status = data.status;
          }

          // send notification
          if(status != 'completed') {
            let receivers = [this.representativeDetails.user.id];
            console.log(receivers, "receivers")
            let payload = {
              receivers: receivers,
              title: `Your id has been ` + notificationText[status],
            };
            console.log('before sending notification', payload);
            this.socketNotification(payload);
            console.log('after sending notification');
          }
        })
        .catch((error) => {})
        .finally(() => {
          this.loading = false;
          this.loadingDelete = false;
          this.loadingReject = false;
          this.loadingSuspend = false;
          this.loadingReinstate = false;
        });
    },
    getBackToUserList() {
      this.$router.push({ name: "Users" });
    },
  },

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
