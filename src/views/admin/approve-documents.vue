<template>
  <div class="admin-user-container">
    <div class="panel-header">
      <div class="top-header">
        <div>
          <!-- <v-btn style="background-color: #522e8e; color: #fff" large>
            {{
              showPendingDocuments
                ? "Awaiting documents for approval"
                : showRejectedDocuments
                ? "Rejected Documents"
                : "Verified Documents"
            }}
          </v-btn> -->
        </div>
        <!-- <div class="top-right">
          <v-btn
            v-if="showPendingDocuments"
            @click="getVerifiedUsers"
            style="background-color: rgb(61 185 156); color: #fff"
            small
          >
            <v-icon dark> md-minus </v-icon>
            View verified documents
          </v-btn>
          <v-btn
            v-if="showPendingDocuments"
            @click="getRejectedUsers"
            style="background-color: rgb(191 20 67); color: #fff"
            small
          >
            <v-icon dark> md-minus </v-icon>
            View rejected documents
          </v-btn>
          <v-btn
            v-if="!showPendingDocuments"
            @click="getPendingUsers"
            style="background-color: rgb(61 185 156); color: #fff"
            small
          >
            <v-icon dark> md-minus </v-icon>
            Back
          </v-btn>
        </div> -->
      </div>
      <div class="bottom-header">
        <v-tabs @change="onSelectedTab" v-model="selectedTab">
          <v-tab
            ><v-badge color="red" :content="totalNumberOfItems"
              >All</v-badge
            ></v-tab
          >
          <v-tab><v-badge color="red" content="0">Candidate</v-badge></v-tab>
          <v-tab
            ><v-badge color="red" content="0">Representative</v-badge></v-tab
          >
          <!-- <v-tab><v-badge color="red" content="6">Rep.to Cand.</v-badge></v-tab>
          <v-tab><v-badge color="red" content="6">Matchmaker</v-badge></v-tab> -->
        </v-tabs>
        <v-text-field
          v-model="search"
          filled
          rounded
          dense
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </div>
    </div>
    <div class="panel-content">
      <v-data-table
        v-model="selectedTasks"
        show-select
        :items="items"
        :headers="headers"
        :single-select="false"
        :search="search"
        :server-items-length="totalNumberOfItems"
        @update:options="paginate"
        item-key="name"
        class="dt-table"
        :loading="loading"
        loading-text="Loading... Please wait"
        :footer-props="{
          'items-per-page-text': 'Show',
        }"
      >
        <template slot="headers" slot-scope="props">
          <tr>
            <th v-for="header in props.headers" :key="header.value">
              <span v-if="header.text !== 'actions'"> {{ header.text }}</span>
              <span v-if="header.text == 'actions'">
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark v-bind="attrs" v-on="on">
                      {{ header.text }}
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item>
                      <v-list-item-title>item 1</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </span>
            </th>
          </tr>
        </template>
        <template v-slot:body="{ items }">
          <tr
            v-for="item in items"
            :key="item.name"
            @click="(e) => onItemClick(item)"
          >
            <td>
              <v-checkbox
                style="margin: 0px; padding-left: 16px"
                v-model="selectedTasks"
                :value="item"
                hide-details
              />
            </td>
            <td class="id">{{ item["id"] }}</td>
            <td class="created_at">
              {{ $filter.formatDate(item["created_at"]) }}
            </td>
            <td class="full_name">{{ item["full_name"] }}</td>
            <td class="account_type">
              {{
                item["account_type"] == 1
                  ? "Candidate"
                  : item["account_type"] == 2
                  ? "Representative"
                  : ""
              }}
            </td>
            <td class="account_type">
              {{
                item["account_type"] == 1 &&
                item.candidate_info
                  ? item.candidate_info.data_input_status == 0
                    ? "In-completed"
                    : item.candidate_info.data_input_status > 5
                    ? "Completed"
                    : "Partially Completed"
                  : item["account_type"] == 2 &&
                    item.representative_info
                  ? item.representative_info.data_input_status == 0
                    ? "In-completed"
                    : item.representative_info.data_input_status > 2
                    ? "Completed"
                    : "Partially Completed"
                  : "In-completed"
              }}
            </td>
            <td class="email">
              {{ item["email"] }}
            </td>
            <td class="publisher">
              <router-link
                v-if="item['status'] > 1"
                :to="'/admin/document_details/' + item.id"
                >{{ item["status"] > 1 ? "Yes" : "No" }}
              </router-link>
              <span v-else>{{ item["status"] > 1 ? "Yes" : "No" }}</span>
            </td>
            <td class="publisher">
              <a
                :href="'https://www.ncbi.nlm.nih.gov/pubmed/' + item.pmid"
                target="_blank"
                >Yes</a
              >
            </td>
            <td class="Actions">
              <div>
                <router-link
                  v-if="item.account_type === 1"
                  :to="'/admin/user_candidate_details/' + item.id + '?type=' +item.account_type">
                  <v-btn style="background-color: #522e8e; color: #fff" small>
                    view
                  </v-btn>
                </router-link>
                <router-link v-else :to="'/admin/user_candidate_details/' + item.id + '?type=' +item.account_type">
                  <v-btn style="background-color: #522e8e; color: #fff" small>
                    view
                  </v-btn>
                </router-link>
                <!-- <v-btn
                  v-if="showPendingDocuments"
                  @click="updateUserVerifyOrReject(item, 'verified')"
                  style="background-color: rgb(42 205 100); color: #fff"
                  small
                >
                  Approve
                </v-btn> -->
                <!-- <v-btn
                  v-if="showPendingDocuments"
                  @click="openDialog(item)"
                  style="background-color: rgb(191 20 67); color: #fff"
                  small
                >
                  Reject
                </v-btn> -->
                <!-- <v-btn
                  v-if="showRejectedDocuments"
                  @click="updateUserVerifyOrReject(item, 'completed')"
                  style="background-color: rgb(61 185 156); color: #fff"
                  small
                >
                  Reinstate
                </v-btn> -->
              </div>
            </td>
          </tr>
        </template>
      </v-data-table>
    </div>
    <NoteModal @save="save" @cancel="cancel" :dialog="dialog" />
  </div>
</template>

<script>
import NoteModal from "@/views/admin/NoteModal.vue";
export default {
  name: 'User',
  components: { NoteModal },

  data() {
    return {
      search: "",
      selectedTasks: [],
      selectedTab: 0,
      current_page: 1,
      showPendingDocuments: true,
      showVerifiedDocuments: true,
      showRejectedDocuments: true,
      totalNumberOfItems: 0,
      dialog: false,
      selectedItem: null,
      loading: false,
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Created", value: "calories" },
        { text: "Name", value: "fat" },
        { text: "Type", value: "carbs" },
        { text: "Form", value: "carbs" },
        { text: "Email", value: "email" },
        { text: "Documents", value: "protein" },
        { text: "Images", value: "protein" },

        { text: "actions", value: "actions", sortable: false, align: "start" },
      ],
      items: [],
    };
  },

  computed: {
    type () {
      return this.$route.query.type
    }
  },

  created() {
    console.log(this.type, '>>>>>>>>>')
    if(this.type == 'verified') {
      this.getVerifiedUsers();
    }
    else if (this.type == 'rejected') {
      this.getRejectedUsers();
    }
    else {
      this.getPendingUsers();
    }
  },
  methods: {
    openDialog(item) {
      this.dialog = true;
      this.selectedItem = item;
    },
    cancel(e) {
      this.dialog = false;
    },
    async save(note) {
      const data = {
        id: this.selectedItem.id,
        status: "rejected",
        note: note,
      };
      await this.$store
        .dispatch("updateUserVerifyOrReject", data)
        .then((data) => {
          this.items = this.items.filter(
            (item) => item.id !== this.selectedItem.id
          );
          let loggedUser = JSON.parse(localStorage.getItem("user"));
          if (loggedUser.id == this.selectedItem.id) {
            loggedUser.status = "4";
            localStorage.setItem("user", JSON.stringify(loggedUser));
          }
          this.cancel(null);
        })
        .catch((error) => {});
    },
    onItemClick(e) {},
    async getVerifiedUsers() {
      this.search = "";
      this.selectedTab = 0;
      this.items = [];
      this.loading = true;
      await this.$store
        .dispatch("getVerifiedUsers")
        .then((data) => {
          this.items = data.data;
          this.totalNumberOfItems = data.total;
          this.showPendingDocuments = false;
          this.showVerifiedDocuments = true;
          this.showRejectedDocuments = false;
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
        });
    },
    async getRejectedUsers() {
      this.search = "";
      this.selectedTab = 0;
      this.items = [];
      this.loading = true;
      await this.$store
        .dispatch("getRejectedUsers")
        .then((data) => {
          this.items = data.data;
          this.totalNumberOfItems = data.total;
          this.showPendingDocuments = false;
          this.showVerifiedDocuments = false;
          this.showRejectedDocuments = true;
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
        });
    },
    async getPendingUsers() {
      this.search = "";
      this.selectedTab = 0;
      this.items = [];
      this.loading = true;
      await this.$store
        .dispatch("getPendingUsers")
        .then((data) => {
          this.items = data.data;
          this.totalNumberOfItems = data.total;
          this.showPendingDocuments = true;
          this.showVerifiedDocuments = false;
          this.showRejectedDocuments = false;
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
        });
    },
    async updateUserVerifyOrReject(user, status) {
      const data = {
        id: user.id,
        status: status,
      };
      await this.$store
        .dispatch("updateUserVerifyOrReject", data)
        .then((data) => {
          this.items = this.items.filter((item) => item.id !== user.id);
          let loggedUser = JSON.parse(localStorage.getItem("user"));
          if (loggedUser.id == user.id) {
            loggedUser.status = status == "verified" ? "3" : "4";
            localStorage.setItem("user", JSON.stringify(loggedUser));
          }
        })
        .catch((error) => {});
    },
    onSearch() {
      const _payload = {
        page: 1,
        keyword: this.search,
        account_type: this.selectedTab,
      };
      this.getData(_payload);
    },
    onSelectedTab(tab) {
      const _payload = {
        page: 1,
        keyword: this.search,
        account_type: this.selectedTab,
      };
      this.getData(_payload);
    },
    paginate(e) {
      if (!e || e.page == 1) {
        return;
      }

      const _payload = {
        page: e.page,
        keyword: this.search,
        account_type: this.selectedTab,
      };
      this.getData(_payload);
    },
    getData(_payload) {
      if (this.showPendingDocuments) {
        this.getPageiniationPendingUsers(_payload);
      } else if (this.showVerifiedDocuments) {
        this.getPageiniationVerifiedUsers(_payload);
      } else if (this.showRejectedDocuments) {
        this.getPageiniationRejectedUsers(_payload);
      }
    },
    async getPageiniationPendingUsers(_payload) {
      this.items = [];
      this.loading = true;
      await this.$store
        .dispatch("getPendingUsersByPage", _payload)
        .then((data) => {
          this.items = data.data;
          this.totalNumberOfItems = data.total;
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
        });
    },
    async getPageiniationRejectedUsers(_payload) {
      this.items = [];
      this.loading = true;
      await this.$store
        .dispatch("getRejectedUsersByPage", _payload)
        .then((data) => {
          this.items = data.data;
          this.totalNumberOfItems = data.total;
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
        });
    },
    async getPageiniationVerifiedUsers(_payload) {
      this.items = [];
      this.loading = true;
      await this.$store
        .dispatch("getVerifiedUsersByPage", _payload)
        .then((data) => {
          this.items = data.data;
          this.totalNumberOfItems = data.total;
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" >
.admin-user-container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  overflow: hidden;
  border: 2px solid #ddd;
  border-radius: 15px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 10px 30px #fff;
  margin: 20px;
  opacity: 1;
  .panel-header {
    height: 103px;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    .top-header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 5px;

      .top-right .v-btn {
        margin-right: 5px;
        border-radius: 20px;
      }
    }
    .bottom-header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
    }
  }
  .panel-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 0px 10px;

    .v-data-table__wrapper {
      table {
        border-collapse: separate;
        border-spacing: 0 10px;
        width: 100%;
        border: none;
        th {
          padding: 0;
        }
        .v-data-table__checkbox {
          padding-left: 15px;
        }
        tr {
          background-color: #f1f5f7;
          padding-bottom: 1em;
          td:first-child,
          th:first-child {
            border-radius: 10px 0 0 10px;
          }
          td:last-child,
          th:last-child {
            border-radius: 0 10px 10px 0;
          }
          .v-btn {
            margin: 5px;
            border-radius: 20px;
          }
        }
      }
    }
  }
  .v-select .v-select__selections input {
    display: none;
  }
  input {
    border-radius: none;
    border: none;
  }
}
</style>