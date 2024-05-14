<template>
    <SuppliersCreateTop />
    <div class="create-suppliers-order">
      <SuppliersCreateOrder />
    </div>
</template>

<script>
import SuppliersCreateTop from '@/views/suppliers/create/SuppliersCreateTop.vue';
import SuppliersCreateOrder from '@/views/suppliers/create/SuppliersCreateOrder.vue';

export default {
  name: 'CreateSuppliersOrder',
  components: {
    SuppliersCreateTop,
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