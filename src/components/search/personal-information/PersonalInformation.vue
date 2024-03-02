<template>
    <div class="mt-10 pb-5 w-100">
        <v-row class="mb-5">
            <v-col class="pt-0" cols="12" md="6">
                <div class="d-flex justify-space-between d-md-none buttons-div">
                    <OutlinedButton
                        :name="copyProfileText"
                        customEvent="onClickCopyText"
                        @onClickCopyText="onClickCopyText"
                    />
                    <OutlinedButton 
                        name="Team Infor"
                        customEvent="onClickTeamDetail"
                        @onClickTeamDetail="onClickTeamDetail"
                    />
                </div>
                <div class="d-none d-md-flex buttons-div">
                    <OutlinedButton
                        class="mr-2"
                        :name="copyProfileText"
                        customEvent="onClickCopyText"
                        @onClickCopyText="onClickCopyText"
                    />
                    <OutlinedButton 
                        name="Team Info"
                        customEvent="onClickTeamDetail"
                        @onClickTeamDetail="onClickTeamDetail"
                    />
                </div>
            </v-col>
            <v-col class="pt-0 buttons-div flex justify-end" cols="12" md="6">
                <!-- <Scroller /> -->
                <div class="d-none d-md-flex justify-end">
                    <a
                        class="navigate mobile-margin mr-2"
                        href="#family-information"
                    >
                        <div class="navigate-name text-center">
                        Family Info
                        <img src="/assets/icon/navigate-bottom.svg" alt="">
                        </div>
                    </a>
                    <a
                        class="navigate mobile-margin"
                        href="#my-partner-pref"
                    >
                        <div class="navigate-name text-center">
                            My Pref
                            <img src="/assets/icon/navigate-bottom.svg" alt="">
                        </div>
                    </a>
                </div>

                <div class="d-flex d-md-none flex justify-space-between">
                    <a
                        class="navigate mobile-margin mr-2"
                        href="#family-information"
                    >
                        <div class="navigate-name text-center">
                        Family Info
                        <img src="/assets/icon/navigate-bottom.svg" alt="">
                        </div>
                    </a>
                    <a
                        class="navigate mobile-margin"
                        href="#my-partner-pref"
                    >
                        <div class="navigate-name text-center">
                            My Pref
                            <img src="/assets/icon/navigate-bottom.svg" alt="">
                        </div>
                    </a>
                </div>
            </v-col>
        </v-row>
        <!-- <div class="flex flex-wrap ">
            <div class="flex justify-end">
                <OutlinedButton
                    :name="copyProfileText"
                    customEvent="onClickCopyText"
                    @onClickCopyText="onClickCopyText"
                />
                <OutlinedButton 
                    name="Represented By:"
                    customEvent="onClickCopyText"
                />
            </div>
            <Scroller />
        </div> -->
        <fieldset class="">
            <legend class="ml-8 px-1"><span>Personal Information</span></legend>
            <v-container fluid class="pt-0 px-5 info-div">
                <v-row dense>
                    <v-col class="pt-1" cols="12" md="12">
                        <PersonalInformationTable :data="profileDetails"/>
                    </v-col>
                    <v-col ref="family-information" class="pt-1" cols="12" md="12">
                        <MoreAbout :data="profileDetails"/>
                    </v-col>
                    <v-col class="pt-1 mb-2" cols="12">
                        <CardInfo
                            title="More about me"
                            :detail="profileDetails.personal.per_about" class="mt-2"/>
                    </v-col>
                    <v-col class="pt-1 mb-2" cols="12">
                        <CardInfo
                            :showDownloadBtn="true"
                            title="Additional Information"
                            class="mt-2"
                            :detail="profileDetails.more_about.per_additional_info_text"
                            @onClickDownload="onClickDownload"
                        />
                    </v-col>
                    <v-col class="pt-1 mb-5" cols="12" md="6">
                        <CardInfo
                            title="I'm thankful for"
                            :detail="profileDetails.personal.per_thankfull_for"
                        />
                    </v-col>
                    <v-col class="pt-1 mb-5" cols="12" md="6">
                        <CardInfo
                            title="How I improve myself?"
                            :detail="getHowIImprove()"
                        />
                    </v-col>
                </v-row>
            </v-container>
        </fieldset>

        <fieldset id="family-information" class="-mt-15">
            <legend class="ml-8 bg-white px-1"><span>Family Information</span></legend>
            <v-container fluid class="pt-0 px-5 info-div">
                <v-row dense>
                    <v-col class="pt-1 mb-5" cols="12" md="12">
                        <FamilyInfoTable :data="profileDetails"/>
                    </v-col>
                    <v-col class="pt-1 mb-5" cols="12" md="12">
                        <CardInfo :detail="profileDetails.family.family_info"/>
                    </v-col>
                </v-row>
            </v-container>
        </fieldset>

        <fieldset class="-mt-15">
            <legend id="my-partner-pref" class="ml-8 bg-white px-1"><span>My partner preference</span></legend>
            <v-container fluid class="pt-0 px-5 info-div">
                <v-row dense>
                    <v-col class="pt-1" cols="12" md="12">
                        <MyPrefTable
                            :preference="profileDetails.preference"
                            :countries="profileDetails.preference.preferred_countries"
                        />
                    </v-col>
                    <v-col class="pt-1" cols="12" md="12">
                        <CardInfo
                            title="What I'm Looking for"
                            :detail="profileDetails.preference.pre_description"
                        />
                    </v-col>
                    <v-col class="pt-1" cols="12">
                        <CardInfo
                            title="Other requirements"
                            :detail="profileDetails.preference.pre_other_preference"
                        />
                    </v-col>
                    <v-col class="pt-1" cols="12">
                        <v-card class="px-3 py-5">
                            <h5 class="text--disabled">More about preferred partner</h5>
                            <p class="text--disabled">How Important following characters are to me</p>
                            <!-- Character -->
                            <!-- <rating-component
                            title="Strength of character from a moral point of view"
                            :value="
                                profileDetails.preference.pre_strength_of_character_rate
                            "
                            :valueString="
                                profileDetails.preference
                                .pre_strength_of_character_rate_string
                            "
                            ></rating-component> -->
                            <!-- Looks and Apperance -->
                            <rating-component
                            title="Looks, appearance & attractiveness"
                            :value="
                                profileDetails.preference.pre_look_and_appearance_rate
                            "
                            :valueString="
                                profileDetails.preference
                                .pre_look_and_appearance_rate_string
                            "
                            ></rating-component>
                            <!-- Religiosity/Faith -->
                            <rating-component
                            title="Religiosity / Faith"
                            :value="
                                profileDetails.preference.pre_religiosity_or_faith_rate
                            "
                            :valueString="
                                profileDetails.preference
                                .pre_religiosity_or_faith_rate_string
                            "
                            ></rating-component>
                            <!-- Manners, Social skills and ethics -->
                            <rating-component
                            title="Manners, Social skills and ethics"
                            :value="
                                profileDetails.preference
                                .pre_manners_socialskill_ethics_rate
                            "
                            :valueString="
                                profileDetails.preference
                                .pre_manners_socialskill_ethics_rate_string
                            "
                            ></rating-component>
                            <!-- Emotional Maturity and compatibility -->
                            <rating-component
                            title="Emotional Maturity and general intelligence"
                            :value="
                                profileDetails.preference.pre_emotional_maturity_rate
                            "
                            :valueString="
                                profileDetails.preference
                                .pre_emotional_maturity_rate_string
                            "
                            ></rating-component>
                            <!-- Good Listener -->
                            <rating-component
                            title="Good Listener"
                            :value="profileDetails.preference.pre_good_listener_rate"
                            :valueString="
                                profileDetails.preference.pre_good_listener_rate_string
                            "
                            ></rating-component>
                            <!-- Good talker -->
                            <rating-component
                            title="Good communicator"
                            :value="profileDetails.preference.pre_good_talker_rate"
                            :valueString="
                                profileDetails.preference.pre_good_talker_rate_string
                            "
                            ></rating-component>
                            <!-- Willing to learn -->
                            <rating-component
                            title="Willing to learn"
                            :value="profileDetails.preference.pre_wiling_to_learn_rate"
                            :valueString="
                                profileDetails.preference.pre_wiling_to_learn_rate_string
                            "
                            ></rating-component>
                            <!-- Family or Social Status-->
                            <rating-component
                            title="Family or Social Status"
                            :value="
                                profileDetails.preference.pre_family_social_status_rate
                            "
                            :valueString="
                                profileDetails.preference
                                .pre_family_social_status_rate_string
                            "
                            ></rating-component>
                            <!-- Employment or Wealth-->
                            <rating-component
                            title="Employment and financial stability"
                            :value="
                                profileDetails.preference.pre_employment_wealth_rate
                            "
                            :valueString="
                                profileDetails.preference
                                .pre_employment_wealth_rate_string
                            "
                            ></rating-component>
                            <!-- Education -->
                            <rating-component
                            title="Education and academic accomplishments"
                            :value="profileDetails.preference.pre_education_rate"
                            :valueString="
                                profileDetails.preference.pre_education_rate_string
                            "
                            ></rating-component>
                        </v-card>
                        </v-col>
                </v-row>
            </v-container>
        </fieldset>
        <!-- team info modal-->
        <a-modal 
            :visible="showTeamInfo" 
            :closable="true"
            title="Team Info" 
            @ok="showTeamInfo = false" 
            @cancel="showTeamInfo = false"
            :ok-button-props="{ disabled: true }"
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
                        >
                    </v-img>
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
    </div>
</template>

<script>
import OutlinedButton from '@/components/atom/OutlinedButton'
import PersonalInformationTable from './PersonalInformationTable.vue'
import FamilyInfoTable from './FamilyInfoTable.vue'
import MyPrefTable from './MyPrefTable.vue'
import CardInfo from '@/components/atom/CardInfo'
import MoreAbout from './MoreAbout.vue'
import {mapGetters} from 'vuex'
import Scroller from  '@/components/atom/Scroller'
import RatingComponent from "@/components/profile/RatingComponent.vue";
import ComingSoonModal from "@/components/search/ComingSoonModal"
import improveMyselfThings from '@/common/improveMyselfThings'
import { dateFromDateTime } from "@/common/helpers.js";

export default {
    name: 'PersonalInformation',
    data(){
        return {
            copyProfileText: 'Copy Profile URL',
            improveMyselfThings,
            closeDialog: false,
            showTeamInfo: false,
            profile: {},
            token: '',
        }
    },
    components: {
        PersonalInformationTable,
        FamilyInfoTable,
        MyPrefTable,
        MoreAbout,
        CardInfo,
        Scroller,
        RatingComponent,
        OutlinedButton,
        ComingSoonModal
    },
    created() {
        this.loadUserProfile();
        this.token = JSON.parse(localStorage.getItem('token'));
    },
    computed: {
        ...mapGetters({
            profileDetails:'search/getProfileDetails',
        }),
        domain() {
            return window.location.origin
        }
        
    },
    methods: {
        dateFromDateTime,
        async loadUserProfile() {
            try {
                const id = this.profileDetails.id;
                const payload = {
                    id,
                };
                const response = await this.$store.dispatch("getUserProfile", payload);
                console.log(response);
                // this.userProfile = response.data.user;
                this.profile = response.data;
            } catch (error) {
                this.error = error.message || "Something went wrong";
                //alert(this.error);
                this.$error({
                    title: "Error!",
                    content: this.error,
                });
            }
        },
        getHowIImprove() {
            let text = [];
            let items = [];
            if(this.profileDetails.more_about?.per_improve_myself?.length) {
                this.profileDetails.more_about.per_improve_myself.map(i => {
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
        // onClickTeamDetail() {
        //     this.$refs.advDiag.openDiag()
        // },
        onClickTeamDetail() {
            if(this.profile.team !== "") {
                this.showTeamInfo = true;
            } else {
                this.$error({
                    title: 'This Candidate has no team!',
                    center: true,
                });
            }
        },
        onClickDownload() {
            if(this.profileDetails.more_about?.per_additional_info_doc == null) {
                this.$error({
                title: 'Link not available!',
                center: true,
                });
            }

            if(this.profileDetails.more_about?.per_additional_info_doc) {
                window.open(this.profileDetails.more_about?.per_additional_info_doc, '_blank')
            }
        },
        onClickCopyText() {
            this.copyProfileText = 'Copy successful'
            navigator.clipboard.writeText(this.domain+'/user/profile/'+this.profileDetails.user_id);
            this.copied = true;
            setTimeout(() => {
                this.copyProfileText = 'Copy Profile URL';
            }, 3000);
        },
        scrollMeTo(refName) {
            console.log('>>>>>>>>>>>')
            var element = this.$refs[refName];
            var top = element.offsetTop;
            console.log(top, '>>>>>>>>>>>>>top')
            console.log(document.getElementById('bbx'))
            document.getElementById('bbx').scrollTop = top-400;
        }
    }
}
</script>

<style scoped lang="scss">
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

.buttons-div {
    .navigate {
		background: #6158a7;
		color: #fff;
		border-radius: 20px;
		font-size: 12px;
        width: 150px;
        min-height: 35px;
		padding: 7px 5px;
		border: 1px solid white;
		box-shadow: 0px 1px 3px #B1aaaa;
		transition: none !important;
        line-height: 1.6;

		.navigate-name {
            color: inherit;
            transition: none !important;
            &:hover {
                color: inherit;
            }
		}

		img {
            margin-bottom: 1px;
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

