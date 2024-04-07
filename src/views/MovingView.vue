<template>
    <div class="header-page">   
        <h2>Задачи на перемещение</h2>
    </div>
    <Top />
    <Orders />

</template>

<script>
import Top from '../components/blocks/movinng_tasks/Top.vue';
import Orders from '../components/blocks/movinng_tasks/Orders.vue';
export default {
  name: 'MovingView',
  components: {
    Top,
    Orders
  }
}



</script>

<style>
.moving-orders {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>