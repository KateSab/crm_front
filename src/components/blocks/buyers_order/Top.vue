<template>
    <div class="page-wrapper">
      <div class="top-wrapper">
        <el-input
          v-model="input2"
          class="w-50 m-2"
          placeholder="Введите параметры поиска"
        />
        <el-button type="primary">
          найти 
          <el-icon class="el-icon--right"><Search /></el-icon>
        </el-button>
          
        <router-link to="/buyers/create">
          <el-button color="#FFFF6F" style="margin-left: 50px; color: #4d4d4d">
            <el-icon class="el-icon--left"><Plus /></el-icon>
            создать заказ
              
          </el-button>
        </router-link>
         
      </div>
    </div>
    <router-view></router-view>
</template>

<script>
import CreateBuyersOrder from '@/views/CreateBuyersOrder.vue'

export default {
  name: 'Top',
  data() {
    return {
      input2: ''
    };
  },
  components: {
    CreateBuyersOrder,
  }
};

</script>

<style>
.page-wrapper {
  display: flex;
  margin: 0px 4rem;
  justify-content: right; /* Выравнивание по горизонтали */
  align-items: center; /* Выравнивание по вертикали */
}

.top-wrapper {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.el-input {
    padding-right: 10px;
    width: 50%;
}
</style>