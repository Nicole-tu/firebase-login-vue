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
					<div class="control">
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
				</div>
			</div>
			<apexchart
				width="500"
				type="donut"
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
				theme: { palette: 'palette9' },
				labels: ['Apple', 'Mango', 'Orange', 'Watermelon']
			},
			series: [],
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
		}
	},
	methods: {
		getAllCategory() {
			this.$store.dispatch('getAllCategories').then(() => {
				this.series = this.$store.getters.allCategories.map(c => c.name);
				console.log(this.series)
			});
		}
	},
	created() {
		this.selectedMonth = this.formatDate(new Date(), 'M');
		this.selectedYear = this.formatDate(new Date(), 'yyyy');
		this.getAllCategory();
	}
}
</script>
