<template>
  <div class="overlay-container">
    <v-overlay :opacity="1" :value="isLoading">
      <v-progress-circular :size="100" :width="7" color="#522e8e" indeterminate>
        {{ text }}
      </v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: "Loading",
    },
  },
};
</script>
<style lang="scss">
.overlay-container {
  .v-overlay {
    // z-index: 0 !important;
    .v-overlay__scrim {
      background: none !important;
    }
  }
  .v-overlay__content {
    background: #fff !important;
    padding: 10px !important;
    border-radius: 10px !important;
  }
}
</style>