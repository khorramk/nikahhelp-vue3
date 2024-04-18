<template>
  <div id="personalInfoAccordian" class="personal-info">
    <div class="section-heading heading-text">
      <h5>Personal Information</h5>
      <p>Your Personal Information</p>
    </div>
    <a-collapse
      accordion
      @change="changeActivekey"
      :activeKey="activeKey"
      :bordered="false"
      expand-icon-position="right"
    >
      <template #expandIcon="props">
        <a-icon type="caret-down" :rotate="props.isActive ? 180 : 0" />
      </template>
      <!-- 1. Essential Information -->
      <a-collapse-panel key="1" header="2.1 Essential Information">
        <a-form
          ref="personalInfoFormOne"
          v-if="
            personalInformation &&
            personalInformation.essential &&
            activeKey == 1
          "
          :rules="rules"
          :model="personalInformation.essential"
          class="form-ma"
        >
          <!-- Gender -->
          <div
           
            class="row mt-3 pb-2 border-bottom"
          >
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.essential.per_gender"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What is your gender?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-item ref="per_gender" name="per_gender">
                <v-select
                  :clearable="false"
                  class="style-chooser"
                  @input="onValueChange($event, 'essential')"
                  id="per_gender"
                  :reduce="(option) => option.value"
                  placeholder="please select"
                  v-model="personalInformation.essential.per_gender"
                  label="name"
                  :options="[
                    { name: 'Male', value: 1 },
                    { name: 'Female', value: 2 },
                  ]"
                  ><template #open-indicator> <a-icon type="down" /> </template>
                </v-select>
               
              </a-form-item>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapsePersonalInfoGender"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <span
                    v-if="arr[0].first"
                    @click="toggle(0)"
                  >
                    Need Help?
                  </span>
                  <span v-else @click="toggle(0)">
                    Hide Help?
                  </span>
                </a>
              </p>
              <div
                data-parent="#personalInfoAccordian"
                class="collapse"
                id="collapsePersonalInfoGender"
              >
                <div class="card card-body bubble">Select Your Gender</div>
              </div>
            </div>
          </div>

          <!-- DOB -->
          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.essential.dob"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What is your date of birth?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-item ref="dob" name="dob" class="dob-select">
                <DropdownDatePicker
                  id="dob"
                  displayFormat="dmy"
                  dropdownClass="custom-select"
                  :key="default_date"
                  :default-date="personalInformation.essential.default_date"
                  v-model="personalInformation.essential.dob"
                  v-bind:on-day-change="onDayChange"
                  v-bind:on-month-change="onMonthChange"
                  v-bind:on-year-change="onYearChange"
                  :maxYear="new Date().getFullYear() - 18"
                  :minYear="1940"
                ></DropdownDatePicker>
              </a-form-item>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapsePersonalInfoDateOfBirth"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <span
                    v-if="arr[1].first"
                    @click="toggle(1)"
                  >
                    Need Help?
                  </span>
                  <span v-else @click="toggle(1)">
                    Hide Help?
                  </span>
                </a>
              </p>
              <div
                data-parent="#personalInfoAccordian"
                class="collapse"
                id="collapsePersonalInfoDateOfBirth"
              >
                <div class="card card-body bubble">Choose DOB</div>
              </div>
            </div>
          </div>

          <!-- Height -->
          <div class="row mt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.essential.per_height"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What is your height?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-item ref="per_height" name="per_height">
                <!-- <a-select
                  @change="onValueChange($event, 'essential')"
                  id="per_height"
                  :showSearch="true"
                  option-filter-prop="children"
                  :filter-option="filterOption"
                  :showArrow="true"
                  style="width: 150px"
                  placeholder="please select"
                  v-model.number="personalInformation.essential.per_height"
                  class="select-ma w-100"
                >
                  <a-select-option :value="0" disabled
                    >Select your height</a-select-option
                  >
                  <a-select-option
                    :value="item.value"
                    :key="key"
                    style="width: 100px"
                    v-for="(item, key) in heightTV"
                  >
                    <div v-html="item.label"></div>
                  </a-select-option>
                </a-select> -->
                <v-select
                  :clearable="false"
                  class="style-chooser"
                  @input="onValueChange($event, 'essential')"
                  id="per_height"
                  :reduce="(option) => option.value"
                  placeholder="please select"
                  v-model="personalInformation.essential.per_height"
                  label="name"
                  :options="heightTV"
                  ><template #open-indicator> <a-icon type="down" /> </template>
                  <template v-slot:option="option">
                    <div v-html="option.label"></div> </template>
                  </v-select>
              </a-form-item>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapsePersonalInfoHeight"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <span
                    v-if="arr[2].first"
                    @click="toggle(2)"
                  >
                    Need Help?
                  </span>
                  <span v-else @click="toggle(2)">
                    Hide Help?
                  </span>
                </a>
              </p>
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoHeight"
              >
                <div class="card card-body bubble">
                  Please provide height in cm
                </div>
              </div>
            </div>
          </div>
 <!-- Religion -->
          <div class="row mt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.essential.per_religion_id"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What is your religion?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-item ref="per_religion_id" name="per_religion_id">
                <v-select
                  :calculate-position="withPopper"
                  append-to-body
                  :clearable="false"
                  class="style-chooser"
                  @input="onValueChange($event, 'essential')"
                  id="per_religion_id"
                  :reduce="(option) => option.id"
                  placeholder="please select"
                  v-model="personalInformation.essential.per_religion_id"
                  label="name"
                  :options="candidateDetails.religions"
                  ><template #open-indicator> <a-icon type="down" /> </template>
                </v-select>
                <!-- <a-select
                  @change="onValueChange($event, 'essential')"
                  id="per_religion_id"
                  :showSearch="true"
                  :filter-option="filterOption"
                  ref="select"
                  placeholder="Select your religion"
                  v-model="personalInformation.essential.per_religion_id"
                  class="select-ma w-100"
                >
                  <a-select-option disabled :value="0"
                    >Select your Religion</a-select-option
                  >
                  <a-select-option
                    :value="item.id"
                    v-bind:key="index"
                    v-for="(item, index) in candidateDetails.religions"
                    class="ma-select w-100"
                  >
                    {{ item.name }}
                  </a-select-option>
                </a-select> -->
              </a-form-item>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapsePersonalInfoReligion"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <span
                    v-if="arr[3].first"
                    @click="toggle(3)"
                  >
                    Need Help?
                  </span>
                  <span v-else @click="toggle(3)">
                    Hide Help?
                  </span>
                </a>
              </p>
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoReligion"
              >
                <div class="card card-body bubble">Your religion</div>
              </div>
            </div>
          </div>
            <!-- Education Level -->
          <div class="row mt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.essential.per_education_level_id"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What is your highest level of education?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-item
                ref="per_education_level_id"
                name="per_education_level_id"
              >
                <v-select
                  :clearable="false"
                  class="style-chooser"
                  @input="onValueChange($event, 'essential')"
                  id="per_education_level_id"
                  :reduce="(option) => option.id"
                  placeholder="please select"
                  v-model="personalInformation.essential.per_education_level_id"
                  label="name"
                  :options="candidateDetails.studylevels"
                  ><template #open-indicator> <a-icon type="down" /> </template>
                </v-select>
                <!-- <a-select
                  @change="onValueChange($event, 'essential')"
                  id="per_education_level_id"
                  :showSearch="true"
                  :filter-option="filterOption"
                  :showArrow="true"
                  placeholder="Please select your education status"
                  v-model="
                    personalInformation.essential.per_education_level_id
                  "
                  class="select-ma w-100"
                >

                  <a-select-option disabled :value="0"
                    >Select your education level</a-select-option
                  >
                  <a-select-option
                    :value="item.id"
                    v-bind:key="index"
                    v-for="(item, index) in candidateDetails.studylevels"
                    >{{ item.name }}</a-select-option
                  >
                </a-select> -->
              </a-form-item>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapsePersonalInfoHighestLevelEducation"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <span
                    v-if="arr[4].first"
                    @click="toggle(4)"
                  >
                    Need Help?
                  </span>
                  <span v-else @click="toggle(4)">
                    Hide Help?
                  </span>
                </a>
              </p>
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoHighestLevelEducation"
              >
                <div class="card card-body bubble">
                  Your highest level of education
                </div>
              </div>
            </div>
          </div>
          <!-- Employment status -->
          <div class="row mt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.essential.per_employment_status"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What is your employment status?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-item
                ref="per_employment_status"
                name="per_employment_status"
              >
                <v-select
                  :clearable="false"
                  class="style-chooser"
                  @input="onValueChange($event, 'essential')"
                  id="per_employment_status"
                  :reduce="(option) => option.value"
                  placeholder="please select"
                  v-model="personalInformation.essential.per_employment_status"
                  label="name"
                  :options="employment_Statuses"
                  ><template #open-indicator> <a-icon type="down" /> </template>
                </v-select>
                <!-- <a-select
                  @change="onValueChange($event, 'essential')"
                  id="per_employment_status"
                  ref="select"
                  placeholder="Select your employment status"
                  class="select-ma w-100"
                  v-model="
                    personalInformation.essential.per_employment_status
                  "
                >
                  <a-select-option disabled :value="0"
                    >Select your employment status</a-select-option
                  >
                  <a-select-option value="employed"
                    >Employed</a-select-option
                  >
                  <a-select-option value="unemployed"
                    >Unemploymed</a-select-option
                  >
                </a-select> -->
              </a-form-item>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapsePersonalInfoEmploymentSatus"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <span
                    v-if="arr[5].first"
                    @click="toggle(5)"
                  >
                    Need Help?
                  </span>
                  <span v-else @click="toggle(5)">
                    Hide Help?
                  </span>
                </a>
              </p>
              <div
                data-parent="#personalInfoAccordian"
                class="collapse"
                id="collapsePersonalInfoEmploymentSatus"
              >
                <div class="card card-body bubble">
                  Your current employment status
                </div>
              </div>
            </div>
          </div>

          <!-- Occupations -->
          <div class="row mt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.essential.per_occupation"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What is your occupation?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-item ref="per_occupation" name="per_occupation">
                <v-select
                  :clearable="false"
                  class="style-chooser"
                  @input="onValueChange($event, 'essential')"
                  id="per_occupation"
                  placeholder="please select"
                  :reduce="(option) => option.name"
                  v-model="personalInformation.essential.per_occupation"
                  label="name"
                  :options="candidateDetails.occupations"
                  ><template #open-indicator> <a-icon type="down" /> </template>
                </v-select>
                <!-- <a-select
                  @change="onValueChange($event, 'essential')"
                  id="per_occupation"
                  :showSearch="true"
                  option-filter-prop="children"
                  :filter-option="filterOption"
                  :showArrow="true"
                  style="width: 150px"
                  placeholder="Please select your education status"
                  v-model="personalInformation.essential.per_occupation"
                  class="select-ma w-100"
                >
                  <a-select-option :value="0" disabled
                    >Select your occupation</a-select-option
                  >
                  <a-select-option
                    :value="value"
                    :key="key"
                    style="width: 100px"
                    v-for="(value, key) in candidateDetails.occupations"
                  >
                    {{ value }}
                  </a-select-option>
                </a-select> -->
              </a-form-item>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapsePersonalInfoOccupation"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <span
                    v-if="arr[6].first"
                    @click="toggle(6)"
                  >
                    Need Help?
                  </span>
                  <span v-else @click="toggle(6)">
                    Hide Help?
                  </span>
                </a>
              </p>
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoOccupation"
              >
                <div class="card card-body bubble">Your current profession</div>
              </div>
            </div>
          </div>

        

         
         
          <!-- Essential Information End -->

          <a-button
            shape="round"
            type="primary"
            style="float: right; margin-bottom: 0.5rem; margin-right: -15px"
            class="mt-5"
            @click="handleSubmitFormOne"
          >
            Save & Continue
          </a-button>
        </a-form>
      </a-collapse-panel>

      <!-- 3. Contact Details -->
      <a-collapse-panel
        key="2"
        header="2.3 Contact Details"
        style="margin-top: 5px"
      >
        <a-form
          ref="personalInfoFormTwo"
          v-if="
            personalInformation && personalInformation.contact && activeKey == 2
          "
          :model="personalInformation.contact"
          class="form-ma"
          :rules="rules"
        >
          <!-- Current Residence -->
          <div class="row mt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="
                    personalInformation.contact.per_current_residence_country &&
                    personalInformation.contact.per_current_residence_city
                  "
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What is your current place of residence?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <div class="row">
                <div class="col-12 col-md-6">
                  <a-form-item
                    ref="per_current_residence_country"
                    name="per_current_residence_country"
                  >
                    <v-select
                      :clearable="false"
                      class="style-chooser"
                      @input="onCountryChange($event, 'contact', 'residence')"
                      id="per_current_residence_country"
                      placeholder="Select Country"
                      v-model="
                        personalInformation.contact
                          .per_current_residence_country
                      "
                      :reduce="(option) => option.id"
                      label="name"
                      :options="candidateDetails.countries"
                      ><template #open-indicator>
                        <a-icon type="down" /> </template>
                      </v-select>
                    <!-- <a-select
                      @change="
                        onCountryChange($event, 'contact', 'residence')
                      "
                      id="per_current_residence_country"
                      style="width: 150px"
                      :filter-option="filterOption"
                      :showSearch="true"
                      placeholder="Country"
                      v-model="
                        personalInformation.contact
                          .per_current_residence_country
                      "
                      class="select-ma w-100"
                    >
                      <a-select-option disabled :value="0"
                        >Select Country</a-select-option
                      >
                      <a-select-option
                        :value="item.id"
                        v-bind:key="index"
                        style="width: 100px"
                        v-for="(item, index) in candidateDetails.countries"
                      >
                        {{ item.name }}
                      </a-select-option>
                    </a-select> -->
                  </a-form-item>
                </div>
                <div class="col-12 col-md-6 mobile-margin">
                  <a-form-item
                    ref="per_current_residence_city"
                    name="per_current_residence_city"
                  >
                    <v-select
                      :clearable="false"
                      :loading="loading"
                      class="style-chooser"
                      @input="onValueChange($event, 'contact')"
                      id="per_current_residence_city"
                      placeholder="Select City"
                      v-model.number="
                        personalInformation.contact.per_current_residence_city
                      "
                      :reduce="(option) => option.name"
                      label="name"
                      :options="personalInformation.contact.residenceCities"
                      ><template #open-indicator>
                        <a-icon type="down" /> </template>
                      </v-select>
                    <!-- <a-select
                      @change="onValueChange($event, 'contact')"
                      id="per_current_residence_city"
                      style="width: 150px"
                      placeholder="City"
                      :filter-option="filterOption"
                      :showSearch="true"
                      v-model.number="
                        personalInformation.contact
                          .per_current_residence_city
                      "
                      class="select-ma w-100"
                    >
                      <a-select-option disabled :value="0"
                        >Select City</a-select-option
                      >
                      <a-select-option
                        v-for="city in personalInformation.contact
                          .residenceCities"
                        :key="city.id"
                        :value="city.id"
                        >{{ city.name }}</a-select-option
                      >
                    </a-select> -->
                  </a-form-item>
                </div>
              </div>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapsePersonalInfoCurrentResidenceCity"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <span
                    v-if="arr[7].first"
                    @click="toggle(7)"
                  >
                    Need Help?
                  </span>
                  <span v-else @click="toggle(7)">
                    Hide Help?
                  </span>
                </a>
              </p>
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoCurrentResidenceCity"
              >
                <div class="card card-body bubble">
                  Provide current residence's country and city
                </div>
              </div>
            </div>
          </div>

          <!-- Permanent Address Heading -->
          <div class="pt-3">
            <div class="mb-2 font-weight-bold">
              What is your permanent address?
            </div>
          </div>

          <!-- Permanent Post Code  -->
          <div class="row mt-3">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.contact.per_permanent_post_code"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />Post Code
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-item
                ref="per_permanent_post_code"
                name="per_permanent_post_code"
              >
                <a-input
                  @blur="onValueChange($event, 'contact')"
                  id="postCode"
                  :maxLength="10"
                  placeholder="Post Code"
                  v-model="personalInformation.contact.per_permanent_post_code"
                />
              </a-form-item>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapsePersonalInfoPostCode"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <span
                    v-if="arr[8].first"
                    @click="toggle(8)"
                  >
                    Need Help?
                  </span>
                  <span v-else @click="toggle(8)">
                    Hide Help?
                  </span>
                </a>
              </p>
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoPostCode"
              >
                <div class="card card-body bubble">
                  Post Code for permanent address
                </div>
              </div>
            </div>
          </div>

          <!-- Permanent Residence -->
          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="
                    personalInformation.contact.per_permanent_country &&
                    personalInformation.contact.per_permanent_city
                  "
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />Permanent Country and City
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <div class="row">
                <div class="col-12 col-md-6">
                  <a-form-item
                    ref="per_permanent_country"
                    name="per_permanent_country"
                  >
                    <v-select
                      :clearable="false"
                      class="style-chooser"
                      @input="onCountryChange($event, 'contact', 'permanant')"
                      id="per_permanent_country"
                      placeholder="Select Country"
                      v-model="
                        personalInformation.contact.per_permanent_country
                      "
                      :reduce="(option) => option.id"
                      label="name"
                      :options="candidateDetails.countries"
                      ><template #open-indicator>
                        <a-icon type="down" /> </template>
                      </v-select>
                    <!-- <a-select
                      @change="
                        onCountryChange($event, 'contact', 'permanant')
                      "
                      id="per_permanent_country"
                      style="width: 150px"
                      placeholder="Country"
                      :filter-option="filterOption"
                      :showSearch="true"
                      v-model="
                        personalInformation.contact.per_permanent_country
                      "
                      class="select-ma w-100"
                    >
                      <a-select-option disabled :value="0"
                        >Select Country</a-select-option
                      >
                      <a-select-option
                        :value="item.id"
                        v-bind:key="index"
                        style="width: 100px"
                        v-for="(item, index) in candidateDetails.countries"
                      >
                        {{ item.name }}
                      </a-select-option>
                    </a-select> -->
                  </a-form-item>
                </div>
                <div class="col-12 col-md-6 mobile-margin">
                  <a-form-item
                    ref="per_permanent_city"
                    name="per_permanent_city"
                  >
                    <v-select
                      :clearable="false"
                      :loading="loadingPermanant"
                      class="style-chooser"
                      @input="onValueChange($event, 'contact')"
                      id="per_permanent_city"
                      placeholder="Select City"
                      v-model="personalInformation.contact.per_permanent_city"
                      :reduce="(option) => option.name"
                      label="name"
                      :options="personalInformation.contact.permanantCities"
                      ><template #open-indicator>
                        <a-icon type="down" /> </template>
                      </v-select>
                    <!-- <a-select
                      @change="onValueChange($event, 'contact')"
                      id="per_permanent_city"
                      style="width: 150px"
                      placeholder="City"
                      :filter-option="filterOption"
                      :showSearch="true"
                      v-model="
                        personalInformation.contact.per_permanent_city
                      "
                      class="select-ma w-100"
                    >
                      <a-select-option disabled :value="0"
                        >Select City</a-select-option
                      >
                      <a-select-option
                        v-for="city in personalInformation.contact
                          .permanantCities"
                        :key="city.id"
                        :value="city.id"
                        >{{ city.name }}</a-select-option
                      >
                    </a-select> -->
                  </a-form-item>
                </div>
              </div>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#personalInfoParmanentCountryCity"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <span
                    v-if="arr[9].first"
                    @click="toggle(9)"
                  >
                    Need Help?
                  </span>
                  <span v-else @click="toggle(9)">
                    Hide Help?
                  </span>
                </a>
              </p>
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="personalInfoParmanentCountryCity"
              >
                <div class="card card-body bubble">
                  Permanent address Country and City
                </div>
              </div>
            </div>
          </div>

          <!-- Home Permanent Address  -->
          <div class="row mt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.contact.per_permanent_address"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />Home Address
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-item
                ref="per_permanent_address"
                name="per_permanent_address"
              >
                <a-textarea
                  @blur="onValueChange($event, 'contact')"
                  id="per_permanent_address"
                  :rows="3"
                  :maxLength="200"
                  v-model="personalInformation.contact.per_permanent_address"
                  placeholder="e.g. 267 West George St, Glasgow,Scotland,United Kingdom G2 1BP"
                ></a-textarea>
              </a-form-item>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapsePersonalInfoFullAddress"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <span
                    v-if="arr[10].first"
                    @click="toggle(10)"
                  >
                    Need Help?
                  </span>
                  <span v-else @click="toggle(10)">
                    Hide Help?
                  </span>
                </a>
              </p>
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoFullAddress"
              >
                <div class="card card-body bubble">Full address</div>
              </div>
            </div>
          </div>

          <!-- Mobile Number -->
          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="
                    personalInformation.contact.mobile_number &&
                    personalInformation.contact.mobile_country_code
                  "
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What is your mobile number?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <div class="row">
                <div class="col-4">
                  <a-form-item
                    ref="mobile_country_code"
                    name="mobile_country_code"
                  >
                    <a-select
                      @change="onValueChange($event, 'contact')"
                      id="mobile_country_code"
                      ref="select"
                      v-model="personalInformation.contact.mobile_country_code"
                      placeholder="Country Code"
                    >
                      <a-select-option value="">Select</a-select-option>
                      <a-select-option value="+44">+44</a-select-option>
                      <a-select-option value="+88">+88</a-select-option>
                      <a-select-option value="+46">+46</a-select-option>
                      <a-select-option value="+31	">+31 </a-select-option>
                      <a-select-option value="+39">+39</a-select-option>
                      <a-select-option value="+33">+33</a-select-option>
                      <a-select-option value="+353">+353</a-select-option>
                      <a-select-option value="+011">+011</a-select-option>
                    </a-select>
                  </a-form-item>
                </div>
                <div class="col-8">
                  <a-form-item ref="mobile_number" name="mobile_number">
                    <a-input
                      @blur="onValueChange($event, 'contact')"
                      id="mobile_number"
                      :maxLength="10"
                      v-model="personalInformation.contact.mobile_number"
                      placeholder="Mobile Number"
                    />
                  </a-form-item>
                </div>
              </div>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapsepersonalInfoContactNumber"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <span
                    v-if="arr[11].first"
                    @click="toggle(11)"
                  >
                    Need Help?
                  </span>
                  <span v-else @click="toggle(11)">
                    Hide Help?
                  </span>
                </a>
              </p>
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsepersonalInfoContactNumber"
              >
                <div class="card card-body bubble">
                  Provide mobile number with country code
                </div>
              </div>
            </div>
          </div>

          <!-- Email Address -->
          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.contact.per_email"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What is your email address?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-item ref="per_email" name="per_email">
                <a-input
                  @blur="onValueChange($event, 'contact')"
                  id="per_email"
                  type="email"
                  :value="personalInformation.contact.per_email"
                  placeholder="Sample email"
                  :disabled="true"
                />
              </a-form-item>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapsePersonalInfoEmailId"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <span
                    v-if="arr[12].first"
                    @click="toggle(12)"
                  >
                    Need Help?
                  </span>
                  <span v-else @click="toggle(12)">
                    Hide Help?
                  </span>
                </a>
              </p>
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoEmailId"
              >
                <div class="card card-body bubble">
                  Your registered email address. Read only field.
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
import DropdownDatePicker from "vue-dropdown-datepicker";
import NeedHelp from "@/components/candidate-registration/NeedHelp.vue";
import ethnicities from "@/common/ethnicities.js";
import languages from "@/common/languages.js";
import hobbies from "@/common/hobbies.js";
import foods from "@/common/foods.js";
import thankfulThings from "@/common/thankfulThings.js";
import { ARR_PersonalInfo, RULESPERSONALINFO } from "./models/candidate";
import { HEIGHTS, Employment_Statuses } from "@/models/data";
import ApiService from "@/services/api.service";
import vSelect from "vue-select";
import { createPopper } from "@popperjs/core";
export default {
  name: "ShortPersonalInfo",
  components: {
    DropdownDatePicker,
    NeedHelp,
    vSelect,
  },
  props: {
    candidateDetails: {
      type: Object,
    },
    personalInformation: {
      type: Object,
    },
  },
  data() {
    return {
      // dropdownShouldOpen: {
      //   type: Function,
      //   default({ noDrop, open, mutableLoading }) {
      //     return open;
      //   },
      // },
      activeKey: 1,
      default_date: null,
      rules: RULESPERSONALINFO,
      employment_Statuses: Employment_Statuses,
      languages: languages,
      hobbies: hobbies,
      foods: foods,
      thankfulThings: thankfulThings,
      ethnicityList: ethnicities,
      arr: ARR_PersonalInfo,
      heightTV: HEIGHTS,
      loading: false,
      loadingPermanant: false,
      activeRouteName: "CandidateRegistration",
      dateOfbirth: {
        day: null,
        month: null,
        year: null,
      },
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
    withPopper(dropdownList, component, { width }) {
      dropdownList.style.width = width;
      const popper = createPopper(component.$refs.toggle, dropdownList, {
        placement: "top",
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, -1],
            },
          },
          {
            name: "toggleClass",
            enabled: true,
            phase: "write",
            fn({ state }) {
              component.$el.classList.toggle(
                "drop-up",
                state.placement === "top"
              );
            },
          },
        ],
      });

      return () => popper.destroy();
    },
    clearImg() {
      this.personalInformation.more_about.per_additional_info_doc = null;
      this.personalInformation.more_about.per_additional_info_doc_title = null;
      this.$store
        .dispatch("savePersonalMoreAboutFile", {
          per_additional_info_doc:
            this.personalInformation.more_about.per_additional_info_doc,
        })
        .then((data) => {
          this.saveMoreAboutInfo();
        });
    },
    getResume(e) {
      let file = e.target.files[0];

      if (!this.imageSizeCheck(file)) {
        file = "";
        this.personalInformation.more_about.per_additional_info_doc_title = "";
        return;
      }
      if (!this.ValidateSingleInput(file)) {
        file = "";
        this.personalInformation.more_about.per_additional_info_doc_title = "";
        return;
      }
      this.personalInformation.more_about.per_additional_info_doc_title =
        file.name;
      this.personalInformation.more_about.per_additional_info_doc =
        e.target.files[0];
      this.$store
        .dispatch("savePersonalMoreAboutFile", {
          per_additional_info_doc:
            this.personalInformation.more_about.per_additional_info_doc,
        })
        .then((data) => {
          this.saveMoreAboutInfo();
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
      if (file["size"] > 5279437.5) {
        this.$error({
          title: "Validation Error",
          content: "Image size can't be more than 5 mb",
          center: true,
        });
        return false;
      }
      return true;
    },
    ValidateSingleInput(oInput) {
      let _validFileExtensions = [".pdf", ".doc", ".docx"];

      var sFileName = oInput.name;
      if (sFileName.length > 0) {
        var blnValid = false;
        for (var j = 0; j < _validFileExtensions.length; j++) {
          var sCurExtension = _validFileExtensions[j];
          if (
            sFileName
              .substr(
                sFileName.length - sCurExtension.length,
                sCurExtension.length
              )
              .toLowerCase() == sCurExtension.toLowerCase()
          ) {
            blnValid = true;
            break;
          }
        }

        if (!blnValid) {
          this.$error({
            title: "Validation Error",
            content: "File must be pdf, doc or docx",
            center: true,
          });
          oInput.name = "";
          return false;
        }
      }

      return true;
    },

    changeActivekey(key) {
      this.activeKey = key;
    },
    onValueChange(e, action) {
      console.log(this.personalInformation);
      this.save(action);
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
    handleSubmitFormOne() {
      this.$refs.personalInfoFormOne.validate((valid) => {
        if (valid) {
          window.scrollTo(0, 0);
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
      this.$refs.personalInfoFormTwo.validate((valid) => {
        if (valid) {
          window.scrollTo(0, 0);
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
   
   
    onDayChange(d) {
      this.dateOfbirth.day = d;
      this.onChangeDD();
    },
    onMonthChange(m) {
      this.dateOfbirth.month = m;
      this.onChangeDD();
    },
    onYearChange(y) {
      this.dateOfbirth.year = y;
      this.onChangeDD();
    },
    onChangeDD() {
      if (
        Object.values(this.dateOfbirth).every(
          (x) => x !== undefined && x !== null && x !== ""
        )
      ) {
        this.personalInformation.essential.dob = `${this.dateOfbirth.year}/${this.dateOfbirth.month}/${this.dateOfbirth.day}`;
        this.saveEssentialInfo();
      }
    },
    onMultiValueChange(e, name, action) {
      if (this.personalInformation.more_about[name].length > 3) {
        this.personalInformation.more_about[name] =
          this.personalInformation.more_about[name].splice(0, 3);
        return;
      }

      this.personalInformation.more_about[name] =
        this.personalInformation.more_about[name][
          this.personalInformation.more_about[name].length - 1
        ] == "Don't Mind"
          ? ["Don't Mind"]
          : this.personalInformation.more_about[name].filter(
              (item) => item != "Don't Mind"
            );

      this.save(action);
    },

    save(action) {
      switch (action) {
        case "essential":
          this.saveEssentialInfo();
          break;
        case "general":
          this.saveGeneralInfo();
          break;
        case "contact":
          this.saveContactInfo();
          break;
        case "more_about":
          this.saveMoreAboutInfo();
          break;
      }
    },
    async saveEssentialInfo() {
      await this.$store
        .dispatch("savePersonalEssentialInfo", {
          ...this.personalInformation.essential,
          per_religion_id:
            this.personalInformation.essential.per_religion_id == 0
              ? null
              : this.personalInformation.essential.per_religion_id,
        })
        .then((data) => {
          this.$emit("valueChange", {
            value: this.personalInformation,
            current: 0,
          });
        })
        .catch((error) => {});
    },
    async saveGeneralInfo() {
      await this.$store
        .dispatch("savePersonalGeneralInfo", this.personalInformation.general)
        .then((data) => {
          this.$emit("valueChange", {
            value: this.personalInformation,
            current: 0,
          });
        })
        .catch((error) => {});
    },
    async saveContactInfo() {
      await this.$store
        .dispatch("savePersonalContactInfo", this.personalInformation.contact)
        .then((data) => {
          this.$emit("valueChange", {
            value: this.personalInformation,
            current: 0,
          });
        })
        .catch((error) => {});
    },
    async saveMoreAboutInfo() {
      let {
        per_about,
        per_additional_info_text,
        per_children,
        per_have_children,
        per_marital_status,
        per_smoker,
        per_willing_to_relocate,
        per_currently_living_with,
        per_food_cuisine_like,
        per_hobbies_interests,
        per_improve_myself,
        per_language_speak,
        per_thankfull_for,
        per_things_enjoy,
        per_additional_info_doc_title,
      } = this.personalInformation.more_about;
      await this.$store
        .dispatch("savePersonalMoreAboutInfo", {
          ...{
            per_about,
            per_additional_info_text,
            per_children,
            per_have_children,
            per_marital_status,
            per_smoker,
            per_willing_to_relocate,
            per_currently_living_with,
            per_food_cuisine_like,
            per_hobbies_interests,
            per_improve_myself,
            per_language_speak,
            per_thankfull_for,
            per_things_enjoy,
            per_additional_info_doc_title,
          },
          per_have_children: false,
          per_smoker: this.personalInformation.more_about.per_smoker
            ? this.personalInformation.more_about.per_smoker.toString()
            : "",
          per_things_enjoy: this.personalInformation.more_about.per_things_enjoy
            ? this.personalInformation.more_about.per_things_enjoy.join(", ")
            : this.personalInformation.more_about.per_things_enjoy,
          per_hobbies_interests: this.personalInformation.more_about
            .per_hobbies_interests
            ? this.personalInformation.more_about.per_hobbies_interests.join(
                ","
              )
            : this.personalInformation.more_about.per_hobbies_interests,
          per_language_speak: this.personalInformation.more_about
            .per_language_speak
            ? this.personalInformation.more_about.per_language_speak.join(", ")
            : this.personalInformation.more_about.per_language_speak,
          per_thankfull_for: this.personalInformation.more_about
            .per_thankfull_for
            ? this.personalInformation.more_about.per_thankfull_for.join(", ")
            : this.personalInformation.more_about.per_thankfull_for,
          per_food_cuisine_like: this.personalInformation.more_about
            .per_food_cuisine_like
            ? this.personalInformation.more_about.per_food_cuisine_like.join(
                ","
              )
            : this.personalInformation.more_about.per_food_cuisine_like,
        })
        .then((data) => {
          this.$emit("valueChange", {
            value: this.personalInformation,
            current: 1,
          });
        })
        .catch((error) => {});
    },
    async onCountryChange(e, name, action) {
      if (action === "residence") {
        this.loading = true;
      } else {
        this.loadingPermanant = true;
      }
      const res = await ApiService.get(`v1/utilities/cities/${e}`);
      this.loading = false;
      this.loadingPermanant = false;
      if (res.status === 200) {
        switch (action) {
          case "permanant":
            this.personalInformation.contact.permanantCities = [];
            this.personalInformation.contact.permanantCities.push(
              ...res.data.data
            );
            break;
          case "residence":
            this.personalInformation.contact.residenceCities = [];
            this.personalInformation.contact.residenceCities.push(
              ...res.data.data
            );
            break;
        }
      }

      this.saveContactInfo();
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text
        .trim()
        .toLowerCase()
        .startsWith(input.toLowerCase());
    },
  },
};
</script>
<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.personal-info {
  padding: 0 0.75rem;
  .section-heading {
    text-align: center;
    color: $color-brand;
    h5 {
      color: $color-brand;
    }
    p {
      font-size: 14px;
    }
  }

  .text-box {
    border-color: $color-secondary;
    border-radius: 5px;
    color: $color-secondary;
  }
  .custom-select {
    font-size: 12px !important;
  }
  .anticon {
    color: #b3b2b2;
  }
}
input[type="file"] {
  cursor: pointer;
  width: 100%;
  height: 34px;
  overflow: hidden;
  border-radius: 20px !important;
}

input[type="file"]:before {
  width: 100%;
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
.img-preview {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  .close-icon {
    margin-top: 12px;
    width: 20px;
  }
}

#checkIcon {
  height: 18px;
  margin-right: 5px;
}

input[type="file"]::-webkit-file-upload-button {
  visibility: hidden;
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
  .json-format {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    overflow: hidden;
    .span2 {
      font-style: italic;
      font-size: 11px;
      white-space: pre-line;
      padding: 5px 0px;
    }
  }
}
</style>
