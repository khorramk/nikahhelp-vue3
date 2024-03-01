<template>
    <div>
        <fieldset>
            <legend class="text--disabled text-subtitle-2 px-1">{{ title }}</legend>
            <div v-html="info" style="text-transform: capitalize" class="text-center text--secondary text-subtitle-1"></div>
        </fieldset>
    </div>
</template>

<script>
export default {
    name: 'FieldsetCard',
    props: {
        title: {
            default: 'Information'
        },
        info: {
            default: '-'
        }
    }
}
</script>

<style scoped lang="scss">
fieldset {
    border: 1px solid #d3d0e4;
    border-radius: 10px;
    min-height: 52px;
}
legend {
    display: inline-block;
    margin: 0 auto;
    width: inherit;
    font-size: 20px;
}
</style>
