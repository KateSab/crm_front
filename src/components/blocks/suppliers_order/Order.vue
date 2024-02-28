<template>
    <div class="orders">
      <el-divider></el-divider>
        <TopOrder/>
      <Table />
    </div>
</template>

<script>
import TopOrder from './TopOrder.vue';
import Table from './Table.vue'

export default {
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
}

.table-container {
  width: 100%; /* Ширина таблицы */
  margin: 10px;
}
</style>