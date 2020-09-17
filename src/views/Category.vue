<template>
	<div>
		<div class="is-hidden-mobile">
			<h5>Supplies Category</h5>
			<hr />
		</div>
		<div class="table-container">
			<template v-if="categoryList.length==0">
				<label class="label">Add a new category</label>
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
			<table
				v-else
				class="table is-fullwidth"
			>
				<thead>
					<tr>
						<th>Name</th>
						<th>Tags</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(item,i) in categoryList"
						:key="i"
					>
						<td>
							<div class="field has-addons is-small">
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
										class="button is-light is-small"
										data-tooltip="Edit"
										@click="editCategory(item.id)"
									>
										<i class="fas fa-edit" />
									</button>
								</div>
							</div>
						</td>
						<td>
							<template v-for="(tag,t) in item.tags">
								<span
									class="tag is-info is-light"
									:key="t"
								>{{tag}}</span>
							</template>
						</td>
						<td class="has-text-right">
							<button
								class="button is-small is-primary is-outlined"
								@click="addSubcategory(i)"
							>
								<i class="fas fa-plus" /> Subcategory
							</button>
							<button class="button is-small is-danger is-outlined">
								<span
									class="icon"
									data-tooltip="Delete"
								>
									<i class="fas fa-times"></i>
								</span>
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import { firebase } from '@/firebase'

export default {
	name: 'Category',
	data() {
		return {
			newCategoryName: ''
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
		}
	},
	created() {
		this.$store.dispatch('getCategoryList');
	}
}
</script>
