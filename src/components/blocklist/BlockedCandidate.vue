<template>
	<div class="blocked-candidate">
		<div class="m-3 shadow-default">
			<div class="item" style="text-align: left; width: 100%">
				<span class="item-number flex-center-center" style="float: left">{{
					blockedCandidates.length
				}}</span>
				<span class="m-2 fw-600">Blocked candidate</span>
			</div>
			<table class="table">
				<thead class="panel panel-body">
					<tr>
						<th scope="col">Candidate Name</th>
						<th scope="col">Team Name</th>
						<th scope="col">Blocked Date</th>
						<th scope="col">Blocked by</th>
						<th scope="col">Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="candidate in blockedCandidates" :key="candidate.id">
						<td>{{ candidate.candidate.name }}</td>
						<td>{{ candidate.candidate.name }}'s Family</td>
						<td>{{ formatDate(candidate.block_date)}}</td>
						<td>{{ candidate.block_by_name }}</td>
						<td>
							<button
								class="btn btn-sm btn-primary"
								@click="unblock(candidate.id)"
							>
								Unblock
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
export default {
	emits: ["unblock-candidate"],
	name: "BlockedCandidate",
	props: ["blockedCandidates"],
	methods: {
		unblock(id) {
			this.$emit("unblock-candidate", id);
		},
		formatDate(date){
			var d = new Date(date);
			var curr_date = d.getDate();
			var curr_month = d.getMonth() + 1; //Months are zero based
			var curr_year = d.getFullYear();
			var result = curr_date + "/" + curr_month + "/" + curr_year;
			return result;
		},
	},
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.blocked-candidate {
	.shadow-default {
		border-radius: 5px;
		padding: 5px;
		table {
			border-collapse: separate;
			border-spacing: 0 0.5em;
			padding: 5px;
		}

		th,
		td {
			border: none;
			padding: 8px;
		}

		tbody tr {
			box-shadow: 0 0 5px 3px #d3d3d3 !important;
			border-radius: 30px;
		}
		th {
			box-shadow: none;
			border-radius: 0px;
		}

		.item {
			display: inline-block;
			.item-number {
				width: 40px;
				height: 40px;
				border-radius: 50%;
				background: $bg-secondary;
				color: $color-white;
				margin-left: 8px;
			}
		}
	}
	.panel{
		border-radius: 30px;
	}
	.panel-body{
		color: white;
	
 	}
}
</style>