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
			<div class="table-container">
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
										role="button"
										data-toggle="collapse"
										:data-target="`#table-${i}`"
										@click="getSubcategoryList(item.id)"
									>
										<i class="fas fa-chevron-right"></i>
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
												@click="editCategory(item.id)"
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
										<div class="tagsfield field input is-grouped is-grouped-multiline">
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
												></span>
											</div>
										</div>
									</template>
								</td>
								<td class="has-text-right">
									<template v-if="isEdit">
										<button
											class="button is-small is-primary is-outlined"
											@click="addSubcategory(item.id)"
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
								:id="`#table-${i}`"
							>
								<td></td>
								<td colspan="3">
									<div class="table-detail-container">
										<div class="table-detail">
											<div class="table-detail-tr-row">
												<div class="table-detail-td">
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
																@click="editCategory(item.id)"
															>
																<i class="fas fa-check" />
															</button>
														</div>
													</div>
													<template v-else>
														{{item.name}}

													</template>
												</div>
												<div class="table-detail-td has-text-right">
													<template v-if="isEdit">
														<button class="button is-small is-danger is-outlined">
															Delete
															<i class="fas fa-times" />
														</button>
													</template>
												</div>
											</div>
										</div>
									</div>
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
import { firebase } from '@/firebase';
import Tagsfield from 'bulma-tagsfield';

export default {
	name: 'Category',
	data() {
		return {
			newCategoryName: '',
			isEdit: false
		}
	},
	computed: {
		categoryList() {
			console.log(this.$store.getters.categoryList);
			return this.$store.getters.categoryList;
		}
	},
	methods: {
		newCategory() {
			this.$store.dispatch('newCategory', this.newCategoryName);
		},
		addSubcategory(subcategoryName, categoryId) {
			this.$store.dispatch('addSubcategory', { subcategoryName, categoryId });
		},
		getSubcategoryList(categoryId) {
			this.$store.dispatch('getSubcategoryList', categoryId);
		}
	},
	created() {
		this.$store.dispatch('getCategoryList');
	}
}
</script>
