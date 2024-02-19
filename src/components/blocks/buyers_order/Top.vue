<template>
    <div class="page-wrapper">
        <div class="top-wrapper">
            <el-input
            v-model="input2"
            class="w-50 m-2"
            placeholder="Введите параметры поиска"
            />
            <el-button color="rgba(187, 187, 243, 0.631)" type="primary" round>
              найти 
              <el-icon class="el-icon--right"><Search /></el-icon>
            </el-button>
            
            <router-link to="/buyers/create">
              <el-button color="rgb(255, 226, 111)" type="primary" style="margin-left: 50px">
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
  margin: 0px 70px 0px 70px;
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