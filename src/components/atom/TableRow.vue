<template>
    <tr style="position: relative">
        <td
            v-if="title.length > 20"
            :data-title="title"
            :class="textClass"
            class="text--disabled d-none d-sm-table-cell truncate" 
            :style="{width: titleWidth}"
        >
            {{ title }}
        </td>
        <td
            v-else
            :class="textClass"
            class="text--disabled d-none d-sm-table-cell truncate" 
            :style="{width: titleWidth}"
        >
            {{ title }}
        </td>
        <td class="text-subtitle-1 d-none d-sm-table-cell" :style="{width: colonWidth}">:</td>
        <td
            :class="textClass"
            class="text--secondary d-none d-sm-table-cell"
        >
            {{ value }} 
        </td>
        <div class="d-block d-sm-none">
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
            default: '170px'
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
[data-title]:hover::before {
	content: attr(data-title);
	position: absolute;
    border-radius: 8px;
	bottom: -40px;
	padding: 5px 8px;
	background: #522e8ec2;
	color: #fff !important;
	font-size: 14px;
	white-space: nowrap;
    z-index: 9999;
}
.truncate {
    transition: .3s;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
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