<template>
    <div>
        <v-card
            class="mx-auto"
        >
            <v-img
                class="white--text align-end"
                height="200px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            >
                <!-- <v-card-title>Top 10 Australian beaches</v-card-title> -->
            </v-img>
        </v-card>
        <v-img
            style="border: 2px solid white; margin-top: -74px; background-size: cover;"
            class="white--text align-end rounded mx-auto"
            width="250"
            height="168.75"
            :src="image"
        >
            <!-- <v-card-title>Top 10 Australian beaches</v-card-title> -->
        </v-img>
        <div class="text-center mt-5 mb-3">
            <span class="text-h5 font-weight-bold text--secondary">{{name}} </span>   
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProfileBanner',
    props: {
        name: {
            type: String,
            default: 'John doe'
        },
        image: {
            type: String,
            default: '/candidate.png'
        }
    }
}
</script>

<style scoped>
.v-image__image {
    background-size: cover ;
}
</style>
