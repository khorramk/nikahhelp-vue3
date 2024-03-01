<template>
  <div class="signin login-main-container">
    <div class="signin-inner desktop-padding login-header-container">
      <router-link class="logo" to="/"
        ><img src="@/assets/Icons/Logo/SVG/White Logo.svg" alt="logo" class="mat-logo"/>
      </router-link>
      <h3 id="welcome-back-tag" class="welcome-back-tag">
        <b>Welcome Back</b>
      </h3>
    </div>

    <div class="signin-inner login-body-container">
      <a-form-model
        ref="signinForm"
        :model="signinModel"
        :rules="rules"
        class="form-signin pb-1px shadow"
      >
        <div class="" v-if="verifyTwoFactor">
          <p class="fs-16 text-black-50">{{ verifyTwoFactroMsg }}</p>
          <a-form-model-item>
            <a-input
              type="text"
              class="fs-16"
              id="verficationCode"
              v-model="signinModel.twoFACode"
              placeholder="Verfication Code"
            />
          </a-form-model-item>
          <button
            type="button"
            @click="verify2fa(signinModel)"
            class="btn signin-btn h-32 w-100 mt-1"
            style="padding: 0px !important; line-height: 1.3 !important;"
          >
            <a-icon type="loading" class="mr-2 fs-20" v-if="isLoading" />
            Verify
          </button>

          <div class="my-2">
            <div class="mt-3">
              <div style="background-color: #fff; color: #fff; padding: 8px; border-radius: 10px;">
                <div class="fs-14 mb-0 text-black-50">
                  If you didn't receive any verification code yet then please wait! Verification code may take up to 5 minutes to be sent to your email, you can request a 
                  <div class="ms-2 text-nowrap mt-1">
                    <a-icon type="loading" class="mr-2 fs-20" v-if="isResendingCode" />
                    <a v-if="timeLeft == 0" class="resend-code" @click="handleResend">
                      <v-else>
                        Resend code
                      </v-else>
                    </a>
                    <span v-else>resend code in {{ formattedTimeLeft }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <!-- <Spinner v-if="isLoading" /> -->
        <p v-else-if="error">
          {{ error }}
          <router-link
            to="/login"
            class="btn btn-sm btn-outline-primary btn-round-sm ms-2 text-nowrap"
          >
            Sign in
          </router-link>
        </p>
        <div v-else>
          <div class="">
            <!-- <h4 class="fs-16 text-black-50">Type your email & password</h4> -->
            <a-form-model-item ref="email" prop="email">
              <a-input
                type="email"
                id="email"
                v-model="signinModel.email"
                placeholder="Enter email"
                class="fs-16"
              />
            </a-form-model-item>
          </div>

          <div class="">
            <a-form-model-item ref="password" prop="password">
              <a-input-password
                type="password"
                class="fs-16"
                id="password"
                v-model="signinModel.password"
                placeholder="Password"
                @keyup.enter="entered()"
              />
            </a-form-model-item>
          </div>
          <button
            type="button"
            @click="handleSubmit"
            class="btn signin-btn h-32 w-100 mt-1"
            style="padding: 0px !important; line-height: 1.3 !important;"
          >
            <a-icon type="loading" class="mr-2 fs-20" v-if="isLoading" />
            Sign in
          </button>

          <p class="ms-2 text-nowrap mt-3">
            <router-link to="/forgot-password" class="forgot-password text-black-50">
              Forgot Password?
            </router-link>
          </p>
        </div>
      </a-form-model>

      <div class="join-now pb-4">
        <p class="flex-center-center mt-3 text-white bottom-link-text">
          New to <span class="logo-text"> MatrimonyAssist? </span>

          <router-link
            to="/signup"
            class="btn ms-2 text-nowrap join-now-btn"
            style="margin-left: 5px"
          >
            Join Now
          </router-link>
        </p>
      </div>

      <div class="welcome-back">
        <p class="welcome-back-text">
          <span id="name" style="font-weight: 200;">MatrimonyAssist</span>
          is team based, the candidate is never alone
        </p>
      </div>
    </div>

    <Footer class="login-footer-container bg-white" />
  </div>
</template>

<script>
import Footer from "@/components/auth/Footer.vue";
import Spinner from "@/components/ui/Spinner.vue";
import InputPassword from "@/components/ui/InputPassword";
import JwtService from "../../services/jwt.service";
import axios from "axios";
import router from "../../router";

export default {
  name: "Login",
  components: {
    Footer,
    Spinner,
    InputPassword,
  },
  data() {
    return {
      signinModel: {
        email: "",
        password: "",
        twoFACode: "",
      },
      isLoading: false,
      error: null,
      rules: {
        email: [
          {
            required: true,
            message: "Please input your email address",
          },
          {
            type: "email",
            message: "Please input a valid email",
          },
        ],

        password: [{ required: true, message: "Please input your password" }],
      },
      verifyTwoFactor: false,
      verifyTwoFactroMsg: "",
      timePassed: 0,
      timerInterval: null,
      timeLimit: 300,
      isResendingCode: false,
    };
  },
  computed: {
    formattedTimeLeft() {
      const timeLeft = this.timeLeft;
      const minutes = Math.floor(timeLeft / 60);
      let seconds = timeLeft % 60;

      if (seconds < 10) {
        seconds = `0${seconds}`;
      }

      return `${minutes}:${seconds}`;
    },

    timeLeft() {
      return this.timeLimit - this.timePassed;
    },
  },
  watch: {
    timeLeft(newValue) {
      if (newValue === 0) {
        this.onTimesUp();
      }
    }
  },
  methods: {
    entered() {
      if (
        this.signinModel &&
        this.signinModel.email &&
        this.signinModel.password
      ) {
        this.handleSubmit();
      }
    },
    async handleSubmit() {
      this.$refs.signinForm.validate((valid) => {
        if (valid) {
          try {
            this.isLoading = true;
            let res = this.$store.dispatch("login", this.signinModel).then((response) => {
              this.isLoading = false;
              if (this.$store.state.auth.errorMessage) {
                this.$error({
                  title: this.$store.state.auth.errorMessage,
                  centered: true,
                });
              }
              if(this.$store.state.auth.twoFAMessage){
                this.verifyTwoFactroMsg = this.$store.state.auth.twoFAMessage;
                this.verifyTwoFactor = true;
                this.onTimesUp();
                this.startTimer();
              }
              console.log(response, 'rest');
            });
          } catch (error) {
           
            this.error = error.response.data.message;
            this.isLoading = false;
          }
        } else {
          return false;
        }
      });
    },
    // resend btn timer
    onTimesUp() {
      clearInterval(this.timerInterval);
    },
    startTimer() {
      this.timePassed = 0;
      this.timerInterval = setInterval(() => (this.timePassed += 1, console.log(this.timePassed)), 1000);
    },
    async verify2fa(payload) {

      if(this.isResendingCode) {
        return;
      }

      // validation for 2fa code
      if(payload.twoFACode === "" && !payload.isResend) {
        this.$error({
          title: "Please enter verification code.",
          centered: true,
        });
        return;
      } else if(payload.twoFACode.length != 6 && !payload.isResend) {
        this.$error({
          title: "Please enter a valid verification code.",
          centered: true,
        });
        return;
      } else if(payload.twoFACode.match(/^[0-9]+$/) === null && !payload.isResend) {
        this.$error({
          title: "Please enter valid verification code.",
          centered: true,
        });
        return;
      }

      if(payload.isResend == true) {
        this.isResendingCode = true;
      } else {
        this.isLoading = true;
      }
      try {
        let response = await axios.post('v1/verify-2fa', payload);
        console.log(response, 'data');
        if(response.data.message === "A verification code was sent to your email.") {
          this.$success({
            title: "A new verification code was sent to your email, please check your email inbox, spam or junk folder for latest verification code.",
            centered: true,
          });
          this.onTimesUp();
          this.startTimer();
        } else if(response.data.message === "Logged in successfully!") {
          this.onTimesUp();
          const token = response.data.data.token.access_token;
          let data = { token: token };
          JwtService.saveTokenAndUser(data);
          JwtService.setUser(response.data.data.user);
    
          if(router.history._startLocation === '/login' || router.history._startLocation.includes('/emailVerify/') || router.history._startLocation.includes('/email-verification-success')) {
            router.push({ name: 'root' });
          } else {
            router.push({ path: `${router.history._startLocation}`});
          }
        }
        this.isResendingCode = false;
        this.isLoading = false;
      } catch (error) {
        console.log(error, 'error');
        this.$error({
          title: error.response.data.message,
          centered: true,
        });
        this.isResendingCode = false;
        this.isLoading = false;
      }
    },
    async handleResend() {
      this.signinModel.isResend = true;
      this.verify2fa(this.signinModel);
      this.signinModel.isResend = false;
    },
    refreshLogin() {
      this.isLoading = false;
      this.error = "";
    },
  },
  beforeDestroy() {
    this.$store.state.auth.errorMessage = null;
    clearInterval(this.timerInterval);
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
@import "@/styles/components/_inputs.scss";
//.login-container {
//display: flex;
//flex-direction: column;
//overflow: auto;
//height: calc(100vh);

.signin {
  //height: 100vh;
  background-color: #522e8e;
  background-image: linear-gradient(
    0deg,
    #522e8e 0%,
    #932784 46%,
    #e02076 100%
  );

  .signin-inner {
    max-width: 400px;
    padding: 20px 15px;
    margin: 0 auto;
    text-align: center;
    @media (min-width: 768px) {
      padding: 30px 15px;
    }
    .logo {
      max-width: 250px;
      display: inline-block;
      margin-bottom: 8px;
      .mat-logo {
        width: 120px;
        height: 80px;
        @media (min-width: 768px) {
          width: 170px;
          height: 110px;
        }
      }
    }
    .form-signin {
      background: $bg-white;
      padding: 20px;
      border-radius: 5px;

      .forgot {
        font-size: 14px;
        font-weight: bold;
        margin-top: 5px;
        text-decoration: none;
        color: #b30d7e;
        padding: 5px 15px 5px 15px;
        border-color: #b30d7e;
      }
      .forgot:hover {
        box-shadow: 2px 2px 2px #989597;
        background-color: white;
      }
      .warning {
        color: red;
        font-size: 14px;
        margin-top: 5px;
      }

      .need-help {
        cursor:pointer; 
        text-decoration:underline; 
        font-size: 13px; 
        color: grey;
      
        &:hover {
          color: #000;
        }
      }
    }
  }
}

#name {
  font-family: Rochester, cursive;
  font-size: 20px;
  color: white;
  padding-left: 7px;
}

.welcome-back {
  .welcome-back-text {
    padding-top: 0px;
    padding-bottom: 10px;
    text-align: center;
    margin-top: -20px;
    margin-bottom: 0px;
    color: #c2f0fd;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    @media (min-width: 768px) {
      margin-top: 0;
    }
  }
}

#join-now {
  background-color: #43e3e6fd;
  color: white;
  border: white;
  margin: 5px;
}

#join-now:hover {
  color: #f5e6f4;
  box-shadow: 2px 2px 2px #383332;
}

#welcome-back-tag {
  background: -webkit-linear-gradient(white, pink, white, #8debf2);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.btn-primary {
  box-shadow: 0px 0px;
  &:hover,
  &:not(:disabled):not(.disabled):active {
    box-shadow: 2px 2px 2px #999;
  }
}
//}

.ant-form-item::v-deep {
  margin-bottom: 0px;
  
  .ant-input {
    height: auto !important;
  }

  input {
    border: 1px solid #80808057;
    background: #fafafa;
  }
}
.forgot-password {
  font-size: 14px;
  &:hover {
    color: #ec1fab !important;
    border-bottom: 1px solid #ec1fab;
  }
}

.resend-code {
  font-size: 14px;
  font-weight: 600;
  color: #ec1fab !important;
  &:hover {
    border-bottom: 1px solid #ec1fab;
  }
}


.pb-1px {
  padding-bottom: 1px !important;
}
.join-now-btn {
  color: #ffffff;
  border: 1px solid #ffffff;
  padding: 0 6px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 300;
}
.join-now-btn:hover {
  background: $bg-primary;
  box-shadow: 0 2px 2px rgb(0 0 0 / 25%);
}
.join-now-btn:focus {
  outline: none;
  box-shadow: none;
}
.bottom-link-text {
  font-size: 14px;
  @media (min-width: 768px) {
    font-size: 16px;
  }
}
.welcome-back-tag {
  @media (min-width: 768px) {
    margin-top: 12px;
  }
}
.desktop-padding {
  padding: 0 15px 0 15px !important;
  @media (min-width: 768px) {
    padding: 0 0 0 0 !important;
  }
}
.none-padding {
  padding: 0 15px !important;
  @media (min-width: 768px) {
    padding: 0 !important;
  }
}
.logo-text {
  font-family: $header-font;
  margin-left: 10px;
  margin-right: 5px;
  font-size: 18px;
  @media (min-width: 768px) {
    font-size: 24px;
  }
}
.signin-btn {
  border: 1px solid $color-success;
  background: $color-success;
  color: #ffffff;
  box-shadow: 1px 1px 1px #999;
  border-radius: 20px;
  font-size: 16px;
}
.signin-btn:hover {
  background: #fff;
  color: $color-success;
}
.signin-btn:focus {
  outline: none;
  box-shadow: none;
}
.h-32 {
  height: 32px;
}
.login-main-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}
.login-header-container {
  flex-shrink: 0;
}
.login-body-container {
  flex-grow: 1;
  overflow: auto;
  min-height: 2em;
}
.login-footer-container {
  flex-shrink: 0;
}
</style>
