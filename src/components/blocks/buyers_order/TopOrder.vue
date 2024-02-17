<template>
    <div class="top-order-wrapper">
        <div class="order">
            <el-col>
                <el-row justify="center">
                    <el-col class="markered" :span="7">Заказ покупателя №1</el-col>
                </el-row>
                <el-row justify="space-around">
                    <el-col :span="8">дата создания: 03.02.24</el-col>
                    <el-col :span="8">Клиент: Таймлизинг</el-col>
                    <el-col :span="8">дата отгрузки(план): 20.02.24</el-col>
                </el-row>
                <el-row justify="space-around">
                    <el-col :span="8">Менеджер: Макеева</el-col>
                    <el-col :span="8">343553801</el-col>
                    <el-col :span="8">дата отгрузки(факт): __.__.__</el-col>
                </el-row>
            </el-col>   
        </div>
        <p class="status-order">Создан</p>
    </div> 
</template>

<style>
.top-order-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
}

.status-order {
  margin-left: 40px; /* Помещаем текст справа от TopOrder */
  padding: 10px 10px 10px 10px;
  border-radius: 5px;
  background-color: rgba(187, 187, 243, 0.631);
  color: rgb(65, 65, 113);
}

.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
  /* background: rgb(223, 222, 222); */
  padding-bottom: 5px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.order {
    width: 800px;
    font-size: small;
    font-weight: 100;
    margin-left: 200px;
    margin-bottom: 20px;
    padding-top: 30px;
}

.markered {
    font-weight: 200; 
    font-size: medium; 
    background: rgb(187, 187, 243);
}

.wrap {
    display: inline-block;
}


</style>