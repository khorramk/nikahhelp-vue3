<template>
  <div class="col-lg-6 col-xl-4">
    <!-- Team Deletion Modal -->
    <DeletionModal
        :showModalProp="showModalDeletion"
        :teamData="teamData"
        @handleCancel="showModalDeletion = false"
        @handleOk="handleOkDeletion"
    />

    <!-- preferences modal -->
    <PreferenceModal
        :showModalProp="showModalPreference"
        :teamData="teamData"
        :teamVisibility="true"
        @handleCancel="showModalPreference = false"
        @handleOk="handleOkPreference"
    />

    <!-- leave team modal -->
    <LTModal
        :showModalProp="showModalLT"
        :teamData="teamData"
        :isOwnerAdmin="isOwnerAdmin"
        :ownerAdminID="$store.getters.userInfo.id"
        @handleCancel="showModalLT = false"
        @handleOk="handleOkLT"
    />

    <!-- team name change modal  -->
    <TNCModal
        :showModalProp="showModalTNC"
        :teamData="teamData"
        @handleCancel="showModalTNC = false"
        @handleOk="handleOkTNC"
    />

    <!-- Team Description Change Modal -->
    <TDCModal
        :showModalProp="showModalTDC"
        :teamData="teamData"
        @handleCancel="showModalTDC = false"
        @handleOk="handleOkTDC"
    />

    <!-- start box card s -->
    <div class="team-card">
      <div class="team-card-header">
        <!-- Team Info with ID -->
        <div class="left">
          <div class="status active">
            Team {{ index + 1 }}
            <span class="green" v-if="turnOn"></span>
            <span class="red" v-else></span>
          </div>
        </div>

        <!-- Edit Buttons -->
        <div class="middle">
          <a-tooltip placement="top" title="Edit Team Info">
            <button class="close">
              <img
                  src="../../assets/icon/edit.svg"
                  alt="team edit"
                  @click="editTeam"
              />
            </button>
          </a-tooltip>
          <a-modal
              v-model="edit_button_flag"
              title="Change Team Info"
              @ok="handleTeamInfoChange"
          >
            <div class="row">
              <!-- Change Team Logo -->
              <div class="col-4 mt-3">
                <!-- Styling for this modal logo and browse button are in the  -->
                <div class="logo">
                  <img
                      class="modal-logo"
                      v-if="!avatarSrc"
                      :src="teamData.logo"
                      alt="info image"
                  />
                  <img
                      class="modal-logo"
                      v-if="avatarSrc"
                      :src="avatarSrc"
                      alt="info image"
                  />
                </div>
                <div class="browse-btn">
									<span class="file-input btn btn-file">
										Browse
										<input
                        type="file"
                        class="input-image"
                        name="avatar"
                        accept=".png, .jpeg, .jpg"
                        @change="getAvatar"
                    />
									</span>
                </div>
              </div>

              <!-- Change Name and Description section -->
              <div class="col-8">
                <label class="mt-2">Team Name: </label>
                <a-input type="text" v-model="teamInfo.name" />
                <label class="mt-2">Team Description: </label>
                <a-textarea
                    type="text"
                    v-model="teamInfo.description"
                    :rows="3"
                />
              </div>
            </div>
          </a-modal>

          <!-- <button class="close" v-if="edit_button_flag">
            <img src="../../assets/icon/save.svg" alt="save" />
          </button>
          <button class="close" v-if="edit_button_flag" @click="editTeam">
            <img src="../../assets/icon/edit-close.svg" alt="close" />
          </button> -->
          <!-- <button class="close" v-if="edit_button_flag">
            <img src="../../assets/icon/delete.svg" alt="delete" />
          </button> -->
        </div>

        <!-- Side Menu -->
        <div class="right">
          <!-- Activate Team Button -->
          <div class="switch-wrapper">
            <div>
              <a-tooltip
                  placement="top"
                  title="Click here to activate this team"
              >
                <a-switch v-model:checked="turnOn" @click="onChangeActivateTeam" />
              </a-tooltip>
            </div>
          </div>
          <!-- Default dropleft button -->
          <div class="btn-group dropleft">
            <a-tooltip
                placement="top"
                title="Change Roles, Preferences, Delete and Leave Team"
            >
              <button
                  type="button"
                  class="dropdown-toggle"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
              ></button>
            </a-tooltip>
            <!-- Side Menus(Prerferences, Delete, Leave Team) -->
            <div class="dropdown-menu">
              <!-- <a class="dropdown-item" href="#">Edit</a> -->
              <!-- <a class="dropdown-item" href="#">Close</a> -->
              <a class="dropdown-item" @click="changeRole">Change Roles</a>
              <a class="dropdown-item" @click="preferencesModal">Preferences</a>
              <a class="dropdown-item" @click="deleteTeam">Delete</a>
              <a class="dropdown-item red-hover" @click="leaveTeam"
              >Leave Team</a
              >
            </div>
          </div>
        </div>
      </div>
      <!-- Team Info -->
      <div class="card-info">
        <!-- Team Logo -->
        <div class="img mt-2">
          <button>
            <!-- <img src="../../assets/info-img.png" alt="info image" /> -->
            <img class="img-logo" :src="teamData.logo" alt="info image" />
            <!-- <span v-if="edit_button_flag"
              ><img src="../../assets/img-edit.png" alt="info edit"
            /></span> -->
          </button>
        </div>
        <div class="info-content">
          <!-- Team Name -->
          <div class="member-name">
            <p class="fw-600">{{ teamData.name }}</p>
            <!-- team Name -->
            <!-- <button v-if="edit_button_flag">
              <img
                src="../../assets/img-edit.png"
                alt="img edit"
                @click="showModalTNC = true"
              />
            </button> -->
          </div>
          <!-- Team Description -->
          <div class="member-desc">
            <p>
              {{ teamData.description }}
            </p>
            <!-- Edit Button for team description -->
            <!-- <button v-if="edit_button_flag">
              <img
                src="../../assets/img-edit.png"
                alt="img edit"
                @click="showModalTDC = true"
              />
            </button> -->
          </div>
          <!-- Team Created By -->
          <div class="creator">
            Team Created by
            <span class="fw-600"> {{ teamData.created_by.full_name }}</span>
          </div>
          <!-- Message Button for team -->
          <!-- <div class="creator">
            <button
              style="float: left"
              class="btn btn-sm btn-primary mt-1"
              @click="startConversation()"
            >
              Message
            </button>
          </div> -->
        </div>
      </div>

      <!-- Member stats -->
      <div class="member-area">
        <div class="members">
          <p>
            <span>{{ teamData.teamlisted_short_listed.length }}</span>
            Teamlisted
          </p>
        </div>
        <div class="members">
          <p>
						<span>{{
                teamData.team_requested_connected_list.length +
                teamData.team_requested_accepted_connected_list.length
              }}</span>
            Connected
          </p>
        </div>
        <!-- <div class="members">
          <p>
            <span>{{ memberNumber + adminNumber }}</span> Members
          </p>
        </div>
        <div class="members">
          <p>
            <span>{{ adminNumber }}</span> Admin
          </p>
        </div>
        <div class="members">
          <p>
            <span>{{ teamlistedNumber }}</span> Teamslisted
          </p>
        </div> -->
      </div>

      <!-- Add or Remove Member Button -->
      <div class="member-action">
        <div class="add-remove">
          <button class="add-member" @click="addMemberClick">
            <img src="../../assets/icon/add.svg" alt="add" /> Add member
          </button>
          <a-tooltip placement="top" title="Show team invitations">
            <img
                src="@/assets/icon/link-genarate-share.svg"
                alt=""
                height="25"
                width="25"
                style="cursor: pointer"
                class="shared-link"
                @click="showInvitation"
            />
          </a-tooltip>
          <button
              class="remove-member"
              @click="remove_button_flag = !remove_button_flag"
          >
            <img src="../../assets/icon/remove.svg" alt="remove" />
            <span>Remove member</span>
          </button>

          <a-modal
              :width="900"
              v-model="memberInvitation"
              title="Create Join Invitation"
              @ok="sendInvitationLink"
          >
            <a-row>
              <!-- Add As a (Representative / Match Maker) -->
              <a-col :span="6">
                <a-select
                    placeholder="Add as a"
                    style="width: 200px"
                    @change="handleChangeAddAs"
                >
                  <a-select-option value="Representative">
                    Representative
                  </a-select-option>
                  <a-select-option value="Match Maker">
                    Match Maker
                  </a-select-option>
                </a-select>
              </a-col>

              <!-- Role (Member/ Admin) -->
              <a-col :span="6">
                <a-select
                    placeholder="Role"
                    style="width: 200px"
                    @change="handleChangeRole"
                >
                  <a-select-option value="Admin"> Admin </a-select-option>
                  <a-select-option value="Member"> Member </a-select-option>
                </a-select>
              </a-col>

              <a-col :span="6">
                <a-input
                    placeholder="Relationship"
                    @change="handleChangeRelationship"
                >
                  <a-tooltip slot="suffix" title="Relationship with Member">
                    <InfoCircleOutlined style="color: rgba(0, 0, 0, 0.45)" />
                  </a-tooltip>
                </a-input>
              </a-col>
              <a-col :span="6">
                <a-input
                    placeholder="Invitation Link"
                    style="margin-left: 15px"
                    readonly="true"
                    :value="invitationObject.invitation_link"
                >
                </a-input>
              </a-col>
            </a-row>
          </a-modal>
        </div>

        <!-- Member Table -->
        <table width="100%">
          <template v-for="member in sortOwnerFirst(teamData.team_members)">
            <!--            <tr><td colspan="4">{{ member }}</td></tr>-->
            <!-- its a false warning -->
            <tr class="admin-member" v-if="member.role.toString() == 'Owner+Admin'">
              <td>
                <!-- <div class="name-short">
                  {{ nameInitials(member.user.full_name) }}
                </div> -->
                <div class="name-short">O{{ firstLetter(member.role) }}</div>
                <!-- <div class="name-short" v-if="!edit_button_flag">
                  {{ firstLetter(member.role) }}
                </div> -->
                <!-- <div
                  class="name-short"
                  style="padding: 0px; margin: 0"
                  v-if="edit_button_flag"
                >
                  <select
                    style="
                      color: #000c17;
                      background-color: #cccccc;
                      border-radius: 10px;
                      width: 35px;
                      height: 20px;
                    "
                    @change="(e) => onRoleChange(e, member.user_id)"
                  >
                    <option selected disabled>{{ member.role }}</option>
                    <option>Admin</option>
                    <option>Member</option>
                  </select>
                </div> -->
              </td>
              <td>
                <div class="name-full">{{ member.user.full_name }}</div>
              </td>
              <td>
                <div class="title">
                  {{ accountTypeReducer(member.user_type) }}
                </div>
              </td>
              <!--<td>
                <div class="status">
                  <img src="../../assets/icon/done,success.svg" alt="remove" />
                </div>
              </td>-->
              <td>
                <div class="relation">{{ member.relationship }}</div>
              </td>
              <td>
                <!-- <div class="remove">
                  <img
                    src="../../assets/icon/remove.svg"
                    alt="remove"
                    v-if="edit_button_flag && remove_button_flag"
                  />
                </div> -->
              </td>
            </tr>
            <!--						<tr class="spacer" v-if="member.role == 'Owner+Admin'">-->
            <!--							Spacer-->
            <!--						</tr>-->
            <!-- <br v-if="member.role == 'Owner+Admin'" :key="member.id" /> -->

            <tr class="admin-member" v-if="member.role == 'Admin'">
              <td>
                <!-- <div class="name-short">
                  {{ nameInitials(member.user.full_name) }}
                </div> -->
                <div class="name-short" v-if="!changeRoleEnabled">
                  {{ firstLetter(member.role) }}
                </div>
                <!-- <div class="name-short" v-if="!edit_button_flag">
                  {{ firstLetter(member.role) }}
                </div> -->
                <div
                    class="name-short"
                    style="padding: 0px; margin: 0"
                    v-if="changeRoleEnabled"
                >
                  <select
                      style="
											color: #242424;
											background-color: #fff;
											border-radius: 10px;
											width: 55px;
											height: 20px;
											text-align: left;
										"
                      @change="(e) => onRoleChange(e, member.user_id)"
                  >
                    <option selected disabled>{{ member.role }}</option>
                    <option>Admin</option>
                    <option>Member</option>
                  </select>
                </div>
              </td>
              <td>
                <div class="name-full">{{ member.user.full_name }}</div>
              </td>
              <td>
                <div class="title">
                  {{ accountTypeReducer(member.user_type) }}
                </div>
              </td>
              <!--<td>
                <div class="status">
                  <img src="../../assets/icon/done,success.svg" alt="remove" />
                </div>
              </td>-->
              <td>
                <div class="relation">{{ member.relationship }}</div>
              </td>
              <td>
                <!-- <div class="remove">
                  <img
                    src="../../assets/icon/remove.svg"
                    alt="remove"
                    v-if="edit_button_flag && remove_button_flag"
                  />
                </div> -->
              </td>
            </tr>
            <!--						<tr class="spacer" v-if="member.role == 'Admin'">-->
            <!--							Spacer-->
            <!--						</tr>-->

            <tr class="only-member" v-if="member.role == 'Member'">
              <td>
                <!-- <div class="name-short">
                  {{ nameInitials(member.user.full_name) }}
                </div> -->
                <div class="name-short" v-if="!changeRoleEnabled">
                  {{ firstLetter(member.role) }}
                </div>
                <div
                    class="name-short"
                    style="padding: 0px; margin: 0"
                    v-if="changeRoleEnabled"
                >
                  <select
                      style="
											color: #242424;
											background-color: #fff;
											border-radius: 10px;
											width: 55px;
											height: 20px;
											text-align: left;
										"
                      @change="(e) => onRoleChange(e, member.user_id)"
                  >
                    <option selected disabled>{{ member.role }}</option>
                    <option>Admin</option>
                    <option>Member</option>
                  </select>
                </div>
              </td>
              <td>
                <div class="name-full">{{ member.user.full_name }}</div>
              </td>
              <td>
                <div class="title">
                  {{ accountTypeReducer(member.user_type) }}
                </div>
              </td>
              <!--<td>
                <div class="status">
                  <img src="../../assets/icon/done,success.svg" alt="remove" />
                </div>
              </td>-->
              <td>
                <div class="relation">{{ member.relationship }}</div>
              </td>
              <td>
                <button
                    type="button"
                    class="remove"
                    v-if="remove_button_flag"
                    @click="
										deleteTeamMember(member.user_id, member.user.full_name)
									"
                >
                  <img src="../../assets/icon/remove.svg" alt="remove" />
                </button>
              </td>
            </tr>
            <!--						<tr class="spacer" v-if="member.role != 'Owner+Admin'">-->
            <!--							Spacer-->
            <!--						</tr>-->
            <!-- <br v-if="member.role !== 'Owner+Admin'" :key="member.id" /> -->
          </template>

          <!-- <tr class="only-member">
            <td><div class="name-short">A</div></td>
            <td><div class="name-full">Sheikh Parvez</div></td>
            <td><div class="title">Rep.</div></td>
            <td>
              <div class="status">
                <img src="../../assets/icon/pending.svg" alt="remove" />
              </div>
            </td>
            <td><div class="relation">Candidate</div></td>
            <td>
              <button type="button" class="remove">
                <img src="../../assets/icon/remove.svg" alt="remove" />
              </button>
            </td>
          </tr>
          <tr class="only-member">
            <td><div class="name-short">A</div></td>
            <td><div class="name-full">Rifat Karim</div></td>
            <td><div class="title">Rep.</div></td>
            <td>
              <div class="status">
                <img src="../../assets/icon/not-joined.svg" alt="remove" />
              </div>
            </td>
            <td><div class="relation">Candidate</div></td>
            <td>
              <button type="button" class="remove">
                <img src="../../assets/icon/remove.svg" alt="remove" />
              </button>
            </td>
          </tr> -->
        </table>

        <!-- for the sake of reactivity am breaking rule here -->
        <!-- Team Invitation Part -->
        <!-- <div v-if="edit_button_flag">
          <div
            class="select-member"
            v-for="index in addMemberCount"
            :key="index"
          >
            <select
              class="custom-select"
              id="inputGroupSelect01"
              @change="handleChangeAddAs($event, index)"
            >
              <option selected>Role</option>
              <option value="Candidate">Candidate</option>
              <option value="Representative">Representative</option>
              <option value="Match Maker">Match Maker</option>
            </select>

            <select
              class="custom-select"
              id="inputGroupSelect01"
              @change="handleChangeRole($event, index)"
            >
              <option selected>Add as a</option>
              <option value="Owner+Admin">Owner+Admin</option>
              <option value="Member Admin">Admin</option>
              <option value="Member">Member</option>
            </select>

            <input
              placeholder="Relation"
              type="text"
              class="form-controller input-custom-invitation-link"
              @change="handleChangeRelationship($event, index)"
            />
            <input
              v-model="invitation_link_show[index]"
              type="text"
              class="form-controller input-custom-invitation-link"
              readonly
            />
            <button style="height: 100%; width: 15%">
              <img
                src="../../assets/icon/link-genarate-share.svg"
                alt="link genarate and share"
                @click="generateInvitation(index)"
              />
            </button>
          </div>
        </div>
      </div> -->
        <a-tooltip placement="top" title="Click save to save your changes">
          <button
              class="btn btn-sm btn-success"
              v-if="changeRoleEnabled"
              @click="changeRole"
          >
            Update
          </button>
        </a-tooltip>
      </div>
      <!-- Invitations History -->
      <div class="team-invitations mr-3">
        <!-- <button class="btn btn-sm btn-primary" @click="showInvitation">
          Show Team Invitations
        </button> -->

        <!-- <a-tooltip placement="top" title="Show team invitations">
          <img
            src="@/assets/icon/link-genarate-share.svg"
            alt=""
            height="25"
            width="25"
            class="shared-link"
            @click="showInvitation"
          />
        </a-tooltip> -->

        <!-- Team Invitation History Modal -->

        <a-modal
            :width="700"
            v-model="showTeamInvitation"
            title="Invitations History"
        >
          <table class="table table-striped table-hover table-center">
            <thead>
            <tr>
              <th>Team ID</th>
              <th>Role</th>
              <th>User Type</th>
              <th>Relationship</th>
              <th>Invitation Link</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in teamData.team_invited_members" :key="item.id">
              <td>{{ item.team_id }}</td>
              <td>{{ item.role }}</td>
              <td>{{ item.user_type }}</td>
              <td>{{ item.relationship }}</td>
              <td>{{ item.link }}</td>
            </tr>
            </tbody>
          </table>
        </a-modal>
      </div>

      <!-- Subscription Information -->
      <div class="team-card-footer">
        <div class="left">
          <p>Team Creation Date : {{ formateDate(teamData.created_at) }}</p>
          <p class="text-success" v-if="!subTextShow">
            Subscription Expire :
            {{ formateDate(teamData.subscription_expire_at) }}
          </p>
          <p class="text-danger" v-else>
            Subscription Expire :
            {{ formateDate(teamData.subscription_expire_at) }}
          </p>
        </div>
        <div class="right" v-if="subTextShow">
          <a :href="'subscription/' + teamData.team_id"
          ><img src="../../assets/icon/renew.svg" alt="Renew Subscription" />
            {{ subText }}</a
          >
        </div>
      </div>
    </div>
    <!-- end box card s -->
  </div>
</template>

<script>
import ApiService from "../../services/api.service";
import JwtService from "../../services/jwt.service.js";
import DeletionModal from "./Modals/DeletionModal.vue";
import PreferenceModal from "./Modals/PreferenceModal.vue";
import LTModal from "./Modals/LTModal.vue";
import TNCModal from "./Modals/TeamNameChangeModal.vue";
import TDCModal from "./Modals/TeamDescriptionChange.vue";
// import { Modal } from 'ant-design-vue';
import { InfoCircleOutlined } from "@ant-design/icons-vue";
export default {
  name: "TeamDetailsCard",
  props: ["teamData", "index"],
  components: { DeletionModal, PreferenceModal, LTModal, TNCModal, TDCModal, InfoCircleOutlined },
  data() {
    return {
      invitation_link: [],
      invitation_link_show: [],
      invitationObject: {
        role: "",
        add_as_a: "",
        relationship: "",
        invitation_link: "",
      },

      add_as_a: [],
      role: [],
      relationship: [],

      edit_button_flag: false,
      remove_button_flag: false,
      turnOn: false,

      memberNumber: 0,
      adminNumber: 0,
      teamlistedNumber: 0,

      addMemberCount: 0,

      subText: "",
      subTextShow: true,

      isOwnerAdmin: 0,

      showModalDeletion: false,
      showModalPreference: false,
      showModalLT: false,
      showModalTNC: false,
      showModalTDC: false,
      conversations: [],

      teamInfo: null,

      avatar: "",
      avatarSrc: "",

      showTeamInvitation: false,

      memberInvitation: false,

      changeRoleEnabled: false,
    };
  },
  created() {
    this.teamInfo = this.teamData;


    console.log("conversations loaded");
  },
  computed: {
    is_subscribed() {
      if (this.teamData.subscription_expire_at == null) {
        return false;
      }

      //check expiry returns false if sub is expired
      if (!this.checkExpiry(this.teamData.subscription_expire_at)) {
        return false;
      } else {
        return true;
      }
    },
  },
  mounted() {
    console.log(this.teamData);
    this.entityNumberReducer();
    this.subTextReducer();
    this.checkTurnedOnSwitch();
    this.checkCurrentUser();
  },
  methods: {
    showInvitation() {
      this.showTeamInvitation = true;
    },
    handleChangeAddAs(value) {
      this.invitationObject.add_as_a = value;
    },
    handleChangeRole(value) {
      this.invitationObject.role = value;
    },
    handleChangeRelationship(e) {
      this.invitationObject.relationship = e.target.value;
    },
    sendInvitationLink() {
      let payload = {
        team_id: this.teamData.team_id,
        members: [
          {
            role: this.invitationObject.role,
            add_as_a: this.invitationObject.add_as_a,
            relationship: this.invitationObject.relationship,
            invitation_link: this.invitationObject.invitation_link,
          },
        ],
      };
      console.log(payload);
      this.$store
          .dispatch("createTeamInvite", payload)
          .then((data) => {
            console.log(data);
            if (data.data.status_code == 200 || data.data.status != "FAIL") {
              // console.log(data.data);
              //this.invitation_link_show = this.invitation_link;
              //console.log(this.invitation_link_show);
              //this.$message.success("Invitation Created");
              var vm = this;
              this.$confirm({
                icon: "check-circle",
                title: "Invitation Link Generated!",
                content: "Send this invitation link to join in your team!",
                center: true,
                confirmLoading: true,
                onOk() {
                  vm.memberInvitation = false;
                  vm.$emit("teamListUpdated");
                  //setTimeout(() => vm.$router.go(), 1000);
                },
              });
            } else {
              this.$message.error("Something went wrong, Please try again");
              //this.invitation_link[index] = "";
            }
          })
          .catch((err) => {
            // console.log(err);
            this.$message.error("Something went wrong, Please try again");
            //this.invitation_link[index] = "";
          });
    },
    imageSizeCheck(file) {
      const allowedExtensions = ['jpg', 'jpeg', 'png'];
      const extension = file.name.split('.').pop().toLowerCase();
      if(!allowedExtensions.includes(extension)) {
        this.$error({
          title: "Error!",
          content: `The file you tried to upload is not a valid image file.`,
          center: true,
        });
        return false;
      };
      if (file["size"] > 2111775) {
        this.$error({
          title: "Validation Error",
          content: "Image size can't be more than 2 mb",
          center: true,
        });
        return false;
      }
      return true;
    },
    getAvatar(e) {
      let file = e.target.files[0];
      console.log(file);
      if (!this.imageSizeCheck(file)) {
        file = "";
        return;
      }
      this.avatar = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.avatarSrc = e.target.result;
      };
    },
    async handleOkTDC(bundle) {
      console.log(bundle);
      await ApiService.post(`v1/team-update/${this.teamData.id}`, {
        description: bundle.teamDescription,
      })
          .then((data) => {
            console.log(data);
            if (data.data.status == "FAIL") {
              this.$message.error(data.data.message);
              return false;
            }
            if (data.data.status !== "FAIL") {
              this.$message.success("Successfully Description Changed");
              this.$emit("teamListUpdated");
            }
          })
          .catch((error) => {
            console.log(error);
            console.log(error.response);
            console.log(error.response.data.message);
            this.$message.error(error.response.data.message);

            this.$message.error("Something went Wrong");
            return false;
          });
    },
    async handleTeamInfoChange() {
      // let payload = {
      // 	name: this.teamInfo.name,
      // 	description: this.teamInfo.description,
      // };
      let formData = new FormData();
      formData.append("name", this.teamInfo.name);
      formData.append("description", this.teamInfo.description);
      if (this.avatar) {
        formData.append("logo", this.avatar);
      }
      await ApiService.post(`v1/team-update/${this.teamData.id}`, formData)
          .then((data) => {
            console.log(data);
            if (data.data.status == "FAIL") {
              this.$message.error(data.data.message);
              return false;
            }
            if (data.data.status !== "FAIL") {
              //this.$message.success("Successfully Name and description Changed");
              this.$success({
                title: "Success!",
                content: "Team Data Updated Successfully",
                center: true,
              });
              this.edit_button_flag = false;
              setTimeout(() => this.$router.go(), 1200);
            }
          })
          .catch((error) => {
            console.log(error);
            console.log(error.response);
            console.log(error.response.data.message);
            this.$message.error(error.response.data.message);

            this.$message.error("Something went Wrong");
            return false;
          });
    },
    async handleOkTNC(bundle) {
      await ApiService.post(`v1/team-update/${this.teamData.id}`, {
        name: bundle.teamName,
      })
          .then((data) => {
            console.log(data);
            if (data.data.status == "FAIL") {
              this.$message.error(data.data.message);
              return false;
            }
            if (data.data.status !== "FAIL") {
              this.$message.success("Successfully Name Changed");
              this.$emit("teamListUpdated");
            }
          })
          .catch((error) => {
            console.log(error);
            console.log(error.response);
            console.log(error.response.data.message);
            this.$message.error(error.response.data.message);

            this.$message.error("Something went Wrong");
            return false;
          });
    },
    sortOwnerFirst(team) {
      let _team = [];
      team.forEach((_t) => {
        if (_t.role == "Owner+Admin") {
          _team.unshift(_t);
        } else {
          _team.push(_t);
        }
      });
      console.log(team)
      return _team;
    },
    changeRole() {
      console.log(this.changeRoleEnabled);
      this.changeRoleEnabled = !this.changeRoleEnabled;
    },
    async onRoleChange(e, user_id) {
      // console.log(e.target.value, user_id);
      let _payload = {
        team_id: this.teamData.team_id,
        user_id: user_id,
        access_type: e.target.value,
      };
      console.log(_payload);
      await ApiService.post("v1/change-team-member-access", {
        team_id: this.teamData.team_id,
        user_id: user_id,
        access_type: e.target.value,
      })
          .then((data) => {
            console.log(data);
            if (data.data.status == "FAIL") {
              this.$message.error(data.data.message);
              return false;
            }
            if (data.data.status !== "FAIL") {
              this.$message.success("Successfully Role Changed");
              this.$emit("teamListUpdated");
            }
          })
          .catch((error) => {
            console.log(error);
            console.log(error.response);
            console.log(error.response.data.message);
            this.$error({
              title: "Error!",
              content: error.response.data.message,
            });
            //this.$message.error(error.response.data.message);

            //this.$message.error("Something went Wrong");
            return false;
          });
    },
    async handleOkLT(payload) {
      console.log("Handle LT Got Triggered");
      console.log(payload);
      if (payload.member_id == undefined) {
        // as a member user
        let _payload = {
          team_id: this.teamData.id,
          user_id: this.$store.getters.userInfo.id,
        };
        await ApiService.post("v1/leave-team", {
          team_id: this.teamData.id,
          user_id: this.$store.getters.userInfo.id,
        })
            .then((data) => {
              if (data.data.status == "FAIL") {
                //this.$message.error(data.data.message);
                this.$error({
                  title: "Error",
                  content: data.data.message,
                });
                return false;
              }
              if (data.data.status !== "FAIL") {
                //this.$message.success("Successfully Left Team");
                this.$success({
                  title: "Success!",
                  content: "Successfully left team",
                });
                this.$emit("teamListUpdated");
                return true;
              }
            })
            .catch((error) => {
              console.log(error);
              console.log(error.response);
              this.$message.error("Something went Wrong");
              return false;
            });
      } else {
        // admin user
        let _payload = {
          team_id: this.teamData.id,
          user_id: this.$store.getters.userInfo.id,
          new_owner: payload.member_id,
        };
        console.log(_payload);
        await ApiService.post("v1/leave-team", {
          team_id: this.teamData.id,
          user_id: this.$store.getters.userInfo.id,
          new_owner: payload.member_id,
        })
            .then((data) => {
              if (data.data.status == "FAIL") {
                this.$message.error(data.data.message);
                return false;
              }
              if (data.data.status !== "FAIL") {
                this.$message.success("Successfully Left Team");
                this.$emit("teamListUpdated");
                return true;
              }
            })
            .catch((error) => {
              console.log(error);
              console.log(error.response);
              this.$message.error("Something went Wrong");
              return false;
            });
      }

      // After all thing is done, dont forget to hide modal
      this.showModalLT = false;
    },
    leaveTeam() {
      this.showModalLT = true;
    },
    async handleOkPreference(payload) {
      console.log("Preference Ok got a hit");
      console.log(payload);
      //* we are droping visibility for now
      delete payload.team_visiblity;
      await ApiService.post(`v1/team-update/${this.teamData.id}`, payload)
          .then((data) => {
            console.log(data);
            console.log(data.data.data.password);

            if (data.data.status != "FAIL" && data.data.status_code == 200) {
              if (data.data.data.password !== this.teamData.password) {
                this.$message.success("Team Password Updated");
                this.showModalPreference = false;
                this.$emit("teamListUpdated");
              } else {
                this.$message.error("Something went wrong");
                this.$message.error(
                    "You enter a wrong password for Present Password"
                );
                this.showModalPreference = false;
              }
            } else {
              this.$message.error("Something went wrong");
              this.showModalPreference = false;
            }
          })
          .catch((error) => {
            console.log(error);
            console.log(error.response);
            this.$message.error("Something went wrong");
            this.showModalPreference = false;
          });
      //After fail and success we need to reun This
      // this.showModalPreference = false;
      // this.$emit('teamListUpdated');
    },
    preferencesModal() {
      if (this.isOwnerAdmin == false) {
        //* show modal that user is not has privilage to edit this team
        this.$error({
          content: "You are not eligible to edit preferences",
        });
        return false;
      }
      this.showModalPreference = true;
    },
    firstLetter(name) {
      // console.log('ROLE');
      // console.log(name);
      if (name == "Owner+Admin" || name == "Member+Admin" || name == "Admin") {
        return "A";
      } else {
        return "M";
      }
    },
    async deleteTeamMember(id, full_name) {
      let self = this;
      this.modal = this.$confirm({
        title: "Delete Confirmation",
        content: `Are you sure you want to remove ${full_name} from ${this.teamData.name} team?`,
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        confirmLoading: true,
        async onOk() {
          await ApiService.delete("v1/team-members-delete", {
            team_id: self.teamData.team_id,
            delete_user_id: id,
          })
              .then((data) => {
                console.log(data);
                if (data.data.status != "FAIL") {
                  self.$message.success(
                      full_name + " removed from " + self.teamData.name + " "
                  );
                  self.$emit("teamListUpdated");
                } else {
                  self.$message.error("Something went wrong");
                  self.$emit("teamListUpdated");
                }
              })
              .catch((error) => {
                console.log(error);
                console.log(error.response);
                self.$message.error("Something went wrong");
              });
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    },
    async checkCurrentUser() {
      await this.$store.dispatch("getUser");
      let userData = this.$store.getters.userInfo;
      // console.log(userData);
      console.log(userData.id);
      this.teamData.team_members.map((_member) => {
        if (_member.user_id == userData.id) {
          if (_member.role == "Owner+Admin") {
            this.isOwnerAdmin = true;
          } else {
            this.isOwnerAdmin = false;
          }
        }
      });
    },
    async handleOkDeletion(bundle) {
      console.log("Coming here");
      let {
        passwordTeam: password,
        deletionReasonDetail,
        deletionReasonType,
      } = bundle;
      if (password.length == 0) {
        this.$message.error("Please Enter Password");
        return;
      }
      if (deletionReasonDetail.length == 0 && deletionReasonType.length == 0) {
        this.$message.error("Please Enter Deletion Reason and Type Properly");
        return;
      }
      if (!this.isOwnerAdmin) {
        this.$message.error("You don't have rights to delete this team");
        return;
      }
      await ApiService.delete("v1/delete-team", {
        team_id: this.teamData.team_id,
        team_password: password,
        notify_members: false,
      })
          .then(async (data) => {
            console.log(data);

            if (data.data.status != "FAIL" && data.data.status_code == 200) {
              this.$message.success("Team Deleted Succesfully");

              await ApiService.post("v1/delete-reason-submit", {
                team_id: this.teamData.team_id,
                reason_type: deletionReasonType,
                reason_text: deletionReasonDetail,
              })
                  .then((data) => console.log(data))
                  .catch((error) => console.log(error));

              this.showModalDeletion = false;
              this.$emit("teamListUpdated");
            } else {
              this.$message.error("Something went wrong");

              this.showModalDeletion = false;
            }
          })
          .catch((error) => {
            console.log(error);
            console.log(error.response);
            this.$message.error("Something went wrong");

            this.showModalDeletion = false;
          });
    },
    deleteTeam() {
      if (!this.isOwnerAdmin) {
        //this.$message.error("You don't have rights to delete this team");
        this.$error({
          title: "Error",
          content: "You don't have rights to delete this team!",
        });
        return;
      } else {
        this.showModalDeletion = true;
      }
    },
    checkTurnedOnSwitch() {
      let _team_id = JwtService.getTeamIDAppWide();
      // console.log("did not got")

      if (_team_id == this.teamData.team_id) {
        this.turnOn = true;
      } else {
        this.turnOn = false;
      }
    },
    subTextReducer() {
      if (this.teamData.subscription_expire_at == null) {
        this.subText = "Subscription";
        return;
      }
      if (!this.checkExpiry(this.teamData.subscription_expire_at)) {
        this.subText = "Renew Subscription";
        return;
      }
      this.subTextShow = false;
    },
    addMemberClick() {
      this.memberInvitation = true;
      this.createInvitaionLink();
      if (this.teamData.member_count === 5) {
        this.$warning({
          title: "Warning",
          content: "Cant invite, team already have 5 members",
        });
        return;
      }
      if (this.addMemberCount === 5) {
        this.$message.error("Can't create more invitaion");
        return;
      }
      this.addMemberCount++;
    },
    accountTypeReducer(accType) {
      console.log(accType);
      if (accType == "Representative") {
        return "Rep.";
      }
      if (accType == "Candidate") {
        return "Cand.";
      }
      if (accType == "Matchmaker") {
        return "Match.";
      }
    },
    editTeam() {
      //Toggle the Edit Button
      this.edit_button_flag = !this.edit_button_flag;

      // No conditions required for editing the team's description and adding member

      // if (this.edit_button_flag) {
      // 	this.edit_button_flag = !this.edit_button_flag;
      // 	return;
      // }
      // try {
      // 	await ApiService.post("v1/team-edit-check", {
      // 		team_id: this.teamData.team_id,
      // 	})
      // 		.then((data) => {
      // 			console.log(data);
      // 			if (data.data.status == "FAIL") {
      // 				//this.$message.error(data.data.message);
      // 				this.$error({
      // 					// title: 'This is an error message',
      // 					content: data.data.message,
      // 					centered: true,
      // 				});
      // 				return false;
      // 			}
      // 			if (data.data.status !== "FAIL") {
      // 				this.$message.success("Edit Enabled");
      // 				this.edit_button_flag = true;
      // 				return true;
      // 			}
      // 		})
      // 		.catch((error) => {
      // 			console.log(error);
      // 			console.log(error.response);
      // 			//this.$message.error(error.response.data.message);
      // 			this.$error({
      // 				title: "Team Edit Failed",
      // 				content: error.response.data.message,
      // 				centered: true,
      // 			});
      // 			//this.$message.error("Something went Wrong");
      // 			return false;
      // 		});
      // } catch (e) {
      // 	console.log(e);
      // 	this.$message.error("Something went Wrong");
      // }
    },
    entityNumberReducer() {
      this.teamData.team_members.map((_member) => {
        if (_member.role == "Owner+Admin" || _member.role == "Member Admin") {
          this.adminNumber++;
        } else {
          this.memberNumber++;
        }
      });
    },
    async turnOnTeam() {
      //validation for member
      if (this.teamData.team_members.length < 2) {
        // this.$message.error('This team do not contain sufficient users');
        this.$error({
          // title: 'This is an error message',
          content: "This team do not contain sufficient users",
          centered: true,
        });
        return false;
      }

      // if there's atleast one candidate
      let candidateFlag = 0;
      this.teamData.team_members.map((_member) => {
        if (_member.user_type == "Candidate") {
          candidateFlag++;
        }
      });

      if (candidateFlag == 0) {
        this.$error({
          // title: 'This is an error message',
          content: "This team do not contain any candidate",
          centered: true,
        });
        return false;
      }

      if (this.is_subscribed) {
        // for testing i am assuming we are subscribed
        // if (true) {
        try {
          await ApiService.post("v1/team-turn-on", {
            team_id: this.teamData.team_id,
          })
              .then((data) => {
                // console.log(data);
                if (data.data.status == "FAIL") {
                  this.$message.error(data.data.message);
                  return false;
                }
                if (data.data.status !== "FAIL") {
                  JwtService.saveTeamIDAppWide(this.teamData.team_id);
                  JwtService.saveTeamID(this.teamData.id);
                  const vm = this;
                  this.$success({
                    title: "Success",
                    content: "Selected Team Activated",
                    onOk() {
                      // vm.memberInvitation = false;
                      vm.$emit("teamListUpdated");
                      setTimeout(() => vm.$router.go(), 100);
                    },
                  });

                  //this.$message.success("Selected Team Activated");

                  //this.$emit("teamListUpdated");
                  //this.$router.go();
                  return true;
                }
              })
              .catch((error) => {
                console.log(error);
                console.log(error.response);
                this.$message.error("Something went Wrong");
                return false;
              });
        } catch (error) {
          console.log(error);
        }
      } else {
        // this.$message.error('Your Subscription is Over');
        // this.$message.error('Please Buy Subscription');
        this.$error({
          title: "Subscription Needed",
          content: "Please buy subscription to Activate the team",
        });
        return false;
      }
      return true;
    },
    checkExpiry(dateString) {
      var myDate = new Date(dateString);
      var today = new Date();
      if (myDate > today) {
        return true;
      }
      return false;
    },
    generateInvitation(index) {
      this.createInvitaionLink(index);
      // inserting link into payload
      // this.invitationObject.invitation_link = this.invitationLink;
      // let payload = new FormData();
      // creating formdata before sending thm to dob
      // payload.append('team_id', JwtService.getTeamID());
      // payload.append('members', JSON.stringify([{ ...this.invitationObject }]));

      let payload = {
        team_id: this.teamData.team_id,
        members: [
          {
            role: this.role[index],
            add_as_a: this.add_as_a[index],
            relationship: this.relationship[index],
            invitation_link: this.invitation_link[index],
          },
        ],
      };

      console.log(payload);

      this.$store
          .dispatch("createTeamInvite", payload)
          .then((data) => {
            console.log(data);
            if (data.data.status_code == 200 || data.data.status != "FAIL") {
              // console.log(data.data);
              this.invitation_link_show = this.invitation_link;
              console.log(this.invitation_link_show);
              this.$forceUpdate();
              this.$message.success("Invitation Created");
            } else {
              this.$message.error("Something went wrong, Please try again");
              this.invitation_link[index] = "";
            }
          })
          .catch((err) => {
            // console.log(err);
            this.$message.error("Something went wrong, Please try again");
            this.invitation_link[index] = "";
          });
    },
    createInvitaionLink() {
      // amaizingly, for some reason i need to refer this to
      // a other variable so my iffe function can access this
      var self = this;
      (function createShotLink() {
        // this is the method i am using to create a short link
        function makeid(length) {
          var result = [];
          var characters =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          var charactersLength = characters.length;
          for (var i = 0; i < length; i++) {
            result.push(
                characters.charAt(Math.floor(Math.random() * charactersLength))
            );
          }
          return result.join("");
        }
        self.invitationObject.invitation_link = makeid(10);
      })();
    },
    accountTypeToName(number) {
      if (number == 1) {
        return "Candidate";
      } else if (number == 2) {
        return "Representative";
      } else if (number == 3) {
        return "Matchmaker";
      } else {
        return "Something went wrong";
      }
    },
    nameInitials(name) {
      let rgx = new RegExp(/(\p{L}{1})\p{L}+/, "gu");

      let initials = [...name.matchAll(rgx)] || [];

      initials = (
          (initials.shift()?.[1] || "") + (initials.pop()?.[1] || "")
      ).toUpperCase();

      return initials;
    },
    formateDate(date) {
      if (date == null || date == undefined) {
        return "  Not Exist";
      }
      let d = new Date(date),
          month = "" + (d.getMonth() + 1),
          day = "" + d.getDate(),
          year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },
    async onChangeActivateTeam(checked) {
      if (checked) {
        let returnedResult = await this.turnOnTeam();
        console.log(returnedResult);
        console.log(this.teamData);
        //JwtService.saveTeamIDAppWide(this.teamData.team_id);
        this.$store.commit("setTeamInfo", this.teamData);
        if (returnedResult) {
          this.turnOn = true;
        } else {
          this.turnOn = false;
        }
      } else {
        console.log("System Wide Team ID Deleted");
        this.$store.commit("setTeamInfo", null);
        JwtService.destroyTeamIDAppWide();
      }
    },
    startConversation() {},
    checkChatCategory(categoryId) {
      console.log("inside");
      console.log(this.conversations.length);
      console.log(this.conversations);
      for (var i = 0; i < this.conversations.length; i++) {
        console.log("category given:", categoryId);
        console.log("category item:", this.conversations[i].category_id);
        if (this.conversations[i].category_id == categoryId) {
          console.log(this.conversations[i].id);
          return this.conversations[i].id;
        }
      }
      return false;
    },
  },
};
</script>

<style scoped lang="scss">
// Css for spacer in team member list-item
.spacer {
  font-size: 8px;
  color: transparent;
}
// css for red button on top right
.red-hover {
  color: red !important;
}
.red-hover:hover {
  background-color: blue !important;
}
//css for custom invitation links
.input-custom-invitation-link {
  width: 30%;
  border-radius: 5px;
}
// start css for team-card
.team-card {
  position: relative;
  min-height: 500px;
  width: 100%;
  padding: 10px 8px;
  border-radius: 10px;
  background-color: #ffffff;
  margin-top: 20px;
  box-shadow: 0px 0px 10px 1px rgba(63, 6, 17, 0.3);

  .team-card-header {
    background-color: #ffffff;
    display: flex;
    padding: 0;
    margin-bottom: 20px;
    align-items: center;
    justify-content: space-between;
    .left {
      .status {
        border: 2px solid #999999;
        padding: 2px 5px;
        border-radius: 20px;
        border: 2px solid #6b64ae;
        background-color: #ffffff;
        color: #6158a9;
        font-size: 12px;
        .red {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #e91e78;
          margin-left: 5px;
        }
        .green {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #39b54a;
          margin-left: 5px;
        }
        // &.active {
        // 	border: 2px solid #6b64ae;
        // 	background-color: #ffffff;
        // 	color: #6158a9;
        // }
      }
    }
    .middle {
      button {
        opacity: 1;
        padding-right: 5px;
        img {
          width: 25px;
        }
      }
      .logo {
        .img-logo {
          border-radius: 50%;
          width: 55px !important;
          height: 50px !important;
          margin-left: 5px;
          margin-top: 5px;
        }
      }
    }
    .right {
      display: flex;
      align-items: center;
      .ant-switch {
        background-color: #ea4c91;
        .ant-switch-loading-icon,
        &::after {
          top: 2px;
        }
      }
      .ant-switch-checked {
        background-color: #6159a8;
      }
      .dropleft {
        margin-left: 10px;
        .dropdown-toggle {
          padding: 0;
          &::before {
            border: 0;
            width: 12px;
            height: 20px;
            margin-top: 7px;
            background: url("~@/assets/three-dots.png") no-repeat right center;
          }
        }

        .dropdown-menu {
          margin-top: 7px;
          padding: 10px 15px;
          box-shadow: 0 0 3px 2px #ddd;

          .dropdown-item {
            padding: 3px 0;
            margin-bottom: 2px;
            text-align: center;
            font-size: 12px;
            border-radius: 3px;
            color: #3a3092;
            background-color: #e6e6e6;
            &:hover {
              color: #ffffff;
              background-color: #e51f76;
            }
          }
        }
      }
    }
  }
  .card-info {
    display: flex;
    margin-bottom: 10px;
    .img {
      width: 60px;
      padding-right: 20px;
      box-sizing: content-box;
      button {
        border: 0;
        margin: 0;
        padding: 0;
        width: 60px;
        min-width: 12px;
        position: relative;
        background-color: transparent;
        span {
          position: absolute;
          bottom: 0px;
          right: -8px;
        }
      }
    }
    .img-logo {
      border-radius: 50%;
      width: 55px;
      height: 50px;
      margin-left: 5px;
      margin-top: 5px;
    }
    .info-content {
      .member-name,
      .member-desc {
        display: flex;
        padding-bottom: 5px;
        p {
          margin: 0;
          color: #444;
        }
        button {
          border: 0;
          background-color: transparent;
          padding: 0;
          min-width: 12px;
        }
      }
      .member-desc {
        p {
          font-size: 12px;
        }
      }
    }
  }
  .member-area {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 10px;
    .members {
      border: 2px solid #908bc2;
      width: 47%;
      border-radius: 5px;
      min-height: 30px;
      padding: 0 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;

      &:first-of-type {
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
        margin-right: 15px;
      }
      &:last-of-type {
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
        margin-right: 0;
      }
      p {
        display: flex;
        margin: 0;
        font-size: 12px;
        align-items: center;
        span {
          width: 16px;
          height: 16px;
          color: #ffffff;
          border-radius: 50%;
          background-color: #e51f76;
          display: flex;
          align-items: center;
          justify-content: center;
          float: left;
          margin-right: 5px;
        }
      }
    }
  }
  .member-action {
    .add-remove {
      display: flex;
      justify-content: space-between;
      padding: 0;
      margin-bottom: 10px;
      .add-member,
      .remove-member {
        display: flex;
        color: #6159a8;
        img {
          width: 20px;
          margin-right: 10px;
        }
      }
      .remove-member {
        color: #e51f76;
      }
    }
    .admin-member,
    .only-member {
      padding: 4px;
      border-radius: 15px;
      font-size: 12px;
      color: #ffffff;
      td {
        background-color: #3a3092;
      }
      td:first-of-type {
        padding-left: 5px;
        border-top-left-radius: 12px;
        border-bottom-left-radius: 12px;
      }
      td:last-of-type {
        padding-right: 5px;
        border-top-right-radius: 12px;
        border-bottom-right-radius: 12px;
      }
      td {
        padding-top: 2px;
        padding-bottom: 2px;
      }
      .name-short,
      .name-full,
      .title,
      .status,
      .relation,
      .remove {
        background-color: #3a3092;
        margin-right: 10px;
      }
      .name-short {
        background-color: #ffffff;
        color: #6159a8;
        width: 30px;
        border-top-left-radius: 12px;
        border-bottom-left-radius: 12px;
        padding: 0 5px;
        font-size: 12px;
        font-weight: bold;
      }
      .title {
        background-color: #ffffff;
        color: #777777;
        padding: 0 5px;
        border-radius: 10px;
      }
      .status {
        width: 20px;
      }
      .remove {
        width: 15px;
        margin-right: 0;
      }
    }

    .only-member {
      background-color: #ffffff;
      color: #777777;
      td {
        background-color: #ffffff;
      }
      .name-short,
      .name-full,
      .title,
      .status,
      .relation,
      .remove {
        background-color: #ffffff;
      }
      .name-short {
        background-color: #3a3092;
        color: #ffffff;
      }
      .title {
        background-color: #808080;
        color: #ffffff;
      }
      .remove {
        padding: 0;
      }
    }

    .select-member {
      display: flex;
      margin-top: 15px;
      margin-bottom: 15px;
      justify-content: space-between;
      // background: url("~@/assets/select-arrow.png") no-repeat center center;
      .custom-select {
        font-size: 12px;
        width: auto;
        padding-left: 2px;
        padding-right: 12px;
        padding-top: 0;
        padding-bottom: 0;
        height: 24px;
        background: #e6e6e6 url("~@/assets/select-arrow.png") no-repeat;
        background-position: right 2px center;
      }
      button {
        padding: 0;
        img {
          width: 20px;
        }
      }
    }
  }
  .team-card-footer {
    position: absolute;
    bottom: 15px;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .left {
      margin-bottom: 0px;
      p {
        margin: 0;
        font-size: 12px;
      }
    }
    .right {
      margin-left: 20px;
      a {
        font-size: 12px;
        color: #e51f76;
        text-decoration: underline;
        img {
          width: 20px;
          margin-right: 5px;
        }
      }
    }
  }
  .team-invitations {
    // position: absolute;
    // text-align: center;
    // left: 20%;
    // right: 20%;
    // bottom: 15px;
    margin-top: 0px;
    text-align: right;
    .shared-link {
      cursor: pointer;
    }
  }
}
// end css for team-card
</style>
