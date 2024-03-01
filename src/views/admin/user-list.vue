<template>
  <div class="active-user-container">
    <div class="admin-header">
      <div class="top-header">
        <div class="top-left">
          <v-tabs
            @change="onSelectedTab"
            v-model="selectedTab"
            style="height: 46px"
          >
            <v-tab value="0"
              ><v-badge color="red" :content="totalNumberOfItems"
                >All</v-badge
              ></v-tab
            >
            <v-tab value="1"
              ><v-badge color="red" :content="totalNumberOfCandidateItems"
                >Candidate</v-badge
              ></v-tab
            >
            <v-tab value="2"
              ><v-badge color="red" :content="totalNumberOfRepItems"
                >Representative</v-badge
              ></v-tab
            >
          </v-tabs>
        </div>
        <div class="top-right">
          <!-- <v-btn style="background-color: #522e8e; color: #fff" small>
            Add New User
          </v-btn>
          <v-btn style="background-color: rgb(61 185 156); color: #fff" small>
            <v-icon dark> md-minus </v-icon>
            Suspended Users
          </v-btn> -->
          <v-text-field
            v-model="search"
            filled
            rounded
            dense
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            @keyup.enter="onSearch"
          ></v-text-field>
          <v-btn
            class="mr-2"
            @click="onSearch"
            style="background-color: rgb(42 205 100); color: #fff"
            m
          >
            Search
          </v-btn>
        </div>
      </div>
      <!-- <div class="bottom-header"></div> -->
    </div>
    <div class="panel-content">
      <v-data-table
        v-model="selectedTasks"
        show-select
        :items="items"
        :headers="headers"
        :single-select="false"
        :search="search"
        item-key="name"
        class="elevation-1 dt-table"
        :server-items-length="totalNumberOfItems"
        :options="options"
        @update:options="paginate"
        :loading="loading"
        :loading-text="'Loading... Please wait'"
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
                :value="item.isChecked"
                hide-details
              />
            </td>
            <td class="id">{{ item["id"] }}</td>
            <td class="created_at">
              {{ item["created_at"] | formatDate }}
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
                item["account_type"] == 1 && item.candidate_info
                  ? item.candidate_info.data_input_status == 0
                    ? "In-complete"
                    : item.candidate_info.data_input_status > 5 &&
                      item.candidate_info.is_uplaoded_doc == 1
                    ? "Fully Completed"
                    : item.candidate_info.data_input_status > 5 &&
                      item.candidate_info.is_uplaoded_doc == 0
                    ? "Completed Without ID"
                    : "Partially Completed"
                  : item["account_type"] == 2 && item.representative_info
                  ? item.representative_info.data_input_status == 0
                    ? "In-complete"
                    : item.representative_info.data_input_status > 2 &&
                      item.representative_info.is_uplaoded_doc == 1
                    ? "Fully Completed"
                    : item.representative_info.data_input_status > 2 &&
                      item.representative_info.is_uplaoded_doc == 0
                    ? "Completed"
                    : "Partially Completed"
                  : "In-completed"
              }}
            </td>

            <td class="status">
              <span :style="{color: getStatusColor(item)}">{{ getStatus(item) }}</span>
            </td>

            <td class="email">
              {{ item["email"] }}
            </td>

            <!-- <td class="publisher">
              <router-link
                v-if="item['status'] > 1"
                :to="'/admin/user_candidate_details/' + item.id"
                >{{ item["status"] > 1 ? "Yes" : "No" }}
              </router-link>
              <span v-else>{{ item["status"] > 1 ? "Yes" : "No" }}</span>
            </td> -->
            <!-- 
            <td class="publisher">
              <a
                :href="'https://www.ncbi.nlm.nih.gov/pubmed/' + item.pmid"
                target="_blank"
                >Yes</a
              >
            </td> -->

            <td class="Actions">
              <div>
                <router-link
                  v-if="item.account_type === 1"
                  :to="
                    '/admin/user_candidate_details/' +
                    item.id +
                    '?type=' +
                    item.account_type
                  "
                >
                  <v-btn style="background-color: #522e8e; color: #fff" small>
                    view
                  </v-btn>
                </router-link>
                <router-link
                  v-else
                  :to="
                    '/admin/user_candidate_details/' +
                    item.id +
                    '?type=' +
                    item.account_type
                  "
                >
                  <v-btn style="background-color: #522e8e; color: #fff" small>
                    view
                  </v-btn>
                </router-link>
                <!--  <v-btn
                  style="background-color: rgb(42 205 100); color: #fff"
                  small
                >
                  Edit
                </v-btn> -->
                <!-- <v-btn
                  @click="updateUserVerifyOrReject(item)"
                  style="background-color: rgb(61 185 156); color: #fff"
                  small
                >
                  Suspend
                </v-btn>
                <v-btn
                  style="background-color: rgb(191 20 67); color: #fff"
                  small
                >
                  Note
                </v-btn> -->
              </div>
            </td>
          </tr>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      search: "",
      selectedTasks: [],
      selectedTab: 0,
      current_page: 1,
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
        { text: "Profile", value: "carbs" },
        { text: "Status", value: "complete" },

        { text: "Email", value: "email" },
        // { text: "Documents", value: "protein" },
        // { text: "Images", value: "protein" },

        { text: "Actions", value: "actions", sortable: false, align: "start" },
      ],
      items: [],
      totalNumberOfItems: 0,
      totalNumberOfCandidateItems: 0,
      totalNumberOfRepItems: 0,
      options: {
        rowsPerPage: 8,
        page: 1,
        totalItems: 0,
      },
    };
  },
  mounted() {
    this.getUserReports();
    this.getCanOrRepCount();
  },
  methods: {
    onItemClick(e) {},
    onSearch() {
      const _payload = {
        page: 1,
        keyword: this.search,
        account_type: this.selectedTab,
      };
      this.getPageiniationUsers(_payload);
    },
    onSelectedTab(tab) {
      const _payload = {
        page: 1,
        keyword: this.search,
        account_type: this.selectedTab,
      };
      this.getPageiniationUsers(_payload);
    },
    paginate(e) {
      if (!e) {
        return;
      }

      const _payload = {
        page: e.page,
        keyword: this.search,
        account_type: this.selectedTab,
      };
      this.getPageiniationUsers(_payload);
    },
    async getPageiniationUsers(_payload) {
      this.items = [];
      this.loading = true;
      await this.$store
        .dispatch("getUserReportsByPage", _payload)
        .then((data) => {
          this.items = data.data;
          this.totalNumberOfItems = data.total;
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
        });
    },
    async getCanOrRepCount() {
      await this.$store
        .dispatch("getCountCanOrRep")
        .then((data) => {
          this.totalNumberOfCandidateItems = data.no_of_candidate;
          this.totalNumberOfRepItems = data.no_of_rep;
        })
        .catch((error) => {});
    },
    async updateUserVerifyOrReject(user) {
      const data = {
        id: user.id,
        status: "rejected",
      };
      await this.$store
        .dispatch("updateUserVerifyOrReject", data)
        .then((data) => {
          this.items = this.items.filter((item) => item.id !== user.id);
          let loggedUser = JSON.parse(localStorage.getItem("user"));
          if (loggedUser.id == user.id) {
            loggedUser.status = "4";
            localStorage.setItem("user", JSON.stringify(loggedUser));
          }
        })
        .catch((error) => {});
    },
    async getUserReports() {
      this.search = "";
      this.selectedTab = 0;
      this.items = [];
      this.loading = true;
      await this.$store
        .dispatch("getUserReports")
        .then((data) => {
          this.items = data.data;
          this.totalNumberOfItems = data.total;
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
        });
    },

    getStatus(item) {
      const status = {
        0: "Deleted",
        1: "Pending",
        2: "Pending",
        3: "Verified",
        4: "Rejected",
        9: "Suspended",
        0: "Deleted",
      };

      return status[item.status];
    },
    getStatusColor(item) {
      const status = {
        0: "red",
        1: "orange",
        2: "orange",
        3: "#2acd64",
        4: "red",
        9: "red",
        0: "red",
      };

      return status[item.status];
    },
  },
};
</script>

<style  lang="scss">
.active-user-container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  overflow: hidden;
  border: 2px solid #ddd;
  border-radius: 15px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 10px 30px #fff;
  margin: 5px;
  opacity: 1;
  .admin-header {
    height: 52px;
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

      .top-right {
        display: flex;
        .v-btn {
          margin-right: 5px;
          border-radius: 20px;
        }
      }
      .top-left {
        display: flex;
        .v-item-group {
          height: 46px;
        }
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