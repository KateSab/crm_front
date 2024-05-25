
<template>
    <el-form
      :model="ruleForm"
      label-position="left"
      size="small"
      label-width="auto"
      status-icon
      style="width: 40vw; margin-top: 2rem;"
    >
      <el-form-item label="Поставщик" prop="contractor_id">
        <el-select v-model="ruleForm.contractor_id" placeholder="Поставщик">
          <el-option
            v-for="supplier in suppliers"
            :key="supplier.id"
            :label="supplier.name"
            :value="supplier.id"
          />
        </el-select>
      </el-form-item>
        <el-form-item label="Номр заказа у поставщика" prop="supplier_order_number">
            <el-input v-model="ruleForm.supplier_order_number" />
        </el-form-item>
        <el-form-item label="Дата прибытия(план)" required prop="date">
            <el-date-picker
                    v-model="ruleForm.shipment_date_planned"
                    type="date"
                    label="Pick a date"
                    placeholder="Pick a date"
                    style="width: 100%"
                />
        </el-form-item>
        <el-form-item label="Тип доставки" prop="delivery_type">
            <el-select v-model="ruleForm.delivery_type" placeholder="Тип доставки">
                <el-option v-for="delivery in delivery_types" :label="delivery.name" :value="delivery.id" :key="delivery.id" />
            </el-select>
        </el-form-item>
        <el-form-item label="Счёт на оплату" prop="invoice_id">
            <el-input v-model="ruleForm.invoice_id" />
        </el-form-item>
            <el-form-item v-if="ruleForm.delivery_type === 2" label="Заказ в ТК" prop="order_in_TK">
                <el-select v-model="ruleForm.order_in_TK" placeholder="Заказ в ТК">
                    <el-option label="1" value="order1" />
                    <el-option label="2" value="order2" />
                    <el-option label="3" value="order3" />
                </el-select>
            </el-form-item>
    </el-form>
    <el-button type="primary" style="width: 20%; margin-top: 1rem;" @click="handleSubmitForm()">Создать заказ</el-button>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import store from '../../../store/index';
import { getSuppliers } from '@/api/api_helpers_partners';
import { ISupplierOrder } from '@/interfaces/ISupplierOrder';
import { submitForm } from '@/api/api_suppliers_order_create';

const ruleForm = reactive<ISupplierOrder>({
    contractor_id: '',
    supplier_order_number: '',
    shipment_date_planned: '',
    delivery_type: null,
    invoice_id: '',
    order_in_TK: 0,
});

const delivery_types = store.state.delivery_types;
const suppliers = ref([]);

onMounted(async () => {
    try {
        suppliers.value = await getSuppliers();
    } catch (error) {
        console.error("Error loading data:", error);
    };
});

const handleSubmitForm = () => {
  submitForm(ruleForm);
}
</script>