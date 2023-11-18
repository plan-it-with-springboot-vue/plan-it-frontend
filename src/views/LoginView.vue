<template>
    <TheHeader />
    <div id="login-container">
        <div> 
            <Login />
        </div>
    </div>
    <TheFooter />
</template>

<script setup>
import TheFooter from '../components/layout/TheFooter.vue';
import TheHeader from '../components/layout/TheHeader.vue';
import Login from "../components/user/login/Login.vue";
</script>


<style scoped>
#login-container {
    display: flex;
    height: 93vh;
    justify-content: center;
    align-items: center;
}
</style>