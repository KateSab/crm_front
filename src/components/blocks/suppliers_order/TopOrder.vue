<template>
    <div class="top-order-wrapper">
        <div class="order">
            <el-col>
                <el-row justify="center">
                    <el-col class="markered" :span="7">Заказ поставщику №1</el-col>
                </el-row>
                <el-row justify="space-around">
                    <el-col :span="6">Дата создания: 03.02.24</el-col>
                    <el-col :span="6">Поставщик: Оазис</el-col>
                    <el-col :span="6">Доставка: До ТК</el-col>
                    <el-col :span="6">Дата прибытия(план): 20.02.24</el-col>
                </el-row>
                <el-row justify="space-around">
                    <el-col :span="6">Ответственный: Макеева</el-col>
                    <el-col :span="6">Номер: Е1-00006944</el-col>
                    <el-col :span="6">24 63764574</el-col>
                    <el-col :span="6">дата прибытия(факт): __.__.__</el-col>
                </el-row>
            </el-col>   
        </div>
        <p class="status-order">В пути</p>
    </div> 
</template>