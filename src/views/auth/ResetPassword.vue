<template>
  <div>
    <div class="reset-password">
      <div class="signin-inner">
        <a class="logo" href="/"
          ><img src="@/assets/Icons/Logo/SVG/White Logo.svg" alt="logo" class="mat-logo"
        /></a>
      </div>
      <h3 class="welcome-back-tag text-center text-black-50">
        <b>Reset your password</b>
      </h3>

      <Loader v-if="pageLoading" :isLoading="pageLoading" />
      <div v-else>
        <div class="inner" v-if="tokenValid">
          <form class="form" @submit.prevent="handleSubmit">
            <Spinner v-if="isLoading" />
            <p v-else-if="error" class="text-white">
              {{ error }}
              <a
                  class="btn btn-sm btn-round-sm ms-2 text-nowrap mt-2 join-now-btn"
                  @click="reset()"
              >Try again
              </a>
            </p>
            <div v-else>
              <div class="mb-2">
                <a-input
                    type="email"
                    id="email"
                    v-model="email"
                    placeholder="Enter email"
                    class="fs-16"
                />
                <!--              <span class="text-white fs-12">Email is required</span>-->
              </div>
              <div class="mb-2">
                <a-input-password
                    type="password"
                    id="password"
                    v-model="password"
                    placeholder="New password"
                    class="fs-16"
                />
                <!--              <span class="text-white fs-12">Password is required</span>-->
              </div>
              <div class="mb-2">
                <a-input-password
                    type="password"
                    id="passwordConfirm"
                    v-model="passwordConfirm"
                    placeholder="Confirm password"
                    class="fs-16"
                />
                <!--              <span class="text-white fs-12">Confirm password is required</span>-->
              </div>
              <p v-if="!formIsValid" class="fs-14 text-white">
                Invalid email or Password didn't match
              </p>
              <button type="submit" class="btn w-100 h-32 signin-btn pt-1" :disabled="!tokenValid">
                Reset Password
              </button>
            </div>
          </form>
        </div>

        <h3 class="welcome-back-tag text-center text-black-50" v-else>
          <b>Link is not valid. Redirecting to login page</b>
        </h3>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/auth/Footer.vue";
import Spinner from "@/components/ui/Spinner.vue";
import ApiService from "../../services/api.service";
export default {
  name: "ResetPassword",
  components: {
    Footer,
    Spinner,
  },
  created() {
    this.pageLoading = true;
    this.checkTokenValidity();
  },
  data() {
    return {
      email: "",
      password: "",
      passwordConfirm: "",
      isLoading: false,
      pageLoading: false,
      error: null,
      formIsValid: true,
      message: null,
      tokenValid: false,
    };
  },
  methods: {
    async checkTokenValidity() {
      let {data} = await ApiService.get(`/v1/password-reset/${this.$route.params.token}`).then(res => res);
      this.pageLoading = false;
      this.tokenValid = !!(data.data && data.data.accepted);
      this.message = data.message;

      if(!this.tokenValid) {
        const vm = this;
        this.$error({
          title: "Error!",
          content: this.message,
          center: true,
          onOk() {
            setTimeout(() => {
              vm.$router.push({ name: 'Login' });
            }, 1000)
          }
        });
      }
    },
    async handleSubmit() {
      if(this.tokenValid) {
        // Todo -- form validation. and success message
        this.formIsValid = true;
        if (
            this.email === "" ||
            !this.email.includes("@") ||
            this.password !== this.passwordConfirm
        ) {
          this.formIsValid = false;
          return;
        }
        this.isLoading = true;
        const actionPayload = {
          email: this.email,
          password: this.password,
          token: this.$route.params.token,
        };
        //console.log(actionPayload);
        try {
          await this.$store.dispatch("resetPassword", actionPayload);
          this.$router.push("/login");
        } catch (error) {
          this.error = "Something went wrong try again!";
        }
        this.isLoading = false;
      } else {
        this.$error({
          title: "Error!",
          content: "Link is not valid",
          center: true,
        });
      }
    },
    reset() {
      this.error = null;
      this.password = "";
      this.passwordConfirm = "";
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.reset-password {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: calc(100vh - 180px);
  overflow-y: auto;
  @media (min-width: 768px) {
    height: calc(100vh - 155px);
  }
  @media (min-width: 992px) {
    height: calc(100vh - 120px);
  }
  div {
    .inner {
      margin: 0 auto;
      text-align: center;
      width: 340px;
      margin-top: 26px;
      background-color: #522e8e;
      background-image: linear-gradient(
              0deg,
              #522e8e 0%,
              #932784 46%,
              #e02076 100%
      );
      border-radius: 5px;
      .logo {
        max-width: 250px;
        display: inline-block;
        margin-bottom: 20px;
      }
      .form {
        padding: 20px 20px;
      }
    }
  }
}

.signin-inner {
  background: #522e8e;
  display: flex;
  justify-content: center;
}
.mat-logo {
  width: 120px;
  height: 80px;
  @media (min-width: 768px) {
    width: 170px;
    height: 110px;
  }
}
#welcome-back-tag {
  background: -webkit-linear-gradient(white, pink, white, #8debf2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.welcome-back-tag {
  margin-top: 10px;
  @media (min-width: 768px) {
    margin-top: 30px;
  }
}
.h-32 {
  height: 32px;
}
.signin-btn {
  border: 1px solid #ffffff;
  background: #3a3092;
  color: #ffffff;
  border-radius: 20px;
  font-size: 16px;
}
.signin-btn:hover {
  background: #ffffff;
  color: #3a3092;
}
.signin-btn:focus {
  outline: none;
  box-shadow: none;
}
.join-now-btn {
  font-size: 12px;
  padding: 1px 8px;
  border: 1px solid #ffffff;
  color: $color-white;
  font-family: "Poppins", sans-serif;
}
.join-now-btn:focus {
  outline: none;
  box-shadow: none;
}
.join-now-btn:hover {
  background: $bg-primary;
  border: none;
}
</style>