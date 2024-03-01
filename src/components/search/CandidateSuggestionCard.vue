<template>
<div>
    <v-card>
        <div class="d-flex flex-no-wrap ">
            <v-avatar
                class="ma-1"
                size="125"
                tile
            >
                <v-img class="rounded" src="/candidate.png"></v-img>
            </v-avatar>
            <div>
                <table>
                    <tr>
                        <td class="text--disabled text-xxs" style="width: 50px">Name</td>
                        <td class="text-xxs" style="width: 10px ">:</td>
                        <td class="text--secondary text-xxs">Static Name</td>
                    </tr>
                    <tr>
                        <td class="text--disabled text-xxs" style="width: 50px">Age</td>
                        <td class="text-xxs" style="width: 10px">:</td>
                        <td class="text--secondary text-xxs">34</td>
                    </tr>
                    <tr>
                        <td class="text--disabled text-xxs" style="width: 50px">Gender</td>
                        <td class="text-xxs" style="width: 10px">:</td>
                        <td class="text--secondary text-xxs">Male</td>
                    </tr>
                    <tr>
                        <td class="text--disabled text-xxs" style="width: 50px">Nationality</td>
                        <td class="text-xxs" style="width: 10px">:</td>
                        <td class="text--secondary text-xxs">Bangladeshi</td>``
                    </tr>
                    <tr>
                        <td class="text--disabled text-xxs" style="width: 50px">Religion</td>
                        <td class="text-xxs" style="width: 10px">:</td>
                        <td class="text--secondary text-xxs">Islam</td>
                    </tr>
                </table>
                <div class="flex justify-space-between mt-1">
                    <v-btn
                        class="text-capitalize"
                        style="width:47%; font-size: 8px;"
                        rounded
                        x-small
                        color="deep-purple darken-1"
                        dark
                    >
                        <div class="flex justify-center align-center">
                        <img style="height: 10px; margin-right: 4px;" src="@/assets/icon/connect.svg" alt="">
                            Contact
                        </div>
                    </v-btn>
                    <v-btn
                        class="text-capitalize"
                        style="width:47%; font-size: 8px;"
                        rounded
                        x-small
                        color="deep-purple darken-1"
                        dark
                    >
                        <div class="flex justify-center align-center">
                        <img style="height: 10px; margin-right: 4px;" src="@/assets/icon/connect.svg" alt="">
                            Contact
                        </div>
                    </v-btn>
                </div>
                <v-btn
                    class="text-capitalize mt-2"
                    style="width:47%; font-size: 8px;"
                    rounded
                    block
                    x-small
                    color="deep-purple darken-1"
                    dark
                >
                    <div class="flex justify-center align-center">
                    <img style="height: 10px; margin-right: 4px;" src="@/assets/icon/connect.svg" alt="">
                        Contact
                    </div>
                </v-btn>
            </div>
        </div>
    </v-card>
</div>
            
</template>

<script>
export default {
    name: 'CandidateSuggestionCard'
}
</script>

<style scoped>
.text-xxs {
    font-size: 9px;
}
</style>
