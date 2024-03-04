<template>
  <div>
    <Top />
  </div>
  <div class="create-buyers-order">
    <OrderData />
    <Table />
    <OrderInfo />
    <el-button type="primary" style="width: 70%; margin-top: 1rem;">Сформировать заказ</el-button>
  </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, defineProps, reactive } from 'vue';
import Top from '../components/blocks/create_buyers_order/Top.vue';
import OrderData from '../components/blocks/create_buyers_order/OrderData.vue';
import OrderInfo from '../components/blocks/create_buyers_order/OrderInfo.vue';
import Table from "../components/blocks/create_buyers_order/Table.vue";

interface buyersOrderForm {
  id_deal: string
  client: string
  date: string
  base_margin: string
  costs_of_moving: string
  costs_of_deliver: string
  another_costs: string
}

const props = defineProps<buyersOrderForm>()

const orderDataForm = reactive<buyersOrderForm>({
  id_deal: '',
  client: '',
  date: '',
  base_margin: '',
  costs_of_moving: '',
  costs_of_deliver: '',
  another_costs: '',
})

</script>

<style>
.create-buyers-order {
  display: fixed;
  flex-direction: column;
  /* justify-content: right;  */
  align-items: center;
  margin: 1rem 2rem 2rem 2rem;
}
</style>