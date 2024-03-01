<template>
	<div>
		<div v-if="isLoading">Loading</div>
		<div v-else>
			<Header :user="user" />
			<div class="main-content-wrapper">
				<Sidebar />
				<div class="container">
					<a-row>
						<a-col :span="24">
							<CreateTeamPage3 />
						</a-col>
					</a-row>
				</div>
			</div>
			<Footer />
		</div>
		<!-- create team page 3 -->
	</div>
</template>

<script>
import Header from "@/components/dashboard/layout/Header.vue";
import Sidebar from "@/components/dashboard/layout/Sidebar.vue";
import Footer from "@/components/dashboard/layout/Footer.vue";
import CreateTeamPage3 from "@/components/team/CreateTeamPage3.vue";

export default {
	name: "CreateTeam3",
	components: {
		Header,
		Sidebar,
		Footer,
		CreateTeamPage3,
	},
	data() {
		return {
			isLoading: false,
			user: {},
			is_verified: 1,
		};
	},
	created() {
		//this.loadUser();
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
				this.$error({
					title: "Error!",
					content: this.error,
				});
			}
			this.isLoading = false;
		},
	},
};
</script>
