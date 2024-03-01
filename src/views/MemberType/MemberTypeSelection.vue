<template>
	<div class="type-selection">
		<header>
			<a href="/"><img src="@/assets/logo.png" alt="" /></a>
		</header>
		<div class="content">
			<h3 class="mt-3">
				Welcome to <span class="logo-text">MatrimonyAssist</span>
			</h3>
			<div class="type mx-auto">
				<p>Let's get started. Please select, you are registering as</p>

				<a-row :gutter="16">
					<a-col :span="8">
						<a-card>
							<button
								@click="handleCandidate"
								class="btn btn-secondary-outlined"
								:class="{ active: candidate }"
							>
								Candidate
							</button>
							<p class="fs-12 mt-5">
								Lorem ipsum doloripisicing elit. Cumque, eligendi?
							</p>
						</a-card>
					</a-col>
					<a-col :span="8">
						<a-card>
							<button
								@click="handleRepresentative"
								class="btn btn-secondary-outlined"
								:class="{ active: representative }"
							>
								Representative
							</button>
							<p class="fs-12 mt-5">
								Lorem ipsum doloripisicing elit. Cumque, eligendi?
							</p>
						</a-card>
					</a-col>
					<a-col :span="8">
						<a-card>
							<button class="btn btn-secondary-outlined disabled">
								Match Maker
							</button>
							<p class="fs-12 mt-5">
								Lorem ipsum doloripisicing elit. Cumque, eligendi?
							</p>
						</a-card>
					</a-col>
				</a-row>
				<div class="mt-3" v-if="!!type">
					<p>
						<input
							type="checkbox"
							@change="confirmCheckbox"
							class="confirm-type"
						/>
						<span class="confirm-text"
							>Confirm I'm a <span class="fw-700">{{ type }}</span></span
						>
					</p>
					<button
						:disabled="confirm ? false : true"
						class="btn btn-secondary w-50"
						:class="confirm ? 'active' : 'disabled'"
						@click="handleContinue"
					>
						Continue
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			type: "",
			candidate: false,
			representative: false,
			confirm: false,
		};
	},
	methods: {
		handleCandidate() {
			this.type = "candidate";
			this.candidate = true;
			this.representative = false;
			//console.log(this.candidate);
		},
		handleRepresentative() {
			this.type = "representative";
			this.candidate = false;
			this.representative = true;
			//console.log(this.candidate);
		},
		confirmCheckbox() {
			console.log(this.confirm);
			this.confirm = !this.confirm;
		},

		async handleContinue() {
			var num;
			if (this.type === "candidate") {
				num = 1;
			} else if (this.type === "representative") {
				num = 2;
			}
			const actionPayload = {
				account_type: num,
			};
			console.log(actionPayload);

			await this.$store.dispatch("changeAccountType", actionPayload);
			this.$router.push(`/member-name/${this.type}`);
		},
	},
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.type-selection {
	text-align: center;
	header {
		height: 100px;
		background-color: $bg-secondary;
		img {
			margin-top: 10px;
			height: 80px;
		}
	}
	.content {
		h3 {
			font-weight: bold;
			.logo-text {
				font-family: $header-font;
				color: $color-primary;
				font-weight: 100;
			}
		}
		.type {
			width: 50%;
			height: 400px;
			background-color: #e02076;
			background-image: linear-gradient(
				0deg,
				#e02076 0%,
				#932784 50%,
				#522e8e 100%
			);
			padding: 20px;
			border-radius: 5px;
			color: #ececec;
			.btn {
				width: 100%;
			}
			.active {
				background: $bg-secondary !important;
				color: $color-white;
			}
			.confirm-type {
				margin-top: 10px;
				transform: scale(1.8);
				height: 12px;
			}
			.confirm-text {
				margin-left: 20px;
				font-size: 18px;
			}
		}
	}
}
</style>