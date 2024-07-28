<template>
  <div class="flip-card">
    <div class="flip-card-inner">
      <div class="flip-card-front ">
<!--        <div class="col-12" id="flex-container">-->
<!--          <img-->
<!--              :src="connection.candidateInfo && connection.candidateInfo.candidate_image ? connection.candidateInfo.candidate_image : avatarSrc"-->
<!--              alt=""-->
<!--              id="card-image"-->
<!--          />-->
<!--        </div>-->
<!--        <div class="col-12" id="flex-container-list">-->
<!--          <div class="card-body py-2 d-flex flex-column h-full justify-content-between">-->
<!--            <div>-->
<!--              <h5 class="card-title">{{ connection.candidateInfo ? connection.candidateInfo.candidate_fname : 'Not found' }} {{ connection.candidateInfo ? connection.candidateInfo.candidate_lname : '' }}</h5>-->

<!--              <ul class="desc-list">-->
<!--                &lt;!&ndash; Team &ndash;&gt;-->
<!--                <li class="flex-between-start">-->
<!--                  <span class="flex-30 label-text">Team</span>-->
<!--                  <span class="flex-70">:-->
<!--									<span class="ml-1"><router-link class="team-link" :to="{name: 'ManageTeam', query: {team_id: connection.to_team_id}}">{{ connection.to_team_name }}</router-link></span>-->
<!--								</span>-->
<!--                </li>-->
<!--                &lt;!&ndash; Location &ndash;&gt;-->
<!--                <li class="flex-between-start">-->
<!--                  <span class="flex-30 label-text">Location</span>-->
<!--                  <span class="flex-70">:-->
<!--									<span class="ml-1">{{ connection.candidateInfo ? connection.candidateInfo.candidate_location : 'N/A' }}</span>-->
<!--								</span>-->
<!--                </li>-->
<!--                &lt;!&ndash; Age &ndash;&gt;-->
<!--                <li class="flex-between-start">-->
<!--								<span class="flex-30 label-text">Age</span-->
<!--                ><span class="flex-70"-->
<!--                >:-->
<!--									<span class="ml-1">{{ connection.candidateInfo ? getAge(connection.candidateInfo.candidate_age) : 'Not found' }} Yrs </span></span-->
<!--                >-->
<!--                </li>-->
<!--                &lt;!&ndash; Religion &ndash;&gt;-->
<!--                <li class="flex-between-start">-->
<!--								<span class="flex-30 label-text">Religion</span-->
<!--                ><span class="flex-70"-->
<!--                >:-->
<!--									<span class="ml-1"-->
<!--                  >{{ connection.candidateInfo ? connection.candidateInfo.candidate_religion : 'Not found' }}-->
<!--									</span></span-->
<!--                >-->
<!--                </li>-->

<!--                <li class="flex-between-start">-->
<!--                  <span class="flex-30 label-text">Ethnicity</span>-->
<!--                  <span class="flex-70">:-->
<!--									<span class="ml-1">{{ connection.candidateInfo ? connection.candidateInfo.candidate_ethnicity : 'Not found' }} </span>-->
<!--								</span>-->
<!--                </li>-->
<!--              </ul>-->

<!--            </div>-->
<!--            <div class="mt-2">-->
<!--              <grid-buttons :type="type" @block="block"-->
<!--                            @disconnectTeam="disconnectTeam"-->
<!--                            @startConversation="startConversation"-->
<!--                            @viewProfile="viewProfile"-->
<!--                            @acceptRequest="acceptRequest"-->
<!--                            @declineRequest="declineRequest"/>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->

        <v-card
            class="mx-auto shadow-default shortlist-card position-relative"
        >
          <template slot="progress">
            <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
            ></v-progress-linear>
          </template>
          <v-img
              height="250"
              :src="connection.candidateInfo && connection.candidateInfo.candidate_image ? connection.candidateInfo.candidate_image + `?token=${token}` : avatarSrc"
          ></v-img>

            <v-chip
                class="ma-2 chip-position"
                :color="getTypeColor"
                text-color="white"
                small
            >
              {{ type }}
            </v-chip>
          <v-card-title>
            {{ connection.candidateInfo ? connection.candidateInfo.candidate_fname : 'Not found' }} {{ connection.candidateInfo ? connection.candidateInfo.candidate_lname : '' }}
          </v-card-title>

          <div class="px-4">
            <ul class="desc-list p-0">
              <!-- Team -->
              <li class="flex-between-start">
                <span class="flex-30 label-text">Team</span>
                <span class="flex-70">:
                    <span class="ml-1 team-link cursor-pointer text-break" @click="showTeamInfo = true">{{ getTeamName() }}
                    </span>
                </span>
              </li>
              <!-- Location -->
              <li class="flex-between-start">
                <span class="flex-30 label-text">Location</span>
                <span class="flex-70">:
                    <span class="ml-1">{{ connection.candidateInfo ? connection.candidateInfo.candidate_location : 'N/A' }}
                    </span>
                </span>
              </li>
              <!-- Age -->
              <li class="flex-between-start">
                <span class="flex-30 label-text">Age</span>
                <span class="flex-70">:
                    <span class="ml-1">{{ connection.candidateInfo ? getAge(connection.candidateInfo.candidate_age) : 'Not found' }} Yrs </span>
                </span>
              </li>

              <!-- Religion -->
              <li class="flex-between-start">
                <span class="flex-30 label-text">Religion</span>
                <span class="flex-70">:
                    <span class="ml-1">{{ connection.candidateInfo ? connection.candidateInfo.candidate_religion : 'Not found' }}</span>
                </span>
              </li>
            </ul>
            <a-modal 
              :open="showTeamInfo" 
              :closable="true"
              title="Team Info" 
              @ok="showTeamInfo = false" 
              @cancel="showTeamInfo = false" 
              :ok-button-props="{ disabled: true }"
              :cancel-button-props="{ disabled: true }"
            >
              <div class="row">
                <div class="col-12 col-md-6 d-flex justify-conent-center align-items-center">
                  <v-img
                    style="border: 2px solid white; background-size: cover;"
                    class="white--text align-end rounded mx-auto"
                    max-width="150px"
                    max-height="150px"
                    :src="connection.team_logo + `?token=${token}`"
                  ></v-img>
                </div>
                <div class="col-12 col-md-6">
                  <span class="fw-600">Team Name</span> <br> {{ connection.to_team_name }} <br><br>
                  <span class="fw-600">Team Members</span> <br> {{ connection.total_teamMember }} <br><br>
                  <span class="fw-600">Team Creation Date</span><br> {{ dateFromTimeStamp(connection.team_created_date) }} <br><br>
                  <span class="fw-600">Team Created By</span><br> {{ connection.team_created_by }}
                </div>
              </div>
        
              <template slot="footer">
                <a-button key="submit" type="primary" shape="round" @click="showTeamInfo = false">
                Ok
                </a-button>
              </template>
            </a-modal>
          </div>
          <v-divider class="mx-4"></v-divider>

          <grid-buttons class="pb-3" :type="type" @block="block"
                        @disconnectTeam="disconnectTeam"
                        @startConversation="startConversation"
                        @viewProfile="viewProfile"
                        @acceptRequest="acceptRequest"
                        @declineRequest="declineRequest"
                        @gotoChat="gotoChat" 
                        @connect="connectRequest"
                        />
        </v-card>

      </div>
      <div class="flip-card-back text-center">
        <v-card class="mx-auto shadow-default shortlist-card flipped position-relative">
          <div class="flex flex-column justify-content-center h-100">
            <div>
              <ButtonComponent
                :isSmall="true"
                title="This Profile Connection Overview"
                :responsive="false"
                @onClickButton="showProfileConnectionOverview = true"
              />
              <a-modal 
                :oepn="showProfileConnectionOverview" 
                :closable="true"
                title="This Profile Connection Overview" 
                @ok="showProfileConnectionOverview = false" 
                @cancel="showProfileConnectionOverview = false" 
                :ok-button-props="{ disabled: true }"
                :cancel-button-props="{ disabled: true }"
                >
                <span class="fw-600">Connection Status</span> <br> {{ connection.connection }} <br><br>
                <span class="fw-600">Connected Date</span> <br> {{ dateFromDateTime(connection.responded_at) }} <br><br>
                <span class="fw-600">Connection Requested By</span><br> {{ connection.requested_by.full_name }} <br><br>
                <span class="fw-600">Request Date</span><br> {{ dateFromDateTime(connection.requested_at) }}

                <template slot="footer">
                  <a-button key="submit" type="primary" shape="round" @click="showProfileConnectionOverview = false">
                    Ok
                  </a-button>
                </template>
              </a-modal>
            </div>

            <div @click="showProfileTeamOverview = true" style="cursor: pointer">
              <ButtonComponent
                class="mt-2"
                :isSmall="true"
                title="This Profile Team Overview"
                :responsive="false"
                @onClickButton="showProfileTeamOverview = true"
              />
            </div>
            <div>
              <ButtonComponent
                class="mt-2"
                iconHeight="14px"
                :isSmall="true"
                title="Back"
                :responsive="false"
                @onClickButton="rotated = !rotated"
              />
            </div>
          </div>


<!--          <table class="table table-borderless overview-table">-->
<!--            <tr>-->
<!--              <td class="td-60">Team name</td>-->
<!--              <td class="text-end">:</td>-->
<!--              <td>{{ connection.to_team_name }}</td>-->
<!--            </tr>-->
<!--            <tr>-->
<!--              <td class="td-60">Team members</td>-->
<!--              <td class="text-end">:</td>-->
<!--              <td>{{ connection.total_teamMember }}</td>-->
<!--            </tr>-->
<!--            <tr>-->
<!--              <td class="td-60">Team creation date</td>-->
<!--              <td class="text-end">:</td>-->
<!--              <td>{{ dateFromTimeStamp(connection.team_created_date) }}</td>-->
<!--            </tr>-->
<!--            <tr>-->
<!--              <td class="td-60">Team created by</td>-->
<!--              <td class="text-end">:</td>-->
<!--              <td>{{ connection.team_created_by }}</td>-->
<!--            </tr>-->
<!--          </table>-->
        </v-card>
      </div>
    </div>

    <div class="position-absolute icon-rotate-box cursor-pointer" @click="showProfileConnectionOverview = true">
    <HistoryOutlined :style="{ fontSize: '16px' }"/>
    </div>
  </div>
</template>

<script>
import {getAge, dateFromDateTime, dateFromTimeStamp} from "@/common/helpers.js";
import JwtService from "@/services/jwt.service";
import GridButtons from "./GridButtons.vue";
import ButtonComponent from '@/components/atom/ButtonComponent.vue';

import {
  HistoryOutlined
} from '@ant-design/icons-vue';

export default {
  name: "CandidateGridView",
  components: {GridButtons, ButtonComponent, HistoryOutlined},
  props: ["connection", "active_team_id"],
  created() {
    this.token = JSON.parse(localStorage.getItem("token"));
  },
  data() {
    return {
      avatarSrc: "https://www.w3schools.com/w3images/avatar2.png",
      conversations: [],
      type: this.connection.connection_type,
      rotated: false,
      showTeamInfo: false,
      showProfileConnectionOverview: false,
      showProfileTeamOverview: false,
      token: ""
    };
  },
  mounted() {
    // var self = this;
    // firebase.collection("conversations").get().then(querySnapshot => {
    // 		console.log(`Found ${querySnapshot.size} documents.`);
    // 		querySnapshot.forEach(doc => {
    // 			var convDetails = doc.data();
    // 			convDetails.id = doc.id;
    // 			self.conversations.push(convDetails);
    // 		});
    // 	});
    this.conversations = this.$store.state.chat.conversations;
    console.log("conversations loaded");
    // this.$store.dispatch("getConwiseInfo");
  },
  computed: {
    // location() {
    // 	return this.$store.state.candidateInfo.countries[
    // 		this.connection.candidate_location
    // 	].name;
    // },
    classObject() {
      if (this.type == "connected") {
        return {
          connected: this.type,
        };
      } else if (this.type == "Request received") {
        return {
          received: this.type,
        };
      } else if (this.type == "Request sent") {
        return {
          "request-sent": this.type,
        };
      } else if (this.type == "we declined") {
        return {
          "we-declined": this.type,
        };
      } else {
        return {
          "they-declined": this.type,
        };
      }
    },
    getTypeColor() {
      if (this.type == "connected") {
        return 'green';
      } else if (this.type == "Request received") {
        return '#2196f3';
      } else if (this.type == "Request sent") {
        return '#fb8c00';
      } else if (this.type == "we declined") {
        return '#ff5252';
      } else {
        return 'indigo';
      }
    }
  },
  methods: {
    getAge,
    dateFromDateTime, //From helpers.js
    dateFromTimeStamp,
    selectCandidate() {
      console.log(this.connection.team_name);
      this.selectedData = this.connection;
      this.$emit("selected-connection", this.connection);
    },
    viewProfile() {
      this.$router.push(
          `/user/profile/${this.connection.candidateInfo.candidate_userid}`
      );
    },
    prepareNotifyData() {
      const teamId = JwtService.getTeamIDAppWide();
      let teamMembers = [...this.connection.from_team_members, ...this.connection.to_team_members];
      let loggedUser = JSON.parse(localStorage.getItem('user'));
      teamMembers = teamMembers.filter(item => item !== loggedUser.id);
      let my_team = this.connection.from_team_id == teamId ? this.connection.from_team_name : this.connection.to_team_name;
      let my_team_id = this.connection.from_team_id == teamId ? this.connection.to_team_table_id : this.connection.from_team_table_id;
      let notifyObj = {
        receivers: teamMembers,
        team_id: my_team_id,
        team_temp_name: my_team
      };
      return notifyObj;
    },
    acceptRequest() {
      let notifyObject = this.prepareNotifyData();
      notifyObject.title = `accepted your connection request`;
      this.$emit("accept-request", this.connection.connection_id, notifyObject);
    },
    disconnectTeam() {
      let notifyObject = this.prepareNotifyData();
      notifyObject.title = `disconnected team connection`;
      this.$emit("disconnect-team", this.connection, notifyObject);
    },
    declineRequest() {
      let payload = {
        request_id: this.connection.connection_id
      };
      if(this.connection.from_team_id == this.active_team_id) {
        payload.connection_status = '10';
      } else {
        payload.connection_status = '2';
      }

      let notifyObject = this.prepareNotifyData();
      notifyObject.title = `declined your connection request`;

      this.$emit("decline-request", payload, notifyObject);
    },
    connectRequest() {
      let teamId = JwtService.getTeamIDAppWide();
      let notifyObject = this.prepareNotifyData();
      notifyObject.title = `sent you a connection request`;

      if (this.connection.from_team_id != teamId) {
        this.$emit("connect-request", this.connection.from_team_id, notifyObject);
      } else {
        this.$emit("connect-request", this.connection.to_team_id, notifyObject);
      }
    },
    block() {
      let notifyObject = this.prepareNotifyData();
      notifyObject.title = `blocked ${this.connection.candidateInfo.first_name}`;
      notifyObject.receivers = [...this.connection.from_team_members]

      this.$emit(
          "block-candidate",
          this.connection.candidateInfo.candidate_userid,
          this.connection,
          notifyObject
      );
    },
    startConversation() {
      // console.log("start clicked");
      // var con_id = this.connection.connection_id;
      // var conwise_chatinfo = this.$store.state.chat.conwise_info;
      // for (var i = 0; i < conwise_chatinfo.length; i++) {
      //   if (conwise_chatinfo[i].con_id == con_id) {
      //     var chat_title = conwise_chatinfo[i].title;
      //     var member_list = conwise_chatinfo[i].member_list;
      //     var chat_category = "connected_" + con_id.toString();
      //     var check = this.checkChatCategory(chat_category);
      //     if (check) {
      //       console.log("chat found");
      //       this.$store.dispatch("setCurrentConversation", check);
      //     } else {
      //       var newConv = {
      //         title: chat_title,
      //         type: "connected",
      //         members: member_list,
      //         last_msg: "",
      //         category_id: chat_category,
      //       };
      //       var convCollection = firebase.collection("conversations");
      //       var newconvid = "";
      //       var self = this;
      //       convCollection
      //           .add(newConv)
      //           .then(function (docRef) {
      //             newconvid = docRef.id;
      //             self.$store.dispatch("setCurrentConversation", docRef.id);
      //             console.log("Document written with ID: ", docRef.id);
      //           })
      //           .catch(function (error) {
      //             console.error("Error adding document: ", error);
      //           });
			//
      //       console.log("New conv ID:", newconvid);
      //       // this.$store.dispatch('setCurrentConversation',newconvid);
      //       alert("conv createed:" + chat_title);
      //     }
      //     this.$router.push("/chat-window");
      //   }

    },
    checkChatCategory(categoryId) {
      console.log("inside");
      console.log(this.conversations.length);
      console.log(this.conversations);
      for (var i = 0; i < this.conversations.length; i++) {
        console.log("category given:", categoryId);
        console.log("category item:", this.conversations[i].category_id);
        if (this.conversations[i].category_id == categoryId) {
          console.log(this.conversations[i].id);
          return this.conversations[i].id;
        }
      }
      return false;
    },
    getTeamName() {
      if(this.active_team_id == this.connection.from_team_id) {
        return this.connection.to_team_name;
      } else {
        return this.connection.from_team_name;
      }
    },
    getTeamLink() {
      if(this.active_team_id == this.connection.from_team_id) {
        return this.connection.to_team_table_id;
      } else {
        return this.connection.from_team_table_id;
      }
    },
    gotoChat() {
      this.$router.push({ name: 'ChatWindow', query: { connection_id: this.connection.connection_id }, params: { connection_id: this.connection.connection_id } });
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";

.chip-position {
  position: absolute !important;
  top: 0;
  right: 0;
  border: 1px solid !important;
}

.card {
  @media (max-width: 558px) {
    height: 280px;
  }
  .card-img {
    height: 250px;
    float: left;
    margin-right: 0px;
    width: 100%;
    @media (max-width: 671px) {
      height: 100%;
      display: block;
    }

    @media (max-width: 610px) {
      height: 100%;
      display: block;
    }

    @media (max-width: 588px) {
      height: 90%;
      display: block;
    }

    @media (max-width: 552px) {
      height: 85%;
    }


    @media (max-width: 537px) {
      height: 80%;
    }


    @media (max-width: 525px) {
      height: 70%;
    }

    @media (max-width: 409px) {
      height: 60%;
    }
  }
  .card-body {
    float: right;
    overflow: hidden;

    @media (max-width: 511px) {
      margin-left: -10px;
      margin-top: -8px;
    }
    .desc-list {
      line-height: 1.5;

      @media (max-width: 679px) {
        font-size: 12px;
        line-height: 1;
      }


      @media (max-width: 543px) {
        font-size: 10px;
        margin-top: -10px;

      }


      @media (max-width:365px) {
        font-size: 8px;
      }
    }
    .btn-brand {
      background: $color-brand;
    }
    .card-title {
      @media (max-width: 610px) {
        font-size: 15px;
        margin-bottom: -10px;
      }

      @media (max-width: 543px) {
        font-size: 11px;
      }

      @media (max-width: 387px) {
        font-size: 10px;
      }


      @media (max-width: 376px) {
        font-size: 9px;
      }


      @media (max-width: 365px) {
        font-size: 8px;
      }
    }
  }

  #flex-container {
    display: flex;
  }

  #flex-container-list {
    margin-right: -10px;
    display: flex;
  }
}



#viewMoreDetails {
  align-items: center;
  width: 80%;
  padding: 3px 0;
  position: absolute;
  bottom: 5px;


  @media (max-width: 671px) {
    bottom: -60px;
  }


  @media (max-width: 584px) {
    font-size: 12px;
  }

  @media (max-width: 542px) {
    font-size: 10px;
    bottom: -100px;
  }


  @media (max-width: 501px) {
    font-size: 10px;
    bottom: -115px;
  }
  @media (max-width: 482px) {
    font-size: 10px;
    bottom: -100px;
    padding: 1px 2px;
  }
}

#connectButton {
  margin: 7px;
  padding-left: 9px;
  padding-right: 9px;
  margin-bottom: 0px;
  position: absolute;
  right: 25px;
  bottom: 35px;



  @media (max-width: 772px) {
    bottom: 35px;
  }



  @media (max-width: 671px) {
    bottom: -30px;
    margin-left: -100px;
    left: 128px;
  }

  @media (max-width: 542px) {
    font-size: 10px;
    bottom: -75px;
  }

  @media (max-width: 511px) {
    margin-left: -110px;
  }
  @media (max-width: 482px) {
    font-size: 8px;
    bottom: -60px;
    padding: 1px 2px;
  }
}


#shortlistButton {
  margin-left: 7px;
  padding-left: 9px;
  padding-right: 9px;
  margin-bottom: 0px;
  position: absolute;
  bottom: 35px;

  @media (max-width: 772px) {
    bottom: 60px;
  }


  @media (max-width: 671px) {
    bottom: -7px;
  }

  @media (max-width: 542px) {
    font-size: 10px;
    bottom: -55px;
  }
  @media (max-width: 482px) {
    font-size: 8px;
    bottom: -40px;
    padding: 1px 2px;
  }

}


.gridCardDesign {

  @media (max-width: 666px) {
    margin-right: 0px;
    margin-left: 5px;
  }

  @media (max-width: 463px) {
    height: 270px;
  }
  @media (max-width: 444px) {
    margin: 4px -25px 4px -20px;

  }



  @media (max-width: 380px) {
    margin: 2px -25px 4px -40px;
  }


  @media (max-width: 370px) {
    height: 290px;
    margin: 4px -25px 4px -40px;

  }


  @media (max-width: 359px) {
    margin: 4px -35px 4px -50px;

  }

  @media (max-width: 335px) {
    margin: 4px -40px 4px -40px;

  }

  @media (max-width: 330px) {
    margin: 4px -50px 4px -40px;

  }
}

.candidate-top-right-corner {
  width: 45px;
  height: 45px;
  border-radius: 5px;
  overflow: hidden;
  top: 0;
  right: 6px;
}

.candidate-top-right-corner:after {
  content: '';
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 40px 40px 0;
  border-color: transparent transparent transparent transparent;
  right: 0;
  top: 0;
  position: absolute;
}

.block-button {
  background: $bg-brand;
}

.grid-action-btn {
  border-color: #f9f9f9;
}


#card-image {
  height: 190px;
  width: 100%;
  //float: left;
  display: flex;
  //@media (max-width: 768px) {
  //  width: 100%;
  //}
  //@media (max-width: 368px) {
  //  height: 80%;
  //  width: 80%;
  //  display: block;
  //}
  //@media (max-width: 358px) {
  //  height: 80%;
  //  width: 80%;
  //  display: block;
  //}
}

.connected-bg:after {
  border-color: transparent #3ab549 transparent transparent;
}

.request-received-bg:after {
  border-color: transparent #fbb03b transparent transparent;
}

.request-sent-bg:after {
  border-color: transparent #1bb9c2 transparent transparent;
}

.self-declined-bg:after {
  border-color: transparent #fa4942 transparent transparent;
}

.they-declined-bg:after {
  border-color: transparent #522e8e transparent transparent;
}
.grid-item {
  border: 3px solid #ffffff;
}
.grid-item:hover {
  border: 3px solid #3f9de7;
  //border-top-right-radius: 7px;
}
.btn-success {
  background: #3ab549;
  color: #FFFFFF;
}
.badge-primary {
  min-width: 0;
}
.team-link {
  color: $color-primary;
  &:hover {
    text-decoration: underline;
  }
}
.flip-card {
  background-color: #FFFFFF;
  width: 100%;
  height: 520px;
  //height: 510px;
  perspective: 1000px;
}
.flip-card-inner {
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}
.flip-card-toggle .flip-card-inner {
  transform: rotateY(180deg);
}
.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
.flip-card-back {
  color: white;
  transform: rotateY(180deg);
}
.flipped {
  height: 512px;
}
.icon-rotate-box {
  top: 273px;
  right: 4%;
}
.invert-filter {
  filter: invert(1);
}
.rotate-icon:hover {
  color: $color-brand;
}
.td-60 {
  width: 60%;
}
.overview-table td, .overview-table th {
  padding: 0.37rem 0.75rem;
}
.mobile-margin {
  margin-left: -10px;
  @media (min-width: 768px) {
    margin-left: 0;
  }
}
.shortlist-card {
  //max-width: 300px;
  width: 100%;
  // @media (min-width: 1200px) {
  //   max-width: 374px;
  // }
}

.break-long-words {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.flipped {
  padding: 15px 10px;
}
.flip-icon {
  width: 16px;
}
.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: none !important;
  border: 2px solid #dddddd78;
}
</style>
