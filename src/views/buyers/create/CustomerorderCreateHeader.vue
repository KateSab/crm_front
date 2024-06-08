<template>
  <el-row style="width: 100%">
    <el-col :span="20" class="top">
      <el-form label-position="left" size="small" label-width="auto">
        <el-form-item label="Ссылка на сделку продажи">
          <el-input v-model="formData.sell_link" />
        </el-form-item>
        <el-form-item label="Клиент">
          <el-select v-model="formData.client_id">
            <el-option
                v-for="client in clients"
                :label="client.name"
                :value="client.id"
                :key="client.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Наценка">
          <el-input 
          v-model="formData.income_ratio" 
          @input="updateForm('income_ratio', $event)"
          />
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import {formatFloat} from "@/services/utils/format_input";

export default {
  props: {
    formData: Object,
    clients: Array
  },
  computed: {
  },
  methods: {
    updateForm(field, value) {
      const formattedValue = formatFloat(value);
      // Эмитируем событие с обновленным значением поля, используя отформатированное значение
      this.formData[field] = formattedValue;
    },
  }
};
</script>

<style scoped>
.top {
  max-width: 500px;
  min-width: 250px;
  margin-left: 2rem;
  padding: 1rem 1rem 0;
  background-color: #dcdfe6;
}
</style>
