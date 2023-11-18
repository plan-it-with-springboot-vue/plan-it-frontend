<template>
    <TheHeader />
    <div id="find-id-container">
        <div> 
            <FindId />
        </div>
    </div>
    <TheFooter />
</template>

<script setup>
import TheHeader from '../components/layout/TheHeader.vue';
import TheFooter from '../components/layout/TheFooter.vue';
import FindId from "../components/user/login/FindId.vue";
</script>

<style scoped>
#find-id-container {
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
}
</style>