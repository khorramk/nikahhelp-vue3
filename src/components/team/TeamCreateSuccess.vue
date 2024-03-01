<template>
  <div>
    <div class="top-half">
      <a-row class="text-center">
        <a-col :span="24">
          <img
              class="check-icon"
              src="@/assets/icon/check-circle-fill-green.svg"
              alt=""
          />
          <a-col :span="24">
            <span class="create-team-message mt-2">Done, You've successfully created a team</span>
          </a-col>
        </a-col>
      </a-row>
    </div>

    <div class="bottom-half flex align-items-center flex-column">
      <a-row>
        <a-col :span="24">
						<h4 class="sub-msg text-center">To activate this team, You have to <br> choose a subscription plan</h4>
        </a-col>
      </a-row>

      <a-row class="text-center mt-8">
        <a-col :span="24">
          <button class="sub-btn">
							<span class="sub-btn-label"
              ><a :href="link" class="text-white">Subscribe Now</a></span 
              >
          </button>
        </a-col>
      </a-row>

      <a-row class="text-center mt-2" v-if="false">
        <a-col :span="24">
						<span class="promo"
            >get <span class="free-day">1 free day</span></span
            >
        </a-col>
      </a-row>

      <a-row class="text-center mt-2" v-if="false">
        <a-col :span="24">
						<span class="disclaimer"
            >* You can do <strong>1 free day</strong> subscription plan for
							first team create</span
            >
        </a-col>
      </a-row>
      <!-- <a-row class="text-center mt-2">
        <a-col :span="24">
						<span class="disclaimer"
            >* Without choosing any plan this team will be automatically
							deleted after <strong>3 days</strong></span
            >
        </a-col>
      </a-row> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "TeamCreateSuccess",
  props: ['team'],
  computed: {
    link() {
      return `/subscription/${this.team.team_id}`;
    },
  },
}
</script>

<style scoped>
.check-icon {
  height: 100px;
  width: 100px;
}
.top-half {
  background-color: white;
  border-top: solid white;
  border-radius: 25px;
  padding: 20px;
}
.create-team-message {
  color: #666666;
  font-weight: 100;
  font-size: 16px;
}

.bottom-half {
  background-color: #6158a7;
  border-bottom: solid #6158a7;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 20px;
  margin-left: -8px;
  /*margin-right: -8px;*/
  height: 350px;
  /*margin-bottom: -8px;*/
  position: absolute;
  bottom: 0;
  width: 100%;
}

.sub-msg {
  color: white;
  font-weight: 200;
  font-size: 15px;
}

.sub-btn {
  background: #e22077;
  width: 250px;
  height: 40px;
  color: #e22077;
  border: 3px solid #FFFFFF;
  border-radius: 25px;
  text-align: center;
}
.sub-btn:hover {
  background-color: #e22077;
  color: #FFFFFF;
  transform: scale(1.1);
}
.sub-btn-label {
  color: white;
  font-size: 18px;
}

.promo {
  color: white;
  font-size: 14px;
}

.free-day {
  text-decoration: underline;
  font-size: 14px;
}

.disclaimer {
  color: white;
  font-size: 14px;
}
</style>