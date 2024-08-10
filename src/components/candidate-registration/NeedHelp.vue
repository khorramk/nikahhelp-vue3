<template>
	<a-tooltip placement="bottom">
		<template #title> {{ title }}</template>
		<span class="color-blue fw-700">Need help?</span>
	</a-tooltip>
</template>

<script>
export default {
	props: ["title"],
};
</script>

<style>
</style>