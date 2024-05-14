<template>
    <div class="top">
      <el-button @click="goBack" type="primary" plain>
        <el-icon class="el-icon--right"><ArrowLeft /></el-icon>
        Назад
      </el-button>
      <div class="path">
          <el-link @click="goBack" :underline="false">Задачи на перемещение 
        </el-link>
        <el-icon class="arrow-icon"><ArrowRight /></el-icon>
        <el-text>
          Создание задачи
        </el-text>
        
      </div>
    </div>
    <el-divider></el-divider>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>