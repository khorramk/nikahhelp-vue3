
<template>
	<div class="r-registration-container">
		<Header />
		<Loader v-if="isLoading" :isLoading="isLoading" />
		<div v-else class="steps ma-steps">
			<div class="steper-header text-center heading-text px-3">
				<h4>REPRESENTATIVE PROFILE FORM</h4>
				<p>Please answer all question accurately and in full</p>
			</div>

			<VueFixedHeader
					@change="updateFixedStatus"
					:threshold="propsData.threshold"
					:headerClass="propsData.headerClass"
					:fixedClass="propsData.fixedClass"
					:hideScrollUp="propsData.hideScrollUp"
			>
				<div class="step-bar">
					<a-steps
							class="desktop-block"
							:current="current"
							style="max-width: 100%"
							labelPlacement="vertical"
					>
						<a-step
								@click="onStep(index)"
								v-for="(item, index) in steps"
								:key="item.title"
								:title="item.title"
						/>
					</a-steps>
					<div class="mobile-header">
						<h4 class="mobile-step-text color-primary text-center fw-bold">
							{{ mobileSteps[current] }}
						</h4>
						<div class="mobile-block px-3 justify-content-center">
							<div
									class="mobile-step"
									@click="onStep(0)"
									:class="{ 'bg-primary': current >= 0 }"
							></div>
							<div
									class="mobile-step ml-2"
									@click="onStep(1)"
									:class="{ 'bg-primary': current >= 1 }"
							></div>
							<div
									class="mobile-step ml-2"
									@click="onStep(2)"
									:class="{ 'bg-primary': current >= 2 }"
							></div>
							<!-- <div
									class="mobile-step ml-2"
									@click="onStep(3)"
									:class="{ 'bg-primary': current >= 3 }"
							></div> -->
						</div>
					</div>
				</div>
			</VueFixedHeader>

			<div class="text-center mt-5" v-if="current == 0">
				<h5 class="color-brand fs-20">Personal Information</h5>
				<p class="color-brand fs-18">Details about you</p>
			</div>

			<div class="text-center mt-5" v-if="current == 1">
				<h5 class="color-brand fs-20">Image Upload</h5>
				<p class="color-brand fs-18">Details about you</p>
			</div>
			<div class="text-center mt-5" v-if="current == 2">
				<h5 class="color-brand fs-20">Verification and Reference</h5>
				<p class="color-brand fs-18" v-if="activeRouteName == 'RepresentativeRegistration'">Details about your referee</p>
				<p v-if="activeRouteName == 'RepresentativeRegistration'">We ask all representatives to provide the name of a referee. We do this additional level of check in order to promote greater trust and confidence in MatrimonyAssist.
				</p>
			</div>
			<div class="text-center mt-5" v-if="current == 3">
				<h5 class="color-brand fs-20">Review & Publish</h5>
				<p class="color-brand fs-18">Details about you</p>
			</div>

			<div class="steps-content px-2" v-if="current == 0">
				<PersonalInfoTwo
						:representativeDetails="representativeDetails"
						@valueChange="onDataChange($event)"
						:personalInformation="representativeDetails.personalInformation"
						ref="personInfoRefTwo"
				/>
			</div>

			<div class="steps-content px-2" v-if="current == 1">
				<ImageUpload
						@valueChange="onDataChange($event)"
						:imageModel="representativeDetails.imageModel"
						ref="imageUploadRef"
				/>
			</div>
			<div class="steps-content px-2" v-if="current == 2">
				<Verification
						v-if="true"
						@cancel="cancelVerification"
						:representativeDetails="representativeDetails"
						@valueChange="onDataChange($event)"
						:verification="representativeDetails.verification"
						ref="VerificationRef"
				/>
				<!-- <VerificationAgreement
						@agree="onAgree($event)"
						v-if="!showAgreement"
						ref="VerificationAgreement"
						class="mb-6"
				/> -->
			</div>
			<!-- <div class="steps-content" v-if="current == 3">
				<Review :showAgreement="showAgreement" @toggleStep="toggleStep" />
			</div> -->
			<div class="steps-action text-right pb-5 mt-6 clearfix bottom-padding">
				<a-button
						:disabled="!enabledNextBtn"
						:class="{
            disabled: !enabledNextBtn,
            'next-btn-pos': current !== 0,
            'first-next-btn-pos': current === 0,
          }"
						v-if="current < steps.length - 1"
						shape="round"
						type="primary"
						style="float: right"
						class="mt-3"
						@click="next"
				>
					Next
				</a-button>
				<!-- <a-button
						v-if="current == steps.length - 1"
						type="primary"
						shape="round"
						style="float: right; margin-top: 15px"
						@click="openDialog"
				>
					Review and Submit
				</a-button> -->
				<a-button
						v-if="current > 0"
						shape="round"
						style="float: right; margin-right: 10px"
						class="mt-3"
						@click="prev"
				>
					Previous
				</a-button>

				<a-button
						v-if="current >= 0"
						shape="round"
						type="primary"
						style="float: left"
						:class="{
            'first-save-btn': current === 0,
            'save-btn': current !== 0,
          }"
						class="mt-3"
						@click="saveExit"
				>
					Save & Exit
				</a-button>
			</div>
		</div>
		<!-- <AgreementSubmit
				@continue="continueToDashboard"
				@submit="doneBtn"
				@cancel="cancel"
				:dialog="dialog"
		/> -->
		<br /><br /><br /><br /><br />
	</div>
</template>
<script>
const createData = () => ({
	threshold: 0,
	headerClass: "vue-fixed-header",
	fixedClass: "vue-fixed-header--isFixed",
	hideScrollUp: false,
});
import VerificationAgreement from "@/components/representative-registration/verification-agreement.vue";
import PersonalInfoTwo from "@/components/representative-registration/personal-info-two.vue";
import Verification from "@/components/representative-registration/verification.vue";
import ImageUpload from "@/components/representative-registration/ImageUpload.vue";
import AgreementSubmit from "@/components/representative-registration/AgreementSubmit.vue";
import Review from "@/components/representative-registration/Review.vue";
import ApiService from "../../services/api.service";
import Header from "../../components/header/header.vue";
import { API_URL } from "../../configs/config";
import VueFixedHeader from "vue-fixed-header";
// import validator from "validator";
import jwtService from "../../services/jwt.service";
export default {
	name: "EditRepresentativeRegistration",

	components: {
		PersonalInfoTwo,
		Verification,
		ImageUpload,
		AgreementSubmit,
		VerificationAgreement,
		Header,
		VueFixedHeader,
		Review,
	},

	data() {
		return {
			isLoading: false,
			fixedStatus: {
				headerIsFixed: false,
			},
			propsData: { ...createData() },
			current: 0,
			enabledNextBtn: false,
			dialog: false,
			showAgreement: false,
			representativeDetails: {
				imageModel: {},
				showAgreement: false,
			},
			steps: [
				{
					title: "Personal Info",
				},

				{
					title: "Image Upload",
				},
				{
					title: "Verification & Reference",
				},
				// {
				// 	title: "Review & Submit",
				// },
			],
			mobileSteps: [
				"Personal Info",
				"Image Upload",
				"Verification & Reference",
				"Review & Submit",
			],

			activeKey: 1,

			agreementChecked: false,
			activeRouteName: "RepresentativeRegistration"
		};
	},
	watch: {
		$route: {
		immediate: true,
		handler: function (to, from) {
			this.activeRouteName = this.$route.name;
		},
		},
	},
	created() {},
	mounted() {
		this.getRepresentativeInitialInfo();
	},
	methods: {
		onStep(index) {
			this.current = index;
		},

		openDialog() {
			this.dialog = false;
			setTimeout(() => {
				this.dialog = true;
			});
		},
		cancel(e) {
			this.dialog = false;
		},
		async updateUserVerifyOrReject() {
			let user = JSON.parse(localStorage.getItem("user"));
			const {
				ver_city,
				ver_country,
				ver_document_type,
				ver_document_frontside,
				ver_document_backside,
			} = this.representativeDetails.verification;
			const isComplete = Object.values({
				ver_city,
				ver_country,
				ver_document_type,
				ver_document_frontside,
				ver_document_backside,
			}).every((x) => x !== undefined && x !== null && x !== "");
			const data = {
				id: user.id,
				status: isComplete ? "completed" : "InComplete",
			};
			await this.$store
					.dispatch("updateUserVerifyOrReject", data)
					.then((data) => {
						user.status = "2";
						localStorage.setItem("user", JSON.stringify(user));
					})
					.catch((error) => {});
		},
		continueToDashboard() {
			this.dialog = false;
			this.$router.push("/manageteam");
		},
		toggleStep(step) {
			this.current = step;
			this.checkExistData();
		},
		cancelVerification(e) {
			this.showAgreement = false;
			this.checkExistData();
		},
		onAgree(value) {
			this.showAgreement = value;
			if (!this.showAgreement) {
				this.current++;
			} else {
				this.checkExistData();
			}
		},

		onDataChange(e) {
			switch (e.current) {
				case 0:
					this.representativeDetails.personalInformation = {
						...e.value,
					};
					break;
				case 1:
					this.representativeDetails.imageModel = {
						...e.value,
					};
					break;
				case 2:
					this.representativeDetails.verification = {
						...this.representativeDetails.verification,
						...e.value,
					};
					break;
			}
			this.checkExistData();
		},
		updateFixedStatus(next) {
			this.fixedStatus.headerIsFixed = next;
		},
		getRepresentativeInitialInfo: async function () {
			this.isLoading = true;
			const user = JSON.parse(localStorage.getItem("user"));
			console.log("user", user);
			const response = await this.$store.dispatch("getRepresentativeData");
			if (response.status === 200) {
				this.isLoading = false;
				const {
					mobile_country_code,
					mobile_number,
					per_current_residence_country,
					address_1,
					address_2,
					per_permanent_country,
					per_permanent_city,
					per_permanent_post_code,
				} = response.data.data.personal;
				const details = {
					countries: response.data.data.countries,
					occupations: response.data.data.occupations,
					id: user.id,
					imageModel: {
						...response.data.data.image_upload,
						only_team_can_see:
								response.data.data.image_upload.only_team_can_see == 0
										? true
										: false,
						is_agree:
								response.data.data.image_upload.is_agree == 0 ? true : false,
						team_connection_can_see:
								response.data.data.image_upload.team_connection_can_seee == 0
										? true
										: false,
						anybody_can_see:
								response.data.data.image_upload.anybody_can_seee == 0
										? true
										: false,
					},
					verification: {
						...response.data.data.verification,
						ver_country: response.data.data.verification.ver_country,
						cities: [],
					},
					personalInformation: {
						essential: {
							...response.data.data.essential,
							default_date: response.data.data.essential.dob,
						},
						personal: {
							...{
								mobile_country_code,
								mobile_number,
								per_current_residence_country,
								address_1,
								address_2,
								per_permanent_country,
								per_permanent_city,
								per_permanent_post_code,
							},
							email: user.email,
						},
					},
				};
				console.log("details", details);
				this.representativeDetails = {
					...details,
				};

				const {
					ver_country,
					ver_document_type,
					ver_document_frontside,
					ver_document_backside,
				} = this.representativeDetails.verification;
				this.showAgreement = Object.values({
					ver_country,
					ver_document_type,
					ver_document_frontside,
					ver_document_backside,
				}).every((x) => x !== undefined && x !== null && x !== "");
				if (
						!this.showAgreement &&
						response.data.data.is_uplaoded_doc == "0"
				) {
					this.representativeDetails.verification = {
						...this.representativeDetails.verification,
						ver_document_frontside: "",
						ver_document_backside: "",
					};
				}
				this.current = 0;
				this.checkExistData();
			} else {
				this.isLoading = false;
			}
		},
		async onChangeCountry(e, name) {
			const res = await ApiService.get(`v1/utilities/cities/${e.id}`);

			if (res.status === 200) {
				switch (name) {
					case "residence":
						this.representativeDetails.personalInformation.personal.residenceCities.push(
								...res.data.data
						);
						break;
					case "permanat":
						this.representativeDetails.personalInformation.personal.permanantCities.push(
								...res.data.data
						);
						break;
					case "verification":
						this.representativeDetails.verification.cities.push(
								...res.data.data
						);
						break;
				}
			}
		},
		saveExit() {
			this.$router.back();
		},
		doneBtn() {
			const {
				ver_country,
				ver_document_type,
				ver_document_frontside,
				ver_document_backside,
			} = this.representativeDetails.verification;
			const isComplete = Object.values({
				ver_country,
				ver_document_type,
				ver_document_frontside,
				ver_document_backside,
			}).every((x) => x !== undefined && x !== null && x !== "");
			this.saveDataInputStatus(isComplete ? 4 : 5);
		},
		async next() {
			switch (this.current) {
				case 0: {
					this.current++;
					break;
				}
				case 1: {
					this.current++;
					break;
				}
				case 2: {
					this.current++;
					break;
				}
				case 3: {
					this.current++;
					break;
				}

				default: {
					this.current = 0;
				}
			}
			this.checkExistData();
			// this.saveDataInputStatus(this.current);
		},
		prev() {
			this.current--;
			this.checkExistData();
		},

		async saveDataInputStatus(satge) {
			const res = await ApiService.post(
					"v1/representative/personal-info-status?_method=PATCH",
					{
						data_input_status: satge,
					}
			);
			const user = JSON.parse(localStorage.getItem("user"));
			user.data_input_status = satge;
			localStorage.removeItem("user");
			localStorage.setItem("user", JSON.stringify(user));
		},

		checkExistData() {
			let isEnabled = false;
			switch (this.current) {
				case 0:
					let { dob, per_gender, per_occupation } =
							this.representativeDetails.personalInformation.essential;
					let essential = { dob, per_gender, per_occupation };
					let {
						mobile_country_code,
						mobile_number,
						// per_current_residence_country,
						address_1,
						address_2,
						per_permanent_country,
						per_permanent_city,
						per_permanent_post_code,
					} = this.representativeDetails.personalInformation.personal;

					let personal = {
						mobile_country_code,
						mobile_number,
						// per_current_residence_country,
						address_1,
						address_2,
						per_permanent_country,
						per_permanent_city,
						per_permanent_post_code,
					};

					isEnabled = this.isFormCompleted(personal, essential);
					break;

				case 1:
					const { per_avatar_url, per_main_image_url } =
							this.representativeDetails.imageModel;
					isEnabled = Object.values({
						per_avatar_url,
						per_main_image_url,
					}).every((x) => x !== undefined && x !== null && x !== "");
					break;
				case 2:
					if (this.showAgreement) {
						const {
							ver_country,
							ver_document_type,
							ver_document_frontside,
							ver_document_backside,
						} = this.representativeDetails.verification;
						isEnabled = Object.values({
							ver_country,
							ver_document_type,
							ver_document_frontside,
							ver_document_backside,
						}).every((x) => x !== undefined && x !== null && x !== "");
					} else {
						isEnabled = true;
					}

					break;
			}

			this.enabledNextBtn = isEnabled;
		},

		isFormCompleted(personal, essential) {
			return Object.values({
				essential,
				personal,
			}).every((information) => {
				return this.isFieldFilled(information);
			});
		},

		isFieldFilled(formFields) {
			return Object.values(formFields).every((field) => {
				return field !== undefined && field !== null && field !== "";
			});
		},

		onDoneClick() {
			this.loading = true;
			if (this.agreementChecked == false) {
				this.loading = false;
				this.$message.error(
						"Terms and Conditions are not Checked, Please agree with them to proceed"
				);
				return;
			}
			ApiService.post("v1/representative/final/submit", {
				is_agree: this.agreementChecked,
			})
					.then((data) => {
						console.log(data);
						this.loading = false;
						this.getPercentage();
						this.$router.push("/manageteam");
					})
					.catch((error) => {
						this.loading = false;
						this.$message.error(error);
						console.log(error);
					});
		},
	},
};
</script>
<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.r-registration-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.steps-content {
		margin: 0;
		padding: 0;
		z-index: 9;
	}
	header {
		text-align: center;
		height: 100px;
		width: 100%;
		margin: 0;
		padding: 0;
		background-color: $bg-secondary;

		@media (max-width: 768px) {
			width: 105%;
		}

		@media (max-width: 700px) {
			width: 120%;
		}
		@media (max-width: 620px) {
			width: 130%;
		}
		@media (max-width: 540px) {
			width: 148%;
		}
		@media (max-width: 414px) {
			width: 195%;
		}

		@media (max-width: 375px) {
			width: 214%;
		}
		@media (max-width: 360px) {
			width: 223%;
		}
		@media (max-width: 320px) {
			width: 250%;
		}
		@media (max-width: 280px) {
			width: 286%;
		}

		img {
			margin-top: 10px;
			height: 80px;
		}
	}
	.header-text {
		width: 100%;
	}
	.heading-text {
		margin-top: 30px;
		color: $color-brand;
		h4,
		h6 {
			font-weight: bold;
			color: $color-brand;
		}
		h4 {
			font-size: 18px;
			@media (min-width: 992px) {
				font-size: 24px;
			}
		}
		h6 {
			font-size: 14px;
			@media (min-width: 992px) {
				font-size: 20px;
			}
		}
	}

	.r-registration {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.step-bar {
			margin: 0;
			padding: 0;
			z-index: 9;
		}
	}
}

.step-bar.vue-fixed-header--isFixed {
	position: fixed;
	top: 10px;
	z-index: 1000;
	width: 100%;
	padding: 0;
	background: #d4e0eb;
	border-radius: 14px;
	padding-left: 10px;
	padding-right: 10px;
	padding-bottom: 8px !important;
	@media (min-width: 992px) {
		width: 800px;
	}
}
.bottom-padding {
	padding: 0 2rem;
}
.mobile-step {
	background-color: #b7b7b7;
	border-radius: 20px;
	width: 25%;
	height: 20px;
}
.desktop-block {
	display: none;
}
.mobile-block {
	display: flex;
	//justify-content: center;
}
.mobile-header {
	display: block;
	padding: 10px 0;
}
.mobile-step-text {
	font-size: 18px;
}
.bottom-padding {
	padding: 0 1.5rem;
}
@media (min-width: 768px) {
	.bottom-padding {
		padding: 1rem;
	}
	.desktop-block {
		display: flex;
	}
	.mobile-block {
		display: none;
	}
	.mobile-header {
		display: none;
	}
	.step-bar.vue-fixed-header--isFixed {
		top: 15px;
		padding-top: 20px !important;
	}
}
@media (min-width: 992px) {
	.step-bar.vue-fixed-header--isFixed {
		width: 800px;
	}
}

.next-btn-pos {
	margin-right: -12px;
	@media (min-width: 992px) {
		margin-right: -6px;
	}
}
.first-next-btn-pos {
	margin-right: -8px;
}
.first-save-btn {
	margin-left: -10px;
}
.save-btn {
	margin-left: -14px;
	@media (min-width: 992px) {
		margin-left: -6px;
	}
}
</style>
