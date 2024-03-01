<template>
	<div id="components-modal-demo-position">
		<a-modal
			title="Select Team"
			:dialog-style="{ top: '100px' }"
			:visible="selectTeamModal"
			:ok-button-props="prop"
			:width="600"
			@ok="handleOk"
			@cancel="handleCancel"
		>
			<!-- {{ teams }} -->
			<div v-if="teams.length > 0">
				<h3>Select Team:</h3>
				<select class="custom-select" v-model="team" @change="changeTeam">
					<option :value="null" disabled>Select team</option>
					<option v-for="t in teams" :value="t" :key="t.id">
						{{ t.name }}
					</option>
				</select>
			</div>
			<div v-else>
				You don't have any team! Create a team to complete this action.
			</div>
			<div class="text-center mt-3" v-if="isLoading">
				<a-spin size="large" />
			</div>

			<div class="text-center" v-else>
				<div v-if="errorText">
					<span class="text-red mt-3 fs-20">{{ errorText }}</span>
				</div>
				<div v-else>
					<span class="text-success mt-3 fs-20">{{ successText }}</span>
				</div>
			</div>

			<!-- {{ teams }} -->
		</a-modal>
	</div>
</template>
<script>
import ApiService from "@/services/api.service";
import JwtService from "@/services/jwt.service";
export default {
	data() {
		return {
			name: "shadman",
			teams: null,
			team: null,
			prop: { props: { disabled: true } },
			errorText: null,
			successText: "",
			isLoading: false,
		};
	},
	props: ["selectTeamModal"],
	created() {
		this.getTeams();
	},
	methods: {
		async changeTeam() {
			this.isLoading = true;
			console.log(this.team.id);
			await ApiService.get(`v1/check-team-active-status/${this.team.id}`)
				.then((data) => {
					if (data.data.status == "SUCCESS") {
						this.errorText = null;
						this.successText = "This is an activated team!";
						this.prop.props.disabled = false;
						this.isLoading = false;
					}
				})
				.catch((error) => {
					console.log(error.response.data.message);
					this.errorText = error.response.data.message;
					this.prop.props.disabled = true;
					this.isLoading = false;
				});
		},
		handleOk() {
			console.log("ok clicked");
			this.$store.commit("setTeamInfo", this.team);
			JwtService.saveTeamIDAppWide(this.team.team_id);
			localStorage.teamTableId = this.team.id;
			localStorage.teamId = this.team.team_id;
			this.$emit("handle-team", this.team);
		},
		handleCancel(e) {
			console.log("Clicked cancel button");
			this.$emit("handle-cancel");
		},
		getTeams() {
			const response = this.$store.dispatch("getTeams");
			response
				.then((data) => {
					console.log(data);
					this.teams = data.data.data;
					//this.prop =  { props: { disabled: false } },
					// if (this.teams.length > 0) this.prop.props.disabled = false;
					// console.log(this.prop);
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},
};
</script>

<style scoped>
.text-red {
	color: red;
}
</style>