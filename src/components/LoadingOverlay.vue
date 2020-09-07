<template>
	<loading
		:active.sync="isShowLoading"
		:can-cancel="false"
		:is-full-page="true"
		loader="dots"
		:opacity="0.8"
		color="#174b81"
	/>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
	name: "LoadingOverlay",
	components: { Loading },
	props: {
		isShowLoading: { type: Boolean, default: false }
	}
};
</script>
