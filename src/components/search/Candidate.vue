<template>
  <div class="shortlist-wrapper">
    <!-- <div class="top">
      <div class="shortlist-by">User:</div>
      <div class="date">
        <img data-v-0fd45a16="" src="/img/edit.bdbe57d9.svg" alt="date icon" />
        <span>12/5/2021</span>
      </div>
    </div> -->
    <!-- <span v-if="candidate.team_id" class="listed-by fs-10"
      >Team Listed By: {{ candidate.shortlisted_by_name }}</span
    >
    <span v-else class="listed-by fs-10"
      >Shortlisted By: {{ candidate.shortlisted_by_name }}</span
    > -->

    <div class="bottom">
      <div class="user-img">
        <img
            :src="candidate.image ? candidate.image : avatarSrc"
            alt=""
            class="avatar-img"
        />
        <div class="name-address">
          <p>{{ candidate.candidate.name }}</p>
          <p class="address">
            {{ country }}, {{ age }}, {{ candidate.candidate.religion }}
          </p>
        </div>
      </div>

      <!-- <div class="row shortlisted-component"> -->
      <!-- <div class="col-md-1">
        <img
          :src="candidate.image ? candidate.image : avatarSrc"
          alt=""
          class="avatar-img"
        />
      </div> -->

      <!-- <div class="col-md-4">
        <div>{{ candidate.candidate.name }}</div>
        <div class="fs-12">
          {{ country }}, {{ age }},
          {{ candidate.candidate.religion }}
        </div>
      </div> -->
      <div class="report-button">
        <!-- Checks if the candidate is shortlisted by the current logged in user -->
        <button
            v-if="!candidate.is_shortlisted"
            class="btn btn-sm btn-secondary"
            @click="storeShortlist"
        >
        <img src="@/assets/icon/star-fill-white.svg" alt="report icon" height=12px />
          Shortlist
        </button>
        <button v-else>Shortlisted</button>

        <!-- Checks if the candidate is teamlisted by the current logged in user -->
        <button
            v-if="!candidate.is_team_shortlisted"
            class="btn btn-sm btn-secondary"
            @click="storeTeamlist"
        >
          <img src="@/assets/icon/teamlist.svg" alt="teamlist icon"/>
          Teamlist
        </button>
        <button v-else>Teamlisted</button>

        <button
            v-if="candidate.candidate_team_id"
            class="btn btn-sm btn-secondary"
            @click="connectRequest"
        >
           <img src="@/assets/icon/connect.svg" alt="connect icon" height=13px/>
          Connect
        </button>
        <button v-else class="btn btn-sm btn-secondary" disabled>
          <img src="@/assets/icon/connect.svg" alt="report icon"/>
          Connect
        </button>
        <button class="btn btn-sm btn-secondary btn-brand" @click="block">
          <img src="@/assets/icon/Support.svg" alt="connect icon" height=14px/>
          Block
        </button>
      </div>
      <!-- <div class="col-md-5">
        <div class="row">
          <div class="col-md-4 col-btn">
            <div>
              <button class="btn btn-sm btn-secondary">Connect</button>
            </div>
          </div>
          <div class="col-md-4 col-btn">
            <div>
              <button class="btn btn-sm btn-secondary">Connect</button>
            </div>
          </div>
          <div class="col-md-4 col-btn">
            <div>
              <button class="btn btn-sm btn-secondary">Connect</button>
            </div>
          </div>
        </div>
      </div> -->
      <div class="view-details">
        <button @click="selectedCandidate">Over View</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Candidate",
  props: ["candidate"],

  data() {
    return {
      avatarSrc: "https://www.w3schools.com/w3images/avatar2.png",
      isShortlisted: null,
    };
  },
  computed: {
    country() {
      return this.candidate.candidate.location_name;
    },
    age() {
      return this.getAge(this.candidate.candidate.age);
    },
  },
  methods: {
    getAge(dateString) {
      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },
    selectedCandidate() {
      this.$emit("selected-candidate", this.candidate);
    },
    storeShortlist() {
      this.$emit("store-shortlist", this.candidate.id);
    },
    storeTeamlist() {
      //console.log(this.candidate.id);
      this.$emit("store-teamlist", this.candidate.id);

      // setTimeout(() => {
      // 	this.markShortlisted();
      // }, 2000);
    },
    connectRequest() {
      this.$emit("connect-request", this.candidate.candidate_team_id);
    },
    block() {
      this.$emit("block-candidate", this.candidate.id);
    },
    // markShortlisted() {
    // 	this.isShortlisted = true;
    // 	console.log(this.isShortlisted);
    // },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";

.shortlist-wrapper {
  position: relative;
  padding-top: 10px;
  margin-bottom: 20px;
  padding-left: 5px;
  padding-right: 10px;

  .top {
    background-color: #8983bf;
    border-top-left-radius: 15px;
    border-top-right-radius: 100px;
    width: 100%;
    max-width: 400px;
    position: absolute;
    top: 0;
    color: #ffffff;
    display: flex;
    justify-content: space-between;
    padding: 5px 40px 5px 5px;
    min-height: 50px;
    font-size: 13px;
    @media (max-width: 1024px) {
      max-width: calc(100% - 15px);
      border-radius: 10px;
    }
    @media (max-width: 767px) {
      max-width: none;
      padding-right: 15px;
      padding-left: 15px;
      border-top-right-radius: 15px;
    }

    .shortlist-by {
      span {
        font-style: normal;
      }
    }

    .date {
      font-style: italic;

      img {
        width: 18px;
        margin-right: 5px;
      }
    }
  }

  .bottom {
    background-color: #ffffff;
    box-shadow: 2px 0px 8px 0px #999;
    position: relative;
    z-index: 1;
    border-radius: 13px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 3px solid #ffffff;
    @media (max-width: 1024px) {
      flex-direction: column;
      align-items: flex-start;
    }
    @media (max-width: 767px) {
      flex-direction: column;
      padding: 10px 0;
      text-align: center;
    }

    &:hover {
      border: 3px solid #3f9de7;
    }

    .user-img {
      min-width: 250px;
      @media (max-width: 1024px) {
        margin-bottom: 10px;
      }

      img {
        max-width: 55px;
        border-radius: 10px;
        float: left;
        margin-right: 10px;
      }

      .name-address {
        float: left;
        @media (max-width: 767px) {
          padding-top: 10px;
        }

        p {
          color: #4d4d4d;
          font-size: 16px;
          margin: 0;
        }

        .address {
          color: #7a7a7a;
          font-size: 14px;
        }
      }
    }

    .team-name {
      flex-basis: 50%;
      text-align: center;
      @media (max-width: 992px) {
        flex-basis: 30%;
      }
      @media (max-width: 767px) {
        padding-top: 20px;
      }

      p {
        margin: 0;
      }
    }

    .report-button {
      text-align: right;
      @media (max-width: 1024px) {
        margin-bottom: 20px;
        text-align: left;
      }
      @media (max-width: 767px) {
        padding-top: 20px;
      }

      button {
        font-size: 11px;
        margin-right: 5px;
        margin-top: 5px;
        margin-bottom: 5px;

        img {
          width: 18px;
          margin-top: -3px;
          margin-left: -3px;
        }
      }

      .btn-brand {
        background-color: $bg-brand;
      }
    }

    .reported {
      background-color: #b3b3b3;
    }

    .view-details {
      background-color: #6158a7;
      width: auto;
      margin-left: 5px;
      height: 55px;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      font-size: 13px;
      padding: 5px;
      @media (max-width: 1024px) {
        margin-bottom: 10px;
        border-radius: 10px;
        height: 34px;
      }
      @media (max-width: 767px) {
        margin-top: 20px;
        border-radius: 10px;
        line-height: 30px;
        padding: 0 30px;
        margin-left: 0;
        display: block;
        width: auto;
      }

      button {
        line-height: 14px;
      }
    }
  }

  &.active {
    .bottom {
      border: 3px solid #3f9de7;
    }
  }
}

// end css for shortlist wrapper
// .shortlist-wrapper {
// 	position: relative;
// 	padding-top: 30px;
// 	margin-bottom: 30px;
// 	.listed-by {
// 		margin-left: 5px;
// 		background-color: $color-primary;
// 		color: $color-white;
// 		border-top-left-radius: 10px;
// 		padding: 0px 5px 0px 5px;
// 	}
// 	.shortlisted-component {
// 		display: flex;
// 		align-items: center;
// 		height: 50px;
// 		width: 100%;
// 		margin-left: 5px;
// 		border: 1px solid #aaa;
// 		border-radius: 5px;
// 		.avatar-img {
// 			height: 45px;
// 			width: 45px;
// 			border-radius: 5px;
// 		}
// 		.col-md-1 {
// 			padding: 0px !important;
// 		}
// 		.view-details {
// 			display: flex;
// 			justify-content: center;
// 			align-items: center;
// 			background-color: $color-secondary;
// 			padding: 0 !important;
// 			height: 100%;
// 			color: $color-white;
// 			font-size: 12px;
// 			border-radius: 5px;
// 		}
// 	}
// }
</style>