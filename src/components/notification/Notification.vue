<template>
	<div class="border-bottom pt-4 position-relative notification-box cursor-pointer" @click="toggleReadStatus()">
		<div class="flex flex-div px-2">
      <img width="30" height="30" src="@/assets/icon/bell-fill-primary.svg" alt="avatar" >
      <div class="flex flex-column ml-2">
        <span class="notification-headline py-2"><strong>{{ notification && notification.sender && notification.team_id && notification.sender.full_name ? notification.sender.full_name : '' }}</strong> {{ notification.title }}</span>
<!--        <p class="notification-text">-->
<!--          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard-->
<!--        </p>-->
      </div>
    </div>
    <h4 class="notification-time-text text-end mr-2">{{ createdAt(notification.created_at) }}</h4>
    <div class="status-box position-absolute bg-brand" v-if="notification.seen == 0"></div>
	</div>
</template>

<script>
import {format} from "timeago.js";
// import Notification from "@/common/notification.js";

export default {
	name: "Notification",
	props: ["notification"],
  data() {
    return {
      avatarSrc: "https://www.w3schools.com/w3images/avatar2.png",
    }
  },
  methods: {
    createdAt(time) {
      if (time) {
        return format(time);
      }
      return '';
    },
    toggleReadStatus() {

    }
  },
  mounted() {
    // console.log(Notification.storeNotification({ id: 1 }))
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.flex-div {
  .user-circle-img {
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }
  .flex {
    .notification-headline {
      font-size: 14px;
    }
    .notification-text {
      font-size: 12px;
      color: #a7a7a7;
    }
  }
}
.notification-time-text {
  font-size: 14px;
  color: $color-primary;
}
.status-box {
  width: 8px;
  height: 8px;
  top: 12px;
  right: 8px;
  border-radius: 50%;
}
.bg-brand {
  background: #E51F76
}
.notification-box:hover {
  background: #d7d6d6;
  border-radius: 8px;
}
</style>
