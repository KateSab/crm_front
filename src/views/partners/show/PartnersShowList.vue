<template>
    <div>
        <PartnersShowTop />
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
                    <template v-if="partner.is_other === true">
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
                <div v-for="address in partner.addresses" :key="address.id">
                    {{ address.address }}
                </div>
                </el-col>
            </el-row>
        </div>
    </el-container>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import PartnersShowTop from '@/views/partners/show/PartnersShowTop.vue';
import {getPartnersApi} from '@/api/api_partners_get';

const partners = ref([]);

onMounted(async () => {
    try {
        partners.value = await getPartnersApi(1000);
        console.log("Got partners successfully");
    } catch (error) {
        console.error("Failed to get partners:", error);
    }
});

</script>

<style>
el-col {
  /* background-color: rgba(211, 211, 211, 0.406); */
  border-radius: 4px;
  padding: 2vh 0 2vh 0;
  align-content: center;
  justify-content: center;
}

.partners {
  margin: 0 4vw 0 4vw;
  font-size: small;
}

.title {
    font-size: medium;
    margin-top: 2vh;
    color: #3d9cfb;
    background-color: #d3d3d3;
}
</style>
