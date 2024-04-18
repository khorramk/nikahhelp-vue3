<template>
    <div
      :class="`dt-modal ${id} ${loadingFlag ? 'dt-loading shell--v2' : ''}`"
      @keyup="onKeyup"
      tabindex="0"
      style="height:100%"
    >
      <!-- You can uncomment this section if you need the close icon
      <div class="dt-icon-container">
        <img
          src="@/assets/icon/close.svg"
          class="dt-icon v5 s2"
          @click="cancel"
          alt="Close Modal"
          title="Close Modal"
        />
      </div>
      -->
      <div class="dt-modal--header">
        <slot name="header"></slot>
      </div>
      <div class="dt-modal--body">
        <slot name="body"></slot>
      </div>
      <div class="dt-modal--options">
        <slot name="options"></slot>
      </div>
    </div>
  </template>
  
  <script>
  import './modal.scss';
  
  export default {
    props: {
      id: {
        type: String,
        required: true
      },
      loadingFlag: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      setTimeout(() => {
        this.$el.focus();
      }, 1);
    },
    methods: {
      onKeyup(event) {
        if (event.code === "Escape") {
          this.cancel();
        }
      },
      cancel() {
        this.$emit('cancelled', true);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Your SCSS styles here */
  </style>
  