<template>
  <div>
    <div class="forget-password pb-4 font-poppins">
      <div class="inner">
        <div class="signin-inner desktop-padding">
          <a class="logo" href="/"
            ><img src="@/assets/Icons/Logo/SVG/White Logo.svg" alt="logo" class="mat-logo"
          /></a>
          <h3 id="welcome-back-tag" class="welcome-back-tag">
            <b>{{
              message ? "Reset password link sent" : "Forgot your password?"
            }}</b>
          </h3>
        </div>
        <form class="form">
          <Spinner v-if="isLoading" />
          <!-- <div v-else-if="error" class="text-black-50">
            <p>{{ error }}</p>
            <div class="flex justify-content-center align-items-center">
              <button class="">
                Back to
                <router-link
                  to="/login"
                  class="
                    btn btn-sm btn-outline-primary btn-round-sm btn-signinup
                    ms-2
                    text-nowrap
                    join-now-btn
                  "
                >
                  Sign in
                </router-link>
              </button>
              <h4 class="fs-16 pt-1 pl-2 pr-1 text-white text-black-50">or</h4>
              <button class="">
                <router-link
                  to="/signup"
                  class="
                    btn btn-sm btn-outline-primary btn-round-sm btn-signinup
                    ms-2
                    text-nowrap
                    join-now-btn
                  "
                >
                  Join now
                </router-link>
              </button>
            </div>
          </div> -->
          <div v-else>
            <div class="mb-3" v-if="!message">
              <h5 class="fs-18 text-black-50">Retrieve your password here</h5>
              <p class="fs-14 text-black-50">
                Please enter your registered email address below. You will receive a link
                to reset your password. <Spinner v-if="isLoading" />
              </p>
              <a-form-model
                ref="forgetPasswordForm"
                :model="forgetPassword"
                :rules="rules"
              >
                <a-form-model-item ref="email" prop="email">
                  <a-input
                    type="email"
                    class="form-control rounded-input fs-16"
                    id="email"
                    v-model="forgetPassword.email"
                    placeholder="Enter email"
                  />
                </a-form-model-item>
              </a-form-model>
            </div>
            <p v-if="message" class="message">
              {{ message }}
            </p>
            <div class="d-flex justify-content-center mb-2">
              <div id="g-recaptcha"></div>  
            </div>

            <div class="button-container">
              <router-link
                role="button"
                class="btn btn-primary-outlined w-50 mr-2"
                to="/login"
                :class="{ 'flex justify-content-center': message }"
              >
                &#xab; <span style="display:inline;">Sign in</span>
              </router-link>
              
              <!-- <button
                :disabled="disabled"
                v-if="!message"
                type="submit"
                class="btn btn-primary w-100"
                @click="handleSubmit"
              >
                Get Password Reset Link
              </button> -->
              
              <ButtonComponent
                v-if="!message"
                class="w-100 connect-button"
                :backgroundColor="reCaptchaNotCompleted ? '#dfdfdf' : '#3ab549'"
                :isSmall="true"
                :isDisabled="reCaptchaNotCompleted"
                title="Get Password Reset Link"
                :isBlock="true"
                :responsive="false"
                @onClickButton="handleSubmit"
                :style="{'cursor': reCaptchaNotCompleted ? 'not-allowed' : 'pointer'}"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/auth/Footer.vue";
import Spinner from "@/components/ui/Spinner.vue";
import ButtonComponent from '@/components/atom/ButtonComponent';

export default {
  name: "ForgetPassword",
  components: {
    Footer,
    Spinner,
    ButtonComponent
  },
  data() {
    return {
      forgetPassword: {
        email: "",
      },
      isLoading: false,
      error: null,
      formIsValid: true,
      message: null,
      disabled: true,
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
      },
      reCaptchaNotCompleted: true,
    };
  },
  created() {
    this.initializeReCaptcha();
    window.enableSubmitButton = this.enableSubmitButton;
  },
  methods: {
    initializeReCaptcha() {
      const recaptchaScript = document.createElement("script");
      recaptchaScript.setAttribute(
        "src",
        "https://www.google.com/recaptcha/api.js"
      );
      document.head.appendChild(recaptchaScript);
  
      let checkInterval = setInterval(function () {
        if (grecaptcha !== undefined) {
          clearInterval(checkInterval);
          console.log('recaptcha is ready');
          grecaptcha.ready(function () {
            grecaptcha.render("g-recaptcha", {
              sitekey: "6LcfI0ojAAAAAIUgZwZrXgDriDRSgKBYeKzmqMo6",
              callback: "enableSubmitButton"
            });
          });
        }
        console.log('rener completed outside');
      }, 500);
    },

    enableSubmitButton(response) {
      console.log('enablesubmit button called', response);
      this.reCaptchaNotCompleted = false;
    },
    async handleSubmit() {
      try {
        this.$refs.forgetPasswordForm.validate((valid) => {
          if (valid) {
            this.disabled = true;
            this.isLoading = true;
            if(this.reCaptchaNotCompleted) {
              this.$error({
                title: 'Please complete the reCaptcha',
                center: true,
              });
              this.disabled = true;
              this.isLoading = false;
              return;
            }
            this.$store
              .dispatch("forgetPassword", this.forgetPassword)
              .then((re) => {
                this.disabled = false;
                this.message = "We have sent you a password reset link to your registered email address. This link is valid for 15 mins.";
                this.isLoading = false;
              })
              .catch((r) => {
                this.disabled = false;
                if(r.response?.status === 400) {
                  this.$error({
                    title: 'There’s no account associated with this email address. Try another email address or create a new account.',
                    center: true,

                    onOk: () => {
                      this.$router.push('/login');
                    }
                  });
                }
              });
          }
        });
      } catch (error) {
        this.error = "There’s no account associated with this email address. Try another email address or create a new account.";
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.forget-password {
  min-height: calc(100vh - 118px);
  background-color: #522e8e;
  background-image: linear-gradient(
    0deg,
    #522e8e 0%,
    #932784 46%,
    #e02076 100%
  );
  .inner {
    max-width: 500px;
    margin: 0 auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 8px;
    .logo {
      max-width: 250px;
      display: inline-block;
      .mat-logo {
        width: 120px;
        height: 80px;
        @media (min-width: 768px) {
          width: 170px;
          height: 110px;
        }
      }
    }
    h3,
    h5,
    h6 {
      color: $bg-white;
    }
    .form {
      background: $bg-white;
      padding: 20px;
      border-radius: 12px;
      max-width: 400px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      margin-top: 36px;

      .button-container::v-deep {
        width: 100%;
        display: flex;
        //height: 35px;

        @media (max-width: 576px) {
          flex-direction: column-reverse;
          align-items: center;
        }
        .btn-primary-outlined {
          box-shadow: none !important;
          border: none;
          
          &:hover{
            background-color: transparent !important;
            color: #522e8e;
          }

          span {
            &:hover {
              border-bottom: 1px solid #522e8e;
            }
          }
          @media (max-width: 576px) {
            margin-top: 12px;
          }
        }
        .connect-button {
          .v-custom {
            height: 33px;
            font-size: 14px;
            letter-spacing: 0px;
          }
          .v-custom:hover {
            background: #fff !important;
            color: $bg-success !important;
            border: 1px solid $bg-success !important;

            img {
            filter: none !important;
            }
          }
	      }
      }
      .warning {
        color: red;
        font-size: 14px;
        margin-top: 5px;
      }
      .message {
        font-size: 14px;
        padding: 10px 15px;
      }
    }
  }
}
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
.btn-style {
  margin-top: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
}
#welcome-back-tag {
  background: -webkit-linear-gradient(white, pink, white, #8debf2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.welcome-back-tag {
  @media (min-width: 768px) {
    margin-top: 20px;
  }
}
.rounded-input {
  border-radius: 30px;
}
.join-now-btn {
  color: $color-primary;
  border: 1px solid $border-primary;
  font-size: 10px;
  @media (min-width: 576px) {
    font-size: 12px;
  }
}
.join-now-btn:focus {
  outline: none;
  box-shadow: none;
}
.join-now-btn:hover {
  background: $bg-primary;
  box-shadow: 0 2px 2px #999;
  color: #ffffff;
  border: none;
}
</style>