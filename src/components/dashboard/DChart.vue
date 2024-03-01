<template>
	<div class="profile p-3 shadow-default h-100 rounded chartBoxDesign">
		<div id="chart">
			<apexchart
				type="area"
				height="350"
				:options="chartOptions"
				:series="series"
			></apexchart>
		</div>
	</div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
export default {
	name: "DChart",
	components: {
		apexchart: VueApexCharts,
	},
	data: function () {
		return {
			series: [
				{
					name: "series1",
					data: [31, 40, 28, 51, 42, 109, 100],
				},
				{
					name: "series2",
					data: [11, 32, 45, 32, 34, 52, 41],
				},
			],
			chartOptions: {
				chart: {
					height: 350,
					type: "area",
				},
				dataLabels: {
					enabled: false,
				},
				stroke: {
					curve: "smooth",
				},
				xaxis: {
					type: "datetime",
					categories: [
						"2018-09-19T00:00:00.000Z",
						"2018-09-19T01:30:00.000Z",
						"2018-09-19T02:30:00.000Z",
						"2018-09-19T03:30:00.000Z",
						"2018-09-19T04:30:00.000Z",
						"2018-09-19T05:30:00.000Z",
						"2018-09-19T06:30:00.000Z",
					],
				},
				tooltip: {
					x: {
						format: "dd/MM/yy HH:mm",
					},
				},
			},
		};
	},
};
</script>
<style scoped lang="scss">
@import "@/styles/base/_variables.scss";

.chartBoxDesign {
	@media (max-width: 445px) {
		margin-top: 10px;
		margin-left: -30px;
	}

	
	@media (max-width: 410px) {
		margin-top: 10px;
		margin-left: -40px;
		margin-right: -7px;
	}

	
	@media (max-width: 381px) {
		margin-top: 10px;
		margin-left: -50px;
		margin-right: -7px;
	}

	
	@media (max-width: 360px) {
		margin-top: 10px;
		margin-left: -60px;
		margin-right: -14px;
	}

	@media (max-width: 320px) {
		margin-right: -40px;
		margin-left: -70px;
	}
}

</style>