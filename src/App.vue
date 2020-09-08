<template>
  <div>
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Footer from '@views/layouts/Footer'
import { mapGetters } from 'vuex';

export default {
  name: "App",
  components: { Footer },
  computed: mapGetters(['status', 'successInfo', 'errorInfo']),
  watch: {
    $route(to) {
      if (to.name === 'Login' && localStorage.getItem('token')) {
        localStorage.removeItem('token');
      }
    },
    status(to) {
      if (to === 'success') {
        this.$toast.success({
          canClose: false,
          message: this.successInfo
        });
      } else if (to === 'error') {
        this.$toast.error({
          canClose: false,
          message: this.errorInfo
        })
      }
    }
  }
};
</script>
