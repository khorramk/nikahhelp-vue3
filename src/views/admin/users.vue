<template>
  <div style="height:calc(100% - 25px)" class="mt-5">
     <v-card
     style="height:100%"
      class="mx-auto"
      max-width="300"
      tile
    >
    <v-list flat>
      <v-subheader>User Status</v-subheader>
      <hr>
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
        >
          <!-- <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon> -->
          <v-list-item>
            <router-link :to="item.link">
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </router-link>
          </v-list-item>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
    <!-- <div class="panel-content border-content">
      <img
        class="mr-3"
        src="@/assets/icon/person-fill-secondary.svg"
        alt="icon"
      />
      <router-link to="/admin/active_users">
        <a-button
          shape="round"
          type="primary"
          style="float: right"
          class="mt-3"
        >
          Active Users
        </a-button>
      </router-link>
    </div>
    <div class="panel-content">
      <img
        class="mr-3"
        src="@/assets/icon/person-fill-secondary.svg"
        alt="icon"
      />
      <router-link to="/admin/deleted_users">
        <a-button
          shape="round"
          type="primary"
          style="float: right"
          class="mt-3"
        >
          Deleted Users
        </a-button>
      </router-link>
    </div> -->
  </div>
</template>

<script>
export default {
  data: () => ({
      selectedItem: 1,
      items: [
        { text: 'All type', icon: 'mdi-clock', link: '/admin/matrimony-users' },
        { text: 'Verified', icon: 'mdi-clock', link: '/admin/approve_documents?type=verified' },
        { text: 'Rejected', icon: 'mdi-account', link: '/admin/approve_documents?type=rejected' },
        { text: 'Pending', icon: 'mdi-flag', link: '/admin/approve_documents?type=pending' },
      ],
    }),
  components: {},
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.panel-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: calc(100vh - 150px);
  overflow: hidden;
  border: 2px solid #ddd;
  border-radius: 15px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 10px 30px #fff;
  margin: 20px;
  opacity: 1;
  .panel-content {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    &.border-content {
      border-right: 2px solid #ddd;
    }
    flex-direction: column;
    img {
      width: 150px;
    }
    .ant-btn {
      width: 150px;
      height: 35px;
    }
  }
}
</style>