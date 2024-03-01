<template>
	<div class="row justify-content-md-center">
		<a-card class="card-container">
			<a-row>
				<a-col :span="24">
					<a-col :span="24"
						><img
							class="group-logo"
							src="@/assets/Icons/Join a team or Create a team.svg"
							alt=""
					/></a-col>
					<a-col :span="24"
						><span class="card-title">Create a team</span></a-col
					>
				</a-col>
				<a-row>
					<span class="fs-22">Add a team image</span>
				</a-row>
			</a-row>
			<a-row>
				<a-divider />
			</a-row>

			<a-row>
				<div class="clearfix">
					<!-- <a-upload
						:file-list="$store.state.team.team_logo"
						:remove="handleRemove"
						:before-upload="beforeUpload"
					>
						<a-button> <a-icon type="upload" /> Select File </a-button>
					</a-upload> -->
					<!-- <input
						type="file"
						class="input-image"
						name="avatar"
						@change="getAvatar"
					/> -->
					<div class="d-flex">
						<div class="browse-btn">
							<span class="file-input btn btn-file">
								Browse
								<input
									type="file"
									accept="image/*"
									class="input-image"
									name="avatar"
									@change="getAvatar"
								/>
							</span>
						</div>
						<div class="float-right">
							<img
								:src="avatarSrc"
								width="100"
								height="100"
								v-if="avatarSrc"
								alt=""
								class="team-img"
							/>
							<img
								src="@/assets/Icons/placeholder_image.jpg"
								width="100"
								height="100"
								v-if="!avatarSrc"
								alt=""
								class="team-img"
							/>
						</div>
					</div>
				</div>
			</a-row>
			<a-row>
				<a-button
					class="next-button"
					:disabled="avatar.length === 0"
					:loading="uploading"
					style="margin-top: 16px"
					@click="handleUpload"
				>
					{{ uploading ? "Saving" : "Save and continue" }}
				</a-button>
				<!-- <a-button class="next-button" >Save and Continue</a-button> -->
			</a-row>
		</a-card>
	</div>
</template>

<script>
// import axios from "axios";
import ApiService from "../../services/api.service";
export default {
	data() {
		return {
			fileList: [],
			uploading: false,
			avatar: "",
			avatarSrc: "",
		};
	},
	methods: {
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
		handleRemove(file) {
			// const index = this.fileList.indexOf(file);
			// const newFileList = this.fileList.slice();
			// newFileList.splice(index, 1);
			// this.fileList = newFileList;
			const index = this.$store.state.team.team_logo.indexOf(file);
			const newFileList = this.$store.state.team.team_logo.slice();
			newFileList.splice(index, 1);
			this.$store.state.team.team_logo = newFileList;
		},
		beforeUpload(file) {
			this.$store.state.team.team_logo = [file];
			return false;
		},
		async handleUpload() {
			this.uploading = true;
			// console.log(this.$store.state.team);

			let bodyFormData = new FormData();
			bodyFormData.append("name", this.$store.state.team.team_name);
			bodyFormData.append(
				"description",
				this.$store.state.team.team_description
			);
			bodyFormData.append("password", this.$store.state.team.team_password);
			//bodyFormData.append("logo", this.$store.state.team.team_logo[0]);
			bodyFormData.append("logo", this.avatar);

			// console.log(bodyFormData);
			// let token = JSON.parse(localStorage.getItem("token"));
			// console.log(token);
			let self = this;

			const response = await ApiService.post("v1/team", bodyFormData)
				.then((res) => {
					console.log("success:", res);
					let team_id = res.data.data.team_id;
					self.$store.commit("setNewTeamInfo", res.data.data);
					console.log("team id", team_id);
					self.uploading = false;
					self.$store.dispatch("setTeamId", team_id);
					self.$store.dispatch("setCreateTeamStep", 4);
					self.$router.push("/create-team-4");
				})
				.catch((error) => {
					self.uploading = false;
					console.log(error);
				});
			console.log("response", response);

			// axios({
			//   method: "post",
			//   url: "v1/team",
			//   data: bodyFormData,
			//   headers: { "Content-Type": "multipart/form-data", "Authorization": `Bearer ${token}` },
			// })
			//   .then(function (response) {
			//     //handle success
			//     if(response.data.status_code == 200){
			//       self.uploading = false;
			//       let team_id = response.data.data.team_id;
			//       // console.log(team_id);
			//       self.$store.dispatch("setTeamId", team_id);
			//       self.$store.dispatch("setCreateTeamStep", 4);
			//       self.$router.push("/create-team-4");
			//       // console.log(self.$store.state.team);
			//     }
			//     else{
			//       self.uploading = false;
			//       // console.log("api error");
			//       // console.log(response.data.data);
			//       let msgs = [];
			//       for (var key in response.data.data) {
			//           console.log(response.data.data[key]);
			//           let msg = response.data.data[key].join("\n");
			//           msgs.push(msg);
			//       }
			//       let validation_msgs = msgs.join("\n");
			//       alert(validation_msgs);
			//     }
			//   })
			//   .catch(function (response) {
			//     //handle error
			//     console.log(response.data);
			//   });
		},
	},
};
</script>

<style scoped>
.card-container {
	margin-top: 20px;
	padding: 15px;
	border-radius: 5px;
	box-shadow: 0 0 5px 3px #d3d3d3 !important;
	text-align: center;
}
.group-logo {
	width: 80px;
	margin-bottom: 10px;
}
.card-title {
	color: #6158a7;
	font-weight: 400;
	font-size: 2.25rem;
}
.team-description {
	margin-top: 10px;
}
.team-img {
	border-radius: 50%;
	border: 2px solid #bbb;
	float: right;
	margin-left: 130px;
}
.browse-btn {
	justify-content: center;
	align-items: center;
	text-align: center;
	margin-top: 40px;
}
.team-name-input {
	height: 50px;
	margin-top: 10px;
	border: 1px solid #6158a7 !important;
	border-color: #6158a7 !important;
	border-radius: 25px !important;
}
.next-button {
	margin-top: 30px !important;
	float: right;
	background-color: #6158a7;
	color: white;
	border: 1px solid #6158a7 !important;
	border-color: #6158a7 !important;
	border-radius: 25px !important;
	width: 150px;
	height: 30px;
}
.btn-file {
	position: relative;
	overflow: hidden;
	background-color: #bbb;
	color: #555;
	border-radius: 20px;
	padding: 0px 25px;
}
.btn-file input[type="file"] {
	position: absolute;
	top: 0;
	right: 0;
	min-width: 100%;
	min-height: 100%;
	font-size: 100px;
	text-align: right;
	filter: alpha(opacity=0);
	opacity: 0;
	background: red;
	cursor: inherit;
	display: block;
}
.file-input-label {
	padding: 0px 10px;
	display: table-cell;
	vertical-align: middle;
	border: 1px solid #ddd;
	border-radius: 4px;
}

/* tile uploaded pictures */
.upload-list-inline >>> .ant-upload-list-item {
	float: left;
	width: 200px;
	margin-right: 8px;
}
.upload-list-inline >>> .ant-upload-animate-enter {
	animation-name: uploadAnimateInlineIn;
}
.upload-list-inline >>> .ant-upload-animate-leave {
	animation-name: uploadAnimateInlineOut;
}
</style>
