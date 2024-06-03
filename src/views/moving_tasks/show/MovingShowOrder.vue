<template>
    <div class="order-moving">
    <el-row justify="space-evenly" style="width: 100%;">
        <el-col :span="4">
            <el-row class="moving-titles">Дата: 05.04.2024</el-row>
            <el-row class="moving-titles">Запланированная</el-row>
        </el-col>
        <el-col :span="9">
            <el-row class="moving-titles">Статус: Создана</el-row>
            <el-row class="moving-titles">09:00 - 18:00 Откуда: Наш склад Новосибирск</el-row>
            <el-row class="moving-titles">11:00 - 16:00 Куда: Арт Черри</el-row>
        </el-col>
        <el-col :span="7">
            <el-row class="moving-titles">Содержимое</el-row>
            <el-row>Сумка хлопчатая, бежевая 100 шт.</el-row>
            <el-row>Сумка хлопчатая, бежевая 100 шт.</el-row>
            <el-row>Сумка хлопчатая, бежевая 100 шт.</el-row>
        </el-col>
        <el-col :span="4">
            <el-row class="moving-titles">Комментарий</el-row>
            <el-row>Сказать, что продукция от Анны</el-row>
        </el-col>
    </el-row>
</div>
</template>

<script>
export default {
    name: 'MovingShowOrder',
}
</script>

<style >
el-row {
  font-weight: bold;
}

.order-moving {
  width: 100%;
  font-size: small;
  font-weight: 80;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.moving-titles {
  font-weight: bold;
}
</style>