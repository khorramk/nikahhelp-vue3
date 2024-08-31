<template>
  <div class="position-absolute add-member-box" :class="{'from-data-card': from === 'details-card'}">
    <div class="member-box position-relative">
      <div class="cross-button-box mr-2 mt-2 d-flex justify-content-center align-items-center cursor-pointer" @click="toggleToParent()">&#10006;</div>

      <div class="d-flex px-4">
        <h4 class="fs-14 text-white invite-txt">Send team invitation</h4>
      </div>

      <div class="px-4 mt-2 position-relative">
        <div class="position-relative flex flex-column">
          <label for="" style="color:#fff; margin: 0px 2px;">Role:</label>
          <a-tooltip
              placement="top"
              title="Member role will"
          >
            <a-select
                placeholder="Role"
                class="fs-14 mb-2"
                v-model:value="invitationObject.role"
                :disabled="invitationObject.add_as_a == 'Candidate'"
            >
              <a-select-option value="Admin"> Admin </a-select-option>
              <a-select-option value="Member"> Member </a-select-option>
            </a-select>
          </a-tooltip>

          <label for="" style="color:#fff; margin: 0px 2px;">Add as a:</label>
          <a-tooltip
              placement="top"
              title="Add as a"
          >
            <a-select
                placeholder="Add as a"
                class="fs-14 mb-2"
                v-model:value="invitationObject.add_as_a"
                @change="changedAddAs()"
            >
              <a-select-option value="Candidate" :disabled="ifHasCandidate()"> Candidate </a-select-option>
              <a-select-option value="Representative"> Representative </a-select-option>
            </a-select>
          </a-tooltip>

          <label for="" style="color:#fff; margin: 0px 2px;" v-if="invitationObject.add_as_a != 'Candidate'">Relationship:</label>
          <a-tooltip
              placement="top"
              title="Relationship with candidate is"
          >
            <a-select
                placeholder="Relationship"
                class="fs-14"
                v-model:value="invitationObject.relationship"
                v-if="invitationObject.add_as_a != 'Candidate'"
            >
              <a-select-option v-for="(relation, index) in relationships" :key="index" :value="relation"> {{ relation }} </a-select-option>
            </a-select>
          </a-tooltip>
          
          <button class="btn invitation-link-btn btn-block btn-sm py-2 mb-2 mt-4" @click="generateLink" v-if="!showUserBox" :disabled="isLoading || isSuccess">
            <LoadingOutlined class="mr-2" v-if="isLoading" /> Generate Invitation Link
          </button>

          <p class="text-center text-white m-0" v-if="!showUserBox">or</p>

          <button class="btn attach-link-btn btn-sm py-2 mb-2 mt-2" @click="showUserBox = true" v-if="!showUserBox">Attach a registered user</button>
        </div>

        <div class="mt-1" v-if="showUserBox">
          <label for="" style="color:#fff; margin: 0px 2px;">Email:</label>

          <a-input ref="userNameInput" class="mt-1" placeholder="Search email or user ID" v-model:value="user_email" @input="searchMember()" medium>
            <LoadingOutlined slot="suffix" style="color: rgba(0,0,0,.45)" v-if="requestSent != 0" />
            <CloseOutlined slot="suffix" style="color: rgba(0,0,0,.45); cursor:pointer;" @click="showUserBox=false; removeAttachedUser();" v-if="requestSent == 0" />
          </a-input>
          
        </div>

      </div>
      <div class="suggestion-box mt-4 px-4" :class="{'details-suggestion-card': from === 'details-card'}">
        <div class="user d-flex position-relative cursor-pointer mb-2" v-if="userObj && userObj.user" @click="attached=!attached">
          <img :src="userObj.user.account_type == 1 ? userObj.candidate_information.personal.per_main_image_url + `?token=${token}` : userObj.representative_information.image_upload.per_main_image_url +  `?token=${token}`" alt="avatar" class="user-avatar" />

          <div class="d-flex justify-content-between align-items-center ml-2">
            <div class="short-info">
              <h4 class="fs-14 text-white fw-700">{{ userObj.user && userObj.user.full_name ? userObj.user.full_name : 'N/A' }}</h4>
              <h4 class="fs-12 text-white fw-500 candidate-type">Profile type: {{ userObj.user ? profileType[userObj.user.account_type] : 'N/A' }}</h4>
            </div>
            <button class="btn btn-sent position-absolute text-white cursor-default" v-if="userObj.invitation_status == 2">Joined</button>
            <button class="btn btn-sent btn-outline-secondary position-absolute text-white cursor-default" v-if="userObj.invitation_status == 1">Sent</button>
            <a-checkbox class="position-absolute btn-sent" @change="attachUser" v-model:checked="attached" v-if="userObj.invitation_status == 0"></a-checkbox>
          </div>

        </div>
        
        <button class="btn invitation-link-btn btn-block btn-sm py-2" @click="generateLink" v-if="showUserBox" :disabled="isLoading || isSuccess || !attached">
          <LoadingOutlined class="mr-2" v-if="isLoading" /> Generate Invitation Link
        </button>
      </div>
      <div class="link-box px-4 position-absolute w-full" :class="{'link-box-empty': !showUserBox}">
        <div class="w-full mt-2">
          <input type="text" class="form-control invite-link text-white fs-12 py-5" :class="{'animate-flicker' : flicker}" id="copyInput" :value="invitationObject.visible_invitation_link" disabled />
          <button class="copy-button position-absolute px-2" @click="copyToken">{{ copyBtnText }}</button>
        </div>
        <p class="fs-10 text-white mt-2">Send this link through email or any messaging platform <br> Only one member can use this link once</p>
      </div>
    </div>
  </div>
</template>

<script>
import ApiService from '@/services/api.service';
import Notification from "@/common/notification.js";

import {
  LoadingOutlined,
  CloseOutlined
} from '@ant-design/icons-vue';

export default {
  name: "InviteMember",
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
    ping: function (data) {
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    }
  },
  props: ['team', 'from'],
  components: {
    LoadingOutlined,
    CloseOutlined
  },
  data() {
    return {
      relationships: ['Father', 'Mother', 'Brother', 'Sister', 'Grand Father', 'Grand Mother', 'Brother-in-law', 'Sister-in-paw'],
      user_email: '',
      profileType: ['N/A', 'Candidate', 'Match Maker', 'Admin'],
      userObj: {},
      copyBtnText: 'Copy',
      showUserBox: false,
      isLoading: false,
      isSuccess: false,
      attached: false,
      invitationObject: {
        role: undefined,
        add_as_a: undefined,
        relationship: undefined,
        invitation_link: null,
        visible_invitation_link: "",
        visible: false,
        memberBox: false,
        email: null
      },
      requestSent: 0,
      token: ''
    }
  },
  created() {
    this.token = JSON.parse(localStorage.getItem('token'));
  },
  computed: {
    flicker() {
      return this.invitationObject.visible_invitation_link != '';
    }
  },
  methods: {
    socketNotification(payload) {
      let loggedUser = JSON.parse(localStorage.getItem('user'));
      payload.sender = loggedUser.id;
      Notification.storeNotification(payload);
      payload.created_at = new Date();
      payload.seen = 0;
      payload.sender = loggedUser;
      if(payload && payload.receivers.length > 0) {
        payload.receivers = payload.receivers.map(item => {
          return item.toString();
        });
        this.$socket.emit('notification', payload);
      }
    },
    changedAddAs() {
      if(this.invitationObject.add_as_a == 'Candidate') {
        this.invitationObject.role = 'Admin';
      }
    },
    async searchMember() {
      this.requestSent++;
      await ApiService.post(`/v1/user-info`, {
        email: this.user_email,
        team_id: this.team.id
      }).then(response => {
        this.invitationObject.email = null;
        this.attached = false;
        this.userObj = response.data.data;
        this.requestSent--;
      }).catch(e => {
        console.log('error', e)
        this.userObj = {};
        this.invitationObject.email = null;
        this.attached = false;
        this.requestSent--;

      });
    },
    inviteMember() {
      if(this.userObj) {
        if(this.from === 'details-card') {
          this.$emit("executeInviteMember", this.userObj.user);
        } else {
          this.$emit('addMemberInfo', this.userObj.user);
          this.$emit('toggleMemberbox');
        }
      }
    },
    attachUser() {
      if(this.attached) {
        this.invitationObject.email = this.userObj.user.email;
      } else {
        this.invitationObject.email = null;
      }
    },
    removeAttachedUser() {
      this.invitationObject.email = null;
      this.showUserBox = false;
      this.user_email = '';
      this.userObj = {};
    },
    copyToken() {
      this.copyBtnText = 'Copied';
      let copyText = document.getElementById("copyInput");
      copyText.select();
      copyText.setSelectionRange(0, 99999);

      navigator.clipboard.writeText(copyText.value);

      const self = this;
      setTimeout(() => {
        self.copyBtnText = 'Copy'
      }, 2000);
    },
    ifHasCandidate() {
      let hasCandidate = this.team.team_members.find(item => item.user_type.toString() == 'Candidate');
      if(hasCandidate) {
        return true;
      }

      hasCandidate = this.team.team_invited_members.find(item => item.user_type.toString() == 'Candidate');
      if(hasCandidate) {
        return true;
      }
      return false;
    },
    generateLink() {
      if(!this.invitationObject.link) {
        this.invitationObject.relationship = this.invitationObject.add_as_a == 'Candidate' ? 'Candidate' : this.invitationObject.relationship;
        if(this.invitationObject.role && this.invitationObject.add_as_a && this.invitationObject.relationship) {
          this.createInvitaionLink();
        } else {
          this.$warning({
            title: "Please fill out all the fields",
            center: true,
          });
        }
      }
    },
    createInvitaionLink() {
      if(!this.isLoading) {
        // amaizingly, for some reason i need to refer this to
        // a other variable so my iffe function can access this
        var self = this;
        (function createShotLink() {
          // this is the method i am using to create a short link
          function makeid(length) {
            var result = [];
            var characters =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
              result.push(
                  characters.charAt(Math.floor(Math.random() * charactersLength))
              );
            }
            return result.join("");
          }
          self.invitationObject.invitation_link = makeid(10);
          self.invitationObject.visible_invitation_link = window.location.host + '/manageteam?invitation=' + self.invitationObject.invitation_link;

          let data = {
            role: self.invitationObject.role,
            add_as_a: self.invitationObject.add_as_a,
            relationship: self.invitationObject.relationship,
            invitation_link: self.invitationObject.invitation_link,
            email: self.invitationObject.email
          };
          let invitation = [data];

          let payload = {
            team_id: self.team.team_id,
            members: invitation
          };
          self.isLoading = true;
          ApiService.post('/v1/invite-team-members', payload).then(res => {
            // self.invitedObj = res.data.data[0];
            self.isLoading = false;
            if(res.data.status != "FAIL") {
              self.isSuccess = true;
              self.$success({
                title: "Invitation link generated successfully",
                center: true,
              });

              console.log(self.userObj.user)
              if(self.userObj && self.userObj.user && self.userObj.user.id && self.userObj.user.email) {
                let notifyObj = {
                  receivers: [self.userObj.user.id.toString()],
                  title: `invited you to join ${self.team.name} team as ${self.invitationObject.role}`,
                  team_id: self.team.id,
                  team_temp_name: self.team.name
                };
                self.socketNotification(notifyObj);
              }
            } else {
              self.$error({
                title: "Something went wrong",
                center: true,
              });
              self.isSuccess = false;
            }
          }).catch(e => {
            self.isLoading = false;
            self.isSuccess = false;
            console.log(e);
            self.$error({
              title: "Something went wrong",
              center: true,
            });
          });
        })();
      }
    },
    toggleToParent() {
      if(!this.isSuccess && (this.invitationObject.role || this.invitationObject.add_as_a || this.invitationObject.relationship)) {
        const self = this;
        this.$confirm({
          icon: "info-circle",
          title: "Are you sure want to discard the changes?",
          center: true,
          confirmLoading: true,
          onOk() {
            self.$emit('toggleMemberbox', self.isSuccess);
          },
        });
      } else {
        if(this.isSuccess) {
          const self = this;
          self.modal = this.$confirm({
            content: `Copy the link before you close this invitation screen. You can also copy the link later from team member list, opening the pending (not joined) text`,
            okText: "Ok",
            okType: "danger",
            cancelText: "Cancel",
            confirmLoading: true,
            async onOk() {
              self.$emit("toggleMemberbox", self.isSuccess);
            },
            onCancel() {
              //
            },
          });
        } else {
          this.$emit('toggleMemberbox', this.isSuccess);
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.cursor-default {
  cursor: default !important;
}
.add-member-box {
  //height: 550px;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  border-radius: 10px;
  background: $bg-primary;
  //@media (min-width: 360px) {
  //  width: 325px;
  //}
  //@media (min-width: 1920px) {
  //  width: 411px;
  //}
  //@media (min-width: 576px) {
  //  width: 507px;
  //}
  //@media (min-width: 768px) {
  //  width: 698px;
  //}
  //@media (min-width: 992px) {
  //  width: 444px;
  //}
  //@media (min-width: 1024px) {
  //  width: 460px;
  //}
  //@media (min-width: 1200px) {
  //  width: 258px;
  //}
  //@media (min-width: 1920px) {
  //  width: 414px;
  //}
  .member-box {
    height: 100%;
    .cross-button-box {
      width: 30px;
      height: 30px;
      float: right;
      border-radius: 50%;
      background: white;
    }
    .d-flex {
      .invite-txt {
        margin-top: 2.5rem;
      }
    }
    .suggestion-box, .details-suggestion-card {
      overflow-y: auto;
      //padding-bottom: 80px;
      .user {
        .user-avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
        .d-flex {
          .short-info {
            .candidate-type {
              margin-top: -8px;
            }
          }
          .btn-success, .btn-sent {
            border-radius: 20px;
            right: 0;
          }
        }
      }
    }
    .link-box {
      //bottom: -136px;
      bottom: 0;
      background: #3A3092;
      border-radius: 14px;
      .w-full {
        .invite-link {
          background: #3A3092;
          padding-right: 60px;
          border-radius: 4px;
        }
        .copy-button {
          top: 14px;
          right: 22px;
          height: 30px;
          border-radius: 4px;
          background: $bg-white;
        }
      }
    }
  }
}
.from-data-card {
  width: 97%;
  top: 8px;
  left: -1px;
  height: 650px;
  border-radius: 10px;
  margin-left: 8px;
  background: $bg-primary;
}
.details-suggestion-card {
  height: 350px;
}
.suggestion-box {
  //height: 338px;
  height: 135px;
}
.invitation-link-btn {
  background: $bg-success;
  color: $color-white;
  border-radius: 30px;
  font-size: 14px !important;
  border: 1px solid $border-white;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: $bg-primary;
    //color: $color-success;
    border: 1px solid $border-success;
  }
  &:focus {
    outline: none;
    box-shadow: none;
  }
}
.attach-link-btn {
  background: $bg-brand;
  color: $color-white;
  border-radius: 30px;
  font-size: 14px !important;
  border: 1px solid $border-white;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: $bg-primary;
    //color: $color-success;
    border: 1px solid $border-brand;
  }
  &:focus {
    outline: none;
    box-shadow: none;
  }
}
.link-box-empty {
  //bottom: -136px !important;
  bottom: 0;
}

@keyframes flickerAnimation {
  0%   { opacity:1; }
  50%  { opacity:0; }
  100% { opacity:1; }
}
@-o-keyframes flickerAnimation{
  0%   { opacity:1; }
  50%  { opacity:0; }
  100% { opacity:1; }
}
@-moz-keyframes flickerAnimation{
  0%   { opacity:1; }
  50%  { opacity:0; }
  100% { opacity:1; }
}
@-webkit-keyframes flickerAnimation{
  0%   { opacity:1; }
  50%  { opacity:0; }
  100% { opacity:1; }
}
.animate-flicker {
  -webkit-animation: flickerAnimation 1s infinite;
  -moz-animation: flickerAnimation 1s infinite;
  -o-animation: flickerAnimation 1s infinite;
  animation: flickerAnimation 1s infinite;
}
</style>
