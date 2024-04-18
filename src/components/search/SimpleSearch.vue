<template>
	<div>
		<!-- start advanced search -->
		<div class="row">
			<div class="ml-1 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
				<div class="">
					<div class="row mb-2">
						<div class="w-full text-center mt-2">
							
						</div>

						<!-- Age Slider -->
						<div class="mt-2 pl-2">
							<label for="" class="search-label">Age:</label>
							<SelectGroup
								style="margin-left: 5px;"
								@selected="onDropdownChange"
								:uniqueNames="['min_age', 'max_age']"
								size="default"
								:options="ageTV"
								 :placeholder="['Min Age', 'Max Age']"
								width="98"
								:suffixIcon="true"
								:values="[min_age, max_age]"
							/>
						</div>
						<div class="mt-2 pl-2">
							<label for="" class="search-label">Height:</label>
							<SelectGroup
								style="margin-left: 5px;"
								@selected="onDropdownChange"
								:uniqueNames="['heightMin', 'heightMax']"
								size="default"
								:options="heithtTV"
								:placeholder="['Min Height', 'Max Height']"
								width="98"
								:suffixIcon="true"
								:values="[heightMin, heightMax]"
							/>
						</div>
					</div>
					<!-- Select Religion -->
					<div class="">
						<label for="" class="search-label">Religion:</label>
						<a-select
							id="religion"
							v-model="religion"
							show-search
							size="large"
							:placeholder="'Select Religion'"
							option-filter-prop="children"
							style="width: 100%"
							notFoundContent="Religion not found"
						>
							<a-select-option :value="undefined">
								Select Religion
							</a-select-option>
							<a-select-option
								v-for="r in $store.state.candidateInfo.religion_options"
								:value="r.id"
								:key="r.id"
							>
								{{ r.name }}
							</a-select-option>
							<template #suffixIcon>
								<img src="@/assets/select-arrow-big.png" alt="icon" />
							</template>
						</a-select>
					</div>
					<!-- Select County -->
					<div class=" mt-2">
						<label for="" class="search-label">Country:</label>
						<a-select
							id="country"
							v-model="country"
							show-search
							size="large"
							:placeholder="'Select country'"
							option-filter-prop="children"
							style="width: 100%"
							notFoundContent="Country not found"
						>
							<a-select-option :value="undefined">
								Select Country
							</a-select-option>
							<a-select-option
								v-for="c in $store.state.candidateInfo.countries"
								:value="c.id"
								:key="c.id"
							>
								{{ c.name }}
							</a-select-option>
							<template #suffixIcon>
								<img src="@/assets/select-arrow-big.png" alt="icon" />
							</template>
						</a-select>
					</div>
					<!-- Select Ethnicity -->
					<div class=" mt-2">
						<label for="" class="search-label">Ethnicity:</label>
						<a-select
							id="ethnicity"
							v-model="ethnicity"
							show-search
							size="large"
							:placeholder="'Select Ethnicity'"
							option-filter-prop="children"
							style="width: 100%"
							notFoundContent="ethnicity not found"
						>
							<a-select-option :value="undefined">
								Select Ethnicity
							</a-select-option>
							<a-select-option
								v-for="e in ethnicities"
								:value="e"
								:key="e"
							>
								{{ e }}
							</a-select-option>
							<template #suffixIcon>
								<img src="@/assets/select-arrow-big.png" alt="icon" />
							</template>
						</a-select>
					</div>
					<!-- Select Maritial Status -->
					<div class="mt-2">
						<label for="" class="search-label">Marital status:</label>
						<a-select
							id="ethnicity"
							v-model="maritalStatus"
							show-search
							size="large"
							:placeholder="'Select Marital Status'"
							option-filter-prop="children"
							style="width: 100%"
							notFoundContent="Marital Status not found"
						>
							<a-select-option :value="undefined">Select Marital Status</a-select-option>
							<!-- <a-select-option value="single">Single</a-select-option>
							<a-select-option value="married">Married</a-select-option>
							<a-select-option value="divorced">Divorced</a-select-option> -->
							<a-select-option value="single never married">Single, never married</a-select-option>
							<a-select-option value="widow">Widow</a-select-option>
							<a-select-option value="widow with children">Widow with children</a-select-option>
							<a-select-option value="widower">Widower</a-select-option>
							<a-select-option value="widower with children">Widower with children</a-select-option>
							<a-select-option value="divorcee">Divorcee</a-select-option>
							<a-select-option value="divorcee with children">Divorcee with children</a-select-option>
							<template #suffixIcon>
								<img src="@/assets/select-arrow-big.png" alt="icon" />
							</template>
						</a-select>
					</div>
					<div class="mt-2">
						<label for="" class="search-label">Employment status:</label>
						<a-select
							id="ethnicity"
							v-model="employmentStatus"
							show-search
							size="large"
							:placeholder="'Select Employment Status'"
							option-filter-prop="children"
							style="width: 100%"
							notFoundContent="Employment Status not found"
						>
							<a-select-option :value="undefined">Select Employment Status</a-select-option>
							<a-select-option value="Don't Mind">Don't Mind</a-select-option>
							<a-select-option value="Unemployed">Employed full-time</a-select-option>
							<a-select-option value="Employed part-time">Employed part-time</a-select-option>
							<a-select-option value="Self-employed">Self-employed</a-select-option>
							<a-select-option value="Homemaker">Homemaker</a-select-option>
							<a-select-option value="Student">Student</a-select-option>
							<a-select-option value="Retired">Retired</a-select-option>
							<a-select-option value="On professional training">On professional training</a-select-option>
							<a-select-option value="On apprenticeship training">On apprenticeship training</a-select-option>
							<a-select-option value="Own a business">Own a business</a-select-option>
							<a-select-option value="Other">Other</a-select-option>
							<template #suffixIcon>
								<img src="@/assets/select-arrow-big.png" alt="icon" />
							</template>
						</a-select>
					</div>
					<div class="mt-2">
						<label for="" class="search-label">Nationality:</label>
						<a-select
							id="country"
							v-model="nationality"
							show-search
							size="large"
							:placeholder="'Select nationality'"
							option-filter-prop="children"
							style="width: 100%"
							notFoundContent="Nationality not found"
						>
							<a-select-option :value="undefined">
								Select Nationality
							</a-select-option>
							<a-select-option
								v-for="c in $store.state.candidateInfo.countries"
								:value="c.id"
								:key="c.id"
							>
								{{ c.name }}
							</a-select-option>
							<template #suffixIcon>
								<img src="@/assets/select-arrow-big.png" alt="icon" />
							</template>
						</a-select>
					</div>
					<template v-if="showMoreSearch">
						<!-- <div class="mt-2">
							<div class="select-box">
								<select class="custom-select" v-model="motherTongue">
									<option :value="undefined">Select Mother Tongue</option>
									<option
										v-for="(spoken_language, key) in languages"
										:value="spoken_language"
										:key="key"
									>
										{{ spoken_language }}
									</option>
								</select>
							</div>
						</div> -->
						<div class="mt-2">
							<div class="select-box">
								<select class="custom-select" v-model="employmentStatus">
									<option :value="undefined">Select Employment Status</option>

									<!-- <option :value="undefined" disabled>Select Employment Status</option> -->
									<option value="Employed">Employed</option>
									<option value="Unemployed">Unemployed</option>
									<option value="Don't Mind">Don't Mind</option>
								</select>
							</div>
						</div>
						<!-- <div class="mt-2">
							<div class="select-box">
								<select class="custom-select" v-model="occupation">
									<option :value="undefined">Select Occupation</option>
									<option
										:value="value"
										:key="key"
										v-for="(value, key) in occupations"
									>
										{{ value }}
									</option>
								</select>
							</div>
						</div> -->
						<div class="mt-2">
							<div class="select-box">
								<select class="custom-select" v-model="nationality">
									<option :value="undefined">Select Nationality</option>
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
						<!-- <div class="mt-2">
							<div class="select-box">
								<select class="custom-select" v-model="countryOfBirth">
									<option :value="undefined">Select Country of Birth</option>
									<option
										v-for="c in $store.state.candidateInfo.countries"
										:value="c.id"
										:key="c.id"
									>
										{{ c.name }}
									</option>
								</select>
							</div>
						</div> -->
						<!-- <div class="mt-2">
							<div class="select-box">
								<select class="custom-select" v-model="currentResidence">
									<option :value="undefined">Select Current Residence</option>
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
						<div class="mt-2">
							<div class="select-box">
								<select class="custom-select" v-model="currentlyLivingWith">
									<option :value="undefined">Select Currently Living With</option>
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
						<div class="mt-2">
							<div class="select-box">
								<select class="custom-select" v-model="hobbiesAndInterest">
									<option :value="undefined">Select Hobbies & interests</option>
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
						<div class="mt-2">
							<div class="select-box">
								<select class="custom-select" v-model="smokingStatus">
									<option :value="0">Select Smoking Status</option>
									<option :value="1">Yes</option>
									<option :value="2">No</option>
									<option :value="3">Former Smoker</option>
								</select>
							</div>
						</div> -->
					</template>
					<div class="row">
						<div class=" mt-12 pt-10">
							<div class="btn-adv-search-wrapper">
								<slot name="button" :clickBtn="onClickButton">
									
								</slot>
								
								<!-- <button class="btn btn-primary" @click="handleSearch">
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
									Search
								</button> -->
								<div>
									<a id="topper" class="d-noe" ref="top" href="#top"></a>
									<slot :search="resetSearch"></slot>
									<button v-if="false" @click="$refs.advDiag.openDiag()" class="btn-adv-search">Advanced Search</button>
								</div>
							</div>
							<select-team-modal
								:selectTeamModal="showActiveTeamModal"
								@handle-cancel="showActiveTeamModal = false"
								@handle-team="handleSearch"
							></select-team-modal>
							<ComingSoonModal
								title="Advanced search"
								@closeDialog="closeDialog"
								ref="advDiag"
							/>
							
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
import ComingSoonModal from "@/components/search/ComingSoonModal.vue"
import ApiService from "@/services/api.service";
import ethnicities from "@/common/ethnicities.js";
import languages from "@/common/languages.js";
import hobbies from "@/common/hobbies.js";
import { AGES, HEIGHTS } from "../../models/data";
import SelectGroup from "@/components/ui/selects/SelectGroup.vue";
import {mapGetters, mapMutations, mapActions} from 'vuex'

export default {
	name: 'SimpleSearch',
	
	props: ['user'],

	components: {
		SelectTeamModal,
		SelectGroup,
		ComingSoonModal,
		// ButtonComponent
	},

	data() {
		return {
			removePrevious: false,
			showADvancedSearchModal: false,
			showMoreSearch: false,
			ageTV: AGES,
      		heightTv: HEIGHTS,
			// min_age: this.user?.candidate_information?.preference?.pre_partner_age_min,
        	// max_age: this.user?.candidate_information?.preference?.pre_partner_age_max,
			min_age: undefined,
			max_age: undefined,
			age: [20, 40],
			heightMin: undefined,
			heightMax: undefined,
			country: undefined,
			religion: undefined,
			heightUnit: false,
			minHeightFt: null,
			maxHeightFt: null,
			ethnicities: ethnicities,
			ethnicity: undefined,
			maritalStatus: undefined,
			employmentStatus: undefined,
			occupations: null,
			occupation: undefined,
			education: "",
			languages: languages,
			motherTongue: "",
			nationality: undefined,
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
			heithtTV : HEIGHTS,
			currentPage: 1,
			gender: ''
		};
	},
	computed: {
		...mapGetters({
			pagination: 'search/getPagination',
			isFetching: "search/getLoadingStatus",
		})
	},
	created() {
		this.$store.dispatch("getCountries");
		this.$store.dispatch("getStudyLevelOptions");
		this.$store.dispatch("getReligionOptions");
		this.$store.dispatch("getOccupations");
		// const user = JSON.stringify(localStorage.getItem('user'));
		// const age = {
		// 	max: user?.candidate_information?.preference?.pre_partner_age_max,
		// 	min: user?.candidate_information?.preference.pre_partner_age_min,
		// };
		// this.resetSearch();
		// this.min_age = age.min;
		// this.max_age = age.max;
		// this.handleSearch();
	},
	methods: {
		...mapActions({
			searchUser: 'search/searchUser',
			getCandidateInfo: 'search/getCandidateInfo',
		}),
		onClickButton(data) {
			if(data.event == 'handleSearch') this.handleSearch()
		},
		closeDialog() {
			this.showADvancedSearchModal = false;
		},
		...mapMutations({
      		setComponent: 'search/setComponent',
			clearProfiles: 'search/clearProfiles',
			setProfiles: 'search/setProfiles',
			pushQuery: 'search/pushQuery',
			setLoading: 'search/setLoading',
			setSearchStatus: 'search/setSearchStatus',
			setPagination: 'search/setPaginationData'
		}),
			onDropdownChange({ name, value }) {
			console.log({ name, value });
			this[name] = value;
		},
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
		async getQuery() {
			// let _payload = `?page=0&parpage=10&min_age=${params.age_min}&max_age=${params.age_max}&active_team_id=${this.activeTeamId}`;
			let _payload = `?page=${this.currentPage}`;
            const info = await this.getCandidateInfo('v1/candidate-of-team');
			if (this.min_age != undefined) {
				_payload += `&min_age=${this.min_age}`;
			}
			if (this.max_age) {
				_payload += `&max_age=${this.max_age}`;
			}
			if (info.data.personal.per_gender_id) {
				const gender = {
					1: 2,
					2: 1
				};

				const genderpref = gender[info.data.personal.per_gender_id];
			
				this.gender = genderpref;
				 _payload += `&gender=${genderpref}`;
			}
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
			if (this.country != undefined) {
				_payload += `&country=${this.country}`;
			}
			if (this.religion != undefined) {
				_payload += `&religion=${this.religion}`;
				this.pushQuery(this.religion)
			}
			if (this.ethnicity != undefined) {
				_payload += `&ethnicity=${this.ethnicity}`;
				this.pushQuery(this.ethnicity)
			}
			if (this.maritalStatus != undefined) {
				_payload += `&marital_status=${this.maritalStatus}`;
				this.pushQuery(this.maritalStatus)
			}
			if (this.employmentStatus != undefined) {
				_payload += `&employment_status=${this.employmentStatus}`;
				this.pushQuery(this.employmentStatus)
			}
			if (this.occupation != undefined) {
				_payload += `&per_occupation=${this.occupation}`;
				this.pushQuery(this.occupation)
			}
			if (this.education != "") {
				_payload += `&education_level_id=${this.education}`;
				this.pushQuery(this.education)
			}
			if (this.motherTongue != "") {
				_payload += `&mother_tongue=${this.motherTongue}`;
			}
			if (this.nationality != undefined) {
				_payload += `&nationality=${this.nationality}`;
				this.pushQuery(this.nationality)
			}
			if (this.countryOfBirth != "") {
				_payload += `&country=${this.countryOfBirth}`;
				this.pushQuery(this.countryOfBirth)
			}
			if (this.currentResidence != "") {
				_payload += `&current_residence_country=${this.currentResidence}`;
				this.pushQuery(this.currentResidence)
			}
			if (this.currentlyLivingWith != "") {
				_payload += `&currently_living_with=${this.currentlyLivingWith}`;
				this.pushQuery(this.currentlyLivingWith)
			}
			if (this.smokingStatus != "") {
				_payload += `&smoker=${this.smokingStatus}`;
				this.pushQuery(this.smokingStatus)
			}
			if (this.hobbiesAndInterest != "") {
				_payload += `&hobbies_interests=${this.hobbiesAndInterest}`;
				this.pushQuery(this.hobbiesAndInterest)
			}

			console.log(_payload);

			return _payload;
			// this.$emit("handle-search", _payload);
		},

		setAttr(attr, value) {
			if(value) {
				this[attr] = value
			}
		},

		async handleSearch() {
			this.$emit('searchBtnClicked');
			if(this.isFetching) return;
			this.setComponent('addComponent')
            this.$emit('switchComponent', 'CandidateProfiles')
			this.$refs.top.click()
			this.currentPage = 1;
			let query = await this.getQuery();
			// this.min_age = 
			this.setSearchStatus(true)
			console.log(query, '>>>>>>>>>>>>>>>>')
			this.removePrevious = true
			this.fetchSearchData(query)
		},

		// handlePaginate() {
		// 	console.log(this.pagination.last_page, 'this.pagination.last_page')
		// 	if(this.pagination?.last_page) {
		// 		if(this.currentPage >= this.pagination.last_page ) return
		// 	}
		// 	console.log(this.pagination, 'pagination')
		// 	this.currentPage = this.pagination.current_page + 1
		// 	let query = this.getQuery();
		// 	this.removePrevious = false;
		// 	this.fetchSearchData(query)
		// },

		async fetchSearchData(query) {
			// const res = await ApiService.get(`v1/home-searches${query}`);
			try{
				this.setLoading(true);
				const res = await this.searchUser({url: `v1/home-searches${query}`, removePrevious: this.removePrevious});
				// if(res == undefined) {
				// 	this.clearProfiles()
				// }
				// if(res.data && res.data.length ) {
				// 	this.clearProfiles()
				// 	this.setProfiles(res.data)
				// 	console.log(res.pagination, '>>>>>>>>..res.pagination')
				// 	this.setPagination(res.pagination)
				// 	this.updateCurrentPage();
				// } 
				
			} catch(err) {
				this.setLoading(false);
				console.log(err.response.status)
				if (err.response.status === 404) {
                  this.clearProfiles()
				  this.setPagination({})
				}

			}
		},

		updateCurrentPage() {
			console.log(this.pagination.current_page);
			if(this.currentPage<this.pagination.last_page) {
				this.currentPage++
			}
			console.log(this.currentPage, '>>>>>>>>>current page')
		},

		onAfterChangeSlider(value) {
			this.age = value;
		},

		resetSearch () {
			this.heightMin = undefined
			this.heightMax = undefined
			this.heightMax = undefined
			this.min_age = undefined
			this.max_age = undefined
			this.religion = undefined
			this.country = undefined
			this.ethnicity = undefined
			this.maritalStatus = undefined
			this.employmentStatus = undefined
			this.occupations = null
			this.occupation = undefined
			this.nationality = undefined
		}
	}
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
// start css for advanced-search
.btn-adv-search-wrapper {
	position: fixed;
	left: 12px;
	width: 230px;
	bottom: 15px;
	.btn:first-child {
		text-align: center;
		width: 220px;
	}
	.btn-adv-search {
		margin: 5px auto auto;
		display: block;
		border-bottom: 1px solid gray;
		color: gray;
		text-align: center;
		transition: .3s;
		&:hover {
			color: black;
		}
	}
	
}

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

.search-label {
	font-size: 14px;
	margin-left: 8px;
	margin-bottom: 2px;
	opacity: 0.3;
}
</style>