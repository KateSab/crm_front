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
import CustomerorderCreate from '@/views/buyers/create/CustomerorderCreate.vue'
import {Plus} from "@element-plus/icons-vue";

export default {
  name: 'BuyersShowTop',
  data() {
    return {
      input2: ''
    };
  },
  components: {
    Plus,
    CustomerorderCreate,
  }
};

</script>

<style>
.page-wrapper {
  display: flex;
  margin: 1rem 4rem;
  /* justify-content: right; Выравнивание по горизонтали */
  align-items: center; /* Выравнивание по вертикали */
}

.top-wrapper {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
</style>
