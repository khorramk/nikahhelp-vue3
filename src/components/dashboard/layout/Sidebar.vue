<template>
  <div>
    <div class="d-sidebar" style="display: block">
      <template v-if="showMenu && path == 'AdvanceSearch'">
        <div class="mt-1">
          <SidebarHeader @onClickBack="showMenu = false" v-if="!collapsed" />
          <div v-if="!collapsed" class="mt-2 pl-2 pr-3">
            <slot name="search"> </slot>
          </div>
        </div>
      </template>
      <template v-else>
        <div style="padding: 5px 15px 5px 5px">
          <ul class="sidebar-list" v-show="!collapsed">
            <li @click.prevent="showMenu = true" class="list-item">
              <router-link to="/search"
                ><img
                  class="mr-3"
                  src="@/assets/icon/search-love-primary.svg"
                  alt="icon"
                />Search Your Match
              </router-link>
            </li>
            <li class="list-item">
              <router-link to="/manageteam" class="flex align-items-center">
                <img
                  class="mr-3"
                  src="@/assets/icon/manage_team.svg"
                  alt="icon"
                />
                <span class="mb-0">Manage Team</span>
                <!--						<a-badge-->
                <!--							class="ml-2"-->
                <!--							:number-style="{ backgroundColor: '#e42076'}"-->
                <!--							count="100"-->
                <!--						/>-->
              </router-link>
            </li>
            <li class="list-item">
              <router-link to="/connections" class="flex align-items-center">
                <img
                  class="mr-3"
                  src="/assets/icon/connect-s-primary.svg"
                  alt="icon"
                />
                <span class="mb-0">Connection</span>
                <!--						<a-badge-->
                <!--							class="ml-2"-->
                <!--							:number-style="{ backgroundColor: '#e42076'}"-->
                <!--							count="17"-->
                <!--						/>-->
              </router-link>
            </li>
            <li class="list-item">
              <router-link to="/shortlist"
                ><img
                  class="mr-3"
                  src="@/assets/icon/star-fill-secondary.svg"
                  alt="icon"
                />Shortlist
              </router-link>
            </li>
            <li class="list-item">
              <router-link to="/notifications" class="flex align-items-center">
                <img
                  class="mr-3"
                  src="@/assets/icon/bell-fill-secondary.svg"
                  alt="icon"
                />
                <span class="mb-0">Notification</span>
                <a-badge
                  class="ml-2"
                  :number-style="{ backgroundColor: '#e42076' }"
                  :count="unreadNotification"
                />
              </router-link>
            </li>
            <li class="list-item">
              <router-link to="/chat-window" class="flex align-items-center">
                <img
                  class="mr-3"
                  src="@/assets/icon/chat.svg"
                  alt="icon"
                />
                <span class="mb-0">Chat</span>
                <a-badge
                  class="ml-2"
                  :number-style="{ backgroundColor: '#e42076' }"
                  :count="unseenChat"
                />
              </router-link>
            </li>
            <li class="list-item">
              <router-link to="/blocklist"
                ><img
                  class="mr-3"
                  src="@/assets/icon/block-secondary.svg"
                  alt="icon"
                />Block List
              </router-link>
            </li>
            <li class="list-item">
              <router-link to="/profile"
                ><img
                  class="mr-3"
                  src="@/assets/icon/profile.svg"
                  alt="icon"
                />Profile
              </router-link>
            </li>
            <li class="list-item">
              <router-link to="/subscription"
                ><img
                  class="mr-3"
                  src="@/assets/icon/subscription.svg"
                  alt="icon"
                />Subscription
              </router-link>
            </li>
            <!-- <li class="list-item">
              <router-link to="/settings">
                <img
                  class="mr-3"
                  src="@/assets/icon/gear-fill-secondary.svg"
                  alt="icon"
                />Setting
              </router-link>
            </li> -->
            <!--				<li class="list-item">-->
            <!--					<a href="#"-->
            <!--						><img-->
            <!--							class="mr-3"-->
            <!--							src="@/assets/icon/support-secondary.svg"-->
            <!--							alt="icon"-->
            <!--						/>Support</a-->
            <!--					>-->
            <!--				</li>-->
            <!--				<li class="list-item">-->
            <!--					<router-link to="/settings"-->
            <!--						><img-->
            <!--							class="mr-3"-->
            <!--							src="@/assets/icon/gear-fill-secondary.svg"-->
            <!--							alt="icon"-->
            <!--						/>Setting-->
            <!--					</router-link>-->
            <!--				</li>-->
            <!--				<li class="list-item">-->
            <!--					<a @click.prevent="logout"-->
            <!--						><img-->
            <!--							class="mr-3"-->
            <!--							src="@/assets/icon/logout.svg"-->
            <!--							alt="icon"-->
            <!--						/>Logout</a-->
            <!--					>-->
            <!--				</li>-->
          </ul>
          <ul class="links" v-show="!collapsed">
            <li><router-link to="/help">Help</router-link></li>
            <li><router-link to="/about">About</router-link></li>
            <li>
              <router-link to="/safety_guidance">Safety & Guidance</router-link>
            </li>
            <li>
              <router-link to="/user-agreement"> User Agreement </router-link>
            </li>
            <li>
              <router-link to="/terms_condition"
                >Terms & Conditions</router-link
              >
            </li>

            <li>
              <router-link to="/privacy-cookie-policy"
                >Privacy & Cookie Policy</router-link
              >
            </li>
          </ul>
        </div>
      </template>
      <div class="trigger" @click="$emit('collapseSideBar')" :class="{'hide-sidebar': collapsed}">
        <a-icon
          :type="collapsed ? 'caret-right' : 'caret-left'"
          style="font-size: 20px"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SidebarHeader from "@/components/dashboard/layout/SidebarHeader.vue";
export default {
  name: "Sidebar",
  components: {
    SidebarHeader,
  },
  data: () => ({
    showMenu: true,
  }),
  watch: {
    isSearchBtnClicked() {
      this.showMenu = true;
      console.log(this.showMenu, "showMenu from sidebar")
    },
  },
  computed: {
    path() {
      return this.$route.name;
    },
    unreadNotification() {
      return this.$store.state.notification.instantNotifications.length;
    },
    chats() {
      return this.$store.state.chat.chats;
    },
    unseenChat() {
      let count = 0;
      this.$store.state.chat.chats.forEach(item => {
        count = count + item && item.message && item.message.seen == 0 ? 1 : 0;
        count = count + item && item.last_message && item.last_message.seen == 0 ? 1 : 0;
        count = count + item && item.last_group_message && item.last_message.seen == 0 ? 1 : 0;
      });
      return count;
    },
    isSearchBtnClicked() {
      return this.searchBtnClicked;
    }
  },
  props: {
    collapsed: Boolean,
    searchBtnClicked: Boolean,
  },
  methods: {
    // goToChat(){
    // 	alert('go to chat clicked');
    // 	this.$router.push('chat-window');
    // },
    // goToConnection(){
    // 	alert('go to connection clicked');
    // 	this.$router.push('connections');
    // },
    logout() {
      console.log("Logout clicked");
      const vm = this;
      this.$confirm({
        title: "Are you sure?",
        content: "Do you want to logout?",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        async onOk() {
          await vm.$store.dispatch("logout");
          vm.$router.replace("/");
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.sidebar-trigger {
  display: none;
}
@media (min-width: 767px) {
  .sidebar-trigger {
    display: flex;
  }
}
.d-sidebar {
  // padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  position: relative;
  background-color: $bg-white;
  .sidebar-list {
    padding-left: 0;
    a {
      color: $color-secondary;
    }
    .list-item > a {
      padding: 8px 15px;
      display: block;
      transition: all 0.4s, box-shadow 0s;
      margin-bottom: 5px;
      border: 1px solid #fff;
      border-radius: 20px;

      &:hover {
        background: $bg-secondary;
        color: $color-white;
        text-decoration: none;
        box-shadow: 1.5px 1.5px 1.5px rgb(177, 171, 171, 0.5);
        img {
          filter: brightness(0) invert(1);
        }
      }
      img {
        width: 24px;
      }
    }

    .list-item > a.router-link-active {
      background: $bg-secondary;
      color: $color-white;
      text-decoration: none;
      box-shadow: 1.5px 1.5px 1.5px rgb(177, 171, 171, 0.7);
      img {
        filter: brightness(0) invert(1);
      }
    }
  }
  .trigger {
    position: absolute;
    top: 50%;
    translate: transformY(-50%);
    right: 0px;
    background: $bg-primary;
    color: $bg-white;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 48px;
    border-top-left-radius: 100px;
    border-bottom-left-radius: 100px;
    border-bottom: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    cursor: pointer;
    box-shadow: -2px 2px 4px 2px #cfcfcf;
  }
  .links {
    padding: 5px;
    position: fixed;
    bottom: 0;
    & > li {
      font-size: 12px;
      margin-bottom: 2px;
      a {
        color: #a5a5a5;
        &:hover {
          color: #6159a7;
        }
      }
    }
  }
}
.hide-sidebar {
  display: none !important;
  @media (min-width: 768px) {
    display: flex !important;
  }
}
</style>
