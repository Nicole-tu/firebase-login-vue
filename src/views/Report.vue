<template>
	<div>
		<div class="box">
			<div class="field">
				<label class="label">Buy Month</label>
				<div class="field-body is-grouped is-horizontal">
					<div class="control">
						<div class="select">
							<select v-model="selectedYear">
								<template v-for="year in yearList">
									<option
										:key="year"
										:value="year"
										:selected="year==selectedYear"
									>{{year}}</option>
								</template>
							</select>
						</div>
					</div>
					<div class="control ml-1">
						<div class="select">
							<select v-model="selectedMonth">
								<template v-for="month in monthList">
									<option
										:key="month"
										:value="month"
										:selected="month==selectedMonth"
									>{{month.length==1?`0${month}`:month}}</option>
								</template>
							</select>
						</div>
					</div>
					<div class="control ml-1">
						<a
							class="button is-dark-brown"
							data-tooltip="show data"
						>
							<i class="fas fa-chart-pie" />
						</a>
					</div>
					<div class="control ml-5">
						<a
							class="button is-dark-brown is-outlined"
							data-tooltip="back to this month"
						>
							This month
						</a>
					</div>
				</div>
			</div>
			<apexchart
				class="mt-5"
				ref="chart"
				:options="chartOptions"
				:series="series"
			></apexchart>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Report',
	data() {
		return {
			selectedMonth: null,
			selectedYear: null,
			chartOptions: {
				chart: {
					width: 600,
					type: 'donut',
				},
				theme: { palette: 'palette9' },
				labels: []
			},
			series: [],
		}
	},
	watch: {
		allCategories(to) {
			this.chartOptions = {
				...this.chartOptions,
				labels: [...to]
			}
		}
	},
	computed: {
		monthList() {
			return this.$store.getters.monthList;
		},
		yearList() {
			let yearArr = [];
			let minBuyDate = this.$store.getters.minBuyDate ? new Date(this.$store.getters.minBuyDate) : new Date();
			let minYear = this.formatDate(minBuyDate, 'yyyy');
			let yearCout = this.selectedYear - minYear - 1;
			yearArr.push(minYear);
			for (let y in yearCout) {
				yearArr.push(parseInt(minYear) + y);
			}
			minYear == this.selectedYear ? null : yearArr.push(this.selectedYear);
			return yearArr;
		},
		allCategories() {
			return _.map(this.$store.getters.allCategories, 'name');
		}
	},
	methods: {
		getAllCategory() {
			this.$store.dispatch('getAllCategories');
		}
	},
	created() {
		this.selectedMonth = this.formatDate(new Date(), 'M');
		this.selectedYear = this.formatDate(new Date(), 'yyyy');
		this.getAllCategory();
	}
}
</script>
