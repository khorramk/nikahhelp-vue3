<template>
  <div class="container-admin">
  <AdminHeader/>

    <a-layout
      id="layout"
      style="background-color: #fff"
      :style="{ overflow: 'auto', height: 'calc(100vh - 80px)' }"
    >
      <a-layout-sider
        class="bg-white shadow-default"
        v-model="collapsed"
        :trigger="null"
        collapsible
        :collapsedWidth="28"
        width="250"
        breakpoint="sm"
        @breakpoint="responsiveToggle"
      >
        <Sidebar
          :collapsed="collapsed"
          @collapseSideBar="collapsed = !collapsed"
        />
      </a-layout-sider>
      <a-layout>
        <a-layout-content>
          <slot></slot>
        </a-layout-content>
      </a-layout>
    </a-layout>
    <!-- <Footer /> -->
  </div>
</template>

<script>
import Sidebar from "@/components/admin/layout/AdminSidebar.vue";
import AdminHeader from "@/components/admin/layout/AdminHeader.vue";
import Footer from "@/components/admin/layout/Footer.vue";
export default {
  components: {
    Sidebar,
    Footer,
    AdminHeader
  },
  data() {
    return {
      collapsed: false,
      user: {},
    };
  },
  methods: {
    responsiveToggle() {
      this.collapsed = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.container-admin {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100vh;
  .ant-layout {
    height: calc(100vh - 90px) !important;
  }
}
.notification-wrapper {
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 3px 8px 1px #d3d3d3;
  border-radius: 5px;
}
.header-nav-icons .nav-item {
  position: relative;
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
  }
  .team {
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
</style>