<template>
  <div class="admin-deleted-user-container">
    <div class="panel-header">
      <div class="top-header">
        <div>
          <v-btn style="background-color: #522e8e; color: #fff" large>
            Deleted Users
          </v-btn>
        </div>
      </div>
      <div class="bottom-header">
        <v-tabs>
          <v-tab><v-badge color="red" content="6">All</v-badge></v-tab>
          <v-tab><v-badge color="red" content="6">Candidate</v-badge></v-tab>
          <v-tab
            ><v-badge color="red" content="6">Representative</v-badge></v-tab
          >

          <!-- <v-tab><v-badge color="red" content="6">Matchmaker</v-badge></v-tab> -->
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
        :search="search"
        :single-select="false"
        item-key="name"
        class="dt-table"
        :footer-props="{
          'items-per-page-text': 'Show',
        }"
      >
        <template #headers="props">
          <tr>
            <th v-for="header in props.headers[0]" :key="header.value">
              {{ header.text }}
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
            <td class="email_verified_at">
              {{ $filter.formatDate(item["email_verified_at"])}}
            </td>
            <td class="full_name">{{ item["full_name"] }}</td>
            <td class="account_type_meaning">
              {{ item["account_type_meaning"] }}
            </td>
            <td class="email">
              {{ item["email"] }}
            </td>
            <td class="publisher">
              {{ item["carbs"] }}
            </td>

            <td class="Actions">
              <div>
                <v-btn style="background-color: #522e8e; color: #fff" small>
                  view
                </v-btn>

                <v-btn
                  style="background-color: rgb(61 185 156); color: #fff"
                  small
                >
                  Note
                </v-btn>
                <v-btn
                  @click="updateUserVerifyOrReject(item)"
                  style="background-color: rgb(42 205 100); color: #fff"
                  small
                >
                  Reinstate
                </v-btn>
              </div>
            </td>
          </tr>
        </template>
        <template v-slot:bottom="{ pagination, options, updateOptions }">
          <v-data-footer
            :pagination="pagination"
            :options="options"
            @update:options="updateOptions"
            items-per-page-text="$vuetify.dataTable.itemsPerPageText"
          />
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
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Deleted", value: "calories" },
        { text: "Name", value: "fat" },
        { text: "Type", value: "carbs" },
        { text: "Email", value: "email" },
        { text: "Deleted By", value: "protein" },
        { text: "actions", value: "actions", sortable: false, align: "start" },
      ],
      items: [],
    };
  },

  mounted() {
    this.getRejectedUsers();
  },
  methods: {
    onItemClick(e) {},
    async updateUserVerifyOrReject(user) {
      const data = {
        id: user.id,
        status: "completed",
      };
      await this.$store
        .dispatch("updateUserVerifyOrReject", data)
        .then((data) => {
          this.items = this.items.filter((item) => item.id !== user.id);
          let loggedUser = JSON.parse(localStorage.getItem("user"));
            if (loggedUser.id == user.id) {
            loggedUser.status = "2";
            localStorage.setItem("user", JSON.stringify(loggedUser));
          }
        })
        .catch((error) => {});
    },
    async getRejectedUsers() {
      await this.$store
        .dispatch("getRejectedUsers")
        .then((data) => {
          this.items = data;
        })
        .catch((error) => {});
    },
  },
};
</script>

<style lang="scss" >
.admin-deleted-user-container {
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