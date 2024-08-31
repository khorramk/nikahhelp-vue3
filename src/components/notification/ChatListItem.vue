<template>
  <div class="notification-list">
    <div class="flex position-relative">
      <div class="avatar-area">
        <img class="avatar" width="45" height="45"
             :src="item.logo ? item.logo + `?token=${token}` : getImage()" alt="">
        <span :class="{'online-icon-avatar': isOnline()}"></span>
      </div>
      <div class="content">
        <span class="label">{{ item.label }}</span>
        <h4 class="mt-1 fs-14">{{ item.name }}</h4>
        <!-- <p class="mb-0 text-margin">{{ item.message && item.message.body ? messageStr(item.message.body) : '' }}</p> -->
        <p class="mb-0 text-margin" :class="{'font-weight-bold': !alreadySeen }">{{ lastMsg ? messageStr(lastMsg.body) : item.message && item.message.body ? messageStr(item.message.body) : '' }}</p>
      </div>
      <span class="online-icon" v-if="newMessages || !alreadySeen"></span>
      <a-dropdown v-if="status == 'connected'">
        <a class="ant-dropdown-link dropdown-box" @click="e => e.preventDefault()">
          <MoreOutlined class="fs-28 font-weight-bolder br-50 bg-c9 color-primary icon-30"/>
        </a>
        <a-menu slot="overlay" class="text-center px-2">
          <a-menu-item class="border-bottom">
            <a class="fs-12 color-primary">Accept</a>
          </a-menu-item>
          <a-menu-item class="border-bottom">
            <a class="fs-12 text-danger">Reject</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
    <div class="flex chat-bottom-place justify-content-between">
      <div class="date pb-2">{{ item.typing_text }}</div>
      <!-- <div class="date pb-2">{{ item.message ? messageCreatedAt(item.message.created_at) : '' }}</div> -->
      <div class="date pb-2">{{ lastMsg ? messageCreatedAt(lastMsg.created_at) : item.message ? messageCreatedAt(item.message.created_at) : '' }}</div>
    </div>
  </div>
</template>

<script>
import {format} from "timeago.js";
import InfoImg from '@/assets/info-img.png';
import {
  MoreOutlined
} from '@ant-design/icons-vue';

export default {
  name: 'ChatListItem',
  props: {
    item: {
      type: Object
    },
    status: {
      type: String
    },
    online_users: {
      type: Array
    },
    teamMembers: {
      type: Array,
      required: false
    },
    index: {
      type: Number,
      required: false
    },
    newMessages: {
      type: Boolean,
      required: false
    },
    lastMsg: {
      type: Object,
      required: false
    }
  },
  components: {
    MoreOutlined
  },

  data() {
    return {
      token: "",
      InfoImg
    }
  },
  created() {
    this.token = JSON.parse(localStorage.getItem('token'));
  },
  computed: {
    loggedUser() {
      return JSON.parse(localStorage.getItem('user')) ?? null;
    },
    alreadySeen() {
      if(this.item.message.id == this.item.last_seen_msg_id || this.item.last_seen_msg_id == this.lastMsg?.id) {
        console.log(this.item.message, this.item.last_seen_msg_id, 'already seen true');
        return true;
      }
      console.log(this.item.message, this.item.last_seen_msg_id, 'already seen false');
      return false;
    }
  },
  methods: {
    messageCreatedAt(time) {
      if (time) {
        return format(time);
      }
      return '';
    },

    messageStr(body){
      if (body.length>20){
        return body.substr(0,20) + '...'
      }
      return body
    },

    isOnline() {
      const label = {
        'Group chat': this.onlineTeam(),
        'Team member': this.onlineUser(),
        'Private chat': this.onlineUser(),
      };

      return  this.item.label !== '' ? label[this.item.label] : false;
    },

    onlineTeam() {
      let team_members = [];

      team_members = this.parseTeamMembersIdsIfExist();

      return this.online_users.find(onlineUser => this.thatHasIn(team_members, onlineUser)) !== undefined;
           
    },

    thatHasIn(members, user) {
      return members.includes(parseInt(user));
    },

    parseTeamMembersIdsIfExist() {
        return this.item && this.teamMembers && this.teamMembers.length > 0 ?  this.parseTeamMembersId() : [];
    },

    parseTeamMembersId() {
        return this.teamMembers.map(memberId => {
          return this.loggedUser?.id != memberId ? parseInt(memberId) : memberId;
        });
    },

    onlineUser() {
      return this.item && this.item.other_mate_id && this.online_users.includes(parseInt(this.item.other_mate_id))
    },

    getImage() {
      return InfoImg;
    }
  }
}
</script>

<style lang="scss" scoped>
.text-margin {
  margin-top: 0px;
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
      top: 32px;
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
