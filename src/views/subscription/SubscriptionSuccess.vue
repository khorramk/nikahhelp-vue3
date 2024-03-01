<template>
  <div>
    <div v-if="isLoading">Loading</div>

    <div
      class="
        root-content
        container-fluid
        d-flex
        justify-content-center
        mt-5
        py-4
        position-relative
      "
    >
      <div class="row text-center mt-3">
        <div class="col-12">
          <img
            class="check-icon"
            src="@/assets/icon/check-circle-fill-green.svg"
            alt=""
          />
        </div>
        <div class="col-12 mt-2">
          <p class="fs-22">Done, your payment successful</p>
          <p class="fs-18">
            You team <b>{{ team }}</b> has successfully subscribed
            <b>{{ subscriptionName }}</b
            >.
          </p>

          <div class="col-12 text-center mt-4 btn-border-radius">
            <a href="/manageteam" class="btn btn-primary fs-18 team-btn-primary btn-lg px-5 btn-block-50"
            >Manage Team
              <span class="fs-20">&#8594;</span>
            </a>
          </div>

<!--          <p class="fs-18">-->
<!--            You can view payment receipt from Manage team > Team Setting >-->
<!--            Subscription details,-->
<!--          </p>-->
<!--          <p class="fs-18">-->
<!--            also we sent payment confirmation email to your Matrimony assist-->
<!--            account email.-->
<!--          </p>-->
        </div>
        <div class="col-12 col-md-6 offset-md-3 text-center mt-5">
          For more information visit Our
          <a href="/help" class="fs-14 text-blue">FAQ</a> page. <br />
          Any other queries? Please
          <a href="/help" class="text-blue fs-14">Contact us</a>
        </div>
<!--        <div class="col-12 text-center mt-4 mobile-btn-block">-->
<!--          <a href="/manageteam" class="btn btn-primary fs-18 team-btn-primary"-->
<!--            >Manage Team-->
<!--            <span class="fs-20">&#8594;</span>-->
<!--          </a>-->
<!--        </div>-->
<!--        <div class="position-absolute team-btn desktop-btn-block">-->
<!--          <a href="/manageteam" class="btn btn-primary fs-18 team-btn-primary"-->
<!--            >Manage Team-->
<!--            <span class="fs-20">&#8594;</span>-->
<!--          </a>-->
<!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/dashboard/layout/Header.vue";
import Sidebar from "@/components/dashboard/layout/Sidebar.vue";
import Footer from "@/components/dashboard/layout/Footer.vue";

export default {
  components: {
    Header,
    Sidebar,
    Footer,
    // ShortlistedCandidate
  },
  data() {
    return {
      isLoading: false,
      user: {},
      is_verified: 1,
      error: null,
      team: null,
      subscriptionName: null,
    };
  },
  created() {
    this.getTeamDetails();
  },
  methods: {
   
    getTeamDetails() {
      const team = this.$route.params.team;
      const subscriptionName = this.$route.params.subName;
      this.team = team;
      this.subscriptionName = subscriptionName;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.root-content {
  max-width: calc(100% - 40px);
}
.text-blue {
  color: #1b83d8;
  font-weight: bold;
}
.team-btn {
  bottom: 25px;
  right: 10px;
}
.team-btn-primary {
  border: 1px solid $color-white;
  border-radius: 30px !important;
  box-shadow: 0px 1px 3px #B2aaaa !important;

  &:hover {
    background: #fff !important;
    color: $bg-primary !important;
    border: 1px solid $bg-primary !important;
  }
}

.btn-block-50 {
  width: 50%;

  @media (max-width: 768px) {
    width: auto;
  }
}
.check-icon {
  width: 100px;
  height: 100px;
}
.mobile-btn-block {
  display: block;
}
.desktop-btn-block {
  display: none;
}
@media (min-width: 992px) {
  .root-content {
    max-width: calc(100% - 240px);
  }
  .check-icon {
    width: 200px;
    height: 200px;
  }
  .mobile-btn-block {
    display: none;
  }
  .desktop-btn-block {
    display: block;
  }
}
</style>
