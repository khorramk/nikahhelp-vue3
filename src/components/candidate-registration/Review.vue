<template>
  <div class="review-publish px-2">
    <fieldset v-if="candidateDetails && candidateData.personal" class="review">
      <h4 class="fw-700 px-2">Review and Publish Profile</h4>
      <p class="mb-5 px-2">
        Please check the information and details that you have provided, if you
        are happy with it please submit for approval by MatrimonyAssist Team. If
        anything needs to be changed, then you can access relevant sections by
        pressing previous button.
      </p>
      <div class="text-start">
        <!-- Preference -->
        <div class="review-edit">
          <div class="review-edit-label">
            My partner preference
            <img
              class="ms-2 edit-step"
              src="@/assets/icon/edit_step.svg"
              alt="icon"
              @click="$emit('toggleStep', 0)"
            />
          </div>
          <div class="row">
            <div class="col-md-12" style="padding-right: 8px !important;">
              <div class="card-custom h-100 shadow-border card-personal">
                <ul class="personal-ul">
                  <!-- Age -->
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                    >Age</span
                    ><span class="flex-70 px-2 d-inherit"
                      > <span class="d-none d-sm-table-cell">:</span> 
                      <span class="left-margin text--secondary text-subtitle-1">
                        {{ candidateData.preference.pre_partner_age_min }}y 
                        to
                        {{ candidateData.preference.pre_partner_age_max }}y
                        </span
                      ></span
                    >
                  </li>
                  <!-- Height -->

                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Height</span
                    ><span class="flex-70 px-2 d-inherit"
                      ><span class="d-none d-sm-table-cell">:</span> <span class="left-margin text--secondary text-subtitle-1">
                        {{ getHeight(candidateData.preference.pre_height_min) }}
                        to
                        {{ getHeight(candidateData.preference.pre_height_max) }}
                      </span></span
                    >
                  </li>

                  <!-- Preferred countries and cities -->
                  <li class="flex-between-start">
                    <a-tooltip title="Country and city preferred">
                      <span class="flex-30 px-2 text--disabled text-subtitle-1">
                        Preferred Country
                      </span>
                    </a-tooltip>
                    <span class="flex-70 px-2 d-inherit">
                      <span class="d-none d-sm-table-cell">:</span> 
                      <span
                        v-if="
                          candidateData.preference.preferred_countries
                            .length === 0
                        "
                        class="left-margin text--secondary text-subtitle-1"
                      >
                        None
                      </span>
                      <span
                        v-if="
                          candidateData.preference.preferred_countries.length >
                          0
                        "
                        class="left-margin text--secondary text-subtitle-1"
                      >
                        <span
                          v-for="country in candidateData.preference
                            .preferred_countries"
                          :key="country.id"
                        >
                          {{ country.name + ' ' }}
                        </span>
                      </span>
                    </span>
                  </li>

                  <!-- Bloked countries and cities -->
                  <li class="flex-between-start">
                    <a-tooltip title="Country and city Blocked">
                      <span class="flex-30 px-2 text--disabled text-subtitle-1">
                        Not Preferred Country
                      </span>
                    </a-tooltip>
                    <span class="flex-70 px-2 d-inherit">
                      <span class="d-none d-sm-table-cell">:</span> 
                      <span
                        v-if="
                          candidateData.preference.bloked_countries.length === 0
                        "
                        class="left-margin text--secondary text-subtitle-1"
                      >
                        None
                      </span>
                      <span
                        v-if="
                          candidateData.preference.bloked_countries.length > 0
                        "
                        class="left-margin text--secondary text-subtitle-1"
                      >
                        <div
                          v-for="country in candidateData.preference
                            .bloked_countries"
                          :key="country.id"
                        >
                          {{ country.name }}
                        </div>
                      </span>
                    </span>
                  </li>

                  <!-- Religion -->
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Religion</span
                    ><span class="flex-70 px-2 d-inherit"
                      ><span class="d-none d-sm-table-cell">:</span> <span class="left-margin text--secondary text-subtitle-1"
                        > {{ candidateData.preference.pre_partner_religion_id[0] }} </span
                      ></span
                    >
                  </li>

                  <!-- Ethnicities -->
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Ethnicities</span
                    ><span class="flex-70 px-2 d-inherit"
                      ><span class="d-none d-sm-table-cell">:</span> <span class="left-margin text--secondary text-subtitle-1">{{
                        candidateData.preference.pre_ethnicities
                      }}</span></span
                    >
                  </li>

                  <!-- Nationality -->
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Nationality</span
                    ><span class="flex-70 px-2 d-inherit"
                      ><span class="d-none d-sm-table-cell">:</span> <span class="left-margin text--secondary text-subtitle-1">
                        <div v-if="candidateData.preference.preferred_nationality.length > 0">
                          <span
                            v-for="(nationality, index) in candidateData.preference
                              .preferred_nationality"
                            :key="nationality.id"
                          >
                            {{ index == candidateData.preference.preferred_nationality.length -1  ? nationality.name : nationality.name + ',&nbsp;' }}
                          </span>
                        </div>
                        <div v-else>
                          Don't Mind
                        </div>
                      </span></span
                    >
                  </li>

                  <!-- Education -->
                  <li
                    class="flex-between-start"
                  >
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Education</span
                    ><span class="flex-70 px-2 d-inherit"
                      ><span class="d-none d-sm-table-cell">:</span> <span class="left-margin text--secondary text-subtitle-1">{{
                        candidateData.preference.pre_study_level
                      }}</span></span
                    >
                  </li>

                  <!-- Employment Status -->
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Employment Status</span
                    ><span class="flex-70 px-2 d-inherit"
                      ><span class="d-none d-sm-table-cell">:</span> <span class="left-margin text--secondary text-subtitle-1">{{
                        candidateData.preference.pre_employment_status
                      }}</span></span
                    >
                  </li>

                  <!-- Occupation -->
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Ocupation</span
                    ><span class="flex-70 px-2 d-inherit"
                      ><span class="d-none d-sm-table-cell">:</span> <span class="left-margin text--secondary text-subtitle-1">
                        <span
                          v-for="(occupation, index) in candidateData.preference
                            .pre_occupation"
                          :key="occupation.id"
                        >
                          {{ index == candidateData.preference.pre_occupation.length - 1 ?  occupation : occupation + ',&nbsp;' }}
                        </span></span
                      ></span
                    >
                  </li>

                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Accept a divorcee</span
                    ><span class="flex-70 px-2 d-inherit"
                      ><span class="d-none d-sm-table-cell">:</span> <span class="left-margin text--secondary text-subtitle-1">{{
                        candidateData.preference.pre_preferred_divorcee == 1
                          ? "Yes"
                          : "No"
                      }}</span></span
                    >
                  </li>
                  <li
                    v-if="candidateData.preference.pre_preferred_divorcee == 1"
                    class="flex-between-start"
                  >
                    <span class="flex-40 px-2 text--disabled text-subtitle-1"
                      >Accept a divorcee with children?</span
                    ><span class="flex-60 px-2 d-inherit"
                      ><span class="d-none d-sm-table-cell">:</span> <span class="left-margin text--secondary text-subtitle-1">{{
                        candidateData.preference.pre_preferred_divorcee_child ==
                        1
                          ? "Yes"
                          : "NO"
                      }}</span></span
                    >
                  </li>
                </ul>
              </div>
            </div>
            <!-- Other Requirments -->
            <div class="col-md-12">
              <div class="card-custom h-100 shadow-border text--disabled">
                <h4 class="text--disabled text-subtitle-1">
                  What I'm looking for
                </h4>
                <p class="text--secondary text-subtitle-1 text-break">
                  {{ candidateData.preference.pre_description }}
                </p>
                <!-- <a-textarea
                  style="overflow: hidden; height: 150px"
                  id="per_about"
                  :rows="5"
                  :maxLength="200"
                  v-model="candidateData.preference.pre_description"
                /> -->
              </div>
            </div>
            <div class="col-md-12">
              <div class="card-custom text-start shadow-border">
                <h4 class="text--disabled text-subtitle-1">
                  Other requirements
                </h4>
                <p class="text--secondary text-subtitle-1 text-break">
                  {{ candidateData.preference.pre_other_preference }}
                </p>
              </div>
            </div>
            <!-- Rating unit -->
            <div class="col-md-12">
              <div class="card-custom h-100 shadow-border">
                <h5 class="text--disabled">More about preferred partner</h5>
                <p class="text--disabled">How Important following characters are to me</p>
                <hr />
                <!-- Character -->
                <!-- <rating-component
                  title="Strength of character from a moral point of view"
                  :valueString="
                    candidateData.preference.pre_strength_of_character_rate
                  "
                  
                ></rating-component> -->
                <!-- Looks and Apperance -->
                <rating-component
                  title="Looks, appearance & attractiveness"
                  :value="candidateData.preference.pre_look_and_appearance_rate"
                ></rating-component>
                <!-- Religiosity/Faith -->
                <rating-component
                  title="Religiosity/ Faith"
                  :value="
                    candidateData.preference.pre_religiosity_or_faith_rate
                  "
                  :valueString="
                    candidateData.preference
                      .pre_religiosity_or_faith_rate_string
                  "
                ></rating-component>
                <!-- Manners, Social skills and ethics -->
                <rating-component
                  title="Manners, social skills and ethics"
                  :value="
                    candidateData.preference.pre_manners_socialskill_ethics_rate
                  "
                  :valueString="
                    candidateData.preference
                      .pre_manners_socialskill_ethics_rate_string
                  "
                ></rating-component>
                <!-- Emotional Maturity and compatibility -->
                <rating-component
                  title="Emotional Maturity and general intelligence"
                  :value="candidateData.preference.pre_emotional_maturity_rate"
                  :valueString="
                    candidateData.preference.pre_emotional_maturity_rate_string
                  "
                ></rating-component>
                <!-- Good Listener -->
                <rating-component
                  title="Good listener"
                  :value="candidateData.preference.pre_good_listener_rate"
                  :valueString="
                    candidateData.preference.pre_good_listener_rate_string
                  "
                ></rating-component>
                <!-- Good talker -->
                <rating-component
                  title="Good communicator"
                  :value="candidateData.preference.pre_good_talker_rate"
                  :valueString="
                    candidateData.preference.pre_good_talker_rate_string
                  "
                ></rating-component>
                <!-- Willing to learn -->
                <rating-component
                  title="Willing to learn"
                  :value="candidateData.preference.pre_wiling_to_learn_rate"
                  :valueString="
                    candidateData.preference.pre_wiling_to_learn_rate_string
                  "
                ></rating-component>
                <!-- Family or Social Status-->
                <rating-component
                  title="Family or Social Status"
                  :value="
                    candidateData.preference.pre_family_social_status_rate
                  "
                  :valueString="
                    candidateData.preference
                      .pre_family_social_status_rate_string
                  "
                ></rating-component>
                <!-- Employment or Wealth-->
                <rating-component
                  title="Employment and financial stability"
                  :value="candidateData.preference.pre_employment_wealth_rate"
                  :valueString="
                    candidateData.preference.pre_employment_wealth_rate_string
                  "
                ></rating-component>
                <!-- Education -->
                <rating-component
                  title="Education and academic accomplishments"
                  :value="candidateData.preference.pre_education_rate"
                  :valueString="
                    candidateData.preference.pre_education_rate_string
                  "
                ></rating-component>
              </div>
            </div>
          </div>
        </div>
        <!-- Rating section  -->

        <!-- Personal Information -->
        <div class="review-edit mt-5">
          <div class="review-edit-label">
            Personal Information
            <img
              class="ms-2 edit-step"
              src="@/assets/icon/edit_step.svg"
              alt="icon"
              @click="$emit('toggleStep', 1)"
            />
          </div>
          <div class="row h-100">
            <div class="col-md-12" style="padding-right: 8px !important;">
              <div class="card-custom shadow-border card-personal h-100">
                <ul class="personal-ul">
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Name</span
                    ><span class="flex-70 px-2 d-inherit"
                      ><span class="d-none d-sm-table-cell">:</span><span class="left-margin text--secondary text-subtitle-1">
                        {{ candidateData.first_name }}
                        {{ candidateData.last_name }}
                      </span>
                    </span>
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Screen Name</span
                    ><span class="flex-70 px-2 d-inherit"
                      ><span class="d-none d-sm-table-cell">:</span><span class="left-margin text--secondary text-subtitle-1">{{
                        candidateData.screen_name
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Gender</span
                    ><span class="flex-70 px-2 d-inherit"
                      ><span class="d-none d-sm-table-cell">:</span> <span
                        class="left-margin text--secondary text-subtitle-1"
                        v-if="candidateData.personal.per_gender == 1"
                      >
                        Male
                      </span>
                      <span
                        class="left-margin text--secondary text-subtitle-1"
                        v-if="candidateData.personal.per_gender == 2"
                      >
                        Female
                      </span>
                    </span>
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Date of Birth (private)</span
                    ><span class="flex-70 px-2 d-inherit"
                      ><span class="d-none d-sm-table-cell">:</span> <span class="left-margin text--secondary text-subtitle-1">
                        {{ candidateData.personal.dob }}
                      </span>
                    </span>
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Height</span
                    ><span class="flex-70 px-2 d-inherit"
                      ><span class="d-none d-sm-table-cell">:</span> <span class="left-margin text--secondary text-subtitle-1">
                        <span
                          v-html="
                            `${
                              heightTV.find(
                                (x) =>
                                  x.value === candidateData.personal.per_height
                              )
                                ? heightTV.find(
                                    (x) =>
                                      x.value ===
                                      candidateData.personal.per_height
                                  ).label
                                : ''
                            }`
                          "
                        >
                        </span>
                      </span>
                    </span>
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Religion</span
                    ><span class="flex-70 px-2 d-inherit"
                      ><span class="d-none d-sm-table-cell">:</span> <span class="left-margin text--secondary text-subtitle-1">
                        <!-- {{
                          $store.state.candidateInfo.religion_options[
                            candidateData.personal.per_religion_id
                          ].name
                        }} -->
                        {{
                          candidateDetails.religions.find(
                            (x) =>
                              x.id === candidateData.personal.per_religion_id
                          )
                            ? candidateDetails.religions.find(
                                (x) =>
                                  x.id ===
                                  candidateData.personal.per_religion_id
                              ).name
                            : ""
                        }}
                      </span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Education</span
                    ><span class="flex-70 px-2 d-inherit"
                      ><span class="d-none d-sm-table-cell">:</span> <span class="left-margin text--secondary text-subtitle-1">
                        {{ candidateData.personal.per_education_level }}</span
                      ></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Employment Status</span
                    ><span class="flex-70 px-2 d-inherit"
                      ><span class="d-none d-sm-table-cell">:</span> <span class="left-margin text--secondary text-subtitle-1">
                        {{ candidateData.personal.per_employment_status }}</span
                      ></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Occupation</span
                    ><span class="flex-70 px-2 d-inherit"
                      ><span class="d-none d-sm-table-cell">:</span> <span class="left-margin text--secondary text-subtitle-1">
                        {{ candidateData.essential.per_occupation }}</span
                      ></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Ethnicity</span
                    ><span class="flex-70 px-2 d-inherit"
                      ><span class="d-none d-sm-table-cell">:</span> <span class="left-margin text--secondary text-subtitle-1">{{
                        candidateData.personal.per_ethnicity
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Mother Tongue</span
                    ><span class="flex-70 px-2 d-inherit"
                      ><span class="d-none d-sm-table-cell">:</span> <span class="left-margin text--secondary text-subtitle-1">{{
                        candidateData.personal.per_mother_tongue
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Nationality</span
                    ><span class="flex-70 px-2 d-inherit"
                      ><span class="d-none d-sm-table-cell">:</span> <span class="left-margin text--secondary text-subtitle-1">{{
                        candidateDetails.countries.find(
                          (c) => c.id === candidateData.personal.per_nationality
                        )
                          ? candidateDetails.countries.find(
                              (c) =>
                                c.id === candidateData.personal.per_nationality
                            ).name
                          : ""
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Country of Birth</span
                    ><span class="flex-70 px-2 d-inherit"
                      ><span class="d-none d-sm-table-cell">:</span> <span class="left-margin text--secondary text-subtitle-1">{{
                        candidateData.personal.per_country_of_birth
                      }}</span></span
                    >
                  </li>
                  <!-- <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Current Residance</span
                    ><span class="flex-70 px-2 d-inherit"
                      >:<span class="left-margin text--secondary text-subtitle-1">{{
                        candidateData.personal.per_current_residence
                      }}</span></span
                    >
                  </li> -->
                  <li class="flex-between-start" v-if="candidateData.general.per_health_condition">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Health Condition</span
                    ><span class="flex-70 px-2 d-inherit"
                      ><span class="d-none d-sm-table-cell">:</span> <span class="left-margin text--secondary text-break text-subtitle-1">{{
                        candidateData.general.per_health_condition
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Address Line 1 (private)</span
                    ><span class="flex-70 px-2 d-inherit"
                      ><span class="d-none d-sm-table-cell">:</span> <span class="left-margin text--secondary text-break text-subtitle-1">{{
                        candidateData.contact.address_1
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Address Line 2 (private)</span
                    ><span class="flex-70 px-2 d-inherit"
                      ><span class="d-none d-sm-table-cell">:</span> <span class="left-margin text--secondary text-break text-subtitle-1">{{
                        candidateData.contact.address_2
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >City</span
                    ><span class="flex-70 px-2 d-inherit"
                      ><span class="d-none d-sm-table-cell">:</span> <span class="left-margin text--secondary text-break text-subtitle-1">{{
                        candidateData.contact.per_permanent_city
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Post Code (private)</span
                    ><span class="flex-70 px-2 d-inherit"
                      ><span class="d-none d-sm-table-cell">:</span> <span class="left-margin text--secondary text-subtitle-1">{{
                        candidateData.contact.per_permanent_post_code
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Country</span
                    ><span class="flex-70 px-2 d-inherit"
                      ><span class="d-none d-sm-table-cell">:</span> <span class="left-margin text--secondary text-subtitle-1">{{
                        candidateData.contact.per_permanent_country_name
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Mobile No (private)</span
                    ><span class="flex-70 px-2 d-inherit"
                      ><span class="d-none d-sm-table-cell">:</span> <span class="left-margin text--secondary text-subtitle-1">
                        {{ candidateData.contact.mobile_number }}</span
                      ></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Email (private)</span
                    ><span class="flex-70 px-2 d-inherit"
                      ><span class="d-none d-sm-table-cell">:</span> <span class="left-margin text--secondary text-break text-subtitle-1">{{
                        candidateData.contact.per_email
                      }}</span></span
                    >
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-md-12">
              <div class="card-custom shadow-border h-100">
                <span class="text--disabled pb-2" style="font-size: 1.1rem;">More about me</span>
                <FieldsetCard
                  title="Marital Status"
                  :info="candidateData.personal.per_marital_status"
                />
                <FieldsetCard
                  class="mt-3"
                  title="Currently living with"
                  :info="candidateData.personal.per_currently_living_with"
                />
                <FieldsetCard
                  class="mt-3"
                  title="Willing to relocate"
                  :info="
                    candidateData.personal.per_willing_to_relocate == 1
                      ? 'Yes'
                      : candidateData.personal.per_willing_to_relocate == 2
                      ? 'No'
                      : 'Lets Discuss'
                  "
                />
                <FieldsetCard
                  class="mt-3"
                  title="Smoker"
                  :info="
                    candidateData.more_about.per_smoker == 1 ? 'Yes' : candidateData.more_about.per_smoker == 2 ? 'No' : 'Former Smoker'
                  "
                />
                <FieldsetCard
                  class="mt-3"
                  title="Language"
                  :info="candidateData.personal.per_language_speak"
                />

                <FieldsetCard
                  class="mt-3"
                  title="My Hobbies & Interests"
                  :info="candidateData.personal.per_hobbies_interests"
                  />
                <FieldsetCard
                  class="mt-3"
                  title="Things I Enjoy"
                  :info="candidateData.personal.per_things_enjoy"
                />
                <FieldsetCard
                  class="mt-3"
                  title="Food & Cuisine I like"
                  :info="candidateData.personal.per_food_cuisine_like"
                />

                <FieldsetCard
                  class="mt-3"
                  title="I am Thankfull for"
                  :info="candidateData.personal.per_thankfull_for"
                />
                <FieldsetCard
                  class="mt-3"
                  title="How I Improve Myself"
                  :info="getPerImproveMyself(candidateData.more_about.per_improve_myself)"
                />
              </div>
            </div>
            <!-- <div class="col-md-12 mb-3">
							<div class="card-custom shadow-border">
								<h4>A little bit about me</h4>
								<p class="mb-0">
									{{ candidateData.personal.per_about }}
								</p>
							</div>
						</div> -->

            <div class="col-md-12">
              <div class="card-custom shadow-border">
                <h4 class="text--disabled text-subtitle-1">
                  A little bit about me
                </h4>
                <p class="mb-0 text--secondary text-subtitle-1 text-break">
                  {{ candidateData.personal.per_about }}
                </p>
              </div>
            </div>

            <div class="col-md-12">
              <div class="card-custom shadow-border">
                <h4 class="text--disabled text-subtitle-1">
                  Additional Information
                </h4>
                <p class="mb-0 text--secondary text-subtitle-1 text-break">
                  {{ candidateData.more_about.per_additional_info_text }}
                </p>
                <div class="mt-3 color-primary">
                  {{ candidateData.more_about.per_additional_info_doc_title }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Family Information -->
        <div class="review-edit mt-5">
          <div class="review-edit-label">
            Family Information
            <img
              class="ms-2 edit-step"
              src="@/assets/icon/edit_step.svg"
              alt="icon"
              @click="$emit('toggleStep', 2)"
            />
          </div>
          <div class="row">
            <div class="col-md-12" style="padding-right: 8px !important;">
              <div class="card-custom h-100 shadow-border">
                <table>
                  <TableRow
                    title="Father's Profession"
                    textClass="text-subtitle-1"
                    :value="candidateData.family.father_profession"
                  />
                  <TableRow
                    title="Mother's Profession"
                    textClass="text-subtitle-1"
                    :value="candidateData.family.mother_profession"
                  />
                  <TableRow
                    title="Siblings"
                    textClass="text-subtitle-1"
                    :value="candidateData.family.siblings_desc"
                  />

                  <TableRow
                    title="Ancestral home same as country of birth?"
                    textClass="text-subtitle-1"
                    :value="candidateData.family.country_of_origin"
                  />

                </table>
                <!-- <ul style="line-height: 160%">
                  

                  <li class="flex-between-start">
                    <span class="flex-60 px-2 text--disabled text-subtitle-1"
                      >Father's Profession</span
                    ><span class="flex-60 px-2 d-inherit"
                      >:<span class="left-margin">{{
                        candidateData.family.father_profession
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-60 px-2 text--disabled text-subtitle-1"
                      >Mother's Profession</span
                    ><span class="flex-60 px-2 d-inherit"
                      >:<span class="left-margin">{{
                        candidateData.family.mother_profession
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
          
                    <TableRow
                      title="Siblings"
                      textClass="text-subtitle-1"
                      :value="candidateData.family.siblings_desc"
                    />
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-60 px-2 text--disabled text-subtitle-1"
                      >Country Of origin</span
                    ><span class="flex-60 px-2 d-inherit"
                      >:<span class="left-margin">{{
                        candidateData.family.country_of_origin
                      }}</span></span
                    >
                  </li>
                </ul> -->
              </div>
            </div>
            <div class="col-md-12">
              <div class="card-custom h-100 shadow-border">
                <h4 class="text--disabled text-subtitle-1">About My Family</h4>
                <p class="text--secondary text-subtitle-1 text-break">
                  {{ candidateData.family.family_info }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="showAgreement" class="review-edit mt-5">
          <div class="review-edit-label">
            Verification & Reference
            <img
              class="ms-2 edit-step"
              src="@/assets/icon/edit_step.svg"
              alt="icon"
              @click="$emit('toggleStep', 4)"
            />
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="card-custom h-100 shadow-border">
                <table>
                  <TableRow
                    title="ID document issuing country"
                    textClass="text-subtitle-1"
                    :value="candidateData.verification.ver_country"
                  />
                  <TableRow
                    title="Document type"
                    textClass="text-subtitle-1"
                    :value="candidateData.verification.ver_document_type"
                  />
                </table>
              </div>
            </div>
            <!-- <div class="col-12 col-md-6 mb-4">
              <div class="profile-img text-center">
                <img
                  v-viewer
                  :src="candidateData.verification.ver_image_front"
                  class="user-image"
                  alt="img"
                  height="250"
                  width="200"
                />
                <p class="text-center">Front Side</p>
              </div>
            </div>
            <div class="col-12 col-md-6 mb-4">
              <div class="profile-img text-center">
                <img
                  v-viewer
                  :src="candidateData.verification.ver_image_back"
                  class="user-image"
                  alt="img"
                  height="250"
                  width="200"
                />
                <p class="text-center">Back Side</p>
              </div>
            </div> -->
            <div v-viewer="{movable: false, title: false, scalable: false, rotatable: false}" class="col-12 row my-1 ms-1">
              <div
                class="col-md-6 mb-sm-0 mb-2 flex flex-column align-items-center img-preview" 
                v-for="src in [candidateData.verification.ver_image_front + `?token=${token}`, candidateData.verification.ver_image_back + `?token=${token}`]" 
                :key="src"
              >
                  <img
                    :src="src"
                    class="contain"
                    alt="img"
                    style="cursor: pointer;"
                  />
                  <p class="text-center" v-if="src == candidateData.verification.ver_image_front + `?token=${token}`">Front side</p>
                  <p class="text-center" v-if="src == candidateData.verification.ver_image_back + `?token=${token}`">Back side</p>
              </div>
            </div>
          </div>
        </div>
        <!-- Uploaded Image -->
        <div class="review-edit mt-5">
          <div class="review-edit-label">
            My Uploaded Image
            <img
              class="ms-2 edit-step"
              src="@/assets/icon/edit_step.svg"
              alt="icon"
              @click="$emit('toggleStep', 3)"
            />
          </div>
          <div class="row">
            <div v-viewer="{movable: false, title: false, scalable: false, rotatable: false}" class="col-12 row my-1 ms-1">
              <div
                class="col-md-4 mb-sm-0 mb-2 flex flex-column align-items-center img-preview" 
                v-for="src in [candidateData.personal.per_avatar_url + `?token=${token}`, candidateData.personal.per_main_image_url + `?token=${token}`, candidateData.other_images + `?token=${token}`]" 
                :key="src"
              >
                  <img
                    :src="src"
                    class="contain"
                    alt="img"
                    style="cursor: pointer;"
                    v-if="src != null"
                  />
                  <img
                    v-else
                    src="https://talbottinn.com/wp-content/uploads/2013/11/dummy-image-square.jpg"
                    class="user-image"
                    alt="img"
                    height="250"
                    width="200"
                    style="cursor: pointer;"
                  />
                  <p class="text-center" v-if="src == candidateData.personal.per_avatar_url + `?token=${token}`">Avatar</p>
                  <p class="text-center" v-if="src == candidateData.personal.per_main_image_url + `?token=${token}`">Main Image</p>
                  <p class="text-center" v-if="src == candidateData.other_images + `?token=${token}` && src != null">Other Images</p>
                  <p class="text-center" v-if="src == null">No image provided</p>
              </div>
            </div>

            <div class="col-12">
              <div class="card-custom shadow-border">
                <h4>Image setting</h4>
                <div class="d-flex align-items-baseline">
                  <StopOutlined
                    v-if="candidateData.personal.anybody_can_see == 0"
                    class="color-danger mt-2 mr-2 fs-16 fw-500"
                  />
                  <CheckOutlined
                    v-else
                    class="color-success mt-2 mr-2 fs-14 fw-500"
                  />
                  <span class="fs-16">
                    Share my images with anyone who searches on
                    MatrimonyAssist</span
                  >
                </div>
                <!-- <div class="d-flex align-items-baseline">
                  <StopOutlined
                    v-if="candidateData.personal.only_team_can_see == 0"
                    class="color-danger mt-2 mr-2 fs-16 fw-500"
                  />
                  <CheckOutlined
                    v-else
                    class="color-success mt-2 mr-2 fs-14 fw-500"
                  />
                  <span class="fs-16">
                    Do not share my images with anyone at the moment</span
                  >
                </div> -->
                <div class="d-flex align-items-baseline">
                  <StopOutlined
                    v-if="candidateData.personal.team_connection_can_see == 0"
                    class="color-danger mt-2 mr-2 fs-16 fw-500"
                  />
                  <CheckOutlined v-else class="color-success mt-2 mr-2 fs-14 fw-500" />
                  <span class="fs-16">
                    Share my images with the connected teams (only if I or they
                    accept connect request)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </fieldset>
    <Loader v-else :isLoading="true" />
  </div>
</template>
<script>
import RatingComponent from "../profile/RatingComponent.vue";
import ApiService from "@/services/api.service";
import TableRow from "@/components/atom/TableRow.vue";
import FieldsetCard from "@/components/atom/FieldsetCard.vue";
import { AGES, HEIGHTS, Employment_Statuses } from "@/models/data";
import Loader from '../../plugins/loader/loader.vue';

import {
  StopOutlined,
  CheckOutlined,
} from "@ant-design/icons-vue";

export default {
  name: "Review",
  components: {
    RatingComponent,
    TableRow,
    FieldsetCard,
    Loader,
    
    CheckOutlined,
    StopOutlined
  },
  props: {
    candidateDetails: {
      type: Object,
    },
    showAgreement: {
      type: Boolean,
    },
  },
  data() {
    return {
      candidateData: {},
      heightTV: HEIGHTS,
      token: "",
    };
  },
  created() {
    this.getToken();
  },
  mounted() {
    this.getCandidateData();
  },
  methods: {
    getToken() {
      this.token = JSON.parse(localStorage.getItem("token"));
    },
    async getCandidateData() {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await ApiService.get(`v1/candidate/info/${user.id}`);
        this.candidateData = {
          ...response.data.data,
          preference: {
            ...response.data.data.preference,
            pre_occupation: JSON.parse(
              response.data.data.preference.pre_occupation
            ),
          },
          verification: {
            ...response.data.data.verification.verification,
          },
          // personal: {
          //   ...response.data.data.personal,
          //   per_about: response.data.data.personal.per_about.replace(
          //     /(?:\r\n|\r|\n)/g,
          //     "<br />"
          //   ),
          // },
        };
      } catch (error) {
      }
    },

    getHeight(val) {
      let h = this.heightTV.find((x) => x.value === val);
      return h ? h.name : "";
    },
    getPerImproveMyself(val) {
      let improvements = "";
      val.forEach((element) => {
        improvements += this.candidateDetails.improveMyselfThings[element-1].label + " <br> ";
      });
      return improvements;
    },
  },
  computed: {},
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.shadow-border {
  box-shadow: none !important;
  border: 2px solid #dddddd78 !important;
}
.left-margin {
  margin-left: 12px !important;
  @media (max-width: 600px) {
    margin-left: 0px !important;
  }
}
.flex-between-start {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: 600px) {
    flex-direction: column !important;
    margin-bottom: 24px !important;
  }
}
.contain {
  height: 135px;
  width: 220px;
  object-fit: cover;
}
.review-publish {
  .review {
    font-size: 14px;
    h4 {
      font-size: 16px;
      opacity: 0.8;
    }
    p {
      font-size: 14px;
    }
    .review-edit {
      position: relative;
      padding: 15px;
      border: 1px solid $border-secondary;
      border-radius: 5px;
      .review-edit-label {
        position: absolute;
        color: $color-secondary;
        left: 50px;
        top: -12px;
        background: $bg-white;
        cursor: pointer;
      }
    }
    ul {
      .label-text {
        //opacity: 0.8;
      }
    }
    .img-preview {
      width: 200px;
      height: 100%;
      margin: 0px auto;
      @media (max-width: 447px) {
        height: auto !important;
      }
    }
  }
  .ant-input {
    border: none;
    pointer-events: none;
  }
  textarea {
    resize: none;
  }
}
.h-100 {
  height: 100%;
}
.h-67 {
  height: 66%;
  margin-bottom: 2%;
}
.h-33 {
  height: 32%;
  margin-top: 1%;
}
.anticon {
  max-width: 15px;
}
.badge-info {
  background: $bg-white !important;
  color: black;
  position: relative;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid $border-gray;
  margin-bottom: 15px;
  text-align: center;
  .badge-info-label {
    position: absolute;
    top: -12px;
    opacity: 0.7;
    left: 0;
    right: 0;
    .inner {
      background: $bg-white;
    }
  }
}

.card-height-design {
  height: 360px;
}

.mobile-margin-top {
  margin-top: 54px;
}
.text--disabled .text-subtitle-1 {
  //font-size: 14px;
  font-weight: 500;
}
.flex-60 > .ml-3 {
  //font-size: 14px;
  font-weight: 500;
}
.inner {
  // font-weight: 600;
}
.value-text {
  font-weight: bold;
}
.mt-16px {
  margin-top: 16px;
}
.personal-height {
  height: auto;
}
.contain {
  //height: 123px;
  border: 1px solid $color-secondary;
  border-radius: 5px;
  width: 220px;
  object-fit: cover;
}
.edit-step {
  width: 20px;
  height: 20px;
}
@media (min-width: 992px) {
  .mobile-margin-top {
    margin-top: 0;
  }
  .personal-height {
    height: 360px;
  }
}
.card-personal {
  padding: 15px 8px;
}
.personal-ul {
  line-height: 160%;
  padding-left: 0;
}
.card-custom :deep() {
  .v-list-item-subtitle {
    font-family: "Roboto", sans-serif !important;
    line-height: 1.7 !important;
    letter-spacing: 0.009375em;
    font-size: 1rem !important;
    font-weight: 400 !important;
    color: rgba(0,0,0,.38) !important;
  }
  .v-list-item-title {
    font-family: "Roboto", sans-serif !important;
    line-height: 1.7 !important;
    letter-spacing: 0.009375em;
    font-size: 1rem !important;
    font-weight: 400 !important;
    color: rgba(0,0,0,.6) !important;
  }
}
</style>
