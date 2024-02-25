<template>
    <div class="top">
      <el-button @click="goBack" color="rgba(187, 187, 243, 0.631)" type="primary" round>
        <el-icon class="el-icon--right"><ArrowLeft /></el-icon>
        Назад
      </el-button>
      <div class="path">
        <el-text class="mx-1">Заказы поставщикам 
          <el-icon><ArrowRight /></el-icon>
          Создание
        </el-text>
        
      </div>
    </div>
    
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

<style>
.top {
  display: flex;
  align-items: left;
  margin: 1rem 4rem 0px 4rem;
  align-items: center; /* Выравнивание по вертикали */
}

.path {
  margin-left: 40px;
}
</style>