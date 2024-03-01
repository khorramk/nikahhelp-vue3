<template>
  <div>
    <Header />
    <Banner />
    <div class="bg-home-page position-relative font-poppins">
      <img
        src="@/assets/icon/top_circle.svg"
        alt="bg"
        class="position-absolute full-circle"
      />
      <img
        src="@/assets/icon/bg_layer_1.svg"
        alt="bg"
        class="position-absolute bg-layer-1 layer-1"
      />
      <img
        src="@/assets/icon/bg_layer_1_1.svg"
        alt="bg"
        class="position-absolute bg-layer-1-1"
      />
      <RecentlyJoined />
      <Feature />
      <Conversation />
      <FindPartner />
      <Footer />
      <img
          src="@/assets/icon/down_circle.svg"
          alt="bg"
          class="position-absolute down-circle"
      />
    </div>
    <Cookies />
  </div>
</template>

<script>
import Header from "@/components/auth/Header.vue";
import Banner from "@/components/auth/Banner.vue";
import Feature from "@/components/auth/Feature.vue";
import Conversation from "@/components/auth/Conversation.vue";
import RecentlyJoined from "@/components/auth/RecentlyJoined.vue";
import FindPartner from "@/components/auth/FindPartner.vue";
import Footer from "@/components/auth/Footer.vue";
import Cookies from "@/components/cookies/Cookies.vue";

export default {
  name: "Home",
  components: {
    Header,
    Banner,
    RecentlyJoined,
    Feature,
    Conversation,
    FindPartner,
    Footer,
    Cookies,
  },
  data() {
    return {
      isLoading: false,
      attrs: {
        class: "mb-6",
        boilerplate: true,
        elevation: 2,
      },
    };
  },
  mounted() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  },
};
</script>

<style scoped>
	.bg-home-page {
		/*background: url("~@/assets/full.svg") no-repeat center center / cover;*/
		background-color: #f5f5ff;
	}
  .full-circle {
    top: -130px;
    left: -25px;
    width: 25%;
  }
  .down-circle {
    bottom: 0;
    right: -0;
    width: 20%;
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
  @keyframes layer-1 {
    0%   {right: 0; top: 0;}
    25%  {right: 50px; top: 15px;}
    50%  {right: 70px; top: 60px;}
    75%  {right: 50px; top: 75px;}
    100% {right: 0; top: 0;}
  }
  @keyframes layer-2 {
    0%   {left: 70px; top: 500px;}
    25%  {left: 50px; top: 460px;}
    50%  {left: 40px; top: 480px;}
    75%  {left: 50px; top: 490px;}
    100% {left: 70px; top: 500px;}
  }
</style>
