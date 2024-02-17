<template>
        <el-table :data="tableData" border style="display: flex; align-items: center" max-height="300" width="350">
            <el-table-column prop="name" label="Наименование" width="200" />
            <el-table-column prop="count" label="Количество" width="120" />
            <el-table-column prop="index" label="Индекс" width="170" />
            <el-table-column prop="type" label="Тип" width="100" />
            <el-table-column prop="print_type" label="Печать" width="120" />
            <el-table-column prop="status" label="Статус" width="150" />
            <el-table-column fixed="right" prop="comment" label="Комментарий" width="400"/>    
        </el-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const tableData = ref([
  {
    name: 'Папка-конверт А4',
    count: '0/400',
    index: 'Оазис: Е1-00006944',
    type: 'Макеты',
    print_type: 'Тампопечать',
    status: 'Склад НСК: не отгружено',
    comment: 'Ожидается прибытие от поставщика',
  },
  {
    name: 'Папка-конверт А4',
    count: '0/400',
    index: 'Оазис: Е1-00006944',
    type: 'Макеты',
    print_type: 'Тампопечать',
    status: 'Склад НСК: не отгружено',
    comment: 'Ожидается прибытие от поставщика',
  },
  {
    name: 'Папка-конверт А4',
    count: '0/400',
    index: 'Оазис: Е1-00006944',
    type: 'Макеты',
    print_type: 'Тампопечать',
    status: 'Склад НСК: не отгружено',
    comment: 'Ожидается прибытие от поставщика',
  },
  {
    name: 'Папка-конверт А4',
    count: '0/400',
    index: 'Оазис: Е1-00006944',
    type: 'Макеты',
    print_type: 'Тампопечать',
    status: 'Склад НСК: не отгружено',
    comment: 'Ожидается прибытие от поставщика',
  },
  {
    name: 'Папка-конверт А4',
    count: '0/400',
    index: 'Оазис: Е1-00006944',
    type: 'Макеты',
    print_type: 'Тампопечать',
    status: 'Склад НСК: не отгружено',
    comment: 'Ожидается прибытие от поставщика',
  },
])
</script>

<style>
.el-table-column {
    font-size: medium;
    font-weight: 200;
}
.el-table th div.cell {
  color: rgb(77, 77, 142); /* Замените на желаемый цвет */
}
</style>