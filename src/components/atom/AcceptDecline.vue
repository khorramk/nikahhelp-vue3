<template>
    <div>
        <v-card
            width="100%"
        >
            <div class="flex justify-space-around align-center p-1">
                <p class="mb-0">Connection  History:</p>
                <p style="margin-top: 20px" v-if="connectionStatus.teamConnectStatus == 0">Pending</p>
                <p style="margin-top: 20px" v-if="connectionStatus.teamConnectStatus == 1">Accepted</p>
                <div v-if="teamConnectStatus == 2">
                    <button v-if="connectionStatus.connectionRequestSendType == 0" class="mr-2">
                        <div  class="flex flex-column align-center">
                            <img
                                class=""
                                style="background-color:#e54e90; padding: 5px; border-radius: 5px"
                                width="35" src="@/assets/icon/thumb-down.svg" 
                                alt="">
                            <span style="font-size:10px; color: #e54e90">We Declined</span>
                        </div>
                    </button>
                    <button v-if="connectionStatus.connectionRequestSendType == 1">
                        <div class="flex flex-column align-center">
                            <img
                                class=""
                                style="background-color:#605aa0; padding: 5px; border-radius: 5px"
                                width="35" src="@/assets/icon/thumb-down.svg" 
                                alt="">
                            <span style="font-size:10px; color: #605aa0;">They Declined</span>
                        </div>
                    </button>
                </div> 
            </div>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'AcceptDecline',
    computed: {
        profile() {
            return this.$store.state.search.profileDetails
        },

        connectionStatus() {
            return this.profile.status
        }
    }
}
</script>
