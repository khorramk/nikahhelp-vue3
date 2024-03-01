<template>
  <div class="mt-4 box">
    <a-row>
      <a-col :span="24">
        <a-input
            v-model="team.password"
            size="large"
            type="password"
            class="team-name-input"
            placeholder="Type Team Password"
        />
      </a-col>
    </a-row>
    <a-row class="mt-4">
      <a-col :span="24">
        <a-input
            v-model="team.confirm_password"
            size="large"
            type="password"
            class="team-name-input"
            placeholder="Re-Type New Password"
        />
        <span class="text-danger mt-2 ml-2" v-if="team.password && team.confirm_password && team.password !== team.confirm_password">Password doesn't match</span>
      </a-col>
    </a-row>
    <div class="position">
      <div class="position-absolute footer-cancel-btn">
        <a-button class="back-button button float-left text-white" v-on:click="$emit('cancel_button', 1)">Back</a-button>
      </div>
      <div class="position-absolute footer-conf-btn">
        <a-button class="confirm-button button float-right bg-primary text-white" @click="goNextStep()" :disabled="checkDisability">Save & Continue</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import ApiService from '@/services/api.service';
export default {
  name: "CreateTeamPassword",
  props: ['team', 'file'],
  data() {
    return {

    }
  },
  computed: {
    checkDisability() {
      if(this.team.password && this.team.confirm_password && this.team.password === this.team.confirm_password) {
        return false;
      }
      return true;
    }
  },
  methods: {
    async goNextStep() {
      let formData = new FormData();
      formData.append('logo', this.file);
      Object.keys(this.team).map(data =>{
        formData.append(data, this.team[data]);
      });
      // this.$emit("updateTeamData", res.data);
      this.$emit("goNext", 3);
      // await ApiService.post('/v1/team', formData).then(res => {
      //   if(res && res.data) {
      //     this.$emit("updateTeamData", res.data);
      //     this.$emit("goNext", 3);
      //   }
      // });
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.box {
  padding: 40px;
  .position {
    bottom: 50px;
    .footer-cancel-btn {
      bottom: 20px;
      left: 12px;
      .button {
        border-radius: 16px;
        background: $bg-brand;
      }
    }
    .footer-conf-btn {
      bottom: 20px;
      right: 12px;
      .button {
        border-radius: 16px;
      }
    }
  }
}
</style>
