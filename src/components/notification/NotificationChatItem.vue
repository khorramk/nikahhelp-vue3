<template>
  <div class="notification-list pr-2 position-relative w-full">
    <div class="d-flex align-items-center">
      <img class="avatar" width="45" height="45" :src="item.logo ? item.logo : avatarSrc" alt="icon" />
      <div class="content pr-3">
        <p class="mb-0"><strong>{{ item.conv_title }}</strong> </p>
        <p>{{ item.message }}</p>
      </div>
      <span class="online-icon text-end"></span>
    </div>
    <div class="date">{{ messageCreatedAt(item.created_at) }}</div>
  </div>
</template>

<script>
import {format} from "timeago.js";

export default {
  name: "NotificationChatItem",
  props: {
    item: {
      type: Object
    },
    index: {
      type: Number
    }
  },
  data() {
    return {
      avatarSrc: "https://www.w3schools.com/w3images/avatar2.png",
    }
  },
  methods: {
    messageCreatedAt(time) {
      if (time) {
        return format(time);
      }
      return '';
    },
  }
}
</script>

<style lang="scss" scoped>
.notification-list {
  max-width: 350px;
  .online-icon {
    flex-shrink: 0;
    width: 10px;
    height: 10px;
    display: block;
    background-color: #e42076;
    margin: 10px;
    border-radius: 50%;
    box-shadow: 0px 0px 4px 2px #e775a7;
    position: absolute;
    right: 0;
  }

  .avatar {
    border-radius: 50%;
    border: 2px solid #e9e9e9
  }

  .content {
    margin-left: 12px;
    h4 {
      font-size: 13px;
    }
    p {
      font-size: 12px;
    }
  }

  .date {
    font-size: 12px;
    text-align: right;
    color: #522e8e;
  }
}
</style>