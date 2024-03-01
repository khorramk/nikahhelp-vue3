<template>
    <div class="col-12 col-lg-8">
        <v-card
		  class="mx-auto"
   max-width="500"
  >
	  <v-textarea class="mx-2" v-model="message" placeholder="more information"></v-textarea>
	 <v-card-actions class="d-flex justify-end">
		  <v-icon @click="sendMessage">
			  mdi-send
		  </v-icon>
	  </v-card-actions>

  </v-card>
    </div>
  
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ApiService from '../../services/api.service'
export default {
    name: 'SendMessageForTickets',

    computed: {
        ...mapGetters([
            'getTicketId',
        ])
    },

    data() {
        return {
            message: ''
        }
    },

    methods: {
        ...mapActions([
            'backToList'
        ]),

        sendMessage() {
            ApiService.post('/v1/send-support-message', {
              message:  this.message,
              ticket_id: this.getTicketId,
              user: localStorage.getItem('user')
            })
                .then(() => {
                    this.backToList();
                })
                .catch(()=> {

                });
        },

        resolve() {
            ApiService.post('/v1/resolveTicket', {
                message_id: this.message
            })
        }
    }
}
</script>

<style>

</style>