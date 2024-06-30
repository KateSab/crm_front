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
            <router-link to="/suppliers/create">
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
import SuppliersCreate from '@/views/suppliers/create/SuppliersCreate.vue'
import {Plus} from "@element-plus/icons-vue";

export default {
  name: 'SuppliersShowTop',
  data() {
    return {
      input2: ''
    };
  },
  components: {
    Plus,
    SuppliersCreate,
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
