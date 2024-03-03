<template>
  <div v-if="userData" class="panel-container">
    <a-modal
      title="Change Password"
      :visible="visible"
      :confirm-loading="confirmLoading"
      width="400px"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <label class="ml-1 mb-0 input-label">Old Password:</label>
      <a-input-password
        placeholder="Input Old Password"
        @change="onOldPassChange"
        style="margin-top: 5px; margin-bottom: 5px"
      />

      <label class="ml-1 mb-0 input-label">New Password:</label>
      <a-input-password
        placeholder="Input New Password"
        @change="onNewPassChange"
        @blur="onNewPassBlur"
        style="margin-top: 5px; margin-bottom: 5px"
      />
      <span class="text-center" style="color: red; display: block;">{{ newPassValidationError }}</span>

      <label class="ml-1 mb-0 input-label">Retype New Password:</label>
      <a-input-password
        placeholder="Retype New Password"
        @change="onRetypePassChange"
        @blur="onRetypePassBlur"
      />
      <span class="text-center" style="color: red; display: block;">{{ retypePassValidationError }}</span>
    </a-modal>
    <a-modal
      title="Confirm your Password"
      :visible="isDeletionModalVisible"
      :confirm-loading="confirmLoading"
      width="400px"
      @ok="handleDeleteAccount"
      @cancel="isDeletionModalVisible = !isDeletionModalVisible"
    >
      <label class="ml-1 mb-0 input-label"> Type Your Password:</label>
      <a-input-password
        placeholder="Password"
        style="margin-top: 5px; margin-bottom: 5px"
        @change="onConfirmPassBeforeDeleteChange"
      />
    </a-modal>
    <div class="panel-content border-content">
      <div class="content">
        <div class="header-content">
          <h4 style="margin-bottom: 0px;">Contact Details</h4>
          <ButtonComponent
            class="mr-1"
            iconHeight="14px"
            :isSmall="true"
            title="EDIT"
            :responsive="false"
            :icon="require('@/assets/icon/edit_icon.svg')"
            @onClickButton="openDialog"
          />
          <!-- <v-tooltip bottom color="warning">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                style="
                  background-color: #0aa3e1;
                  color: #fff;
                  border-radius: 25px;
                "
                small
              >
                <img
                  style="width: 20px"
                  src="@/assets/icon/pencil.svg"
                  alt="img"
                />Edit
              </v-btn>
            </template>
            <span>For security reason, contact details cannot be changed.</span
            >&nbsp;
            <span
              >If any of this data is incorrect plaese contact
              <router-link to="/help">Support Team</router-link></span
            >
          </v-tooltip> -->
        </div>
        <div class="contact-details">
          <span style="font-weight: 600">
            <img
              style="width: 20px"
              src="@/assets/icon/account.svg"
              alt="img"
            />&nbsp; {{ userData.full_name }} <span v-if="userData.account_type == 1">({{ userInfo.candidate_information.screen_name }})</span> <span v-if="userData.account_type == 2">({{ userInfo.representative_information[0].screen_name }})</span></span
          >
          <span>
            <img
              style="width: 20px"
              src="@/assets/icon/email.svg"
              alt="img"
            />&nbsp; {{ userData.email }}</span
          >
          <span>
            <img
              style="width: 20px"
              src="@/assets/icon/home-outline.svg"
              alt="img"
            />
            &nbsp; {{ getAddressLine1 }} &nbsp; <br>
            <div class="ms-6">
              &nbsp; {{ getAddressLine2 }} &nbsp; <br>
              &nbsp; {{ getCity }} &nbsp; <br>
              &nbsp; {{ getCountry }} &nbsp; <br>
            </div>

            <!-- {{ userData.get_candidate.address_2 ? userData.get_candidate.address_2 : "Ex:UK,London" }} -->
          </span
          >
          <span
            ><img
              style="width: 20px"
              src="@/assets/icon/phone.svg"
              alt="img"
            />&nbsp;{{
              mobileNumber 
            }}</span
          >
        </div>
      </div>
      <div class="content">
        <div class="flex justify-content-between">
          <h4 style="margin-bottom: 0px;">Password</h4>
          <ButtonComponent
            class="mr-1"
            :isSmall="true"
            title="CHANGE"
            :responsive="false"
            @onClickButton="handleClickPassword"
          />
        </div>
        <div class="password-details">
          <span>*****</span>
        </div>
      </div>
      <div v-if="false" class="content">
        <h4>Switch Member Type</h4>
        <div class="password-details">
          <span>Change member category to</span>
          <v-btn
            :disabled="userData.account_type === 1"
            style="background-color: #0aa3e1; color: #fff; border-radius: 25px"
            small
          >
            {{ userData.account_type === 1 ? "Candidate" : "Representative" }}
          </v-btn>
        </div>
      </div>
      <div v-if="false" class="content">
        <h4>Notification Preferences</h4>
        <div class="password-details">
          <span>Receive marketing communication from MatrimonyAssist</span>
          <v-switch v-model="switch1"></v-switch>
        </div>
      </div>
      <div class="content">
        <div class="flex justify-content-between">
          <h4>Delete Account</h4>
          <ButtonComponent
            class="mr-1 block-button"
            backgroundColor="#d81b60"
            :isSmall="true"
            title="DELETE"
            :responsive="false"
            @onClickButton="isDeletionModalVisible = true;"
          />
        </div>
        <div style="border-bottom: none" class="password-details">
          <span>Do you want to delete Account?</span>
        </div>
      </div>
    </div>
    <div v-if="showIdentity" class="panel-content">
      <div class="content-identity">
        <h4 style="font-weight: 500;">Identity Verification</h4>
        <div
          v-if="verification"
          class="identity"
        >
          <img
            src="@/assets/Verification_Icons/Icon/SVG/Verified.svg"
            alt="icon"
            style="width: 200px; height: 230px"
          />
          <span style="font-weight: bold; font-size: 1.5rem;">Verified</span>
        </div>
        <div
          v-else-if="
            (!verification && checkStatus('2') && hasUploadedDoc) || (!verification && userInfo.user.account_type === 2 && checkStatus('2'))
          "
          class="identity"
        >
          <img
            src="@/assets/Verification_Icons/Icon/SVG/Pending.svg"
            alt="icon"
            style="width: 200px; height: 230px"
          />
          <span style="font-weight: bold; font-size: 1.5rem;">In Review</span>
        </div>
        <div
          v-else-if="!verification && checkStatus('4')"
          class="identity"
        >
          <img
            src="@/assets/Verification_Icons/Icon/SVG/Rejected.svg"
            alt="icon"
            style="width: 200px; height: 230px"
          />
          <!-- <ButtonComponent
            style="width: 150px"
            :isSmall="true"
            title="Resubmit ID"
            :isBlock="true"
            :responsive="false"
            @onClickButton="openVerifyForm"
          /> -->
          <span style="font-weight: bold; margin: 10px 0px; font-size: 1.5rem;">Rejected</span>

          <!-- <span style="font-size: 16px; padding: 30px;">{{  getRejectedNote  }}</span> -->
          <div class="d-flex flex-column w-100 justify-content-center" style="padding: 20px; font-size: 1rem;">
            <div class="w-100 py-2 px-4 bg-light rounded">
              Sorry! your profile information or Verification Document did not
              comply with MatrimonyAssist <router-link class="router-link" to="/terms_condition">Terms and Conditions.</router-link>
            </div>
            <div class="w-100 py-2 px-4 bg-danger rounded text-light"> 
              Please update and resubmit your informations of <b>{{  getRejectedNote  }}</b>
              <br>
              *you can quickly Update and resubmit your All informations from <router-link v-if="userInfo.user.account_type == 1" class="router-link text-light" to="/edit_candidate"><u>Edit Profile</u></router-link>
              <router-link v-if="userInfo.user.account_type == 2" class="router-link text-light" to="/edit_representative"><u>Edit Profile</u></router-link>
            </div>
            <div class="w-100 py-2 px-4 bg-light rounded">
              If you have any question please contact our <router-link class="router-link" to="/help">Support team</router-link>
            </div>
          </div>
        </div>
        <div
          v-else-if="!verification"
          class="identity"
        >
          <img
            src="@/assets/help_guide_pics/Verify_your_ID.svg"
            alt="icon"
            style="width: 200px; height: 230px"
          />
          <!-- <v-btn
            @click="openVerifyForm"
            style="background-color: #0aa3e1; color: #fff; border-radius: 25px"
            small
          >
            Verify
          </v-btn> -->
          <ButtonComponent
            class="verify-button"
            style="width: 150px;"
            :isSmall="true"
            title="Verify"
            :isBlock="true"
            :responsive="false"
            @onClickButton="openVerifyForm"
          />
        </div>
        <div
          v-else-if="checkStatus('9')"
          class="identity"
        >
          <img
            src="@/assets/suspended.jpg"
            alt="icon"
            style="width: 200px; height: 230px"
          />
          <span>Suspended</span>
        </div>
        <div
          v-else-if="checkStatus('0')"
          class="identity"
        >
          <img
            src="@/assets/icon/dots-horizontal-circle.svg"
            alt="icon"
            style="width: 200px; height: 230px"
          />
          <span>Deleted</span>
        </div>
        <div class="identity-footer">
          <!-- <span
            >To keep your account safe, we need to verify your identity. This is
            a legal requirement that help us to keep your account secure.
          </span>
          <span
            >We accept photo/scans of a driving license, passport, national ID
            card or residence permit issued in European Economic Are
            (EEA).</span
          > -->
          <span class="text-black-50 font-weight-light">MatrimonyAssist is a platform for genuine and verified users. To prevent fraud and risk, and increase trust and safety, we verify  identity of our users.</span>
        </div>
      </div>
    </div>
    <div v-if="!showIdentity" class="panel-verify-content">
      <Loader v-if="isLoading" :isLoading="isLoading" />
      <div v-else>
        <VerificationRepresentative
          v-if="
            userData && userData.account_type === 2 && representativeDetails
          "
          :representativeDetails="representativeDetails"
          :verification="representativeDetails.verification"
          @valueChange="onDataChange"
        />
        <VerificationCandidate
          v-if="userData && userData.account_type === 1 && candidateDetails"
          :candidateDetails="candidateDetails"
          :verification="candidateDetails.verification"
          @valueChange="onDataChange"
        />
      </div>
    </div>
    <EditContactModal :dialog="dialog" />
  </div>
</template>


<script>
import ApiService from "@/services/api.service";
import VerificationRepresentative from "@/components/setting/Verification-Representative.vue";
import VerificationCandidate from "@/components/setting/Verification-Candidate.vue";
import EditContactModal from "@/components/setting/EditContactModal.vue";
import ButtonComponent from "@/components/atom/ButtonComponent.vue";
import jwtService from "@/services/jwt.service";
export default {
  name: "Setting",
  components: {
    VerificationRepresentative,
    VerificationCandidate,
    EditContactModal,
    ButtonComponent,
  },
  data() {
    return {
      userInfo: {},
      representativeDetails: null,
      candidateDetails: null,
      ModalText: "Change Password",
      visible: false,
      isDeletionModalVisible: false,
      confirmLoading: false,
      isLoading: false,
      loadingSwitch: false,
      dialog: false,
      oldPass: "",
      newPass: "",
      retypePass: "",
      confirmPassBeforeDelete: "",
      newPassValidationError: "",
      retypePassValidationError: "",
      accountType: "Account Type loading",
      userData: null,
      switch1: true,
      showIdentity: true,
      rejectedNote: ""
    };
  },

  computed: {
    verification() {
        return  (this.userInfo?.user?.status == 3 &&
              this.userInfo?.candidate_information &&
              this.userInfo?.candidate_information.is_uplaoded_doc == 1) ||
            (this.userInfo?.user?.status == 3 && this.userInfo?.representative_information?.length >= 1 &&
              (this.userInfo?.representative_information[0]?.is_uplaoded_doc == 0 || this.userInfo?.representative_information[0]?.is_uplaoded_doc == 1))
         
    },
    hasUploadedDoc() {
      return (this.userInfo?.candidate_information && this.userInfo?.candidate_information.is_uplaoded_doc == 1) ||
              (this.userInfo?.representative_information.length >= 1 && this.userInfo?.representative_information[0].is_uplaoded_doc == 1)
    },
    mobileNumber() {
      return this.userData.account_type == 1 ? this.userInfo?.candidate_information?.personal?.mobile_number : this.userInfo?.representative_information[0]?.mobile_number
    },
    getAddressLine1() {
      return this.$store.getters.userInfo.account_type == 1 ?  this.$store.getters.candidateInfo.personal.address_1 : this.$store.getters.representativeInfo[0].address_1;
    },
    getAddressLine2() {
      return this.$store.getters.userInfo.account_type == 1 ?  this.$store.getters.candidateInfo.personal.address_2 : this.$store.getters.representativeInfo[0].address_2;
    },
    getCity() {
      return this.$store.getters.userInfo.account_type == 1 ?  this.$store.getters.candidateInfo.personal.per_permanent_city : this.$store.getters.representativeInfo[0].per_permanent_city;
    },
    getCountry() {
      return this.$store.getters.userInfo.account_type == 1 ?  this.$store.getters.candidateInfo.personal.per_permanent_country_name : this.$store.getters.representativeInfo[0].per_permanent_country;
    },
    getRejectedNote() {
      this.fetchRejectedNote();
      return this.rejectedNote;
    }
  },

  created() {
    this.getUserInfo();
  },
  mounted() {

    this.userData = JSON.parse(localStorage.getItem("user"));
    if (this.userData && this.userData.account_type === 2) {
      this.userData.mobile = this.userData.get_representative.mobile_number;
      this.userData.address =
        this.userData.get_representative.per_current_residence_city;
    }
    if (this.userData && this.userData.account_type === 1) {
      this.userData.mobile = this.userData.get_candidate.mobile_number;
      this.userData.address =
        this.userData.get_candidate.per_current_residence_city;
    }
  },
  methods: {
    async getUserInfo() {
      let { data } = await ApiService.get("v1/user").then((res) => res.data);
      this.userInfo = data;
      
      this.$store.dispatch("saveUserInfo", data);
    },

    checkStatus(index) {
      return this.userInfo?.user?.status == index;
    },

    openDialog(e) {
      this.dialog = null;
      setTimeout(() => {
        this.dialog = true;
      }, 10);
    },
    onDataChange(value) {
      this.showIdentity = true;
      this.userData = JSON.parse(localStorage.getItem("user"));
      if (this.userInfo.user.account_type === 1) {
        this.userInfo = {
          ...this.userInfo,
          candidate_information: {
            ...this.userInfo.candidate_information,
            is_uplaoded_doc: value,
          },
        };
      } else {
        this.userInfo = {
          ...this.userInfo,
          representative_information: {
            ...this.userInfo.representative_information,
            is_uplaoded_doc: value,
          },
        };
      }
    },
    async fetchRejectedNote() {
      await ApiService.get("v1/individual-rejected-notes/" + this.userData.id).then(res => {
        console.log(res.data.data.rejected_notes[0].note, 'rejectedNote.data.data');
        this.rejectedNote = res.data.data.rejected_notes[res.data.data.rejected_notes.length-1].note;
        return this.rejectedNote;
      })
    },
    getVerifyInfo() {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData && userData.account_type === 1) {
        this.getCandidateInitialInfo();
      } else {
        this.getRepresentativeInitialInfo();
      }
    },
    getCandidateInitialInfo: async function () {
      this.isLoading = true;
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await ApiService.get("v1/candidate/initial-info");
      if (response.status === 200) {
        this.isLoading = false;
        const details = {
          countries: response.data.data.countries,
          occupations: response.data.data.occupations,
          verification: {
            ...response.data.data.validation_info.verification,
            cities: [],
          },
        };

        this.candidateDetails = {
          ...this.candidateDetails,
          ...details,
        };
        if (
          this.candidateDetails.verification &&
          this.candidateDetails.verification.ver_country_id > 0
        ) {
          this.onChangeCountry(
            { id: this.candidateDetails.verification.ver_country_id },
            "verification-candidate",
            ""
          );
        }
      } else {
        this.isLoading = false;
      }
    },
    getRepresentativeInitialInfo: async function () {
      this.isLoading = true;
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await this.$store.dispatch("getRepresentativeData");
      if (response.status === 200) {
        this.isLoading = false;
        const details = {
          countries: response.data.data.countries,
          occupations: response.data.data.occupations,
          id: user.id,

          verification: {
            ...response.data.data.verification,
            ver_country: response.data.data.verification.ver_country
              ? parseInt(response.data.data.verification.ver_country)
              : response.data.data.verification.ver_country,
            cities: [],
          },
        };

        this.representativeDetails = {
          ...details,
        };
        if (
          this.representativeDetails.verification &&
          this.representativeDetails.verification.ver_country > 0
        ) {
          this.onChangeCountry(
            { id: this.representativeDetails.verification.ver_country },
            "verification"
          );
        }
      } else {
        this.isLoading = false;
      }
    },
    async onChangeCountry(e, name) {
      const res = await ApiService.get(`v1/utilities/cities/${e.id}`);

      if (res.status === 200) {
        switch (name) {
          case "verification-candidate":
            this.candidateDetails.verification.cities.push(...res.data.data);
            break;
          case "verification":
            this.representativeDetails.verification.cities.push(
              ...res.data.data
            );
            break;
        }
      }
    },
    openVerifyForm() {
      this.showIdentity = false;
      this.getVerifyInfo();
    },
    onOldPassChange(e) {
      console.log(e.target.value);
      this.oldPass = e.target.value;
    },
    onNewPassChange(e) {
      console.log(e.target.value);
      this.newPass = e.target.value;
    },
    onConfirmPassBeforeDeleteChange(e) {
      this.confirmPassBeforeDelete = e.target.value;
    },
    onNewPassBlur(e) {
      let regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (e.target.value  === "") {
        this.newPassValidationError = 'Enter a password'
      }
      else if (!regex.test(e.target.value)) {
        this.newPassValidationError = "Your password must contain at least 8 characters including a symbol, upper and lower case letters and a number."
      } else {
        this.newPassValidationError = ""
      }
    },
    onRetypePassChange(e) {
      console.log(e.target.value);
      this.retypePass = e.target.value;
    },
    onRetypePassBlur(e) {
      if (e.target.value === "") {
        this.retypePassValidationError = "Enter password again";
      } else if (e.target.value !== this.newPass) {
        this.retypePassValidationError = "Password doesn't match";
      } else {
        this.retypePassValidationError = "";
      }
    },
    showModal() {
      this.visible = true;
    },
    async handleOk(e) {
      this.ModalText = "Talking with server ㋡";
      if(!(this.oldPass.length >= 8)) {
        this.$message.error("Enter old password first");
        return;
      } else if(!(this.newPass.length >= 8)) {
        this.$message.error("Enter a new pass");
        return;
      } else if(!(this.retypePass == this.newPass)){
        this.$message.error("Passwords don't match");
        return;
      } else if(this.newPass == this.oldPass) {
        this.$message.error("New password can't be same as old password");
        return;
      }
      this.confirmLoading = true;
      await ApiService.post("v1/change-password", {
        oldpassword: this.oldPass,
        newpassword: this.newPass,
      })
        .then((data) => {
          console.log(data);
          if (data.data.status_code == 200) {
            this.$message.success(data.data.message);
          }
          this.confirmLoading = false;
          this.visible = false;
          // reseting inputs
          this.oldPass = "";
          this.newPass = "";
          this.retypePass = "";

          this.ModalText = "Change Password";
        })
        .catch((error) => {
          console.log(error.response);
          if (error.response.data.status_code >= 400) {
            this.$message.error(error.response.data.message);
          }
          this.confirmLoading = false;
          this.visible = false;
          // reseting inputs
          this.oldPass = "";
          this.newPass = "";
          this.retypePass = "";

          this.ModalText = "Change Password";
        });

      // setTimeout(() => {
      //   this.visible = false;
      //   this.confirmLoading = false;
      // }, 2000);
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
    },
    handleClickPassword(e) {
      this.showModal();
    },
    onAccountSwitchClick(e) {
      this.loadingSwitch = true;
      if (this.accountType === "Representative") {
        ApiService.post("v1/switch-account", { account_type: 1 })
          .then((data) => {
            console.log(data);
            if (data.data.status_code == 200) {
              this.accountType = "Candidate";
              this.$message.success("Succesfully Switched");
              this.loadingSwitch = false;
            }
          })
          .catch((error) => {
            this.$message.error("Something Went Wrong");
            console.log(error.response);
            this.loadingSwitch = false;
          });
      } else {
        this.$message.error(
          "You might be a candidate, or wait a bit for data to load"
        );
        this.loadingSwitch = false;

        return;
      }
    },
    handleDeleteAccount() {
      const vm = this;
      if(this.confirmPassBeforeDelete.length < 8){
        this.$message.error("Please enter password with at least 8 characters.");
        return;
      }
      let payload = {
        password: this.confirmPassBeforeDelete
      }
      console.log(payload, 'payload')
      this.$confirm({
        title: "Are you sure?",
        content: "You want to delete account?",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        async onOk() {
          // console.log('ok clicked indeleteion', this.isDeletionModalVisible)
          // console.log('ok clicked indeleteion');
          vm.isDeletionModalVisible = false;
          ApiService.post("v1/delete-account", payload).then((data) => {
            console.log("Account deleted Succesfully");
            jwtService.destroyTokenAndUser();
            // vm.$router.push("/login");
            setTimeout(() => vm.$router.go("/login"), 100);
          }).catch(e =>{
            console.log(e);
            vm.$message.error("Password is incorrect");
          });
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    },

    editProfile() {
      if (this.accountType == "Candidate")
        this.$router.push("/candidate-registration");
      else {
        this.$router.push("/representative-registration");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.input-label {
  font-size: 12px;
  color: rgb(0, 0, 0, .5);
}
.panel-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: calc(100vh - 90px);
  overflow: hidden;
  border: 2px solid #dddddd78;
  border-radius: 15px;
  background: #ffffff 0% 0% no-repeat padding-box;
  margin: 12px 15px !important;
  opacity: 1;
  @media (min-width: 320px) and (max-width: 600px) {
    flex-direction: column;
    overflow: hidden;
    height: 100%;
  }
  .panel-verify-content {
    display: flex;
    width: 100%;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    padding: 20px;
    overflow: auto;
    margin: 5px;
    //border-left: 1px solid #b7b5b5;

  }
  .panel-content {
    display: flex;
    width: 100%;
    justify-content: flex-start;
    align-items: flex-start;
    &.border-content {
      border-right: 1px solid #ddd;
      padding: 10px;
    }
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    //margin: 8px;
    @media (min-width: 320px) and (max-width: 600px) {
      overflow: hidden;
      border-top: 1px solid #ddd;
      //margin: 8px;
    }
    .content-identity {
      margin: 5px;
      width: 100%;
      padding: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .identity {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .verify-button {
          .v-btn__content {
            font-size: 1rem !important;
          }
        }

        .router-link {
          color: #0aa3e1;
          text-decoration: none;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
    .identity-footer {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      //color: #b7b5b5;
      font-weight: 600;
      font-size: 14px;
      padding-top: 50px;
      text-align: center;
      width: 85%;
    }
    .content {
      margin: 5px;
      width: 100%;
      padding: 5px;
      .header-content {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
      .contact-details {
        display: flex;
        flex-direction: column;
        line-height: 30px;
        border-bottom: 1px solid #cbbfbf;
        padding-bottom: 10px;
      }
      .password-details {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #cbbfbf;
        padding-bottom: 10px;
      }

      .block-button {
        .v-custom:hover {
          background: #fff !important;
          color: #d81b60 !important;
          border: 1px solid #d81b60 !important;
    
          img {
          filter: none !important;
          }
        }
      }
    }
  }
}
</style>

