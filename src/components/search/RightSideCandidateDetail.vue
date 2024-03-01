<template>
    <v-card
        style="height: calc(100vh - 97px); overflow-y: auto; position: fixed; right: 10px;"
        class="mx-auto"
        width="317"
    >
        <div class="pt-3 pl-2 pr-1">
            <p class="text-subtitle-1 mb-2 text--secondary">This Profile Partener Preferences</p>
            <hr style="margin: 5px 0px !important;">
             <table class="partner-prefs"> 
                <TableRow 
                    title="Age"
                    :value="profile.preference.pre_partner_age_min + ' to ' + profile.preference.pre_partner_age_max"
                />
                <TableRow 
                    title="Height"
                    :value="getMinHeight + ' to ' + getMaxHeight"
                />
                <TableRow 
                    title="Preferred country"
                    :value="getCountry()"
                />
                <TableRow 
                    title="Not Preferred country"
                    :value="getBlockedCountry()"
                />
                <TableRow 
                    title="Religion"
                    :value="getReligion()"
                />
                <TableRow 
                    title="Ethnicity"
                    :value="profile.preference.pre_ethnicities"
                />
                <TableRow 
                    title="Nationality"
                    :value="getNationality()"
                />
                <TableRow 
                title="Education"
                :value="preference.pre_study_level"
                />
                <TableRow 
                    title="Accept Divorcee?"
                    :value="preference.pre_preferred_divorcee == 1 ? 'Yes' : 'NO'"
                />
                <TableRow 
                    v-if="preference.pre_preferred_divorcee == 1"
                    title="Accept Divorcee with children?"
                    :value="preference.pre_preferred_divorcee_child == 1 ? 'Yes' : 'NO'"
                />
                <TableRow 
                    title="Occupation"
                    :value="getProfession()"
                />
                <!-- <tr>
                    <td class="text--disabled text-subtitle-1" style="width: 50px">Country & Cities Preferred</td>
                    <td class="text-subtitle-1" style="width: 20px ">:</td>
                    <td class="text--secondary text-subtitle-1">
                        <div
                            v-for="(country, index) in countries || []"
                            :key="country.id"
                            >
                                {{ country.name }},
                                {{
                                candidateData.preference.preferred_cities[index]
                                    .name
                                }}
                        </div>
                    </td>
                </tr> -->
            
                <!-- <tr>
                    <td class="text--disabled text-subtitle-1" style="width: 50px">Willing to Relocate</td>
                    <td class="text-subtitle-1" style="width: 20px ">:</td>
                    <td class="text--secondary text-subtitle-1"></td>
                </tr> -->
            </table>
        </div>
    </v-card>
</template>

<script>
import {mapGetters} from 'vuex'
import TableRow from '@/components/atom/ListItem'
import { HEIGHTS } from "@/models/data";
export default {
    name: 'RightSideCandidateDetail',
    components: {
        TableRow
    },
    data: () => ({
      HEIGHTS  
    }),
    computed: {
        ...mapGetters({
            profile: 'search/getSelectedProfileInfo'
        }),
        infoArr() {
            return Object.keys(this.profile)
        },
        preference() {
            return this.profile.preference
        },
        personal() {
            return this.profile.personal
        },
        getMaxHeight() {
            return this.preference.pre_height_max ? this.HEIGHTS[this.preference.pre_height_max - 1].name : ''
        },
        getMinHeight() {
            return this.preference.pre_height_min ? this.HEIGHTS[this.preference.pre_height_min - 1].name : ''
        },
        getHeightPersonal() {
            return this.personal.per_height ? this.HEIGHTS[this.personal.per_height - 1].name : ''
        }
    },
    methods: {
        getCountry() {
            return this.preference.preferred_countries.length > 0
                ? this.preference.preferred_countries.map((c) => c.name).join(", ")
                : "None";
        },
        getNationality() {
            let cityArr = [];
            if(this.profile.preference.preferred_nationality.length) {
                this.profile.preference.preferred_nationality.map(city => {
                    cityArr.push(city.name)
                })
            }
            return cityArr.join(', ')
        },
        getProfession() {
            if(this.profile.preference.pre_occupation.length) {
                return JSON.parse(this.profile.preference.pre_occupation).join(', ')
            }
            return ''
        },
        getReligion() {
            if(this.profile.preference.pre_partner_religion_id.length) {
                return this.profile.preference.pre_partner_religion_id.join(', ')
            }
            return 'None'
        },
        getBlockedCountry() {
            return  this.profile.preference.bloked_countries.length > 0
                ? this.profile.preference.bloked_countries.map((c) => c.name).join(", ")
                : "None";
        },
    }
}
</script>
<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.v-sheet.v-card:not(.v-sheet--outlined)::v-deep {
    box-shadow: none !important;
    border: 2px solid #dddddd78 !important;
}

.partner-prefs::v-deep {
    tr > div {
        padding-bottom: 5px !important;
    }
    .v-list-item__subtitle {
        margin-bottom: 10px !important;
    }
    .v-list-item__title {
        color: rgba(0, 0, 0, 0.7) !important;
    }

    .v-list-item--two-line {
        margin-right: 0px !important;
        padding-left: 12px !important;
        padding-bottom: 5px !important;
        padding-right: 0px !important;
        border-radius: 10px;
        background: $primary_lite_5;

        .v-list-item__content {
            margin: 0px !important;
            padding: 0px !important;
        }
    }
}
</style>
