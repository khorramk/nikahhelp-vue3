<template>
  <div>
    <div v-if="isLoading">Loading</div>
    <div v-else>
      <Chat />
    </div>
  </div>
</template>

<script>
import Chat from "@/components/development/Chat.vue";
import JwtService from "@/services/jwt.service";
import { openModalRoute } from "@/plugins/modal/modal.mixin";
export default {
  name: "ChatWindow",
  components: {
    Chat,
  },
  data() {
    return {
      isLoading: false,
      user: {},
      is_verified: 1,
    };
  },
  created() {
    this.loadUser();
    this.getActiveTeamId();
  },
  methods: {
    async loadUser() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("getUser");
        this.user = this.$store.getters["userInfo"];
        this.candidateInfo = this.$store.getters["candidateInfo"];
        this.representativeInfo = this.$store.getters["representativeInfo"];
        this.is_verified = this.user.is_verified;

        if (this.user.account_type === 4) {
          this.$router.push("/admin");
        }

        let data_input_status = this.$store.getters["userDataInputStatus"];
        console.log("data input status", data_input_status);
        if (data_input_status == 10) {
          //this.$router.push("/member-name/candidate");
        }

        if (data_input_status == 20) {
          this.$router.push("/member-name/representative");
        }

        if (data_input_status == 11) {
          this.$router.push("/candidate-registration");
        }
        if (data_input_status == 21) {
          this.$router.push("/representative-registration");
        }

        // if (data_input_status == 12) {
        // 	this.$router.push("/candidate-registration");
        // }
        // if (data_input_status == 22) {
        // 	this.$router.push("/representative-registration");
        // }
      } catch (error) {
        this.error = error.message || "Something went wrong";
        //alert(this.error);
        console.log(this.error);
        this.$router.push("/chat-window");
      }
      this.isLoading = false;
    },
    async getActiveTeamId() {
      const response = this.$store.dispatch("getTeams");
      response
        .then((data) => {
          let teamId = JwtService.getTeamIDAppWide();
          console.log(data.data.data);
          if (data.data.data.length == 0) {
           openModalRoute(this, "manage_team_redirect");
          } else if (!teamId) {
          	 openModalRoute(this, "manage_team_redirect");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.padding-5 {
  padding: 10px 25px 25px 25px;
}

.main-content-wrapper {
  margin-right: 10px;
  /* width: 91%;
  padding-right: 0px; */
}

/* .chat-design {
	margin-left: 110px;
} */
</style>