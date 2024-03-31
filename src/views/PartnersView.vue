<template>
    <div class="header-page"> 
      <h2>Контрагенты</h2>
    </div>
    <Partners />
  </template>

<script>
import Partners from '../components/blocks/partners_list/Partners.vue';

export default {
  name: 'PartnersView',
  components: {
    Partners
  }
}
</script>