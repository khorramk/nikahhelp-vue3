<template>
  <div>
    <div>
      <div v-if="desktopView" class="container-fluid section-padding-payment">
        <div class="d-flex flex-mb-direction">
          <div class="w-d-50 bg-1 col-flex position-relative shadow-border"
            :class="{'mobile-block': activeStep !== 1, 'custom-height': cardStat}"
            style="height: calc(100vh - 92px); min-height: 680px;"
          >
            <div class="div-1">
              <div class="section-heading">
                <h4 class="heading-title-payment">Team Subscription & Payment</h4>
                <p class="text-center heading-desc-payment">
                  We don't want people to be looking for someone for too
                  long. <br/>
                  The sooner you find someone suitable, we feel we have
                  achieved both your and our goal
                </p>
              </div>
              <div class="card-info-div mt-4">
                <h6 class="text-center validate-text">Validate Your Card</h6>
                <div class="card-info-form">
                  <card-input
                      ref="card_input"
                      :clientSecret="clientSecret"
                      @get-payment-method="setPaymentMethod"
                  ></card-input>
                </div>
              </div>
              <button class="btn btn-block next-payemnt-screen btn-success py-2 br-30 only-mobile" v-if="agree" @click="cartScreen()">Next </button>
              <button class="btn btn-danger next-payemnt-screen btn-block py-2 br-30 only-mobile mt-3" v-if="agree" @click="paymentScreen()">Back </button>
            </div>
          </div>
          <div class="w-d-50 desktop-non-margin col-flex shadow-border border-right position-relative"
               :class="{'mobile-block': activeStep !== 2, 'mobile-mode': activeStep === 2}">
            <div class="div-2 desktop-pl">
              <div class="section-heading"
                   v-if="subscriptionName == 'Free 1 day Subscription Plan'"
              >
                <h6 class="title-signup">It's free to Signup!</h6>
                <hr/>
              </div>
              <div class="description fs-14"
                   v-if="subscriptionName == 'Free 1 day Subscription Plan'"
              >
                Why do we need a credit card for a free 1 day plan?
                <br/>
                It helps us prevent spammers from signing up, which means
                better deliverablity for you and everyone else. You won't be
                charged unless you choose to take up a monthly plan.
                <br/>
                <h6 class="mt-4">This is a secure 256-bit SSL encrypted from. You're safe. </h6>
              </div>

              <div class="cart mt-3 px-4">
                <div class="cart-heading">
                  <h5 class="fs-18">Item in Cart</h5>
                  <hr/>
                </div>
                <div class="cart-description">
                  <div class="d-flex justify-content-between fs-18">
                    <h6 class="text-white border-bottom pb-2">{{ subscriptionName }} <!-- Subscription Plan --></h6>
                    <h6 class="text-white">£ {{ $store.state.team.originalAmount.toFixed(2) }}</h6>
                  </div>
                  <p class="pt-2 fs-16 pl-4">
                    Discount
                    <!-- <span style="float: right">£ {{ $store.state.team.discountedAmount.toFixed(2) }}</span> -->
                    <span style="float: right">Applied</span>
                  </p>
                  <!--
                  <p>
                    Discount 0%
                    <span style="float: right">£ 0.0</span>
                  </p>  -->
                  <hr/>
                  <p class="fs-18">
												<span style="float: right">
													Total Pay
													<span class="ml-5">£ {{ subscriptionAmount.toFixed(2) }} </span>
												</span>
                  </p>
                  <br/>
                  <br/>
                  <p class="details fs-18">Details:</p>
                  <br/>
                  <div class="d-flex justify-content-between fs-18">
                    <h6 class="text-white">{{ subscriptionName }} <!-- Subscription Plan --> for Team -<b> {{ teamName }}</b></h6>
                    <h6 class="text-white"></h6>
                  </div>
                </div>
              </div>
              <div class="agree-terms mt-4">
                <p class="mt-1 agreement-text">
                  By clicking "Agree and Subscribe", you agree:
                  <b
                  >You will be charged UK £{{ $store.state.team.originalAmount.toFixed(2) }} yearly and <!-- at the end of
                    your plan, your subscription will automatically renew
                    monthly until cancel(price subject to change). Cancel
                    anytime via Manage team > Team Setting > Subscription
                    details or <router-link to="/support">Customer Support</router-link>. -->
                  </b>
                  you also agree to the <span class="link-color"><a href="/terms_condition" target="_blank">Terms of Use</a></span> and the <span class="link-color">Subscription
                  and Cancellation Terms</span>.
                </p>
                <div class="text-center pb-4">
<!--                  <spinner v-if="isLoading"></spinner>-->
                  <button
                      v-if="agree"
                      class="btn bg-success d-flex justify-content-center text-white agree-button br-30 btn-block"
                      @click="subscribe"
                  >
                    <LoadingOutlined class="mr-2 line-height-icon" v-if="isLoading" />
                    <span>Agree and Subscribe</span>
                  </button>
                </div>
              </div>
            </div>
            <div class="position-absolute buttons-position">
              <div class="d-flex">
                <button class="btn bg-danger px-4 py-2 text-white br-20 w-full" @click="nextStep(1)">Back</button>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div v-if="!desktopView" class="container-fluid mt-2 section-padding-payment">
        <div class="d-flex flex-mb-direction">
          <div class="w-d-50 bg-1 col-flex position-relative shadow-border"
            :class="{'mobile-block': activeStep !== 1, 'custom-height': cardStat}"
            style="height: 90vh; max-height: 560px;"
          >
            <div class="div-1">
              <div class="card-info-div" :class="{'successful-page': successfulPage}">
                <div class="card-info-form">
                  <card-input
                      ref="card_input"
                      :clientSecret="clientSecret"
                      @get-payment-method="setPaymentMethod"
                  ></card-input>
                  <div v-if="agree" class="flex mt-16">
                    <ButtonComponent
                      class="w-50 mr-1"
                      backgroundColor="#fa4942"
                      :isSmall="true"
                      title="Back"
                      :responsive="false"
                      @onClickButton="paymentScreen(), successfulPage = false, agree = false"
                    />
                    <ButtonComponent
                      class="w-50"
                      backgroundColor="#3ab549"
                      :isSmall="true"
                      title="Continue"
                      :responsive="false"
                      @onClickButton="cartScreen"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-d-50 desktop-non-margin col-flex shadow-border border-right position-relative"
               :class="{'mobile-block': activeStep !== 2, 'mobile-mode': activeStep === 2}">
            <div class="div-2 desktop-pl">
              <div class="section-heading"
                   v-if="subscriptionName == 'Free 1 day Subscription Plan'"
              >
                <h6 class="title-signup">It's free to Signup!</h6>
                <hr/>
              </div>
              <div class="description fs-14"
                   v-if="subscriptionName == 'Free 1 day Subscription Plan'"
              >
                Why do we need a credit card for a free 1 day plan?
                <br/>
                It helps us prevent spammers from signing up, which means
                better deliverablity for you and everyone else. You won't be
                charged unless you choose to take up a monthly plan.
                <br/>
                <h6 class="mt-4">This is a secure 256-bit SSL encrypted from. You're safe. </h6>
              </div>

              <div class="cart px-4">
                <div class="cart-heading">
                  <h5 class="fs-18">Item in Cart</h5>
                  <hr/>
                </div>
                <div class="cart-description">
                  <div class="d-flex justify-content-between fs-18">
                    <h6 class="text-white border-bottom pb-2">{{ subscriptionName }} <!-- Subscription Plan --></h6>
                    <h6 class="text-white">£ {{ $store.state.team.originalAmount.toFixed(2) }}</h6>
                  </div>
                  <p class="pt-2 fs-16 pl-4">
                    Discount
                    <!-- <span style="float: right">£ {{ $store.state.team.discountedAmount.toFixed(2) }}</span> -->
                    <span style="float: right">Applied</span>
                  </p>
                  <!--
                  <p>
                    Discount 0%
                    <span style="float: right">£ 0.0</span>
                  </p>  -->
                  <hr/>
                  <p class="fs-18">
												<span style="float: right">
													Total Pay
													<span class="ml-5">£ {{ subscriptionAmount.toFixed(2) }} </span>
												</span>
                  </p>
                  <br/>
                  <br/>
                  <p class="details fs-18">Details:</p>
                  <br/>
                  <div class="d-flex justify-content-between fs-18">
                    <h6 class="text-white">{{ subscriptionName }} <!-- Subscription Plan --> for Team -<b> {{ teamName }}</b></h6>
                    <h6 class="text-white"></h6>
                  </div>
                </div>
              </div>
              <div class="agree-terms mt-2">
                <p class="mt-1 agreement-text">
                  By clicking "Agree and Subscribe", you agree:
                  <b
                  >You will be charged UK £{{ $store.state.team.originalAmount.toFixed(2) }} yearly and <!-- at the end of
                    your plan, your subscription will automatically renew
                    monthly until cancel(price subject to change). Cancel
                    anytime via Manage team > Team Setting > Subscription
                    details or <router-link to="/support">Customer Support</router-link>. -->
                  </b>
                  you also agree to the <span class="link-color"><a href="/terms_condition" target="_blank">Terms of Use</a></span> and the <span class="link-color">Subscription
                  and Cancellation Terms</span>.
                </p>
                <div class="text-center py-2">
<!--                  <spinner v-if="isLoading"></spinner>-->
                  <button
                    v-if="agree"
                    class="btn bg-success d-flex justify-content-center text-white agree-button br-30 btn-block"
                    @click="subscribe"
                  >
                    <LoadingOutlined class="mr-2 line-height-icon" v-if="isLoading" />
                    <span>Agree and Subscribe</span>
                  </button>
                </div>
              </div>
            </div>
            <div class="position-absolute buttons-position">
              <div class="d-flex">
                <button class="btn sub-back-btn px-4 py-2 text-white br-20 w-full" style="height: 38px; width: 70% !important; margin: auto;" @click="nextStep(1); successfulPage = false; agree = false">Back</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/dashboard/layout/Header.vue";
import Sidebar from "@/components/dashboard/layout/Sidebar.vue";
import Footer from "@/components/auth/Footer.vue";
import CardInput from "@/components/subscription/CardInput.vue";
import Spinner from "@/components/ui/Spinner.vue";
import ButtonComponent from "@/components/atom/ButtonComponent.vue";
import ApiService from "../../services/api.service";
import Notification from "@/common/notification.js";

import { LoadingOutlined } from "@ant-design/icons-vue";

export default {
  name: "SubscriptionPayment",
  components: {
    Header,
    Sidebar,
    Footer,
    CardInput,
    Spinner,
    ButtonComponent,

    LoadingOutlined,
  },
  data() {
    return {
      isLoading: false,
      user: {},
      is_verified: 1,
      error: null,
      subscriptionId: null,
      subscriptionName: null,
      subscriptionAmount: null,
      clientSecret: null,
      teamName: null,
      teamId: null,
      agree: false,
      activeStep: 1,
      cardStat: false,
      successfulPage: false,
      desktopView: true
    };
  },
  computed: {
    isWebSocketReady() {
      return this.$webSocket.readyState === 1;
    }
  },
  created() {
    if(this.$store.state.team.legalSubscription) {
      this.getSubscriptionId();
      this.getClientSecret();
      this.$store.dispatch("getCountries");
      if(this.$route.query && this.$route.query.name) {
        this.subscriptionName = this.$route.query.name;
      }
    } else {
      this.$router.push({ name: 'Subscription' });
    }
  },
  mounted() {
    this.initialInfoModal();
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    socketNotification(payload) {
      let loggedUser = JSON.parse(localStorage.getItem('user'));
      payload.sender = loggedUser.id;
      Notification.storeNotification(payload);
      payload.created_at = new Date();
      payload.seen = 0;
      payload.sender = loggedUser;
      if(payload && payload.receivers.length > 0) {
        payload.receivers = payload.receivers.map(item => {
          return item.toString();
        });

        if(this.isWebSocketReady) {
          this.$webSocket.send(JSON.stringify({
            action: 'notification',
            data: payload
          }));
        }
      }
    },
    nextStep(step) {
      this.activeStep = step;
      if(this.activeStep == 1) {
        this.cardStat = false;
        this.agree = false;
        this.$refs.card_input.setValidationFalse();
      }
    },
    setPaymentMethod(paymentMethod) {
      this.agree = true;
      console.log('payment method', paymentMethod, this.agree);
      this.successfulPage = true;
      this.cardStat = paymentMethod;
      // let myDeviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
      // if(myDeviceWidth >= 768) {
      //   this.activeStep = 2;
      // }
      this.activeStep = 2;
    },
    cartScreen() {
      this.activeStep = 2;
    },
    paymentScreen() {
      this.activeStep = 1;
      this.agree = false;
      this.cardStat = false;
      this.$refs.card_input.setValidationFalse();
    },
    async subscribe() {
      const _payload = {
        stripeToken: this.$store.state.user.payment_method,
        team_id: this.teamId,
        auto_renewal: 1,
        plane: this.subscriptionId,
      };

      this.isLoading = true;
      try {
        let {data} = await ApiService.post("/v1/subscription/new_subscription", _payload).then(res => res.data);

        // await this.$store.dispatch("createSubscription", _payload); // Action in the User module in store
        if(data) {
          this.isLoading = false;
          let subscribedTeam = this.$store.state.team.teamSelected;
          if(subscribedTeam && subscribedTeam.team_members && subscribedTeam.team_members.length > 1) {
            const self = this;
            let loggedUser = JSON.parse(localStorage.getItem('user'));
            let receivers = subscribedTeam.team_members.filter(item => item.user_id != loggedUser.id).map(opt => opt.user_id);
            let payload = {
              receivers: receivers,
              title: `bought a subscription`,
              team_temp_name: subscribedTeam.name,
              team_id: subscribedTeam.id
            };
            self.socketNotification(payload);
          }
          this.$router.push(
              `/subscription/complete/success/${this.subscriptionName}/${this.teamName}`
          );
          this.$store.state.team.legalSubscription = false;
        }
      } catch (error) {
        this.$error({
          title: "Subscription Payment Error!",
          // content: error.response.data.message,
          centered: true,
        });
        this.isLoading = false;
      }
    },
    getPaymentMethod(data) {
      console.log(data);
    },
    async getClientSecret() {
      await this.$store.dispatch("getClientSecret");
      this.clientSecret = this.$store.getters["clientSecret"];
      console.log(this.clientSecret);
    },

    getSubscriptionId() {
      const team = this.$route.params.team;
      const subId = this.$route.params.subId;
      const teamId = this.$route.params.id;
      this.teamId = teamId;
      this.teamName = team;
      this.subscriptionId = parseInt(subId);
      this.subscriptionAmount = this.$store.state.team.subscriptionAmount;
      // if (this.subscriptionId == 1) {
      //   this.subscriptionName = "1 Month Subscription Plan";
      //   this.subscriptionAmount = 10.0;
      // } else if (this.subscriptionId == 2) {
      //   this.subscriptionName = "3 Month Subscription Plan";
      //   this.subscriptionAmount = 24.0;
      // } else if (this.subscriptionId == 3) {
      //   this.subscriptionName = "6 Month Subscription Plan";
      //   this.subscriptionAmount = 42.0;
      // } else if (this.subscriptionId == 0) {
      //   this.subscriptionName = "Free 1 day Subscription Plan";
      //   this.subscriptionAmount = 0.0;
      // }
      // console.log(this.subscriptionName);
    },
    initialInfoModal() {
      this.$info({
          title: "Team Subscription & Payment",
          content: `We don't want people to be looking for someone for too
                  long.
                  The sooner you find someone suitable, we feel we have
                  achieved both your and our goal`,
          center: true,
        });
    },
    handleResize () {
      // console.log(window.innerWidth, 'wndow inneriwt', typeof window.innerWidth, this.desktopView)
      if (window.innerWidth > 768) {
        this.desktopView = true;
      } else {
        this.desktopView = false;
      }
    }
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";

.bg-1 {
  background-image: linear-gradient(
          to right top,
          #522e8e,
          #602d8d,
          #6e2b8c,
          #7a2a8a,
          #852888,
          #912787,
          #9d2585,
          #a82483,
          #b72181,
          #c51f7e,
          #d31f7b,
          #e02076
  );
}

.bg-2 {
  background: $bg-white;
}

.col-flex {
  flex: 1;
}

.div-1 {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  padding: 20px;
  //height: 90%;

  .section-heading {
    h4 {
      color: white;
      text-align: center;
      font-weight: 800;
    }

    p {
      text-align: justify;
      color: white;
    }
  }

  .card-info-div {
    border-radius: 5px;
    //height: 77%;
    height: 535px;
    @media (min-width: 768px) {
      padding: 15px;
      background-color: white;
    }
    @media (max-width: 768px) {
      max-height: 450px;
    }

    .card-info-form {
      height: 93%;
      border-radius: 5px;
      @media (min-width: 768px) {
        padding: 10px;
        background-image: linear-gradient(
                to right top,
                #522e8e,
                #602d8d,
                #6e2b8c,
                #7a2a8a,
                #852888,
                #912787,
                #9d2585,
                #a82483,
                #b72181,
                #c51f7e,
                #d31f7b,
                #e02076
        );
      }
    }

    .form-group {
      line-height: 0.5;

      label {
        color: white;
      }

      input {
        padding: 5px;
      }

      input[type="text"]:focus {
        border-radius: 5px;
      }
    }
  }
}

.div-2 {
  padding: 5px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;

  .section-heading {
    h6 {
      font-weight: 400;
    }

    hr {
      background-color: #222;
    }
  }

  .description {
    font-size: 12px;
    line-height: 1.1;
    margin-right: 20px;
    text-align: justify;
  }

  .cart {
    margin-right: 20px;
    background-image: linear-gradient(
            to right top,
            #522e8e,
            #602d8d,
            #6e2b8c,
            #7a2a8a,
            #852888,
            #912787,
            #9d2585,
            #a82483,
            #b72181,
            #c51f7e,
            #d31f7b,
            #e02076
    );
    border-radius: 5px;
    padding: 10px;

    @media (max-width: 768px) {
      margin-right: 0px;
    }

    .cart-heading {
      line-height: 0.2;

      h5 {
        font-size: 30px;
        color: white;
        font-weight: 500;
      }

      hr {
        background-color: white;
      }
    }

    .cart-description {
      padding-top: 16px;
      line-height: 0.5;
      color: white;

      @media (max-width: 768px) {
        padding-top: 0px;
      }

      p {
        font-size: 14px;
      }

      hr {
        background-color: white;
      }
    }

    .agree-terms {
      p {
        font-size: 12px;
      }
    }
  }

  .agree-terms {
    margin-top: 10px;
    margin-right: 20px;
    text-align: justify;
    @media (max-width: 768px) {
      margin-right: 0px;
      margin: 2px;
    }

    p {
      line-height: 1.1;
      //font-size: 12px;
    }
  }
}

.p-nmt {
  margin-top: -12px;
}

.br-30 {
  border-radius: 30px;
}

.agree-button {
  border: 1px solid $color-success;
  font-size: 16px;
  height: 50px;
  margin-top: 46px;
  @media (max-width: 768px) {
    margin-top: 0px !important;
    height: 38px !important;
  }

  &:hover {
    background: $color-white !important;
    color: $color-success !important;
    border: 1px solid $color-success !important;
  }
}

.line-height-icon {
  line-height: 1.4;
}

.border-right {
  border-right: 20px solid $border-primary !important;
  @media (max-width: 768px) {
    border-right: none !important;
  }
}

.w-d-50 {
  width: 100%;
}

.flex-mb-direction {
  flex-direction: column;
}

.agreement-text {
  font-size: 14px;
}

.main-content-wrapper {
  .main-content {
    width: 80%;
    margin: 15px;

    .custom-card {
      height: 570px;
      border-radius: 5px;

      .row {
        height: 100%;

        .div-1 {
          background-image: linear-gradient(
                  to right top,
                  #522e8e,
                  #602d8d,
                  #6e2b8c,
                  #7a2a8a,
                  #852888,
                  #912787,
                  #9d2585,
                  #a82483,
                  #b72181,
                  #c51f7e,
                  #d31f7b,
                  #e02076
          );
          height: 100%;
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
          padding: 20px;

          .section-heading {
            h4 {
              color: white;
              text-align: center;
              font-weight: 800;
            }

            p {
              text-align: justify;
              font-size: 14px;
              color: white;
            }
          }

          .card-info-div {
            padding: 15px;
            background-color: white;
            border-radius: 5px;
            height: 77%;

            .card-info-form {
              padding: 10px;
              background-image: linear-gradient(
                      to right top,
                      #522e8e,
                      #602d8d,
                      #6e2b8c,
                      #7a2a8a,
                      #852888,
                      #912787,
                      #9d2585,
                      #a82483,
                      #b72181,
                      #c51f7e,
                      #d31f7b,
                      #e02076
              );
              height: 93%;
              border-radius: 5px;
            }

            .form-group {
              line-height: 0.5;

              label {
                color: white;
              }

              input {
                padding: 5px;
              }

              input[type="text"]:focus {
                border-radius: 5px;
              }
            }
          }
        }

        .div-2 {
          padding: 5px;
          border-top-right-radius: 5px;
          border-top-left-radius: 5px;

          .section-heading {
            width: 35%;

            h6 {
              font-weight: 400;
            }

            hr {
              background-color: #222;
            }
          }

          .description {
            font-size: 12px;
            line-height: 1.1;
            margin-right: 20px;
            text-align: justify;
          }

          .cart {
            height: 50%;
            margin-right: 20px;
            background-image: linear-gradient(
                    to right top,
                    #522e8e,
                    #602d8d,
                    #6e2b8c,
                    #7a2a8a,
                    #852888,
                    #912787,
                    #9d2585,
                    #a82483,
                    #b72181,
                    #c51f7e,
                    #d31f7b,
                    #e02076
            );
            border-radius: 5px;
            padding: 10px;

            @media (max-width: 768px) {
              margin-right: 0px;
            }

            .cart-heading {
              width: 45%;
              line-height: 0.2;

              h5 {
                font-size: 30px;
                color: white;
                font-weight: 500;
              }

              hr {
                background-color: white;
              }
            }

            .cart-description {
              padding-left: 10px;
              padding-right: 10px;
              padding-top: 30px;
              line-height: 0.5;
              color: white;

              p {
                font-size: 14px;
              }

              hr {
                background-color: white;
              }
            }

            .agree-terms {
              p {
                font-size: 12px;
              }
            }
          }

          .agree-terms {
            margin-top: 10px;
            margin-right: 20px;
            text-align: justify;

            p {
              line-height: 1.1;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
.sub-back-btn {
  width: 100% !important;

  background-color: #fff !important;
  color: #6159a7 !important;
  border: 1px solid #6159a7 !important;
  box-shadow: none !important;
  border-radius: 30px !important;

} 
.details {
  margin-top: 30px;
  @media (max-width: 768px) {
    margin-top: 25px !important;
  }
}

.title-signup {
  margin-top: 10px;
  font-weight: bold;
  margin-bottom: -10px;
  font-style: italic;
}

.mobile-block {
  display: none;
}
.mobile-mode {
  //margin-top: 40px;
  @media (max-width: 768px) {
    margin-top: 0;
  }
}
.buttons-position {
  //top: -44px;
  //left: 8px;
  //z-index: 9;
  bottom: -50px;
  width: 100%
}

.heading-title-payment {
  font-size: 16px;
}

.heading-desc-payment {
  font-size: 12px;
}

.validate-text {
  color: #f9f9f9;
  padding-bottom: 8px;
}

@media (min-width: 768px) {
  .validate-text {
    color: rgba(0, 0, 0, 0.65);
    padding-bottom: 0;
  }
  .desktop-non-margin {
    //margin-left: -1.75rem;
  }
  .desktop-pl {
    padding-left: 1.25rem;
  }
  .agree-button {
    font-size: 22px;
  }
  .w-d-50 {
    width: 50%;
  }
  .flex-mb-direction {
    flex-direction: row;
  }
  .agreement-text {
    font-size: 14px;
  }
  .mobile-block {
    display: block;
  }
  .buttons-position {
    display: none;
  }
  .section-padding-payment {
    padding: 12px 15px !important;
  }
  .heading-title-payment {
    font-size: 30px;
  }
  .heading-desc-payment {
    font-size: 14x;
  }
}
.custom-height {
  @media (min-width: 1200px) {
    height: 638px;
  }
}
.next-payemnt-screen {
  padding: 1px 60px;
  font-size: 16px;
  margin-top: 30px;
  height: 40px;
  align-items: center;
  display: flex;
  justify-content: center;
  border: 1px solid #747373;
  outline-style: solid;
  outline-color: #cfcece;
}
.br-30 {
  border-radius: 30px;
}
.only-mobile {
  @media (min-width: 768px) {
    display: none;
  }
}
.link-color {
  color: #1976d2;
  font-weight: bold;
}

.card-info-form {
  @media (max-width: 768px) {
    .form-group {
      padding-top: 0px !important;
      margin-top: 0px !important;
    }
  }
}

.successful-page {
  max-height: 300px !important;
}

.mobile-view {
  display: none;
}

@media (max-width: 768px) {
  p {
    margin-bottom: 0px !important;
  }
}

.shadow-border {
  box-shadow: none !important;
  border: 2px solid #dddddd78 !important;
  border-radius: 10px !important;
}
</style>
