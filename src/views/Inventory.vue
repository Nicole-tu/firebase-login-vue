<template>
  <div>
    <div class="box">
      <div class="field is-grouped">
        <p class="control is-expanded has-icons-left">
          <input class="input" type="text" placeholder="Search" v-model="queryData" />
          <span class="icon is-small is-left">
            <i class="fas fa-search" />
          </span>
        </p>
        <p class="control">
          <a class="button is-primary">Search</a>
        </p>
      </div>
    </div>
    <div class="box table-container">
      <div class="level table-header-sticky">
        <div class="level-left">
          <button class="button is-primary is-left" @click="isShowAddModal=true">
            <i class="fas fa-plus" />Add Item
          </button>
        </div>
        <div class="level-right">Total : 123</div>
      </div>
      <data-table :table-data="table_data" :columns="table_columns" :query="queryData" />
      <!-- 
        <tbody>
          <tr v-for="i in 10" :key="i">
            <td>{{i}}</td>
            <td>Picture</td>
            <td>Name</td>
            <td>Amount</td>
            <td>Note</td>
            <td>
              <div class="field">
                <input
                  id="switchRoundedDanger"
                  type="checkbox"
                  name="switchRoundedDanger"
                  class="switch is-rounded is-danger"
                  checked="false"
                />
                <label for="switchRoundedDanger" />
              </div>
            </td>
            <td>
              <span data-tooltip="Edit">
                <a class="button is-white">
                  <i class="fas fa-edit" />
                </a>
              </span>
            </td>
          </tr>
        </tbody>
      </table>-->
      <div class="table-footer-sticky">
        <pagination :total-count="12" />
      </div>
    </div>
    <card-modal
      :id="'modal-add-item'"
      :is-show-modal="isShowAddModal"
      :title="'Add a item'"
      :confirm-btn-name="'Add'"
    >
      <template #modal-content></template>
    </card-modal>
  </div>
</template>

<script>
import CardModal from '@components/CardModal';
import DataTable from '@components/DataTable';
import Pagination from '@components/Pagination';
//https://jsfiddle.net/jeffory/jkqxdnny/
export default {
  name: 'Inventory',
  components: { CardModal, DataTable, Pagination },
  data() {
    return {
      queryData: '',
      isShowAddModal: false,
      table_columns: [
        'Picture', 'Name', 'Amount', 'Note', 'Black List', ''
      ],
      table_data: [['123', 'Milk', 2.5, 'note', false, null],
      ['123', 'Catty', 2.5, 'note', false, null]]
    }
  }
}
</script>
