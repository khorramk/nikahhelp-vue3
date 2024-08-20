<template>
  <a-modal
    wrapClassName="custom-modal-wrapper"
    :dialog-style="{ top: '60px' }"
    v-model:open="localModel"
    :width="width"
    :footer="null"
    :bodyStyle="{padding: '15px', boxShadow: 'rgb(0 0 0 / 25%) 0px 0px 20px 7px'}"
    @cancel="onCancel"
    centered
>   
		<template v-slot:closeIcon>
			<img class="modal-close-icon" width="25" src="@/assets/icon/edit-close.svg" alt="">
		</template>
			<slot />
		</a-modal>
</template>

<script>
export default {
    props: {
        value: {
            type: Boolean,
            required: true
        },
        width: {
            type: [Number, String],
            default: () => 800
        }
    },
    computed: {
        localModel: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input', value)
            }
        }
    },
    methods: {
        onCancel() {
            this.localModel = false;
            this.$emit('close');
        }
    }
}
</script>

<style lang="scss">
	.modal-close-icon {
		position: absolute;
		top: 0px;
		right: 0px;
	}

    .custom-modal-wrapper .ant-modal-content{
        padding: 0px !important;
    }

</style>