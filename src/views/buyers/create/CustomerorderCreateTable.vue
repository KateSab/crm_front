<template>
  <div class="table">
    <el-table
        :data="tableData"
        class="vue-table"
        style="width: 100%; overflow-x: auto"
        border
        highlight-current-row
    >
      <el-table-column
          v-for="column in columns"
          :key="column.prop"
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
          :fixed="column.fixed"
      >
        <template v-if="column.editable" #default="scope">
          <el-input v-model="scope.row[column.prop]" size="small" @input="handleInput(scope.$index, column.prop, $event)" />
        </template>
        <template v-else #default="scope">
          {{ scope.row[column.prop] }}
        </template>
      </el-table-column>
    </el-table>
    <el-button
        plain type="primary"
        @click="addRow"
        style="margin-top: 2rem;"
    >
      Добавить строку
    </el-button>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  props: {
    tableData: Array,
  },
  emits: ['add-row', 'update-data'],
  methods: {
    addRow() {
      this.$emit('add-row');
    },
    handleInput(index, column, value) {
      // Клонируем данные, чтобы избежать мутации пропсов напрямую
      const newData = [...this.tableData];
      newData[index][column] = value;
      this.$emit('update-data', newData);
    }
  },
  data() {
    return {
      columns: ref([
        {prop: 'name', label: 'Наименование', width: 180, fixed: 'left', editable: true},
        {prop: 'description', label: 'Описание', width: 200, editable: true},
        {prop: 'circulationShipment', label: 'Тираж (отгрузка)', width: 100, editable: true},
        {prop: 'circulationSetup', label: 'Тираж (приладка)', width: 100, editable: true},
        {prop: 'applicationInfo', label: 'Информация о нанесении', width: 180, editable: true},
        {prop: 'warehouse', label: 'Склад отгрузки', width: 150, editable: true},
        {prop: 'costPerUnit', label: 'Себестоимость товара за ед.', width: 180, editable: true},
        {prop: 'applicationCostPerUnit', label: 'Себестоимость нанесения за ед.', width: 200, editable: true},
        {prop: 'totalCostPerUnit', label: 'Себестоимость итого за ед.', width: 180, editable: false},
        {prop: 'totalCostForCirculation', label: 'Себестоимость итого за тираж', width: 200, editable: false},
        {prop: 'markupForAdditionalCosts', label: 'Наценка за доп.затраты', width: 180, editable: false},
        {prop: 'priceAdjustment', label: 'Корректировка цены', width: 150, editable: true},
        {prop: 'pricePerUnitForClient', label: 'Цена для клиента за ед.', width: 180, editable: false},
        {prop: 'priceForCirculationForClient', label: 'Цена для клиента за тираж', width: 200, editable: false},
        {prop: 'margin', label: 'Маржа', width: 100, editable: false},
        {prop: 'marginPercentage', label: 'Маржинальность', width: 140, editable: false},
      ])
    }
  }
};
</script>

<style scoped>
.table {
  width: 100%;
  margin-top: 2rem;
}
</style>
