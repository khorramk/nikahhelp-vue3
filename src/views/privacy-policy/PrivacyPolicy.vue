<template>
	<div class="privacy-page">
		<header>
			<div class="container">
				<a href="/"><img src="@/assets/logo.png" alt="" /></a>
				<div class="float-right auth-btn" id="logRegisterBtn">
					<a
						href="/login"
						class="btn btn-sm btn-secondary mr-2"
						id="signInButton"
					>
						Sign In
					</a>
					<a
						href="/register"
						class="btn btn-sm btn-secondary btn-brand ml-2"
						id="joinNowButton"
					>
						Join Now
					</a>
				</div>
			</div>
		</header>

		<div class="content-privacy">
			<h3><marquee> Privacy policy contents need to be uploaded!!! </marquee></h3>
		</div>
		<Footer />
	</div>
</template>

<script>

import Footer from "@/components/auth/Footer.vue";

export default {
	name: "PrivacyPolicy",
	components: {
	//	Header,
		Footer,
	},
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.privacy-page {
	header {
		height: 100px;
		background-color: $bg-secondary;
		img {
			margin-top: 10px;
			height: 80px;
		}

		.auth-btn {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 40px;
			.btn-brand {
				background-color: $bg-brand;
			}
		}
	}
	.container {
		width: 100%;
		height: 100px;
		@media (min-width: 768px) {
			width: 80%;
		}
		@media (max-width: 768px) {
			width: 100%;
			margin: 0px;
		}
	}
	.content-privacy {
		height: 500px;
		background-color:rgb(248, 236, 247);
		padding-top: 15%;
	}
}
</style>