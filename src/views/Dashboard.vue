<template>
	<div>
		<div class="box greeting-item">
			<article class="media">
				<div class="media-left">
					<figure class="image is-64x64">
						<img
							class="image is-rounded"
							:src="
					userProfile.avatar==null?require('@assets/img/avatar.png'):userProfile.avatar"
						/>
					</figure>
				</div>
				<div class="media-content">
					<div class="content">
						<p>
							<strong>Good {{greeting}}, {{userProfile.name}}</strong>
						</p>
					</div>
				</div>
				<div class="media-right">{{today}}</div>
			</article>
		</div>
		<div class="overview-items columns is-multiline is-mobile is-variable is-4 has-text-centered">
			<div class="column">
				<div class="card">
					<div class="card-content is-size-1">{{zeroStockItems}}</div>
					<footer class="card-footer">
						<span class="fa-stack fa-1x is-hidden-mobile">
							<i class="fas fa-box fa-stack-2x"></i>
							<i class="fa fa-times fa-stack-2x fa-inverse"></i>
						</span>
						<span class="is-size-5">Zero Stock Items</span>
					</footer>
				</div>
			</div>
			<div class="column">
				<div class="card">
					<div class="card-content is-size-1">{{blackListItems}}</div>
					<footer class="card-footer">
						<span class="fa-stack fa-1x is-hidden-mobile">
							<i class="fas fa-box fa-stack-1x"></i>
							<i class="fas fa-ban fa-stack-2x has-text-danger"></i>
						</span>
						<span class="is-size-5">Disontinuted Items</span>
					</footer>
				</div>
			</div>
			<div class="column">
				<div class="card">
					<div class="card-content is-size-1">{{currentStockAmount}}</div>
					<footer class="card-footer">
						<span class="fa-stack fa-1x is-hidden-mobile">
							<i class="fas fa-boxes fa-stack-2x"></i>
						</span>
						<span class="is-size-5">Current Stock(units)</span>
					</footer>
				</div>
			</div>
			<div class="column">
				<div class="card">
					<div class="card-content is-size-1">{{currentValue}}</div>
					<footer class="card-footer">
						<span class="fa-stack fa-1x is-hidden-mobile">
							<i class="far fa-money-bill-alt fa-stack-2x" />
						</span>
						<span class="is-size-5">Stock Current Value</span>
					</footer>
				</div>
			</div>
		</div>
		<div class="overview-items columns is-multiline is-mobile is-variable is-4 has-text-centered">
			<div class="column is-half">
				<div class="card">
					<div class="card-content">
						<span class="is-size-5"><i class="fas fa-cubes" /> Inventory</span>
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
			</div>
			<div class="column is-half">
				<div class="card">
					<div class="card-content">
						<span class="is-size-5"><i class="fas fa-dollar-sign" /> Top cost</span>
						<div class="is-item-centered">
							<apexchart
								ref="chart2"
								:options="chart2Options"
								:series="series2"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Dashboard',
	data() {
		return {
			today: new Date(),
			thisMonth: null,
			chartOptions: {
				chart: {
					type: 'donut',
				},
				theme: { palette: 'palette9' },
				labels: []
			},
			type: 'month',
			chart2Options: {
				chart: {
					type: 'bar',
				},
				theme: { palette: 'palette9' },
				labels: []
			}
		}
	},
	watch: {
		chartLabels(to) {
			this.chartOptions = {
				...this.chartOptions,
				labels: [...to]
			};
			this.chart2Options = {
				...this.chart2Options,
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
		greeting() {
			return this.getDayPart();
		},
		userProfile() {
			return this.$store.getters.userProfile;
		},
		currentValue() {
			return this.$store.getters.currentValue;
		},
		zeroStockItems() {
			return this.$store.getters.zeroStockItems;
		},
		blackListItems() {
			return this.$store.getters.blackListItems;
		},
		currentStockAmount() {
			return this.$store.getters.currentStockAmount;
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
		},
		series2() {
			return []
			// let data = [];
			// let group = _.countBy(this.inventoryByMonth, 'categoryId');
			// let sorted = _(group)
			// 	.toPairs()
			// 	.orderBy(1, 'desc')
			// 	.fromPairs()
			// 	.value();
			// Object.entries(sorted).filter(([key, val]) => {
			// 	_.forEach(this.allCategories, c => {
			// 		if (c.id == key) {
			// 			data.push(val);
			// 		}
			// 	})
			// })
			// return data;
		}
	},
	methods: {
		getInventoryList(start, end) {
			this.$store.dispatch('getInventoryByMonth', { start, end });
		},
	},
	created() {
		this.thisMonth = this.formatDate(new Date(), 'yyyy/MM');
		this.$store.dispatch('getAllCategories');
		this.getInventoryList(this.thisMonth, this.thisMonth);
	},
	mounted() {
		this.$store.dispatch('getOverviews');
	}
}
</script>
