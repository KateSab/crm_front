<template>
    <div class="orders">
      <el-divider></el-divider>
        <TopOrder :orderData="orderData"/>
      <Table :orderData="orderData"/>
    </div>
</template>

<script>
import TopOrder from './TopOrder.vue';
import Table from './Table.vue'

export default {
  props: {
    orderData: {
      type: Object,
      required: true
    }
  },
  name: 'BuyersOrderPresentation',
  components: {
    TopOrder,
    Table,
  }
}
</script>

<style>
.orders {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* .table-container {
  width: 80%;
  margin: 10px;
  } */
</style>