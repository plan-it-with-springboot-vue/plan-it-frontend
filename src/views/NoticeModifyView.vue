<template>
    <TheHeader />
    <div id="notice-modify-container">
        <div>
            <NoticeModify />
        </div>
    </div>
    <TheFooter />
</template>

<script setup>
import TheHeader from '../components/layout/TheHeader.vue';
import TheFooter from '../components/layout/TheFooter.vue';
import NoticeModify from "../components/notice/NoticeModify.vue";
</script>

<style scoped>
#notice-modify-container {
    display: flex;
    min-height: 100vh;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
}
</style>