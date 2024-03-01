<template>
  <div class="class">
    <div v-if="imageModel" class="upload-profile-image">
      <Loader :isLoading="loading" text="Uploading"/>

      <a-collapse :default-active-key="1" :bordered="false" expand-icon-position="right">
        <template #expandIcon="props">
          <a-icon type="caret-down" :rotate="props.isActive ? 180 : 0" />
        </template>
        <a-collapse-panel key="1" header="1. Upload Images">
          <h5 class="text-left mt-2">Upload your Image</h5>
          <div class="instruction text-black-70">
            <p>
              * Please upload 2 images.. The first is for your avatar. The second
              image is for identification purpose as necessary in line with
              MatrimonyAsssit terms and conditions. The pictures need to be your
              own current image and in colour.
            </p>
            <p>* The maximum size of each image is 4MB.</p>
          </div>

          <!-- Image Upload Input -->
          <div class="image-and-settings">
            <form class="form-ma">
              <a-row type="flex" align="top">
                <a-col class="form-item py-3" :span="24">
                  <a-row type="flex" align="top" class="justify-content-around">
                    <a-col>
                      <!-- Avatar Image -->
                      <div class="col-md-4 flex text-center">
                        <div>
                          <div class="img-preview mb-2">
                            <img 
                              v-viewer="{toolbar: false, title: false, navbar: false}"
                              :src=" avatarSrc ? avatarSrc : imageModel.per_avatar_url" 
                              class="contain" 
                              v-if="imageModel.per_avatar_url" 
                            />
                            <div class="mt-3" v-if="!imageModel.per_avatar_url">Avatar Image</div>
                            <div
                              class="add-icon"
                              v-if="!imageModel.per_avatar_url"
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
                            v-if="!imageModel.per_avatar_url"
                            type="file"
                            class="input-image"
                            name="avatar"
                            @change="getAvatar"
                          /> -->
                          <label for="input-avatar-image" class="upload-label" v-if="!imageModel.per_avatar_url" @click="showAvatarSelectionMenu=true">
                            Upload
                            <!-- <input v-if="!imageModel.per_avatar_url" type="file" class="input-image" id="input-avatar-image" name="avatar"
                            @change="getAvatar" /> -->
                          </label>
                          <a-button class="upload-label" v-if="imageModel.per_avatar_url"
                            @click="showAvatarSelectionMenu=true"
                          >
                            Change
                          </a-button>
                          <a-modal 
                            :visible="showAvatarSelectionMenu" 
                            :closable="true"
                            title="Select Avatar" 
                            @ok="showAvatarSelectionMenu = false" 
                            @cancel="showAvatarSelectionMenu = false" 
                            :ok-button-props="{ disabled: true }"
                            :cancel-button-props="{ disabled: true }"
                          >
                            <div class="d-flex flex-wrap">
                              <div class="" v-for="image in images" :key="image.pathShort">
                                <img 
                                  :ref="image.pathShort.substring(2, image.pathShort.length-4)" 
                                  class="circle avatar-contain" 
                                  :src="require(`@/assets/avatar/${image.pathShort.substring(2, image.pathShort.length)}`)"
                                  @click="avatarNo = image.pathShort.substring(2, image.pathShort.length-4); setAvatar(avatarNo)"
                                >
                              </div>
                              
                            </div>

                            <template slot="footer">
                              <a-button key="back" shape="round" @click="showAvatarSelectionMenu=false">
                              Cancel
                              </a-button>
                              <a-button key="submit" type="primary" shape="round" @click="showAvatarSelectionMenu = false; saveAvatar(avatarNo)">
                              Ok
                              </a-button>
                            </template>
                          </a-modal>
                        </div>
                      </div>
                    </a-col>
                    <a-col>
                      <!-- Main Image -->
                      <div class="col-md-4 flex text-center">
                        <div>
                          <div class="img-preview mb-2">
                            <img v-viewer="{toolbar: false, title: false, navbar: false}"
                              :src="mainImageSrc ? mainImageSrc : imageModel.per_main_image_url + `?token=${token}`" 
                              class="contain" 
                              v-if="imageModel.per_main_image_url" 
                            />
                            <div class="mt-3" v-if="!imageModel.per_main_image_url">Main Profile Image</div>
                            <div
                              class="add-icon"
                              v-if="!imageModel.per_main_image_url"
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
                          
                          <label for="input-main-image" class="upload-label" v-if="!imageModel.per_main_image_url">
                            Upload
                            <input v-if="!imageModel.per_main_image_url" type="file" accept=".png, .jpeg, .jpg" class="input-image" id="input-main-image" name="mainImage"
                            @change="getMainImage" />
                          </label>
                          <label for="input-main-image" class="upload-label" v-if="imageModel.per_main_image_url">
                            Change
                            <input v-if="imageModel.per_main_image_url" type="file" accept=".png, .jpeg, .jpg" class="input-image" id="input-main-image" name="mainImage"
                            @change="getMainImage" />
                          </label>
                        </div>
                      </div>
                    </a-col>
                  </a-row>
                </a-col>
              </a-row>
            </form>
          </div>
          <!-- <button class="btn btn-info" @click="saveImages">Save</button> -->

          <!-- Previous Image sharing setting starts here -->
          <!-- <div class="share-settings mt-5">
      <div class="share-settings">
        <h5 class="text-center share-text">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="#3a3091"
            class="bi bi-gear-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"
            />
          </svg>
          Image Sharing Settings
        </h5>
        <div class="flex permission mt-5">
          <a-switch
              v-model="imageModel.anybody_can_see"
              @change="onConfirmationSwitchChnaged1"
          >
            <a-icon slot="checkedChildren" type="check" />
            <a-icon slot="unCheckedChildren" type="close" />
          </a-switch>
          <span class="ml-4">
            I don't want to share my images with anyone at this moment
          </span>
        </div>
        <div class="flex permission mt-3">
          <a-switch
              v-model="imageModel.only_team_can_see"
              :disabled="imageModel.anybody_can_see"
              @change="onConfirmationSwitchChnaged2"
          >
            <a-icon slot="checkedChildren" type="check" />
            <a-icon slot="unCheckedChildren" type="close" />
          </a-switch>
          <span class="ml-4">
            I would like to share all my images with my team
          </span>
        </div>
        <div class="flex permission mt-3">
          <a-switch
              v-model="imageModel.team_connection_can_see"
              :disabled="imageModel.anybody_can_see"
              @change="onConfirmationSwitchChnaged3"
          >
            <a-icon slot="checkedChildren" type="check" />
            <a-icon slot="unCheckedChildren" type="close" />
          </a-switch>
          <span class="ml-4">
            I would like to share all my images with connected team(s)
          </span>
        </div>
      </div>
     
    </div> -->
          <!-- <a-button
      shape="round"
      type="primary"
      style="float: right"
      class="mt-3 btn btn-primary"
      @click="saveImages"
    >
      Save &#38; Continue
    </a-button> -->
        </a-collapse-panel>
      </a-collapse>

    </div>
  </div>

</template>

<script>
import Loader from '../../plugins/loader/loader.vue';
import axios from "axios";
export default {
  name: "ImageUpload",

  components: { Loader },

  props: {
    imageModel: {
      type: Object,
    },
  },

  data() {
    return {
      src: "",
      avatar: "",
      avatarSrc: "",
      mainImage: "",
      mainImageSrc: "",
      images: [],
      additionalImage: "",
      showAvatarSelectionMenu: false,
      avatarNo: 0,
      additionalImageSrc: "",
      loading: false,
      token: "",
    };
  },

  created() {
    this.importAll(require.context('../../assets/avatar/', true, /\.png$/));
    this.getToken();
  },

  methods: {
    getToken() {
      this.token = JSON.parse(localStorage.getItem("token"));
    },
    importAll(r) {
      r.keys().forEach(key => (this.images.push({ pathShort: key })));
      // sort this.images
      this.images.sort((a, b) => {
        let aNum = parseInt(a.pathShort.substring(2, a.pathShort.length-4));
        let bNum = parseInt(b.pathShort.substring(2, b.pathShort.length-4));
        return aNum - bNum;
      });
      console.log(this.images);
    },
    // this bit code is for deleting image -- not used anymore -- just for reference
    // async deleteImage(data) {
    //   this.$emit('disableNextBtn');
    //   await this.$store.dispatch("deleteRepImage", data);
    //   let payload = {
    //     folder : ""
    //   };
    //   if(data == 1) {
    //     payload.folder = "_per_main_image_url"
    //   } else if(data == 0) {
    //     payload.folder = "_per_avatar_url"
    //   }
    //   await this.$store.dispatch("deleteImageDir", payload);
    //   this.$emit("valueChange", {
    //     value: {
    //       ...this.imageModel,
    //     },
    //     current: 1,
    //   });
    // },
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
    async getAvatar(e) {
      this.loading = true;
      // let file = e.target.files[0];
      let file = e;
      console.log(file);
      if (!this.imageSizeCheck(file)) {
        file = "";
        return;
      }
      this.imageModel.avatar_image_url = file;
      let formData = new FormData();
      formData.append("image", this.imageModel.avatar_image_url);
      // this.saveImage(formData, '_per_avatar_url');

      await axios.post('v1/avatar/image-upload', formData).then(async response => {
        console.log(response.data);
        let payload = {
          per_avatar_url: process.env.VUE_APP_IMAGE.slice(0, -3) + response.data
        }
        await axios.post('v1/representative/image/upload', payload).then(response => {
          console.log(response, payload.per_avatar_url, 'from representative image upload');

          this.$emit("valueChange", {
            value: {
              per_avatar_url: payload.per_avatar_url ? payload.per_avatar_url : this.imageModel.per_avatar_url,
              per_main_image_url: this.imageModel.per_main_image_url,
            },
            current: 1,
          });
        }).catch(error => {
          console.log(error);
        });

      }).catch(error => {
        console.log(error);
      });

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.avatarSrc = e.target.result;
        this.loading = false;
      };
    },
    async setAvatar(avatarNo) {
      // console.log(this.$refs, 'this.refs', this.$refs.length);
      if (avatarNo == 0) {
        return;
      }
      for(let i=0; i < this.images.length; i++) {
        this.$refs[i+1][0].classList.remove('selected');
        // console.log(this.$refs[i+1], 'this.refs[i]');
      }
      this.$refs[avatarNo][0].classList.add('selected');
      // this.imageModel.avatar_image_url = avatarNo;
      // const 
      this.avatarNo = avatarNo;
    },
    async saveAvatar() {
      if(this.avatarNo == 0) {
        return;
      }
      let avatarImage = require(`@/assets/avatar/${this.avatarNo}.png`); 
      let avatarImgFile;
      await this.urltoFile(avatarImage, `avatar${this.avatarNo}.png`)
          .then(function(file){
              avatarImgFile = file;
          })
      this.getAvatar(avatarImgFile);
    },
    urltoFile(url, filename, mimeType){
      mimeType = mimeType || (url.match(/^data:([^;]+);/)||'')[1];
      return (fetch(url)
          .then(function(res){return res.arrayBuffer();})
          .then(function(buf){return new File([buf], filename, {type:mimeType});})
      );
    },
    getMainImage(e) {
      let file = e.target.files[0];
      if (!this.imageSizeCheck(file)) {
        file = "";
        return;
      }
      this.imageModel.per_main_image_url = e.target.files[0];
      let formData = new FormData();
      formData.append("image", this.imageModel.per_main_image_url);
      this.saveImages(formData, '_per_main_image_url');
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.mainImageSrc = e.target.result;
      };
      console.log(this.mainImageSrc);
    },
    onConfirmationSwitchChnaged1(checked) {
      console.log(checked);
      if (checked) {
        // this.imageModel.only_team_can_see = false;
        this.imageModel.team_connection_can_see = false;
      }
      checked == true
        ? (this.imageModel.anybody_can_see = 1)
        : (this.imageModel.anybody_can_see = 0);
      this.saveRepresentativeImageCondition({
        anybody_can_see: this.imageModel.anybody_can_see,
      });
    },
    // onConfirmationSwitchChnaged2(checked) {
    //   console.log(checked);
    //   checked == true
    //     ? (this.imageModel.only_team_can_see = 1)
    //     : (this.imageModel.only_team_can_see = 0);
    //   this.saveRepresentativeImageCondition({
    //     only_team_can_see: this.imageModel.only_team_can_see,
    //   });
    // },
    onConfirmationSwitchChnaged3(checked) {
      console.log(checked);
      checked == true
        ? (this.imageModel.team_connection_can_see = 1)
        : (this.imageModel.team_connection_can_see = 0);

      this.saveRepresentativeImageCondition({
        team_connection_can_see: this.imageModel.team_connection_can_see,
      });
    },

    getBase64(img, callback) {
      const reader = new FileReader();
      reader.addEventListener("load", () => callback(reader.result));
      reader.readAsDataURL(img);
    },

    async saveRepresentativeImageCondition(data) {
      await this.$store
        .dispatch("saveRepresentativeImageCondition", data)
        .then((data) => { })
        .catch((error) => { });
    },
    async saveImages(data, folder) {
      this.$emit('turnOnBtnLoader');
      this.loading = true;
      await this.$store
        .dispatch("saveRepresentativeImage", {folder: folder, image: data})
        .then(async (data) => {
          console.log(data);
          let payload = {};
          if(folder === '_per_main_image_url') {
            payload = {
              per_main_image_url: process.env.VUE_APP_IMAGE + '/' + Object.values(data)[0]
            };
          } else if(folder === '_per_avatar_url') {
            payload = {
              per_avatar_url: process.env.VUE_APP_IMAGE + '/' + Object.values(data)[0]
            }
          }
          if(Object.keys(payload).length > 0) {
            await axios.post('v1/representative/image/upload', payload).then(response => {
              console.log(response);
            }).catch(error => {
              console.log(error);
            });
          }

            let user = JSON.parse(localStorage.getItem("user"));
            if (user) {
              user.per_main_image_url = folder === '_per_main_image_url' ? process.env.VUE_APP_IMAGE + '/' + Object.values(data)[0] : user.per_main_image_url;
              localStorage.removeItem("user");
              localStorage.setItem("user", JSON.stringify(user));
            }

              
      

            this.$emit("valueChange", {
              value: {
                per_avatar_url: folder === '_per_avatar_url' ? process.env.VUE_APP_IMAGE + '/' + Object.values(data)[0] : this.imageModel.per_avatar_url,
                per_main_image_url: folder === '_per_main_image_url' ? process.env.VUE_APP_IMAGE + '/' + Object.values(data)[0] : this.imageModel.per_main_image_url
              },
              current: 1,
            });
          
          // if (data.status && data.status == "FAIL") {
          //   const errorMessage = JSON.stringify(data.data.data);
          //   this.showError(errorMessage);
          //   this.loadingButton = false;
          // }
          this.loading = false;
        }).catch((error) => {
          this.loading = false;
          this.loadingButton = false;
          console.log(error);
        });
      this.$emit('turnOffBtnLoader');
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.circle {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: 3px solid rgb(200, 189, 189);
  margin: 5px;
}

.selected {
  border: 3px solid $bg-secondary !important;
}
.contain {
  // height: 123px;
  width: 220px;
  object-fit: cover;
}
.avatar-contain {
  object-fit: cover;
}

.upload-profile-image {
  .section-heading {
    text-align: center;
    color: $color-brand;

    h5 {
      color: $color-brand;
      margin-left: 35px;
      margin-top: 10px;
    }

    p {
      font-size: 14px;
    }
  }

  .instruction {
    text-align: left;
    border: 1px solid $color-secondary;
    padding: 10px;
    border-radius: 5px;
    //width: 90%;
    margin: 0 auto 10px;
  }

  .image-and-settings {
    padding: 15px;
    background: #f6f5fb;

    .form-ma {
      .add-icon {
        svg {
          width: 60px;
          margin-top: 10px;
        }
      }
    }

    .share-settings {
      border: 1px solid $color-secondary;
      padding: 50px 15px;
      border-radius: 5px;
      position: relative;
      margin-top: 50px;

      .share-text {
        color: #3b3194;
        font-size: 14px;
        font-weight: bold;
        position: absolute;
        top: -25px;
        left: 50%;
        transform: translate(-50%, 0);
        background: #f6f5fb;
        padding: 0 20px;

        @media (min-width: 768px) {
          font-size: 18px;
        }

        @media (min-width: 1400px) {
          font-size: 22px;
        }

        svg {
          margin-right: 9px;
        }
      }
    }
  }

  img {
    border-radius: 5px;
    height: 100%;
  }

  .img-preview {
    width: 200px;
    height: 135px;
    border: 1px solid $color-secondary;
    border-radius: 5px;
    margin: 0px auto;
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

  //input[type="file"]::-webkit-file-upload-button {
  //  visibility: hidden;
  //}

  .btn-primary {
    margin-bottom: 5px;
  }
}

.permission {
  span {
    font-size: 14px;

    @media (min-width: 768px) {
      font-size: 16px;
    }

    @media (min-width: 1400px) {
      font-size: 18px;
    }
  }
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
</style>
