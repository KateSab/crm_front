<template>
    <el-row class="row-bg" justify="space-around">
        <el-colomn :span="8">
            <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                :rules="rules"
                label-position="left"
                size="small"
                label-width="auto"
                status-icon
            >
                <el-form-item label="Номер сделки продажи">
                    <el-input v-model="ruleForm.id_deal" />
                </el-form-item>
                <el-form-item label="Клиент" prop="client">
                    <el-select v-model="ruleForm.client" placeholder="Клиент">
                        <el-option label="Клиент 1" value="client1" />
                        <el-option label="Клиент 2" value="client2" />
                    </el-select>
                </el-form-item>
                <el-form-item label="Дата отгрузки (план)" required>
                    <el-form-item prop="date">
                        <el-date-picker
                            v-model="ruleForm.date"
                            type="date"
                            label="Pick a date"
                            placeholder="Pick a date"
                            style="width: 100%"
                        />
                    </el-form-item>
                </el-form-item>
            </el-form>
        </el-colomn>
        <el-colomn :span="8">
            <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                :rules="rules"
                label-position="left"
                size="small"
                label-width="auto"
                status-icon
            >
                <el-form-item label="Базовая наценка" prop="base_margin">
                    <el-input v-model="ruleForm.base_margin" :precision="2" :step="0.1" :max="100" />
                </el-form-item>
            </el-form>
        </el-colomn>
        <el-colomn :span="8">
            <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                :rules="rules"
                label-position="left"
                size="small"
                label-width="auto"
                status-icon
            >
                <el-form-item label="Расходы на перемещение" prop="costs_of_moving">
                    <el-input v-model="ruleForm.costs_of_moving" />
                </el-form-item>
                <el-form-item label="Расходы на доставку" prop="costs_of_deliver">
                    <el-input v-model="ruleForm.costs_of_deliver" />
                </el-form-item>
                <el-form-item label="Прочие расходы" prop="another_costs">
                    <el-input v-model="ruleForm.another_costs" />
                </el-form-item>
            </el-form>
        </el-colomn>
    </el-row>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus';

interface RuleForm {
  id_deal: number
  client: string
  date: string
  base_margin: number
  costs_of_moving: number
  costs_of_deliver: number
  another_costs: number
}

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  id_deal: 0,
  client: '',
  date: '',
  base_margin: 0.0,
  costs_of_moving: 0,
  costs_of_deliver: 0,
  another_costs: 0,
})

const rules = reactive<FormRules<RuleForm>>({
  id_deal: [
    { required: true, message: 'Введите номер сделки', trigger: 'blur' },
    { min: 8, max: 8, message: 'Номер должен состоять из 8 цифр', trigger: 'blur' },
  ],
  client: [
    {
      required: true,
      message: 'Выберите клиента',
      trigger: 'change',
    },
  ],
  date: [
    {
      type: 'date',
      required: true,
      message: 'Выберите дату отгрузки',
      trigger: 'change',
    },
  ],
  base_margin: [
    { required: true, message: 'Введите базовую наценку', trigger: 'blur' },
  ],
  costs_of_moving: [
    { required: true, message: 'Заполните поле расходов', trigger: 'blur' },
  ],
  costs_of_deliver: [
    { required: true, message: 'Заполните поле расходов', trigger: 'blur' },
  ],
  another_costs: [
    { required: true, message: 'Заполните поле расходов', trigger: 'blur' },
  ],
})
</script>

<style>
  .el-form {
    width: 20rem;
    padding: 1rem;
    border-radius: 5px;
    background-color: #4d4d4d23;
  }
</style>