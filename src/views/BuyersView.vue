<template>
  <div class="header-page">   
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


<script setup>
import { ref, onMounted } from 'vue';
import { fetchBuyersOrders } from '@/api/Orders';
import Order from '../components/blocks/buyers_order/Order.vue';
import Top from '../components/blocks/buyers_order/Top.vue';
import { ElNotification } from 'element-plus';

const error_notification = () => {
  ElNotification({
    title: 'Ошибка',
    message: 'Не удалось получить данные с сервера',
    type: 'error',
    position: 'bottom-right',
  })
}

const orders = ref([]);
const loaded = ref(false);

onMounted(async () => {
  try {
    orders.value = await fetchBuyersOrders();
    loaded.value = true;
  } catch (error) {
    error_notification();
  }
});
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