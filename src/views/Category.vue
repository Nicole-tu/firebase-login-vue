<template>
	<div>
		<div class="settings-header is-hidden-mobile">
			<h5 class="title">Supplies Category</h5>
		</div>
		<template v-if="categoryList.length==0">
			<article class="message is-warning">
				<div class="message-body">
					<span class="icon has-text-warning">
						<i
							class="fas fa-info-circle"
							aria-hidden="true"
						></i>
					</span>
					There are no categories, add a new one.
				</div>
			</article>
			<label class="label">Add category</label>
			<div class="field has-addons">
				<div class="control is-expanded">
					<input
						class="input"
						type="text"
						placeholder="Category Name"
						v-model="newCategoryName"
					/>
				</div>
				<div class="control">
					<button
						class="button is-success"
						data-tooltip="Save"
						@click="newCategory"
					>
						<i class="fas fa-check" />
					</button>
				</div>
			</div>
		</template>
		<template v-else>
			<div
				class="table-container"
				ref="collapsibles"
				id="table-accordion"
			>
				<div class="level table-header-sticky">
					<div class="level-left">
						<div class="field">
							<input
								id="switchRoundedInfo"
								type="checkbox"
								name="switchRoundedInfo"
								class="switch is-rounded is-info"
								v-model="isEdit"
							/>
							<label for="switchRoundedInfo">Open to edit</label>
						</div>
					</div>
					<div class="level-rigth">
						<button
							class="button is-primary is-small"
							v-if="isEdit"
							@click="$store.commit('setIsShowAddCateModal', true)"
						>
							<i class="fas fa-plus" />Add Category
						</button>
					</div>
				</div>
				<table
					class="table is-fullwidth"
					:class="{'is-hoverable':!isEdit}"
				>
					<thead>
						<tr>
							<th style="min-width: 10px;"></th>
							<th style="min-width: 350px;">Name / Sub Category</th>
							<th style="min-width: 200px;"></th>
						</tr>
					</thead>
					<tbody>
						<template v-for="(item,i) in categoryList">
							<tr :key="i">
								<td class="chevron-cell">
									<a
										v-if="item.subCategoryList.length>0"
										data-action="collapse"
										@click="toggleSubcategoryList(i,item.subCategoryList.length)"
									>
										<i
											:id="`chevron${i}`"
											class="fas fa-chevron-right"
										/>
									</a>
								</td>
								<td>
									<div
										class="field has-addons is-small"
										v-if="isEdit"
									>
										<div class="control">
											<input
												class="input is-small"
												type="text"
												placeholder="Category Name"
												v-model="item.name"
											/>
										</div>
										<div class="control">
											<button
												class="button is-success is-small"
												data-tooltip="Save"
												@click="editCategory(item.id,item.name)"
											>
												<i class="fas fa-check" />
											</button>
										</div>
									</div>
									<template v-else>{{item.name}}</template>
								</td>
								<td class="has-text-right">
									<template v-if="isEdit">
										<button
											class="button is-small is-primary is-outlined"
											@click="onAddSubcategory(item.id,item.name)"
										>
											<i class="fas fa-plus" /> Subcategory
										</button>
										<button
											class="button is-small is-danger is-outlined"
											@click="onDeleteCategory(item.id,item.name)"
										>
											Delete
											<i class="fas fa-times" />
										</button>
									</template>
								</td>
							</tr>
							<tr
								:key="`sub-${i}`"
								:id="`tr-table-${i}`"
								style="display:none"
							>
								<td></td>
								<td colspan="2">
									<template v-for="(sub,s) in item.subCategoryList">
										<div
											:key="s"
											:id="`table-${i}`"
											class="columns is-collapsible is-mobile"
											data-parent="table-accordion"
										>
											<div class="column is-1" />
											<div class="column is-9">
												<div
													class="field has-addons is-small"
													v-if="isEdit"
												>
													<div class="control">
														<input
															class="input is-small"
															type="text"
															placeholder="Category Name"
															v-model="sub.name"
														/>
													</div>
													<div class="control">
														<button
															class="button is-success is-small"
															data-tooltip="Save"
															@click="editSubcategory(sub.id,sub.name)"
														>
															<i class="fas fa-check" />
														</button>
													</div>
												</div>
												<template v-else>{{sub.name}}</template>
											</div>
											<div class="column is-2 has-text-right">
												<template v-if="isEdit">
													<button
														class="button is-small is-danger is-outlined"
														@click="onDeleteSubCategory(sub.id,sub.name)"
													>
														Delete
														<i class="fas fa-times" />
													</button>
												</template>
											</div>
										</div>
									</template>
								</td>
							</tr>
						</template>
					</tbody>
				</table>
			</div>
		</template>
	</div>
</template>

<script>
import bulmaCollapsible from '@creativebulma/bulma-collapsible';

export default {
	name: 'Category',
	data() {
		return {
			newCategoryName: '',
			isEdit: false,
			categoryName: null,
			newCategoryId: null,
			newSubcategoryName: ''
		}
	},
	computed: {
		categoryList() {
			return this.$store.getters.allCategories;
		}
	},
	methods: {
		getAllCategory() {
			this.$store.dispatch('getAllCategories');
		},
		editCategory(categoryId, categoryName) {
			this.$store.dispatch('editCategory', { categoryName, categoryId }).then(() => this.getAllCategory());
		},
		newCategory() {
			this.$store.dispatch('newCategory', this.newCategoryName).then(() => {
				this.$store.commit('setRefreshData', true);
			});
		},
		onAddSubcategory(categoryId, categoryName) {
			this.$store.commit('setNewSubcategoryData', { categoryId, categoryName });
			this.$store.commit('setIsShowNewSubcateModal', true);
		},
		editSubcategory(subcategoryId, subcategoryName) {
			this.$store.dispatch('editSubcategory', { subcategoryName, subcategoryId }).then(() => this.getAllCategory());
		},
		onDeleteCategory(categoryId, categoryName) {
			this.$store.commit('setIsShowDeleteCateModal', true);
			this.$store.commit('setDeleteCategoryData', { categoryId, categoryName });
		},
		onDeleteSubCategory(subcategoryId, subcategoryName) {
			this.$store.commit('setIsShowDeleteSubCateModal', true);
			this.$store.commit('setDeleteSubCategoryData', { subcategoryId, subcategoryName });
		},
		toggleSubcategoryList(index, sublength) {
			if (sublength > 0) {
				let collapseItem = document.getElementById(`table-${index}`);
				if (collapseItem.classList.contains("is-active")) { //open
					collapseItem.classList.remove("is-active");
					collapseItem.setAttribute("aria-expanded", "false");
					collapseItem.setAttribute("style", "display:none");
					document.getElementById(`tr-table-${index}`).setAttribute("style", "display:none");
					document.getElementById(`chevron${index}`).setAttribute("style", "transform: rotate(0deg);");
				} else {
					collapseItem.classList.add("is-active");
					collapseItem.setAttribute("aria-expanded", "true");
					collapseItem.setAttribute("style", "heigth:100%");
					document.getElementById(`tr-table-${index}`).setAttribute("style", "display:contents");
					document.getElementById(`chevron${index}`).setAttribute("style", "transform: rotate(90deg);");
				}
			}
		}
	},
	created() {
		this.getAllCategory()
	},
	mounted() {
		const collapsibles = bulmaCollapsible.attach();
	}
}
</script>
