<template>
	<div class="col-lg-6 col-xl-3 position-relative">
		<!-- Team Deletion Modal -->
		<DeletionModal :showModalProp="showModalDeletion" :teamData="teamData" :deleteTeamLoading="deleteTeamLoading"
			@handleCancel="showModalDeletion = false" @handleOk="handleOkDeletion" />

		<!-- preferences modal -->
		<PreferenceModal :showModalProp="showModalPreference" :teamData="teamData" :teamVisibility="true"
			@handleCancel="showModalPreference = false" @handleOk="handleOkPreference" @resetPin="resetPin" />

		<!-- leave team modal -->
		<LTModal :showModalProp="showModalLT" :teamData="teamData" :isOwnerAdmin="isOwnerAdmin"
			:ownerAdminID="$store.getters.userInfo.id" @handleCancel="showModalLT = false" @handleOk="handleOkLT" />

		<!-- team name change modal  -->
		<TNCModal :showModalProp="showModalTNC" :teamData="teamData" @handleCancel="showModalTNC = false"
			@handleOk="handleOkTNC" />

		<!-- Team Description Change Modal -->
		<TDCModal :showModalProp="showModalTDC" :teamData="teamData" @handleCancel="showModalTDC = false"
			@handleOk="handleOkTDC" />

		<!-- start box card s -->
		<div class="team-card">
			<div class="team-card-header">
				<!-- Team Info with ID -->
				<div class="left">
					<a-tooltip placement="bottom" :title="teamData.team_id.split('-')[0]">
						<div class="status active" :title="teamData.team_id">
							Team {{ index + 1 }}
							<span class="green" v-if="turnOn"></span>
							<span class="red" v-else></span>
						</div>
					</a-tooltip>
				</div>

				<!-- Edit Buttons -->
				<div :class="{ 'disabled-team': !turnOn && !tempActive }" class="middle">
					<a-tooltip placement="top" title="Edit Team Info">
						<button class="close">
							<img src="../../assets/icon/edit.svg" alt="team edit" @click="editTeam" />
						</button>
					</a-tooltip>
					<a-modal :open="edit_button_flag" title="Change Team Info" @cancel="edit_button_flag=false">
						<div class="row">
							<!-- Change Team Logo -->
							<div class="col-4 mt-3">
								<!-- Styling for this modal logo and browse button are in the  -->
								<div class="logo">
									<img class="modal-logo" v-if="!avatarSrc" :src="teamData.logo + `?token=${token}`"
										alt="info image" />
									<img class="modal-logo" v-if="avatarSrc" :src="avatarSrc" alt="info image" />
								</div>
								<div class="browse-btn">
									<span class="file-input  btn-file">
										Change
										<input type="file" accept=".png, .jpeg, .jpg" class="input-image" name="avatar" @change="getAvatar" />
									</span>
								</div>
							</div>

							<!-- Change Name and Description section -->
							<div class="col-8">
								<a-tooltip>
									<template #title>
										Maximum 20 Characters allowed
									</template>
									<label class="mt-2">Team Name: </label>
								</a-tooltip>
								<a-input type="text" v-model="teamInfo.name" placeholder="Selina's family"
									:maxLength="20" />

								<a-tooltip>
									<template #title>
										Maximum 80 Characters allowed
									</template>
									<label class="mt-2">Team Description: </label>
								</a-tooltip>
								<a-textarea type="text" v-model="teamInfo.description" :rows="3" :maxLength="80"
									placeholder="Team description" />
							</div>
						</div>

						<template #footer>
							<a-button key="back2" type="danger" shape="round" @click="edit_button_flag = false">
								Cancel
							</a-button>
							<a-button key="submit" type="primary" shape="round" :loading="teamUpdating"
								@click="handleTeamInfoChange">
								Update
							</a-button>
						</template>
					</a-modal>

					<!-- <button class="close" v-if="edit_button_flag">
						<img src="../../assets/icon/save.svg" alt="save" />
					</button>
					<button class="close" v-if="edit_button_flag" @click="editTeam">
						<img src="../../assets/icon/edit-close.svg" alt="close" />
					</button> -->
					<!-- <button class="close" v-if="edit_button_flag">
            <img src="../../assets/icon/delete.svg" alt="delete" />
          </button> -->
				</div>

				<!-- Side Menu -->
				<div class="right">
					<!-- Activate Team Button -->
					<div class="switch-wrapper">
						<div>
							<a-tooltip placement="top" title="Click here to activate this team">
								<a-switch v-model:checked="turnOn" @click="onChangeActivateTeam" />
							</a-tooltip>
						</div>
					</div>
					<!-- Default dropleft button -->
					<div class="btn-group dropleft">
						<a-tooltip placement="top" title="Change Roles, Preferences, Delete and Leave Team">
							<button type="button" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
								aria-expanded="false"></button>
						</a-tooltip>
						<!-- Side Menus(Prerferences, Delete, Leave Team) -->
						<div class="dropdown-menu">
							<!-- <a class="dropdown-item" href="#">Edit</a> -->
							<!-- <a class="dropdown-item" href="#">Close</a> -->
							<!--							<a class="dropdown-item" @click="changeRole">Change Roles</a>-->
							<a class="dropdown-item" @click="preferencesModal"
								>Preferences</a>
							<a class="dropdown-item" @click="deleteTeam">Delete</a>
							<a class="dropdown-item red-hover" @click="leaveTeam" :class="{ 'disabled-team': !turnOn }">Leave
								Team</a>
						</div>
					</div>
				</div>
			</div>
			<!-- Team Info -->
			<div class="card-info" :class="{ 'disabled-team': !turnOn && !tempActive }">
				<!-- Team Logo -->
				<div class="img mt-2">
					<button>
						<!-- <img src="../../assets/info-img.png" alt="info image" /> -->
						<img class="img-logo" :src="teamData.logo + `?token=${token}`" alt="info image" />
						<!-- <span v-if="edit_button_flag"
							><img src="../../assets/img-edit.png" alt="info edit"
						/></span> -->
					</button>
				</div>
				<div class="info-content" style="cursor: pointer;" @click="showTeamInfo = true">
					<a-modal :open="showTeamInfo" :closable="true" title="Team Info" @ok="showTeamInfo = false"
						@cancel="showTeamInfo = false" :ok-button-props="{ disabled: true }"
						:cancel-button-props="{ disabled: true }">
						<span class="fw-600">Team</span> <br> {{ teamData.name }} <br><br>
						<span class="fw-600">Description</span> <br> {{ teamData.description }} <br><br>


						<template #footer>
							<a-button key="submit" type="primary" shape="round" @click="showTeamInfo = false">
								Ok
							</a-button>
						</template>
					</a-modal>
					<!-- Team Name -->
					<div class="member-name">
						<p class="fw-600">{{ teamData.name }}</p>
						<!-- team Name -->
						<!-- <button v-if="edit_button_flag">
							<img
								src="../../assets/img-edit.png"
								alt="img edit"
								@click="showModalTNC = true"
							/>
						</button> -->
					</div>
					<!-- Team Description -->
					<div class="member-desc">
						<a-tooltip :title="teamData.description">
							<p class="break-long-words" style="max-width: 200px;">
								{{ teamData.description.substring(0, 80) }}
							</p>
						</a-tooltip>
						<!-- Edit Button for team description -->
						<!-- <button v-if="edit_button_flag">
							<img
								src="../../assets/img-edit.png"
								alt="img edit"
								@click="showModalTDC = true"
							/>
						</button> -->
					</div>

					<!-- Message Button for team -->
					<!-- <div class="creator">
						<button
							style="float: left"
							class="btn btn-sm btn-primary mt-1"
							@click="startConversation()"
						>
							Message
						</button>
					</div> -->
				</div>
			</div>

			<team-profile-card v-if="profileCard" :teamData="teamData" :profileActive="profileActive"
				@toggleProfileCard="toggleProfileCard" @deleteTeamMember="deleteTeamMember"
				@deleteInvitation="deleteInvitation" @teamListUpdated="teamListUpdated" />
			<!-- Member stats -->
			<div class="member-area" :class="{ 'disabled-team': !turnOn && !tempActive }">
				<div class="members">
					<p>
						<span>{{ teamData.teamlisted_short_listed.length }}</span>
						Teamlisted
					</p>
				</div>
				<div class="members">
					<p>
						<span>{{
							teamData.team_requested_connected_list.length +
							teamData.team_requested_accepted_connected_list.length
						}}</span>
						Connected
					</p>
				</div>
				<!-- <div class="members">
					<p>
						<span>{{ memberNumber + adminNumber }}</span> Members
					</p>
				</div>
				<div class="members">
					<p>
						<span>{{ adminNumber }}</span> Admin
					</p>
				</div>
				<div class="members">
					<p>
						<span>{{ teamlistedNumber }}</span> Teamslisted
					</p>
				</div> -->
			</div>

			<!-- Add or Remove Member Button -->
			<div class="member-action">
				<div class="add-remove" :class="{ 'disabled-team': !turnOn && !tempActive }">
					<!-- <button class="add-member" @click="handleAddMemberclick">
						<img src="../../assets/icon/add.svg" alt="add" /> Add member
					</button> -->
					<!--					<a-tooltip placement="top" title="Show team invitations">-->
					<!--						<img-->
					<!--							src="@/assets/icon/link-genarate-share.svg"-->
					<!--							alt=""-->
					<!--							height="25"-->
					<!--							width="25"-->
					<!--							style="cursor: pointer"-->
					<!--							class="shared-link"-->
					<!--							@click="showInvitation"-->
					<!--						/>-->
					<!--					</a-tooltip>-->
					<!--					<button-->
					<!--						class="remove-member"-->
					<!--						@click="remove_button_flag = !remove_button_flag"-->
					<!--					>-->
					<!--						<img src="../../assets/icon/remove.svg" alt="remove" />-->
					<!--						<span>Remove member</span>-->
					<!--					</button>-->

					<a-modal :width="900" :open="memberInvitation" title="Create Join Invitation"
						@ok="sendInvitationLink">
						<a-row>
							<!-- Add As a (Representative / Match Maker) -->
							<a-col :span="6">
								<a-select placeholder="Add as a" style="width: 200px" @change="handleChangeAddAs">
									<a-select-option value="Representative">
										Representative
									</a-select-option>
									<a-select-option value="Match Maker">
										Match Maker
									</a-select-option>
								</a-select>
							</a-col>

							<!-- Role (Member/ Admin) -->
							<a-col :span="6">
								<a-select placeholder="Role" style="width: 200px" @change="handleChangeRole">
									<a-select-option value="Admin"> Admin </a-select-option>
									<a-select-option value="Member"> Member </a-select-option>
								</a-select>
							</a-col>

							<a-col :span="6">
								<a-input placeholder="Relationship" @change="handleChangeRelationship">
									<a-tooltip slot="suffix" title="Relationship with Member">
										<InfoCircleOutlined style="color: rgba(0, 0, 0, 0.45)" />
									</a-tooltip>
								</a-input>
							</a-col>
							<a-col :span="6">
								<a-input placeholder="Invitation Link" style="margin-left: 15px" readonly="true"
									:value="invitationObject.invitation_link">
								</a-input>
							</a-col>
						</a-row>
					</a-modal>
				</div>

				<!-- Member Table -->
				<div class="member-info-table">
					<div class="admin-member" :class="{ 'mb-4': invitationObject.visible }">
						<div class="flex align-items-center pb-2" :class="{ 'disabled-team': !turnOn && !tempActive }"
							v-for="(member, mIndex) in sortCandidateFirst(teamData.team_members)" :key="mIndex">
							<a-tooltip placement="top" :title="member.role.replace('+', ' & ')">
								<div class="w-5p name-short"
									:class="{ 'name-short-single': member.role.toString() != 'Owner+Admin' }"><span
										v-if="member.role.toString() == 'Owner+Admin'">O</span>{{ firstLetter(member.role)
										}}</div>
							</a-tooltip>
							<div class="member-name-td cursor-pointer" @click="toggleActiveProfile(member, 'member')">
								<span class="team-member-name ellipse">{{ member.user ? member.user.full_name : 'N/A'
								}}</span>
							</div>
							<a-tooltip placement="top" :title="accountTypeReducer(member.user_type)">
								<div class="member-type">
									<span class="badge badge-secondary fs-10">{{ member.user_type ?
										accountTypeReducer(member.user_type).substr(0, 3) : '' }} {{ member.user_type ? '.'
		: '' }}</span>
								</div>
							</a-tooltip>
							<div class="check-tick">
								<div class="status-box bg-success text-white">&#10003;</div>
							</div>
							<a-tooltip placement="top" :title="member.relationship">
								<div class="d-mb-none d-dk-block relation-p ellipse">{{ member.user_type == 'Candidate' ?
									'Candidate' : member.relationship }}</div>
							</a-tooltip>
						</div>

						<div class="flex align-items-center pb-2" v-for="item in teamData.team_invited_members"
							:key="item.id">
							<a-tooltip placement="top" :title="item.role.replace('+', ' & ')">
								<div class="w-5p name-short"
									:class="{ 'name-short-single': item.role.toString() != 'Owner+Admin' }"><span
										v-if="item.role.toString() == 'Owner+Admin'">O</span>{{ firstLetter(item.role) }}
								</div>
							</a-tooltip>
							<div class="member-name-td cursor-pointer" @click="toggleActiveProfile(item, 'invitation')">
								<span class="team-member-name ellipse">{{ item.user ? item.user.full_name : 'Not joined'
								}}</span>
							</div>
							<a-tooltip placement="top" :title="accountTypeReducer(item.user_type)">
								<div class="member-type">
									<span class="badge badge-secondary fs-10">{{ item.user_type ?
										accountTypeReducer(item.user_type).substr(0, 3) : '' }} {{ item.user_type ? '.' : ''
	}}</span>
								</div>
							</a-tooltip>
							<div class="check-tick">
								<div class="status-box bg-success text-white">&#10003;</div>
							</div>
							<a-tooltip placement="top" :title="item.relationship">
								<div class="d-mb-none d-dk-block relation-p ellipse">{{ item.relationship }}</div>
							</a-tooltip>
						</div>
					</div>

					<div class="d-flex member-add-box pb-2" v-if="invitationObject.visible">
						<a-tooltip placement="top" title="Member role will">
							<a-select placeholder="Role" class="fs-10 w-25 member-add" v-model="invitationObject.role">
								<!--              <a-select-option value="Owner+Admin"> Owner Admin </a-select-option>-->
								<a-select-option value="Admin"> Admin </a-select-option>
								<a-select-option value="Member"> Member </a-select-option>
							</a-select>
						</a-tooltip>

						<a-tooltip placement="top" title="Add as a">
							<a-select placeholder="Add as a" class="ml-1 fs-10 w-25 member-add"
								v-model="invitationObject.add_as_a">
								<a-select-option value="Candidate" :disabled="ifHasCandidate()"> Candidate
								</a-select-option>
								<a-select-option value="Representative"> Representative </a-select-option>
								<!--                <a-select-option value="Match Maker"> Match Maker </a-select-option>-->
							</a-select>
						</a-tooltip>

						<a-tooltip placement="top" title="Relationship with candidate is">
							<a-select placeholder="Relationship" class="ml-1 fs-10 w-25 member-add"
								v-model="invitationObject.relationship">
								<a-select-option v-for="(relation, index) in relationships" :key="index" :value="relation">
									{{ relation }} </a-select-option>
							</a-select>
						</a-tooltip>

						<a-button v-if="!clickedInviteNow" class="ml-1 confirm-button fs-12 bright-20 member-btn"
							:disabled="!invitationObject.role || !invitationObject.add_as_a || !invitationObject.relationship"
							@click="inviteNowWindow">Invite now</a-button>

						<a-dropdown class="confirm-button bright-20 w-20 fs-10 member-btn dropdown-button"
							v-if="clickedInviteNow">
							<a-menu slot="overlay">
								<a-menu-item key="1" @click="againInviteWindow()">Invite Now </a-menu-item>
								<!--                submitInvite-->
								<a-menu-item key="2" @click="removeInvite()">Remove </a-menu-item>
							</a-menu>
							<a-button class="ml-1 fs-10"> Invite Now </a-button>
						</a-dropdown>
					</div>
				</div>

				<button class="add-member" @click="handleAddMemberclick">
					<img src="../../assets/icon/add.svg" alt="add" /> Add member
				</button>
				<a-tooltip placement="top" title="Click save to save your changes">
					<button class="btn btn-sm btn-success" v-if="changeRoleEnabled" @click="changeRole">
						Update
					</button>
				</a-tooltip>
			</div>

			<!-- Invitations History -->
			<div class="team-invitations mr-3" :class="{ 'disabled-team': !turnOn && !tempActive }">
				<!-- Team Invitation History Modal -->
				<a-modal :width="700" :open="showTeamInvitation" title="Invitations History">
					<table class="table table-striped table-hover table-center">
						<thead>
							<tr>
								<th>Team ID</th>
								<th>Role</th>
								<th>User Type</th>
								<th>Relationship</th>
								<th>Invitation Link</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="item in teamData.team_invited_members" :key="item.id">
								<td>{{ item.team_id }}</td>
								<td>{{ item.role }}</td>
								<td>{{ item.user_type }}</td>
								<td>{{ item.relationship }}</td>
								<td>{{ item.link }}</td>
							</tr>
						</tbody>
					</table>
				</a-modal>
			</div>

			<!-- Subscription Information -->
			<div class="team-card-footer" :class="{ 'disabled-team': !turnOn && !tempActive }">
				<div class="left">
					<div class="subscription-info">
						<a :href="'subscription/' + teamData.team_id"><img src="../../assets/icon/renew.svg"
								alt="Renew Subscription" class="subscription-img" />
							<span class="ml-2">{{ teamData.subscription_expire_at ? 'Renew Subscription' : 'Subscription'
							}}</span></a>
					</div>
					<p class="text-success" v-if="!subTextShow">
						Subscription Expire :
						{{ formateDate(teamData.subscription_expire_at) }}
					</p>
					<p class="text-danger" v-else>
						Subscription Expire :
						{{ formateDate(teamData.subscription_expire_at) }}
					</p>
					<p>Team Creation Date : {{ formateDate(teamData.created_at) }}</p>
					<p class="text-truncate">Team created by : <span> {{ teamData && teamData.created_by ? teamData.created_by.full_name : ''
					}}</span></p>
					
				</div>
				<!--				<div class="right d-subs-dk">-->
				<!--          <a-tooltip-->
				<!--              placement="top"-->
				<!--              :title="teamData.subscription_expire_at ? 'Renew Subscription' : 'Subscription'"-->
				<!--          >-->
				<!--            <a :href="'subscription/' + teamData.team_id" class="text-center"-->
				<!--            ><img src="../../assets/icon/renew.svg" alt="Renew Subscription"/>-->
				<!--              <span class="display-subs-text">{{ teamData.subscription_expire_at ? 'Renew Subscription' : 'Subscription' }}</span></a-->
				<!--            >-->
				<!--          </a-tooltip>-->
				<!--&lt;!&ndash;					<a :href="'subscription/' + teamData.team_id"&ndash;&gt;-->
				<!--&lt;!&ndash;						><img src="../../assets/icon/renew.svg" alt="Renew Subscription" />&ndash;&gt;-->
				<!--&lt;!&ndash;						<span>{{ teamData.subscription_expire_at ? 'Renew Subscription' : 'Subscription' }}</span></a&ndash;&gt;-->
				<!--&lt;!&ndash;					>&ndash;&gt;-->
				<!--				</div>-->
			</div>
		</div>
		<!-- end box card s -->
		<InviteMember v-if="invitationObject.memberBox" :team="teamData" :invitationObject="invitationObject"
			:from="'details-card'" @toggleMemberbox="toggleMemberbox" @executeInviteMember="executeInviteMember" />
	</div>
</template>

<script>
import ApiService from "../../services/api.service";
import JwtService from "../../services/jwt.service.js";
import DeletionModal from "./Modals/DeletionModal.vue";
import PreferenceModal from "./Modals/PreferenceModal.vue";
import LTModal from "./Modals/LTModal.vue";
import TNCModal from "./Modals/TeamNameChangeModal.vue";
import TDCModal from "./Modals/TeamDescriptionChange.vue";
// import { Modal } from 'ant-design-vue';
import InviteMember from "./InviteMember.vue";
import TeamProfileCard from "./TeamProfileCard.vue";
import Notification from "@/common/notification.js";

import { InfoCircleOutlined } from "@ant-design/icons-vue";

export default {
	name: "TeamDetailsCard",
	props: ["teamData", "index"],
	components: { TeamProfileCard, InviteMember, DeletionModal, PreferenceModal, LTModal, TNCModal, TDCModal, InfoCircleOutlined },
	sockets: {
		connect: function () {
			console.log('socket connected')
		},
		ping: function (data) {
			console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
		}
	},
	data() {
		return {
			token: "",
			deleteTeamLoading: false,
			invitation_link: [],
			invitation_link_show: [],
			relationships: ['Father', 'Mother', 'Brother', 'Sister', 'Grand Father', 'Grand Mother', 'Brother-in-law', 'Sister-in-paw'],
			roles: [
				{ text: 'Admin', value: 'Admin' },
				{ text: 'Member', value: 'Member' },
			],
			invitationObject: {
				role: "Admin",
				add_as_a: "Representative",
				relationship: "Father",
				invitation_link: "",
				visible: false,
				memberBox: false
			},
			add_as_a: [],
			role: [],
			relationship: [],
			invitedMembers: [],
			invitedObj: null,

			edit_button_flag: false,
			remove_button_flag: false,
			turnOn: false,

			memberNumber: 0,
			adminNumber: 0,
			teamlistedNumber: 0,

			addMemberCount: 0,

			subText: "",
			subTextShow: true,

			isOwnerAdmin: 0,

			showModalDeletion: false,
			showModalPreference: false,
			showModalLT: false,
			showModalTNC: false,
			showModalTDC: false,
			conversations: [],

			teamInfo: null,

			avatar: "",
			avatarSrc: "",

			showTeamInvitation: false,
			showTeamInfo: false,
			memberInvitation: false,

			changeRoleEnabled: false,
			profileCard: false,
			profileActive: null,
			clickedInviteNow: false,
			tempActive: false,
			teamUpdating: false,
			imageApiLocation: import.meta.env.VITE_IMAGE
		};
	},
	created() {
		this.teamInfo = this.teamData;
		this.token = JSON.parse(localStorage.getItem("token"));

	},
	computed: {
		is_subscribed() {
			if (this.teamData.subscription_expire_at == null) {
				return false;
			}

			//check expiry returns false if sub is expired
			if (!this.checkExpiry(this.teamData.subscription_expire_at)) {
				return false;
			} else {
				return true;
			}
		},
	},
	mounted() {
		this.entityNumberReducer();
		this.subTextReducer();
		this.checkTurnedOnSwitch();
		this.checkCurrentUser();
	},
	methods: {
		socketNotification(payload) {
			let loggedUser = JSON.parse(localStorage.getItem('user'));
			payload.sender = loggedUser.id;
			Notification.storeNotification(payload);
			payload.created_at = new Date();
			payload.seen = 0;
			payload.sender = loggedUser;
			if (payload && payload.receivers.length > 0) {
				payload.receivers = payload.receivers.map(item => {
					return item.toString();
				});
				this.$socket.emit('notification', payload);
			}
		},
		showInvitation() {
			this.showTeamInvitation = true;
		},
		handleChangeAddAs(value) {
			this.invitationObject.add_as_a = value;
		},
		handleChangeRole(value) {
			this.invitationObject.role = value;
		},
		handleChangeRelationship(e) {
			this.invitationObject.relationship = e.target.value;
		},
		sendInvitationLink() {
			let payload = {
				team_id: this.teamData.team_id,
				members: [
					{
						role: this.invitationObject.role,
						add_as_a: this.invitationObject.add_as_a,
						relationship: this.invitationObject.relationship,
						invitation_link: this.invitationObject.invitation_link,
					},
				],
			};
			console.log(payload);
			this.$store
				.dispatch("createTeamInvite", payload)
				.then((data) => {
					console.log(data);
					if (data.data.status_code == 200 || data.data.status != "FAIL") {
						// console.log(data.data);
						//this.invitation_link_show = this.invitation_link;
						//console.log(this.invitation_link_show);
						//this.$message.success("Invitation Created");
						var vm = this;
						this.$confirm({
							icon: "check-circle",
							title: "Invitation Link Generated!",
							content: "Send this invitation link to join in your team!",
							center: true,
							confirmLoading: true,
							onOk() {
								vm.memberInvitation = false;
								vm.$emit("teamListUpdated");
								//setTimeout(() => vm.$router.go(), 1000);
							},
						});
					} else {
						this.$message.error("Something went wrong, Please try again");
						//this.invitation_link[index] = "";
					}
				})
				.catch((err) => {
					// console.log(err);
					this.$message.error("Something went wrong, Please try again");
					//this.invitation_link[index] = "";
				});
		},
		imageSizeCheck(file) {
			const allowedExtensions = ['jpg', 'jpeg', 'png'];
			const extension = file.name.split('.').pop().toLowerCase();
			if(!allowedExtensions.includes(extension)) {
				this.$error({
				title: "Error!",
				content: `The file you tried to upload is not a valid image file.`,
				center: true,
				});
				return false;
			};
			if (file["size"] > 2111775) {
				this.$error({
					title: "Validation Error",
					content: "Image size can't be more than 2 mb",
					center: true,
				});
				return false;
			}
			return true;
		},
		getAvatar(e) {
			let file = e.target.files[0];
			console.log(file);
			if (!this.imageSizeCheck(file)) {
				file = "";
				return;
			}
			this.avatar = e.target.files[0];
			let reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = (e) => {
				this.avatarSrc = e.target.result;
			};
		},
		async handleOkTDC(bundle) {
			console.log(bundle);
			await ApiService.post(`v1/team-update/${this.teamData.id}`, {
				description: bundle.teamDescription,
			})
				.then((data) => {
					console.log(data);
					if (data.data.status == "FAIL") {
						this.$message.error(data.data.message);
						return false;
					}
					if (data.data.status !== "FAIL") {
						this.$message.success("Successfully Description Changed");
						this.$emit("teamListUpdated");
					}
				})
				.catch((error) => {
					console.log(error);
					console.log(error.response);
					console.log(error.response.data.message);
					this.$message.error(error.response.data.message);

					this.$message.error("Something went Wrong");
					return false;
				});
		},
		teamListUpdated() {
			this.profileCard = false;
			this.profileActive = null;
			this.$emit("teamListUpdated");
		},
		async handleTeamInfoChange() {
			// let payload = {
			// 	name: this.teamInfo.name,
			// 	description: this.teamInfo.description,
			// };
			let formData = new FormData();
			formData.append("name", this.teamInfo.name);
			formData.append("description", this.teamInfo.description);
			if (this.avatar) {
				formData.append("logo", this.avatar.name);
			}
			this.teamUpdating = true;
			await ApiService.post(`v1/team-update/${this.teamData.id}`, formData)
				.then(async (data) => {
					console.log(data);
					if (data.data.status == "FAIL") {
						this.$message.error(data.data.message);
						return false;
					}
					if (data.data.status !== "FAIL") {
						//this.$message.success("Successfully Name and description Changed");
						this.$success({
							title: "Success!",
							content: "Team Data Updated Successfully",
							center: true,
						});
						console.log('berfore image save')
						if(this.avatar) {
							console.log('inside image save')

							formData = new FormData();
							formData.append('image', this.avatar);
							await this.$store.dispatch("uploadImages", {folder: `_${this.teamData.id}_team_logo_url`, image: formData}).then(async (respond) => {
							// console.log(data, 'image response afer saving image');

								let  payload = {
									logo: this.imageApiLocation + '/' + Object.values(respond)[0]
								};
								
								await ApiService.post(`v1/team-update/${this.teamData.id}`, payload).then(res => {
									if(res && res.data && res.data.status != 'FAIL') {
									this.teamData.logo = res.data.data.logo;
									} else {
									this.$message.error("Something went wrong");
									return;
									}
								});
							});
						}
						console.log('after image save')
						
						this.edit_button_flag = false;
						this.teamUpdating = false;

						if (this.teamData && this.teamData.team_members && this.teamData.team_members.length > 1) {
							let loggedUser = JSON.parse(localStorage.getItem('user'));
							let receivers = this.teamData.team_members.filter(item => item.user_id != loggedUser.id).map(opt => opt.user_id);
							let payload = {
								receivers: receivers,
								title: `updated team ${this.teamData.name}'s information`,
								team_temp_name: this.teamData.name,
								team_id: this.teamData.id
							};
							this.socketNotification(payload);
						}

						// setTimeout(() => this.$router.go(), 1200);
						this.$emit("teamListUpdated");
					}
				})
				.catch((error) => {
					console.log(error);
					console.log(error.response);
					console.log(error.response.data.message);
					this.$message.error(error.response.data.message);

					this.$message.error("Something went Wrong");
					return false;
				});
		},
		async handleOkTNC(bundle) {
			await ApiService.post(`v1/team-update/${this.teamData.id}`, {
				name: bundle.teamName,
			})
				.then((data) => {
					console.log(data);
					if (data.data.status == "FAIL") {
						this.$message.error(data.data.message);
						return false;
					}
					if (data.data.status !== "FAIL") {
						this.$message.success("Successfully Name Changed");
						this.$emit("teamListUpdated");
					}
				})
				.catch((error) => {
					console.log(error);
					console.log(error.response);
					console.log(error.response.data.message);
					this.$message.error(error.response.data.message);

					this.$message.error("Something went Wrong");
					return false;
				});
		},
		sortOwnerFirst(team) {
			let _team = [];
			team.forEach((_t) => {
				if (_t.role == "Owner+Admin") {
					_team.unshift(_t);
				} else {
					_team.push(_t);
				}
			});
			return _team;
		},
		sortCandidateFirst(team) {
			let _team = [];
			team.forEach((_t) => {
				if (_t.user_type == "Candidate") {
					_team.unshift(_t);
				} else {
					_team.push(_t);
				}
			});
			return _team;
		},
		changeRole() {
			console.log(this.changeRoleEnabled);
			this.changeRoleEnabled = !this.changeRoleEnabled;
		},
		async onRoleChange(e, user_id) {
			// console.log(e.target.value, user_id);
			let _payload = {
				team_id: this.teamData.team_id,
				user_id: user_id,
				access_type: e.target.value,
			};
			console.log(_payload);
			await ApiService.post("v1/change-team-member-access", {
				team_id: this.teamData.team_id,
				user_id: user_id,
				access_type: e.target.value,
			})
				.then((data) => {
					console.log(data);
					if (data.data.status == "FAIL") {
						this.$message.error(data.data.message);
						return false;
					}
					if (data.data.status !== "FAIL") {
						this.$message.success("Successfully Role Changed");
						this.$emit("teamListUpdated");
					}
				})
				.catch((error) => {
					console.log(error);
					console.log(error.response);
					console.log(error.response.data.message);
					this.$error({
						title: "Error!",
						content: error.response.data.message,
					});
					//this.$message.error(error.response.data.message);

					//this.$message.error("Something went Wrong");
					return false;
				});
		},
		async handleOkLT(payload) {
			console.log(payload);
			if (payload.member_id == undefined) {
				// as a member user
				let _payload = {
					team_id: this.teamData.id,
					user_id: this.$store.getters.userInfo.id,
				};
				await ApiService.post("v1/leave-team", {
					team_id: this.teamData.id,
					user_id: this.$store.getters.userInfo.id,
				})
					.then((data) => {
						if (data.data.status == "FAIL") {
							//this.$message.error(data.data.message);

							this.$error({
								title: "Error",
								content: data.data.message,
							});
							return false;
						}
						if (data.data.status !== "FAIL") {
							if (this.teamData && this.teamData.team_members && this.teamData.team_members.length > 1) {
								let loggedUser = JSON.parse(localStorage.getItem('user'));
								let receivers = this.teamData.team_members.filter(item => item.user_id != loggedUser.id).map(opt => opt.user_id);
								let payload = {
									receivers: receivers,
									title: `deleted ${this.teamData.name} team`,
									team_temp_name: this.teamData.name,
									team_id: this.teamData.id
								};
								this.socketNotification(payload);
							}

							this.$success({
								title: "Success!",
								content: "Successfully left team",
							});
							this.$emit("teamListUpdated");
							return true;
						}
					})
					.catch((error) => {
						console.log(error);
						console.log(error.response);
						this.$message.error("Something went Wrong");
						return false;
					});
			} else {
				// admin user
				let _payload = {
					team_id: this.teamData.id,
					user_id: this.$store.getters.userInfo.id,
					new_owner: payload.member_id,
				};
				console.log(_payload);
				await ApiService.post("v1/leave-team", {
					team_id: this.teamData.id,
					user_id: this.$store.getters.userInfo.id,
					new_owner: payload.member_id,
				})
					.then((data) => {
						if (data.data.status == "FAIL") {
							this.$message.error(data.data.message);
							return false;
						}
						if (data.data.status !== "FAIL") {
							this.$message.success("Successfully Left Team");
							this.$emit("teamListUpdated");
							return true;
						}
					})
					.catch((error) => {
						console.log(error);
						console.log(error.response);
						this.$message.error("Something went Wrong");
						return false;
					});
			}

			// After all thing is done, dont forget to hide modal
			this.showModalLT = false;
		},
		leaveTeam() {
			this.showModalLT = true;
		},
		async handleOkPreference(payload) {
			console.log("Preference Ok got a hit");
			console.log(payload);
			//* we are droping visibility for now
			delete payload.team_visiblity;
			await ApiService.post(`v1/team-update/${this.teamData.id}`, payload)
				.then((data) => {
					console.log(data);
					console.log(data.data.data.password);

					if (data.data.status != "FAIL" && data.data.status_code == 200) {
						if (data.data.data.password !== this.teamData.password) {
							this.$message.success("Team Password Updated");
							this.showModalPreference = false;
							this.$emit("teamListUpdated");
						} else {
							this.$message.error("Something went wrong");
							this.$message.error(
								"You enter a wrong password for Present Password"
							);
							this.showModalPreference = false;
						}
					} else {
						this.$message.error("Something went wrong");
						this.showModalPreference = false;
					}
				})
				.catch((error) => {
					console.log(error);
					console.log(error.response);
					this.$message.error(error.response.data.message);
					this.showModalPreference = false;
				});
			//After fail and success we need to reun This
			// this.showModalPreference = false;
			// this.$emit('teamListUpdated');
		},
		preferencesModal() {
			if (this.isOwnerAdmin == false) {
				//* show modal that user is not has privilage to edit this team
				this.$error({
					content: "You are not eligible to edit preferences",
				});
				return false;
			}
			this.showModalPreference = true;
		},
		firstLetter(name) {
			if (name == "Owner+Admin" || name == "Member+Admin" || name == "Admin") {
				return "A";
			} else {
				return "M";
			}
		},
		async deleteTeamMember(id, full_name) {
			let self = this;
			this.modal = this.$confirm({
				title: "Delete Confirmation",
				content: `Are you sure you want to remove ${full_name} from ${this.teamData.name} team?`,
				okText: "Yes",
				okType: "danger",
				cancelText: "No",
				confirmLoading: true,
				async onOk() {
					await ApiService.delete(`/v1/team-members-delete?team_id=${self.teamData.team_id}&delete_user_id=${id}`)
						.then((data) => {
							console.log(data);
							if (data.data.status != "FAIL") {

								self.profileCard = false;
								self.profileActive = null;

								if (self.teamData && self.teamData.team_members && self.teamData.team_members.length > 1) {
									let loggedUser = JSON.parse(localStorage.getItem('user'));
									let receivers = self.teamData.team_members.filter(item => item.user_id != loggedUser.id).map(opt => opt.user_id);
									let payload = {
										receivers: receivers,
										title: `deleted ${full_name} from ${self.teamData.name} team`,
										team_temp_name: self.teamData.name,
										team_id: self.teamData.id
									};
									self.socketNotification(payload);
								}

								self.$message.success(
									full_name + " removed from " + self.teamData.name + " "
								);
								self.$emit("teamListUpdated");
							} else {
								self.$message.error("Something went wrong");
								self.$emit("teamListUpdated");
							}
						})
						.catch((error) => {
							console.log(error);
							console.log(error.response);
							self.$message.error("Something went wrong");
						});
				},
				onCancel() {
					console.log("Cancel");
				},
			});
		},
		async deleteInvitation(id) {
			let self = this;
			this.modal = this.$confirm({
				title: "Delete Confirmation",
				content: `Are you sure you want to remove this invitation from ${this.teamData.name} team?`,
				okText: "Yes",
				okType: "danger",
				cancelText: "No",
				confirmLoading: true,
				async onOk() {
					await ApiService.delete(`/v1/member-invitation-delete?id=${id}`)
						.then((data) => {
							console.log(data);
							if (data.data.status != "FAIL") {
								self.$message.success("Invitation removed from " + self.teamData.name);
								self.$emit("teamListUpdated");
								self.profileActive = null;
								self.profileCard = false;

								self.invitedMembers = [];
								self.invitationObject.invitation_link = '';
								self.invitationObject.visible = false;
								self.invitedObj = {};
							} else {
								self.$message.error("Something went wrong");
								self.$emit("teamListUpdated");
							}
						})
						.catch((error) => {
							console.log(error);
							self.$message.error("Something went wrong");
						});
				},
			});
		},
		async checkCurrentUser() {
			// await this.$store.dispatch("getUser");
			let userData = this.$store.getters.userInfo;
			console.log(userData, 'check current user');
			console.log(userData.id);
			this.teamData.team_members.map((_member) => {
				if (_member.user_id == userData.id) {
					if (_member.role == "Owner+Admin") {
						this.isOwnerAdmin = true;
					} else {
						this.isOwnerAdmin = false;
					}
				}
			});
		},
		async handleOkDeletion(bundle) {
			let {
				passwordTeam: password,
				deletionReasonDetail,
				deletionReasonType,
			} = bundle;
			if (password.length == 0) {
				// this.$message.error("Please Enter Password");
				this.$error({
					title: "Error",
					content: "Please Enter Password",
				});
				return;
			}
			// if (deletionReasonDetail.length == 0 && deletionReasonType.length == 0) {
			// 	// this.$message.error("Please Enter Deletion Reason and Type Properly");
			// 	this.$error({
			// 		title: "Error",
			// 		content: "Please Enter Deletion Reason and Type Properly",
			// 	});
			// 	return;
			// }
			if (!this.isOwnerAdmin) {
				// this.$message.error("You don't have rights to delete this team");
				this.$error({
					title: "Error",
					content: "You don't have rights to delete this team",
				});
				return;
			}
			this.deleteTeamLoading = true;
			await ApiService.delete("v1/delete-team", {
				team_id: this.teamData.team_id,
				team_password: password,
				notify_members: false,
			})
				.then(async (data) => {
					console.log(data);

					if (data.data.status != "FAIL" && data.data.status_code == 200) {
						this.$message.success("Team Deleted Successfully");

						if (this.teamData && this.teamData.team_members && this.teamData.team_members.length > 1) {
							let loggedUser = JSON.parse(localStorage.getItem('user'));
							let receivers = this.teamData.team_members.filter(item => item.user_id != loggedUser.id).map(opt => opt.user_id);
							let payload = {
								receivers: receivers,
								title: `deleted ${this.teamData.name} team`,
								team_temp_name: this.teamData.name,
								team_id: this.teamData.id
							};
							this.socketNotification(payload);
						}

						let _team_id = JwtService.getTeamIDAppWide();
						if (this.teamData.team_id == _team_id) {
							JwtService.destroyTeamIDAppWide();
						}

						await ApiService.post("v1/delete-reason-submit", {
							team_id: this.teamData.team_id,
							reason_type: deletionReasonType,
							reason_text: deletionReasonDetail,
						})
							.then((data) => {
								console.log(data)
							}).catch((error) => console.log(error));

						this.deleteTeamLoading = false;
						this.showModalDeletion = false;
						this.$success({
							title: "Success",
							content: "Team Deleted Successfully",
						});
						this.$emit("teamListUpdated");
						location.reload();
					} else {
						// this.$message.error("Something went wrong");
						this.$error({
							title: "Error",
							content: "Something went wrong",
						});

						this.showModalDeletion = false;
					}
				})
				.catch((error) => {
					console.log(error);
					console.log(error.response);
					// this.$message.error("Something went wrong");

					this.showModalDeletion = false;
					this.$error({
						title: "Error",
						content: "Something went wrong",
					});
				});
		},
		deleteTeam() {
			if (!this.isOwnerAdmin) {
				//this.$message.error("You don't have rights to delete this team");
				this.$error({
					title: "Error",
					content: "You don't have rights to delete this team!",
				});
				return;
			} else {
				this.showModalDeletion = true;
			}
		},
		checkTurnedOnSwitch() {
			let _team_id = JwtService.getTeamIDAppWide();
			console.log(_team_id)
			// console.log("did not got")

			if (_team_id == this.teamData.team_id) {
				this.turnOn = true;
			} else {
				this.turnOn = false;
			}
		},
		subTextReducer() {
			if (this.teamData.subscription_expire_at == null) {
				this.subText = "Subscription";
				return;
			}
			if (!this.checkExpiry(this.teamData.subscription_expire_at)) {
				this.subText = "Renew Subscription";
				return;
			}
			this.subTextShow = false;
		},
		addMemberClick() {
			this.memberInvitation = true;
			this.createInvitaionLink();
			if (this.teamData.member_count === 5) {
				this.$warning({
					title: "Warning",
					content: "Cant invite, team already have 5 members",
				});
				return;
			}
			if (this.addMemberCount === 5) {
				this.$message.error("Can't create more invitaion");
				return;
			}
			this.addMemberCount++;
		},
		accountTypeReducer(accType) {
			return accType;
			// console.log(accType);
			// if (accType == "Representative") {
			// 	return "Rep.";
			// }
			// if (accType == "Candidate") {
			// 	return "Cand.";
			// }
			// if (accType == "Matchmaker") {
			// 	return "Match.";
			// }
		},
		editTeam() {
			//Toggle the Edit Button
			this.edit_button_flag = !this.edit_button_flag;

			// No conditions required for editing the team's description and adding member

			// if (this.edit_button_flag) {
			// 	this.edit_button_flag = !this.edit_button_flag;
			// 	return;
			// }
			// try {
			// 	await ApiService.post("v1/team-edit-check", {
			// 		team_id: this.teamData.team_id,
			// 	})
			// 		.then((data) => {
			// 			console.log(data);
			// 			if (data.data.status == "FAIL") {
			// 				//this.$message.error(data.data.message);
			// 				this.$error({
			// 					// title: 'This is an error message',
			// 					content: data.data.message,
			// 					centered: true,
			// 				});
			// 				return false;
			// 			}
			// 			if (data.data.status !== "FAIL") {
			// 				this.$message.success("Edit Enabled");
			// 				this.edit_button_flag = true;
			// 				return true;
			// 			}
			// 		})
			// 		.catch((error) => {
			// 			console.log(error);
			// 			console.log(error.response);
			// 			//this.$message.error(error.response.data.message);
			// 			this.$error({
			// 				title: "Team Edit Failed",
			// 				content: error.response.data.message,
			// 				centered: true,
			// 			});
			// 			//this.$message.error("Something went Wrong");
			// 			return false;
			// 		});
			// } catch (e) {
			// 	console.log(e);
			// 	this.$message.error("Something went Wrong");
			// }
		},
		entityNumberReducer() {
			this.teamData.team_members.map((_member) => {
				if (_member.role == "Owner+Admin" || _member.role == "Member Admin") {
					this.adminNumber++;
				} else {
					this.memberNumber++;
				}
			});
		},
		async turnOnTeam() {
			const self = this;
			if (this.is_subscribed) {
				if (this.teamData.team_members.length < 2) {
					this.$confirm({
						icon: "info-circle",
						title: "This team do not contain sufficient user",
						okText: 'Add Member',
						center: true,
						confirmLoading: true,
						onOk() {
							self.tempActive = true;
							self.handleAddMemberclick();
						},
					});
					return false;
				}

				let candidateFlag = 0;
				this.teamData.team_members.map((_member) => {
					if (_member.user_type == "Candidate") {
						candidateFlag++;
					}
				});

				if (candidateFlag == 0) {
					this.$confirm({
						icon: "info-circle",
						title: "This team do not contain any candidate",
						okText: 'Add Candidate',
						center: true,
						confirmLoading: true,
						onOk() {
							self.tempActive = true;
							self.invitationObject.add_as_a = 'Candidate';
							self.handleAddMemberclick();
						},
					});
					return false;
				}

				try {
					await ApiService.post("v1/team-turn-on", {
						team_id: this.teamData.id,
					})
						.then((data) => {
							if (data.data.status == "FAIL") {
								this.$message.error(data.data.message);
								return false;
							}
							if (data.data.status !== "FAIL") {
								JwtService.saveTeamIDAppWide(this.teamData.team_id);
								JwtService.saveTeamID(this.teamData.id);
								const vm = this;
								this.$success({
									title: "Success",
									content: "Selected Team Activated. Please note all the feature related information (chat, search, connection etc) will changed to this team is that you just activated. ",
									onOk() {
										vm.$emit("customLoad");
										setTimeout(() => vm.$router.go(), 100);
									},
								});
								return true;
							}
						})
						.catch((error) => {
							console.log(error);
							console.log(error.response);
							this.$message.error("Something went Wrong");
							return false;
						});
				} catch (error) {
					console.log(error);
				}
			} else {
				this.$confirm({
					icon: "info-circle",
					title: "Subscription Needed",
					content: "Please buy subscription to Activate the team",
					okText: 'Subscribe Now',
					center: true,
					confirmLoading: true,
					onOk() {
						self.$router.push({ name: 'SubscriptionTeam', params: { id: self.teamData.team_id } });
					},
				});
				// this.$error({
				// 	title: "Subscription Needed",
				// 	content: "Please buy subscription to Activate the team",
				// });
				return false;
			}
			return true;
		},
		checkExpiry(dateString) {
			var myDate = new Date(dateString);
			var today = new Date();
			if (myDate > today) {
				return true;
			}
			return false;
		},
		generateInvitation(index) {
			this.createInvitaionLink(index);
			// inserting link into payload
			// this.invitationObject.invitation_link = this.invitationLink;
			// let payload = new FormData();
			// creating formdata before sending thm to dob
			// payload.append('team_id', JwtService.getTeamID());
			// payload.append('members', JSON.stringify([{ ...this.invitationObject }]));

			let payload = {
				team_id: this.teamData.team_id,
				members: [
					{
						role: this.role[index],
						add_as_a: this.add_as_a[index],
						relationship: this.relationship[index],
						invitation_link: this.invitation_link[index],
					},
				],
			};

			console.log(payload);

			this.$store
				.dispatch("createTeamInvite", payload)
				.then((data) => {
					console.log(data);
					if (data.data.status_code == 200 || data.data.status != "FAIL") {
						// console.log(data.data);
						this.invitation_link_show = this.invitation_link;
						console.log(this.invitation_link_show);
						this.$forceUpdate();
						this.$message.success("Invitation Created");
					} else {
						this.$message.error("Something went wrong, Please try again");
						this.invitation_link[index] = "";
					}
				})
				.catch((err) => {
					// console.log(err);
					this.$message.error("Something went wrong, Please try again");
					this.invitation_link[index] = "";
				});
		},
		handleAddMemberclick() {
			let members = this.teamData.team_members.length;
			members += this.teamData.team_invited_members.length;
			if (members < 5) {
				this.invitationObject.memberBox = true;
				// this.invitationObject.visible = true;
				// this.createInvitaionLink();
			} else {
				this.$warning({
					title: 'Maximum number reached!',
					content: "You can't add new member now",
				});
			}
		},
		inviteNowWindow() {
			this.clickedInviteNow = true;
			this.invitationObject.memberBox = true;
			this.createInvitaionLink();
		},
		againInviteWindow() {
			this.invitationObject.memberBox = true;
		},
		toggleMemberbox(success = false) {
			this.clickedInviteNow = false;
			this.tempActive = false;
			this.invitationObject.memberBox = false;
			// this.invitationObject = {
			//   role: "Admin",
			//   add_as_a: "Representative",
			//   relationship: "Father",
			//   invitation_link: "",
			//   visible: false,
			//   memberBox: false
			// }
			this.$emit("teamListUpdated");
		},
		async executeInviteMember(user) {
			this.invitationObject.memberBox = false;
			this.tempActive = false;
			let data = {
				invitation_id: this.invitedObj.invitation_id,
				email: user.email,
				receivers: [user.id]
			};
			await ApiService.post('/v1/invite-team-member-update', data).then(response => {
				console.log(response)
				this.invitedObj = null;
				this.invitationObject.visible = false;
				this.invitationObject.invitation_link = '';
				this.clickedInviteNow = false;
				let notifyObj = {
					receivers: data.receivers,
					title: `invited you to join ${this.teamData.name} team as ${this.invitationObject.role}`,
					team_id: this.teamData.id,
					team_temp_name: this.teamData.name
				};
				this.socketNotification(notifyObj);

				this.$emit("teamListUpdated");
			});
		},
		removeInvite() {
			this.deleteInvitation(this.invitedObj.invitation_id);
		},
		async submitInvite() {
			this.invitedMembers.push(this.invitationObject);
			let payload = {
				team_id: this.teamData.team_id,
				members: this.invitedMembers
			};

			await ApiService.post('/v1/invite-team-members', payload).then(res => {
				if (res && res.data) {
					this.invitedMembers = [];
					this.invitationObject.visible = false;
					this.invitationObject.memberBox = false;
					this.invitationObject.invitation_link = false;
					this.$emit("teamListUpdated");
				}
			});
		},
		createInvitaionLink() {
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
				self.invitationObject.visible_invitation_link = window.location.host + '/manageteam?invitation=' + self.invitationObject.invitation_link;

				let data = {
					role: self.invitationObject.role,
					add_as_a: self.invitationObject.add_as_a,
					relationship: self.invitationObject.relationship,
					invitation_link: self.invitationObject.invitation_link,
					email: null
				};
				self.invitedMembers.push(data);

				let payload = {
					team_id: self.teamData.team_id,
					members: self.invitedMembers
				};
				ApiService.post('/v1/invite-team-members', payload).then(res => {
					self.invitedMembers = [];
					self.invitedObj = res.data.data[0];
				});
			})();
		},
		accountTypeToName(number) {
			if (number == 1) {
				return "Candidate";
			} else if (number == 2) {
				return "Representative";
			} else if (number == 3) {
				return "Matchmaker";
			} else {
				return "Something went wrong";
			}
		},
		nameInitials(name) {
			let rgx = new RegExp(/(\p{L}{1})\p{L}+/, "gu");

			let initials = [...name.matchAll(rgx)] || [];

			initials = (
				(initials.shift()?.[1] || "") + (initials.pop()?.[1] || "")
			).toUpperCase();

			return initials;
		},
		formateDate(date) {
			if (date == null || date == undefined) {
				return "  Not Exist";
			}
			let d = new Date(date),
				month = "" + (d.getMonth() + 1),
				day = "" + d.getDate(),
				year = d.getFullYear();

			if (month.length < 2) month = "0" + month;
			if (day.length < 2) day = "0" + day;

			return [year, month, day].join("-");
		},
		async onChangeActivateTeam(checked) {
			if (checked) {
				let returnedResult = await this.turnOnTeam();
				this.$store.commit("setTeamInfo", this.teamData);
				if (returnedResult) {
					this.turnOn = true;
				} else {
					this.turnOn = false;
					// this.$router.go();
				}
			} else {
				this.$store.commit("setTeamInfo", null);
				JwtService.destroyTeamIDAppWide();
				this.$router.go();
			}
		},
		startConversation() { },
		checkChatCategory(categoryId) {
			console.log("inside");
			console.log(this.conversations.length);
			console.log(this.conversations);
			for (var i = 0; i < this.conversations.length; i++) {
				console.log("category given:", categoryId);
				console.log("category item:", this.conversations[i].category_id);
				if (this.conversations[i].category_id == categoryId) {
					console.log(this.conversations[i].id);
					return this.conversations[i].id;
				}
			}
			return false;
		},
		toggleProfileCard() {
			this.profileCard = !this.profileCard;
			if (!this.profileCard) {
				this.profileActive = null;
			}
		},
		toggleActiveProfile(item, type) {
			this.profileCard = true;
			this.profileActive = item;
			this.profileActive.profile_from_type = type;
		},
		ifHasCandidate() {
			let hasCandidate = this.teamData.team_members.find(item => item.user_type.toString() === 'Candidate');
			if (hasCandidate) {
				return true;
			}

			hasCandidate = this.teamData.team_invited_members.find(item => item.user_type.toString() === 'Candidate');
			if (hasCandidate) {
				return true;
			}
			return false;
		},
		async resetPin() {
			await ApiService.post('v1/reset-team-pin', { id: this.teamData.id }).then(res => {
				if (res.data.status_code == 200) {
					this.$message.success('Pin reset successfully');
				} else {
					this.$message.error('Something went wrong');
				}
			}).catch(err => {
				this.$message.error('Something went wrong');
			});
			this.showModalPreference = false;
		},
	},
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";

.member-info-table {
	border: 1px solid #d9d9d9;
	border-radius: 4px;
	padding: 4px 4px 0;
}

.table {
	border-collapse: separate;
	border-spacing: 2px;
	margin-top: -6px;
	margin-bottom: -5px;
}

.w-5p {
	width: 5%;
}

.table td,
.table th {
	padding: 0 !important;
	vertical-align: initial;
}

.member-add-box {
	margin-top: -14px;
}

.member-btn {
	padding: 0 4px !important;
}

.spacer {
	font-size: 8px;
	color: transparent;
}

// css for red button on top right
.red-hover {
	color: red !important;
}

.red-hover:hover {
	background-color: blue !important;
	color: #fff !important;
}

//css for custom invitation links
.input-custom-invitation-link {
	width: 30%;
	border-radius: 5px;
}

.bg-brand {
	background: #E51F76FF;
}

.w-20 {
	width: 20%;
}

.right-br-20 {
	border-top-right-radius: 20px;
	border-bottom-right-radius: 20px;
}

.minus-icon {
	width: 13px;
	height: 13px;
	border-radius: 50%;
	background: $bg-brand;
	color: $color-white;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 19px;
	margin-top: 3px;
}

.status-box {
	width: 15px;
	height: 15px;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 10px;
	margin-top: 2px;
	padding: 6px;
}

// start css for team-card
.team-card {
	position: relative;
	min-height: 650px;
	width: 100%;
	padding: 10px 8px;
	border-radius: 10px;
	background-color: #ffffff;
	margin-bottom: 20px;
	//box-shadow: 0px 0px 10px 1px rgba(63, 6, 17, 0.3);

	box-shadow: none !important;
	border: 2px solid #dddddd78;

	.team-card-header {
		background-color: #ffffff;
		display: flex;
		padding: 0;
		margin-bottom: 20px;
		align-items: center;
		justify-content: space-between;

		.left {
			.status {
				border: 2px solid #999999;
				padding: 2px 5px;
				border-radius: 20px;
				border: 2px solid #6b64ae;
				background-color: #ffffff;
				color: #6158a9;
				font-size: 12px;

				.red {
					width: 10px;
					height: 10px;
					border-radius: 50%;
					background-color: #e91e78;
					margin-left: 5px;
				}

				.green {
					width: 10px;
					height: 10px;
					border-radius: 50%;
					background-color: #39b54a;
					margin-left: 5px;
				}

				// &.active {
				// 	border: 2px solid #6b64ae;
				// 	background-color: #ffffff;
				// 	color: #6158a9;
				// }
			}
		}

		.middle {
			button {
				opacity: 1;
				padding-right: 5px;

				img {
					width: 25px;

					&:hover {
						transform: scale(1.3);
					}
				}

			}

			.logo {
				.img-logo {
					border-radius: 50%;
					width: 50px !important;
					height: 50px !important;
					margin-left: 5px;
					margin-top: 5px;
				}
			}
		}

		.right {
			display: flex;
			align-items: center;

			.ant-switch {
				background-color: #ea4c91;

				.ant-switch-loading-icon,
				&::after {
					top: 1px;
				}
			}

			.ant-switch-checked {
				background-color: #6159a8;
			}

			.dropleft {
				margin-left: 10px;

				.dropdown-toggle {
					padding: 0;

					&::before {
						border: 0;
						width: 12px;
						height: 20px;
						margin-top: 7px;
						background: url("@/assets/three-dots.png") no-repeat right center;
					}

					&:hover {
						transform: scale(1.2);
					}
				}

				.dropdown-menu {
					margin-top: 7px;
					padding: 10px 15px;
					box-shadow: 0 0 3px 2px #ddd;

					.dropdown-item {
						padding: 3px 0;
						margin-bottom: 2px;
						text-align: center;
						font-size: 12px;
						border-radius: 3px;
						color: #3a3092;
						background-color: #e6e6e6;

						&:hover {
							color: #ffffff;
							background-color: #e51f76;
						}
					}
				}
			}
		}
	}

	.card-info {
		display: flex;
		margin-bottom: 10px;

		.img {
			width: 60px;
			padding-right: 20px;
			box-sizing: content-box;

			button {
				border: 0;
				margin: 0;
				padding: 0;
				width: 60px;
				min-width: 12px;
				position: relative;
				background-color: transparent;

				span {
					position: absolute;
					bottom: 0px;
					right: -8px;
				}
			}
		}

		.img-logo {
			border-radius: 12px;
			width: 60px;
			height: 60px;
			margin-left: 5px;
			margin-top: -4px;
		}

		.info-content {

			.member-name,
			.member-desc {
				display: flex;
				padding-bottom: 5px;

				p {
					margin: 0;
					color: #444;
				}

				button {
					border: 0;
					background-color: transparent;
					padding: 0;
					min-width: 12px;
				}
			}

			.member-desc {
				p {
					font-size: 12px;
				}
			}
		}
	}

	.member-area {
		display: flex;
		flex-wrap: wrap;
		padding-bottom: 10px;

		.members {
			border: 2px solid #908bc2;
			width: 47%;
			border-radius: 5px;
			min-height: 30px;
			padding: 0 5px;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-bottom: 10px;

			&:first-of-type {
				border-top-left-radius: 15px;
				border-bottom-left-radius: 15px;
				margin-right: 15px;
			}

			&:last-of-type {
				border-top-right-radius: 15px;
				border-bottom-right-radius: 15px;
				margin-right: 0;
			}

			p {
				display: flex;
				margin: 0;
				font-size: 12px;
				align-items: center;

				span {
					width: 16px;
					height: 16px;
					color: #ffffff;
					border-radius: 50%;
					background-color: #e51f76;
					display: flex;
					align-items: center;
					justify-content: center;
					float: left;
					margin-right: 5px;
				}
			}
		}
	}

	.member-action {
		.add-remove {
			display: flex;
			justify-content: space-between;
			padding: 0 8px;
			margin-bottom: 10px;

			.add-member,
			.remove-member {
				display: flex;
				color: #6159a8;

				img {
					width: 20px;
					margin-right: 10px;
				}
			}

			.remove-member {
				color: #e51f76;
			}
		}

		.admin-member,
		.only-member {
			//padding: 4px;
			//border-radius: 15px;
			font-size: 12px;

			//color: #ffffff;
			td {
				background-color: #ffffff;
			}

			td:first-of-type {
				//padding-left: 5px;
				//border-top-left-radius: 12px;
				//border-bottom-left-radius: 12px;
			}

			td:last-of-type {
				//padding-right: 5px;
				//border-top-right-radius: 12px;
				//border-bottom-right-radius: 12px;
			}

			td {
				padding-top: 2px;
				padding-bottom: 2px;
			}

			.name-short,
			.name-full,
			.title,
			.status,
			.relation,
			.remove {
				//background-color: #3a3092;
				margin-right: 10px;
			}

			.name-short {
				//padding: 7px 5px;
				font-size: 10px;
				font-weight: bold;
				color: #ffffff;
				width: 28px;
				height: 25px;
				background: #3a3092;
				border-radius: 50%;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.name-short-single {
				//padding: 7px 9px;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.name-full {
				font-size: 14px;
			}

			.title {
				background-color: #ffffff;
				color: #777777;
				padding: 2px 5px;
				border-radius: 10px;
			}

			.status {
				width: 20px;
			}

			.remove {
				width: 15px;
				margin-right: 0;
			}
		}

		.only-member {
			background-color: #ffffff;
			color: #777777;

			td {
				background-color: #ffffff;
			}

			.name-short,
			.name-full,
			.title,
			.status,
			.relation,
			.remove {
				background-color: #ffffff;
			}

			.name-short {
				background-color: #3a3092;
				color: #ffffff;
			}

			.title {
				background-color: #808080;
				color: #ffffff;
			}

			.remove {
				padding: 0;
			}
		}

		.select-member {
			display: flex;
			margin-top: 15px;
			margin-bottom: 15px;
			justify-content: space-between;

			// background: url("~@/assets/select-arrow.png") no-repeat center center;
			.custom-select {
				font-size: 12px;
				width: auto;
				padding-left: 2px;
				padding-right: 12px;
				padding-top: 0;
				padding-bottom: 0;
				height: 24px;
				background: #e6e6e6 url("~@/assets/select-arrow.png") no-repeat;
				background-position: right 2px center;
			}

			button {
				padding: 0;

				img {
					width: 20px;
				}
			}
		}
	}

	.team-card-footer {
		position: absolute;
		bottom: 15px;
		margin-top: 20px;
		display: flex;
		justify-content: space-between;
		padding: 0 8px;

		.left {
			margin-bottom: 0px;

			p {
				margin: 0;
				font-size: 12px;
			}

			.d-subs-mb {
				a {
					span {
						font-size: 12px;
						color: #e51f76;
						text-decoration: underline;
					}
				}
			}
		}

		.right {
			margin-left: 10px;

			a {
				font-size: 12px;
				color: #e51f76;
				text-decoration: underline;

				img {
					width: 20px;
					margin-right: 5px;
				}
			}
		}
	}

	.team-invitations {
		// position: absolute;
		// text-align: center;
		// left: 20%;
		// right: 20%;
		// bottom: 15px;
		margin-top: 0px;
		text-align: right;

		.shared-link {
			cursor: pointer;
		}
	}
}

.add-member {
	display: flex;
	color: #6159a8;
	margin: 25px auto;

	img {
		width: 20px;
		margin-right: 10px;
	}
}

.member-name-td {
	width: 60%;

	@media (min-width: 992px) {
		width: 50%;
	}
}

.member-type {
	width: 25%;
	margin-left: 4px;
	margin-top: -6px;

	@media (min-width: 992px) {
		width: 15%;
	}
}

.check-tick {
	width: 10%;
	margin-left: 4px;
	margin-top: -6px;
}

.relation-p {
	width: 20%;
	margin-left: 4px;
}

.team-member-name {
	width: 100%;
	margin-top: 2px;
	padding-top: 2px;
	font-size: 14px;

	&:hover {
		color: $color-brand;
		text-decoration: underline;
		//border-bottom: 1px solid $border-brand;
	}
}

.disabled-team {
	opacity: 0.5;
	pointer-events: none;
}

.ellipse {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.subscription-img {
	width: 20px;
}

.d-subs-dk {
	display: none;

	@media (min-width: 992px) {
		display: flex;
	}
}

.d-subs-mb {
	display: block;

	@media (min-width: 992px) {
		display: none;
	}
}

.display-subs-text {
	display: block;
	font-size: 10px;

	@media (min-width: 1780px) {
		display: contents;
		font-size: 14px;
	}
}

.bright-20 {
	border-radius: 0 20px 20px 0;
}

.col-lg-6 {
	padding: 12px 8px !important;
}

.col-xl-3 {
	padding: 12px 8px !important;
}

.subscription-info {
	a {
		span {
			font-size: 12px;
			color: #e51f76;
			text-decoration: underline;
		}
	}
}

.btn-file {
	background: $bg-primary !important;
	color: white !important;
	cursor: pointer !important;
	border: 1px solid $bg-primary !important;
	height: 30px;
	line-height: 2;
	&:hover {
		background: #fff !important;
		color: $bg-primary !important;
	}
}

.break-long-words {
	width: 190px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

	@media (min-width: 360px) {
		width: 220px;
	}

	@media (min-width: 410px) {
		width: 270px;
	}

	@media (min-width: 1200px) {
		width: 130px;
	}

	@media (min-width: 1300px) {
		width: 150px;
	}

	@media (min-width: 1500px) {
		width: 200px;
	}

	@media (min-width: 1500px) {
		width: 230px;
	}

	@media (min-width: 1920px) {
		width: 290px;
	}
}

// end css for team-card
</style>
