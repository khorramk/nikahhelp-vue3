<template>
  <div>
    <div class="agreementDetail">
      <a-modal
        v-model="modal2Visible"
        title="Agreement Detail"
        width="900px"
        centered
        @ok="() => (modal2Visible = false)"
      >
        <div style="overflow-y:scroll; height: 500px; overflow-x:hidden">

          <CookiesAgreement />
        </div>
      </a-modal>

      <a-modal
        v-model="preferenceModalVisible"
        title="Cookies Preference"
        width="575px"
        centered
        @ok="preferenceModalVisible = false; handleOk()"
        :ok-text="'Accept'"
      >
			<div style="overflow-y:scroll; height: 500px; overflow-x:hidden">

        <CookiesPreference @allowAllCookies="allowAllCookies" />
			</div>
      </a-modal>
    </div>
    <div
      id="lawmsg"
      class="alert alert-info alert-dismissible h6 fade show fixed-bottom"
      role="alert"
      v-if="!modal2Visible && !cookiesDataExists && adVisible"
    >
      <button
        type="button"
        class="close"
        data-dismiss="alert"
        aria-label="Close"
      >
      
      <span aria-hidden="true">&times;</span>
      </button>
      
           <div class="cookie-policy-popup">We use essential cookies to make our site work. With your consent, we may also use non-essential cookies to improve user experience and analyse website traffic.  By clicking “Accept, you consent to our use of cookies as described in our <span style="color: #1976d2; cursor: pointer;" @click="modal2Visible = true">Privacy and Cookie Policy.</span> You can change your cookie settings at any time by clicking  <button class="settingButton" @click="preferenceModalVisible = true">“Preferences.”</button></div>

           <!-- <div class="cookie-policy-popup">We use cookies on this website to distinguish you from other users. 
             We use this data to enhance your experience and do not use it for targeted advertising by any third party organisations. 
             By continuing to use this website you consent to our use of cookies.
             For more information please see our <button class="settingButton" @click="modal2Visible = true">cookies policy.</button> </div> -->

      <div class="buttons">
        <button type="submit" @click="handleOk" class="acceptButton">
          Necessary cookies only
        </button>
        <button type="submit" @click="preferenceModalVisible = true" class="acceptButton">
          Preferences
        </button>

      </div>
    </div>
  </div>
</template>
<script>
  import CookiesAgreement from './CookiesAgreement';
  import CookiesPreference from './CookiesPreference';
  import JwtService from '../../services/jwt.service';

  export default {
    name: 'Cookies',
    components: { CookiesAgreement, CookiesPreference },
    data() {
      return {
        modal2Visible: false,
        preferenceModalVisible: false,
        adVisible: true,
      };
    },
    methods: {
      handleOk() {
        JwtService.saveCookies(1);
        this.adVisible = false;
      },
      // handleDecline() {
      //   JwtService.saveCookies(0);
      //   this.adVisible = false;
      // },
      allowAllCookies() {
        JwtService.saveCookies(1);
        this.adVisible = false;
        this.preferenceModalVisible = false;
      }
    },
    computed: {
      cookiesDataExists() {
        let data = JwtService.getCookies();
        if (data == 0 || data == 1) {
          return true;
        } else {
          return false;
        }
      },
    },
  };
</script>

<style scoped lang="scss">
  .acceptButton {
    background-color: rgb(255, 255, 255);
    min-width: 120px;
    color: #0c5460;
    border-color: transparent;
    border-radius: 5px;
    margin-left: 0.5em;
    display: inline-block;
    padding: 0.4em 0.8em;
    font-size: 0.9em;
    font-weight: 700;
    border-width: 2px;
    border-style: solid;
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
    margin-top: 0px;
    margin-bottom: 10px;
  }

  .acceptButton:hover
  {
       background-color: #f19cc4;
       color: black;
       box-shadow: 3px 3px rgb(221, 221, 221);
  }

  #lawmsg
  {
    margin-bottom: 0px;
  }

  .buttons {
    float: right;
    padding-top: 10px;
  }


  .settingButton {
    font-weight: bold;
    text-decoration: underline;
    color: #0c5460;
    padding-left: 0px;
   
  }

  .settingButton:hover {
    color: #367681;
  }


  .modal {
    text-align: center;
  }
  .modal-dialog {
    display: inline-block;
    width: auto;
  }
  .ant-modal-body {
    /* padding: 24px; */
    font-size: 14px;
    line-height: 1.5;
    word-wrap: break-word;
  }


  .cookie-policy-popup{
    text-align: justify;
    margin-bottom: 0px;
    box-sizing: border-box;
    
  }

</style>
