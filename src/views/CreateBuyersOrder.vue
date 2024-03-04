<template>
  <div>
    <Top />
  </div>
  <div class="create-buyers-order">
    <!-- OrderData -->
    <div>
        <el-row class="row-bg" justify="space-around">
            <el-colomn :span="8">
                <el-form
                    ref="ruleFormRef"
                    :model="ruleForm"
                    :rules="rules"
                    label-position="left"
                    size="small"
                    label-width="auto"
                    status-icon
                >
                    <el-form-item label="Номер сделки продажи" prop="id_deal">
                        <el-input v-model="ruleForm.id_deal" />
                    </el-form-item>
                    <el-form-item label="Клиент" prop="client">
                        <el-select v-model="ruleForm.client" placeholder="Клиент">
                            <el-option label="Клиент 1" value="client1" />
                            <el-option label="Клиент 2" value="client2" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Дата отгрузки (план)" required>
                        <el-form-item prop="date">
                            <el-date-picker
                                v-model="ruleForm.date"
                                type="date"
                                label="Pick a date"
                                placeholder="Pick a date"
                                style="width: 100%"
                            />
                        </el-form-item>
                    </el-form-item>
                </el-form>
            </el-colomn>
            <el-colomn :span="8">
                <el-form
                    ref="ruleFormRef"
                    :model="ruleForm"
                    :rules="rules"
                    label-position="left"
                    size="small"
                    label-width="auto"
                    status-icon
                >
                    <el-form-item label="Базовая наценка" prop="base_margin">
                        <el-input v-model="ruleForm.base_margin" />
                    </el-form-item>
                </el-form>
            </el-colomn>
            <el-colomn :span="8">
                <el-form
                    ref="ruleFormRef"
                    :model="ruleForm"
                    :rules="rules"
                    label-position="left"
                    size="small"
                    label-width="auto"
                    status-icon
                >
                    <el-form-item label="Расходы на перемещение" prop="costs_of_moving">
                        <el-input
                        v-model="ruleForm.costs_of_moving">
                        <template #append>руб.</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="Расходы на доставку" prop="costs_of_deliver">
                        <el-input 
                        v-model="ruleForm.costs_of_deliver">
                        <template #append>руб.</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="Прочие расходы" prop="another_costs">
                        <el-input 
                        v-model="ruleForm.another_costs">
                        <template #append>руб.</template>
                        </el-input>
                    </el-form-item>
                </el-form>
            </el-colomn>
        </el-row>
    </div>
    <!-- Table -->
    <div>
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
    </div>
    <!-- OrderInfo -->
    <div>
      <el-row class="row-bg" justify="space-around" :gutter="175" style="margin-top: 2rem;">
        <el-colomn :span="8">
            <el-form
                :model="ruleForm"
                label-position="top"
                size="small"
                label-width="auto"
            >
                <el-form-item label="Инструкция по сборке заказа">
                    <el-input v-model="ruleForm.instruction" :rows="4" type="textarea"/>
                </el-form-item>
            </el-form>
        </el-colomn>
        <el-colomn :span="8">
        </el-colomn>
        <el-colomn :span="8">
            <el-form
                :model="ruleForm"
                label-position="left"
                size="small"
                label-width="auto"
                class="base-color"
            >
                <el-form-item label="СС Итого" prop="costs_of_moving">
                    <el-input 
                    v-model="ruleForm.self_cost_total" disabled>
                    <template #append>руб.</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="РРЦ Итого" prop="costs_of_deliver">
                    <el-input 
                    v-model="ruleForm.rrc_total" disabled>
                    <template #append>руб.</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="Итого маржа" prop="another_costs">
                    <el-input 
                    v-model="ruleForm.marginality_total" disabled>
                    <template #append>руб.</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="Общая маржинальность" prop="another_costs">
                    <el-input 
                    v-model="ruleForm.marginality_total_in_percents" disabled>
                    <template #append>%</template>
                    </el-input>
                </el-form-item>
            </el-form>
        </el-colomn>
    </el-row>
    </div>
    <el-button @click="submitForm" type="primary" style="width: 70%; margin-top: 1rem;">Сформировать заказ</el-button>
  </div>
  <div>
      <p>id_deal: {{ ruleForm.id_deal }}</p>
      <p>client: {{ ruleForm.client }}</p>
      <p>date: {{ ruleForm.date }}</p>
      <p>base_margin: {{ ruleForm.base_margin }}</p>
      <p>costs_of_moving: {{ ruleForm.costs_of_moving }}</p>
      <p>costs_of_deliver: {{ ruleForm.costs_of_deliver }}</p>
      <p>another_costs: {{ ruleForm.another_costs }}</p>
      <p>instruction: {{ ruleForm.instruction }}</p>
      <p>self_cost_total: {{ ruleForm.self_cost_total }}</p>
      <p>rrc_total: {{ ruleForm.rrc_total }}</p>
      <p>marginality_total: {{ ruleForm.marginality_total }}</p>
    </div>
</template>

<script lang="ts">
import Top from '../components/blocks/create_buyers_order/Top.vue';
// import Table from '../components/blocks/create_buyers_order/Table.vue';
// import OrderData from '../components/blocks/create_buyers_order/OrderData.vue';
// import OrderInfo from '../components/blocks/create_buyers_order/OrderInfo.vue';

export default {
  name: 'CreateBuyersOrder',
  components: {
    Top,
    // Table,
    // OrderData, 
    // OrderInfo
  }
}
</script>

<script lang="ts" setup>
import { defineComponent, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus';

interface RuleForm {
  id_deal: string
  client: string
  date: string
  base_margin: string
  costs_of_moving: string
  costs_of_deliver: string
  another_costs: string

  instruction: string,
  self_cost_total: string,
  rrc_total: string,
  marginality_total: string,
  marginality_total_in_percents: string,

  // tableData: [string : string],
}

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  //шапка формы
  id_deal: '',
  client: '',
  date: '',
  base_margin: '',
  costs_of_moving: '',
  costs_of_deliver: '',
  another_costs: '',

  //общая информация и комментарий
  instruction: ' ',
  self_cost_total: '15712',
  rrc_total: '22400',
  marginality_total: '6400',
  marginality_total_in_percents: '28.57',

  //таблица общие переменные
  // tableData: [ 
  //   id_deal: '',
  //   client: '',
  //   date: '',
  //   base_margin: '',
  //   costs_of_moving: '',
  //   costs_of_deliver: '',
  //   another_costs: '',
  //   instruction: '',
  //   self_cost_total: '',
  //   rrc_total: '',
  //   marginality_total: '',
  //   marginality_total_in_percents: '',
  // ],

  //таблица референс
})

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

//функции для работы с входными данными

//функции для подсчета данных
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

//функции для обработки и валидации входных данных
//ввод данных
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

//удаление строки
const deleteRow = (index) => {
  tableData.value.splice(index, 1);
};

//добавление строки
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

//редактирование строки
const editRow = (row) => {
  row.editing = true;
};

//сохранение строки при редактировании
const saveRow = (row) => {
  row.editing = false;
};

//валидация ввода в шапку заказа
const rules = reactive<FormRules<RuleForm>>({
  id_deal: [
  { required: true, message: 'Введите номер сделки', trigger: 'blur' },
  { min: 8, max: 8, message: 'Номер должен состоять из 8 цифр', trigger: 'blur' },
  ],
  client: [
  {
        required: true,
  message: 'Выберите клиента',
  trigger: 'change',
  },
  ],
  date: [
  {
        type: 'date',
  required: true,
  message: 'Выберите дату отгрузки',
  trigger: 'change',
  },
  ],
  base_margin: [
  { required: true, message: 'Введите базовую наценку', trigger: 'blur' },
  ],
  costs_of_moving: [
  { required: true, message: 'Заполните поле', trigger: 'blur' },
  ],
  costs_of_deliver: [
  { required: true, message: 'Заполните поле', trigger: 'blur' },
  ],
  another_costs: [
  { required: true, message: 'Заполните поле', trigger: 'blur' },
  ],
})

//форматирование даты
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Месяцы начинаются с 0
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

//отправка данных на бек(без таблицы)
function submitForm() {
  ruleForm.date = formatDate(ruleForm.date);
  fetch('/api/customerorder/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ruleForm)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Order created:', data);
    // Дополнительные действия после успешной отправки формы, например, перенаправление на другую страницу
  })
  .catch(error => {
    console.error('There was an error creating the order:', error);
  });
}

</script>

<style>
.create-buyers-order {
  display: fixed;
  flex-direction: column;
  /* justify-content: right;  */
  align-items: center;
  margin: 1rem 2rem 2rem 2rem;
}

.el-form {
    width: 23rem;
    padding: 1rem;
    border-radius: 5px;
    background-color: #4d4d4d23;
  }

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

.base-color {
  background-color: #3d9cfb;
}
</style>