<template>
  <div class="header-page">   
      <h2>Заказы поставщикам</h2>
  </div>
  <div>
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
.header-page {
  margin-top: 7vh;
}
.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
  height: 100vh; /* 100% высоты видимой части страницы */
  margin-left: 6vw;
  position: absolute;
}
</style>