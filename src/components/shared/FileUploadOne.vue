<template>
  <a-upload
    name="file"
    :multiple="false"
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    :headers="headers"
    @change="handleChange"
  >
    <a-button shape="round"> <a-icon type="upload" /> Click to Upload </a-button>
  </a-upload>
</template>
<script>
  export default {
    name: 'FileUploadOne',
    props: ['handleChangeFromProp', 'nameFromVerification'],

    created() {
      // console.log(this.handleChangeFromProp);
      // console.log(this.nameFromVerification);
    },
    data() {
      return {
        headers: {
          authorization: 'authorization-text',
        },
      };
    },
    methods: {
      handleChange(info) {
        this.handleChangeFromProp(info, this.nameFromVerification);
        // if (info.file.status !== 'uploading') {
        //   console.log(info.file, info.fileList);
        // }
        // if (info.file.status === 'done') {
        //   this.$message.success(`${info.file.name} file uploaded successfully`);
        // } else if (info.file.status === 'error') {
        //   this.$message.error(`${info.file.name} file upload failed.`);
        // }
      },
    },
  };
</script>
