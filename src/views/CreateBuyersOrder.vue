<template>
  <div>
    <Top />
  </div>
  <div v-if="clients.length > 0 && contractors.length > 0">
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
                            <el-option v-for="client in clients" :label="client.name" :value="client.id" :key="client.id" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Склад отгрузки" prop="shipment_lacation_id">
                        <el-select v-model="ruleForm.shipment_location_id">
                            <el-option v-for="shipment_location in shipment_locations" :label="shipment_location.name" :value="shipment_location.id" :key="shipment_location.id" />
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
              <template v-if="!row.editable || column.editable === false">{{ row[column.prop] }}</template>
              <template v-else>
                <template v-if="column.type === 'select'">
                  <el-select v-model="row[column.prop]" class="m-2">
                    <el-option
                      v-for="item in column.options"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
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
              <el-button v-if="!row.editable" link type="primary" size="small" @click="editRow(row)">
                <el-icon size="medium"><Edit /></el-icon>
              </el-button>
              <el-button v-if="row.editable" link type="primary" size="small" @click="saveRow(row), calculateInfo(row)">Сохранить</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-footer>
          <el-button style="width: 10rem; margin-top: 1rem;" type="primary" @click="onAddItem">Добавить товар</el-button>
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
                <el-form-item label="СС Итого" prop="self_cost_total">
                    <el-input 
                    v-model="ruleForm.self_cost_total" disabled>
                    <template #append>руб.</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="РРЦ Итого" prop="rrc_total">
                    <el-input 
                    v-model="ruleForm.rrc_total" disabled>
                    <template #append>руб.</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="Итого маржа" prop="marginality_total">
                    <el-input 
                    v-model="ruleForm.marginality_total" disabled>
                    <template #append>руб.</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="Общая маржинальность" prop="marginality_total_in_percents">
                    <el-input 
                    v-model="ruleForm.marginality_total_in_percents" disabled>
                    <template #append>%</template>
                    </el-input>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
    </div>
    <!-- <el-button @click="submitForm" type="primary" style="width: 70%; margin-top: 1rem;">Сформировать заказ</el-button>
    <el-button @click="submitTableForm" type="primary" style="width: 70%; margin-top: 1rem;">Отправить данные таблички</el-button> -->
    <el-button plain type="primary" @click="submitCreateOrder = true">
      Сформировать заказ
    </el-button>

    <el-dialog v-model="submitCreateOrder" title="Подтвердить создание заказа?" width="500" align-center>
      <span>
        Убедитесь, что все поля заполнены верно
      </span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="submitCreateOrder = false">Отмена</el-button>
          <el-button type="primary" @click="submitForm(), submitCreateOrder = false">
            Подтвердить
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</div>
<div v-else >
    <p >Загружаем данные...</p>
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
import { reactive, ref, onMounted, toRaw } from 'vue';
import { FormInstance, FormRules } from 'element-plus';
import store from '../store/index';
import router from '../router';
import { ElNotification } from 'element-plus';
// import {computed} from "vue";
// import {get_requests} from '../my_modules/requests';

const submitCreateOrder = ref(false)

const success_notification = (order_id) => {
  ElNotification({
    title: 'Успешно',
    message: 'Заказ  №' + order_id + ' сформирован',
    type: 'success',
    position: 'bottom-right',
  })
}

const error_notification = (error) => {
  ElNotification({
    title: 'Ошибка',
    message: 'Не удалось сформировать заказ' + error,
    type: 'error',
    position: 'bottom-right',
  })
}

// переменные для хранения данных с бекенда
const clients = ref([]);
const shipment_locations = ref([]);
const contractors = ref([]);
const suppliers = ref([]);
const types_of_applications = ref([]);
let contractors_names = [];
let suppliers_names = [];
let types_of_applications_titles = [];
let tableColumns = ref([]);
let order_id = null;

// получаем актуальные данные с бекенда и записываем их в переменные
onMounted(async () => {
        await store.dispatch('get_clients')
        .then(() => {
          console.log("Got clients successfully");
          clients.value = store.state.clients;
        })
        .catch(error => {
          console.error("Failed to get clients:", error);
        });

        await store.dispatch('get_shipment_locations')
        .then(() => {
          console.log("Got shipment locations successfully");
          shipment_locations.value = store.state.shipment_locations;
        })
        .catch(error => {
          console.error("Failed to get shipment loctions:", error);
        });

        await store.dispatch('get_contractors')
        .then(() => {
          console.log("Got contractors successfully");
          contractors.value = store.state.contractors;
          contractors_names = contractors.value.map(contractor => ({ name: contractor.name, id: contractor.id }));
          console.log("contractors names: ",contractors_names);
        })
        .catch(error => {
          console.error("Failed to get contractors:", error);
        });

        await store.dispatch('get_suppliers')
        .then(() => {
          console.log("Got suppliers successfully");
          suppliers.value = store.state.suppliers;
          suppliers_names = suppliers.value.map(supplier => ({name: supplier.name, id: supplier.id}));
          console.log("suppliers names: ",suppliers_names);
        })
        .catch(error => {
          console.error("Failed to get suppliers:", error);
        });

        await store.dispatch('get_types_of_applications')
        .then(() => {
          console.log("Got types of applications successfully");
          types_of_applications.value = store.state.typesOfApplications;
          types_of_applications_titles = types_of_applications.value.map(type_of_application => ({name: type_of_application.title, id: type_of_application.id}));
          console.log("types of applications titles: ",types_of_applications_titles);
        })
        .catch(error => {
          console.error("Failed to get types of applications titles:", error);
        });

        // заполняем таблицу
        tableColumns = ref([
          { prop: 'name', label: 'Наименование', width: '125', editable: true },
          { prop: 'design_link', label: 'Описание', width: '120', editable: true },
          { prop: 'count', label: 'Тираж', width: '60', editable: true },
          { prop: 'planned_supplier_id', label: 'Поставщик', width: '100', editable: true, type: 'select', options: suppliers_names },
          { prop: 'planned_type_of_branding_id', label: 'Вид нанесения', width: '150', editable: true, type: 'select', options: types_of_applications_titles },
          { prop: 'planned_contractor_id', label: 'Подрядчик', width: '120', editable: true, type: 'select', options: contractors_names },
          { prop: 'product_cost_price_planned', label: 'СС товара руб.', width: '80', editable: true },
          { prop: 'branding_cost_price_planned', label: 'СС нанесения руб.', width: '60', editable: true },
          { prop: 'cost_price_global', label: 'СС итого руб.', width: '80', editable: false }, // без возможности редактирования
          { prop: 'price', label: 'РРЦ / шт. руб.', width: '80', editable: true },
          { prop: 'rrc_global', label: 'РРЦ итого руб.', width: '100', editable: true },
          { prop: 'marginality', label: 'Маржа руб.', width: '100', editable: false }, // без возможности редактирования
          { prop: 'marginality_in_percents', label: 'Маржинальность %', width: '80', editable: false }, // без возможности редактирования
        ]);
        
});

interface RuleForm {
  status_id: number

  sell_order_id: number
  client_id: number
  shipment_location_id: number
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
  status_id: 1,
  //шапка формы
  sell_order_id: null,
  client_id: null,
  shipment_location_id: null,
  shipment_date_planned: '',
  base_margin: 1.5,
  delivery_cost_planned: null,
  shipment_cost_planned: null,
  other_expenses_planned: null,

  //общая информация и комментарий
  instructions: ' ',
  self_cost_total: null,
  rrc_total: null,
  marginality_total: null,
  marginality_total_in_percents: null,
})

interface Product {
  name: string;
  design_link: string;
  count: number;
  shipment_location_id: number;
  planned_supplier_id: number;
  planned_type_of_branding_id: number;
  planned_contractor_id: number;
  product_cost_price_planned: number;
  branding_cost_price_planned: number;
  cost_price_global: number;
  price: number;
  rrc_global: number;
  marginality: number,  
  marginality_in_percents: number,
  editable: boolean;
}

// Референс списка продуктов
const productsList = ref<Product[]>([]);

//функции для работы с входными данными

//функция для подсчета общей суммы себестоимости продукта
const calculateCostPrice = (row) => {
  const costPriceOfGood = parseFloat(row.product_cost_price_planned);
  const costOfApplicationPrice = parseFloat(row.branding_cost_price_planned);
  const count = parseFloat(row.count);
  const costPrice = parseFloat(((costPriceOfGood + costOfApplicationPrice) * count).toFixed(2));
  return costPrice;
};

//функция для подсчета общей стоимости РРЦ
const calculateRRCGlobal = (row) => {
  const rrcPerOne = parseFloat(row.price);
  const count = parseFloat(row.count);
  const rrcGlobal = parseFloat((rrcPerOne * count).toFixed(2));
  return rrcGlobal;
};

//функция для подсчета маржи в рублях
const calculateMarginality = (row) => {
  const costPriceGlobal = parseFloat(row.cost_price_global);
  const rrcGlobal = parseFloat(row.rrc_global);
  const marginality = parseFloat((rrcGlobal - costPriceGlobal).toFixed(2));
  return marginality;
};

//функция для подсчета маржи в процентах
const calculateMarginalityInPercents = (row) => {
  const costPriceGlobal = parseFloat(row.cost_price_global);
  const rrcGlobal = parseFloat(row.rrc_global);
  const marginalityInPercents = parseFloat((((rrcGlobal - costPriceGlobal) / rrcGlobal) * 100).toFixed(2));
  return marginalityInPercents;
};

//функции для обработки и валидации входных данных
//ввод данных
const handleInput = (row, prop) => {
  if (prop === 'product_cost_price_planned' || prop === 'branding_cost_price_planned') {
    row.cost_price_global = calculateCostPrice(row);
  }
  if (prop === 'price' || prop === 'count') {
    row.rrc_global = calculateRRCGlobal(row);
  }
  if (prop == 'product_cost_price_planned' || prop == 'price' || prop == 'count') {
    row.marginality = calculateMarginality(row);
  }
  if (prop == 'product_cost_price_planned' || prop == 'price') {
    row.marginality_in_percents = calculateMarginalityInPercents(row);
  }
};

// функция для подсчета итоговых значений по заказу
const calculateInfo = (row) => {
  ruleForm.self_cost_total += row.cost_price_global;
  ruleForm.rrc_total += row.rrc_global;
  ruleForm.marginality_total += row.marginality;
  console.log("count of raws: ", productsList.value.length);
  ruleForm.marginality_total_in_percents = parseFloat((((ruleForm.rrc_total - ruleForm.self_cost_total) / ruleForm.rrc_total) * 100).toFixed(2));
}

//удаление строки
const deleteRow = (index) => {
  productsList.value.splice(index, 1);
};

//добавление строки
const onAddItem = () => {
  productsList.value.push({
    name: '',
    design_link: '',
    count: null,
    shipment_location_id: ruleForm.shipment_location_id,
    planned_supplier_id: null, // изменено на supplier_id
    planned_type_of_branding_id: null, // изменено на type_of_application_id
    planned_contractor_id: null, // изменено на contractor_id
    product_cost_price_planned: null,
    branding_cost_price_planned: null,
    cost_price_global: null,  //поле с формулой расчета без возможности редактирования
    price: null,
    rrc_global: null,  //поле с формулой расчета, но с возможностью редактирования
    marginality: null,  //поле с формулой расчета без возможности редактирования
    marginality_in_percents: null,  //поле с формулой расчета без возможности редактирования
    editable: true,
  });
};

//редактирование строки
const editRow = (row) => {
  row.editable = true;
};

//сохранение строки при редактировании
const saveRow = (row) => {
  row.editable = false;
  // addProduct();
  console.log("данные добавленного продукта: ", productsList.value);
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
  shipment_location_id: [
  {
        required: true,
  message: 'Выберите место отгрузки',
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
    order_id = data.id;
    console.log('Received order id:', order_id);
    submitTableForm();
    console.log('Заказ сформирован. ID: ', order_id);
    success_notification(order_id);
    router.push({ path: '/buyers' });
  })
  .catch(error => {
    console.error('There was an error creating the order:', error);
    error_notification(error);
  });
}

function submitTableForm() {
  const requestBody = {
    buyer_order_id: order_id,
    products: toRaw(productsList.value)
  };

  fetch('http://89.104.68.248:8000/api/products/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Products added successfully:', data);
    success_notification(order_id);
  })
  .catch(error => {
    console.error('Error adding products:', error);
    error_notification(error);
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

.el-table_1_column_10, .el-table_1_column_12, .el-table_1_column_13,.el-table_1_column_14 {
  background-color: rgba(166, 166, 166, 0.418);
}

.el-table .el-table__row:hover .el-table_1_column_10,
.el-table .el-table__row:hover .el-table_1_column_12,
.el-table .el-table__row:hover .el-table_1_column_13,
.el-table .el-table__row:hover .el-table_1_column_14 {
  background-color: rgba(128, 128, 128, 0.418);
}

.base-color {
  background-color: #3d9cfb;
}

.example-showcase .el-loading-mask {
  z-index: 9;
}


</style>