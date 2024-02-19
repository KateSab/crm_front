<template>
  <div>
    <Top />
    <el-divider></el-divider>
  </div>
  <div class="create">
    форма заполнения заказа
  </div>
</template>

<script>
import Top from '../components/blocks/create_buyers_order/Top.vue';

export default {
  name: 'CreateBuyersOrder',
  components: {
    Top,
  }
}
</script>

<style>
.create {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>