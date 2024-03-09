<template>
  <div>
    <Top />
  </div>
  <div class="create-buyers-order">
    <!-- OrderData -->
    <div>
        <el-row justify="space-around">
            <el-col :span="8">
                <el-form
                    ref="ruleFormRef"
                    :model="ruleForm"
                    :rules="rules"
                    label-position="left"
                    size="small"
                    label-width="auto"
                    status-icon
                >
                    <el-form-item label="Номер сделки продажи" prop="sell_order_id">
                        <el-input v-model="ruleForm.sell_order_id" />
                    </el-form-item>
                    <el-form-item label="Клиент" prop="client_id">
                        <el-select v-model="ruleForm.client_id">
                            <el-option v-for="client in options_clients" :label="client.name" :value="client.id" :key="client.id" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Дата отгрузки (план)" required>
                        <el-form-item prop="sgipment_date_planned">
                            <el-date-picker
                                v-model="ruleForm.shipment_date_planned"
                                type="date"
                                label="Pick a date"
                                placeholder="Pick a date"
                                style="width: 100%"
                            />
                        </el-form-item>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="8">
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
            </el-col>
            <el-col :span="8">
                <el-form
                    ref="ruleFormRef"
                    :model="ruleForm"
                    :rules="rules"
                    label-position="left"
                    size="small"
                    label-width="auto"
                    status-icon
                >
                    <el-form-item label="Расходы на перемещение" prop="delivery_cost_planned">
                        <el-input
                        v-model="ruleForm.delivery_cost_planned">
                        <template #append>руб.</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="Расходы на доставку" prop="shipment_cost_planned">
                        <el-input 
                        v-model="ruleForm.shipment_cost_planned">
                        <template #append>руб.</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="Прочие расходы" prop="other_expenses_planned">
                        <el-input 
                        v-model="ruleForm.other_expenses_planned">
                        <template #append>руб.</template>
                        </el-input>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
    <!-- Table -->
    <div>
        <el-container style="margin-top: 2rem;">
        <el-table :data="productsList" style="width: 100%" size="small">
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
      <el-row class="order-info" justify="space-between" style="margin-top: 2rem">
        <el-col :span="12">
            <el-form
                :model="ruleForm"
                label-position="top"
                size="small"
                label-width="auto"
            >
                <el-form-item label="Инструкция по сборке заказа">
                    <el-input v-model="ruleForm.instructions" :rows="4" type="textarea"/>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="12">
            <el-form
                :model="ruleForm"
                label-position="left"
                size="small"
                label-width="auto"
                class="base-color"
            >
                <el-form-item label="СС Итого" prop="delivery_cost_planned">
                    <el-input 
                    v-model="ruleForm.self_cost_total" disabled>
                    <template #append>руб.</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="РРЦ Итого" prop="shipment_cost_planned">
                    <el-input 
                    v-model="ruleForm.rrc_total" disabled>
                    <template #append>руб.</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="Итого маржа" prop="other_expenses_planned">
                    <el-input 
                    v-model="ruleForm.marginality_total" disabled>
                    <template #append>руб.</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="Общая маржинальность" prop="other_expenses_planned">
                    <el-input 
                    v-model="ruleForm.marginality_total_in_percents" disabled>
                    <template #append>%</template>
                    </el-input>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
    </div>
    <el-button @click="submitForm" type="primary" style="width: 70%; margin-top: 1rem;">Сформировать заказ</el-button>
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
  },
}
</script>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';
import { FormInstance, FormRules } from 'element-plus';
import store from '../store/index';
import {computed} from "vue";

// получаем всех клиентов для шапки
onMounted(() => {
      store.dispatch('get_clients')
        .then(() => {
          console.log("Got clients successfully");
        })
        .catch(error => {
          console.error("Failed to get clients:", error);
        });

        store.dispatch('get_contractors')
        .then(() => {
          console.log("Got contractors successfully");
        })
        .catch(error => {
          console.error("Failed to get contractors:", error);
        });
    });

    const options_clients = computed(() => {
      return store.state.clients;
    })

    const options_contractors = computed(() => {
      return store.state.contractors;
    })
// добавить запросы 

interface RuleForm {
  status_id: string

  sell_order_id: number
  client_id: number
  shipment_date_planned: string
  base_margin: number
  delivery_cost_planned: number
  shipment_cost_planned: number
  other_expenses_planned: number

  instructions: string,
  self_cost_total: number,
  rrc_total: number,
  marginality_total: number,
  marginality_total_in_percents: number,
}

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  status_id: '1',
  //шапка формы
  sell_order_id: 0,
  client_id: 0,
  shipment_date_planned: '',
  base_margin: 1.5,
  delivery_cost_planned: 0,
  shipment_cost_planned: 0,
  other_expenses_planned: 0,

  //общая информация и комментарий
  instructions: ' ',
  self_cost_total: 15712,
  rrc_total: 22400,
  marginality_total: 6400,
  marginality_total_in_percents: 28.57,
})

interface Product {
  name: string;
  link: string;
  edition: number;
  supplier: string;
  type_of_application: string;
  contractor: string;
  cost_price_of_good: number;
  cost_of_application_price: number;
  cost_price_global: number;
  rrc_per_one: number;
  rrc_global: number;
  marginality: number,  
  marginality_in_percents: number,
  editable: boolean;
}

// Референс списка продуктов
const productsList = ref<Product[]>([]);

// Функция для добавления нового продукта в список
function addProduct() {
  const newProduct: Product = {
    name: '',
    link: '',
    edition: 0,
    supplier: '',
    type_of_application: '',
    contractor: '',
    cost_price_of_good: 0,
    cost_of_application_price: 0,
    cost_price_global: 0,
    rrc_per_one: 0,
    rrc_global: 0,
    marginality: 0,
    marginality_in_percents: 0,
    editable: true,
  };
  productsList.value.push(newProduct);
}

const tableColumns = ref([
  { prop: 'name', label: 'Наименование', width: '125', editable: true },
  { prop: 'link', label: 'Описание', width: '120', editable: true },
  { prop: 'edition', label: 'Тираж', width: '60', editable: true },
  { prop: 'supplier', label: 'Поставщик', width: '100', editable: true, type: 'select', options: [
    'Оазис' ,
    'ПромТорг' ,
    'Альфа-Комплект' ,
  ] },
  { prop: 'type_of_application', label: 'Вид нанесения', width: '150', editable: true, type: 'select', options: [
    'Тампопечать',
    'Лазерная гравировка',
    'Термотрансфер'
  ] },
  { prop: 'contractor', label: 'Подрядчик', width: '120', editable: true, type: 'select', options: [] 
    
  },
  { prop: 'cost_price_of_good', label: 'СС товара руб.', width: '80', editable: true },
  { prop: 'cost_of_application_price', label: 'СС нанесения руб.', width: '60', editable: true },
  { prop: 'cost_price_global', label: 'СС итого руб.', width: '80', editable: false }, // без возможности редактирования
  { prop: 'rrc_per_one', label: 'РРЦ / шт. руб.', width: '80', editable: true },
  { prop: 'rrc_global', label: 'РРЦ итого руб.', width: '100', editable: true },
  { prop: 'marginality', label: 'Маржа руб.', width: '100', editable: false }, // без возможности редактирования
  { prop: 'marginality_in_percents', label: 'Маржинальность %', width: '80', editable: false }, // без возможности редактирования
]);

//функции для работы с входными данными

//функции для подсчета данных
const calculateCostPrice = (row) => {
  const costPriceOfGood = parseFloat(row.cost_price_of_good);
  const costOfApplicationPrice = parseFloat(row.cost_of_application_price);
  const edition = parseFloat(row.edition);
  const costPrice = parseFloat(((costPriceOfGood + costOfApplicationPrice) * edition).toFixed(2));
  return costPrice;
};

const calculateRRCGlobal = (row) => {
  const rrcPerOne = row.rrc_per_one;
  const edition = row.edition;
  const rrcGlobal = ((rrcPerOne * edition).toFixed(2));
  return rrcGlobal;
};

const calculateMarginality = (row) => {
  const costPriceGlobal = row.cost_price_global;
  const rrcGlobal = row.rrc_global;
  const marginality = ((rrcGlobal - costPriceGlobal).toFixed(2));
  return marginality;
};

const calculateMarginalityInPercents = (row) => {
  const costPriceGlobal = row.cost_price_global;
  const rrcGlobal = row.rrc_global;
  const marginalityInPercents = ((((rrcGlobal - costPriceGlobal) / rrcGlobal) * 100).toFixed(2));
  return marginalityInPercents;
};

//функции для обработки и валидации входных данных
//ввод данных
const handleInput = (row, prop) => {
  if (prop === 'cost_price_of_good' || prop === 'cost_of_application_price') {
    row.cost_price_global = calculateCostPrice(row);
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
  productsList.value.splice(index, 1);
};

//добавление строки
const onAddItem = () => {
  productsList.value.push({
    name: '',
    link: '',
    edition: 0,
    supplier: '',
    type_of_application: '',
    contractor: '',
    cost_price_of_good: 0,
    cost_of_application_price: 0,
    cost_price_global: 0,  //поле с формулой расчета без возможности редактирования
    rrc_per_one: 0,
    rrc_global: 0,  //поле с формулой расчета, но с возможностью редактирования
    marginality: 0,  //поле с формулой расчета без возможности редактирования
    marginality_in_percents: 0,  //поле с формулой расчета без возможности редактирования
    editable: true,
  });
};

//редактирование строки
const editRow = (row) => {
  row.editing = true;
};

//сохранение строки при редактировании
const saveRow = (row) => {
  row.editing = false;
  addProduct();
  console.log(productsList.value);
};

//валидация ввода в шапку заказа
const rules = reactive<FormRules<RuleForm>>({
  sell_order_id: [
  { required: true, message: 'Введите номер сделки', trigger: 'blur' },
  { min: 8, max: 8, message: 'Номер должен состоять из 8 цифр', trigger: 'blur' },
  ],
  client_id: [
  {
        required: true,
  message: 'Выберите клиента',
  trigger: 'change',
  },
  ],
  shipment_date_planned: [
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
  delivery_cost_planned: [
  { required: true, message: 'Заполните поле', trigger: 'blur' },
  ],
  shipment_cost_planned: [
  { required: true, message: 'Заполните поле', trigger: 'blur' },
  ],
  other_expenses_planned: [
  { required: true, message: 'Заполните поле', trigger: 'blur' },
  ],
})

//форматирование даты
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Месяцы начинаются с 0
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
}

//отправка данных на бек(без таблицы)
function submitForm() {
  ruleForm.shipment_date_planned = formatDate(ruleForm.shipment_date_planned);
  fetch('http://89.104.68.248:8000/api/customerorder/add', {
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
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 2rem 2rem 2rem;
}

.order-info {
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
}

.el-form {
    width: 23rem;
    margin: 2rem;
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