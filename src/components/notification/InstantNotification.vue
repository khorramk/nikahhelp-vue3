<template>
  <div class="position-absolute notification-popup">
    <instant-notification-item class="inst-notification-box shadow-default"
                               v-for="(notification, index) in notifications"
                               :key="index"
                               :class="{'mt-4': index > 0}"
                               :notification="notification"
                               :index="index"
                               @closeInstantNotification="closeInstantNotification"/>
  </div>
</template>

<script>
import InstantNotificationItem from "./InstantNotificationItem.vue";

export default {
  name: "InstantNotification",
  components: {InstantNotificationItem},
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
    ping: function (data) {
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    }
  },
  data() {
    return {
      notifications: [],
      ws: null
    }
  },
  methods: {
    closeInstantNotification(index) {
      this.notifications.splice(index, 1);
    }
  },
  mounted() {
    const self = this;
    let loggedUser = JSON.parse(localStorage.getItem('user'));
    this.ws = new WebSocket(`${import.meta.env.VITE_CHAT_SERVER}`);

    this.ws.onopen = function () {
      self.ws.send(JSON.stringify({
        action: 'ping',
        user_id: loggedUser.id,
        component: 'instant_notification'
      }));
    }

    this.ws.onmessage = function (event) {
      const res = JSON.parse(event.data);
      
      if(res.event == 'receive_notification') {
        self.notifications.push(res.data);
        self.$store.state.notification.notifications.unshift(res.data);
        self.$store.state.notification.instantNotifications.unshift(res.data);
      } else if(res.event == 'ping_success') {
        self.$store.state.chat.online_users = res.data.online_users;
      }
    };
  }
}
</script>

<style lang="scss">
@import "@/styles/base/_variables.scss";

.notification-popup {
  bottom: 20px;
  left: 20px;
}

.inst-notification-box {
  width: 280px;
  background: #FFFFFF;
  z-index: 9;
  border-radius: 8px;
  @media (min-width: 992px) {
    width: 400px;
  }
}

.instant-notification-text {
  font-size: 12px;
  color: #a7a7a7;
  margin-top: -10px;
}

.close-btn {
  top: 8px;
  right: 6px;
  z-index: 999;
}
</style>