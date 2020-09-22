<template>
	<div
		class="pagination is-centered is-rounded"
		role="navigation"
		aria-label="pagination"
	>
		<a
			v-show="showFirstLastButton"
			class="pagination-previous is-rounded"
			:class="{'disabled':isInFirstPage}"
			@click.prevent="onClickFirstPage"
		>
			<i class="fas fa-angle-double-left" />
		</a>
		<a
			class="pagination-previous is-rounded"
			:class="{'disabled':isInFirstPage}"
			@click.prevent="onClickPreviousPage"
		>
			<i class="fas fa-chevron-left" />Previous
		</a>
		<a
			class="pagination-next is-rounded"
			:class="{'disabled':isInLastPage}"
			@click.prevent="onClickNextPage"
		>
			Next
			<i class="fas fa-chevron-right" />
		</a>
		<a
			v-show="showFirstLastButton"
			class="pagination-next is-rounded"
			:class="{'disabled':isInLastPage}"
			@click.prevent="onClickLastPage"
		>
			<i class="fas fa-angle-double-right" />
		</a>

		<ul class="pagination-list">
			<li v-if="showPrevBreakPage">
				<span class="pagination-ellipsis">&hellip;</span>
			</li>
			<li
				v-for="(item, key) in pages"
				:key="key"
			>
				<a
					class="pagination-link"
					:class="{'is-current disabled': isPageActive(item.name) }"
					@click.prevent="onClickPage(item.name)"
					:aria-label="`Goto page ${item.name}`"
				>{{ item.name }}</a>
			</li>
			<li v-if="showNextBreakPage">
				<span class="pagination-ellipsis">&hellip;</span>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'Pagination',
	props: {
		totalCount: { type: Number, default: 0 },
		perPage: { type: Number, default: 10 },
		maxVisibleButtons: {
			type: Number,
			required: false,
			default: 5
		},
		value: {
			type: Object,
			default() {
				return {};
			}
		},
		page: {
			type: Number,
			default: 1
		},
		showRowPerPage: {
			type: Boolean,
			default: true
		},
		showFirstLastButton: {
			type: Boolean,
			default: true
		}
	},
	computed: {
		totalPage() {
			return Math.ceil(this.totalCount / this.perPage);
		},
		startPage() {
			if (
				this.page === 1 ||
				this.page - 1 <= 1 ||
				this.page <= this.maxVisibleButtons
			) {
				return 1;
			}
			if (
				this.page === this.totalPage &&
				this.page <= this.maxVisibleButtons
			) {
				return 1;
			}

			return this.page - this.maxVisibleButtons + 1;
		},
		endPage() {
			return Math.min(
				this.startPage + this.maxVisibleButtons - 1,
				this.totalPage
			);
		},
		pages() {
			const range = [];
			for (let i = this.startPage; i <= this.endPage; i += 1) {
				range.push({
					name: i,
					isDisabled: i === this.page
				});
			}

			return range;
		},
		showPrevBreakPage() {
			return (
				this.page - 1 >= this.maxVisibleButtons ||
				(this.startPage < this.maxVisibleButtons && this.startPage > 1)
			);
		},
		showNextBreakPage() {
			return this.endPage < this.totalPage;
		},
		isInFirstPage() {
			return this.page === 1;
		},
		isInLastPage() {
			return this.page === this.totalPage;
		}
	},
	methods: {
		onClickFirstPage() {
			this.value.page = 1;
			this.$emit("changePage");
		},
		onClickPreviousPage() {
			this.value.page = this.page - 1;
			this.$emit("changePage");
		},
		onClickPage(page) {
			if (this.value.page == page) {
				return;
			}
			this.value.page = page;
			this.$emit("changePage");
		},
		onClickNextPage() {
			this.value.page = this.page + 1;
			this.$emit("changePage");
		},
		onClickLastPage() {
			this.value.page = this.endPage;
			this.$emit("changePage");
		},
		isPageActive(page) {
			console.log(page, this.page);
			return this.page === page;
		}
	}
}
</script>
