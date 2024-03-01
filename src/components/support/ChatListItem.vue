<template>
  <div class="notification-list">
    <div class="flex position-relative">
      <div class="avatar-area">
        <img class="avatar" width="45" height="45"
             src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="">
<!--        <span :class="{'online-icon-avatar': ifOnline}"></span>-->
      </div>
      <div class="content">
        <h4 class="mt-1 fs-14">{{ item && item.user ? item.user.full_name : '' }}</h4>
        <p class="mb-0 text-margin">{{ item && item.last_message ? item.last_message.body : '' }}</p>
      </div>
      <span class="online-icon" v-if="item && item.last_message && item.last_message.seen == 0"></span>
<!--      <a-dropdown>-->
<!--        <a class="ant-dropdown-link dropdown-box" @click="e => e.preventDefault()">-->
<!--          <a-icon type="more" class="fs-28 font-weight-bolder br-50 bg-c9 color-primary icon-30"/>-->
<!--        </a>-->
<!--        <a-menu slot="overlay" class="text-center px-2">-->
<!--          <a-menu-item class="border-bottom">-->
<!--            <a class="fs-12 color-primary">Accept</a>-->
<!--          </a-menu-item>-->
<!--          <a-menu-item class="border-bottom">-->
<!--            <a class="fs-12 text-danger">Reject</a>-->
<!--          </a-menu-item>-->
<!--        </a-menu>-->
<!--      </a-dropdown>-->
    </div>
    <div class="flex chat-bottom-place justify-content-end pr-4">
<!--      <div class="date">{{ item.typing_text }}</div>-->
      <div class="date">{{ item && item.last_message ? messageCreatedAt(item.last_message.created_at) : '' }}</div>
    </div>
  </div>
</template>

<script>
import {format} from "timeago.js";

export default {
  name: "ChatListItem",
  props: ['item'],
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
.text-margin {
  margin-top: -8px;
}
.icon-30 {
  height: 30px;
  width: 30px;
}
.notification-list {
  //max-width: 300px;
  //min-width: 300px;
  .online-icon {
    flex-shrink: 0;
    width: 10px;
    height: 10px;
    display: block;
    background-color: #e42076;
    margin: 10px;
    border-radius: 50%;
    box-shadow: 0px 0px 4px 2px #e775a7;
  }

  .avatar-area {
    position: relative;

    .avatar {
      border-radius: 50%;
      border: 2px solid #4AA02C;
      position: relative;
      display: block;
    }

    .online-icon-avatar {
      position: absolute;
      width: 10px;
      height: 10px;
      bottom: 0px;
      right: 0;
      background: #4AA02C;
      border-radius: 50%;
      border: 2px solid #fff;
      box-sizing: content-box;
    }
  }

  .content {
    margin-left: 12px;
    flex: auto;

    h4 {
      font-size: 13px;
    }

    p {
      font-size: 12px;
    }

    .label {
      background-color: #7455a7;
      font-size: 10px;
      padding: 1px 4px;
      border-radius: 2px;
      color: #fff;
    }
  }

  .chat-bottom-place {
    margin-left: 56px;

    .date {
      font-size: 12px;
      text-align: right;
      color: #522e8e;
    }
  }
}
.dropdown-box {
  height: 25px;
}
</style>