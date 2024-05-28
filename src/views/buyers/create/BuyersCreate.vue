<template>
  <div>
    <CreateTop title="Заказы покупателей"/>
  </div>
  <div v-if="clients.length > 0 && contractors.length > 0">
  <div class="create-buyers-order">
    <!-- OrderData -->
    <div>
        <el-row justify="space-around">
            <el-col :span="8">
                <el-form
                    :model="ruleForm"
                    label-position="left"
                    size="small"
                    label-width="auto"
                >
                    <el-form-item label="Номер сделки продажи" prop="sell_order_id">
                        <el-input v-model="ruleForm.sell_order_id" />
                    </el-form-item>
                    <el-form-item label="Клиент" prop="client_id">
                        <el-select v-model="ruleForm.client_id">
                            <el-option v-for="client in clients" :label="client.name" :value="client.id" :key="client.id" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Склад отгрузки" prop="shipment_location_id">
                        <el-select v-model="ruleForm.shipment_location_id">
                            <el-option v-for="shipment_location in shipment_locations" :label="shipment_location.name" :value="shipment_location.id" :key="shipment_location.id" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Дата отгрузки (план)" required>
                        <el-form-item prop="shipment_date_planned">
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
                    :model="ruleForm"
                    label-position="left"
                    size="small"
                    label-width="auto"
                >
                    <el-form-item label="Базовая наценка" prop="base_margin">
                        <el-input v-model="ruleForm.base_margin" />
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="8">
                <el-form
                    :model="ruleForm"
                    label-position="left"
                    size="small"
                    label-width="auto"
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
              <el-button link type="primary" size="small" @click="handleDeleteRow($index, productsList)">
                <el-icon size="medium"><Delete /></el-icon>
              </el-button>
              <el-button v-if="!row.editable" link type="primary" size="small" @click="handleEditRow(row)">
                <el-icon size="medium"><Edit /></el-icon>
              </el-button>
              <el-button v-if="row.editable" link type="primary" size="small" @click="() => { handleSaveRow(row); handleCalculateInfo(row); }">Сохранить</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-footer>
          <el-button style="width: 10rem; margin-top: 1rem;" type="primary" @click="handleOnAddItem()">Добавить товар</el-button>
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
    <el-button plain type="primary" @click="handleSubmitForm()">
      Сформировать заказ
    </el-button>
  </div>
</div>
<div v-else >
    <p >Загружаем данные...</p>
</div>

</template>

<script lang="ts">
import CreateTop from '@/components/CreateTop.vue';

export default {
  name: 'CreateBuyersOrder',
  components: {
    CreateTop,
  },
}
</script>

<script lang="ts" setup>
import { reactive, ref, onMounted} from 'vue';
import { submitForm } from '@/api/api_buyers_order_create';
import { fillTableColumns} from '@/services/utils/buyers_order_utils';
import { calculateCostPrice, calculateRRCGlobal, calculateMarginality, calculateMarginalityInPercents, calculateInfo } from '@/services/utils/buyers_order_utils';
import { IRuleForm, IProduct } from '@/interfaces/IBuyersOrder';
import { deleteRow, onAddItem, editRow, saveRow } from '@/services/utils/buyers_order_utils';
import { getClients, getShipmentLocations, getContractors, getSuppliers, getTypesOfApplications } from '@/api/api_helpers_partners';
import {Delete, Edit} from "@element-plus/icons-vue";


// переменные для хранения данных с бекенда
const clients = ref([]);
const shipment_locations = ref([]);
const contractors = ref([]);
let contractors_names = [];
let suppliers_names = [];
let types_of_applications_titles = [];
let tableColumns = ref([]);


// Загрузка данных при монтировании компонента
onMounted(async () => {
  try {
    clients.value = await getClients();
    console.log("Got clients successfully");

    shipment_locations.value = await getShipmentLocations();
    console.log("Got shipment locations successfully");

    contractors.value = await getContractors();
    contractors_names = contractors.value.map(contractor => ({ name: contractor.name, id: contractor.id }));

    suppliers_names = await getSuppliers();

    types_of_applications_titles = await getTypesOfApplications();
    console.log("Got types of applications successfully");

    // Заполнение таблицы
    fillTableColumns(tableColumns, suppliers_names, types_of_applications_titles, contractors_names);
  } catch (error) {
    console.error("Error loading data:", error);
    // Можно добавить обработку ошибок здесь, если нужно
  }
});

const ruleForm = reactive<IRuleForm>({
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

// Референс списка продуктов
const productsList = ref<IProduct[]>([]);

//функции для обработки и валидации входных данных
//ввод данных
const handleInput = (row, prop: string) => {
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
const handleDeleteRow = (index, productsList) => {
  deleteRow(index, productsList);
};

const handleOnAddItem = () => {
  onAddItem(productsList, ruleForm);
}

const handleEditRow = (row) => {
  editRow(row);
};

const handleSaveRow = (row) => {
  saveRow(row, productsList);
};

const handleCalculateInfo = (row) => {
  calculateInfo(row, ruleForm, productsList);
}

const handleSubmitForm = () => {
  submitForm(ruleForm, productsList);
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
  align-items: center;
}

.el-table th div {
  color: #3d9cfb;
}

.base-color {
  background-color: #3d9cfb;
}
</style>
