<template>
  <div class="signin login-main-container">
    <div class="signin-inner desktop-padding login-header-container">
      <a class="logo" href="/"
        ><img src="@/assets/Icons/Logo/SVG/White Logo.svg" alt="logo" class="mat-logo"
      /></a>
      <h3 id="welcome-back-tag" class="welcome-back-tag">
        <b>Welcome Back</b>
      </h3>
    </div>

    <div class="signin-inner login-body-container">
      <a-form
        ref="signinForm"
        :model="signinModel"
        :rules="rules"
        class="form-signin pb-1px shadow"
      >
        <!-- <Spinner v-if="isLoading" /> -->
        <p v-if="error">
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
            <h4 class="fs-16 text-black-50">Type your email & password</h4>
            <a-form-item ref="email" name="email">
              <a-input
                type="email"
                id="email"
                v-model:value="signinModel.email"
                placeholder="Enter email"
                class="fs-16"
              />
            </a-form-item>
          </div>

          <div class="mt-2">
            <a-form-item ref="password" name="password">
              <a-input-password
                class="fs-16"
                id="password"
                v-model:value="signinModel.password"
                placeholder="Password"
                @keyup.enter="entered()"
              />
            </a-form-item>
          </div>
          <button
            type="button"
            @click="handleSubmit"
            class="btn signin-btn h-32 w-100 pt-1 mt-1"
            style="padding: 0px !important; line-height: 1.3 !important;"
          >
            <LoadingOutlined class="fs-20 mr-2" v-if="isLoading" />
            Sign in
          </button>

          <p class="ms-2 text-nowrap mt-3">
            <router-link to="/forgot-password" class="forgot-password">
              Forgot Password?
            </router-link>
          </p>
        </div>
      </a-form>

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
          <strong id="name">MatrimonyAssist</strong>
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
import InputPassword from "@/components/ui/InputPassword.vue";

import { LoadingOutlined } from "@ant-design/icons-vue";

export default {
  name: "AdminLogin",
  components: {
    Footer,
    Spinner,
    InputPassword,

    LoadingOutlined,
  },
  data() {
    return {
      signinModel: {
        email: "",
        password: "",
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
    };
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
      this.$refs.signinForm.validate()
      .then((valid) => {
        if (valid) {
          try {
            this.isLoading = true;
            this.$store.dispatch("adminLogin", this.signinModel).then((response) => {
               this.isLoading = false;
              if (this.$store.state.auth.errorMessage) {
                this.$error({
                  title: this.$store.state.auth.errorMessage,
                  centered: true,
                });
              }
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

    refreshLogin() {
      this.isLoading = false;
      this.error = "";
    },
  },
  beforeDestroy() {
    this.$store.state.auth.errorMessage = null;
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

.ant-form-item {
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
  color: #ec1fab;
  &:hover {
    color: #ec1fab;
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
  font-width: 300;
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
  border: 1px solid #3a3092;
  color: #3a3092;
  border-radius: 20px;
  font-size: 16px;
}
.signin-btn:hover {
  background: #3a3092;
  color: #ffffff;
  box-shadow: 2px 2px 2px #999;
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
