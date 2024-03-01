<template>
  <nav class="top-menu navbar justify-content-between" ref="nav">
    <div class="container">
      <router-link to="/">
        <div class="navbar-brand  mr-0"
          ><img
            class="logo"
            src="@/assets/Icons/Logo/SVG/White Logo.svg"
            alt="logo"
        /></div>
      </router-link>
      <div class="login">
        <div class="flex">
          <router-link to="/login" class="d-flex flex-row mobile-margin sign-in-btn"
            ><img
              src="@/assets/Icons/sign in.svg"
              alt=""
              class="signinBtnDesign"
            />
            <span>Sign in</span> 
          </router-link>

          <router-link to="/signup" class="d-flex flex-row mobile-margin ml-2"
            ><img
              src="@/assets/Icons/join now.svg"
              alt=""
              class="signinBtnDesign"
            />
            <span>Join Now</span> 
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header",

  mounted() {
    let scrollpos = window.scrollY;
    const header = this.$refs.nav;
    const header_height = header.offsetHeight;

    const add_class_on_scroll = () => header.classList.add("on-scroll");
    const remove_class_on_scroll = () => header.classList.remove("on-scroll");

    window.addEventListener("scroll", function () {
      scrollpos = window.scrollY;

      if (scrollpos >= header_height) {
        add_class_on_scroll();
      } else {
        remove_class_on_scroll();
      }
    });
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.top-menu {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  transition: all 0.5s;
  background-image: linear-gradient(black, #ffffff00);

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
      //margin-left: 15px;
      @media (max-width: 575px) {
        font-size: 14px;
      }
      img {
        margin-right: 5px;
      }
    }
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
