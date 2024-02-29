<template>
  <div>   
      <h2>Заказы покупателей</h2>
      </div>
      <div>
        <Top />
      </div>
    <div class="page-container">
      <div v-if="orders.length > 0">
        <div v-for="order in orders" :key="order.id">
          <Order :orderData="order"/>
        </div>
      </div>
      <div v-else>
        Загрузка данных...
      </div>
    </div>
</template>


<script>

import Order from '../components/blocks/buyers_order/Order.vue';
import Top from '../components/blocks/buyers_order/Top.vue';
import axios from 'axios'

const params= {
  offset: 0,
  limit: 50,
  status_id: 1,
}

export default {
  name: 'BuyersView',
  components: {
    Top,
    Order,
  },
  data() {
    return {
      orders: [],
      loaded: false,
    }
  },
  mounted() {
    axios
      .get(
        'http://89.104.68.248:8000/api/customerorder/get_filter', 
        {params},
      )
      .then((response) => {
        this.orders = response.data;
        this.loaded = true; // Устанавливаем флаг загрузки данных
      })
      .catch((error) => {
        console.error('Error:', error);
      })
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
  margin-left: 6vw;
  position: absolute;
}

h2 {
  color: #4c4c4c;
}
</style>