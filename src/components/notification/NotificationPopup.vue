<template>
  <div class="notification-wrapper"
       :class="{'chat-wrapper': useFor == 'chat',
       'team-wrapper': useFor == 'team',
       'shortlist-wrapper': useFor == 'shortlist',}">
    <div>
      <div class="dropdownNotify-title py-2 d-flex align-items-center justify-content-between">
        <strong class="text-capitalize">{{ label }}</strong>
        <span class="mark-all-btn" v-if="label == 'notification'" @click="markAllAsRead">Mark all as read</span>
        <!--                <span v-if="count > 0" class="ml-2 count">{{ count }}</span>-->
      </div>
    </div>
    <div class="dropdown-divider"></div>
    <div class="notification__items" v-if="useFor != 'chat'">
      <a-list
          size="small"
          v-for="(itemObj, index) in items"
          :key="index"
          item-layout="horizontal"
          :data-source="[{title: 'user one'}]"
          style="border-bottom: 1px solid rgb(235, 235, 235);"
      >
        <a-list-item slot="renderItem" slot-scope="item" class="notification-item" :class="{'notification-seen' : itemObj.seen, 'notification-unseen' : !itemObj.seen}">
          <slot name="item" :item="item">
            <component :is="componentName" :item="itemObj" :index="index"></component>
          </slot>
        </a-list-item>

      </a-list>
    </div>
    <div class="notification__items" v-else>
      <a-list
          size="small"
          v-for="(itemObj, index) in items"
          :key="index"
          item-layout="horizontal"
          :data-source="[{title: 'user one'}]"
          style="border-bottom: 1px solid rgb(235, 235, 235);"
          @click="openChatWindow(itemObj.label == 'Connected Team' ? 'connected' : 'group')"
      >
        <a-list-item slot="renderItem" slot-scope="item">
          <slot name="item" :item="item">
<!--            <component :is="componentName" :item="itemObj" :index="index"></component>-->
            <ConnectedTeamChat
                v-if="itemObj.label == 'Connected Team'"
                :item="itemObj"
                :status="'connected'"
                :online_users="getOnlineUsers"
                :teamMembers="getTeamMembers"
                :activeTeam="getActiveTeam"
                :online="false"
                action
                class="w-full pr-3 cursor-pointer"
                style="min-width: 300px"
            />
            <ChatListItem
                v-else
                :item="itemObj"
                :status="'recent'"
                :online_users="getOnlineUsers"
                :teamMembers="getTeamMembers"
                action
                class="w-full pr-3 cursor-pointer"
                style="min-width: 300px"
            />
          </slot>
        </a-list-item>

      </a-list>
    </div>
    <div class="text-center pt-2">
      <router-link :to="{ name: link }">{{ buttonLabel }}</router-link>
    </div>
  </div>
</template>

<script>
import { notificationMixin } from "../../mixins/notification.js";
import NotificationChatItem from "./NotificationChatItem.vue";
import NotificationListItem from "./NotificationListItem.vue";
import ShortListItem from "./ShortListItem.vue";
import TeamListItem from "./TeamListItem.vue";
import ChatListItem from "./ChatListItem.vue";
import ConnectedTeamChat from "../chat/ConnectedTeamChat.vue";
import ButtonComponent from "../atom/ButtonComponent.vue";

const selectComponent = {
  chat: {
    component: 'NotificationChatItem',
    label: 'chat',
    buttonLabel: 'Show all chat',
    link: 'ChatWindow'
  },
  notification: {
    component: 'NotificationListItem',
    label: 'notification',
    buttonLabel: 'Show all notification',
    link: 'NotificationPage'
  },
  shortlist: {
    component: 'ShortListItem',
    label: 'shortlist',
    buttonLabel: 'Show all shortlist',
    link: 'Shortlist'
  },
  team: {
    component: 'TeamListItem',
    label: 'Quick team active',
    buttonLabel: 'Manage all team',
    link: 'ManageTeam'
  },

}
export default {
  name: 'NotificationPopup',
  props: {
    useFor: {
      type: String,
      required: true
    },
    items: {
      type: [Array, Object],
      required: true
    },
    count: {
      type: Number,
      default: () => 0
    }
  },
  components: {
    NotificationListItem,
    ShortListItem,
    TeamListItem,
    NotificationChatItem,
    ChatListItem,
    ConnectedTeamChat,
    ButtonComponent
  },
  mixins: [notificationMixin],
  computed: {
    componentName() {
      return selectComponent[this.useFor].component;
    },
    label() {
      return selectComponent[this.useFor]?.label || 'label';
    },
    buttonLabel() {
      return selectComponent[this.useFor]?.buttonLabel || '';
    },
    link() {
      return selectComponent[this.useFor]?.link || 'label';
    },
    getItems() {
      return this.items;
    },
    getTeamMembers() {
      return this.$store.state.chat.teamMembers
    },
    getActiveTeam() {
      return this.$store.state.chat.activeTeam;
    },
    getOnlineUsers() {
      return this.$store.state.chat.online_users;
    }
  },
  methods: {
    openChatWindow(type) {
      if(this.$route.name != 'ChatWindow'){
        this.$router.push({
          name: 'ChatWindow',
          params: {
            connection_id: type == 'connected' ? true : false,
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/base/_variables.scss";
.notification-wrapper {
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 3px 8px 1px rgb(0 0 0 / 12%);
  border-radius: 5px;
  margin-top: -150px;
  @media (min-width: 768px) {
    margin-top: 0;
  }
}
.team-wrapper {
  margin-top: -75px;
  @media (min-width: 768px) {
    margin-top: 0;
  }
}
.chat-wrapper {
  margin-top: -175px;
  @media (min-width: 768px) {
    margin-top: 0;
  }
}
.shortlist-wrapper {
  margin-top: -100px;
  @media (min-width: 768px) {
    margin-top: 0;
  }
}
.notification__items {
  overflow-y: scroll;
  max-height: 350px;

  .notification-item {
    background-color:rgb(82, 46, 142, 0.1); 
    border-radius: 15px; 
    margin-bottom: 2px;
  }

  .notification-seen {
    background-color: #fff;
  }
  .notification-unseen {
    padding-left: 8px !important;
  }
}

.count {
  width: 20px;
  height: 20px;
  padding: 4px;
  border-radius: 50%;
  background-color: #e42076;
  color: #fff;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mark-all-btn {
  font-size: 12px;
  color: $bg-secondary;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}
</style>