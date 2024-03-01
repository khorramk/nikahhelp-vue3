<template>
	<div class="userReportPage">
		<p class="userReportDesign">User Report</p>
		<!-- <h2>Data Tables</h2> -->
		<!-- <DataTable :header-fields="headerFields" :data="data" :css="datatableCss">
			<input
				slot="actions"
				slot-scope="props"
				type="button"
				class="btn btn-info"
				value="View Profile"
				@click="dtEditClick(props)"
			/>
		</DataTable> -->

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
			<div class="d-flex select-column-align">
				<span class="select-category-option">Select: </span>
				<select class="custom-select select-category" v-model="filter" @change="selectFilter">
					<option :value="5">All</option>
					<option :value="1">Candidate</option>
					<option :value="2">Representative</option>
					<option :value="3">Matchmaker</option>
					<option :value="4">Admin</option>
				</select>
			</div>
		</div>

		<div class="pt-1"></div>

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
						</tr>
					</thead>
					<tbody>
						<tr v-for="d in displayedPosts" :key="d.id"  class="hoverDesign">
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
						</tr>

						<tr> 
							<td colspan="9" class="paginationDesign">
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
import { DataTable } from "v-datatable-light";
export default {
	data() {
		return {
			headerFields: [
				{
					name: "full_name",
					label: "Full Name",
				},
				{
					name: "email",
					label: "Email",
				},
				{
					name: "status_meaning",
					label: "Status",
				},
				{
					name: "account_type_meaning",
					label: "Account Type",
				},
				"__slot:actions",
			],
			data: [],
			page: 1,
			perPage: 5,
			pages: [],
			currentPage: 1,
			filter: 5, // All of them selected
		};
	},
	components: {
		DataTable,
	},
	created() {
		this.loadUserReport();
	},
	methods: {
		selectFilter(e) {
			console.log(e.target.value);
			console.log(this.filter);
		},
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
		loadUserReport() {
			let url = `v1/admin/users-report?parpage=100&page=0`;

			const response = this.$store.dispatch("getUserReport", url);
			response
				.then((data) => {
					console.log(data);
					this.data = data.result;
				})
				.catch((error) => {
					console.log(error);
				});
		},
		dtEditClick(props) {
			console.log(props.rowData.id);
			this.$router.push(`/user/profile/${props.rowData.id}`);
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
	},
	filters: {
		trimWords(value) {
			return value.split(" ").splice(0, 20).join(" ") + "...";
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
	position: relative;
}
th,
td {
	vertical-align: middle !important;
	text-align: left;
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

.paginationDesign {
	background-color: white;
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


.userReportDesign {
	font-weight: 600;
	font-family: Open Sans,sans-serif;
	margin-bottom: .5em;
    color: rgba(0,0,0,.85);
	font-size: 1.75rem;
	display: block;
	box-sizing: border-box;

	@media (max-width: 442px) {
		font-size: 10px;
	}
}
.userReportPage {
	@media (max-width: 1024px) {
		margin-left: 100px;
	}

}

.page-item button{
	border-radius: 3px;	
	color: #3A3092;

}

.hoverDesign:hover{
background-image: linear-gradient(to right, white, #cacaca, #e6e6e6, white);	
}

.select-category-option{
	
	font-size: 20px!important;
	margin-right: .25rem!important;
	margin-top: .25rem!important;
	
	@media (max-width: 382px) {
		padding-left: 500px;
		margin-left: 100%;
	}
}

.select-column-align {
	display: block;
	font-size: 10px;
	margin-left: 75%;
	@media (max-width: 620px) {
		margin-left: 100%;
		
	}
	
}


.select-category {
	margin-top: 5px;
	height: 30px;
	padding-top: 2px;
	margin-left: 5px;

	
}

.page-item button:hover{
	background-color:#3A3092;
	color: white;	

}

.select-lebel {
	font-size: 20px!important;
	margin-right: .25rem!important;
	margin-top: .25rem!important;

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
	margin-top: -20px;
}

.table th {
	font-size: 16px;
}
.table td, .table th {
	padding: 15px;
	box-sizing: border-box;

}

.offset {
	width: 100%;
	margin: auto;
}
</style>