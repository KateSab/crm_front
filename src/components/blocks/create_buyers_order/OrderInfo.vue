<template>
    <el-row class="row-bg" justify="space-around" :gutter="175" style="margin-top: 2rem;">
        <el-colomn :span="8">
            <el-form
                :model="form"
                label-position="top"
                size="small"
                label-width="auto"
            >
                <el-form-item label="Инструкция по сборке заказа">
                    <el-input v-model="form.instruction" :rows="4" type="textarea"/>
                </el-form-item>
            </el-form>
        </el-colomn>
        <el-colomn :span="8">
        </el-colomn>
        <el-colomn :span="8">
            <el-form
                :model="form"
                label-position="left"
                size="small"
                label-width="auto"
                class="base-color"
            >
                <el-form-item label="СС Итого" prop="costs_of_moving">
                    <el-input
                    v-model="form.self_cost_total" disabled>
                    <template #append>руб.</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="РРЦ Итого" prop="costs_of_deliver">
                    <el-input
                    v-model="form.rrc_total" disabled>
                    <template #append>руб.</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="Итого маржа" prop="another_costs">
                    <el-input
                    v-model="form.marginality_total" disabled>
                    <template #append>руб.</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="Общая маржинальность" prop="another_costs">
                    <el-input
                    v-model="form.marginality_total_in_percents" disabled>
                    <template #append>%</template>
                    </el-input>
                </el-form-item>
            </el-form>
        </el-colomn>
    </el-row>
</template>

<script lang="ts">
import { reactive } from 'vue'

const form = reactive({
  instruction: '',
  self_cost_total: 0,
  rrc_total: 0,
  marginality_total: 0,
  marginality_total_in_percents: 0,
})

export default {
    name: 'OrderInfo',
  data() {
    return {
      form
    }
  }
}
</script>

<style>
.base-color {
  background-color: #3d9cfb;
}
</style>
