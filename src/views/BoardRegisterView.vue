<template>
  <TheHeader />
  <div id="board-register-container">
    <div>
      <BoardRegister />
    </div>
  </div>
  <TheFooter />
</template>

<script setup>
import TheHeader from "../components/layout/TheHeader.vue";
import TheFooter from "../components/layout/TheFooter.vue";
import BoardRegister from "../components/board/BoardRegister.vue";
</script>

<style scoped>
#board-register-container {
  display: flex;
  min-height: 100vh;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}
</style>
