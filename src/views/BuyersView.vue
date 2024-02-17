<template>
  <div>   
      <h2>Заказы покупателей</h2>
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

import Order from '../components/blocks/buyers_order/Order.vue';
import Top from '../components/blocks/buyers_order/Top.vue';

export default {
  name: 'BuyersView',
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