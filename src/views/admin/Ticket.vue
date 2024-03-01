<template>
	<v-card
			class="mx-auto mt-3"
			max-width="700"
	>
		<v-card
				class="mb-3"
				v-for="ticket in getTickets" :key="ticket.id">


			<v-list-item>
				<v-list-item-title>
					<v-icon>
						mdi-bug
					</v-icon>
					{{ ticket.issue_type }}
				</v-list-item-title>
				<v-list-item-action>
						<v-icon large color="purple" @click="viewTicket(ticket)">
							mdi-eye-outline
						</v-icon>
				</v-list-item-action>
			</v-list-item>

		</v-card>
	</v-card>

</template>

<script>
import { mapGetters } from "vuex";
export default {
	name: "Ticket",

	computed: {
		...mapGetters([
				'getTickets'
		])
	},

	methods: {
		 viewTicket(ticket) {
			 this.$store.dispatch('viewSingleTicket', ticket);
			 this.$router.push({ name: 'ticketDetails'});
		 }
	}
}
</script>

<style scoped>

</style>