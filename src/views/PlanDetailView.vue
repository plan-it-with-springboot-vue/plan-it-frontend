<template>
  <TheHeader />
  <div>
    <div id="plan-detail-container">
      <PlanDetail />
    </div>
  </div>
  <TheFooter />
</template>

<script setup>
import TheFooter from "../components/layout/TheFooter.vue";
import TheHeader from "../components/layout/TheHeader.vue";
import PlanDetail from "../components/mypage/PlanDetail.vue";
</script>

<style scoped>
#plan-detail-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 5.8rem;
  flex-direction: column;
}
</style>
