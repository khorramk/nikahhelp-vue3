<template>
  <Modal :id="'manageteam-item'">
    <template #header></template>

    <template #body>
      <div class="dt-modal-content">
        <div class="container-fluid">
          <div class="flex mobile-column">
            <div class="column-margin">
              <div class="flex flex-column">
                <div class="dt-div1 color-primary ml-1 d-mb-none"><span>Opps. This menu feature are inactive</span></div>
                <div class="dt-div2">
                  <span class="span1">Turn</span> <span class="span2">ON</span>
                </div>
                <div class="ml-2">
                  <h3 class="text-white request-text">To use this feature, please turn a team on first.</h3>
                  <h3 class="text-white request-text">
                    You can easily do this from header icon
                    <router-link to="/manageteam">
                      <img
                          width="30"
                          src="@/assets/icon/group-fill-white.svg"
                          alt="img"
                          class="manage-team-icon"
                      /></router-link>
                  </h3>
                </div>
                <div class="dt-div3 ml-2">
                  <div class="text-white"><span class="ortext">or</span> &nbsp; <router-link to="/manageteam" class="manage-team-link button-link"> <span>&#8592;</span> Manage Team </router-link></div>
                </div>
                <div class="ml-2">
                  <span class="link-text">Don't have a team? please</span>
                  <span class="link-text ml-2 text-decoration-underline italic"><router-link to="/manageteam" class="manage-team-link"> create </router-link></span>
                  <span class="link-text ml-2"> or</span>
                  <span class="link-text ml-2 text-decoration-underline italic"><router-link to="/manageteam" class="manage-team-link"> join </router-link></span>
                  <span class="link-text ml-2"> a team</span>
                </div>
                <h4 class="info-text">
                  * The information of this page relates to team that you turned ON. <span class="text-decoration-underline font-weight-bold cursor-pointer learn-text italic">learn more...</span>
                </h4>
              </div>
            </div>
            <div class="position-relative column-margin">
              <img src="@/assets/team_off.png" alt="img" class="team-img-pos" v-if="!turnOn" />
              <img src="@/assets/team_on.png" alt="img" class="team-img-pos" v-if="turnOn" />
              <div class="switch-box">
                <a-switch class="position-absolute switch-icon" v-model="turnOn" disabled />
              </div>
            </div>
            <div class="dt-div1 color-primary ml-1 mb-4 d-dk-none"><span>Opps. This menu feature are inactive</span></div>
          </div>
        </div>
      </div>
    </template>

    <template #options> </template>
  </Modal>
</template>

<script>
import Modal from "@/plugins/modal/modal.vue";
export default {
  name: "Layout",
  components: {
    Modal,
  },
  created() {
    const self = this;
    setInterval(() => {
      self.turnOn = !self.turnOn;
    }, 2000);
  },
  data() {
    return {
      dialog: true,
      collapsed: false,
      turnOn: false,
    };
  },
};
</script>

<style lang="scss">
@import "@/styles/base/_variables.scss";
//.manageteam-item {
//  background: #826ae5;
//  height: 100vh;
//  overflow: hidden;
//  .dt-modal--body {
//    display: flex;
//    flex-direction: column;
//    height: calc(100vh - 80px);
//    overflow-y: auto;
//
//    .dt-modal-content {
//      height: 100%;
//      display: flex;
//      flex-direction: column;
//      align-items: flex-start;
//      justify-content: unset;
//      margin-top: 2rem;
//      //margin-left: 8rem;
//      padding: 0;
//      @media (min-width: 768px) {
//        padding: 0 2rem;
//      }
//    }
//  }
//  .notification-wrapper {
//    padding: 10px;
//    background-color: #fff;
//    box-shadow: 0 3px 8px 1px #d3d3d3;
//    border-radius: 5px;
//  }
//  .header-nav-icons .nav-item {
//    position: relative;
//  }
//  .menu-icon-alt {
//    width: 25px;
//    color: #fff;
//    margin-left: 10px;
//  }
//  .header-nav-icons .nav-item .ant-dropdown-open img,
//  .header-nav-icons .nav-item .ant-dropdown-open svg {
//    outline: 8px solid rgba(255, 255, 255, 0.5);
//    border-radius: 50%;
//    background-color: rgba(255, 255, 255, 0.5);
//  }
//  .notification__items {
//    overflow-y: scroll;
//    max-height: 350px;
//  }
//  .user-avatar-area {
//    .avatar-image {
//      border-radius: 50%;
//      outline: 2px solid #ddd;
//    }
//    .team {
//      display: inline-block;
//      background-color: #fff;
//      border-radius: 10px;
//      font-size: 11px;
//      position: relative;
//      padding-right: 20px;
//      cursor: pointer;
//      &::after {
//        content: "";
//        position: absolute;
//        top: 5px;
//        right: 6px;
//        background-color: #4aa02c;
//        width: 6px;
//        height: 6px;
//        border-radius: 50%;
//        box-shadow: 0px 0px 3px 1px #639e4e;
//      }
//    }
//    .role {
//      display: inline-block;
//      border: 1px solid rgb(99, 99, 99);
//      border-radius: 10px;
//      font-size: 11px;
//      position: relative;
//      text-align: center;
//    }
//  }
//
//  .avatar-dropdown {
//    background-color: #fff;
//    box-shadow: 0 3px 8px 1px #d3d3d3;
//    padding: 5px;
//    border-radius: 4px;
//    min-width: 150px;
//    padding: 10px;
//    .list-item {
//      text-align: center;
//      & > span {
//        font-size: 11px;
//      }
//      & > p {
//        background-color: #ddd;
//        font-size: 13px;
//        border-radius: 2px;
//      }
//    }
//  }
//}
//
//.dt-div1 {
//  background: #fff;
//  padding: 5px 15px 5px 15px;
//  font-size: 1rem;
//  border-radius: 12px;
//  font-weight: bold;
//  @media (min-width: 992px) {
//    font-size: 2rem;
//    width: fit-content;
//  }
//}
//.dt-div2 {
//  font-size: 3rem;
//  text-align: center;
//  margin-top: 30px;
//  @media (min-width: 768px) {
//    text-align: left;
//  }
//  @media (min-width: 992px) {
//    font-size: 7rem;
//    text-align: left;
//    margin-top: -10px;
//  }
//  .span1 {
//    color: #fff;
//    font-weight: 700;
//  }
//  .span2 {
//    font-weight: 700;
//    color: #35cf65;
//    font-size: 3rem;
//    @media (min-width: 992px) {
//      font-size: 7rem;
//    }
//  }
//}
//h3 {
//  color: #fff;
//}
//.dt-div3 {
//  display: flex;
//  align-items: center;
//  padding-bottom: 1rem;
//  a {
//    color: #fff;
//    font-size: 15px;
//    border: 2px solid;
//    border-radius: 45px;
//    font-family: "Open Sans", sans-serif;
//    padding-left: 20px;
//    padding-right: 20px;
//    @media (min-width: 768px) {
//      font-size: 20px;
//    }
//    @media (min-width: 992px) {
//      font-size: 1.5rem;
//    }
//  }
//}
//
//.dt-div4 {
//  display: flex;
//  a {
//    color: #fff;
//    font-size: 1.5rem;
//    font-family: "Open Sans", sans-serif;
//    font-style: italic;
//  }
//}
//.manage-team-link {
//  color: #FFFFFF !important;
//  padding-top: 2px;
//  padding-bottom: 5px;
//}
//.manage-team-link:hover {
//  color: $color-brand !important;
//  border: none;
//}
//.button-link:hover {
//  background: #FFFFFF;
//}
//.manage-team-icon {
//  margin-top: -6px;
//}
//.request-text {
//  padding-bottom: 1rem;
//  font-size: 16px;
//  @media (min-width: 768px) {
//    font-size: 20px;
//  }
//  @media (min-width: 992px) {
//    font-size: 24px;
//    padding-bottom: .2rem;
//  }
//}
//.mobile-column {
//  flex-direction: column-reverse;
//  @media (min-width: 768px) {
//    flex-direction: row;
//  }
//}
//.team-img-pos {
//  width: 100%;
//  margin-bottom: 20px;
//  @media (min-width: 768px) {
//    width: 385px;
//    margin-bottom: 0;
//  }
//  @media (min-width: 1200px) {
//    margin-left: 30px;
//  }
//  @media (min-width: 1500px) {
//    margin-left: 40px;
//  }
//}
//.column-margin {
//  margin: 0 10px;
//  @media (min-width: 768px) {
//    margin: 0 10px;
//  }
//  @media (min-width: 1920px) {
//    margin: 0 10px;
//  }
//}
//.switch-icon {
//  top: 10px;
//  right: 22px;
//  @media (min-width: 360px) {
//    top: 13px;
//    right: 25px;
//  }
//  @media (min-width: 360px) {
//    top: 18px;
//  }
//  @media (min-width: 460px) {
//    top: 23px;
//  }
//  @media (min-width: 460px) {
//    top: 34px;
//    right: 40px;
//  }
//  @media (min-width: 768px) {
//    top: 12px;
//    right: 30px;
//  }
//  @media (min-width: 992px) {
//    top: 18px;
//  }
//  @media (min-width: 1200px) {
//    top: 20px;
//    right: -8px;
//  }
//}
//.name-hover:hover {
//  color: #e51f76ff !important;
//  text-decoration: underline;
//}
//.none-mobile {
//  display: none;
//  @media (min-width: 768px) {
//    display: flex;
//  }
//}
//.none-mobile-block {
//  display: none;
//  @media (min-width: 768px) {
//    display: block;
//  }
//}
//.header-container {
//  padding-top: 10px;
//  padding-bottom: 10px;
//  @media (min-width: 768px) {
//    padding-top: 0;
//    padding-bottom: 0;
//  }
//}
//.link-text {
//  font-size: 15px;
//  color: #FFFFFF;
//  @media (min-width: 768px) {
//    font-size: 22px;
//  }
//  @media (min-width: 992px) {
//    font-size: 24px;
//  }
//}
//.switch-box > .ant-switch {
//  background: $bg-brand;
//}
//.switch-box > .ant-switch-checked {
//  background: $bg-primary;
//}
//.ortext {
//  font-size: 20px;
//  @media (min-width: 768px) {
//    font-size: 28px;
//  }
//  @media (min-width: 992px) {
//    font-size: 32px;
//  }
//}
//.ant-switch-disabled {
//  opacity: 1 !important;
//}
//.info-text {
//  color: #0d5cebd1;
//  margin-top: 16px;
//  font-size: 14px;
//  margin-bottom: 20px;
//  font-weight: 300;
//  @media (min-width: 768px) {
//    font-size: 18px;
//  }
//  @media (min-width: 1200px) {
//    font-size: 24px;
//  }
//}
//.learn-text:hover {
//  color: $bg-brand;
//}
//.d-dk-none {
//  @media (min-width: 768px) {
//    display: none;
//  }
//}
//.d-mb-none {
//  display: none;
//  @media (min-width: 768px) {
//    display: block;
//  }
//}
//.italic {
//  font-style: italic;
//}
</style>