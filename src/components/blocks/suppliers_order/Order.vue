<template>
    <div class="orders">
      <hr class="line"/>
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

.line {
  width: 100%; /* Ширина линии */
  border: none; /* Убираем рамку */
  border-top: 1px solid rgb(88, 88, 88); /* Цвет и стиль линии */
  margin: 20px; /* Отступы сверху и снизу */
}

.table-container {
  width: 100%; /* Ширина таблицы */
  margin: 10px;
}
</style>