<template>
    <!-- <div> -->
        <v-card :style="{height: height}" class="p-3">
            <div class="flex justify-space-between">
                <p class="text--disabled text-subtitle-1">{{ title }}</p>
                <!-- <ButtonComponent
                    v-if="showDownloadBtn"
                    iconHeight="14px"
                    :isSmall="true"
                    title="Download PDF"
                    icon="/assets/icon/download-secondary.svg"
                    customEvent="editProfile"
                    :isBlock="false"
                    @onClickButton="$emit('onClickDownload')"
                /> -->
            </div>
            <p class="text--secondary text-subtitle-1">
                {{ detail }}
            </p>
        </v-card>
    <!-- </div> -->
</template>

<script>
import ButtonComponent from '@/components/atom/ButtonComponent'
export default {
    name: 'CardInfo',
    components: {
        ButtonComponent
    },
    props: {
        title: {
            default : 'More about my family'
        },
        detail: {
            default : ''
        },
        height: {
            default: '100%'
        },
        showDownloadBtn: {
            default: false
        }
    }
}
</script>
