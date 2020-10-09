<template>
  <div>
    <div class="box greeting-item">
      <article class="media">
        <div class="media-left">
          <figure class="image is-64x64">
            <img
              class="image is-rounded"
              :src="
					userProfile.avatar==null?require('@assets/img/avatar.png'):userProfile.avatar"
            />
          </figure>
        </div>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>Good {{greeting}}, {{userProfile.name}}</strong>
            </p>
          </div>
        </div>
        <div class="media-right">{{today}}</div>
      </article>
    </div>
    <div class="overview-items columns is-multiline is-mobile is-variable is-4 has-text-centered">
      <div class="column">
        <div class="card">
          <div class="card-content is-size-1">{{zeroStockItems}}</div>
          <footer class="card-footer">
            <span class="fa-stack fa-1x is-hidden-mobile">
              <i class="fas fa-box fa-stack-2x"></i>
              <i class="fa fa-times fa-stack-2x fa-inverse"></i>
            </span>
            <span class="is-size-5">Zero Stock Items</span>
          </footer>
        </div>
      </div>
      <div class="column">
        <div class="card">
          <div class="card-content is-size-1">{{blackListItems}}</div>
          <footer class="card-footer">
            <span class="fa-stack fa-1x is-hidden-mobile">
              <i class="fas fa-box fa-stack-1x"></i>
              <i class="fas fa-ban fa-stack-2x has-text-danger"></i>
            </span>
            <span class="is-size-5">Disontinuted Items</span>
          </footer>
        </div>
      </div>
      <div class="column">
        <div class="card">
          <div class="card-content is-size-1">{{currentStockAmount}}</div>
          <footer class="card-footer">
            <span class="fa-stack fa-1x is-hidden-mobile">
              <i class="fas fa-boxes fa-stack-2x"></i>
            </span>
            <span class="is-size-5">Current Stock(units)</span>
          </footer>
        </div>
      </div>
      <div class="column">
        <div class="card">
          <div class="card-content is-size-1">{{currentValue}}</div>
          <footer class="card-footer">
            <span class="fa-stack fa-1x is-hidden-mobile">
              <i class="fas fa-dollar-sign fa-stack-2x"></i>
            </span>
            <span class="is-size-5">Stock Current Value</span>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      today: new Date()
    }
  },
  computed: {
    greeting() {
      return this.getDayPart();
    },
    userProfile() {
      return this.$store.getters.userProfile;
    },
    currentValue() {
      return this.$store.getters.currentValue;
    },
    zeroStockItems() {
      return this.$store.getters.zeroStockItems;
    },
    blackListItems() {
      return this.$store.getters.blackListItems;
    },
    currentStockAmount() {
      return this.$store.getters.currentStockAmount;
    }
  },
  mounted() {
    this.$store.dispatch('getOverviews');
  }
}
</script>
