<template>
  <div>
    <div class="box greeting-item">
      <article class="media">
        <div class="media-left">
          <avatar :size="'is-64x64'" />
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
          <footer class="card-footer item-title">
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
          <footer class="card-footer item-title">
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
          <footer class="card-footer item-title">
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
          <footer class="card-footer item-title">
            <span class="fa-stack fa-1x is-hidden-mobile">
              <i class="far fa-money-bill-alt fa-stack-2x" />
            </span>
            <span class="is-size-5">Stock Current Value</span>
          </footer>
        </div>
      </div>
    </div>
    <div class="overview-items columns is-multiline is-mobile is-variable is-4 has-text-centered">
      <div class="column is-half">
        <div class="card">
          <div class="card-content">
            <span class="item-title is-size-5">
              <i class="fas fa-cubes" /> Inventory
            </span>
            <div class="buttons has-addons is-mobile is-centered mb-5">
              <button
                class="button is-small is-secondary"
                :class="{'is-outlined':type!='month'}"
                @click="type='month'"
              >This month</button>
              <button
                class="button is-small is-secondary"
                :class="{'is-outlined':type!='quarter'}"
                @click="type='quarter'"
              >This quarters</button>
              <button
                class="button is-small is-secondary"
                :class="{'is-outlined':type!='year'}"
                @click="type='year'"
              >This year</button>
            </div>
            <div class="is-item-centered">
              {{period}}
              <apexchart ref="chart" :options="chartOptions" :series="series" />
            </div>
          </div>
        </div>
      </div>
      <div class="column is-half">
        <div class="card">
          <div class="card-content">
            <span class="item-title is-size-5">
              <i class="fas fa-dollar-sign" /> Costs
            </span>
            <div class="is-item-centered">
              <apexchart ref="chart2" :options="chart2Options" :series="series2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from '@components/Avatar.vue';

export default {
  name: 'Dashboard',
  components: { Avatar },
  data() {
    return {
      thisMonth: null,
      period: '',
      chartOptions: {
        chart: {
          type: 'donut'
        },
        theme: { palette: 'palette9' },
        labels: []
      },
      type: 'month',
      chart2Options: {
        chart: {
          type: 'bar',
          height: 300,
          width: 500
        },
        theme: { palette: 'palette9' },
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: '100%',
            distributed: true,
            dataLabels: {
              position: 'bottom'
            }
          }
        },
        dataLabels: {
          enabled: true,
          textAnchor: 'start',
          style: {
            colors: ['#fff']
          },
          formatter: function (val, opt) {
            return opt.w.globals.labels[opt.dataPointIndex]
          },
          offsetX: 0,
          dropShadow: {
            enabled: true
          }
        },
        yaxis: {
          labels: {
            show: false
          }
        },
        xaxis: {
          categories: []
        },
        tooltip: {
          theme: 'dark',
          x: {
            show: false
          },
          y: {
            title: {
              formatter: function () {
                return ''
              }
            }
          }
        }
      },
      series2: [{
        name: 'Cost',
        data: []
      }]
    }
  },
  watch: {
    chartLabels(to) {
      this.chartOptions = {
        ...this.chartOptions,
        labels: [...to]
      };
    },
    type(to) {
      if (to == 'month') {
        this.getInventoryList(this.thisMonth, this.thisMonth);
        this.period = this.thisMonth;
      }
      if (to == 'quarter') {
        let [start, end] = this.getQuarterMonth(new Date());
        this.getInventoryList(start, end);
        this.period = `${start} ~ ${end}`;
      }
      if (to == 'year') {
        let [start, end] = this.getThisYearMonth(new Date());
        this.getInventoryList(start, end);
        this.period = `${start} ~ ${end}`;
      }
    },
    inventoryValues(to) {
      let l1 = [];
      let l2 = [];
      to.forEach(item => {
        l1.push(item.category);
        l2.push(item.cost);
      });
      this.$refs.chart2.updateOptions({
        xaxis: {
          categories: l1
        }
      });
      this.$refs.chart2.updateSeries([
        {
          data: l2
        }
      ])
    }
  },
  computed: {
    today() {
      return this.formatDate(new Date(), 'yyyy/MM/dd HH:mm:ss');
    },
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
    },
    chartLabels() {
      return _.map(this.allCategories, 'name');
    },
    allCategories() {
      return this.$store.getters.allCategories;
    },
    inventoryByMonth() {
      return this.$store.getters.inventoryByMonth;
    },
    series() {
      let data = [];
      let group = _.countBy(this.inventoryByMonth, 'categoryId');
      let sorted = _(group)
        .toPairs()
        .orderBy(1, 'desc')
        .fromPairs()
        .value();
      Object.entries(sorted).filter(([key, val]) => {
        _.forEach(this.allCategories, c => {
          if (c.id == key) {
            data.push(val);
          }
        })
      })
      return data;
    },
    inventoryValues() {
      let data = [];
      let inventoryValues = this.$store.getters.inventoryValues;
      let grouped =
        _(inventoryValues)
          .groupBy('id')
          .map((objs, key) => {
            return ({
              'categoryId': key,
              'cost': _.sumBy(objs, 'cost')
            });
          })
          .value();
      grouped.filter(obj => {
        _.forEach(this.allCategories, c => {
          if (c.id == obj.categoryId) {
            data.push({ category: c.name, cost: obj.cost });
          }
        })
      })
      return data;
    }
  },
  methods: {
    getInventoryList(start, end) {
      this.$store.dispatch('getInventoryByMonth', { start, end });
    },
    getInventoryValues() {
      this.$store.dispatch('getInventoryValues');
    }
  },
  created() {
    this.thisMonth = this.formatDate(new Date(), 'yyyy/MM');
    this.$store.dispatch('getAllCategories');
    this.getInventoryList(this.thisMonth, this.thisMonth);
    this.getInventoryValues();
    this.period = this.thisMonth;
  },
  mounted() {
    this.$store.dispatch('getOverviews');
  }
}
</script>
