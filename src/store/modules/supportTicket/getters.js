
export default {
    getTickets(state) {
        return state.ticketList;
    },

    viewingTicket(state) {
        return state.ticket;
    },

    listOfMessages(state) {
        return state.ticketMessages.reverse().map((mesage) => {
            return {...mesage, user: JSON.parse(mesage.user)};
        });
    },

    supportHasError(state) {
        return state.supportError;
    },

    getUserTickets(state) {
        return state.userTickets;
    },

    currentTicketComponents(state) {
        return state.ticketsComponents;
    },

    getUserTicket(state) {
       return state.userTicket;
    },

    ticketMessages(state) {
       return state.userTicketMessages;
    },

    getTicketId(state) {
        return state.ticket_id;
    },

    systemError(state) {
        return state.error;
    },

    hasError(state) {
        return state.hasError;
    }
}