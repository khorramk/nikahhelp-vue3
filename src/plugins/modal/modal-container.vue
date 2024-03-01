\<template>
  <div class="dt-dialog-container">
    <template v-if="containerFlag">
      <v-dialog
        transition="dialog-bottom-transition"
        persistent
        :value="dialogFlag"
        :fullscreen="fullscreen"
        :hide-overlay="hideOverlay"
        :width="dialogWidth"
      >
        <slot></slot>
      </v-dialog>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    modalKey: {
      required: true,
    },
    width: {
      default: "medium",
    },
    fullscreen: {
      default: false,
    },
    hideOverlay: {
      default: false,
    },
  },

  computed: {
    containerFlag: function () {
      return this.$parent[`${this.modalKey}ModalContainer`];
    },
    dialogFlag: function () {
      return this.$parent[`${this.modalKey}Modal`];
    },
    dialogWidth: function () {
      switch (this.width) {
        case "small": {
          return 400;
        }
        case "medium": {
          return 762;
        }
        case "medium2": {
          return 562;
        }
        case "wide": {
          return 1200;
        }
        default: {
          return `${this.width}px`;
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
.v-dialog {
  transition: none;
}
//.v-dialog:not(.v-dialog--fullscreen) {
//  height: 90%;
//}
</style>