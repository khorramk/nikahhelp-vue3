<template>
	<div class="row justify-content-md-center">
		<a-card class="card-container">
			<a-row>
				<a-col :span="24">
					<a-col :span="4"></a-col>
					<a-col :span="6"
						><img
							class="group-logo"
							src="@/assets/Icons/Join a team or Create a team.svg"
							alt=""
					/></a-col>
					<a-col :span="10"
						><span class="card-title">Member Invitation</span></a-col
					>
				</a-col>
				<a-col :span="4"></a-col>
			</a-row>
			<a-row>
				<a-col>
					<div>
						<h6>
							* You are already a member of this team. Use this invitation code
							to invite other members
						</h6>
					</div>
				</a-col>
			</a-row>
			<a-row>
				<a-divider />
			</a-row>
			<a-row>
				<a-col :span="6">
					<a-select
						placeholder="Add as a"
						style="width: 200px"
						@change="handleChangeAddAs"
					>
						<!-- <a-select-option value="Candidate"> Candidate </a-select-option> -->
						<a-select-option value="Representative">
							Representative
						</a-select-option>
						<a-select-option value="Match Maker"> Match Maker </a-select-option>
					</a-select>
				</a-col>

				<a-col :span="6">
					<a-select
						placeholder="Role"
						style="width: 200px"
						@change="handleChangeRole"
					>
						<!-- <a-select-option value="Owner+Admin"> Owner+Admin </a-select-option> -->
						<a-select-option value="Admin"> Admin </a-select-option>
						<a-select-option value="Member"> Member </a-select-option>
						<!-- <a-select-option value="Candidate"> Candidate </a-select-option>
          <a-select-option value="Match Maker"> Match Maker </a-select-option> -->
					</a-select>
				</a-col>

				<a-col :span="6">
					<!-- <a-select
          placeholder="Relationship"
          style="width: 200px"
          @change="handleChange"
        >
          <a-select-option value="jack"> Jack </a-select-option>
          <a-select-option value="lucy"> Lucy </a-select-option>
          <a-select-option value="Yiminghe"> yiminghe </a-select-option>
        </a-select> -->
					<a-input
						placeholder="Relationship"
						@change="handleChangeRelationship"
					>
						<a-tooltip slot="suffix" title="Relationship with Member">
							<a-icon type="info-circle" style="color: rgba(0, 0, 0, 0.45)" />
						</a-tooltip>
					</a-input>
				</a-col>
				<a-col :span="6">
					<a-input
						placeholder="Invitation Link"
						style="width: 200px"
						readonly="true"
						:value="invitationObject.invitation_link"
					>
						<a-icon slot="addonAfter" type="link" />
					</a-input>
				</a-col>
			</a-row>
			<a-row>
				<a-col :span="12">
					<span class="team-id mt-4">Team ID: {{ computedTeamID }}</span>
				</a-col>
				<a-col :span="12">
					<a-button class="next-button" @click="goNext" :loading="isLoading"
						>Next</a-button
					>
				</a-col>
			</a-row>
			<!-- <h6>This team's members information</h6> -->
			<div class="pt-5">
				<table class="table table-striped table-hover table-center">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Member Name</th>
							<th scope="col">User Type</th>
							<th scope="col">User Role</th>
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="(member, index) in newTeamInfo.team_members"
							:key="member.id"
						>
							<td>{{ index + 1 }}</td>
							<td>{{ member.user.full_name }}</td>
							<td>{{ member.user_type }}</td>
							<td>{{ member.role }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</a-card>
	</div>
</template>

<script>
import JwtService from "../../services/jwt.service";
export default {
	name: "ManageTeam",
	components: {},
	data() {
		return {
			isLoading: false,
			user: {},
			is_verified: 1,

			invitationLink: "",
			invitationObject: {
				role: "",
				add_as_a: "",
				relationship: "",
				invitation_link: "",
			},
		};
	},
	computed: {
		computedTeamID() {
			return JwtService.getTeamID();
		},
		newTeamInfo() {
			const length = this.$store.getters.userTeamList.length;
			return this.$store.getters.userTeamList[length - 1];
		},
	},
	created() {},
	mounted() {
		// amaizingly, for some reason i need to refer this to
		// a other variable so my iffe function can access this
		var self = this;
		(function createShotLink() {
			// this is the method i am using to create a short link
			function makeid(length) {
				var result = [];
				var characters =
					"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
				var charactersLength = characters.length;
				for (var i = 0; i < length; i++) {
					result.push(
						characters.charAt(Math.floor(Math.random() * charactersLength))
					);
				}
				return result.join("");
			}
			self.invitationObject.invitation_link = makeid(10);
		})();
		console.log(this.invitationLink);
	},
	methods: {
		handleChange() {},
		handleChangeAddAs(value) {
			this.invitationObject.add_as_a = value;
		},
		handleChangeRole(value) {
			this.invitationObject.role = value;
		},
		handleChangeRelationship(e) {
			this.invitationObject.relationship = e.target.value;
		},

		goNext() {
			this.isLoading = true;
			this.$store.dispatch("setCreateTeamStep", 5);

			// inserting link into payload
			// this.invitationObject.invitation_link = this.invitationLink;
			// let payload = new FormData();
			// creating formdata before sending thm to dob
			// payload.append('team_id', JwtService.getTeamID());
			// payload.append('members', JSON.stringify([{ ...this.invitationObject }]));

			//console.table(JwtService.getTeamID());
			let payload = {
				team_id: JwtService.getTeamID(),
				members: [
					{
						role: this.invitationObject.role,
						add_as_a: this.invitationObject.add_as_a,
						relationship: this.invitationObject.relationship,
						invitation_link: this.invitationObject.invitation_link,
					},
				],
			};

			this.$store
				.dispatch("createTeamInvite", payload)
				.then((data) => {
					this.isLoading = false;
					console.log(data);
					if (data.data.status_code == 200) {
						this.$router.push(`/create-team-5/${payload.team_id}`);
					}
				})
				.catch((err) => {
					this.isLoading = false;
					console.log(err);
				});

			// console.log(this.$store.state.team);
		},
	},
};
</script>

<style scoped>
.team-id {
	margin-top: 10px;
	float: left;
}
.card-container {
	margin-top: 20px;
	padding: 15px;
	border-radius: 5px;
	box-shadow: 0 0 5px 3px #d3d3d3 !important;
	text-align: center;
}
thead {
	background-color: #6159a7;
	color: white;
	font-weight: 500;
}
.group-logo {
	width: 80px;
	margin-bottom: 10px;
}
.card-title {
	color: #6158a7;
	font-weight: 400;
	font-size: 2.25rem;
	margin-top: 10px;
}
.team-description {
	margin-top: 10px;
}
.input-control {
	height: 50px;
	margin-top: 10px;
	border: 1px solid #6158a7 !important;
	border-color: #6158a7 !important;
	border-radius: 25px !important;
}
.next-button {
	margin-top: 20px;
	margin-left: 180px;
	background-color: #6158a7;
	color: white;
	border: 1px solid #6158a7 !important;
	border-color: #6158a7 !important;
	border-radius: 25px !important;
	width: 200px;
}
</style>
