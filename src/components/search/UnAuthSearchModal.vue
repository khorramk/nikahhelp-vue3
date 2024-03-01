<template>
	<Modal
		:width="300"
		v-model="localModel"
		@ok="handleOk"
		@cancel="handleCancel"
	>
		<un-auth-search-form use-for="search" @handleSearch="handleSearch"></un-auth-search-form>
	</Modal>
</template>
<script>
import UnAuthSearchForm from "@/components/search/UnAuthSearchForm.vue";
import Modal from '@/components/ui/Modal'
export default {
	data() {
		return {
			childData: null,
		};
	},
	components: {
		Modal,
		UnAuthSearchForm,
	},
	props: ["value"],
  computed: {
		localModel: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input', value)
            }
        }
	},
	methods: {
		handleSearch(data) {
			this.childData = data;
			this.$emit("handleSearch", this.childData);
		},
		handleCancel(e) {
			this.$emit("handle-cancel");
		},
    handleOk() {
      //
    }
	},
};
</script>