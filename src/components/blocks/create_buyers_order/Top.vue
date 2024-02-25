<template>
    <div class="top">
      <el-button @click="goBack" color="rgba(187, 187, 243, 0.631)" type="primary" round>
        <el-icon class="el-icon--right"><ArrowLeft /></el-icon>
        Назад
      </el-button>
      <div class="path">
        <el-link @click="goBack" :underline="false">Заказы покупателей 
        </el-link>
          <el-icon class="arrow-icon"><ArrowRight /></el-icon>
          <el-text>
          Создание
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

<style>
.top {
  display: flex;
  align-items: left;
  margin: 2rem 4rem 0px 4rem;
  align-items: center; /* Выравнивание по вертикали */
}

.path {
  margin-left: 2.5rem;
}

.arrow-icon {
  vertical-align: middle; /* Выравнивание иконки посередине вертикально */
  margin-left: 0.5rem;
}
</style>