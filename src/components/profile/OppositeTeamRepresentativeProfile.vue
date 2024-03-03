<template>
	<div>

		<div v-if="false" class="rep-profile"  style="margin-top: 15px;">
			<div class="profile-heading">
				<!-- Avatar and cover images -->
				<div class="text-center">
					<img
						src="@/assets/Icons/profile cover.jpg"
						alt=""
						class="cover-img"
					/>
					<img :src="avatarSrc" alt="" class="avatar-img" />
	
					<h3 class="name">
						{{ representativeData.first_name }}
						{{ representativeData.last_name }}
					</h3>
				</div>
				<!-- Buttons -->
				<div class="row mt-3 mb-3 text-center">
					<div class="col">
							<button disabled class="btn btn-primary px-4">Gallery</button>
					</div>
					<div class="col">
						<a href="#" class="btn btn-primary px-4">
							<img src="@/assets/icon/star.svg" alt="" style="margin-bottom: 3px"> 
							Shortlist
						</a>
					</div>
					<div class="col">
						<button class="btn btn-primary px-4">
							<img src="@/assets/icon/teamlist.svg" alt="" width="20" height="20">
							Teamlist
						</button>
					</div>
					<div class="col">
						<button class="btn btn-primary px-4">
							<img src="@/assets/icon/connect.svg" alt="" height="18" width="20">
							Connect
						</button>
					</div>
					<div class="col">
						<button class="btn btn-block-pink px-4">
							<img src="@/assets/icon/block.svg" alt="" width="20" height="17">
							Block
						</button>
					</div>
				</div>
				<!-- Team name and profile link -->
				<div class="row mt-3 mb-3">
					<div class="col">
						<div class="team-name-div">
							<span class="team-name-title">Representated by</span>
							<span class="team-name ml-3">Team name</span>
						</div>
					</div>
					<div class="col">
						<div class="team-name-div">
							<span class="team-name-title">Profile Link</span>
							<span class="team-name ml-1"
								>54.254.41.18/user/profile/{{ representativeData.user_id }}</span
							>
						</div>
					</div>
				</div>
			</div>
			<!-- Representative Info -->
			<fieldset class="review">
				<div class="text-start">
					<div class="review-edit">
						<div class="review-edit-label">
							Essential Information
							<img
								class="ms-2"
								src="@/assets/icon/pencil-square.svg"
								alt="icon"
							/>
						</div>
						<div class="row">
							<div class="col">
								<div class="card-custom h-100">
									<ul>
										<!-- Full Name -->
										<li class="flex-between-start">
											<span class="flex-30 px-2 label-text">Full Name</span
											><span class="flex-70 px-2"
												>:<span class="ml-3">
													{{ representativeData.first_name }}
													{{ representativeData.last_name }}
												</span>
											</span>
										</li>
										<!-- Screen Name -->
										<li class="flex-between-start">
											<span class="flex-30 px-2 label-text">Screen Name</span
											><span class="flex-70 px-2"
												>:<span class="ml-3">
													{{ representativeData.screen_name }}
												</span>
											</span>
										</li>
										<!-- Gender -->
										<li class="flex-between-start">
											<span class="flex-30 px-2 label-text">Gender</span
											><span class="flex-70 px-2 d-inherit"
												>:<span
													class="ml-3"
													v-if="representativeData.per_gender == 1"
												>
													Male
												</span>
												<span
													class="ml-3"
													v-if="representativeData.per_gender == 2"
												>
													Female
												</span>
											</span>
										</li>
										<!-- DOB -->
										<li class="flex-between-start">
											<span class="flex-30 px-2 label-text">Date of Birth</span
											><span class="flex-70 px-2"
												>:<span class="ml-3">
													{{ representativeData.dob }}
												</span>
											</span>
										</li>
										<!-- Occupation -->
										<li class="flex-between-start">
											<span class="flex-30 px-2 label-text">Occupation</span
											><span class="flex-70 px-2"
												>:<span class="ml-3">
													{{ representativeData.per_occupation }}
												</span>
											</span>
										</li>
										<!-- Current Residence -->
										<li class="flex-between-start">
											<span class="flex-30 px-2 label-text"
												>Current Residence</span
											><span class="flex-70 px-2"
												>:<span class="ml-3">
													{{ representativeData.per_current_residence_city }},
													{{ representativeData.per_current_residence_country }}
												</span>
											</span>
										</li>
										<!-- Permanent Residence -->
										<li class="flex-between-start">
											<span class="flex-30 px-2 label-text"
												>Permanent Residence</span
											><span class="flex-70 px-2"
												>:<span class="ml-3">
													{{ representativeData.per_permanent_city }},
													{{ representativeData.per_permanent_country }}
												</span>
											</span>
										</li>
										<!-- Permanent Residence -->
										<li class="flex-between-start">
											<span class="flex-30 px-2 label-text">Address</span
											><span class="flex-70 px-2"
												>:<span class="ml-3">
													{{ representativeData.per_permanent_address }}
												</span>
											</span>
										</li>
										<!-- Mobile Number -->
										<li class="flex-between-start">
											<span class="flex-30 px-2 label-text">Mobile Numbeer</span
											><span class="flex-70 px-2"
												>:<span class="ml-3">
													{{ representativeData.mobile_country_code
													}}{{ representativeData.mobile_number }}
												</span>
											</span>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</fieldset>
		</div>
	
		<Loader v-if="isLoading" :isLoading="isLoading" />
		<div v-else class="rep-profile">
			<div class="profile-heading" >
				<ProfileBanner
					class="px-2 mt-2"
					:image="representativeData.per_avatar_url ? representativeData.per_avatar_url  + `?token=${token}`: ''"
					:name="representativeData.first_name + ' ' + representativeData.last_name"
				/>
				<v-container fluid>
					<v-row>
					  <v-col cols="12">
						<div class="flex justify-center">
							<ButtonComponent
								v-if="isOwnProfile"
								class="mr-2"
								iconHeight="14px"
								:isSmall="true"
								title="EditProfile"
								icon="/assets/icon/edit_step.svg"
								customEvent="editProfile"
								:isBlock="false"
								@onClickButton="onClickButton"
							/>
							<ButtonComponent
								iconHeight="14px"
								:isSmall="true"
								title="Gallery"
								:icon="require('@/assets/icon/gallery.svg')"
								customEvent="openGallery"
								:isBlock="true"
								:responsive="false"
								@onClickButton="onClickButton"
							/>
						</div>
					  </v-col>
					</v-row>
				</v-container>
				<!-- Avatar and cover images -->
				<!-- <div class="text-center">
					<img
						src="@/assets/Icons/profile cover.jpg"
						alt=""
						class="cover-img"
					/>
					<img :src="avatarSrc" alt="" class="avatar-img" />
	
					<h3 style="margin-top: 60px">
						{{ representativeData.first_name }}
						{{ representativeData.last_name }}
					</h3>
				</div> -->
				<!-- Buttons -->
				<div class="row mt-3 mb-3 text-center">
					<!-- <div class="col">
						<button disabled class="btn btn-primary px-4">Gallery</button>
					</div> -->
					<!-- <div class="col">
						<router-link to="/edit_representative" class="btn btn-primary px-4">
							<img src="@/assets/icon/pencil-square.svg" />Edit Profile
						</router-link>
					</div> -->
					<!-- <div class="col">
						<button class="btn btn-primary px-4" @click="startConversation">
							<img src="@/assets/icon/chat-dots-fill-white.svg" alt="">
							Message
						</button>
					</div> -->
				</div>
				<!-- Team name and profile link -->
				<!-- <div class="row mt-3 mb-3">
					<div class="col">
						<div class="team-name-div">
							<span class="team-name-title">Representated by</span>
							<span class="team-name ml-3">Team name</span>
						</div>
					</div>
					<div class="col">
						<div class="team-name-div">
							<span class="team-name-title">Profile Link</span>
							<span class="team-name ml-1"
								>54.254.41.18/user/profile/{{ representativeData.user_id }}</span
							>
						</div>
					</div>
				</div> -->
			</div>
			<!-- Representative Info -->
			<v-container fluid>
				<v-row>
					<v-col cols="12">
						<fieldset class="">
							<legend class="ml-8 px-1"><span>Personal Information</span></legend>
							<v-container fluid class="pt-0 px-5">
								<v-row dense>
									<v-col class="pt-1" cols="12">
										<v-card class="p-3" style="height: 100%">
											<table>
												<TableRow 
													title="Full Name"
													textClass="text-subtitle-1"
													:value="representativeData.first_name + ' ' + representativeData.last_name"
												/>
												<TableRow 
													title="Screen Name"
													textClass="text-subtitle-1"
													:value="representativeData.screen_name"
												/>
												<TableRow 
													title="Gender"
													textClass="text-subtitle-1"
													:value="representativeData.per_gender == 1 ? 'Male' : 'Female'"
												/>
												<TableRow 
													title="Age"
													textClass="text-subtitle-1"
													:value="getAge(representativeData.dob) + ' Years'"
												/>
												<TableRow 
													title="Occupation"
													textClass="text-subtitle-1"
													:value="representativeData.per_occupation ? representativeData.per_occupation : 'Not provide'"
												/>
												<TableRow 
													title="City"
													textClass="text-subtitle-1"
													:value="representativeData.per_permanent_city"
												/>
												<TableRow 
													title="Current Residence"
													textClass="text-subtitle-1"
													:value="representativeData.per_permanent_country"
												/>
											</table>
										</v-card>
									</v-col>
								</v-row>
							</v-container>
						</fieldset>
					</v-col>
				</v-row>
			</v-container>
		</div>
	</div>
</template>

<script>
// export default {
// 	name: "RepresentativeProfile",
// 	props: ["representativeData"],
// 	data() {
// 		return {
// 			avatarSrc: "https://www.w3schools.com/w3images/avatar2.png",
// 			conversations: [],
// 		};
// 	},
// 	created() {

// 	},
// 	methods: {
// 		startConversation() {},
// 		returnCategoryId(type, id1, id2) {
// 			var category_id = "";
// 			if (id1 > id2) {
// 				category_id = type + "_" + id2.toString() + "_" + id1.toString();
// 			} else {
// 				category_id = type + "_" + id1.toString() + "_" + id2.toString();
// 			}
// 			return category_id;
// 		},
// 		returnChatTitle(id1, id2, name1, name2) {
// 			var title = "";
// 			if (id1 > id2) {
// 				title = name1 + " & " + name2;
// 			} else {
// 				title = name1 + " & " + name2;
// 			}
// 			return title;
// 		},
// 		checkChatCategory(categoryId) {
// 			console.log("inside");
// 			console.log(this.conversations.length);
// 			console.log(this.conversations);
// 			for (var i = 0; i < this.conversations.length; i++) {
// 				console.log("category given:", categoryId);
// 				console.log("category item:", this.conversations[i].category_id);
// 				if (this.conversations[i].category_id == categoryId) {
// 					console.log(this.conversations[i].id);
// 					return this.conversations[i].id;
// 				}
// 			}
// 			return false;
// 		},
// 	},
// };

import { getAge } from "@/common/helpers.js";
import ApiService from "@/services/api.service.js";
import ProfileBanner from "@/components/atom/ProfileBanner.vue";
import TableRow from '@/components/atom/TableRow.vue'
import ButtonComponent from '@/components/atom/ButtonComponent.vue'

export default {
	name: "RepresentativeProfile",
	props: ["representativeData"],
	components: {
		ProfileBanner,
		TableRow,
		ButtonComponent
	},

	data() {
		return {
			// representativeData: {},
			avatarSrc: "https://www.w3schools.com/w3images/avatar2.png",
			conversations: [],
			candidateData: null,
			isLoading: false,
			viewerImages: [],
			token: "",
		};
	},
	created() {
		this.token = JSON.parse(localStorage.getItem("token"));
	},
	computed : {
	// 	personal () {
	// 		return this.representativeData?.personal ? this.representativeData.personal : {}
	// 	},
	// 	essential () {
	// 		return this.representativeData?.essential ? this.representativeData.essential : {}
	// 	},
	// 	images () {
	// 		return this.representativeData?.image_upload ? this.representativeData.image_upload : {}
	// 	}
		isOwnProfile() {
			// let loggedInUserId = JSON.parse(localStorage.getItem('userInfo'))
			// return this.candidateData.user_id === loggedInUserId

			let loggedInUserId = JSON.parse(localStorage.getItem('user')).id
			return this.representativeData.user_id === loggedInUserId

			
		},
	},

	// created() {
	// 	this.getCandidateData();
	// },

	methods: {
		getAge,
		onClickButton(data) {
			if(data.event == 'editProfile') this.$router.push('/edit_representative');
			if (data.event == "openGallery") this.openGallery();
		},
		openGallery() {
			this.viewerImages = [];
			let images = [this.representativeData.per_avatar_url + `?token=${this.token}`, this.representativeData.per_main_image_url + `?token=${this.token}`]
			if (images && images.length > 0) {
				images.map((i) => this.viewerImages.push(i));
				this.show();
			} else {
				this.$error({
				title: "No image found",
				center: true,
				});
			}
		},
		show() {
			this.$viewerApi({
				images: this.viewerImages,
			});
		},
		// async getCandidateData() {
		// 	// console.log(JSON.parse(localStorage.getItem("user")), '>>>>>>>>ddd>>>>')
		// 	try {
		// 		this.isLoading = true;
		// 		// const user = JSON.parse(localStorage.getItem("user"));
		// 		console.log(ApiService, 'before call')
		// 		const response = await ApiService.get('v1/representative/profile');
		// 		console.log('after api call')
		// 		if (response.status === 200) {
		// 			this.isLoading = false;
		// 			this.representativeData = {
		// 				...response.data.data
		// 			};
		// 		}
		// 	} catch (error) {
		// 		this.isLoading = false;
		// 	}
		// }
	},
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
/* .rep-profile {
	margin: 25px;
	width: 120%;
	margin-left: 45px;
	.profile-heading {
		margin-bottom: 20px;
        margin-left: 10px;
		.cover-img {
			width: 100%;
			height: 300px;
			position: relative;
			box-shadow: 2px 5px 5px #aaa;
			border: 1px solid white;
			border-radius: 5px;
			top: 0;
			left: 0;
		}
		.avatar-img {
			width: 150px;
			height: 150px;
			margin-left: 130px;
			margin-bottom: 50px;
			border: 1px solid white;
			box-shadow: 2px 5px 5px #aaa;
			position: absolute;
			top: 208px;
			left: 380px;
			border-radius: 5px;
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
.name {
	margin-top: 6%;
} */

table {
    table-layout: fixed;
    width: 100%;
}
td {
    vertical-align: top;
}
.container--fluid {
    max-width: 100% !important;
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
@import "@/styles/base/_variables.scss";
.rep-profile {
	padding: 10px;
	.profile-heading {
		margin-bottom: 20px;
		.cover-img {
			width: 100%;
			height: 300px;
			position: relative;
			box-shadow: 2px 5px 5px #aaa;
			border: 1px solid white;
			border-radius: 5px;
			top: 0;
			left: 0;
		}
		.avatar-img {
			width: 150px;
			height: 150px;
			margin-left: 105px;
			border: 1px solid white;
			box-shadow: 2px 5px 5px #aaa;
			position: absolute;
			top: 200px;
			left: 410px;
			border-radius: 5px;
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

		.v-custom {
			text-transform: capitalize;
			background: #6158a7;
			color: #fff !important;
			img {
			  filter: brightness(0) invert(1);
			}
			&:hover {
				box-shadow: 0px 1px 3px #B2aaaa;
				border: 1px solid white !important;
			}
		  }
	}

	.review {
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
</style>