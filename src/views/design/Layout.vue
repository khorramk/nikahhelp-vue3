<template>
  <div class="main-container">
    <MainHeader :collapsed="collapsed" @toggleCollapse="toggleCollapse" />

    <a-layout
      id="layout"
      style="background-color: #fff"
      :style="{ overflow: 'auto' }"
    >
      <a-layout-sider
        :style="{ overflow: 'hidden auto' }"
        class="bg-white shadow-border sidebar-height sidebar-trigger"
        v-model="collapsed"
        :trigger="null"
        collapsible
        :collapsedWidth="28"
        width="250"
        breakpoint="md"
        @breakpoint="responsiveToggle"
      >
        <Sidebar
          :collapsed="collapsed"
          @collapseSideBar="collapsed = !collapsed"
        >
          <!-- <template v-slot:search>
            <SimpleSearch />
          </template> -->
        </Sidebar>
      </a-layout-sider>
      <a-layout>
        <a-layout-content>
          <slot></slot>
        </a-layout-content>
      </a-layout>
    </a-layout>
<!--    <ModalContainer-->
<!--      :modalKey="'manageTeamRedirect'"-->
<!--      :width="'wide'"-->
<!--      :fullscreen="false"-->
<!--      :hideOverlay="false"-->
<!--    >-->
<!--      <ManageTeamRedirect />-->
<!--    </ModalContainer>-->
  </div>
</template>

<script>
import Sidebar from "@/components/dashboard/layout/Sidebar.vue";
// import ManageTeamRedirect from "@/views/design/ManageTeamRedirect.vue";
import { createModalMixin } from "@/plugins/modal/modal.mixin";
import JwtService from "@/services/jwt.service";

export default {
  name: "Layout",
  components: {
    Sidebar,
    // ModalContainer,
    // ManageTeamRedirect,
  },
  created() {
    
  },
  data() {
    return {
      collapsed: false,
      activeTeamId: null,
    };
  },
  mixins: [createModalMixin("manageTeamRedirect")],
  computed: {

  },
  methods: {
    responsiveToggle() {
      this.collapsed = false;
    },
    toggleCollapse() {
      this.collapsed = !this.collapsed;
    },
    checkTurnedOnSwitch() {
      this.activeTeamId = JwtService.getTeamIDAppWide();
    },
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
.name-hover:hover {
  color: #e51f76ff !important;
  text-decoration: underline;
}
//.w-100px {
//  width: 100px;
//}
//.ellipse {
//  white-space: nowrap;
//  overflow: hidden;
//  text-overflow: ellipsis;
//}
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
.sidebar-height {
  height: calc(100vh - 60px);
  @media (min-width: 768px) {
    height: calc(100vh - 70px);
  }
}
.shadow-border {
  box-shadow: none !important;
  border-right: 2px solid #dddddd78 !important;
}

.sidebar-trigger {
  .d-sidebar {
    .trigger {
      background: #fff !important;
      color: #6159a7 !important;
      box-sizing: border-box;
      cursor: pointer;
      box-shadow: none !important;
      border: 2px solid #dddddd78 !important;
      border-right: 0px !important;
      
      &:hover {
        color: #fff !important;
        background: #6159a7 !important;
        border: none !important;
      }
    }
  }
}
</style>