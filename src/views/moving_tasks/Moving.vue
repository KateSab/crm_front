<template>
    <div class="header-page">   
        <h2>Задачи на перемещение</h2>
    </div>
    <MovingShowTop />
    <MovingShowOrders />
</template>

<script>
import MovingShowTop from '@/views/moving_tasks/show/MovingShowTop.vue';
import MovingShowOrders from '@/views/moving_tasks/show/MovingShowOrders.vue';
export default {
  name: 'Moving',
  components: {
    MovingShowTop,
    MovingShowOrders
  }
}</script>

<style>
.moving-orders {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>