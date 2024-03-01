<template>
	<div class="row justify-content-md-center">
		<div class="card card-container">
			<div class="top-half">
				<a-row>
					<a-col :span="24">
						<img
							class="check-icon"
							src="@/assets/icon/check-circle-fill-green.svg"
							alt=""
						/>
					</a-col>
				</a-row>
				<a-row>
					<a-col :span="24">
						<span class="create-team-message">Done, You're successfully create a team</span>
					</a-col>
				</a-row>
			</div>

			<div class="bottom-half">
				<a-row>
					<a-col :span="24">
						<span class="sub-msg"
							>To activate this team, You have to choose a subscription
							plan?</span
						>
					</a-col>
				</a-row>

				<a-row>
					<a-col :span="24">
						<button class="sub-btn">
							<span class="sub-btn-label"
								><a :href="link">Subscribe Now</a></span
							>
						</button>
					</a-col>
				</a-row>

				<a-row>
					<a-col :span="24">
						<span class="promo"
							>get <span class="free-day">1 free day</span></span
						>
					</a-col>
				</a-row>

				<a-row>
					<a-col :span="24">
						<span class="disclaimer"
							>* You can do <strong>1 free day</strong> subscription plan for
							first team create</span
						>
					</a-col>
				</a-row>
				<a-row>
					<a-col :span="24">
						<span class="disclaimer"
							>* Without choosing any plan this team will be automatically
							deleted after <strong>72 Hours</strong></span
						>
					</a-col>
				</a-row>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ["teamId"],
	computed: {
		link() {
			return `/subscription/${this.teamId}`;
		},
	},
};
</script>

<style scoped>
.card-container {
	margin-top: 20px;
	border-radius: 25px;
	box-shadow: 0 0 15px 3px #d3d3d3 !important;
	text-align: center;
}
.check-icon {
	height: 150px;
	width: 150px;
}
.top-half {
	background-color: white;
	border-top: solid white;
	border-radius: 25px;
	padding: 20px;
}
.create-team-message {
	color: #666666;
	font-weight: 100;
	font-size: 1.25rem;
}

.bottom-half {
	background-color: #6158a7;
	border-bottom: solid #6158a7;
	border-radius: 25px;
	padding: 20px;
}

.sub-msg {
	color: white;
	font-weight: 300;
	font-size: 1.5rem;
}

.sub-btn {
	width: 200px;
	height: 50px;
	background-color: #e22077;
	color: white;
	border: 3px solid white;
	border-radius: 25px;
}

.sub-btn-label {
	color: white;
	font-weight: 300;
	font-size: 1.5rem;
}

.promo {
	color: white;
	font-weight: 350;
	font-size: 1.5rem;
}

.free-day {
	text-decoration: underline;
}

.disclaimer {
	color: white;
	font-weight: 100;
}
</style>