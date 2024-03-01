<template>
	<div>
		<h3 class="mt-2">Subscription Reports</h3>
		<!-- Filter Section -->
		<div class="filter-section mb-5">
			<div class="d-flex float-left">
				<span class="select-lebel">Show</span>
				<select class="custom-select show-entry" v-model="perPage">
					<option :value="5">5</option>
					<option :value="10">10</option>
					<option :value="25">25</option>
					<option :value="50">50</option>
				</select>
				<span class="select-lebel entryMargin">Entries</span>
			</div>
		</div>

		<div class="pt-1"></div>

		<!-- Data Tables -->
		<div>
			<div class="offset">
				<table  class="table table-striped shadow-default background-design">
					<thead class="panel panel-body">
						<tr>
							<th scope="col">ID</th>
							<th scope="col">Team Name</th>
							<th scope="col">Member Count</th>
							<th scope="col">Subscription ID</th>
							<th scope="col">Subscription Expire At</th>
							<th scope="col">Status</th>
							<th scope="col">Subscription History</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="d in displayedPosts" :key="d.id" class="hoverDesign">
							<td>{{ d.id }}</td>
							<td>{{ d.name }}</td>
							<td>{{ d.member_count }}</td>
							<td>{{ d.subscription_id }}</td>
							<td>{{ d.subscription_expire_at }}</td>
							<td>{{ d.status }}</td>

							<td>
								<button
									class="btn btn-sm btn-primary"
									@click="showHistory(d.subscriptionhistory)">
									Show History
								</button>
							</td>
						</tr>
						<tr> 
							<td colspan="7" class="paginationDesign">
								<!-- Pagination -->
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

				<a-modal
					v-model="visible"
					:width="800"
					title="Subscription History"
					@ok="handleOk">
					<div v-if="subHistory">
						<div v-if="subHistory.length > 0">
							<table class="table table-striped shadow-default background-design">
								<thead>
									<tr>
										<th>ID</th>
										<th>User ID</th>
										<th>Team ID</th>
										<th>Plan ID</th>
										<th>Plan Name</th>
										<th>Quantity</th>
										<th>Sub Expires At</th>
										<th>Created At</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="h in subHistory" :key="h.id">
										<td>{{ h.id }}</td>
										<td>{{ h.user_id }}</td>
										<td>{{ h.team_id }}</td>
										<td>{{ h.plan_id }}</td>
										<td>{{ getPlanName(h.plan_id) }}</td>
										<td>{{ h.quantity }}</td>
										<td>{{ h.subscription_expire_at }}</td>
										<td>{{ getParsedDate(h.created_at) }}</td>
									</tr>
								</tbody>
							</table>
						</div>
						
						<div v-else class="text-center text-danger fs-20">
							<p>No Subscription History Found</p>
						</div>
					</div>
				</a-modal>
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
			currentPage: 1,
			filter: 5, // All of them selected
			visible: false,
			subHistory: null,
		};
	},
	created() {
		this.loadSubscriptionReport();
	},
	methods: {
		loadSubscriptionReport() {
			let url = "v1/admin/subscription-report?page=0&parpage=100";

			const response = this.$store.dispatch("getSubscriptionReport", url);
			response
				.then((data) => {
					console.log(data);
					this.data = data.result;
				})
				.catch((error) => {
					console.log(error);
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
		showHistory(obj) {
			this.subHistory = obj;
			this.visible = true;
		},
		handleOk(e) {
			console.log(e);
			this.visible = false;
		},
		getParsedDate(dateTime) {
			let res = dateTime.split(" ");
			return res[0];
		},
		getPlanName(id) {
			if (id == 1) {
				return "1 Month Plan";
			} else if (id == 2) {
				return "3 Month Plan";
			} else if (id == 3) {
				return "6 Month Plan";
			} else {
				return "1 Day Free Plan";
			}
		},
	},
	computed: {
		displayedPosts() {
			const reports = this.data;
			//console.log(reports);
			const final = reports.filter((report) => {
				if (report.account_type == 1 && this.filter == 1) {
					return true;
				} else if (report.account_type == 2 && this.filter == 2) {
					return true;
				} else if (report.account_type == 3 && this.filter == 3) {
					return true;
				} else if (report.account_type == 4 && this.filter == 4) {
					return true;
				} else if (this.filter == 5) {
					return true;
				}
				return false;
			});
			console.log(final);
			return this.paginate(final);
		},
	},
	watch: {
		data() {
			this.setPages();
		},
		perPage() {
			this.setPages();
		},
	},
};
</script>
<style scoped>
.filter-section {
	margin-bottom: 30px;
}
.page-select {
	width: 20%;
}
.select-filter {
	width: 25%;
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
	padding-right: 40px;
	
}


.select-lebel {
	font-size: 20px!important;
	margin-right: .25rem!important;
	margin-top: .25rem!important;

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

.table {
	padding-top: 100px;
	border: 30px solid white;
	border-radius: 7px;
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