<template>
        <el-table :data="tableData" :show-header="false" style="display: flex; align-items: center" width="350">
            <el-table-column style="background-color: yellow;" prop="name" label="Наименование" width="200" />
            <el-table-column prop="count" label="Количество" width="120" />
            <el-table-column prop="index" label="Индекс" width="170" />
            <el-table-column prop="type" label="Тип" width="100" />
            <el-table-column prop="print_type" label="Печать" width="120" />
            <el-table-column prop="status" label="Статус" width="150" />
            <el-table-column fixed="right" prop="comment" label="Комментарий" width="400"/>    
        </el-table>
</template>

<script>
import {ref} from 'vue'

export default {
  props: {
    orderData: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const tableData = ref([{
      name: 'ждем данные',
      count: 'ждем данные',
      index: 'ждем данные',
      type: 'ждем данные',
      print_type: 'ждем данные',
      status: 'ждем данные',
      comment: props.orderData.instructions,
    }]);

    return { tableData }; // Возвращение данных таблицы для использования в шаблоне
  }
};

</script>

<style>
el-table-column {
    font-size: medium;
    font-weight: 200;
}
.el-table th div.cell {
  color: rgb(77, 77, 142);
}
</style>