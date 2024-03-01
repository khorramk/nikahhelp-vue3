<template>
	<footer>
		<div class="footer-container">
			<ul class="footer-menu">
				<li>
					<a href="#"> <img src="@/assets/logo-black.png" alt="logo" /> </a>
				</li>
				<li class="linkToPage"><router-link to="#">About</router-link></li>
				<li class="linkToPage"><router-link to="/privacy-cookie-policy">Privacy Policy and Cookie Policy</router-link></li>
				<li class="linkToPage"><router-link to="#">Terms and Conditation</router-link></li>
				<li class="linkToPage"><router-link to="#">Safety and Guidance</router-link></li>
				<li class="linkToPage"><router-link to="#">Help</router-link></li>
			</ul>
		</div>
	</footer>
</template>

<script>
export default {
	name: "Footer",
	components: {},
};
</script>
<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
footer {
	border-top: 1px solid $border-default;
	background: $bg-white;
	width: 100%;
	@media (max-width: 1185px) {
		width: 100%;
	}

	@media (max-width: 1045px) {
		width: 100%;
	}
	
	@media (max-width: 969px) {
		width: 130%;

	}
	
	@media (max-width: 885px) {
		width: 130%;
	}
	@media (max-width: 768px) {
		width: 150%;
	}
	@media (max-width: 540px) {
		width: 230%;
	}
	@media (max-width: 414px) {
		width: 300%;
	}
	@media (max-width: 375px) {
		width: 320%;
	}
		
	@media (max-width: 320px) {
		width: 380%;
	}
	@media (max-width: 280px) {
		width: 430%;
	}
	.footer-menu {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		width: 100%;
		
		@media (max-width: 885px) {
			width: 130%;
		}

		@media (max-width: 1185px) {
			width: 110%;
		}
		@media (max-width: 768px) {
			width: 200%;
		}

		@media (max-width: 375px) {
			width: 300%;
		}
		li {
			padding: 15px 30px 15px 0px;
			margin: 0px 30px;
		
			@media (max-width: 1275px) {
				padding: 15px 15px 15px 0px;
				margin: 0px 30px;
			}
		}
	}

	.footer-container {
		width: 100%;
	}
}


</style>