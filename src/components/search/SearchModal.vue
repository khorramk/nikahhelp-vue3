<template>
  <div id="components-modal-demo-position">
    <a-modal
        title="Advanced Search"
        :dialog-style="{ top: '60px' }"
        :visible="searchModalVisible"
        :width="800"
        :footer="null"
        @ok="handleOk"
        @cancel="handleCancel"
    >
      <search-form @handle-search="handleOk"></search-form>
    </a-modal>
  </div>
</template>
<script>
import SearchForm from "@/components/search/SearchForm.vue";

export default {
  data() {
    return {
      childData: null,
    };
  },
  components: {
    SearchForm,
  },
  props: ["searchModalVisible"],
  methods: {
    handleOk(data) {
      this.childData = data;
      console.log(this.childData);
      this.$emit("handle-ok", this.childData);
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.$emit("handle-cancel");
    },
  },
};
</script>