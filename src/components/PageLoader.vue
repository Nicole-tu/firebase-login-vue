<template>
	<div
		class="pageloader"
		:class="{'is-active':isShow}"
	>
		<span class="title">Loading</span>
	</div>
</template>

<script>
export default {
	name: 'PageLoader',
	props: {
		isShow: { type: Boolean, default: false }
	}
}
</script>
