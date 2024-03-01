<template>
  <div class="bg-white d-flex team-short-cards align-items-center mt-4 position-relative">
    <h4 class="text-primary bg-white banner-total">Total</h4>
    <div class="team-short-infos d-flex position-relative">
      <div class="position-absolute d-flex justify-content-between">
        <div class="d-flex align-items-center team-short-info">
          <div class="team-count-box d-flex justify-content-center align-items-center text-white">2</div>
          <h4 class="color-brand team-short-info-text ml-2">Team</h4>
        </div>
        <div class="d-flex align-items-center team-short-info">
          <div class="team-count-box d-flex justify-content-center align-items-center text-white">500</div>
          <h4 class="color-brand team-short-info-text ml-2">View</h4>
        </div>
        <div class="d-flex align-items-center team-short-info">
          <div class="team-count-box d-flex justify-content-center align-items-center text-white">300</div>
          <h4 class="color-brand team-short-info-text ml-2">Unseen <br> Message</h4>
        </div>
        <div class="d-flex align-items-center team-short-info">
          <div class="team-count-box d-flex justify-content-center align-items-center text-white">300</div>
          <h4 class="color-brand team-short-info-text ml-2">Unseen <br> Notification</h4>
        </div>
        <div class="d-flex align-items-center team-short-info">
          <div class="team-count-box d-flex justify-content-center align-items-center text-white">300</div>
          <h4 class="color-brand team-short-info-text ml-2">Connection <br> Request</h4>
        </div>
        <div class="d-flex align-items-center team-short-info">
          <div class="team-count-box d-flex justify-content-center align-items-center text-white">300</div>
          <h4 class="color-brand team-short-info-text ml-2">Connection <br> Awaiting</h4>
        </div>
        <div class="d-flex align-items-center team-short-info">
          <div class="team-count-box d-flex justify-content-center align-items-center text-white">300</div>
          <h4 class="color-brand team-short-info-text ml-2">Profile <br> Suggestion</h4>
        </div>
      </div>
    </div>
    <div class="banner-team d-flex align-items-center">
      <div class="d-flex">
        <h4 class="banner-active-team">Team 1 <br> Active now</h4>
      </div>
      <div class="banner-active-sign"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Banner"
}
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";

.team-short-cards {
  .banner-total {
    position: absolute;
    font-size: 12px;
    left: -12px;
    top: 10px;
  }

  .team-short-infos {
    border-radius: 10px;
    width: 85%;
    border: 1px solid $bg-primary;
    padding: .5rem;
    height: 38px;
    border-left: 0px solid white;

    .position-absolute {
      top: -1px;
      left: 1.5rem;
      z-index: 9;

      .team-count-box {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: $bg-primary;
        outline: 2px solid $bg-primary;
        outline-offset: 2px;
      }

      .team-short-info {
        margin-left: 0.5rem;

        .team-short-info-text {
          font-size: 13px;
          font-style: normal;
        }
      }
    }
  }

  .banner-team {
    margin-left: 0.5rem;
    padding-left: .5rem;
    border-left: 1px solid $bg-brand;

    .d-flex {
      .banner-active-team {
        font-size: 12px;
      }
    }

    .banner-active-sign {
      width: 10px;
      height: 10px;
      background: $bg-success;
      border-radius: 50%;
      margin-left: .5rem;
    }
  }
}
</style>
