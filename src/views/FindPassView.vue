<template>
    <TheHeader />
    <div id="find-pass-container">
        <div> 
            <FindPass />
        </div>
    </div>
    <TheFooter />
</template>

<script setup>
import TheHeader from '../components/layout/TheHeader.vue';
import TheFooter from '../components/layout/TheFooter.vue';
import FindPass from "../components/user/login/FindPass.vue";
</script>

<style scoped>
#find-pass-container {
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
}
</style>