<template>
    <v-card class="p-3">
        <table>
            <TableRow 
                title="Father's Profession"
                textClass="text-subtitle-1"
                :value="family.father_profession"
            />
            <TableRow 
                title="Mother's Profession"
                textClass="text-subtitle-1"
                :value="family.mother_profession"
            />
            <TableRow 
                title="Siblings"
                textClass="text-subtitle-1"
                :value="family.siblings_desc"
            />
            <TableRow 
                title="Ancestral home same as country of birth?"
                textClass="text-subtitle-1"
                :value="family.country_of_origin"
            />
        </table>
    </v-card>
</template>

<script>
import TableRow from '@/components/atom/TableRow'
export default {
    name:'FamilyInfoTable',
    components: {
        TableRow
    },
    props: {
        data: {
            type: Object
        }
    },
    computed: {
        family() {
            return this.data?.family ? this.data.family : {}
        }
    }
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
