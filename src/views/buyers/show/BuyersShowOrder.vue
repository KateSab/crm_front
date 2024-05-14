<template>
    <div class="orders">
      <el-divider></el-divider>
        <BuyersShowOrderTop :orderData="orderData"/>
      <BuyersShowOrderTable :orderData="orderData"/>
    </div>
</template>

<script>
import BuyersShowOrderTop from '@/views/buyers/show/BuyersShowOrderTop.vue';
import BuyersShowOrderTable from '@/views/buyers/show/BuyersShowOrderTable.vue'

export default {
  props: {
    orderData: {
      type: Object,
      required: true
    }
  },
  name: 'BuyersShowOrder',
  components: {
    BuyersShowOrderTop,
    BuyersShowOrderTable,
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