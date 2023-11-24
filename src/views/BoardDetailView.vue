<template>
    <TheHeader />
    <div id="board-detail-container">
        <div>
            <BoardDetail />
        </div>
    </div>
    <TheFooter />
</template>

<script setup>
import TheHeader from '../components/layout/TheHeader.vue';
import TheFooter from '../components/layout/TheFooter.vue';
import BoardDetail from "../components/board/BoardDetail.vue";
</script>

<style scoped>
#board-detail-container {
    display: flex;
    min-height: 100vh;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
}
</style>