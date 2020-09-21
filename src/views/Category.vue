<template>
	<div>
		<div class="settings-header is-hidden-mobile">
			<h5 class="title">Supplies Category</h5>
		</div>
		<template v-if="categoryList.length==0">
			<article class="message is-primary">
				<span class="icon has-text-primary">
					<i
						class="fas fa-info-circle"
						aria-hidden="true"
					></i>
				</span>
				<div class="message-body">
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
											@click="addSubcategory('subcategory-'+item.name,item.id)"
										>
											<i class="fas fa-plus" /> Subcategory
										</button>
										<button class="button is-small is-danger is-outlined">
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
											class="div-sub-catgory columns is-collapsible"
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
															@click="editCategory(sub.name,sub.id)"
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
													<button class="button is-small is-danger is-outlined">
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
import { firebase } from '@/firebase';

export default {
	name: 'Category',
	data() {
		return {
			newCategoryName: '',
			isEdit: false,
			categoryList: []
		}
	},
	methods: {
		newCategory() {
			this.$store.dispatch('newCategory', this.newCategoryName);
		},
		editCategory(categoryName, categoryId) {
			this.$store.dispatch('editCategory', { categoryName, categoryId });
		},
		addSubcategory(subcategoryName, categoryId) {
			this.$store.dispatch('addSubcategory', { subcategoryName, categoryId });
		},
		editSubCategory(subcategoryName, subcategoryId) {
			this.$store.dispatch('editSubCategory', { subcategoryName, subcategoryId });
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
		this.$store.dispatch('getCategoryList').then(() => this.categoryList = this.$store.getters.categoryList);
	},
	mounted() {
		const collapsibles = bulmaCollapsible.attach();
	}
}
</script>
