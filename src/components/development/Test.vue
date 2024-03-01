<template>
	<div class="container">
		<div style="margin-bottom: 100px">for space only ignor this section</div>
		<!--plz ignore this div -->

		<div class="row">
			<div class="col-12">
				<div class="blocklist-wrapper">
					<div class="top">
						<div class="blocked-by">
							Blocked by: <span>Selina Pervez Shumi</span>
						</div>
						<div class="date">
							<img src="../../assets/icon/edit.svg" alt="team edit" /><span
								>12/5/2021</span
							>
						</div>
					</div>
					<div class="bottom">
						<div class="user-img">
							<img src="../../assets/candidate.png" alt="candidate image" />
						</div>
						<div class="name-address">
							<p>Justin Webb</p>
							<p class="address">London, UK, 27 yrs, Islam</p>
						</div>
						<div class="team-name">
							<p><em>Team name: </em> Web's Family &#38; friends</p>
						</div>

						<div class="report-button">
							<button
								class="
									btn btn-primary btn-round
									button-danger
									btn-submit
									reported
								"
							>
								<img src="../../assets/icon/edit.svg" alt="report icon" />
								Report
							</button>
						</div>
						<div class="unblock"><button>Unblock</button></div>
					</div>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-12">
				<div class="shortlist-wrapper">
					<div class="top">
						<div class="shortlist-by">
							Blocked by: <span>Selina Pervez Shumi</span>
						</div>
						<div class="date">
							<img src="../../assets/icon/edit.svg" alt="team edit" /><span
								>12/5/2021</span
							>
						</div>
					</div>
					<div class="bottom">
						<div class="user-img">
							<img src="../../assets/candidate.png" alt="candidate image" />
						</div>
						<div class="name-address">
							<p>Justin Webb</p>
							<p class="address">London, UK, 27 yrs, Islam</p>
						</div>
						<div class="team-name">
							<p><em>Team name: </em> Web's Family &#38; friends</p>
						</div>

						<div class="report-button">
							<button
								class="
									btn btn-primary btn-round
									button-danger
									btn-submit
									reported
								"
							>
								<img src="../../assets/icon/edit.svg" alt="report icon" />
								Report
							</button>
						</div>
						<div class="view-more-details"><button>Unblock</button></div>
					</div>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-12">
				<!-- start page top area -->
				<div class="top-area">
					<div class="top-area-inner">
						<div class="top-title">Total</div>
						<ul class="top-info">
							<li>
								<a href="#"><span>1</span></a
								><span>Team</span>
							</li>
							<li>
								<a href="#"><span>2</span></a
								><span>View</span>
							</li>
							<li>
								<a href="#"><span>3</span></a
								><span>Unseen Message</span>
							</li>
						</ul>
					</div>
				</div>
				<!-- start page top area -->
			</div>
		</div>

		<div class="row mt-5">
			<div class="col-lg-6 col-xl-4">
				<!-- start box card component -->
				<div class="team-card">
					<div class="team-card-header">
						<div class="left">
							<div class="status active">
								Team 1
								<span></span>
							</div>
						</div>
						<div class="middle">
							<button class="close">
								<img src="../../assets/icon/edit.svg" alt="team edit" />
							</button>
							<button class="close">
								<img src="../../assets/icon/edit-close.svg" alt="close" />
							</button>
							<button class="close">
								<img src="../../assets/icon/save.svg" alt="save" />
							</button>
							<button class="close">
								<img src="../../assets/icon/delete.svg" alt="delete" />
							</button>
						</div>
						<div class="right">
							<div class="switch-wrapper">
								<div>
									<a-switch default-checked @change="onChange" />
								</div>
							</div>
							<!-- Default dropleft button -->
							<div class="btn-group dropleft">
								<button
									type="button"
									class="dropdown-toggle"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false"
								></button>
								<div class="dropdown-menu">
									<a class="dropdown-item" href="#">Edit</a>
									<a class="dropdown-item" href="#">Close</a>
									<a class="dropdown-item" href="#">Save</a>
									<a class="dropdown-item" href="#">Delete</a>
								</div>
							</div>
						</div>
					</div>
					<div class="card-info">
						<div class="img">
							<button>
								<img src="../../assets/info-img.png" alt="info image" />
								<span
									><img src="../../assets/img-edit.png" alt="info edit"
								/></span>
							</button>
						</div>
						<div class="info-content">
							<div class="member-name">
								<p>Salinas family</p>
								<button>
									<img src="../../assets/img-edit.png" alt="img edit" />
								</button>
							</div>
							<div class="member-desc">
								<p>
									Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
									Aenean commodo ligula eget dolor. Aenean m
								</p>
								<button>
									<img src="../../assets/img-edit.png" alt="img edit" />
								</button>
							</div>
							<div class="creator">Team Created by Selina Parvez</div>
						</div>
					</div>
					<div class="member-area">
						<div class="members">
							<p><span>1</span> Members</p>
						</div>
						<div class="members">
							<p><span>2</span> Admin</p>
						</div>
						<div class="members">
							<p><span>3</span> Teamslisted</p>
						</div>
					</div>
					<div class="member-action">
						<div class="add-remove">
							<button class="add-member">
								<img src="../../assets/icon/add.svg" alt="add" /> Add member
							</button>
							<button class="remove-member">
								<img src="../../assets/icon/remove.svg" alt="remove" />
								<span>Remove member</span>
							</button>
						</div>
						<table width="100%">
							<tr class="admin-member">
								<td><div class="name-short">A</div></td>
								<td><div class="name-full">Selina Parvez</div></td>
								<td><div class="title">Cand</div></td>
								<td>
									<div class="status">
										<img
											src="../../assets/icon/done,success.svg"
											alt="remove"
										/>
									</div>
								</td>
								<td><div class="relation">Candidate</div></td>
								<td>
									<div class="remove">
										<!-- <img src="../../assets/icon/remove.svg" alt="remove"/>-->
									</div>
								</td>
							</tr>
							<tr class="spacer">
								spacer
							</tr>
							<tr class="only-member">
								<td><div class="name-short">A</div></td>
								<td><div class="name-full">Shahid Parvez</div></td>
								<td><div class="title">Rep.</div></td>
								<td>
									<div class="status">
										<img
											src="../../assets/icon/done,success.svg"
											alt="remove"
										/>
									</div>
								</td>
								<td><div class="relation">Candidate</div></td>
								<td>
									<button type="button" class="remove">
										<img src="../../assets/icon/remove.svg" alt="remove" />
									</button>
								</td>
							</tr>
							<tr class="spacer">
								spacer
							</tr>
							<tr class="only-member">
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
							<tr class="spacer">
								spacer
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
							</tr>
							<tr class="spacer">
								spacer
							</tr>
							<tr class="admin-member">
								<td><div class="name-short">A</div></td>
								<td><div class="name-full">Selina Parvez</div></td>
								<td><div class="title">Cand</div></td>
								<td>
									<div class="status">
										<img
											src="../../assets/icon/done,success.svg"
											alt="remove"
										/>
									</div>
								</td>
								<td><div class="relation">Candidate</div></td>
								<td>
									<div class="remove">
										<!-- <img src="../../assets/icon/remove.svg" alt="remove"/>-->
									</div>
								</td>
							</tr>
							<tr class="spacer">
								spacer
							</tr>
						</table>
						<div class="select-member">
							<select class="custom-select" id="inputGroupSelect01">
								<option selected>Role</option>
								<option value="1">One</option>
								<option value="2">Two</option>
								<option value="3">Three</option>
							</select>
							<select class="custom-select" id="inputGroupSelect01">
								<option selected>Add as a</option>
								<option value="1">One</option>
								<option value="2">Two</option>
								<option value="3">Three</option>
							</select>
							<select class="custom-select" id="inputGroupSelect01">
								<option selected>Relationship</option>
								<option value="1">One</option>
								<option value="2">Two</option>
								<option value="3">Three</option>
							</select>
							<select class="custom-select" id="inputGroupSelect01">
								<option selected>Invitation link</option>
								<option value="1">One</option>
								<option value="2">Two</option>
								<option value="3">Three</option>
							</select>
							<button>
								<img
									src="../../assets/icon/link-genarate-share.svg"
									alt="link genarate and share"
								/>
							</button>
						</div>
					</div>
					<div class="team-card-footer">
						<div class="left">
							<p>Team creation Date : 12/11/2020</p>
							<p>Subscription Expire : 12/11/2020</p>
						</div>
						<div class="right">
							<a href="#"
								><img
									src="../../assets/icon/renew.svg"
									alt="Renew Subscription"
								/>
								Renew Subscription</a
							>
						</div>
					</div>
				</div>
				<!-- end box card component -->
			</div>
		</div>

		<div class="row my-5">
			<div class="col-lg-6 col-xl-4">
				<!-- start box card component -->
				<div class="thankyou">
					<h1>
						We are thank you for your valuable feedback.<br /><br />Please
						continue your journy with other teams
					</h1>
					<button class="btn-submit" type="submit">Ok</button>
				</div>
				<!-- end box card component -->
			</div>
		</div>

		<div class="row mt-5">
			<div class="col-lg-6 col-xl-4">
				<!-- start box card component -->
				<div class="imporve-suggetion-form">
					<h1>Any suggetions to improve MatrimonyAssist</h1>
					<form action="#">
						<div class="top">
							<div class="form-group">
								<select class="custom-select">
									<option selected>Open this select menu</option>
									<option value="1">One</option>
									<option value="2">Two</option>
									<option value="3">Three</option>
								</select>
							</div>
							<div class="form-group">
								<input
									class="form-control form-control-lg"
									type="text"
									placeholder="Please specify"
								/>
							</div>
							<div class="form-group">
								<textarea
									class="form-control"
									id="exampleFormControlTextarea1"
									rows="3"
									placeholder="Sample text here"
								></textarea>
								<span>1000 characters with spaces</span>
							</div>
							<button>
								<img src="../../assets/icon/add.svg" alt="add" /> Add more
							</button>
						</div>
						<button class="btn-submit" type="submit">Submit</button>
					</form>
				</div>
			</div>
		</div>

		<div class="row mt-5">
			<div class="col-lg-6 col-xl-4">
				<!-- start popup here -->
				<div class="popup-wrapper">
					<div class="popup-box">
						<div class="popup-actions">
							<button class="back-arrow">
								<img src="../../assets/back-arrow.png" alt="back arrow" />
							</button>
							<button class="close">
								<img src="../../assets/close.png" alt="close" />
							</button>
						</div>
						<div class="info">
							<img src="../../assets/icon/info.svg" alt="info" />
						</div>
						<div class="popup-title">Let's inform other members</div>
						<div class="account-password">
							<div class="form-group">
								<input
									type="password"
									class="form-control"
									id="exampleInputPassword1"
									placeholder="Password"
								/>
							</div>
						</div>
						<div class="delete-message">
							Attention! You're going to completely <span>DELETE</span> this
							team.
						</div>
						<div class="popup-desc">
							By pressing accept your team will be deleted after 24 hours from
							now, in this time members can collect their informations also in
							the meantime you can cancel the deleting process.
						</div>
						<div class="popup-button-area">
							<button class="btn-submit button-danger">Add now</button>
							<button class="btn-submit">Ok</button>
							<button class="btn-submit button-danger">Varify now</button>
							<button class="btn-submit">Yes</button>
							<button class="btn-submit button-danger">No</button>
							<button class="btn-submit button-danger">Delete now</button>
							<button class="btn-submit">Back</button>
							<button class="btn-submit">Accept</button>
							<button class="btn-submit button-danger">Cancel</button>
							<button class="btn-submit">Confirm</button>
						</div>
					</div>
					<div class="popup-overlay"></div>
				</div>
				<!-- end popup here -->
			</div>
		</div>

		<div style="margin-top: 100px">for space only ignor this section</div>
		<!--plz ignore this div -->
	</div>
</template>


<script>
// scripts for switch toggle
export default {
	data() {
		return {};
	},
	methods: {
		onChange(checked) {
			console.log(`a-switch to ${checked}`);
		},
	},
};
</script>


<style scoped lang="scss">
button {
	border: 0;
	background-color: transparent;
}
// start css for page top area
.top-area {
	padding: 20px 30px;
	border-radius: 10px;
	box-shadow: 0px 0px 10px 1px rgba(63, 6, 17, 0.3);
	.top-area-inner {
		border: 1px solid #6158a9;
		border-radius: 5px;
		position: relative;
		display: flex;
		align-items: center;
		height: 44px;
		@media (max-width: 991px) {
			height: 40px;
		}
		@media (max-width: 767px) {
			height: auto;
		}
		.top-title {
			position: absolute;
			left: -21px;
			background: white;
			font-size: 16px;
			font-weight: bold;
			color: #6158a9;
			@media (max-width: 991px) {
				left: -17px;
				font-size: 16px;
			}
		}
		.top-info {
			position: absolute;
			left: 40px;
			top: -1px;
			@media (max-width: 991px) {
				position: relative;
				top: auto;
			}
			@media (max-width: 767px) {
				padding-top: 20px;
				left: 20px;
				overflow: hidden;
			}
			li {
				display: flex;
				align-items: center;
				float: left;
				padding-right: 25px;
				padding-left: 4px;
				@media (max-width: 767px) {
					padding-bottom: 20px;
				}
				a {
					position: relative;
					width: 44px;
					height: 44px;
					margin-right: 5px;
					@media (max-width: 991px) {
						width: 34px;
						height: 34px;
					}
					span {
						width: 100%;
						height: 100%;
						border-radius: 50%;
						background-color: #6158a9;
						float: left;
						display: flex;
						align-items: center;
						justify-content: center;
						color: #ffffff;
						font-size: 16px;
						position: absolute;
						z-index: 3;
						top: 0;
						left: 0;
						padding-left: 0;
					}
					&::before {
						width: 46px;
						height: 46px;
						content: "";
						position: absolute;
						z-index: 2;
						background-color: white;
						border-radius: 50%;
						top: -1px;
						left: -1px;
						@media (max-width: 991px) {
							width: 36px;
							height: 36px;
						}
					}
					&::after {
						content: "";
						position: absolute;
						z-index: 1;
						width: 52px;
						height: 52px;
						background-color: #6158a9;
						border-radius: 50%;
						top: -4px;
						left: -4px;
						@media (max-width: 991px) {
							width: 42px;
							height: 42px;
						}
					}
				}
				span {
					color: #eb4c8f;
					padding-left: 5px;
					@media (max-width: 991px) {
						padding-left: 10px;
					}
				}
			}
		}
	}
}
// end css for page top area

// start css for team-card
.team-card {
	width: 100%;
	padding: 10px 8px;
	border-radius: 10px;
	background-color: #ffffff;
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
				color: #6158a9;
				background-color: #999999;
				color: #e4e4e4;
				font-size: 12px;
				span {
					width: 10px;
					height: 10px;
					border-radius: 50%;
					background-color: #e91e78;
					margin-left: 5px;
				}
				&.active {
					border: 2px solid #6b64ae;
					background-color: #ffffff;
					color: #6158a9;
					span {
						background-color: #39b54a;
					}
				}
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
		margin-bottom: 20px;
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
		.info-content {
			.member-name,
			.member-desc {
				display: flex;
				padding-bottom: 5px;
				p {
					margin: 0;
					color: #777777;
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
		padding-bottom: 20px;
		.members {
			border: 2px solid #908bc2;
			border-radius: 5px;
			min-height: 30px;
			padding: 0 5px;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-bottom: 10px;
			margin-right: 10px;
			&:first-of-type {
				border-top-left-radius: 15px;
				border-bottom-left-radius: 15px;
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
			.name-full {
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
			.relation {
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
		.spacer {
			font-size: 8px;
			color: transparent;
		}
		.select-member {
			display: flex;
			margin-top: 30px;
			margin-bottom: 30px;
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
		margin-bottom: 20px;
		display: flex;
		justify-content: space-between;
		.left {
			margin-bottom: 10px;
			p {
				margin: 0;
				font-size: 12px;
			}
		}
		.right {
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
}
// end css for team-card

// start css for thankyou
.thankyou {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	text-align: center;
	width: 100%;
	padding: 10px 8px;
	border-radius: 10px;
	background-color: #ffffff;
	box-shadow: 0px 0px 10px 1px rgba(63, 6, 17, 0.3);
	min-height: 500px;
	h1 {
		font-size: 24px;
		color: #666666;
		justify-self: center;
		margin: auto;
		width: 100%;
	}
	.btn-submit {
		align-self: flex-end;
		background-color: #6158a7;
		color: #ffffff;
		min-width: 100px;
		padding: 2px 15px;
		margin-bottom: 20px;
		margin-right: 20px;
		border-radius: 20px;
		font-size: 20px;
		border: 2px solid #ffffff;
		box-shadow: 0 2px 3px 1px #ccc;
	}
}
// end css for thankyou

// start css for imporve-suggetion-form
.imporve-suggetion-form {
	padding: 20px 30px;
	text-align: center;
	width: 100%;
	border-radius: 10px;
	background-color: #ffffff;
	box-shadow: 0px 0px 10px 1px rgba(63, 6, 17, 0.3);
	min-height: 500px;
	h1 {
		text-align: center;
		font-size: 20px;
		color: #666666;
		justify-self: center;
		margin: auto;
		width: 100%;
	}
	form {
		margin-top: 30px;
		.custom-select {
			font-size: 16px;
			width: 100%;
			padding-left: 20px;
			padding-right: 20px;
			background: #ffffff url("~@/assets/select-arrow-big.png") no-repeat;
			background-position: right 12px center;
			height: 37px;
			border-radius: 24px;
			border-color: #6158a9;
			color: #6158a9;
		}
		input {
			height: 37px;
			font-size: 12px;
			border-radius: 24px;
			border-color: #6158a9;
		}
		.form-group {
			position: relative;
			textarea.form-control {
				font-size: 12px;
				border-radius: 5px;
				border-color: #6158a9;
			}
			textarea.form-control + span {
				content: "jsdsd";
				font-size: 14px;
				position: absolute;
				bottom: 5px;
				right: 5px;
				opacity: 0.5;
				border-color: #6158a9;
			}
		}
		button {
			display: flex;
			align-items: center;
			justify-content: center;
			margin: auto;
			width: 100%;
			font-size: 20px;
			img {
				width: 33px;
				margin-right: 10px;
			}
		}
		.btn-submit {
			align-self: flex-end;
			background-color: #6158a7;
			color: #ffffff;
			min-width: 100px;
			width: auto;
			padding: 2px 15px;
			margin-bottom: 20px;
			margin-right: 20px;
			border-radius: 20px;
			font-size: 20px;
			border: 2px solid #ffffff;
			box-shadow: 0 2px 3px 1px #ccc;
			margin-top: 100px;
		}
	}

	::placeholder {
		/* Chrome, Firefox, Opera, Safari 10.1+ */
		color: #3a3092;
		opacity: 0.5; /* Firefox */
	}

	:-ms-input-placeholder {
		/* Internet Explorer 10-11 */
		color: #3a3092;
	}

	::-ms-input-placeholder {
		/* Microsoft Edge */
		color: #3a3092;
	}
}
// end css for imporve-suggetion-form

// start css for pupup
.popup-wrapper {
	position: relative;
	.popup-box {
		width: 90%;
		max-width: 100%;
		margin: auto;
		padding: 20px;
		z-index: 12;
		position: relative;
		text-align: center;
		border-radius: 10px;
		background-color: #ffffff;
		box-shadow: 0 0 3px 1px #ccc;
		.popup-actions {
			display: flex;
			justify-content: space-between;
		}
		.info {
			width: 60px;
			height: 60px;
			margin: 20px auto;
		}
		.popup-title {
			color: #666666;
			font-size: 20px;
		}
		.account-password {
			margin-top: 15px;
			input {
				border-radius: 15px;
			}
		}
		.delete-message {
			color: #999999;
			font-size: 12px;
			span {
				color: #e51f76;
				font-weight: bold;
				margin-top: 10px;
			}
		}
		.popup-desc {
			color: #999999;
			font-size: 12px;
			margin-top: 10px;
		}
		.popup-button-area {
			margin-top: 30px;
			.btn-submit {
				align-self: flex-end;
				background-color: #6158a7;
				color: #ffffff;
				min-width: 100px;
				width: auto;
				padding: 2px 15px;
				margin-bottom: 20px;
				margin-right: 20px;
				border-radius: 20px;
				font-size: 20px;
				border: 2px solid #ffffff;
				box-shadow: 0 2px 3px 1px #ccc;
				margin-top: 0;
			}
			.button-danger {
				background-color: #e94c91;
				color: #ffffff;
			}
		}
	}
	.popup-overlay {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 10;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
	}
}
// end css for pupup

// end subscribe now up here
.subscribe-now {
	background-color: #6158a7;
	padding: 30px;
	color: #ffffff;
	border-radius: 5px;
	text-align: center;
	box-shadow: 0px 0px 10px 1px rgba(63, 6, 17, 0.3);
	.title {
		font-size: 18px;
	}
	button {
		margin-top: 20px;
		margin-bottom: 10px;
	}
	.free-offer {
		font-size: 18px;
		a {
			color: #ffffff;
			text-decoration: underline;
		}
	}
	.desc {
		padding-top: 30px;
		p {
			font-size: 14px;
		}
	}
}
// start subscribe now up here

// start css for blocklist wrapper
.blocklist-wrapper {
	position: relative;
	padding-top: 30px;
	margin-bottom: 30px;
	.top {
		background-color: #8983bf;
		border-top-left-radius: 15px;
		border-top-right-radius: 100px;
		width: 100%;
		max-width: 400px;
		position: absolute;
		top: 0;
		color: #ffffff;
		display: flex;
		justify-content: space-between;
		padding: 5px 40px 5px 5px;
		min-height: 50px;
		font-size: 13px;
		@media (max-width: 767px) {
			max-width: none;
			padding-right: 15px;
			padding-left: 15px;
			border-top-right-radius: 15px;
		}
		.blocked-by {
			span {
				font-style: normal;
			}
		}
		.date {
			font-style: italic;
			img {
				width: 18px;
				margin-right: 5px;
			}
		}
	}
	.bottom {
		background-color: #ffffff;
		box-shadow: 2px 0px 8px 0px #999;
		position: relative;
		z-index: 1;
		border-radius: 13px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border: 3px solid #ffffff;
		@media (max-width: 767px) {
			flex-direction: column;
			padding: 10px 0;
			text-align: center;
		}
		&:hover {
			border: 3px solid #3f9de7;
		}
		.user-img {
			img {
				max-width: 60px;
				border-radius: 10px;
			}
		}
		.name-address {
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding-left: 10px;
			@media (max-width: 767px) {
				padding-top: 10px;
			}
			p {
				color: #4d4d4d;
				font-size: 20px;
				margin: 0;
			}
			.address {
				color: #7a7a7a;
				font-size: 14px;
			}
		}
		.team-name {
			flex-basis: 50%;
			text-align: center;
			@media (max-width: 992px) {
				flex-basis: 30%;
			}
			@media (max-width: 767px) {
				padding-top: 20px;
			}
			p {
				margin: 0;
			}
		}
		.report-button {
			@media (max-width: 767px) {
				padding-top: 20px;
			}
			button {
				margin: 0;
				font-size: 14px;
				img {
					width: 18px;
				}
			}
		}
		.reported {
			background-color: #b3b3b3;
		}
		.unblock {
			background-color: #6158a7;
			width: 11%;
			margin-left: 20px;
			height: 65px;
			border-top-right-radius: 10px;
			border-bottom-right-radius: 10px;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #ffffff;
			font-size: 16px;
			@media (max-width: 992px) {
				font-size: 14px;
			}
			@media (max-width: 767px) {
				margin-top: 20px;
				border-radius: 10px;
				height: 34px;
				line-height: 30px;
				padding: 0 30px;
				margin-left: 0;
				display: block;
				width: auto;
			}
		}
	}
}
// end css for blocklist wrapper

// start css for shortlist wrapper
.shortlist-wrapper {
	position: relative;
	padding-top: 30px;
	margin-bottom: 30px;
	.top {
		background-color: #8983bf;
		border-top-left-radius: 15px;
		border-top-right-radius: 100px;
		width: 100%;
		max-width: 400px;
		position: absolute;
		top: 0;
		color: #ffffff;
		display: flex;
		justify-content: space-between;
		padding: 5px 40px 5px 5px;
		min-height: 50px;
		font-size: 13px;
		@media (max-width: 767px) {
			max-width: none;
			padding-right: 15px;
			padding-left: 15px;
			border-top-right-radius: 15px;
		}
		.shortlist-by {
			span {
				font-style: normal;
			}
		}
		.date {
			font-style: italic;
			img {
				width: 18px;
				margin-right: 5px;
			}
		}
	}
	.bottom {
		background-color: #ffffff;
		box-shadow: 2px 0px 8px 0px #999;
		position: relative;
		z-index: 1;
		border-radius: 13px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border: 3px solid #ffffff;
		@media (max-width: 767px) {
			flex-direction: column;
			padding: 10px 0;
			text-align: center;
		}
		&:hover {
			border: 3px solid #3f9de7;
		}
		.user-img {
			img {
				max-width: 60px;
				border-radius: 10px;
			}
		}
		.name-address {
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding-left: 10px;
			@media (max-width: 767px) {
				padding-top: 10px;
			}
			p {
				color: #4d4d4d;
				font-size: 20px;
				margin: 0;
			}
			.address {
				color: #7a7a7a;
				font-size: 14px;
			}
		}
		.team-name {
			flex-basis: 50%;
			text-align: center;
			@media (max-width: 992px) {
				flex-basis: 30%;
			}
			@media (max-width: 767px) {
				padding-top: 20px;
			}
			p {
				margin: 0;
			}
		}
		.report-button {
			@media (max-width: 767px) {
				padding-top: 20px;
			}
			button {
				margin: 0;
				font-size: 14px;
				img {
					width: 18px;
				}
			}
		}
		.reported {
			background-color: #b3b3b3;
		}
		.view-more-details {
			background-color: #6158a7;
			width: 11%;
			margin-left: 20px;
			height: 65px;
			border-top-right-radius: 10px;
			border-bottom-right-radius: 10px;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #ffffff;
			font-size: 16px;
			@media (max-width: 992px) {
				font-size: 14px;
			}
			@media (max-width: 767px) {
				margin-top: 20px;
				border-radius: 10px;
				height: 34px;
				line-height: 30px;
				padding: 0 30px;
				margin-left: 0;
				display: block;
				width: auto;
			}
		}
	}
}
// end css for shortlist wrapper
</style>
