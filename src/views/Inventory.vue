<template>
	<div>
		<div class="box">
			<div class="field is-grouped">
				<p class="control is-expanded has-icons-left">
					<input
						class="input"
						type="text"
						placeholder="Search"
						v-model="queryData"
					/>
					<span class="icon is-small is-left">
						<i class="fas fa-search" />
					</span>
				</p>
				<p class="control">
					<a
						class="button is-primary"
						@click="queryInput = queryData"
					>Search</a>
				</p>
			</div>
		</div>
		<div class="box table-container">
			<div class="level table-header-sticky">
				<div class="level-left">
					<button
						class="button is-primary is-left"
						@click="$store.commit('setIsShowAddInventoryModal', true);$store.commit('setIsEditInventory', false);"
					>
						<i class="fas fa-plus" />Add Item
					</button>
				</div>
				<div class="level-right">Total : {{totalCount}}</div>
			</div>
			<data-table
				:table-data="pagingList"
				:columns="table_columns"
				:query="queryInput"
			>
				<template
					slot="rowFunctions"
					slot-scope="props"
				>
					<span data-tooltip="Edit">
						<a
							class="button is-white"
							@click="editRow(props.targetItem)"
						>
							<i class="fas fa-edit" />
						</a>
					</span>
				</template>
				<template
					slot="rowBoolean"
					slot-scope="props"
				>
					<span class="has-text-danger">
						<template v-if="props.targetValue">
							<i class="fas fa-book-dead" />
						</template>
					</span>
				</template>
			</data-table>
			<div
				class="table-footer-sticky"
				v-show="totalCount>0"
			>
				<pagination
					:total-count="totalCount"
					:page="currentPage"
					v-model="pageData"
					@changePage="getInventoryList"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import DataTable from '@components/DataTable';
import Pagination from '@components/Pagination';

export default {
	name: 'Inventory',
	components: { DataTable, Pagination },
	data() {
		return {
			queryData: null,
			queryInput: '',
			isShowAddModal: false,
			table_columns: [
				{ name: 'Picture', type: 'String' }, { name: 'Name', type: 'String' }, { name: 'Amount', type: 'Number' }, { name: 'Remarks', type: 'ShortString' }, { name: 'Black Item', type: 'Boolean' }, { name: '', type: 'Action' }
			],
			pageData: {
				page: 1,
				perPage: 10
			}
		}
	},
	computed: {
		pagingList() {
			return this.$store.getters.inventoryList && this.$store.getters.inventoryList.splice((this.currentPage - 1) * 10, this.currentPage * 10) || [];
		},
		totalCount() {
			return this.$store.getters.inventoryListCount;
		},
		currentPage() {
			return parseInt(this.pageData && this.pageData.page || 1);
		},
	},
	methods: {
		getInventoryList() {
			this.$store.dispatch('getInventoryList');
		},
		editRow(rowId) {
			this.$store.commit('setIsEditInventory', true)
			this.$store.commit('setEditInventoryId', rowId)
			this.$store.commit('setIsShowAddInventoryModal', true)
		}
	},
	created() {
		this.getInventoryList();
	}
}

</script>
