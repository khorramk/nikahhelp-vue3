<template>
	<div>
		<div class="signup">
			<div class="signup-inner">
				<a href="/" class="logo"><img src="@/assets/logo.png" alt="logo" /></a>
				<form class="form-signup" @submit.prevent="handleSubmit">
					<Spinner v-if="isLoading" />
					<p v-else-if="error">
						{{ error }}
						<a
							class="
								btn btn-sm btn-outline-primary btn-round-sm
								ms-2
								text-nowrap
							"
							href="/login"
							>Sign in</a
						>
					</p>
					<div v-else>
						<div class="mb-3">
							<input
								type="text"
								class="form-control"
								id="firstName"
								v-model="firstName"
								placeholder="FIrst Name"
							/>
						</div>
						<div class="mb-3">
							<input
								type="text"
								class="form-control"
								id="lastName"
								v-model="lastName"
								placeholder="Last Name"
							/>
						</div>
						<div class="mb-3">
							<input
								type="text"
								class="form-control"
								id="screenName"
								v-model="screenName"
								placeholder="* Screen Name"
							/>
						</div>

						<p v-if="!formIsValid" class="warning">
							{{ validationError }}
						</p>

						<a-tooltip placement="right" class="fs-12 mb-2">
							<template v-slot:title>
								We have made a screen name for you, you can keep it or change to
								something suitable. Please make sure you choose a screen name
								wisely as it communicates somthing about your self.
							</template>
							* Please choose a sensible screen name, if you don't wish your
							real name to appear on search result.
						</a-tooltip>

						<button type="submit" class="btn btn-secondary w-100">
							Continue
						</button>
					</div>
				</form>
			</div>
		</div>
		<Footer />
	</div>
</template>

<script>
import Footer from "@/components/auth/Footer.vue";
import Spinner from "@/components/ui/Spinner.vue";

export default {
	name: "Signup",
	components: {
		Footer,
		Spinner,
	},
	watch: {
		firstName(value) {
			if (this.lastName.length > 1 && this.firstName.length > 2) {
				this.screenName = `${this.firstName[1]}${this.firstName[2]}${
					this.lastName[1]
				}${Math.floor(10000 + Math.random() * 90000)}`.toUpperCase();
			} else {
				this.screenName = "";
			}
		},
		lastName(value) {
			if (this.lastName.length > 1 && this.firstName.length > 2) {
				this.screenName = `${this.firstName[1]}${this.firstName[2]}${
					this.lastName[1]
				}${Math.floor(10000 + Math.random() * 90000)}`.toUpperCase();
			} else {
				this.screenName = "";
			}
		},
	},
	data() {
		return {
			firstName: "",
			lastName: "",
			screenName: "",
			isLoading: false,
			error: null,
			formIsValid: true,
			validationError: null,
		};
	},
	methods: {
		onChangeFirstName(e) {
			console.log(e.target.value);
		},
		onChangeLastName(e) {
			console.log(e);
		},
		async handleSubmit() {
			if (this.firstName.length < 3) {
				this.$error({
					title: "Validation Error",
					content: "First name should contain more than 3 characters!",
				});
				return;
			}
			if (this.lastName.length < 3) {
				this.$error({
					title: "Validation Error",
					content: "Last name should contain more than 3 characters!",
				});
				return;
			}
			if (this.screenName.length < 1) {
				this.$error({
					title: "Validation Error",
					content: "Screen name can't be empty!",
				});
				return;
			}
			const memberType = this.$route.params.type;
			if (memberType === "candidate") {
				try {
					this.isLoading = true;
					const actionPayload = {
						first_name: this.firstName,
						last_name: this.lastName,
						screen_name: this.screenName,
						token: this.$store.getters["token"],
					};
					await this.$store.dispatch("createCandidate", actionPayload);
					this.isLoading = false;
					this.$router.push("/dashboard");
				} catch (error) {
					console.log(error);
				}
			}
			// Starts Representative data Savwing
			else if (memberType === "representative") {
				try {
					this.isLoading = true;
					const actionPayload = {
						first_name: this.firstName,
						last_name: this.lastName,
						screen_name: this.screenName,
						token: this.$store.getters["token"],
					};
					await this.$store
						.dispatch("createRepresentative", actionPayload)
						.then((data) => {
							console.log(data);
							this.isLoading = false;
							this.$router.push("/dashboard");
						})
						.catch((error) => {
							console.log(error);
						});
				} catch (error) {
					console.log(error);
				}
			} else {
				console.log("Representative API not found!");
			}
		},
	},
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
@import "@/styles/components/_inputs.scss";
.signup {
	min-height: 88vh;
	background-color: #522e8e;
	background-image: linear-gradient(
		0deg,
		#522e8e 0%,
		#932784 46%,
		#e02076 100%
	);
	.signup-inner {
		max-width: 400px;
		margin: 0 auto;
		padding: 50px 15px;
		text-align: center;
		.logo {
			max-width: 250px;
			display: inline-block;
			margin-bottom: 20px;
		}
		.form-signup {
			background: $bg-white;
			padding: 20px;
			border-radius: 5px;
			.warning {
				color: red;
				font-size: 14px;
			}
		}
		.hr-line {
			position: relative;
			&::after {
				position: absolute;
				content: "";
				width: 100%;
				top: 50%;
				left: 0;
				z-index: 1;
				border-bottom: 1px solid $border-default;
			}
			span {
				z-index: 2;
				background: $bg-white;
				position: relative;
				padding: 2px 8px;
			}
		}
		.bottom-text {
			color: white;
			.logo-text {
				font-family: $header-font;
				margin-left: 5px;
				margin-right: 5px;
				font-size: 24px;
			}
		}
	}
}
</style>
