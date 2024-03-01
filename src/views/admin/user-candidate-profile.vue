<template>
  <div class="review-publish px-2">
    <CandidateProfileReview :candidateDetails="candidateDetails"  v-if="userType == 1"/>
    <RepresentativeProfileReview :showAgreement="true" v-if="userType == 2" />
  </div>
</template>
<script>
import ApiService from "@/services/api.service";
// import JwtService from "@/services/jwt.service";
// import { AGES, HEIGHTS, Employment_Statuses } from "@/models/data";

import CandidateProfileReview from "@/views/admin/user-profile/CandidateProfileReview"
import RepresentativeProfileReview from "@/views/admin/user-profile/RepresentativeProfileReview"
export default {
  name: "AdminReview",
  components: {
    CandidateProfileReview,
    RepresentativeProfileReview,
  },
  data() {
    return {
      candidateData: {},
      candidateDetails: {},
      isLoading: false,
    };
  },
  computed: {
    userType () {
      return this.$route.query.type
    }
  },
  methods: {
    getCandidateInitialInfo: async function () {
      this.isLoading = true;
      const response = await ApiService.get("v1/candidate/initial-info");
      if (response.status === 200) {
        this.isLoading = false;
        const details = {
          countries: response.data.data.countries,
          occupations: response.data.data.occupations,
          verification: {
            ...response.data.data.validation_info.verification,
            cities: [],
          },
        };

        this.candidateDetails = {
          ...this.candidateDetails,
          ...details,
        };
      }
    },
  },

  mounted () {
    this.getCandidateInitialInfo()
  }
};
</script>

<style scoped lang="scss">
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
@import "@/styles/base/_variables.scss";
.review-publish {
  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
    padding-right: 20px;
    .header-left {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
    }
  }
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
      .label-text {
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
.label-text {
  //font-size: 14px;
  font-weight: 600;
}
.flex-50 > .ml-3 {
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
