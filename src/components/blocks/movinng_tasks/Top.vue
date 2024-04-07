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
        </div>
    </div>
    <el-divider></el-divider>
</template>

<script>

export default {
  name: 'Top',
  data() {
    return {
      input2: ''
    };
  },
};
</script>