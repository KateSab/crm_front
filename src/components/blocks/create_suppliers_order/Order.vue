
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
                <el-option v-for="supplier in suppliers" :key="supplier.id" :label="supplier.name" :value="supplier.id" />
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
                <el-option v-for="delivery in delivery_types" :label="delivery.name" :value="delivery.id" :key="delivery.id" />
            </el-select>
        </el-form-item>
        <el-form-item label="Счёт на оплату" prop="bill">
            <el-input v-model="ruleForm.bill" />
        </el-form-item>
            <el-form-item v-if="ruleForm.type_of_delivery === 2" label="Заказ в ТК" prop="order_in_TK">
                <el-select v-model="ruleForm.order_in_TK" placeholder="Заказ в ТК">
                    <el-option label="1" value="order1" />
                    <el-option label="2" value="order2" />
                    <el-option label="3" value="order3" />
                </el-select>
            </el-form-item>
    </el-form>
    <el-button type="primary" style="width: 20%; margin-top: 1rem;" @click="submitForm()">Создать заказ</el-button>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, onUpdated } from 'vue'
import type { FormInstance, FormRules } from 'element-plus';
import { ElNotification } from 'element-plus';
import store from '../../../store/index';
import router from '@/router';
import { formatDate } from '@/api/Helpers';

const delivery_types = store.state.delivery_types

interface Supplier {
    id: string;
    name: string;
}

// interface RuleForm {
//     supplier: string
//     order: string
//     date: string
//     type_of_delivery: string
//     bill: string
//     order_in_TK: string
// }

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    supplier: '',
    order: '',
    date: '',
    type_of_delivery: null,
    bill: '',
    order_in_TK: null,
})

const rules = reactive<FormRules>({
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

const suppliers = ref<Supplier[]>([]);

// Функция для загрузки списка поставщиков из хранилища
const loadSuppliers = () => {
    suppliers.value = store.state.suppliers;
};

onMounted(async () => {
    await store.dispatch('get_suppliers')
            .then(() => {
            console.log("Got suppliers successfully");
            loadSuppliers();
            // suppliers_names = suppliers.value.map(supplier => ({name: supplier.name, id: supplier.id}));
            // console.log("suppliers names: ",suppliers_names);
            })
            .catch(error => {
            console.error("Failed to get suppliers:", error);
            });
});

// Обновляем список поставщиков после каждого обновления состояния
onUpdated(loadSuppliers);

//всплывающие уведомления
const success_notification = (order_id) => {
  ElNotification({
    title: 'Успешно',
    message: 'Заказ  №' + order_id + ' сформирован',
    type: 'success',
    position: 'bottom-right',
  })
}

const error_notification = (error) => {
  ElNotification({
    title: 'Ошибка',
    message: 'Не удалось сформировать заказ' + error,
    type: 'error',
    position: 'bottom-right',
  })
}

//отправка данных на бек
function submitForm() {
  ruleForm.date = formatDate(ruleForm.date);
  fetch('http://89.104.68.248:8000/api/someorder/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ruleForm)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const order_id = data.id;
    console.log('Received order id:', order_id);
    console.log('Заказ сформирован. ID: ', order_id);
    success_notification(order_id);
    router.push({ path: '/suppliers' });
  })
  .catch(error => {
    console.error('There was an error creating the order:', error);
    error_notification(error);
  });
}
</script>