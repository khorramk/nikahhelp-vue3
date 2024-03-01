<template>
  <div id="accordion" class="verificationInfo p-3 rounded">
    <Loader :isLoading="loading" text="Uploading..." />
    <div class="section-heading heading-text">
      <h3>Verification Information</h3>
      <!-- <p>Your Verification Information</p> -->
    </div>
    <a-form-model v-if="verification" ref="verification" :model="verification" :rules="rules" class="form-ma">
      <div class="row">
        <div class="col-12 border-bottom pb-3">
          <div class="verification-header mt-2">
            <!-- <p class="instruction-title">
              To keep your account safe, we need to verify your identity. This
              is a legal requirement that help us to keep your account secure.
            </p>
            <p class="instruction-title">
              We accept photo/scans of a driving license, passport, national ID
              card or residence permit issued in European Economic Are (EEA)
            </p>-->

            <p class="instruction-title">
              Follow these tips to make sure your document is accepted:
            </p>
            <ul>
              <li class="flex-start-center">
                <img src="@/assets/Icons/tick 2.svg" alt="icon" id="checkIcon" />
                Submit a valid, current photo ID with an expiry date
              </li>
              <li class="flex-start-center mt-2">
                <img src="@/assets/Icons/tick 2.svg" alt="icon" id="checkIcon" />
                Show the full document (all four corners should be visible)
              </li>
              <li class="flex-start-center mt-2">
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
            <a-icon v-if="verification.ver_country" class="color-success mr-2 fs-18 fw-500" type="check" />Country
          </div>
        </div>
        <div class="col-12 col-md-6 mobile-margin">
          <div class="row">
            <div class="col-12">
              <a-form-model-item ref="ver_country" prop="ver_country">
                <v-select :clearable="false" class="style-chooser" @input="onChangeCountry" id="ver_country"
                  placeholder="Country" v-model="verification.ver_country" label="name" :reduce="(option) => option.name"
                  :options="candidateDetails.countries"><template #open-indicator> <a-icon type="down" />
                  </template></v-select>
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
              </a-form-model-item>
            </div>
            <!-- <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item ref="ver_city_id" prop="ver_city_id">
                <v-select
                  :clearable="false"
                  class="style-chooser"
                  @input="onValueChange"
                  id="ver_city_id"
                  placeholder="City"
                  :reduce="(option) => option.id"
                  v-model="verification.ver_city_id"
                  label="name"
                  :options="verification.cities"
                  ><template #open-indicator> <a-icon type="down" /> </template
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
              </a-form-model-item>
            </div> -->
          </div>
        </div>
        <div class="col-12 none-padding mobile-margin mobile-help">
          <p>
            <a class="color-blue fw-700 fs-14" data-toggle="collapse" href="#Needver_country_id" role="button"
              aria-expanded="false" aria-controls="collapseExample">
              <span v-if="arr[0].first" @click="arr[0].first = !arr[0].first">
                Need Help?
              </span>
              <span v-else @click="arr[0].first = !arr[0].first">
                Hide Help?
              </span>
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
            <a-icon v-if="verification.ver_document_type" class="color-success mr-2 fs-18 fw-500" type="check" />Document
            type?
          </div>
        </div>
        <div class="col-12 col-md-6 mobile-margin">
          <v-select :clearable="false" class="style-chooser" @input="onValueChange" id="ver_document_type"
            placeholder="Document type" :reduce="(option) => option.value" v-model="verification.ver_document_type"
            label="name" :options="[
              { name: 'Passport', value: 'Passport' },
              { name: 'Nation ID', value: 'Nation ID' },
            ]"><template #open-indicator> <a-icon type="down" /> </template></v-select>
        </div>
        <div class="col-12 none-padding mobile-margin mobile-help">
          <p>
            <a class="color-blue fw-700 fs-14" data-toggle="collapse" href="#Needver_document_type" role="button"
              aria-expanded="false" aria-controls="collapseExample">
              <span v-if="arr[1].first" @click="arr[1].first = !arr[1].first">
                Need Help?
              </span>
              <span v-else @click="arr[1].first = !arr[1].first">
                Hide Help?
              </span>
            </a>
          </p>
          <div data-parent="#accordion" class="collapse" id="Needver_document_type">
            <div class="card card-body bubble">
              Please provide tooltip texts so we can place it here
            </div>
          </div>
        </div>
      </div>

      <!--Document front side-->
      <div class="row pt-3 border-bottom">
        <div class="col-12 col-md-6 none-padding">
          <div class="mb-2 font-weight-bold">
            <a-icon v-if="verification.ver_image_front" class="color-success mr-2 fs-18 fw-500" type="check" />Upload
            front side?
          </div>
        </div>
        <div class="col-12 col-md-6 mobile-margin">
          <div class="image-container text-center">
            <span class="mb-2">The format supported are JPEG, PNG, PDF. Maximum file size 2
              mb</span>

            <div class="img-preview mb-2">
              <img :src="imageFont ? imageFont : verification.ver_image_front + `?token=${token}`" v-if="verification.ver_image_front" />
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
            <label for="input-front-image" class="upload-label" v-if="!verification.ver_image_front">
              Upload
              <input v-if="!verification.ver_image_front" type="file" accept=".png, .jpeg, .jpg" class="input-image" id="input-front-image" name="frontImage"
              @change="getFrontPage" />
            </label>
            <label for="input-front-image" class="upload-label" v-if="verification.ver_image_front">
              Change
              <input v-if="verification.ver_image_front" type="file" accept=".png, .jpeg, .jpg" class="input-image" id="input-front-image" name="frontImage"
              @change="getFrontPage" />
            </label>
          </div>
        </div>
        <div class="col-12 col-md-6 none-padding mobile-margin mobile-help">
          <p>
            <a class="color-blue fw-700 fs-14" data-toggle="collapse" href="#Needver_image_front" role="button"
              aria-expanded="false" aria-controls="collapseExample">
              <span v-if="arr[2].first" @click="arr[2].first = !arr[2].first">
                Need Help?
              </span>
              <span v-else @click="arr[2].first = !arr[2].first">
                Hide Help?
              </span>
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
            <a-icon v-if="verification.ver_image_back" class="color-success mr-2 fs-18 fw-500" type="check" />Upload back
            side?
          </div>
        </div>
        <div class="col-12 col-md-6 mobile-margin">
          <div class="image-container text-center">
            <span class="mb-2">The format supported are JPEG, PNG, PDF. Maximum file size 2
              mb</span>

            <div class="img-preview mb-2">
              <img :src="imageBack ? imageBack : verification.ver_image_back + `?token=${token}`" v-if="verification.ver_image_back" />
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
            <label for="input-back-image" class="upload-label" v-if="!verification.ver_image_back">
              Upload
              <input v-if="!verification.ver_image_back" type="file" accept=".png, .jpeg, .jpg" class="input-image" id="input-back-image" name="backImage"
              @change="getBackPage" />
            </label>
            <label for="input-back-image" class="upload-label" v-if="verification.ver_image_back">
              Change
              <input v-if="verification.ver_image_back" type="file" accept=".png, .jpeg, .jpg" class="input-image" id="input-back-image" name="backImage"
              @change="getBackPage" />
            </label>
          </div>
        </div>
        <div class="col-12 col-md-6 mobile-margin mobile-help">
          <p>
            <a class="color-blue fw-700 fs-14" data-toggle="collapse" href="#Needver_image_back" role="button"
              aria-expanded="false" aria-controls="collapseExample">
              <span v-if="arr[3].first" @click="arr[3].first = !arr[3].first">
                Need Help?
              </span>
              <span v-else @click="arr[3].first = !arr[3].first">
                Hide Help?
              </span>
            </a>
          </p>
          <div data-parent="#accordion" class="collapse" id="Needver_image_back">
            <div class="card card-body bubble">
              Please provide tooltip texts so we can place it here
            </div>
          </div>
        </div>
      </div>

      <!--Community standing-->

      <div class="d-flex justify-content-end">
        <a-button shape="round" type="primary" style="float: right; margin-bottom: 0.5rem; margin-right: -15px"
          class="mt-5" @click="handleSubmitFormOne">
          Submit
        </a-button>
      </div>
    </a-form-model>
  </div>
</template>

<style lang="scss">
@import "@/styles/base/_variables.scss";
</style>
<script>
import FileUploadOne from "@/components/shared/FileUploadOne.vue";
import ApiService from "@/services/api.service";
import axios from "axios";
import vSelect from "vue-select";
import { VERIFICATION } from "../candidate-registration/models/candidate";
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

  created() {
    this.token = JSON.parse(localStorage.getItem("token"));
  },
  mounted() { },
  data() {
    return {
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
      token: "",
      loading: false,
    };
  },

  methods: {
    async saveCandidateUploadDoc() {
      const {
        ver_country,
        ver_document_type,
        ver_image_back,
        ver_image_front,
      } = this.verification;
      const isComplete = Object.values({
        ver_country,
        ver_document_type,
        ver_image_back,
        ver_image_front,
      }).every((x) => x !== undefined && x !== null && x !== "");
      let user = JSON.parse(localStorage.getItem("user"));
      const data = {
        id: user.id,
        is_uplaoded_doc: isComplete ? "1" : "0",
      };
      await this.$store
        .dispatch("saveCandidateUploadDoc", data)
        .then((data) => {
          user.is_uplaoded_doc = isComplete ? "1" : "0";
          // localStorage.setItem(JSON.stringify(user));
          this.$emit("valueChange", true);
          console.log('sss')
        })
        .catch((error) => { });
    },

    changeActivekey(key) {
      this.activeKey = key;
    },
    handleSubmitFormOne() {
      this.$refs.verification.validate((valid) => {
        if (valid) {
          this.activeKey = null;
          const {
            ver_country,
            ver_document_type,
            ver_image_back,
            ver_image_front,
          } = this.verification;
          const isComplete = Object.values({
            ver_country,
            ver_document_type,
            ver_image_back,
            ver_image_front,
          }).every((x) => x !== undefined && x !== null && x !== "");
          if (isComplete) {
            this.saveCandidateUploadDoc();
          } else {
            this.$error({
              title: "Validation Error",
              content: "Please fill all the required fields",
              center: true,
            });
          }
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
    onValueChange(e) {
      this.saveVerificationInfo();
    },
    saveVerificationInfo() {
      const {
        ver_country,
        ver_document_type,
      } = this.verification;
      this.$store
        .dispatch("saveVerificationInfo", {
          ver_country,
          ver_document_type,
        })
        .then((data) => { })
        .catch((error) => { });
    },
    // saveImageVerificationInfo(image) {
    //   this.$store
    //     .dispatch("saveImageVerificationInfo", image)
    //     .then((data) => {
    //       this.verification.ver_image_back =
    //         data.data.data.verification.ver_image_back;
    //       this.verification.ver_image_front =
    //         data.data.data.verification.ver_image_front;
    //     })
    //     .catch((error) => { });
    // },
    async saveImageVerificationInfo(data, folder) {
      this.$emit('turnOnBtnLoader');
      this.loading = true;
      await this.$store.dispatch("uploadImages", { folder: folder, image: data }).then(async (data) => {
        console.log(data, 'image response afer saving image');

        let payload = {};
        if (folder === '_ver_image_front') {
          payload = {
            ver_image_front: process.env.VUE_APP_IMAGE + '/' + Object.values(data)[0]
          };
        } else if (folder === '_ver_image_back') {
          payload = {
            ver_image_back: process.env.VUE_APP_IMAGE + '/' + Object.values(data)[0]
          }
        }
        if (Object.keys(payload).length > 0) {
          await axios.post('v1/candidate/personal-verification-info', payload).then(response => {
            this.$emit('turnOffBtnLoader');
            this.verification.ver_image_back = response.data.data.verification.ver_image_back;
            this.verification.ver_image_front = response.data.data.verification.ver_image_front;

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
      if (file["size"] > 2111775) {
        this.$error({
          title: "Validation Error",
          content: "Image size can't be more than 2 mb",
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

    async onChangeCountry(e) {
      this.saveVerificationInfo();
    },
    clearImg(action) {
      switch (action) {
        case "back":
          this.imageBack = "";
          this.verification.ver_image_back = "";
          break;
        case "font":
          this.imageFont = "";
          this.verification.ver_image_front = "";
          break;
      }
    },
  },
};
</script>


<style scoped lang="scss">
@import "@/styles/base/_variables.scss";

.section-heading {
  text-align: center;
  color: $color-brand;

  h3 {
    color: $color-brand;
  }

  p {
    font-size: 16px;
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
  height: 135px;;
}

input[type="file"] {
  cursor: pointer;
  width: 200px;
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

#checkIcon {
  height: 18px;
  margin-right: 5px;
}

.add-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  svg {
    width: 60px;
    margin-top: 10px;
  }
}

input[type="file"]::-webkit-file-upload-button {
  visibility: hidden;
}

.close-icon {
  display: grid;
  place-content: center;
  position: absolute;
  right: 3.5rem;
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
