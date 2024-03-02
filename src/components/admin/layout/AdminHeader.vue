<template>
  <header class="header-container bg-secondary shadow-default radius-none px-4">
    <div
      class="header-content d-flex align-items-center justify-content-between"
    >
      <div class="shrink-none none-mobile">
        <router-link to="/" class="navbar-brand">
          <img
            width="120"
            src="@/assets/Icons/Logo/SVG/White Logo.svg"
            alt="logo"
          />
        </router-link>
      </div>

      <div
        class="header-right user-avatar-area shrink-none mobile-menu"
        style="align-self: center;"
      >
    
        <div class="mobile-menu" style="display: flex;">
          <a-dropdown>
            <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
              <img
                v-if="loggedUser.per_main_image_url"
                class="avatar-image"
                :src="loggedUser.per_main_image_url"
                alt=""
              />
              <img
                v-if="!loggedUser.per_main_image_url"
                class="avatar-image"
                src="@/assets/mike.jpg"
                alt=""
              />
            </a>
            <a-menu slot="overlay" class="none-mobile-block">
              <a-menu-item @click="logout">
                <img width="22" src="@/assets/icon/logout.svg" alt="icon" />
                <span class="ml-2">Logout</span>
              </a-menu-item>
            </a-menu>
          </a-dropdown>

          <div style="align-self: center">
            <div class="ml-2 text-white">
              <a-dropdown>
                <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
                  <router-link class="" to="/profile">
                    <h6 class="mb-0 text-white fs-14 name-hover">
                      {{
                        loggedUser && loggedUser.full_name
                          ? loggedUser.full_name
                          : "N/A"
                      }}
                    </h6>
                  </router-link>
                </a>
                <a-menu slot="overlay" class="none-mobile-block">
          
                  <a-menu-item @click="logout">
                    <img width="22" src="@/assets/icon/logout.svg" alt="icon" />
                    <span class="ml-2">Logout</span>
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
              
            </div>
          </div>
        </div>
        <div class="d-sm-none">
          <a-dropdown :trigger="['click']">
            <svg
              @click="(e) => e.preventDefault()"
              xmlns="http://www.w3.org/2000/svg"
              class="menu-icon-alt"
              fill="#fff"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>

            <a-menu slot="overlay" style="min-width: 320px">
              <a-menu-item @click="$emit('toggleCollapse')">
                <img width="22" src="@/assets/Icons/form.svg" alt="icon" />
                <span class="ml-2"
                  >{{ collapsed ? "Open" : "Close" }} left sidebar</span
                >
              </a-menu-item>
              <a-divider class="m-0" />
              <a-menu-item @click="logout">
                <img width="22" src="@/assets/icon/logout.svg" alt="icon" />
                <span class="ml-2">Logout</span>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import NotificationPopup from "@/components/notification/NotificationPopup.vue";
import ApiService from "@/services/api.service";
import JwtService from "../../../services/jwt.service";
export default {
  name: "AdminHeader",
  props: ['collapsed'],
  components: {
    NotificationPopup,
  },
  created() {
   
  },
  data() {
    return {
      activeTeamId: null,
      teamsForHeader: [],
      teamsOriginal: []
    };
  },
  computed: {
    loggedUser() {
      let loggedUser = JSON.parse(localStorage.getItem("user"));
      if (loggedUser) {
        return loggedUser;
      }
      return null;
    },

  },
  methods: {
    responsiveToggle() {
      this.collapsed = false;
    },
    popupDiv() {
      document.getElementById('layout');
    },
    async loadNotifications() {
      await ApiService.get("v1/list-notification")
        .then((response) => {
          this.$store.state.notification.notifications = response.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async loadTeams() {
      let {data} = await ApiService.get("v1/team-list").then(res => res.data);
      this.teamsForHeader = data;
      this.teamsOriginal = data;
      this.$store.state.team.team_list = this.teamsOriginal;
      this.checkTurnedOnSwitch();
      
    },
    checkTurnedOnSwitch() {
      this.activeTeamId = JwtService.getTeamIDAppWide();
    },
    logout() {
      const vm = this;
      this.$confirm({
        title: "Are you sure?",
        content: "Do you want to logout?",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        async onOk() {
          await vm.$store.dispatch("logout");
          vm.$router.replace("/admin/login");
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    },
    verifyPopup() {
      const self = this;
      self.$confirm({
        icon: "info-circle",
        title: "Your account is not verified. Please verify the account",
        okText: 'Verify Now',
        center: true,
        confirmLoading: true,
        onOk() {
          self.$router.push({name: 'Settings'});
        },
      });
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/base/_variables.scss";
.main-container {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.notification-wrapper {
  padding: 10px;
  background-color: #fff;
  //box-shadow: 0 3px 8px 1px #d3d3d3;
  box-shadow: 0 3px 8px 1px rgb(0 0 0 / 12%);
  border-radius: 5px;
}
.header-nav-icons .nav-item {
  position: relative;
}
.mobile-menu {
  width: 100%;
  @media (min-width: 768px) {
    width: auto;
  }
}
.menu-icon-alt {
  width: 25px;
  color: #fff;
  margin-left: 10px;
}
.header-nav-icons .nav-item .ant-dropdown-open img,
.header-nav-icons .nav-item .ant-dropdown-open svg {
  outline: 8px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
}
.notification__items {
  overflow-y: scroll;
  max-height: 350px;
}
.user-avatar-area {
  .avatar-image {
    border-radius: 50%;
    outline: 2px solid #ddd;
    width: 35px;
    height: 35px;
  }
  .team-active {
    display: inline-block;
    background-color: #fff;
    border-radius: 10px;
    font-size: 11px;
    position: relative;
    padding-right: 20px;
    cursor: pointer;
    &::after {
      content: "";
      position: absolute;
      top: 5px;
      right: 6px;
      background-color: #4aa02c;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      box-shadow: 0px 0px 3px 1px #639e4e;
    }
  }
  .team-deactive {
    display: inline-block;
    background-color: #fff;
    border-radius: 10px;
    font-size: 11px;
    position: relative;
    padding-right: 20px;
    cursor: pointer;
    &::after {
      content: "";
      position: absolute;
      top: 5px;
      right: 6px;
      background-color: $bg-brand;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      box-shadow: 0px 0px 3px 1px $border-brand;
    }
  }
  .role {
    display: inline-block;
    border: 1px solid rgb(99, 99, 99);
    border-radius: 10px;
    font-size: 11px;
    position: relative;
    text-align: center;
  }
}

.avatar-dropdown {
  background-color: #fff;
  box-shadow: 0 3px 8px 1px #d3d3d3;
  padding: 5px;
  border-radius: 4px;
  min-width: 150px;
  padding: 10px;
  .list-item {
    text-align: center;
    & > span {
      font-size: 11px;
    }
    & > p {
      background-color: #ddd;
      font-size: 13px;
      border-radius: 2px;
    }
  }
}
.name-hover:hover {
  color: #e51f76ff !important;
  text-decoration: underline;
}

.none-mobile {
  display: none;
  @media (min-width: 768px) {
    display: flex;
  }
}
.none-mobile-block {
  display: none;
  @media (min-width: 768px) {
    display: block;
  }
}
.header-container {
  padding-top: 10px;
  padding-bottom: 10px;
  @media (min-width: 768px) {
    padding-top: 0;
    padding-bottom: 0;
  }
}
@keyframes flickerAnimation {
  0%   { opacity:1; }
  50%  { opacity:0; }
  100% { opacity:1; }
}
@-o-keyframes flickerAnimation{
  0%   { opacity:1; }
  50%  { opacity:0; }
  100% { opacity:1; }
}
@-moz-keyframes flickerAnimation{
  0%   { opacity:1; }
  50%  { opacity:0; }
  100% { opacity:1; }
}
@-webkit-keyframes flickerAnimation{
  0%   { opacity:1; }
  50%  { opacity:0; }
  100% { opacity:1; }
}
.animate-flicker {
  -webkit-animation: flickerAnimation 1s infinite;
  -moz-animation: flickerAnimation 1s infinite;
  -o-animation: flickerAnimation 1s infinite;
  animation: flickerAnimation 1s infinite;
}
</style>