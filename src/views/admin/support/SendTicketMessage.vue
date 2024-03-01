<template>
  <v-card
		  class="mx-auto"
   max-width="500"
  >
	  <v-textarea class="mx-2" v-model="message" placeholder="more information"></v-textarea>
	  <v-card-actions class="d-flex justify-end">
		  <v-icon @click="replyNow">
			  mdi-send
		  </v-icon>
	  </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
	name: "SendTicketMessage",

	computed: {
		...mapGetters([
			'currentTicket'
		])
	},

	data() {
		return {
			message: ''
		}
	},

	methods: {
		...mapActions([
			'replyToCustomers'
		]),

		replyNow() {
			this.replyToCustomers({
				message: this.message,
				ticket_id: this.currentTicket.id,
				user: localStorage.getItem('user')
			})
		}
	}
}
</script>

<style scoped>

</style>