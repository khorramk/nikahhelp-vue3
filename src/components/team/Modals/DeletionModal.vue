<template>
  <div>
    <!-- <a-button type="primary" @click="showModal">
      Open Modal with async logic
    </a-button> -->
    <!-- <a-modal
      title="Title"
      :open="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <p>{{ ModalText }}</p>
    </a-modal> -->

    <a-modal
      :open="showModalProp"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <h6 slot="title">Please Read Before Deleting Your Team</h6>
      <p class="fs-14">
        Please note if you delete your team you will not be able to get it back.
      </p>
      <p class="fs-14">
        If you delete your team while you are still subscribed, regrettably no refund will be issued as per MatrimonyAssist terms and conditions.
      </p>
      <p class="fs-14">
        Any team you are connected with will be informed that you have deleted the team.
      </p>
      <p class="fs-14">
        All your team members will be informed that you deleted the team and they will no longer be able to access your team.
      </p>
      <!-- <p style="margin-bottom: 5px" class="font-weight-bold">Enter Password</p>
      <a-input-password
        placeholder="Enter Team Password"
        v-model="passwordTeam"
      /> -->

      <div class="w-75">
        <label for="" class="input-label mb-2 fs-16 font-weight-bold">Type team password:</label>
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
      </div>

      <!-- <p class="font-weight-bold" style="margin-top: 10px; margin-bottom: 5px">
        Please Describe Reason for Deletion
      </p>
      <a-textarea
        placeholder="Reason Type"
        v-model="deletionReasonType"
        :auto-size="{ minRows: 1, maxRows: 1 }"
      />
      <a-textarea
        style="margin-top: 12px"
        placeholder="Reason Detail"
        :auto-size="{ minRows: 2, maxRows: 6 }"
        v-model="deletionReasonDetail"
      /> -->

      <template slot="footer">
        <a-button key="back" shape="round" @click="handleCancel">
          Cancel
        </a-button>
        <a-button key="submit" type="primary" shape="round" :loading="deleteTeamLoading" @click="handleOk">
          Ok
        </a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
  export default {
    name: 'DeletionModal',
    props: ['showModalProp', 'deleteTeamLoading'],
    data() {
      return {
        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false,

        passwordTeam: '',
        deletionReasonType: '',
        deletionReasonDetail: '',
        showPassword: false,
        showPasswordError: false,
      };
    },
    methods: {
      handleOk(e) {
        console.log('Clicked Ok');
        this.$emit('handleOk', {
          passwordTeam: this.passwordTeam,
          deletionReasonType: this.deletionReasonType,
          deletionReasonDetail: this.deletionReasonDetail,
        });
        this.passwordTeam = '';
      },
      handleCancel(e) {
        this.$emit('handleCancel');
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
            this.passwordTeam = "";
            this.$refs[passwordType].forEach(element => {
              this.passwordTeam += element.value;
            });
          }
        }
      },
      handleShowPassword(passwordType) {
        this.$refs[passwordType].forEach(element => {
          element.type = element.type == 'text' ? 'password' : 'text';
        })
      },
    },
  };
</script>

<style scoped lang="scss">
.input-label {
  margin: 0px 0px 1px 2px; 
  //color: rgb(0, 0, 0);
}
.password-input-box {
  height: 40px;
  //width: 100px;
  width: 40px;
  border: 1px solid #8f8f8f;
  border-radius: 5px;

  &:hover {
    border-color: #b7deff;
  }
  
}



</style>
