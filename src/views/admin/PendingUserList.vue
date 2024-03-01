<template>
	<div>
		<h3 class="mt-3">Pending User List</h3>
		<div>
			<div class="offset">
				<table  class="table table-striped shadow-default background-design">
					<thead class="panel panel-body">
						<tr>
							<th scope="col">ID</th>
							<th scope="col">Email</th>
							<th scope="col">User Type</th>
							<th scope="col">Status</th>
							<th scope="col">Location</th>
							<th scope="col">Gender</th>
							<th scope="col">Age</th>
							<th scope="col">Religion</th>
							<th scope="col">Ethnicty</th>
							<th scope="col">Action</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="d in displayedPosts" :key="d.id" class="hoverDesign">
							<td>{{ d.id }}</td>
							<td>{{ d.email }}</td>
							<td>{{ d.account_type_meaning }}</td>
							<td>{{ d.status_meaning }}</td>
							<td v-if="d.account_type == 1">
								{{ d.candidateInfo.location_name }}
							</td>
							<td v-else>{{ d.representative.location_name }}</td>

							<!-- Gender -->
							<td v-if="d.account_type == 1">
								{{ getGender(d.candidateInfo.gender) }}
							</td>
							<td v-else>{{ getGender(d.representative.gender) }}</td>

							<!-- Age -->
							<td v-if="d.account_type == 1">
								{{ getAge(d.candidateInfo.age) }}
							</td>
							<td v-else>{{ getAge(d.representative.age) }}</td>

							<!-- Religion -->
							<td v-if="d.account_type == 1">
								{{ d.candidateInfo.religion }}
							</td>
							<td v-else></td>

							<!-- Ethnicity -->
							<td v-if="d.account_type == 1">
								{{ d.candidateInfo.ethnicity }}
							</td>
							<td v-else>{{ d.representative.ethnicity }}</td>
							<td>
								<div class="d-flex">
									<button class="btn btn-sm btn-info" @click="approveUser(d.id)">
										Approve
									</button>
									<!-- <button class="btn btn-sm btn-danger ml-2">Reject</button> -->
								</div>
							</td>
						</tr>
						<tr> 
							<td  colspan="10" class="paginationDesign">
								<div id="pageNav">
									<nav aria-label="Page navigation example">
										<ul class="pagination">
											<li class="page-item">
												<button
													type="button"
													class="page-link"
													v-if="page != 1"
													@click="page--">
													Previous
												</button>
											</li>
											<li class="page-item">
												<button
													type="button"
													class="page-link"
													v-for="pageNumber in pages.slice(page - 1, page + 5)"
													@click="page = pageNumber"
													:key="pageNumber">
													{{ pageNumber }}
												</button>
											</li>
											<li class="page-item">
												<button
													type="button"
													@click="page++"
													v-if="page < pages.length"
													class="page-link">
													Next
												</button>
											</li>
										</ul>
									</nav>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			data: [],
			page: 1,
			perPage: 5,
			pages: [],
		};
	},
	created() {
		this.loadPendingUsers();
	},
	methods: {
		getGender(genderId) {
			if (genderId == 1) {
				return "Male";
			} else if (genderId == 2) {
				return "Female";
			} else {
				return "";
			}
		},
		getAge(dateString) {
			if (dateString == "" || dateString == null) {
				return "";
			}
			var today = new Date();
			var birthDate = new Date(dateString);
			var age = today.getFullYear() - birthDate.getFullYear();
			var m = today.getMonth() - birthDate.getMonth();
			if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
				age--;
			}
			return age;
		},
		loadPendingUsers() {
			let url = `v1/admin/pending-user?parpage=100&page=1`;
			const response = this.$store.dispatch("getPendingUsers", url);
			response
				.then((data) => {
					this.data = data;
					console.log(this.data);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		approveUser(id) {
			const vm = this;
			this.$confirm({
				title: "Are you sure?",
				content: "Do you want to approve this user's registration?",
				okText: "Yes",
				okType: "danger",
				cancelText: "No",
				async onOk() {
					const response = vm.$store.dispatch("approveUser", id);
					response
						.then((data) => {
							console.log(data);
							vm.$router.go();
						})
						.catch((error) => {
							console.log(error);
						});
				},
				onCancel() {
					console.log("Cancel");
				},
			});
		},
		setPages() {
			let numberOfPages = Math.ceil(this.data.length / this.perPage);
			for (let index = 1; index <= numberOfPages; index++) {
				this.pages.push(index);
			}
		},
		paginate(data) {
			let page = this.page;
			let perPage = this.perPage;
			let from = page * perPage - perPage;
			let to = page * perPage;
			return data.slice(from, to);
		},
	},
	computed: {
		displayedPosts() {
			return this.paginate(this.data);
		},
	},
	watch: {
		data() {
			this.setPages();
		},
	},
	filters: {
		trimWords(value) {
			return value.split(" ").splice(0, 20).join(" ") + "...";
		},
	},
};
</script>

<style scoped>
table {
	border-collapse: collapse;
}
th,
td {
	vertical-align: middle !important;
	text-align: center;
}
button.page-link {
	display: inline-block;
}
button.page-link {
	font-size: 20px;
	color: #29b3ed;
	font-weight: 500;
}

.panel-body{
	color: white;
	
}

tbody tr, td{
	border: 1px solid #dee2e6;
}

.show-entry {
	margin-top: 5px;
	height: 30px;
	padding-top: 2px;
	padding-right: 0px;
}

.select-category {
	margin-top: 5px;
	height: 30px;
	padding-top: 2px;
	margin-left: 5px;

}

.page-item button{
	border-radius: 3px;	
	color: #3A3092;

}

.hoverDesign:hover{
background-image: linear-gradient(to right, white, #cacaca, #e6e6e6, white);	
}

.table {
	padding-top: 100px;
	border: 30px solid white;
	border-radius: 7px;
}

.page-item button:hover{
	background-color:#3A3092;
	color: white;	

}

#pageNav {
	margin-left: 50%;
}

.background-design {
	background-color: white;
	margin-left: 0px;
	margin-top: 20px;
	
}

.table th {
	font-size: 16px;
}
.table td, .table th {
	padding: 15px;
	box-sizing: border-box;

}
.paginationDesign {
	background-color: white;
}

.offset {
	width: 100%;
	margin: auto;
}
</style>