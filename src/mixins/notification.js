import ApiService from "../services/api.service";
export const notificationMixin = {
    methods: {
        async markAllAsRead() {
            this.$store.state.notification.notifications.forEach(item => {
              item.seen = 1;
            });
            await ApiService.get("v1/seen-all-notification").then(response => {
              console.log(response);
              // this.loadNotifications();
            }).catch(e => {
              console.log(e);
              this.$message.error("Something went wrong");
            });
          }
    }
  };