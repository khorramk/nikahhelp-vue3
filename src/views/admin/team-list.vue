<template>
  <div class="admin-user-container">
    <div class="panel-header">
      <div class="top-header">
        <div>
          <v-btn style="background-color: #522e8e; color: #fff" large>
            Active Teams
          </v-btn>
        </div>
        <div class="top-right">
          <v-btn style="background-color: #522e8e; color: #fff" small>
            Add New Team
          </v-btn>
          <v-btn style="background-color: rgb(61 185 156); color: #fff" small>
            <v-icon dark> md-minus </v-icon>
            Suspended Teams
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
          <v-tab><v-badge color="red" content="6">Rep.to Cand.</v-badge></v-tab>
          <v-tab><v-badge color="red" content="6">Matchmaker</v-badge></v-tab>
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
        item-key="name"
        class="dt-table"
        :footer-props="{
          'items-per-page-text': 'Show',
        }"
      >
        <template #headers="props">
          <tr>
            <th v-for="header in props.headers[0]" :key="header.value">
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
            <td class="created_at">{{ $filter.formatDate(item["created_at"]) }}</td>
            <td class="name">{{ item["name"] }}</td>
            <td class="description">{{ item["description"] }}</td>
            <td class="publisher">
              <a
                :href="'https://www.ncbi.nlm.nih.gov/pubmed/' + item.pmid"
                target="_blank"
                >Yes</a
              >
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
                <v-btn style="background-color: #522e8e; color: #fff" small>
                  view
                </v-btn>
                <v-btn
                  style="background-color: rgb(42 205 100); color: #fff"
                  small
                >
                  Edit
                </v-btn>
                <v-btn
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
                </v-btn>
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
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Created", value: "calories" },
        { text: "Name", value: "name" },
        { text: "description", value: "description" },
        { text: "Documents", value: "protein" },
        { text: "Images", value: "protein" },

        { text: "actions", value: "actions", sortable: false, align: "start" },
      ],
     items:[]
    };
  },

   mounted() {
   
    this.getTeamList();

  },
  methods: {
    onItemClick(e) {},
    async getTeamList() {
      await this.$store
        .dispatch("getTeamList")
        .then((data) => {
          this.items=data.data;
        })
        .catch((error) => {});
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