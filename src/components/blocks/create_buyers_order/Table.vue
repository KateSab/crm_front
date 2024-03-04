<!-- сделать колонку со ссылками кликабельной -->

<template>
  <el-container style="margin-top: 2rem;">
  <el-table :data="tableData" style="width: 100%" size="small">
    <el-table-column v-for="column in tableColumns" :key="column.prop" :prop="column.prop" :label="column.label" :width="column.width">
      <template #default="{ row }">
        <template v-if="!row.editing || column.editable === false">{{ row[column.prop] }}</template>
        <template v-else>
          <template v-if="column.type === 'select'">
            <el-select v-model="row[column.prop]" class="m-2">
              <el-option
                v-for="item in column.options"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </template>
          <template v-else>
            <el-input v-model="row[column.prop]" :disabled="!column.editable" @input="handleInput(row, column.prop)" />
          </template>
        </template>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="" width="120">
      <template #default="{ row, $index }">
        <el-button link type="primary" size="small" @click="deleteRow($index)">
          <el-icon size="medium"><Delete /></el-icon>
        </el-button>
        <el-button v-if="!row.editing" link type="primary" size="small" @click="editRow(row)">
          <el-icon size="medium"><Edit /></el-icon>
        </el-button>
        <el-button v-if="row.editing" link type="primary" size="small" @click="saveRow(row)">Сохранить</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-footer>
    <el-button style="width: 40%; margin-top: 1rem;" type="primary" @click="onAddItem">Добавить товар</el-button>
  </el-footer>
</el-container>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { Delete } from '@element-plus/icons-vue'
import { Edit } from '@element-plus/icons-vue'

export default {
  name: 'Table',
}
</script>  

<script setup>

const tableData = ref([
  {
    name: 'Папка-конверт А4',
    link: 'https://www.koderhq.com/tutorial/vue/http-axios/#get',
    edition: '400',
    supplier: 'Оазис',
    type_of_application: 'Тампопечать',
    contractor: 'Нанесение у поставщика',
    cost_price_of_good: '39,28',
    cost_of_application_price: '0',
    cost_price: '39,28',  //поле с формулой расчета
    rrc_per_one: '56',
    rrc_global: '22 400',  //поле с формулой расчета
    marginality: '6 400',  //поле с формулой расчета
    marginality_in_percents: '28,57',
    editing: false,
  }
]);

const tableColumns = ref([
  { prop: 'name', label: 'Наименование', width: '125', editable: true },
  { prop: 'link', label: 'Описание', width: '120', editable: true },
  { prop: 'edition', label: 'Тираж', width: '60', editable: true },
  { prop: 'supplier', label: 'Поставщик', width: '100', editable: true, type: 'select', options: [
    { value: 'Оазис', label: 'Оазис' },
    { value: 'ПромТорг', label: 'ПромТорг' },
    { value: 'Альфа-Комплект', label: 'Альфа-Комплект' },
  ] },
  { prop: 'type_of_application', label: 'Вид нанесения', width: '150', editable: true, type: 'select', options: [
    { value: 'Тампопечать', label: 'Тампопечать' },
    { value: 'Лазерная гравировка', label: 'Лазерная гравировка' },
    { value: 'Термотрансфер', label: 'Термотрансфер' }
  ] },
  { prop: 'contractor', label: 'Подрядчик', width: '120', editable: true, type: 'select', options: [
    { value: 'Нанесение у поставщика', label: 'Нанесение у поставщика' },
    { value: 'Собственное нанесение', label: 'Собственное нанесение' },
    { value: 'Аутсорсинговая компания', label: 'Аутсорсинговая компания' }
  ] },
  { prop: 'cost_price_of_good', label: 'СС товара руб.', width: '80', editable: true },
  { prop: 'cost_of_application_price', label: 'СС нанесения руб.', width: '60', editable: true },
  { prop: 'cost_price', label: 'СС итого руб.', width: '80', editable: false }, // без возможности редактирования
  { prop: 'rrc_per_one', label: 'РРЦ / шт. руб.', width: '80', editable: true },
  { prop: 'rrc_global', label: 'РРЦ итого руб.', width: '100', editable: true },
  { prop: 'marginality', label: 'Маржа руб.', width: '100', editable: false }, // без возможности редактирования
  { prop: 'marginality_in_percents', label: 'Маржинальность %', width: '80', editable: false }, // без возможности редактирования
]);

const calculateCostPrice = (row) => {
  const costPriceOfGood = parseFloat(row.cost_price_of_good.replace(',', '.'));
  const costOfApplicationPrice = parseFloat(row.cost_of_application_price.replace(',', '.'));
  const edition = parseFloat(row.edition.replace(',', '.'));
  return (costPriceOfGood + costOfApplicationPrice) * edition;
};

const calculateRRCGlobal = (row) => {
  const rrcPerOne = parseFloat(row.rrc_per_one.replace(',', '.'));
  const edition = parseFloat(row.edition.replace(',', '.'));
  return rrcPerOne * edition;
};

const calculateMarginality = (row) => {
  const costPriceOfGood = parseFloat(row.cost_price_of_good.replace(',', '.'));
  const rrcPerOne = parseFloat(row.rrc_per_one.replace(',', '.'));
  const edition = parseFloat(row.edition.replace(',', '.'));
  return (rrcPerOne - costPriceOfGood) * edition;
};

const calculateMarginalityInPercents = (row) => {
  const costPriceOfGood = parseFloat(row.cost_price_of_good.replace(',', '.'));
  const rrcPerOne = parseFloat(row.rrc_per_one.replace(',', '.'));
  return ((rrcPerOne - costPriceOfGood) / rrcPerOne) * 100;
};

const handleInput = (row, prop) => {
  if (prop === 'cost_price_of_good' || prop === 'cost_of_application_price') {
    row.cost_price = calculateCostPrice(row);
  }
  if (prop === 'rrc_per_one' || prop === 'edition') {
    row.rrc_global = calculateRRCGlobal(row);
  }
  if (prop == 'cost_price_of_good' || prop == 'rrc_per_one' || prop == 'edition') {
    row.marginality = calculateMarginality(row);
  }
  if (prop == 'cost_price_of_good' || prop == 'rrc_per_one') {
    row.marginality_in_percents = calculateMarginalityInPercents(row);
  }
};

const deleteRow = (index) => {
  tableData.value.splice(index, 1);
};

const onAddItem = () => {
  tableData.value.push({
    name: '',
    link: '',
    edition: '',
    supplier: '',
    type_of_application: '',
    contractor: '',
    cost_price_of_good: '',
    cost_of_application_price: '',
    cost_price: '',  //поле с формулой расчета без возможности редактирования
    rrc_per_one: '',
    rrc_global: '',  //поле с формулой расчета, но с возможностью редактирования
    marginality: '',  //поле с формулой расчета без возможности редактирования
    marginality_in_percents: '',  //поле с формулой расчета без возможности редактирования
    editing: true,
  });
};

const editRow = (row) => {
  row.editing = true;
};

const saveRow = (row) => {
  row.editing = false;
};

defineExpose({
  // вместо define export переменных
})
// export { tableData, calculateCostPrice, calculateRRCGlobal, calculateMarginality, calculateMarginalityInPercents, handleInput, deleteRow, onAddItem, editRow, saveRow, tableColumns };
</script>

<style>
.el-table {
  font-size: small;
  font-weight: 200;
}

.el-table th div.cell {
  color: #3d9cfb;
}

.el-table_1_column_9, .el-table_1_column_11, .el-table_1_column_12,.el-table_1_column_13 {
  background-color: rgba(166, 166, 166, 0.418);
}

.el-table .el-table__row:hover .el-table_1_column_9,
.el-table .el-table__row:hover .el-table_1_column_11,
.el-table .el-table__row:hover .el-table_1_column_12,
.el-table .el-table__row:hover .el-table_1_column_13 {
  background-color: rgba(128, 128, 128, 0.418);
}

</style>