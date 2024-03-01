<template>
  <div class="d-sidebar" style="padding-right: 15px">
    <ul class="sidebar-list" v-show="!collapsed">
      <li class="list-item">
        <router-link to="/admin/dashboard" class="d-flex align-items-center">
          <img
            class="mr-3"
            src="@/assets/icon/dashboard.png"
            alt="icon"
          />
          <span class="mb-0">Dashboard</span>
        </router-link>
      </li>
      <!-- <li class="list-item">
        <router-link to="/admin/approval" class="d-flex align-items-center">
          <img
            class="mr-3"
            src="@/assets/icon/check2.svg"
            alt="icon"
          />
          <span class="mb-0">Pending Approvals</span>
          <a-badge
            class="ml-auto"
            :number-style="{ backgroundColor: '#e42076' }"
            count="0"
          />
        </router-link>
      </li> -->
      <li class="list-item">
        <router-link to="/admin/users" class="d-flex align-items-center">
          <img
            class="mr-3"
            src="@/assets/icon/person-fill-secondary.svg"
            alt="icon"
          />
          <!-- <span class="mb-0">Approved Users</span> -->
          <span class="mb-0">Users</span>
          <a-badge
            class="ml-auto"
            :number-style="{ backgroundColor: '#e42076' }"
            count="0"
          />
        </router-link>
      </li>
      <li class="list-item">
        <router-link to="/admin/teams" class="d-flex align-items-center">
          <img
            class="mr-3"
            src="@/assets/icon/group-fill-secondary.svg"
            alt="icon"
          />
          <span class="mb-0">Team List</span>
          <a-badge
            class="ml-auto"
            :number-style="{ backgroundColor: '#e42076' }"
            count="0"
          />
        </router-link>
      </li>
      <li class="list-item">
        <router-link to="/admin/flag" class="d-flex align-items-center">
          <img
            class="mr-3"
            src="@/assets/icon/star-fill-secondary.svg"
            alt="icon"
          />
          <span class="mb-0">Flag</span>
        </router-link>
      </li>
      <li class="list-item">
        <router-link to="/admin/support" class="d-flex align-items-center">
          <img
            class="mr-3"
            src="@/assets/icon/support-secondary.svg"
            alt="icon"
          />
          <span class="mb-0">Support</span>
        </router-link>
      </li>
      <li class="list-item">
        <router-link to="/admin/system_admin" class="d-flex align-items-center">
          <img
            class="mr-3"
            src="@/assets/icon/connection-secondary.svg"
            alt="icon"
          />
          <span class="mb-0">System Admin</span>
        </router-link>
      </li>
      <li class="list-item">
        <router-link to="/admin/system-notification" class="d-flex align-items-center">
          <img
            class="mr-3"
            src="@/assets/icon/connection-secondary.svg"
            alt="icon"
          />
          <span class="mb-0">System Notification</span>
        </router-link>
      </li>
    </ul>
    <!-- <ul class="links" v-show="!collapsed">
      <li><a href="#">Help</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Safety & Guidance</a></li>
      <li><a href="#">Terms & Conditation</a></li>
      <li><a href="/privacy-policy">Privacy Policy & Cookie Policy</a></li>
    </ul> -->
    <div class="trigger" @click="$emit('collapseSideBar')">
      <a-icon
        :type="collapsed ? 'caret-right' : 'caret-left'"
        style="font-size: 20px"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  components: {},
  props: ["collapsed"],
  methods: {
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
          vm.$router.push("/");
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
@media (min-width: 576px) {
  .sidebar-trigger {
    display: flex;
  }
}
.d-sidebar {
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  position: relative;
  background-color: $bg-white;
  .sidebar-list {
    a {
      color: $color-secondary;
    }
    .list-item > a {
      padding: 8px 15px;
      display: block;
      transition: all 0.4s;

      &:hover {
        background: $bg-secondary;
        color: $color-white;
        text-decoration: none;
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
    & > li {
      font-size: 12px;
      margin-bottom: 2px;
    }
  }
}
</style>
