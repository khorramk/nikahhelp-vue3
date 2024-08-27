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
      destroyOnClose
      :open="showModalProp"
      :confirm-loading="confirmLoading"
      class="preference"
      @cancel="handleCancel"
    >
      <h6 slot="title">Team Preferences</h6>
      <span style="font-size: 14px; font-weight: bold">
        Change team pin? 
      </span> <span class="reset-btn" @click="showResetPinModal = true; handleCancel()">Reset pin</span>
      <br />
      <br />

      <div class="justify-content-end">
        <div class="d-flex mobile-column justify-content-end">

          <div class="input-w">
            <a-input-password
              placeholder="Enter current pin"
              v-model:value="old_password"
            />
          </div>
        </div>
      </div>

      <div class="justify-content-end mt-2">
        <div class="d-flex mobile-column justify-content-end">

          <div class="input-w">
            <a-input-password
              placeholder="Enter new pin"
              v-model:value="new_password"
            />
          </div>
        </div>
      </div>
      <div class="justify-content-end mt-2">
        <div class="d-flex mobile-column justify-content-end">

          <div class="input-w">
            <a-input-password
              placeholder="Confirm new pin"
              v-model:value="re_password"
            />
          </div>
        </div>
      </div>

      <!-- <a-divider /> -->

      <!-- <div class="d-flex justify-content-start">
        <span style="font-size: 14px; font-weight: bold; padding-right: 20px">
          Change team Visibility
        </span>
        <div>
          <a-switch
            :default-checked="teamVisibility"
            @change="onChangeTeamVisibility"
          />
        </div>
      </div>
      <div>
        <span style="font-size: 12px"
          >Turning off this team visibility will disable this team and remove
          candidate profile from search & suggetions.</span
        >
        <span style="font-size: 12px"
          >This team candidate can't join to other team as candidate.</span
        >
        <span style="font-size: 12px"
          >Some information may still be visible to others, such as team members
          name in other messagelist and message team members sent.</span
        >
      </div> -->
      <template #footer>
        <a-button key="back" shape="round" @click="handleCancel">
          Cancel
        </a-button>
        <a-button key="submit" type="primary" shape="round" @click="handleOk">
          Ok
        </a-button>
      </template>
    </a-modal>

    <!-- reset pin modal -->
    <a-modal
      :open="showResetPinModal"
      @cancel="showResetPinModal = false"
    >
      <h6 slot="title">Reset Team Pin</h6>
      <span style="font-size: 14px;">
        Your team pin will be set to default pin <span class="font-weight-bold">(1234)</span>. Are you sure you want to reset team pin?
      </span>
      <br />
      <br />

      <template #footer>
        <a-button key="back" shape="round" @click="showResetPinModal = false;">
          Cancel
        </a-button>
        <a-button key="submit" type="primary" shape="round" @click="resetPin">
          Reset
        </a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
  export default {
    name: 'PreferenceModal',
    props: ['showModalProp', 'teamVisibility'],
    data() {
      return {
        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false,

        old_password: '',
        new_password: '',
        re_password: '',

        computed_teamVisibility: this.teamVisibility,
        showResetPinModal: false,
      };
    },
    methods: {
      onChangeTeamVisibility(checked) {
        console.log(checked);
        this.computed_teamVisibility = checked;
      },
      handleOk(e) {
        console.log('Clicked Ok');
        if(this.new_password == '' || this.re_password == '' || this.old_password == '') {
          this.$message.error('Please fill all the fields.');
        }
        else if (this.new_password.length < 4 || this.re_password.length < 4 || this.old_password.length < 4) {
          this.$message.error('Pin must be at least 4 characters long.');
        }
        else if (this.new_password.length > 4 || this.re_password.length > 4 || this.old_password.length > 4) {
          this.$message.error('Pin must be 4 characters long.');
        }
        else if(isNaN(this.new_password) || isNaN(this.re_password) || isNaN(this.old_password)) {
          this.$message.error('Pin must be a number.');
        }
        else if (this.new_password == this.re_password) {
          console.log('emitting');
          this.$emit('handleOk', {
            old_password: this.old_password,
            new_password: this.new_password,
            team_visiblity: this.computed_teamVisibility,
          });
        } else {
          this.$message.error('New pin and re-type new pin does not match');
        }
        this.old_password = '';
        this.new_password = '';
        this.re_password = '';
      },
      handleCancel(e) {
        console.log('Clicked cancel button');
        this.$emit('handleCancel');
      },
      resetPin() {
        this.showResetPinModal = false;
        this.$emit('resetPin');
      },
    },
  };
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.mobile-column {
  width: 100%;
  margin-left: -2px;
  @media (min-width: 360px) {
    width: 90%;
  }
  @media (min-width: 410px) {
    width: 80%;
  }
  @media (min-width: 576px) {
    width: 70%;
  }
}
.align-bottom {
  font-size: 12px;
  padding-top: 5px;
  padding-right: 4px;
  @media (min-width: 768px) {
    font-size: 14px;
    padding-right: 10px;
  }
}
.input-w {
  width: 196px;
  @media (min-width: 768px) {
    width: 200px;
  }
}

.reset-btn {
  color: red;
  text-decoration: underline;
  cursor: pointer;
}
</style>
