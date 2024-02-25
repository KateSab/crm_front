<template>
  <div>
    <Top />
  </div>
  <div class="create">
    форма заполнения заказа
    <Table />
  </div>
</template>

<script>
import Top from '../components/blocks/create_buyers_order/Top.vue';
import Table from '../components/blocks/create_buyers_order/Table.vue';

export default {
  name: 'CreateBuyersOrder',
  components: {
    Top,
    Table,
  }
}
</script>

<style>
.create {
  display: fixed;
  flex-direction: column;
  justify-content: right; 
  align-items: center;
  margin: 1rem 2rem 0rem 2rem;
}
</style>