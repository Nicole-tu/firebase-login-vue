<template>
  <section class="is-fullheight">
    <nav-bar />
    <div class="hero-body main-content">
      <div class="container">
        <transition mode="out-in" enter-active-class="fadeIn" leave-active-class="fadeOut" appear>
          <router-view class="animated"></router-view>
        </transition>
      </div>

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
                @click="$store.commit('setIsShowAddCateModal', false);
								onCancelModal('modal-add-category')"
              >Cancel</a>
            </p>
            <p class="control">
              <a class="button is-primary" @click="newCategory">Add</a>
            </p>
          </div>
        </template>
      </box-modal>

      <box-modal
        :id="'modal-add-subcategory'"
        ref="modal-add-subcategory"
        :is-show-modal="isShowNewSubcateModal"
      >
        <template #content>
          <h5 v-if="addSubcategoryFromInventory">Add a new subcategory</h5>
          <h5 v-else>Add a new subcategory under "{{newSubcategoryData.categoryName}}"</h5>
          <hr />
          <form @submit.prevent>
            <div class="field">
              <p class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="subcategory name"
                  v-model.trim="newSubcategoryName"
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
                @click="$store.commit('setIsShowNewSubcateModal', false);
								onCancelModal('modal-add-subcategory')"
              >Cancel</a>
            </p>
            <p class="control">
              <a class="button is-primary" @click="addSubcategory">{{isEditInventory?'Save':'Add'}}</a>
            </p>
          </div>
        </template>
      </box-modal>

      <confirm-modal
        :id="'modal-delete-category'"
        ref="modal-delete-category"
        :is-show-modal="isShowDeleteCateModal"
        :message="`You sure you want to delete '${deleteCategoryData.categoryName}' and it's subcategories ?`"
        :is-danger="true"
        :confirm-btn-name="'Delete'"
        @confirm="deleteCategory"
        @cancel="$store.commit('setIsShowDeleteCateModal', false);
				onCancelModal('modal-delete-category')"
      />

      <confirm-modal
        :id="'modal-delete-subcategory'"
        ref="modal-delete-subcategory"
        :is-show-modal="isShowDeleteSubCateModal"
        :message="`You sure you want to delete '${deleteSubCategoryData.subcategoryName}'?`"
        :is-danger="true"
        :confirm-btn-name="'Delete'"
        @confirm="deleteSubCategory"
        @cancel="$store.commit('setIsShowDeleteSubCateModal', false);
				onCancelModal('modal-delete-subcategory')"
      />

      <card-modal
        :id="'modal-add-inventory'"
        ref="modal-add-inventory"
        :is-show-modal="isShowAddInventoryModal"
        :title="isEditInventory?'Edit':'Add a item'"
        :confirm-btn-name="isEditInventory?'Save':'Add'"
        @cancel="$store.commit('setIsShowAddInventoryModal', false);
				$store.commit('setIsEditInventory',false);
				onCancelModal('modal-add-inventory');"
        @confirm="addInventory"
      >
        <template #modal-content>
          <figure class="snip">
            <div class="item-image">
              <img
                id="new-inventory-pic"
                :src="newInventory.picture==null?picPlaceholder:newInventory.picture"
                alt="item photo"
              />
            </div>
            <div class="file" style="justify-content: center;">
              <label class="file-label">
                <input
                  class="file-input"
                  type="file"
                  ref="image"
                  @change="onChangeFileInput"
                  accept=".png, .jpeg, .jpg"
                />
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-upload"></i>
                  </span>
                  <span class="file-label">Upload</span>
                </span>
              </label>
            </div>
            <figcaption>
              <div class="field" v-if="isEditInventory">
                <input
                  id="switchRoundedDanger"
                  type="checkbox"
                  name="switchRoundedDanger"
                  class="switch is-rounded is-danger"
                  v-model="newInventory.blackItem"
                />
                <label for="switchRoundedDanger">Black list</label>
              </div>
              <div class="field">
                <label class="label">Category</label>
                <div class="control">
                  <div class="select is-fullwidth" :class="{'is-danger':newInventoryError}">
                    <select v-model="newInventory.categoryId" @change="onChangeCategory">
                      <option value disabled selected>Please select</option>
                      <template v-for="category in categoryList">
                        <option
                          :key="category.id"
                          :value="category.id"
                          :selected="category.id==newInventory.categoryId"
                        >{{category.name}}</option>
                      </template>
                    </select>
                  </div>
                </div>
                <span>
                  <a
                    class="is-link"
                    @click="$store.commit('setIsShowAddCateModal', true);
										$store.commit('setIsShowAddInventoryModal', false);"
                  >Add category...</a>
                </span>
              </div>
              <div class="field">
                <label class="label">Subcategory</label>
                <div class="control">
                  <div class="select is-fullwidth">
                    <select v-model="newInventory.subcategoryId">
                      <option v-if="subcategoryList.length==0" value selected>No subcategory</option>
                      <option v-else value selected disabled>Please select subcategory</option>
                      <template v-for="subcategory in subcategoryList">
                        <option
                          :key="subcategory.id"
                          :value="subcategory.id"
                          :selected="subcategory.id==newInventory.subcategoryId"
                        >{{subcategory.name}}</option>
                      </template>
                    </select>
                  </div>
                </div>
                <span v-if="newInventory.categoryId!='' && subcategoryList.length==0">
                  <a
                    class="is-link"
                    @click="$store.commit('setIsShowNewSubcateModal', true);
										$store.commit('setIsShowAddInventoryModal', false);
										addSubcategoryFromInventory=true"
                  >Add subcategory...</a>
                </span>
              </div>
              <div class="field">
                <label class="label">Name</label>
                <div class="control">
                  <input
                    class="input"
                    :class="{'is-danger':newInventoryError}"
                    type="text"
                    v-model.trim="newInventory.name"
                    placeholder="name"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label">Brand</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    v-model.trim="newInventory.brand"
                    placeholder="e.g. Gucci, Prada"
                  />
                </div>
              </div>
              <div class="field">
                <div class="field-body is-grouped is-horizontal">
                  <div class="field">
                    <label class="label">Amount</label>
                    <div class="control">
                      <input
                        class="input"
                        type="number"
                        v-model.number="newInventory.amount"
                        placeholder="10"
                        min="0"
                      />
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">Unit price</label>
                    <div class="control">
                      <input
                        class="input"
                        type="number"
                        v-model.number="newInventory.unitPrice"
                        placeholder="10"
                        min="1"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <date-input
                :input-value="newInventory.buyDate"
                :date-name="'Buy Date'"
                @changed="getBuyDate"
              />
              <div class="field">
                <label class="label">Remarks</label>
                <div class="control">
                  <textarea
                    class="textarea"
                    placeholder="Remark here"
                    v-model="newInventory.remarks"
                  />
                </div>
              </div>
            </figcaption>

            <div class="field mt-5" v-if="isEditInventory">
              <button
                class="button is-danger"
                @click="$store.commit('setIsShowDeleteInventoryModal', true)"
              >
                <i class="fas fa-times" /> Delete this item
              </button>
            </div>
          </figure>
        </template>
      </card-modal>

      <confirm-modal
        :id="'modal-delete-inventory'"
        ref="modal-delete-inventory"
        :is-show-modal="isShowDeleteInventoryModal"
        :message="`You sure you want to delete '${newInventory.name}'?`"
        :is-danger="true"
        :confirm-btn-name="'Delete'"
        @confirm="deleteInventory"
        @cancel="$store.commit('setIsShowDeleteInventoryModal', false);
				onCancelModal('modal-delete-inventory')"
      />
    </div>

    <page-loader :is-show="isShowLoading" />
  </section>
</template>

<script>
import NavBar from './layouts/Navbar';
import PageLoader from '@components/PageLoader.vue';
import BoxModal from '@components/BoxModal.vue';
import ConfirmModal from '@components/ConfirmModal.vue';
import CardModal from '@components/CardModal.vue';
import DateInput from '@components/DateInput.vue';

export default {
  name: 'Main',
  components: {
    NavBar,
    PageLoader,
    BoxModal,
    ConfirmModal,
    CardModal,
    DateInput
  },
  data() {
    return {
      newCategoryName: '',
      newSubcategoryName: '',
      newInventory: {
        categoryId: '',
        subcategoryId: '',
        name: '',
        amount: null,
        unitPrice: null,
        brand: null,
        buyDate: null,
        remarks: '',
        blackItem: false,
        picture: null,
        file: null
      },
      newInventoryError: false,
      addSubcategoryFromInventory: false,
      uploaderValue: 0,
      picPlaceholder: 'https://bulma.io/images/placeholders/256x256.png',
      fileChanged: false
    }
  },
  computed: {
    isShowLoading() {
      return this.$store.getters.showLoading
    },
    isShowAddCateModal() {
      return this.$store.getters.isShowAddCateModal
    },
    isShowNewSubcateModal() {
      return this.$store.getters.isShowNewSubcateModal
    },
    newSubcategoryData() {
      return this.$store.getters.newSubcategoryData
    },
    isShowDeleteCateModal() {
      return this.$store.getters.isShowDeleteCateModal
    },
    isShowDeleteSubCateModal() {
      return this.$store.getters.isShowDeleteSubCateModal
    },
    deleteCategoryData() {
      return this.$store.getters.deleteCategoryData
    },
    deleteSubCategoryData() {
      return this.$store.getters.deleteSubCategoryData
    },
    isShowAddInventoryModal() {
      return this.$store.getters.isShowAddInventoryModal
    },
    categoryList() {
      return this.$store.getters.categoryList;
    },
    subcategoryList() {
      return this.$store.getters.subCategoryList;
    },
    isEditInventory() {
      return this.$store.getters.isEditInventory;
    },
    editInventoryId() {
      return this.$store.getters.editInventoryId;
    },
    inventoryData() {
      return this.$store.getters.inventoryData;
    },
    isShowDeleteInventoryModal() {
      return this.$store.getters.isShowDeleteInventoryModal;
    }
  },
  watch: {
    isShowAddInventoryModal(to) {
      if (to) {
        this.getCategoryList();
        if (this.isEditInventory) {
          this.$store.dispatch('getInventory', this.editInventoryId).then(() => {
            this.getSubCategoryList(this.inventoryData.categoryId);
            this.newInventory = { ...this.inventoryData };
          })
        }
      } else {
        this.newInventory = {
          categoryId: '',
          subcategoryId: '',
          name: '',
          amount: null,
          unitPrice: null,
          brand: null,
          buyDate: null,
          remarks: '',
          blackItem: false,
          picture: this.picPlaceholder,
          file: null
        };
        this.$store.commit('setSubCategoryList', []);
        this.newInventoryError = false;
      }
    },
    isShowAddCateModal(to) {
      if (!to) {
        this.newCategoryName = ''
      }
    },
    isShowNewSubcateModal(to) {
      if (!to) {
        this.newSubcategoryName = ''
      }
    }
  },
  methods: {
    onCancelModal(modalId) {
      this.$refs[modalId].show = false;
    },
    checkRequireInventory() {
      if (this.newInventory.categoryId.length === 0 || this.newInventory.name.length === 0) {
        this.newInventoryError = true;
        this.$store.dispatch('setAlertMessage',
          { status: false, message: 'Please select category and input inventory name!' });
        return false;
      } else {
        this.newInventoryError = false;
        return true;
      }
    },
    newCategory() {
      if (this.newCategoryName.length === 0) {
        this.$store.dispatch('setAlertMessage',
          { status: false, message: 'Please input category name!' });
        return;
      }
      this.$store.dispatch('newCategory', this.newCategoryName).then(() => this.$store.commit('setIsShowAddCateModal', false));
    },
    addSubcategory() {
      if (this.newSubcategoryName.length === 0) {
        this.$store.dispatch('setAlertMessage',
          { status: false, message: 'Please input subcategory name!' });
        return;
      }
      const subcategoryName = this.newSubcategoryName;
      const categoryId = this.addSubcategoryFromInventory
        ? this.newInventory.categoryId
        : this.newSubcategoryData.categoryId;
      this.$store.dispatch('addSubcategory', { subcategoryName, categoryId })
        .then(() => this.$store.commit('setIsShowNewSubcateModal', false));
    },
    deleteCategory() {
      this.$store.dispatch('deleteCategory', this.deleteCategoryData.categoryId)
        .then(() => this.$store.commit('setIsShowDeleteCateModal', false));
    },
    deleteSubCategory() {
      this.$store.dispatch('deleteSubCategory', this.deleteSubCategoryData.subcategoryId)
        .then(() => this.$store.commit('setIsShowDeleteSubCateModal', false));
    },
    addInventory() {
      if (this.checkRequireInventory()) {
        if (this.isEditInventory) {
          if (this.fileChanged) {
            this.$store.dispatch('uploadInventoryFile', this.newInventory.file);
          }
          const obj = { inventoryId: this.editInventoryId, data: this.newInventory };
          this.$store.dispatch('editInventory', obj)
            .then(() => this.$store.commit('setIsShowAddInventoryModal', false));
        } else {
          this.$store.dispatch('uploadInventoryFile', this.newInventory.file);
          this.$store.dispatch('newInventory', this.newInventory)
            .then(() => this.$store.commit('setIsShowAddInventoryModal', false));
        }
      }
    },
    deleteInventory() {
      this.$store.dispatch('deleteInventory', this.editInventoryId)
        .then(() => {
          this.$store.commit('setIsShowDeleteInventoryModal', false);
          this.$store.commit('setIsShowAddInventoryModal', false);
        });
    },
    getCategoryList() {
      this.$store.dispatch('getCategoryList');
    },
    getSubCategoryList(categoryId) {
      this.$store.dispatch('getSubcategoryList', categoryId);
    },
    onChangeCategory(e) {
      this.newInventory.categoryId = e.target.value;
      this.getSubCategoryList(e.target.value);
    },
    onChangeFileInput(e) {
      this.fileChanged = true;
      const fileData = e.target.files[0];
      document.getElementById('new-inventory-pic').src = window.URL.createObjectURL(fileData);
      this.newInventory.file = { fileObject: fileData, fileName: fileData.name };
    },
    getBuyDate(dateValue) {
      this.newInventory.buyDate = dateValue;
    }
  },
  mounted() {
    this.$store.commit('setIsShowAddCateModal', false);
    this.$store.commit('setIsShowNewSubcateModal', false);
    this.$store.commit('setIsShowDeleteCateModal', false);
    this.$store.commit('setIsShowDeleteSubCateModal', false);
    this.$store.commit('setIsShowAddInventoryModal', false);
    this.$store.commit('setIsEditInventory', false);
    this.$store.commit('setIsShowDeleteInventoryModal', false);
  }
}
</script>
