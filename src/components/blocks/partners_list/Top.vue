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
            <router-link to="/partners/create">
              <el-button color="#FFFF6F" style="margin-left: 50px; color: #4d4d4d">
                <el-icon class="el-icon--left"><Plus /></el-icon>
                добавить контрагента
              </el-button>
          </router-link>
        </div>
    </div>
    <router-wiew></router-wiew>
</template>

<script>
import { Plus, Search } from '@element-plus/icons-vue'
import CreatePartner from '@/views/CreatePartner.vue'

export default {
  name: 'Top',
  data() {
    return {
      input2: ''
    };
  },
  components: {
    CreatePartner,
  }
};
</script>