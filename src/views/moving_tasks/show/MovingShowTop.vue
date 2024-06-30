<template>
    <div class="page-wrapper">
        <div class="top-wrapper">
            <el-input
            v-model="input2"
            placeholder="Введите параметры поиска"
            />
            <el-button type="primary">
              найти
              <el-icon class="el-icon--right"><Search /></el-icon>
            </el-button>
            <router-link to="/moving/create">
              <el-button color="#FFFF6F" style="margin-left: 50px; color: #4d4d4d">
                <el-icon class="el-icon--left"><Plus /></el-icon>
                создать задачу
              </el-button>
          </router-link>
        </div>
    </div>
    <el-divider></el-divider>
</template>

<script>

import {Plus} from "@element-plus/icons-vue";

export default {
  name: 'MovingShowTop',
  components: {Plus},
  data() {
    return {
      input2: ''
    };
  },
};
</script>
