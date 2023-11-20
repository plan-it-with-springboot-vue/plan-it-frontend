<template>
    <TheHeader />
    <div id="board-container">
        <div>
            <BoardList />
        </div>
    </div>
    <TheFooter />
</template>

<script setup>
import TheHeader from '../components/layout/TheHeader.vue';
import TheFooter from '../components/layout/TheFooter.vue';
import BoardList from "../components/board/BoardList.vue";
</script>

<style scoped>
#board-container {
    display: flex;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
}
</style>