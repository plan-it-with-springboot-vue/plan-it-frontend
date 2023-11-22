<template>
    <TheHeader />
    <div id="board-modify-container">
        <div>
            <BoardModify />
        </div>
    </div>
    <TheFooter />
</template>

<script setup>
import TheHeader from '../components/layout/TheHeader.vue';
import TheFooter from '../components/layout/TheFooter.vue';
import BoardModify from "../components/board/BoardModify.vue";
</script>

<style scoped>
#board-modify-container {
    display: flex;
    min-height: 100vh;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
}
</style>