<template>
  <div class="success-message font-poppins">
    <div>
      <h3 class="mt-3 fw-700 text-black-50 header-text">ID Verification</h3>
      <p class="mt-4">
        We wish to provide genuine and ID verified representative.
        </p>
  <p class="mt-4">
       To connect, a team must have the candidate and at  least one representative ID verified.
        </p>


  <p class="mt-4">
        You can upload your ID now or later. </p>
          <p class="mt-4">
        If you choose to do this later, you can do it through your personal settings screen. By proceeding you agree to do this in line with your consent and agreement to the MatrimonyAssist terms and conditions.
        </p>
      <p class="mt-5 verify-text fs-20">Do you wish to upload your ID now?</p>


      <!-- <p class="mt-4">
        Please press Yes button to complete the
        <span class="type-access">ID</span> Verification.
      </p>
      <p class="mt-4">Or please press No button to ignore it.</p> -->
      
      <div class="actions">
        <button
          @click="handleClick(false)"
          class="btn ms-2 text-nowrap disagree-button"
        >
          No
        </button>
        <button
          @click="handleClick(true)"
          class="btn ms-2 text-nowrap agree-button"
        >
          Yes
        </button>
      </div>


    </div>
  </div>
</template>

<script>
export default {
  name: "VerificationAgreement",
  components: {},
  data() {
    return {};
  },
  created() {},
  methods: {
    handleClick(value) {
      this.$emit("agree", value);
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.success-message {
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  text-align: center;
  h4 {
    font-family: $body-font;
  }
  h4 {
    color: #42bf28;
  }
  img {
    height: 80px;
  }
  //   button {
  //     background-color: $color-secondary;
  //     padding: 0px 20px;
  //     color: white;
  //   }
}
.header-text {
  font-family: $body-font;
  font-size: 32px;
}
.agree-button {
  background-color: $color-secondary;
  padding: 0px 20px;
  color: white;
  height: 36px;
  border-radius: 60px;
}
.disagree-button {
  background-color: #dddae0;
  padding: 0px 20px;
  color: #282626;
  height: 36px;
  border-radius: 60px;
}
.type-access {
  color: $color-primary;
  text-decoration: underline;
  font-weight: 700;
}
.continue-button {
  height: 36px;
  border-radius: 60px;
}

.actions {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.header-container {
  flex-shrink: 0;
}
.body-container {
  flex-grow: 1;
  overflow: auto;
  min-height: 2em;
}
.footer-container {
  flex-shrink: 0;
}
.body-container::-webkit-scrollbar {
  display: none;
}
</style>