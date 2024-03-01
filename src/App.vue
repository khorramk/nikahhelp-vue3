<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    window.VAPP = this;
  },
  created() {
    console.log("created called from app.vue");
    var user_id = this.$store.state.user.user.id; //this.user_id;
    if (user_id !== null || user_id !== "") {
      console.log("inbox loaded for:", user_id);
      this.$store.dispatch("getConversations", user_id);
      this.$store.dispatch("getMsgs");
      this.$store.dispatch("getUnreadRecords", user_id);
    }
  },
};
</script>



<style lang="scss">
@import "../node_modules/ant-design-vue/dist/antd.css";
@import "@/styles/style";

.ant-card-head-title {
  font-size: 50px;
}
.main-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.v-application {
  font-family: $body-font-family, 'sans-serif';
}
</style>
