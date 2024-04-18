<template>
  <div class="page-inner">
    <div class="row welcome align-items-center">
      <div class="col-lg-4">
        <div class="item">
          <h3 class="color-secondary font-primary welcomeDesign">
            Welcome Back
          </h3>
        </div>
      </div>
      <div class="col-lg-8">
        <div class="row">
          <div class="col-lg-4">
            <div
              class="
                item
                d-flex
                justify-content-between
                align-items-center
                p-3
                shadow-default
                rounded
                itemResponsiveDesign
              "
            >
              <span class="item-text" id="responsiveDesign"
                >My Shortlisted</span
              >
              <span
                v-if="shortlistStat"
                class="item-number"
                id="responsiveDesignNumber"
                >{{ shortlistStat.personal }}</span
              >
            </div>
          </div>
          <div class="col-lg-4">
            <div
              class="
                item
                d-flex
                justify-content-between
                align-items-center
                p-3
                shadow-default
                rounded
                itemResponsiveDesign
              "
            >
              <span class="item-text" id="responsiveDesign"
                >Team Shortlisted</span
              >
              <span
                v-if="shortlistStat"
                class="item-number"
                id="responsiveDesignNumber"
                >{{ shortlistStat.team }}</span
              >
            </div>
          </div>
          <div class="col-lg-4">
            <div
              class="
                item
                d-flex
                justify-content-between
                align-items-center
                p-3
                shadow-default
                rounded
                itemResponsiveDesign
              "
            >
              <span class="item-text" id="responsiveDesign"
                >Profile Shortlisted</span
              >
              <span class="item-number" v-if="shortlistStat" id="responsiveDesignNumber">{{
                shortlistStat.total
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Statistics -->
    <div class="row statistics py-4">
      <div class="col-lg-4 mb-4">
        <div
          class="
            tips
            p-3
            shadow-default
            rounded
            text-center
            h-100
            tipsClassDesign
          "
        >
          <carousel
            perPage="1"
            paginationActiveColor="#522e8e"
            paginationColor="#b7b7b7"
          >
            <slide>
              <h5 class="tipsDesign">MatrimonyAssist Tips</h5>
              <img
                class="img-tips my-2"
                src="@/assets/icon/person-fill-gray.svg"
                alt="img"
              />
              <p class="tipsDetailsDesign">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </p>
            </slide>

            <slide>
              <h5 class="tipsDesign">MatrimonyAssist Tips</h5>
              <img
                class="img-tips my-2"
                src="@/assets/icon/person-fill-gray.svg"
                alt="img"
              />
              <p class="tipsDetailsDesign">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </p>
            </slide>
          </carousel>
        </div>
      </div>
      <div class="col-lg-8">
        <DChart />
      </div>
    </div>
    <div class="row">
      <div class="col-12 mb-4">
        <div class="shadow-default px-3 py-3">
          <div class="section-title">
            <span>7</span>
            <h3>Shortlisted Candidate</h3>
          </div>
          <carousel
            :perPageCustom="[
              [320, 2],
              [768, 4],
              [1280, 5],
            ]"
            :paginationEnabled="false"
            navigationEnabled
            navigationClickTargetSize="0"
          >
            <slide v-for="candidate in result" :key="candidate.id">
              <candidate-grid :candidate="candidate"></candidate-grid>
            </slide>
          </carousel>
        </div>
      </div>
      <div class="col-12 mb-4">
        <div class="shadow-default px-3 py-3 mb-4">
          <div class="section-title">
            <span>16</span>
            <h3>Profile Suggestions</h3>
          </div>
          <carousel
            :perPageCustom="[
              [320, 2],
              [768, 4],
              [1280, 5],
            ]"
            :paginationEnabled="false"
            navigationEnabled
            navigationClickTargetSize="0"
          >
            <slide v-for="candidate in result" :key="candidate.id">
              <candidate-grid :candidate="candidate"></candidate-grid>
            </slide>
          </carousel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DChart from "@/components/dashboard/DChart.vue";
import CandidateGrid from "@/components/dashboard/CandidateGrid.vue";
import ApiService from "../../services/api.service";
import { Carousel, Slide } from "vue3-carousel";

export default {
  name: "DHomeContent",
  components: {
    DChart,
    Carousel,
    Slide,
    //Navigation,
    CandidateGrid,
  },
  data: () => ({
    //carousel
    shortlistStat: null,
    settings: {
      itemsToShow: 2,
      snapAlign: "start",
    },
    breakpoints: {
      320: {
        itemsToShow: 1,
        snapAlign: "start",
      },
      991: {
        itemsToShow: 2,
        snapAlign: "start",
      },
      1367: {
        itemsToShow: 3,
        snapAlign: "start",
      },
    },
    result: null,
  }),
  created() {
    this.fetchSuggestions();
    this.getDashboardstats();
  },
  methods: {
    async fetchSuggestions() {
      await ApiService.get("v1/profile-suggestions").then((data) => {
        console.log(data.data.data);
        this.result = data.data.data.result;
      });
    },
    getDashboardstats() {
      console.log("Dashboard stats");
      const response = this.$store.dispatch("getDashboardStats"); // In User Module
      response
        .then((data) => {
          //console.log(data);
          this.shortlistStat = data.data.data.short_list;
        })
        .catch((error) => {
          console.log(error);
          this.$error({
            title: "Error",
            content: error.message,
          });
        });
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.welcome {
  .item {
    .item-text {
      font-size: 18px;
    }
    .item-number {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: $bg-secondary;
      color: $color-white;
      margin-left: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
.statistics {
  .img-tips {
    width: 75px;
    height: 75px;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
}

.section-title {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  & > span {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: $bg-secondary;
    color: $color-white;
    margin-right: 8px;
    font-size: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & > h3 {
    font-size: 18px;
    margin-bottom: 0;
  }
}

#responsiveDesign {
  @media (max-width: 433px) {
    font-size: 14px;
  }

  @media (max-width: 413px) {
    font-size: 12px;
  }

  @media (max-width: 383px) {
    font-size: 10px;
  }
}

#responsiveDesignNumber {
  @media (max-width: 433px) {
    font-size: 14px;
  }

  @media (max-width: 413px) {
    font-size: 12px;
    padding: 0px;
    height: 30px;
    width: 30px;
  }
  @media (max-width: 395px) {
    font-size: 10px;
    padding: 0px;
    height: 20px;
    width: 30px;
  }

  @media (max-width: 360px) {
    height: 20px;
    width: 30px;
    font-size: 8px;
  }
}

.itemResponsiveDesign {
  margin-bottom: 10px;
  @media (max-width: 395px) {
    margin-right: -5px;
    margin-left: -8px;
  }

  @media (max-width: 378px) {
    margin-right: -10px;
  }

  @media (max-width: 366px) {
    margin-right: -10px;
  }

  @media (max-width: 358px) {
    margin-right: -15px;
  }

  @media (max-width: 344px) {
    margin-right: -15px;
    margin-left: -10px;
  }

  @media (max-width: 320px) {
    margin-right: -35px;
  }
}

.welcomeDesign {
  @media (max-width: 422px) {
    font-size: 18px;
  }
}
.tipsDesign {
  @media (max-width: 422px) {
    font-size: 12px;
  }
  @media (max-width: 330px) {
    font-size: 10px;
  }
}

.tipsDetailsDesign {
  @media (max-width: 422px) {
    font-size: 10px;
  }

  @media (max-width: 320px) {
    font-size: 8px;
  }
}

.tipsClassDesign {
  @media (max-width: 379px) {
    margin-right: -10px;
    margin-left: -10px;
  }
  @media (max-width: 359px) {
    margin-right: -15px;
  }

  @media (max-width: 320px) {
    margin-right: -35px;
  }
}
</style>
