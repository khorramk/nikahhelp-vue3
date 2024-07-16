<template>
  <div>
    <a-modal
      destroyOnClose
      :open="showModalProp"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      wrapClassName="custom-modal"
    >
      <div class="text-center" style="padding-bottom: 15px">
        <span style="font-size: 26px; font-weight: bold">
          Change Team Description
        </span>
      </div>

      <div class="container">
        <div class="d-flex justify-content-center">
          <div style="width: 200px; margin-top: 15px">
            <a-input
              placeholder="Type here"
              v-model="teamDescription"
              @change="handleChange"
            />
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
  export default {
    name: 'TNCModal',
    props: ['showModalProp', 'teamData'],
    data() {
      return {
        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false,

        teamDescription: '',
      };
    },
    methods: {
      handleChange(e) {
        console.log(e);
        this.teamDescription = e.target.value;
      },
      handleOk(e) {
        console.log(e.target.value);
        if (this.teamDescription.length == 0) {
          this.$message.info('Nothing Changed');
					this.handleCancel();
          return;
        }
				else{
					this.$emit('handleOk', {teamDescription: this.teamDescription});
					this.handleCancel();
				}
      },
      async handleCancel(e) {
        setTimeout(() => {
          this.teamDescription = '';
        }, 2000);

        console.log('Clicked cancel button');
        this.$emit('handleCancel');
      },
    },
  };
</script>

<style lang="scss">
  .custom-modal {
    .ant-modal-footer {
      border-top: 0px;
    }
  }
</style>
