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
						@click="isShowAddModal=true"
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
		<card-modal
			:id="'modal-add-item'"
			:is-show-modal="isShowAddModal"
			:title="'Add a item'"
			:confirm-btn-name="'Add'"
			@cancel="isShowAddModal=false"
			@confirm="addInventory"
		>
			<template #modal-content>
				<div class="field">
					<label class="label">Name</label>
					<div class="control">
						<input
							class="input"
							type="text"
							v-model.trim="newInventory.name"
							placeholder="name"
						>
					</div>
				</div>
				<div class="field">
					<label class="label">Amount</label>
					<div class="control">
						<input
							class="input"
							type="number"
							v-model.number="newInventory.amount"
							placeholder="name"
						>
					</div>
				</div>
			</template>
		</card-modal>
	</div>
</template>

<script>
import CardModal from '@components/CardModal';
import DataTable from '@components/DataTable';
import Pagination from '@components/Pagination';
//https://jsfiddle.net/jeffory/jkqxdnny/
export default {
	name: 'Inventory',
	components: { CardModal, DataTable, Pagination },
	data() {
		return {
			queryData: '',
			isShowAddModal: false,
			table_columns: [
				'Picture', 'Name', 'Amount', 'Note', 'Black List', ''
			],
			currentPage: 1,
			newInventory: {}
		}
	},
	computed: {
		pagingList() {
			return this.inventoryList.splice((this.currentPage - 1) * 10, this.currentPage * 10);
		},
		inventoryList() {
			return this.$store.getters.inventoryList;
		},
		totalCount() {
			return this.$store.getters.inventoryList.length;
		},
		categoryList() {
			return this.$store.getters.categoryList;
		},
		subCategoryList() {
			return this.$store.getters.subCategoryList;
		}
	},
	methods: {
		getCategoryList() {
			this.$store.dispatch('getCategoryList');
		},
		getSubcategoryList(categoryId) {
			this.$store.dispatch('getSubcategoryList', categoryId);
		},
		getInventoryList() {
			this.$store.dispatch('getInventoryList');
		},
		addInventory() {
			this.$store.dispatch('addInventory', data).then(() => {
				this.getInventoryList();
				this.isShowAddModal = false;
			});
		}
	},
	created() {
		this.getInventoryList();
	}
}
</script>
