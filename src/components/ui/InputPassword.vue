<template>
    <a-input data-id="password-input" :type="inputType"  :placeholder="placeholder">
        <div slot="suffix" class="toggle">
            <span @click="onToggleShowHide" class="label">{{label}}</span>
        </div>
    </a-input>
</template>

<script>
export default {
    props: {
        value: {
            type: String
        },
        placeholder: {
            type: String,
            default: 'Password'
        }
    },
    data() {
        return {
            inputType: 'password',
            label: 'Show'
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
        onToggleShowHide() {
            this.inputType  = this.inputType == 'password' ? 'text' : 'password';
            this.label      = this.label == 'show' ? 'Hide' : 'Show';
        }
    }
}
</script>

<style lang="scss">
    .toggle {
        border-left: 1px solid rgb(185, 184, 184);
        margin-top: -3px;
        .label {
            background: #6159a7;
            display: inline-block;
            color: #fff;
            padding: 2px 5px;
            border-radius: 25px;
            margin-left: 6px;
            font-size: 11px;
            cursor: pointer;
            text-align: center;
            user-select: none;
            width: 40px;
            transition: .3s;
            &:hover {
                background: #6e65be;
            }
        }
    }
    input[data-id=password-input]::-webkit-input-placeholder {
        font-size: 12px;
        line-height: 12px;
    }
</style>