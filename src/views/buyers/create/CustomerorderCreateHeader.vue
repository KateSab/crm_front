<template>
  <el-row style="width: 100%">
    <el-col :span="20" class="top">
      <el-form label-position="left" size="small" label-width="auto">
        <el-form-item label="Ссылка на сделку продажи">
          <el-input v-model="formData.sell_link" />
        </el-form-item>
        <el-form-item label="Клиент">
          <el-autocomplete
              v-model="formData.client.name"
              :fetch-suggestions="handleFetchSuggestions"
              clearable
              class="inline-input w-50"
              @select="client => handleSelectClient(client)"
              value-key="label"
          />
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
    handleFetchSuggestions(queryString, cb) {
      try {
        const filteredClients = this.clients.filter(client =>
            client.name.toLowerCase().includes(queryString.toLowerCase())
        );
        const suggestions = filteredClients.map(client => ({
            value: client.id,
            label: client.name,
            client
        }));
        cb(suggestions);
      } catch (error) {
          console.error('Failed to fetch clients:', error);
      }
    },
    handleSelectClient(selectedClient) {
      this.formData.client.id = selectedClient.client.id;
      console.log("Selected client:", this.formData.client.id);
      this.formData.client.name = selectedClient.label;
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
