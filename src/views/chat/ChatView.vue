<template>

  <div class="container" style="padding-top: 0px;">
    <div style="margin-bottom: 5px; padding-right: 1000px"></div>   <!--plz ignore this div -->
    <div class="row">
      <div class="col-12">
        <div class="chat-wrapper my-4">
          <div class="chat-left">
            <div class="chat-title">My team chats</div>
            <div class="chat-search">
              <div class="form-group has-search">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42.02 40.76">    
                      <g id="Layer_2" data-name="Layer 2">
                          <g id="draw_boxes" data-name="draw boxes">
                              <path fill="#cccccc" class="cls-1" d="M41.67,35.89A1.33,1.33,0,0,0,41.58,34L30.34,23.79a1.34,1.34,0,0,0-1.88.09l-4,4.44a1.34,1.34,0,0,0,.09,1.88L35.78,40.41a1.32,1.32,0,0,0,1.88-.09Z"/>
                              <path fill="#cccccc" class="cls-1" d="M14.72,0A14.72,14.72,0,1,1,9.91.81,14.73,14.73,0,0,1,14.72,0m0,4a10.82,10.82,0,0,0-3.51.59h0A10.73,10.73,0,1,0,14.72,4Z"/>
                          </g>
                      </g>
                  </svg>
                <input type="text" class="form-control" placeholder="Search..." v-model="conv_search_key">
              </div>
            </div>
            <div class="chat-category">
              <nav >
                  <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <a class="nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">
                      <div class="category-item">
                        <a href="#">
                          <svg xmlns="http://www.w3.org/2000/svg" class="recent-icon" viewBox="0 0 33.75 33.75" style="margin-top:3px">
                            <g id="Layer_2" data-name="Layer 2">
                                <g id="middle">
                                    <path class="cls-1" d="M16.88,3A13.88,13.88,0,1,1,3,16.88,13.89,13.89,0,0,1,16.88,3m0-3A16.88,16.88,0,1,0,33.75,16.88,16.88,16.88,0,0,0,16.88,0Z"/>
                                    <polygon class="cls-1" points="25.49 19.47 13.92 19.47 13.92 10.67 15.92 10.67 15.92 17.47 25.49 17.47 25.49 19.47"/>
                                </g>
                            </g>
                          </svg>
                          <span class="countOfChat">{{totalUnreadCount}}</span>
                          <p class="category-name">Recent</p>
                        </a>              
                      </div>
                    </a>
                    <a class="nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">
                      <div class="category-item">
                        <a href="#">                
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42.02 31.17" style="margin-top:3px">
                              <g id="Layer_2" data-name="Layer 2">
                                  <g id="middle">
                                      <path class="cls-1" d="M9.37,20.31A13.43,13.43,0,0,0,6.8,24.07,14.3,14.3,0,0,0,5.64,28c0,.34-.07.68-.09,1s0,.67,0,1v1.08H2A2,2,0,0,1,.59,30.5,2,2,0,0,1,0,29.09,12.63,12.63,0,0,1,6,18.34,9.73,9.73,0,0,0,9.37,20.31Zm4.13-3.68a8.66,8.66,0,0,1-1.61-1.7,9.2,9.2,0,0,1-1.74-5.72A8.93,8.93,0,0,1,11,5.64a9.08,9.08,0,0,1,1.72-2.52A8.06,8.06,0,0,0,7.47,17.38a8.16,8.16,0,0,0,2.93,1.54c.28-.28.56-.52.84-.75l.34-.28c.3-.23.58-.44.86-.63a1.43,1.43,0,0,1,1.27-.16l.93.34A8.39,8.39,0,0,1,13.5,16.63Zm19.15,3.68a13.64,13.64,0,0,1,2.57,3.76A14.3,14.3,0,0,1,36.38,28c0,.34.07.68.09,1s0,.67,0,1v1.08H40a2,2,0,0,0,1.42-.59A2,2,0,0,0,42,29.09a12.63,12.63,0,0,0-6-10.75A9.73,9.73,0,0,1,32.65,20.31Zm-5.27-2.87.93-.34a1.43,1.43,0,0,1,1.27.16c.28.19.56.4.86.63l.34.28c.28.23.56.47.84.75a8.06,8.06,0,0,0-2.33-15.8A9.08,9.08,0,0,1,31,5.64a8.93,8.93,0,0,1,.86,3.57,9.2,9.2,0,0,1-1.74,5.72,8.66,8.66,0,0,1-1.61,1.7A8.39,8.39,0,0,1,27.38,17.44Zm2-11.93A9.23,9.23,0,0,0,20.92,0,9.23,9.23,0,0,0,11.7,9.22a9.14,9.14,0,0,0,1.94,5.66,8.6,8.6,0,0,0,1.65,1.65,9.21,9.21,0,0,0,3,1.53,9.21,9.21,0,0,0,8.28-1.53A9,9,0,0,0,28.1,15a9.23,9.23,0,0,0,1.26-9.5Zm-.45,13.11h0a4.06,4.06,0,0,0-.36-.26,1.1,1.1,0,0,0-.14-.09A16.08,16.08,0,0,1,25,19.8a17.09,17.09,0,0,1-4.08.58c-1.2.11-3.87-.67-5.72-1.28l-.48-.16-1.5-.52c-.26.17-.51.36-.75.55l-.32.27A14.67,14.67,0,0,0,11,20.31a13.86,13.86,0,0,0-2.57,3.76A14.28,14.28,0,0,0,7.26,28c0,.34-.07.68-.1,1s0,.67,0,1v1.17L34.7,31v-1.2a13.67,13.67,0,0,0-1.77-6.73,14.08,14.08,0,0,0-3.38-4Zm-.37-.26a4.06,4.06,0,0,1,.36.26m-.36-.26a4.06,4.06,0,0,1,.36.26"/>
                                  </g>
                              </g>
                          </svg>
                          <span class="countOfChat">{{teamUnreadCount}}</span>
                          <p class="category-name">Team</p>
                        </a>              
                      </div>
                    </a>
                    <a class="nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">
                      <div class="category-item">
                        <a href="#">
                          <!-- <img src="@/assets/icon/connected.svg" alt="connected icon"/> -->
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42.52 39.16" style="margin-top:3px">
                              <g id="Layer_2" data-name="Layer 2">
                                  <g id="middle">
                                      <path class="cls-1" d="M24.46,14.64c1.43,1.43,1.62,4.38-3.42,7-5-2.6-4.85-5.55-3.42-7S21,14.17,21,15.3C21,14.17,23,13.2,24.46,14.64ZM8.59,25.1a6.48,6.48,0,1,0-6.48-6.48A6.48,6.48,0,0,0,8.59,25.1Zm1.29,0H7.3A7.37,7.37,0,0,0,0,31.59a.84.84,0,0,0,.85.91H16.32a.84.84,0,0,0,.85-.91A7.37,7.37,0,0,0,9.88,25.15Zm24-7.43a6.48,6.48,0,1,0-6.48-6.48A6.48,6.48,0,0,0,33.93,17.72Zm1.29.05H32.64a7.38,7.38,0,0,0-7.3,6.44.85.85,0,0,0,.86.91H41.66a.84.84,0,0,0,.85-.91A7.37,7.37,0,0,0,35.22,17.77ZM7,11a1.53,1.53,0,0,0,.68.23,1.48,1.48,0,0,0,1.38-.65,12.12,12.12,0,0,1,11-4.86l-.92,2.71,8.72-1.76L22,0,21,2.84A15.07,15.07,0,0,0,6.59,8.94,1.49,1.49,0,0,0,7,11ZM37,26a1.49,1.49,0,0,0-2,.73A12.15,12.15,0,0,1,25,33.22l.48-2.83-8.34,3.1L24,39.16l.51-3h.63a15.08,15.08,0,0,0,12.68-8.25A1.49,1.49,0,0,0,37,26Z"/>
                                  </g>
                              </g>
                          </svg>
                          <span class="countOfChat">{{connectedUnreadCount}}</span>  
                          <p class="category-name">Connected</p>
                        </a>              
                      </div>
                    </a>
                  </div>
              </nav>              
              <div class="category-item">
               
              </div>            
            </div>
            <div class="chat-item-wrapper">
              <div class="tab-content" id="nav-tabContent">
                <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                    <div
                        class="chat-item"
                        v-for="item in chatHistory"
                        :key="item.team_id"
                    >
                      <ChatListItem
                        :item="item"
                        action
                        class="w-full pr-3 cursor-pointer"
                        @click.native="getIndividualChat(item)"
                    />
                  </div>
                </div>
                <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                  <div class="chat-item"
                        v-for="item in teamChat"
                        :key="item.team_id"
                    >
                        <ChatListItem
                          :item="item"
                          action
                          class="w-full pr-3 cursor-pointer"
                          @click.native="getIndividualChat(item)"
                        />
                  </div>
                </div>
                <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                  <div class="chat-item" v-for="item in connectedConversations" :key="item.id" @click="selectConversation(item.id)">
                    <div class="top">
                      <div class="item-img">
                        <img src="../../assets/info-img.png" alt="info image"/>
                        <span></span>
                      </div>
                      <div class="chat-info">
                        <div class="chat-group">{{item.type}}</div>
                        <div class="chat-name">{{item.title}}</div>
                        <div class="last-chat">{{item.last_msg}}</div>
                                      
                      </div>
                      <div class="status-info">
                        <div class="status" v-show="checkUnread(item.id)"></div>
                        
                      </div>
                    </div>
                    <div class="bottom">
                      <!-- <div class="typing">Typing...</div>   -->
                      <!-- <div class="chat-time">05 min ago</div> -->
                    </div>
                    
                  </div>
                </div>
              </div>
              
            </div>
          </div>
          <div class="chat-right">
            <button class="btn btn-primary my-4 d-md-none">Back</button>
            <div class="header clearfix">
              <div class="left">
                <div  class="top">
                  <div class="item-img">
                    <img src="../../assets/info-img.png" alt="info image">
                    <span ></span>
                  </div>
                  <div class="chat-info">
                    <div class="chat-name">{{ conversationTitle }}</div>
                    <div class="last-chat">Active now (2 members)</div>
                  </div>
                </div>
              </div>
              <div class="middle">
                <div class="chat-group">Team 1 Group chat</div>
              </div>
              <div class="right">
                
              </div>
            </div>
            <div class="chat-area">
              <div class="chat-box" ref="chatbox" id="chat_box">
                <div 
                  v-for="item in chats"
                  :key="item.id"
                  :class="['chats', (item.senderId == $store.state.user.user.id) ? 'me' : '']"
                >
                  <div class="item-img">
                    <img src="../../assets/info-img.png" alt="info image"/>
                    <span></span>
                  </div>
                  <div class="message">
                    <p class="msg-text">{{item.body || ''}}</p>
                    <p class="date-time"> {{ messageCreatedAt(item.created_at) }} </p>
                  </div>
                  
                </div>
              </div>
              <div class="footer">
                <!-- <div class="footer-top"><strong>Hossain</strong> is typing...</div> -->
                <div class="footer-bottom">
                  <form action="#" @submit.prevent="sendMsg">
                    <div class="left">   
                      <div class="message-box">
                        <!-- <button class="btn-emoji">&#128528;</button> -->
                        <textarea name="message" id="" cols="30" rows="10" placeholder="Enter message..." v-model="msg_text"></textarea>
                        
                      </div>
                      <!-- <button :disabled="returnMsgSendBtnDeactiveStatus" class="btn btn-primary btn-submit js-msg-send">  -->
                      <button  class="btn btn-primary btn-submit js-msg-send"> 
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25.68 18.77">                            
                          <g id="Layer_2" data-name="Layer 2">
                            <g id="middle" fill="white">
                              <polygon class="cls-1" points="8.6 12.29 7.06 13.34 6.86 11.05 8.6 12.29"/>
                              <polygon class="cls-1" points="0 6.23 25.68 0 17.75 18.77 0 6.23"/>
                              <polygon class="cls-2" points="6.86 11.05 24.95 0.57 8.6 12.29 6.86 11.05"/>
                            </g>
                          </g>
                        </svg>
                        Send
                      </button>                                      
                    </div>               
                  </form>     
                </div>                  
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-top: 100px;"></div>   <!--plz ignore this div -->
  </div>
</template>

<script>
import ChatListItem from '@/components/notification/ChatListItem.vue';
import ApiService from '@/services/api.service';
import { pick, map } from 'lodash';
const messageKeys = ['id', 'chat_id', 'team_id', 'body', 'seen', 'created_at'];
import { format } from 'timeago.js'

export default {
    name: 'ChatView',
    sockets: {
        connect: function () {
            console.log('socket connected')
        },
        ping: function (data) {
            console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
        }
    },
    data(){
        return {
            conversationTitle: '',
            type: 'team chat',
            msg_text: '',
            teamChat: [],
            chatHistory: [],
            chats: [],
            conv_search_key: null
        }
    },
    components: {
        ChatListItem
    },
  watch:{
    scrollFlag (newValue, oldValue) {
      // Our fancy notification (2).
      // console.log(oldValue);
      if(newValue){
        console.log('scroll down needed now');

        // var msg_list = this.$store.state.chat.messages;
        // var last_msg = msg_list[msg_list.length - 1];
        // var last_msg_id = last_msg.id;
        // console.log('id found:',last_msg_id);
       
        var element = document.getElementById("chat_box");
        let height = (element.scrollHeight - element.offsetHeight); // this isn't perfect
        let offset = (element.offsetHeight - element.clientHeight); // and does this fix it? seems to...
        let scrollMax = height + offset;

        element.scrollTop = scrollMax;

        console.log(element.scrollHeight)
       
        // this.$refs.chatbox.scrollTop = this.$refs.chatbox.lastElementChild.offsetTop;
        //
        this.$store.dispatch('setScrollDownStatus',false);
      }
    }
  },
  computed: {
    scrollFlag: function(){
      return this.$store.state.chat.scrolldown_msg;
    },
    totalUnreadCount: function(){
      return this.$store.state.chat.unread_records.length;
    },
    teamUnreadCount: function(){
      var count = 0;
      for(var i = 0; i<this.$store.state.chat.unread_records.length; i++){
        if(this.$store.state.chat.unread_records[i].conv_type == 'team chat'){
          count = count + 1; 
        }
      }
      return count;
    },
    connectedUnreadCount: function(){
      var count = 0;
      for(var i = 0; i<this.$store.state.chat.unread_records.length; i++){
        if(this.$store.state.chat.unread_records[i].conv_type == 'connected'){
          count = count + 1; 
        }
      }
      return count;
    },

    connectedConversations: function() {
        var connectedConversations = [];
        if(this.conv_search_key == null || this.conv_search_key == ""){
          for(var i=0;i<this.$store.state.chat.conversations.length; i++){
            if(this.$store.state.chat.conversations[i].type == 'connected'){
              connectedConversations.push(this.$store.state.chat.conversations[i]);
            }
          }        
          return connectedConversations;
        }
        else{
          var lKey = this.conv_search_key.toLowerCase();
          for(var i=0;i<this.$store.state.chat.conversations.length; i++){
            var lTitle = this.$store.state.chat.conversations[i].title.toLowerCase();
            if(this.$store.state.chat.conversations[i].type == 'connected'){
              
              if(lTitle.includes(lKey)){
                connectedConversations.push(this.$store.state.chat.conversations[i]);
              }
            }
          }
          return connectedConversations;
        }
    },
  },
  created(){
   
    this.loadTeamChat();
    this.loadChatHistory();
  },
  mounted() {
     this.$socket.emit('ping', {user_id: 2});     
     
     this.$socket.on('ping_success', function (res) {
          console.log(res)
      });

      console.log('log-----');
  },
  methods:{
    // Process team chat response
    processTeamChatResponse(data) {
        let group = pick(data, ['id', 'name', 'logo']);
        group.message = pick(data.last_group_message, messageKeys);
        group.label = 'Group chat';
        group.state = 'Typing...'

        return [group, ...map(data.team_members, item => {
            return {
                label: 'Team member',
                state: 'seen',
                name: item.user?.full_name || 'user name',
                logo: item.user?.avatar,
                message: pick(item.last_message, messageKeys)
            }
        })];
    },
    processChatHistoryResponse(data) {

        let singleChat = map(data.single_chat, item => {
            return {
                label: 'Team member',
                state: 'seen',
                name: item.user?.full_name || 'user name',
                logo: item.user?.avatar,
                message: pick(item.last_message, messageKeys)
            }
        });

        
        let privateChat = map(data.private_chat, item => {
            return {
                label: 'Private chat',
                state: 'seen',
                name: item.private_receiver_data?.full_name || 'user name',
                logo: item.private_receiver_data?.avatar,
                message: pick(item.last_private_message, messageKeys)
            }
        });

        let lastGroupMsg = [{
            label: 'Group chat',
            state: 'Typing...',
            name: data.last_group_msg.team.name,
            logo: data.last_group_msg.team.logo,
            message: pick(data.last_group_msg, messageKeys)
        }]

        return [...lastGroupMsg, ...singleChat, ...privateChat];
    },
    async loadTeamChat(){
        try {
            let { data }  = await ApiService.get('/v1/team-chat').then(res => res.data);
            this.teamChat =  this.processTeamChatResponse(data);
        } catch (e) {
            console.error(e);
        }
    },

    async loadChatHistory(){
        try {
            let { data }  = await ApiService.get('/v1/chat-history').then(res => res.data);
            this.chatHistory = this.processChatHistoryResponse(data);
        } catch (e) {
            console.error(e);
        }
    },

    async loadIndividualChatHistory(payload){
        try {
            let { data }  = await ApiService.post('/v1/individual-chat-history', payload).then(res => res.data);

            return data.map(item => {
                item.senderId = item.sender?.id
                return item;
            });
        } catch (e) {
            console.error(e);
        }
    },

    async getIndividualChat({ message : {chat_id, team_id}, name }) {
        const payload = {
          type: 'team',
          chat_id,
          team_id
        };

        this.conversationTitle = '';

        const isAnyKeyValueFalse = !!Object.keys(payload).find(k => !payload[k]);

        if(!isAnyKeyValueFalse) {
            this.conversationTitle = name;
            this.chats = await this.loadIndividualChatHistory(payload);
        }else {
            this.chats = [];
        }
    },
    messageCreatedAt(time) {
        return format(time);
    },
    createConversations(){
      // console.log('create conv clicked');
      // var member_1 = Math.floor(Math.random() * 6) + 1;
      // var member_2 = Math.floor(Math.random() * 7) + 1;
      // var member_3 = Math.floor(Math.random() * 8) + 1;
      // var member_4 = Math.floor(Math.random() * 9) + 1;

      var members = [8,9,10,11];
      // members = this.unique(members);

      // var conv_title = 'Group:'+members[0].toString()+","+members[1].toString()+','+members[2].toString();
      var conv_title = 'test conv';

      // var total = member_1+member_2+member_3;
      // var conv_type = '';
      // if(total % 2 == 0) {
      //     conv_type = 'team chat'; 
      // }
      // else{
      //   conv_type = 'connected';
      // }

      var conv_type = 'connected';

      var newConv = {
        title: conv_title,
        type: conv_type,
        members: members,
        last_msg: ''
      }
    },
    selectConversation(conv_id){
      // this.current_conversation = conv_id;
      this.$store.dispatch('setCurrentConversation',conv_id);
      
      var user_id = this.$store.state.user.user.id;
      var payload = {
        user_id: user_id,
        conv_id:conv_id
      }

      this.$store.dispatch('clearUnreadMsg',payload);
    },
    sendMsg(e){
      e.preventDefault();
      var current_conv = this.$store.state.chat.current_conversation;
      if(current_conv == null || current_conv == ''){
        alert('Please select conversation');
      }
      else{
        var sent_by = this.$store.state.user.user.id;
        var msg_text = this.msg_text;
        var conv_id = this.$store.state.chat.current_conversation;
        var members = this.$store.getters["getChatMemberList"];
        var conv_type = this.$store.getters["getConversationType"];
        // console.log(members);
        var sent_at = new Date();
        var new_msg = {
          conv_id: conv_id,
          msg_text: msg_text,
          sent_by: sent_by,
          sent_at: sent_at

        }
      }
      
      // msgCollection.add(new_msg);
    },
    unique(array){
      return array.filter(function(el, index, arr) {
          return index == arr.indexOf(el);
      });
    },
    checkUnread: function(conv_id){
      for(var i = 0; i < this.$store.state.chat.unread_records.length; i++){
        if(this.$store.state.chat.unread_records[i].conv_id == conv_id){
          return true;
        }
      }
      return false;
    },
    getUserImage(user_id){
      for(var i = 0; i<this.$store.state.chat.user_info.length; i++){
        // console.log(user_id,this.$store.state.chat.user_info[i].user_id);
        if(this.$store.state.chat.user_info[i].user_id == user_id){
          return this.$store.state.chat.user_info[i].per_main_image_url
        }
      }
      return '../../assets/info-img.png';
      // return '../../assets/r-join2.png';
    },
    getMsgDate(msg_date){
      var success = "";
      var date = "";
      try{
        date = msg_date.toDate();
        success = "t";
        //return date;
      }catch(e){
        success = "f";
        var seconds = msg_date.seconds
        date = new Date(seconds*1000);
      }

      if(success == "t"){
        console.log("DateParse:success:",msg_date);
      }
      else{
        console.log("DateParse:fail:",msg_date);
      }

      return date;
    }
  }
};

</script>

<style scoped lang="scss">    
    // start css for chat
    .clearfix {      
      &::after {
        content: "";
        clear: both;
        display: table;
      }
    }
    .chat-wrapper {
      margin: auto;
      padding: 20px;
      width: 100%;
      border-radius: 10px;
      background-color: #ffffff;
      box-shadow: 0px 0px 10px 1px rgba(63, 6, 17, 0.3);
      @media (max-width: 991px) {
        padding: 10px;
      } 
      &::after {
        content: "";
        display: table;
        clear: both;
        overflow: hidden;

      }
      .chat-left {
        float: left;
        width: 400px;
        max-width: 100%;      
        padding-right: 5px;
        min-height: 600px;
        border-right: 2px solid #e5e5e5;   


 
        
        @media (max-width: 913px) {
          .category-item { 
            padding-bottom: 0px;
            margin-bottom: -20px;
            &::after {
              margin-bottom: 20px;
            }    
          }
        }
        
        @media (max-width: 913px) {
          .category-name {
            display: none; 
            padding-bottom: 0px;
            margin-bottom: -100px;
            
          }
        } 
        
        @media (max-width: 991px) {
          width: 45%;
        }  
        @media (max-width: 767px) {
          width: 100%;
          padding-right: 0;
          border-right: 0;
        }
        .chat-title {
          font-size: 30px;
          padding-left: 10px;
          margin-bottom: 15px;
        }
        .chat-search {
          position: relative;        
          margin: 0 10px 10px;
          .has-search {
            svg {
              width: 24px;
              position: absolute;
              top: 50%;
              left: 10px;
              transform: translate(0, -50%);
            }
          }        
          .has-search .form-control {
              padding-left: 50px;
              
              border: 0;
              border-radius: 10px;
              background: #f2f2f2;
              &::after {
                content: "";
                position: absolute;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                top: 0;
                right: 0;
                background-color: #f2f2f2;

              }
          }
          .has-search .form-control-feedback {
              position: absolute;
              z-index: 2;
              display: block;
              width: 2.375rem;
              height: 2.375rem;
              line-height: 2.375rem;
              text-align: center;
              pointer-events: none;
              color: #aaa;
          }
        }
        .chat-category {
          display: flex;
          padding-bottom: 4px;
          padding-top: 2px;
          margin: 0 10px 20px;
          justify-content: space-between;
          border-bottom: 2px solid #f2f2f2;
          border-top: 2px solid #f2f2f2;
          @media (max-width: 991px) {
            padding-bottom: 6px;
          }
          nav {
            width: calc(100% - 44px);
            .nav-tabs {
              border: 0;
              display: flex;
              justify-content: space-between;
              .nav-link {
                margin-bottom: -2px;
                border: 0;
                padding-bottom: 2px;
                @media (max-width: 991px) {
                  padding: 0 5px;
                }
                @media (max-width: 767px) {
                  padding: 0 12px;
                }
                @media (max-width: 375px) {
                  padding: 0 3px;
                }
                .category-item {
                  display: inline-block;
                  text-align: center;
                  position: relative;
                  a {
                    min-height: 48px;
                    display: block;
                    svg {
                      width: 26px;
                      height: 26px;
                      fill: #cccccc;
                    }
                  }
                  img {
                    width: 26px;
                  }
                  .category-name {
                    color: #cccccc;
                    font-size: 14px;  
                    font-weight: bold;       
                    @media (max-width: 990px) {
                      font-size: 8px;
                      font-weight: normal;
                    }                                
                  }

                  
                    .countOfChat {
                      background-color: #e51f76;
                      float: right; 
                      position: absolute;
                      z-index: 1;
                      padding-bottom: 10px;
                      border-radius: 50%;
                      font-size: 11px;
                      color: #ffffff;
                      width: 20px;
                      text-align: center;
                      height: 20px;
                      padding-top: 2px;
                      margin-left: -2px;
                      @media (max-width: 767px) {
                        font-size: 9px;
                        width: 16px;
                        height: 16px;
                      } 
                    } 
                    
                  .dropdown-menu {
                    z-index: 1061;
                    margin-top: 7px;
                    padding: 10px 15px;              
                    box-shadow: 0 0 3px 2px #ddd;
                    transform: none !important;
                    right: 20px;
                    left: auto !important;
                    top: 27px !important;
                    .dropdown-item {
                      padding: 3px 0;
                      margin-bottom: 2px;
                      text-align: center;
                      font-size: 12px;
                      border-radius: 3px;
                      color: #3a3092;
                      background-color: #e6e6e6;
                      &:hover {
                        color: #ffffff;
                        background-color: #e51f76;
                      }
                    }
                  }
                  a {
                    p {
                        margin: 0;
                      }
                  }              
                }
                &.active {
                  .category-item {
                    &::after {
                      content: "";
                      width: 100%;
                      border-bottom: 2px solid #6059a7;
                      height: 2px;
                      background-color: red;
                      position: absolute;
                      left: 0;
                      bottom: -6px;
                    }            
                    svg {
                      fill: #6059a7;
                    }
                    .category-name {
                      color: #6059a7;
                    }
                  }
                }
              }
            }
          }
          .info-button {
            position: relative;
            button {
              &::after {
                  border: 0;
                  width: 12px;
                  height: 20px;
                  margin-top: 7px;
                  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAUCAIAAADOcrCxAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkNFMkU1NjBEQkVFMTExRUJCREYzRjRFMkMxMERCRjAwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkNFMkU1NjBFQkVFMTExRUJCREYzRjRFMkMxMERCRjAwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0UyRTU2MEJCRUUxMTFFQkJERjNGNEUyQzEwREJGMDAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0UyRTU2MENCRUUxMTFFQkJERjNGNEUyQzEwREJGMDAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7zerWhAAABDElEQVR42mL4DwZfv/wEkt+//4ZwWRgYGG7ffH3tyksGMPAP1gGSTN++/oILAcHGtVf+/fvPxMXNxoAKmJgYmX78+IMsxMYOMpOJg4PFwEgaLqRvKAVkMAJtBFIgs5gYEYZAqJcvPgPJVy+/QLggUy6ce/rw/nsIX1VdVEtHnOnTxx9wIYjbf/38w/Tz5180l/389ZdJWIQLWYiPn4OXl50JaLW1naKgEEhORJTH2FQG4TJ07wExUOLm9Vcgq269gYiC1B47/OD1K6hLZWQFjM1kmN69+wYXAoInjz98//ab6f8/dEP//f8PcpmAACdcSEycl5ubDWQuMDBvXHsJ9KGSijDQu8zMTAABBgDuN39O859xpAAAAABJRU5ErkJggg==) no-repeat right center;
              }
            }
            .dropdown-menu {
              z-index: 1061;
              margin-top: 7px;
              padding: 10px 15px;              
              box-shadow: 0 0 3px 2px #ddd;
              transform: none !important;
              right: 0px;
              left: auto !important;
              top: 27px !important;
              .dropdown-item {
                padding: 3px 0;
                margin-bottom: 2px;
                text-align: center;
                font-size: 12px;
                border-radius: 3px;
                color: #3a3092;
                background-color: #e6e6e6;
                &:hover {
                  color: #ffffff;
                  background-color: #e51f76;
                }
              }
            }
          }
          .pending-message {
            display: inline-block;
            background-color: #e51f76;
            border-radius: 50%;
            font-size: 11px;
            color: #ffffff;
            width: 20px;
            text-align: center;
            height: 20px;
            padding-top: 2px;
            // float: right;
            @media (max-width: 767px) {
              font-size: 9px;
              width: 16px;
              height: 16px;
            } 
          }
        }
        .chat-item-wrapper {
          height: 500px;
          overflow-y: auto;
          @media (max-width: 991px) {
            height: 400px;
          } 
          .chat-item {
            padding-top: 15px;
            padding-bottom: 10px;
            border-bottom: 1px solid #ececec;
            .top {
              display: flex;
              .item-img {
                height: 60px;
                width: 50px;
                position: relative;   
                @media (max-width: 991px) {
                  height: 50px;
                  width: 35px;
                }         
                img {
                  width: 50px;
                  border: 2px solid #3ab54a;
                  border-radius: 50%;
                }
                span {
                  right: 1px;
                  bottom: 11px;
                  width: 15px;
                  height: 15px;
                  border-radius: 50%;
                  position: absolute;
                  background-color: #3ab54a;
                  border: 2px solid #ffffff;
                }
              }
              .chat-info {
                max-width: 72%;              
                padding-left: 15px;
                @media (max-width: 991px) {
                  max-width: 66%;
                }
                .chat-group {
                      background-color: #b1acd4;
                      padding: 0px 5px;
                      margin-bottom: 2px;
                      width: auto;
                      float: left;
                      clear: both;
                      border-radius: 5px;
                      font-size: 12px;
                      color: #ffffff;
                }
                .chat-name {
                  font-size: 14px;
                  color: #4e4e4e;
                  font-weight: bold;
                  clear: both;
                }
                .last-chat {
                  color: #a7a7a7;
                  width: 100%;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;

                }              
              }
              .status-info {
                display: flex;
                padding-top: 13px;
                align-items: flex-start;
                .status {
                  width: 16px;
                  height: 16px;
                  background: #e61e76;
                  border-radius: 50%;
                  border: 2px solid #cacaca;
                  margin-top: 10px;
                  margin-right: 5px;
                }
                .info-button {
                  position: relative;
                  button {
                    &::after {
                        border: 0;
                        width: 12px;
                        height: 20px;
                        margin-top: 7px;
                        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAUCAIAAADOcrCxAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkNFMkU1NjBEQkVFMTExRUJCREYzRjRFMkMxMERCRjAwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkNFMkU1NjBFQkVFMTExRUJCREYzRjRFMkMxMERCRjAwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0UyRTU2MEJCRUUxMTFFQkJERjNGNEUyQzEwREJGMDAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0UyRTU2MENCRUUxMTFFQkJERjNGNEUyQzEwREJGMDAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7zerWhAAABDElEQVR42mL4DwZfv/wEkt+//4ZwWRgYGG7ffH3tyksGMPAP1gGSTN++/oILAcHGtVf+/fvPxMXNxoAKmJgYmX78+IMsxMYOMpOJg4PFwEgaLqRvKAVkMAJtBFIgs5gYEYZAqJcvPgPJVy+/QLggUy6ce/rw/nsIX1VdVEtHnOnTxx9wIYjbf/38w/Tz5180l/389ZdJWIQLWYiPn4OXl50JaLW1naKgEEhORJTH2FQG4TJ07wExUOLm9Vcgq269gYiC1B47/OD1K6hLZWQFjM1kmN69+wYXAoInjz98//ab6f8/dEP//f8PcpmAACdcSEycl5ubDWQuMDBvXHsJ9KGSijDQu8zMTAABBgDuN39O859xpAAAAABJRU5ErkJggg==) no-repeat right center;
                    }
                  }
                  .dropdown-menu {
                    z-index: 1061;
                    margin-top: 7px;
                    padding: 10px 15px;              
                    box-shadow: 0 0 3px 2px #ddd;
                    transform: none !important;
                    right: 0px;
                    left: auto !important;
                    top: 27px !important;
                    .dropdown-item {
                      padding: 3px 0;
                      margin-bottom: 2px;
                      text-align: center;
                      font-size: 12px;
                      border-radius: 3px;
                      color: #3a3092;
                      background-color: #e6e6e6;
                      &:hover {
                        color: #ffffff;
                        background-color: #e51f76;
                      }
                    }
                  }
                }
              }
            }
            .bottom {
              display: flex;
              justify-content: space-between;
              position: relative;            
              font-size: 12px;
              .typing {
                color: #776db2;
                padding-left: 65px;
                @media (max-width: 991px) {
                  padding-left: 51px;
                }
              }
              .chat-time {
                color: #776db2;
                padding-right: 24px;
              }
            }          
            &.offline {
              .top {
                .item-img {
                  img {
                    border-color:#fa4943;
                  }
                  span {
                    background-color: #fa4943;
                  }
                }
              }
            }
          }
        }
      }
      .chat-right {
        float: left;
        padding-left: 20px;
        width: calc(100% - 400px);
        @media (max-width: 991px) {
          width: calc(100% - 302px);
        }
        @media (max-width: 767px) {
          width: 100%;
          padding-left: 0;
        }
        .header {            
          border-bottom: 1px solid #d9d9d9;
          padding-bottom: 10px;   
          margin-bottom: 20px;  
          @media (max-width: 991px) {
            position: relative;
          }  
          .left {
            float: left;
            min-width: 277px;
            .top {
              display: flex;
              .item-img {
                width: 50px;                
                position: relative;
                @media (max-width: 767px) {
                  width: 35px;
                  height: 38px;
                }            
                img {
                  width: 50px;
                  border: 2px solid #3ab54a;
                  border-radius: 50%;
                }
                span {
                  right: 2px;
                  bottom: -3px;
                  width: 15px;
                  height: 15px;
                  border-radius: 50%;
                  position: absolute;
                  background-color: #3ab54a;
                  border: 2px solid #ffffff;
                }
              }
              .chat-info {
                max-width: 72%;              
                padding-left: 15px;
                @media (max-width: 767px) {
                  max-width: 57%;
                }
                .chat-group {
                      background-color: #b1acd4;
                      padding: 0px 5px;
                      margin-bottom: 2px;
                      width: auto;
                      float: left;
                      clear: both;
                      border-radius: 5px;
                      font-size: 12px;
                      color: #ffffff;
                }
                .chat-name {
                  font-size: 14px;
                  color: #4e4e4e;
                  font-weight: bold;
                  clear: both;
                }
                .last-chat {
                  color: #6059a7;
                  font-size: 12px;
                  width: 100%;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;

                }              
              }
              .status-info {
                display: flex;
                padding-top: 13px;
                align-items: flex-start;
                .status {
                  width: 16px;
                  height: 16px;
                  background: #e61e76;
                  border-radius: 50%;
                  border: 2px solid #cacaca;
                  margin-top: 10px;
                  margin-right: 5px;
                }
                .info-button {
                  position: relative;
                  button {
                    &::after {
                        border: 0;
                        width: 12px;
                        height: 20px;
                        margin-top: 7px;
                        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAUCAIAAADOcrCxAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkNFMkU1NjBEQkVFMTExRUJCREYzRjRFMkMxMERCRjAwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkNFMkU1NjBFQkVFMTExRUJCREYzRjRFMkMxMERCRjAwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0UyRTU2MEJCRUUxMTFFQkJERjNGNEUyQzEwREJGMDAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0UyRTU2MENCRUUxMTFFQkJERjNGNEUyQzEwREJGMDAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7zerWhAAABDElEQVR42mL4DwZfv/wEkt+//4ZwWRgYGG7ffH3tyksGMPAP1gGSTN++/oILAcHGtVf+/fvPxMXNxoAKmJgYmX78+IMsxMYOMpOJg4PFwEgaLqRvKAVkMAJtBFIgs5gYEYZAqJcvPgPJVy+/QLggUy6ce/rw/nsIX1VdVEtHnOnTxx9wIYjbf/38w/Tz5180l/389ZdJWIQLWYiPn4OXl50JaLW1naKgEEhORJTH2FQG4TJ07wExUOLm9Vcgq269gYiC1B47/OD1K6hLZWQFjM1kmN69+wYXAoInjz98//ab6f8/dEP//f8PcpmAACdcSEycl5ubDWQuMDBvXHsJ9KGSijDQu8zMTAABBgDuN39O859xpAAAAABJRU5ErkJggg==) no-repeat right center;
                    }
                  }
                  .dropdown-menu {
                    z-index: 1061;
                    margin-top: 7px;
                    padding: 10px 15px;              
                    box-shadow: 0 0 3px 2px #ddd;
                    transform: none !important;
                    right: 0px;
                    left: auto !important;
                    top: 27px !important;
                    .dropdown-item {
                      padding: 3px 0;
                      margin-bottom: 2px;
                      text-align: center;
                      font-size: 12px;
                      border-radius: 3px;
                      color: #3a3092;
                      background-color: #e6e6e6;
                      &:hover {
                        color: #ffffff;
                        background-color: #e51f76;
                      }
                    }
                  }
                }
              }
            }
          }
          .middle {
            float: left;
            @media (max-width: 991px) {
              margin-left: 66px;
            }
            @media (max-width: 767px) {
              clear: both;
            }
            .chat-group {
              background-color: #8882be;
              padding: 0 5px;
              font-size: 11px;
              color: #ffffff;
              width: auto;
              border-radius: 5px;
            }
          }
          .right {
            float: right;
            @media (max-width: 991px) {
              position: absolute;
              right: 0;
            }
            .chat-search {
              float: left;
              position: absolute;
              right: 50px;
              margin: 0 10px 0 0;
              @media (max-width: 991px) {
                right: 20px;
              }
              @media (max-width: 767px) {
                right: 10px;
              }
              .has-search {
                position: relative;
                padding-right: 30px;
                background-color: #eceaf5;
                border: 0;
                border-radius: 25px;                
                height: 40px;
                transition: 0.5s;
                padding: 0;
                svg {
                  width: 21px;
                  position: absolute;
                  top: 50%;
                  right: 10px;
                  z-index: 0;
                  transform: translate(0, -50%);
                }
              }        
              .has-search .form-control {
                  padding-right: 30px;
                  border: 0;                  
                  width: 40px;
                  height: 40px;
                  transition: 0.5s;
                  padding: 0 15px;
                  position: relative;
                  z-index: 1;
                  background: transparent;
                  box-shadow: none;
                  cursor: pointer;
                  &:focus {
                    width: 230px;
                    transition: 0.5s;
                    border-radius: 7px;
                  }
              }
              .has-search .form-control-feedback {
                  position: absolute;
                  z-index: 2;
                  display: block;
                  width: 2.375rem;
                  height: 2.375rem;
                  line-height: 2.375rem;
                  text-align: center;
                  pointer-events: none;
                  color: #aaa;
              }
            }
            .info-button {
              float: left;
              position: relative;
              button {
                &::after {
                    border: 0;
                    width: 12px;
                    height: 20px;
                    margin-top: 7px;
                    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAUCAIAAADOcrCxAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkNFMkU1NjBEQkVFMTExRUJCREYzRjRFMkMxMERCRjAwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkNFMkU1NjBFQkVFMTExRUJCREYzRjRFMkMxMERCRjAwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0UyRTU2MEJCRUUxMTFFQkJERjNGNEUyQzEwREJGMDAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0UyRTU2MENCRUUxMTFFQkJERjNGNEUyQzEwREJGMDAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7zerWhAAABDElEQVR42mL4DwZfv/wEkt+//4ZwWRgYGG7ffH3tyksGMPAP1gGSTN++/oILAcHGtVf+/fvPxMXNxoAKmJgYmX78+IMsxMYOMpOJg4PFwEgaLqRvKAVkMAJtBFIgs5gYEYZAqJcvPgPJVy+/QLggUy6ce/rw/nsIX1VdVEtHnOnTxx9wIYjbf/38w/Tz5180l/389ZdJWIQLWYiPn4OXl50JaLW1naKgEEhORJTH2FQG4TJ07wExUOLm9Vcgq269gYiC1B47/OD1K6hLZWQFjM1kmN69+wYXAoInjz98//ab6f8/dEP//f8PcpmAACdcSEycl5ubDWQuMDBvXHsJ9KGSijDQu8zMTAABBgDuN39O859xpAAAAABJRU5ErkJggg==) no-repeat right center;
                }
              }
              .dropdown-menu {
                z-index: 1061;
                margin-top: 7px;
                padding: 10px 15px;              
                box-shadow: 0 0 3px 2px #ddd;
                transform: none !important;
                right: 0px;
                left: auto !important;
                top: 27px !important;
                .dropdown-item {
                  padding: 3px 0;
                  margin-bottom: 2px;
                  text-align: center;
                  font-size: 12px;
                  border-radius: 3px;
                  color: #3a3092;
                  background-color: #e6e6e6;
                  &:hover {
                    color: #ffffff;
                    background-color: #e51f76;
                  }
                }
              }
            }
          }          
        }
        .chat-area {
          min-height: 620px;
          display: flex;
          flex-direction: column;
          position: relative;
          @media (max-width: 991px) {
            min-height: 600px;
          }
          @media (max-width: 991px) {
            min-height: auto;
          }
          .chat-box {
            height: 500px;
            overflow-y: auto;
            display: flex;
            flex-direction: column-reverse;
            @media (max-width: 991px) {
              height: 500px;
            }
            .chats {
              display: flex;     
              margin-bottom: 20px;       
              .item-img {
                width: 30px;
                height: 30px;
                position: relative;
                margin-right: 10px;
                img {
                  width: 50px;
                  border: 2px solid #3ab54a;
                  border-radius: 50%;
                }
                span {
                  right: 1px;
                  right: 1px;
                  bottom: -2px;
                  width: 9px;
                  height: 9px;
                  border-radius: 50%;
                  position: absolute;
                  background-color: #3ab54a;
                  border: 1px solid #ffffff;
                }
              }
              .message {
                max-width: 60%;
                @media (max-width: 991px) {
                  max-width: 76%;
                }
                .msg-text {
                  font-size: 14px;
                  background: #eceaf5;
                  border-radius: 5px;
                  padding: 5px;
                  margin-bottom: 5px;  
                }
                .date-time {
                  font-size: 10px;
                  margin: 0;
                  span {
                    background-color: #6159a7;
                    color: #ffffff;
                    padding: 0 6px;
                    border-radius: 4px;
                  }
                }
              }
              .info-button {
                position: relative;
                button {
                  &::after {
                      border: 0;
                      width: 12px;
                      height: 20px;
                      margin-top: 7px;
                      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAUCAIAAADOcrCxAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkNFMkU1NjBEQkVFMTExRUJCREYzRjRFMkMxMERCRjAwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkNFMkU1NjBFQkVFMTExRUJCREYzRjRFMkMxMERCRjAwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0UyRTU2MEJCRUUxMTFFQkJERjNGNEUyQzEwREJGMDAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0UyRTU2MENCRUUxMTFFQkJERjNGNEUyQzEwREJGMDAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7zerWhAAABDElEQVR42mL4DwZfv/wEkt+//4ZwWRgYGG7ffH3tyksGMPAP1gGSTN++/oILAcHGtVf+/fvPxMXNxoAKmJgYmX78+IMsxMYOMpOJg4PFwEgaLqRvKAVkMAJtBFIgs5gYEYZAqJcvPgPJVy+/QLggUy6ce/rw/nsIX1VdVEtHnOnTxx9wIYjbf/38w/Tz5180l/389ZdJWIQLWYiPn4OXl50JaLW1naKgEEhORJTH2FQG4TJ07wExUOLm9Vcgq269gYiC1B47/OD1K6hLZWQFjM1kmN69+wYXAoInjz98//ab6f8/dEP//f8PcpmAACdcSEycl5ubDWQuMDBvXHsJ9KGSijDQu8zMTAABBgDuN39O859xpAAAAABJRU5ErkJggg==) no-repeat right center;
                  }
                }
                .dropdown-menu {
                  z-index: 1061;
                  margin-top: 7px;
                  padding: 10px 15px;              
                  box-shadow: 0 0 3px 2px #ddd;
                  transform: none !important;
                  right: 0px;
                  left: auto;
                  top: 27px !important;
                  .dropdown-item {
                    padding: 3px 0;
                    margin-bottom: 2px;
                    text-align: center;
                    font-size: 12px;
                    border-radius: 3px;
                    color: #3a3092;
                    background-color: #e6e6e6;
                    &:hover {
                      color: #ffffff;
                      background-color: #e51f76;
                    }
                  }
                }
              }
              &.me {            
                flex-direction: row-reverse;
                .item-img {
                  margin-right: 0;
                  margin-left: 10px;
                }
                .dropdown-menu {
                  left: auto !important;
                  @media (max-width: 767px) {
                    left: 0 !important;
                  }
                }
                .msg-text {
                  background-color: #3f9de7;
                  color: #ffffff;
                } 
                .date-time {
                  text-align: right;
                }                     
              } 
            } 
          } 
          .footer {
            position: absolute;
            bottom: 0;
            left: 0;         
            width: 100%; 
            .footer-top {
              font-size: 12px;
              color: #818181;
              margin-bottom: 30px;
            }
            .footer-bottom {
              .left {
                width: 100%;
                display: flex;
                justify-content: space-between;
                .message-box {
                  position: relative;
                  width: 100%;
                  textarea {
                    height: 36px;
                    width: 100%;
                    border: 0;
                    padding: 7px 15px 7px 40px;
                    border-radius: 18px;
                    background-color: #eceaf5;
                    resize: none;
                    @media (max-width: 767px) {
                      padding-left: 32px;
                    }
                  }
                  .btn-emoji, .btn-multimedia, .btn-files {
                    position: absolute;
                    top: -3px;
                    right: 16px;
                    margin-left: 10px;
                    @media (max-width: 767px) {
                      right: 6px;
                    }
                  }
                  .btn-emoji {
                    right: auto;
                    left: -8px;
                    top: 3px;
                  }
                  .btn-multimedia {
                    right: 45px;
                    @media (max-width: 767px) {
                      right: 30px;
                    }
                  }
                  svg {                   
                    .cls-1{fill:#fff;}
                    .cls-2{fill:#8983be;}
                    .files {
                      fill: #6159a8;
                    }
                    .multimedia {
                      fill: #6159a8;
                    }
                  } 
                }                
                button {
                  display: flex;
                  justify-content: space-between;
                  font-size: 15px;
                  height: 36px;                  
                  line-height: 28px;                  
                  @media (max-width: 767px) {
                    min-width: auto;
                  }
                  svg {
                    width: 18px;
                    float: left;
                    margin-top: 9px;
                    margin-left: 6px;
                    .cls-1{fill:#fff;}
                    .cls-2{fill:#8983be;}
                    @media (max-width: 767px) {
                      display: none;
                    }
                  }                                                    
                } 
              }              
            }
          }                 
        }
      }
    }
    

    // css custom scrollbar
    /* width */
    ::-webkit-scrollbar {
      width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      // box-shadow: inset 0 0 5px grey; 
      background-color: #e6e6e6;
      border-radius: 10px;
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #d9d6e9; 
      border-radius: 10px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #bcb5de; 
    }
    // end css for chat
</style>
