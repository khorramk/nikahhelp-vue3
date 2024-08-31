<template>
  <div id="accordion" class="personal-info">
    <a-collapse
      accordion
      :activeKey="activeKey"
      :bordered="false"
      @change="onChangePanel"
      expand-icon-position="right"
      style="background-color: #f6f5fb;"
    >
      <template #expandIcon="props">
         <CaretDownOutlined :rotate="props.isActive ? 180 : 0" />
      </template>
      <a-collapse-panel key="1" header="1. Essential Information">
        <a-form
          ref="repPersonalInfoFormOne"
          :rules="rules"
          v-if="personalInformation && personalInformation.essential"
          :model="personalInformation.essential"
          class="form-ma"
        >
          <div class="row mt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <CheckOutlined
                  v-if="personalInformation.essential.per_gender"
                  class="color-success mr-2 fs-18 fw-500"
                />What is your gender?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin" :class="{ 'disabled' : activeRouteName !== 'RepresentativeRegistration'}">
              <a-form-item ref="per_gender" name="per_gender">
                <a-select
                  :disabled="activeRouteName !== 'RepresentativeRegistration'"
                  class="style-chooser"
                  popupClassName="style-chooser"
                  @change="onValueChange($event, 'per_gender', 'essential')"
                  id="per_gender"
                  placeholder="please select"
                  :reduce="(option) => option.value"
                  v-model:value="personalInformation.essential.per_gender"
                  :options="[
                    { label: 'Male', value: 1 },
                    { label: 'Female', value: 2 }
                  ]"
                  ><template #open-indicator> <DownOutlined /> </template>
                </a-select>
              </a-form-item>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#Needper_gender"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <span v-show="arr[0].first" @click="toggle(0)">
                    Need Help?
                  </span>
                  <span v-show="!arr[0].first" @click="toggle(0)"> Hide Help? </span>
                </a>
              </p>
              <div
                data-parent="#accordion"
                class="collapse"
                id="Needper_gender"
              >
                <div class="card card-body bubble">
                  Please make sure your gender selection is correct. After
                  submitting your profile form for approval, a mistake can only
                  be changed by MatrimonyAssist Admin. This is because a
                  representative can be a candidate also in another team.
                </div>
              </div>
            </div>
          </div>
          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <CheckOutlined
                  v-if="personalInformation.essential.dob"
                  class="color-success mr-2 fs-18 fw-500"
                />What is your date of birth?
              </div>
            </div>
            <!-- <div class="col-12 col-md-6 mobile-margin" :class="{ 'disabled' : activeRouteName !== 'RepresentativeRegistration'}">
              <a-form-item ref="dob" name="dob">
                <DropdownDatePicker
                  id="dob"
                  displayFormat="dmy"
                  dropdownClass="custom-select"
                  :key="default_date"
                  :default-date="personalInformation.essential.dob"
                  v-model="personalInformation.essential.dob"
                  :on-change="onChangeDD"
                  :maxYear="new Date().getFullYear() - 18"
                  :minYear="1940"
                ></DropdownDatePicker>
              </a-form-item>
            </div> -->
            <div class="col-12 col-md-6 mobile-margin" :class="{ 'disabled' : activeRouteName !== 'RepresentativeRegistration'}">
              <a-form-item ref="dob" name="dob">
                <!-- <DropdownDatePicker
                  id="dob"
                  displayFormat="dmy"
                  dropdownClass="custom-select"
                  :key="default_date"
                  :default-date="personalInformation.essential.dob"
                  v-model="personalInformation.essential.dob"
                  :on-change="onChangeDD"
                  :maxYear="new Date().getFullYear() - 18"
                  :minYear="1940"
                ></DropdownDatePicker> -->
                <VueDatePicker
                  id="dob" 
                  v-model="personalInformation.essential.dob"
                  @blur="onChangeDD"
                  model-type="yyyy-MM-dd"
                  :flow="['year', 'month', 'day']"
                  :max-date="new Date(new Date().setFullYear(new Date().getFullYear() - 18))"
                  :min-date="'1940'"
                  :enable-time-picker="false"
                  style="z-index: 9999;"
                >

                </VueDatePicker>
              </a-form-item>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#Needdob"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <span v-show="arr[1].first" @click="toggle(1)">
                    Need Help?
                  </span>
                  <span v-show="!arr[1].first" @click="toggle(1)"> Hide Help? </span>
                </a>
              </p>
              <div data-parent="#accordion" class="collapse" id="Needdob">
                <div class="card card-body bubble">
                  Please make sure your DoB is correct. Once your profile is
                  submitted for approval a mistake can only be changed by
                  contacting MatrimonyAssist Admin Team with a valid proof of
                  ID. This is important because a representative can be a
                  candidate in another team.
                </div>
              </div>
            </div>
          </div>
          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <CheckOutlined
                  v-if="personalInformation.essential.per_occupation"
                  class="color-success mr-2 fs-18 fw-500"
                />What is your occupation?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-item ref="per_occupation" name="per_occupation">
                <a-select
                  :clearable="false"
                  class="style-chooser"
                  @change="onValueChange($event, 'per_occupation', 'essential')"
                  id="per_occupation"
                  placeholder="please select"
                  v-model:value="personalInformation.essential.per_occupation"
                  label="name"
                  :options="representativeDetails.occupations.map(item => ({ value: item.name, label: item.name}))"
                  ><template #open-indicator> <DownOutlined /> </template>
                </a-select>
              </a-form-item>

              <!-- <a-input
                class="w-100 mt-2"
                placeholder="Please specify"
                v-if="personalInformation.essential.per_occupation == 'Other'"
                @blur="onValueChange($event, 'per_occupation', 'essential')"
              /> -->
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#Needper_occupation"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <span v-show="arr[2].first" @click="toggle(2)">
                    Need Help?
                  </span>
                  <span v-show="!arr[2].first" @click="toggle(2)"> Hide Help? </span>
                </a>
              </p>
              <div
                data-parent="#accordion"
                class="collapse"
                id="Needper_occupation"
              >
                <div class="card card-body bubble">
                  We ask this question about your occupation for monitoring
                  purposes to understand the different types of people who are
                  happily giving their time to assist a loved one to find a
                  marriage partner.
                </div>
              </div>
            </div>
          </div>
          <div class="row pt-3 pb-0 p-3 justify-content-end">
            <a-button
              shape="round"
              type="primary"
              style=""
              class="mt-5"
              @click="handleSubmitFormOne"
            >
              Save & Continue
            </a-button>
            <!-- <div class="col-12 none-padding  p-2">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.essential.per_education"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What is your highest level of education?
              </div>
            </div> -->
          </div>
        </a-form>
      </a-collapse-panel>
      <a-collapse-panel
        key="2"
        header="2. Contact Details"
        style="margin-top: 5px"
      >
        <a-form
          ref="repPersonalInfoFormTwo"
          v-if="personalInformation && personalInformation.personal"
          :model="personalInformation.personal"
          :rules="rules_personal"
          class="form-ma"
        >
<!--          <div class="row mt-3 pb-2 border-bottom">-->
<!--            <div class="col-12 col-md-6 none-padding">-->
<!--              <div class="mb-2 font-weight-bold">-->
<!--                <a-icon-->
<!--                  v-if="-->
<!--                    personalInformation.personal-->
<!--                      .per_current_residence_country &&-->
<!--                    personalInformation.personal.per_current_residence_city-->
<!--                  "-->
<!--                  class="color-success mr-2 fs-18 fw-500"-->
<!--                  type="check"-->
<!--                />-->
<!--                Where is your current place of residence?-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="col-12 col-md-6 mobile-margin">-->
<!--              <div class="row">-->
<!--                <div class="col-12">-->
<!--                  <a-form-item-->
<!--                    ref="per_current_residence_country"-->
<!--                    name="per_current_residence_country"-->
<!--                  >-->
<!--                    <v-select-->
<!--                      :clearable="false"-->
<!--                      class="style-chooser"-->
<!--                      @input="-->
<!--                        onCountryChange(-->
<!--                          $event,-->
<!--                          'per_current_residence_country',-->
<!--                          'contact'-->
<!--                        )-->
<!--                      "-->
<!--                      id="per_current_residence_country"-->
<!--                      :placeholder="'Country'"-->
<!--                      v-model="-->
<!--                        personalInformation.personal-->
<!--                          .per_current_residence_country-->
<!--                      "-->
<!--                      label="name"-->
<!--                      :reduce="(option) => option.name"-->
<!--                      :options="representativeDetails.countries"-->
<!--                      ><template #open-indicator>-->
<!--                        <a-icon type="down" /> </template-->
<!--                    ></v-select>-->
<!--                  </a-form-item>-->
<!--                </div>-->
<!--              </div>-->
<!--              <a-input-->
<!--                class="w-100 mt-2"-->
<!--                v-if="-->
<!--                  personalInformation.personal.per_current_residence_country ==-->
<!--                    'Other' ||-->
<!--                  personalInformation.personal.per_current_residence_city ==-->
<!--                    'Other'-->
<!--                "-->
<!--                placeholder="Please specify"-->
<!--                @change="-->
<!--                  onValueChange($event, 'per_current_residence_city', 'contact')-->
<!--                "-->
<!--              />-->
<!--            </div>-->
<!--            <div class="col-12 none-padding mobile-margin mobile-help">-->
<!--              <p>-->
<!--                <a-->
<!--                  class="color-blue fw-700 fs-14"-->
<!--                  data-toggle="collapse"-->
<!--                  href="#Needper_current_residence_country"-->
<!--                  role="button"-->
<!--                  aria-expanded="false"-->
<!--                  aria-controls="collapseExample"-->
<!--                >-->
<!--                  <span v-if="arr[3].first" @click="toggle(3)">-->
<!--                    Need Help?-->
<!--                  </span>-->
<!--                  <span v-else @click="toggle(3)"> Hide Help? </span>-->
<!--                </a>-->
<!--              </p>-->
<!--              <div-->
<!--                data-parent="#accordion"-->
<!--                class="collapse"-->
<!--                id="Needper_current_residence_country"-->
<!--              >-->
<!--                <div class="card card-body bubble">-->
<!--                  We ask this question as we may need to crosscheck this-->
<!--                  information with any future ID checks that may be necessary in-->
<!--                  case there are queries about the authenticity of individual-->
<!--                  registrations.-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->

          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <CheckOutlined
                  v-if="personalInformation.personal.address_1"
                  class="color-success mr-2 fs-18 fw-500"
                />Address Line 1
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-item ref="address_1" name="address_1">
                <a-input
                  @blur="onValueChange($event, 'address_1', 'contact')"
                  :maxLength="46"
                  v-model:value="personalInformation.personal.address_1"
                  placeholder="e.g. 267 West George St, Glasgow,Scotland,United Kingdom G2 1BP"
                />
              </a-form-item>
            </div>
            <div class="col-12 col-md-6 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#address_1"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <span v-show="arr[4].first" @click="toggle(4)">
                    Need Help?
                  </span>
                  <span v-show="!arr[4].first" @click="toggle(4)"> Hide Help? </span>
                </a>
              </p>
              <div
                data-parent="#accordion"
                class="collapse"
                id="address_1"
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
                <CheckOutlined
                  v-if="personalInformation.personal.address_2"
                  class="color-success mr-2 fs-18 fw-500"
                />Address Line 2
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-item ref="address_2" name="address_2">
                <a-input
                  @blur="onValueChange($event, 'address_2', 'contact')"
                  :maxLength="46"
                  v-model:value="personalInformation.personal.address_2"
                  placeholder="e.g. 267 West George St, Glasgow,Scotland,United Kingdom G2 1BP"
                />
              </a-form-item>
            </div>
            <div class="col-12 col-md-6 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#address_2"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <span v-show="arr[5].first" @click="toggle(5)">
                    Need Help?
                  </span>
                  <span v-show="!arr[5].first" @click="toggle(5)"> Hide Help? </span>
                </a>
              </p>
              <div
                data-parent="#accordion"
                class="collapse"
                id="address_2"
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
                <CheckOutlined
                  v-if="personalInformation.personal.per_permanent_city"
                  class="color-success mr-2 fs-18 fw-500"
                />City
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-item
                ref="per_permanent_city"
                name="per_permanent_city"
              >
                <a-input
                  @blur="onValueChange($event, 'per_permanent_city', 'contact')"
                  v-model:value="personalInformation.personal.per_permanent_city"
                  placeholder="city"
                  maxLength="30"
                />
              </a-form-item>
            </div>
            <div class="col-12 col-md-6 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#per_permanent_city"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <span v-show="arr[6].first" @click="toggle(6)">
                    Need Help?
                  </span>
                  <span v-show="!arr[6].first" @click="toggle(6)"> Hide Help? </span>
                </a>
              </p>
              <div
                data-parent="#accordion"
                class="collapse"
                id="per_permanent_city"
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
                <CheckOutlined
                  v-if="personalInformation.personal.per_permanent_post_code"
                  class="color-success mr-2 fs-18 fw-500"
                />Post Code
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-item
                ref="per_permanent_post_code"
                name="per_permanent_post_code"
              >
                <a-input
                  @blur="
                    onValueChange($event, 'per_permanent_post_code', 'contact')
                  "
                  :maxLength="10"
                  placeholder="Post code, e.g. ME1 1BA"
                  v-model:value="personalInformation.personal.per_permanent_post_code"
                />
              </a-form-item>
            </div>
            <div class="col-12 col-md-6 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#per_permanent_post_code"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <span v-show="arr[7].first" @click="toggle(7)">
                    Need Help?
                  </span>
                  <span v-show="!arr[7].first" @click="toggle(7)"> Hide Help? </span>
                </a>
              </p>
              <div
                data-parent="#accordion"
                class="collapse"
                id="per_permanent_post_code"
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
                <CheckOutlined
                  v-if="personalInformation.personal.per_permanent_country"
                  class="color-success mr-2 fs-18 fw-500"
                />Country
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-item
                ref="per_permanent_country"
                name="per_permanent_country"
              >
                <v-select
                  :clearable="true"
                  class="style-chooser"
                  @option:selected="onCountryChange($event, 'per_permanent_country', 'contact')"
                  id="per_permanent_country"
                  placeholder="Select Country"
                  v-model="
                    personalInformation.personal.per_permanent_country
                  "
                  :reduce="(option) => option.id"
                  label="name"
                  :options="representativeDetails.countries"
                  >
                  <template #open-indicator>
                    <DownOutlined /> </template>
                </v-select>
              </a-form-item>
            </div>
            <div class="col-12 col-md-6 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#per_permanent_country"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <span v-show="arr[8].first" @click="toggle(8)">
                    Need Help?
                  </span>
                  <span v-show="!arr[8].first" @click="toggle(8)"> Hide Help? </span>
                </a>
              </p>
              <div
                data-parent="#accordion"
                class="collapse"
                id="per_permanent_country"
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
                <CheckOutlined
                  v-if="personalInformation.personal.mobile_number"
                  class="color-success mr-2 fs-18 fw-500"
                />What is your Phone number?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-item ref="mobile_number" name="mobile_number">
                <!-- <vue-tel-input
                  v-model="personalInformation.personal.mobile_number"
                  @blur="onNumberChange($event)"
                  :inputOptions="{showDialCode: true}"
                  :validCharactersOnly="true"
                  class="style-chooser"
                  placeholder="Mobile Number"
                  style="background-color: #fff;"
                ></vue-tel-input> -->
                <vue-tel-input 
                  v-model="personalInformation.personal.mobile_number"
                  :autoFormat="false"
                  :inputOptions="{showDialCode: true}"
                  :validCharactersOnly="true"
                  :dropdownOptions="{
                    showDialCodeInSelection: true,
                    showDialCodeInList: true,
                    showFlags: true
                  }"
                  @validate="onNumberChange($event)"
                >
                </vue-tel-input>
                <span class="error-number" v-if="!isValidNumber"
                  >Please write a valid mobile number</span
                >
              </a-form-item>
            </div>
            <div class="col-12 col-md-6 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#mobile_number"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <span v-show="arr[9].first" @click="toggle(9)">
                    Need Help?
                  </span>
                  <span v-show="!arr[9].first" @click="toggle(9)"> Hide Help? </span>
                </a>
              </p>
              <div
                data-parent="#accordion"
                class="collapse"
                id="mobile_number"
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
                <CheckOutlined
                  class="color-success mr-2 fs-18 fw-500"
                />What is your Email address?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-input
                class="w-100"
                placeholder="Email Address"
                id="inputNumber"
                :value="personalInformation.personal.email"
                :disabled="true"
              />
            </div>
            <div class="col-12 col-md-6 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#Needemail"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <span v-show="arr[10].first" @click="toggle(10)">
                    Need Help?
                  </span>
                  <span v-show="!arr[10].first" @click="toggle(10)"> Hide Help? </span>
                </a>
              </p>
              <div data-parent="#accordion" class="collapse" id="Needemail">
                <div class="card card-body bubble">
                  Please provide tooltip texts so we can place it here
                </div>
              </div>
            </div>
          </div>
          <a-button
            shape="round"
            type="primary"
            style="float: right; margin-bottom: 0.5rem; margin-right: -15px"
            class="mt-5"
            @click="handleSubmitFormTwo"
          >
            Save & Continue
          </a-button>
        </a-form>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>
<script>
// import DropdownDatePicker from "vue-dropdown-datepicker";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import vSelect from "vue-select";
import { RULES, RULES_PERSONAL } from "./models/representative";

import {
  CaretDownOutlined,
  CheckOutlined,
  DownOutlined,
} from "@ant-design/icons-vue";

export default {
  props: {
    representativeDetails: {
      type: Object,
    },
    personalInformation: {
      type: Object,
    },
  },
  name: "personInfoRefTwo",
  components: {
    // DropdownDatePicker,
    VueDatePicker,
    vSelect,

    CaretDownOutlined,
    CheckOutlined,
    DownOutlined,
  },
  data() {
    return {
      rules: RULES,
      rules_personal: RULES_PERSONAL,
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
      activeKey: ["1"],
      default_date: null,
      phoneNumber: undefined,
      isValidNumber: true,
      activeRouteName: "RepresentativeRegistration",
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
    checkValidation(name, action) {
      this.$refs[name].onFieldBlur();
      return;
      switch (action) {
        case "essential":
          this.$refs.repPersonalInfoFormOne.fields.forEach((f) => {
            if (f.prop == name) {
              f.onFieldBlur();
            }
          });
          break;
        case "general":
          this.$refs.repPersonalInfoFormTwo.fields.forEach((f) => {
            if (f.prop == name) {
              f.onFieldBlur();
            }
          });
          break;
      }
    },
    handleSubmitFormOne() {
      this.$refs.repPersonalInfoFormOne
        .validate()
        .then((valid) => {
          if (valid) {
            this.activeKey = ["2"];
          } else {
            setTimeout(() => {
              const el = document.querySelector(".has-error:first-of-type");
              el.scrollIntoView();
            }, 100);
            return false;
          }
        });
    },
    handleSubmitFormTwo() {
      this.$refs.repPersonalInfoFormTwo
        .validate()
        .then((valid) => {
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
    onValueChange(e, name, action) {
      this.checkValidation(name, action);
      this.save(action);
    },
    async saveEssentialInfo() {
      await this.$store
        .dispatch("createPersonalInfoForRepresentative", {
          ...this.personalInformation.essential,
        })
        .then(() => {
          this.$emit("valueChange", {
            value: this.personalInformation,
            current: 0,
          });
        })
        .catch(() => {});
    },
    async saveContactInfo() {
      await this.$store
        .dispatch(
          "creatContactInfoForRepresentative",
          this.personalInformation.personal
        )
        .then(() => {
          this.$emit("valueChange", {
            value: this.personalInformation,
            current: 0,
          });
        })
        .catch(() => {});
    },
    onNumberChange(e) {
      this.isValidNumber = e.valid === undefined ? true : e.valid;

      console.log(e, e.valid, 'we ==================================')
      if (e.valid) {
        console.log(this.isValidNumber, 'we vali helj')
        this.personalInformation.personal.mobile_country_code = e.countryCallingCode;
        // this.personalInformation.personal.mobile_number = `${e.country.dialCode} ${this.personalInformation.personal.mobile_number}`;
        this.save("contact");
      }
    },
    save(action) {
      switch (action) {
        case "essential":
          this.saveEssentialInfo();
          break;

        case "contact":
          this.saveContactInfo();
          break;
      }
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
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
    onChangeDD() {
      console.log("hello os")
      this.save("essential");
    },
    onChangePanel(e) {
      this.activeKey = e;
      this.$emit("pannelChanged", e);
    },
    async onCountryChange(e, name, action) {
      this.checkValidation(name, action);
      this.saveContactInfo();
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
@import "@/styles/base/_generic.scss";

.disabled {
  pointer-events: none;
  opacity: 0.4;
  cursor: not-allowed !important;
}
.anticon {
  color: #b3b2b2;
}
.ant-tooltip-inner {
  border-radius: 0px;
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
.error-number {
  color: red;
  margin: 5px;
}
.vue-tel-input {
  border-radius: 20px;
  height: 35px;

}

.style-chooser {
  :deep() {
    .vti__dropdown {
      background-color: transparent !important;
    }
    .vti__input {
      font-size: 1rem;
      border-radius: 0px 30px 30px 0px !important;
    }
  }
}
</style>