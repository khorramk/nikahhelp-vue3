<template>
    <tr>
        <div class="">
            <v-list-item class="pl-0" two-line>
                <v-list-item-content>
                    <v-list-item-subtitle>{{title}}</v-list-item-subtitle>
                    <v-list-item-title>{{value}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </div>
    </tr>
</template>

<script>
export default {
    name: 'TableRow',
    props: {
        title: {
            type: String,
            default: 'title'
        },
        textClass: {
            type: String,
            default: 'text-caption'
        },
        titleWidth: {
            type: String,
            default: '140px'
        },
        colonWidth: {
            type: String,
            default: '20px'
        },
        value: {
            type: String
        }
    }
}
</script>

<style scoped>
.v-list-item__subtitle, .v-list-item__title {
    text-overflow: initial !important;
    word-break: break-word !important;
    overflow: visible;
    white-space: normal;
}
td {
    vertical-align: baseline;
}
</style>