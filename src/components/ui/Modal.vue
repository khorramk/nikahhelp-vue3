<template>
  <a-modal
        :dialog-style="{ top: '60px' }"
        :visible="localModel"
        :width="width"
        :footer="null"
        :bodyStyle="{padding: '15px', boxShadow: 'rgb(0 0 0 / 25%) 0px 0px 20px 7px'}"
        @ok="$emit('ok')"
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
            this.$emit('cancel');
        }
    }
}
</script>

<style lang="scss" scoped>
	.modal-close-icon {
		position: absolute;
		top: 0px;
		right: 0px;
	}
</style>