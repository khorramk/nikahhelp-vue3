<template>
	<div class="p-4 pt-0">
    <Loader :isLoading="isLoading" />
    <!-- top buttons -->
    <div class="mobile-back-btn">
      <span class="color-primary" style="font-size: 1.5rem; opacity: .5;">TIcket</span>
      <ButtonComponent
        class="text-large"
        iconHeight="14px"
        :isSmall="true"
        title="Back"
        :responsive="false"
        :icon="require('@/assets/icon/gallery.svg')"
        @onClickButton="goBackToTickets"
      />
    </div>

    <!-- ticket details -->
    <div class="ticket-details d-flex flex-column mt-5 pb-2">
      <ButtonComponent
        class="text-large back-btn"
        iconHeight="14px"
        :isSmall="true"
        title="Back"
        :responsive="false"
        icon="/assets/icon/back.svg"
        @onClickButton="goBackToTickets"
      />
      <span class="color-primary font-weight-bold" style="font-size: 1rem;">#{{ currentTicket.id }}</span>
      <span class="text-black-50 p-0" style="font-size: 1rem;">Ticket status: <span class="font-weight-bold" :style="{ color: getTicketStatusColor(currentTicket) }">{{ ticketStatus(currentTicket) }}</span></span>
      <span class="text-black-50 p-0" style="font-size: 1rem;">Issue type: <b class="text-dark break-word">{{ currentTicket.issue_type }}</b></span>
    </div>
    
    <!-- ticket messages -->
    <div class="ticket-message p-3">
      <div class="d-flex msg-header text-black-50">
        <span class="msg-sender py-1 px-2 mb-2">{{ currentTicket.user.full_name }}</span>
        <span class="msg-time py-1 px-2 mb-2">{{ messageCreatedAt(currentTicket) }}</span>
      </div>
      <span class="msg-text text-black-50 px-2 py-1 text-break" style="font-size: 1rem;">{{ currentTicket.issue }}</span>
    </div>

    <!-- process messages -->
    <div class="ticket-message p-3" v-for="item in currentTicket.process_ticket" :key="item.id">
      <div class="d-flex msg-header text-black-50">
        <span class="msg-sender py-1 px-2 mb-2">{{ getProcessMsgUserName(item) == currentTicket.user.full_name ? currentTicket.user.full_name : "Support" }}</span>
        <span class="msg-time py-1 px-2 mb-2">{{ formatTime(item.updated_at) }}</span>
        <span class="msg-delete py-1 px-2 mb-2" v-if="getProcessMsgUserName(item) != currentTicket.user.full_name" @click="deleteMsg(item.id)"><img src="@/assets/support_page_icons/bin.svg" alt="Delete" height="20"></span>
      </div>
      <span class="msg-text text-black-50 px-2 py-1" style="font-size: 1rem;">{{ item.message }}</span>
    </div>

    <!-- bottom buttons -->
    <div class="d-flex justify-content-center mt-5">
      <ButtonComponent
        v-if="currentTicket.resolve == 1"
        class="text-large mr-3 connect-button"
        iconHeight="14px"
        :isSmall="true"
        title="Issue resolved"
        :responsive="false"
        :backgroundColor="'#3ab549'"
        :icon="require('@/assets/support_page_icons/tick.svg')"
        @onClickButton="resolve();"
      />
      <ButtonComponent
        v-if="ticketStatus(currentTicket) == 'Need your reply'"
        class="text-large reply-btn"
        iconHeight="14px"
        :wrapperWidth="'150px'"
        :isSmall="true"
        title="Reply"
        :responsive="false"
        :icon="require('@/assets/support_page_icons/reply.svg')"
        @onClickButton="showReplyForm = true"
      />
    </div>

    <!-- submit reply modal -->
    <a-modal 
        :visible="showReplyForm" 
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
            <span class="text-black-50 font-weight-bold">{{ currentTicket.process_ticket.length > 0 ?  formatTime(currentTicket.process_ticket[currentTicket.process_ticket.length-1].updated_at) : ''}}</span>
          </div>
          <span class="last-msg text-black-50 text-center w-100 mt-3 mb-3">
            {{ currentTicket.process_ticket.length > 0 ? currentTicket.process_ticket[currentTicket.process_ticket.length-1].message : currentTicket.issue    }}
          </span>

          <p class="text-black-50 text-center mt-3">Type your reply here</p>
          <a-form-model-item>
            <textarea 
                v-model="message" 
                row="5"
                placeholder="Write here.." 
                class="text-black-50 border rounded w-100 p-2 text-area">
            </textarea>
          </a-form-model-item>
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
</template>

<script>
import { format } from "timeago.js";
import { mapActions, mapGetters } from "vuex";
import ButtonComponent from "../../../components/atom/ButtonComponent.vue";
import Loader from "../../../plugins/loader/loader.vue";
import ApiService from '../../../services/api.service';
import Notification from "@/common/notification.js";

export default {
	name: "TicketDetails",
  components: {
    ButtonComponent,
    Loader
  },
  data() {
    return {
      message: '',
      showReplyForm: false,
      showSubmissionSuccess: false,
      showSubmissionFailed: false,
      isLoading: false
    }
  },
	computed: {
		...mapGetters([
      'currentTicket',
			'getTicketFromUsers'

		])
	},

	methods: {
		...mapActions([
			'goBackToTickets',
			'goToMessages',
			'resolveTicket'
		]),
    socketNotification(payload) {
      console.log('socketNotification from candidate profile review')
      let loggedUser = JSON.parse(localStorage.getItem('user'));
      payload.sender = loggedUser.id;
      Notification.storeNotification(payload);
      payload.created_at = new Date();
      payload.seen = 0;
      payload.sender = loggedUser;
      if(payload && payload.receivers.length > 0) {
        payload.receivers = payload.receivers.map(item => {
          return item.toString();
        });
        this.$socket.emit('notification', payload);
      }
    },
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
    getProcessMsgUserName(item) {
      let user = JSON.parse(item.user);
      return user.full_name;
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
      ApiService.post('/v1/admin/submitTicketRequests', {
        message: this.message,
        ticket_id: this.currentTicket.id,
        user: localStorage.getItem('user')
      }).then(res => {
        console.log(res.data.data, 'res from admin supprot');
        this.message = '';
        this.currentTicket.process_ticket.push(res.data.data);
        this.isLoading = false;
        this.showSubmissionSuccess = true;

        // send socket notification
        let receivers = [this.currentTicket.user_id];
          console.log(receivers, "receivers")
          let payload = {
            receivers: receivers,
            title: `You have response in your ticket #${this.currentTicket.id}`,
          };
          console.log('before sending notification', payload);
          this.socketNotification(payload);
          console.log('after sending notification');

      }).catch(e => {
        this.isLoading = false;
        this.showSubmissionFailed = true;
      })
    },

    resolve() {
      this.$confirm({
        title: 'Are you sure?',
        content: 'This action will mark this ticket as resolved.',
        okText: 'Yes',
        cancelText: 'No',
        onOk: () => {
          this.isLoading = true;
          this.resolveTicket(this.currentTicket.id);

          // send socket notification
          let receivers = [this.currentTicket.user_id];
            console.log(receivers, "receivers")
            let payload = {
              receivers: receivers,
              title: `You ticket #${this.currentTicket.id} has been resolved`,
            };
            console.log('before sending notification', payload);
            this.socketNotification(payload);
            console.log('after sending notification');

        },
        onCancel: () => {
          console.log('Cancel');
        },
      });
    },
    deleteMsg(id) {
      this.$confirm({
        title: 'Are you sure?',
        content: 'This action will delete this message.',
        okText: 'Yes',
        cancelText: 'No',
        onOk: () => {
          this.isLoading = true;
          ApiService.delete('/v1/admin/deleteTicketMessage/' + id).then(res => {
            this.isLoading = false;
            this.currentTicket.process_ticket = this.currentTicket.process_ticket.filter(item => item.id != id);
            this.$success({
              title: 'Success',
              content: 'Message deleted successfully'
            });
          }).catch(e => {
            this.isLoading = false;
            this.$error({
              title: 'Error',
              content: 'Something went wrong'
            });
          })
        },
        onCancel: () => {
          console.log('Cancel');
        },
      });
    },
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
  position: relative;
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
  .msg-delete {
    position: absolute;
    top: 15px;
    right: 20px;
    padding: 2px;
    border-radius: 5px;
    background: $bg-danger !important;
    color: #fff !important;
    cursor: pointer;
    img {
      filter: brightness(0) invert(1);
    }
    &:hover {
      color: $color-danger !important;
      background: #fff !important;
      border: 1px solid $bg-danger !important;
      img {
        filter: none !important;
      }
    }
  }
}
.text-area {
  line-height: 1.5 !important;
  min-height: 150px !important;
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
</style>