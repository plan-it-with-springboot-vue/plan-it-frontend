<template>
    <TheHeader />
    <div id="notice-container">
        <div>
            <NoticeList />
        </div>
    </div>
    <TheFooter />
</template>

<script setup>
import TheHeader from '../components/layout/TheHeader.vue';
import TheFooter from '../components/layout/TheFooter.vue';
import NoticeList from "../components/notice/NoticeList.vue";
</script>

<style scoped>
#notice-container {
    display: flex;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>