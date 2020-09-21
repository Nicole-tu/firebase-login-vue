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
					>
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
							>
							<label for="switchRoundedInfo"> Open to edit</label>
						</div>
					</div>
					<div class="level-rigth">
						<button
							class="button is-primary is-small"
							v-if="isEdit"
							@click="isShowNewCateModal=true"
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
							<th style="min-width: 350px;">Name</th>
							<th style="min-width: 280px;">Tags</th>
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
											>
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
									<template v-else>
										{{item.name}}
									</template>
								</td>
								<td>
									<template v-if="!isEdit">
										<span
											class="tag is-info is-light"
											v-for="(tag,t) in item.tags"
											:key="t"
										>{{tag}}</span>
									</template>
									<template v-else>
										<!-- <div class="tagsfield field input is-grouped is-grouped-multiline">
											<div v-if="item.tags">
												<input
													type="hidden"
													:value="item.tags.join(',')"
												>
												<span
													autocomplete="off"
													spellcheck="false"
													placeholder="Add tags"
													contenteditable
												/>
											</div>
										</div> -->
									</template>
								</td>
								<td class="has-text-right">
									<template v-if="isEdit">
										<button
											class="button is-small is-primary is-outlined"
											@click="categoryName=item.name;newCategoryId=item.id;isShowNewSubcateModal=true"
										>
											<i class="fas fa-plus" /> Subcategory
										</button>
										<button
											class="button is-small is-danger is-outlined"
											@click="isShowDeleteModal=true;deleteName=item.name;"
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
								<td colspan="3">
									<template v-for="(sub,s) in item.subCategoryList">
										<div
											:key="s"
											:id="`table-${i}`"
											class="columns is-collapsible"
											data-parent="table-accordion"
										>
											<div class="column is-4">
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
														>
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
												<template v-else>
													{{sub.name}}
												</template>
											</div>
											<div class="column is-6"></div>
											<div class="column is-2 has-text-right">
												<template v-if="isEdit">
													<button
														class="button is-small is-danger is-outlined"
														@click="isShowDeleteModal=true;deleteName=sub.name"
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
		<box-modal
			:id="'modal-add-category'"
			:is-show-modal="isShowNewCateModal"
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
							>
						</p>
					</div>
				</form>
				<br />
				<br />
				<div class="field is-grouped is-grouped-right">
					<p class="control">
						<a
							class="button is-light"
							@click="isShowNewCateModal=false"
						>
							Cancel
						</a>
					</p>
					<p class="control">
						<a
							class="button is-primary"
							@click="newCategory"
						>
							Add
						</a>
					</p>
				</div>
			</template>
		</box-modal>
		<box-modal
			:id="'modal-add-subcategory'"
			:is-show-modal="isShowNewSubcateModal"
		>
			<template #content>
				<h5>Add a new subcategory under "{{categoryName}}"</h5>
				<hr />
				<form @submit.prevent>
					<div class="field">
						<p class="control">
							<input
								class="input"
								type="text"
								placeholder="subcategory name"
								v-model.trim="newSubcategoryName"
							>
						</p>
					</div>
				</form>
				<br />
				<br />
				<div class="field is-grouped is-grouped-right">
					<p class="control">
						<a
							class="button is-light"
							@click="isShowNewSubcateModal=false"
						>
							Cancel
						</a>
					</p>
					<p class="control">
						<a
							class="button is-primary"
							@click="addSubcategory"
						>
							Add
						</a>
					</p>
				</div>
			</template>
		</box-modal>
		<confirm-modal
			:id="'modal-delete-confirm'"
			:is-show-modal="isShowDeleteModal"
			:message="`You sure you want to delete '${deleteName}' ?`"
			:is-danger="true"
			:confirm-btn-name="'Delete'"
			@confirm="deleteCategory"
			@cancel="isShowDeleteModal=false"
		/>
	</div>
</template>

<script>
import bulmaCollapsible from '@creativebulma/bulma-collapsible';
import BoxModal from '@components/BoxModal';
import ConfirmModal from '@components/ConfirmModal';

export default {
	name: 'Category',
	components: { BoxModal, ConfirmModal },
	data() {
		return {
			newCategoryName: '',
			isEdit: false,
			categoryList: [],
			categoryName: null,
			newCategoryId: null,
			newSubcategoryName: '',
			deleteName: '',
			isShowNewCateModal: false,
			isShowNewSubcateModal: false,
			isShowDeleteModal: false
		}
	},
	methods: {
		getAllCategory() {
			this.$store.dispatch('getCategoryList').then(() => this.categoryList = this.$store.getters.categoryList);
		},
		newCategory() {
			this.$store.dispatch('newCategory', this.newCategoryName).then(() => { this.isShowNewCateModal = false; this.getAllCategory(); });
		},
		editCategory(categoryId, categoryName) {
			this.$store.dispatch('editCategory', { categoryName, categoryId }).then(() => this.getAllCategory());
		},
		addSubcategory() {
			const subcategoryName = this.newSubcategoryName;
			const categoryId = this.newCategoryId;
			this.$store.dispatch('addSubcategory', { subcategoryName, categoryId }).then(() => { this.getAllCategory(); this.isShowNewSubcateModal = false; });
		},
		editSubcategory(subcategoryId, subcategoryName) {
			this.$store.dispatch('editSubcategory', { subcategoryName, subcategoryId }).then(() => this.getAllCategory());
		},
		deleteCategory() {

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
