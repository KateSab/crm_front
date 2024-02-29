<template>
    <Top />
    <div class="create-suppliers-order">
      <Order />
    </div>
</template>

<script>
import Top from '../components/blocks/create_suppliers_order/Top.vue';
import Order from '../components/blocks/create_suppliers_order/Order.vue';

export default {
  name: 'CreateSuppliersOrder',
  components: {
    Top,
    Order,
  }
}
</script>

<style>
  .create-suppliers-order {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>