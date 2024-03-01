<template>
	<div class="about">
		<h1>This is an about page</h1>
		<button @click="handleClick">Spinner Button</button>
		<div v-if="isLoading">
			<Spinner />
		</div>
		<div v-else>Content</div>
	</div>
</template>

<script>
import Spinner from "@/components/ui/Spinner.vue";
export default {
	name: "About",
	components: {
		Spinner,
	},
	data() {
		return {
			isLoading: false,
		};
	},
	methods: {
		handleClick() {
			this.isLoading = true;
		},
	},
};
</script>
