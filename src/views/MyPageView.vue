<template>
  <TheHeader />
  <div>
    <div id="mypage-container">
      <MyPage />
    </div>
  </div>
  <TheFooter />
</template>

<script setup>
import TheHeader from "../components/layout/TheHeader.vue";
import TheFooter from "../components/layout/TheFooter.vue";
import MyPage from "../components/mypage/MyPage.vue";
</script>

<style scoped>
#mypage-container {
  display: flex;
  min-height: 100vh;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}
</style>
