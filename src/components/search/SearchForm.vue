<template>
	<div>
		<!-- start advanced search -->
		<div class="row">
			<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
				<div class="advanced-search">
					<div class="row">
						<div class="col-md-12">
							<h2>Advanced Search</h2>
							<p class="sub-title">Define and search your prospect here</p>
						</div>
					</div>

					<div class="row mb-5 mt-3">
						<!-- Age Slider -->
						<div class="col-md-6 mt-4">
							<div class="age-slider">
								<template>
									<div>
										<a-slider
											range
											v-model="age"
											@afterChange="onAfterChangeSlider"
										/>
										<span class="fs-20 color-primary"
											>Age:
											<span class="fw-600">{{ age[0] }} - {{ age[1] }}</span>
											years old</span
										>
									</div>
								</template>
							</div>
						</div>
						<!-- Height  -->
						<!-- <div class="col-md-6">
							<div class="height-slider">
								<input
									type="number"
									placeholder="Height in Inches"
									class="float-left"
									v-model="heightMin"
								/>
								<input
									type="number"
									placeholder="Height in Inches"
									class="float-right"
									v-model="heightMax"
								/>
							</div>
						</div> -->
						<div class="col-md-6">
							<div class="height">
								<!-- <input
											type="number"
											placeholder="Height in cm"
											class="float-left"
											v-model="preferenceData.pre_height_min"
										/> -->
								<div class="text-center mr-3 mb-1">
									<span class="fs-16 mr-2">cm</span>
									<a-switch v-model:checked="heightUnit" />
									<span class="fs-16 ml-2">ft</span>
								</div>

								<a-input
									v-if="heightUnit == 0"
									suffix="cm"
									class="w-45"
									v-model.number="heightMin"
									placeholder="Enter your height"
									type="number"
								/>
								<a-input
									v-else
									suffix="ft"
									class="w-45"
									v-model.number="minHeightFt"
									placeholder="Enter your height"
									type="number"
								/>
								<span class="text-center mt-2 ml-2 mr-2">To</span>
								<!-- <input
											type="number"
											placeholder="Height in cm"
											class="float-right"
											v-model="preferenceData.pre_height_max"
										/> -->
								<a-input
									v-if="heightUnit == 0"
									suffix="cm"
									class="w-45"
									v-model.number="heightMax"
									placeholder="Enter your height"
									type="number"
								/>
								<a-input
									v-else
									suffix="ft"
									class="w-45"
									v-model.number="maxHeightFt"
									placeholder="Enter your height"
									type="number"
								/>
							</div>
						</div>
					</div>
					<div class="row">
						<!-- Select Religion -->
						<div class="col-md-6">
							<div class="select-box">
								<select class="custom-select" v-model="religion">
									<option value="">Select Religion</option>
									<option
										v-for="r in $store.state.candidateInfo.religion_options"
										:value="r.id"
										:key="r.id"
									>
										{{ r.name }}
									</option>
								</select>
							</div>
						</div>
						<!-- Select County -->
						<div class="col-md-6">
							<div class="select-box">
								<select class="custom-select" v-model="country">
									<option value="">Select Country</option>
									<option
										v-for="c in $store.state.candidateInfo.countries"
										:value="c.id"
										:key="c.id"
									>
										{{ c.name }}
									</option>
								</select>
							</div>
						</div>

						<!-- Select Ethnicity -->
						<div class="col-md-6">
							<div class="select-box">
								<select class="custom-select" v-model="ethnicity">
									<option value="">Select Ethnicity</option>
									<option v-for="e in ethnicities" :value="e" :key="e">
										{{ e }}
									</option>
								</select>
							</div>
						</div>

						<!-- Select Maritial Status -->
						<div class="col-md-6">
							<div class="select-box">
								<select class="custom-select" v-model="maritalStatus">
									<option value="">Select Maritial Status</option>
									<option value="single">Single</option>
									<option value="married">Married</option>
									<option value="divorced">Divorced</option>
								</select>
							</div>
						</div>

						<!-- Select Employment Status -->
						<div class="col-md-6">
							<div class="select-box">
								<select class="custom-select" v-model="employmentStatus">
									<option value="">Select Employment Status</option>
									<option value="Employed">Employed</option>
									<option value="Unemployed">Unemployed</option>
									<option value="Don't Mind">Don't Mind</option>
								</select>
							</div>
						</div>

						<!-- Select Occupation -->
						<div class="col-md-6">
							<div class="select-box">
								<select class="custom-select" v-model="occupation">
									<option value="">Select Occupation</option>
									<option
										:value="value"
										:key="key"
										v-for="(value, key) in occupations"
									>
										{{ value }}
									</option>
								</select>
							</div>
						</div>
						<!-- Select Education -->
						<div class="col-md-6">
							<div class="select-box">
								<select class="custom-select" v-model="education">
									<option value="">Select Education</option>
									<option
										v-for="o in $store.state.candidateInfo.study_level_options"
										:value="o.id"
										:key="o.id"
									>
										{{ o.name }}
									</option>
								</select>
							</div>
						</div>

						<!-- Select Mother Tongue -->
						<div class="col-md-6">
							<div class="select-box">
								<select class="custom-select" v-model="motherTongue">
									<option value="">Select Mother Tongue</option>
									<option
										v-for="(spoken_language, key) in languages"
										:value="spoken_language"
										:key="key"
									>
										{{ spoken_language }}
									</option>
								</select>
							</div>
						</div>
						<!-- Select Nationality -->
						<div class="col-md-6">
							<div class="select-box">
								<select class="custom-select" v-model="nationality">
									<option value="">Select Nationality</option>
									<option
										v-for="c in $store.state.candidateInfo.countries"
										:value="c.id"
										:key="c.id"
									>
										{{ c.name }}
									</option>
								</select>
							</div>
						</div>

						<!-- Select Country of Birth -->
						<div class="col-md-6">
							<div class="select-box">
								<select class="custom-select" v-model="countryOfBirth">
									<option value="">Select Country of Birth</option>
									<option
										v-for="c in $store.state.candidateInfo.countries"
										:value="c.id"
										:key="c.id"
									>
										{{ c.name }}
									</option>
								</select>
							</div>
						</div>

						<!-- Select Current Residence -->
						<div class="col-md-6">
							<div class="select-box">
								<select class="custom-select" v-model="currentResidence">
									<option value="">Select Current Residence</option>
									<option
										v-for="c in $store.state.candidateInfo.countries"
										:value="c.id"
										:key="c.id"
									>
										{{ c.name }}
									</option>
								</select>
							</div>
						</div>

						<!-- Select Currently Living With -->
						<div class="col-md-6">
							<div class="select-box">
								<select class="custom-select" v-model="currentlyLivingWith">
									<option value="">Select Currently Living With</option>
									<option value="parents">Parents</option>

									<option value="live in my own home">
										Live in my own home
									</option>
									<option value="live in others home">
										Live in others home
									</option>
									<option value="other">Other</option>
								</select>
							</div>
						</div>

						<!-- Select Hobbies and interests -->
						<div class="col-md-6">
							<div class="select-box">
								<select class="custom-select" v-model="hobbiesAndInterest">
									<option value="">Select Hobbies & interests</option>
									<option
										v-for="(hobby, key) in hobbies"
										:key="key"
										:value="hobby"
									>
										{{ hobby }}
									</option>
								</select>
							</div>
						</div>

						<!-- Select Smoking Status -->
						<div class="col-md-6">
							<div class="select-box">
								<select class="custom-select" v-model="smokingStatus">
									<option :value="0">Select Smoking Status</option>
									<option :value="1">Yes</option>
									<option :value="2">No</option>
									<option :value="3">Former Smoker</option>
								</select>
							</div>
						</div>

						<!-- Select tags -->
						<!-- <div class="col-md-12">
							<p class="tagsStyle">Tags</p>
							<div class="select-box">
								<select
									class="custom-select"
									v-model="tags"
									style="padding: 40px"
								>
									<option value="">Select Tags</option>
									<option
										v-for="o in $store.state.candidateInfo.tags"
										:value="o.id"
										:key="o.id"
									>
										{{ o.name }}
									</option>
								</select>
							</div>
						</div> -->
					</div>
					<!-- <div class="row mb-5 mt-3">
            <div class="col-md-12">
              <div class="tags">Tags</div>
              <div class="multi-select">
                <a-select
                  mode="multiple"
                  style="width: 100%"
                  placeholder="select one country"
                  option-label-prop="label"
                >
                  <a-select-option value="china" label="China">
                    <span role="img" aria-label="China"> 🇨🇳 </span>
                    China (中国)
                  </a-select-option>
                  <a-select-option value="usa" label="USA">
                    <span role="img" aria-label="USA"> 🇺🇸 </span>
                    USA (美国)
                  </a-select-option>
                  <a-select-option value="japan" label="Japan">
                    <span role="img" aria-label="Japan"> 🇯🇵 </span>
                    Japan (日本)
                  </a-select-option>
                  <a-select-option value="korea" label="Korea">
                    <span role="img" aria-label="Korea"> 🇰🇷 </span>
                    Korea (韩国)
                  </a-select-option>
                </a-select>
                <button class="down-arrow"></button>
                <button class="close">+</button>
              </div>
            </div>
          </div> -->
					<div class="row">
						<div class="col-md-12">
							<button class="btn btn-primary w-100" @click="handleSearch">
								<img src="@/assets/icon/search.svg" alt="Icon" height="25px" />
								<g data-v-ac485448="" id="Layer_2" data-name="Layer 2">
									<g data-v-ac485448="" id="draw_boxes" data-name="draw boxes">
										<path
											data-v-ac485448=""
											d="M41.67,35.89A1.33,1.33,0,0,0,41.58,34L30.34,23.79a1.34,1.34,0,0,0-1.88.09l-4,4.44a1.34,1.34,0,0,0,.09,1.88L35.78,40.41a1.32,1.32,0,0,0,1.88-.09Z"
											class="cls-1"
										></path>
										<path
											style="fill: #ee5253"
											d="m282.282 85.465c-54.264-54.262-142.554-54.261-196.817 0-54.262 54.263-54.262 142.555 0 196.817 26.286 26.286 61.235 40.762 98.409 40.762 37.173 0 72.122-14.476 98.408-40.762s40.762-61.235 40.762-98.408c0-37.174-14.476-72.123-40.762-98.409zm-14.142 182.675c-46.464 46.464-122.066 46.466-168.532 0-46.464-46.465-46.464-122.067 0-168.532 23.232-23.232 53.749-34.848 84.266-34.848 30.518 0 61.034 11.615 84.267 34.848 46.463 46.464 46.463 122.067-.001 168.532z"
										/>
										<path
											data-v-ac485448=""
											d="M14.72,0A14.72,14.72,0,1,1,9.91.81,14.73,14.73,0,0,1,14.72,0m0,4a10.82,10.82,0,0,0-3.51.59h0A10.73,10.73,0,1,0,14.72,4Z"
											class="cls-1"
										></path>
									</g>
								</g>
								<!-- </svg> -->
								Search
							</button>
							<select-team-modal
								:selectTeamModal="showActiveTeamModal"
								@handle-cancel="showActiveTeamModal = false"
								@handle-team="handleSearch"
							></select-team-modal>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- end advanced search -->
	</div>
</template>

<script>
import SelectTeamModal from "@/components/team/Modals/SelectTeamModal.vue";
import ethnicities from "@/common/ethnicities.js";
import languages from "@/common/languages.js";
import hobbies from "@/common/hobbies.js";
import ApiService from "@/services/api.service";

export default {
	data() {
		return {
			age: [20, 40],
			heightMin: null,
			heightMax: null,
			country: "",
			religion: "",
			heightUnit: false,
			minHeightFt: null,
			maxHeightFt: null,

			ethnicities: ethnicities,
			ethnicity: "",
			maritalStatus: "",
			employmentStatus: "",
			occupations: null,
			occupation: "",
			education: "",
			languages: languages,
			motherTongue: "",
			nationality: "",
			countryOfBirth: "",
			currentResidence: "",
			currentlyLivingWith: "",
			hobbies: hobbies,
			hobbiesAndInterest: "",
			smokingStatus: 0,
			tags: "",

			showActiveTeamModal: false,
			candidateActiveTeam: null,
			activeTeamId: null,
		};
	},
	created() {
		this.getOccupations();
	},
	components: {
		SelectTeamModal,
	},
	methods: {
		async getOccupations() {
			await ApiService.get("v1/occupations")
				.then((data) => {
					this.occupations = data.data.data.occupations;
					console.log(this.occupations);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		handleSearch() {
			if (localStorage.getItem("teamidappwide")) {
				this.activeTeamId = localStorage.getItem("teamidappwide");
				this.activeTeamId = this.activeTeamId.slice(1, -1);
			} else if (this.$store.state.team.teamInfo) {
				console.log(this.$store.state.team.teamInfo);
				this.candidateActiveTeam = this.$store.state.team.teamInfo;
				this.activeTeamId = this.$store.state.team.teamInfo.team_id;
			} else {
				this.showActiveTeamModal = true;
				return;
			}

			let params = {
				age_min: this.age[0],
				age_max: this.age[1],
			};
			let _payload = `?page=0&parpage=10&min_age=${params.age_min}&max_age=${params.age_max}&active_team_id=${this.activeTeamId}`;

			// if (this.gender != 0) {
			// 	_payload += `&gender=${this.gender}`;
			// }
			if (this.heightMin > 0 || this.minHeightFt > 0) {
				if (this.minHeightFt) {
					this.heightMin = this.minHeightFt * 30.48;
				}
				_payload += `&min_height=${this.heightMin}`;
			}
			if (this.heightMax > 0 || this.maxHeightFt > 0) {
				if (this.maxHeightFt) {
					this.heightMax = this.maxHeightFt * 30.48;
				}
				_payload += `&max_height=${this.heightMax}`;
			}
			if (this.country != "") {
				_payload += `&country=${this.country}`;
			}
			if (this.religion != "") {
				_payload += `&religion=${this.religion}`;
			}
			if (this.ethnicity != "") {
				_payload += `&ethnicity=${this.ethnicity}`;
			}
			if (this.maritalStatus != "") {
				_payload += `&marital_status=${this.maritalStatus}`;
			}
			if (this.employmentStatus != "") {
				_payload += `&employment_status=${this.employmentStatus}`;
			}
			if (this.occupation != "") {
				_payload += `&per_occupation=${this.occupation}`;
			}
			if (this.education != "") {
				_payload += `&education_level_id=${this.education}`;
			}
			if (this.motherTongue != "") {
				_payload += `&mother_tongue=${this.motherTongue}`;
			}
			if (this.nationality != "") {
				_payload += `&nationality=${this.nationality}`;
			}
			if (this.countryOfBirth != "") {
				_payload += `&country=${this.countryOfBirth}`;
			}
			if (this.currentResidence != "") {
				_payload += `&current_residence_country=${this.currentResidence}`;
			}
			if (this.currentlyLivingWith != "") {
				_payload += `&currently_living_with=${this.currentlyLivingWith}`;
			}
			if (this.smokingStatus != "") {
				_payload += `&smoker=${this.smokingStatus}`;
			}
			if (this.hobbiesAndInterest != "") {
				_payload += `&hobbies_interests=${this.hobbiesAndInterest}`;
			}

			console.log(_payload);
			//alert(_payload);
			this.$emit("handle-search", _payload);
		},
		onAfterChangeSlider(value) {
			this.age = value;
		},
	}
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
// start css for advanced-search
.advanced-search {
	justify-content: space-between;
	width: 100%;
	padding: 30px;
	border-radius: 10px;
	position: relative;
	background-color: #ffffff;
	box-shadow: 0px 0px 10px 1px rgba(63, 6, 17, 0.3);

	.close-popup {
		position: absolute;
		top: -20px;
		right: -20px;
		width: auto;

		svg {
			margin: 0;
		}
	}

	.title {
		color: #5f5f5f;
		font-size: 32px;
	}

	.sub-title {
		font-size: 20px;
		color: #5c5299;
		font-weight: 600;
	}

	.height-slider {
		padding-top: 6px;

		input {
			width: 47%;
			height: 36px;
			outline: none;
			padding: 0 15px;
			border-color: #6158a9;
		}
	}

	.select-box {
		margin-bottom: 15px;
	}

	.tags {
		font-size: 16px;
		font-weight: 600;
		color: #6158a9;
		text-align: center;
		padding: 15px 0;
	}

	.multi-select {
		position: relative;

		.down-arrow,
		.close {
			position: absolute;
			top: 50%;
			right: 20px;
			transform: translate(0, -50%);
			width: 20px;
			height: 14px;
			z-index: 0;
			cursor: pointer;
			background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAMCAIAAAACrGGSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA/tpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ1dWlkOjY1RTYzOTA2ODZDRjExREJBNkUyRDg4N0NFQUNCNDA3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjUxOERGNzFEQkY3MDExRUI5NEY0Q0NBQTgyOEI5REM2IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjUxOERGNzFDQkY3MDExRUI5NEY0Q0NBQTgyOEI5REM2IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIElsbHVzdHJhdG9yIDI0LjMgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MmM2MjQ5MWYtYjczMC03ZTQ4LTk2MGMtNWNkNjZmMjhhYjM0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjJjNjI0OTFmLWI3MzAtN2U0OC05NjBjLTVjZDY2ZjI4YWIzNCIvPiA8ZGM6dGl0bGU+IDxyZGY6QWx0PiA8cmRmOmxpIHhtbDpsYW5nPSJ4LWRlZmF1bHQiPk1BIE1hbmFnZSBUZWFtPC9yZGY6bGk+IDwvcmRmOkFsdD4gPC9kYzp0aXRsZT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5ox/+KAAAB20lEQVR42nxSz08TQRR+b3YbS4wUDUJBiNFEDeu2FE9eNcbQlSwnL/51XEy8CRTZigmeNSmBbbfCBqPBhMpuYghRTIs7zzczqHgob5L5kTff9773zeDe52/5fP7q6AUACWAD/NLzeUEEiGYH1vgVb7OxVxgaHC5eREAgAdgPB4DMLhicJMe1lxu8F870ZRK0Wmu9XYvVJexfV6VsJkmS7y8WGl8+/Tg67KKkLAqTYOkDszrlYtWfwvOUZ1EzXa9/7Ha7o2ODT59VbAThlouAWbAYt8OvrOXJnNMP3w7TYLktAd2Z4sNHtwfygvWcIOTc0jWS+LoWR5sJZlZ1/o7RywURLQPe2jpYe7UNZJUqw96cQ6T8QL3wPULEVtipL+/wiRvxfKYQJgVIjXf76292QZ64lQnPv/X3jWztKvMoIrc8xnOwssONcM7zp0yNYCluNTsC6N79mw8e3zC8OqRNZ3QyuDQ9jijYTkVBghup17ajcJ8QZn1HOXVqpNKr3lLrl2coVUTNg9XFiFBcKuSODnsWylm/5JZHTE2N1Qy6/4zBqkftmLKTckyZpsfPF973elIQVufvMlh/O6kp/hU79Q/+t9p80jT5uRt3Jq4PTU4W/qS0UlLDaPgtwAA04ureb1bz9wAAAABJRU5ErkJggg==)
				no-repeat;
		}

		.close {
			right: 60px;
			background: transparent;
			height: auto;
			font-size: 44px;
			font-weight: normal;
			transform: rotate(45deg);
			margin-top: -25px;
			z-index: 2;
			color: #6158a9;
		}
	}

	button {
		font-size: 24px;

		svg {
			fill: white;
			width: 35px;
			margin-right: 20px;
		}
	}
	.ant-switch-checked {
		background-color: $color-primary;
	}
}

// end css for advanced-search

.tagsStyle {
	text-align: center;
	color: #6159a7;
}
</style>