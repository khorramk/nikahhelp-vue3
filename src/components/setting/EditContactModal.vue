<template>
  <div class="dialog-container">
    <v-dialog :value="dialogFlag" :width="500">
      <v-card>
        <div class="p-5">
          <span>For security reason, contact details cannot be changed.</span
          >&nbsp;
          <span
            >If any of this data is incorrect plaese contact
            <router-link to="/help">Support Team</router-link></span
          >
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  props: ["dialog"],
  data() {
    return {};
  },
  computed: {
    dialogFlag: function () {
      return this.dialog;
    },
  },
};
</script>