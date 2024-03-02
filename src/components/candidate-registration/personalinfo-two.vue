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
      style="background-color: #f6f5fb;"
    >
      <template #expandIcon="props">
        <a-icon type="caret-down" :rotate="props.isActive ? 180 : 0" />
      </template>
      <!-- <pre>{{ $store.state.candidateInfo.personalInformation }}</pre> -->
      <!-- 1. Essential Information -->
      <a-collapse-panel key="1" header="2.1 Essential Information">
        <a-form-model
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
          <div class="row mt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.essential.per_gender"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What is your gender?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin" :class="{ 'disabled' : activeRouteName !== 'CandidateRegistration'}">
              <a-form-model-item ref="per_gender" prop="per_gender">
                <v-select
                  :disabled="activeRouteName !== 'CandidateRegistration'"
                  :clearable="true"
                  class="style-chooser"
                  @input="onValueChange($event, 'essential', 'per_gender')"
                  id="per_gender"
                  :reduce="(option) => option.value"
                  placeholder="please select"
                  v-model="personalInformation.essential.per_gender"
                  label="name"
                  :options="[
                    { name: 'Male', value: 1 },
                    { name: 'Female', value: 2 },
                  ]"
                  >
                  <template #open-indicator> <a-icon type="down" /> </template>
                </v-select>
              </a-form-model-item>
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
                  <span v-if="arr[29].first" @click="toggle(29)">
                    Need Help?
                  </span>
                  <span v-else @click="toggle(29)"> Hide Help? </span>
                </a>
              </p>
              <div
                data-parent="#personalInfoAccordian"
                class="collapse"
                id="collapsePersonalInfoGender"
              >
                <div class="card card-body bubble">
                  Once a gender is selected and the completed form is submitted
                  for approval, if a mistake is made then it can only be changed
                  by contacting the MatrimonyAssist Team.
                </div>
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
                />What is your date of birth? (private)
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin" :class="{ 'disabled' : activeRouteName !== 'CandidateRegistration'}">
              <a-form-model-item ref="dob" prop="dob" class="dob-select">
                <DropdownDatePicker
                  id="dob"
                  displayFormat="dmy"
                  dropdownClass="custom-select"
                  :key="default_date"
                  :default-date="personalInformation.essential.dob"
                  v-model="personalInformation.essential.dob"
                  v-bind:on-day-change="onDayChange"
                  v-bind:on-month-change="onMonthChange"
                  v-bind:on-year-change="onYearChange"
                  :maxYear="new Date().getFullYear() - 18"
                  :minYear="1940"
                ></DropdownDatePicker>
              </a-form-model-item>
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
                  <span v-if="arr[28].first" @click="toggle(28)">
                    Need Help?
                  </span>
                  <span v-else @click="toggle(28)"> Hide Help? </span>
                </a>
              </p>
              <div
                data-parent="#personalInfoAccordian"
                class="collapse"
                id="collapsePersonalInfoDateOfBirth"
              >
                <div class="card card-body bubble">
                  Once date of birth is provided and the completed form is
                  submitted for approval, if a mistake is made then it can only
                  be changed by contacting the MatrimonyAssist Team.
                </div>
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
              <a-form-model-item ref="per_height" prop="per_height">
                <v-select
                  :clearable="true"
                  class="style-chooser"
                  @input="onValueChange($event, 'essential', 'per_height')"
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
              </a-form-model-item>
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
                  <span v-if="arr[27].first" @click="toggle(27)">
                    Need Help?
                  </span>
                  <span v-else @click="toggle(27)"> Hide Help? </span>
                </a>
              </p>
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoHeight"
              >
                <div class="card card-body bubble">
                  Please select a height option that is closest to your actual
                  height measured without shoes on from your feet to the top of
                  your head.
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
              <a-form-model-item ref="per_religion_id" prop="per_religion_id">
                <v-select
                  :calculate-position="withPopper"
                  append-to-body
                  :clearable="true"
                  class="style-chooser"
                  @input="onValueChange($event, 'essential', 'per_religion_id')"
                  id="per_religion_id"
                  :reduce="(option) => option.id"
                  placeholder="please select"
                  v-model="personalInformation.essential.per_religion_id"
                  label="name"
                  :options="candidateDetails.religions"
                  >
                  <template #open-indicator> <a-icon type="down" /> </template>
                </v-select>
              </a-form-model-item>
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
                  <span v-if="arr[26].first" @click="toggle(26)">
                    Need Help?
                  </span>
                  <span v-else @click="toggle(26)"> Hide Help? </span>
                </a>
              </p>
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoReligion"
              >
                <div class="card card-body bubble">
                  MatrimonyAssit is for everyone who believes in marriage as a
                  family and social institution for goodness.
                </div>
              </div>
            </div>
          </div>
          <!-- TODO - Practicing Religion Missing? -->
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
              <a-form-model-item
                ref="per_education_level_id"
                prop="per_education_level_id"
              >
                <v-select
                  :clearable="true"
                  class="style-chooser"
                  @input="
                    onValueChange($event, 'essential', 'per_education_level_id')
                  "
                  id="per_education_level_id"
                  :reduce="(option) => option.id"
                  placeholder="please select"
                  v-model="personalInformation.essential.per_education_level_id"
                  label="name"
                  :options="candidateDetails.studylevels"
                  >
                  <template #open-indicator> <a-icon type="down" /> </template>
                </v-select>
              </a-form-model-item>
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
                  <span v-if="arr[25].first" @click="toggle(25)">
                    Need Help?
                  </span>
                  <span v-else @click="toggle(25)"> Hide Help? </span>
                </a>
              </p>
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoHighestLevelEducation"
              >
                <div class="card card-body bubble">
                  Your highest level of education is the for which you have a
                  official certificate of achievement. If you can't find your
                  education level listed, please select 'other' and state your
                  education level in the additional information text field.
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
              <a-form-model-item
                ref="per_employment_status"
                prop="per_employment_status"
              >
                <v-select
                  :clearable="true"
                  class="style-chooser"
                  @input="
                    onValueChange($event, 'essential', 'per_employment_status')
                  "
                  id="per_employment_status"
                  :reduce="(option) => option.value"
                  placeholder="please select"
                  v-model="personalInformation.essential.per_employment_status"
                  label="name"
                  :options="employment_Statuses"
                  >
                  <template #open-indicator> <a-icon type="down" /> </template>
                </v-select>
              </a-form-model-item>
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
                  <span v-if="arr[24].first" @click="toggle(24)">
                    Need Help?
                  </span>
                  <span v-else @click="toggle(24)"> Hide Help? </span>
                </a>
              </p>
              <div
                data-parent="#personalInfoAccordian"
                class="collapse"
                id="collapsePersonalInfoEmploymentSatus"
              >
                <div class="card card-body bubble">
                  If you have more than one employment status, please select the
                  one that takes up most of your time. If you can't find your
                  employment status listed, please select 'other' and state your
                  employment status details in the additional information text
                  field.
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
              <a-form-model-item ref="per_occupation" prop="per_occupation">
                <v-select
                  :clearable="true"
                  class="style-chooser"
                  @input="onValueChange($event, 'essential', 'per_occupation')"
                  id="per_occupation"
                  placeholder="please select"
                  :reduce="(option) => option.name"
                  v-model="personalInformation.essential.per_occupation"
                  label="name"
                  :options="candidateDetails.occupations"
                  >
                  <template #open-indicator> <a-icon type="down" /> </template>
                </v-select>
              </a-form-model-item>
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
                  <span v-if="arr[23].first" @click="toggle(23)">
                    Need Help?
                  </span>
                  <span v-else @click="toggle(23)"> Hide Help? </span>
                </a>
              </p>
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoOccupation"
              >
                <div class="card card-body bubble">
                  If you have more than one occupation, please select the one
                  that takes up most of your time. If you can't find your
                  occupation listed, please select 'other' and state your
                  occupation details in the additional information text field.
                </div>
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
        </a-form-model>
      </a-collapse-panel>

      <!-- 2. General Information -->
      <a-collapse-panel
        key="2"
        header="2.2 General Information"
        style="margin-top: 5px"
      >
        <a-form-model
          ref="personalInfoFormTwo"
          v-if="
            personalInformation && personalInformation.general && activeKey == 2
          "
          :model="personalInformation.general"
          :rules="rules"
          class="form-ma"
        >
          <!-- Ethnicity -->
          <div class="row mt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.general.per_ethnicity"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What is your ethnicity?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item ref="per_ethnicity" prop="per_ethnicity">
                <v-select
                  :clearable="true"
                  class="style-chooser"
                  @input="onValueChange($event, 'general', 'per_ethnicity')"
                  id="per_ethnicity"
                  placeholder="please select"
                  v-model="personalInformation.general.per_ethnicity"
                  label="name"
                  :options="candidateDetails.ethnicities"
                  >
                  <template #open-indicator> <a-icon type="down" /> </template>
                </v-select>
                <!-- <a-select
                  @change="onValueChange($event, 'general')"
                  id="per_ethnicity"
                  :showSearch="true"
                  option-filter-prop="children"
                  :filter-option="filterOption"
                  :showArrow="true"
                  ref="select"
                  style="width: 150px"
                  placeholder="Please select your ethnicities"
                  v-model="personalInformation.general.per_ethnicity"
                  class="select-ma w-100"
                >
                  <a-select-option :value="0" disabled
                    >Select Ethnicity</a-select-option
                  >

                  <a-select-option
                    v-for="(ethnicity, key) in candidateDetails.ethnicities"
                    :value="ethnicity"
                    :key="key"
                  >
                    {{ ethnicity }}
                  </a-select-option>
                </a-select> -->
              </a-form-model-item>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapsePersonalInfoEthnicity"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <span v-if="arr[22].first" @click="toggle(22)">
                    Need Help?
                  </span>
                  <span v-else @click="toggle(22)"> Hide Help? </span>
                </a>
              </p>
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoEthnicity"
              >
                <div class="card card-body bubble">
                  If you can't find your ethnicity listed, please select 'other'
                  and state your ethnicity details in the additional information
                  text field.
                </div>
              </div>
            </div>
          </div>

          <!-- Mother Tongue -->
          <div class="row mt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.general.per_mother_tongue"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What is your mother tongue?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item
                ref="per_mother_tongue"
                prop="per_mother_tongue"
              >
                <v-select
                  :clearable="true"
                  class="style-chooser"
                  @input="onValueChange($event, 'general', 'per_mother_tongue')"
                  id="per_mother_tongue"
                  placeholder="please select"
                  v-model="personalInformation.general.per_mother_tongue"
                  label="name"
                  :options="candidateDetails.languages"
                  >
                  <template #open-indicator> <a-icon type="down" /> </template>
                </v-select>
              </a-form-model-item>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapsePersonalInfoSpeakingLanguage"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <span v-if="arr[21].first" @click="toggle(21)">
                    Need Help?
                  </span>
                  <span v-else @click="toggle(21)"> Hide Help? </span>
                </a>
              </p>
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoSpeakingLanguage"
              >
                <div class="card card-body bubble">
                  If you can't find your mother tongue listed, please select
                  'other' and state your mother tongue details in the additional
                  information text field.
                </div>
              </div>
            </div>
          </div>

          <!-- Nationality -->
          <div class="row mt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.general.per_nationality"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What is your nationality?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item ref="per_nationality" prop="per_nationality">
                <v-select
                  :clearable="true"
                  class="style-chooser"
                  @input="onValueChange($event, 'general', 'per_nationality')"
                  id="per_nationality"
                  placeholder="please select"
                  :reduce="(option) => option.id"
                  v-model="personalInformation.general.per_nationality"
                  label="name"
                  :options="candidateDetails.countries"
                  >
                  <template #open-indicator> <a-icon type="down" /> </template>
                </v-select>
              </a-form-model-item>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapsePersonalInfonationality"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <span v-if="arr[20].first" @click="toggle(20)">
                    Need Help?
                  </span>
                  <span v-else @click="toggle(20)"> Hide Help? </span>
                </a>
              </p>
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfonationality"
              >
                <div class="card card-body bubble">
                  You may have more than one nationality (by birth or acquired),
                  please choose one here and you may provide futher details in
                  the additional information text field.
                </div>
              </div>
            </div>
          </div>

          <!-- Country Of Birth -->
          <div class="row mt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.general.per_country_of_birth"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What is your country of birth?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item
                ref="per_country_of_birth"
                prop="per_country_of_birth"
              >
                <v-select
                  :clearable="true"
                  class="style-chooser"
                  @input="
                    onValueChange($event, 'general', 'per_country_of_birth')
                  "
                  id="per_country_of_birth"
                  placeholder=" please select"
                  :reduce="(option) => option.id"
                  v-model="personalInformation.general.per_country_of_birth"
                  label="name"
                  :options="candidateDetails.countries"
                  >
                  <template #open-indicator> <a-icon type="down" /> </template>
                </v-select>
              </a-form-model-item>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapsePersonalInfoCountryOfBirth"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <span v-if="arr[19].first" @click="toggle(19)">
                    Need Help?
                  </span>
                  <span v-else @click="toggle(19)"> Hide Help? </span>
                </a>
              </p>
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoCountryOfBirth"
              >
                <div class="card card-body bubble">
                  If you can't find your country listed, please select 'other'
                  and state your country details in the additional information
                  text field.
                </div>
              </div>
            </div>
          </div>

          <!-- General Health and Well being -->
          <div class="row mt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.general.per_health_condition"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />How would you describe your general health and
                wellbeing?(optional)
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item
                ref="per_health_condition"
                prop="per_health_condition"
              >
                <a-textarea
                  @blur="
                    onValueChange($event, 'general', 'per_health_condition')
                  "
                  id="per_health_condition"
                  placeholder="Your may wish to use a  description like fair, good, very good, or excellent."
                  :rows="3"
                  :maxLength="200"
                  v-model="personalInformation.general.per_health_condition"
                ></a-textarea>
              </a-form-model-item>
              <span style="display: flex; justify-content: flex-end"
                >{{
                  personalInformation.general.per_health_condition
                    ? personalInformation.general.per_health_condition.length
                    : 0
                }}/200</span
              >
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapsePersonalInfoHealthCondition"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <span v-if="arr[18].first" @click="toggle(18)">
                    Need Help?
                  </span>
                  <span v-else @click="toggle(18)"> Hide Help? </span>
                </a>
              </p>
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoHealthCondition"
              >
                <div class="card card-body bubble">
                  Please do not include very sensitive information. General
                  indication is expected only.Your may wish to use a description
                  like cannot complain, in good health, no chronic illness,
                  fair, good, very good, or excellent. You do not have to give a
                  response if you do not wish to at this stage.
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
        </a-form-model>
      </a-collapse-panel>

      <!-- 3. Contact Details -->
      <a-collapse-panel
        key="3"
        header="2.3 Contact Details"
        style="margin-top: 5px"
      >
        <a-form-model
          ref="personalInfoFormThree"
          v-if="
            personalInformation && personalInformation.contact && activeKey == 3
          "
          :model="personalInformation.contact"
          class="form-ma"
          :rules="rules"
        >
          <!-- Current Residence -->
          <!-- <div class="row mt-3 pb-2 border-bottom">
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
                <div class="col-12 col-md-12">
                  <a-form-model-item
                    ref="per_current_residence_country"
                    prop="per_current_residence_country"
                  >
                    <v-select
                      :clearable="true"
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
                        <a-icon type="down" /> </template
                    ></v-select>
                     <a-select
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
                    </a-select> 
                  </a-form-model-item>
                </div>
                <div class="col-12 col-md-6 mobile-margin">
                  <a-form-model-item
                    ref="per_current_residence_city"
                    prop="per_current_residence_city"
                  >
                    <v-select
                      :clearable="true"
                      :loading="loading"
                      class="style-chooser"
                      @input="
                        onValueChange(
                          $event,
                          'contact',
                          'per_current_residence_city'
                        )
                      "
                      id="per_current_residence_city"
                      placeholder="Select City"
                      v-model.number="
                        personalInformation.contact.per_current_residence_city
                      "
                      :reduce="(option) => option.name"
                      label="name"
                      :options="personalInformation.contact.residenceCities"
                      ><template #open-indicator>
                        <a-icon type="down" /> </template
                    ></v-select>
                    <a-select
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
                    </a-select> 
                  </a-form-model-item>
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
                  <span v-if="arr[17].first" @click="toggle(17)">
                    Need Help?
                  </span>
                  <span v-else @click="toggle(17)"> Hide Help? </span>
                </a>
              </p>
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoCurrentResidenceCity"
              >
                <div class="card card-body bubble">
                  Your current place of residence is where you may be staying
                  for work, study or any other purpose.
                </div>
              </div>
            </div>
          </div> -->

          <!-- Permanent Address Heading -->
          <!-- <div class="pt-3">
            <div class="mb-2 font-weight-bold">
              What is your address?
            </div>
          </div> -->
          <!-- Home Permanent Address  -->
          <div class="row mt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.contact.address_1"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />
                Address Line 1 (private)
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item ref="address_1" prop="address_1">
                <a-input
                  @blur="onValueChange($event, 'contact', 'address_1')"
                  id="address_1"
                  :maxLength="46"
                  v-model="personalInformation.contact.address_1"
                  placeholder="e.g. 267 West George St, Glasgow,Scotland,United Kingdom G2 1BP"
                />
              </a-form-model-item>

              <!-- <span style="display: flex; justify-content: flex-end"
                >{{
                  personalInformation.contact.per_permanent_address
                    ? personalInformation.contact.per_permanent_address.length
                    : 0
                }}/200</span -->
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
                  <span v-if="arr[14].first" @click="toggle(14)">
                    Need Help?
                  </span>
                  <span v-else @click="toggle(14)"> Hide Help? </span>
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
          <div class="row mt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.contact.address_2"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />Address Line 2 (private)
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item ref="address_2" prop="address_2">
                <a-input
                  @blur="onValueChange($event, 'contact', 'address_2')"
                  id="address_2"
                  :rows="3"
                  :maxLength="46"
                  v-model="personalInformation.contact.address_2"
                  placeholder="e.g. 267 West George St, Glasgow,Scotland,United Kingdom G2 1BP"
                />
              </a-form-model-item>
              <!-- <span style="display: flex; justify-content: flex-end"
                >{{
                  personalInformation.contact.per_permanent_address
                    ? personalInformation.contact.per_permanent_address.length
                    : 0
                }}/200</span -->
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapsePersonalInfoaddress_2"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <span v-if="arr[29].first" @click="toggle(29)">
                    Need Help?
                  </span>
                  <span v-else @click="toggle(29)"> Hide Help? </span>
                </a>
              </p>
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoaddress_2"
              >
                <div class="card card-body bubble">Full address</div>
              </div>
            </div>
          </div>
          <!--City -->
          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.contact.per_permanent_city"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />City
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item
                ref="per_permanent_city"
                prop="per_permanent_city"
              >
                <a-input
                  @blur="onValueChange($event, 'contact', 'per_permanent_city')"
                  id="per_permanent_city"
                  type="text"
                  :maxLength="30"
                  v-model="personalInformation.contact.per_permanent_city"
                  placeholder="City"
                />
              </a-form-model-item>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapsepersonalInfoCity"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <span v-if="arr[30].first" @click="toggle(30)">
                    Need Help?
                  </span>
                  <span v-else @click="toggle(13)"> Hide Help? </span>
                </a>
              </p>
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsepersonalInfoCity"
              >
                <div class="card card-body bubble">Provide your city</div>
              </div>
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
                />Post Code (private)
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item
                ref="per_permanent_post_code"
                prop="per_permanent_post_code"
              >
                <!-- <v-select
                  :clearable="true"
                  :filterable="false"
                  @search="onSearch"
                   :reduce="(option) => option.place_name"
                  class="style-chooser"
                  id="per_permanent_post_code"
                  placeholder="Post Code"
                   @input="
                    onValueChange($event, 'contact', 'per_permanent_post_code')
                  "
                  v-model="personalInformation.contact.per_permanent_post_code"
                  label="place_name"
                  :options="postCodes"
                  ><template #open-indicator> <a-icon type="down" /> </template
                ></v-select> -->
                <a-input
                  @blur="
                    onValueChange($event, 'contact', 'per_permanent_post_code')
                  "
                  id="per_permanent_post_code"
                  :maxLength="10"
                  placeholder="Post Code"
                  v-model="personalInformation.contact.per_permanent_post_code"
                />
              </a-form-model-item>
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
                  <span v-if="arr[16].first" @click="toggle(16)">
                    Need Help?
                  </span>
                  <span v-else @click="toggle(16)"> Hide Help? </span>
                </a>
              </p>
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoPostCode"
              >
                <div class="card card-body bubble">
                  Please provide a valid post code. We ask for this information
                  to verify your ID details.
                </div>
              </div>
            </div>
          </div>

          <!-- Permanent Residence -->
          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.contact.per_permanent_country"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />Country
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <div class="row">
                <div class="col-12 col-md-12">
                  <a-form-model-item
                    ref="per_permanent_country"
                    prop="per_permanent_country"
                  >
                    <v-select
                      :clearable="true"
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
                      >
                      <template #open-indicator>
                        <a-icon type="down" /> </template>
                    </v-select>
                  </a-form-model-item>
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
                  <span v-if="arr[15].first" @click="toggle(15)">
                    Need Help?
                  </span>
                  <span v-else @click="toggle(15)"> Hide Help? </span>
                </a>
              </p>
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="personalInfoParmanentCountryCity"
              >
                <div class="card card-body bubble">
                  Please provide a valid permanent address. This may be the same
                  as your current place of residence you provided earlier. We
                  ask for this information to verify your ID details.
                </div>
              </div>
            </div>
          </div>

          <!-- Mobile Number -->
          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.contact.mobile_number"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />Mobile number (private)
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
               <a-form-model-item
                ref="mobile_number"
                prop="mobile_number"
              >
              <vue-tel-input
                @onInput="onNumberChange($event)"
                :inputOptions="{showDialCode: true}"
                id="mobile_number"
                :validCharactersOnly="true"
                v-model="personalInformation.contact.mobile_number"
                placeholder="Mobile Number"
                class="style-chooser"
                style="background: #fff;"
              ></vue-tel-input>
              
              <span class="error-number" v-if="!isValidNumber"
                >Please write a valid mobile number</span
              >
               </a-form-model-item>
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
                  <span v-if="arr[13].first" @click="toggle(13)">
                    Need Help?
                  </span>
                  <span v-else @click="toggle(13)"> Hide Help? </span>
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
                />Email address (private)
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item ref="per_email" prop="per_email">
                <a-input
                  @blur="onValueChange($event, 'contact', 'per_email')"
                  id="per_email"
                  type="email"
                  :value="personalInformation.contact.per_email"
                  placeholder="Sample email"
                  :disabled="true"
                />
              </a-form-model-item>
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
                  <span v-if="arr[12].first" @click="toggle(12)">
                    Need Help?
                  </span>
                  <span v-else @click="toggle(12)"> Hide Help? </span>
                </a>
              </p>
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoEmailId"
              >
                <div class="card card-body bubble">
                  Your registered email address. This is what you provided at
                  the time of registration. This is a read only field.
                </div>
              </div>
            </div>
          </div>

          <a-button
            shape="round"
            type="primary"
            style="float: right; margin-bottom: 0.5rem; margin-right: -15px"
            class="mt-5"
            @click="handleSubmitFormThree"
          >
            Save & Continue
          </a-button>
        </a-form-model>
      </a-collapse-panel>

      <!-- 4. More About You -->
      <a-collapse-panel
        key="4"
        header="2.4 More About You"
        style="margin-top: 5px"
      >
        <a-form-model
          ref="personalInfoFormFour"
          v-if="
            personalInformation &&
            personalInformation.more_about &&
            activeKey == 4
          "
          :model="personalInformation.more_about"
          :rules="rules"
          class="form-ma"
        >
          <!-- Martial Status -->
          <div class="row mt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.more_about.per_marital_status"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What is your marital status?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item
                ref="per_marital_status"
                prop="per_marital_status"
              >
                <v-select
                  :clearable="true"
                  class="style-chooser"
                  @input="
                    onValueChange($event, 'more_about', 'per_marital_status')
                  "
                  id="per_marital_status"
                  placeholder="please select"
                  v-model="personalInformation.more_about.per_marital_status"
                  :reduce="(option) => option.value"
                  label="name"
                  :options="[
                    {
                      name: 'Single, never married',
                      value: 'single never married',
                    },
                    { name: 'Widow', value: 'widow' },
                    {
                      name: 'Widow with children',
                      value: 'widow with children',
                    },
                    { name: 'Widower', value: 'widower' },
                    {
                      name: 'Widower with children',
                      value: 'widower with children',
                    },
                    { name: 'Divorcee', value: 'divorced' },
                    {
                      name: 'Divorcee with children',
                      value: 'divorced_with_children',
                    },
                  ]"
                  >
                  <template #open-indicator> <a-icon type="down" /> </template>
                </v-select>
              </a-form-model-item>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapsePersonalInfoMaritalStatus"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <span v-if="arr[11].first" @click="toggle(11)">
                    Need Help?
                  </span>
                  <span v-else @click="toggle(11)"> Hide Help? </span>
                </a>
              </p>
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoMaritalStatus"
              >
                <div class="card card-body bubble">
                  Please select as appropriate
                </div>
              </div>
            </div>
          </div>

          <!-- Current Living Arrangement -->
          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="
                    personalInformation.more_about.per_currently_living_with
                  "
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What is your current living arrangement?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item
                ref="per_currently_living_with"
                prop="per_currently_living_with"
              >
                <v-select
                  :clearable="true"
                  class="style-chooser"
                  @input="
                    onValueChange(
                      $event,
                      'more_about',
                      'per_currently_living_with'
                    )
                  "
                  id="per_currently_living_with"
                  placeholder="Please select"
                  v-model="
                    personalInformation.more_about.per_currently_living_with
                  "
                  :reduce="(option) => option.value"
                  label="name"
                  :options="[
                    { name: 'Living with my parents', value: 'Parents' },
                    {
                      name: 'Living in a rented home',
                      value: 'Living in a rented home',
                    },

                    {
                      name: 'Living in my own home',
                      value: 'Live in my own home',
                    },
                    {
                      name: 'Living with relatives',
                      value: 'Living with relatives',
                    },

                    { name: 'Other', value: 'Other' },
                  ]"
                  >
                  <template #open-indicator> <a-icon type="down" /> </template>
                </v-select>
              </a-form-model-item>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapsePersonalInfoCuurentlyLivingWith"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <span v-if="arr[10].first" @click="toggle(10)">
                    Need Help?
                  </span>
                  <span v-else @click="toggle(10)"> Hide Help? </span>
                </a>
              </p>
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoCuurentlyLivingWith"
              >
                <div class="card card-body bubble">
                  We ask this question to provide additional information that
                  may help in their decision making. You can expand on your
                  response and future plans in the additional information text
                  field.
                </div>
              </div>
            </div>
          </div>

          <!-- Willing to relocate -->
          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.more_about.per_willing_to_relocate"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />Are you willing to relocate?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item
                ref="per_willing_to_relocate"
                prop="per_willing_to_relocate"
              >
                <v-select
                  :clearable="true"
                  class="style-chooser"
                  @input="
                    onValueChange(
                      $event,
                      'more_about',
                      'per_willing_to_relocate'
                    )
                  "
                  id="per_willing_to_relocate"
                  placeholder="please select"
                  v-model="
                    personalInformation.more_about.per_willing_to_relocate
                  "
                  :reduce="(option) => option.value"
                  label="name"
                  :options="[
                    { name: 'Yes', value: 1 },
                    {
                      name: 'No',
                      value: 2,
                    },
                    {
                      name: `Let's discuss`,
                      value: 3,
                    },
                  ]"
                  >
                    <template #open-indicator> <a-icon type="down" /> </template>
                </v-select>
              </a-form-model-item>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapsePersonalInfoWillingToRelocate"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <span v-if="arr[9].first" @click="toggle(9)">
                    Need Help?
                  </span>
                  <span v-else @click="toggle(9)"> Hide Help? </span>
                </a>
              </p>
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoWillingToRelocate"
              >
                <div class="card card-body bubble">
                  In a fast changing world, people tend to move for work and
                  other reasons. Sometimes relocating is not possible due to
                  rights and responsibilty considerations.
                </div>
              </div>
            </div>
          </div>

          <!-- Smoker? -->
          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.more_about.per_smoker"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />Are you a smoker?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item ref="per_smoker" prop="per_smoker">
                <v-select
                  :clearable="true"
                  class="style-chooser"
                  @input="onValueChange($event, 'more_about', 'per_smoker')"
                  id="per_smoker"
                  placeholder="Please select"
                  v-model="personalInformation.more_about.per_smoker"
                  :reduce="(option) => option.value"
                  label="name"
                  :options="[
                    {
                      name: 'No',
                      value: 2,
                    },
                    { name: 'Yes', value: 1 },

                    { name: `Former smoker`, value: 3 },
                  ]"
                  >
                    <template #open-indicator> <a-icon type="down" /> </template>
                  </v-select>
              </a-form-model-item>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapsePersonalInfoSmokerOrNot"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <span v-if="arr[8].first" @click="toggle(8)">
                    Need Help?
                  </span>
                  <span v-else @click="toggle(8)"> Hide Help? </span>
                </a>
              </p>
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoSmokerOrNot"
              >
                <div class="card card-body bubble">
                  Habits like smoking is not easy to give up. To non-smokers the
                  impact of smoking can be quite adverse.
                </div>
              </div>
            </div>
          </div>

          <!-- Language I speak -->
          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="
                    personalInformation.more_about.per_language_speak &&
                    personalInformation.more_about.per_language_speak.length > 0
                  "
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What language(s) do you speak?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item
                ref="per_language_speak"
                prop="per_language_speak"
              >
                <v-select
                  required
                  id="per_language_speak"
                  :clearable="true"
                  :multiple="true"
                  class="nationality-select"
                  @input="
                    onMultiValueChange(
                      $event,
                      'per_language_speak',
                      'more_about'
                    )
                  "
                  placeholder="you may select up to three"
                  v-model="personalInformation.more_about.per_language_speak"
                  label="name"
                  :options="[...candidateDetails.languages]"
                >
                  <template #open-indicator> <a-icon type="down" /> </template>
                </v-select>
              </a-form-model-item>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapsePersonalInfoSpeakingLanguages"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <span v-if="arr[7].first" @click="toggle(7)">
                    Need Help?
                  </span>
                  <span v-else @click="toggle(7)"> Hide Help? </span>
                </a>
              </p>
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoSpeakingLanguages"
              >
                <div class="card card-body bubble">
                  List up to three languages that you have converstional fluency
                  in.
                </div>
              </div>
            </div>
          </div>

          <!-- Hobbies -->
          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="
                    personalInformation.more_about.per_hobbies_interests &&
                    personalInformation.more_about.per_hobbies_interests
                      .length > 0
                  "
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What are your hobbies and leisure interests?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item
                ref="per_hobbies_interests"
                prop="per_hobbies_interests"
              >
                <v-select
                  id="per_hobbies_interests"
                  :clearable="true"
                  :multiple="true"
                  class="nationality-select"
                  @input="
                    onMultiValueChange(
                      $event,
                      'per_hobbies_interests',
                      'more_about'
                    )
                  "
                  placeholder="you may select up to three"
                  v-model="personalInformation.more_about.per_hobbies_interests"
                  label="name"
                  :options="candidateDetails.hobbies"
                  ><template #open-indicator>
                    <a-icon type="down" />
                  </template>
                </v-select>
              </a-form-model-item>
            </div>
            <div class="col-12 col-md-6 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapsePersonalInfoHobbies"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <span v-if="arr[6].first" @click="toggle(6)">
                    Need Help?
                  </span>
                  <span v-else @click="toggle(6)"> Hide Help? </span>
                </a>
              </p>
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoHobbies"
              >
                <div class="card card-body bubble">
                  List up to three hobbies and interests that you engage in
                  regularly (e.g. walking, cycling, gardening, games etc.)
                </div>
              </div>
            </div>
          </div>

          <!-- Things I enjoy -->
          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="
                    personalInformation.more_about.per_things_enjoy &&
                    personalInformation.more_about.per_things_enjoy.length > 0
                  "
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What types of other things do you enjoy?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item ref="per_things_enjoy" prop="per_things_enjoy">
                <v-select
                  id="per_things_enjoy"
                  :clearable="true"
                  :multiple="true"
                  class="nationality-select"
                  @input="
                    onMultiValueChange($event, 'per_things_enjoy', 'more_about')
                  "
                  placeholder="you may select up to three"
                  v-model="personalInformation.more_about.per_things_enjoy"
                  label="name"
                  :options="candidateDetails.hobbies"
                  ><template #open-indicator>
                    <a-icon type="down" />
                  </template>
                </v-select>
              </a-form-model-item>
            </div>
            <div class="col-12 col-md-6 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapsePersonalInfoEnjoyfullThings"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <span v-if="arr[5].first" @click="toggle(5)">
                    Need Help?
                  </span>
                  <span v-else @click="toggle(5)"> Hide Help? </span>
                </a>
              </p>
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoEnjoyfullThings"
              >
                <div class="card card-body bubble">
                  List up to three things you really enjoy for pleasure (e.g.
                  book reading, charity work, jogging, befriending etc.)
                </div>
              </div>
            </div>
          </div>

          <!-- Food and cuisine -->
          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="
                    personalInformation.more_about.per_food_cuisine_like &&
                    personalInformation.more_about.per_food_cuisine_like
                      .length > 0
                  "
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What are your favorite food and cuisine?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item
                ref="per_food_cuisine_like"
                prop="per_food_cuisine_like"
              >
                <v-select
                  id="per_food_cuisine_like"
                  :clearable="true"
                  :multiple="true"
                  class="nationality-select"
                  @input="
                    onMultiValueChange(
                      $event,
                      'per_food_cuisine_like',
                      'more_about'
                    )
                  "
                  placeholder="you may select up to three"
                  v-model="personalInformation.more_about.per_food_cuisine_like"
                  label="name"
                  :options="candidateDetails.foods"
                  ><template #open-indicator>
                    <a-icon type="down" />
                  </template>
                </v-select>
              </a-form-model-item>
            </div>
            <div class="col-12 col-md-6 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapsePersonalInfoFavoriteFood"
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
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoFavoriteFood"
              >
                <div class="card card-body bubble">
                  Apart from tasting exquisite food, different cusines allow one
                  to learn and appreciate other people and their cultures.
                </div>
              </div>
            </div>
          </div>

          <!-- Thankful for-->
          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="
                    personalInformation.more_about.per_thankfull_for &&
                    personalInformation.more_about.per_thankfull_for.length > 0
                  "
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What kind of things are you thankful for in life?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item
                ref="per_thankfull_for"
                prop="per_thankfull_for"
              >
                <v-select
                  id="per_things_enjoy"
                  :clearable="true"
                  :multiple="true"
                  @change="
                    $v.personalInformation.more_about.per_thankfull_for.$touch()
                  "
                  class="nationality-select"
                  @input="
                    onMultiValueChange(
                      $event,
                      'per_thankfull_for',
                      'more_about'
                    )
                  "
                  placeholder="you may select up to three"
                  :reduce="(option) => option.value"
                  v-model="personalInformation.more_about.per_thankfull_for"
                  label="label"
                  :options="candidateDetails.thankfulThings"
                  ><template #open-indicator>
                    <a-icon type="down" />
                  </template>
                  <template v-slot:option="option">
                    <div class="json-format">
                      <span>{{ option.value }}</span>
                      <span class="span2">{{ option.description }}</span>
                    </div>
                  </template>
                </v-select>
              </a-form-model-item>
            </div>
            <div class="col-12 col-md-6 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapsePersonalInfoThankulFor"
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
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoThankulFor"
              >
                <div class="card card-body bubble">
                  What we are thankful for can sometime reveal an interesting
                  aspect of our personality.
                </div>
              </div>
            </div>
          </div>
          <!-- Improve Myself -->
          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="
                    personalInformation.more_about.per_improve_myself &&
                    personalInformation.more_about.per_improve_myself.length > 0
                  "
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />How I improve myself?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item
                ref="per_improve_myself"
                prop="per_improve_myself"
              >
                <v-select
                  id="per_improve_myself"
                  :clearable="true"
                  :multiple="true"
                  class="nationality-select"
                  @input="
                    onMultiValueChange(
                      $event,
                      'per_improve_myself',
                      'more_about'
                    )
                  "
                  placeholder="you may select up to three"
                  :reduce="(option) => option.value"
                  v-model="personalInformation.more_about.per_improve_myself"
                  label="label"
                  :options="candidateDetails.improveMyselfThings"
                  ><template #open-indicator>
                    <a-icon type="down" />
                  </template>
                  <template v-slot:option="option">
                    <div class="json-format">
                      <span>{{ option.label }}</span>
                      <span class="span2">{{ option.description }}</span>
                    </div>
                  </template>
                </v-select>
              </a-form-model-item>
            </div>
            <div class="col-12 col-md-6 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapsePersonalInfoImproveMyself"
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
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoImproveMyself"
              >
                <div class="card card-body bubble">
                  As human being we will always have some shortcomings even
                  after acheving great things. This helps us to recognise our
                  room for improvement and accept evidenced-based feedback.
                </div>
              </div>
            </div>
          </div>
          <!-- About Me -->
          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.more_about.per_about"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />A little bit about me
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item ref="per_about" prop="per_about">
                <a-textarea
                  @blur="onValueChange($event, 'more_about', 'per_about')"
                  id="per_about"
                  placeholder="maximum 2000 characters"
                  :rows="3"
                  :maxLength="2000"
                  v-model="personalInformation.more_about.per_about"
                />
              </a-form-model-item>
              <span style="display: flex; justify-content: flex-end"
                >{{
                  personalInformation.more_about.per_about
                    ? personalInformation.more_about.per_about.length
                    : 0
                }}/2000</span
              >
            </div>
            <div class="col-12 col-md-6 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapsePersonalInfoMoreAboutMe"
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
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoMoreAboutMe"
              >
                <div class="card card-body bubble">
                  The things you may wish to consider could include: your
                  outstanding qualities that people often notice, your family
                  background and values, your future aspirations, ambition for
                  growth and self development, and other consideration like
                  flexibilty, grit, empathy and willingness forget and forgive
                  when facing challenging situations together.
                </div>
              </div>
            </div>
          </div>
          <!-- Additional Info -->
          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.more_about.per_additional_info_text"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />Additional Information (optional)
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item
                ref="per_additional_info_text"
                prop="per_additional_info_text"
              >
                <a-textarea
                  @blur="
                    onValueChange(
                      $event,
                      'more_about',
                      'per_additional_info_text'
                    )
                  "
                  id="per_additional_info_text"
                  placeholder="Additional Information maximum 2000 characters"
                  :maxLength="2000"
                  :rows="3"
                  v-model="
                    personalInformation.more_about.per_additional_info_text
                  "
                />
              </a-form-model-item>
              <span style="display: flex; justify-content: flex-end"
                >{{
                  personalInformation.more_about.per_additional_info_text
                    ? personalInformation.more_about.per_additional_info_text
                        .length
                    : 0
                }}/2000</span
              >
              <div v-if="false" class="image-container text-center">
                <label for="input-resume" class="upload-label">
                  upload
                  <input
                    type="file"
                    class="input-image"
                    id="input-resume"
                    name="avatar"
                    @change="getResume"
                  />
                </label>
                <div class="img-preview mb-2">
                  <div class="mt-3 color-primary">
                    {{
                      personalInformation.more_about
                        .per_additional_info_doc_title
                    }}
                  </div>
                  <span
                    @click="clearImg()"
                    class="close-icon"
                    v-if="
                      personalInformation.more_about
                        .per_additional_info_doc_title
                    "
                    ><img src="@/assets/icon/close.svg" alt="img"
                  /></span>
                </div>
                <span class="mb-2"
                  >The format supported are pdf, docx. Maximum file size 5
                  mb</span
                >
              </div>
            </div>
            <div class="col-12 col-md-6 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapsePersonalInfoMoreAdditionaInfo"
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
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoMoreAdditionaInfo"
              >
                <div class="card card-body bubble">
                  Here you can say anything else about your requirements. Also
                  you have the opportunity to attach a document (max. 2 pages).
                  You may already have prepared a marrige cv outlining specific
                  requirements.
                </div>
              </div>
            </div>
          </div>
          <a-button
            shape="round"
            type="primary"
            style="float: right; margin-bottom: 0.5rem; margin-right: -15px"
            class="mt-5"
            @click="handleSubmitFormFour"
          >
            Save & Continue
          </a-button>
        </a-form-model>
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
  name: "PersonalInfoTwo",
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
      bindProps: {
        maxLen: 14,
      },

      isValidNumber: true,
      postCodes: [],
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
    async onSearch(search, loading) {
      if (search.length) {
        loading(true);
        await this.$store
          .dispatch("getSearchLocation", {
            search: search,
          })
          .then((data) => {
            this.postCodes = [...data.features];
            loading(false);
          })
          .catch((error) => {});
      }
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
    onValueChange(e, action, name) {
      this.checkValidation(name, action);
      this.save(action);
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
          this.activeKey = ["3"];
        } else {
          setTimeout(() => {
            const el = document.querySelector(".has-error:first-of-type");
            el.scrollIntoView();
          }, 100);
          return false;
        }
      });
    },
    handleSubmitFormThree() {
      this.$refs.personalInfoFormThree.validate((valid) => {
        if (valid) {
          window.scrollTo(0, 0);
          this.activeKey = ["4"];
        } else {
          setTimeout(() => {
            const el = document.querySelector(".has-error:first-of-type");
            el.scrollIntoView();
          }, 100);
          return false;
        }
      });
    },
    handleSubmitFormFour() {
      this.$refs.personalInfoFormFour.validate((valid) => {
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
      } else {
        this.personalInformation.essential.dob = null;
        this.saveEssentialInfo();
      }
    },
    checkValidation(name, action) {
      switch (action) {
        case "essential":
          this.$refs.personalInfoFormOne.fields.forEach((f) => {
            if (f.prop == name) {
              f.onFieldBlur();
            }
          });
          break;
        case "general":
          this.$refs.personalInfoFormTwo.fields.forEach((f) => {
            if (f.prop == name) {
              f.onFieldBlur();
            }
          });
          break;
        case "contact":
          this.$refs.personalInfoFormThree.fields.forEach((f) => {
            if (f.prop == name) {
              f.onFieldBlur();
            }
          });
          break;
        case "more_about":
          this.$refs.personalInfoFormFour.fields.forEach((f) => {
            if (f.prop == name) {
              f.onFieldBlur();
            }
          });
          break;
      }
    },

    onMultiValueChange(e, name, action) {
      this.checkValidation(name, action);
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

    onNumberChange(e) {
      this.isValidNumber = e.isValid;
      if (e.isValid) {
        // this.personalInformation.contact.mobile_number = `${e.country.dialCode} ${this.personalInformation.contact.mobile_number}`;
        this.save("contact");
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
            current: 1,
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
            current: 1,
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
            current: 1,
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
                ", "
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
                ", "
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
      // if (action === "residence") {
      //   this.loading = true;
      // } else {
      //   this.loadingPermanant = true;
      // }
      // const res = await ApiService.get(`v1/utilities/cities/${e}`);
      // this.loading = false;
      // this.loadingPermanant = false;
      // if (res.status === 200) {
      //   switch (action) {
      //     case "permanant":
      //       this.personalInformation.contact.permanantCities = [];
      //       this.personalInformation.contact.permanantCities.push(
      //         ...res.data.data
      //       );
      //       break;
      //     case "residence":
      //       this.personalInformation.contact.residenceCities = [];
      //       this.personalInformation.contact.residenceCities.push(
      //         ...res.data.data
      //       );
      //       break;
      //   }
      // }

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

.disabled {
    pointer-events: none;
    opacity: 0.4;
    cursor: not-allowed !important;
}
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

  .style-chooser {
    .vti__dropdown {
      background-color: transparent !important;
    }
    .vti__input {
      font-size: 1rem;
      border-radius: 0px 30px 30px 0px !important;
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
.ant-input-disabled {
  color: #999999 !important;
}
input[type="file"] {
  cursor: pointer;
  width: 100%;
  height: 34px;
  overflow: hidden;
  border-radius: 20px !important;
  display: none;
}
.error-number {
  color: red;
  margin: 5px;
}
.upload-label {
  width: 100%;
  height: 32px;
  font-size: 16px;
  line-height: 32px;
  display: inline-block;
  color: white;
  background: #8781bd;
  border: 1px solid #98a0e2;
  border-radius: 20px !important;
  padding: 0 10px;
  text-align: center;
  font-family: Helvetica, Arial, sans-serif;
  cursor: pointer;
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

//input[type="file"]::-webkit-file-upload-button {
//  visibility: hidden;
//}
.mobile-margin {
  margin-top: 0.5rem;
  .ant-form-explain {
    margin-left: 0.3rem;
  }
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
.vue-tel-input {
  border-radius: 20px;
  height: 35px;
}

.json-format {
  .span2 {
    @media (max-width: 767px) {
      display: none !important;
    }
  }
}
</style>
