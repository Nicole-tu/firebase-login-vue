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
					<a class="button is-primary">Search</a>
				</p>
			</div>
		</div>
		<div class="box table-container">
			<div class="level table-header-sticky">
				<div class="level-left">
					<button
						class="button is-primary is-left"
						@click="$store.commit('setIsShowAddInventoryModal', true)"
					>
						<i class="fas fa-plus" />Add Item
					</button>
				</div>
				<div class="level-right">Total : 123</div>
			</div>
			<data-table
				:table-data="pagingList"
				:columns="table_columns"
				:query="queryData"
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
					@changePage="getInventoryList"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { inventoryCollection } from '../firebase';
import CardModal from '@components/CardModal';
import DataTable from '@components/DataTable';
import Pagination from '@components/Pagination';

export default {
	name: 'Inventory',
	components: { CardModal, DataTable, Pagination },
	data() {
		return {
			queryData: null,
			isShowAddModal: false,
			table_columns: [
				{ name: 'Picture', type: 'String' }, { name: 'Name', type: 'String' }, { name: 'Amount', type: 'Number' }, { name: 'Remarks', type: 'ShortString' }, { name: 'Black Item', type: 'Boolean' }, { name: '', type: null }
			],
			currentPage: 1,
			inventoryList: []
		}
	},
	computed: {
		pagingList() {
			return this.inventoryList.splice((this.currentPage - 1) * 10, this.currentPage * 10);
		},
		totalCount() {
			return this.$store.getters.inventoryList.length;
		}
	},
	methods: {
		getInventoryList() {
			this.$store.dispatch('getInventoryList').then(() => {
				this.inventoryList = this.$store.getters.inventoryList;
			});
		},
		editRow(rowId) {
			console.log(rowId);
		},
	},
	created() {
		this.getInventoryList();
	}
}
</script>
