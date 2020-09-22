<template>
  <section class="is-fullheight">
    <nav-bar />
    <div class="hero-body main-content">
      <div class="container">
        <transition mode="out-in" enter-active-class="fadeIn" leave-active-class="fadeOut" appear>
          <router-view class="animated"></router-view>
        </transition>
      </div>
    </div>

    <page-loader :is-show="isShowLoading" />
    <box-modal
      :id="'modal-add-category'"
      ref="modal-add-category"
      :is-show-modal="isShowAddCateModal"
    >
      <template #content>
        <h5>Add a new category</h5>
        <hr />
        <form @submit.prevent>
          <div class="field">
            <p class="control">
              <input
                class="input"
                type="text"
                placeholder="category name"
                v-model.trim="newCategoryName"
              />
            </p>
          </div>
        </form>
        <br />
        <br />
        <div class="field is-grouped is-grouped-right">
          <p class="control">
            <a
              class="button is-light"
              @click="$store.commit('setIsShowAddCateModal', false);onCancelModal('modal-add-category')"
            >Cancel</a>
          </p>
          <p class="control">
            <a class="button is-primary" @click="newCategory">Add</a>
          </p>
        </div>
      </template>
    </box-modal>
  </section>
</template>

<script>
import NavBar from '@views/layouts/NavBar';
import PageLoader from '@components/PageLoader';
import BoxModal from '@components/BoxModal';
import ConfirmModal from '@components/ConfirmModal';
import CardModal from '@components/CardModal';

export default {
  name: 'Main',
  components: {
    NavBar,
    PageLoader,
    BoxModal,
    ConfirmModal,
    CardModal
  },
  data() {
    return {
      newCategoryName: ''
    }
  },
  computed: {
    isShowLoading() {
      return this.$store.getters.showLoading
    },
    isShowAddCateModal() {
      return this.$store.getters.isShowAddCateModal
    }
  },
  methods: {
    onCancelModal(modalId) {
      this.$refs[modalId].show = false;
    },
    newCategory() {
      this.$store.dispatch('newCategory', this.newCategoryName).then(() => {
        this.$store.commit('setIsShowAddCateModal', false);
      });
    },
  },
  mounted() {
    this.$store.commit('setIsShowAddCateModal', false);
  }
}
</script>
