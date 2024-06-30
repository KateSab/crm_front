<template>
    <div class="orders">
      <el-divider></el-divider>
      <SuppliersShowOrderTop :orderData="orderData"/>
      <SuppliersShowTable :orderData="orderData"/>
    </div>
</template>

<script>
import SuppliersShowOrderTop from '@/views/suppliers/show/SuppliersShowOrderTop.vue';
import SuppliersShowTable from '@/views/suppliers/show/SuppliersShowTable.vue'

export default {
  props: {
    orderData: {
      type: Object,
      required: true
    }
  },
  name: 'SuppliersShowOrder',
  components: {
    SuppliersShowOrderTop,
    SuppliersShowTable,
  }
}
</script>

<style>
.orders {
  display: flex; 
  flex-direction: column;
  align-items: center;
}

</style>