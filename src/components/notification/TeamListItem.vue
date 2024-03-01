<template>
  <div class="notification-list px-2">
    <div class="flex">
      <h4 class="active-team-text" v-if="index == 0 && turnOn && team_id">Active Team</h4>
      <h4 class="active-team-text" v-if="(index == 1 && !turnOn && team_id) || (index == 0 && !team_id)">Other Teams</h4>
      <span class="active-icon ml-2" v-if="index == 0 && turnOn"></span>
    </div>
    <div class="d-flex">
      <img class="avatar" width="45" height="45" :src="item.logo + `?token=${token}`"
           alt="">
      <div class="content">
        <h4 class="mt-1">{{ item.name }}</h4>
        <p class="mb-0">{{ item.description }}</p>
      </div>
      <div class="quick-switch-box">
        <a-tooltip
            placement="top"
            title="Click here to activate or deactive the team"
        >
          <a-switch default-checked class="quick-switch" v-model="turnOn" @click="onChangeActivateTeam">
            <a-icon slot="checkedChildren" type="check"/>
            <a-icon slot="unCheckedChildren" type="close"/>
          </a-switch>
        </a-tooltip>
      </div>
      <!--      <a-switch type="success" size="medium" />-->

    </div>
    <div class="date">Created at {{ formateDate(item.created_at) }}</div>
  </div>
</template>

<script>
import {format} from "timeago.js";
import JwtService from "../../services/jwt.service";
import ApiService from "../../services/api.service";

export default {
  name: 'TeamListItem',
  props: {
    item: {
      type: Object,
    },
    index: {
      type: Number
    }
  },
  created() {
    this.team_id = JwtService.getTeamIDAppWide();
    if (this.team_id && this.team_id == this.item.team_id) {
      this.turnOn = true;
    }
  },
  data() {
    return {
      turnOn: false,
      team_id: null,
      token: JwtService.getToken(),
    }
  },
  computed: {
    is_subscribed() {
      if (this.item.subscription_expire_at == null) {
        return false;
      }

      if (!this.checkExpiry(this.item.subscription_expire_at)) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    createdAt(time) {
      if (time) {
        return format(time);
      }
      return '';
    },
    formateDate(date) {
      if (date == null || date == undefined) {
        return "  Not Exist";
      }
      let d = new Date(date),
          month = "" + (d.getMonth() + 1),
          day = "" + d.getDate(),
          year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },
    async onChangeActivateTeam(checked) {
      if (checked) {
        let returnedResult = await this.turnOnTeam();
        this.$store.commit("setTeamInfo", this.item);
        if (returnedResult) {
          this.turnOn = true;
        } else {
          this.turnOn = false;
        }
      } else {
        this.$store.commit("setTeamInfo", null);
        JwtService.destroyTeamIDAppWide();
        let vm = this;
        this.$success({
              title: "Success",
              content: "Team deactivated",
              onOk() {
                setTimeout(() => vm.$router.go(), 100);
              },
            }
        );
      }
    },
    async turnOnTeam() {
      if (this.is_subscribed) {
        if (this.item.team_members.length < 2) {
          this.$error({
            content: "This team do not contain sufficient users. Go to Manage team & add member",
            centered: true,
          });
          return false;
        }

        let candidateFlag = 0;
        this.item.team_members.map((_member) => {
          if (_member.user_type == "Candidate") {
            candidateFlag++;
          }
        });

        if (candidateFlag == 0) {
          this.$error({
            content: "This team do not contain any candidate. Go to Manage team & add a candidate",
            centered: true,
          });
          return false;
        }

        try {
          await ApiService.post("v1/team-turn-on", {
            team_id: this.item.id,
          })
              .then((data) => {
                if (data.data.status == "FAIL") {
                  this.$message.error(data.data.message);
                  return false;
                }
                if (data.data.status !== "FAIL") {
                  JwtService.saveTeamIDAppWide(this.item.team_id);
                  JwtService.saveTeamID(this.item.id);
                  const vm = this;
                  this.$success({
                    title: "Success",
                    content: "Selected Team Activated",
                    onOk() {
                      // vm.$emit("teamListUpdated");
                      setTimeout(() => vm.$router.go(), 100);
                    },
                  });
                  return true;
                }
              })
              .catch((error) => {
                console.log(error);
                console.log(error.response);
                this.$message.error("Something went Wrong");
                return false;
              });
        } catch (error) {
          console.log(error);
        }
      } else {
        this.$error({
          title: "Subscription Needed",
          content: "Please buy subscription to Activate the team. Go to Manage team & subscribe",
        });
        return false;
      }
      return true;
    },
    checkExpiry(dateString) {
      var myDate = new Date(dateString);
      var today = new Date();
      if (myDate > today) {
        return true;
      }
      return false;
    },
  },
}
</script>

<style lang="scss" scoped>
.notification-list {
  max-width: 300px;
  min-width: 300px;

  .avatar {
    border-radius: 50%;
    display: block;
    border: 2px solid #ddd
  }

  .content {
    margin-left: 12px;
    flex: auto;

    h4 {
      font-size: 13px;
    }

    p {
      font-size: 12px;
    }
  }

  .date {
    font-size: 12px;
    text-align: right;
    color: #522e8e;
  }
}

.active-team-text {
  color: #bfbcbc;
  font-size: 14px;
}

.active-icon {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #39b54a;
  margin-top: 4px;
}
</style>