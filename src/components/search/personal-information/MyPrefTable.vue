<template>
    <v-card class="p-3">
        <table>
            <TableRow 
                title="Age"
                textClass="text-subtitle-1"
                :value="preference.pre_partner_age_min + ' to ' + preference.pre_partner_age_max"
            />
            <TableRow 
                title="Height"
                textClass="text-subtitle-1"
                :value="getMinHeight + ' to ' + getMaxHeight"
            />
            <TableRow 
                title="Preferred country"
                textClass="text-subtitle-1"
                :value="getCountry()"
            />
            <TableRow 
                title="Not Preferred country"
                textClass="text-subtitle-1"
                :value="getBlockedCityCountry()"
            />
            <TableRow 
                title="Religion"
                textClass="text-subtitle-1"
                :value="getReligion()"
            />
            <TableRow 
                title="Ethnicity"
                textClass="text-subtitle-1"
                :value="preference.pre_ethnicities"
            />
            <TableRow 
                title="Nationality"
                textClass="text-subtitle-1"
                :value="getNationality()"
            />
            <TableRow 
                title="Education"
                textClass="text-subtitle-1"
                :value="preference.pre_study_level"
            />
            <TableRow 
                title="Accept divorcee?"
                textClass="text-subtitle-1"
                :value="preference.pre_preferred_divorcee == 1 ? 'Yes' : 'NO'"
            />
            <TableRow
                v-if="preference.pre_preferred_divorcee == 1"
                title="Accept a divorcee with children?"
                textClass="text-subtitle-1"
                :value="preference.pre_preferred_divorcee_child == 1 ? 'Yes' : 'NO'"
            />
            <TableRow 
                title="Employment Status"
                textClass="text-subtitle-1"
                :value="preference.pre_employment_status"
            />
            <TableRow 
                title="Occupation"
                textClass="text-subtitle-1"
                :value="getProfession()"
            />
            <!-- <tr>
                <td class="text--disabled text-subtitle-1" style="width: 50px">Willing to Relocate</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1"></td>
            </tr> -->
        </table>
    </v-card>
</template>

<script>
import { HEIGHTS } from "@/models/data";
import TableRow from '@/components/atom/TableRow'
export default {
    name:'MyPrefTable',
    data: () => ({
      HEIGHTS  
    }),
    components: {
      TableRow  
    },
    computed: {
        getMaxHeight() {
            return this.preference.pre_height_max ? this.HEIGHTS[this.preference.pre_height_max - 1].name : ''
        },
        getMinHeight() {
            return this.preference.pre_height_min ? this.HEIGHTS[this.preference.pre_height_min - 1].name : ''
        }
    },
    methods: {
         getProfession() {
            let arr = []; 
            if(this.preference.pre_occupation.length) {
                if(typeof this.preference.pre_occupation == 'string') {
                    arr = JSON.parse(this.preference.pre_occupation).map(i => i)
                }
                if(typeof this.preference.pre_occupation == 'object') {
                    arr = this.preference.pre_occupation.map(i => i)
                }
                
            }
            
            return arr.join(', ')
        },
    getCountry() {
      return this.preference.preferred_countries.length > 0
        ? this.preference.preferred_countries.map((c) => c.name).join(", ")
        : "None";
    },
    getBlockedCityCountry() {
      return  this.preference.bloked_countries.length > 0
        ? this.preference.bloked_countries.map((c) => c.name).join(", ")
        : "None";
    },
        getReligion() {
            if(this.preference.pre_partner_religion_id.length>0) {
                return this.preference.pre_partner_religion_id.join(', ')
            }
            return ''
        },
        getNationality() {
            let cityArr = [];
            if(this.preference.preferred_nationality.length) {
                this.preference.preferred_nationality.map(city => {
                    cityArr.push(city.name)
                })
            }
            if (cityArr.length < 1) {
                cityArr.push("Don't Mind");
            }

            return cityArr.join(', ')
        },
    },
    props: {
        countries: {
            type: Array,
            default() {
                return []
            }
        },
        preference: {
            type: Object,
            default () {
                return {}
            }
        }
    },
}
</script>

<style scoped>
table {
    table-layout: fixed;
    width: 100%;
}
td {
    vertical-align: top;
}
</style>
