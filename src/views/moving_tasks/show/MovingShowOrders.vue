<template>
  <div v-for="index in 5" :key="index">
    <container class="moving-tasks">
      <MovingShowOrder />
    </container>
  </div>
</template>

<script>
import MovingShowOrder from '@/views/moving_tasks/show/MovingShowOrder.vue';

export default {
  name: 'MovingShowOrders',
  components: {
    MovingShowOrder,
  }
};
</script>

<style>
.moving-tasks {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(128, 128, 128, 0.148);
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 0 2vw;
  margin: 3vh 4vw 3vh 4vw;
}
</style>