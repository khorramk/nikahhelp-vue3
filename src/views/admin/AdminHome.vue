<template>
	<div class="container-fluid vh-100 overflow-auto">
		<div class="row welcome align-items-center" >
			<div class="col-lg-3">
				<div class="item flex-center-center">
					<h3 class="color-secondary font-primary">Welcome Back</h3>
				</div>
			</div>
			<div class="col-lg-3">
				<div class="item flex-center-center p-3 shadow-default rounded">
					<span class="item-text">My Shortlisted</span>
					<span class="item-number flex-center-center">16</span>
				</div>
			</div>
			<div class="col-lg-3">
				<div class="item flex-center-center p-3 shadow-default rounded">
					<span class="item-text">Team Shortlisted</span>
					<span class="item-number flex-center-center">16</span>
				</div>
			</div>
			<div class="col-lg-3">
				<div class="item flex-center-center p-3 shadow-default rounded">
					<span class="item-text">Profile Shortlisted</span>
					<span class="item-number flex-center-center">16</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.welcome {
	.item {
		.item-text {
			font-size: 18px;
		}
		.item-number {
			width: 40px;
			height: 40px;
			border-radius: 50%;
			background: $bg-secondary;
			color: $color-white;
			margin-left: 8px;
		}
	}
}
</style>
