<template>
  <div class="col-12 col-lg-8">
	<h2>Ticket Messages</h2>
	<v-card class="d-flex justify-space-between" flat>
		<nav aria-label="breadcrumb">
			<ol class="breadcrumb">
				<li class="breadcrumb-item" @click="backToList">Tickets</li>
				<li class="breadcrumb-item" @click="goTo(getUserTicket.id)">Selected Tickets</li>
				<li class="breadcrumb-item active" aria-current="page">Ticket Messages</li>
			</ol>
		</nav>
		<v-card-actions class="d-flex justify-end">
        <v-tooltip top v-if="getUserTicket.resolve < 1">
			<template v-slot:activator="{ on, attrs }">
				<v-icon
					class="mr-4"
					color="success"
					v-bind="attrs"
					v-on="on"
					@click="resolveTicket(ticketMessages[0].ticket_id)"
				>
				mdi-check-circle
				</v-icon>
			</template>
			<span>Resolve ticket</span>
			</v-tooltip>
			<v-tooltip top v-else>
			<template v-slot:activator="{ on,  attrs }">
				<v-icon large 
						v-bind="attrs"
						v-on="on"
						color="warning"
				>
					mdi-circle
				</v-icon>
			</template>
			<span>Pending</span>
		</v-tooltip>
		</v-card-actions>
		<v-tooltip top >
			<template v-slot:activator="{ on,  attrs }">
				<v-icon large 
						@click="messageReply(getUserTicket.id)"
						v-bind="attrs"
						v-on="on"
				>
					mdi-message-reply
				</v-icon>
			</template>
			<span>Send message</span>
		</v-tooltip>
		
	</v-card>
	  <v-card v-for="message in ticketMessages" :key="message.id" class="mb-3">
		<v-list-item>
			<v-list-item-title>
				{{ message.message}}
			</v-list-item-title>
			<v-list-item-title>
				reply by:
				{{ getName(message.user) }}
			</v-list-item-title>
		</v-list-item>
	  </v-card>
	  <v-dialog v-model="systemError"  
	  			max-width="290" 
				transition="dialog-bottom-transition"
				overlay-color="purple">
		<v-card>
			<v-card-text>
				System error
			</v-card-text>
			<v-btn @click="error">
				close
			</v-btn>
		</v-card>
	  </v-dialog>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
	name: "TicketMessages",

	data() {
		return {
			systemError: false
		}
	},

	mounted() {
		this.systemError = this.hasError;
		document.addEventListener('click', () => {
			this.$store.dispatch('systemErrorResolved', false);
		});
	},

	computed: {
		...mapGetters([
				'ticketMessages',
				'hasError',
				'getUserTicket'
		]),

		accountDetails() {
			return JSON.parse(localStorage.getItem('user'));
		}
	},

	methods: {
		...mapActions([
			'backToList',
			'goTo',
			'messageReply',
			'resolveTicket',
		]),

		getName(user) {
			return this.accountDetails.id === (JSON.parse(user))?.id ? 'You' : (JSON.parse(user))?.full_name;
		},

		error() {
			this.systemError = false;
			this.$store.dispatch('systemErrorResolved', false);
		}
	},

	watch: {
		hasError() {
			this.systemError = this.hasError
		}
	}

}
</script>