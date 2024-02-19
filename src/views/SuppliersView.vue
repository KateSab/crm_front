<template>
  <div>   
      <h2>Заказы поставщикам</h2>
  </div>
  <div class="">
    <Top />
  </div>
  <div class="page-container">
    <div v-for="index in 6" :key="index">
      <Order />
    </div>
  </div>
</template>


<script>

import Order from '../components/blocks/suppliers_order/Order.vue';
import Top from '../components/blocks/suppliers_order/Top.vue';

export default {
  name: 'SuppliersView',
  components: {
    Top,
    Order,
  }
}
</script>

<style>
.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
  height: 100vh; /* 100% высоты видимой части страницы */
}
</style>