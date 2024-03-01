<template>
	<div>
		<!-- <a-button type="primary" @click="showModal">
      Open Modal with async logic
    </a-button> -->
		<!-- <a-modal
      title="Title"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <p>{{ ModalText }}</p>
    </a-modal> -->

		<a-modal
			destroyOnClose
			:visible="showModalProp"
			:confirm-loading="confirmLoading"
			@ok="handleOk"
			@cancel="handleCancel"
			wrapClassName="custom-modal"
		>
			<div v-if="phase == 1">
				<div class="text-center" style="padding-bottom: 15px">
					<span style="font-size: 26px; font-weight: bold">
						Are you sure?
					</span>
				</div>

				<div class="text-center" style="padding-bottom: 15px">
					<span style="font-size: 16px"
						>Attention! You are going to completely leave this team.</span
					>
				</div>

				<div class="text-center" style="padding-bottom: 15px">
					<span style="font-size: 16px"
						>All your message & team list profiles are exist also stored with
						this team as your activity history.</span
					>
				</div>

				<div class="d-flex justify-content-center p-2">
					<div class="d-flex">
						<div style="margin-right: 20px">
							<a-button type="primary" shape="round" style="width: 80px" @click="phase = 2">
								Yes
							</a-button>
						</div>

						<div style="margin-left: 20px">
							<a-button type="danger" shape="round" style="width: 80px" @click="handleCancel">
								No
							</a-button>
						</div>
					</div>
				</div>
			</div>

			<!-- Second Screen starts from here -->

			<div v-if="phase == 2">
				<div class="text-center" style="padding-bottom: 15px">
					<span style="font-size: 26px; font-weight: bold">
						Type your team pin
					</span>
				</div>

				<div>
					<div class="justify-content-center">
						<div class="d-flex justify-content-center">
							<div style="width: 250px; margin-top: 20px; margin-bottom: 20px">
								<a-input-password placeholder="Type your team pin" v-model="password" />
							</div>
						</div>
					</div>
				</div>

				<div class="d-flex justify-content-center p-2">
					<div class="d-flex">
						<div style="margin-right: 20px">
							<a-button type="primary" shape="round" style="width: 80px" @click="handleOk">
								Next
							</a-button>
						</div>
					</div>
				</div>
			</div>

			<!-- Phase 3 starts here, and if he is a admin than one ui
			and if not a admin then just a message that he has left. -->

			<div v-if="phase == 3">
				<div class="text-center" style="padding-bottom: 15px">
					<span style="font-size: 26px; font-weight: bold">
						Change Ownership
					</span>
				</div>

				<div class="text-center" style="padding-bottom: 15px">
					<span style="font-size: 16px"
						>In order to leave this team, you need to set someone Owner+Admin
						role.</span
					>
				</div>

				<div class="text-center">
					<a-select
						default-value="Select a Member"
						style="width: 250px"
						@change="handleChange"
						class="select-member"
					>
						<a-select-option disabled value="Select a Member">
							Select A Member
						</a-select-option>

						<template v-for="(member, index) in teamData.team_members">
							<a-select-option
								:value="member.user_id"
								v-bind:key="index"
								v-if="ownerAdminID != member.user_id"
							>
								{{ member.user.full_name }}
							</a-select-option>
						</template>
					</a-select>
				</div>
			</div>

			<template v-slot:footer>
				<a-button
					key="back"
					type="danger"
					shape="round"
					@click="handleCancel"
					v-if="phase == 3"
				>
					Cancel
				</a-button>
				<a-button
					key="submit"
					type="primary"
					shape="round"
					@click="handleOk"
					v-if="phase == 3"
				>
					Confirm
				</a-button>
			</template>
		</a-modal>
	</div>
</template>

<script>
export default {
	name: "LTModal",
	props: ["showModalProp", "teamData", "isOwnerAdmin", "ownerAdminID"],
	data() {
		return {
			ModalText: "Content of the modal",
			visible: false,
			confirmLoading: false,

			phase: 1,
			password: "",
			member_id: null,
		};
	},
	methods: {
		handleChange(value) {
			console.log(value);
			this.member_id = value;
		},
		handleOk(e) {
			console.log(this.isOwnerAdmin);
			console.log("Clicked Ok");
			if(isNaN(this.password) || this.password.length > 4) {
				this.$error({
					title: "Error!",
					content: "Pin must be 4 characters long and can only contain digits.",
				});
				return;
			}
			if (this.password.length == 0) {
				this.$error({
					title: "Error!",
					content: "Please enter a pin to procceed",
				});
				//this.$message.error("Please enter a password to procceed");
				return;
			}
			if (this.password == this.teamData.password) {
				if (this.isOwnerAdmin && this.phase == 3) {
					// is owner admin and phase 3
					this.$emit("handleOk", {
						password: this.password,
						member_id: this.member_id,
					});
					this.handleCancel();
				} else if (this.isOwnerAdmin && this.phase == 2) {
					//if owner admin
					//console.log(this.isOwnerAdmin);
					this.phase++;
				} else if (!this.isOwnerAdmin && this.phase == 2) {
					//if not a owner admin
					this.$emit("handleOk", {
						password: this.password,
					});
					this.handleCancel();
				}
			} else {
				//this.$message.error("You have entered an wrong password")
				this.$error({
					title: "Error!",
					content: "You have entered a wrong pin",
				});
			}
		},
		async handleCancel(e) {
			setTimeout(() => {
				this.phase = 1;
				this.password = "";
			}, 2000);

			console.log("Clicked cancel button");
			this.$emit("handleCancel");
		},
	},
};
</script>
<style lang="scss">
.custom-modal {
	.ant-modal-footer {
		border-top: 0px;
	}
	.select-member {
		margin: 0px auto;
	}
}
</style>
