<template>
  <transition
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    @before-enter="beforeEnter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    v-if="show"
  >
    <template v-if="canClose">
      <div :class="['notification','toast-'+type]" :style="{backgroundColor:toastBackgroundColor}">
        <button class="delete" aria-label="close" @click="hideToast" />
        <p class="toast-message">{{message}}</p>
      </div>
    </template>
    <template v-else>
      <div
        :class="['box','toast-'+type]"
        :style="{backgroundColor:toastBackgroundColor}"
      >{{message}}</div>
    </template>
  </transition>
</template>

<script>
export default {
  name: 'Toast',
  data: () => {
    return {
      show: false,
      sto: null
    }
  },
  props: {
    type: {
      type: String,
      default: 'success'
    },
    position: {
      type: String,
      default: 'top center'
    },
    message: {
      type: String
    },
    canClose: {
      type: Boolean,
      default: true
    }
  },
  beforeMount() {
    let toastContainer = document.querySelector(`.toast.toast-${this.positionClass}`)
    if (!toastContainer) {
      toastContainer = document.createElement('div')
      toastContainer.classList.add('toast');
      toastContainer.classList.add(`toast-${this.positionClass}`);
      document.body.appendChild(toastContainer)
    }
    toastContainer.appendChild(this.$el)
  },
  mounted() {
    setTimeout(() => this.showToast(), 0)
  },
  computed: {
    positionClass() {
      return this.position.split(' ').join('-')
    }
  },
  methods: {
    showToast() {
      this.show = true
      this.sto = setTimeout(() => this.hideToast(), 2000)
    },
    hideToast() {
      clearTimeout(this.sto)
      this.show = false
    },
    beforeEnter(el) {
      el.style.animationDuration = '2000ms'
    },
    afterEnter() {
      this.$el.classList.add('animated')
      this.$el.classList.add('fadeIn')
    },
    beforeLeave(el) {
      el.style.animationDuration = '1500ms'
    }
  }
}
</script>
