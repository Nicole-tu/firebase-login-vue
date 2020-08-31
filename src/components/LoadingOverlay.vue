<template>
  <loading :active.sync="isShowLoading" :can-cancel="false" :is-full-page="true">
    <template #default>
      <div class="d-flex h-100 justify-content-center align-items-center">
        <i class="la la-circle-notch la-spin la-6x text-primary" />
      </div>
    </template>
  </loading>
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
