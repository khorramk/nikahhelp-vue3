<template>
  <VueFixedHeader
    @change="updateFixedStatus"
    :threshold="propsData.threshold"
    :headerClass="propsData.headerClass"
    :fixedClass="propsData.fixedClass"
    :hideScrollUp="propsData.hideScrollUp"
  >
    <nav
      id="landing-top-menu"
      class="landing-top-menu navbar justify-content-between"
    >
      <div class="container">
        <router-link to="/">
          <a href="" class="navbar-brand"
            ><img
              class="logo"
              src="@/assets/Icons/Logo/SVG/White Logo.svg"
              alt="logo"
          /></a>
        </router-link>
        <form class="login">
          <div class="flex">
            <router-link to="/login" class="d-flex flex-row mobile-margin sign-in-btn">
              <img
                src="@/assets/Icons/sign in.svg"
                alt=""
                class="signinBtnDesign"
              />
              Sign in
            </router-link>

            <router-link to="/signup" class="d-flex flex-row mobile-margin ml-2">
              <img
                src="@/assets/Icons/join now.svg"
                alt=""
                class="signinBtnDesign"
              />
              Join Now
            </router-link>
          </div>
        </form>
      </div>
    </nav>
  </VueFixedHeader>
</template>

<script>
import VueFixedHeader from "vue-fixed-header";
const createData = () => ({
  threshold: 0,
  headerClass: "vue-fixed-header",
  fixedClass: "vue-fixed-header--isFixed",
  hideScrollUp: false,
});
export default {
  name: "Header",
  components: { VueFixedHeader },
  data() {
    return {
      propsData: { ...createData() },
      isLoading: true,
      user: {},
      is_verified: 1,
      fixedStatus: {
        headerIsFixed: false,
      },
    };
  },
  created() {},
  mounted() {},

  computed: {},

  methods: {
    updateFixedStatus(next) {
      this.fixedStatus.headerIsFixed = next;
    },
  },
};
</script>
<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.landing-top-menu {
  transition: all 0.5s;
  background: #000000a6;
  .logo {
    width: 200px;
    transition: all 0.5s;
    @media (max-width: 991px) {
      max-width: 120px;
    }
    @media (max-width: 575px) {
      max-width: 105px;
    }
  }
  &.on-scroll {
    background: #000000a6;
    .logo {
      max-width: 100px;
    }
  }
  a {
    color: $color-white;
  }

  .anticon-home {
    margin-right: 5px;
    font-size: 16px;
  }
  .login {
    a {
      display: inline-flex;
      align-items: center;
      margin-left: 15px;
      @media (max-width: 575px) {
        font-size: 14px;
      }
      img {
        margin-right: 5px;
      }
    }
  }
}
nav.vue-fixed-header--isFixed {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  width: 100%;
  height: 100px;
  .logo {
    max-width: 100px;
  }
}
.signinBtnDesign {
  height: 15px;
}

.mobile-margin {
  &:hover {
    transform: scale(1.1);
  }
  @media (max-width: 360px) {
    flex-direction: column !important;
  }
}
.sign-in-btn {
  margin-right: 5px !important;
  @media (max-width: 360px) {
    margin: 0px !important;
  }
}
</style>
