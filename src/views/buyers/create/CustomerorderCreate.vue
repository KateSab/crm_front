<template>
  <div>
    <CreateTop title="Заказы покупателей"/>
    <div class="create-buyers-order">
      <CustomerorderCreateHeader :formData="myForm" :clients="clients" @update-form="handleFormUpdate"/>
      <CustomerorderCreateTable
          :tableData="tableData"
          @add-row="handleAddRow"/>
      <CustomerorderCreateFuter :form-data="myForm" @update-form="handleFormUpdate"/>
    </div>
    <el-button
        plain
        type="primary"
        @click="handleSubmit()"
        style="margin-top: 2rem;"
    >
      Сформировать заказ
    </el-button>
    {{myForm}}
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive, ref} from 'vue';
import CreateTop from "@/components/CreateTop.vue";
import CustomerorderCreateHeader from '@/views/buyers/create/CustomerorderCreateHeader.vue';
import CustomerorderCreateFuter from "@/views/buyers/create/CustomerorderCreateFuter.vue";
import CustomerorderCreateTable from "@/views/buyers/create/CustomerorderCreateTable.vue";
import {ICustomerOrderCreate} from '@/interfaces/ICustomerOrder';
import {getLocationsApi} from '@/api/api_locations';
import {getPartnersApi} from '@/api/api_partners_get';

export default defineComponent({
  name: 'CustomerorderCreate',
  components: {
    CreateTop,
    CustomerorderCreateHeader,
    CustomerorderCreateTable,
    CustomerorderCreateFuter,
  },
  setup() {
    // Реактивные ссылки для данных, которые будут загружены
    const clients = ref([]);
    const warehouses = ref([]);

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

    // Инициализация данных таблицы с одной пустой строкой
    const tableData = ref([ {...emptyRow} ]);

    const handleAddRow = () => {
      tableData.value.push({ ...emptyRow });
    };

    // Асинхронная загрузка данных при монтировании
    onMounted(async () => {
      try {
        clients.value = await getPartnersApi(1000, 'is_other');
        warehouses.value = await getLocationsApi();
      } catch (error) {
        console.error("Error loading data:", error.message);
      }
    });

    return {
      clients,
      warehouses,
      tableData,
      handleAddRow,
    };
  },
  data() {
    return {
      // Форма данных без таблицы
      myForm: reactive<ICustomerOrderCreate>({
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
      }),
    };
  },
  methods: {
    handleFormUpdate({ field, value }) {
      this.myForm[field] = value;
    },
    handleSubmit() {
      console.log(this.myForm);
    },
  }
});
</script>

<style scoped>
.create-buyers-order {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 2rem 2rem 2rem;
}
</style>
