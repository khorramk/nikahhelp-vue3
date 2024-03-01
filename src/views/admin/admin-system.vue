<template>
  <div >
    <AdminLayout>
      <router-view></router-view>
    </AdminLayout>

  </div>
</template>

<script>
import Footer from "@/components/admin/layout/Footer.vue";
export default {
  data() {
    return {
      user: {},
    };
  },
  components: {Footer},
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>

</style>
