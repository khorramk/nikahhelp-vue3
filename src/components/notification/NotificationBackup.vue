<template>
  <div class="shortlist-wrapper">
    <div class="top" :class="headerColor">
      <div class="shortlist-by">
        <!--				User Name: {{ notification.user_info.name }}<span></span>-->
        User Name: Selina Pervez<span></span>
      </div>
      <div class="date">
        <!--				<span>{{ notification.create_date }}</span>-->
        <span>22-11-2021</span>
      </div>
    </div>

    <div class="bottom">
      <div class="user-img">
        <img
            src="https://www.w3schools.com/w3images/avatar2.png"
            alt=""
            class="avatar-img"
        />
        <div class="name-address">
          <p class="fs-14 mt-3">
            <!-- {{ connection.candidate_fname }} {{ connection.candidate_lname }} -->
            <!--						{{ notification.data }}-->
            Notification
          </p>
        </div>
      </div>

      <!--			<div class="report-button">-->
      <!--				&lt;!&ndash; Block Button &ndash;&gt;-->
      <!--				<button class="btn btn-sm btn-secondary">-->
      <!--					<img src="/img/edit.bdbe57d9.svg" alt="report icon" />-->
      <!--					Mark as Seen-->
      <!--				</button>-->
      <!--			</div>-->
      <!-- <div class="view-details">
        <button @click="selectCandidate">View</button>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "NotifcationBackup",
  props: ["notification"],
  data() {
    return {
      avatarSrc: "https://www.w3schools.com/w3images/avatar2.png",
    };
  },
  computed: {
    // location() {
    // 	return this.$store.state.candidateInfo.countries[
    // 		this.connection.candidate_location
    // 	].name;
    // },
    date() {
      // var d1 = this.notification.create_date.split(" ");
      // var temp = d1.slice(0, 3).join("-");
      // var d = new Date(temp);
      // const today = new Date();
      // if (d.getMonth() == today.getMonth() && today.getDate() == d.getDate()) {
      // 	return true;
      // } else {
      // 	return false;
      // }
    },
    headerColor() {
      // var d1 = this.notification.create_date.split(" ");
      // var temp = d1.slice(0, 3).join("-");
      // var d = new Date(temp);
      // const today = new Date();
      // if (d.getMonth() == today.getMonth() && today.getDate() == d.getDate()) {
      // 	return {
      // 		new: true,
      // 	};
      // } else {
      // 	return {
      // 		old: true,
      // 	};
      // }
    },
  },
  methods: {},
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.shortlist-wrapper {
  position: relative;
  padding-top: 30px;
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
      // max-width: 100%;
      padding-right: 15px;
      padding-left: 15px;
      border-top-right-radius: 15px;
      width: 150%;
    }
    @media (max-width: 540px) {
      // max-width: 270px;
      // height: 100%;
      width: 100%;
      font-size: 8px;
    }
    @media (max-width: 321px) {
      width: 100%;
      font-size: 8px;
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
  // @media (max-width: 320px) {
  // 	max-width: calc(100% - 10px);
  // }
  .new {
    background-color: $bg-secondary;
  }
  .old {
    background-color: #8983bf;
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
      padding: 10px 0px;
      // margin-right: -8px;
      text-align: center;
    }
    @media (max-width: 321px) {
      margin-left: 5px;
      margin-right: -10px;
    }
    &:hover {
      border: 3px solid #3f9de7;
    }
    .user-img {
      min-width: 250px;
      @media (max-width: 1024px) {
        margin-bottom: 5px;
      }
      img {
        max-width: 55px;
        border-radius: 10px;
        float: left;
        margin-right: 10px;
        @media (max-width: 361px) {
          margin-right: -2px;
        }
        @media (max-width: 321px) {
          margin-right: -5px;
        }
      }
      .name-address {
        float: left;
        max-width: calc(100% - 65px);
        @media (max-width: 767px) {
          padding-top: 10px;
        }
        @media (max-width: 321px) {
          width: 200px;
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
      margin-left: 60px;
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
        background-color: $color-brand;
      }
      .btn-success {
        background-color: $color-success;
      }
      .btn-dark {
        background-color: $color-black;
      }
      .btn-info {
        background-color: $color-info;
      }
      .btn-danger {
        background-color: $color-danger;
      }
    }

    .view-details {
      background-color: #6158a7;
      width: 80px;
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
