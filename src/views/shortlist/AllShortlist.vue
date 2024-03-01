<template>
  <div>
   <Loader v-if="isLoading" :isLoading="isLoading" />
    <div v-else>
      <div class="main-content-wrapper">
        <!-- <Sidebar /> -->
        <div class="main-content-1">
          <!-- <ShortlistedCandidate/> -->
          <div class="shortlisted-candidate">
            <!-- Shortlisted Section Header -->
            <div class="item" style="text-align: left; width: 100%">
              <span
                class="item-number flex-center-center"
                style="float: left"
                >{{ shortListedCandidates.length }}</span
              >
              <span class="m-2 fw-600 fs-18">Shortlisted Candidate</span>
            </div>
            <!-- Shortlisted component goes here -->
            <candidate
              v-for="candidate in shortListedCandidates"
              :key="candidate.id"
              :candidate="candidate"
              @selected-candidate="selectedCandidate"
              @get-candidate-id="getCandidateId"
              @get-shortlist-id="removeShortlist"
            ></candidate>
            <select-team-modal
              :selectTeamModal="selectTeamModal"
              @handle-cancel="selectTeamModal = false"
              @handle-team="storeTeamlist"
            ></select-team-modal>
          </div>
        </div>
        <div class="main-content-2">
          <div
            v-if="candidateProfileInfo"
            class="shadow-default profile-overview"
          >
            <h6>This Profile overview</h6>
            <hr />
            <div>
              <!-- Name -->
              <li class="flex-between-start">
                <span class="flex-50 label-text">Name</span
                ><span class="flex-50"
                  >:
                  <span class="ml-3"
                    >{{ candidateProfileInfo.first_name }}
                    {{ candidateProfileInfo.last_name }}</span
                  ></span
                >
              </li>
              <!-- Age -->
              <li class="flex-between-start">
                <span class="flex-50 label-text">Age</span
                ><span class="flex-50"
                  >:
                  <span class="ml-3">{{
                    candidateProfileInfo.personal.dob
                  }}</span></span
                >
              </li>
              <!-- height -->
              <li class="flex-between-start">
                <span class="flex-50 label-text">Height</span
                ><span class="flex-50"
                  >:
                  <span class="ml-3">{{
                    candidateProfileInfo.personal.per_height
                  }}</span></span
                >
              </li>
              <!-- Nationality -->
              <li class="flex-between-start">
                <span class="flex-50 label-text">Nationality</span
                ><span class="flex-50"
                  >:
                  <span class="ml-3">{{
                    $store.state.candidateInfo.countries[
                      candidateProfileInfo.personal.per_nationality
                    ].name
                  }}</span></span
                >
              </li>
              <!-- Ethnicity -->
              <li class="flex-between-start">
                <span class="flex-50 label-text">Ethnicity</span
                ><span class="flex-50 d-inherit"
                  >:
                  <span class="ml-3">
                    {{ candidateProfileInfo.personal.per_ethnicity }}</span
                  ></span
                >
              </li>
              <!-- Country Of Birth -->
              <li class="flex-between-start">
                <span class="flex-50 label-text">Country of Birth</span
                ><span class="flex-50"
                  >:
                  <span class="ml-3">{{
                    $store.state.candidateInfo.countries[
                      candidateProfileInfo.personal.per_country_of_birth
                    ].name
                  }}</span></span
                >
              </li>
              <!-- Current Residence -->
              <li class="flex-between-start">
                <span class="flex-50 label-text">Current Residance</span
                ><span class="flex-50"
                  >:
                  <span class="ml-3">{{
                    $store.state.candidateInfo.countries[
                      candidateProfileInfo.personal.per_current_residence
                    ].name
                  }}</span></span
                >
              </li>
              <!-- Education -->
              <li
                class="flex-between-start"
                v-if="candidateProfileInfo.personal.per_education_level_id"
              >
                <span class="flex-50 label-text">Education</span
                ><span class="flex-50"
                  >:
                  <span class="ml-3">
                    {{
                      $store.state.candidateInfo.study_level_options[
                        candidateProfileInfo.personal.per_education_level_id
                      ].name
                    }}
                  </span></span
                >
              </li>
            </div>

            <h6 class="mt-3">This Profile Partner Preferences</h6>
            <hr />
            <div>
              <!-- Age -->
              <li class="flex-between-start">
                <span class="flex-50 label-text">Age</span
                ><span class="flex-50"
                  >:
                  <span class="ml-3">
                    {{ candidateProfileInfo.preference.pre_partner_age_min }} to
                    {{ candidateProfileInfo.preference.pre_partner_age_max }}
                    years</span
                  ></span
                >
              </li>
              <!-- Height -->
              <li class="flex-between-start">
                <span class="flex-50 label-text">Height</span
                ><span class="flex-50"
                  >:
                  <span class="ml-3"
                    >{{ candidateProfileInfo.preference.pre_height_min }} inch
                    to
                    {{ candidateProfileInfo.preference.pre_height_max }}
                    inch</span
                  ></span
                >
              </li>
              <!-- Religion -->
              <li class="flex-between-start">
                <span class="flex-50 label-text">Religion</span
                ><span class="flex-50"
                  >:
                  <span class="ml-3"> Islam </span>
                </span>
              </li>
              <!-- Nationality -->
              <li class="flex-between-start">
                <span class="flex-50 label-text">Nationality</span
                ><span class="flex-50 d-inherit"
                  >:
                  <span class="ml-3">
                    <div
                      v-for="nationality in candidateProfileInfo.preference
                        .preferred_nationality"
                      :key="nationality.id"
                    >
                      {{ nationality.name }}
                    </div>
                  </span></span
                >
              </li>
              <!-- Ethnicity -->
              <li class="flex-between-start">
                <span class="flex-50 label-text">Ethnicity</span
                ><span class="flex-50 d-inherit"
                  >:
                  <span class="ml-3">
                    {{ candidateProfileInfo.preference.pre_ethnicities }}</span
                  ></span
                >
              </li>
              <!-- Country Of Birth -->
              <!-- Current Residence -->
              <!-- Education -->
              <li
                class="flex-between-start"
                v-if="candidateProfileInfo.preference.pre_study_level_id"
              >
                <span class="flex-50 label-text">Education</span
                ><span class="flex-50"
                  >:
                  <span class="ml-3">
                    {{
                      $store.state.candidateInfo.study_level_options[
                        candidateProfileInfo.preference.pre_study_level_id
                      ].name
                    }}
                  </span></span
                >
              </li>
              <!-- Profession -->
              <!-- Occupation -->
              <li class="flex-between-start">
                <span class="flex-50 label-text">Ocupation</span
                ><span class="flex-50"
                  >:
                  <span class="ml-3">{{
                    candidateProfileInfo.preference.pre_occupation
                  }}</span></span
                >
              </li>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/dashboard/layout/Header.vue";
import Sidebar from "@/components/dashboard/layout/Sidebar.vue";
import Footer from "@/components/dashboard/layout/Footer.vue";
import SelectTeamModal from "@/components/team/Modals/SelectTeamModal.vue";

// import ShortlistedCandidate from "@/components/shortlist/ShortlistedCandidate.vue";
import Candidate from "@/components/shortlist/Candidate.vue";
export default {
  name: "AllShortlist",
  components: {
    Header,
    Sidebar,
    Footer,
    Candidate,
    SelectTeamModal,
    // ShortlistedCandidate
  },
  data() {
    return {
      isLoading: false,
      user: {},
      is_verified: 1,
      error: null,
      userProfile: null,
      candidateProfileInfo: null,
      representativeProfileInfo: null,
      selectTeamModal: false,
      candidateId: null,
    };
  },
  created() {
    this.loadShortListedCandidates();
    this.loadTeamShortListedCandidates();
    this.$store.dispatch("getCountries");
    this.$store.dispatch("getStudyLevelOptions");
    this.$store.dispatch("getReligionOptions");
    this.$store.dispatch("getOccupations");
  },
  computed: {
    shortListedCandidates() {
      const candidates = this.$store.getters["shortListedCandidates"];
      return candidates.filter((candidate) => {
        if (candidate.team_id == null) {
          return true;
        }
        return false;
      });
    },
    teamShortListedCandidates() {
      const candidates = this.$store.getters["teamShortListedCandidates"];
      return candidates;
    },
  },
  methods: {
   
    async loadShortListedCandidates() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("loadShortListedCandidates");
      } catch (error) {
        this.error = error.message || "Something went wrong";
        console.log(this.error);
      }
      this.isLoading = false;
    },
    async loadTeamShortListedCandidates() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("loadTeamShortListedCandidates");
      } catch (error) {
        this.error = error.message || "Something went wrong";
        console.log(this.error);
      }
      this.isLoading = false;
    },
    async loadUserProfile(id) {
      this.isLoading = true;

      try {
        const payload = {
          id,
        };
        const response = await this.$store.dispatch("getUserProfile", payload);
        //console.log(response);
        this.userProfile = response.data.user;
        //console.log(this.userProfile);
        if (response.data.user.account_type == 1) {
          this.candidateProfileInfo = response.data.candidate_information;
        } else {
          this.representativeProfileInfo =
            response.data.representative_information[0];
        }
        // this.user = this.$store.getters["userProfileInfo"];
        // this.candidateProfileInfo = this.$store.getters["candidateProfileInfo"];
        // this.representativeProfileInfo = this.$store.getters[
        // 	"representativeProfileInfo"
        // ];

        // if (data_input_status == 12) {
        // 	this.$router.push("/candidate-registration");
        // }
        // if (data_input_status == 22) {
        // 	this.$router.push("/representative-registration");
        // }
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
    async selectedCandidate(candidate) {
      await this.loadUserProfile(candidate.user_id);
      console.log(this.candidateProfileInfo);
    },

    getCandidateId(candidateId) {
      this.selectTeamModal = true;
      this.candidateId = candidateId;
    },
    removeShortlist(shortlistId) {
      const vm = this;
      this.$confirm({
        title: "Are you sure?",
        content: "Do you want to remove this user from your shortlist?",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        async onOk() {
          const response = vm.$store.dispatch("removeShortlist", shortlistId); // In Shorltist Module
          response
            .then((data) => {
              console.log(data);
              vm.$message.success(
                "Shortlisted candidate removed successfully!"
              );
              setTimeout(() => vm.$router.go(), 500);
            })
            .catch((error) => {
              console.log(error);
            });
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    },
    storeTeamlist(teamId) {
      const _payload = {
        user_id: this.candidateId,
        shortlisted_by: this.user.id,
        shortlisted_for: teamId,
      };
      console.log(_payload);
      const response = this.$store.dispatch("storeTeamlist", _payload); // Action in shortlist module
      response
        .then((data) => {
          console.log(data);
          this.selectTeamModal = false;
          this.$message.success("Team Listed candidate added successfully!");
          setTimeout(() => this.$router.go(), 500);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.main-content-wrapper {
  @media (max-width: 1024px) {
    flex-wrap: wrap;
  }
  .main-content-1 {
    width: calc(100% - 550px);
    margin: 20px 10px;
    @media (max-width: 1024px) {
      width: calc(100% - 270px);
    }
    .item {
      display: inline-block;
      button {
        img {
          width: 20px;
        }
      }
      .item-number {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: $bg-secondary;
        color: $color-white;
        margin-left: 8px;
      }
    }
    .shortlisted-candidate {
      max-height: 100%;
    }
    .teamlisted-candidate {
      max-height: 280px;
      overflow-y: auto;
    }
  }
  .main-content-2 {
    margin: 15px;
    width: 300px;
    height: 100%;
    .profile-overview {
      padding: 10px;
      height: 100%;
    }
  }
}
</style>
