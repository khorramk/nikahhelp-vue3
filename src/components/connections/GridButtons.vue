<template>
  <div class="mt-2">
    <div v-if="type == 'connected'">
      <div class="flex flex-wrap justify-space-between px-4">
        <v-btn
            class="text-capitalize btn-connection disconnect-button"
            rounded
            outlined
            small
            style="width: 49%"
            dark
            @click="$emit('disconnectTeam')"
        >
          <div class="flex justify-center align-center">
            <DisconnectOutlined class="mr-2" /> Disconnect
          </div>
        </v-btn>

        <v-btn
            class="text-capitalize btn-connection block-button"
            style="width: 49%"
            rounded
            outlined
            small
            color=""
            dark
            @click="$emit('block')"
        >
          <div class="flex justify-center align-center">
            <StopOutlined class="mr-2" /> Block
          </div>
        </v-btn>
      </div>
      <div class="flex flex-wrap justify-space-between px-4 mt-3">
        <v-btn
            class="text-capitalize btn-connection color-primary"
            style="width: 49%"
            rounded
            small
            outlined
            color=""
            dark
            @click="$emit('gotoChat')"
        >
          <div class="flex justify-center align-center">
            <WeChatOutlined class="mr-2" /> Chat
          </div>
        </v-btn>

        <v-btn
            class="text-capitalize btn-connection color-primary"
            style="width: 49%"
            rounded
            outlined
            small
            color=""
            dark
            @click="$emit('viewProfile')"
        >
          <div class="flex justify-center align-center">
            <UserOutlined class="mr-2" /> View Profile
          </div>
        </v-btn>
      </div>
    </div>
    <div v-if="type == 'Request received'">
      <div class="flex flex-wrap justify-space-between px-4">
        <v-btn
            class="text-capitalize connect-button btn-connection color-primary"
            style="width: 49%"
            rounded
            small
            outlined
            color=""
            dark
            @click="$emit('acceptRequest')"
        >
          <div class="flex justify-center align-center">
            <CheckOutlined class="mr-2" /> Accept
          </div>
        </v-btn>

        <v-btn
            class="text-capitalize block-button btn-connection color-primary"
            style="width: 49%"
            rounded
            small
            outlined
            color=""
            dark
            @click="$emit('declineRequest')"
        >
          <div class="flex justify-center align-center">
            <DisconnectOutlined class="mr-2" /> Decline
          </div>
        </v-btn>
      </div>
      <div class="flex flex-wrap justify-space-between px-4 mt-3">
        <v-btn
            class="text-capitalize btn-connection block-button"
            style="width: 49%"
            rounded
            outlined
            small
            color=""
            dark
            @click="$emit('block')"
        >
          <div class="flex justify-center align-center">
             <StopOutlined class="mr-2" />
            Block
          </div>
        </v-btn>

        <v-btn
            class="text-capitalize btn-connection color-primary"
            style="width: 49%"
            rounded
            outlined
            small
            color=""
            dark
            @click="$emit('viewProfile')"
        >
          <div class="flex justify-center align-center">
            <UserOutlined class="mr-2" /> View Profile
          </div>
        </v-btn>
      </div>
    </div>
    <div v-if="type == 'Request sent'">
      <div class="flex flex-wrap justify-space-between px-4">
        <v-btn
            class="text-capitalize btn-connection block-button color-primary"
            style="width: 49%"
            rounded
            outlined
            small
            color=""
            dark
            @click="$emit('declineRequest')"
        >
          <div class="flex justify-center align-center">
            <CloseOutlined class="mr-2" /> Cancel
          </div>
        </v-btn>

        <v-btn
            class="text-capitalize btn-connection block-button"
            style="width: 49%"
            rounded
            outlined
            small
            color=""
            dark
            @click="$emit('block')"
        >
          <div class="flex justify-center align-center">
            <StopOutlined class="mr-2" />
          </div>
        </v-btn>
      </div>

      <div class="flex flex-wrap justify-space-between px-4 mt-3">
        <v-btn
            class="text-capitalize btn-connection color-primary"
            block
            rounded
            outlined
            small
            color=""
            dark
            @click="$emit('viewProfile')"
        >
          <div class="flex justify-center align-center">
            <UserOutlined class="mr-2" />
          </div>
        </v-btn>
      </div>
    </div>

    <div v-if="type == 'we declined'">
      <div class="flex flex-wrap justify-space-between px-4">
        <v-btn
            class="text-capitalize btn-connection color-primary connect-button"
            style="width: 49%"
            rounded
            outlined
            small
            color=""
            dark
            @click="$emit('connect')"
        >
          <div class="flex justify-center align-center">
            <!-- <a-icon type="cross" class="mr-2" /> -->
            <img src="/assets/icon/connect-s.svg" alt="" height="14px" class="mr-2">
            Connect
          </div>
        </v-btn>

        <v-btn
            class="text-capitalize btn-connection block-button"
            style="width: 49%"
            rounded
            outlined
            small
            color=""
            dark
            @click="$emit('block')"
        >
          <div class="flex justify-center align-center">
            <StopOutlined class="mr-2" />
          </div>
        </v-btn>
      </div>

      <div class="flex flex-wrap justify-space-between px-4 mt-3">
        <v-btn
            class="text-capitalize btn-connection color-primary"
            block
            rounded
            outlined
            small
            color=""
            dark
            @click="$emit('viewProfile')"
        >
          <div class="flex justify-center align-center">
            <UserOutlined class="mr-2" />
          </div>
        </v-btn>
      </div>
    </div>
    <div v-if="type == 'they declined'">
      <div class="flex flex-wrap justify-space-between px-4">
        <v-btn
            class="text-capitalize btn-connection color-primary connect-button"
            style="width: 49%"
            rounded
            outlined
            small
            color=""
            dark
            @click="$emit('connect')"
        >
          <div class="flex justify-center align-center">
            <!-- <a-icon type="cross" class="mr-2" /> -->
            <img src="/assets/icon/connect-s.svg" alt="" height="14px" class="mr-2">
            Connect
          </div>
        </v-btn>

        <v-btn
            class="text-capitalize btn-connection block-button"
            style="width: 49%"
            rounded
            outlined
            small
            color=""
            dark
            @click="$emit('block')"
        >
          <div class="flex justify-center align-center">
            <StopOutlined class="mr-2" />
          </div>
        </v-btn>
      </div>

      <div class="flex flex-wrap justify-space-between px-4 mt-3">
        <v-btn
            class="text-capitalize btn-connection color-primary"
            block
            rounded
            outlined
            small
            color=""
            dark
            @click="$emit('viewProfile')"
        >
          <div class="flex justify-center align-center">
            <UserOutlined class="mr-2" />
          </div>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import {
  DisconnectOutlined,
  StopOutlined,
  UserOutlined,
  WeChatOutlined
} from '@ant-design/icons-vue';


export default {
  name: "GridButtons",
  props: ['type'],
  components: {
    DisconnectOutlined,
    StopOutlined,
    UserOutlined,
    WeChatOutlined
  
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
//.block-button {
//  background: $bg-brand;
//}
//.block-button:hover {
//  background: $bg-brand;
//}

.grid-action-btn {
  border-color: #f9f9f9;
}

.btn-success {
  background: #3ab549;
  color: #FFFFFF;
}
.btn-success:hover {
  background: #3ab549;
}

.btn-decline {
  background: #fa4942;
  color: #FFFFFF;
}
.btn-decline:hover {
  background: #fa4942;
}

.btn-info {
  background: #1bb9c2;
}
.btn-info:hover {
  background: #1bb9c2;
}
.btn-connection {
  box-shadow: 0px 1px 3px #B2aaaa;
  border: 1px solid white !important;
  background: $bg-primary;
  color: $color-white !important;
}

.btn-connection:hover {
  background: #fff;
  color: $bg-primary !important;
  border: 1px solid $bg-primary !important;
}

.block-button {
  background: #d81b60;
  color: #fff;
  border: 1px solid #fff;
}

.block-button:hover {
  background: #fff !important;
  color: #d81b60 !important;
  border: 1px solid #d81b60 !important;
}
.disconnect-button {
  background: #454141;
  color: #fff;
  border: 1px solid #454141;
}

.disconnect-button:hover {
  background: #fff !important;
  color: #454141 !important;
  border: 1px solid #454141 !important;
}

.connect-button {
  background: #3ab549;
  color: #fff;
  border: 1px solid #3ab549;
  img {
    filter: brightness(0) invert(1);
  }
}

.connect-button:hover {
  background: #fff !important;
  color: #3ab549 !important;
  border: 1px solid #3ab549 !important;

  img {
    filter: none !important;
  }
}

.v-btn:not(.v-btn--round).v-size--small {
  height: 35px !important;
}

</style>