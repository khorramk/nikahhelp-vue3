<template>
  <div id="accordion" class="verificationInfo rounded">
    <div v-if="userData" class="verification-content">
      <a-collapse
        default-active-key="1"
        @change="changeActivekey"
        :activeKey="activeKey"
        :bordered="false"
        expand-icon-position="right"
        style="background-color: #f6f5fb;"
      >
        <template #expandIcon="props">
          <a-icon type="caret-down" :rotate="props.isActive ? 180 : 0" />
        </template>
        <a-collapse-panel key="1" header="1. Referee Information">
          <a-form-model
            v-if="verification && activeRouteName == 'RepresentativeRegistration'"
            ref="verification"
            :model="verification"
            :rules="rules"
            class="form-ma"
          >
            <div class="verification-header my-2 text-black-70">
              <!-- <p>
                To provide you with an authentic experience we verify all
                candidates (bride/groom) IDs as well as the ID of at least one
                representative in each team.
              </p> -->
              <!-- <p>
                If you do not wish to upload your ID documents now, that's fine.
                You can go back to the previous step by tapping the previous
                button at the bottom of this section and select 'No'. You can
                upload your ID documents later through your personal settings
                screen.
              </p> -->
              <!-- <p>
                We accept photos/scans of a driving license, passport, national
                ID card or residence permit issued by governments.
              </p> -->
              <!-- <p>
                Copies of your ID document will be deleted once your ID is
                verified in the interest of security.
              </p> -->
              <!-- <p>
                Our main goal is that real people connect with other real
                people.
              </p> -->

              <p>We may request this information anytime in case we need to do ID checks.</p>
              <!-- <ul>
                <li class="flex-start-center">
                  <img
                    src="@/assets/Icons/tick 2.svg"
                    alt="icon"
                    id="checkIcon"
                  />
                  Submit a valid, current photo ID with an expiry date
                </li>
                <li class="flex-start-center py-2">
                  <img
                    src="@/assets/Icons/tick 2.svg"
                    alt="icon"
                    id="checkIcon"
                  />
                  Show the full document (all four corners should be visible)
                </li>
                <li class="flex-start-center">
                  <img
                    src="@/assets/Icons/tick 2.svg"
                    alt="icon"
                    id="checkIcon"
                  />
                  Use a colour image that a is clear and easy to read
                </li>
              </ul> -->
            </div>
            <hr />
<!-- 
            <div class="row mt-3 border-bottom">
              <div class="col-12 col-md-6 none-padding">
                <div class="mb-2 font-weight-bold">
                  <a-icon
                    v-if="verification.ver_country"
                    class="color-success mr-2 fs-18 fw-500"
                    type="check"
                  />ID document issuing country
                </div>
              </div>
              <div class="col-12 col-md-6 mobile-margin">
                <div class="row">
                  <div class="col-12">
                    <a-form-model-item ref="ver_country" prop="ver_country">
                      <v-select
                        :clearable="false"
                        class="style-chooser"
                        @input="onChangeCountry($event, 'ver_country')"
                        id="ver_country"
                        placeholder="Country"
                        v-model="verification.ver_country"
                        label="name"
                        :reduce="(option) => option.name"
                        :options="representativeDetails.countries"
                        ><template #open-indicator>
                          <a-icon type="down" /> </template
                      ></v-select>
                    </a-form-model-item>
                  </div>
                   <div class="col-12 col-md-6">
                    <a-form-model-item ref="ver_city" prop="ver_city">
                      <v-select
                        :clearable="false"
                        class="style-chooser"
                        @input="onValueChange($event, 'ver_city_id')"
                        id="ver_city"
                        :loading="loading"
                        placeholder="City"
                        :reduce="(option) => option.name"
                        v-model="verification.ver_city"
                        label="name"
                        :options="verification.cities"
                        ><template #open-indicator>
                          <a-icon type="down" /> </template
                      ></v-select>
                    </a-form-model-item>
                  </div> 
                </div>
              </div> 
               <div class="col-12 none-padding mobile-margin mobile-help">
                <p>
                  <a
                    class="color-blue fw-700 fs-14"
                    data-toggle="collapse"
                    href="#Needver_country"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    <span v-if="arr[0].first" @click="toggle(0)">
                      Need Help?
                    </span>
                    <span v-else @click="toggle(0)"> Hide Help? </span>
                  </a>
                </p>
                <div
                  data-parent="#accordion"
                  class="collapse"
                  id="Needver_country"
                >
                  <div class="card card-body bubble">
                    Please provide tooltip texts so we can place it here
                  </div>
                </div>
              </div>
            </div> -->

            <!-- <div class="row pt-3 pb-2 border-bottom">
              <div class="col-12 col-md-6 none-padding">
                <div class="mb-2 font-weight-bold">
                  <a-icon
                    v-if="verification.ver_document_type"
                    class="color-success mr-2 fs-18 fw-500"
                    type="check"
                  />Document type?
                </div>
              </div>
              <div class="col-12 col-md-6 mobile-margin">
                <a-form-model-item
                  ref="ver_document_type"
                  prop="ver_document_type"
                >
                  <v-select
                    :clearable="false"
                    class="style-chooser"
                    @input="onValueChange($event, 'ver_document_type')"
                    id="ver_document_type"
                    placeholder="Document type"
                    :reduce="(option) => option.value"
                    v-model="verification.ver_document_type"
                    label="name"
                    :options="[
                      { name: 'Passport', value: 'Passport' },
                      { name: 'National ID', value: 'National ID' },
                      { name: 'Driving licence ', value: 'Driving licence ' },
                    ]"
                    ><template #open-indicator>
                      <a-icon type="down" /> </template
                  ></v-select>
                </a-form-model-item>
              </div>
              <div class="col-12 none-padding mobile-margin mobile-help">
                <p>
                  <a
                    class="color-blue fw-700 fs-14"
                    data-toggle="collapse"
                    href="#Needver_document_type"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    <span v-if="arr[1].first" @click="toggle(1)">
                      Need Help?
                    </span>
                    <span v-else @click="toggle(1)"> Hide Help? </span>
                  </a>
                </p>
                <div
                  data-parent="#accordion"
                  class="collapse"
                  id="Needver_document_type"
                >
                  <div class="card card-body bubble">
                    Please provide tooltip texts so we can place it here
                  </div>
                </div>
              </div>
            </div>

            <div class="row pt-3 pb-2 border-bottom">
              <div class="col-12 col-md-6 none-padding">
                <div class="mb-2 font-weight-bold">
                  <a-icon
                    v-if="verification.ver_document_frontside"
                    class="color-success mr-2 fs-18 fw-500"
                    type="check"
                  />Upload front side?
                </div>
              </div>
              <div class="col-12 col-md-6 mobile-margin">
                <div class="image-container text-center">
                  <span class="mb-2"
                    >The format supported are JPEG, PNG, PDF. Maximum file size
                    4 mb</span
                  >

                  <div class="img-preview mb-2">
                    <img
                      :src="
                        imageFont
                          ? imageFont
                          : verification.ver_document_frontside
                      "
                      width="180"
                      height="200"
                      v-if="verification.ver_document_frontside"
                    />
                    <div class="mt-3">Front Page</div>
                    <div
                      class="mt-4"
                      v-if="!verification.ver_document_frontside"
                    >
                      <a-icon
                        type="plus-circle"
                        :style="{ fontSize: '80px', color: '#aaa' }"
                      />
                    </div>
                  </div>
                  <input
                    v-if="!verification.ver_document_frontside"
                    type="file"
                    class="input-image"
                    name="avatar"
                    @change="getFrontPage"
                  />
                  <a-button
                    type="primary"
                    style="width: 185px"
                    v-if="verification.ver_document_frontside"
                    @click="clearImg('front')"
                  >
                    Remove
                  </a-button>
                </div>
              </div>
              <div class="col-12 none-padding mobile-margin mobile-help">
                <p>
                  <a
                    class="color-blue fw-700 fs-14"
                    data-toggle="collapse"
                    href="#Needver_document_frontside"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    <span v-if="arr[2].first" @click="toggle(2)">
                      Need Help?
                    </span>
                    <span v-else @click="toggle(2)"> Hide Help? </span>
                  </a>
                </p>
                <div
                  data-parent="#accordion"
                  class="collapse"
                  id="Needver_document_frontside"
                >
                  <div class="card card-body bubble">
                    Please provide tooltip texts so we can place it here
                  </div>
                </div>
              </div>
            </div>

            <div class="row pt-3 pb-2 border-bottom">
              <div class="col-12 col-md-6 none-padding">
                <div class="mb-2 font-weight-bold">
                  <a-icon
                    v-if="verification.ver_document_backside"
                    class="color-success mr-2 fs-18 fw-500"
                    type="check"
                  />Upload back side?
                </div>
              </div>
              <div class="col-12 col-md-6 mobile-margin">
                <div class="image-container text-center">
                  <span class="mb-2"
                    >The format supported are JPEG, PNG, PDF. Maximum file size
                    4 mb</span
                  >

                  <div class="img-preview mb-2">
                    <img
                      :src="
                        imageBack
                          ? imageBack
                          : verification.ver_document_backside
                      "
                      width="180"
                      height="200"
                      v-if="verification.ver_document_backside"
                    />

                    <div class="mt-3">Back Page</div>
                    <div
                      class="mt-4"
                      v-if="!verification.ver_document_backside"
                    >
                      <a-icon
                        type="plus-circle"
                        :style="{ fontSize: '80px', color: '#aaa' }"
                      />
                    </div>
                  </div>
                  <input
                    v-if="!verification.ver_document_backside"
                    type="file"
                    class="input-image"
                    name="avatar"
                    @change="getBackPage"
                  />
                  <a-button
                    type="primary"
                    style="width: 185px"
                    v-if="verification.ver_document_backside"
                    @click="clearImg('back')"
                  >
                    Remove
                  </a-button>
                </div>
              </div>
              <div class="col-12 none-padding mobile-margin mobile-help">
                <p>
                  <a
                    class="color-blue fw-700 fs-14"
                    data-toggle="collapse"
                    href="#Needver_document_backside"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    <span v-if="arr[3].first" @click="toggle(3)">
                      Need Help?
                    </span>
                    <span v-else @click="toggle(3)"> Hide Help? </span>
                  </a>
                </p>
                <div
                  data-parent="#accordion"
                  class="collapse"
                  id="Needver_document_backside"
                >
                  <div class="card card-body bubble">
                    Please provide tooltip texts so we can place it here
                  </div>
                </div>
              </div>
            </div>  -->

            <div class="row pt-3 pb-2">
              <div class="col-12 col-md-6 none-padding">
                <div style="display: flex">
                  <a-icon
                    class="color-success mr-2 fs-18 fw-500"
                    v-if="
                      verification.ver_recommender_title &&
                      verification.ver_recommender_first_name &&
                      verification.ver_recommender_last_name &&
                      verification.ver_recommender_occupation &&
                      verification.ver_recommender_address &&
                      verification.ver_recommender_mobile_no &&
                      verification.ver_recommender_email
                    "
                    type="check"
                  />
                  <div style="display: flex; flex-direction: column">
                    <span class="mr-2 fs-16 fw-700">Personal reference</span>
                    <!-- <span class="mr-2 fw-500">This section is optional. </span> -->
                    <span class="mr-2 fw-500">
                      The referee should be someone who knows you and can help prove you are who you say you are. Your referee must have known you for at least three years.
                    </span>
                  </div>
                </div>
              </div>

              <div class="col-12 col-md-6 mobile-margin">
                <a-form-model-item
                  ref="ver_recommender_title"
                  prop="ver_recommender_title"
                >
                  <a-input
                    v-model="verification.ver_recommender_title"
                    class="w-100"
                    :maxLength="20"
                    placeholder="Title"
                    required
                    @blur="onValueChange($event, 'ver_recommender_title')"
                  />
                </a-form-model-item>

                <div class="row">
                  <div class="col-6">
                    <a-form-model-item
                      ref="ver_recommender_first_name"
                      prop="ver_recommender_first_name"
                    >
                      <a-input
                        v-model="verification.ver_recommender_first_name"
                        class="w-100 rounded-right"
                        :maxLength="20"
                        placeholder="First Name"
                        @blur="
                          onValueChange($event, 'ver_recommender_first_name')
                        "
                      />
                    </a-form-model-item>
                  </div>
                  <div class="col-6">
                    <a-form-model-item
                      ref="ver_recommender_last_name"
                      prop="ver_recommender_last_name"
                    >
                      <a-input
                        v-model="verification.ver_recommender_last_name"
                        class="w-100 rounded-left"
                        placeholder="Last Name"
                        :maxLength="20"
                        @blur="
                          onValueChange($event, 'ver_recommender_last_name')
                        "
                      />
                    </a-form-model-item>
                  </div>
                </div>

                <a-form-model-item
                  ref="ver_recommender_occupation"
                  prop="ver_recommender_occupation"
                >
                  <v-select
                    :clearable="false"
                    class="style-chooser"
                    @input="onValueChange($event, 'ver_recommender_occupation')"
                    id="ver_recommender_occupation"
                    placeholder="Occupation"
                    v-model="verification.ver_recommender_occupation"
                    :maxLength="20"
                    label="name"
                    :reduce="(option) => option.name"
                    :options="representativeDetails.occupations"
                    ><template #open-indicator>
                      <a-icon type="down" /> </template
                  ></v-select>
                </a-form-model-item>

                <a-form-model-item
                  class="mt-2"
                  ref="ver_recommender_address"
                  prop="ver_recommender_address"
                >
                  <a-textarea
                    placeholder="Address"
                    :rows="4"
                    :maxLength="92"
                    v-model="verification.ver_recommender_address"
                    @blur="onValueChange($event, 'ver_recommender_address')"
                  />
                </a-form-model-item>
                <a-form-model-item>
                  <vue-tel-input
                    v-model="verification.ver_recommender_mobile_no"
                    @onInput="
                      onNumberChange($event, 'ver_recommender_mobile_no')
                    "
                    :inputOptions="{showDialCode: true}"
                    id="ver_recommender_mobile_no"
                    class="style-chooser"
                    :validCharactersOnly="true"
                    placeholder="Mobile Number"
                    style="background: #fff"
                  ></vue-tel-input>
                  <span class="error-number" v-if="!isValidNumber"
                    >Please write a valid mobile number</span>
                </a-form-model-item>
                <a-form-model-item
                  ref="ver_recommender_email"
                  prop="ver_recommender_email"
                >
                  <a-input
                    class="w-100"
                    id="inputNumber"
                    placeholder="Email Address"
                    v-model="verification.ver_recommender_email"
                    @blur="onValueChange($event, 'ver_recommender_email')"
                  />
                </a-form-model-item>
              </div>
              <div
                class="col-12 col-md-6 none-padding mobile-margin mobile-help"
              >
                <p>
                  <a
                    class="color-blue fw-700 fs-14"
                    data-toggle="collapse"
                    href="#Needver_recommender_title"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    <span v-if="arr[4].first" @click="toggle(4)">
                      Need Help?
                    </span>
                    <span v-else @click="toggle(4)"> Hide Help? </span>
                  </a>
                </p>
                <div
                  data-parent="#accordion"
                  class="collapse"
                  id="Needver_recommender_title"
                >
                  <div class="card card-body bubble">
                    A referee can be a person of community standing who know you. 
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-end">
              <a-button
                shape="round"
                type="primary"
                style="float: right; margin-bottom: 0.5rem; margin-right: -15px"
                class="mt-5"
                @click="handleSubmitFormOne"
                :class="{
                  disabled: !(verification.ver_recommender_title &&
                  verification.ver_recommender_first_name &&
                  verification.ver_recommender_last_name &&
                  verification.ver_recommender_occupation &&
                  verification.ver_recommender_address &&
                  verification.ver_recommender_mobile_no &&
                  verification.ver_recommender_email)
                }"
              >
                Save and continue
              </a-button>
            </div>
          </a-form-model>
        </a-collapse-panel>
      </a-collapse>

      <div class="verification-msg" v-if="(userData.status == '1' || userData.status == '2') && activeRouteName != 'RepresentativeRegistration'">
        <div class="identity">
          <img src="@/assets/Verification_Icons/Icon/SVG/Pending.svg" alt="icon" style="width: 200px; height: 230px" />
          <span> <strong>In Review</strong></span>
        </div>
        <div class="identity-footer mt-4">
          <span>To keep your account safe, we need to verify your identity. This is a
            legal requirement that help us to keep your account secure.
          </span>
        </div>
      </div>
      <div class="verification-msg" v-if="userData && userData.status == '3'">
        <div class="identity">
          <img src="@/assets/icon/varified.svg" alt="icon" style="width: 200px; height: 230px" />
          &nbsp;
          <span> <strong>Verified</strong></span>
        </div>
        <div class="identity-footer mt-4">
          <span>To keep your account safe, we need to verify your identity. This is a
            legal requirement that help us to keep your account secure.
          </span>
        </div>
      </div>
    </div>
    <!-- <div class="verification-msg" v-if="userData && userData.status == '2'">
      <div class="identity">
        <img
          src="@/assets/Verification_Icons/Icon/SVG/Pending.svg"
          alt="icon"
          style="width: 200px; height: 230px"
        />
        <span>In Review</span>
      </div>
      <div class="identity-footer mt-4">
        <span
          >To keep your account safe, we need to verify your identity. This is a
          legal requirement that help us to keep your account secure.
        </span>
        <span
          >We accept photo/scans of a driving license, passport, national ID
          card or residence permit issued in European Economic Are (EEA).
        </span>
      </div>
    </div>
    <div class="verification-msg" v-if="userData && userData.status == '3'">
      <div class="identity">
        <img
          src="@/assets/icon/varified.svg"
          alt="icon"
          style="width: 200px; height: 230px"
        />
        &nbsp;
        <span>Verified</span>
      </div>
      <div class="identity-footer mt-4">
        <span
          >To keep your account safe, we need to verify your identity. This is a
          legal requirement that help us to keep your account secure.
        </span>
        <span
          >We accept photo/scans of a driving license, passport, national ID
          card or residence permit issued in European Economic Are (EEA).
        </span>
      </div>
    </div> -->
  </div>
</template>

<style lang="scss">
@import "@/styles/base/_variables.scss";
</style>
<script>
import FileUploadOne from "@/components/shared/FileUploadOne.vue";
import ApiService from "@/services/api.service";
import vSelect from "vue-select";
import { VERIFICATION_RULES } from "./models/representative";
export default {
  name: "VerificationRef",
  props: {
    representativeDetails: {
      type: Object,
    },
    verification: {
      type: Object,
    },
  },
  components: {
    FileUploadOne,
    vSelect,
  },

  created() {
    this.userData = JSON.parse(localStorage.getItem("user"));
  },
  mounted() {
    // this.setPersonalInfoRepData();
    // this.getCountries();
    // this.getOccupations();
  },
  data() {
    return {
      arr: [
        { first: true },
        { first: true },
        { first: true },
        { first: true },
        { first: true },

        { first: true },
        { first: true },
        { first: true },

        { first: true },
        { first: true },
        { first: true },
      ],
      cities: [],
      imageBack: null,
      imageFont: null,
      rules: VERIFICATION_RULES,
      activeKey: 1,
      userData: null,
      loading: false,
      isValidNumber: true,
      ativerRouteName: 'RepresentativeRegistration'
    };
  },
  watch: {
    $route: {
      immediate: true,
      handler: function (to, from) {
        this.activeRouteName = this.$route.name;
      },
    },
  },

  methods: {
    onNumberChange(e) {
      this.isValidNumber = e.isValid;
      if (e.isValid) {
        //this.verification.ver_recommender_mobile_no = `${e.country.dialCode} ${this.verification.ver_recommender_mobile_no}`;
        this.saveVerificationInfo();
      }
    },
    changeActivekey(key) {
      this.activeKey = key;
    },

    handleSubmitFormOne() {
      this.$refs.verification.validate((valid) => {
        if (valid) {
          this.activeKey = null;
        } else {
          setTimeout(() => {
            const el = document.querySelector(".has-error:first-of-type");
            el.scrollIntoView();
          }, 100);
          return false;
        }
      });
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text
        .trim()
        .toLowerCase()
        .startsWith(input.toLowerCase());
    },
    onValueChange(e, name) {
      this.checkValidation(name);
      this.saveVerificationInfo();
    },
    checkValidation(name) {
      this.$refs.verification.fields.forEach((f) => {
        if (f.prop == name) {
          f.onFieldBlur();
        }
      });
    },
    saveVerificationInfo() {
      this.$emit('turnOnBtnLoader');
      const {
        ver_country,
        ver_document_type,
        ver_recommender_address,
        ver_recommender_first_name,
        ver_recommender_last_name,
        ver_recommender_occupation,
        ver_recommender_title,
        ver_recommender_mobile_no,
        ver_recommender_email
      } = this.verification;
      this.$store
        .dispatch("saveRepresentativeVerificationInfo", {
          ver_country,
          ver_document_type,
          ver_recommender_address,
          ver_recommender_first_name,
          ver_recommender_last_name,
          ver_recommender_occupation,
          ver_recommender_title,
          ver_recommender_mobile_no,
          ver_recommender_email
        })
        .then((data) => {
          this.$emit("valueChange", {
            value: this.verification,
            current: 2,
          });
          this.$emit('turnOffBtnLoader');
        })
        .catch((error) => {});
    },
    saveImageVerificationInfo(image) {
      this.$store
        .dispatch("saveRepresentativeImageVerificationInfo", image)
        .then((data) => {
          this.verification.ver_document_backside =
            data.data.data.verification.ver_document_backside;
          this.verification.ver_document_frontside =
            data.data.data.verification.ver_document_frontside;
          this.$emit("valueChange", {
            value: this.verification,
            current: 1,
          });
        })
        .catch((error) => {});
    },
    imageSizeCheck(file) {
      const allowedExtensions = ['jpg', 'jpeg', 'png'];
      const extension = file.name.split('.').pop().toLowerCase();
      if(!allowedExtensions.includes(extension)) {
        this.$error({
          title: "Error!",
          content: `The file you tried to upload is not a valid image file.`,
          center: true,
        });
        return false;
      };
      if (file["size"] > 4223550) {
        this.$error({
          title: "Error!",
          content: `The image you tried to upload is more than 4MB.
          Please try uploading an image that is less than 4MB.`,
          center: true,
        });
        return false;
      }
      return true;
    },
    getFrontPage(e) {
      let file = e.target.files[0];
      if (!this.imageSizeCheck(file)) {
        file = "";
        return;
      }

      this.verification.ver_document_frontside = e.target.files[0];
      this.saveImageVerificationInfo({
        ver_document_frontside: this.verification.ver_document_frontside,
      });

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.imageFont = e.target.result;
      };
    },
    getBackPage(e) {
      let file = e.target.files[0];

      if (!this.imageSizeCheck(file)) {
        file = "";
        return;
      }

      this.verification.ver_document_backside = e.target.files[0];

      this.saveImageVerificationInfo({
        ver_document_backside: this.verification.ver_document_backside,
      });

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.imageBack = e.target.result;
      };
	    let user = JSON.parse(localStorage.getItem("user"));
	    const {
		    ver_country,
		    ver_document_type,
		    ver_document_frontside,
		    ver_document_backside,
	    } = this.verification;
	    const isComplete = Object.values({
		    ver_country,
		    ver_document_type,
		    ver_document_backside,
		    ver_document_frontside,
	    }).every((x) => x !== undefined && x !== null && x !== "");
	    const data = {
		    id: user.id,
		    is_uplaoded_doc: isComplete ? "1" : "0",
	    };

			ApiService.post('v1/rep-upload-doc', data)
					.then((data) => {
						user.is_uplaoded_doc = isComplete ? "1" : "0";
						// localStorage.setItem(JSON.stringify(user));
						this.$emit("valueChange", true);
						console.log('sss')
					})
					.catch((error) => {});
    },

    async onChangeCountry(e, name) {
      this.loading = true;
      this.checkValidation(name);
     
      this.saveVerificationInfo();
    },
    toggle(index) {
      this.arr = this.arr.map((a, ind) => {
        if (ind === index) {
          a.first = !a.first;
        } else {
          a.first = true;
        }
        return a;
      });
    },
    clearImg(action) {
      switch (action) {
        case "back":
          this.backPageSrc = "";
          this.verification.ver_document_backside = "";
          break;
        case "front":
          this.frontPageSrc = "";
          this.verification.ver_document_frontside = "";
          break;
      }
      this.$emit("valueChange", {
        value: this.verification,
        current: 1,
      });
    },
  },
};
</script>


<style scoped lang="scss">
@import "@/styles/base/_variables.scss";

.verification-msg {
  .identity {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
.image-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.ant-tooltip-inner {
  border-radius: 0px;
}

img {
  border-radius: 5px;
}
.img-preview {
  width: 200px;
  border: 1px solid $color-secondary;
  border-radius: 5px;
  margin: 0px auto;
  height: 135px;
}
input[type="file"] {
  cursor: pointer;
  width: 180px;
  height: 34px;
  overflow: hidden;
  border-radius: 5px !important;
}

input[type="file"]:before {
  width: 180px;
  height: 32px;
  font-size: 16px;
  line-height: 32px;
  content: "Upload";
  display: inline-block;
  color: white;
  background: #8781bd;
  border: 1px solid #98a0e2;
  padding: 0 10px;
  text-align: center;
  font-family: Helvetica, Arial, sans-serif;
}

#checkIcon {
  height: 18px;
  margin-right: 5px;
}

input[type="file"]::-webkit-file-upload-button {
  visibility: hidden;
}
.close-icon {
  display: grid;
  place-content: center;
  position: absolute;
  right: 4.5rem;
  top: 2rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: white;
  z-index: 1;
  @media (min-width: 768px) {
    right: 5.5rem;
  }
}
.mobile-margin {
  margin-top: 0.5rem;
}
.mobile-center {
  text-align: center;
}
.mobile-switch {
  margin-top: 12px;
}
@media (min-width: 768px) {
  .form-right-content {
    float: right;
    padding-right: 0;
  }
  .mobile-margin {
    margin-top: 0;
  }
  .non-padding-mobile-margin {
    margin-top: 0;
  }
  .mobile-center {
    text-align: left;
  }
  .mobile-switch {
    margin-top: 0;
  }
}
.vue-tel-input {
  border-radius: 20px;
  height: 35px;

}

.error-number {
  color: red;
  margin: 5px;
}

.style-chooser::v-deep {
  .vti__dropdown {
    background-color: transparent !important;
  }
  .vti__input {
    font-size: 1rem;
    border-radius: 0px 30px 30px 0px !important;
  }
}
</style>
