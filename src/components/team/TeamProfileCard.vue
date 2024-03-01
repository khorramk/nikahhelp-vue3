<template>
  <div class="team-profile-box position-absolute">
    <div class="d-flex justify-content-between px-2 position-relative align-items-center">
      <h4 class="fs-20 text-white font-weight-bold py-2 cursor-pointer p-2" @click="$emit('toggleProfileCard')">&#8592;</h4>
      <div class="cross-button-box mr-2 d-flex justify-content-center align-items-center cursor-pointer py-1" @click="$emit('toggleProfileCard')">
        &#10006;
      </div>
    </div>
    <div class="profile text-center pt-3">
      <img :src="getTeamMemberImg" alt="profile" class="profile-img">
      <h4 class="fs-16 text-white pt-4" v-if="profileActive.profile_from_type === 'member'">{{ profileActive.user && profileActive.user.full_name ? profileActive.user.full_name : profileActive.user.email }}</h4>
      <h4 class="fs-16 text-white pt-2" v-else>{{ profileActive.email ? profileActive.email : 'Not joined yet' }}</h4>
      <div class="d-flex justify-content-center mb-2 mt-4">
        <div class="role-section position-relative">
          <button class="btn btn-sm text-white role-btn"
                  @click="roleChangeBox = !roleChangeBox"
                  :disabled="checkIsOwnerAdmin">Change Role</button>
          <div class="position-absolute role-options bg-white" v-if="roleChangeBox">
            <h4 class="fs-14 py-1 cursor-pointer text-left px-2" @click="changeRole('Admin')">Admin</h4>
            <h4 class="fs-14 py-1 cursor-pointer text-left px-2" @click="changeRole('Member')">Member</h4>
          </div>
        </div>
        <button class="btn btn-sm text-white remove-btn ml-3 bright-20"
                :disabled="checkDeleteAbility"
                @click="removeInvitation()">Remove</button>
      </div>
      <div class="team-profile-short pt-2 text-center d-flex justify-content-center">
        <table class="table table-borderless short-table">
          <tr>
            <td class="fs-14 text-white opacity-60" >Team join Date</td>
            <td class="fs-14 text-white opacity-60">:</td>
            <td class="fs-14 text-white ml-3">{{ profileActive.profile_from_type === 'member' ? formateDate(profileActive.created_at) : 'N/A' }}</td>
          </tr>
          <tr>
            <td class="fs-14 text-white opacity-60">Joined as a</td>
            <td class="fs-14 text-white opacity-60">:</td>
            <td class="fs-14 text-white ml-3">{{ profileActive.user_type }}</td>
          </tr>
          <tr>
            <td class="fs-14 text-white opacity-60">Relationship</td>
            <td class="fs-14 text-white opacity-60">:</td>
            <td class="fs-14 text-white ml-3">{{ profileActive.relationship }}</td>
          </tr>
          <tr>
            <td class="fs-14 text-white opacity-60">Team Role</td>
            <td class="fs-14 text-white opacity-60">:</td>
            <td class="fs-14 text-white ml-3">{{ profileActive.role.replace('+', ' & ') }}</td>
          </tr>
          <!-- <tr v-if="profileActive.link !== undefined">
            <td class="fs-14 text-white opacity-60">Invitation Link</td>
            <td class="fs-14 text-white opacity-60">:</td>
            <td class="fs-14 text-white ml-3 cursor-pointer" @click="copyToken">
              <a-tooltip
                  placement="top"
                  :title="copyBtnText"
              >
                {{ profileActive.link }}
              </a-tooltip>
            </td>
          </tr> -->
<!--          <tr>-->
<!--            <td class="fs-12 text-white opacity-60">Permission</td>-->
<!--            <td class="fs-12 text-white opacity-60">:</td>-->
<!--            <td class="fs-14 text-white ml-3">None</td>-->
<!--          </tr>-->
        </table>

        <div class="link-box px-4 position-absolute w-full" v-if="profileActive.link !== undefined">
          <div class="w-full mt-2">
            <input type="text" class="form-control invite-link text-white fs-12 py-5" id="copyInput" :value="invitationLink" disabled />
            <button class="copy-button position-absolute px-2" @click="copyToken">{{ copyBtnText }}</button>
          </div>
          <p class="fs-10 text-white text-start mt-2">Send this link through email or any messaging platform <br> Only one member can use this link once</p>
        </div>
      </div>
<!--      <router-link :to="{name: 'Profile', query: { user_id: profileActive.user_id }}" v-if="profileActive.profile_from_type === 'member'">-->
<!--        <button class="btn btn-sm fs-14 text-white bg-primary mt-1 py-1 prof-detail">Profile Details</button>-->
<!--      </router-link>-->
      <button class="btn btn-sm fs-14 text-white bg-primary mt-1 py-1 prof-detail"
              @click="viewProfile"
              v-if="profileActive.profile_from_type === 'member'">Profile Details</button>
    </div>
  </div>
</template>

<script>
import ApiService from "../../services/api.service";
export default {
  name: "TeamProfileCard",
  props: ['teamData', 'profileActive'],
  data() {
    return {
      roleChangeBox: false,
      copyBtnText: 'Copy',
      invitationLink: window.location.host + '/manageteam?invitation=' + this.profileActive.link,
      token: ""
    }
  },
  created() {
    this.token = JSON.parse(localStorage.getItem('token'));
  },
  computed: {
    checkIsOwnerAdmin() {
      if(this.profileActive.role == 'Owner+Admin') {
        return true;
      } else {
        if(this.profileActive.profile_from_type !== 'member') {
          return true;
        }
      }
      return false;
    },
    checkDeleteAbility() {
      if(this.profileActive.role == 'Owner+Admin') {
        return true;
      }
      return false;
    },
    getTeamMemberImg () {
      if(this.profileActive.user !== undefined && this.profileActive.user.account_type == 1) {
        return this.profileActive.user.candidate_info.per_main_image_url + `?token=${this.token}`;
      } else if(this.profileActive.user !== undefined && this.profileActive.user.account_type == 2) {
        return this.profileActive.user.representative_info.per_main_image_url + `?token=${this.token}`;
      } else {
        return require('@/assets/no-image-available.jpg');
      }
    }
  },
  methods: {
    formateDate(date) {
      if (date == null || date == undefined) {
        return "  Not Exist";
      }
      let d = new Date(date),
          month = "" + (d.getMonth() + 1),
          day = "" + d.getDate(),
          year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [day, month, year].join("/");
    },
    removeInvitation() {
      const self = this;
      if(self.profileActive.profile_from_type === 'member') {
        self.$emit("deleteTeamMember", self.profileActive.user.id, self.profileActive.user.full_name);
      } else {
        self.$emit("deleteInvitation", self.profileActive.id);
      }
    },
    async changeRole(role) {
      let payload = {
        team_id: this.teamData.team_id,
        user_id: this.profileActive.user_id,
        access_type: role
      };
      this.roleChangeBox = false;
      await ApiService.post(`/v1/change-team-member-access`, payload).then(response => {
        if (response.data.status == "FAIL") {
          this.$message.error(response.data.message);
        } else {
          this.$message.success('Successfully role changed');
          this.$emit("teamListUpdated");
        }
      }).catch(e => {
        this.$message.error(e.response.data.message);
      });
    },
    getInvitationLink() {
      let link = window.location.host + '/manageteam?invitation=' + this.profileActive.link;
      return link;
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
    viewProfile() {
      this.$router.push(
          `/user/profile/${this.profileActive.user_id}`
      );
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.opacity-60 {
  opacity: 0.6;
}
.short-table {
  border-collapse: separate;
  border-spacing: 8px;
}
.short-table tr td {
  padding: 0 !important;
}
.br-10 {
  border-radius: 10px;
}
.team-profile-box {
  background: $bg-primary;
  width: 100%;
  height: 455px;
  margin-left: -8px;
  border-radius: 10px;
  z-index: 9;
  bottom: 0;

  .position-relative {
    .cross-button-box {
      width: 30px;
      height: 30px;
      float: right;
      border-radius: 50%;
      background: white;
    }
  }
  .profile {
    margin-top: -16px;
    .profile-img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      border: 2px solid $color-white;
    }
    .d-flex {
      .role-section {
        .role-btn {
          //border-radius: 20px 0 0 20px;
          border-radius: 20px;
          background: $bg-primary;
          border: 1px solid $color-white;
        }
        .role-options {
          width: 100px;
          height: 55px;
          border-radius: 4px;
          z-index: 9;
        }
      }
      .remove-btn {
        //border-radius: 0 20px 20px 0;
        border-radius: 20px;
        background: $bg-brand;
        border: 1px solid $color-white;
        &:hover {
          background: transparent;
          border: 1px solid $color-brand;
          color: $color-white !important;
        }
      }
    }
    .prof-detail {
      border: 2px solid $color-white;
      border-radius: 20px;
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
</style>
