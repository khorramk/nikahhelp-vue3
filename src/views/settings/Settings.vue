<template>
  <div>
    <Loader v-if="isLoading" :isLoading="isLoading" />
    <div v-else>
      <Setting />
    </div>
  </div>
</template>

<script>
import Setting from "@/components/setting/Setting.vue";
export default {
  name: "CreateTeam5",
  components: {
    Setting,
  },
  data() {
    return {
      isLoading: false,
      user: {},
      is_verified: 1,
    };
  },
  created() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  },
  methods: {},
};
</script>
<style lang="scss" scoped>

</style>
