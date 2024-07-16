<template>
	<div>
		<div v-if="getWindowWidth() <=  575">
			<div class="d-flex justify-content-between">
				<h5 class="text-xl-h3 text-h4 font-weight-bold text--disabled mb-2">
					{{isSearched ? 'Results' : 'Suggestion'}}
				</h5>
				<ButtonComponent
					class="mobile-margin"
					iconHeight="14px"
					:isSmall="true"
					:responsive="false"
					title=""
					icon="/assets/icon/search-love-secondary.svg"
					@onClickButton="handleSerachClicked"
				/>
			</div>
			<span class="text--secondary text-h6">
				{{ pagination.total_items ? pagination.total_items : 0 }} Matches for you
			</span>
		</div>
		<h4 v-else class="text-xl-h3 text-h4 font-weight-bold text--disabled mb-2">
			{{isSearched ? 'Search Results' : 'Suggestion'}}
		</h4>
		<span v-if="isSearched && getWindowWidth() > 575" class="text--secondary text-h6">
			Matches for your requirements: {{ pagination.total_items ? pagination.total_items : 0 }} results
		</span>
		<!-- <div class="query-tag flex flex-wrap justify-end align-center my-4">
			<Tag v-for="(item, index) in query" :key="index" :text="item"/>
			<a
				class="query-limit"
				@click.prevent="showAllQuery = !showAllQuery"  
				href="#"
			>
				{{ showAllQuery ? 'See less' : 'See more' }}
			</a>
		</div> -->
		<!-- start advanced search -->
		<div class="row mt-2">
			<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
				<div class="row px-2">
					<div v-for="(profile, n) in  profiles" :key="n" class="col-sm-12 col-md-6 col-lg-4 px-2">
						<CandidateGrid
							:candidate="profile"
							:role="role"
              				@socketNotification="socketNotification"
							@removeCandidateFromResult="removeCandidateFromResult"
							@switchComponent="()=>$emit('switchComponent', 'ProfileDetail')"
						/>
					</div>
				</div>
			</div>
		</div>
		<!-- end advanced search -->
	</div>
</template>

<script>
import CandidateGrid from '@/components/search/NewCandidateCard.vue';
import ButtonComponent from '../atom/ButtonComponent.vue';
// import Tag from '@/components/atom/Tag'
import {mapGetters, mapMutations} from 'vuex';

export default {
	name: 'CandidateProfiles',
	components: {
		CandidateGrid,
		ButtonComponent,
		// Tag
	},
	data: () => ({
		showAllQuery: false
	}),
	props: ['role'],
	computed: {
		...mapGetters({
			profiles: 'search/getProfiles',
			// pagination.total_items: 'search/getProfileCount',
			pagination: 'search/getPagination',
			queryArr: 'search/getQueryArr',
			isSearched: 'search/getSearchStatus'
		}),
		limitedProfiles() {
			return this.profiles.slice(0,10);
		},

		query() {
			let length = this.queryArr.length;
			if(length > 5) {
				if(this.showAllQuery) {
					return this.queryArr
				}
				return this.queryArr.slice(0,5);
			}
			return this.queryArr
		},
	},
	methods: {
		...mapMutations({
			clearProfiles: 'search/clearProfiles',
			setProfiles: 'search/setProfiles',
		}),
    	socketNotification(data) {
			this.$emit('socketNotification', data);
		},
		removeCandidateFromResult(userId) {
			let profiles = this.profiles.filter(item => item.user_id!== userId);
			this.clearProfiles();
			this.setProfiles(profiles);

		},
		handleSerachClicked() {
			this.$emit('searchBtnClicked');
		},
		getWindowWidth() {
			return window.innerWidth;
		},

	}
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
// start css for advanced-search
.query-tag {
	.query-limit {
		color: $bg-brand;
		text-decoration: underline;
		width: 68px;
		text-align: right;
		transition: .3s;
		&:hover {
			color: $border-danger;
		}
	}
}
.mobile-margin {
	img {
		margin: 0px 10px !important;
	}
}
</style>