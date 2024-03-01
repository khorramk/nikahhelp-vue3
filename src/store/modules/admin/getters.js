export default {
    supportComponent(state) {
        return state.supportComponent;
    },

    getTicketFromUsers(state) {
        return state.ticketFromUsers.map(item => {
            try{
                item.user = JSON.parse(item.user);
            } catch(e) {
                // console.log(e);
            }
           return item;
        })
        // .reverse().sort((a, b) => {
        //     return a.resolve > b.resolve ? -1 : 1 ;
        // }).map((item) => {
        //     return {...item, color: item.resolve ? 'success': 'warning'};
        // });
    },

    currentTicket(state) {
        return state.currentTicket;
    },

    messages(state) {
        return state.messageList.map(item => {
             item.user = JSON.parse(item.user)
             return item;
        });
    }
};
