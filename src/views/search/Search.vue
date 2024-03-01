<template>
	<div>
		<div>
			<div v-if="isLoading">Loading</div>
			<div v-else>
				<Header :user="user" />
				<div class="main-content-wrapper">
					<Sidebar />
					<div class="main-content-1">
						<div class="d-flex">
							<h4 class="flex-70 search-class" v-if="searchResult">
								Search Results
							</h4>
							<button
								v-if="searchResult"
								@click="setSearchModalVisible"
								class="btn btn-sm btn-primary advanced-search-btn"
							>
								<img
									src="@/assets/icon/advance search.svg"
									alt="icon"
									height="14px"
								/>
								Advanced Search
							</button>
						</div>
						<div>
							<search-modal
								:searchModalVisible="searchModalVisible"
								@handle-cancel="searchModalVisible = false"
								@handle-ok="handleOk"
							></search-modal>
						</div>
						<div v-if="!searchResult">
							<search-form @handle-search="handleOk"></search-form>
						</div>
						<div v-else>
							<!-- {{ result }} -->
							<div v-if="result.length == 0" class="text-center mt-5">
								<span
									><a-icon
										type="warning"
										:style="{ fontSize: '50px', color: 'red',}"
								/></span>
								<span class="fs-28 px-5"
									>Sorry! There are no matching candidates matching your search
									criteria. ???</span
								>
							</div>
							<candidate
								v-for="candidate in result"
								:key="candidate.id"
								:candidate="candidate"
								@selected-candidate="selectedCandidate"
								@store-shortlist="storeShortlist"
								@store-teamlist="getCandidateId"
								@connect-request="getCandidateTeamId"
								@block-candidate="blockCandidate"
							></candidate>
							<select-team-for-teamlist
								:selectTeamModal="selectTeamModal"
								@handle-cancel="selectTeamModal = false"
								@handle-team="storeTeamlist"
							></select-team-for-teamlist>
							<select-team-modal
								:selectTeamModal="selectTeamForConnect"
								@handle-cancel="selectTeamForConnect = false"
								@handle-team="connectRequest"
							></select-team-modal>
						</div>
					</div>
					<!-- <div class="main-content-2">
            <div class="shadow-default profile-overview">
              <div v-if="candidateProfileInfo">
                {{ candidateProfileInfo }}
              </div>
            </div>
          </div> -->
					<div class="main-content-2">
						<div
							class="shadow-default profile-overview design-profile-overview"
						>
							<div v-if="candidateProfileInfo">
								<h6>This Profile overview</h6>
								<hr />
								<div>
									<!-- Name -->
									<li class="flex-between-start">
										<span class="flex-50 label-text">Name</span
										><span class="flex-50"
											>:
											<span class="ml-3"
												>{{ candidateProfileInfo.candidate.name }}
											</span></span
										>
									</li>
									<!-- Age -->
									<li class="flex-between-start">
										<span class="flex-50 label-text">Age</span
										><span class="flex-50"
											>: <span class="ml-3">{{ age }}</span></span
										>
									</li>
									<!-- height -->
									<li class="flex-between-start">
										<span class="flex-50 label-text">Height</span
										><span class="flex-50"
											>:
											<span class="ml-3">{{
												candidateProfileInfo.candidate.height
											}}</span></span
										>
									</li>
									<!-- Ethnicity -->
									<li class="flex-between-start">
										<span class="flex-50 label-text">Ethnicity</span
										><span class="flex-50 d-inherit"
											>:
											<span class="ml-3">
												{{ candidateProfileInfo.candidate.ethnicity }}</span
											></span
										>
									</li>
									<!-- Country Of Birth -->
									<li class="flex-between-start">
										<span class="flex-50 label-text">Country of Birth</span
										><span class="flex-50"
											>:
											<span class="ml-3">{{
												candidateProfileInfo.candidate.country_of_birth
											}}</span></span
										>
									</li>

									<!-- Education -->
									<li class="flex-between-start">
										<span class="flex-50 label-text">Education</span
										><span class="flex-50"
											>:
											<span class="ml-3">
												<!-- {{
											$store.state.candidateInfo.study_level_options[
												candidateProfileInfo.personal.per_education_level_id
											].name
										}} -->
												{{ candidateProfileInfo.candidate.educationLevel }}
											</span></span
										>
									</li>
								</div>

								<h6 class="mt-3">This Profile Partner Preferences</h6>
								<hr />
								<div>
									<!-- Age -->
									<li class="flex-between-start">
										<span class="flex-50 label-text">Age</span
										><span class="flex-50"
											>:
											<span class="ml-3">
												{{ candidateProfileInfo.partner.partner_age_min }}
												to
												{{ candidateProfileInfo.partner.partner_age_max }}
												years</span
											></span
										>
									</li>
									<!-- Height -->
									<li class="flex-between-start">
										<span class="flex-50 label-text">Height</span
										><span class="flex-50"
											>:
											<span class="ml-3"
												>{{ candidateProfileInfo.partner.height_min }}
												inch to
												{{ candidateProfileInfo.partner.height_max }}
												inch</span
											></span
										>
									</li>
									<!-- Religion -->
									<!-- <li class="flex-between-start">
                    <span class="flex-50 label-text">Religion</span
                    ><span class="flex-50"
                      >:
                      <span class="ml-3"> Islam </span>
                    </span>
                  </li> -->
									<!-- Nationality -->
									<!-- <li class="flex-between-start">
                    <span class="flex-50 label-text">Nationality</span
                    ><span class="flex-50 d-inherit"
                      >:
                      <span class="ml-3">
                        <div
                          v-for="nationality in candidateProfileInfo.preference
                            .preferred_nationality"
                          :key="nationality.id"
                        >
                          {{ nationality.name }}
                        </div>
                      </span></span
                    >
                  </li> -->
									<!-- Ethnicity -->
									<li class="flex-between-start">
										<span class="flex-50 label-text">Ethnicity</span
										><span class="flex-50 d-inherit"
											>:
											<span class="ml-3">
												{{
													candidateProfileInfo.partner.partner_ethnicities
												}}</span
											></span
										>
									</li>
									<!-- Country Of Birth -->
									<!-- Current Residence -->
									<!-- Education -->
									<!-- <li
                    class="flex-between-start"
                    v-if="candidateProfileInfo.preference.pre_study_level_id"
                  >
                    <span class="flex-50 label-text">Education</span
                    ><span class="flex-50"
                      >:
                      <span class="ml-3">
                        {{ studyLevel }}
                      </span></span
                    >
                  </li> -->
									<!-- Profession -->
									<!-- Occupation -->
									<li class="flex-between-start">
										<span class="flex-50 label-text">Ocupation</span
										><span class="flex-50"
											>:
											<span class="ml-3">{{
												candidateProfileInfo.partner.partner_occupation
											}}</span></span
										>
									</li>
								</div>
								<button
									@click="goToProfile(candidateProfileInfo.id)"
									class="btn btn-block btn-secondary mt-5"
									formtarget="_blank"
								>
									View Profile Details
								</button>
							</div>
						</div>
					</div>
				</div>

				<Footer />
			</div>
		</div>
	</div>
</template>

<script>
import Header from "@/components/dashboard/layout/Header.vue";
import Sidebar from "@/components/dashboard/layout/Sidebar.vue";
import Footer from "@/components/auth/Footer.vue";
import Candidate from "../../components/search/Candidate.vue";
import SearchForm from "@/components/search/SearchForm.vue";
import SearchModal from "@/components/search/SearchModal.vue";
import SelectTeamModal from "@/components/team/Modals/SelectTeamModal.vue";
import SelectTeamForTeamlist from "@/components/team/Modals/SelectTeamForTeamlist.vue";
import ApiService from "../../services/api.service";
import JwtService from "../../services/jwt.service.js";

export default {
	name: "Search",
	components: {
		Header,
		Sidebar,
		Footer,
		Candidate,
		SearchForm,
		SearchModal,
		SelectTeamModal,
		SelectTeamForTeamlist,
	},
	data() {
		return {
			isLoading: false,
			user: {},
			is_verified: 1,
			error: null,
			searchResult: false,
			searchModalVisible: false,
			selectTeamModal: false,
			selectTeamForConnect: false,

			result: null,
			pagination: null,
			candidateProfileInfo: null,
			teams: ["Real Madrid", "Barca"],
			candidateId: null,
			candidateTeamId: null,
		};
	},
	created() {
		//this.loadUser();
		this.getActiveTeamId();
		this.$store.dispatch("getCountries");
		this.$store.dispatch("getReligionOptions");
		this.$store.dispatch("getStudyLevelOptions");
	},
	computed: {
		age() {
			return this.getAge(this.candidateProfileInfo.candidate.age);
		},
	},
	methods: {
		async loadUser() {
			this.isLoading = true;
			try {
				await this.$store.dispatch("getUser");
				this.user = this.$store.getters["userInfo"];
				this.is_verified = this.user.is_verified;
				if (this.is_verified == 0) {
					this.$router.push("/email-verification");
				}
				if (this.user.account_type === 0) {
					this.$router.push("/member-type");
				}

				if (this.user.account_type === 4) {
					this.$router.push("/admin");
				}

				let data_input_status = this.$store.getters["userDataInputStatus"];
				console.log("data input status", data_input_status);
				if (data_input_status == 10) {
					this.$router.push("/member-name/candidate");
				}

				if (data_input_status == 20) {
					this.$router.push("/member-name/representative");
				}

				if (data_input_status == 11) {
					this.$router.push("/candidate-registration");
				}
				if (data_input_status == 21) {
					this.$router.push("/representative-registration");
				}

				// if (data_input_status == 12) {
				// 	this.$router.push("/candidate-registration");
				// }
				// if (data_input_status == 22) {
				// 	this.$router.push("/representative-registration");
				// }
			} catch (error) {
				this.error = error.message || "Something went wrong";
				//alert(this.error);
				console.log(this.error);
				this.$router.push("/search");
			}
			this.isLoading = false;
		},
		async getActiveTeamId() {
			const response = this.$store.dispatch("getTeams");
			response
				.then((data) => {
					let teamId = JwtService.getTeamIDAppWide();
					console.log(data.data.data);
					if (data.data.data.length == 0) {
						this.$warning({
							title: "You don't have a team",
							content: "Please create or join a team!",
						});
						//this.$router.push("/manageteam");
					} else if (!teamId) {
						this.$warning({
							title: "You don't have an active team",
							content: "Please select an active team to continue!",
						});
						//this.$router.push("/manageteam");
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		getAge(dateString) {
			var today = new Date();
			var birthDate = new Date(dateString);
			var age = today.getFullYear() - birthDate.getFullYear();
			var m = today.getMonth() - birthDate.getMonth();
			if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
				age--;
			}
			return age;
		},
		goToProfile(id) {
			this.$router.push(`/user/profile/${id}`);
			// let routeData = this.$router.push(`/user/profile/${id}`);
			//window.open(routeData.href);
		},
		goToAdvanceSearch() {
			this.$router.push("/search");
		},
		setSearchModalVisible() {
			this.searchModalVisible = true;
		},
		async handleOk(payload) {
			let _payload = `v1/searches${payload}`;
			console.log(payload);

			await ApiService.get(_payload)
				.then((data) => {
					console.log(data.data.data);
					this.result = data.data.data.result;
					this.result.reverse();
					this.pagination = data.data.data.pagination;
					this.searchResult = true;
					this.searchModalVisible = false;

					// if (data.data.status != "FAIL" && data.data.status_code == 200) {
					// 	if (data.data.data.password !== this.teamData.password) {
					// 		this.$message.success("Team Password Updated");
					// 		this.showModalPreference = false;
					// 		this.$emit("teamListUpdated");
					// 	} else {
					// 		this.$message.error("Something went wrong");
					// 		this.$message.error(
					// 			"You enter a wrong password for Present Password"
					// 		);
					// 		this.showModalPreference = false;
					// 	}
					// } else {
					// 	this.$message.error("Something went wrong");
					// 	this.showModalPreference = false;
					// }
				})
				.catch((error) => {
					console.log(error.message);
					//console.log(error.response);
					this.$error({
						title: "Error!",
						content: "Something went wrong",
					});
					//this.$message.error("Something went wrong");
					this.searchModalVisible = false;
				});
		},
		selectedCandidate(candidate) {
			this.candidateProfileInfo = candidate;
			window.scrollTo(0, 0);
		},
		storeShortlist(candidateId) {
			const vm = this;
			this.$confirm({
				title: "Do you want to shortlist this candidate?",
				content: "Are you sure?",
				okText: "Yes",
				okType: "primary",
				cancelText: "No",
				async onOk() {
					const payload = {
						user_id: candidateId,
						shortlisted_by: vm.user.id,
					};
					const response = vm.$store.dispatch("storeShortlist", payload); // Action in the shortlist module in action
					response.then((data) => {
						console.log(data);
						vm.$message.success("Candidate Shortlist Done");
					});
				},
				onCancel() {
					console.log("Cancel");
				},
			});
			// const payload = {
			// 	user_id: candidateId,
			// 	shortlisted_by: this.user.id,
			// };
			// const response = this.$store.dispatch("storeShortlist", payload); // Action in the shortlist module in action
			// response.then((data) => {
			// 	console.log(data);
			// 	this.$message.success("Candidate Shortlist Done");
			// });
		},
		getCandidateId(candidateId) {
			this.selectTeamModal = true;
			this.candidateId = candidateId;
		},
		getCandidateTeamId(candidateTeamId) {
			this.candidateTeamId = candidateTeamId;
			let teamId = JwtService.getTeamIDAppWide();
			if (!this.$store.state.team.teamInfo && !teamId) {
				this.selectTeamForConnect = true;
			} else {
				console.log(this.$store.state.team.teamInfo);

				this.connectRequest(teamId);
			}
		},

		connectRequest(teamId) {
			const payload = {
				from_team_id: teamId,
				to_team_id: this.candidateTeamId,
			};
			console.log(payload);
			const response = this.$store.dispatch("connectWithTeam", payload);
			response
				.then((data) => {
					console.log(data);
					this.$success({
						title: "Connection Request Sent Successfully!",
						content: data.message,
						centered: true,
					});
				})
				.catch((error) => {
					console.log(error);
					this.$error({
						title: "Connection Request send not successful!",
						content: error.response.data.message,
						centered: true,
					});
				});
			this.selectTeamForConnect = false;
		},
		storeTeamlist(team) {
			const _payload = {
				user_id: this.candidateId,
				shortlisted_by: this.user.id,
				shortlisted_for: team.id,
			};
			console.log(_payload);
			const response = this.$store.dispatch("storeTeamlist", _payload); // Action in shortlist module
			response
				.then((data) => {
					console.log(data);
					this.selectTeamModal = false;
					this.$message.success("Team Listed candidate added successfully!");
				})
				.catch((error) => {
					console.log(error);
				});
		},
		blockCandidate(candidateId) {
			const vm = this;
			this.$confirm({
				title: "Are you sure?",
				content: "Do you want to block this candidate?",
				okText: "Yes",
				okType: "danger",
				cancelText: "No",
				async onOk() {
					const payload = {
						user_id: candidateId,
						block_by: vm.user.id,
						type: "single",
					};
					await vm.$store.dispatch("blockCandidate", payload);
					vm.$message.success("Candidate block listed successfully");
					//vm.$router.go();
				},
				onCancel() {
					console.log("Cancel");
				},
			});
		},
	},
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";

.main-content-wrapper {
	@media (max-width: 1024px) {
		flex-wrap: wrap;
	}

	.main-content-1 {
		width: calc(100% - 550px);
		margin: 15px 10px;
		//		margin-left: 260px;
		@media (max-width: 1024px) {
			width: calc(100% - 270px);
		}
	}

	.main-content-2 {
		margin: 15px;
		width: 300px;
		//height: 70vh;
		.profile-overview {
			padding: 10px;
			height: 75vh;
		}
	}
}

.advanced-search-btn {
	margin-left: 12%;
}
</style>