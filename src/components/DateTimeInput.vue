<template id="DateTimeInput">
  <date-picker
    input-class="form-control"
    popup-class="dropdown-menu"
    :type="inputType"
    :format="formatedDate"
    :range="rangeDate"
    v-model="dateValue"
    :placeholder="placeholder"
    :lang="lang"
    :disabled="disabled"
    :clearable="clearable"
    :editable="editable"
    :disabled-date="disabledDate"
    @change="changeDate"
  />
</template>

<script>
import moment from "moment"

export default {
  name: "DateTimeInput",
  props: {
    name: {
      type: String,
      default: "Date"
    },
    inputType: {
      type: String,
      default: "date"
    },
    rangeDate: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: true
    },
    setDate: {
      type: [Array, String],
      default: null
    },
    formatType: { type: String, default: null },
    maxDate: {
      type: String,
      default: null
    },
    minDate: {
      type: String,
      default: null
    }
  },
  data: function() {
    return {
      id: null,
      icon: "fa-calendar",
      dateValue: null,
      lang: {
        formatLocale: {
          firstDayOfWeek: 1 // 週一為第一天
        }
      },
      formatedDate: {
        stringify: date => {
          return date ? moment(date).format(this.dateFormat) : ""
        },
        parse: value => {
          return value ? moment(value, this.dateFormat).toDate() : null
        }
      }
    }
  },
  computed: {
    placeholder() {
      if (this.rangeDate) {
        if (this.inputType === "datetime") {
          return this.$t("dateinput_placeholder.date_time_range")
        }

        if (this.inputType === "month") {
          return this.$t("dateinput_placeholder.month_range")
        }
        return this.$t("dateinput_placeholder.date_range")
      }

      if (this.inputType === "datetime") {
        return this.$t("dateinput_placeholder.date_time")
      }

      if (this.inputType === "month") {
        return this.$t("dateinput_placeholder.month")
      }

      return this.$t("dateinput_placeholder.date")
    },
    dateFormat() {
      if (this.formatType != null) {
        return this.formatType
      }
      if (this.inputType === "datetime") {
        return "YYYY/MM/DD HH:mm:ss"
      }

      if (this.inputType === "month") {
        return "YYYY/MM"
      }

      return "YYYY/MM/DD"
    },
    startDate() {
      return this.setDate.split(" ~ ")[0]
    },
    endDate() {
      return this.setDate.split(" ~ ")[1]
    }
  },
  watch: {
    value(val) {
      this.dateValue = val
    },
    inputType(val) {
      if (val == "time") {
        this.icon = "fa-clock-o"
      } else {
        this.icon = "fa-calendar"
      }
    },
    setDate(to, from) {
      if (to == null || to.lengh == 0) {
        this.dateValue = ""
        return
      }
      if (this.rangeDate) {
        if (this.endDate.length == 0) {
          this.dateValue = [
            new Date(moment(this.startDate).format("YYYY-MM-DD")),
            new Date(moment("9999-12-31").format("YYYY-MM-DD"))
          ]
          return
        }
        this.dateValue = [
          new Date(moment(this.startDate).format("YYYY-MM-DD")),
          new Date(moment(this.endDate).format("YYYY-MM-DD"))
        ]
        return
      }
      this.dateValue = new Date(moment(to).format("YYYY-MM-DD"))
    }
  },
  methods: {
    disabledDate(date) {
      if (this.maxDate != null && this.minDate == null) {
        return moment(this.maxDate) < date
      } else if (this.minDate != null && this.maxDate == null) {
        return moment(this.minDate) > date
      }
      return null
    },
    changeDate(value, type) {
      this.dateValue = value
      this.$emit("changeDate", { name: this.name, value: this.dateValue })
    },
    clearDate() {
      this.dateValue = null
      this.$emit("changeDate", { name: this.name, value: this.dateValue })
    },
    initial() {
      this.dateValue = ""
      if (this.setDate == null || this.setDate.length == 0) {
        return
      }
      if (this.rangeDate) {
        if (this.endDate.length == 0) {
          this.dateValue = [
            new Date(moment(new Date(this.startDate)).format("YYYY-MM-DD")),
            new Date(moment(new Date("9999-12-31")).format("YYYY-MM-DD"))
          ]
          return
        }
        this.dateValue = [
          new Date(moment(new Date(this.startDate)).format("YYYY-MM-DD")),
          new Date(moment(new Date(this.endDate)).format("YYYY-MM-DD"))
        ]
        return
      }
      this.dateValue = new Date(
        moment(new Date(this.setDate)).format("YYYY-MM-DD")
      )
    }
  },
  mounted() {
    this.initial()
  }
}
</script>
