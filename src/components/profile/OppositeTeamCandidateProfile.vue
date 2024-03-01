<template>
	<div id="wrap-div">
		<Loader  :isLoading="isLoading" />
		<v-container fluid>
			<v-row >
				<v-col cols="12">
					<ProfileBanner
						:name="candidateData.first_name + ' ' + candidateData.last_name"
						:image="
						candidateData.personal.per_avatar_url
							? candidateData.personal.per_avatar_url + `?token=${token}`
							: avatarSrc
						"
					/>
					<div class="flex justify-space-between flex-wrap mt-10">
						<div 
							class="d-flex align-items-center justify-content-center close-public-view mobile-margin mb-2 w-100"
							@click="goBackToProfileView"
							v-if="isOwnProfile"
						>
							<v-icon color="#E51F76" small>mdi-close</v-icon> <span style="text-decoration: underline;">Close Public View</span>
						</div>
						<div class="buttons-div flex justify-content-between align-items-center">
							<OutlinedButton
								class="mobile-margin buttons-lg"
								:name="copyProfileText"
								customEvent="onClickCopyText"
								@onClickCopyText="onClickCopyText"
							/>
							<OutlinedButton 
								class="mobile-margin buttons-lg"
								name="Team Info"
								customEvent="onClickTeamDetail"
								@onClickTeamDetail="onClickTeamDetail"
							/>

							<ButtonComponent
								class="mobile-margin"
								iconHeight="14px"
								:isSmall="true"
								title="Gallery"
								customEvent="openGallery"
								:responsive="false"
								:isBlock="true"
								:icon="require('@/assets/icon/gallery.svg')"
								@onClickButton="onClickButton"
							/>
							<ButtonComponent
								:class="{'mobile-margin' : true, 'block-button' : getConnectionTitleAndAction[4] == 'block-button', 'connect-button' : getConnectionTitleAndAction[4] == 'connect-button'}"
								:backgroundColor="getConnectionTitleAndAction[3]"
								iconHeight="14px"
								:isSmall="true"
								:title="connectionStatus != null && connectionStatus.length > 0 ? getConnectionTitleAndAction[0] : 'Connect'"
								:icon="getConnectionTitleAndAction[2]"
								:customEvent="connectionStatus != null && connectionStatus.length > 0 ? getConnectionTitleAndAction[1] : 'addConnection'"
								:responsive="false"
								@onClickButton="onClickButton"
							/>
							<ButtonComponent
								v-if="declineButton"
								class="mobile-margin block-button"
								backgroundColor="#d81b60"
								iconHeight="14px"
								:isSmall="true"
								title="Decline"
								icon="/assets/icon/disconnect.svg"
								:customEvent="connectionStatus != null && connectionStatus.length > 0 ? 'declineRequest' : 'addConnection'"
								:responsive="false"
								@onClickButton="onClickButton"
							/>
							<ButtonComponent
								class="mobile-margin"
								iconHeight="14px"
								:isSmall="true"
								:title="candidateData.status.is_short_listed ? 'Unlist' : 'ShortList'"
								icon="/assets/icon/star-fill-secondary.svg"
								:customEvent="candidateData.status.is_short_listed ? 'removeShortList' : 'addShortList'"
								:responsive="false"
								@onClickButton="onClickButton"
							/>
							<ButtonComponent
								class="mobile-margin"
								iconHeight="14px"
								:isSmall="true"
								:title="candidateData.status.is_teamListed ? 'Unlist Team' : 'TeamList'"
								icon="/assets/icon/teamlist.svg"
								:customEvent="candidateData.status.is_teamListed ? 'removeTeam' : 'addTeam'"
								:responsive="false"
								@onClickButton="onClickButton"
							/>
							<ButtonComponent
								class="mobile-margin block-button"
								:class="candidateData.status.is_block_listed ? 'unblock-button' : ''"
								iconHeight="14px"
								:isSmall="true"
								:responsive="false"
								:title="candidateData.status.is_block_listed ? 'Unblock' : 'Block'"
								:icon="candidateData.status.is_block_listed ? '/assets/icon/block-secondary.svg' : '/assets/icon/block.svg'"
								:customEvent="candidateData.status.is_block_listed ? 'removeBlock' : 'block'"
								:backgroundColor="candidateData.status.is_block_listed ? '' : '#d81b60'"
								:titleColor="candidateData.status.is_block_listed ? '' : 'white'"
								@onClickButton="onClickButton"
							/>
							<!-- <ButtonComponent
								iconHeight="14px"
								:isSmall="true"
								title="Close public view"
								icon="/assets/icon/close.svg"
								@onClickButton="goBackToProfileView"
								:responsive="false"
							/> -->
							<!-- <Scroller /> -->
							<OutlinedButton
								class="mobile-margin buttons-md"
								:name="copyProfileText"
								customEvent="onClickCopyText"
								@onClickCopyText="onClickCopyText"
							/>
							<OutlinedButton 
								class="mobile-margin buttons-md team-info-sm"
								name="Team Info"
								customEvent="onClickTeamDetail"
								@onClickTeamDetail="onClickTeamDetail"
							/>
							<div class="text-center custom-divider mb-2"><hr style="width: 250px;"></div>
							<div class="d-flex mobile-margin">
								<a
								  class="navigate w-100"
								  href="#family-information"
								>
								  <div class="navigate-name text-center">
									Family Info
									<img src="/assets/icon/navigate-bottom.svg" alt="">
								  </div>
								</a>
							</div>
		
							<div class="d-flex mobile-margin">
								<a
									class="navigate w-100"
									href="#my-partner-pref"
								>
									<div class="navigate-name text-center">
										My Pref
										<img src="/assets/icon/navigate-bottom.svg" alt="">
									</div>
								</a>
							</div>
						</div>
					</div>

					<div>
						<v-container fluid>
							<v-row dense>
								<v-col cols="12">
									<fieldset class="">
										<legend class="ml-8 px-1"><span>Personal Information</span></legend>
										<v-container fluid class="pt-0 px-5 info-div">
											<v-row dense>
												<v-col class="pt-1" cols="12">
													<PersonalInformationTable :data="candidateInfo"/>
												</v-col>
												<v-col ref="family-information" class="pt-1" cols="12">
													<MoreAbout 
														:data="candidateData"
													/>
												</v-col>
												<v-col class="pt-1" cols="12">
													<CardInfo
														title="More about me"
														:detail="candidateData.personal.per_about" class="mt-2"
													/>
												</v-col>
												<v-col class="pt-1" cols="12">
													<CardInfo
														:showDownloadBtn="true"
														title="Additional Information"
														class="mt-2"
														:detail="candidateData.more_about.per_additional_info_text"
                            							@onClickDownload="onClickDownload"
													/>
												</v-col>
												<v-col class="pt-1 mb-5" cols="12" md="6">
													<CardInfo
													title="I'm thankful for"
													class="mt-2"
													:detail="candidateData.personal.per_thankfull_for"
													/>
												</v-col>
												<v-col class="pt-1 mb-5" cols="12" md="6">
													<CardInfo
														title="How I improve myself?"
														class="mt-2"
														:detail="getHowIImprove()"
													/>
												</v-col>
											</v-row>
										</v-container>
									</fieldset>
									<fieldset style="width:100%" id="family-information" class="-mt-15">
									<legend class="ml-8 bg-white px-1"><span>Family Information</span></legend>
									<v-container fluid class="pt-0 px-5 info-div">
										<v-row dense>
											<v-col class="pt-1 mb-5" cols="12">
												<FamilyInfoTable :data="candidateData"/>
											</v-col>
											<v-col class="pt-1 mb-5" cols="12">
												<CardInfo :detail="candidateData.family.family_info"/>
											</v-col>
										</v-row>
									</v-container>
									</fieldset>
									<fieldset class="-mt-15">
										<legend id="my-partner-pref" class="ml-8 bg-white px-1"><span>My partner preference</span></legend>
										<v-container fluid class="pt-0 px-5 info-div">
											<v-row dense>
												<v-col class="pt-1" cols="12">
													<MyPrefTable
														:preference="candidateData.preference"
														:countries="candidateData.preference.preferred_countries"
													/>
												</v-col>
												<v-col class="pt-1" cols="12">
													<CardInfo
														title="What I'm Looking for"
														:detail="candidateData.preference.pre_description"
													/>
												</v-col>
												<v-col class="pt-1" cols="12">
													<CardInfo
														title="Other requirements"
														:detail="candidateData.preference.pre_other_preference"
													/>
												</v-col>
												<v-col class="pt-1 info-div" cols="12">
													<v-card class="px-3 py-5">
													<h5 class="text--disabled">More about preferred partner</h5>
													<p class="text--disabled">How Important following characters are to me</p>
													<!-- Character -->
													<!-- <rating-component
														title="Strength of character from a moral point of view"
														:value="
														candidateData.preference.pre_strength_of_character_rate
														"
														:valueString="
														candidateData.preference
															.pre_strength_of_character_rate_string
														"
													></rating-component> -->
													<!-- Looks and Apperance -->
													<rating-component
														title="Looks, appearance & attractiveness"
														:value="
														candidateData.preference.pre_look_and_appearance_rate
														"
														:valueString="
														candidateData.preference
															.pre_look_and_appearance_rate_string
														"
													></rating-component>
													<!-- Religiosity/Faith -->
													<rating-component
														title="Religiosity/ Faith"
														:value="
														candidateData.preference.pre_religiosity_or_faith_rate
														"
														:valueString="
														candidateData.preference
															.pre_religiosity_or_faith_rate_string
														"
													></rating-component>
													<rating-component
														title="Manners, Social skills and ethics"
														:value="
														candidateData.preference
															.pre_manners_socialskill_ethics_rate
														"
														:valueString="
														candidateData.preference
															.pre_manners_socialskill_ethics_rate_string
														"
													></rating-component>
													<!-- Emotional Maturity and compatibility -->
													<rating-component
														title="Emotional Maturity and general intelligence"
														:value="
														candidateData.preference.pre_emotional_maturity_rate
														"
														:valueString="
														candidateData.preference
															.pre_emotional_maturity_rate_string
														"
													></rating-component>
													<!-- Good Listener -->
													<rating-component
														title="Good Listener"
														:value="candidateData.preference.pre_good_listener_rate"
														:valueString="
														candidateData.preference.pre_good_listener_rate_string
														"
													></rating-component>
													<!-- Good talker -->
													<rating-component
														title="Good communicator"
														:value="candidateData.preference.pre_good_talker_rate"
														:valueString="
														candidateData.preference.pre_good_talker_rate_string
														"
													></rating-component>
													<!-- Willing to learn -->
													<rating-component
														title="Willing to learn"
														:value="candidateData.preference.pre_wiling_to_learn_rate"
														:valueString="
														candidateData.preference.pre_wiling_to_learn_rate_string
														"
													></rating-component>
													<!-- Family or Social Status-->
													<rating-component
														title="Family or Social Status"
														:value="
														candidateData.preference.pre_family_social_status_rate
														"
														:valueString="
														candidateData.preference
															.pre_family_social_status_rate_string
														"
													></rating-component>
													<!-- Employment or Wealth-->
													<rating-component
														title="Employment and financial stability"
														:value="
														candidateData.preference.pre_employment_wealth_rate
														"
														:valueString="
														candidateData.preference
															.pre_employment_wealth_rate_string
														"
													></rating-component>
													<!-- Education -->
													<rating-component
														title="Education and academic accomplishments"
														:value="candidateData.preference.pre_education_rate"
														:valueString="
														candidateData.preference.pre_education_rate_string
														"
													></rating-component>
													</v-card>
												</v-col>
											</v-row>
										</v-container>
									</fieldset>
								</v-col>
							</v-row>
						</v-container>
					</div>
					<!-- <div class="profile-footer">
						<Footer></Footer>
					</div> -->
					<!-- <ComingSoonModal
						title="Team details quick view"
						ref="advDiag"
					/> -->
					<a-modal 
						:visible="showTeamInfo" 
						:closable="true"
						title="Team Info" 
						@ok="showTeamInfo = false" 
						@cancel="showTeamInfo = false" 
						:ok-button-props="{ disabled: true }"
						:cancel-button-props="{ disabled: true }"
						v-if="profile.team"
					>
						<div class="row">
							<div class="col-12 col-md-6 d-flex justify-conent-center align-items-center">
								<v-img
									style="border: 2px solid white; background-size: cover;"
									class="white--text align-end rounded mx-auto"
									max-width="150px"
									max-height="150px"
									:src="profile.team.logo + `?token=${token}`"
								></v-img>
							</div>
							<div class="col-12 col-md-6">
								<span class="fw-600">Team Name</span> <br> {{ profile.team.team_name }} <br><br>
								<span class="fw-600">Team Members</span> <br> {{ profile.team.member }} <br><br>
								<span class="fw-600">Team Creation Date</span><br> {{ dateFromDateTime(profile.team.created_at) }} <br><br>
								<span class="fw-600">Team Created By</span><br> {{ profile.team.created_by.full_name }}
							</div>
						</div>

						<template slot="footer">
							<a-button key="submit" type="primary" shape="round" @click="showTeamInfo = false">
							Ok
							</a-button>
						</template>
            		</a-modal>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
import RatingComponent from "./RatingComponent.vue";
import improveMyselfThings from '@/common/improveMyselfThings'
import { dateFromDateTime } from "@/common/helpers.js";

// import Footer from "@/components/auth/Footer.vue";

import ProfileBanner from "@/components/atom/ProfileBanner";
import PersonalInformationTable from '@/components/search/personal-information/PersonalInformationTable.vue'
import FamilyInfoTable from '@/components/search/personal-information/FamilyInfoTable.vue'
import MyPrefTable from '@/components/search/personal-information/MyPrefTableProfile.vue'
import CardInfo from '@/components/atom/CardInfo'
import MoreAbout from '@/components/search/personal-information/MoreAbout.vue'
import Scroller from  '@/components/atom/Scroller'
import ButtonComponent from '@/components/atom/ButtonComponent'
import JwtService from "@/services/jwt.service";
import ApiService from '@/services/api.service';
import Notification from "@/common/notification.js";

import OutlinedButton from '@/components/atom/OutlinedButton'
import ComingSoonModal from "@/components/search/ComingSoonModal"
import {mapActions} from 'vuex'

export default {
	name: "CandidateProfile",
	props: ["candidateData", "userId", "role", 'teams', 'profile'],
	components: { 
		RatingComponent, 
		// Footer,
		ProfileBanner,
		PersonalInformationTable,
		FamilyInfoTable,
		MyPrefTable,
		CardInfo,
		MoreAbout,
		Scroller,
		ButtonComponent,
		OutlinedButton,
		ComingSoonModal
	},
	sockets: {
		connect: function () {
			console.log("socket connected");
		},
		ping: function (data) {
			console.log(
				'this method was fired by the socket server. eg: io.emit("customEmit", data)'
			);
		},
	},
	data() {
		return {
			copyProfileText: 'Copy Profile URL',
			avatarSrc: "https://www.w3schools.com/w3images/avatar2.png",
			isLoading: false,
			conversations: [],
			improveMyselfThings,
			candidateInfo: null,
			images: [],
			showTeamInfo: false,
			// declineButton: false,
			connectionStatus: null,
			token: "",
			loggedUser: null,
		};
	},
	created() {
		this.fetchCandidate();
		this.token = JSON.parse(localStorage.getItem('token'));
		// this.connectionStatus = this.candidateData.status.is_connect;
		this.fetchConnectionStatus();
		this.loggeduser = JSON.parse(localStorage.getItem('user'));
	},

	computed: {
		studyLevel() {
			if (this.candidateData.preference.pre_study_level_id) {
				var results =
					this.$store.state.candidateInfo.study_level_options.filter(
						(level) => {
							return (
								level.id == this.candidateData.preference.pre_study_level_id
							);
						}
					);
				return results[0].name;
			} else {
				return null;
			}
		},
		isOwnProfile() {
			let loggedInUserId = JSON.parse(localStorage.getItem('user')).id
			return this.candidateData.user_id === loggedInUserId

			
		},
		domain() {
			return window.location.origin;
		}, 
		getAllTeamMembers() {
			let allMembers = [];
			this.teams.forEach(team => {
				team.team_members.forEach(member => {
					allMembers.push(member.user_id);
				})
			})
			return allMembers
		},
		getConnectionTitleAndAction() {
			// returns title, action, icon, color, class
			console.log('getconnecijsdnfldjskl')
			if(this.connectionStatus == null || this.connectionStatus.length === 0) {
				return ['Connect', 'addConnection', '/assets/icon/connect-s.svg', '#3ab549', 'connect-button'];
			} else {
				let connection = this.connectionStatus[0];
				if(connection.connection_status === "1") {
					console.log(connection, 'connection from opposite team profile');
					return ['Disconnect', 'disconnectTeam', '/assets/icon/disconnect.svg', '#d81b60', 'block-button']
				} else if (connection.connection_status === "0") {
					console.log('inside connection status 0')
					if (connection.from_team_id == JwtService.getTeamIDAppWide()) {
						console.log('inside from team id')
						return ['Cancel', 'declineRequest', '/assets/icon/close.svg', '#d81b60', 'block-button']
					} else {
						// this.declineButton = true;
						return ['Accept', 'acceptRequest', '/assets/icon/check.svg', '#3ab549', 'connect-button']
					}
				} else {
					return ['Connect', 'addConnection', '/assets/icon/connect-s.svg', '#3ab549', 'connect-button'];
				}
			}
		},
		declineButton() {
			if(this.connectionStatus == null || this.connectionStatus.length === 0) {
				return false;
			} else {
				let connection = this.connectionStatus[0];
				if(connection.connection_status === "1") {
					return false;
				} else if (connection.connection_status === "0") {
					if (connection.from_team_id == JwtService.getTeamIDAppWide()) {
						return false;
					} else {
						return true;
					}
				} else {
					return false;
				}
			}
		},
	},
	methods: {
		dateFromDateTime,
		...mapActions({
            connectToCandidate: 'search/connectCandidate',
            blockACandidate: 'search/blockCandidate',
            shortListCandidate: 'search/shortListCandidate',
            teamListCandidate: 'search/teamListCandidate',
        }),
		socketNotification(payload) {
			let loggedUser = JSON.parse(localStorage.getItem('user'));
			payload.sender = loggedUser.id;
			Notification.storeNotification(payload);
			payload.created_at = new Date();
			payload.seen = 0;
			payload.sender = loggedUser;
			if(payload && payload.receivers.length > 0) {
				payload.receivers = payload.receivers.map(item => {
				return item.toString();
				});
				this.$socket.emit('notification', payload);
			}
		},
		prepareNotifyData() {
			const teamId = JwtService.getTeamIDAppWide();
			let connection = this.connectionStatus[0];
			let teamMembers = [...connection.from_team_members, ...connection.to_team_members];
			let loggedUser = JSON.parse(localStorage.getItem('user'));
			teamMembers = teamMembers.filter(item => item !== loggedUser.id);
			let my_team = connection.from_team_id == teamId ? connection.to_team_name : connection.from_team_name;
			let my_team_id = connection.from_team_id == teamId ? connection.to_team_table_id : connection.from_team_table_id;
			let notifyObj = {
				receivers: teamMembers,
				team_id: my_team_id,
				team_temp_name: my_team
			};
			return notifyObj;
		},
		onClickDownload() {
            if(this.candidateData.more_about?.per_additional_info_doc == null) {
                this.$error({
                title: 'Link not available!',
                center: true,
                });
            }

            if(this.candidateData.more_about?.per_additional_info_doc) {
                window.open(this.candidateData.more_about?.per_additional_info_doc, '_blank')
            }
        },
		onClickTeamDetail() {
            // this.$refs.advDiag.openDiag()
			if(this.profile.team !== "") {
				this.showTeamInfo = true;
			} else {
				this.$error({
					title: 'This Candidate has no team!',
					center: true,
                });
			}
        },
		 onClickCopyText() {
            this.copyProfileText = 'Copy successful'
            navigator.clipboard.writeText(this.domain+'/user/profile/'+this.candidateData.user_id);
            this.copied = true;
            setTimeout(() => {
                this.copyProfileText = 'Copy Profile URL';
            }, 3000);
        },
		getHowIImprove() {
			let text = [];
			let items = [];
			if(this.candidateData.more_about?.per_improve_myself?.length) {
				this.candidateData.more_about.per_improve_myself.map(i => {
				items.push(this.improveMyselfThings.find(im => im.value === i))
				})
			}
			if(items && items.length) {
				items.map(i => {
				text.push(i.label)
				})
			}
			return text.join(' \n ');
		},
		startConversation() {},
		returnCategoryId(type, id1, id2) {
			var category_id = "";
			if (id1 > id2) {
				category_id = type + "_" + id2.toString() + "_" + id1.toString();
			} else {
				category_id = type + "_" + id1.toString() + "_" + id2.toString();
			}
			return category_id;
		},
		returnChatTitle(id1, id2, name1, name2) {
			var title = "";
			if (id1 > id2) {
				title = name1 + " & " + name2;
			} else {
				title = name1 + " & " + name2;
			}
			return title;
		},
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

		
        onClickButton(eventData) {
			console.log(eventData)
            if(eventData.event == 'openGallery') {
				this.openGallery();
				return;
			}
			// let userInfo = JSON.parse(localStorage.getItem("userInfo"))

			let userInfo = JSON.parse(localStorage.getItem("user"))
			if(userInfo.status != 3) {
				this.showError('Your account is not verified')
				return;
			}
			if(this.getAllTeamMembers.includes(this.candidateData.user_id)) {
				this.showError('You cannot do that to your team member.')
				return;
			}
            if(eventData.event == 'addConnection') {
				if(this.isOwnProfile) {
					this.showError('You cannot connect to yourself');
					return;
				} else {	
					this.connectCandidate();
				}
            }
			if(eventData.event == 'acceptRequest') {
				this.acceptRequest();
			}
			if(eventData.event == 'disconnectTeam') {
				this.disconnectTeam();
			}
			if(eventData.event == 'declineRequest') {
				console.log('decline request')
				this.declineRequest();
			}
            if(eventData.event == 'block') {
				if(this.isOwnProfile) {
					this.showError('You cannot block yourself');
					return;
				} else {	
					this.handleBlockCandidate('post', true, 'v1/store-block-list');
				}
            }
            if(eventData.event == 'removeBlock') {
                this.handleBlockCandidate('delete', false, 'v1/unblock-by-candidate');
            }
            if(eventData.event == 'addShortList') {
				if(this.isOwnProfile) {
					this.showError('You cannot shortlist yourself');
					return;
				} else {	
					this.addShortList();
				}
            }
            if(eventData.event == 'removeShortList') {
				console.log('......s.....')
                this.removeFroShortList();
            }
            if(eventData.event == 'addTeam') {
				if(this.isOwnProfile) {
					this.showError('You cannot add your team');
					return;
				} else {	
					this.addTeamList();
				}
            }
            if(eventData.event == 'removeTeam') {
                this.removeFromTeamList();
            }
        },

        async connectCandidate() {
            let myTeamId = JwtService.getTeamIDAppWide();
            console.log(myTeamId, '>>>>>>>')
            if(!myTeamId) {
                this.showError("You don't have a team")
                return;
            }
            if(!this.profile.team_id) {
                this.showError("This candidate has no team")
                return;
            }
            let data = {
                userId: this.profile.user_id,
                url: 'v1/send-connection-request',
                payload: {
                    from_team_id: myTeamId,
                    to_team_id: this.profile.team_id
                }
            }
            try {
				this.isLoading = true;
            	let res = await this.connectToCandidate(data);
				await this.fetchConnectionStatus();
				let notifyObj = this.prepareNotifyData();
				notifyObj.title = `sent you a connection request`;
				this.socketNotification(notifyObj);

                this.$success({
					title: "Connection Request Sent Successfully!",
					content: res.message,
					centered: true,
				});

				this.isLoading = false;
            } catch (error) {
				console.log(error);
				await this.fetchConnectionStatus();
				this.isLoading = false;
				this.$error({
					title: 'You do not have permission',
					content: 'You are not an admin. ' + error.response.data.message,
					center: true,
				});
            }
            
        },

		async acceptRequest() {
			let connection = this.connectionStatus[0];
            let data = {
                request_id: connection.connection_id,
				connection_status: '1'
            };

            this.isLoading = true;

			try {
				const response = await this.$store.dispatch("respondToRequest", data);

				await this.fetchConnectionStatus();
				let notifyObj = this.prepareNotifyData();
				notifyObj.title = `accepted your connection request`;
				this.socketNotification(notifyObj);

				this.isLoading = false;
				this.profile.is_connect = null;
				this.$success({
					title: "Success",
					content: response.message,
				});
			} catch (error) {
				console.log(error);
				await this.fetchConnectionStatus();
				this.isLoading = false;
				this.$error({
					title: 'You do not have permission',
					content: 'You are not an admin. ' + error.response.data.message,
					center: true,
				});
            };
        },

		async disconnectTeam() {
			const payload = {
				connection_id: this.connectionStatus[0].connection_id,
			};
			console.log(payload);
			//return;
			this.isLoading = true;
			try {
				const response = await this.$store.dispatch("disconnectTeam", payload);
				let notifyObj = this.prepareNotifyData();
				notifyObj.title = `disconnected you from connection`;
				this.socketNotification(notifyObj);
				await this.fetchConnectionStatus();
				this.isLoading = false;
				this.$success({
					title: "Success",
					content: response.message,
				});
				//this.$message.success("Team Disconnected successfully!");
			} catch(error) {
				console.log(error);
				await this.fetchConnectionStatus();
				this.isLoading = false;
				this.$error({
					title: 'You do not have permission',
					content: 'You are not an admin. ' + error.response.data.message,
					center: true,
				});
			};
		},

		async declineRequest() {
			let connection = this.connectionStatus[0];
            let data = {
                request_id: connection.connection_id,
            };
            if(connection.from_team_id == JwtService.getTeamIDAppWide()) {
                data.connection_status = '10';
            } else {
                data.connection_status = '2';
            }

			try {
				this.isLoading = true;
				const response = await this.$store.dispatch("respondToRequest", data);
				// this.declineButton = false;
				if (data.connection_status == '2') {
					let notifyObj = this.prepareNotifyData();
					notifyObj.title = `declined your connection request`;
					this.socketNotification(notifyObj);
				}
				await this.fetchConnectionStatus();
				this.isLoading = false;
				this.profile.is_connect = null;
				this.$success({
					title: "Success",
					content: response.message,
				});
			} catch(error)  {
				console.log(error);
				await this.fetchConnectionStatus();
				this.isLoading = false;
				this.$error({
					title: 'You do not have permission',
					content: 'You are not an admin. ' + error.response.data.message,
					center: true,
				});
			};
        },

        async addShortList() {
            let data = {
            url: `v1/short-listed-candidates/store?shortlisted_by=${this.loggeduser.id}&user_id=${this.candidateData.user_id}`,
                value: true,
                actionType: 'post',
                user_id: this.candidateData.user_id,
                params: {
                    shortlisted_by: this.loggeduser.id,
                    user_id: this.candidateData.user_id
                },
                payload: {
                    shortlisted_by: this.loggeduser.id,
                    user_id: this.candidateData.user_id
                }
            }
            try {
                let res = await this.shortListCandidate(data)
				if(res.status == "SUCCESS") {
					this.$emit('onFetchUserInfo')
					// location.reload()
				}
            } catch (e) {
                if(e.response) {
                    this.showError(e.response.data.message)
                }
            }
            
        },

        async removeFroShortList() {
            let data = {
                url: 'v1/delete-short-listed-by-candidates ',
                value: false,
                actionType: 'delete',
                user_id: this.candidateData.user_id,
                payload: {
                    user_id: this.candidateData.user_id
                }
            }
            try {
                let res = await this.shortListCandidate(data)
				if(res.status == "SUCCESS") {
					this.$emit('onFetchUserInfo')
					// location.reload()
				}
            } catch (e) {
                if(e.response) {
                    this.showError(e.response.data.message)
                }
            }
        },
        async addTeamList() {
            let data = {
                url: `v1/team-short-listed-candidates/store`,
                value: true,
                actionType: 'post',
                user_id: this.candidateData.user_id,
                payload: {
                    team_listed_by: JwtService.getUserId(),
                    user_id: this.candidateData.user_id
                }
            }
            try {
                let res = await this.teamListCandidate(data)
                if(res.status_code == 422) {
                    this.showError('Something went wrong!')
                }
				if(res.status == "SUCCESS") {
					this.$emit('onFetchUserInfo')
				}
            } catch (e) {
                if(e.response) {
                    this.showError(e.response.data.message)
                }
            }
            
        },
        async removeFromTeamList() {
			if(this.role != 'Admin' && this.role != 'Owner & Admin') {
                this.showError("You don't have permission.")
                return
            }
            let data = {
                url: 'v1/delete-team-short-listed-by-candidates ',
                value: false,
                actionType: 'delete',
                user_id: this.candidateData.user_id,
                payload: {
                    user_id: this.candidateData.user_id
                }
            }
            try {
                let res = await this.teamListCandidate(data)
				if(res.status == "SUCCESS") {
					this.$emit('onFetchUserInfo')
				}
            } catch (e) {
                if(e.response) {
                    this.showError(e.response.data.message)
                }
            }
            
        },

        async fetchCandidate() {
            // let url = `v1/candidate/info/${this.profile.user_id}`
            // try {
            //     await this.fetchProfileDetail(url)
            // } catch (e) {
            //     if(e.response) {
            //         this.showError(e.response.data.message)
            //     }
            // }
			try {
				this.isLoading = true;
				const response = await ApiService.get(`v1/candidate/info/${this.candidateData.user_id}`);
				if (response.status === 200) {
				this.isLoading = false;
				this.candidateInfo = {
					...response.data.data,
					preference: {
					...response.data.data.preference,
					pre_occupation: JSON.parse(
						response.data.data.preference.pre_occupation
					),
					},
				};
				}
			} catch (error) {
				this.isLoading = false;
				console.log(error);
				//alert(this.error);
			}
        },
		async fetchConnectionStatus() {
			const teamId = JwtService.getTeamIDAppWide();
			this.isLoading = true;
			try {
				if(teamId == this.profile.team_id) {
					this.isLoading = false;
					return;
				}
				const response = await this.$store.dispatch("loadConnectionReports", teamId);
				this.connectionStatus = response.data.data.result.filter((item) => {
					return item.to_team_id == this.profile.team_id || item.from_team_id == this.profile.team_id;
				});
				console.log(this.connectionStatus, 'connection repors')
				this.isLoading = false;

			} catch (error) {
				console.log(error.message);
				this.isLoading = false;
			}
		},
        async handleBlockCandidate(actionType, value, url) {
			 if(this.role != 'Admin' && this.role != 'Owner & Admin') {
                this.showError("You don't have permission.")
                return
            }
			const vm = this;
			this.$confirm({
				title: "Are you sure?",
				content: actionType == 'post' ? "Do you want to block this candidate?" : "Do you want to unblock this candidate?",
				okText: "Yes",
				okType: "danger",
				cancelText: "No",
				async onOk() {
				
					let data = {
						url: url,
						actionType: actionType,
						value: value,
						payload: {
							//block_by: JwtService.getUserId(),
							user_id: vm.candidateData.user_id
						}
					}
					try {
						let res = await vm.blockACandidate(data);
						if(res.status == "SUCCESS") {
							if(vm.connectionStatus && vm.connectionStatus.length > 0 && data.actionType == 'post') {
								await vm.disconnectTeam();
							}
							vm.$emit('onFetchUserInfo')
						}
					} catch (e) {
						if(e.response) {
							vm.showError(e.response.data.message)
						}
					}  
				},
				onCancel() {
					console.log("Cancel");
				},
			});
        },
        showError(message) {
            this.$error({
            title: message,
            center: true,
            });
        },
        loadSearchResultComponent() {
            this.setComponent('')
            this.$emit('switchComponent', 'CandidateProfiles')
        },
        openGallery() {
			this.images = [this.candidateData.personal.per_avatar_url];
			if (this.candidateData.personal.per_main_image_url !== "") {
				this.images.push(this.candidateData.personal.per_main_image_url);
			}
			if (this.candidateInfo.other_images.length) {
				this.images.push(this.candidateInfo.other_images);
			}

			this.images.forEach((image, index) => {
					this.images[index] += `?token=${this.token}`
			})
			console.log(this.images, 'images')

            if(this.images && this.images.length > 0) {
                this.show();
            } else {
                this.$error({
                title: 'No image found',
                center: true,
                });
            }
        },
        show() {
            this.$viewerApi({
                images: this.images,
            })
        },
		goBackToProfileView() {
			this.$router.push('/profile')
		}
	},
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
#wrap-div {
	.container--fluid {
		max-width: 100% !important;
	}
}

.close-public-view {
	font-size: .75rem;
	text-align: center;
	color: #E51F76; 
	font-family: 'Poppins', sans-serif; 
	max-width: auto !important; 
	padding: 5px; 
	letter-spacing: .0892857143em; 
	cursor: pointer;
}

.buttons-div::v-deep {
	@media (max-width: 600px) {
		flex-direction: column;

		.mobile-margin {
			margin-bottom: 12px !important;
			min-width: 250px !important;
			width: 100% !important;
		}

		.team-info-sm {
			margin-bottom: 0px !important;
		}
	}

	@media (min-width: 601px) {
		flex-direction: row !important;
		flex-wrap: wrap !important;
		align-items: center !important;
		.mobile-margin {
			margin-bottom: 12px !important;
		}
	}
	.mobile-margin {
		min-width: 120px;
		width: 10% !important;
	}
	.block-button {
		.v-custom:hover {
			background: #fff !important;
			color: #d81b60 !important;
			border: 1px solid #d81b60 !important;

			img {
				filter: none !important;
			}
		}
	}
	.unblock-button {
		.v-custom:hover {
			background: #fff !important;
			color: $bg-primary !important;
			border : 1px solid $bg-primary !important;
			
			img {
				filter: none !important;
			}
		}
	}
	.connect-button {
		.v-custom:hover {
			background: #fff !important;
			color: $bg-success !important;
			border: 1px solid $bg-success !important;

			img {
				filter: none !important;
			}
		}
	}
	.custom-divider {
		margin: 3px 0px !important;
		
		@media (min-width: 600px) {
		  display: none;
		}

		hr {
			border-top: 1px solid rgb(0, 0, 0, 0.3);
		}
	}
	.navigate {
		background: #6158a7;
		color: #fff;
		border-radius: 20px;
		font-size: 12px;
		min-height: 35px;
		padding: 7px 5px;
		border: 1px solid white;
		box-shadow: 0px 1px 3px #B1aaaa;
		transition: none !important;

		.navigate-name {
			color: inherit;
			transition: none !important;
			&:hover {
				color: inherit;
			}
		}

		img {
			//margin-bottom: 1px;
			height: 13px;
		}
		&:hover {
			background: #fff;
			border: 1px solid #6158a7 !important;
			color: #6158a7 !important;
		}
	}
	.navigate + .navigate {
		margin: 0px;
	}

	@media(min-width: 1400px) {
		.buttons-md {
		  display: none !important;
		}
	}
	@media(max-width: 1400px) {
		.buttons-lg {
		  display: none !important;
		}
	}
}

.opposite-candidate-profile {
	margin: 25px;
	// width: 1000px;
	widows: 100%;
	margin-left: 10px;
	margin-left: 70px;
	.profile-heading {
		margin-left: 10px;
		margin-bottom: 20px;
		.cover-img {
			width: 100%;
			height: 300px;
			position: relative;
			border: 1px solid white;
			box-shadow: 2px 5px 5px #aaa;
			border-radius: 5px;
			top: 0;
			left: 0;
		}
		.avatar-img {
			width: 150px;
			height: 150px;
			border: 1px solid white;
			box-shadow: 2px 5px 5px #aaa;
			position: absolute;
			top: 192px;
			left: 368px;
			border-radius: 5px;
			margin-left: 110px;
		}
		.team-name-div {
			border: 1px solid $color-primary;
			border-radius: 20px;
			.team-name-title {
				background-color: $color-primary;
				color: white;
				border-top-left-radius: 20px;
				border-bottom-left-radius: 20px;
				padding: 0 15px;
			}
		}
		@media (max-width: 1024px) {
			max-width: calc(100% - 15px);
			border-radius: 10px;
		}
		@media (max-width: 767px) {
			max-width: none;
			padding-right: 15px;
			padding-left: 15px;
			border-top-right-radius: 15px;
		}
	}
	@media (min-width: 1024px){
		margin: 0 auto;
	}
	.h-100{
		height: 100%;
	}
	.h-67{
		height: 66%;
		margin-bottom: 2%;
		@media (max-width: 1024px){
			height: 80%;
		}
		@media (max-width: 767px){
			height: 80%;
		}
	}
	.h-33{
		height: 32%;
		margin-top: 1%;
		@media (max-width: 1024px){
			height: 20%;
			margin-bottom: 2%;
		}
		@media (max-width: 767px){
			// margin-top: auto;
			height: 20%;
			// margin-bottom: 16px;
		}
	}

	.review {
		margin-left: 10px;
		font-size: 14px;
		h4 {
			font-size: 16px;
			opacity: 0.8;
		}
		p {
			font-size: 14px;
		}
		.review-edit {
			position: relative;
			padding: 15px;
			border: 1px solid $border-secondary;
			border-radius: 5px;
			.review-edit-label {
				position: absolute;
				color: $color-secondary;
				left: 50px;
				top: -12px;
				background: $bg-white;
				cursor: pointer;
			}
		}
		ul {
			.label-text {
				opacity: 0.8;
			}
		}
		.profile-img {
			border-radius: 5px;
			overflow: hidden;
		}
	}
}
.btn-block-pink {
    color: $color-white;
    background: #E51F76;
    border: 1px solid $border-white;
    box-shadow: 2px 2px 2px #999;
    border-radius: 20px;
    &:hover,
    &:not(:disabled):not(.disabled):active {
    background: #E51F76;
    border: 1px solid $border-primary;
    opacity: 0.9;
    outline: 0;
    }
    &:disabled,
    &.disabled {
    color: $color-white;
    background: #E51F76;
    border: 1px solid $border-primary;
    opacity: 0.6;
    }
    img {
    margin-right: 3px;
    }
}
.badge-info {
	background: $bg-white !important;
	color: black;
	position: relative;
	padding: 8px;
	border-radius: 5px;
	border: 1px solid $border-gray;
	margin-bottom: 15px;
	text-align: center;
	.badge-info-label {
		position: absolute;
		top: -12px;
		opacity: 0.7;
		left: 0;
		right: 0;
		.inner {
			background: $bg-white;
		}
	}
}
.profile-footer{
	width: 100%;
	@media (max-width: 767px){
		display: none;
	}
}

fieldset {
    border: 1px solid #d3d0e4;
    border-radius: 10px;
}
legend {
    display: inline;
    width: inherit;
    color: #6259a8;
    font-size: 18px;
    font-weight: 600;
}
.-mt-15 {
    margin-top: -13px;
}
.bg-white {
    background: white;
}

.info-div::v-deep {
	.v-list-item__subtitle {
		font-family: "Roboto", sans-serif !important;
		line-height: 1.7 !important;
		letter-spacing: 0.009375em;
		font-size: 1rem !important;
		font-weight: 400 !important;
		color: rgba(0,0,0,.38) !important;
	}
	.v-list-item__title {
		font-family: "Roboto", sans-serif !important;
		line-height: 1.7 !important;
		letter-spacing: 0.009375em;
		font-size: 1rem !important;
		font-weight: 400 !important;
		color: rgba(0,0,0,.6) !important;
	}
}
.v-sheet.v-card:not(.v-sheet--outlined)::v-deep {
	box-shadow: none !important;
	border: 2px solid #dddddd78;
}	
</style>