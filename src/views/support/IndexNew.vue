<template>
    <div>
        <Loader :isLoading="loading || isLoading" />
        <div class="page1" v-if="pageNo == 1">
            <div class="d-flex justify-content-between p-4 all-ticket-sm">
                <span class="color-primary all-ticket-header" style="font-size: 1.5rem; opacity: .5;">All ticket history</span>
                <ButtonComponent
                    class="text-large"
                    iconHeight="14px"
                    :isSmall="true"
                    title="Add a new ticket"
                    :responsive="false"
                    :icon="TicketIcon"
                    @onClickButton="showTicketSubmissionForm = true"
                />
            </div>
            <div class="table px-5 py-2" v-if="getUserTickets.length > 0">
                <div class="table-header py-2 px-5 mb-3">
                    <span class="header-text p-0">TICKET ID</span>
                    <span class="header-text p-0">LAST UPDATED</span>
                    <span class="header-text p-0">TICKET STATUS</span>
                    <span class="header-text p-0">ISSUE TYPE</span>
                    <span class="header-text p-0">DETAILS</span>
                </div>
    
                <div class="table-item py-2 px-5" v-for="item in getUserTickets.slice().reverse()" :key="item.id" @click="goToDetailsPage(item)">
                    <span class="text-black-50 ticket-id">#{{ item.id }}</span>
                    <span class="text-black-50 ticket-time">{{ messageCreatedAt(item) }}</span>
                    <span class="font-weight-bold ticket-status"  :style="{ color: getTicketStatusColor(item) }">{{ ticketStatus(item) }}</span>
                    <span class="text-black-50 ticket-type">{{ item.issue_type }}</span>
                    <span class="text-black-50 ticket-issue">{{ item.issue }}</span>
                </div>
            </div>
            <div v-else class="ticket-empty">
                <span style="">Ticket history is empty</span>
            </div>
    
            <!-- submit ticket modal -->
            <a-modal 
                :open="showTicketSubmissionForm" 
                :centered="true"
                :closable="true"
                title="Submit a ticket"
                @ok="showTicketSubmissionForm = false"
                @cancel="showTicketSubmissionForm = false"
                :ok-button-props="{ disabled: true }"
                :cancel-button-props="{ disabled: true }"
            >
                <div>
                    <p class="text-black-50 text-center">Describe Issue Type</p>
                    <a-form-item>
                        <a-select 
                            style="width: 100%; margin-bottom: 0.5rem;"
                            class="text-black-50"
                            required
                            v-model="selectedIssue"
                        >
                            <a-select-option value="manageteam">
                                Manage Team
                            </a-select-option>
                            <a-select-option value="Chat">
                                Chat
                            </a-select-option>
                            <a-select-option value="connection">
                                Connections
                            </a-select-option>
                            <a-select-option value="shortList">
                                Short List
                            </a-select-option>
                            <a-select-option value="profile">
                                Profile
                            </a-select-option>
                            <a-select-option value="blocklist">
                                Block list
                            </a-select-option>
                            <a-select-option value="notification">
                                Notification
                            </a-select-option>
                            <a-select-option value="subscription">
                                Subscription
                            </a-select-option>
                            <a-select-option value="search">
                                Search
                            </a-select-option>
                        </a-select>
                    </a-form-item>
    
                    <p class="text-black-50 text-center mt-3">Describe your issue</p>
                    <a-form-item>
                        <textarea 
                            v-model="issue" 
                            row="5"
                            placeholder="Write your issue here" 
                            class="text-black-50 border rounded w-100 p-2 text-area"
                        >
                        </textarea>
                    </a-form-item>
                </div>
    
                <template slot="footer">
                    <a-button key="back" shape="round" @click="showTicketSubmissionForm=false">
                        Cancel
                    </a-button>
                    <a-button key="submit" type="primary" shape="round" @click="ticketSumbission();">
                        Submit
                    </a-button>
                </template>
            </a-modal>

        </div>

        <!-- page 2 -->
        <div class="page2 p-4 pt-0" v-if="pageNo == 2">
            <!-- top buttons -->
            <div class="mobile-back-btn">
                <span class="color-primary" style="font-size: 1.5rem; opacity: .5;">Ticket</span>
                <ButtonComponent
                    class="text-large"
                    iconHeight="14px"
                    :isSmall="true"
                    title="Back"
                    :responsive="false"
                    icon="/assets/icon/back.svg"
                    @onClickButton="pageNo = 1"
                />
            </div>
            
            <!-- <span class="d-none">This span is for solving a issue. Without this span the following code doens't render in browser</span> -->

            <span v-if="false">sdfsd</span>

            <!-- ticket details -->
            <div class="ticket-details d-flex flex-column mt-5 pb-2">
                <ButtonComponent
                    class="text-large back-btn"
                    iconHeight="14px"
                    :isSmall="true"
                    title="Back"
                    :responsive="false"
                    icon="/assets/icon/back.svg"
                    @onClickButton="pageNo = 1"
                />
                <span class="color-primary font-weight-bold" style="font-size: 1rem;">#{{ currentTicketDetails.id }}</span>
                <span class="text-black-50 p-0" style="font-size: 1rem;">Ticket status: <span class="font-weight-bold" :style="{ color: getTicketStatusColor(currentTicketDetails) }">{{ ticketStatus(currentTicketDetails) }}</span></span>
                <span class="text-black-50 p-0" style="font-size: 1rem;">Issue type: <b class="text-dark break-word">{{ currentTicketDetails.issue_type }}</b></span>
            </div>


            <!-- ticket messages -->
            <div class="ticket-message p-3">
                <div class="d-flex msg-header text-black-50">
                    <span class="msg-sender py-1 px-2 mb-2">{{ getAuthUser.full_name }}</span>
                    <span class="msg-time py-1 px-2 mb-2">{{ messageCreatedAt(currentTicketDetails) }}</span>
                </div>
                <span class="msg-text text-black-50 px-2 py-1 text-break" style="font-size: 1rem;">{{ currentTicketDetails.issue }} sdfs</span>
            </div>

            <!-- process messages -->
            <div class="ticket-message p-3" v-for="item in currentTicketDetails.process_ticket" :key="item.id">
                <div class="d-flex msg-header text-black-50">
                    <span class="msg-sender py-1 px-2 mb-2">{{ getProcessMsgUserName(item) == getAuthUser.full_name ? getAuthUser.full_name : "Support" }}</span>
                    <span class="msg-time py-1 px-2 mb-2">{{ formatTime(item.updated_at) }}</span>
                </div>
                <span class="msg-text text-black-50 px-2 py-1" style="font-size: 1rem;">{{ item.message }}</span>
            </div>

            <!-- bottom buttons -->
            <div class="d-flex justify-content-center mt-5">
                <ButtonComponent
                    v-if="currentTicketDetails.resolve == 0"
                    class="text-large mr-3 connect-button"
                    iconHeight="14px"
                    :isSmall="true"
                    title="Issue resolved"
                    :responsive="false"
                    :backgroundColor="'#3ab549'"
                    :icon="TickIcon"
                    @onClickButton="resolve();"
                />
                <span v-if="currentTicketDetails.resolve == 1" class="text-success font-weight-bold">Ticket resolved</span>
                <ButtonComponent
                    v-if="ticketStatus(currentTicketDetails) == 'Need your reply' && currentTicketDetails.resolve == 0"
                    class="text-large reply-btn"
                    iconHeight="14px"
                    :wrapperWidth="'150px'"
                    :isSmall="true"
                    title="Reply"
                    :responsive="false"
                    :icon="ReplyIcon"
                    @onClickButton="showReplyForm = true"
                />
            </div>

            <!-- submit reply modal -->
            <a-modal 
                :open="showReplyForm" 
                :centered="true"
                :closable="true"
                @ok="showReplyForm = false"
                @cancel="showReplyForm = false"
                :ok-button-props="{ disabled: true }"
                :cancel-button-props="{ disabled: true }"
            >
                <div>
                    <div class="d-flex justify-content-center">
                        <span class="font-weight-bold support-text">
                            <img src="@/assets/support_page_icons/reply.svg" alt="" class="src" height="10">
                            Support
                        </span>
                        &nbsp;|&nbsp;
                        <span class="text-black-50 font-weight-bold">{{ currentTicketDetails.process_ticket.length > 0 ?  formatTime(currentTicketDetails.process_ticket[currentTicketDetails.process_ticket.length-1].updated_at) : ''}}</span>
                    </div>
                    <span class="last-msg text-black-50 text-center w-100 mt-3 mb-3">
                        {{ currentTicketDetails.process_ticket.length > 0 ? currentTicketDetails.process_ticket[currentTicketDetails.process_ticket.length-1].message : currentTicketDetails.issue    }}
                    </span>

                    <p class="text-black-50 text-center mt-3">Type your reply here</p>
                    <a-form-item>
                        <textarea 
                            v-model="message" 
                            row="5"
                            placeholder="Write here.." 
                            class="text-black-50 border rounded w-100 p-2 text-area">
                        </textarea>
                    </a-form-item>
                </div>
    
                <template slot="footer">
                    <a-button key="back" shape="round" @click="showReplyForm=false">
                        Cancel
                    </a-button>
                    <a-button key="submit" type="primary" shape="round" @click="sendMessage();">
                        Submit
                    </a-button>
                </template>
            </a-modal>
        </div>

        <!-- submit ticket or reply success -->
        <a-modal 
            :open="showSubmissionSuccess" 
            :centered="true"
            :closable="true"
            @ok="showSubmissionSuccess = false"
            @cancel="showSubmissionSuccess = false"
            :ok-button-props="{ disabled: true }"
            :cancel-button-props="{ disabled: true }"
        >
            <div>
                <div class="image-div w-100 d-flex justify-content-center mt-5" v-if="pageNo==2">
                    <img :src="VerifiedIcon" alt="" class="m-auto" height="150" widht="150">
                </div>

                <span class="text-black-50 text-center w-100 mt-5 mb-3" style="font-size: 1.5rem;" v-if="pageNo==1">Your ticket submission is successful</span>
                <span class="text-black-50 text-center w-100 mt-5 mb-3" style="font-size: 1.5rem;" v-else>Your reply submission is successful</span>

                <div class="image-div w-100 d-flex justify-content-center" v-if="pageNo==1">
                    <img :src="VerifiedIcon" alt="" class="m-auto" height="150" widht="150">
                </div>

                <span class="text-center font-weight-bold w-100 mt-4" style="font-size: 1.5rem; color: rgba(0, 0, 0, .2)" v-if="pageNo==1">Ticket id: #{{ lastSubmittedTicketId }}</span>
            </div>

            <template slot="footer">
                <a-button key="submit" type="primary" shape="round" @click="showSubmissionSuccess = false">
                    ok
                </a-button>
            </template>
        </a-modal>

        <!-- submit ticket or reply failed -->
        <a-modal 
            :open="showSubmissionFailed" 
            :centered="true"
            :closable="true"
            @ok="showSubmissionFailed = false"
            @cancel="showSubmissionFailed = false"
            :ok-button-props="{ disabled: true }"
            :cancel-button-props="{ disabled: true }"
        >
            <div>
                <div class="image-div w-100 d-flex justify-content-center mt-5">
                    <img :src="RejectedIcon" alt="" class="m-auto" height="150" widht="150">
                </div>

                <span class="text-black-50 text-center w-100 mt-5 mb-3" style="font-size: 1.5rem;" v-if="pageNo==1">Your ticket submission is unsuccessful</span>
                <span class="text-black-50 text-center w-100 mt-5 mb-3" style="font-size: 1.5rem;" v-else>Your reply submission is unsuccessful</span>

            </div>

            <template slot="footer">
                <a-button key="submit" type="primary" shape="round" @click="showSubmissionFailed = false">
                    ok
                </a-button>
            </template>
        </a-modal>
        <span ref="endOfPage"></span>
    </div>
</template>

<script>
import {format} from "timeago.js";
import {mapActions, mapGetters} from "vuex";
import ButtonComponent from "../../components/atom/ButtonComponent.vue";
import ApiService from '../../services/api.service';
import Loader from "../../plugins/loader/loader.vue";

import RejectedIcon from "@/assets/Verification_Icons/Icon/SVG/Rejected.svg";
import VerifiedIcon from "@/assets/Verification_Icons/Icon/SVG/Verified.svg";
import TicketIcon from "@/assets/support_page_icons/ticket.svg";
import TickIcon from "@/assets/support_page_icons/tick.svg";
import ReplyIcon from "@/assets/support_page_icons/reply.svg";


export default {
    name: "Support",
	components: {
        ButtonComponent,
        Loader
    },
	
    data() {
        return {
            showTicketSubmissionForm: false,
            showSubmissionSuccess: false,
            showSubmissionFailed: false,
            showReplyForm: false,
            selectedIssue: 'Select your issue type',
            issue: '',
            message: '',
            noTickets: true,
            isLoading: false,
            pageNo: 1,
            lastSubmittedTicketId: null,
            currentTicketDetails: null,

            RejectedIcon,
            VerifiedIcon,
            TicketIcon,
            TickIcon,
            ReplyIcon
        }
    },

    created() {
		this.$store.dispatch('getMyTickets', this.getAuthUserId);
	},

    watch: {
        getUserTickets() {
            this.noTickets = this.getUserTickets.length > 0;

        }
    },

    computed: {
        ...mapGetters([
            'currentTicketComponents',
            'getUserTickets',
		]),
        getAuthUserId() {
            let loggedUser = JSON.parse(localStorage.getItem('user'));
            if (loggedUser) {
                return loggedUser.id;
            }
            return null;
        },
        getAuthUser() {
            let loggedUser = JSON.parse(localStorage.getItem('user'));
            if (loggedUser) {
                return loggedUser;
            }
            return null;
        },
        loading() {
            return this.getUserTickets.length < 1 && this.noTickets;
        },
    },

    methods: {
        messageCreatedAt(item) {
            if(item?.process_ticket?.length > 0) {
                let time = item.process_ticket[item.process_ticket.length-1].created_at;
                return format(time);
            }
            return format(item.created_at);
        },
        formatTime(time) {
            return format(time);
        },

        ticketSumbission() {
            if(this.selectedIssue == 'Select your issue type') {
                this.$error({
                    title: 'Error',
                    content: 'Please select an issue type'
                });
                return;
            } else if(this.issue == '') {
                this.$error({
                    title: 'Error',
                    content: 'Please describe your issue'
                });
                return;
            }
            this.showTicketSubmissionForm = false;
            this.isLoading = true;
            ApiService.post('v1/ticket-submission', {
                issue_type: this.selectedIssue,
                issue: this.issue,
                user: localStorage.getItem('user'),
                }).then((res) => {
                    let submittedTicket = res.data.data.ticket;
                    this.issue = '';
                    submittedTicket.process_ticket = [];
                    submittedTicket.resolve = 0;
                    let allTickets = this.getUserTickets;
                    allTickets.push(submittedTicket);
                    this.$store.commit('getMyTickets', allTickets);
                    this.lastSubmittedTicketId = submittedTicket.id;
                    this.isLoading = false;
                    this.showSubmissionSuccess = true;

                })
                .catch(e => {
                    this.isLoading = false;
                    this.showSubmissionFailed = true;
                    console.log(e);
                })
        },
        ticketStatus(item) {
            if(item.resolve == 0) {
                if(item.process_ticket.length > 0) {
                    let user = JSON.parse(item.process_ticket[item.process_ticket.length-1].user);
                    return user.hasOwnProperty('roles')  ? 'Need your reply' : 'Pending';
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
                    return user.hasOwnProperty('roles')  ? '#522e8e' : '#ff9800';
                }
                return '#ff9800';
            } else {
                return '#4caf50';
            }
        },
        getProcessMsgUserName(item) {
            let user = JSON.parse(item.user);
            return user.full_name;

        },
        goToDetailsPage(item) {
            this.pageNo = 2;
            this.showTicketDetails(item);
            this.$refs.endOfPage.scrollIntoView({ behavior: 'smooth', block: 'end' });
        },

        // for page 2
        showTicketDetails(item) {
            this.currentTicketDetails = item;
        },

        // send message
        sendMessage() {
            if(this.message == '') {
                this.$error({
                    title: 'Error',
                    content: 'Please type your message'
                });
                return;
            }
            this.showReplyForm = false;
            this.isLoading = true;
            ApiService.post('/v1/send-support-message', {
              message:  this.message,
              ticket_id: this.currentTicketDetails.id,
              user: localStorage.getItem('user')
            })
            .then((res) => {
                this.currentTicketDetails.process_ticket.push(res.data.data);
                this.message = '';
                this.isLoading = false;
                this.showSubmissionSuccess = true;
            })
            .catch(()=> {
                this.isLoading = false;
                this.showSubmissionFailed = true;
            });
        },

        resolve() {
            this.$confirm({
                title: 'Are you sure?',
                content: 'This action will mark this ticket as resolved.',
                okText: 'Yes',
                cancelText: 'No',
                onOk: () => {
                    this.resolveTicket();
                },
                onCancel: () => {
                    console.log('Cancel');
                },
            });
        },
        resolveTicket() {
            this.isLoading = true;
            ApiService.post('/v1/resolveTicket', {
                ticket_id: this.currentTicketDetails.id
            }).then(res => {
                this.currentTicketDetails.resolve = 1;
                let allTickets = this.getUserTickets;
                allTickets.forEach((item, index) => {
                    if(item.id == this.currentTicketDetails.id) {
                        allTickets[index] = this.currentTicketDetails;
                    }
                });
                this.$store.commit('getMyTickets', allTickets);
                this.isLoading = false;
                this.pageNo = 1; 
            }).catch(e => {
                console.log(e);
                this.isLoading = false;
            })
        }
    },
}
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@500;600&display=swap');

.page1 {
    .all-ticket-sm {
        @media screen and (max-width: 992px) {
            flex-direction: column-reverse;
            justify-content: center;
            align-items: center;
            padding-bottom: 0 !important;

            .all-ticket-header {
                margin-top: 1rem;
            }
        }

    }
}

.table {
    .table-header {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 4fr;
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

    .table-item {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 4fr;
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
            
            span {
                padding: 0;
            }
            .ticket-id {
                order: 1;
                background: #b3b3b3;
                max-width: fit-content !important;
                padding: 2px 3px;
                color: #fff !important;
                border-radius: 5px;
            }
            .ticket-type {
                order: 2;
                font-size: 1.1rem;

            }
            .ticket-issue {
                order: 3;
                color: rgba(0, 0, 0, .3);

            }
            .ticket-status {
                order: 4;
                font-size: 1rem;
                margin-top: 2px;
            }

            .ticket-time {
                position: absolute;
                right: 2%;
                bottom: 8%;
                display: block;
                order: 5;
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

.text-area {
    line-height: 1.5 !important;
    min-height: 150px !important;
}

.page2 {
    .mobile-back-btn {
        display: none;

        @media screen and (max-width: 992px) {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
            padding-bottom: 0 !important;
        }
    }
    .ticket-details {
        position: relative;
        border-bottom: 1px solid rgba(0,0,0, .3);

        .back-btn {
            position: absolute;
            top: 0;
            right: 0;
        }

        @media  screen and (max-width: 992px) {
            margin-top: 0 !important; 

            .back-btn {
                display: none;
            }
        }
    }

    .ticket-message {
        margin: 10px 0px;
        background: $primary_lite_5;
        border-radius: 10px;
        .msg-header {
            border-bottom: 1.5px solid rgba(0,0,0, .1);
            font-size: 1rem;
        }
        .msg-sender {
            font-weight: 600;
            border-right: 1px solid rgba(0,0,0, .3);
        }
    }

    .connect-button {
		.v-custom:hover {
			background: #fff !important;
			color: $bg-success !important;
			border: 1px solid $bg-success !important;

			img {
				filter: none !important;
			}
		}
	}
}

.support-text {
    color: $color-primary !important;
}
.last-msg {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-bottom: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
}
</style>
