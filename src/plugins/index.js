import Vue from 'vue';
import DatePicker from 'vue2-datepicker';

import 'vue2-datepicker/index.css';
import 'vue-multiselect/dist/vue-multiselect.min.css';

Vue.use(DatePicker);

import Toast from '@components/Toast'

const AlertToast = {
  install: function (Vue, options) {
    if (!options) {
      options = {}
    }
    let showedToastrs = []

    function showToast(obj, type) {
      const ToastrComponent = Vue.extend(Toast)
      var propsData = Object.assign(options, obj, {
        type: type
      })
      let component = new ToastrComponent({
        el: document.createElement('div'),
        propsData
      })

      showedToastrs.push(component)

      return component
    }

    Vue.prototype.$toast = {
      success(obj) {
        return showToast(obj, 'success')
      },
      info(obj) {
        return showToast(obj, 'info')
      },
      warn(obj) {
        return showToast(obj, 'warning')
      },
      error(obj) {
        return showToast(obj, 'danger')
      },
      removeAll() {
        showedToastrs.forEach(c => {
          c.hideToastr()
        })
        showedToastrs = []
      }
    }
  }
};

Vue.use(AlertToast)
