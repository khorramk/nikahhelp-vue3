<template>
	<h2>Loging Out</h2>
</template>

<script>
export default {
	name: "Logout",
	created() {
		this.$store.dispatch("logout");
		this.$router.push("/");
	},
};
</script>