<template>
    <div class="top-order-wrapper">
        <div class="order">
            <el-col>
                <el-row justify="center">
                    <el-col class="markered" :span="7">Заказ поставщику №{{ orderData.id }}</el-col>
                </el-row>
                <el-row justify="space-around">
                    <el-col :span="6">Дата создания: {{ formatDate(orderData.create_date) }}</el-col>
                    <el-col :span="6">!Поставщик: Оазис</el-col>
                    <el-col :span="6">Доставка: {{ deliveryTypeName }}</el-col>
                    <el-col :span="6">Дата прибытия(план): {{ formatDate(orderData.shipment_date_planned) }}</el-col>
                </el-row>
                <el-row justify="space-around">
                    <el-col :span="6">!Ответственный: Макеева</el-col>
                    <el-col :span="6">Номер: {{ orderData.supplier_order_number }}</el-col>
                    <el-col :span="6">!24 63764574</el-col>
                    <el-col :span="6">дата прибытия(факт): {{ formatDate(orderData.shipment_date_fact) }}</el-col>
                </el-row>
            </el-col>   
        </div>
        <p class="status-order">В пути</p>
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
        if (dateString === null) {
          return '';
        } else {
            const date = new Date(dateString);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            return `${day}.${month}.${year}`;
        }
    }
  },
  computed: {
  deliveryTypeName() {
    const deliveryType = this.orderData.delivery_type;
    const deliveryTypeInfo = this.$store.state.delivery_types.find(type => type.id === deliveryType);
    return deliveryTypeInfo ? deliveryTypeInfo.name : 'Unknown'; // Возвращаем имя доставки или 'Unknown', если соответствие не найдено
  }
}
}
</script>