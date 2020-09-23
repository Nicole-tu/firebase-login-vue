<template>
	<section class="is-fullheight">
		<nav-bar />
		<div class="hero-body main-content">
			<div class="container">
				<transition
					mode="out-in"
					enter-active-class="fadeIn"
					leave-active-class="fadeOut"
					appear
				>
					<router-view class="animated"></router-view>
				</transition>
			</div>
		</div>

		<page-loader :is-show="isShowLoading" />

		<box-modal
			:id="'modal-add-category'"
			ref="modal-add-category"
			:is-show-modal="isShowAddCateModal"
		>
			<template #content>
				<h5>Add a new category</h5>
				<hr />
				<form @submit.prevent>
					<div class="field">
						<p class="control">
							<input
								class="input"
								type="text"
								placeholder="category name"
								v-model.trim="newCategoryName"
							/>
						</p>
					</div>
				</form>
				<br />
				<br />
				<div class="field is-grouped is-grouped-right">
					<p class="control">
						<a
							class="button is-light"
							@click="$store.commit('setIsShowAddCateModal', false);onCancelModal('modal-add-category')"
						>Cancel</a>
					</p>
					<p class="control">
						<a
							class="button is-primary"
							@click="newCategory"
						>Add</a>
					</p>
				</div>
			</template>
		</box-modal>

		<box-modal
			:id="'modal-add-subcategory'"
			:is-show-modal="isShowNewSubcateModal"
		>
			<template #content>
				<h5>Add a new subcategory under "{{newSubcategoryData.categoryName}}"</h5>
				<hr />
				<form @submit.prevent>
					<div class="field">
						<p class="control">
							<input
								class="input"
								type="text"
								placeholder="subcategory name"
								v-model.trim="newSubcategoryName"
							/>
						</p>
					</div>
				</form>
				<br />
				<br />
				<div class="field is-grouped is-grouped-right">
					<p class="control">
						<a
							class="button is-light"
							@click="$store.commit('setIsShowNewSubcateModal', false);onCancelModal('modal-add-subcategory')"
						>Cancel</a>
					</p>
					<p class="control">
						<a
							class="button is-primary"
							@click="addSubcategory"
						>Add</a>
					</p>
				</div>
			</template>
		</box-modal>

		<confirm-modal
			:id="'modal-delete-category'"
			:is-show-modal="isShowDeleteCateModal"
			:message="`You sure you want to delete '${deleteCategoryData.categoryName}' and it's subcategories ?`"
			:is-danger="true"
			:confirm-btn-name="'Delete'"
			@confirm="deleteCategory"
			@cancel="$store.commit('setIsShowDeleteCateModal', false);onCancelModal('modal-delete-category')"
		/>

		<confirm-modal
			:id="'modal-delete-subcategory'"
			:is-show-modal="isShowDeleteSubCateModal"
			:message="`You sure you want to delete '${deleteSubCategoryData.subcategoryName}'?`"
			:is-danger="true"
			:confirm-btn-name="'Delete'"
			@confirm="deleteSubCategory"
			@cancel="$store.commit('setIsShowDeleteSubCateModal', false);onCancelModal('modal-delete-subcategory')"
		/>

		<card-modal
			:id="'modal-add-inventory'"
			:is-show-modal="isShowAddInventoryModal"
			:title="'Add a item'"
			:confirm-btn-name="'Add'"
			@cancel="$store.commit('setIsShowAddInventoryModal', false);onCancelModal('modal-add-inventory')"
			@confirm="addInventory"
		>
			<template #modal-content>
				<div class="field">
					<label class="label">Category</label>
					<div class="control">
						<div class="select">
							<select
								v-model="newInventory.categoryId"
								@change="onChangeCategory"
							>
								<option
									value=""
									selected
									disabled
								>Please select</option>
								<template v-for="category in categoryList">
									<option
										:key="category.id"
										:value="category.id"
									>{{category.name}}</option>
								</template>
							</select>
						</div>
					</div>
				</div>
				<div class="field">
					<label class="label">Subcategory</label>
					<div class="control">
						<div class="select">
							<select v-model="newInventory.subcategoryId">
								<option
									v-if="subcategoryList.length==0"
									value=""
									selected
								>No subcategory</option>
								<option
									v-else
									value=""
									selected
									disabled
								>Please select subcategory</option>
								<template v-for="subcategory in subcategoryList">
									<option
										:key="subcategory.id"
										:value="subcategory.id"
									>{{subcategory.name}}</option>
								</template>
							</select>
						</div>
					</div>
				</div>
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
							placeholder="10"
						>
					</div>
				</div>
				<div class="field">
					<label class="label">Remark</label>
					<div class="control">
						<textarea
							class="textarea"
							placeholder="Remark here"
							v-model="newInventory.remark"
						/>
					</div>
				</div>
			</template>
		</card-modal>
	</section>
</template>

<script>
import NavBar from '@views/layouts/NavBar';
import PageLoader from '@components/PageLoader';
import BoxModal from '@components/BoxModal';
import ConfirmModal from '@components/ConfirmModal';
import CardModal from '@components/CardModal';

export default {
	name: 'Main',
	components: {
		NavBar,
		PageLoader,
		BoxModal,
		ConfirmModal,
		CardModal
	},
	data() {
		return {
			newCategoryName: '',
			newSubcategoryName: '',
			newInventory: {
				categoryId: '',
				subcategoryId: '',
				name: null,
				amount: null,
				remark: null
			}
		}
	},
	computed: {
		isShowLoading() {
			return this.$store.getters.showLoading
		},
		isShowAddCateModal() {
			return this.$store.getters.isShowAddCateModal
		},
		isShowNewSubcateModal() {
			return this.$store.getters.isShowNewSubcateModal
		},
		newSubcategoryData() {
			return this.$store.getters.newSubcategoryData
		},
		isShowDeleteCateModal() {
			return this.$store.getters.isShowDeleteCateModal
		},
		isShowDeleteSubCateModal() {
			return this.$store.getters.isShowDeleteSubCateModal
		},
		deleteCategoryData() {
			return this.$store.getters.deleteCategoryData
		},
		deleteSubCategoryData() {
			return this.$store.getters.deleteSubCategoryData
		},
		isShowAddInventoryModal() {
			return this.$store.getters.isShowAddInventoryModal
		},
		categoryList() {
			return this.$store.getters.categoryList;
		},
		subcategoryList() {
			return this.$store.getters.subCategoryList;
		}
	},
	watch: {
		isShowAddInventoryModal(to) {
			if (to) {
				this.getCategoryList();
			}
		}
	},
	methods: {
		onCancelModal(modalId) {
			this.$refs[modalId].show = false;
		},
		newCategory() {
			this.$store.dispatch('newCategory', this.newCategoryName).then(() => this.$store.commit('setIsShowAddCateModal', false));
		},
		addSubcategory() {
			const subcategoryName = this.newSubcategoryName;
			const categoryId = this.newSubcategoryData.categoryId;
			this.$store.dispatch('addSubcategory', { subcategoryName, categoryId }).then(() => this.$store.commit('setIsShowNewSubcateModal', false));
		},
		deleteCategory() {
			this.$store.dispatch('deleteCategory', this.deleteCategoryData.categoryId).then(() => this.$store.commit('setIsShowDeleteCateModal', false));
		},
		deleteSubCategory() {
			this.$store.dispatch('deleteSubCategory', this.deleteSubCategoryData.subcategoryId).then(() => this.$store.commit('setIsShowDeleteSubCateModal', false));
		},
		addInventory() {
			this.$store.dispatch('newCategory', this.newInventory).then(() => this.$store.commit('setIsShowAddInventoryModal', false));
		},
		getCategoryList() {
			this.$store.dispatch('getCategoryList');
		},
		onChangeCategory(e) {
			this.$store.dispatch('getSubcategoryList', e.target.value);
		},
	},
	mounted() {
		this.$store.commit('setIsShowAddCateModal', false);
		this.$store.commit('setIsShowNewSubcateModal', false);
		this.$store.commit('setIsShowDeleteCateModal', false);
		this.$store.commit('setIsShowDeleteSubCateModal', false);
		this.$store.commit('setIsShowAddInventoryModal', false);
	}
}
</script>
