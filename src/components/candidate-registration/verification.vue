<template>
  <div id="accordion" class="verificationInfo p-3 rounded">
    <loader :isLoading="loading" text="Uploading..." />
    <div v-if="userData" class="verification-content">
      <div class="section-heading heading-text text-center">
        <h5 class="text-center">Verification Information</h5>
        <p class="text-center">Upload your verification documents</p>
      </div>
      <a-collapse default-active-key="1" @change="changeActivekey" :activeKey="activeKey" :bordered="false"
        expand-icon-position="right" style="background-color: #f6f5fb;">
        <template #expandIcon="props">
          <a-icon type="caret-down" :rotate="props.isActive ? 180 : 0" />
        </template>
        <a-collapse-panel key="1" header="6. ID Verification Information">
          <a-form v-if="verification" ref="verification" :model="verification" :rules="rules" class="form-ma">
            <div class="row">
              <div class="col-12 border-bottom pb-3">
                <div class="verification-header my-2 text-black-70">
                  <p>
                    To provide you with an authentic experience we verify all
                    candidates (bride/groom) IDs as well as the ID of at least
                    one representative in each team.
                  </p>
                  <p>
                    If you do not wish to upload your ID documents now, that's
                    fine. You can go back to the previous step by tapping the
                    previous button at the bottom of this section and select
                    'No'. You can upload your ID documents later through your
                    personal settings screen.
                  </p>
                  <p>
                    We accept photos/scans of a driving license, passport,
                    national ID card or residence permit issued by governments.
                  </p>
                  <p>
                    Copies of your ID document will be deleted once your ID is
                    verified in the interest of security.
                  </p>
                  <p>
                    Our main goal is that real people connect with other real
                    people.
                  </p>

                  <p>
                    Follow these tips to make sure your document is accepted:
                  </p>
                  <ul>
                    <li class="flex-start-center">
                      <img src="@/assets/Icons/tick 2.svg" alt="icon" id="checkIcon" />
                      Submit a valid, current photo ID with an expiry date
                    </li>
                    <li class="flex-start-center py-2">
                      <img src="@/assets/Icons/tick 2.svg" alt="icon" id="checkIcon" />
                      Show the full document (all four corners should be
                      visible)
                    </li>
                    <li class="flex-start-center">
                      <img src="@/assets/Icons/tick 2.svg" alt="icon" id="checkIcon" />
                      Use a colour image that a is clear and easy to read
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!--Country-->
            <div class="row pt-3 border-bottom">
              <div class="col-12 col-md-6 none-padding">
                <div class="mb-2 font-weight-bold">
                  <a-icon v-if="verification.ver_country" class="color-success mr-2 fs-18 fw-500" type="check" />Document
                  issuing country
                </div>
              </div>
              <div class="col-12 col-md-6 mobile-margin">
                <div class="row">
                  <div class="col-12 col-md-12">
                    <a-form-item ref="ver_country" prop="ver_country">
                      <v-select :clearable="false" class="style-chooser" @input="onChangeCountry($event, 'ver_country')"
                        id="ver_country" placeholder="please select" v-model="verification.ver_country" label="name"
                        :reduce="(option) => option.name" :options="candidateDetails.countries"><template #open-indicator>
                          <a-icon type="down" /> </template></v-select>
                      <!-- <a-select
                        id="ver_country"
                        :showSearch="true"
                        option-filter-prop="children"
                        :filter-option="filterOption"
                        :showArrow="true"
                        v-model="verification.ver_country"
                        class="select-ma w-100"
                        placeholder="Country"
                        ref="select"
                        @change="onChangeCountry"
                      >
                        <a-select-option
                          v-for="(
                            _country, key
                          ) in candidateDetails.countries"
                          :value="_country.id"
                          :key="key"
                        >
                          {{ _country.name }}
                        </a-select-option>
                      </a-select> -->
                    </a-form-item>
                  </div>

                  <!-- <div class="col-12 col-md-6 mobile-margin">
                    <a-form-item ref="ver_city_id" prop="ver_city_id">
                      <v-select
                        :clearable="false"
                        class="style-chooser"
                        id="ver_city_id"
                        placeholder="please select"
                        @input="onValueChange($event, 'ver_city_id')"
                        :loading="loading"
                        :reduce="(option) => option.id"
                        v-model="verification.ver_city_id"
                        label="name"
                        :options="verification.cities"
                        ><template #open-indicator>
                          <a-icon type="down" /> </template
                      ></v-select> 

                       <a-select
                        id="ver_city"
                        :showSearch="true"
                        option-filter-prop="children"
                        :filter-option="filterOption"
                        :showArrow="true"
                        v-model="verification.ver_city"
                        class="select-ma w-100"
                        placeholder="City"
                        @change="onValueChange"
                      >
                        <a-select-option
                          v-for="(_city, key) in verification.cities"
                          :value="_city.id"
                          :key="key"
                        >
                          {{ _city.name }}
                        </a-select-option>
                      </a-select> 
                    </a-form-item>
                  </div> -->
                </div>
              </div>
              <div class="col-12 none-padding mobile-margin mobile-help">
                <p>
                  <a class="color-blue fw-700 fs-14" data-toggle="collapse" href="#Needver_country_id" role="button"
                    aria-expanded="false" aria-controls="collapseExample">
                    <span v-if="arr[3].first" @click="toggle(3)">
                      Need Help?
                    </span>
                    <span v-else @click="toggle(3)"> Hide Help? </span>
                  </a>
                </p>
                <div data-parent="#accordion" class="collapse" id="Needver_country_id">
                  <div class="card card-body bubble">
                    Please provide tooltip texts so we can place it here
                  </div>
                </div>
              </div>
            </div>

            <!--Document type-->
            <div class="row pt-3 border-bottom">
              <div class="col-12 col-md-6 none-padding">
                <div class="mb-2 font-weight-bold">
                  <a-icon v-if="verification.ver_document_type" class="color-success mr-2 fs-18 fw-500"
                    type="check" />Type of document
                </div>
              </div>
              <div class="col-12 col-md-6 mobile-margin">
                <a-form-item ref="ver_document_type" prop="ver_document_type">
                  <v-select :clearable="false" class="style-chooser" id="ver_document_type" placeholder="Document type"
                    @input="onValueChange($event, 'ver_document_type')" :reduce="(option) => option.value"
                    v-model="verification.ver_document_type" label="name" :options="[
                      { name: 'Passport', value: 'Passport' },
                      { name: 'National ID', value: 'National ID' },
                      { name: 'Driving licence ', value: 'Driving licence ' },
                    ]"><template #open-indicator>
                      <a-icon type="down" /> </template></v-select>
                </a-form-item>
              </div>
              <div class="col-12 none-padding mobile-margin mobile-help">
                <p>
                  <a class="color-blue fw-700 fs-14" data-toggle="collapse" href="#Needver_document_type" role="button"
                    aria-expanded="false" aria-controls="collapseExample">
                    <span v-if="arr[2].first" @click="toggle(2)">
                      Need Help?
                    </span>
                    <span v-else @click="toggle(2)"> Hide Help? </span>
                  </a>
                </p>
                <div data-parent="#accordion" class="collapse" id="Needver_document_type">
                  <div class="card card-body bubble">
                    Unfortunately, if you do not have one of the required IDs,
                    you will not be able to continue your full registration. You
                    do have the option to skip ID upload now and this can be
                    done later through account settings. Please select cancel to
                    return to the previous section to select skip ID upload.
                  </div>
                </div>
              </div>
            </div>

            <!--Document front side-->
            <div class="row pt-3 border-bottom">
              <div class="col-12 col-md-6 none-padding">
                <div class="mb-2 font-weight-bold">
                  <a-icon v-if="verification.ver_image_front" class="color-success mr-2 fs-18 fw-500"
                    type="check" />Upload front side?
                </div>
              </div>
              <div class="col-12 col-md-6 mobile-margin">
                <div class="image-container text-center">
                  <span class="mb-2">The format supported are JPEG, PNG, PDF. Maximum file size
                    4 mb</span>

                  <div class="img-preview mb-2">
                    <img v-viewer :src="imageFont ? imageFont : verification.ver_image_front + `?token=${token}`
                      " class="contain" v-if="verification.ver_image_front" />
                    <div class="mt-3">Front Page</div>
                    <div
                      class="add-icon"
                      v-if="!verification.ver_image_front"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16.69 16.69"
                      >
                        <g id="Layer_2" data-name="Layer 2">
                          <g id="mid_bottom" data-name="mid bottom">
                            <circle
                              class="cls-1"
                              cx="8.34"
                              cy="8.34"
                              r="8.34"
                              fill="#e1e1e1"
                            />
                            <path
                              class="cls-2"
                              fill="#ffffff"
                              d="M13.1,7.51H9.18V3.58a.8.8,0,0,0-1.6,0V7.51H3.65a.8.8,0,1,0,0,1.6H7.58V13a.8.8,0,1,0,1.6,0V9.11H13.1a.8.8,0,1,0,0-1.6Z"
                            />
                          </g>
                        </g>
                      </svg>
                    </div>
                  </div>
                  <!-- <input
                    type="file"
                    class="input-image"
                    name="avatar"
                    v-if="!verification.ver_image_front"
                    @change="getFrontPage"
                  /> -->
                  <label for="upload-front-side" class="upload-label" v-if="!verification.ver_image_front">
                    Upload
                    <input v-if="!verification.ver_image_front" type="file" accept=".png, .jpeg, .jpg" class="input-image" id="upload-front-side"
                      name="avatar" @change="getFrontPage" />
                  </label>
                  <label for="upload-front-side" class="upload-label" v-if="verification.ver_image_front">
                    Change
                    <input v-if="verification.ver_image_front" type="file" accept=".png, .jpeg, .jpg" class="input-image" id="upload-front-side"
                      name="avatar" @change="getFrontPage" />
                  </label>
                </div>
              </div>
              <div class="col-12 col-md-6 none-padding mobile-margin mobile-help">
                <p>
                  <a class="color-blue fw-700 fs-14" data-toggle="collapse" href="#Needver_image_front" role="button"
                    aria-expanded="false" aria-controls="collapseExample">
                    <span v-if="arr[1].first" @click="toggle(1)">
                      Need Help?
                    </span>
                    <span v-else @click="toggle(1)"> Hide Help? </span>
                  </a>
                </p>
                <div data-parent="#accordion" class="collapse" id="Needver_image_front">
                  <div class="card card-body bubble">
                    Please provide tooltip texts so we can place it here
                  </div>
                </div>
              </div>
            </div>

            <!--Document back side-->
            <div class="row pt-3 border-bottom">
              <div class="col-12 col-md-6 none-padding">
                <div class="mb-2 font-weight-bold">
                  <a-icon v-if="verification.ver_image_back" class="color-success mr-2 fs-18 fw-500" type="check" />Upload
                  reverse side
                </div>
              </div>
              <div class="col-12 col-md-6 mobile-margin">
                <div class="image-container text-center">
                  <span class="mb-2">The format supported are JPEG, PNG, PDF. Maximum file size
                    4 mb</span>

                  <div class="img-preview mb-2">
                    <img v-viewer :src="imageBack ? imageBack : verification.ver_image_back + `?token=${token}`"
                    class="contain" v-if="verification.ver_image_back" />

                    <div class="mt-3">Back Page</div>
                    <div
                      class="add-icon"
                      v-if="!verification.ver_image_back"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16.69 16.69"
                      >
                        <g id="Layer_2" data-name="Layer 2">
                          <g id="mid_bottom" data-name="mid bottom">
                            <circle
                              class="cls-1"
                              cx="8.34"
                              cy="8.34"
                              r="8.34"
                              fill="#e1e1e1"
                            />
                            <path
                              class="cls-2"
                              fill="#ffffff"
                              d="M13.1,7.51H9.18V3.58a.8.8,0,0,0-1.6,0V7.51H3.65a.8.8,0,1,0,0,1.6H7.58V13a.8.8,0,1,0,1.6,0V9.11H13.1a.8.8,0,1,0,0-1.6Z"
                            />
                          </g>
                        </g>
                      </svg>
                    </div>
                  </div>
                  <!-- <input
                    type="file"
                    class="input-image"
                    v-if="!verification.ver_image_back"
                    name="avatar"
                    @change="getBackPage"
                  /> -->
                  <label for="upload-back-side" class="upload-label" v-if="!verification.ver_image_back">
                    Upload
                    <input v-if="!verification.ver_image_back" type="file" accept=".png, .jpeg, .jpg" class="input-image" id="upload-back-side"
                      name="avatar" @change="getBackPage" />
                  </label>
                  <label for="upload-back-side" class="upload-label" v-if="verification.ver_image_back">
                    Change
                    <input v-if="verification.ver_image_back" type="file" accept=".png, .jpeg, .jpg" class="input-image" id="upload-back-side"
                      name="avatar" @change="getBackPage" />
                  </label>
                </div>
              </div>
              <div class="col-12 col-md-6 mobile-margin mobile-help">
                <p>
                  <a class="color-blue fw-700 fs-14" data-toggle="collapse" href="#Needver_image_back" role="button"
                    aria-expanded="false" aria-controls="collapseExample">
                    <span v-if="arr[0].first" @click="toggle(0)">
                      Need Help?
                    </span>
                    <span v-else @click="toggle(0)"> Hide Help? </span>
                  </a>
                </p>
                <div data-parent="#accordion" class="collapse" id="Needver_image_back">
                  <div class="card card-body bubble">
                    Please provide tooltip texts so we can place it here
                  </div>
                </div>
              </div>
            </div>

            <!-- <div class="d-flex justify-content-end">
              <a-button
                shape="round"
                type="primary"
                style="float: right; margin-right: 10px"
                class="mt-5"
                @click="cancel"
              >
                Cancel
              </a-button>
              <a-button
                shape="round"
                type="primary"
                style="float: right; margin-bottom: 0.5rem; margin-right: -15px"
                class="mt-5"
                @click="handleSubmitFormOne"
              >
                Save
              </a-button>
            </div> -->
          </a-form>
        </a-collapse-panel>
      </a-collapse>
    </div>

  </div>
</template>

<style lang="scss">
@import "@/styles/base/_variables.scss";
</style>
<script>
import FileUploadOne from "@/components/shared/FileUploadOne.vue";
import vSelect from "vue-select";
import { VERIFICATION } from "./models/candidate";
import axios from 'axios';
import Loader from '../../plugins/loader/loader.vue';
export default {
  name: "Verification",
  props: {
    candidateDetails: {
      type: Object,
    },
    verification: {
      type: Object,
    },
  },
  components: {
    FileUploadOne,
    vSelect,
    Loader,
  },
  data() {
    return {
      userData: null,
      arr: [
        {
          first: true,
        },
        {
          first: true,
        },
        {
          first: true,
        },
        {
          first: true,
        },
        {
          first: true,
        },
      ],
      rules: VERIFICATION,
      cities: [],
      imageBack: null,
      imageFont: null,
      activeKey: 1,
      loading: false,
      token: "",
    };
  },
  created() {
    this.userData = JSON.parse(localStorage.getItem("user"));
    this.token = JSON.parse(localStorage.getItem('token'));
  },
  mounted() { },

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

    cancel() {
      this.verification = {
        ver_country: "",

        ver_document_type: "",
        ver_image_back: "",
        ver_image_front: "",
      };
      this.$store
        .dispatch("saveVerificationInfo", {
          ver_country: "",

          ver_document_type: "",
        })
        .then((data) => {
          this.$emit("valueChange", {
            value: this.verification,
            current: 4,
          });
          this.$emit("cancel", false);
        })
        .catch((error) => { });
    },
    changeActivekey(key) {
      this.activeKey = key;
    },
    // handleSubmitFormOne() {
    //   this.$refs.verification.validate((valid) => {
    //     if (valid) {
    //       this.activeKey = null;
    //     } else {
    //       setTimeout(() => {
    //         const el = document.querySelector(".has-error:first-of-type");
    //         el.scrollIntoView();
    //       }, 100);
    //       return false;
    //     }
    //   });
    // },
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
      const { ver_country, ver_document_type } = this.verification;
      this.$store
        .dispatch("saveVerificationInfo", {
          ver_country,

          ver_document_type,
        })
        .then((data) => {
          this.$emit("valueChange", {
            value: this.verification,
            current: 4,
          });
        })
        .catch((error) => { });
    },
    // saveImageVerificationInfo(image) {
    //   this.$emit('turnOnBtnLoader');
    //   this.$store
    //     .dispatch("saveImageVerificationInfo", image)
    //     .then((data) => {
    //       this.$emit('turnOffBtnLoader');
    //       this.verification.ver_image_back =
    //         data.data.data.verification.ver_image_back;
    //       this.verification.ver_image_front =
    //         data.data.data.verification.ver_image_front;
    //       this.$emit("valueChange", {
    //         value: this.verification,
    //         current: 4,
    //       });
    //     })
    //     .catch((error) => { });
    // },
    async saveImageVerificationInfo(data, folder) {
      this.$emit('turnOnBtnLoader');
      this.loading = true;
      await this.$store.dispatch("uploadImages", {folder: folder, image: data}).then(async (data) => {
        console.log(data, 'image response afer saving image');

        let payload = {};
        if(folder === '_ver_image_front') {
          payload = {
            ver_image_front: process.env.VUE_APP_IMAGE + '/' + Object.values(data)[0]
          };
        } else if(folder === '_ver_image_back') {
          payload = {
            ver_image_back: process.env.VUE_APP_IMAGE + '/' + Object.values(data)[0]
          }
        }
        if(Object.keys(payload).length > 0) {
          await axios.post('v1/candidate/personal-verification-info', payload).then(response => {
            this.$emit('turnOffBtnLoader');
            this.verification.ver_image_back = response.data.data.verification.ver_image_back;
            this.verification.ver_image_front = response.data.data.verification.ver_image_front;
            this.$emit("valueChange", {
              value: this.verification,
              current: 4,
            });
          }).catch(error => {
            console.log(error);
          });
        }  
        this.loading = false;
      });
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

      this.verification.ver_image_front = e.target.files[0];
      let formData = new FormData();
      formData.append("image", this.verification.ver_image_front);
      this.saveImageVerificationInfo(formData, '_ver_image_front');

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
      this.verification.ver_image_back = e.target.files[0];
      let formData = new FormData();
      formData.append("image", this.verification.ver_image_back);
      this.saveImageVerificationInfo(formData, '_ver_image_back');

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.imageBack = e.target.result;
      };
    },

    async onChangeCountry(e, name) {
      this.loading = true;
      this.checkValidation(name);
      this.saveVerificationInfo();
      this.loading = false;
    },
  },
};
</script>


<style scoped lang="scss">
@import "@/styles/base/_variables.scss";

.verification-msg {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

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
  height: 100%;
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
  display: none;
}

.upload-label {
  width: 200px;
  height: 32px;
  font-size: 16px;
  line-height: 32px;
  display: inline-block;
  color: white;
  background: $bg-primary;
  border: 1px solid $bg-primary;
  border-radius: 5px;
  padding: 0 10px;
  text-align: center;
  font-family: Helvetica, Arial, sans-serif;
  cursor: pointer;

  &:hover {
    background: #FFF;
    color: $bg-primary;
  }
}

.contain {
  //height: 123px;
  width: 220px;
  object-fit: cover;
}

#checkIcon {
  height: 18px;
  margin-right: 5px;
}

//input[type="file"]::-webkit-file-upload-button {
//  visibility: hidden;
//}
.close-icon {
  display: grid;
  place-content: center;
  position: absolute;
  right: 5rem;
  top: 2.5rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: white;
  z-index: 1;
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

.instruction-title {
  font-size: 14px;
}

.add-icon {
  svg {
    width: 60px;
    margin-top: 10px;
  }
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

  .instruction-title {
    font-size: 18px;
  }
}
</style>
