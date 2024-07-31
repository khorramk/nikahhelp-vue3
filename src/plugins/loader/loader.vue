<template>
  <div class="overlay-container">
    <v-overlay class="loader-overlay" :opacity="1" :isLoading="isLoading" v-model="isOpen">
      <v-progress-circular :size="100" :width="7" color="#522e8e" indeterminate>
        {{ text }}
      </v-progress-circular>
    </v-overlay>
    <!-- <v-progress-circular
      color="blue-lighten-3"
      model-value="20"
      :size="89"
      :width="7"
      indeterminate
    >
      loading
    </v-progress-circular>
      hello -->
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
  computed: {
    isOpen() {
      return this.isLoading;
    },
  },
};
</script>
<style lang="scss" scoped>
.loader-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep() {
  .v-overlay__scrim {
    background: none;
  }
  .v-overlay__content {
    background: #fff;
    padding: 10px;
    border-radius: 10px;
  }
}
</style>