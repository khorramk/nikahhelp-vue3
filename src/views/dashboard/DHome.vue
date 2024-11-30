<template>
  <div>
    <Dashboard />
  </div>
</template>

<script>
import Dashboard from "@/components/dashboard/Dashboard.vue";

export default {
	name: "DHome",

	components: {
    Dashboard
	},

	data() {
		return {
			// isLoading: true,
			user: {},
			// is_verified: 1,
			teams: null,
			dataInputStatus: undefined,
		};
	},

	methods: {
		
		async getUserTeams() {
			const response1 = this.$store.dispatch("getTeams");
			response1.then((data) => {
				this.teams = data.data.data;

		
			}).catch(() => {
				console.log('test');
			})
		},
	},
};
</script>
