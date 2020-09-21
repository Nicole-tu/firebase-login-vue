<template>
  <div class="pagination is-centered is-rounded" role="navigation" aria-label="pagination">
    <a class="pagination-previous is-rounded">
      <i class="fas fa-chevron-left" />Previous Page
    </a>
    <a class="pagination-next">
      Next Page
      <i class="fas fa-chevron-right" />
    </a>
    <ul class="pagination-list">
      <li v-for="i in totalPage" :key="i">
        <a class="pagination-link" :aria-label="`Goto page ${i}`" @click="clickPage">{{i}}</a>
      </li>
      <!-- 
      <li>
        <span class="pagination-ellipsis">&hellip;</span>
      </li>
      <li>
        <a class="pagination-link" aria-label="Goto page 45">45</a>
      </li>
      <li>
        <a class="pagination-link is-current" aria-label="Page 46" aria-current="page">46</a>
      </li>
      <li>
        <a class="pagination-link" aria-label="Goto page 47">47</a>
      </li>
      <li>
        <span class="pagination-ellipsis">&hellip;</span>
      </li>
      <li>
        <a class="pagination-link" aria-label="Goto page 86">86</a>
      </li>-->
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    totalCount: { type: Number, default: 0 },
    perPage: { type: Number, default: 10 }
  },
  computed: {
    totalPage() {
      return Math.ceil(this.totalCount / this.perPage);
    }
  },
  methods: {
    clickPage(e) {
      let siblings = this.getSiblings(e.target);
      siblings.foreach(s => s.classList.remove('is-current'));

      e.target.classList.add('is-current');
    }
  }
}
</script>