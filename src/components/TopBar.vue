<template>
    <div class="top-bar">
        <el-icon color="white"><UserFilled /></el-icon>
        <text class="manager">Советкин Андрей | Начальник склада</text>
        <el-button class="logout" size="small" @click="logout">Выйти</el-button>
    </div>
</template>

<script>
export default {
    computed: {
        isLoggedIn: function() {
            return this.$store.getters.isLoggedIn
        }
    },
    methods: {
        logout: function() {
            this.$store.dispatch('logout')
            .then(() =>  {
                this.$router.push('/login')
            })
        }
    },
}
</script>

<style>
.top-bar {
  background-color: #4d4d4d;
  height: 2rem; /* Высота полосы */
  width: 100%; /* Ширина полосы, чтобы она растянулась на всю ширину экрана */
  align-items: center;
  display: flex;
  justify-content: right;
}

.manager {
    font-family: 'Arimo', sans-serif;
    font-size: small;
    color: white;
}

.logout {
    size: small;
    margin: 2rem;
}
</style>