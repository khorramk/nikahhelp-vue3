<template>
  <div>
    <Loader :isLoading="loading" />
    <!-- <div class="success-message font-poppins main-container" v-if="!loading && verificationFailed">
      <header class="header-container text-center">
        <a href="/"><img src="@/assets/Icons/Logo/SVG/White Logo.svg" alt=""/></a>
      </header>
      <h1 class="text-center text-danger mt-2">Email verification failed</h1>
    </div> -->
    <div class="success-message font-poppins main-container" v-if="!loading && verificationFailed">
      <header class="header-container text-center">
        <a href="/"><img src="@/assets/Icons/Logo/SVG/White Logo.svg" alt="" /></a>
      </header>
      <div class="container-fluid mb-3 body-container">
        <div class="row">
          <div class="col-12 col-md-4 offset-md-4 col-lg-4 offset-lg-4">
            <h3 class="mt-3 fw-700 text-black-50 header-text">Email Verification</h3>
            <h4 class="mt-3 font-weight-bolder congo-text">Failed!</h4>
            <img src="@/assets/icon/cross-circle-failed.svg" alt="icon" class="" />
            <p class="mt-5 verify-text fs-20">Your email verification link is expired or invalid.</p>
            <!-- <p class="mt-4">
              Please now press continue button  to complete the <span class="type-access">{{ getUserType }}</span> registration form.
            </p> -->
            <p class="mt-4">
              Please <router-link class="type-access" to="/signup">Signup</router-link> again or provide correct link.
            </p>
  
            <!-- <button
                @click="handleClick"
                class="btn btn-block ms-2 text-nowrap continue-button mb-4"
            >
              Continue
            </button> -->
            <ButtonComponent
              class="mb-4"
              title="Signup"
              :responsive="false"
              :isBlock="true"
              @onClickButton="handleClick"
            />
          </div>
        </div>
      </div>
      <div class="footer-container">
        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
import ButtonComponent from '../../components/atom/ButtonComponent.vue';
import Footer from '@/components/auth/Footer.vue';
export default {
  name: "VerifyEmail",
  components: {
    ButtonComponent,
    Footer,
  },
  mounted() {
    this.verifyEmail();
  },
  data () {
    return {
      loading: true,
      verificationFailed: false,
    }
  },
  methods: {
    async verifyEmail() {
      const actionPayload = {
        token: this.$route.params.token,
      };
      try {
        const data = await this.$store.dispatch("verify", actionPayload);
        if (data.status === 200) {
          // localStorage.setItem('user', JSON.stringify(data.data.data));
          // const user = JSON.parse(localStorage.getItem("user"));
          // user.is_verified = 1;
          // user.data_input_status = 0;
          // user.status = "1";
          // localStorage.setItem("token", `"${user.token}"`);
          // delete user.token;
          // localStorage.setItem("user", JSON.stringify(user));


          localStorage.removeItem("token");

          if(data.data.message == 'User is already verified') {
            const vm = this;
            this.$success({
              title: "Verified",
              content: "User is already verified",

              onOk() {
                setTimeout(() => vm.$router.push('/login'), 100);
              },

            });
          }
          else if(data.data.message == 'User verification successfully completed') {
            this.$router.push("/email-verification-success");
            // this.loading = false;
          }
        }
      } catch (error) {
        console.log(error.message);
        this.verificationFailed = true;
        this.loading = false;
      }
    },

    handleClick() {
      // const user = JSON.parse(localStorage.getItem("user"));
      // if (user.account_type == 1) {
      //   this.$router.push("/candidate-registration");
      // } else {
      //   this.$router.push("/representative-registration");
      // }
      this.$router.push("/signup");
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";

.success-message {
  text-align: center;
  header {
    height: 100px;
    background-color: $bg-secondary;
    img {
      margin-top: 10px;
      height: 80px;
    }
  }
  h4 {
    font-family: $body-font;
  }
  h4 {
    color: $bg-danger;
  }
  img {
    height: 80px;
  }
  button {
    background-color: $color-secondary;
    padding: 0px 20px;
    color: white;
  }
  .footer {
    bottom: 0;
    width: 100%;
    position: fixed;
    @media (min-width: 360px) {
      position: relative;
    }
    @media (min-width: 390px) {
      position: fixed;
    }
    @media (min-width: 768px) {
      bottom: 0;
      width: 100%;
      position: fixed;
    }
    @media (min-width: 1024px) {
      position: relative;
    }
    @media (min-width: 1200px) {
      bottom: 0;
      width: 100%;
      position: fixed;
    }
  }
}
.header-text {
  font-family: $body-font;
  font-size: 32px;
  @media (min-width: 768px) {
    padding: 40px 0;
  }
}
.type-access {
  color: $color-primary;
  text-decoration: underline;
  font-weight: 700;
}
.continue-button {
  height: 36px;
  border-radius: 60px;
}
.congo-text {
  @media (min-width: 768px) {
    padding-bottom: 16px;
  }
}
.verify-text {
  @media (min-width: 768px) {
    padding-top: 12px;
  }
}
.main-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}
.header-container {
  flex-shrink: 0;
}
.body-container{
  flex-grow: 1;
  //overflow: auto;
  min-height: 2em;
}
.footer-container{
  flex-shrink: 0;
}
.body-container::-webkit-scrollbar {
  display: none;
}

</style>