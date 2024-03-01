<template>
	<div>
    <a-row>
      <a-col :span="24">
        <a-input
            v-model="$store.state.team.team_password"
            size="large"
            type="password"
            class="team-name-input"
            placeholder="Type Team Password"
        />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <a-input
            v-model="$store.state.team.confirm_password"
            size="large"
            type="password"
            class="team-name-input"
            placeholder="Re-Type Team Password"
        />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <a-button class="next-button" @click="goNext">Next</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
	name: "CreateTeam2",
	components: {},
	data() {
		return {
			isLoading: false,
			user: {},
			is_verified: 1,
		};
	},
	created() {},
	methods: {
		validate() {
			let validation_status = true;
			let validation_msgs = [];
			if (!this.$store.state.team.team_password) {
				validation_msgs.push("Please type a team password");
				validation_status = false;
			}

			if (!this.$store.state.team.confirm_password) {
				validation_msgs.push("Please confirm team password");
				validation_status = false;
			}

			if (
				this.$store.state.team.confirm_password !=
				this.$store.state.team.team_password
			) {
				validation_msgs.push("Your password did not match");
				validation_status = false;
			}

			if (validation_msgs.length > 0) {
				let msg = validation_msgs.join(".\n");
				this.$notification.open({
					message: "Error",
					description: msg,
					onClick: () => {
						console.log("Notification Clicked!");
					},
				});
				// alert(msg);
			}
			return validation_status;
		},
		goNext() {
			let validation_status = this.validate();
			console.log("pressedGoNext");
			console.log(this.$store.state.team);
			if (validation_status == true) {
				console.log("true found");
				this.$store.dispatch("setCreateTeamStep", 3);
				this.$router.push("/create-team-3");
			}
		},
	},
};
</script>

<style scoped>
.card-container {
	max-width: 50%;
	margin-top: 20px;
	padding: 15px;
	border-radius: 5px;
	box-shadow: 0 0 5px 3px #d3d3d3 !important;
	text-align: center;
}
.group-logo {
	width: 80px;
	margin-bottom: 10px;
}
.card-title {
	color: #6158a7;
	font-weight: 400;
	font-size: 2.25rem;
}
.team-description {
	margin-top: 10px;
}
.team-name-input {
	margin-top: 25px;
	border: 1px solid #6158a7 !important;
	border-color: #6158a7 !important;
	border-radius: 25px !important;
}
.next-button {
	margin-top: 30px;
	float: right;
	background-color: #6158a7;
	color: white;
	border: 1px solid #6158a7 !important;
	border-color: #6158a7 !important;
	border-radius: 25px !important;
	padding: 5px 45px;
}
</style>
