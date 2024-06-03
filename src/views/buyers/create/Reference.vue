<template>
  <div>
    <CreateTop title="Заказы покупателей"/>
  </div>
  <div class="create-buyers-order">
    <!-- Шапка -->
    <div style="width: 100%">
      <el-row>
        <el-col :span="20" class="top">
          <el-form
              label-position="left"
              size="small"
              label-width="auto"
          >
            <el-form-item label="Ссылка на сделку продажи">
              <el-input  v-model="myForm.sell_link"/>
            </el-form-item>
            <el-form-item label="Клиент">
              <el-select v-model="myForm.client_id">
                <el-option v-for="client in clients" :label="client.name" :value="client.id" :key="client.id" />
              </el-select>
            </el-form-item>
            <el-form-item label="Наценка">
              <el-input v-model="myForm.income_ratio"/>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <!-- Таблица -->
    Таблица
    <div class="table">
      <el-table
          :data="tableData"
          class="vue-table"
          style="width: 100%; overflow-x: auto"
          border
          highlight-current-row
      >
        <el-table-column v-for="column in columns" :key="column.prop" :prop="column.prop" :label="column.label" :width="column.width" :fixed="column.fixed">
          <template #default="scope">
            <el-input v-model="scope.row[column.prop]" size="small"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-button @click="handleAddRow()" style="margin-top: 1rem;">Добавить строку</el-button>
    </div>
    <!-- Подвал -->
    <div class="bottom">
      <el-row style="justify-content: space-between; align-items: flex-start;">
        <el-col :span="12" class="bottom-form">
          <el-form
              label-position="left"
              size="small"
              label-width="auto"
          >
            <el-form-item label="УК">
              <el-input disabled>
                <template #append>₽</template>
              </el-input>
            </el-form-item>
            <el-form-item label="Оплата за склад">
              <el-input
                  v-model="myForm.store_cost"
                  :formatter="(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')"
                  :parser="(value) => value.replace(/\s/g, '').replace(/,/g, '.')"
              >
                <template #append>₽</template>
              </el-input>
            </el-form-item>
            <el-form-item label="Доставка от поставщика (план)">
              <el-input
                  v-model="myForm.plan_delivery_cost"
                  :formatter="(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')"
                  :parser="(value) => value.replace(/\s/g, '').replace(/,/g, '.')"
              >
                <template #append>₽</template>
              </el-input>
            </el-form-item>
            <el-form-item label="Перемещения при производстве (план)">
              <el-input
                  v-model="myForm.plan_moves_cost"
                  :formatter="(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')"
                  :parser="(value) => value.replace(/\s/g, '').replace(/,/g, '.')"
              >
                <template #append>₽</template>
              </el-input>
            </el-form-item>
            <el-form-item label="Дизайн (план)">
              <el-input
                  v-model="myForm.plan_design_cost"
                  :formatter="(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')"
                  :parser="(value) => value.replace(/\s/g, '').replace(/,/g, '.')"
              >
                <template #append>₽</template>
              </el-input>
            </el-form-item>
            <el-form-item label="Сборщики (студенты) (план)">
              <el-input
                  v-model="myForm.plan_workers_cost"
                  :formatter="(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')"
                  :parser="(value) => value.replace(/\s/g, '').replace(/,/g, '.')"
              >
                <template #append>₽</template>
              </el-input>
            </el-form-item>
            <el-form-item label="Доставка до клиента (план)">
              <el-input
                  v-model="myForm.plan_shipment_cost"
                  :formatter="(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')"
                  :parser="(value) => value.replace(/\s/g, '').replace(/,/g, '.')"
              >
                <template #append>₽</template>
              </el-input>
            </el-form-item>
            <el-form-item label="Прочие расходы (план)">
              <el-input
                  v-model="myForm.plan_other_expenses"
                  :formatter="(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')"
                  :parser="(value) => value.replace(/\s/g, '').replace(/,/g, '.')"
              >
                <template #append>₽</template>
              </el-input>
            </el-form-item>
            <el-form-item label="Сделка с маркетинга">
              <div class="inline-elements">
                <el-checkbox v-model="myForm.is_from_marketing" size="default"></el-checkbox>
                <el-input disabled>
                  <template #append>₽</template>
                </el-input>
              </div>
            </el-form-item>
            <el-form-item label="Итого доп.затрат">
              <el-input disabled>
                <template #append>₽</template>
              </el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12" class="bottom-form">
          <el-form
              label-position="left"
              size="small"
              label-width="auto"
          >
            <el-form-item label="Себестоимость всего заказа">
              <el-input
                  disabled>
                <template #append>₽</template>
              </el-input>
            </el-form-item>
            <el-form-item label="Цена всего заказа для клиента">
              <el-input
                  disabled>
                <template #append>₽</template>
              </el-input>
            </el-form-item>
            <el-form-item label="Маржа по заказу">
              <el-input
                  disabled>
                <template #append>₽</template>
              </el-input>
            </el-form-item>
            <el-form-item label="Маржинальность по заказу">
              <el-input
                  disabled>
                <template #append>%</template>
              </el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <el-button plain type="primary" @click="handleSubmit()" style="margin-top: 2rem;">
      Сформировать заказ
    </el-button>
  </div>
  <!--<div v-else >-->
  <!--    <p >Загружаем данные...</p>-->
  <!--</div>-->

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
import {ref, onMounted, reactive} from 'vue';
import { ElTable, ElTableColumn, ElInput } from 'element-plus'
import {  getTypesOfApplications } from '@/api/api_helpers_partners';
import { getLocationsApi } from "@/api/api_locations";
import {getPartnersApi} from "@/api/api_partners_get";
import {ICustomerOrderCreate} from "@/interfaces/ICustomerOrder";


// переменные для хранения данных с бекенда
const clients = ref([]);
const shipment_locations = ref([]);
const contractors = ref([]);
const suppliers = ref([]);
let types_of_applications_titles = [];

// Загрузка данных при монтировании компонента
onMounted(async () => {
  try {
    clients.value = await getPartnersApi(1000, 'is_other');
    shipment_locations.value = await getLocationsApi();
    contractors.value = await getPartnersApi(1000, 'is_contractor');
    suppliers.value = await getPartnersApi(1000, 'is_supplier');
    types_of_applications_titles = await getTypesOfApplications();
    console.log("Got data successfully");
  } catch (error) {
    console.error("Error loading data:", error);
  }
});

// Форма данных без таблицы
const myForm = reactive<ICustomerOrderCreate> ({
  creator_id: 12,
  client_id: undefined,
  sell_link: '',
  income_ratio: 1.5, //наценка
  plan_delivery_cost: undefined, //Стоимость доставки от поставщика (план)
  plan_moves_cost: undefined, //Стоимость доставок при производстве (план)
  plan_shipment_cost: undefined, //Стоимость доставки до клиента (план)
  plan_design_cost: undefined, //Стоимость дизайнерских работ (план)
  plan_workers_cost: undefined, //Стоимость наемных сотрудников (план)
  plan_other_expenses: undefined, //Стоимость прочих расходов (план)
  is_from_marketing: false, //сделка с маркетинга

  UK: undefined, //УК
  store_cost: undefined, //Оплата за склад
  is_from_marketing_cost: undefined, //Сделка с маркетинга
  sum_cost: undefined, //Итого доп.затрат

  self_order_cost: undefined, //Себестоимость всего заказа
  sum_client_cost: undefined, //Цена всего заказа для клиента
  margin_cost: undefined, //Маржа по заказу
  margin_percent: undefined, //Маржинальность по заказу
})

//Данные таблицы
const emptyRow = {
  name: '',
  description: '',
  circulationShipment: '',
  circulationSetup: '',
  applicationInfo: '',
  warehouse: '',
  costPerUnit: '',
  applicationCostPerUnit: '',
  totalCostPerUnit: '',
  totalCostForCirculation: '',
  markupForAdditionalCosts: '',
  priceAdjustment: '',
  pricePerUnitForClient: '',
  priceForCirculationForClient: '',
  margin: '',
  marginPercentage: '',
};

const tableData = ref([
  {...emptyRow},
])

//Наименования и структура колонок
const columns = ref([
  { prop: 'name', label: 'Наименование', width: 180, fixed: 'left', editable: true },
  { prop: 'description', label: 'Описание', width: 200, editable: true },
  { prop: 'circulationShipment', label: 'Тираж (отгрузка)', width: 100, editable: true },
  { prop: 'circulationSetup', label: 'Тираж (приладка)', width: 100, editable: true },
  { prop: 'applicationInfo', label: 'Информация о нанесении', width: 180, editable: true },
  { prop: 'warehouse', label: 'Склад отгрузки', width: 150, editable: true },
  { prop: 'costPerUnit', label: 'Себестоимость товара за ед.', width: 180, editable: true },
  { prop: 'applicationCostPerUnit', label: 'Себестоимость нанесения за ед.', width: 200, editable: true },
  { prop: 'totalCostPerUnit', label: 'Себестоимость итого за ед.', width: 180, editable: false },
  { prop: 'totalCostForCirculation', label: 'Себестоимость итого за тираж', width: 200, editable: false },
  { prop: 'markupForAdditionalCosts', label: 'Наценка за доп.затраты', width: 180, editable: false },
  { prop: 'priceAdjustment', label: 'Корректировка цены', width: 150, editable: true },
  { prop: 'pricePerUnitForClient', label: 'Цена для клиента за ед.', width: 180, editable: false },
  { prop: 'priceForCirculationForClient', label: 'Цена для клиента за тираж', width: 200, editable: false },
  { prop: 'margin', label: 'Маржа', width: 100, editable: false },
  { prop: 'marginPercentage', label: 'Маржинальность', width: 140, editable: false },
])

const handleAddRow = () => {
  tableData.value.push({...emptyRow})
}

const handleSubmit = () => {
  console.log(myForm)
}
</script>

<style scoped>
.create-buyers-order {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 2rem 2rem 2rem;
}

.top {
  max-width: 500px;
  min-width: 250px;
  margin-left: 2rem;
  padding: 1rem 1rem 0;
  background-color: #dcdfe6;
}

.table {
  width: 100%;
  margin-top: 2rem;
}

.bottom {
  width: 100%;
  margin-top: 2rem;
}

.bottom-form {
  max-width: 600px;
  margin: 0 2rem;
  padding: 1rem 1rem 0;
  background-color: #dcdfe6;
}

.inline-elements {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
