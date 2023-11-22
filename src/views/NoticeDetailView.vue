<template>
    <TheHeader />
    <div id="notice-detail-container">
        <div>
            <NoticeDetail />
        </div>
    </div>
    <TheFooter />
</template>

<script setup>
import TheHeader from '../components/layout/TheHeader.vue';
import TheFooter from '../components/layout/TheFooter.vue';
import NoticeDetail from "../components/notice/NoticeDetail.vue";
</script>

<style scoped>
#notice-detail-container {
    display: flex;
    min-height: 100vh;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
}
</style>