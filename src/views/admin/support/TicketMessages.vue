<template>
	<v-list>
		<v-list-item-action class="d-flex justify-center mx-auto">
        
		<v-tooltip top >
			<template v-slot:activator="{ on,  attrs }">
				<v-icon large 
						@click="reply"
						v-bind="attrs"
						v-on="on"
				>
					mdi-message-reply
				</v-icon>
			</template>
			<span>Send message</span>
		</v-tooltip>
		</v-list-item-action>
		<v-card v-for="message in messages" :key="message" max-width="600" class="mx-auto pa-3">

			<v-list-item-title>
				<v-icon>
					mdi-message
				</v-icon>
				{{ message.message }}
			</v-list-item-title>
			<v-spacer></v-spacer>
			<v-list-item-title>
				Replied by:
				{{ getUser(message) }}
			</v-list-item-title>
		</v-card>
	</v-list>
</template>

<script>
import {mapActions, mapGetters } from "vuex";

export default {
	name: "TicketMessages",

	computed: {
		...mapGetters([
				'messages'
		]),
	},

	methods: {
		...mapActions([
			'reply'
		]),

		getUser(message) {
			return message.user ? message.user.full_name : 'unknown';
		}
	}
}
</script>

<style scoped>

</style>