<template>
  <div class="email-verification font-poppins main-container">
    <Loader v-if="isLoading" />
    <header class="header-container" v-if="!isLoading">
      <a href="/"><img src="@/assets/Icons/Logo/SVG/White Logo.svg" alt="" /></a>
    </header>

    <div class="container-fluid body-container" v-if="!isLoading">
      <div class="row">
        <div class="col-12 col-md-6 offset-md-3">
          <div class="message">
            <h3 class="mt-3 fw-700 text-black-50 header-text">Email Verification</h3>
            <p>
              We have sent you a verification email to
              <br />
              <span class="email-box my-4">{{ user.email }}</span>
              <br />
              Please check your email inbox or spam folder and follow the verification
              <br />
              instructions.
            </p>
            <p>
              Wrong email address or didn’t get any email? don’t worry <router-link to="/help" class="contact-us">contact us</router-link>
            </p>
            
<p class="instruction">
              If you do not verify your email address with the sent verification link within <span class="font-italic font-weight-bold">15 minutes</span>, then this link will expire and your signup information will be deleted from MatrimonyAssist.   <br /> You can re-join at any time by once again following the MatrimonyAssist signup process.</p>
            <p>
              For user safety we need to ensure that only genuine and identifiable
              <br />
              users are on MatrimonyAssist.
            </p>
            <p>
              To help us do that all users of the MatrimonyAssist Platform will need
              to
              <br />
              verify their registration email.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="footer footer-container" v-if="!isLoading">
      <Footer />
    </div>
  </div>
</template>

<script>
import Footer from "@/components/auth/Footer";
import Loader from "@/plugins/loader/loader";
export default {
  name: "EmailVerification",
  components: {
    Footer,
    Loader,
  },
  data() {
    return {
      isLoading: true,
      user: {},
      is_verified: 0,
    };
  },
  // watch: {
  // 	is_verified: function () {
  // 		this.$router.push("/email-verification-success");
  // 	},
  // },
  created() {
    this.loadUser();
  },
  methods: {
    async loadUser() {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) {
        this.$router.push("/login");
        return;
      }
      try {
        this.user = JSON.parse(localStorage.getItem("user"));
        this.is_verified = this.user.is_verified;
        if (this.is_verified) {
          this.$router.push("/manageteam");
          this.isALoading = false;
        } else {
          this.isALoading = false;
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      } catch (error) {
        this.error = error.message || "Something went wrong";
        alert(this.error);
      }
      this.isLoading = false;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.email-verification {
  text-align: center;
  header {
    height: 100px;
    background-color: $bg-secondary;
    img {
      margin-top: 10px;
      height: 80px;
    }
  }
  h3 {
    padding-top: 10px;
    font-family: $body-font;
    font-size: 32px;
    @media (min-width: 768px) {
      padding: 10px 0;
    }
  }
  .footer {
    //@media (min-width: 576px) {
    //  bottom: 0;
    //  width: 100%;
    //  position: fixed;
    //}
    //@media (min-width: 768px) {
    //  position: relative;
    //}
    //@media (min-width: 1024px) {
    //  position: relative;
    //}
    //@media (min-width: 1200px) {
    //  bottom: 0;
    //  width: 100%;
    //  position: fixed;
    //}
  }
}
.contact-us {
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
.email-box {
  color: $color-secondary;
  background: #e9e6e6;
  border-radius: 8px;
  font-size: 20px;
  margin: 8px 0;
  padding: 4px 10px;
  @media (min-width: 768px) {
    padding: 4px 70px;
  }
}
.instruction {
  background: #522e8e;
  color: $color-white;
  padding: 12px;
  border-radius: 8px;
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
</style>