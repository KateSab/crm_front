<template>
  <div>
    <Top />
  </div>
  <div class="create">
    <OrderData />
    форма заполнения заказа
    <Table />
    <OrderInfo />
    <el-button type="primary" style="width: 70%; margin-top: 1rem;">Сформировать заказ</el-button>
  </div>
</template>

<script>
import Top from '../components/blocks/create_buyers_order/Top.vue';
import Table from '../components/blocks/create_buyers_order/Table.vue';
import OrderData from '../components/blocks/create_buyers_order/OrderData.vue';
import OrderInfo from '../components/blocks/create_buyers_order/OrderInfo.vue';

export default {
  name: 'CreateBuyersOrder',
  components: {
    Top,
    OrderData,
    Table,
    OrderInfo,
  }
}
</script>

<style>
.create {
  display: fixed;
  flex-direction: column;
  justify-content: right; 
  align-items: center;
  margin: 1rem 2rem 2rem 2rem;
}
</style>