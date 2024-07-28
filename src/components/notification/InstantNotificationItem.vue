<template>
  <div class="flex py-2 px-2 position-relative">
    <BellFilled class="color-primary fs-24" size="large"/>
    <div class="flex flex-column ml-2">
      <h4 class="border-bottom pb-2 fs-14 pr-2"><strong class="fs-16">{{ notification.team_temp_name }}</strong> has new notification</h4>
      <h4 class="pb-2 fs-14"><b>{{ notification && notification.sender && notification.team_id && notification.sender.full_name ? notification.sender.full_name : '' }}</b> {{ notification.title }}</h4>
      <!--        <p class="instant-notification-text">-->
      <!--          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard-->
      <!--          dummy text ever since the 1500s-->
      <!--        </p>-->
      <h4 class="text-end fs-12 color-primary">Just now</h4>
    </div>
    <div class="position-absolute close-btn cursor-pointer" @click="closeInstantNotification">&#10006;</div>
  </div>
</template>

<script>
import { BellFilled } from '@ant-design/icons-vue';

export default {
  name: "InstantNotificationItem",
  props: ['notification', 'index'],
  components: {
    BellFilled
  },
  data() {
    return {
      instantNotification: false,
      timer: 0
    }
  },
  methods: {
    closeInstantNotification() {
      this.instantNotification = false;
      this.timer = 0;
      this.$emit("closeInstantNotification", this.index);
    }
  },
  created() {
    const self = this;
    setInterval(() => {
      self.timer += 1;
      if(self.timer > 10) {
        self.closeInstantNotification();
      }
    }, 1000);
  }
}
</script>

<style scoped>

</style>