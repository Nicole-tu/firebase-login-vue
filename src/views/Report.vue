<template>
	<div>
		<div class="box">
			<div class="buttons has-addons is-mobile is-centered mb-5">
				<button
					class="button is-small is-secondary"
					:class="{'is-outlined':type!='month'}"
					@click="type='month'"
				>This month</button>
				<button
					class="button is-small is-secondary"
					:class="{'is-outlined':type!='quarter'}"
					@click="type='quarter'"
				>This quarters</button>
				<button
					class="button is-small is-secondary"
					:class="{'is-outlined':type!='year'}"
					@click="type='year'"
				>This year</button>
			</div>
			<div class="is-item-centered">
				<apexchart
					ref="chart"
					:options="chartOptions"
					:series="series"
				/>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Report',
	data() {
		return {
			thisMonth: null,
			chartOptions: {
				chart: {
					type: 'donut',
				},
				theme: { palette: 'palette9' },
				labels: []
			},
			type: 'month'
		}
	},
	watch: {
		chartLabels(to) {
			this.chartOptions = {
				...this.chartOptions,
				labels: [...to]
			}
		},
		type(to) {
			if (to == 'quarter') {
				let [start, end] = this.getQuarterMonth(new Date());
				this.getInventoryList(start, end);
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
		chartLabels() {
			return _.map(this.allCategories, 'name');
		},
		allCategories() {
			return this.$store.getters.allCategories;
		},
		inventoryByMonth() {
			return this.$store.getters.inventoryByMonth;
		},
		series() {
			let data = [];
			let group = _.countBy(this.inventoryByMonth, 'categoryId');
			let sorted = _(group)
				.toPairs()
				.orderBy(1, 'desc')
				.fromPairs()
				.value();
			Object.entries(sorted).filter(([key, val]) => {
				_.forEach(this.allCategories, c => {
					if (c.id == key) {
						data.push(val);
					}
				})
			})
			return data;
		}
	},
	methods: {
		getInventoryList(start, end) {
			this.$store.dispatch('getInventoryByMonth', { start, end });
		}
	},
	created() {
		this.thisMonth = this.formatDate(new Date(), 'yyyy/MM');
		this.$store.dispatch('getAllCategories');
		this.getInventoryList(this.thisMonth, this.thisMonth);
	}
}
</script>
