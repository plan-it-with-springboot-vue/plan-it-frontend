<template>
    <TheHeader />
    <div id="find-pass-result-container">
        <FindPassResult />
    </div>
    <TheFooter />
</template>

<script setup>
import TheHeader from '../components/layout/TheHeader.vue';
import TheFooter from '../components/layout/TheFooter.vue';
import FindPassResult from "../components/user/login/FindPassResult.vue";
</script>

<style scoped>
#find-pass-result-container {
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
}
</style>