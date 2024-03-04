<template>
    <div class="top-order-wrapper">
        <div class="order">
            <el-col>
                <el-row justify="center">
                    <el-col class="markered" :span="7">Заказ покупателя №{{ orderData.id }}</el-col>
                </el-row>
                <el-row justify="space-around">
                    <el-col :span="8">дата создания: {{ formatDate(orderData.create_date) }}</el-col>
                    <el-col :span="8">!Клиент: Таймлизинг</el-col>
                    <el-col :span="8">дата отгрузки(план): {{ formatDate(orderData.shipment_date_planned) }}</el-col>
                </el-row>
                <el-row justify="space-around">
                    <el-col :span="8">!Менеджер: Макеева</el-col>
                    <el-col :span="8">#{{ orderData.sell_order_id }}</el-col>
                    <el-col :span="8">дата отгрузки(факт): {{ formatDate(orderData.shipment_date_fact) }}</el-col>
                </el-row>
            </el-col>   
        </div>
        <p class="status-order">{{ orderData.status.title }}</p>
    </div> 
</template>

<script>
export default {
  props: {
    orderData: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    }
  }
};
</script>

<style>
.top-order-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
}

.status-order {
  margin-left: 4rem; /* Помещаем текст справа от TopOrder */
  padding: 10px 10px 10px 10px;
  border-radius: 5px;
  background-color: #3d9cfb54;
  color: #0466c8;
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

/* .grid-content {
  border-radius: 4px;
  min-height: 36px;
} */

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
    color: white;
    background: #3d9cfb;
}

/* .wrap {
    display: inline-block;
} */
</style>