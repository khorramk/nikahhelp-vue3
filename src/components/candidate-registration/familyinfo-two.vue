<template>
  <div id="familyInfoAccordian" class="family-info px-3">
    <div class="section-heading heading-text">
      <h5>Family Information</h5>
      <p>Your Family's Information</p>
    </div>
    <a-collapse
      accordion
      :activeKey="activeKey"
      @change="changeActivekey"
      :bordered="false"
      expand-icon-position="right"
      style="background-color: #f6f5fb;"
      >
      <template #expandIcon="props">
        <a-icon type="caret-down" :rotate="props.isActive ? 180 : 0" />
      </template>
      <!-- 1. Family Details  -->
      <a-collapse-panel key="1" header="3.1 Family Details">
        <a-form-model
          ref="familyInformationForm"
          v-if="familyInformation"
          :model="familyInformation"
          :rules="rules"
          class="form-ma"
        >
          <!-- Father's Profession -->
          <div class="row py-3 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="familyInformation.father_profession"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What is your father's profession?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item
                ref="father_profession"
                prop="father_profession"
              >
                <!-- <v-select
                  :clearable="false"
                  class="style-chooser"
                  @input="onValueChange($event, 'father_profession')"
                  id="father_profession"
                  :reduce="(option) => option.name"
                  placeholder="please select "
                  v-model="familyInformation.father_profession"
                  label="name"
                  :options="candidateDetails.occupations"
                  ><template #open-indicator> <a-icon type="down" /> </template
                ></v-select> -->
                <a-input
                  @blur="onValueChange($event, 'father_profession')"
                  id="father_profession"
                  class="style-chooser"
                  :maxLength="20"
                  placeholder="write your father's profession"
                  v-model="familyInformation.father_profession"
                />
              </a-form-model-item>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapseCandidateFatherProfession"
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
                data-parent="#familyInfoAccordian"
                id="collapseCandidateFatherProfession"
              >
                <div class="card card-body bubble">
                  Some people are interested in knowing parental professions to
                  assess inter-family compatibility. For other people it is not
                  that an important consideration.
                </div>
              </div>
            </div>
          </div>

          <!-- Mother's Profession -->
          <div class="row pt-3 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="familyInformation.mother_profession"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What is your mother's profession?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item
                ref="mother_profession"
                prop="mother_profession"
                ><a-input
                  @blur="onValueChange($event, 'mother_profession')"
                  id="mother_profession"
                  class="style-chooser"
                  :maxLength="20"
                  placeholder="write your mother's profession"
                  v-model="familyInformation.mother_profession"
                />
                <!-- <v-select
                  :clearable="false"
                  class="style-chooser"
                  @input="onValueChange($event, 'mother_profession')"
                  id="mother_profession"
                  placeholder="please select"
                  v-model="familyInformation.mother_profession"
                  label="name"
                  :reduce="(option) => option.name"
                  :options="candidateDetails.occupations"
                  ><template #open-indicator> <a-icon type="down" /> </template
                ></v-select> -->
              </a-form-model-item>
            </div>
            <div class="col-12 col-md-6 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapseCandidateMotherProfession"
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
                data-parent="#familyInfoAccordian"
                id="collapseCandidateMotherProfession"
              >
                <div class="card card-body bubble">
                  Some people are interested in knowing parental professions to
                  assess inter-family compatibility. For other people it is not
                  that an important consideration.
                </div>
              </div>
            </div>
          </div>

          <!-- Siblings -->
          <div class="row pt-3 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="familyInformation.siblings_desc"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />Please give details about your siblings.
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item ref="siblings_desc" prop="siblings_desc">
                <a-textarea
                  @blur="onValueChange($event, 'siblings_desc')"
                  id="siblings_desc"
                  placeholder="e.g. 1 sister, married, with 2 children
2 brothers, unmarried"
                  :rows="3"
                  :maxLength="200"
                  v-model="familyInformation.siblings_desc"
                ></a-textarea>
              </a-form-model-item>
              <span style="display: flex; justify-content: flex-end"
                >{{
                  familyInformation.siblings_desc
                    ? familyInformation.siblings_desc.length
                    : 0
                }}/200</span
              >
            </div>
            <div class="col-12 col-md-6 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapseSiblingsInfomation"
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
                data-parent="#familyInfoAccordian"
                id="collapseSiblingsInfomation"
              >
                <div class="card card-body bubble">
                  If you do not have any siblings, please enter 'no siblings'.
                  As marriage involves union of two families, it helps people to
                  get an idea of the kind of family they will have relationship
                  with.
                </div>
              </div>
            </div>
          </div>

          <!-- About Family -->
          <div class="row pt-3 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="familyInformation.family_info"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />You may use this space to share more information about your
                family.
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item ref="family_info" prop="family_info">
                <a-textarea
                  @blur="onValueChange($event, 'family_info')"
                  id="family_info"
                  placeholder="e.g. elder brother is a teacher etc. or We are a traditional family. "
                  :rows="3"
                  :maxLength="200"
                  v-model="familyInformation.family_info"
                ></a-textarea>
              </a-form-model-item>
              <span style="display: flex; justify-content: flex-end"
                >{{
                  familyInformation.family_info
                    ? familyInformation.family_info.length
                    : 0
                }}/200</span
              >
            </div>
            <div class="col-12 col-md-6 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapseAnyotherFamilyLike"
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
                data-parent="#familyInfoAccordian"
                id="collapseAnyotherFamilyLike"
              >
                <div class="card card-body bubble">
                  As marriage involves union of two families, it helps people to
                  get an idea of the kind of family they will have relationship
                  with. Don't worry, there is no ideal or perfect family in the
                  real world.
                </div>
              </div>
            </div>
          </div>

          <!-- Country Of Origin -->
          <div class="row pt-3 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="familyInformation.country_of_origin"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />Is your ancestral home same as your country of birth?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item
                ref="country_of_origin"
                prop="country_of_origin"
              >
                <v-select
                  :calculate-position="withPopper"
                  append-to-body
                  :clearable="false"
                  class="style-chooser"
                  @input="onValueChange($event, 'country_of_origin')"
                  id="country_of_origin"
                  :reduce="(option) => option.name"
                  placeholder="please select "
                  v-model="familyInformation.country_of_origin"
                  label="name"
                  :options="[
                    { name: 'Yes', value: 'Yes' },
                    { name: 'No', value: 'No' },
                  ]"
                  ><template #open-indicator> <a-icon type="down" /> </template
                ></v-select>
              </a-form-model-item>
            </div>
            <div class="col-12 col-md-6 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapseSelectCountryOfBirth"
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
                data-parent="#familyInfoAccordian"
                id="collapseSelectCountryOfBirth"
              >
                <div class="card card-body bubble">
                  We ask this question as people are interested in knowing
                  people have originated in terms of roots, migration and
                  heritage.
                </div>
              </div>
            </div>
          </div>

          <a-button
            shape="round"
            type="primary"
            style="float: right; margin-bottom: 0.5rem; margin-right: -15px"
            class="mt-5"
            @click="handleSubmitForm"
          >
            Save & Continue
          </a-button>
        </a-form-model>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>
<script>
import NeedHelp from "@/components/candidate-registration/NeedHelp.vue";
import vSelect from "vue-select";
import { createPopper } from "@popperjs/core";
import {
  ARR_FAMILY_INFO,
  _PROFESSIONS,
  RULES_FAMILY_INFO,
} from "./models/candidate";
export default {
  name: "familyInfoTwo",
  components: { NeedHelp, vSelect },
  props: {
    candidateDetails: {
      type: Object,
    },
    familyInformation: {
      type: Object,
    },
  },

  data() {
    return {
      activeKey: ["1"],
      rules: RULES_FAMILY_INFO,
      // familyInformation: this.getDefaultFamilyInfo(),
      arr: ARR_FAMILY_INFO,
      professions: _PROFESSIONS,
    };
  },
  created() {
    this.activePanel = 1;
  },
  mounted() {
    this.checkDisabled();
  },
  methods: {
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
    checkDisabled(e) {
      this.$emit("disabled", {
        value: true,
        current: 2,
      });
    },
    changeActivekey(key) {
      this.activeKey = key;
    },
    handleSubmitForm() {
      this.$refs.familyInformationForm.validate((valid) => {
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
      this.$refs.familyInformationForm.fields.forEach((f) => {
        if (f.prop == name) {
          f.onFieldBlur();
        }
      });
      this.checkDisabled();
      this.saveFamilyInfo();
    },
    getDefaultFamilyInfo() {
      return {
        country_of_origin: null,
        family_info: null,
        father_name: null,
        father_profession: null,
        is_publish: false,
        mother_name: null,
        mother_profession: null,
        siblings_desc: null,
      };
    },

    saveFamilyInfo() {
      const userInfo = JSON.parse(localStorage.getItem("user"));
      this.$store
        .dispatch("updateFamilyInfo", {
          ...this.familyInformation,
          uid: userInfo.id,
        })
        .then((data) => {
          this.$emit("valueChange", {
            value: this.familyInformation,
            current: 2,
          });
        })
        .catch((error) => {});
    },
  },
};
</script>
<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.family-info {
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
</style>