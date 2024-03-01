<template>
     <div class="theme-clr p-2 d-flex justify-space-between align-items-center px-3">
        <button @click="goBack" class="back-button rounded-full bg-gray-100 px-2 py-1 border-2 border-primary-light">
            <div class="d-flex items-center">
                <img src="@/assets/icon/left-arrow.png" class="h-5 mr-1" alt="">
                <p class="color-primary m-0 f-10 border-b">Back</p>
            </div>
        </button>
        <p class="text-gray-100 mr-4 text-white f-14 m-0">Search Manager</p>
    </div>
</template>

<script>
export default {
    name: 'SidebarHeader',
    methods: {
        goBack() {
            // this.$router.push({name: 'ManageTeam'});
            this.$emit('onClickBack')
        }
    }
}
</script>


<style scoped lang="scss">
.theme-clr {
    background: #522e8e;
}
.rounded-full{
    border-radius: 9999px;
}
.border-b {
    transition: .3s;
    &:hover {
        border-bottom: 1px solid #6159a7;
    }
}
.f-10 {
    font-size: 10px;
}
.f-14 {
    font-size: 14px;
}
.h-5 {
    height: .70rem;
}
.mr-1 {
    margin-right: 0.25rem;
}
.bg-gray-100 {
    --tw-bg-opacity: 1;
    background-color: rgba(243,244,246,var(--tw-bg-opacity));
}
.border-primary-light {
    --tw-border-opacity: 1;
    border-color: rgba(176,171,211,var(--tw-border-opacity));
}
.border-2 {
    border-width: 2px;
}
.back-button {
    height: 19px;
    p {
        line-height: 1.2;
    }
}
</style>
