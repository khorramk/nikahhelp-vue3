<template>
  <div id="accordion" class="verificationInfo rounded">
    <div class="section-heading heading-text">
      <h3>Verification Information</h3>
      <!-- <p>Your Verification Information</p> -->
    </div>
    <div class="verification-content">
      <a-form v-if="verification" ref="verification" :model="verification" :rules="rules" class="form-ma">
        <div class="verification-header my-2 text-black-50">
          <!-- <p>
            To keep your account safe, we need to verify your identity. This is
            a legal requirement that help us to keep your account secure.
          </p>
          <p>
            We accept photo/scans of a driving lecense, passport, national ID
            card or residense permit issued in European Economic Are (EEA)
          </p> -->

          <p>We may request this information anytime in case we need to do ID checks.</p>
          <ul>
            <li class="flex-start-center">
              <img src="@/assets/Icons/tick 2.svg" alt="icon" id="checkIcon" />
              Submit a valid, current photo ID with an expiry date
            </li>
            <li class="flex-start-center py-2">
              <img src="@/assets/Icons/tick 2.svg" alt="icon" id="checkIcon" />
              Show the full document (all four corners should be visible)
            </li>
            <li class="flex-start-center">
              <img src="@/assets/Icons/tick 2.svg" alt="icon" id="checkIcon" />
              Use a colour image that a is clear and easy to read
            </li>
          </ul>
        </div>
        <hr />

        <div class="row mt-3 border-bottom">
          <div class="col-12 col-md-6 none-padding">
            <div class="mb-2 font-weight-bold">
               <CheckOutlined v-if="verification.ver_country" class="color-success mr-2 fs-18 fw-500" />Country
            </div>
          </div>
          <div class="col-12 col-md-6 mobile-margin">
            <div class="row">
              <div class="col-12 col-md-6">
                <a-form-item ref="ver_country" name="ver_country">
                  <v-select :clearable="false" class="style-chooser" @input="onChangeCountry" id="ver_country"
                    placeholder="Country" v-model="verification.ver_country" label="name" :reduce="(option) => option.id"
                    :options="representativeDetails.countries"><template #open-indicator>
                      <DownOutlined /> </template></v-select>
                </a-form-item>
              </div>
              <div class="col-12 col-md-6">
                <a-form-item ref="ver_city" name="ver_city">
                  <v-select :clearable="false" class="style-chooser" @input="onValueChange" id="ver_city"
                    placeholder="City" :reduce="(option) => option.name" v-model="verification.ver_city" label="name"
                    :options="verification.cities"><template #open-indicator>
                      <DownOutlined /> </template></v-select>
                </a-form-item>
              </div>
            </div>
          </div>
          <div class="col-12 none-padding mobile-margin mobile-help">
            <p>
              <a class="color-blue fw-700 fs-14" data-toggle="collapse" href="#Needver_country" role="button"
                aria-expanded="false" aria-controls="collapseExample">
                <span v-if="arr[0].first" @click="arr[0].first = !arr[0].first">
                  Need Help?
                </span>
                <span v-else @click="arr[0].first = !arr[0].first">
                  Hide Help?
                </span>
              </a>
            </p>
            <div data-parent="#accordion" class="collapse" id="Needver_country">
              <div class="card card-body bubble">
                Please provide tooltip texts so we can place it here
              </div>
            </div>
          </div>
        </div>

        <div class="row pt-3 pb-2 border-bottom">
          <div class="col-12 col-md-6 none-padding">
            <div class="mb-2 font-weight-bold">
              <CheckOutlined v-if="verification.ver_document_type" class="color-success mr-2 fs-18 fw-500" />Document type?
            </div>
          </div>
          <div class="col-12 col-md-6 mobile-margin">
            <v-select :clearable="false" class="style-chooser" @input="onValueChange" id="ver_document_type"
              placeholder="Document type" :reduce="(option) => option.value" v-model="verification.ver_document_type"
              label="name" :options="[
                { name: 'Passport', value: 'Passport' },
                { name: 'Nation ID', value: 'Nation ID' },
              ]"><template #open-indicator> <DownOutlined /> </template></v-select>
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

        <div class="row pt-3 pb-2 border-bottom">
          <div class="col-12 col-md-6 none-padding">
            <div class="mb-2 font-weight-bold">
              <CheckOutlined v-if="verification.ver_document_frontside" class="color-success mr-2 fs-18 fw-500" />Upload front side?
            </div>
          </div>
          <div class="col-12 col-md-6 mobile-margin">
            <div class="image-container text-center">
              <span class="mb-2">The format supported are JPEG, PNG, PDF. Maximum file size 2
                mb</span>
              <span @click="clearImg('font')" class="close-icon mt-2" v-if="verification.ver_document_frontside"><img
                  src="@/assets/icon/close.svg" alt="img" /></span>
              <div class="img-preview mb-2">
                <img :src="imageFont ? imageFont : verification.ver_document_frontside + `?token=${token}`
                  " width="180" height="200" v-if="verification.ver_document_frontside" />
                <div class="mt-3">Front Page</div>
                <div class="mt-4" v-if="!verification.ver_document_frontside">
                  <PlusCircleOutlined style="font-size: 80px; color: #aaa" />
                </div>
              </div>
              <input type="file" class="input-image" name="avatar" @change="getFrontPage" />
            </div>
          </div>
          <div class="col-12 none-padding mobile-margin mobile-help">
            <p>
              <a class="color-blue fw-700 fs-14" data-toggle="collapse" href="#Needver_document_frontside" role="button"
                aria-expanded="false" aria-controls="collapseExample">
                <span v-if="arr[2].first" @click="arr[2].first = !arr[2].first">
                  Need Help?
                </span>
                <span v-else @click="arr[2].first = !arr[2].first">
                  Hide Help?
                </span>
              </a>
            </p>
            <div data-parent="#accordion" class="collapse" id="Needver_document_frontside">
              <div class="card card-body bubble">
                Please provide tooltip texts so we can place it here
              </div>
            </div>
          </div>
        </div>

        <div class="row pt-3 pb-2 border-bottom">
          <div class="col-12 col-md-6 none-padding">
            <div class="mb-2 font-weight-bold">
              <CheckOutlined v-if="verification.ver_document_backside" class="color-success mr-2 fs-18 fw-500" />Upload back side?
            </div>
          </div>
          <div class="col-12 col-md-6 mobile-margin">
            <div class="image-container text-center">
              <span class="mb-2">The format supported are JPEG, PNG, PDF. Maximum file size 2
                mb</span>
              <span @click="clearImg('back')" class="close-icon mt-2" v-if="verification.ver_document_backside"><img
                  src="@/assets/icon/close.svg" alt="img" /></span>
              <div class="img-preview mb-2">
                <img :src="imageBack ? imageBack : verification.ver_document_backside + `?token=${token}`
                  " width="180" height="200" v-if="verification.ver_document_backside" />

                <div class="mt-3">Back Page</div>
                <div class="mt-4" v-if="!verification.ver_document_backside">
                  <PlusCircleOutlined style="font-size: 80px; color: #aaa" />
                </div>
              </div>
              <input type="file" class="input-image" name="avatar" @change="getBackPage" />
            </div>
          </div>
          <div class="col-12 none-padding mobile-margin mobile-help">
            <p>
              <a class="color-blue fw-700 fs-14" data-toggle="collapse" href="#Needver_document_backside" role="button"
                aria-expanded="false" aria-controls="collapseExample">
                <span v-if="arr[3].first" @click="arr[3].first = !arr[3].first">
                  Need Help?
                </span>
                <span v-else @click="arr[3].first = !arr[3].first">
                  Hide Help?
                </span>
              </a>
            </p>
            <div data-parent="#accordion" class="collapse" id="Needver_document_backside">
              <div class="card card-body bubble">
                Please provide tooltip texts so we can place it here
              </div>
            </div>
          </div>
        </div>

        <div class="row pt-3 pb-2">
          <div class="col-12 col-md-6 none-padding">
            <div class="mb-2 font-weight-bold">
              <CheckOutlined v-if="verification.ver_recommender_title" class="color-success mr-2 fs-18 fw-500" />Person of community standing who know you?
            </div>
          </div>
          <div class="col-12 col-md-6 mobile-margin">
            <a-form-item ref="ver_recommender_title" name="ver_recommender_title">
              <a-input v-model="verification.ver_recommender_title" class="w-100" placeholder="Title"
                @blur="onValueChange" />
            </a-form-item>

            <div class="row">
              <div class="col-6">
                <a-form-item ref="ver_recommender_first_name" name="ver_recommender_first_name">
                  <a-input v-model="verification.ver_recommender_first_name" class="w-100 rounded-right"
                    placeholder="First Name" @blur="onValueChange" />
                </a-form-item>
              </div>
              <div class="col-6">
                <a-form-item ref="ver_recommender_last_name" name="ver_recommender_last_name">
                  <a-input v-model="verification.ver_recommender_last_name" class="w-100 rounded-left"
                    placeholder="Last Name" @blur="onValueChange" />
                </a-form-item>
              </div>
            </div>

            <a-form-item ref="ver_recommender_occupation" name="ver_recommender_occupation">
              <v-select :clearable="false" class="style-chooser" @input="onValueChange" id="ver_recommender_occupation"
                placeholder="Occupation" v-model="verification.ver_recommender_occupation" label="name"
                :reduce="(option) => option.name" :options="representativeDetails.occupations"><template #open-indicator>
                  <DownOutlined /> </template></v-select>
            </a-form-item>

            <a-form-item class="mt-2" ref="ver_recommender_address" name="ver_recommender_address">
              <a-textarea placeholder="Address" :rows="4" v-model="verification.ver_recommender_address"
                @blur="onValueChange" />
            </a-form-item>

            <a-form-item ref="ver_recommender_mobile_no" name="ver_recommender_mobile_no">
              <a-input class="w-100" id="inputNumber" placeholder="Mobile number"
                v-model="verification.ver_recommender_mobile_no" @blur="onValueChange" />
            </a-form-item>
          </div>
          <div class="col-12 col-md-6 none-padding mobile-margin mobile-help">
            <p>
              <a class="color-blue fw-700 fs-14" data-toggle="collapse" href="#Needver_recommender_title" role="button"
                aria-expanded="false" aria-controls="collapseExample">
                <span v-if="arr[4].first" @click="arr[4].first = !arr[4].first">
                  Need Help?
                </span>
                <span v-else @click="arr[4].first = !arr[4].first">
                  Hide Help?
                </span>
              </a>
            </p>
            <div data-parent="#accordion" class="collapse" id="Needver_recommender_title">
              <div class="card card-body bubble">
                Please provide tooltip texts so we can place it here
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-end">
          <a-button shape="round" type="primary" style="float: right; margin-bottom: 0.5rem; margin-right: -15px"
            class="mt-5" @click="handleSubmitFormOne">
            Submit
          </a-button>
        </div>
      </a-form>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/styles/base/_variables.scss";
</style>
<script>
import FileUploadOne from "@/components/shared/FileUploadOne.vue";
import ApiService from "@/services/api.service";
import vSelect from "vue-select";
import { VERIFICATION_RULES } from "../representative-registration/models/representative";

import {
  CheckOutlined,
  DownOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons-vue";

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

    CheckOutlined,
    DownOutlined,
    PlusCircleOutlined,
  },

  created() {
    // console.log(this.handleChangeFromProp)
    console.log(this.repData);
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
    };
  },

  methods: {
    changeActivekey(key) {
      this.activeKey = key;
    },
    async saveRepresentativeUploadDoc() {
      const {
        ver_country,
        ver_document_type,
        ver_document_backside,
        ver_document_frontside,
      } = this.verification;
      const isComplete = Object.values({
        ver_country,
        ver_document_type,
        ver_document_backside,
        ver_document_frontside,
      }).every((x) => x !== undefined && x !== null && x !== "");
      let user = JSON.parse(localStorage.getItem("user"));
      const data = {
        id: user.id,
        is_uplaoded_doc: isComplete ? "1" : "0",
      };
      await this.$store
        .dispatch("saveRepresentativeUploadDoc", data)
        .then((data) => {
          user.is_uplaoded_doc = isComplete ? "1" : "0";
          this.$emit("valueChange", true);

        })
        .catch((error) => { });
    },
    handleSubmitFormOne() {
      this.$refs.verification.validate((valid) => {
        if (valid) {
          this.updateUserVerifyOrReject();
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
    onValueChange(e) {
      this.saveVerificationInfo();
    },
    saveVerificationInfo() {
      const {

        ver_country,
        ver_document_type,
        ver_recommender_address,
        ver_recommender_first_name,
        ver_recommender_last_name,
        ver_recommender_occupation,
        ver_recommender_title,
        ver_recommender_mobile_no,
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
        })
        .then((data) => { })
        .catch((error) => { });
    },
    // saveImageVerificationInfo(image) {
    //   this.$store
    //     .dispatch("saveRepresentativeImageVerificationInfo", image)
    //     .then((data) => {
    //       this.verification.ver_document_backside =
    //         data.data.data.verification.ver_document_backside;
    //       this.verification.ver_document_frontside =
    //         data.data.data.verification.ver_document_frontside;
    //     })
    //     .catch((error) => {});
    // },
    async saveImageVerificationInfo(data, folder) {
      this.$emit('turnOnBtnLoader');
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
          await axios.post('v1/representative/image/upload', payload).then(response => {
            this.$emit('turnOffBtnLoader');
            this.verification.ver_image_back = response.data.data.verification.ver_image_back;
            this.verification.ver_image_front = response.data.data.verification.ver_image_front;

          }).catch(error => {
            console.log(error);
          });
        }
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

      this.verification.ver_document_frontside = e.target.files[0];
      let formData = new FormData();
      formData.append("image", this.verification.ver_document_frontside);
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
      this.verification.ver_document_backside = e.target.files[0];
      let formData = new FormData();
      formData.append("image", this.verification.ver_document_backside);
      this.saveImageVerificationInfo(formData, '_ver_image_back');

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.imageBack = e.target.result;
      };
    },

    async onChangeCountry(e) {
      const res = await ApiService.get(`v1/utilities/cities/${e}`);
      if (res.status === 200) {
        console.log("this.verification", this.verification);
        this.verification.cities = [];
        this.verification.cities.push(...res.data.data);
      }
      this.saveVerificationInfo();
    },
    clearImg(action) {
      switch (action) {
        case "back":
          this.backPageSrc = "";
          break;
        case "font":
          this.frontPageSrc = "";
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
  right: 3.5rem;
  top: 2rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: white;
  z-index: 1;

  @media (min-width: 768px) {
    right: 2.5rem;
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
