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
          <el-input v-model="scope.row[column.prop]" size="small" @input="handleInput(scope.$index, column.prop, $event)"/>
        </template>
        <template v-else #default="scope">
          {{ scope.row[column.prop] }}
        </template>
      </el-table-column>
      <el-table-column
            fixed="right"
            label="Действия"
            width="120">
          <template #default="scope">
            <el-button
              size="mini"
              type="danger"
              @click="deleteRow(scope.$index)">Удалить</el-button>
          </template>
        </el-table-column>
    </el-table>
    <el-button
        plain type="primary"
        @click="addRow()"
        style="margin-top: 2rem;"
    >
      Добавить строку
    </el-button>
  </div>
</template>

<script>
import {formatFloat, formatInt} from "@/services/utils/format_input";

export default {
  props: {
    tableData: Array,
  },
  emits: ['add-row', 'delete-row', 'update-data'],
  methods: {
    addRow() {
      this.$emit('add-row');
    },
    deleteRow(index) {
      this.$emit('delete-row', index);
    },
    handleInput(index, column, value) {
      const intFormat = ['shipment_count', 'adjustment_count'];
      const floatFormat = ['plan_product_unit_costprice', 'plan_branging_unit_costprice', 'adjustment_price'];
      const adjustmentPrice = ['adjustment_price'];
      if(intFormat.includes(column)){
        value = formatInt(value);
        console.log(value);
      } else if (floatFormat.includes(column)) {
        value = formatFloat(value);
        console.log(value);
      } else if (adjustmentPrice.includes(column)) {
        this.$emit('chain-function', { index });
      }
      this.tableData[index][column] = value;  
      this.$emit('update-data', { index, column, value });
    },
  },
  data() {
    return {
      columns: [
        {prop: 'name', label: 'Наименование', width: 180, fixed: 'left', editable: true},
        {prop: 'description', label: 'Описание', width: 200, editable: true},
        {prop: 'shipment_count', label: 'Тираж (отгрузка)', width: 100, editable: true},
        {prop: 'adjustment_count', label: 'Тираж (приладка)', width: 100, editable: true},
        {prop: 'branding_info', label: 'Информация о нанесении', width: 180, editable: true},
        {prop: 'shipment_location_id', label: 'Склад отгрузки', width: 150, editable: true},
        {prop: 'plan_product_unit_costprice', label: 'Себестоимость товара за ед.', width: 180, editable: true},
        {prop: 'plan_branging_unit_costprice', label: 'Себестоимость нанесения за ед.', width: 200, editable: true},
        {prop: 'total_cost_per_unit', label: 'Себестоимость итого за ед.', width: 180, editable: false},
        {prop: 'total_cost_for_circulation', label: 'Себестоимость итого за тираж', width: 200, editable: false},
        {prop: 'markup_for_additional_costs', label: 'Наценка за доп.затраты', width: 180, editable: false},
        {prop: 'adjustment_price', label: 'Корректировка цены', width: 150, editable: true},
        {prop: 'price_per_unit_for_client', label: 'Цена для клиента за ед.', width: 180, editable: false},
        {prop: 'price_for_circulation_for_client', label: 'Цена для клиента за тираж', width: 200, editable: false},
        {prop: 'margin', label: 'Маржа', width: 100, editable: false},
        {prop: 'margin_percent', label: 'Маржинальность', width: 140, editable: false},
      ]
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
