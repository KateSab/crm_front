<template>
  <div class="header-page">   
      <h2>Заказы поставщикам</h2>
  </div>
  <div>
    <SuppliersShowTop />
  </div>
  <div class="page-container">
    <div v-for="order in suppliers_orders" :key="order.id">
      <SuppliersShowOrder :orderData="order"/>
    </div>
  </div>
</template>


<script setup>
import { onMounted, ref } from 'vue';
import store from '@/store';
import SuppliersShowOrder from '@/views/suppliers/show/SuppliersShowOrder.vue';
import SuppliersShowTop from '@/views/suppliers/show/SuppliersShowTop.vue';

const suppliers_orders = ref([]);

onMounted(async () => {
  try {
    await store.dispatch('get_supplier_orders');
    suppliers_orders.value = store.state.supplier_orders;
    console.log("Got suppliers orders successfully");
    } catch (error) {
        console.error("Failed to get suppliers orders:", error);
    }
  })
</script>

<style>
.header-page {
  margin-top: 7vh;
  align-items: center;
}
.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: top; */
  height: 100vh; /* 100% высоты видимой части страницы */
}

@media screen and (max-width: 1240px) {
  .page-container {
    /* display: flex;
    flex-direction: column; */
    align-items: left;
    justify-content: left;
    height: 100vh; /* 100% высоты видимой части страницы */
    /* margin-left: 6vw;
    position: absolute; */
  }
}
</style>