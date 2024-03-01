<template>
  <div class="col-12 col-lg-8">
    <h2 class="">Past ticket history</h2>
    <v-card
      v-for="ticket in getUserTickets"
      :key="ticket.id"
      class="mb-3"
      @click="viewUserTicket(ticket.id)"
    >
      <v-list-item>
        <v-list-item-title>
          <v-icon> mdi-bug </v-icon>
          {{ ticket.issue_type }}
        </v-list-item-title>

        <v-list-item-action>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon large v-bind="attrs" v-on="on" :color="ticket.color">
                mdi-circle
              </v-icon>
            </template>
            <span>Pending</span>
          </v-tooltip>
        </v-list-item-action>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Tickets",

  data() {
	return {
		color: 'danger'
	}
  },

  computed: {
    ...mapGetters(["getUserTickets"]),

  },

  methods: {
    ...mapActions(["viewUserTicket"]),

	ticketState(id) {
	 const ticket =	this.getUserTickets.find((ticket) => {
			return ticket.id === id;
		});


		return ticket.resolve < 1 | ticket.process_ticket.length > 0 ? 'danger' : 'warning';
	}
  },
};
</script>
