<template>
  <div>
    <Loader v-if="isLoading" :isLoading="isLoading" />
    <div fluid v-else>
     <div v-if="user && user.account_type == 1">
            <!-- Candidate Profile Component goes here -->
            <candidate-profile></candidate-profile>
          </div>
          <div v-if="user && user.account_type !== 1">
            <!-- Representative profile component goes here -->
            <representative-profile
              :representativeData="representativeInfo"
            ></representative-profile>
          </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/dashboard/layout/Header.vue";
import Sidebar from "@/components/dashboard/layout/Sidebar.vue";
import Footer from "@/components/auth/Footer.vue";
import CandidateProfile from "@/components/profile/CandidateProfile.vue";
import RepresentativeProfile from "@/components/profile/RepresentativeProfile.vue";

export default {
  name: "Profile",
  components: {
    Header,
    Sidebar,
    Footer,
    CandidateProfile,
    RepresentativeProfile,
  },
  data() {
    return {
      isLoading: false,
      user: {},
      candidateInfo: {},
      representativeInfo: {},
      is_verified: 1,
      error: null,
    };
  },
  mounted() {},
  created() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.user = JSON.parse(localStorage.getItem("user"));
    }, 1000);
    this.$store.dispatch("getCountries");
    this.$store.dispatch("getStudyLevelOptions");
    this.$store.dispatch("getReligionOptions");
    this.$store.dispatch("getOccupations");
  },
  methods: {},
};
</script>

<style>
.footer-design {
  width: 100%;
  margin-top: 50px;
  @media (max-width: 767px) {
    display: none;
  }
}
</style>