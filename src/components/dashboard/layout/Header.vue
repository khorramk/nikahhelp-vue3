<template>
  <nav class="d-navbar navbar navbar-expand-sm navbar-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="/dashboard"
        ><img src="@/assets/logo.png" alt="logo"
      /></a>
      <!-- <button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarNavDropdown"
				aria-controls="navbarNavDropdown"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button> -->
      <slot name="toggler"></slot>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav ml-auto my-2 my-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/dashboard"
              ><img src="@/assets/icon/house-door-fill-white.svg" alt="img"
            /></a>
          </li>

          <!-- Manage Team -->
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/manageteam"
              ><img src="@/assets/icon/group-fill-white.svg" alt="img"
            /></a>
          </li>

          <!-- Shortlist  -->
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/shortlist"
              ><img src="@/assets/icon/star-fill-white.svg" alt="img"
            /></a>
          </li>
          <!-- Notification -->
          <li class="nav-item">
            <div class="dropdownNotificationBar">
              <a
                class="nav-link active"
                aria-current="page"
                a
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                ><img
                  src="@/assets/icon/bell-fill-white.svg"
                  alt="img"
                  style="border"
                />
              </a>

              <div
                class="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
                id="dropdownNotificationID"
              >
                <div>
                  <div class="dropdownNotify-title">
                    <strong>Notifications</strong>
                  </div>
                </div>
                <div class="dropdown-divider"></div>

                <!-- <div class="dayOfNotification">
									<a
										class="dropdownNotify-item"
										href="#"
										id="menuOfNotification"
										>Recent</a
									>
								</div> -->

                <!-- item 1 -->
                <div
                  v-for="notification in notifications"
                  :key="notification.id"
                >
                  <div
                    v-if="compareDate(notification.create_date)"
                    class="dropdownNotify-itemList"
                  >
                    <div class="profileImage">
                      <img
                        src="@/assets/r-join.png"
                        alt="dp"
                        style="width: 50px"
                      />
                    </div>

                    <div class="dropdownNotify-item" style="overflow: hidden">
                      <a href="#" class="dropdownNotify-item"
                        >{{ notification.data }}<br
                      /></a>
                      <!-- <span class="detailsOfNotification"
												>Lorem ipsum dolor sit amet, consectetur adipiscing
												elit. Phasellus imperdiet...</span
											> -->
                    </div>
                    <div class="TimeOfActivity">
                      <span class="notification_time">{{
                        notification.create_date
                      }}</span>
                    </div>
                  </div>
                  <div v-else class="dropdownNotify-itemList old">
                    <div class="profileImage">
                      <img
                        src="@/assets/r-join.png"
                        alt="dp"
                        style="width: 50px"
                      />
                    </div>

                    <div class="dropdownNotify-item" style="overflow: hidden">
                      <a href="#" class="dropdownNotify-item"
                        >{{ notification.data }}<br
                      /></a>
                      <!-- <span class="detailsOfNotification"
												>Lorem ipsum dolor sit amet, consectetur adipiscing
												elit. Phasellus imperdiet...</span
											> -->
                    </div>
                    <div class="TimeOfActivity">
                      <span class="notification_time">{{
                        notification.create_date
                      }}</span>
                    </div>
                  </div>

                  <div class="dropdown-divider"></div>
                </div>

                <!-- <div
									class="dropdown-divider"
									style="padding: 0px 0px 0px 0px"
								></div> -->

                <!-- Show All notification button -->
                <div>
                  <button
                    class="dropdownNotify-showAll"
                    href="#"
                    style="padding-left: 25%"
                    @click="showAllNotifications"
                  >
                    Show All Notifications
                  </button>
                </div>
              </div>
            </div>
          </li>
          <!-- <li class="nav-item">
						<a class="nav-link active" aria-current="page" href="#"
							><img src="@/assets/icon/bell-fill-white.svg" alt="img"
						/></a>
					</li> -->
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#"
              ><img src="@/assets/icon/chat-dots-fill-white.svg" alt="img"
            /></a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link cursor-context-menu" href="#">
              <div class="profile flex-center-center">
                <img
                  class="profile-img"
                  src="@/assets/mike.jpg"
                  alt="profile"
                />
                <div class="profile-info">
                  <div class="name">
                    {{ user.full_name }}
                  </div>

                  <div class="team-role flex-between-center">
                    <select
                      class="form-select custom-form-select"
                      aria-label=".form-select-sm example"
                      @change="changeTeam($event)"
                    >
                      <option
                        v-for="team in teams || []"
                        :value="team.id"
                        :key="team.id"
                      >
                        {{ team.name }}
                      </option>
                    </select>
                    <!-- <span class="role">admin</span> -->
                  </div>
                </div>
              </div>
            </a>
            <!-- <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul> -->
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header",
  components: {},
  data() {
    return {
      teams: null,
      notifications: null,
    };
  },
  props: {
    user: Object,
  },
  created() {
    this.getTeams();
    this.loadNotifications();
    console.log(this.user);
  },
  
  methods: {
    async getTeams() {
      this.loading = true;
      try {
        await this.$store
          .dispatch("getTeams")
          .then((data) => {
            this.teams = data.data.data;
          })
          .catch((error) => {
            console.log(error.response);
          });
      } catch (error) {
        this.error = error.message || "Something went wrong";
        console.log(this.error);
        // this.$router.push("/manageteam");
      }
      this.isLoading = false;
    },
    changeTeam(event) {
      console.log(event.target.value);
      this.$emit("change-team", event.target.value);
    },
    async loadNotifications() {
      this.isLoading = true;
      try {
        const response = this.$store.dispatch("loadNotifications");
        response
          .then((data) => {
            this.notifications = data.data.data;
            console.log(this.notifications);
          })
          .catch((error) => {
            console.log(error);
            //alert(error);
          });
      } catch (error) {
        this.error = error.message || "Something went wrong! Try again!";
        console.log(this.error);
      }
    },
    showAllNotifications() {
      this.$router.push("/notifications");
    },
    compareDate(dateTime) {
      console.log(dateTime);
      var d1 = dateTime.split(" ");
      var temp = d1.slice(0, 3).join("-");
      var d = new Date(temp);
      const today = new Date();
      if (d.getMonth() == today.getMonth() && today.getDate() == d.getDate()) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.d-navbar {
  background: $bg-secondary;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  .navbar-brand {
    img {
      width: 100px;
    }
  }
  .navbar-nav {
    align-items: center;
    .nav-item {
      img {
        width: 26px;
      }
    }
  }

  .profile {
    color: $color-white;
    padding: 0px;
    .profile-img {
      height: 30px;
      width: 30px;
      border-radius: 50%;
      vertical-align: middle;
      overflow: hidden;
    }
    .profile-info {
      padding-left: 5px;
      font-size: 12px;
      .name {
        font-size: 16px;
        font-weight: 600;
      }
      .custom-form-select {
        background-position: right 0.45rem center;
        padding: 0px 2px 0 2px;
        line-height: normal;
        border-radius: 14px;
        font-size: 10px;
        background-color: white;
        color: $color-secondary;
      }
      .role {
        padding: 0 5px;
        border: 1px solid #fff;
        border-radius: 14px;
        margin-left: 5px;
        line-height: normal;
      }
    }
  }
  .dropdownNotify-title {
    font-size: 20px;
    padding-bottom: 8px;
  }
  .dropdown-menu {
    padding: 10px 30px 10px 30px;
    width: 350px !important;
    height: 450px;
    overflow-y: scroll;
    margin-left: 70%;
    margin-top: -10px;
    font-family: Open Sans, sans-serif;
    @media (max-width: 1190px) {
      margin-left: 65%;
    }
    @media (max-width: 1013px) {
      margin-left: 60%;
    }
    @media (max-width: 887px) {
      margin-left: 55%;
    }

    @media (max-width: 791px) {
      margin-left: 50%;
    }

    @media (max-width: 712px) {
      margin-left: 45%;
    }

    @media (max-width: 647px) {
      margin-left: 40%;
    }

    @media (max-width: 591px) {
      margin-left: 35%;
    }
  }
  .detailsOfNotification {
    color: #9c9c9c;
  }

  .profileImage {
    margin-right: 10px;
    margin-top: 7px;
    float: left;
  }

  #recentProfile:before {
    content: "• ";
    font-size: 30px;
    color: #e51f76;
    padding-right: 0px;
    margin: 0px;
    margin-left: -2px;
  }

  #menuOfNotification {
    margin-left: -10px;
    color: #9c9c9c;
  }

  .notification_time {
    align-items: right;
    text-align: right;
    color: #6610f2;
    font-family: Open Sans, sans-serif;
    font-size: 10px;
    padding-left: 50%;
  }

  #dropdownNotificationID {
    box-sizing: border-box;
    border: 1px solid $border-white;
    box-shadow: 2px 2px 2px 2px #999;
  }

  .dropdownNotify-item {
    text-align: left;
    color: black;
    font-size: 13px;
    text-decoration: none;
    overflow: hidden;
  }

  .dropdownNotify-showAll {
    text-align: center;
    align-items: center;
    color: #9c9c9c;
    text-decoration: none;
    font-size: 14px;
  }

  .dropdown-menu .dropdownNotify-itemList {
    align-items: center;
    box-sizing: border-box;
    overflow: hidden;
  }
  .old {
    background-color: #ebebeb;
  }

  .detailsOfNotification {
    font-size: 11px;
  }
}
</style>
