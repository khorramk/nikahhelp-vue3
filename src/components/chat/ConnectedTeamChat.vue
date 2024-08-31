<template>
  <div class="notification-list">
    <div class="flex position-relative">
      <div class="avatar-area">
        <img class="avatar" width="45" height="45"
            :src="getTeamImage" alt="">
        <span :class="{'online-icon-avatar': ifOnline}"></span>
      </div>
      <div class="content">
        <span class="label">{{ item.label }}</span>
        <h4 class="mt-1 fs-14">{{ getTeamName }}</h4>
      <p class="mb-0 text-margin" :class="{'font-weight-bold': !alreadySeen }">{{ messageStr(computedLastMsg) }}</p>
      </div>
      <span class="online-icon" v-if="online.team_connection_id == item.id || !alreadySeen"></span>

      <!-- <a-dropdown v-if="item.is_friend == 0">
        <a class="ant-dropdown-link dropdown-box" @click="e => e.preventDefault()">
          <a-icon type="more" class="fs-28 font-weight-bolder br-50 bg-c9 color-primary icon-30"/>
        </a>
        <a-menu slot="overlay" class="text-center px-2">
          <a-menu-item class="border-bottom" @click="request()">
            <a class="fs-12 color-primary">Request Private Chat</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown> -->
    </div>
    <div class="flex chat-bottom-place justify-content-between">
      <div class="date pb-2">{{ item.typing_text }}</div>
      <div class="date pb-2">{{ item.message ? messageCreatedAt(item.message.created_at) : '' }}</div>
    </div>
  </div>
</template>

<script>
import {format} from "timeago.js";
import ApiService from '@/services/api.service';
import InfoImg from '@/assets/info-img.png';

export default {
  name: "ConnectedTeamChat",
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
    activeTeam: {
      type: Number,
    },
	  online: {
			type: [Boolean, Object],
	  }
  },
  data () {
    return {
      token: "",
      lastMsg: null,
      InfoImg
    }
  },
  created(){
    this.token = JSON.parse(localStorage.getItem('token'));
  },
  watch: {
    online: {
      handler: function (val, oldVal) {
        console.log(val, oldVal, 'online');
        if (val) {
          if(val.team_connection_id == this.item.id) {
            this.lastMsg = val;
          }
        } else {
          this.lastMsg = oldVal;
        }
      },
      // deep: true
    }
  },
  computed: {
    ifOnline() {
      if(this.item.label === 'Connected Team') {
        return this.onlineTeam();
      } else if(this.item.label == 'Team member' || this.item.label == 'Private chat') {
        return this.onlineUser();
      }
      return false;
    },
    getTeamName() {
      if(this.item.from_team_id == this.activeTeam) {
        return this.item.to_team ? this.item.to_team.name : 'N/A';
      } else {
        return this.item.from_team ? this.item.from_team.name : 'N/A';
      }
    },
    getTeamImage() {
      if(this.item.from_team_id == this.activeTeam) {
        return this.item.to_team && this.item.to_team.logo ? this.item.to_team.logo + `?token=${this.token}` : InfoImg;
      } else {
        return this.item.from_team && this.item.from_team.logo ? this.item.from_team.logo + `?token=${this.token}` : InfoImg;
      }
    },
    computedLastMsg() {
      return this.lastMsg ? this.lastMsg.team_connection_id == this.item.id ? this.lastMsg.message :  this.item.message && this.item.message.body ? this.item.message.body : '' : this.item.message && this.item.message.body ? this.item.message.body : '';
    },
    alreadySeen() {
      console.log(this.item.message, this.item.last_seen_msg_id, 'already seen');
      if(this.item.message && this.item.message.id && this.item.last_seen_msg_id && this.item.message.id == this.item.last_seen_msg_id) {
        return true;
      }
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
    
    onlineTeam() {
      let team_members = [];
      let loggedUser = JSON.parse(localStorage.getItem('user'));
      console.log('logged user', loggedUser)
      // if(this.item && this.teamMembers && this.teamMembers.length > 0) {
      //   team_members = this.teamMembers.map(i => {
      //     if(loggedUser.id != i) {
      //       return parseInt(i);
      //     }
      //   });
      // }
      if(this.item && this.item.to_team && this.item.to_team.team_members && this.item.to_team.team_members.length > 0) {
        this.item.to_team.team_members.forEach((item) => {
          team_members.push(item.user.id);
        });
      }
      let online = this.online_users.find(item => team_members.includes(parseInt(item)));
      console.log(online, team_members, 'team members in connected team');
      if(online) {
        return true;
      } else {
        return false;
      }
    },
    onlineUser() {
      if(this.item && this.item.other_mate_id && this.online_users.includes(parseInt(this.item.other_mate_id))) {
        return true;
      } else {
        return false;
      }
    },
    async request() {
      let payload = this.prepareData(0);
      await ApiService.post(`/v1/private-chat-request-accept-reject`, payload)
      .then(response => {
        console.log(response);
        let data = {
          receivers: [payload.to_owner.toString()],
          title: `requested for a private chat`,
          team_id: this.to_team_id,
          event: 'private_chat_request',
          type: 'private-chat'
        };
        this.$emit("socketNotification", data);
      }).catch(e => {
            console.log(e);
          });
    },
    prepareData(type) {
      let payload = {
        team_connection_id: this.item.id,
        type: type
      };
      if(this.item.from_team_id == this.activeTeam) {
        this.conversationTitle = this.item.to_team ? this.item.to_team.name : 'N/A';
        payload.to_team_id = this.item.to_team_id;
      } else {
        this.conversationTitle = this.item.from_team ? this.item.from_team.name : 'N/A';
        payload.to_team_id = this.item.from_team_id;
      }

      if(this.activeTeam == this.item.to_team_id) {
        payload.receiver = this.getCandidate(this.item.from_team.team_members);
        payload.sender = this.getCandidate(this.item.to_team.team_members);
        payload.to_owner = this.getOwner(this.item.from_team.team_members);
      } else {
        payload.receiver = this.getCandidate(this.item.to_team.team_members);
        payload.sender = this.getCandidate(this.item.from_team.team_members);
        payload.to_owner = this.getOwner(this.item.to_team.team_members);
      }
      return payload;
    },
    getCandidate(members) {
      let candidate = members.find(item => item.user_type == 'Candidate');
      if(candidate) {
        return candidate.user_id;
      }
      return null;
    },
    getOwner(members) {
      let owner = members.find(item => item.role == 'Owner+Admin');
      if(owner) {
        return owner.user_id;
      }
      return null;
    },
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