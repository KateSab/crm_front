<template>
  <div class="top">
    <el-row class="centered-row">
      <el-button @click="goBack" type="primary" plain style="margin-right: 2rem">
        <el-icon class="el-icon--right"><ArrowLeft /></el-icon>
        Назад
      </el-button>
      <el-link @click="goBack" :underline="false" class="link-item">
        {{ title }}
      </el-link>
      <el-icon class="icon-item"><ArrowRight /></el-icon>
      <el-text class="text-item">
        Создание
      </el-text>
    </el-row>
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

.centered-row {
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
}

/* Добавляет отступы между элементами */
el-button, .link-item, .icon-item, .text-item {
  margin: 0 5px; /* Пример отступа, настройте по вашим нуждам */
}
</style>