<template>
	<div>
		<div class="box">
			<div class="field is-grouped">
				<p class="control is-expanded has-icons-left">
					<input
						class="input"
						type="text"
						placeholder="Search"
					>
					<span class="icon is-small is-left">
						<i class="fas fa-search" />
					</span>
				</p>
				<p class="control">
					<a class="button is-primary">
						Search
					</a>
				</p>
			</div>
		</div>
		<div class="box table-container">
			<div class="level table-header-sticky">
				<div class="level-left">
					<button class="button is-primary is-left">
						<i class="fas fa-plus" />Add Item
					</button>
				</div>
				<div class="level-right">
					Total : 123
				</div>
			</div>
			<table class="table is-fullwidth">
				<thead>
					<tr>
						<th></th>
						<th>Picture</th>
						<th>Name</th>
						<th>Amount</th>
						<th>Note</th>
						<th>Black List</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="i in 10"
						:key="i"
					>
						<td>{{i}}</td>
						<td>Picture</td>
						<td>Name</td>
						<td>Amount</td>
						<td>Note</td>
						<td>
							<div class="field">
								<input
									id="switchRoundedDanger"
									type="checkbox"
									name="switchRoundedDanger"
									class="switch is-rounded is-danger"
									checked="false"
								>
								<label for="switchRoundedDanger" />
							</div>
						</td>
						<td>
							<span data-tooltip="Edit">
								<a class="button is-white">
									<i class="fas fa-edit" />
								</a>
							</span>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="table-footer-sticky">
				<div
					class="pagination is-centered is-rounded"
					role="navigation"
					aria-label="pagination"
				>
					<a class="pagination-previous is-rounded"><i class="fas fa-chevron-left" />Previous Page</a>
					<a class="pagination-next">Next Page<i class="fas fa-chevron-right" /></a>
					<ul class="pagination-list">
						<li><a
								class="pagination-link"
								aria-label="Goto page 1"
							>1</a></li>
						<li><span class="pagination-ellipsis">&hellip;</span></li>
						<li><a
								class="pagination-link"
								aria-label="Goto page 45"
							>45</a></li>
						<li><a
								class="pagination-link is-current"
								aria-label="Page 46"
								aria-current="page"
							>46</a></li>
						<li><a
								class="pagination-link"
								aria-label="Goto page 47"
							>47</a></li>
						<li><span class="pagination-ellipsis">&hellip;</span></li>
						<li><a
								class="pagination-link"
								aria-label="Goto page 86"
							>86</a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
//https://jsfiddle.net/jeffory/jkqxdnny/
export default {
	name: 'Inventory'
}
</script>
