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
  name: 'SuppliersOrderPresentation',
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
  /* margin: 0 10vw 0 10vw; */
}

/* .table-container {
  width: 100%; /* Ширина таблицы 
  margin: 10px;
} */
</style>