<template>
  <div class="bottom">
  <el-row style="justify-content: space-between; align-items: flex-start;">
    <el-col :span="12" class="bottom-form">
      <el-form
          label-position="left"
          size="small"
          label-width="auto"
      >
        <el-form-item label="УК">
          <el-input v-model="localForm.UK" disabled>
            <template #append>₽</template>
          </el-input>
        </el-form-item>
        <el-form-item label="Оплата за склад">
          <el-input
              v-model="localForm.store_cost"
              @input="updateForm('store_cost', $event)"

          >
            <template #append>₽</template>
          </el-input>
        </el-form-item>
        <el-form-item label="Доставка от поставщика (план)">
          <el-input
              v-model="localForm.plan_delivery_cost"
              @input="updateForm('plan_delivery_cost', $event)"

          >
            <template #append>₽</template>
          </el-input>
        </el-form-item>
        <el-form-item label="Перемещения при производстве (план)">
          <el-input
              v-model="localForm.plan_moves_cost"
              @input="updateForm('plan_moves_cost', $event)"

          >
            <template #append>₽</template>
          </el-input>
        </el-form-item>
        <el-form-item label="Дизайн (план)">
          <el-input
              v-model="localForm.plan_design_cost"
              @input="updateForm('plan_design_cost', $event)"

          >
            <template #append>₽</template>
          </el-input>
        </el-form-item>
        <el-form-item label="Сборщики (студенты) (план)">
          <el-input
              v-model="localForm.plan_workers_cost"
              @input="updateForm('plan_workers_cost', $event)"

          >
            <template #append>₽</template>
          </el-input>
        </el-form-item>
        <el-form-item label="Доставка до клиента (план)">
          <el-input
              v-model="localForm.plan_shipment_cost"
              @input="updateForm('plan_shipment_cost', $event)"

          >
            <template #append>₽</template>
          </el-input>
        </el-form-item>
        <el-form-item label="Прочие расходы (план)">
          <el-input
              v-model="localForm.plan_other_expenses"
              @input="updateForm('plan_other_expenses', $event)"

          >
            <template #append>₽</template>
          </el-input>
        </el-form-item>
        <el-form-item label="Сделка с маркетинга">
          <div class="inline-elements">
            <el-checkbox v-model="localForm.is_from_marketing" size="default"></el-checkbox>
            <el-input v-model="localForm.is_from_marketing_cost" disabled>
              <template #append>₽</template>
            </el-input>
          </div>
        </el-form-item>
        <el-form-item label="Итого доп.затрат">
          <el-input v-model="localForm.sum_cost" disabled>
            <template #append>₽</template>
          </el-input>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="12" class="bottom-form">
      <el-form
          label-position="left"
          size="small"
          label-width="auto"
      >
        <el-form-item label="Себестоимость всего заказа">
          <el-input
              v-model="localForm.self_order_cost"
              disabled>
            <template #append>₽</template>
          </el-input>
        </el-form-item>
        <el-form-item label="Цена всего заказа для клиента">
          <el-input
              v-model="localForm.sum_client_cost"
              disabled>
            <template #append>₽</template>
          </el-input>
        </el-form-item>
        <el-form-item label="Маржа по заказу">
          <el-input
              v-model="localForm.margin_cost"
              disabled>
            <template #append>₽</template>
          </el-input>
        </el-form-item>
        <el-form-item label="Маржинальность по заказу">
          <el-input
              v-model="localForm.margin_percent"
              disabled>
            <template #append>%</template>
          </el-input>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
  </div>
</template>

<script>
import {ElInput} from "element-plus";
import {formatValue} from "@/services/utils/format_input";

export default {
  props: {
    formData: Object,
  },
  computed: {
    localForm: {
      get() {
        return this.formData;
      },
      set(value) {
        // Не используется, так как обновление происходит через метод updateForm
      }
    }
  },
  methods: {
    updateForm(field, value) {
      const formattedValue = formatValue(value);
      // Эмитируем событие с обновленным значением поля, используя отформатированное значение
      this.$emit('update-form', { field, value: formattedValue });
    }
  }
};
</script>

<style scoped>
.bottom {
  width: 100%;
  margin-top: 2rem;
}

.bottom-form {
  max-width: 600px;
  margin: 0 2rem;
  padding: 1rem 1rem 0;
  background-color: #dcdfe6;
}

.inline-elements {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>