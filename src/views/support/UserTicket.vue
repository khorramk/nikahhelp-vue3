<template>
  <div class="col-12 col-lg-8">
    <h2>Current Ticket</h2>
    <v-card class="d-flex justify-space-between" flat>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item" @click="backToList">Tickets</li>
          <li class="breadcrumb-item">Selected Tickets</li>
        </ol>
      </nav>
    </v-card>

    <v-card-actions class="d-flex justify-end">
      <v-tooltip top v-if="getUserTicket.resolve < 1">
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            class="mr-4"
            color="success"
            v-bind="attrs"
            v-on="on"
            @click="resolveTicket(getUserTicket.id)"
          >
            mdi-check-circle
          </v-icon>
        </template>
        <span>Resolve ticket</span>
      </v-tooltip>
      <v-tooltip top v-else>
        <template v-slot:activator="{ on, attrs }">
          <v-icon large v-bind="attrs" v-on="on" color="warning">
            mdi-circle
          </v-icon>
        </template>
        <span>Pending</span>
      </v-tooltip>
    </v-card-actions>
    <v-card>
      <v-list-item>
        <v-list-item-title>
          <v-icon> mdi-bug </v-icon>
          {{ getUserTicket.issue }}
        </v-list-item-title>

        <v-list-item-title>
          type of issue:
          {{ getUserTicket.issue_type }}
        </v-list-item-title>

        <v-list-item>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                large
                @click="viewMessages(getUserTicket.id)"
                v-bind="attrs"
                v-on="on"
              >
                mdi-message-reply
              </v-icon>
            </template>
            <span>Send message</span>
          </v-tooltip>
        </v-list-item>
      </v-list-item>
    </v-card>
    <v-card>
      <v-card-text class="mt-4">
        {{ getUserTicket.issue }}
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "UserTicket",

  computed: {
    ...mapGetters(["getUserTicket"]),
  },

  methods: {
    ...mapActions(["viewMessages", "backToList", "resolveTicket"]),
  },
};
</script>

<style scoped>
</style>