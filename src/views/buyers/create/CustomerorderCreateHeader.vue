<template>
  <el-row style="width: 100%">
    <el-col :span="20" class="top">
      <el-form
          label-position="left"
          size="small"
          label-width="auto"
      >
        <el-form-item label="Ссылка на сделку продажи">
          <el-input v-model="localForm.sell_link" @input="updateForm('sell_link', $event)"/>
        </el-form-item>
        <el-form-item label="Клиент">
          <el-select v-model="localForm.client_id" @change="updateForm('client_id', $event)">
            <el-option
                v-for="client in clients"
                :label="client.name"
                :value="client.id"
                :key="client.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Наценка">
          <el-input v-model="localForm.income_ratio" @input="updateForm('income_ratio', $event)"/>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    formData: Object,
    clients: Array
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
      // Эмитируем событие с обновленным значением поля
      this.$emit('update-form', { field, value });
    }
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
