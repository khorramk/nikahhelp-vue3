<template>
	<div class="recently-joinded section-padding">
		<div class="container">
			<h2 class="color-brand text-center" id="recentlyJoinedDesign">
				<span style="padding-right: 50px">Recently Joined</span>
			</h2>

      <carousel
          :perPageCustom="[
              [320, 1],
              [768, 2],
              [1280, 3],
            ]"
          :autoplay="true"
          :loop="true"
          :paginationEnabled="false"
          :navigationEnabled="false"
      >
        <slide v-for="(user, recIndex) in recJoin" :key="user.id">
          <div class="item flex-between-center ml-2 mr-2">
            <div class="item-img custom-size">
              <img class="item-img"
					v-if="user.image !== null"
					@error="imgLoad(recIndex, user)"
					:ref="`avatar-${recIndex}`"
					:src="user.image"
					alt="img"
					style="border: 1px solid white;"/>

              <img class="item-img"
					v-else
                   :ref="`avatar-${recIndex}`"
                   :src="require('../../assets/no-image-available.jpg')"
                   alt="img"
                   style="border: 1px solid white;"/>
				
            </div>
            <div class="item-content">
              <div>{{ getUserGender(user) }}, {{ user.age ? getAge(user.age) + ' years' : 'N/A' }}</div>
              <div>{{  user.ethnicity ? user.ethnicity : 'N/A' }}, {{ user.religion ? user.religion : 'N/A' }}</div>
              <div>{{ user.study_level ? user.study_level : 'N/A' }}</div>
            </div>
          </div>
        </slide>
      </carousel>
		</div>
	</div>
</template>

<script>
import ApiService from "../../services/api.service";
import { Carousel, Slide } from "vue-carousel";
export default {
	name: "RecentlyJoined",

	components: {
    Carousel,
    Slide,
  },

	data() {
		return {
			recJoin: [],
		};
	},

	async mounted() {
		await ApiService.get("v1/recent-join-candidate").then((data) => {
			console.log(data);
			this.recJoin = data.data.data;
		});
	},

	methods: {
    getUserGender(user) {
      if(user && user.gender && user.gender > 0) {
        return user.gender == 1 ? 'Male' : 'Female';
      }
      return 'N/A';
    },

		getAge(dateString) {
			let today = new Date();
			let birthDate = new Date(dateString);
			let age = today.getFullYear() - birthDate.getFullYear();
			let m = today.getMonth() - birthDate.getMonth();
			if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
				age--;
			}
			return age;
		},

		imgLoad(index, user) {
			let img = this.$refs[`avatar-${index}`][0];
			// img.src = `https://ui-avatars.com/api/?name=${user.name}&background=b5b5b5&color=fff`;
			img.src = require("../../assets/no-image-available.jpg");
		}
	},
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.recently-joinded {
	.item {
		padding: 10px;
		border-radius: 5px;
		border: 1px solid rgb(105, 104, 104);
		background-color: rgb(105, 104, 104);
		@media (max-width: 991px) {
			padding: 5px;
			margin-bottom: 15px;
			font-size: 14px;
		}
		.item-img {
			width: 50px;
			height: 50px;
			//flex: 0 0 65px;
			padding: 2px;
			border-radius: 50%;
			background-size: cover;
			margin-top: -3px;
			
		}
		.item-content {
			padding: 5px;
			flex: 1 1 100%;
			color: white;
			 width:200px;
			 white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}

	#recentlyJoinedDesign {
		font-family: "Rochester", cursive;
		font-size: 45px;
		width: 100%;
		text-align: center; 
		margin-bottom: 45px;
	}
	
	h2 {
	    position: relative;
    	z-index: 1;
		overflow-x: hidden;
		text-align: center;
		margin-right: 30px;
		padding: 12px;
	}
	h2:before, h2:after {
		position: absolute;
		top: 51%;
		overflow: hidden;
		width: 50%;
		height: 1px;
		content: '\a0';
		background-color: #E51F76;	
	}
	h2:before {
		margin-left: -55%;
		text-align: right;
	}
	.color {
		background-color: #ccc;
	}
}
.layer-1 {
  animation-name: layer-1;
  animation-duration: 4s;
  animation-iteration-count: infinite;
}
.layer-2 {
  animation-name: layer-2;
  animation-duration: 4s;
  animation-iteration-count: infinite;
}
@keyframes layer-2 {
  0%   {left: 70px; top: 500px;}
  25%  {left: 50px; top: 460px;}
  50%  {left: 40px; top: 480px;}
  75%  {left: 50px; top: 530px;}
  100% {left: 70px; top: 500px;}
}
.bg-layer-1 {
  top: 30px;
  right: 30px;
  width: 7%;
}
.bg-layer-1-1 {
  top: 28px;
  right: 32px;
  width: 7%;
}
.bg-layer-2 {
  top: 500px;
  left: 70px;
  width: 7%;
}
.bg-layer-2-1 {
  top: 500px;
  left: 70px;
  width: 7%;
}
.custom-size {
  width: 70px !important;
  height: 55px !important;
}
</style>