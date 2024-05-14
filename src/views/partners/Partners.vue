<template>
    <div class="header-page"> 
      <h2>Контрагенты</h2>
    </div>
    <PartnersShowList />
  </template>

<script>
import PartnersShowList from '@/views/partners/show/PartnersShowList.vue';

export default {
  name: 'Partners',
  components: {
    PartnersShowList
  }
}
</script>