<template>
    <CreateTop title="Заказы поставщикам"/>
    <div class="create-suppliers-order">
      <SuppliersCreateOrder />
    </div>
</template>

<script>
import CreateTop from '@/components/CreateTop.vue';
import SuppliersCreateOrder from '@/views/suppliers/create/SuppliersCreateOrder.vue';

export default {
  name: 'SuppliersCreate',
  components: {
    CreateTop,
    SuppliersCreateOrder,
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