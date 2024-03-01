

export default {
    selectedTickets(state, payload) {
        state.ticketList = payload;
    },

    viewTicket(state, payload) {
        state.ticket = payload;
    },

    ticketMessages(state, payload) {
        state.ticketMessages = payload;
    },

    error(state, payload) {
        state.supportError = payload;
    },

    getMyTickets(state, payload) {
        state.userTickets = payload;
    },

    toTicketComponent(state, payload) {
        state.ticketsComponents = payload;
    },

    viewUserTicket(state, payload) {
        state.userTicket = state.userTickets.filter(ticket => ticket.id === payload)[0];
    },

    toUserTicket(state, payload) {
        state.ticketsComponents = payload;
    },

    viewMessages(state, payload) {
        state.userTicketMessages = state.userTickets.filter(ticket => ticket.id === payload).map(ticket => ticket.process_ticket).pop();
    },

    sendMessage(state, payload) {
        state.ticket_id = payload;
    },

    systemError(state) {
        state.error = 'There is a system error';
    },

    hasError(state, payload) {
        state.hasError = payload;
    }
};