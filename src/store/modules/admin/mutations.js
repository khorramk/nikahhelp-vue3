export default {
    supportComponent(state, payload) {
        return state.supportComponent = payload;
    },

    storeTicketsFromUsers(state, payload) {
        return state.ticketFromUsers = payload;
    },

    getTicket(state, payload) {
        return state.currentTicket = state.ticketFromUsers.find(ticket => ticket.id === payload);
    },

    messageList(state) {
        return state.messageList = state.currentTicket.process_ticket;
    }
};
