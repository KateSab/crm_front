
<template>
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-position="left"
        size="small"
        label-width="auto"
        status-icon
        style="width: 40vw;
        margin-top: 2rem;"
    >
        <el-form-item label="Поставщик" prop="supplier">
            <el-select v-model="ruleForm.supplier" placeholder="Поставщиик">
                <el-option label="Поставщиик 1" value="supplier1" />
                <el-option label="Поставщиик 2" value="supplier2" />
            </el-select>
        </el-form-item>
        <el-form-item label="Номр заказа у поставщика" prop="order">
            <el-input v-model="ruleForm.order" />
        </el-form-item>
        <el-form-item label="Дата прибытия(план)" required prop="date">
            <el-date-picker
                    v-model="ruleForm.date"
                    type="date"
                    label="Pick a date"
                    placeholder="Pick a date"
                    style="width: 100%"
                />
        </el-form-item>
        <el-form-item label="Тип доставки" prop="type_of_delivery">
            <el-select v-model="ruleForm.type_of_delivery" placeholder="Тип доставки">
                <el-option label="До ТК" value="delivery1" />
                <el-option label="До склада" value="delivery2" />
                <el-option label="Самовывоз" value="delivery3" />
            </el-select>
        </el-form-item>
        <el-form-item label="Счёт на оплату" prop="bill">
            <el-input v-model="ruleForm.bill" />
        </el-form-item>
        <el-form-item label="Заказ в ТК" prop="order_in_TK">
            <el-select v-model="ruleForm.order_in_TK" placeholder="Заказ в ТК">
                <el-option label="1" value="order1" />
                <el-option label="2" value="order2" />
                <el-option label="3" value="order3" />
            </el-select>
        </el-form-item>
    </el-form>
    <el-button type="primary" style="width: 20%; margin-top: 1rem;">Создать заказ</el-button>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules, ElLink } from 'element-plus';

interface RuleForm {
    supplier: string
    order: string
    date: string
    type_of_delivery: string
    bill: string
    order_in_TK: string
}

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    supplier: '',
    order: '',
    date: '',
    type_of_delivery: '',
    bill: '',
    order_in_TK: '',
})

const rules = reactive<FormRules<RuleForm>>({
    supplier: [
        { required: true, message: 'Выберите поставщика', trigger: 'blur' },
    ],
    order: [
        { required: true, message: 'Введите номер заказа', trigger: 'blur' },
        { min: 11, max: 11, message: 'Номер должен состоять из 11 символов', trigger: 'blur' },
    ],
    date: [
        {
            type: 'date',
            required: true,
            message: 'Выберите дату прибытия',
            trigger: 'change',
        },
    ],
    type_of_delivery: [
        { required: true, message: 'Выберите тип доставки', trigger: 'blur' },
    ],
    bill: [
        { required: true, message: 'Введите счёт на оплату', trigger: 'blur' },
    ],
    order_in_TK: [
        { required: true, message: 'Выберите заказ в ТК', trigger: 'blur' },
    ],
})
</script>