<template>
    <div v-for="index in 5" :key="index">
    <container class="moving-tasks">
        
            <Order />
       
    </container>
</div>
</template>

<script>
import Order from './Order.vue';

export default {
  name: 'Orders',
  components: {
    Order,
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