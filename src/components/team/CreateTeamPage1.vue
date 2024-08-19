<template>
  <div class="col-lg-6 col-xl-3 cards position-relative">
    <div class="team-card card position-relative" style="min-height: 650px;">
      <div class="d-flex align-items-center justify-content-center joining-header" style="width: 100%">
        <div class="logo-position position-absolute">
          <img
              class="group-logo"
              src="@/assets/Icons/Join a team.svg"
              alt=""
          />
        </div>
        <h4 class="card-title pt-2">
          {{ getCardTitle() }}
        </h4>
      </div>
      <div class="box" v-if="step === 1">
        <a-row class="mt-2 px-4">
          <a-col :span="24" class="my-2">
            <a-input
                v-model:value="team.name"
                size="large"
                class="team-name-input"
                placeholder="Team name"
                autoComplete="nope"
                :maxLength="20"
            />
            <span class="text-danger mt-2 ml-2" v-if="in_progress && !team.name">Team name required</span>
          </a-col>
          <a-col class="my-2" :span="24">
            <a-input
                class="team-description team-name-input resize-none fs-16"
                placeholder="Team description"
                :auto-size="{ minRows: 1, maxRows: 1 }"
                v-model:value="team.description"
                @input="in_progress = true"
                :maxLength="80"
            />
            <span class="text-danger mt-2 ml-2" v-if="in_progress && !team.description">Team description required</span>
          </a-col>
          <!-- <a-col class="mt-2" :span="24">
            <a-input
                v-model="team.password"
                size="large"
                type="password"
                class="team-name-input"
                placeholder="Type Team Password"
                autocomplete="new-password"
                @input="in_progress = true"
            />
            <span class="fs-12 text-danger ml-2 fs-12" v-if="team.password && team.password.length !== 4">Password must be 4 digits</span>
          </a-col>
          <a-col :span="24" class="mt-2">
            <a-input
                v-model="team.confirm_password"
                size="large"
                type="password"
                class="team-name-input"
                placeholder="Re-Type Password"
                autocomplete="new-password"
                @input="in_progress = true"
            />
            <span class="text-danger mt-2 ml-2 fs-12" v-if="team.password && team.confirm_password && team.password !== team.confirm_password">Password doesn't match.</span>
            <span v-if="team.confirm_password && team.confirm_password.length !== 4" class="fs-12 text-danger ml-2">Password must be 4 digits</span>
          </a-col> -->
          <a-col class="my-2" :span="24">
            <label for="" class="input-label text-center w-100 fs-16 mb-2">Set pin for this team:</label>
            <div class="d-flex justify-content-around">
              <input v-for="i in 4" ref="teamPassword" :key="i" type="password" class="password-input-box text-center" maxlength="1" @keydown.prevent="handlePasswordInput($event, i, 'teamPassword')">
              <div 
                class="password-input-box d-flex justify-content-center align-items-center" 
                style="cursor: pointer; background-color: #6159a7;"
                @click="showPassword =! showPassword; handleShowPassword('teamPassword');"
              >
                <v-icon color="#fff" v-if="!showPassword" small>mdi-eye-outline</v-icon>
                <v-icon color="#fff" v-else small>mdi-eye-off-outline</v-icon>
              </div>
            </div>
            <span class="fs-12 text-danger ml-2 fs-12" v-if="showPasswordError">Password must be a number</span>
          </a-col>
          <a-col class="my-2" :span="24">
            <label for="" class="input-label text-center w-100 fs-16 mb-2">You are joining this team as a:</label>
            <a-select
                size="large"
                placeholder="Add as a"
                class="fs-16 member-add mr-2"
                :value="addAs"
                style="width: 100%"
            >
              <a-select-option value="Candidate" v-if="!joinedAsCandidate"> Candidate </a-select-option>
              <a-select-option value="Representative"> Representative </a-select-option>
              <!--                    <a-select-option value="Candidate" v-if="addAs == 'Candidate' || teamCount <= 0"> Candidate </a-select-option>-->
              <!--                    <a-select-option value="Representative" v-if="addAs == 'Representative' || teamCount <= 0"> Representative </a-select-option>-->
              <!--                    <a-select-option value="Match Maker"> Match Maker </a-select-option>-->
            </a-select>
          </a-col>
          <a-col class="my-2" :span="24" v-if="addAs != 'Candidate'">

            <a-select
                size="large"
                placeholder="Relationship with candidate"
                class="fs-16 member-add"
                v-model="selfRole.relationship"
                :disabled="addAs == 'Candidate'"
                style="width: 100%"
            >
              <!--                    <a-select-option value="Candidate" v-if="addAs == 'Candidate'"> Candidate </a-select-option>-->
              <a-select-option v-for="(relation, index) in relationships" :key="index" :value="relation"> {{ relation }} </a-select-option>
            </a-select>

          </a-col>
          <a-col class="text-center mt-8" :span="24">
            <div class="d-flex flex-column align-items-center justify-content-center">
              <div class="cursor-pointer image-plus background-img" @click="uploadFile()" :style="{ backgroundImage: 'url(' + logoBobUrl + ')' }">
                <h4 v-if="!file" class="fs-33 d-flex justify-content-center align-items-center text-white">+</h4>
              </div>
              <h4 class="fs-14 color-gray ml-2 add-team-image cursor-pointer mt-2" @click="uploadFile()">Add a team image</h4>
            </div>
            <span class="text-danger fs-12" v-if="in_progress && !file">Please upload team logo</span>
            <input
              type="file"
              ref="file"
              style="display: none"
              accept="image/*"
              @change="onChangeFileSet($event)"
            />
          </a-col>
        </a-row>
        <div class="position-absolute footer-cancel-btn">
          <a-button class="back-button cancel-button float-left" @click="goBack()">Back</a-button>
        </div>
        <div class="position-absolute footer-conf-btn">
          <a-button class="confirm-button float-right" @click="createTeam()" :loading="loading">Next</a-button>
        </div>
      </div>
      <CreateAddMember :team="team" :file="file" v-if="step === 2" @cancel_button="$emit('cancel_button')" @goNext="goNextStep" @loadTeams="loadTeams" @socketNotification="socketNotification" />
      <TeamCreateSuccess v-if="step === 3" :team="team" />
    </div>
  </div>
</template>

<script>
import ApiService from '@/services/api.service';
import CreateAddMember from "./CreateAddMember.vue";
import TeamCreateSuccess from "./TeamCreateSuccess.vue";
export default {
	name: "CreateTeam1",
	components: {TeamCreateSuccess, CreateAddMember},
  props: ['addAs', 'teamCount', 'joinedAsCandidate'],
	data() {
		return {
      relationships: ['Father', 'Mother', 'Brother', 'Sister', 'Grand Father', 'Grand Mother', 'Brother-in-law', 'Sister-in-law'],
			isLoading: false,
			user: {},
			is_verified: 1,
      step: 1,
      team: {
        name: '',
        description: '',
        password: '',
      },
      showPassword: false,
      showPasswordError: false,
      in_progress: false,
      file: '',
      logoBobUrl: null,
      loading: false,
      selfRole: {
        relationship: undefined,
      },
		};
	},
  computed: {
    checkDisability() {
      if(this.team.name && this.team.description &&
          this.team.password &&
          this.team.password.length === 4 && this.file) {
        return false;
      }
      return true;
    }
  },
	created() {
    this.imageApiLocation = import.meta.env.VITE_IMAGE;
    // let loggedUser = JSON.parse(localStorage.getItem('user'));
    // if(loggedUser && loggedUser.id) {
    //   if(loggedUser.account_type == 1) {
    //     this.selfRole.add_as_a = 'Candidate';
    //     this.selfRole.relationship = 'Own';
    //   } else if(loggedUser.account_type == 2) {
    //     this.selfRole.add_as_a = 'Representative';
    //     this.selfRole.relationship = 'Father';
    //   } else if(loggedUser.account_type == 3) {
    //     this.selfRole.add_as_a = 'Match Maker';
    //     this.selfRole.relationship = 'Father';
    //   }
    // }
    // if(this.addAs == 'Candidate') {
    //   this.selfRole.relationship = 'Candidate';
    // }
  },
	methods: {
    getCardTitle() {
      if(this.step === 2) {
        return 'Add team member';
      } else if(this.step === 3) {
        return 'Team create confirmation';
      } else {
        return 'Create a team';
      }
    },
    onConfirmClick(event) {
      this.$emit("toggleToTeamPassword");
    },
		validate() {
			let validation_status = true;
			let validation_msgs = [];
			if (!this.$store.state.team.team_name) {
				validation_msgs.push("Please enter a team name");
				// alert("Please type a team name");
				validation_status = false;
			}

			if (!this.$store.state.team.team_description) {
				validation_msgs.push("Please enter team description");
				// alert("Please type a team description");
				validation_status = false;
			}

			if (validation_msgs.length > 0) {
				let msg = validation_msgs.join(".\n");
				// this.$notification.open({
				// 	message: "Error",
				// 	description: msg,
				// 	onClick: () => {
				// 		console.log("Notification Clicked!");
				// 	},
				// });
				this.$error({
					title: "Create Team Error!",
					content: msg,
					centered: true,
				});
				// this.$message.error(msg);
				//alert(msg);
			}
			return validation_status;
		},
    handlePasswordInput(e, i, passwordType){
      let allowedChars = '1234567890';
      if(e.key === "Backspace") {
        if(this.$refs[passwordType][i-1].value) {
          this.$refs[passwordType][i-1].value = "";
        } else if(i >= 2) {
          this.$refs[passwordType][i-2].focus();
        }
      } else if (allowedChars.includes(e.key)) {
        this.$refs[passwordType][i-1].value = e.key;
        if(i < 4) {
          this.$refs[passwordType][i].focus();
        }
      } else if(!allowedChars.includes(e.key)){
        this.showPasswordError = true;
        setTimeout(() => {
          this.showPasswordError = false;
        }, 1500);
      }

      let isPasswordCompleted = this.$refs[passwordType].every(element => element.value !== "");
      if(isPasswordCompleted) {
        if(passwordType === 'teamPassword'){
          this.team.password = "";
          this.$refs[passwordType].forEach(element => {
            this.team.password += element.value;
          });
          console.log(this.team.password, 'password');
        } else {
          this.team.confirm_password = "";
          this.$refs[passwordType].forEach(element => {
            this.team.confirm_password += element.value;
          });
        }
      }
    },
    handleShowPassword(passwordType) {
      this.$refs[passwordType].forEach(element => {
        element.type = element.type == 'text' ? 'password' : 'text';
      })
    },
		goNext() {
      // this.step = 2;
			// let validation_status = this.validate();
			// console.log("pressedGoNext");
			// console.log(this.$store.state.team);
			// if (validation_status == true) {
			// 	console.log("true found");
			// 	this.$store.dispatch("setCreateTeamStep", 2);
			// 	this.$router.push("/create-team-2");
			// }
		},
    goNextStep(value) {
      this.step = value;
    },
    goBack() {
      this.team = {};
      this.$emit('cancel_button');
    },
    loadTeams() {
      this.$emit("loadTeams");
    },
    uploadFile() {
      this.$refs.file.click();
    },
    onChangeFileSet(e) {
      let droppedFiles = e.target.files || e.dataTransfer.files;
      if (!droppedFiles) return;
      [...droppedFiles].forEach((f) => {
        this.file = f;
        this.logoBobUrl = URL.createObjectURL(f);
      });
    },
    updateTeamData(data) {
      this.team = data;
    },
    async createTeam() {
      if(!this.checkDisability) {
        this.loading = true;
        this.in_progress = true;
        this.team.add_as_a = this.addAs;
        this.team.user_type = this.addAs;
        this.team.relationship = this.addAs == 'Candidate' ? 'Candidate' : this.selfRole.relationship;
        let formData = new FormData();
        // console.log(this.file, 'this fiel from team');
        formData.append('logo', this.file.name);
        Object.keys(this.team).map(data =>{
          formData.append(data, this.team[data]);
        });

        await ApiService.post('/v1/team', formData).then(res => {
          // this.loading = false;
          if(res && res.data && res.data.status != 'FAIL') {
            // console.log(res, 'team data');
            res.data.data.add_as_a = this.addAs;
            let team_members = {
              user_type: this.addAs,
              relationship: this.selfRole.relationship,
              role: 'Owner+Admin'
            };
            res.data.data.team_members = [team_members];
            res.data.data.team_invited_members = [];
            this.updateTeamData(res.data.data);
            // this.goNextStep(2);
          } else {
            this.$message.error("Something went wrong");
            return;
          }
        });

        formData = new FormData();
        formData.append('image', this.file);
        await this.$store.dispatch("uploadImages", {folder: `_${this.team.id}_team_logo_url`, image: formData}).then(async (data) => {
          // console.log(data, 'image response afer saving image');

          let  payload = {
            logo: this.imageApiLocation + '/' + Object.values(data)[0]
          };
          
          await ApiService.post(`v1/team-update/${this.team.id}`, payload).then(res => {
            // console.log(res, 'team data');
            this.loading = false;
            if(res && res.data && res.data.status != 'FAIL') {
              this.$message.success("Team created successfully");
              this.team.logo = res.data.data.logo;
              this.goNextStep(2);
            } else {
              this.$message.error("Something went wrong");
              return;
            }
          });
        });
      } else {
        this.$message.error("Please fill all the fields");
        return;
      }      
    },
    socketNotification(data) {
      this.$emit("socketNotification", data);
    }
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.team-card {
  margin-bottom: 20px;
}
.ant-card-body {
  padding: 0 !important;
}
.ant-btn {
  border-radius: 20px !important;
}
.br-20 {
  border-radius: 20px;
}
.bg-brand {
  background: #E51F76 !important;
  border: 1px solid $border-brand !important;

  &:hover {
    border: 1px solid $border-brand !important;
  }
}

.bg-primary {
  background: $bg-primary !important;

  &:hover {
    background: $bg-primary !important;
    opacity: 0.9 !important;
  }

  &:focus {
    background: $bg-primary !important;
  }
}

.input-label {
  margin: 0px 0px 1px 2px; 
  color: rgb(0, 0, 0, 0.5);
}
.fs-33 {
  font-size: 33px;
}
.background-img {
  background-size: cover !important;
  background-repeat: no-repeat !important;
  background-position: center center !important;
}
.image-plus {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: $bg-primary;
}
.bob-logo {
  width: 87px;
  height: 87px;
  border-radius: 50%;
}
.input-controls > input {
  height: 50px;
  margin-top: 10px;
  border: 1px solid #6158a7 !important;
  border-color: #6158a7 !important;
  border-radius: 25px !important;
}
.card-container {
  margin: 10px;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 0 5px 3px #d3d3d3 !important;
}
.group-logo {
  width: 80px;
  margin-bottom: 10px;
}
.card-title {
  color: #6158a7;
  font-weight: 400;
  font-size: 2.75rem;
}
.joining-message {
  color: #6158a7;
  font-weight: 400;
  font-size: 1.25rem;
}
.candiadate-text {
  margin-left: 5px;
  color: #6158a7;
  font-weight: bold;
  font-size: 1.25rem;
}
.form-label {
  text-align: left;
}
.disabled {
  pointer-events: none;
  opacity: 0.3;
}
.form-value {
  text-align: left;
}
.ant-input-suffix {
  right: 0 !important;
}
.input-prefix {
  font-size: 20px;
  border-right: 1px solid $border-gray;
  padding-right: 6px;
}
.input-suffix {
  background: $color-gray;
  width: 34px;
  height: 100%;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  font-size: 34px;
  padding: 0px;
  color: $color-white;
  cursor: pointer;
  margin-right: -9px;
}

// start css for team-card
.cards {
  //padding: 0;
  .team-card {
    width: 100%;
    padding: 10px 8px;
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: none !important;
    border: 2px solid #dddddd78;
    .ant-card-body {
      padding: 0;
    }
    .joining-header {
      background: $bg-primary;
      padding: 0 20px;
      .logo-position {
        left: 12px;
        top: 7px;
        .group-logo {
          width: 40px;
          height: 40px;
          background: $bg-white;
          border-radius: 50%;
          padding: 4px;
        }
      }
      .card-title {
        font-size: 14px;
        color: $color-white;
      }
    }

    .team-card-header {
      background-color: #ffffff;
      display: flex;
      padding: 0;
      margin-bottom: 20px;
      align-items: center;
      justify-content: space-between;

      .left {
        .status {
          border: 2px solid #999999;
          padding: 2px 5px;
          border-radius: 20px;
          color: #6158a9;
          background-color: #999999;
          color: #e4e4e4;
          font-size: 12px;

          span {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: #e91e78;
            margin-left: 5px;
          }

          &.active {
            border: 2px solid #6b64ae;
            background-color: #ffffff;
            color: #6158a9;

            span {
              background-color: #39b54a;
            }
          }
        }
      }

      .middle {
        button {
          opacity: 1;
          padding-right: 5px;

          img {
            width: 25px;
          }
        }
      }

      .right {
        display: flex;
        align-items: center;

        .ant-switch {
          background-color: #ea4c91;

          .ant-switch-loading-icon,
          &::after {
            top: 2px;
          }
        }

        .ant-switch-checked {
          background-color: #6159a8;
        }

        .dropleft {
          margin-left: 10px;

          .dropdown-toggle {
            padding: 0;

            &::before {
              border: 0;
              width: 12px;
              height: 20px;
              margin-top: 7px;
              background: url("~@/assets/three-dots.png") no-repeat right center;
            }
          }

          .dropdown-menu {
            margin-top: 7px;
            padding: 10px 15px;
            box-shadow: 0 0 3px 2px #ddd;

            .dropdown-item {
              padding: 3px 0;
              margin-bottom: 2px;
              text-align: center;
              font-size: 12px;
              border-radius: 3px;
              color: #3a3092;
              background-color: #e6e6e6;

              &:hover {
                color: #ffffff;
                background-color: #e51f76;
              }
            }
          }
        }
      }
    }

    .card-info {
      display: flex;
      margin-bottom: 20px;

      .img {
        width: 60px;
        padding-right: 20px;
        box-sizing: content-box;

        button {
          border: 0;
          margin: 0;
          padding: 0;
          width: 60px;
          min-width: 12px;
          position: relative;
          background-color: transparent;

          span {
            position: absolute;
            bottom: 0px;
            right: -8px;
          }
        }
      }

      .info-content {
        .member-name,
        .member-desc {
          display: flex;
          padding-bottom: 5px;

          p {
            margin: 0;
            color: #777777;
          }

          button {
            border: 0;
            background-color: transparent;
            padding: 0;
            min-width: 12px;
          }
        }

        .member-desc {
          p {
            font-size: 12px;
          }
        }
      }
    }

    .member-area {
      display: flex;
      flex-wrap: wrap;
      padding-bottom: 20px;

      .members {
        border: 2px solid #908bc2;
        border-radius: 5px;
        min-height: 30px;
        padding: 0 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 10px;
        margin-right: 10px;

        &:first-of-type {
          border-top-left-radius: 15px;
          border-bottom-left-radius: 15px;
        }

        &:last-of-type {
          border-top-right-radius: 15px;
          border-bottom-right-radius: 15px;
          margin-right: 0;
        }

        p {
          display: flex;
          margin: 0;
          font-size: 12px;
          align-items: center;

          span {
            width: 16px;
            height: 16px;
            color: #ffffff;
            border-radius: 50%;
            background-color: #e51f76;
            display: flex;
            align-items: center;
            justify-content: center;
            float: left;
            margin-right: 5px;
          }
        }
      }
    }

    .member-action {
      .add-remove {
        display: flex;
        justify-content: space-between;
        padding: 0;
        margin-bottom: 10px;

        .add-member,
        .remove-member {
          display: flex;
          color: #6159a8;

          img {
            width: 20px;
            margin-right: 10px;
          }
        }

        .remove-member {
          color: #e51f76;
        }
      }

      .admin-member,
      .only-member {
        padding: 4px;
        border-radius: 15px;
        margin-top: 15px;
        margin-bottom: 15px;
        font-size: 12px;
        color: #ffffff;

        td {
          background-color: #3a3092;
        }

        td:first-of-type {
          padding-left: 5px;
          border-top-left-radius: 12px;
          border-bottom-left-radius: 12px;
        }

        td:last-of-type {
          padding-right: 5px;
          border-top-right-radius: 12px;
          border-bottom-right-radius: 12px;
        }

        td {
          padding-top: 2px;
          padding-bottom: 2px;
        }

        .name-short,
        .name-full,
        .title,
        .status,
        .relation,
        .remove {
          background-color: #3a3092;
          margin-right: 10px;
        }

        .name-short {
          background-color: #ffffff;
          color: #6159a8;
          width: 30px;
          border-top-left-radius: 12px;
          border-bottom-left-radius: 12px;
          padding: 0 5px;
          font-size: 12px;
          font-weight: bold;
        }

        .name-full {
        }

        .title {
          background-color: #ffffff;
          color: #777777;
          padding: 0 5px;
          border-radius: 10px;
        }

        .status {
          width: 20px;
        }

        .relation {
        }

        .remove {
          width: 15px;
          margin-right: 0;
        }
      }

      .only-member {
        background-color: #ffffff;
        color: #777777;

        td {
          padding-top: 15px;
          background-color: #ffffff;
        }

        .name-short,
        .name-full,
        .title,
        .status,
        .relation,
        .remove {
          background-color: #ffffff;
        }

        .name-short {
          background-color: #3a3092;
          color: #ffffff;
        }

        .title {
          background-color: #808080;
          color: #ffffff;
        }

        .remove {
          padding: 0;
        }
      }

      .select-member {
        display: flex;
        margin-top: 30px;
        margin-bottom: 30px;
        justify-content: space-between;
        // background: url("~@/assets/select-arrow.png") no-repeat center center;
        .custom-select {
          font-size: 12px;
          width: auto;
          padding-left: 2px;
          padding-right: 12px;
          padding-top: 0;
          padding-bottom: 0;
          height: 24px;
          background: #e6e6e6 url("~@/assets/select-arrow.png") no-repeat;
          background-position: right 2px center;
        }

        button {
          padding: 0;

          img {
            width: 20px;
          }
        }
      }
    }

    .box {
      .footer-cancel-btn {
        bottom: 20px;
        left: 32px;
        .button {
          border-radius: 16px;
        }
      }
      .footer-conf-btn {
        bottom: 20px;
        right: 32px;
        .button {
          border-radius: 16px;
        }
      }
    }
    .team-card-footer {
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;

      .left {
        margin-bottom: 10px;

        p {
          margin: 0;
          font-size: 12px;
        }
      }

      .right {
        a {
          font-size: 12px;
          color: #e51f76;
          text-decoration: underline;

          img {
            width: 20px;
            margin-right: 5px;
          }
        }
      }
    }
    .invite-info-box {
      .invite-info {
        .d-flex {
          .col-50 {
            width: 50%;
            .fs-14 {
              font-weight: normal;
            }
          }
          .fs-14 {
            font-weight: bold;
          }
        }
      }
    }
  }
}
.resize-none {
  resize: none;
}

.password-input-box {
  height: 40px;
  //width: 100px;
  width: 40px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  
}
.add-team-image {
  color: rgba(0,0,0,0.5) !important;
  &:hover {
    color: $color-brand !important;
  }
}
.team-description {
  min-height: 40px !important;
  max-height: 40px !important;
}
</style>
