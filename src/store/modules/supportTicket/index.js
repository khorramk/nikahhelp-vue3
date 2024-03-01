import actions from './actions';
import mutations from  './mutations';
import getters from './getters';

export default {
    state() {
        return {
            ticketList: [],
            ticket: {},
            ticketMessages: [],
            supportError: false,
            userTickets: [],
            ticketsComponents: '',
            userTicket: {},
            userTicketMessages: [],
            ticket_id: 0,
            error: '',
            hasError: false,
        }
    },

    actions,
    mutations,
    getters,
}