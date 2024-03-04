<template>
    <div class="header-page"> 
      <h2>This page is an about contractors</h2>
      <!-- <div v-for="order in orders" :key="order.id">
      <h2>order ID: {{ order.id }}, create date: {{ order.create_date }}</h2>
      <p>{{ post.body }}</p> -->
  <!-- </div> -->
      <div v-for="order in orders" :key="order.id">
        order: {{ order.id }}
        order create_date: {{ order.create_date }}
        order instructions: {{ order.instructions }}
      </div>
    </div>
    
    <!-- <button @click="getData">Get Data</button> -->
    <!-- <button @click="submitData">Submit Data</button> -->
    
 </template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      orders: []
    }
  },
  mounted() {
    axios
      .get('http://89.104.68.248:8000/api/customerorder/get_filter?offset=0&limit=50&status_id=1')
      .then((response) => {
        this.orders = response.data
      })
  }
}
</script>

