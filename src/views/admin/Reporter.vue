<template>
	<div>
		<!-- <v-card
					id="ticket-reporter"
					class="mx-auto mb-4"
					max-width="700"
					v-for="ticket in getTicketFromUsers" 
						:key="ticket.id"
	>
			<v-list-item  @click="goToTicket(ticket.id)">
					<v-list-item-avatar>
						<v-img :src="ticket.user.get_candidate.per_avatar_url"></v-img>
					</v-list-item-avatar>
					<v-list-item-title>
						{{ ticket.user.full_name }}
					</v-list-item-title>
					<v-list-item-title>
						issue type:
						{{ ticket.issue_type }}
					</v-list-item-title>
					<v-list-item>
						<v-tooltip top>
							<template v-slot:activator="{ on, attrs }">
								<v-icon large v-bind="attrs" v-on="on" :color="ticket.color">
									mdi-circle
								</v-icon>
							</template>
							<span>{{ ticketState(ticket.resolve) }}</span>
						</v-tooltip>
					</v-list-item>
			</v-list-item>
		</v-card> -->
        <Loader :isLoading="isLoading || loading" />
		<div class="table px-5 py-2" v-if="getTicketFromUsers.length > 0">
			<div class="table-header py-2 px-5 mb-3">
				<span class="header-text header-sort p-0" @click="sortBy('id')" :class="{ 'active-sort': sortById != 'random'}">
                    TICKET ID 
                    <span v-if="sortById == 'decreasing'">&#8607;</span>
                    <span v-else-if="sortById == 'increasing'">&#8609;</span>
                </span>
				<span class="header-text p-0">AVATAR</span>
				<span class="header-text p-0">USERNAME</span>
				<span class="header-text p-0">ISSUE TYPE</span>
				<span class="header-text p-0">DETAILS</span>
				<span class="header-text header-sort p-0" @click="sortBy('updated_at')" :class="{ 'active-sort': sortByUpdatedAt != 'random'}">
                    LAST UPDATED
                    <span v-if="sortByUpdatedAt == 'decreasing'">&#8607;</span>
                    <span v-else-if="sortByUpdatedAt == 'increasing'">&#8609;</span>
                </span>
				<span class="header-text header-sort p-0" @click="sortBy('status')" :class="{ 'active-sort': sortByStatus != 'random'}">
                    STATUS
                    <span v-if="sortByStatus == 'decreasing'">&#8607;</span>
                    <span v-else-if="sortByStatus == 'increasing'">&#8609;</span>
                </span>
			</div>

			<div class="table-item py-2 px-5" v-for="ticket in getTicketFromUsers" :key="ticket.id" @click="goToTicket(ticket.id)">
				<span class="text-black-50 ticket-id">#{{ ticket.id }}</span>
				<img class="ticket-img" :src="ticket.user.get_candidate ? ticket.user.get_candidate.per_main_image_url  + `?token=${token}` : ticket.user.get_representative.per_main_image_url + `?token=${token}`" height="30">
				<span class="text-black-50 ticket-username">{{ ticket.user.full_name }}</span>
				<span class="text-black-50 ticket-type">{{ ticket.issue_type }}</span>
                <span class="text-black-50 ticket-issue">{{ ticket.issue }}</span>
				<span class="text-black-50 ticket-time">{{ messageCreatedAt(ticket) }}</span>
                <span class="font-weight-bold ticket-status"  :style="{ color: getTicketStatusColor(ticket) }">{{ ticketStatus(ticket) }}</span>
			</div>
		</div>
		<div v-else class="ticket-empty">
			<span style="">Ticket history is empty</span>
		</div>
	</div>

</template>

<script>
import { format } from 'timeago.js';
import { mapActions, mapGetters } from 'vuex'
export default {
	name: "Reporter",

    data() {
        return {
            sortById: 'increasing',
            sortByUpdatedAt: 'random',
            sortByStatus: 'random',
            token: '',
            isLoading: false,
            noTickets: true,

        }
    },

    created() {
        this.token = JSON.parse(localStorage.getItem('token'));
    },
    watch: {
        getTicketFromUsers() {
            this.noTickets = this.getTicketFromUsers.length > 0;

        }
    },
	computed: {
		...mapGetters([
			'getTicketFromUsers'
		]),
        loading() {
            return this.getTicketFromUsers.length < 1 && this.noTickets;
        },
	},


	methods: {
		...mapActions([
			'goToTicket'
		]),
        messageCreatedAt(item) {
            if(item?.process_ticket?.length > 0) {
                let time = item.process_ticket[item.process_ticket.length-1].created_at;
                return format(time);
            }
            return format(item.created_at);
        },
		ticketState(state) {
			return state > 0 ? 'Resolved' : 'Pending';
		},
        ticketStatus(item) {
            if(item.resolve == 0) {
                if(item.process_ticket.length > 0) {
                    let user = JSON.parse(item.process_ticket[item.process_ticket.length-1].user);
                    return !user.hasOwnProperty('roles')  ? 'Need your reply' : 'Pending';
                } else if(item.process_ticket.length == 0) {
                    return 'Need your reply';
                }
                return 'Pending';
            } else {
                return 'Resolved';
            }
        },
		getTicketStatusColor(item) {
            if(item.resolve == 0) {
                if(item.process_ticket.length > 0) {
                    let user = JSON.parse(item.process_ticket[item.process_ticket.length-1].user);
                    return !user.hasOwnProperty('roles')  ? '#522e8e' : '#ff9800';
                } else if(item.process_ticket.length == 0) {
                    return '#522e8e';
                }
                    return '#ff9800';
            } else {
                return '#4caf50';
            }
        },
        sortBy(type) {
            if(type == 'id') {
                if(this.sortById == 'decreasing' || this.sortById == 'random') {
                    let sorted = this.getTicketFromUsers.sort((a, b) => {
                        return a.id - b.id;
                    });
                    this.sortById = 'increasing';
                    this.sortByStatus = 'random';
                    this.sortByUpdatedAt = 'random';
                    this.$store.commit('storeTicketsFromUsers', sorted);
                } else {
                    let sorted = this.getTicketFromUsers.sort((a, b) => {
                        return b.id - a.id;
                    });
                    this.sortById = 'decreasing';
                    this.sortByStatus = 'random';
                    this.sortByUpdatedAt = 'random';
                    this.$store.commit('storeTicketsFromUsers', sorted);
                }
            }  else if(type == 'updated_at') {
                if(this.sortByUpdatedAt == 'increasing' || this.sortByUpdatedAt == 'random') {
                    let sorted = this.getTicketFromUsers.sort((a, b) => {
                        if(a.process_ticket.length > 0 && b.process_ticket.length > 0) {
                            return new Date(a.process_ticket[a.process_ticket.length-1].updated_at) - new Date(b.process_ticket[b.process_ticket.length-1].updated_at);
                        } else if(a.process_ticket.length > 0 && b.process_ticket.length == 0) {
                            return new Date(a.process_ticket[a.process_ticket.length-1].updated_at) - new Date(b.updated_at);
                        } else if(a.process_ticket.length == 0 && b.process_ticket.length > 0) {
                            return new Date(a.updated_at) - new Date(b.process_ticket[b.process_ticket.length-1].updated_at);
                        } else {
                            return new Date(a.updated_at) - new Date(b.updated_at);
                        }  
                    });
                    this.sortByUpdatedAt = 'decreasing';
                    this.sortById = 'random';
                    this.sortByStatus = 'random';
                    this.$store.commit('storeTicketsFromUsers', sorted);
                } else {
                    let sorted = this.getTicketFromUsers.sort((a, b) => {
                        if(a.process_ticket.length > 0 && b.process_ticket.length > 0) {
                            return new Date(b.process_ticket[b.process_ticket.length-1].updated_at) - new Date(a.process_ticket[a.process_ticket.length-1].updated_at);
                        } else if(a.process_ticket.length > 0 && b.process_ticket.length == 0) {
                            return new Date(b.updated_at) - new Date(a.process_ticket[a.process_ticket.length-1].updated_at);
                        } else if(a.process_ticket.length == 0 && b.process_ticket.length > 0) {
                            return new Date(b.process_ticket[b.process_ticket.length-1].updated_at) - new Date(a.updated_at);
                        } else {
                            return new Date(b.updated_at) - new Date(a.updated_at);
                        }
                    });
                    this.sortByUpdatedAt = 'increasing';
                    this.sortById = 'random';
                    this.sortByStatus = 'random';
                    this.$store.commit('storeTicketsFromUsers', sorted);
                }
            } else if(type == 'status') {
                if(this.sortByStatus == 'decreasing' || this.sortByStatus == 'random') {
                    let sorted = this.getTicketFromUsers.sort((a, b) => {
                        return a.resolve - b.resolve;
                    });
                    this.sortByStatus = 'increasing';
                    this.sortById = 'random';
                    this.sortByUpdatedAt = 'random';
                    this.$store.commit('storeTicketsFromUsers', sorted);
                } else {
                    let sorted = this.getTicketFromUsers.sort((a, b) => {
                        return b.resolve - a.resolve;
                    });
                    this.sortByStatus = 'decreasing';
                    this.sortById = 'random';
                    this.sortByUpdatedAt = 'random';
                    this.$store.commit('storeTicketsFromUsers', sorted);
                }
            }
        }
	}
}
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@500;600&display=swap');
$primary: #362787;
$primary_lite_1: #594e9e;
$primary_lite_2: #8078b5;
$primary_lite_3: #a8a3cd;
$primary_lite_4: #d3d1e6;
$primary_lite_5: #f4f4f9;
$primary_dark_1: #120f22;
$primary_dark_2: #1d1741;
$primary_dark_3: #291e63;

.table {
    .table-header {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 3fr 1fr 1fr;
        position: relative;
        &::after{
            content: '';
            position: absolute;
            display: block;
            width: calc(100% - 40px);
            height: 1px;
            bottom: 0;
            background-color: rgba(0, 0, 0, .1);
        }

        @media screen and (max-width: 992px) {
            display: none;
        }
    }
    .header-text {
        font-family: 'Open sans', sans-serif;
        font-weight: 400;
        font-size: 1rem;
        color: rgba(0, 0, 0, .3);
    }

    .header-sort {
        cursor: pointer;
        &:hover {
            color: rgba(0, 0, 0);
            
        }
    }
    .active-sort {
        color: rgba(0, 0, 0) !important;
        font-size: .9rem !important;
        font-weight: bold !important;
    }

    .table-item {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 3fr 1fr 1fr;
		align-items: center;
        padding: 5px;
        margin: 8px 0px;
        background-color: $primary_lite_5;
        border-radius: 10px;
        font-size: .9rem;
        cursor: pointer;

        span {
            padding: 5px 0px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        &:hover {
            transform: scale(1.01);
            box-shadow: 0 .2rem .5rem rgba(0,0,0,.15);
            background-color: $primary_lite_4;
        }
        
        @media screen and (max-width: 992px) {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            
            span {
                padding: 0;
            }
            .ticket-img {
                display: none;
            }
            .ticket-id {
                order: 1;
                background: #b3b3b3;
                max-width: fit-content !important;
                padding: 2px 3px;
                color: #fff !important;
                border-radius: 5px;
            }
            .ticket-username {
                order: 2;
            }
            .ticket-type {
                order: 3;
                font-size: 1.1rem;

            }
            .ticket-issue {
                order: 4;
                color: rgba(0, 0, 0, .3);

            }
            .ticket-status {
                order: 5;
                font-size: 1rem;
                margin-top: 2px;
            }

            .ticket-time {
                order: 6;
                position: absolute;
                right: 2%;
                bottom: 8%;
                display: block;
                float: right !important;
            }
        }
    }
}

.ticket-empty {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 1.8rem; 
    color: rgba(0, 0, 0, .3);

    @media  screen and (max-width: 576px) {
        font-size: 1.5rem !important;
        left: 25%;
    }

    @media screen and (max-width: 442px) {
        font-size: 1.3rem !important;
        left: 18%;
    }
}

</style>