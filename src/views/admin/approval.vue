<template>
  <div class="panel-container">
    <div class="panel-content border-content">
      <img
        class="mr-3"
        src="@/assets/icon/person-fill-secondary.svg"
        alt="icon"
      />
      <router-link to="/admin/approve_users">
        <a-button
          shape="round"
          type="primary"
          style="float: right"
          class="mt-3"
        >
          Approve Users
        </a-button>
      </router-link>
    </div>
    <div class="panel-content">
      <img class="mr-3" src="@/assets/icon/files.svg" alt="icon" />
      <router-link to="/admin/approve_documents">
        <a-button
          shape="round"
          type="primary"
          style="float: right;width: 160px"
          class="mt-3"
        >
          Approve Documents
        </a-button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.panel-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: calc(100vh - 150px);
  overflow: hidden;
  border: 2px solid #ddd;
  border-radius: 15px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 10px 30px #fff;
  margin: 20px;
  opacity: 1;
  .panel-content {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    &.border-content {
      border-right: 2px solid #ddd;
    }
    flex-direction: column;
    img {
      width: 150px;
    }
    .ant-btn {
      width: 150px;
      height: 35px;
    }
  }
}
</style>