<template>
  <div class="top">
    <el-button @click="goBack" type="primary" plain class="top-items">
      <el-icon class="el-icon--right"><ArrowLeft /></el-icon>
      Назад
    </el-button>
    <div class="path">
      <el-link @click="goBack" :underline="false" class="top-items">
        {{ title }}
      </el-link>
      <el-icon class="top-items"><ArrowRight /></el-icon>
      <el-text class="top-items">
        Создание
      </el-text>
    </div>
  </div>
  <el-divider></el-divider>
</template>

<script>
import {ArrowLeft, ArrowRight} from "@element-plus/icons-vue";

export default {
  components: {ArrowRight, ArrowLeft},
  props: {
    title: {
      type: String
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.top {
  display: flex;
  align-items: start;
  margin: 2rem 4rem 0 4rem;
}

.path {
  margin-left: 2.5rem;
  margin-top: 0.4rem;
}

.top-items {
  vertical-align: middle; /* Выравнивание иконки посередине вертикально */
  margin-left: 0.5rem;
}
</style>