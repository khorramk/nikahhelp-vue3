<template>
		<Loader v-if="isLoading" :isLoading="isLoading" />
	<div v-else class="rep-profile">
		<div class="profile-heading" >
			<ProfileBanner
				class="px-2 mt-2"
				:image="images.per_avatar_url ? images.per_avatar_url + `?token=${token}` : ''"
				:name="representativeData.first_name + ' ' + representativeData.last_name"
			/>
			<v-container fluid>
                <v-row>
                  <v-col cols="12">
                    <div class="flex justify-center">
						<ButtonComponent
							class="mr-2"
							iconHeight="14px"
							:isSmall="true"
							title="EditProfile"
							:icon="EditIcon"
							customEvent="editProfile"
							:isBlock="false"
							@onClickButton="onClickButton"
						/>
						<ButtonComponent
							iconHeight="14px"
							:isSmall="true"
							title="Gallery"
							:icon="GalleryIcon"
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
						<v-container fluid class="pt-0 px-5 info-div">
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
												title="Address Line 1"
												textClass="text-subtitle-1"
												:value="personal.address_1"
											/>
											<TableRow 
												title="Address Line 2"
												textClass="text-subtitle-1"
												:value="personal.address_2"
											/>
											<TableRow 
												title="City"
												textClass="text-subtitle-1"
												:value="personal.per_permanent_city"
											/>
											<TableRow 
												title="Mobile"
												textClass="text-subtitle-1"
												:value="personal.mobile_number"
											/>
											<TableRow 
												title="Gender"
												textClass="text-subtitle-1"
												:value="essential.per_gender == 1 ? 'Male' : 'Female'"
											/>
											<TableRow 
												title="Age"
												textClass="text-subtitle-1"
												:value="getAge(essential.dob) + ' Years'"
											/>
											<TableRow 
												title="Occupation"
												textClass="text-subtitle-1"
												:value="essential.per_occupation ? essential.per_occupation : 'Not provide'"
											/>
											<TableRow 
												title="Current Residence"
												textClass="text-subtitle-1"
												:value="personal.per_permanent_country"
											/>
										</table>
									</v-card>
								</v-col>
							</v-row>
						</v-container>
					</fieldset>
				</v-col>
				<v-col cols="12">
					<fieldset class="">
						<legend class="ml-8 px-1"><span>Verification & reference</span></legend>
						<v-container fluid class="pt-0 px-5 info-div">
							<v-row dense>
								<v-col class="pt-1" cols="12">
									<v-card class="p-3" style="height: 100%">
        								<table>
											<TableRow 
												title="Title"
												textClass="text-subtitle-1"
												:value="representativeData.verification.ver_recommender_title"
											/>
											<TableRow 
												title="Name"
												textClass="text-subtitle-1"
												:value="representativeData.verification.ver_recommender_first_name + ' ' + representativeData.verification.ver_recommender_last_name"
											/>
											<TableRow 
												title="Occupation"
												textClass="text-subtitle-1"
												:value="representativeData.verification.ver_recommender_occupation"
											/>
											<TableRow 
												title="Address"
												textClass="text-subtitle-1"
												:value="representativeData.verification.ver_recommender_address"
											/>
											<TableRow 
												title="Mobile no"
												textClass="text-subtitle-1"
												:value="representativeData.verification.ver_recommender_mobile_no"
											/>
											<TableRow 
												title="Email"
												textClass="text-subtitle-1"
												:value="representativeData.verification.ver_recommender_email"
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
</template>

<script>
import { getAge } from "@/common/helpers.js";
import ApiService from "@/services/api.service";
import ProfileBanner from "@/components/atom/ProfileBanner.vue";
import TableRow from '@/components/atom/TableRow.vue'
import ButtonComponent from '@/components/atom/ButtonComponent.vue'

import EditIcon from "@/assets/icon/edit_icon.svg";
import GalleryIcon from "@/assets/icon/gallery.svg";

export default {
	name: "RepresentativeProfile",

	components: {
		ProfileBanner,
		TableRow,
		ButtonComponent
	},

	data() {
		return {
			representativeData: {},
			avatarSrc: "https://www.w3schools.com/w3images/avatar2.png",
			conversations: [],
			candidateData: null,
			isLoading: false,
			viewerImages: [],
			token: "",
			EditIcon,
			GalleryIcon
		};
	},
	computed : {
		personal () {
			return this.representativeData?.personal ? this.representativeData.personal : {}
		},
		essential () {
			return this.representativeData?.essential ? this.representativeData.essential : {}
		},
		images () {
			return this.representativeData?.image_upload ? this.representativeData.image_upload : {}
		}
	},

	created() {
		this.getCandidateData();
		this.token = JSON.parse(localStorage.getItem("token"));
	},

	methods: {
		getAge,
		onClickButton(data) {
			if(data.event == 'editProfile') this.$router.push('/edit_representative');
			if (data.event == "openGallery") this.openGallery();
		},
		openGallery() {
			this.viewerImages = [];
			let images = [this.representativeData.image_upload.per_avatar_url, this.representativeData.image_upload.per_main_image_url + `?token=${this.token}`]
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
		async getCandidateData() {
			// console.log(JSON.parse(localStorage.getItem("user")), '>>>>>>>>ddd>>>>')
			try {
				this.isLoading = true;
				// const user = JSON.parse(localStorage.getItem("user"));
				console.log(ApiService, 'before call')
				const response = await ApiService.get('v1/representative/profile');
				console.log('after api call')
				if (response.status === 200) {
					this.isLoading = false;
					this.representativeData = {
						...response.data.data
					};
				}
			} catch (error) {
				this.isLoading = false;
			}
		}
	},
};
</script>

<style scoped lang="scss">
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
.info-div {
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
.v-sheet.v-card:not(.v-sheet--outlined) {
	box-shadow: none !important;
	border: 2px solid #dddddd78;
}
</style>