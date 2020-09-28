<template>
	<div>
		<table class="table is-fullwidth">
			<thead>
				<tr>
					<th
						v-for="(column, index) in columns"
						:key="index"
					>
						<span>{{ column.name }}</span>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(row,r) in view_data"
					:key="r"
				>
					<td
						v-for="(column,c) in columns"
						:key="c"
						:class="column.type=='Number'?'has-text-right':'has-text-left'"
					>
						<template v-if="column.name==''">
							<slot
								name="rowFunctions"
								:target-item="row.id"
							/>
						</template>
						<template v-else-if="column.type=='Boolean'">
							<slot
								name="rowBoolean"
								:target-value="row[camelCase(column.name)]"
							/>
						</template>
						<template v-else>
							{{column.type=='ShortString'
							? row[camelCase(column.name)].length>0?`${row[camelCase(column.name)].substring(0,10)}...`:null
							: row[camelCase(column.name)]}}
						</template>
					</td>
				</tr>

				<tr v-if="view_data.length == 0">
					<td
						:colspan="columns.length"
						class="has-text-centered"
					>No data specified.</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
	name: 'DataTable',
	props: {
		tableData: {
			type: Array, default() {
				return [];
			}
		},
		columns: {
			type: Array, default() {
				return [];
			}
		},
		query: { type: String, default: null }
	},
	data() {
		return {
			view_data: []
		}
	},
	computed: {
		columnTableData() {
			let rows = []
			this.tableData.forEach(row => {
				let column = {}
				this.columns.forEach(col => {
					let key = this.camelCase(col.name);
					column[key] = row[key];
				})
				column.id = row.id;
				rows.push(column);
			})
			return rows;
		}
	},
	beforeMount() {
		this.parse_data();
	},
	methods: {
		camelCase(str) {
			return _.camelCase(str);
		},
		parse_data() {
			if (this.columnTableData == undefined) {
				return;
			}
			this.view_data = [];
			if (typeof (this.query) !== "undefined" && this.query !== "" && this.query !== null) {
				this.view_data = this.columnTableData.filter(el => {
					for (var key in el) {
						if (String(el[key]).toLowerCase().indexOf(this.query) !== -1) {
							return true;
						}
					}
					return false;
				}
				);
			} else {
				this.view_data = this.columnTableData;
			}
		}
	},
	watch: {
		query() {
			this.parse_data();
		},
		tableData() {
			this.parse_data();
		}
	}
}
</script>
