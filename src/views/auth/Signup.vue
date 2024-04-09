<template>
  <div class="signup-container font-poppins main-container">
    <div class="signin-inner desktop-padding header-container text-center">
      <router-link class="logo" to="/"
        ><img src="@/assets/Icons/Logo/SVG/White Logo.svg" alt="logo" class="mat-logo"
      /></router-link>
    </div>

    <div v-if="!showSignUpPage" class="container signup-text-container">
      <section class="section-1 mt-4">
        <h3 class="text-header-black">Welcome to MatrimonyAssist Signup</h3>
        <p>To use MatrimonyAssist App, you are required to create at least <b>two profiles</b>, one for the candidate and the other for a representative of the candidate. In MatrimonyAssist, the candidate and the representative(s) jointly play a vital role in finding prospects.</p>
        <p>Depending on your requirement and eligibility, you join MatrimonyAssist either as a candidate or a representative or a matchmaker if this is your profession. </p>
        <p>To sign up and register with MatrimonyAssist, you will need a valid email address, a mobile number, an avatar, a main and an additional image.</p>

        <div style="padding-left: 15px; border-left: 10px solid #b1b4b6">
          If you are a candidate, you will also need:
          <ul style="list-style-type: disc !important;">
            <li>proof of identity (such as national ID, passport, driving licence)</li>
            <li>proof of address (randomly requested and checked by MatrimonyAssist) </li>
          </ul>         
        </div>
        <br> <br>
        <div style="padding-left: 15px; border-left: 10px solid #b1b4b6">
          And if you are a representative of a candidate, you will also need: 
          <ul style="list-style-type: disc !important;">
            <li>consent from your candidate to represent them on MatrimonyAssist platform</li>
            <li>name of a referee (a person with community standing who could provide reference about you at request)</li>
          </ul>         
        </div>

        <p class="my-6">If you want to join as a matchmaker, you will have to go through a slightly different registration process. Currently this option is only available through direct contact with the MatrimonyAssist Team. </p>

        <ButtonComponent
          minHeight="50px"
          class="btn-join-now"
          :isSmall="false"
          title="Join now"
          :isBlock="true"
          :responsive="false"
          backgroundColor="#3ab549"
          @onClickButton="showSignUpPage = true"
        />
      </section>

      <section class="section-2">
        <h4>After the Registration</h4>
        <p>After the registration you need to create a team that must include a candidate and a representative who have already completed their respective registration forms. Maximum of up to 4 representatives can join in a team. Once the team is formed, you then make a subscription payment for the team. In MatrimonyAssist, payment is team based. One member pays, the rest use it for free. </p>
      </section>

      <section class="section-3 mt-4">
        <h4>What you need to know</h4>
        <p>Once your registration form is completed and submitted, it will go through a verification and approval process. MatrimonyAssist will usually make a decision within 24 hours. However, if there are any compliance issues, MatrimonyAssist shall contact you through notification and customer support/personal settings section.</p>
      </section>

      <section class="section-4 mt-4">
        <h4>If your application is refused</h4>
        <p>MatrimonyAsssist team will tell you why your application is refused.</p>
        <p>You can ask us to reconsider your case if you do not think all the important information you provided was taken into account.</p>
      </section>

      <section class="section-5 mt-4">
        <h4>If you need help</h4>
        <p>For questions about sign up and registration you may <router-link to="/help">contact</router-link> the MatrimonyAssist Team.</p>
      </section>


    
    </div>
    
    <div class="signup body-container" v-if="showSignUpPage">
      <div class="type-selection" v-if="showMemberTypeForm && !errorMessage">
        <div class="content mb-5">
          <!-- <h3 class="mt-3 text-header-black font-weight-bolder">
            
            Welcome to  <span class="logo-text">MatrimonyAssist</span> Signup 
          </h3> -->
          <h3 class="mt-3 text-header-black font-weight-bolder">Let's get started</h3>
          <!-- <div class="mx-auto" style="width: 80%; padding-right: 3rem; padding-left: 3rem;">
                <p>Depends on your requirement and eligibility, you can join MatrimonyAssist either as a candidate or a representative of a candidate or a matchmaker if this is your profession. </p>
                <p>For this, you will need a valid email address, an avatar, a main and an additional image.
                  If you are a candidate, you will also need: </p>
                  <ul style="list-style: disc; margin-top: -0.5rem;" class="mb-2">
                    <li>proof of identity (such as national ID, passport, driving license)</li>
                    <li>proof of address (randomly requested and checked by MatrimonyAssist) </li>
                  </ul>
                  <p>And if you are a representative of a candidate, you will also need: </p>
                  <ul style="list-style: disc; margin-top: -0.5rem;">
                    <li>
                      consent from your candidate to represent from them on MatrimonyAssist platform
                    </li>
                    <li>name of a person (referee) with community of standing who could provide reference about you at request  </li>
                  </ul>
          </div> -->
          <div class="type mx-auto">
            <p class="text-center py-2">
               Please select your account type, you are
              registering as a
            </p>

            <a-row :gutter="16" class="mobile-view">
              <a-col :span="24">
                <a-card class="br-card shadow">
                  <button
                    @click="onSelectAccountType(1)"
                    class="btn no-shadow p-2 fs-20 br-30 btn-type"
                    :class="{ active: signupModel.account_type == 1 }"
                  >
                    Candidate
                  </button>
                  <button
                    @click="onSelectAccountType(2)"
                    class="btn no-shadow p-2 fs-20 br-30 btn-type mt-5"
                    :class="{ active: signupModel.account_type == 2 }"
                  >
                    Representative
                  </button>
                  <button
                    class="btn no-shadow disabled p-2 fs-20 br-30 btn-type mt-5"
                  >
                    Match Maker
                  </button>
                  <p
                    class="fs-14 mt-5"
                    v-for="(info, iIndex) in getInstruction"
                    :key="iIndex"
                  >
                    <a-icon type="check" class="text-success" /> {{ info }}
                  </p>
                </a-card>
              </a-col>
            </a-row>

            <a-row :gutter="16" class="desktop-view">
              <a-col :span="8">
                <a-card class="br-card shadow type-card" :class="{ 'active-card': signupModel.account_type == 1}" @click="onSelectAccountType(1)" style="cursor: pointer;">
                  <button
                    @click="onSelectAccountType(1)"
                    class="btn no-shadow p-2 fs-20 br-30 btn-type"
                    :class="{ active: signupModel.account_type == 1 }"
                  >
                    Candidate
                  </button>
                  <p
                    class="fs-14 mt-5"
                    v-for="(info, iIndex) in instructions[0].data"
                    :key="iIndex"
                  >
                    <a-icon type="check" class="text-success" /> {{ info }}
                  </p>
                </a-card>
              </a-col>
              <a-col :span="8">
                <a-card class="br-card shadow type-card" :class="{ 'active-card': signupModel.account_type == 2}" @click="onSelectAccountType(2)" style="cursor: pointer;">
                  <button
                    @click="onSelectAccountType(2)"
                    class="btn no-shadow p-2 fs-20 br-30 btn-type"
                    :class="{ active: signupModel.account_type == 2 }"
                  >
                    Representative
                  </button>
                  <p
                    class="fs-14 mt-5"
                    v-for="(info, iIndex) in instructions[1].data"
                    :key="iIndex"
                  >
                    <a-icon type="check" class="text-success" /> {{ info }}
                  </p>
                </a-card>
              </a-col>
              <a-col :span="8">
                <a-card class="br-card shadow type-card" style="cursor: not-allowed;">
                  <button
                    class="btn no-shadow disabled p-2 fs-20 br-30 btn-type"
                  >
                    Match Maker
                  </button>
                  <p
                    class="fs-14 mt-5"
                    v-for="(info, iIndex) in instructions[2].data"
                    :key="iIndex"
                  >
                    <a-icon type="check" class="text-success" /> {{ info }}
                  </p>
                </a-card>
              </a-col>
            </a-row>
            <div class="mt-5 footer" v-if="signupModel.account_type > 0">
              <p>
                <input
                  v-model="isConfirm"
                  type="checkbox"
                  class="confirm-type"
                />
                <span class="confirm-text text-white"
                  >Confirm I'm a
                  <span class="fw-600">{{
                    signupModel.account_type == 1
                      ? "Candidate"
                      : "Representative"
                  }}</span></span
                >
              </p>
              <button
                class="btn btn-continue w-50 fs-20"
                @click="onHandleContinue"
              >
                Continue
              </button>
            </div>
          </div>
          <p class="flex-center-center mt-3 bottom-text font-poppins">
            Already on <span class="logo-text ml-2"> MatrimonyAssist? </span>

            <router-link
              to="/login"
              class="
                btn btn-sm-sign btn-outline-primary btn-round-sm
                ms-2
                text-nowrap
                join-now-btn
              "
            >
              Sign in
            </router-link>
          </p>
        </div>
      </div>

<!--      <div class="type-selection" v-if="showMemberFormType && !errorMessage">-->
<!--        <div class="content mb-5">-->
<!--          <h3 class="mt-3 text-header-black font-weight-bolder">-->
<!--            Welcome To <span class="logo-text">MatrimonyAssist</span> Signup-->
<!--          </h3>-->
<!--          <div class="type mx-auto">-->
<!--            <p class="text-center py-2">How would you like to complete the registration form?</p>-->

<!--            <a-row :gutter="16" class="mobile-view">-->
<!--              <a-col :span="24">-->
<!--                <a-card class="br-card shadow">-->
<!--                  <button-->
<!--                      @click="signupModel.form_type = 1"-->
<!--                      class="btn no-shadow p-2 fs-20 br-30 btn-type"-->
<!--                      :class="{ active: signupModel.form_type == 1 }"-->
<!--                  >-->
<!--                    Long Form-->
<!--                  </button>-->
<!--                  <button-->
<!--                      @click="signupModel.form_type = 2"-->
<!--                      class="btn no-shadow p-2 fs-20 br-30 btn-type mt-5"-->
<!--                      :class="{ active: signupModel.form_type == 2 }"-->
<!--                  >-->
<!--                    Short Form-->
<!--                  </button>-->
<!--                  <p class="fs-12 mt-5">-->
<!--                    <a-icon type="check" class="text-success"/>-->
<!--                    You have to complete the {{ signupModel.form_type == 2 ? 'short form' : 'full form' }} of-->
<!--                    candidate-->
<!--                  </p>-->
<!--                </a-card>-->
<!--              </a-col>-->
<!--            </a-row>-->

<!--            <a-row :gutter="16" class="desktop-view">-->
<!--              <a-col :span="12">-->
<!--                <a-card class="br-card shadow type-card">-->
<!--                  <button-->
<!--                      @click="signupModel.form_type = 1"-->
<!--                      class="btn no-shadow p-2 fs-20 br-30 btn-type"-->
<!--                      :class="{ active: signupModel.form_type == 1 }"-->
<!--                  >-->
<!--                    Long Form-->
<!--                  </button>-->
<!--                  <p class="fs-12 mt-5">-->
<!--                    <a-icon type="check" class="text-success"/>-->
<!--                    You have to complete the full form of candidate-->
<!--                  </p>-->
<!--                </a-card>-->
<!--              </a-col>-->
<!--              <a-col :span="12">-->
<!--                <a-card class="br-card shadow type-card">-->
<!--                  <button-->
<!--                      @click="signupModel.form_type = 2"-->
<!--                      class="btn no-shadow p-2 fs-20 br-30 btn-type"-->
<!--                      :class="{ active: signupModel.form_type == 2 }"-->
<!--                  >-->
<!--                    Short Form-->
<!--                  </button>-->
<!--                  <p class="fs-12 mt-5">-->
<!--                    <a-icon type="check" class="text-success"/>-->
<!--                    You have to complete the short form of candidate-->
<!--                  </p>-->
<!--                </a-card>-->
<!--              </a-col>-->
<!--            </a-row>-->
<!--            <div class="mt-5 footer" v-if="signupModel.account_type > 0">-->
<!--              <button-->
<!--                  class="btn btn-continue w-50 fs-20 mt-4"-->
<!--                  @click="selectNexStepAfterFormType"-->
<!--              >-->
<!--                Continue-->
<!--              </button>-->
<!--            </div>-->
<!--          </div>-->
<!--          <p class="flex-center-center mt-3 bottom-text font-poppins">-->
<!--            Already on <span class="logo-text ml-2"> MatrimonyAssist? </span>-->

<!--            <router-link-->
<!--                to="/login"-->
<!--                class="-->
<!--                    btn btn-sm-sign btn-outline-primary btn-round-sm-->
<!--                    ms-2-->
<!--                    text-nowrap-->
<!--                    join-now-btn-->
<!--                  "-->
<!--            >-->
<!--              Sign in-->
<!--            </router-link>-->
<!--          </p>-->
<!--        </div>-->
<!--      </div>-->

      <h3
        v-if="!showMemberTypeForm && !showMemberFormType"
        class="mt-6 text-header-black font-weight-bolder text-center"
      >
        Welcome To <span class="logo-text">MatrimonyAssist</span> Signup
      </h3>

      <div v-if="showMemberForm && !errorMessage" class="signup-inner">
        <a-form
          ref="signupFormTwo"
          :model="signupModel"
          :rules="rules"
          class="form-signup br-card"
        >
          <div>
            <!-- <h4 class="fs-16 text-white fw-400">Type your name</h4> -->
            <div class="mb-3">
              <a-form-item ref="first_name" name="first_name">
                <a-input
                  type="text"
                  class="form-control fs-16"
                  id="first_name"
                  :maxLength="20"
                  @change="generateScreenName(); trimTheFirstName();"
                  v-model:value="signupModel.first_name"
                  placeholder="First Name"
                />
              </a-form-item>
            </div>
            <div class="mb-3">
              <a-form-item ref="last_name" name="last_name">
                <a-input
                  type="text"
                  class="form-control fs-16"
                  @change="generateScreenName(); trimTheLastName();"
                  id="lastName"
                  :maxLength="20"
                  v-model:value="signupModel.last_name"
                  placeholder="Last Name"
                />
              </a-form-item>
            </div>
            <div class="mb-3">
              <a-form-item ref="screen_name" name="screen_name">
                <a-input
                  type="text"
                  class="form-control fs-16"
                  id="screen_name"
                  v-model:value="signupModel.screen_name"
                  placeholder="* Screen Name"
                  :maxLength="15"
                  @change="trimTheScreenName"
                />
              </a-form-item>
            </div>

            <a-tooltip placement="right" class="fs-12 mb-2">
              <span class="text-white"
                >* Please choose a sensible screen name, if you don't wish your
                real name to appear on search result. You can also use your nickname.</span
              >
            </a-tooltip>
            <a-button
              @click="backToMemberType"
              class="btn btn-secondary w-100"
              type="primary"
              :loading="isLoading"
            >
              Back
            </a-button>
            <button
              @click="handleSubmit"
              class="btn btn-continue w-100 mt-2 h-32 pt-1"
            >
              Continue
            </button>
          </div>
        </a-form>
        <p class="flex-center-center mt-3 bottom-text">
          Already on <span class="logo-text ml-2"> MatrimonyAssist? </span>

          <router-link
            to="/login"
            class="
              btn btn-sm-sign btn-outline-primary btn-round-sm
              ms-2
              text-nowrap
              join-now-btn
            "
          >
            Sign in
          </router-link>
        </p>
      </div>

      <div v-if="showSignupForm && !errorMessage" class="signup-inner">
        <!--        <a href="/" class="logo"-->
        <!--          ><img src="@/assets/logo.png" alt="logo" class="mat-logo"-->
        <!--        /></a>-->
        <a-form
          ref="signupFormOne"
          :model="signupModel"
          :rules="rules2"
          class="form-signup"
        >
          <div>
            <!-- <h4 class="fs-16 text-white fw-400">Type your email & password</h4> -->
            <div class="mb-3">
              <a-form-item ref="email" name="email">
                <a-input
                  type="email"
                  class="fs-16"
                  id="email"
                  v-model:value="signupModel.email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
              </a-form-item>
            </div>
            <div class="mb-3">
              <a-form-item ref="password" name="password">
                <a-input-password
                  type="password"
                  id="password"
                  v-model:value="signupModel.password"
                  placeholder="Password"
                  class="fs-16"
                />
              </a-form-item>
            </div>
            <div class="mb-3">
              <a-form-item ref="confirmPassword" name="confirmPassword">
                <a-input-password
                  type="password"
                  id="confirmPassword"
                  v-model:value="signupModel.confirmPassword"
                  placeholder="Confirm password"
                  class="fs-16"
                />
              </a-form-item>
            </div>
            <button
              @click="backToForm"
              class="btn btn-secondary w-100 mt-1 h-32 pt-1"
            >
              Back
            </button>
            <button
              @click="handleSubmitSignUp"
              class="btn submit w-100 h-32 mt-2"
            >
              <a-icon type="loading" class="text-white" v-if="isLoading" />
              Agree & Join
            </button>
            <!--            <div class="loading-dock position-relative mt-1 h-32 pt-1">-->
            <!--              <svg id="load-b" x="0px" y="0px" viewBox="0 0 150 150">-->
            <!--                <circle class="loading-inner" cx="75" cy="75" r="60"/>-->
            <!--              </svg>-->
            <!--              <svg id="load" x="0px" y="0px" viewBox="0 0 150 150">-->
            <!--                <circle class="loading-inner" cx="75" cy="75" r="60"/>-->
            <!--              </svg>-->
            <!--              <button class="btn btn-block submit h-32" @click="handleSubmitSignUp">Agree & join</button>-->
            <!--              <svg id="check" style="width:24px; height:24px" viewBox="0 0 24 24">-->
            <!--                <path fill="#FFFFFF" d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />-->
            <!--              </svg>-->
            <!--            </div>-->

            <span class="fs-12 mt-2 text-white"
              >By clicking Agree & Join, you agree to MatrimonyAssist
              <a class="link" href="/user-agreement">User Agreement, </a>
              <a class="link" href="/privacy-cookie-policy"
                >Privacy and Cookie Policy</a
              >
            </span>
          </div>
        </a-form>
        <p class="flex-center-center mt-3 bottom-text">
          Already on <span class="logo-text"> MatrimonyAssist? </span>

          <router-link
            to="/login"
            class="
              btn btn-sm-sign btn-outline-primary btn-round-sm
              ms-2
              text-nowrap
              join-now-btn
            "
          >
            Sign in
          </router-link>
        </p>
      </div>

      <div v-if="errorMessage" class="signup-inner mt-5">
        <div class="error pt-2">
          <p class="mb-0">
            {{ errorMessage }}
          </p>
          <div class="flex justify-content-center align-items-center error-div-btns">
            <!-- <button @click="resetData" class="mt-2">
              <router-link
                to="/login"
                class="
                  btn btn-sm btn-primary btn-round-sm btn-signinup
                  ms-2
                  text-nowrap
                  join-now-btn
                "
              >
                Sign in
              </router-link>
            </button> -->
            <ButtonComponent
              minHeight="14px"
              class="mt-2 ms-2"
              iconHeight="14px"
              :isSmall="true"
              title="Sign in"
              :responsive="false"
              @onClickButton="router.push('/login')"
            />
            <h4 class="fs-16 pt-3 pl-2 pr-1 text-dark">or</h4>
            <!-- <button @click="resetData" class="mt-2">
              <router-link
                to="/signup"
                class="
                  btn btn-sm btn-primary btn-round-sm btn-signinup
                  ms-2
                  text-nowrap
                  join-now-btn
                "
              >
                {{  errorMessage == "The email has already been taken." ? "Join now with another email" : "Join now with another screen name" }}
                
              </router-link>
            </button> -->
            <ButtonComponent
              minHeight="14px"
              class="mt-2 ms-2"
              iconHeight="14px"
              :isSmall="true"
              :title="errorMessage == 'The email has already been taken.' ? 'Join now with another email' : 'Join now with another screen name'"
              :responsive="false"
              @onClickButton="resetData"
            />
          </div>
        </div>
      </div>
    </div>
    <Footer class="footer-container"/>
  </div>
</template>

<script>
import Footer from "@/components/auth/Footer.vue";
import Spinner from "@/components/ui/Spinner.vue";
import InputPassword from "@/components/ui/InputPassword.vue";
import { CapitalizeFirstLetter } from "../../models/utilities";
import ButtonComponent from "@/components/atom/ButtonComponent.vue";

export default {
  name: "Signup",
  components: {
    Footer,
    Spinner,
    InputPassword,
    ButtonComponent
  },
  data() {
    let validatePass = async (_rule, value) => {
      var regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (value === "") {
        return Promise.reject("Enter a password");
      }
      if (!regex.test(value)) {
        return Promise.reject(
          "Your password must contain at least 8 characters including a symbol, upper and lower case letters and a number."
        );
      } else {
        return Promise.resolve();
      }
    };
    let validatePass2 = async (_rule, value) => {
      console.log("value valipass2", value);
      if (value === "") {
        return Promise.reject("Enter password again");
      } else if (value !== this.signupModel.password) {
        return Promise.reject("Passwords didn't match!");
      } else {
        return Promise.resolve();
      }
    };
    return {
      signupModel: {
        first_name: "",
        last_name: "",
        screen_name: "",
        email: "",
        password: "",
        confirmPassword: "",
        account_type: 1,
        form_type: 1,
      },
      instructions: [
        {
          title: "candidiate",
          data: [
            "Candidate is either the bride or groom looking to get married",
            "A candidate must be represented by a team",
            "The same candidate cannot be represented by another team",
            "But they can join another team as a rep",
          ],
        },
        {
          title: "representative",
          data: [
            "Anyone can be a representative",
            "They simply help and guide the candidate to find suitable match",
            "Every rep must obtain consent from candidate to represent them",
            "A rep can be part of multiple teams as a rep ",
          ],
        },
        {
          title: "match-maker",
          data: [
            "Matchmaker is a professional who helps the candidate to find prospects ",
            "Matchmaker role is same as representative but with bigger capacity",
            "Can not switch membership to candidate",
            "Can create or join upto 100+ teams",
          ],
        },
      ],
      showMemberForm: false,
      showMemberTypeForm: true,
      showSignupForm: false,
      showMemberFormType: false,
      isLoading: false,
      isConfirm: false,
      showSignUpPage: false,
      rules: {
        first_name: [
          { required: true, message: "Enter first name", trigger: "change" },
          {
            min: 3,
            max: 20,
            message: "Use 3-20 characters for your first name",
            trigger: "blur",
          },
        ],
        last_name: [
          {
            required: true,
            message: "Enter last name",
            trigger: "change",
            color: "#FFFFFFF",
          },
          {
            min: 3,
            max: 20,
            message: "Use 3-20 characters for your last name",
            trigger: "blur",
          },
        ],
        screen_name: [
          {
            required: true,
            message: "Enter screen name",
            trigger: "change",
          },
          {
            min: 8,
            max: 15,
            message: "Use 8-15 characters for your screen name",
            trigger: "blur",
          },
        ]
      },
      rules2: {
        email: [
          {
            required: true,
            message: "Choose a email address",
            trigger: "change",
          },
          {
            type: "email",
            message: "Please input a valid email",
          },
        ],
        password: [{ validator: validatePass, trigger: "change" }],
        confirmPassword: [{ validator: validatePass2, trigger: "blur" }],
      }
    };
  },
  computed: {
    errorMessage() {
      return this.$store.getters["errorMessage"];
    },
    getInstruction() {
      let index = 0;
      if (this.signupModel && this.signupModel.account_type) {
        return this.instructions[this.signupModel.account_type - 1].data;
      }
      return this.instructions[index].data;
    },
  },
  methods: {
    trimTheScreenName() {
      this.signupModel.screen_name = this.signupModel.screen_name.replace(
        /[^A-Z0-9]/gi,
        ""
      );

      this.signupModel.screen_name = this.signupModel.screen_name.toUpperCase();
    },
    trimTheFirstName() {
      this.signupModel.first_name = this.signupModel.first_name.replace(
        /[^A-Za-z]/gi,
        ""
      );
      this.signupModel.first_name = this.signupModel.first_name.length > 0 ? this.signupModel.first_name[0] + this.signupModel.first_name.substring(1).toLowerCase() : "";
    },
    trimTheLastName() {
      this.signupModel.last_name = this.signupModel.last_name.replace(
        /[^A-Za-z]/gi,
        ""
      );
      this.signupModel.last_name = this.signupModel.last_name.length > 0 ? this.signupModel.last_name[0] +  this.signupModel.last_name.substring(1).toLowerCase() : "";
    },
    handleSubmitSignUp() {
      this.$refs.signupFormOne.validate()
      .then((valid) => {
        if (valid) {
          const {
            email,
            password,
            first_name,
            last_name,
            screen_name,
            account_type,
            form_type
          } = this.signupModel;

          try {
            this.isLoading = true;
            this.$store.dispatch("signup", {
              email,
              password,
              first_name,
              last_name,
              screen_name,
              account_type,
              form_type
            });
          } catch {
            this.isLoading = false;
            this.errorMessage = "The email has already been taken.";
          }
        } else {
          return false;
        }
      });
    },
    generateScreenName() {
      if (
        this.signupModel.last_name.length > 1 &&
        this.signupModel.first_name.length > 2
      ) {
        this.signupModel.screen_name = `${this.signupModel.first_name[1]}${
          this.signupModel.first_name[2]
        }${this.signupModel.last_name[1]}${Math.floor(
          10000 + Math.random() * 90000
        )}`.toUpperCase();
      } else {
        this.signupModel.screen_name = "";
      }
      this.signupModel = {
        ...this.signupModel,
        last_name: CapitalizeFirstLetter(this.signupModel.last_name),
        first_name: CapitalizeFirstLetter(this.signupModel.first_name),
      };
    },
    backToMemberType() {
      this.showMemberTypeForm = true;
      this.showSignupForm = false;
      this.showMemberForm = false;
    },
    selectNexStepAfterFormType() {
      this.showMemberTypeForm = false;
      this.showMemberFormType = false;
      this.showSignupForm = false;
      this.showMemberForm = true;
    },
    onHandleContinue() {
      if (this.isConfirm) {
        this.showMemberTypeForm = false;

        // short & long form
        // if(this.signupModel.account_type == 1) {
        //   this.showMemberFormType = true;
        //   this.showSignupForm = false;
        //   this.showMemberForm = false;
        //
        // } else {
        //   this.showSignupForm = false;
        //   this.showMemberForm = true;
        //   this.showMemberFormType = false;
        // }

        // old
        this.showSignupForm = false;
        this.showMemberForm = true;
      } else {
        this.$error({
          title: "Please confirm your account type",
          center: true,
        });
      }
    },
    backToForm() {
      this.showMemberTypeForm = false;
      this.showSignupForm = false;
      this.showMemberForm = true;
    },
    onSelectAccountType(type) {
      this.isConfirm = false;
      this.signupModel.account_type = type;
    },
    resetData() {
      if(this.errorMessage != "The email has already been taken.") {
        this.showMemberTypeForm = false;
        this.showSignupForm = false;
        this.showMemberForm = true;
        this.signupModel.screen_name = "";
      }
      this.$store.commit("setErrorMessage", "");
      localStorage.removeItem("token");
      this.isLoading = false;
    },
    handleSubmit() {
      this.$refs.signupFormTwo.validate()
      .then((valid) => {
        if (valid) {
          this.showMemberTypeForm = false;
          this.showSignupForm = true;
          this.showMemberForm = false;
        } else {
          return false;
        }
      });
    },
    addLoader() {
      let submit = document.querySelector(".submit");
      submit.classList.remove("return");
      submit.blur();
      document.querySelector(".loading-dock").classList.add("loaded");
      document.getElementById("load").style.display = "initial";
      document.getElementById("load-b").style.display = "initial";
      setTimeout(function () {
        document.getElementById("load").style.opacity = 1;
      }, 750);
      setTimeout(function () {
        document.getElementById("load-b").style.opacity = 1;
      }, 1400);
    },
    removeLoader() {
      let submit = document.querySelector(".submit");
      document.querySelector(".loading-dock").classList.remove("loaded");
      document.getElementById("load").style.display = "none";
      document.getElementById("load-b").style.display = "none";
      document.getElementById("load").style.opacity = 0;
      document.getElementById("load-b").style.opacity = 0;
      submit.classList.add("return");
      submit.innerHTML = "Submit";
      document.getElementById("check").style.display = "none";
    },
  },
  created() {
    this.$store.state.auth.errorMessage = null;
  }
};
</script>

<style scoped lang="scss">
$turquoise: #2cd797;
$dark-text: hsl(0, 0%, 13%);
$border-width: 2px;
@import "@/styles/base/_variables.scss";
@import "@/styles/components/_inputs.scss";
.signup-container {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: calc(100vh);
  overflow-y: auto;
  .signup {
    @media (min-width: 768px) {
      //height: 100vh;
    }
    //background-color: #522e8e;
    //background-image: linear-gradient(
    //  0deg,
    //  #522e8e 0%,
    //  #932784 46%,
    //  #e02076 100%
    //);
    .mb-3 {
      margin: 0 !important;
    }
    .btn-agreeJoin-pink {
      color: #2cd797;
      //background: #2cd797;
      border: 1px solid #2cd797;
      border-radius: 20px;
      font-size: 16px;
      &:hover,
      &:not(:disabled):not(.disabled):active {
        background: #2cd797;
        color: $color-white;
        border: 1px solid $border-white;
        opacity: 1;
        outline: 0;
        box-shadow: 2px 2px 2px #999;
      }
      &:disabled,
      &.disabled {
        color: $color-white;
        background: #e51f76;
        border: 1px solid $border-primary;
        opacity: 0.6;
      }
      &:focus {
        outline: none;
        box-shadow: none;
      }
      img {
        margin-right: 3px;
      }
    }
    .signup-inner {
      max-width: 450px;
      margin: 0 auto;
      padding: 10px 15px;
      text-align: center;
      //background-image: linear-gradient(
      //        0deg,
      //        #e02076 0%,
      //        #932784 50%,
      //        #522e8e 100%
      //);
      @media (min-width: 768px) {
        padding: 16px 15px;
      }
      .error {
        color: #000;
        height: 90px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        background-color: #f5f5ff !important;
        border: 1px solid $border-primary !important;
        margin-bottom: 20px !important;

        @media (max-width: 768px) {
          padding: 8px 8px 0 8px !important;
          height: 200px;
          .error-div-btns {
            flex-direction: column !important;

            & > * {
              margin: 0 !important;
            }
            & > :nth-child(2) {
              padding: 6px 0px !important;
            }
          }
        }
      }
      .logo {
        max-width: 250px;
        display: inline-block;
        margin-bottom: 20px;
        .mat-logo {
          width: 138px;
          @media (min-width: 768px) {
            width: 200px;
            height: 130px;
          }
        }
      }
      .form-signup {
        background-image: linear-gradient(
          0deg,
          #e02076 0%,
          #932784 50%,
          #522e8e 100%
        );
        //background: $bg-white;
        padding: 20px;
        border-radius: 5px;
        @media (min-width: 768px) {
          margin-top: 8px;
        }
        .warning {
          color: red;
          font-size: 14px;
        }
      }
      .hr-line {
        position: relative;
        &::after {
          position: absolute;
          content: "";
          width: 100%;
          top: 50%;
          left: 0;
          z-index: 1;
          border-bottom: 1px solid $border-default;
        }
        span {
          z-index: 2;
          background: $bg-white;
          position: relative;
          padding: 2px 8px;
        }
      }
      .link {
        color: #92e0f1;
        &:hover {
          text-decoration: underline;
        }
      }
      .bottom-text {
        //color: white;
        font-size: 12px;
        @media (min-width: 768px) {
          font-size: 16px;
        }
        .logo-text {
          font-family: $header-font;
          margin-left: 10px;
          margin-right: 5px;
          font-size: 16px;
          @media (min-width: 768px) {
            font-size: 24px;
          }
        }
      }
    }
  }
}
.signup-text-container {
  h3 {
      text-align: left !important;
      font-weight: bolder;
      font-size: 28px;
  }
}
.type-selection {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: 1rem;
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h3 {
      text-align: center;
      font-weight: bold;
      font-size: 16px;
      @media (min-width: 768px) {
        font-size: 28px;
      }
      .logo-text {
        font-family: $header-font;
        color: $color-primary;
        font-weight: 100;
      }
    }
    .type {
      width: 100%;
      //height: 400px;
      //background-color: #e02076;
      background-image: linear-gradient(
        180deg,
        #e02076 0%,
        #932784 50%,
        #522e8e 100%
      );
      @media (min-width: 768px) {
        background-image: linear-gradient(
          0deg,
          #e02076 0%,
          #932784 50%,
          #522e8e 100%
        );
      }
      padding: 20px;
      border-radius: 5px;
      color: #ececec;
      margin-top: 20px;
      @media (min-width: 768px) {
        width: 98%;
      }
      @media (min-width: 992px) {
        width: 80%;
      }
      .btn {
        width: 100%;
      }
      .footer {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .active {
        background: $bg-secondary !important;
        color: $color-white;
        box-shadow: 2px 2px 2px #999 !important;

      }
      .btn-active {
        //background: $bg-success;
        color: $color-white;
      }
      .confirm-type {
        margin-top: 10px;
        transform: scale(1.8);
        height: 12px;
      }
      .confirm-text {
        margin-left: 20px;
        font-size: 18px;
      }
    }
  }
}

.active-card {
  transform: scale(1.05);
}
.join-now-btn {
  //color: #ffffff;
  font-size: 14px;
  //border: 1px solid #ffffff;
}
.join-now-btn:focus {
  outline: none;
  box-shadow: none;
}
.join-now-btn:hover {
  background: $bg-primary;
  box-shadow: 0 2px 2px #999;
  border: none;
}
.signup-head {
  font-size: 16px;
  color: #ffffff;
  margin-top: -12px;
  background: -webkit-linear-gradient(white, pink, white, #8debf2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.signin-inner {
  background: #522e8e;
  display: flex;
  justify-content: center;
}
.logo-text {
  color: $color-brand !important;
  font-style: italic;
  font-family: $header-font;
  font-size: 20px;
  @media (min-width: 768px) {
    font-size: 24px;
  }
}
.mat-logo {
  width: 120px;
  height: 80px;
  @media (min-width: 768px) {
    width: 170px;
    height: 110px;
  }
}
h3 {
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  @media (min-width: 768px) {
    font-size: 28px;
  }
  .logo-text {
    font-family: $header-font;
    color: $color-primary;
    font-weight: 100;
  }
}
.btn-join-now {
  width: 250px; 
  margin-top: 35px; 
  height: 100px;
  .v-custom:hover {
    background: #fff !important;
    color: $bg-success !important;
    border: 1px solid $bg-success !important;

    img {
      filter: none !important;
    }
  }

  .v-btn__content {
    font-size: 1rem !important;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
}

.no-shadow {
  box-shadow: none !important;
}
.br-card {
  border-radius: 10px;
}
.br-30 {
  border-radius: 30px;
}
.btn-type {
  border: 1px solid #522e8e;
}
.desktop-view {
  display: none;
  @media (min-width: 768px) {
    display: block;
  }
}
.mobile-view {
  @media (min-width: 768px) {
    display: none;
  }
}
.type-card {
  height: 320px;
  @media (min-width: 1240px) {
    height: auto;
  }
}
.btn-continue {
  border-radius: 30px;
  border: 2px solid $color-white;
  //color: $turquoise;
  color: #ffffff;
  &:hover {
    background: $turquoise;
    color: #ffffff;
  }
}
.btn-secondary {
  &:hover {
    background: $bg-white !important;
    color: $color-primary !important;
    border: none !important;
    box-shadow: none;
  }
}
.h-32 {
  height: 32px;
}
.btn.btn-sm-sign {
  font-size: 12px;
  padding: 1px 8px;
  border: 1px solid #522e8e;
  color: $color-primary;
  font-family: "Poppins", sans-serif;
  &:hover {
    color: #ffffff;
  }
}
.ant-form-explain {
  color: #ffffff !important;
}
//agree button css
.loading-dock {
  //width: 330px;
  //height: 54px;
  display: flex;
  justify-content: center;
  align-items: center;
}

button.submit {
  cursor: pointer;
  width: 100%;
  color: white;
  border-radius: 40px;
  border: 1px solid $border-white;
  transition: all 0.2s;
  font-size: 16px;
  padding-top: 3px;
  &:hover {
    background: $turquoise;
    color: white;
  }
  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
    //background: $turquoise;
    color: white;
    box-shadow: none;
  }

  &.popout {
    animation: circle-to-button 0.5s linear forwards;
  }
  &.return {
    animation: fade-to-original 0.3s linear;
    &:hover {
      background: $turquoise;
      color: white;
    }
  }
}
.btn-signinup {
  color: #ffffff;
  border: 1px solid #ffffff;
  font-size: 10px;
  @media (min-width: 576px) {
    font-size: 12px;
  }
}
.loaded {
  button.submit {
    background-color: $turquoise;
    animation: button-to-circle 0.5s linear forwards;
    animation-delay: 0.3s;
  }
  #load {
    animation: loading-circle 3s linear forwards;
    animation-delay: 1s;
  }
}

#load,
#load-b {
  display: none;
  position: absolute;
  width: 58px;
  height: 58px;
  opacity: 0;
  .loading-inner {
    stroke: {
      dasharray: 900;
      // Thickness of line
      width: 8;
      miterlimit: 10;
      linecap: round;
    }
    stroke: #c3c3c3;
    fill: transparent;
  }
}
#load-b {
  opacity: 0;
  .loading-inner {
    stroke: $turquoise;
  }
}

svg {
  position: absolute;
  display: none;
}

@keyframes loading-circle {
  0% {
    opacity: 1;
    stroke-dashoffset: 0;
  }
  50% {
    opacity: 1;
    stroke-dashoffset: -100;
  }
  100% {
    opacity: 1;
    stroke-dashoffset: -600;
  }
}

@keyframes button-to-circle {
  0% {
    width: 160px;
    color: $turquoise;
    border-color: $turquoise;
    background-color: $turquoise;
  }
  50% {
    color: rgba(255, 255, 255, 0);
  }
  90% {
    width: 50px;
    color: rgba(255, 255, 255, 0);
    border-color: #c3c3c3;
  }
  100% {
    width: 50px;
    border-color: rgba(255, 255, 255, 0);
    color: rgba(255, 255, 255, 0);
    background-color: rgba(255, 255, 255, 0);
  }
}

@keyframes circle-to-button {
  0% {
    border-color: $turquoise;
    background-color: $turquoise;
    height: 50px;
    width: 50px;
  }
  50% {
    height: 50px;
    width: 50px;
  }
  100% {
    height: 50px;
    width: 160px;
    border-color: $turquoise;
    background-color: $turquoise;
  }
}

@keyframes fade-to-original {
  0% {
    background-color: $turquoise;
  }
  100% {
    background-color: white;
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
.body-container {
  flex-grow: 1;
  overflow: auto;
  min-height: 2em;
}
.footer-container {
  flex-shrink: 0;
}
.fs-16 {
  input {
    font-size: 16px !important;
  }
}
</style>