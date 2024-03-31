<template>
    
    <div>
        <Top />
    </div>
    <el-divider></el-divider>
    <el-container direction="vertical" class="partners">

        <el-row justify="space-between" class="title">
            <el-col :span="6">
                Имя
            </el-col>
            <el-col :span="6">
                Тип контрагента
            </el-col>
            <el-col :span="12">
                Адреса
            </el-col>
        </el-row>

        <div v-for="partner in partners" :key="partner.id">
            <el-divider></el-divider>
            <el-row justify="space-between">
                <el-col :span="6">
                    {{ partner.name }}
                </el-col>
                <el-col :span="6">
                    <template v-if="partner.is_client === true">
                            клиент
                    </template> 
                    <template v-if="partner.is_supplier === true">
                        поставщик
                    </template>
                    <template v-if="partner.is_contractor === true">
                        подрядчик
                    </template>
                    <template v-if="partner.is_carrier === true">
                        перевозчик
                    </template>
                </el-col>
                <el-col :span="12">
                    ...
                </el-col>
            </el-row>
        </div>

    </el-container>
</template>

<script setup>

import { onMounted, ref } from 'vue';
import store from '@/store/index';
import Top from '@/components/blocks/partners_list/Top.vue';
import { Select } from '@element-plus/icons-vue';
import { Close } from '@element-plus/icons-vue';

const partners = ref([]);

onMounted(async () => {
    try {
        await store.dispatch('get_partners');
        partners.value = store.state.partners;
        console.log("Got partners successfully");
    } catch (error) {
        console.error("Failed to get partners:", error);
    }
});

</script>
  
<style>
/* .el-row {

  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
} */
.el-col {
  /* background-color: rgba(211, 211, 211, 0.406); */
  border-radius: 4px;
  padding: 2vh 0 2vh 0;
  align-content: center;
  justify-content: center;
}

/* .grid-content {
  
  border-radius: 4px;
  min-height: 36px;
} */

.partners {
  margin: 0 4vw 0 4vw;
  font-size: small;
}

.title {
    font-size: medium;
    margin-top: 2vh;
    color: #3d9cfb;
    background-color: rgba(211, 211, 211, 0);
}
</style>
