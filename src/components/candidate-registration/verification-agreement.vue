<template>
  <div class="success-message font-poppins">
    <div>
      <h3 class="mt-3 fw-700 text-black-50 header-text">ID Verification</h3>
      <p class="mt-4">We wish to provide genuine and ID verified candidates.</p>
      <p class="mt-4">
        To connect, a team must have the candidate and at least one
        representative ID verified.
      </p>

      <p class="mt-4">You can upload your ID now or later.</p>
      <p class="mt-4">
        If you choose to do this later, you can do it through your personal
        settings screen. By proceeding you agree to do this in line with your
        consent and agreement to the MatrimonyAssist terms and conditions.
      </p>
      <p class="mt-5 verify-text fs-20">Do you wish to upload your ID now?</p>

      <!-- <p class="mt-4">
        Please press Yes button to complete the
        <span class="type-access">ID</span> Verification.
      </p>
      <p class="mt-4">Or please press No button to ignore it.</p> -->

      <div class="actions">
        <button
          :class="{ active: showDisAgree }"
          @click="
            handleClick(false);
            showDisAgree = true;
            showAgree = false;
          "
          class="btn mb-2 text-nowrap agree-button"
        >
          No
        </button>
        <button
          :class="{ active: showAgree }"
          @click="
            handleClick(true);
            showAgree = true;
            showDisAgree = false;
          "
          class="btn  text-nowrap agree-button"
        >
          Yes
        </button>
      </div>
      <!-- <br /><br /><br /><br /> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "VerificationAgreement",
  components: {},
  data() {
    return {
      showAgree: null,
      showDisAgree: null,
    };
  },
  created() {},
  methods: {
    handleClick(value) {
      this.showAgree = value;
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
  //background-color: #dddae0;
  background-color: #9f9bca;
  padding: 0px 20px;
  //color: #282626;
  color: #fff;
  height: 36px;
  min-width: 50%;
  border-radius: 60px;
  &.active {
    background-color: #6159a7;
    color: #dddae0;
  }

  &:hover {
    background-color: $bg-secondary;
    box-shadow: 1px 1px 1px grey;
    border: 1px solid $bg-secondary;
  }
}

.animation {
  animation-name: pulse;
  animation-duration: 2s;
  animation-iteration-count: 1;
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
  flex-direction: column;
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

@keyframes pulse {
  50% {
    transform:  scale(.8);
  }
  100% {
    transform: scale(1);
  }
}
</style>