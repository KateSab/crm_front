<template>
  <div>
    <CreateTop title="Заказы покупателей"/>
    <div class="create-buyers-order">
      <CustomerorderCreateHeader 
        :clients="clients"
        v-model:formData="headForm"
      />
      <CustomerorderCreateTable
          v-model:tableData="tableData"
          :warehouses="warehouses"
          @add-row="handleAddRow"
          @delete-row="handleDeleteRow"
          @update-data="handleUpdateTable"
          @chain-function="handleChainFunction"
      />
      <CustomerorderCreateFuter 
        v-model:formData="footerForm"
        v-model:formResultData="resultForm"
        @update-data="handleUpdateFooter"
        @is-from-marketing="handleIsFromMarketing"
      />
    </div>
    <el-button
        plain
        type="primary"
        style="margin-top: 2rem;"
        @click="createOrder"
    >
      Сформировать заказ
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import CreateTop from "@/components/CreateTop.vue";
import CustomerorderCreateHeader from '@/views/buyers/create/CustomerorderCreateHeader.vue';
import CustomerorderCreateFuter from "@/views/buyers/create/CustomerorderCreateFooter.vue";
import CustomerorderCreateTable from "@/views/buyers/create/CustomerorderCreateTable.vue";
import {ICustFooter, ICustGeneralCost, ICustHead, ICustTable} from '@/interfaces/ICustomerOrder';
import {calculateFieldsTable, calculateFieldsFooter, calculatePricePerUnitForClient, isFromMarketingCost} from '@/services/utils/customer_order_utils';
import { getLocationsApi } from '@/api/api_locations';
import { getPartnersApi } from '@/api/api_partners_get';
import { jsonCustomerOrder } from '@/api/api_customer_orders';

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

    const headForm = reactive<ICustHead>({
      sell_link: '',
      client: {
        id: undefined,
        name: '',
      },
      income_ratio: 1.5,
    })

    const emptyRow:ICustTable = {
      name: '',
      description: '',
      shipment_count: undefined,
      adjustment_count: undefined,
      branding_info: '',
      shipment_location: {
        id: undefined,
        name: '',
      },
      plan_product_unit_costprice: undefined,
      plan_branging_unit_costprice: undefined,
      total_cost_per_unit: undefined,
      total_cost_for_circulation: undefined,
      markup_for_additional_costs: undefined,
      adjustment_price: undefined,
      price_per_unit_for_client: undefined,
      price_for_circulation_for_client: undefined,
      margin: undefined,
      margin_percent: undefined,
    };

    // Инициализация данных таблицы с одной пустой строкой
    const tableData = ref([ {...emptyRow} ]);

    const handleAddRow = () => {
      tableData.value.push({ ...emptyRow });
      calculateFieldsFooter(tableData.value, footerForm, resultForm);
    };
    // Удаление строки
    const handleDeleteRow = (index: number) => {
      tableData.value.splice(index, 1);
      calculateFieldsFooter(tableData.value, footerForm, resultForm);
    }
    // Обновление данных таблицы
    const handleUpdateTable = ({ index, column, value }) => {
      const row = tableData.value[index];
      tableData.value[index][column] = value;
      calculateFieldsTable(footerForm, headForm, tableData.value, row, resultForm);
    };
    // При вводе корректировки цены
    const handleChainFunction = ({ index }) => {
      const row = tableData.value[index];
      calculatePricePerUnitForClient(row, headForm, resultForm, tableData.value);
    }

    const footerForm = reactive<ICustFooter>({
        UK: 1024,
        store_cost: 4500,
        plan_delivery_cost: undefined,
        plan_moves_cost: undefined,
        plan_shipment_cost: undefined,
        plan_design_cost: undefined,
        plan_workers_cost: undefined,
        plan_other_expenses: undefined,
        is_from_marketing: false,
        is_from_marketing_cost: 0,
        sum_cost: 5524,
    });

    const handleUpdateFooter = (field: string, value: number) => {
      footerForm[field] = value;
      calculateFieldsFooter(tableData.value, footerForm, resultForm, headForm);
    };

    const handleIsFromMarketing = (value: boolean) => {
      footerForm.is_from_marketing = value;
      isFromMarketingCost(tableData.value, footerForm);
    }

    const resultForm = reactive<ICustGeneralCost>({
        self_order_cost: undefined,
        sum_client_cost: undefined,
        margin_cost: undefined,
        margin_percent: undefined,
    });

    const createOrder = () => {
      console.log("DATA: ", headForm, tableData.value, footerForm, resultForm);
      // функция для сбора и форматирования данных в json -> отправки данных на бек
      // jsonCustomerOrder(headForm, tableData.value, footerForm, resultForm);
    }

    // Асинхронная загрузка данных при монтировании
    onMounted(async () => {
      try {
        clients.value = await getPartnersApi(1000, 'is_other');
        warehouses.value = await getLocationsApi();
      } catch (error) {
        console.error("Error loading data:", error);
      }
    });

    return {
      clients,
      warehouses,
      headForm,
      tableData,
      handleAddRow,
      handleDeleteRow,
      handleUpdateTable,
      handleChainFunction,
      footerForm,
      handleUpdateFooter,
      handleIsFromMarketing,
      resultForm,
      createOrder,
    };
  },
  data() {
    return {
    };
  },
  methods: {
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
