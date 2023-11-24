<template>
    <TheHeader />
    <div id="find-id-result-container">
        <FindIdResult />
    </div>
    <TheFooter />
</template>

<script setup>
import TheHeader from '../components/layout/TheHeader.vue';
import TheFooter from '../components/layout/TheFooter.vue';
import FindIdResult from "../components/user/login/FindIdResult.vue";
</script>

<style scoped>
#find-id-result-container {
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
}
</style>