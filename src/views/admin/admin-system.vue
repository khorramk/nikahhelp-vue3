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
      ws: null
    };
  },
  components: {Footer},
  created() {},
  mounted() {
    let loggedUser = JSON.parse(localStorage.getItem('user'));
    let self = this;
    this.ws = new WebSocket(`${import.meta.env.VITE_CHAT_SERVER}`);

    this.ws.onopen = function () {
      self.ws.send(JSON.stringify({
        action: 'ping',
        user_id: loggedUser.id,
        component: 'admin'
      }));
    }

    this.ws.onmessage = function (event) {
      try {
        const res = JSON.parse(event.data);
        if(res.event == 'ping_success') {
          self.$store.state.chat.online_users = res.data.online_users;
        }
      } catch (error) {
        const res = event.data;
        console.log('error', res);
        return;
      }
    }

    this.ws.onclose = function (event) {
      console.log('ws closed', event);
    }
    
  },
};
</script>

<style lang="scss" scoped>

</style>
